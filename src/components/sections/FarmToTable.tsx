'use client';

import { useRef, useState, useEffect } from 'react';
import { motion, useInView } from 'motion/react';
import { FARM_TO_TABLE_STEPS } from '@/lib/constants';

// ============================================================
// FarmToTable — Interactive 6-step journey visualization
// Dark section with horizontal path (desktop) / vertical (mobile)
// ============================================================

export default function FarmToTable() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });
  const [activeStep, setActiveStep] = useState<number | null>(null);

  // Auto-cycle through steps when section enters view
  useEffect(() => {
    if (!isInView) return;

    let step = 0;
    const interval = setInterval(() => {
      setActiveStep(step);
      step++;
      if (step >= FARM_TO_TABLE_STEPS.length) {
        clearInterval(interval);
      }
    }, 600);

    return () => clearInterval(interval);
  }, [isInView]);

  return (
    <section className="relative overflow-hidden bg-rich-black section-padding">
      {/* ── Floating particles background ── */}
      <FloatingParticles />

      {/* ── Subtle radial gradients ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/4 top-1/4 h-[500px] w-[500px] rounded-full bg-mustard/5 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-[400px] w-[400px] rounded-full bg-village-green/5 blur-[100px]" />
      </div>

      <div ref={sectionRef} className="relative z-10 mx-auto max-w-7xl">
        {/* ── Section Header ── */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
        >
          <span className="mb-3 inline-block font-inter text-sm font-medium uppercase tracking-[0.25em] text-mustard">
            The Journey
          </span>
          <h2 className="heading-section text-4xl text-cream md:text-5xl lg:text-6xl">
            Farm to Table{' '}
            <span className="text-mustard">Journey</span>
          </h2>
          <p className="text-body mx-auto mt-5 max-w-xl text-cream/60">
            Every Desimann product travels a carefully curated path from organic
            farms to your dining table.
          </p>
        </motion.div>

        {/* ── Desktop: Horizontal Path ── */}
        <div className="hidden lg:block">
          <div className="relative">
            {/* Connecting SVG path */}
            <svg
              className="absolute left-0 top-[60px] h-2 w-full"
              viewBox="0 0 1200 8"
              preserveAspectRatio="none"
            >
              {/* Dashed track */}
              <line
                x1="60"
                y1="4"
                x2="1140"
                y2="4"
                stroke="rgba(212,160,23,0.15)"
                strokeWidth="2"
                strokeDasharray="8 6"
              />
              {/* Animated progress line */}
              <motion.line
                x1="60"
                y1="4"
                x2="1140"
                y2="4"
                stroke="#D4A017"
                strokeWidth="2"
                initial={{ pathLength: 0 }}
                animate={isInView ? { pathLength: 1 } : { pathLength: 0 }}
                transition={{ duration: 2, ease: 'easeInOut', delay: 0.3 }}
              />
            </svg>

            {/* Steps */}
            <div className="grid grid-cols-6 gap-4">
              {FARM_TO_TABLE_STEPS.map((step, index) => (
                <DesktopStepNode
                  key={step.step}
                  step={step}
                  index={index}
                  isActive={activeStep !== null && activeStep >= index}
                  isHighlighted={activeStep === index}
                />
              ))}
            </div>
          </div>
        </div>

        {/* ── Mobile / Tablet: Vertical Path ── */}
        <div className="lg:hidden">
          <div className="relative pl-12">
            {/* Vertical connecting line */}
            <div className="absolute left-5 top-0 h-full w-px bg-mustard/15" />
            <motion.div
              className="absolute left-5 top-0 w-px origin-top bg-gradient-to-b from-mustard to-mustard-light"
              initial={{ scaleY: 0 }}
              animate={isInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 2, ease: 'easeInOut' }}
              style={{ height: '100%' }}
            />

            <div className="space-y-10">
              {FARM_TO_TABLE_STEPS.map((step, index) => (
                <MobileStepNode
                  key={step.step}
                  step={step}
                  index={index}
                  isActive={activeStep !== null && activeStep >= index}
                  isHighlighted={activeStep === index}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Desktop Step Node
// ============================================================

interface StepNodeProps {
  step: (typeof FARM_TO_TABLE_STEPS)[number];
  index: number;
  isActive: boolean;
  isHighlighted: boolean;
}

function DesktopStepNode({ step, index, isActive, isHighlighted }: StepNodeProps) {
  return (
    <motion.div
      className="flex flex-col items-center text-center"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{
        duration: 0.6,
        delay: index * 0.15,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* Icon circle */}
      <motion.div
        className={`relative mb-6 flex h-20 w-20 items-center justify-center rounded-full text-4xl transition-all duration-500 ${
          isActive
            ? 'bg-mustard/20 shadow-lg shadow-mustard/20'
            : 'bg-cream/5'
        }`}
        animate={
          isHighlighted
            ? { scale: [1, 1.1, 1], boxShadow: ['0 0 0px rgba(212,160,23,0)', '0 0 30px rgba(212,160,23,0.4)', '0 0 15px rgba(212,160,23,0.2)'] }
            : {}
        }
        transition={{ duration: 0.8 }}
      >
        {/* Outer ring */}
        <div
          className={`absolute inset-0 rounded-full border-2 transition-all duration-500 ${
            isActive ? 'border-mustard/40' : 'border-cream/10'
          }`}
        />
        <span>{step.icon}</span>
      </motion.div>

      {/* Step number */}
      <span
        className={`mb-2 font-inter text-xs font-semibold uppercase tracking-widest transition-colors duration-300 ${
          isActive ? 'text-mustard' : 'text-cream/30'
        }`}
      >
        Step {step.step}
      </span>

      {/* Title */}
      <h3
        className={`heading-section mb-2 text-base transition-colors duration-300 ${
          isActive ? 'text-cream' : 'text-cream/40'
        }`}
      >
        {step.title}
      </h3>

      {/* Description */}
      <p
        className={`text-body text-xs leading-relaxed transition-colors duration-300 ${
          isActive ? 'text-cream/70' : 'text-cream/25'
        }`}
      >
        {step.description}
      </p>
    </motion.div>
  );
}

// ============================================================
// Mobile Step Node
// ============================================================

function MobileStepNode({ step, index, isActive, isHighlighted }: StepNodeProps) {
  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      {/* Dot on the vertical line */}
      <motion.div
        className={`absolute -left-12 top-2 flex h-10 w-10 -translate-x-1/2 items-center justify-center rounded-full text-xl transition-all duration-500 ${
          isActive
            ? 'bg-mustard/20 shadow-md shadow-mustard/20'
            : 'bg-cream/5'
        }`}
        style={{ left: '-28px' }}
        animate={
          isHighlighted
            ? { scale: [1, 1.15, 1] }
            : {}
        }
        transition={{ duration: 0.6 }}
      >
        <div
          className={`absolute inset-0 rounded-full border-2 transition-colors duration-500 ${
            isActive ? 'border-mustard/50' : 'border-cream/10'
          }`}
        />
        <span>{step.icon}</span>
      </motion.div>

      {/* Content card */}
      <div
        className={`rounded-xl border p-5 backdrop-blur-sm transition-all duration-500 ${
          isActive
            ? 'border-mustard/20 bg-white/5'
            : 'border-cream/5 bg-white/[0.02]'
        }`}
      >
        <span
          className={`mb-1 block font-inter text-xs font-semibold uppercase tracking-widest transition-colors duration-300 ${
            isActive ? 'text-mustard' : 'text-cream/30'
          }`}
        >
          Step {step.step}
        </span>
        <h3
          className={`heading-section mb-1 text-lg transition-colors duration-300 ${
            isActive ? 'text-cream' : 'text-cream/40'
          }`}
        >
          {step.title}
        </h3>
        <p
          className={`text-body text-sm leading-relaxed transition-colors duration-300 ${
            isActive ? 'text-cream/70' : 'text-cream/25'
          }`}
        >
          {step.description}
        </p>
      </div>
    </motion.div>
  );
}

// ============================================================
// Floating Particles (subtle background decoration)
// ============================================================

function FloatingParticles() {
  const [particles, setParticles] = useState<Array<{ id: number; left: string; top: string; size: number; delay: number; duration: number }>>([]);

  useEffect(() => {
    setParticles(Array.from({ length: 20 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      delay: Math.random() * 5,
      duration: Math.random() * 4 + 6,
    })));
  }, []);

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full bg-mustard/20"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
          }}
          animate={{
            y: [0, -30, 0],
            x: [0, 10, -10, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: p.duration,
            repeat: Infinity,
            delay: p.delay,
            ease: 'easeInOut',
          }}
        />
      ))}
    </div>
  );
}
