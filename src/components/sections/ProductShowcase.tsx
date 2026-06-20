'use client';

// ============================================================
// DESIMANN.COM — PRODUCT SHOWCASE SECTION
// Immersive horizontal-scroll gallery with GSAP ScrollTrigger.
// Desktop: pinned horizontal scroll. Mobile: stacked vertical.
// ============================================================

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { motion } from 'motion/react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Clock, Bell, Sparkles } from 'lucide-react';
import { PRODUCTS, type Product } from '@/lib/constants';

gsap.registerPlugin(ScrollTrigger);

// ============================================================
// SINGLE PRODUCT CARD
// ============================================================

interface ProductCardProps {
  product: Product;
  index: number;
}

function ProductCard({ product, index }: ProductCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Compute the discount percentage
  const discount = Math.round(
    ((product.originalPrice - product.price) / product.originalPrice) * 100
  );

  return (
    <motion.div
      ref={cardRef}
      /* --- entrance animation (staggered per-card) --- */
      initial={{ opacity: 0, y: 60, scale: 0.92 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.7,
        delay: index * 0.08,
        ease: [0.22, 1, 0.36, 1],
      }}
      viewport={{ once: true, amount: 0.3 }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="product-card group relative flex-shrink-0 w-[320px] sm:w-[360px] lg:w-[400px]"
      style={{ perspective: '1200px' }}
    >
      {/* ---- Card shell ---- */}
      <motion.div
        animate={{
          y: isHovered ? -10 : 0,
          rotateY: isHovered ? 4 : 0,
          rotateX: isHovered ? -2 : 0,
        }}
        transition={{ type: 'spring', stiffness: 260, damping: 20 }}
        className="relative h-full rounded-2xl overflow-hidden border border-white/10
                   shadow-lg shadow-black/20 transition-shadow duration-500
                   group-hover:shadow-2xl group-hover:shadow-black/40"
        style={{
          background: `linear-gradient(165deg, ${product.color}22 0%, ${product.color}08 40%, #1a0f0a 100%)`,
        }}
      >
        {/* ---- Shelf-life badge ---- */}
        <div className="absolute top-4 right-4 z-10 flex items-center gap-1
                        rounded-full bg-white/10 backdrop-blur-md border border-white/10
                        px-3 py-1 text-xs font-inter text-cream/80">
          <Clock className="w-3 h-3" />
          {product.shelfLife}
        </div>

        {/* ---- Discount badge ---- */}
        <div className="absolute top-4 left-4 z-10 rounded-full bg-mustard/90
                        px-3 py-1 text-xs font-semibold font-inter text-rich-black">
          -{discount}%
        </div>

        {/* ---- Image area ---- */}
        <div
          className="relative mx-auto flex items-center justify-center pt-10 pb-4"
          style={{ height: '280px' }}
        >
          {/* Glow ring behind the image */}
          <div
            className="absolute inset-0 m-auto w-48 h-48 rounded-full blur-3xl opacity-30
                        transition-opacity duration-700 group-hover:opacity-50"
            style={{ background: product.color }}
          />

          <motion.div
            animate={{
              scale: isHovered ? 1.08 : 1,
              rotate: isHovered ? 3 : 0,
            }}
            transition={{ type: 'spring', stiffness: 200, damping: 14 }}
          >
            <Image
              src={product.image}
              alt={product.name}
              width={300}
              height={300}
              className="relative z-[1] object-contain drop-shadow-2xl"
              priority={index < 3}
            />
          </motion.div>
        </div>

        {/* ---- Card body ---- */}
        <div className="relative px-6 pb-6 space-y-4">
          {/* Name & tagline */}
          <div>
            <h3 className="font-playfair text-2xl font-bold text-cream leading-tight">
              {product.name}
            </h3>
            <p className="mt-1 font-poppins text-sm text-cream/60 leading-relaxed">
              {product.tagline}
            </p>
          </div>

          {/* Ingredient tags */}
          <div className="flex flex-wrap gap-1.5">
            {product.ingredients.slice(0, 4).map((ing) => (
              <span
                key={ing}
                className="rounded-full px-2.5 py-0.5 text-[10px] font-inter font-medium
                           text-cream/70 border border-white/10 bg-white/5 backdrop-blur-sm"
              >
                {ing}
              </span>
            ))}
            {product.ingredients.length > 4 && (
              <span className="rounded-full px-2.5 py-0.5 text-[10px] font-inter
                               font-medium text-cream/50">
                +{product.ingredients.length - 4} more
              </span>
            )}
          </div>

          {/* Divider */}
          <div className="h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />

          {/* Price + CTA */}
          <div className="flex items-center justify-between">
            <div className="flex items-baseline gap-2">
              <span className="font-poppins text-2xl font-bold text-mustard">
                ₹{product.price}
              </span>
              <span className="font-poppins text-sm text-cream/40 line-through">
                ₹{product.originalPrice}
              </span>
            </div>

            <button
              className="flex items-center gap-1.5 rounded-full bg-cream text-dark-brown
                         px-5 py-2 text-sm font-semibold font-poppins
                         transition-all duration-300
                         hover:bg-mustard hover:scale-105 hover:shadow-lg hover:shadow-mustard/20
                         active:scale-95"
            >
              <Bell className="w-3.5 h-3.5" />
              Notify Me
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ============================================================
// PRODUCT SHOWCASE SECTION (Main Export)
// ============================================================

export default function ProductShowcase() {
  const sectionRef = useRef<HTMLElement>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);
  const [isMobile, setIsMobile] = useState(false);

  // --- Responsive breakpoint detection ---
  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  // --- GSAP horizontal scroll (desktop only) ---
  useGSAP(
    () => {
      if (isMobile || !scrollContainerRef.current || !sectionRef.current) return;

      const container = scrollContainerRef.current;
      const totalScroll = container.scrollWidth - window.innerWidth;

      // Horizontal scroll tween
      const scrollTween = gsap.to(container, {
        x: () => -totalScroll,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          pin: true,
          scrub: 1,
          end: () => '+=' + container.scrollWidth,
          invalidateOnRefresh: true,
          // Progress bar update
          onUpdate: (self) => {
            if (progressRef.current) {
              progressRef.current.style.width = `${self.progress * 100}%`;
            }
          },
        },
      });

      // Staggered card entrance via GSAP (complements Framer viewport trigger)
      const cards = container.querySelectorAll('.product-card');
      cards.forEach((card, i) => {
        gsap.fromTo(
          card,
          { opacity: 0.4, y: 30 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            delay: i * 0.05,
            ease: 'power2.out',
            scrollTrigger: {
              trigger: card,
              containerAnimation: scrollTween,
              start: 'left 85%',
              toggleActions: 'play none none reverse',
            },
          }
        );
      });

      return () => {
        ScrollTrigger.getAll().forEach((st) => st.kill());
      };
    },
    { scope: sectionRef, dependencies: [isMobile] }
  );

  return (
    <section
      ref={sectionRef}
      id="products"
      className="relative bg-rich-black overflow-hidden"
    >
      {/* ============================================================
          SECTION HEADER
          ============================================================ */}
      <div className="relative z-10 pt-24 pb-12 lg:pb-16 text-center px-6">
        {/* Decorative sparkle */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mx-auto mb-5 flex items-center justify-center w-12 h-12
                     rounded-full bg-mustard/10 border border-mustard/20"
        >
          <Sparkles className="w-5 h-5 text-mustard" />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
          viewport={{ once: true }}
          className="font-playfair text-4xl sm:text-5xl lg:text-6xl font-bold text-cream"
        >
          Our Premium{' '}
          <span className="text-mustard">Collection</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.25 }}
          viewport={{ once: true }}
          className="mt-4 font-poppins text-base sm:text-lg text-cream/50 max-w-xl mx-auto"
        >
          Handcrafted with love, perfected over generations
        </motion.p>

        {/* Subtle horizontal rule */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          transition={{ duration: 0.8, delay: 0.35 }}
          viewport={{ once: true }}
          className="mt-6 mx-auto h-px w-24 bg-gradient-to-r from-transparent via-mustard/50 to-transparent origin-center"
        />
      </div>

      {/* ============================================================
          HORIZONTAL SCROLL CONTAINER (Desktop)
          ============================================================ */}
      {!isMobile && (
        <div className="relative">
          <div
            ref={scrollContainerRef}
            className="flex items-start gap-8 px-16 pb-28 pt-4 will-change-transform"
          >
            {PRODUCTS.map((product, index) => (
              <ProductCard key={product.id} product={product} index={index} />
            ))}

            {/* End spacer so last card has room */}
            <div className="flex-shrink-0 w-16" aria-hidden />
          </div>
        </div>
      )}

      {/* ============================================================
          VERTICAL SCROLL LAYOUT (Mobile / Tablet)
          ============================================================ */}
      {isMobile && (
        <div className="px-6 pb-20 grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {PRODUCTS.map((product, index) => (
            <ProductCard key={product.id} product={product} index={index} />
          ))}
        </div>
      )}

      {/* ============================================================
          PROGRESS BAR (Desktop only)
          ============================================================ */}
      {!isMobile && (
        <div className="fixed bottom-0 left-0 right-0 z-50 h-1 bg-white/5 pointer-events-none">
          <div
            ref={progressRef}
            className="h-full bg-gradient-to-r from-mustard via-mustard/80 to-village-green
                       rounded-r-full transition-[width] duration-75 ease-linear"
            style={{ width: '0%' }}
          />
        </div>
      )}

      {/* ============================================================
          AMBIENT BACKGROUND EFFECTS
          ============================================================ */}
      {/* Top fade */}
      <div className="pointer-events-none absolute inset-x-0 top-0 h-40
                      bg-gradient-to-b from-rich-black to-transparent z-[1]" />
      {/* Bottom fade */}
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-40
                      bg-gradient-to-t from-rich-black to-transparent z-[1]" />
      {/* Ambient glow orbs */}
      <div className="pointer-events-none absolute top-1/3 -left-40 w-[500px] h-[500px]
                      rounded-full bg-mustard/5 blur-[120px]" />
      <div className="pointer-events-none absolute bottom-1/4 -right-40 w-[600px] h-[600px]
                      rounded-full bg-village-green/5 blur-[150px]" />
    </section>
  );
}
