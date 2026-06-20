'use client';

import { motion } from 'motion/react';
import { WHY_DESIMANN_FEATURES } from '@/lib/constants';

// ============================================================
// WhyDesimann — Premium Feature Cards Section
// Rich gradient bg, glassmorphic cards, staggered entrance
// ============================================================

/** Animation variants for staggered card entrance */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: {
    opacity: 0,
    y: 40,
    scale: 0.95,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: 'spring' as const,
      damping: 14,
      stiffness: 100,
    },
  },
};

export default function WhyDesimann() {
  return (
    <section
      id="why-desimann"
      className="relative overflow-hidden py-24 md:py-32"
      style={{
        background: 'linear-gradient(180deg, #3B2416 0%, #1A0F0A 40%, #1A0F0A 100%)',
      }}
    >
      {/* ── Floating Glow Effects ── */}
      <div className="pointer-events-none absolute inset-0">
        {/* Top-left mustard glow */}
        <div
          className="absolute -left-32 -top-32 h-96 w-96 rounded-full opacity-20 blur-[120px]"
          style={{ background: '#D4A017' }}
        />
        {/* Bottom-right green glow */}
        <div
          className="absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full opacity-15 blur-[140px]"
          style={{ background: '#4C7A34' }}
        />
        {/* Center subtle warm glow */}
        <div
          className="absolute left-1/2 top-1/2 h-[32rem] w-[32rem] -translate-x-1/2 -translate-y-1/2 rounded-full opacity-[0.07] blur-[160px]"
          style={{ background: '#D4A017' }}
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* ── Section Header ── */}
        <motion.div
          className="mb-16 text-center md:mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        >
          {/* Decorative label */}
          <motion.span
            className="mb-4 inline-block rounded-full border border-mustard/30 bg-mustard/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-mustard"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Our Promise
          </motion.span>

          <h2
            className="mt-4 text-4xl font-bold text-cream md:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
          >
            Why{' '}
            <span className="bg-gradient-to-r from-mustard to-yellow-400 bg-clip-text text-transparent">
              Desimann
            </span>
            ?
          </h2>

          <p className="mx-auto mt-5 max-w-xl text-lg text-cream/60 md:text-xl">
            Because your family deserves the best
          </p>

          {/* Decorative line */}
          <div className="mx-auto mt-8 flex items-center justify-center gap-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-mustard/50" />
            <div className="h-1.5 w-1.5 rotate-45 bg-mustard" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-mustard/50" />
          </div>
        </motion.div>

        {/* ── Feature Cards Grid ── */}
        <motion.div
          className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {WHY_DESIMANN_FEATURES.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={cardVariants}
              className="group relative rounded-2xl border border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all duration-300 hover:scale-[1.02] hover:border-mustard/50 hover:shadow-lg hover:shadow-mustard/10"
            >
              {/* Subtle gradient overlay that matches feature.gradient */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${feature.gradient} opacity-0 transition-opacity duration-300 group-hover:opacity-100`}
              />

              {/* Card content sits above the gradient overlay */}
              <div className="relative z-10">
                {/* Emoji icon with subtle glow on hover */}
                <div className="relative mb-4">
                  <span
                    className="block text-4xl transition-transform duration-300 group-hover:scale-110"
                    role="img"
                    aria-label={feature.title}
                  >
                    {feature.icon}
                  </span>
                  {/* Glow behind icon on hover */}
                  <div className="absolute -left-2 -top-2 h-12 w-12 rounded-full bg-mustard/0 blur-xl transition-all duration-500 group-hover:bg-mustard/20" />
                </div>

                {/* Title */}
                <h3
                  className="mb-3 text-xl font-bold text-cream"
                  style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                >
                  {feature.title}
                </h3>

                {/* Description */}
                <p className="text-sm leading-relaxed text-cream/70">
                  {feature.description}
                </p>

                {/* Bottom accent line — reveals on hover */}
                <div className="mt-6 h-0.5 w-0 rounded-full bg-gradient-to-r from-mustard to-mustard/0 transition-all duration-500 group-hover:w-full" />
              </div>

              {/* Corner decoration */}
              <div className="absolute right-4 top-4 h-8 w-8 rounded-full border border-white/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100">
                <div className="flex h-full w-full items-center justify-center text-xs text-mustard/60">
                  {String(index + 1).padStart(2, '0')}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
