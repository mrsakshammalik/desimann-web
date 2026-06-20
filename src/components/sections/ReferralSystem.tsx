'use client';

import { useRef, useState } from 'react';
import { motion, useInView } from 'motion/react';
import { REFERRAL_TIERS } from '@/lib/constants';
import { Copy, Check, Gift, Trophy } from 'lucide-react';

// ============================================================
// Milestone node on the progress path
// ============================================================
function Milestone({
  tier,
  index,
  total,
  isInView,
}: {
  tier: (typeof REFERRAL_TIERS)[number];
  index: number;
  total: number;
  isInView: boolean;
}) {
  const isLast = index === total - 1;

  return (
    <div className="flex flex-col items-center relative" style={{ flex: 1 }}>
      {/* Connector line (except on last) */}
      {!isLast && (
        <motion.div
          className="absolute top-6 left-[50%] h-1 rounded-full"
          style={{
            width: '100%',
            background: 'rgba(255,249,240,0.08)',
            zIndex: 0,
          }}
        >
          <motion.div
            className="h-full rounded-full"
            initial={{ width: 0 }}
            animate={isInView ? { width: '100%' } : {}}
            transition={{
              delay: index * 0.35 + 0.3,
              duration: 0.6,
              ease: 'easeOut',
            }}
            style={{
              background: 'linear-gradient(90deg, #D4A017, #4C7A34)',
            }}
          />
        </motion.div>
      )}

      {/* Node circle */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={isInView ? { scale: 1, opacity: 1 } : {}}
        transition={{
          delay: index * 0.35,
          type: 'spring' as const,
          stiffness: 200,
          damping: 12,
        }}
        className="relative z-10 w-12 h-12 md:w-14 md:h-14 rounded-full flex items-center justify-center mb-3"
        style={{
          background: 'linear-gradient(135deg, rgba(212,160,23,0.25), rgba(76,122,52,0.2))',
          border: '2px solid rgba(212,160,23,0.5)',
          boxShadow: isInView
            ? `0 0 20px rgba(212,160,23,${0.15 + index * 0.05})`
            : 'none',
        }}
      >
        <span className="text-xl md:text-2xl">{tier.icon}</span>
        {/* Glow ring animation */}
        <motion.div
          className="absolute inset-0 rounded-full"
          initial={{ opacity: 0 }}
          animate={
            isInView
              ? {
                  opacity: [0, 0.5, 0],
                  scale: [1, 1.4, 1.6],
                }
              : {}
          }
          transition={{
            delay: index * 0.35 + 0.1,
            duration: 1.2,
            ease: 'easeOut',
          }}
          style={{
            border: '2px solid rgba(212,160,23,0.4)',
          }}
        />
      </motion.div>

      {/* Referral count */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.35 + 0.15, duration: 0.4 }}
        className="text-xs md:text-sm font-bold mb-1"
        style={{
          color: '#D4A017',
          fontFamily: 'var(--font-poppins, "Poppins", sans-serif)',
        }}
      >
        {tier.referrals} {tier.referrals === 1 ? 'Referral' : 'Referrals'}
      </motion.p>

      {/* Reward */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: index * 0.35 + 0.25, duration: 0.4 }}
        className="text-xs md:text-sm text-center font-medium"
        style={{
          color: 'rgba(255,249,240,0.7)',
          fontFamily: 'var(--font-inter, "Inter", sans-serif)',
        }}
      >
        {tier.reward}
      </motion.p>
    </div>
  );
}

// ============================================================
// Leaderboard mock data
// ============================================================
const leaderboard = [
  { rank: 1, name: 'Raj S.', referrals: 47, badge: '👑' },
  { rank: 2, name: 'Priya M.', referrals: 38, badge: '' },
  { rank: 3, name: 'Arjun K.', referrals: 31, badge: '' },
];

