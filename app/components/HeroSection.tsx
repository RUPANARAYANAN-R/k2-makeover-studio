'use client';

import Image from 'next/image';
import { ArrowRight, MessageCircle } from 'lucide-react';
import { motion } from 'framer-motion';
import Link from 'next/link';

export default function HeroSection() {
  const containerVariants = {
    visible: {
      transition: {
        staggerChildren: 0.16,
        delayChildren: 0.08,
      },
    },
  };

  const itemVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.7 },
    },
  };

  const imageVariants = {
    visible: {
      opacity: 1,
      scale: 1,
      transition: { duration: 0.9 },
    },
  };

  return (
    <section className="relative flex min-h-screen items-center justify-center overflow-hidden px-4 pb-10 pt-20 sm:px-6 lg:px-8">
      <div className="absolute inset-0 z-0">
        <motion.div
          className="absolute right-10 top-20 h-72 w-72 rounded-full bg-gradient-to-br from-[#D4A373] to-[#B76E79] opacity-10 blur-3xl"
          animate={{ y: [0, 30, 0] }}
          transition={{ duration: 8, repeat: Infinity }}
        />
        <motion.div
          className="absolute bottom-20 left-10 h-96 w-96 rounded-full bg-gradient-to-tr from-[#B76E79] to-[#D4A373] opacity-5 blur-3xl"
          animate={{ y: [0, -30, 0] }}
          transition={{ duration: 10, repeat: Infinity }}
        />
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            variants={containerVariants}
            initial={false}
            animate="visible"
            className="space-y-6"
          >
            <motion.div variants={itemVariants} className="space-y-3">
              <p className="text-sm font-medium uppercase tracking-widest text-[#D4A373]">
                Premium Makeup Studio
              </p>
              <h1 className="heading-lg text-[#2B2B2B]">
                Elevate Your Beauty for Every
                <span className="block text-[#D4A373]">Special Occasion</span>
              </h1>
            </motion.div>

            <motion.p
              variants={itemVariants}
              className="text-lg leading-relaxed text-[#2B2B2B] opacity-90"
            >
              Bridal | Engagement | Reception | Party Makeup
            </motion.p>

            <motion.p
              variants={itemVariants}
              className="text-base leading-relaxed text-[#2B2B2B] opacity-75"
            >
              Professional makeup services with 3+ years of experience. We
              specialize in HD bridal makeup, engagement looks, and event styling
              to make your special day unforgettable.
            </motion.p>

            <motion.div
              variants={itemVariants}
              className="flex flex-col gap-4 pt-4 sm:flex-row"
            >
              <Link
                href="#contact"
                className="btn-primary group inline-flex items-center justify-center gap-2"
              >
                Book Appointment
                <ArrowRight
                  size={18}
                  className="transition-transform group-hover:translate-x-1"
                />
              </Link>
              <a
                href="https://wa.me/919876543210?text=Hi%20K2%20Makeover%20Studio%2C%20I%27m%20interested%20in%20your%20makeup%20services"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-secondary inline-flex items-center justify-center gap-2"
              >
                <MessageCircle size={18} />
                Chat on WhatsApp
              </a>
            </motion.div>

            <motion.div
              variants={itemVariants}
              className="flex gap-8 border-t border-[#EAD7D1] pt-6"
            >
              <div>
                <p className="text-2xl font-bold text-[#D4A373]">3+</p>
                <p className="text-sm text-[#2B2B2B] opacity-75">Years Experience</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#D4A373]">100+</p>
                <p className="text-sm text-[#2B2B2B] opacity-75">Happy Clients</p>
              </div>
              <div>
                <p className="text-2xl font-bold text-[#D4A373]">5 Star</p>
                <p className="text-sm text-[#2B2B2B] opacity-75">Rated</p>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            variants={imageVariants}
            initial={false}
            animate="visible"
            className="relative hidden lg:block"
          >
            <div className="absolute -left-6 -top-6 h-full w-full rounded-3xl bg-gradient-to-br from-[#D4A373] to-[#B76E79] opacity-15 blur-sm" />
            <div className="relative overflow-hidden rounded-3xl border border-[#EAD7D1] bg-white shadow-2xl">
              <Image
                src="/images/portfolio-extracted/portfolio-extracted-page1-img1.jpeg"
                alt="Bridal makeup portfolio look"
                width={800}
                height={1000}
                priority
                sizes="(max-width: 1024px) 100vw, 42vw"
                className="w-full h-auto object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#2B2B2B]/45 via-transparent to-white/10" />
              <div className="absolute bottom-0 left-0 right-0 p-6 text-white">
                <p className="mb-2 text-sm uppercase tracking-[0.25em] text-[#F3D1AE]">
                  Signature Bridal Finish
                </p>
                <p className="max-w-sm text-sm leading-relaxed text-white/90">
                  Soft glam, skin-focused blending, and long-wear styling for
                  wedding moments that photograph beautifully.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
