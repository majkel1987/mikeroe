"use client";

import { useState, useEffect, useCallback } from "react";
import { cn } from "@/lib/utils";

const CHARACTERS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()";

const getRandomChar = () => CHARACTERS[Math.floor(Math.random() * CHARACTERS.length)];

export const EncryptedText = ({
  text,
  className,
  revealDelayMs = 30,
  flipDelayMs = 40,
  revealedClassName = "text-gray-300",
  encryptedClassName = "text-accent1/50",
  onComplete,
  startAnimation = true,
}: {
  text: string;
  className?: string;
  revealDelayMs?: number;
  flipDelayMs?: number;
  revealedClassName?: string;
  encryptedClassName?: string;
  onComplete?: () => void;
  startAnimation?: boolean;
}) => {
  const [displayText, setDisplayText] = useState<string[]>([]);
  const [revealedCount, setRevealedCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  // Initialize with encrypted characters
  useEffect(() => {
    if (!startAnimation) {
      setDisplayText(text.split(""));
      setRevealedCount(text.length);
      setIsComplete(true);
      return;
    }

    const encrypted = text.split("").map((char) =>
      char === " " ? " " : getRandomChar()
    );
    setDisplayText(encrypted);
    setRevealedCount(0);
    setIsComplete(false);
  }, [text, startAnimation]);

  // Flip random characters
  useEffect(() => {
    if (!startAnimation || isComplete) return;

    const interval = setInterval(() => {
      setDisplayText((prev) =>
        prev.map((char, index) => {
          if (index < revealedCount || char === " ") return char;
          return getRandomChar();
        })
      );
    }, flipDelayMs);

    return () => clearInterval(interval);
  }, [flipDelayMs, revealedCount, isComplete, startAnimation]);

  // Reveal characters one by one
  useEffect(() => {
    if (!startAnimation || isComplete) return;

    const timeout = setTimeout(() => {
      if (revealedCount < text.length) {
        setDisplayText((prev) => {
          const newText = [...prev];
          newText[revealedCount] = text[revealedCount];
          return newText;
        });
        setRevealedCount((prev) => prev + 1);
      } else {
        setIsComplete(true);
        onComplete?.();
      }
    }, revealDelayMs);

    return () => clearTimeout(timeout);
  }, [revealedCount, text, revealDelayMs, onComplete, isComplete, startAnimation]);

  const handleComplete = useCallback(() => {
    if (isComplete) {
      onComplete?.();
    }
  }, [isComplete, onComplete]);

  useEffect(() => {
    handleComplete();
  }, [handleComplete]);

  return (
    <span className={cn("font-mono", className)}>
      {displayText.map((char, index) => (
        <span
          key={index}
          className={cn(
            index < revealedCount ? revealedClassName : encryptedClassName,
            "transition-colors duration-150"
          )}
        >
          {char}
        </span>
      ))}
    </span>
  );
};
