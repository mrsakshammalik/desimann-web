'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MapPin, Check, Sun, X } from 'lucide-react';
import { INGREDIENTS, type Ingredient } from '@/lib/constants';

// ============================================================
// IngredientExplorer — Interactive ingredient discovery
// Circular ingredient icons expand to reveal rich detail panels
// ============================================================

export default function IngredientExplorer() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const selectedIngredient = INGREDIENTS.find((i) => i.id === selectedId) ?? null;

  return (
    <section className="relative overflow-hidden bg-cream section-padding">
      {/* ── Background texture ── */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg width=\'60\' height=\'60\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cpath d=\'M30 0L60 30L30 60L0 30Z\' fill=\'none\' stroke=\'%233B2416\' stroke-width=\'0.5\'/%3E%3C/svg%3E")',
        }}
      />

      {/* ── Decorative blurs ── */}
      <div className="bg-blur-circle absolute -right-20 top-20 h-72 w-72 bg-mustard/15" />
      <div className="bg-blur-circle absolute -left-20 bottom-20 h-64 w-64 bg-village-green/10" />

      <div className="relative z-10 mx-auto max-w-6xl">
        {/* ── Section Header ── */}
        <motion.div
          className="mb-16 text-center"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
        >
          <span className="mb-3 inline-block font-inter text-sm font-medium uppercase tracking-[0.25em] text-mustard">
            100% Transparent
          </span>
          <h2 className="heading-section text-4xl text-dark-brown md:text-5xl lg:text-6xl">
            Ingredient{' '}
            <span className="text-mustard">Transparency</span>
          </h2>
          <p className="text-body mx-auto mt-5 max-w-lg text-warm-gray">
            Click any ingredient to discover its story — where it comes from,
            who grows it, and why it&apos;s special.
          </p>
        </motion.div>

        {/* ── Ingredient Circles Grid ── */}
        <motion.div
          className="mb-8 grid grid-cols-3 justify-items-center gap-6 md:grid-cols-5 md:gap-8"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.1 } },
          }}
        >
          {INGREDIENTS.map((ingredient) => (
            <IngredientCircle
              key={ingredient.id}
              ingredient={ingredient}
              isSelected={selectedId === ingredient.id}
              onSelect={() =>
                setSelectedId((prev) =>
                  prev === ingredient.id ? null : ingredient.id
                )
              }
            />
          ))}
        </motion.div>

        {/* ── Expanded Detail Panel ── */}
        <AnimatePresence mode="wait">
          {selectedIngredient && (
            <IngredientDetail
              key={selectedIngredient.id}
              ingredient={selectedIngredient}
              onClose={() => setSelectedId(null)}
            />
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}

// ============================================================
// Circular Ingredient Selector
// ============================================================

interface CircleProps {
  ingredient: Ingredient;
  isSelected: boolean;
  onSelect: () => void;
}

function IngredientCircle({ ingredient, isSelected, onSelect }: CircleProps) {
  /** Map ingredient id → emoji for the circles */
  const emojiMap: Record<string, string> = {
    'mustard-seed': '🌿',
    'raw-mango': '🥭',
    lemon: '🍋',
    turmeric: '✨',
    garlic: '🧄',
  };

  return (
    <motion.button
      onClick={onSelect}
      className="group flex flex-col items-center gap-3"
      variants={{
        hidden: { opacity: 0, y: 20, scale: 0.8 },
        visible: { opacity: 1, y: 0, scale: 1 },
      }}
      transition={{ type: 'spring', stiffness: 300, damping: 25 }}
    >
      {/* Circle */}
      <motion.div
        className="relative flex h-20 w-20 items-center justify-center rounded-full text-3xl transition-shadow duration-300 md:h-24 md:w-24 md:text-4xl"
        style={{ backgroundColor: `${ingredient.color}20` }}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={
          isSelected
            ? {
                scale: 1.05,
                boxShadow: `0 0 30px ${ingredient.color}40`,
              }
            : {
                scale: 1,
                boxShadow: `0 0 0px ${ingredient.color}00`,
              }
        }
      >
        {/* Ring when selected */}
        <motion.div
          className="absolute inset-0 rounded-full"
          style={{ border: `2px solid ${ingredient.color}` }}
          initial={{ opacity: 0 }}
          animate={{ opacity: isSelected ? 1 : 0 }}
          transition={{ duration: 0.3 }}
        />

        <span>{emojiMap[ingredient.id] ?? '🌾'}</span>
      </motion.div>

      {/* Label */}
      <span
        className={`text-center font-inter text-xs font-medium transition-colors duration-300 md:text-sm ${
          isSelected ? 'text-dark-brown' : 'text-warm-gray'
        }`}
      >
        {ingredient.name}
      </span>
    </motion.button>
  );
}

// ============================================================
// Expanded Detail Panel
// ============================================================

interface DetailProps {
  ingredient: Ingredient;
  onClose: () => void;
}

function IngredientDetail({ ingredient, onClose }: DetailProps) {
  return (
    <motion.div
      className="relative mx-auto max-w-4xl overflow-hidden rounded-3xl border border-warm-gray/10 bg-white/80 shadow-2xl shadow-dark-brown/5 backdrop-blur-xl"
      initial={{ opacity: 0, y: 20, scale: 0.96 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10, scale: 0.98 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Gradient accent bar at top */}
      <div
        className="h-1.5 w-full"
        style={{
          background: `linear-gradient(90deg, ${ingredient.color}, ${ingredient.color}80, transparent)`,
        }}
      />

      {/* Close button */}
      <button
        onClick={onClose}
        className="absolute right-4 top-6 flex h-8 w-8 items-center justify-center rounded-full bg-dark-brown/5 text-warm-gray transition-all duration-200 hover:bg-dark-brown/10 hover:text-dark-brown"
        aria-label="Close ingredient detail"
      >
        <X size={16} />
      </button>

      <div className="grid gap-8 p-8 md:grid-cols-2 md:p-10">
        {/* ── Left Column: Header & Story ── */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
        >
          {/* Name with color accent */}
          <div className="mb-6">
            <div
              className="mb-3 inline-flex h-14 w-14 items-center justify-center rounded-2xl text-2xl"
              style={{ backgroundColor: `${ingredient.color}20` }}
            >
              {ingredient.id === 'mustard-seed' && '🌿'}
              {ingredient.id === 'raw-mango' && '🥭'}
              {ingredient.id === 'lemon' && '🍋'}
              {ingredient.id === 'turmeric' && '✨'}
              {ingredient.id === 'garlic' && '🧄'}
            </div>
            <h3 className="heading-section text-2xl text-dark-brown md:text-3xl">
              {ingredient.name}
            </h3>
          </div>

          {/* Source Region */}
          <div className="mb-5 flex items-start gap-3 rounded-xl bg-cream-dark/60 p-4">
            <MapPin size={18} className="mt-0.5 shrink-0 text-mustard" />
            <div>
              <span className="mb-0.5 block font-inter text-xs font-medium uppercase tracking-wider text-warm-gray">
                Source Region
              </span>
              <span className="font-poppins text-sm font-semibold text-dark-brown">
                {ingredient.sourceRegion}
              </span>
            </div>
          </div>

          {/* Harvest Season */}
          <div className="mb-6 flex items-start gap-3 rounded-xl bg-cream-dark/60 p-4">
            <Sun size={18} className="mt-0.5 shrink-0 text-mustard" />
            <div>
              <span className="mb-0.5 block font-inter text-xs font-medium uppercase tracking-wider text-warm-gray">
                Harvest Season
              </span>
              <span className="font-poppins text-sm font-semibold text-dark-brown">
                {ingredient.harvestSeason}
              </span>
            </div>
          </div>

          {/* Farmer Story */}
          <div>
            <h4 className="mb-2 font-playfair text-lg font-semibold text-dark-brown">
              Farmer&apos;s Story
            </h4>
            <p className="text-body text-sm leading-relaxed text-warm-gray">
              {ingredient.farmerStory}
            </p>
          </div>
        </motion.div>

        {/* ── Right Column: Benefits ── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.25, duration: 0.5 }}
        >
          <h4 className="mb-4 font-playfair text-lg font-semibold text-dark-brown">
            Health Benefits
          </h4>

          <div className="space-y-3">
            {ingredient.benefits.map((benefit, i) => (
              <motion.div
                key={benefit}
                className="flex items-center gap-3 rounded-xl border border-warm-gray/5 bg-cream-dark/40 p-4 transition-all duration-300 hover:border-mustard/20 hover:bg-cream-dark/70"
                initial={{ opacity: 0, x: 15 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08, duration: 0.4 }}
              >
                <div
                  className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full"
                  style={{ backgroundColor: `${ingredient.color}20` }}
                >
                  <Check size={14} style={{ color: ingredient.color }} />
                </div>
                <span className="font-poppins text-sm font-medium text-dark-brown">
                  {benefit}
                </span>
              </motion.div>
            ))}
          </div>

          {/* Quality badge */}
          <motion.div
            className="mt-8 rounded-2xl border border-mustard/15 bg-gradient-to-br from-mustard/5 to-mustard/10 p-5"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-mustard/15 text-lg">
                🏅
              </div>
              <div>
                <span className="block font-playfair text-sm font-bold text-dark-brown">
                  Quality Guaranteed
                </span>
                <span className="font-inter text-xs text-warm-gray">
                  Lab tested • No preservatives • 100% natural
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </motion.div>
  );
}