// ============================================================
// Main Component
// ============================================================
export default function ReferralSystem() {
  const [copied, setCopied] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const milestoneRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(milestoneRef, { once: true, margin: '-80px' });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText('desimann.com/ref/YOUR_CODE');
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="referral"
      className="relative py-24 md:py-32 overflow-hidden"
      style={{ background: '#1A0F0A' }}
    >
      {/* Decorative glows */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 left-1/4 w-[500px] h-[500px] rounded-full opacity-[0.06] blur-[120px]"
          style={{ background: '#D4A017' }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full opacity-[0.04] blur-[100px]"
          style={{ background: '#4C7A34' }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full text-sm font-semibold tracking-widest mb-6"
            style={{
              background: 'rgba(212,160,23,0.1)',
              color: '#D4A017',
              border: '1px solid rgba(212,160,23,0.25)',
            }}
          >
            <Gift className="w-4 h-4" />
            REFER & EARN
          </motion.div>

          <h2
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-5"
            style={{
              fontFamily: 'var(--font-playfair, "Playfair Display", serif)',
              color: '#FFF9F0',
            }}
          >
            Refer & Earn Rewards
          </h2>

          <p
            className="text-lg md:text-xl max-w-xl mx-auto"
            style={{
              fontFamily: 'var(--font-poppins, "Poppins", sans-serif)',
              color: 'rgba(255,249,240,0.55)',
            }}
          >
            Share the love, earn amazing rewards
          </p>
        </motion.div>

        {/* Milestone Progress Path */}
        <div ref={milestoneRef} className="mb-16">
          <div className="flex items-start justify-between max-w-3xl mx-auto">
            {REFERRAL_TIERS.map((tier, i) => (
              <Milestone
                key={tier.referrals}
                tier={tier}
                index={i}
                total={REFERRAL_TIERS.length}
                isInView={isInView}
              />
            ))}
          </div>
        </div>

        {/* Referral Link Box & Leaderboard in a row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl mx-auto">
          {/* Referral Link Box */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="rounded-2xl p-6"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,249,240,0.08)',
            }}
          >
            <h3
              className="text-base font-semibold mb-4"
              style={{
                color: '#FFF9F0',
                fontFamily: 'var(--font-poppins, "Poppins", sans-serif)',
              }}
            >
              Your Referral Link
            </h3>

            <div className="flex items-center gap-2">
              <div
                className="flex-1 rounded-xl px-4 py-3 text-sm truncate"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,249,240,0.08)',
                  color: 'rgba(255,249,240,0.6)',
                  fontFamily: 'var(--font-mono, "Geist Mono", monospace)',
                }}
              >
                desimann.com/ref/YOUR_CODE
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={handleCopy}
                className="shrink-0 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold cursor-pointer transition-all duration-300"
                style={{
                  background: copied
                    ? 'rgba(76,122,52,0.3)'
                    : 'linear-gradient(135deg, rgba(212,160,23,0.3), rgba(212,160,23,0.15))',
                  border: `1px solid ${copied ? 'rgba(76,122,52,0.5)' : 'rgba(212,160,23,0.3)'}`,
                  color: copied ? '#4C7A34' : '#D4A017',
                }}
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy</span>
                  </>
                )}
              </motion.button>
            </div>

            <p
              className="mt-3 text-xs"
              style={{ color: 'rgba(255,249,240,0.3)' }}
            >
              Share this link with friends to earn rewards
            </p>
          </motion.div>

          {/* Leaderboard Preview */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.35, duration: 0.6 }}
            className="rounded-2xl p-6"
            style={{
              background: 'rgba(255,255,255,0.04)',
              border: '1px solid rgba(255,249,240,0.08)',
            }}
          >
            <div className="flex items-center gap-2 mb-5">
              <Trophy className="w-4 h-4" style={{ color: '#D4A017' }} />
              <h3
                className="text-base font-semibold"
                style={{
                  color: '#FFF9F0',
                  fontFamily: 'var(--font-poppins, "Poppins", sans-serif)',
                }}
              >
                Top Referrers
              </h3>
            </div>

            <div className="space-y-3">
              {leaderboard.map((entry, i) => (
                <motion.div
                  key={entry.rank}
                  initial={{ opacity: 0, x: -15 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.4 + i * 0.1, duration: 0.4 }}
                  className="flex items-center gap-3 rounded-xl px-4 py-3 transition-colors duration-200"
                  style={{
                    background:
                      i === 0
                        ? 'rgba(212,160,23,0.08)'
                        : 'rgba(255,255,255,0.02)',
                    border:
                      i === 0
                        ? '1px solid rgba(212,160,23,0.15)'
                        : '1px solid transparent',
                  }}
                >
                  {/* Rank */}
                  <span
                    className="w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold"
                    style={{
                      background:
                        i === 0
                          ? 'linear-gradient(135deg, #D4A017, #B8860B)'
                          : i === 1
                          ? 'rgba(192,192,192,0.2)'
                          : 'rgba(205,127,50,0.15)',
                      color:
                        i === 0 ? '#1A0F0A' : i === 1 ? '#C0C0C0' : '#CD7F32',
                    }}
                  >
                    #{entry.rank}
                  </span>

                  {/* Name */}
                  <span
                    className="flex-1 text-sm font-medium"
                    style={{
                      color: '#FFF9F0',
                      fontFamily: 'var(--font-poppins, "Poppins", sans-serif)',
                    }}
                  >
                    {entry.name} {entry.badge}
                  </span>

                  {/* Referrals */}
                  <span
                    className="text-xs font-medium"
                    style={{
                      color: 'rgba(255,249,240,0.5)',
                      fontFamily: 'var(--font-inter, "Inter", sans-serif)',
                    }}
                  >
                    {entry.referrals} referrals
                  </span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
