'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';
import { TIMELINE_EVENTS } from '@/lib/constants';

// ============================================================
// StoryTimeline — "From Village Kitchens To Modern Homes"
// Premium animated vertical timeline with scroll-driven line
// ============================================================

/** Direction helpers for alternating cards */
const isLeft = (index: number) => index % 2 === 0;

export default function StoryTimeline() {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll progress drives the glowing timeline line
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  });

  // Parallax for the decorative background circles
  const bgY1 = useTransform(scrollYProgress, [0, 1], [0, -120]);
  const bgY2 = useTransform(scrollYProgress, [0, 1], [0, 80]);

  return (
    <section
      ref={sectionRef}
      id="story"
      className="relative bg-cream overflow-hidden section-padding"
    >
      {/* ── Subtle texture overlay ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width=\'40\' height=\'40\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M0 0h40v40H0z\' fill=\'none\'/%3E%3Ccircle cx=\'20\' cy=\'20\' r=\'1\' fill=\'%233B2416\'/%3E%3C/svg%3E")',
        }}
      />

      {/* ── Parallax decorative blurs ── */}
      <motion.div
        style={{ y: bgY1 }}
        className="bg-blur-circle absolute -left-40 top-20 h-80 w-80 bg-mustard/20"
      />
      <motion.div
        style={{ y: bgY2 }}
        className="bg-blur-circle absolute -right-32 bottom-40 h-96 w-96 bg-village-green/15"
      />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* ── Section Header ── */}
        <motion.div
          className="mb-20 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="mb-3 inline-block font-inter text-sm font-medium uppercase tracking-[0.25em] text-mustard">
            Our Heritage
          </span>
          <h2 className="heading-section text-4xl text-dark-brown md:text-5xl lg:text-6xl">
            From Village Kitchens
            <br />
            <span className="text-mustard">To Modern Homes</span>
          </h2>
          <p className="text-body mx-auto mt-5 max-w-xl text-warm-gray">
            A journey spanning four generations, preserving the authentic taste
            of India&apos;s culinary heritage.
          </p>
        </motion.div>

        {/* ── Timeline Container ── */}
        <div className="relative">
          {/* ── Center Vertical Line (static track) ── */}
          <div className="absolute left-6 top-0 h-full w-0.5 bg-mustard/10 md:left-1/2 md:-translate-x-1/2" />

          {/* ── Glowing scroll-driven line ── */}
          <motion.div
            className="absolute left-6 top-0 w-0.5 origin-top bg-gradient-to-b from-mustard via-mustard-light to-mustard md:left-1/2 md:-translate-x-1/2"
            style={{ scaleY: scrollYProgress, height: '100%' }}
          >
            {/* Glow tip at the bottom of the drawn line */}
            <div className="absolute -bottom-1 left-1/2 h-4 w-4 -translate-x-1/2 rounded-full bg-mustard blur-md" />
          </motion.div>

          {/* ── Timeline Events ── */}
          <div className="relative space-y-16 md:space-y-24">
            {TIMELINE_EVENTS.map((event, index) => (
              <TimelineCard
                key={event.year}
                event={event}
                index={index}
                left={isLeft(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ============================================================
// Individual Timeline Event Card
// ============================================================

interface TimelineCardProps {
  event: (typeof TIMELINE_EVENTS)[number];
  index: number;
  left: boolean;
}

function TimelineCard({ event, index, left }: TimelineCardProps) {
  return (
    <div
      className={`relative flex items-center ${
        left ? 'md:flex-row' : 'md:flex-row-reverse'
      }`}
    >
      {/* ── Timeline Dot ── */}
      <motion.div
        className="absolute left-6 z-20 flex h-6 w-6 -translate-x-1/2 items-center justify-center rounded-full border-4 border-cream bg-mustard shadow-lg shadow-mustard/30 md:left-1/2"
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true, amount: 0.8 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20, delay: 0.2 }}
      >
        {/* Inner pulse ring */}
        <div className="absolute h-10 w-10 animate-ping rounded-full bg-mustard/20" />
      </motion.div>

      {/* ── Spacer for the other side (desktop) ── */}
      <div className="hidden w-1/2 md:block" />

      {/* ── Card ── */}
      <motion.div
        className={`ml-14 w-full md:ml-0 md:w-1/2 ${
          left ? 'md:pr-16' : 'md:pl-16'
        }`}
        initial={{
          opacity: 0,
          x: left ? -60 : 60,
        }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{
          duration: 0.7,
          ease: [0.22, 1, 0.36, 1],
          delay: index * 0.1,
        }}
      >
        <div className="group relative rounded-2xl border border-warm-gray/10 bg-white/80 p-8 shadow-lg backdrop-blur-md transition-all duration-500 hover:shadow-xl hover:shadow-mustard/10">
          {/* Large faded year watermark */}
          <span
            className={`pointer-events-none absolute top-4 font-playfair text-7xl font-bold leading-none text-mustard/10 select-none ${
              left ? 'right-6' : 'left-6'
            }`}
          >
            {event.year}
          </span>

          {/* Icon */}
          <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-mustard/10 text-3xl transition-transform duration-300 group-hover:scale-110">
            {event.icon}
          </div>

          {/* Year badge */}
          <span className="mb-2 inline-block rounded-full bg-mustard/10 px-3 py-1 font-inter text-xs font-semibold tracking-wider text-mustard">
            {event.year}
          </span>

          {/* Title */}
          <h3 className="heading-section mb-3 text-xl text-dark-brown lg:text-2xl">
            {event.title}
          </h3>

          {/* Description */}
          <p className="text-body text-sm leading-relaxed text-warm-gray">
            {event.description}
          </p>

          {/* Decorative corner accent */}
          <div
            className={`absolute bottom-0 h-1 w-16 rounded-full bg-gradient-to-r from-mustard to-mustard-light transition-all duration-500 group-hover:w-24 ${
              left ? 'left-8' : 'right-8'
            }`}
          />
        </div>
      </motion.div>
    </div>
  );
}
