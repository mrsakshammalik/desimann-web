// ============================================================
// DESIMANN.COM — UTILITY FUNCTIONS
// ============================================================

/**
 * Formats a number with Indian-style commas (e.g., 1,27,800)
 */
export function formatIndianNumber(num: number): string {
  const str = num.toString();
  let lastThree = str.substring(str.length - 3);
  const remaining = str.substring(0, str.length - 3);
  if (remaining !== '') {
    lastThree = ',' + lastThree;
  }
  return remaining.replace(/\B(?=(\d{2})+(?!\d))/g, ',') + lastThree;
}

/**
 * Formats price in INR
 */
export function formatPrice(price: number): string {
  return `₹${price}`;
}

/**
 * Calculates time remaining until a target date
 */
export function getTimeRemaining(targetDate: string) {
  const total = Date.parse(targetDate) - Date.now();
  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return {
    total,
    days: Math.max(0, days),
    hours: Math.max(0, hours),
    minutes: Math.max(0, minutes),
    seconds: Math.max(0, seconds),
  };
}

/**
 * Smoothly scrolls to a section by ID
 */
export function scrollToSection(id: string) {
  const element = document.getElementById(id);
  if (element) {
    element.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }
}

/**
 * Generates a random referral code
 */
export function generateReferralCode(): string {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let code = 'DESI';
  for (let i = 0; i < 6; i++) {
    code += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return code;
}

/**
 * Clamps a value between min and max
 */
export function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max);
}

/**
 * Creates a className string from conditional classes
 */
export function cn(...classes: (string | boolean | undefined | null)[]): string {
  return classes.filter(Boolean).join(' ');
}
