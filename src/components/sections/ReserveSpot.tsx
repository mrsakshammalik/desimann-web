'use client';

import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Check, Shield, Mail, Sparkles } from 'lucide-react';
import { PRODUCTS } from '@/lib/constants';

// ============================================================
// RESERVE SPOT — Premium Conversion Form Section
// ============================================================

interface FormData {
  name: string;
  email: string;
  phone: string;
  city: string;
  products: string[];
  referralCode: string;
  newReferralCode?: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  city?: string;
}

const BENEFITS = [
  { label: 'Priority Delivery', description: 'Be first in line on launch day' },
  { label: 'Launch Day Pricing', description: 'Exclusive pre-launch discounts' },
  { label: 'Founder Badge', description: 'Limited edition founder recognition' },
];

export default function ReserveSpot() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    city: '',
    products: [],
    referralCode: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submitType, setSubmitType] = useState<'reserve' | 'waitlist'>('reserve');
  const formRef = useRef<HTMLFormElement>(null);

  // Handle text input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear error on change
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Handle product checkbox toggles
  const handleProductToggle = (productId: string) => {
    setFormData((prev) => ({
      ...prev,
      products: prev.products.includes(productId)
        ? prev.products.filter((p) => p !== productId)
        : [...prev.products, productId],
    }));
  };

  // Validate form fields
  const validate = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Enter a valid email';
    }
    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^[6-9]\d{9}$/.test(formData.phone.replace(/\s/g, ''))) {
      newErrors.phone = 'Enter a valid Indian phone number';
    }
    if (!formData.city.trim()) newErrors.city = 'City is required';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Simulate form submission
  const handleSubmit = async (type: 'reserve' | 'waitlist') => {
    setSubmitType(type);
    if (!validate()) return;
    setIsSubmitting(true);
    
    try {
      const data = new FormData();
      data.append('name', formData.name);
      data.append('email', formData.email);
      data.append('phone', formData.phone);
      data.append('city', formData.city);
      data.append('interestedProduct', formData.products.join(', '));
      if (formData.referralCode) {
        data.append('referredByCode', formData.referralCode);
      }

      // We need to import submitWaitlist at the top of the file
      const { submitWaitlist } = await import('@/app/actions/waitlist');
      const result = await submitWaitlist(data);

      if (result.error) {
        alert(result.error);
      } else if (result.success) {
        // Set their newly generated referral code to show them in the success UI
        setFormData(prev => ({ ...prev, newReferralCode: result.referralCode }));
        setIsSubmitted(true);
      }
    } catch (err) {
      console.error(err);
      alert('An error occurred. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="reserve" className="bg-cream py-20 md:py-28 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <h2 className="font-[family-name:var(--font-playfair)] text-4xl md:text-5xl lg:text-6xl font-bold text-dark-brown mb-4">
            Reserve Your Spot
          </h2>
          <p className="text-warm-gray text-lg md:text-xl max-w-2xl mx-auto">
            Be among the first to experience Desimann
          </p>
        </motion.div>

        {/* Two-Column Layout */}
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          {/* ——— Left Column: Marketing Copy ——— */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="space-y-8"
          >
            <div>
              <h3 className="font-[family-name:var(--font-playfair)] text-3xl md:text-4xl font-bold text-dark-brown mb-4">
                Get Early Access
              </h3>
              <p className="text-warm-gray text-base md:text-lg leading-relaxed">
                Join an exclusive community of food lovers who value tradition, purity, and taste.
                Lock in your spot before our Independence Day launch.
              </p>
            </div>

            {/* Benefit Bullets */}
            <div className="space-y-5">
              {BENEFITS.map((benefit, i) => (
                <motion.div
                  key={benefit.label}
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.3 + i * 0.15 }}
                  className="flex items-start gap-4 group"
                >
                  <div className="w-10 h-10 rounded-full bg-village-green/15 flex items-center justify-center flex-shrink-0 group-hover:bg-village-green/25 transition-colors">
                    <Check className="w-5 h-5 text-village-green" />
                  </div>
                  <div>
                    <p className="font-semibold text-dark-brown text-lg">{benefit.label}</p>
                    <p className="text-warm-gray text-sm">{benefit.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Trust Indicators */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="flex items-center gap-6 pt-4"
            >
              <div className="flex items-center gap-2 text-warm-gray/80">
                <Shield className="w-4 h-4" />
                <span className="text-sm font-medium">Secure & encrypted</span>
              </div>
              <div className="flex items-center gap-2 text-warm-gray/80">
                <Mail className="w-4 h-4" />
                <span className="text-sm font-medium">No spam, ever</span>
              </div>
            </motion.div>

            {/* Decorative Element */}
            <div className="hidden lg:block relative mt-8">
              <div className="w-64 h-64 rounded-full bg-mustard/10 blur-3xl absolute -bottom-16 -left-16" />
              <div className="w-40 h-40 rounded-full bg-village-green/10 blur-2xl absolute -bottom-8 left-24" />
            </div>
          </motion.div>

          {/* ——— Right Column: Form ——— */}
          <motion.div
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, delay: 0.3 }}
          >
            <AnimatePresence mode="wait">
              {isSubmitted ? (
                /* ——— Success State ——— */
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 20 }}
                  className="bg-white rounded-2xl p-8 md:p-12 shadow-xl text-center"
                >
                  {/* Animated Checkmark */}
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: 'spring', stiffness: 300, damping: 15, delay: 0.2 }}
                    className="w-24 h-24 rounded-full bg-village-green/15 flex items-center justify-center mx-auto mb-6"
                  >
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      animate={{ scale: 1, rotate: 0 }}
                      transition={{ type: 'spring', stiffness: 200, damping: 12, delay: 0.5 }}
                    >
                      <Check className="w-12 h-12 text-village-green" strokeWidth={3} />
                    </motion.div>
                  </motion.div>
                  <motion.h3
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.7 }}
                    className="font-[family-name:var(--font-playfair)] text-3xl font-bold text-dark-brown mb-3"
                  >
                    You&apos;re on the list!
                  </motion.h3>
                  <motion.p
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.9 }}
                    className="text-warm-gray mb-6"
                  >
                    {submitType === 'reserve'
                      ? 'Your launch offer has been reserved. We\'ll send you a confirmation email shortly.'
                      : 'You\'ve been added to the waitlist. We\'ll notify you as soon as we launch!'}
                  </motion.p>
                  
                  {formData.newReferralCode && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 1.0 }}
                      className="mb-6 p-4 bg-gray-50 border border-gray-100 rounded-xl"
                    >
                      <p className="text-sm font-medium text-dark-brown mb-2">Share your unique referral link to earn rewards:</p>
                      <div className="flex items-center gap-2 bg-white border border-gray-200 rounded-lg p-2">
                        <code className="text-sm text-mustard flex-1 select-all overflow-hidden text-ellipsis whitespace-nowrap">
                          https://desimann.com/?r={formData.newReferralCode}
                        </code>
                        <button 
                          onClick={() => navigator.clipboard.writeText(`https://desimann.com/?r=${formData.newReferralCode}`)}
                          className="px-3 py-1.5 bg-mustard text-dark-brown text-xs font-bold rounded-md hover:bg-mustard/90 transition-colors"
                        >
                          Copy
                        </button>
                      </div>
                    </motion.div>
                  )}

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1 }}
                    className="flex items-center justify-center gap-2 text-mustard"
                  >
                    <Sparkles className="w-5 h-5" />
                    <span className="font-semibold text-sm">Welcome to the Desimann family</span>
                    <Sparkles className="w-5 h-5" />
                  </motion.div>
                </motion.div>
              ) : (
                /* ——— Form ——— */
                <motion.div
                  key="form"
                  className="bg-white rounded-2xl p-6 md:p-8 shadow-xl"
                >
                  <form
                    ref={formRef}
                    onSubmit={(e) => e.preventDefault()}
                    className="space-y-5"
                    noValidate
                  >
                    {/* Name */}
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-dark-brown mb-1.5">
                        Full Name <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        className={`w-full p-4 rounded-xl border ${
                          errors.name ? 'border-red-400 ring-2 ring-red-400/20' : 'border-warm-gray/30'
                        } focus:border-mustard focus:ring-2 focus:ring-mustard/20 outline-none transition bg-transparent text-dark-brown placeholder:text-warm-gray/50`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-xs mt-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Email */}
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-dark-brown mb-1.5">
                        Email Address <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="you@example.com"
                        className={`w-full p-4 rounded-xl border ${
                          errors.email ? 'border-red-400 ring-2 ring-red-400/20' : 'border-warm-gray/30'
                        } focus:border-mustard focus:ring-2 focus:ring-mustard/20 outline-none transition bg-transparent text-dark-brown placeholder:text-warm-gray/50`}
                      />
                      {errors.email && (
                        <p className="text-red-500 text-xs mt-1">{errors.email}</p>
                      )}
                    </div>

                    {/* Phone & City side by side on desktop */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label htmlFor="phone" className="block text-sm font-medium text-dark-brown mb-1.5">
                          Phone <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="phone"
                          name="phone"
                          type="tel"
                          value={formData.phone}
                          onChange={handleChange}
                          placeholder="98765 43210"
                          className={`w-full p-4 rounded-xl border ${
                            errors.phone ? 'border-red-400 ring-2 ring-red-400/20' : 'border-warm-gray/30'
                          } focus:border-mustard focus:ring-2 focus:ring-mustard/20 outline-none transition bg-transparent text-dark-brown placeholder:text-warm-gray/50`}
                        />
                        {errors.phone && (
                          <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                        )}
                      </div>
                      <div>
                        <label htmlFor="city" className="block text-sm font-medium text-dark-brown mb-1.5">
                          City <span className="text-red-500">*</span>
                        </label>
                        <input
                          id="city"
                          name="city"
                          type="text"
                          value={formData.city}
                          onChange={handleChange}
                          placeholder="Your city"
                          className={`w-full p-4 rounded-xl border ${
                            errors.city ? 'border-red-400 ring-2 ring-red-400/20' : 'border-warm-gray/30'
                          } focus:border-mustard focus:ring-2 focus:ring-mustard/20 outline-none transition bg-transparent text-dark-brown placeholder:text-warm-gray/50`}
                        />
                        {errors.city && (
                          <p className="text-red-500 text-xs mt-1">{errors.city}</p>
                        )}
                      </div>
                    </div>

                    {/* Interested Products (checkboxes) */}
                    <div>
                      <label className="block text-sm font-medium text-dark-brown mb-3">
                        Interested Products
                      </label>
                      <div className="grid grid-cols-2 gap-2.5">
                        {PRODUCTS.map((product) => (
                          <div
                            key={product.id}
                            onClick={() => handleProductToggle(product.id)}
                            className={`flex items-center gap-2.5 p-3 rounded-xl border cursor-pointer transition-all text-sm ${
                              formData.products.includes(product.id)
                                ? 'border-mustard bg-mustard/5 text-dark-brown'
                                : 'border-warm-gray/20 hover:border-warm-gray/40 text-warm-gray'
                            }`}
                          >
                            <div
                              className={`w-5 h-5 rounded flex items-center justify-center flex-shrink-0 transition-all ${
                                formData.products.includes(product.id)
                                  ? 'bg-mustard'
                                  : 'border-2 border-warm-gray/30'
                              }`}
                            >
                              {formData.products.includes(product.id) && (
                                <Check className="w-3.5 h-3.5 text-white" strokeWidth={3} />
                              )}
                            </div>
                            <span className="leading-tight">{product.name}</span>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Referral Code */}
                    <div>
                      <label htmlFor="referralCode" className="block text-sm font-medium text-dark-brown mb-1.5">
                        Referral Code <span className="text-warm-gray/50 font-normal">(optional)</span>
                      </label>
                      <input
                        id="referralCode"
                        name="referralCode"
                        type="text"
                        value={formData.referralCode}
                        onChange={handleChange}
                        placeholder="Enter code"
                        className="w-full p-4 rounded-xl border border-warm-gray/30 focus:border-mustard focus:ring-2 focus:ring-mustard/20 outline-none transition bg-transparent text-dark-brown placeholder:text-warm-gray/50"
                      />
                    </div>

                    {/* Submit Buttons */}
                    <div className="pt-2">
                      <motion.button
                        type="button"
                        onClick={() => handleSubmit('reserve')}
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="bg-mustard text-rich-black font-bold py-4 rounded-full w-full hover:shadow-lg transition-shadow cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed relative overflow-hidden"
                      >
                        {isSubmitting && submitType === 'reserve' ? (
                          <span className="flex items-center justify-center gap-2">
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                              className="inline-block w-5 h-5 border-2 border-rich-black/30 border-t-rich-black rounded-full"
                            />
                            Reserving...
                          </span>
                        ) : (
                          'Reserve Launch Offer'
                        )}
                      </motion.button>

                      <motion.button
                        type="button"
                        onClick={() => handleSubmit('waitlist')}
                        disabled={isSubmitting}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        className="border-2 border-dark-brown text-dark-brown py-4 rounded-full w-full mt-3 hover:bg-dark-brown hover:text-cream transition-all cursor-pointer disabled:opacity-60 disabled:cursor-not-allowed"
                      >
                        {isSubmitting && submitType === 'waitlist' ? (
                          <span className="flex items-center justify-center gap-2">
                            <motion.span
                              animate={{ rotate: 360 }}
                              transition={{ repeat: Infinity, duration: 1, ease: 'linear' }}
                              className="inline-block w-5 h-5 border-2 border-dark-brown/30 border-t-dark-brown rounded-full"
                            />
                            Joining...
                          </span>
                        ) : (
                          'Join Waitlist'
                        )}
                      </motion.button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
