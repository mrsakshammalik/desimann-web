'use client';

import React from 'react';
import { motion } from 'motion/react';
import { Link2, Camera } from 'lucide-react';
import Image from 'next/image';

const founders = [
  {
    name: 'Anuj Malik',
    designation: 'Founder Emeritus / Idea Originator',
    description: 'Visionary behind the original Desimann concept and brand philosophy.',
    linkedin: '#',
    instagram: '#',
    image: '/images/founders/anuj.jpg',
  },
  {
    name: 'Saksham Malik',
    designation: 'Founder & COO',
    description: 'Responsible for operations, growth strategy, partnerships, and execution.',
    linkedin: '#',
    instagram: '#',
    image: '/images/founders/saksham.jpg',
  },
  {
    name: 'Kanak Verma',
    designation: 'Co-Founder & CEO',
    description: 'Leading brand vision, customer experience, marketing, and business development.',
    linkedin: '#',
    instagram: '#',
    image: '/images/founders/kanak.jpg',
  },
];

export default function FoundersSection() {
  return (
    <section className="py-24 px-6 md:px-12 lg:px-24 bg-transparent w-full">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-playfair font-bold text-foreground mb-4">
            Meet The Founders
          </h2>
          <div className="w-24 h-1 bg-mustard mx-auto rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
          {founders.map((founder, index) => (
            <motion.div
              key={founder.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              whileHover={{ y: -10, scale: 1.02 }}
              className="group relative rounded-2xl p-8 backdrop-blur-xl bg-white/40 dark:bg-white/5 border border-white/60 dark:border-white/10 shadow-[0_8px_32px_0_rgba(0,0,0,0.05)] hover:shadow-[0_16px_48px_0_rgba(212,160,23,0.15)] transition-all duration-300 flex flex-col h-full"
            >
              {/* Image Placeholder */}
              <div className="relative w-32 h-32 mx-auto mb-8 rounded-full overflow-hidden bg-gradient-to-br from-mustard/20 to-mustard/40 border-4 border-white/50 dark:border-white/20 shadow-lg">
                <Image
                  src={founder.image}
                  alt={founder.name}
                  fill
                  className="object-cover"
                />
              </div>

              {/* Content */}
              <div className="text-center flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-foreground mb-2">
                  {founder.name}
                </h3>
                <p className="text-mustard font-semibold mb-4 text-sm uppercase tracking-wider">
                  {founder.designation}
                </p>
                <p className="text-warm-gray dark:text-muted-foreground text-sm leading-relaxed flex-grow">
                  {founder.description}
                </p>
              </div>

              {/* Social Links */}
              <div className="mt-8 flex justify-center gap-4 pt-6 border-t border-black/5 dark:border-white/10">
                <a
                  href={founder.linkedin}
                  className="p-2 rounded-full bg-black/5 hover:bg-mustard/20 dark:bg-white/5 dark:hover:bg-mustard/20 text-warm-gray hover:text-mustard transition-colors"
                  aria-label={`${founder.name}'s LinkedIn`}
                >
                  <Link2 className="w-5 h-5" />
                </a>
                <a
                  href={founder.instagram}
                  className="p-2 rounded-full bg-black/5 hover:bg-mustard/20 dark:bg-white/5 dark:hover:bg-mustard/20 text-warm-gray hover:text-mustard transition-colors"
                  aria-label={`${founder.name}'s Instagram`}
                >
                  <Camera className="w-5 h-5" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
