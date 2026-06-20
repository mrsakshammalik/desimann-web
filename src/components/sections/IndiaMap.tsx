'use client';

import { useState } from 'react';
import { motion, AnimatePresence, useInView } from 'motion/react';
import { useRef } from 'react';
import { MapPin, ChevronRight, X } from 'lucide-react';
import { INDIA_STATES } from '@/lib/constants';

// ============================================================
// INDIA MAP — Interactive State Cards Section
// ============================================================

/** Get a unique color for each state based on index */
const STATE_COLORS = [
  { bg: 'bg-mustard/10', text: 'text-mustard', accent: '#D4A017' },
  { bg: 'bg-village-green/10', text: 'text-village-green', accent: '#4C7A34' },
  { bg: 'bg-amber-600/10', text: 'text-amber-700', accent: '#B45309' },
  { bg: 'bg-red-600/10', text: 'text-red-700', accent: '#B91C1C' },
  { bg: 'bg-emerald-600/10', text: 'text-emerald-700', accent: '#047857' },
  { bg: 'bg-yellow-500/10', text: 'text-yellow-600', accent: '#CA8A04' },
  { bg: 'bg-orange-500/10', text: 'text-orange-600', accent: '#EA580C' },
  { bg: 'bg-teal-600/10', text: 'text-teal-700', accent: '#0F766E' },
];

export default function IndiaMap() {
  const [selectedState, setSelectedState] = useState<string | null>(null);
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' });

  const selectedData = INDIA_STATES.find((s) => s.id === selectedState);

  return (
    <section ref={sectionRef} className="bg-cream py-20 md:py-28 overflow-hidden relative">
      {/* Decorative background: subtle India text */}
      <div className="absolute inset-0 flex items-center justify-center pointer-events-none select-none overflow-hidden">
        <span
          className="font-[family-name:var(--font-playfair)] text-[12rem] md:text-[20rem] lg:text-[28rem] font-bold text-dark-brown/[0.03] leading-none"
          aria-hidden="true"
        >
          भारत
        </span>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-14"
        >
          <div className="inline-flex items-center gap-2 bg-village-green/10 rounded-full px-4 py-2 mb-6">
            <MapPin className="w-4 h-4 text-village-green" />
            <span className="text-village-green text-sm font-medium">Sourced Across India</span>
          </div>
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl font-bold text-dark-brown mb-4">
            Across India, From Farm to You
          </h2>
          <p className="text-warm-gray text-lg max-w-2xl mx-auto">
            Every ingredient has a story, a region, and a farmer behind it. Discover where your food comes from.
          </p>
        </motion.div>

        {/* Content Layout: Grid + Detail Panel */}
        <div className="grid lg:grid-cols-3 gap-8">
          {/* State Cards Grid */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {INDIA_STATES.map((state, i) => {
                const colors = STATE_COLORS[i % STATE_COLORS.length];
                const isSelected = selectedState === state.id;

                return (
                  <motion.div
                    key={state.id}
                    initial={{ opacity: 0, y: 30 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 0.5, delay: 0.15 + i * 0.08 }}
                    whileHover={{ y: -4 }}
                    onClick={() => setSelectedState(isSelected ? null : state.id)}
                    className={`bg-white rounded-xl p-5 border cursor-pointer transition-all duration-300 group ${
                      isSelected
                        ? 'border-mustard shadow-lg shadow-mustard/10 ring-1 ring-mustard/20'
                        : 'border-warm-gray/20 hover:border-mustard hover:shadow-lg'
                    }`}
                  >
                    {/* State Abbreviation Circle */}
                    <div
                      className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm mb-3 transition-all ${
                        isSelected
                          ? 'bg-mustard text-white'
                          : `${colors.bg} ${colors.text} group-hover:scale-110`
                      }`}
                    >
                      {state.id}
                    </div>

                    {/* State Name */}
                    <p className="font-bold text-dark-brown text-sm mb-1 leading-tight">
                      {state.name}
                    </p>

                    {/* Product */}
                    <p className="text-mustard text-xs font-medium">{state.product}</p>

                    {/* Expand indicator on mobile */}
                    <div className="flex items-center gap-1 mt-2 lg:hidden">
                      <span className="text-warm-gray/50 text-[11px]">
                        {isSelected ? 'Hide details' : 'View details'}
                      </span>
                      <ChevronRight
                        className={`w-3 h-3 text-warm-gray/50 transition-transform ${
                          isSelected ? 'rotate-90' : ''
                        }`}
                      />
                    </div>

                    {/* Mobile Expanded Details (inline) */}
                    <AnimatePresence>
                      {isSelected && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.3 }}
                          className="overflow-hidden lg:hidden"
                        >
                          <div className="pt-3 mt-3 border-t border-warm-gray/10">
                            <p className="text-xs text-village-green font-medium mb-1">
                              {state.ingredient}
                            </p>
                            <p className="text-warm-gray text-xs leading-relaxed">
                              {state.story}
                            </p>
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Desktop Detail Panel (sidebar) */}
          <div className="hidden lg:block">
            <AnimatePresence mode="wait">
              {selectedData ? (
                <motion.div
                  key={selectedData.id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 30 }}
                  transition={{ duration: 0.4 }}
                  className="sticky top-24 bg-white rounded-2xl p-6 border border-warm-gray/20 shadow-lg"
                >
                  {/* Close button */}
                  <button
                    onClick={() => setSelectedState(null)}
                    className="absolute top-4 right-4 w-8 h-8 rounded-full bg-warm-gray/10 hover:bg-warm-gray/20 flex items-center justify-center transition-colors cursor-pointer"
                  >
                    <X className="w-4 h-4 text-warm-gray" />
                  </button>

                  {/* State badge */}
                  <div className="w-14 h-14 rounded-full bg-mustard/10 flex items-center justify-center font-bold text-lg text-mustard mb-5">
                    {selectedData.id}
                  </div>

                  <h3 className="font-[family-name:var(--font-playfair)] text-2xl font-bold text-dark-brown mb-1">
                    {selectedData.name}
                  </h3>
                  <p className="text-mustard font-semibold text-sm mb-4">
                    {selectedData.product}
                  </p>

                  <div className="space-y-4">
                    <div>
                      <p className="text-xs text-warm-gray/60 uppercase tracking-wider font-medium mb-1">
                        Key Ingredient
                      </p>
                      <p className="text-village-green font-semibold">
                        {selectedData.ingredient}
                      </p>
                    </div>

                    <div>
                      <p className="text-xs text-warm-gray/60 uppercase tracking-wider font-medium mb-1">
                        The Story
                      </p>
                      <p className="text-warm-gray text-sm leading-relaxed">
                        {selectedData.story}
                      </p>
                    </div>
                  </div>

                  {/* Decorative bottom bar */}
                  <div className="mt-6 pt-4 border-t border-warm-gray/10 flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-mustard" />
                    <span className="text-xs text-warm-gray/60">
                      Sourced with love from {selectedData.name}
                    </span>
                  </div>
                </motion.div>
              ) : (
                <motion.div
                  key="placeholder"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="sticky top-24 bg-white/50 backdrop-blur-sm rounded-2xl p-8 border border-dashed border-warm-gray/20 text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-mustard/10 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-mustard/50" />
                  </div>
                  <p className="text-warm-gray/60 text-sm">
                    Click on a state card to discover the story behind each ingredient
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
