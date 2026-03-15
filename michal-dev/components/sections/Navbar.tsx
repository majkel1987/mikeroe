'use client';

import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

interface NavLink {
  name: string;
  href: string;
}

const navLinks: NavLink[] = [
  { name: 'Usługi', href: '#services' },
  { name: 'Portfolio', href: '#portfolio' },
  { name: 'Technologie', href: '#tech-stack' },
  { name: 'Cennik', href: '#pricing' },
  { name: 'Kontakt', href: '#contact' },
];

export default function Navbar() {
  const { scrollY } = useScroll();
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('Usługi');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 50);
  });

  // Intersection Observer to update active section based on scroll position
  useEffect(() => {
    const handleScroll = () => {
      const sections = navLinks.map(link => link.href.substring(1));
      let current = '';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            current = navLinks.find(link => link.href === `#${section}`)?.name || '';
            break;
          }
        }
      }

      if (current && current !== activeSection) {
        setActiveSection(current);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [activeSection]);

  const scrollToContact = () => {
    document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
    setIsMobileMenuOpen(false);
  };

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    const element = document.getElementById(href.substring(1));
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
      setIsMobileMenuOpen(false);
    }
  };


  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
          isScrolled 
            ? 'bg-bg/85 backdrop-blur-[16px] border-b border-border/50' 
            : 'bg-transparent border-b border-transparent'
        }`}
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5, ease: "easeOut" }}
      >
        <div className="max-w-[1440px] mx-auto w-full px-6 md:px-12 h-16 flex items-center justify-between">
          
          {/* Logo */}
          <Link href="/" className="flex items-center" onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}>
            <span className="font-display font-bold text-lg text-text">mikeroe</span>
            <span className="font-display font-bold text-lg text-[#FF6B35]">.pl</span>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeSection === link.name;
              return (
                <a
                  key={link.name}
                  href={link.href}
                  onClick={(e) => scrollToSection(e, link.href)}
                  className="relative flex flex-col items-center group cursor-pointer min-h-11 justify-center px-2 rounded-lg focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2"
                >
                  <span className={`font-sans text-sm transition-colors duration-200 ${
                    isActive ? 'text-text' : 'text-muted group-hover:text-text'
                  }`}>
                    {link.name}
                  </span>
                  
                  {/* Active Indicator / Hover effect */}
                  <div className={`mt-1.5 w-1 h-1 rounded-full transition-all duration-300 ${
                    isActive ? 'bg-[#FF6B35] opacity-100 scale-100' : 'bg-[#FF6B35] opacity-0 scale-0 group-hover:opacity-50 group-hover:scale-100'
                  }`} />
                </a>
              );
            })}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex">
            <motion.a
              href="#contact"
              onClick={(e: React.MouseEvent<HTMLAnchorElement>) => { e.preventDefault(); scrollToContact(); }}
              className="group px-5 py-2 min-h-11 rounded-xl border border-[#FF6B35]/50 flex items-center justify-center transition-all bg-transparent hover:bg-[#FF6B35] focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <span className="font-sans font-medium text-sm text-[#FF6B35] group-hover:text-bg transition-colors">Zatrudnij mnie</span>
            </motion.a>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden flex flex-col justify-center items-center w-11 h-11 relative z-50 text-text rounded-xl focus-visible:ring-2 focus-visible:ring-[#FF6B35] focus-visible:ring-offset-2"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Zamknij menu" : "Otwórz menu"}
            aria-expanded={isMobileMenuOpen}
          >
            <span className={`block w-6 h-0.5 bg-current rounded-full transition-transform duration-300 ${isMobileMenuOpen ? 'rotate-45 translate-y-1.5' : '-translate-y-1'}`} />
            <span className={`block w-6 h-0.5 bg-current rounded-full transition-opacity duration-300 my-1 ${isMobileMenuOpen ? 'opacity-0' : 'opacity-100'}`} />
            <span className={`block w-6 h-0.5 bg-current rounded-full transition-transform duration-300 ${isMobileMenuOpen ? '-rotate-45 -translate-y-1.5' : 'translate-y-1'}`} />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 z-40 bg-surface/95 backdrop-blur-xl md:hidden pt-24 px-6 pb-8 flex flex-col"
          >
            <nav className="flex flex-col gap-6 flex-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.name;
                return (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={(e) => scrollToSection(e, link.href)}
                    className="flex flex-col items-start w-full group"
                  >
                    <div className="flex items-center gap-3">
                      <div className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                        isActive ? 'bg-[#FF6B35] opacity-100' : 'bg-[#FF6B35] opacity-0 group-hover:opacity-50'
                      }`} />
                      <span className={`font-sans text-xl font-medium transition-colors duration-200 ${
                        isActive ? 'text-text' : 'text-muted group-hover:text-text'
                      }`}>
                        {link.name}
                      </span>
                    </div>
                  </a>
                );
              })}
            </nav>
            
            <div className="mt-8">
              <button
                onClick={scrollToContact}
                className="w-full py-4 rounded-xl border border-[#FF6B35] bg-[#FF6B35]/10 flex items-center justify-center text-[#FF6B35] font-sans font-medium hover:bg-[#FF6B35] hover:text-bg transition-colors"
              >
                Zatrudnij mnie
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
