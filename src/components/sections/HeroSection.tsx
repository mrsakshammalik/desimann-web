'use client';

import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, Sparkles } from 'lucide-react';
import { SITE_CONFIG } from '@/lib/constants';

// ============================================================
// HERO SECTION — Cinematic 100vh landing with animated gradient,
// staggered reveals, countdown timer, and floating particles
// ============================================================

// --- Countdown Timer Hook ---
interface TimeLeft {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
}

function useCountdown(targetDate: string): TimeLeft {
  const [timeLeft, setTimeLeft] = useState<TimeLeft>({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = new Date(targetDate).getTime() - Date.now();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / (1000 * 60)) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [targetDate]);

  return timeLeft;
}

// --- Animated Counter Component ---
function AnimatedDigit({ value, label }: { value: number; label: string }) {
  const displayValue = String(value).padStart(2, '0');
  return (
    <div className="flex flex-col items-center">
      <div className="relative bg-rich-black/50 backdrop-blur-sm border border-mustard/20 rounded-lg px-3 py-2 min-w-[3.5rem] md:min-w-[4.5rem]">
        <AnimatePresence mode="popLayout">
          <motion.span
            key={displayValue}
            initial={{ y: -20, opacity: 0, filter: 'blur(4px)' }}
            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
            exit={{ y: 20, opacity: 0, filter: 'blur(4px)' }}
            transition={{ type: 'spring', damping: 20, stiffness: 300 }}
            className="block text-center font-[family-name:var(--font-playfair-display)] text-mustard text-2xl md:text-3xl font-bold"
          >
            {displayValue}
          </motion.span>
        </AnimatePresence>
      </div>
      <span className="mt-1.5 text-[10px] md:text-xs text-cream/40 font-[family-name:var(--font-inter)] uppercase tracking-widest">
        {label}
      </span>
    </div>
  );
}

// --- Floating Particle ---
function FloatingParticle({ delay, x, y, size, duration }: {
  delay: number;
  x: string;
  y: string;
  size: number;
  duration: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0 }}
      animate={{
        opacity: [0, 0.6, 0.6, 0],
        scale: [0, 1, 1, 0],
        y: [0, -150, -250, -350],
        x: [0, 20, -15, 30],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: 'easeInOut',
      }}
      className="absolute rounded-full bg-mustard/30"
      style={{
        left: x,
        top: y,
        width: size,
        height: size,
      }}
    />
  );
}

