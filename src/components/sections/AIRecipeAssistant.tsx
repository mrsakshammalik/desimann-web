'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Sparkles, Bot, User, ChefHat } from 'lucide-react';

// ============================================================
// Mock chat data
// ============================================================
const recipeSuggestions = [
  { name: 'Pickle Paratha', emoji: '🫓' },
  { name: 'Pickle Rice', emoji: '🍚' },
  { name: 'Pickle Sandwich', emoji: '🥪' },
];

// ============================================================
// Typewriter-animated text
// ============================================================
function TypewriterText({ text, delay = 0, speed = 30 }: { text: string; delay?: number; speed?: number }) {
  const [displayedText, setDisplayedText] = useState('');
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const timeout = setTimeout(() => setStarted(true), delay);
    return () => clearTimeout(timeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;
    let index = 0;
    const interval = setInterval(() => {
      if (index < text.length) {
        setDisplayedText(text.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [started, text, speed]);

  return <>{displayedText}</>;
}

// ============================================================
// Sparkle dots around the chat container
// ============================================================
function SparkleGlow() {
  return (
    <div className="absolute -inset-4 pointer-events-none" style={{ zIndex: 0 }}>
      {/* Corner sparkles */}
      {[
        { top: '-8px', left: '-8px' },
        { top: '-8px', right: '-8px' },
        { bottom: '-8px', left: '-8px' },
        { bottom: '-8px', right: '-8px' },
        { top: '20%', left: '-12px' },
        { top: '60%', right: '-12px' },
        { bottom: '30%', left: '-10px' },
        { top: '40%', right: '-10px' },
      ].map((pos, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            ...pos,
            background: '#D4A017',
            boxShadow: '0 0 8px rgba(212,160,23,0.6)',
          }}
          animate={{
            opacity: [0.2, 0.9, 0.2],
            scale: [0.8, 1.3, 0.8],
          }}
          transition={{
            duration: 2 + i * 0.3,
            repeat: Infinity,
            ease: 'easeInOut',
            delay: i * 0.4,
          }}
        />
      ))}
    </div>
  );
}

// ============================================================
// Main Component
// ============================================================
export default function AIRecipeAssistant() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [showUserMsg, setShowUserMsg] = useState(false);
  const [showAIMsg, setShowAIMsg] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [hasTriggered, setHasTriggered] = useState(false);

  // Trigger the chat animation sequence when section comes into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasTriggered) {
          setHasTriggered(true);
          // Staggered reveal
          setTimeout(() => setShowUserMsg(true), 600);
          setTimeout(() => setShowAIMsg(true), 2200);
          setTimeout(() => setShowSuggestions(true), 3800);
        }
      },
      { threshold: 0.3 }
    );

    const el = sectionRef.current;
    if (el) observer.observe(el);
    return () => {
      if (el) observer.unobserve(el);
    };
  }, [hasTriggered]);

  return (
    <section
      ref={sectionRef}
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: '#FFF9F0' }}
    >
      {/* Subtle radial glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] rounded-full opacity-[0.06] blur-[100px]"
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
          {/* COMING SOON badge with pulse */}
          <motion.div
            animate={{
              boxShadow: [
                '0 0 0 0 rgba(212,160,23,0.4)',
                '0 0 0 12px rgba(212,160,23,0)',
                '0 0 0 0 rgba(212,160,23,0)',
              ],
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-bold tracking-widest mb-6"
            style={{
              background: 'linear-gradient(135deg, rgba(212,160,23,0.15), rgba(212,160,23,0.08))',
              color: '#D4A017',
              border: '1px solid rgba(212,160,23,0.3)',
            }}
          >
            <Sparkles className="w-4 h-4" />
            COMING SOON
          </motion.div>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5"
            style={{
              fontFamily: 'var(--font-playfair, "Playfair Display", serif)',
              color: '#3B2416',
            }}
          >
            AI Recipe Assistant
          </h2>

          <p
            className="text-lg md:text-xl max-w-xl mx-auto"
            style={{
              fontFamily: 'var(--font-poppins, "Poppins", sans-serif)',
              color: '#6B5744',
            }}
          >
            Coming Soon — Your personal cooking companion
          </p>
        </motion.div>

        {/* Chat Interface Mockup */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-60px' }}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="relative max-w-lg mx-auto"
        >
          {/* Sparkle glow effect around container */}
          <SparkleGlow />

          {/* Chat container */}
          <div
            className="relative rounded-2xl p-6 md:p-8 overflow-hidden"
            style={{
              background: '#1A0F0A',
              border: '1px solid rgba(212,160,23,0.15)',
              boxShadow: '0 24px 60px rgba(26,15,10,0.5), 0 0 40px rgba(212,160,23,0.05)',
              zIndex: 1,
            }}
          >
            {/* Chat header */}
            <div className="flex items-center gap-3 mb-6 pb-4" style={{ borderBottom: '1px solid rgba(255,249,240,0.08)' }}>
              <div
                className="w-9 h-9 rounded-xl flex items-center justify-center"
                style={{ background: 'linear-gradient(135deg, rgba(212,160,23,0.3), rgba(212,160,23,0.1))' }}
              >
                <ChefHat className="w-5 h-5" style={{ color: '#D4A017' }} />
              </div>
              <div>
                <p className="text-sm font-semibold" style={{ color: '#FFF9F0', fontFamily: 'var(--font-poppins, "Poppins", sans-serif)' }}>
                  Desimann AI
                </p>
                <p className="text-xs" style={{ color: 'rgba(255,249,240,0.4)' }}>
                  Always ready to help
                </p>
              </div>
              <div className="ml-auto flex items-center gap-1.5">
                <div className="w-2 h-2 rounded-full animate-pulse" style={{ background: '#25D366' }} />
                <span className="text-xs" style={{ color: 'rgba(255,249,240,0.4)' }}>Online</span>
              </div>
            </div>

            {/* Chat messages area */}
            <div className="space-y-5 min-h-[260px]">
              {/* User message */}
              <AnimatePresence>
                {showUserMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="flex items-start gap-3 justify-end"
                  >
                    <div
                      className="rounded-2xl rounded-tr-sm px-4 py-3 max-w-[85%]"
                      style={{
                        background: 'rgba(212,160,23,0.15)',
                        border: '1px solid rgba(212,160,23,0.15)',
                      }}
                    >
                      <p
                        className="text-sm leading-relaxed"
                        style={{ color: '#FFF9F0', fontFamily: 'var(--font-poppins, "Poppins", sans-serif)' }}
                      >
                        <TypewriterText
                          text="What can I cook with mango pickle?"
                          delay={200}
                          speed={35}
                        />
                      </p>
                    </div>
                    <div
                      className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: 'rgba(212,160,23,0.2)' }}
                    >
                      <User className="w-4 h-4" style={{ color: '#D4A017' }} />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* AI response */}
              <AnimatePresence>
                {showAIMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ duration: 0.4, ease: 'easeOut' }}
                    className="flex items-start gap-3"
                  >
                    <div
                      className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                      style={{ background: 'linear-gradient(135deg, rgba(212,160,23,0.3), rgba(76,122,52,0.2))' }}
                    >
                      <Bot className="w-4 h-4" style={{ color: '#D4A017' }} />
                    </div>
                    <div className="max-w-[85%] space-y-3">
                      <div
                        className="rounded-2xl rounded-tl-sm px-4 py-3"
                        style={{
                          background: 'rgba(255,255,255,0.07)',
                          border: '1px solid rgba(255,255,255,0.05)',
                        }}
                      >
                        <p
                          className="text-sm leading-relaxed"
                          style={{ color: '#FFF9F0', fontFamily: 'var(--font-poppins, "Poppins", sans-serif)' }}
                        >
                          <TypewriterText
                            text="Here are some delicious ideas using Desimann Mango Pickle! 🥭✨"
                            delay={200}
                            speed={25}
                          />
                        </p>
                      </div>

                      {/* Recipe suggestion cards */}
                      <AnimatePresence>
                        {showSuggestions && (
                          <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            transition={{ duration: 0.4 }}
                            className="flex flex-wrap gap-2"
                          >
                            {recipeSuggestions.map((recipe, i) => (
                              <motion.div
                                key={recipe.name}
                                initial={{ opacity: 0, y: 10, scale: 0.9 }}
                                animate={{ opacity: 1, y: 0, scale: 1 }}
                                transition={{
                                  delay: i * 0.15,
                                  duration: 0.35,
                                  ease: 'easeOut',
                                }}
                                className="group flex items-center gap-2 px-3 py-2 rounded-xl cursor-pointer transition-all duration-200"
                                style={{
                                  background: 'rgba(255,255,255,0.05)',
                                  border: '1px solid rgba(212,160,23,0.15)',
                                }}
                              >
                                {/* Emoji placeholder for image */}
                                <span className="text-xl">{recipe.emoji}</span>
                                <span
                                  className="text-xs font-medium"
                                  style={{ color: 'rgba(255,249,240,0.8)', fontFamily: 'var(--font-poppins, "Poppins", sans-serif)' }}
                                >
                                  {recipe.name}
                                </span>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Input field with blinking cursor */}
            <div
              className="mt-6 flex items-center gap-3 rounded-xl px-4 py-3"
              style={{
                background: 'rgba(255,255,255,0.04)',
                border: '1px solid rgba(255,249,240,0.08)',
              }}
            >
              <Sparkles className="w-4 h-4 shrink-0" style={{ color: 'rgba(212,160,23,0.5)' }} />
              <div className="flex items-center flex-1">
                <span
                  className="text-sm"
                  style={{
                    color: 'rgba(255,249,240,0.3)',
                    fontFamily: 'var(--font-poppins, "Poppins", sans-serif)',
                  }}
                >
                  Ask Desimann AI...
                </span>
                <motion.span
                  className="inline-block w-0.5 h-4 ml-1 rounded-full"
                  style={{ background: '#D4A017' }}
                  animate={{ opacity: [1, 0, 1] }}
                  transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                />
              </div>
              <div
                className="shrink-0 w-8 h-8 rounded-lg flex items-center justify-center"
                style={{
                  background: 'linear-gradient(135deg, rgba(212,160,23,0.3), rgba(212,160,23,0.15))',
                }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#D4A017" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="22" y1="2" x2="11" y2="13" />
                  <polygon points="22 2 15 22 11 13 2 9 22 2" />
                </svg>
              </div>
            </div>
          </div>
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="text-center mt-10 text-sm"
          style={{
            fontFamily: 'var(--font-inter, "Inter", sans-serif)',
            color: '#9B8B7A',
          }}
        >
          Powered by AI — trained on 10,000+ authentic Indian recipes
        </motion.p>
      </div>
    </section>
  );
}
