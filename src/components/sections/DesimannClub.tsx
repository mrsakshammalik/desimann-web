'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { VIP_BENEFITS } from '@/lib/constants';
import { Crown, Check } from 'lucide-react';

// ============================================================
// Animated gold particle / sparkle field
// ============================================================
function GoldParticles() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animationId: number;
    const particles: {
      x: number;
      y: number;
      size: number;
      speedY: number;
      speedX: number;
      opacity: number;
      fadeDir: number;
    }[] = [];

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };
    resize();
    window.addEventListener('resize', resize);

    // Seed particles
    for (let i = 0; i < 60; i++) {
      particles.push({
        x: Math.random() * canvas.width,
        y: Math.random() * canvas.height,
        size: Math.random() * 2.5 + 0.5,
        speedY: -(Math.random() * 0.4 + 0.1),
        speedX: (Math.random() - 0.5) * 0.3,
        opacity: Math.random() * 0.7 + 0.1,
        fadeDir: Math.random() > 0.5 ? 1 : -1,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particles) {
        p.x += p.speedX;
        p.y += p.speedY;
        p.opacity += p.fadeDir * 0.005;

        if (p.opacity >= 0.9) p.fadeDir = -1;
        if (p.opacity <= 0.05) p.fadeDir = 1;
        if (p.y < -10) {
          p.y = canvas.height + 10;
          p.x = Math.random() * canvas.width;
        }

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 160, 23, ${p.opacity})`;
        ctx.fill();

        // Glow
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 3, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(212, 160, 23, ${p.opacity * 0.15})`;
        ctx.fill();
      }

      animationId = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full pointer-events-none"
      style={{ zIndex: 1 }}
    />
  );
}

// ============================================================
// Benefit row with staggered check animation
// ============================================================
function BenefitRow({
  benefit,
  index,
}: {
  benefit: (typeof VIP_BENEFITS)[number];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, margin: '-40px' });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, x: -30 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.12, duration: 0.5, ease: 'easeOut' }}
      className="flex items-start gap-4 group"
    >
      {/* Animated check icon */}
      <motion.div
        initial={{ scale: 0, rotate: -180 }}
        animate={isInView ? { scale: 1, rotate: 0 } : {}}
        transition={{
          delay: index * 0.12 + 0.2,
          type: 'spring' as const,
          stiffness: 200,
          damping: 12,
        }}
        className="shrink-0 w-10 h-10 rounded-xl flex items-center justify-center mt-0.5"
        style={{
          background: 'linear-gradient(135deg, rgba(212,160,23,0.25), rgba(212,160,23,0.1))',
          border: '1px solid rgba(212,160,23,0.3)',
        }}
      >
        <Check className="w-5 h-5" style={{ color: '#D4A017' }} />
      </motion.div>

      {/* Text */}
      <div>
        <h4
          className="text-base font-semibold mb-0.5"
          style={{
            fontFamily: 'var(--font-poppins, "Poppins", sans-serif)',
            color: '#FFF9F0',
          }}
        >
          <span className="mr-2">{benefit.icon}</span>
          {benefit.title}
        </h4>
        <p
          className="text-sm leading-relaxed"
          style={{
            fontFamily: 'var(--font-inter, "Inter", sans-serif)',
            color: 'rgba(255,249,240,0.55)',
          }}
        >
          {benefit.description}
        </p>
      </div>
    </motion.div>
  );
}

// ============================================================
// Main Section
// ============================================================
export default function DesimannClub() {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <section
      id="founders-club"
      className="relative py-24 md:py-36 overflow-hidden"
      style={{
        background: 'linear-gradient(180deg, #3B2416 0%, #1A0F0A 100%)',
      }}
    >
      {/* Animated gold particles */}
      <GoldParticles />

      {/* Radial decorative glows */}
      <div className="absolute inset-0 pointer-events-none" style={{ zIndex: 0 }}>
        <div
          className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] rounded-full opacity-10 blur-[120px]"
          style={{ background: '#D4A017' }}
        />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, type: 'spring', stiffness: 150 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold tracking-widest mb-6"
            style={{
              background: 'rgba(212,160,23,0.1)',
              color: '#D4A017',
              border: '1px solid rgba(212,160,23,0.25)',
            }}
          >
            <Crown className="w-4 h-4" />
            EXCLUSIVE
          </motion.div>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5"
            style={{
              fontFamily: 'var(--font-playfair, "Playfair Display", serif)',
              color: '#D4A017',
            }}
          >
            Desimann Founders Club
          </h2>

          <p
            className="text-lg md:text-xl"
            style={{
              fontFamily: 'var(--font-poppins, "Poppins", sans-serif)',
              color: 'rgba(255,249,240,0.6)',
            }}
          >
            Exclusive membership for our earliest supporters
          </p>
        </motion.div>

        {/* Premium Membership Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          className="relative rounded-3xl p-8 md:p-10 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(212,160,23,0.12) 0%, rgba(59,36,22,0.9) 100%)',
            border: '1px solid rgba(212,160,23,0.3)',
          }}
        >
          {/* Holographic shimmer overlay */}
          <div
            className="absolute inset-0 rounded-3xl pointer-events-none transition-opacity duration-700"
            style={{
              opacity: isHovered ? 0.3 : 0,
              background:
                'linear-gradient(105deg, transparent 20%, rgba(212,160,23,0.15) 35%, rgba(255,249,240,0.08) 40%, rgba(212,160,23,0.15) 45%, transparent 60%)',
              backgroundSize: '200% 200%',
              animation: isHovered ? 'shimmer 2.5s ease-in-out infinite' : 'none',
            }}
          />

          {/* FOUNDERS EDITION Badge */}
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="relative inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold tracking-[0.2em] mb-8"
            style={{
              background: 'linear-gradient(135deg, #D4A017, #B8860B)',
              color: '#1A0F0A',
            }}
          >
            <Crown className="w-3.5 h-3.5" />
            FOUNDERS EDITION
          </motion.div>

          {/* Benefits Grid */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
            {VIP_BENEFITS.map((benefit, i) => (
              <BenefitRow key={benefit.title} benefit={benefit} index={i} />
            ))}
          </div>

          {/* CTA Button */}
          <motion.div
            className="relative text-center"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <motion.button
              whileHover={{
                scale: 1.04,
                boxShadow: '0 0 40px rgba(212,160,23,0.4)',
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => document.getElementById('reserve')?.scrollIntoView({ behavior: 'smooth' })}
              className="inline-flex items-center gap-3 px-8 md:px-10 py-4 md:py-5 rounded-2xl text-base md:text-lg font-bold cursor-pointer transition-all duration-300"
              style={{
                background: 'linear-gradient(135deg, #D4A017, #B8860B)',
                color: '#1A0F0A',
                fontFamily: 'var(--font-poppins, "Poppins", sans-serif)',
                boxShadow: '0 0 20px rgba(212,160,23,0.25)',
              }}
            >
              <Crown className="w-5 h-5" />
              Become a Founder Member — It&apos;s Free
            </motion.button>

            <p
              className="mt-4 text-xs"
              style={{ color: 'rgba(255,249,240,0.35)' }}
            >
              No credit card required • Cancel anytime
            </p>
          </motion.div>
        </motion.div>
      </div>

      {/* Shimmer keyframes */}
      <style jsx>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </section>
  );
}
