'use client';

import { motion } from 'motion/react';
import { Shield, CheckCircle } from 'lucide-react';
import { TRUST_BADGES } from '@/lib/constants';

// ============================================================
// TrustCenter — Trust & Certification Section
// Cream bg, spring-physics badge animations, verification strip
// ============================================================

/** Badge card spring animation variants */
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.12,
      delayChildren: 0.2,
    },
  },
};

const badgeVariants = {
  hidden: {
    opacity: 0,
    scale: 0,
  },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      type: 'spring' as const,
      damping: 12,
      stiffness: 150,
      mass: 0.8,
    },
  },
};

/** Subtle bounce keyframes for the emoji icon */
const iconBounce = {
  hidden: { y: 0, opacity: 0 },
  visible: {
    y: [8, -6, 3, -1, 0],
    opacity: 1,
    transition: {
      y: {
        times: [0, 0.3, 0.55, 0.78, 1],
        duration: 0.8,
        ease: 'easeOut' as const,
      },
      opacity: { duration: 0.3 },
    },
  },
};

export default function TrustCenter() {
  return (
    <section
      id="trust"
      className="relative overflow-hidden bg-cream py-24 md:py-32"
    >
      {/* ── Subtle background pattern ── */}
      <div className="pointer-events-none absolute inset-0 opacity-[0.03]">
        <div
          className="h-full w-full"
          style={{
            backgroundImage:
              'radial-gradient(circle at 1px 1px, #3B2416 1px, transparent 0)',
            backgroundSize: '32px 32px',
          }}
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
          {/* Icon badge */}
          <motion.div
            className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-village-green/10"
            initial={{ opacity: 0, rotate: -15, scale: 0.5 }}
            whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring' as const, damping: 10, stiffness: 100 }}
          >
            <Shield className="h-8 w-8 text-village-green" />
          </motion.div>

          <h2
            className="text-4xl font-bold text-dark-brown md:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
          >
            Trust &{' '}
            <span className="bg-gradient-to-r from-village-green to-emerald-600 bg-clip-text text-transparent">
              Quality
            </span>
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-lg text-warm-gray md:text-xl">
            Your safety is our obsession
          </p>

          {/* Decorative line */}
          <div className="mx-auto mt-8 flex items-center justify-center gap-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-village-green/40" />
            <div className="h-1.5 w-1.5 rotate-45 bg-village-green" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-village-green/40" />
          </div>
        </motion.div>

        {/* ── Trust Badge Cards ── */}
        <motion.div
          className="flex flex-wrap items-stretch justify-center gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-60px' }}
        >
          {TRUST_BADGES.map((badge) => (
            <motion.div
              key={badge.title}
              variants={badgeVariants}
              className="group relative w-full max-w-[260px] rounded-2xl border border-warm-gray/20 bg-white p-6 text-center shadow-md transition-all duration-300 hover:-translate-y-1 hover:border-village-green/30 hover:shadow-xl hover:shadow-village-green/5 sm:w-auto"
            >
              {/* Emoji icon with bounce-in */}
              <motion.span
                className="mb-4 block text-5xl"
                variants={iconBounce}
                role="img"
                aria-label={badge.title}
              >
                {badge.icon}
              </motion.span>

              {/* Title */}
              <h3
                className="mb-2 text-base font-bold text-dark-brown"
                style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
              >
                {badge.title}
              </h3>

              {/* Description */}
              <p className="mb-4 text-sm leading-relaxed text-warm-gray">
                {badge.description}
              </p>

              {/* Green checkmark indicator */}
              <div className="flex items-center justify-center gap-1.5">
                <CheckCircle className="h-4 w-4 text-village-green" />
                <span className="text-xs font-semibold text-village-green">
                  Verified
                </span>
              </div>

              {/* Subtle top accent border on hover */}
              <div className="absolute left-1/2 top-0 h-0.5 w-0 -translate-x-1/2 rounded-full bg-gradient-to-r from-village-green to-emerald-500 transition-all duration-500 group-hover:w-3/4" />
            </motion.div>
          ))}
        </motion.div>

        {/* ── Certification Strip ── */}
        <motion.div
          className="mt-16 md:mt-20"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          <div className="rounded-2xl border border-village-green/15 bg-gradient-to-r from-village-green/5 via-white to-village-green/5 px-6 py-8 md:px-12">
            {/* Certification logo placeholders */}
            <div className="mb-6 flex flex-wrap items-center justify-center gap-8">
              {['FSSAI', 'ISO 22000', 'HACCP', 'Organic India'].map((cert) => (
                <div
                  key={cert}
                  className="flex h-16 w-28 items-center justify-center rounded-xl border border-dashed border-warm-gray/30 bg-white/60 transition-all duration-300 hover:border-village-green/40 hover:bg-white"
                >
                  <span className="text-xs font-semibold text-warm-gray/70">
                    {cert}
                  </span>
                </div>
              ))}
            </div>

            {/* FSSAI License Info */}
            <div className="flex flex-col items-center justify-center gap-3 border-t border-warm-gray/15 pt-6 sm:flex-row">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-village-green">
                  <CheckCircle className="h-4 w-4 text-white" />
                </div>
                <span
                  className="text-sm font-bold tracking-wide text-dark-brown"
                  style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                >
                  FSSAI License No: XXXXXXXXXX
                </span>
              </div>
              <span className="rounded-full bg-village-green/10 px-3 py-1 text-xs font-semibold text-village-green">
                Licence Applied
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