// --- Main HeroSection Component ---
export default function HeroSection() {
  const countdown = useCountdown(SITE_CONFIG.launchDate);

  // Generate stable particle positions using useMemo (no Math.random on every render)
  const particles = useMemo(() => {
    const seed = [
      { x: '10%', y: '80%', size: 3, delay: 0, duration: 8 },
      { x: '20%', y: '70%', size: 2, delay: 2, duration: 10 },
      { x: '35%', y: '85%', size: 4, delay: 1, duration: 7 },
      { x: '50%', y: '75%', size: 2, delay: 3, duration: 9 },
      { x: '65%', y: '90%', size: 3, delay: 0.5, duration: 11 },
      { x: '75%', y: '80%', size: 2, delay: 4, duration: 8 },
      { x: '85%', y: '70%', size: 3, delay: 1.5, duration: 10 },
      { x: '90%', y: '85%', size: 2, delay: 2.5, duration: 7 },
      { x: '5%',  y: '60%', size: 3, delay: 3.5, duration: 9 },
      { x: '45%', y: '65%', size: 2, delay: 5, duration: 12 },
      { x: '55%', y: '95%', size: 4, delay: 1.2, duration: 8 },
      { x: '30%', y: '55%', size: 2, delay: 6, duration: 10 },
      { x: '80%', y: '60%', size: 3, delay: 0.8, duration: 9 },
      { x: '15%', y: '90%', size: 2, delay: 4.5, duration: 11 },
      { x: '70%', y: '50%', size: 3, delay: 2.8, duration: 8 },
    ];
    return seed;
  }, []);

  // Headline split into words for staggered reveal
  const headlineWords = "India's Most Authentic Homemade Food Brand Is Arriving".split(' ');

  // Waitlist count animation
  const [waitlistCount, setWaitlistCount] = useState(0);
  const targetCount = 1278;

  useEffect(() => {
    let start = 0;
    const duration = 2000; // 2s
    const startTime = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out quad
      const eased = 1 - (1 - progress) * (1 - progress);
      start = Math.floor(eased * targetCount);
      setWaitlistCount(start);
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* ---- Video Background ---- */}
      <video 
        autoPlay 
        loop 
        muted 
        playsInline 
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/videos/hero-bg.mp4" type="video/mp4" />
      </video>

      {/* ---- Dark Overlay for readability ---- */}
      <div className="absolute inset-0 bg-gradient-to-b from-rich-black/60 via-rich-black/40 to-rich-black/80 z-0" />

      {/* ---- Subtle radial glow behind center content ---- */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
        <div className="w-[600px] h-[600px] md:w-[900px] md:h-[900px] rounded-full bg-mustard/5 blur-[120px]" />
      </div>

      {/* ---- Floating Particles ---- */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {particles.map((p, i) => (
          <FloatingParticle key={i} {...p} />
        ))}
      </div>

      {/* ---- MAIN CONTENT ---- */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center px-4 sm:px-6 py-32 md:py-0 w-full max-w-6xl mx-auto">

        {/* ---- Coming Soon Badge ---- */}
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mb-6 md:mb-8"
        >
          <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full border border-mustard/30 bg-mustard/10 backdrop-blur-sm animate-pulse-glow">
            <Sparkles size={14} className="text-mustard" />
            <span className="text-xs md:text-sm font-[family-name:var(--font-inter)] text-mustard tracking-[0.2em] uppercase font-medium">
              Coming Soon — August 2026
            </span>
            <Sparkles size={14} className="text-mustard" />
          </div>
        </motion.div>

        {/* ---- Main Headline (Staggered Word Reveal) ---- */}
        <h1 className="font-[family-name:var(--font-playfair-display)] text-4xl sm:text-5xl md:text-7xl lg:text-8xl text-cream font-bold max-w-5xl leading-[1.1] mb-6 md:mb-8">
          {headlineWords.map((word, index) => (
            <motion.span
              key={index}
              initial={{ opacity: 0, y: 40, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{
                delay: 0.5 + index * 0.08,
                duration: 0.6,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block mr-[0.3em]"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* ---- Subheadline ---- */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.3, duration: 0.7 }}
          className="font-[family-name:var(--font-poppins)] text-base sm:text-lg md:text-xl text-cream/70 max-w-2xl mb-10 md:mb-12 leading-relaxed"
        >
          Traditional recipes. Farm-fresh ingredients. No shortcuts. No compromises.
        </motion.p>

        {/* ---- CTA Buttons ---- */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.7 }}
          className="flex flex-col sm:flex-row items-center gap-4 mb-12 md:mb-16"
        >
          <motion.a
            href="#reserve"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-mustard text-rich-black font-bold px-8 py-4 rounded-full font-[family-name:var(--font-poppins)] text-base md:text-lg hover:shadow-[0_0_32px_rgba(212,160,23,0.4)] transition-shadow duration-300 w-full sm:w-auto text-center"
          >
            Join Early Access
          </motion.a>
          <motion.a
            href="#products"
            whileHover={{ scale: 1.05, backgroundColor: 'rgba(255, 249, 240, 0.1)' }}
            whileTap={{ scale: 0.95 }}
            className="border-2 border-cream/30 text-cream px-8 py-4 rounded-full font-[family-name:var(--font-poppins)] text-base md:text-lg transition-all duration-300 w-full sm:w-auto text-center"
          >
            Explore Products
          </motion.a>
        </motion.div>

        {/* ---- Waitlist Counter + Countdown Timer ---- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 2.0, duration: 0.7 }}
          className="flex flex-col items-center gap-6 mb-12 md:mb-16"
        >
          {/* Waitlist Members */}
          <div className="flex items-center gap-3">
            {/* Overlapping avatar dots */}
            <div className="flex -space-x-2">
              {['bg-mustard', 'bg-village-green', 'bg-amber-600', 'bg-mustard/80', 'bg-village-green/80'].map(
                (color, i) => (
                  <div
                    key={i}
                    className={`w-7 h-7 md:w-8 md:h-8 rounded-full ${color} border-2 border-rich-black flex items-center justify-center`}
                  >
                    <span className="text-[9px] font-bold text-rich-black font-[family-name:var(--font-inter)]">
                      {['P', 'R', 'A', 'S', 'M'][i]}
                    </span>
                  </div>
                )
              )}
            </div>
            <div className="text-left">
              <span className="block text-cream font-bold text-lg md:text-xl font-[family-name:var(--font-playfair-display)]">
                {waitlistCount.toLocaleString()}+
              </span>
              <span className="text-cream/50 text-xs font-[family-name:var(--font-inter)]">
                Waitlist Members
              </span>
            </div>
          </div>

          {/* Countdown Timer */}
          <div className="flex items-center gap-2 md:gap-3">
            <AnimatedDigit value={countdown.days} label="Days" />
            <span className="text-mustard/50 text-xl font-bold mt-[-16px]">:</span>
            <AnimatedDigit value={countdown.hours} label="Hours" />
            <span className="text-mustard/50 text-xl font-bold mt-[-16px]">:</span>
            <AnimatedDigit value={countdown.minutes} label="Min" />
            <span className="text-mustard/50 text-xl font-bold mt-[-16px]">:</span>
            <AnimatedDigit value={countdown.seconds} label="Sec" />
          </div>

          <p className="text-cream/30 text-xs font-[family-name:var(--font-inter)]">
            Until Independence Day Launch 🇮🇳
          </p>
        </motion.div>

        {/* ---- Social Proof Strip ---- */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.5, duration: 1 }}
          className="flex flex-col items-center gap-3"
        >
          {/* Separator line */}
          <div className="w-16 h-[1px] bg-gradient-to-r from-transparent via-mustard/40 to-transparent" />

          <div className="flex items-center gap-3">
            {/* Decorative dots representing cities */}
            <div className="flex items-center gap-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 2.6 + i * 0.1, duration: 0.3 }}
                  className="w-1.5 h-1.5 rounded-full bg-mustard/40"
                  style={{ opacity: 0.3 + (i * 0.1) }}
                />
              ))}
            </div>
            <p className="text-cream/40 text-xs md:text-sm font-[family-name:var(--font-inter)]">
              Trusted by families across{' '}
              <span className="text-mustard/70 font-medium">100+ cities</span> in India
            </p>
            <div className="flex items-center gap-1">
              {Array.from({ length: 7 }).map((_, i) => (
                <motion.div
                  key={i}
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 2.6 + (6 - i) * 0.1, duration: 0.3 }}
                  className="w-1.5 h-1.5 rounded-full bg-mustard/40"
                  style={{ opacity: 0.3 + ((6 - i) * 0.1) }}
                />
              ))}
            </div>
          </div>
        </motion.div>
      </div>

      {/* ---- Scroll-Down Indicator ---- */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3, duration: 1 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2"
      >
        <span className="text-cream/30 text-[10px] font-[family-name:var(--font-inter)] uppercase tracking-[0.25em]">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
        >
          <ChevronDown size={20} className="text-mustard/50" />
        </motion.div>
      </motion.div>

      {/* ---- Bottom gradient fade into next section ---- */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-rich-black to-transparent pointer-events-none" />
    </section>
  );
}
