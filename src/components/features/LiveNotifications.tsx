'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { LIVE_NOTIFICATIONS } from '@/lib/constants';

export default function LiveNotifications() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show first notification after 5 seconds
    const initialTimeout = setTimeout(() => {
      setIsVisible(true);
    }, 5000);

    // Rotate notifications every 6 seconds
    const interval = setInterval(() => {
      setIsVisible(false);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % LIVE_NOTIFICATIONS.length);
        setIsVisible(true);
      }, 500);
    }, 6000);

    return () => {
      clearTimeout(initialTimeout);
      clearInterval(interval);
    };
  }, []);

  const notification = LIVE_NOTIFICATIONS[currentIndex];

  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-sm">
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, y: 50, x: -20 }}
            animate={{ opacity: 1, y: 0, x: 0 }}
            exit={{ opacity: 0, y: 20, x: -20 }}
            transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            className="flex items-center gap-3 bg-white rounded-2xl px-5 py-3.5 shadow-2xl border border-warm-gray/10"
          >
            {/* Pulse dot */}
            <div className="relative flex-shrink-0">
              <div className="w-3 h-3 bg-village-green rounded-full" />
              <div className="w-3 h-3 bg-village-green rounded-full absolute top-0 animate-ping" />
            </div>

            {/* Content */}
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-dark-brown truncate">
                Someone from{' '}
                <span className="font-bold text-mustard">{notification.city}</span>{' '}
                {notification.action}
              </p>
              <p className="text-xs text-warm-gray mt-0.5">{notification.time}</p>
            </div>

            {/* Close button */}
            <button
              onClick={() => setIsVisible(false)}
              className="flex-shrink-0 text-warm-gray hover:text-dark-brown transition-colors"
              aria-label="Close notification"
            >
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                <path d="M1 1L13 13M1 13L13 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
              </svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
