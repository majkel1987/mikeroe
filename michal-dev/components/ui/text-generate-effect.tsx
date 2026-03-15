"use client";

import { useEffect, useCallback } from "react";
import { motion, stagger, useAnimate, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

export const TextGenerateEffect = ({
  words,
  className,
  filter = true,
  duration = 0.5,
  delay = 0,
  onComplete,
}: {
  words: string;
  className?: string;
  filter?: boolean;
  duration?: number;
  delay?: number;
  onComplete?: () => void;
}) => {
  const [scope, animate] = useAnimate();
  const isInView = useInView(scope);
  const wordsArray = words.split(" ");

  const handleAnimation = useCallback(async () => {
    if (delay > 0) {
      await new Promise((resolve) => setTimeout(resolve, delay * 1000));
    }

    await animate(
      "span",
      {
        opacity: 1,
        filter: filter ? "blur(0px)" : "none",
      },
      {
        duration: duration,
        delay: stagger(0.1),
      }
    );

    onComplete?.();
  }, [animate, delay, duration, filter, onComplete]);

  useEffect(() => {
    if (isInView) {
      handleAnimation();
    }
  }, [isInView, handleAnimation]);

  const renderWords = () => (
    <motion.span ref={scope} className="inline">
      {wordsArray.map((word, idx) => (
        <motion.span
          key={word + idx}
          className={cn("opacity-0 inline-block", className)}
          style={{
            filter: filter ? "blur(10px)" : "none",
          }}
        >
          {word}{idx < wordsArray.length - 1 ? "\u00A0" : ""}
        </motion.span>
      ))}
    </motion.span>
  );

  return <span className="inline">{renderWords()}</span>;
};
