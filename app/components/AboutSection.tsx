'use client';

import { Award, Users, Zap } from 'lucide-react';
import { motion } from 'framer-motion';

const metrics = [
  {
    icon: Award,
    value: '3+',
    label: 'Years Experience',
    color: 'from-[#D4A373] to-[#B76E79]',
  },
  {
    icon: Users,
    value: '100+',
    label: 'Happy Clients',
    color: 'from-[#B76E79] to-[#D4A373]',
  },
  {
    icon: Zap,
    value: '5 Star',
    label: 'Client Ratings',
    color: 'from-[#D4A373] to-[#EAD7D1]',
  },
];

export default function AboutSection() {
  const containerVariants = {
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="about" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="space-y-6"
          >
            <div>
              <p className="mb-4 text-sm font-medium uppercase tracking-widest text-[#D4A373]">
                About Us
              </p>
              <h2 className="heading-md mb-6 text-[#2B2B2B]">
                Professional Makeup Artistry at Its Best
              </h2>
            </div>

            <div className="space-y-4">
              <p className="leading-relaxed text-[#2B2B2B] opacity-85">
                K2 Makeover Studio brings 3+ years of professional makeup
                experience across bridal, engagement, reception, party makeup,
                baby showers, photoshoots, and other special occasions.
              </p>
              <p className="leading-relaxed text-[#2B2B2B] opacity-85">
                We believe makeup should enhance your natural beauty and boost your
                confidence. Our team uses premium products and modern techniques to
                deliver polished results for every event.
              </p>
              <p className="leading-relaxed text-[#2B2B2B] opacity-85">
                From HD bridal looks that photograph beautifully to fresh party
                makeup, we create styles that reflect your personality and your
                vision for the day.
              </p>
            </div>

            <div>
              <h3 className="mb-3 font-semibold text-[#2B2B2B]">Why Choose Us?</h3>
              <ul className="space-y-2 text-[#2B2B2B] opacity-85">
                <li className="flex gap-2">
                  <span className="font-bold text-[#D4A373]">+</span>
                  Premium quality products and tools
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-[#D4A373]">+</span>
                  Customized looks for every client
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-[#D4A373]">+</span>
                  Professional and experienced artists
                </li>
                <li className="flex gap-2">
                  <span className="font-bold text-[#D4A373]">+</span>
                  Competitive pricing and packages
                </li>
              </ul>
            </div>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial={false}
            whileInView="visible"
            viewport={{ once: true }}
            className="space-y-6"
          >
            {metrics.map((metric, index) => {
              const Icon = metric.icon;

              return (
                <motion.div key={index} variants={itemVariants} className="card-luxury group">
                  <div
                    className={`mb-4 flex h-14 w-14 items-center justify-center rounded-lg bg-gradient-to-br ${metric.color} transition-transform group-hover:scale-110`}
                  >
                    <Icon size={28} className="text-white" />
                  </div>
                  <p className="mb-2 text-3xl font-bold text-[#D4A373]">
                    {metric.value}
                  </p>
                  <p className="font-medium text-[#2B2B2B]">{metric.label}</p>
                </motion.div>
              );
            })}

            <motion.div
              variants={itemVariants}
              className="card-luxury border-2 border-[#D4A373] bg-gradient-to-br from-[#FFF8F5] to-[#EAD7D1]"
            >
              <h3 className="mb-4 text-lg font-semibold text-[#2B2B2B]">
                Our Specialties
              </h3>
              <div className="space-y-3 text-sm text-[#2B2B2B] opacity-85">
                <div className="flex items-start gap-2">
                  <span className="mt-1 font-bold text-[#B76E79]">-</span>
                  <span>HD bridal makeup with a polished finish</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 font-bold text-[#B76E79]">-</span>
                  <span>Trial sessions before your event</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 font-bold text-[#B76E79]">-</span>
                  <span>Personalized makeup packages</span>
                </div>
                <div className="flex items-start gap-2">
                  <span className="mt-1 font-bold text-[#B76E79]">-</span>
                  <span>Makeup for all skin types</span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
