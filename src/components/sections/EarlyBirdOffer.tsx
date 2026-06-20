'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'motion/react';
import { Sparkles, Zap, Truck, Package, Crown, Clock } from 'lucide-react';

// ============================================================
// EARLY BIRD OFFER — Urgency-Driven Offer Section
// ============================================================

const TOTAL_SPOTS = 500;
const REMAINING_SPOTS = 347;
const CLAIMED_SPOTS = TOTAL_SPOTS - REMAINING_SPOTS;

const BENEFITS = [
  { icon: Zap, label: '20% OFF', sublabel: 'On All Products', highlight: true },
  { icon: Truck, label: 'Free Shipping', sublabel: 'Pan-India Delivery' },
  { icon: Package, label: 'Founder Edition', sublabel: 'Premium Packaging' },
  { icon: Crown, label: 'Exclusive Member', sublabel: 'VIP Access Forever' },
  { icon: Clock, label: 'Priority Delivery', sublabel: 'Ships First, Always' },
];

/** Animated number counter that counts up from 0 to `target` */
function AnimatedCounter({ target, duration = 2 }: { target: number; duration?: number }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-50px' });

  useEffect(() => {
    if (!isInView) return;
    let start = 0;
    const step = target / (duration * 60); // ~60fps
    const timer = setInterval(() => {
      start += step;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [isInView, target, duration]);

  return <span ref={ref}>{count}</span>;
}

export default function EarlyBirdOffer() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(135deg, #D4A017 0%, #a67c10 35%, #5a3a1a 70%, #3B2416 100%)',
      }}
    >
      {/* Pulsing border effect */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          animate={{
            boxShadow: [
              'inset 0 0 0 2px rgba(212,160,23,0.2)',
              'inset 0 0 0 4px rgba(212,160,23,0.4)',
              'inset 0 0 0 2px rgba(212,160,23,0.2)',
            ],
          }}
          transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
          className="absolute inset-4 md:inset-8 rounded-3xl"
        />
      </div>

      {/* Floating decorative particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-2 h-2 rounded-full bg-cream/20"
            style={{
              left: `${15 + i * 15}%`,
              top: `${10 + (i % 3) * 30}%`,
            }}
            animate={{
              y: [0, -30, 0],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Infinity,
              delay: i * 0.4,
              ease: 'easeInOut',
            }}
          />
        ))}
      </div>

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* EARLY BIRD badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-md border border-white/20 rounded-full px-5 py-2.5 mb-8"
        >
          <Sparkles className="w-5 h-5 text-yellow-300" />
          <span className="text-cream font-semibold tracking-widest text-sm uppercase">
            Early Bird Offer
          </span>
          <Sparkles className="w-5 h-5 text-yellow-300" />
        </motion.div>

        {/* Main Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="font-[family-name:var(--font-playfair)] text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-cream mb-4 leading-tight"
        >
          First 500 Customers Get
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="text-cream/60 text-lg md:text-xl max-w-xl mx-auto mb-12"
        >
          Exclusive founding member benefits — once they&apos;re gone, they&apos;re gone.
        </motion.p>

        {/* Benefits Grid */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.4 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3 md:gap-4 mb-14 max-w-4xl mx-auto"
        >
          {BENEFITS.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <motion.div
                key={benefit.label}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className={`rounded-xl p-4 md:p-5 text-cream backdrop-blur-sm border transition-all cursor-default ${
                  benefit.highlight
                    ? 'bg-white/15 border-yellow-300/30 shadow-lg shadow-yellow-300/10'
                    : 'bg-white/10 border-white/10 hover:border-white/25'
                }`}
              >
                <Icon className={`w-7 h-7 mx-auto mb-2 ${benefit.highlight ? 'text-yellow-300' : 'text-cream/80'}`} />
                <p className={`font-bold text-lg md:text-xl ${benefit.highlight ? 'text-yellow-300' : ''}`}>
                  {benefit.label}
                </p>
                <p className="text-cream/50 text-xs mt-1">{benefit.sublabel}</p>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Animated Counter & Scarcity Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="max-w-lg mx-auto mb-10"
        >
          <div className="flex items-baseline justify-center gap-2 mb-4">
            <span className="font-[family-name:var(--font-playfair)] text-5xl md:text-6xl font-bold text-yellow-300">
              <AnimatedCounter target={REMAINING_SPOTS} duration={2.5} />
            </span>
            <span className="text-cream/60 text-lg">
              of {TOTAL_SPOTS} spots remaining
            </span>
          </div>

          {/* Progress / Scarcity Bar */}
          <div className="relative h-4 bg-white/10 rounded-full overflow-hidden backdrop-blur-sm">
            <motion.div
              initial={{ width: 0 }}
              animate={isInView ? { width: `${(CLAIMED_SPOTS / TOTAL_SPOTS) * 100}%` } : {}}
              transition={{ duration: 2, delay: 1, ease: 'easeOut' }}
              className="absolute inset-y-0 left-0 rounded-full"
              style={{
                background: 'linear-gradient(90deg, #D4A017, #FFC947, #D4A017)',
              }}
            />
            {/* Shimmer */}
            <motion.div
              animate={{ x: ['-100%', '200%'] }}
              transition={{ duration: 2, repeat: Infinity, delay: 3, repeatDelay: 3 }}
              className="absolute inset-y-0 w-1/3 bg-gradient-to-r from-transparent via-white/30 to-transparent"
            />
          </div>
          <p className="text-cream/40 text-sm mt-2">
            {CLAIMED_SPOTS} spots already claimed
          </p>
        </motion.div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 1 }}
        >
          <motion.a
            href="#reserve"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-3 bg-cream text-rich-black font-bold text-lg md:text-xl px-10 py-5 rounded-full shadow-2xl shadow-black/30 hover:shadow-yellow-300/20 transition-shadow cursor-pointer"
          >
            <Sparkles className="w-5 h-5 text-mustard" />
            Claim Your Spot Now
            <Sparkles className="w-5 h-5 text-mustard" />
          </motion.a>
        </motion.div>
      </div>
    </section>
  );
}
