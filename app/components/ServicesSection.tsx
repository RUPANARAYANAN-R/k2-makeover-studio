'use client';

import { Cake, Heart, Music, Sparkles, Users } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    id: 1,
    name: 'HD Bridal Makeup',
    price: 'Rs 15,000',
    description:
      'Premium bridal makeup with HD coverage designed to last all day. Includes a trial session.',
    icon: Heart,
    color: 'from-[#D4A373] to-[#B76E79]',
  },
  {
    id: 2,
    name: 'Engagement Makeup',
    price: 'Rs 8,000',
    description:
      'Elegant engagement makeup for your special pre-wedding celebration.',
    icon: Sparkles,
    color: 'from-[#B76E79] to-[#D4A373]',
  },
  {
    id: 3,
    name: 'Reception Makeup',
    price: 'Rs 8,000',
    description:
      'Glamorous reception makeup designed to stand out beautifully all evening.',
    icon: Cake,
    color: 'from-[#D4A373] to-[#EAD7D1]',
  },
  {
    id: 4,
    name: 'Party Makeup',
    price: 'Rs 5,000',
    description:
      'Fresh, festive party looks for celebrations, family functions, and events.',
    icon: Music,
    color: 'from-[#B76E79] to-[#EAD7D1]',
  },
  {
    id: 5,
    name: 'Guest Makeup',
    price: 'Rs 3,000',
    description:
      'Quick and elegant makeup for wedding guests and special occasions.',
    icon: Users,
    color: 'from-[#EAD7D1] to-[#D4A373]',
  },
];

export default function ServicesSection() {
  const containerVariants = {
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="services" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-[#D4A373]">
            Our Services
          </p>
          <h2 className="heading-md mb-4 text-[#2B2B2B]">
            Premium Makeup Services
          </h2>
          <p className="mx-auto max-w-2xl text-[#2B2B2B] opacity-75">
            Tailored makeup solutions for every special occasion. Prices may vary
            based on complexity, venue location, and additional services.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial={false}
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-5"
        >
          {services.map((service) => {
            const Icon = service.icon;

            return (
              <motion.div
                key={service.id}
                variants={cardVariants}
                whileHover={{ y: -8 }}
                className="card-luxury group overflow-hidden"
              >
                <div
                  className={`mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br ${service.color} transition-transform group-hover:scale-110`}
                >
                  <Icon size={24} className="text-white" />
                </div>
                <h3 className="mb-2 text-lg font-semibold text-[#2B2B2B]">
                  {service.name}
                </h3>
                <p className="mb-3 text-2xl font-bold text-[#D4A373]">
                  {service.price}
                </p>
                <p className="text-sm leading-relaxed text-[#2B2B2B] opacity-75">
                  {service.description}
                </p>
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-[#D4A373] to-[#B76E79] opacity-0 transition-opacity group-hover:opacity-5" />
              </motion.div>
            );
          })}
        </motion.div>

        <motion.div
          initial={false}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 rounded-xl border border-[#D4A373] border-opacity-30 bg-gradient-to-r from-[#FFF8F5] to-[#EAD7D1] p-6"
        >
          <p className="text-sm text-[#2B2B2B] opacity-85">
            <span className="font-semibold text-[#B76E79]">Note:</span> Pricing may
            vary depending on makeup complexity, venue location, travel distance,
            early morning bookings, additional services, and premium product
            requirements. Contact us for a custom quote.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
