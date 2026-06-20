'use client';

import { motion } from 'motion/react';
import { SOCIAL_LINKS } from '@/lib/constants';

// ============================================================
// Platform-specific SVG icons (since lucide-react doesn't have
// brand icons for WhatsApp, Telegram, etc.)
// ============================================================
const SocialIcons: Record<string, React.FC<{ className?: string }>> = {
  whatsapp: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
    </svg>
  ),
  instagram: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zM12 0C8.741 0 8.333.014 7.053.072 2.695.272.273 2.69.073 7.052.014 8.333 0 8.741 0 12c0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98C8.333 23.986 8.741 24 12 24c3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98C15.668.014 15.259 0 12 0zm0 5.838a6.162 6.162 0 100 12.324 6.162 6.162 0 000-12.324zM12 16a4 4 0 110-8 4 4 0 010 8zm6.406-11.845a1.44 1.44 0 100 2.881 1.44 1.44 0 000-2.881z" />
    </svg>
  ),
  facebook: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z" />
    </svg>
  ),
  youtube: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M23.498 6.186a3.016 3.016 0 00-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 00.502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 002.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 002.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
    </svg>
  ),
  telegram: ({ className }) => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className}>
      <path d="M11.944 0A12 12 0 000 12a12 12 0 0012 12 12 12 0 0012-12A12 12 0 0012 0 12 12 0 0011.944 0zm4.962 7.224c.1-.002.321.023.465.14a.506.506 0 01.171.325c.016.093.036.306.02.472-.18 1.898-.962 6.502-1.36 8.627-.168.9-.499 1.201-.82 1.23-.696.065-1.225-.46-1.9-.902-1.056-.693-1.653-1.124-2.678-1.8-1.185-.78-.417-1.21.258-1.91.177-.184 3.247-2.977 3.307-3.23.007-.032.014-.15-.056-.212s-.174-.041-.249-.024c-.106.024-1.793 1.14-5.061 3.345-.479.33-.913.49-1.302.48-.428-.008-1.252-.241-1.865-.44-.752-.245-1.349-.374-1.297-.789.027-.216.325-.437.893-.663 3.498-1.524 5.83-2.529 6.998-3.014 3.332-1.386 4.025-1.627 4.476-1.635z" />
    </svg>
  ),
};

// Platform-specific color configs
const platformStyles: Record<
  string,
  { bg: string; border: string; shadow: string; buttonBg: string; iconBg: string }
> = {
  whatsapp: {
    bg: 'rgba(37, 211, 102, 0.08)',
    border: 'rgba(37, 211, 102, 0.25)',
    shadow: '0 8px 32px rgba(37, 211, 102, 0.2)',
    buttonBg: '#25D366',
    iconBg: 'rgba(37, 211, 102, 0.15)',
  },
  instagram: {
    bg: 'rgba(225, 48, 108, 0.08)',
    border: 'rgba(225, 48, 108, 0.25)',
    shadow: '0 8px 32px rgba(225, 48, 108, 0.2)',
    buttonBg: 'linear-gradient(135deg, #833AB4, #E1306C, #F77737)',
    iconBg: 'rgba(225, 48, 108, 0.15)',
  },
  facebook: {
    bg: 'rgba(24, 119, 242, 0.08)',
    border: 'rgba(24, 119, 242, 0.25)',
    shadow: '0 8px 32px rgba(24, 119, 242, 0.2)',
    buttonBg: '#1877F2',
    iconBg: 'rgba(24, 119, 242, 0.15)',
  },
  youtube: {
    bg: 'rgba(255, 0, 0, 0.06)',
    border: 'rgba(255, 0, 0, 0.2)',
    shadow: '0 8px 32px rgba(255, 0, 0, 0.15)',
    buttonBg: '#FF0000',
    iconBg: 'rgba(255, 0, 0, 0.12)',
  },
  telegram: {
    bg: 'rgba(0, 136, 204, 0.08)',
    border: 'rgba(0, 136, 204, 0.25)',
    shadow: '0 8px 32px rgba(0, 136, 204, 0.2)',
    buttonBg: '#0088CC',
    iconBg: 'rgba(0, 136, 204, 0.15)',
  },
};

