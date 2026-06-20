'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Menu, X } from 'lucide-react';
import { SITE_CONFIG, NAV_LINKS } from '@/lib/constants';
import Image from 'next/image';

// ============================================================
// NAVBAR — Premium fixed navigation with glassmorphism on scroll
// ============================================================

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Track scroll position to toggle glassmorphism background
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Smooth scroll to section and close mobile menu
  const handleNavClick = useCallback(
    (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
      e.preventDefault();
      setIsMobileMenuOpen(false);
      const target = document.querySelector(href);
      if (target) {
        target.scrollIntoView({ behavior: 'smooth' });
      }
    },
    []
  );

  return (
    <>
      {/* ---- FIXED NAVBAR ---- */}
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ease-out ${
          isScrolled
            ? 'bg-rich-black/80 backdrop-blur-xl border-b border-mustard/10 shadow-lg shadow-rich-black/50'
            : 'bg-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-18 md:h-20">
            {/* ---- Logo ---- */}
            <motion.a
              href="#"
              className="flex items-center group relative w-32 h-14 md:w-40 md:h-16"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <Image 
                src="/logo.png"
                alt="Desimann Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </motion.a>

            {/* ---- Desktop Nav Links ---- */}
            <div className="hidden md:flex items-center gap-1">
              {NAV_LINKS.map((link, index) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index + 0.3, duration: 0.5 }}
                  className="relative px-4 py-2 text-sm font-[family-name:var(--font-poppins)] text-cream/70 hover:text-cream transition-colors duration-300 group"
                >
                  {link.label}
                  {/* Animated underline on hover */}
                  <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[2px] bg-mustard rounded-full transition-all duration-300 group-hover:w-3/4" />
                </motion.a>
              ))}
            </div>

            {/* ---- Right: CTA + Mobile Hamburger ---- */}
            <div className="flex items-center gap-3">
              {/* Desktop CTA */}
              <motion.a
                href="#reserve"
                onClick={(e) => handleNavClick(e, '#reserve')}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="hidden sm:inline-flex bg-mustard text-rich-black rounded-full px-6 py-2.5 font-semibold text-sm font-[family-name:var(--font-poppins)] hover:shadow-[0_0_24px_rgba(212,160,23,0.35)] transition-shadow duration-300"
              >
                Join Waitlist
              </motion.a>

              {/* Mobile Hamburger */}
              <motion.button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                whileTap={{ scale: 0.9 }}
                className="md:hidden flex items-center justify-center w-10 h-10 rounded-full border border-cream/20 text-cream hover:border-mustard/40 transition-colors duration-300"
                aria-label="Toggle menu"
              >
                <AnimatePresence mode="wait">
                  {isMobileMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <X size={20} />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 90, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -90, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <Menu size={20} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* ---- MOBILE FULLSCREEN OVERLAY MENU ---- */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            {/* Backdrop */}
            <div
              className="absolute inset-0 bg-rich-black/60 backdrop-blur-sm"
              onClick={() => setIsMobileMenuOpen(false)}
            />

            {/* Slide-in Panel */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 30, stiffness: 300 }}
              className="absolute right-0 top-0 bottom-0 w-full max-w-sm bg-rich-black/95 backdrop-blur-xl border-l border-mustard/10 flex flex-col"
            >
              {/* Close area at top (same height as navbar) */}
              <div className="h-18 flex items-center justify-end px-4">
                <motion.button
                  onClick={() => setIsMobileMenuOpen(false)}
                  whileTap={{ scale: 0.9 }}
                  className="flex items-center justify-center w-10 h-10 rounded-full border border-cream/20 text-cream"
                  aria-label="Close menu"
                >
                  <X size={20} />
                </motion.button>
              </div>

              {/* Links */}
              <nav className="flex-1 flex flex-col justify-center px-8 gap-2">
                {NAV_LINKS.map((link, index) => (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    onClick={(e) => handleNavClick(e, link.href)}
                    initial={{ x: 50, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: 50, opacity: 0 }}
                    transition={{ delay: 0.05 * index + 0.15, duration: 0.4 }}
                    className="group flex items-center gap-4 py-4 border-b border-cream/5"
                  >
                    {/* Accent line */}
                    <span className="w-6 h-[2px] bg-mustard/40 group-hover:w-10 group-hover:bg-mustard transition-all duration-300 rounded-full" />
                    <span className="font-[family-name:var(--font-playfair-display)] text-cream text-2xl tracking-wide group-hover:text-mustard transition-colors duration-300">
                      {link.label}
                    </span>
                  </motion.a>
                ))}
              </nav>

              {/* Bottom CTA */}
              <div className="px-8 pb-10">
                <motion.a
                  href="#reserve"
                  onClick={(e) => handleNavClick(e, '#reserve')}
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.4 }}
                  className="block w-full text-center bg-mustard text-rich-black rounded-full px-6 py-4 font-bold text-lg font-[family-name:var(--font-poppins)] hover:shadow-[0_0_24px_rgba(212,160,23,0.35)] transition-shadow duration-300"
                >
                  Join Waitlist
                </motion.a>
                <p className="text-center text-cream/30 text-xs mt-4 font-[family-name:var(--font-inter)]">
                  {SITE_CONFIG.tagline}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
