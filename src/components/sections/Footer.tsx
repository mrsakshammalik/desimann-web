'use client';

import { useState } from 'react';
import { motion } from 'motion/react';
import {
  Camera,
  Share2,
  Video,
  Send,
  Phone,
  Mail,
  ArrowRight,
  Heart,
  MessageCircle,
} from 'lucide-react';
import { SITE_CONFIG, NAV_LINKS, SOCIAL_LINKS } from '@/lib/constants';
import { subscribeToNewsletter } from '@/app/actions/newsletter';

// ============================================================
// FOOTER — Premium Footer Component
// ============================================================

const LEGAL_LINKS = [
  { label: 'Privacy Policy', href: '/legal/privacy' },
  { label: 'Terms of Service', href: '/legal/terms' },
  { label: 'Refund Policy', href: '/legal/refund' },
  { label: 'Shipping Info', href: '/legal/shipping' },
];

/** Map social icon names to Lucide components */
const socialIconMap: Record<string, React.FC<React.SVGProps<SVGSVGElement>>> = {
  whatsapp: MessageCircle,
  instagram: Camera,
  facebook: Share2,
  youtube: Video,
  telegram: Send,
};

export default function Footer() {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    
    try {
      const result = await subscribeToNewsletter(email);
      if (result.success) {
        setIsSubscribed(true);
        setTimeout(() => {
          setIsSubscribed(false);
          setEmail('');
        }, 3000);
      } else {
        alert(result.error);
      }
    } catch (err) {
      alert("Something went wrong");
    }
  };

  return (
    <footer className="bg-rich-black">
      {/* Subtle Top Border */}
      <div className="border-t border-white/10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* ——— Top Section: Logo & Tagline ——— */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-14"
        >
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl font-bold text-mustard mb-3">
            Desimann
          </h2>
          <p className="text-cream/50 text-lg font-[family-name:var(--font-playfair)] italic">
            {SITE_CONFIG.tagline}
          </p>
          <p className="text-cream/30 text-sm mt-2 max-w-md mx-auto">
            {SITE_CONFIG.mission}
          </p>
        </motion.div>

        {/* ——— Three Columns ——— */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-8 mb-14">
          {/* Column 1: Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <h3 className="text-cream font-semibold text-sm uppercase tracking-wider mb-5">
              Quick Links
            </h3>
            <ul className="space-y-3">
              {NAV_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-cream/60 hover:text-mustard transition-colors text-sm inline-flex items-center gap-1 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 2: Legal */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <h3 className="text-cream font-semibold text-sm uppercase tracking-wider mb-5">
              Legal
            </h3>
            <ul className="space-y-3">
              {LEGAL_LINKS.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.href}
                    className="text-cream/60 hover:text-mustard transition-colors text-sm inline-flex items-center gap-1 group"
                  >
                    <ArrowRight className="w-3 h-3 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Column 3: Connect */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <h3 className="text-cream font-semibold text-sm uppercase tracking-wider mb-5">
              Connect
            </h3>

            {/* Social Media Icons */}
            <div className="flex items-center gap-3 mb-5">
              {SOCIAL_LINKS.map((social) => {
                const Icon = socialIconMap[social.icon] || Send;
                return (
                  <motion.a
                    key={social.name}
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    whileHover={{ scale: 1.15, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-10 h-10 rounded-full bg-white/5 border border-white/10 hover:border-mustard/50 hover:bg-mustard/10 flex items-center justify-center transition-all group"
                    title={social.name}
                  >
                    <Icon className="w-4 h-4 text-cream/60 group-hover:text-mustard transition-colors" />
                  </motion.a>
                );
              })}
            </div>

            {/* Contact Info */}
            <div className="space-y-2.5">
              <a
                href={`mailto:${SITE_CONFIG.email}`}
                className="flex items-center gap-2 text-cream/60 hover:text-mustard transition-colors text-sm"
              >
                <Mail className="w-4 h-4" />
                {SITE_CONFIG.email}
              </a>
              <a
                href={`tel:${SITE_CONFIG.phone.replace(/\s/g, '')}`}
                className="flex items-center gap-2 text-cream/60 hover:text-mustard transition-colors text-sm"
              >
                <Phone className="w-4 h-4" />
                {SITE_CONFIG.phone}
              </a>
            </div>
          </motion.div>
        </div>

        {/* ——— Newsletter Row ——— */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-6 md:p-8 mb-12"
        >
          <div className="md:flex items-center justify-between gap-6">
            <div className="mb-4 md:mb-0">
              <h4 className="text-cream font-semibold text-lg mb-1">
                Stay in the loop
              </h4>
              <p className="text-cream/40 text-sm">
                Get updates on new products, recipes, and exclusive offers.
              </p>
            </div>
            <form onSubmit={handleSubscribe} className="flex gap-2 flex-1 max-w-md">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-5 py-3 rounded-full bg-white/5 border border-white/15 text-cream placeholder:text-cream/30 focus:border-mustard focus:ring-1 focus:ring-mustard/30 outline-none transition text-sm"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="bg-mustard text-rich-black font-semibold px-6 py-3 rounded-full hover:shadow-lg hover:shadow-mustard/20 transition-shadow text-sm cursor-pointer whitespace-nowrap"
              >
                {isSubscribed ? '✓ Subscribed!' : 'Subscribe'}
              </motion.button>
            </form>
          </div>
        </motion.div>

        {/* ——— Bottom Bar ——— */}
        <div className="border-t border-white/10 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
            <p className="text-cream/40 text-sm">
              © 2026 Desimann. All rights reserved.
            </p>

            <p className="text-cream/40 text-sm flex items-center gap-1">
              Made with <Heart className="w-3.5 h-3.5 text-red-500 fill-red-500" /> in India
            </p>

            <p className="font-[family-name:var(--font-playfair)] text-cream/30 text-sm italic">
              Dil Se Desi, Swad Mein Asli
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