const platformColors: Record<string, string> = {
  whatsapp: '#25D366',
  instagram: '#E1306C',
  facebook: '#1877F2',
  youtube: '#FF0000',
  telegram: '#0088CC',
};

// ============================================================
// Container animation variants for staggered children
// ============================================================
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.12, delayChildren: 0.2 },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.9 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { type: 'spring' as const, stiffness: 120, damping: 14 },
  },
};

export default function CommunitySection() {
  return (
    <section
      id="community"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #FFF9F0 0%, rgba(212,160,23,0.08) 100%)',
      }}
    >
      {/* Decorative floating circles */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-20 blur-3xl"
          style={{ background: '#D4A017' }}
        />
        <div
          className="absolute -bottom-32 -right-20 w-96 h-96 rounded-full opacity-15 blur-3xl"
          style={{ background: '#4C7A34' }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-block px-5 py-2 rounded-full text-sm font-semibold tracking-wide mb-6"
            style={{
              background: 'rgba(212,160,23,0.12)',
              color: '#D4A017',
              border: '1px solid rgba(212,160,23,0.25)',
            }}
          >
            🤝 COMMUNITY
          </motion.span>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5"
            style={{ fontFamily: 'var(--font-playfair, "Playfair Display", serif)', color: '#3B2416' }}
          >
            Join The Desimann Family
          </h2>

          <p
            className="text-lg md:text-xl max-w-2xl mx-auto"
            style={{ fontFamily: 'var(--font-poppins, "Poppins", sans-serif)', color: '#6B5744' }}
          >
            Be part of India&apos;s fastest-growing food community
          </p>
        </motion.div>

        {/* Social Platform Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
          className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5 md:gap-6"
        >
          {SOCIAL_LINKS.map((platform) => {
            const style = platformStyles[platform.icon] ?? platformStyles.whatsapp;
            const color = platformColors[platform.icon] ?? '#D4A017';
            const IconComponent = SocialIcons[platform.icon];

            return (
              <motion.a
                key={platform.name}
                href={platform.href}
                target="_blank"
                rel="noopener noreferrer"
                variants={cardVariants}
                whileHover={{
                  scale: 1.06,
                  boxShadow: style.shadow,
                  transition: { type: 'spring' as const, stiffness: 300, damping: 15 },
                }}
                whileTap={{ scale: 0.97 }}
                className="group relative rounded-2xl p-6 text-center cursor-pointer backdrop-blur-sm transition-colors duration-300"
                style={{
                  background: style.bg,
                  border: `1px solid ${style.border}`,
                }}
              >
                {/* Hover glow overlay */}
                <div
                  className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at center, ${color}10, transparent 70%)`,
                  }}
                />

                {/* Icon */}
                <div
                  className="relative mx-auto w-14 h-14 rounded-xl flex items-center justify-center mb-4 transition-transform duration-300 group-hover:scale-110"
                  style={{ background: style.iconBg }}
                >
                  {IconComponent && (
                    <IconComponent className="w-7 h-7" />
                  )}
                  <style jsx>{`
                    div svg { color: ${color}; }
                  `}</style>
                </div>

                {/* Platform Name */}
                <h3
                  className="relative text-base font-bold mb-1"
                  style={{
                    fontFamily: 'var(--font-poppins, "Poppins", sans-serif)',
                    color: '#3B2416',
                  }}
                >
                  {platform.name}
                </h3>

                {/* Member Count */}
                <p
                  className="relative text-sm font-medium mb-4"
                  style={{ color }}
                >
                  {platform.members} members
                </p>

                {/* Join Button */}
                <div
                  className="relative inline-flex items-center justify-center px-5 py-2 rounded-full text-white text-sm font-semibold transition-all duration-300 group-hover:shadow-lg"
                  style={{
                    background: style.buttonBg,
                  }}
                >
                  Join
                </div>
              </motion.a>
            );
          })}
        </motion.div>

        {/* Bottom tagline */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-12 text-sm"
          style={{
            fontFamily: 'var(--font-inter, "Inter", sans-serif)',
            color: '#9B8B7A',
          }}
        >
          Join 13,000+ food lovers who trust Desimann for authentic Indian flavors
        </motion.p>
      </div>
    </section>
  );
}
