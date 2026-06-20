'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { TESTIMONIALS } from '@/lib/constants';

// ============================================================
// CustomerWall — Testimonials / Review Carousel
// Rich-black bg, auto-scroll, glassmorphic cards, nav dots
// ============================================================

/** Returns how many visible cards depending on viewport width */
function useVisibleCount() {
  const [count, setCount] = useState(1);

  useEffect(() => {
    function update() {
      if (window.innerWidth >= 1024) setCount(3);
      else if (window.innerWidth >= 768) setCount(2);
      else setCount(1);
    }
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  return count;
}

/** Star rating component */
function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`text-sm ${i < rating ? 'text-mustard' : 'text-white/20'}`}
        >
          ★
        </span>
      ))}
    </div>
  );
}

export default function CustomerWall() {
  const visibleCount = useVisibleCount();
  const totalPages = Math.ceil(TESTIMONIALS.length / visibleCount);
  const [currentPage, setCurrentPage] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [direction, setDirection] = useState(1); // 1 = forward, -1 = back
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  /** Navigate to next page */
  const nextPage = useCallback(() => {
    setDirection(1);
    setCurrentPage((prev) => (prev + 1) % totalPages);
  }, [totalPages]);

  /** Navigate to a specific page via dots */
  const goToPage = useCallback(
    (page: number) => {
      setDirection(page > currentPage ? 1 : -1);
      setCurrentPage(page);
    },
    [currentPage],
  );

  /** Auto-scroll every 4 seconds, paused on hover */
  useEffect(() => {
    if (isPaused) return;

    intervalRef.current = setInterval(nextPage, 4000);
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPaused, nextPage]);

  /** Reset page if visibleCount changes so we don't overshoot */
  useEffect(() => {
    const timer = setTimeout(() => setCurrentPage(0), 0);
    return () => clearTimeout(timer);
  }, [visibleCount]);

  /** Get the current slice of testimonials to show */
  const startIdx = currentPage * visibleCount;
  const visibleTestimonials = TESTIMONIALS.slice(
    startIdx,
    startIdx + visibleCount,
  );

  /** Slide animation variants */
  const slideVariants = {
    enter: (d: number) => ({
      x: d > 0 ? 120 : -120,
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: {
        x: { type: 'spring' as const, stiffness: 200, damping: 25 },
        opacity: { duration: 0.4 },
      },
    },
    exit: (d: number) => ({
      x: d > 0 ? -120 : 120,
      opacity: 0,
      transition: {
        x: { type: 'spring' as const, stiffness: 200, damping: 25 },
        opacity: { duration: 0.3 },
      },
    }),
  };

  return (
    <section
      id="community"
      className="relative overflow-hidden bg-rich-black py-24 md:py-32"
    >
      {/* ── Background glow effects ── */}
      <div className="pointer-events-none absolute inset-0">
        <div
          className="absolute -left-40 top-1/4 h-[30rem] w-[30rem] rounded-full opacity-[0.08] blur-[140px]"
          style={{ background: '#D4A017' }}
        />
        <div
          className="absolute -right-32 bottom-1/4 h-96 w-96 rounded-full opacity-[0.06] blur-[120px]"
          style={{ background: '#4C7A34' }}
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
          {/* Label pill */}
          <motion.span
            className="mb-4 inline-block rounded-full border border-mustard/30 bg-mustard/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.2em] text-mustard"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            Testimonials
          </motion.span>

          <h2
            className="mt-4 text-4xl font-bold text-cream md:text-5xl lg:text-6xl"
            style={{ fontFamily: "var(--font-playfair), 'Playfair Display', Georgia, serif" }}
          >
            What Our{' '}
            <span className="bg-gradient-to-r from-mustard to-yellow-400 bg-clip-text text-transparent">
              Early Testers
            </span>{' '}
            Say
          </h2>

          <p className="mx-auto mt-5 max-w-lg text-lg text-cream/50 md:text-xl">
            Real people, real reviews, real love
          </p>

          {/* Decorative line */}
          <div className="mx-auto mt-8 flex items-center justify-center gap-2">
            <div className="h-px w-12 bg-gradient-to-r from-transparent to-mustard/50" />
            <div className="h-1.5 w-1.5 rotate-45 bg-mustard" />
            <div className="h-px w-12 bg-gradient-to-l from-transparent to-mustard/50" />
          </div>
        </motion.div>

        {/* ── Carousel ── */}
        <div
          className="relative min-h-[320px]"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          <AnimatePresence custom={direction} mode="wait">
            <motion.div
              key={currentPage}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="grid gap-6"
              style={{
                gridTemplateColumns: `repeat(${visibleCount}, minmax(0, 1fr))`,
              }}
            >
              {visibleTestimonials.map((testimonial) => (
                <div
                  key={testimonial.name}
                  className="group relative rounded-2xl border border-white/10 bg-white/5 p-6 backdrop-blur transition-all duration-300 hover:border-mustard/30 hover:bg-white/[0.08]"
                >
                  {/* Top row: avatar + name/location */}
                  <div className="mb-4 flex items-center gap-3">
                    {/* Avatar with initials */}
                    <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-mustard font-bold text-rich-black">
                      {testimonial.avatar}
                    </div>

                    <div className="min-w-0">
                      <h4
                        className="truncate font-bold text-cream"
                        style={{ fontFamily: "var(--font-poppins), 'Poppins', sans-serif" }}
                      >
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-cream/50">
                        {testimonial.location}
                      </p>
                    </div>
                  </div>

                  {/* Star rating */}
                  <div className="mb-3">
                    <StarRating rating={testimonial.rating} />
                  </div>

                  {/* Review text */}
                  <p className="mb-4 text-sm italic leading-relaxed text-cream/80">
                    &ldquo;{testimonial.text}&rdquo;
                  </p>

                  {/* Product badge pill */}
                  <div className="flex items-center">
                    <span className="inline-flex items-center gap-1 rounded-full border border-mustard/20 bg-mustard/10 px-3 py-1 text-xs font-medium text-mustard">
                      <span className="text-[10px]">🏷️</span>
                      {testimonial.product}
                    </span>
                  </div>

                  {/* Subtle corner quote decoration */}
                  <div className="absolute right-4 top-4 text-3xl font-bold leading-none text-white/[0.04]">
                    &ldquo;
                  </div>
                </div>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        {/* ── Navigation Dots ── */}
        <div className="mt-10 flex items-center justify-center gap-2">
          {Array.from({ length: totalPages }, (_, i) => (
            <button
              key={i}
              onClick={() => goToPage(i)}
              aria-label={`Go to page ${i + 1}`}
              className={`h-2.5 rounded-full transition-all duration-300 ${
                i === currentPage
                  ? 'w-8 bg-mustard'
                  : 'w-2.5 bg-white/20 hover:bg-white/40'
              }`}
            />
          ))}
        </div>

        {/* ── Trust indicator ── */}
        <motion.p
          className="mt-8 text-center text-xs text-cream/30"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8 }}
        >
          All reviews from verified early-access testers • Names used with permission
        </motion.p>
      </div>
    </section>
  );
}
