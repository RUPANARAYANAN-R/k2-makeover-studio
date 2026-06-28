'use client';

import { Star } from 'lucide-react';
import { motion } from 'framer-motion';

const testimonials = [
  {
    id: 1,
    name: 'Priya Sharma',
    service: 'Bridal Makeup',
    rating: 5,
    text: 'K2 Makeover Studio made my wedding day even more special! The makeup was flawless and lasted the entire day. Highly recommended!',
    avatar: 'Bride',
  },
  {
    id: 2,
    name: 'Anjali Nair',
    service: 'Engagement Makeup',
    rating: 5,
    text: 'Amazing work! The artist understood my vision perfectly and created a look that made me feel confident and beautiful.',
    avatar: 'Glow',
  },
  {
    id: 3,
    name: 'Deepa Reddy',
    service: 'Reception Makeup',
    rating: 5,
    text: 'Professional, punctual, and talented! The makeup looked stunning in photos. Best decision for my reception day!',
    avatar: 'Style',
  },
  {
    id: 4,
    name: 'Meera Iyer',
    service: 'Party Makeup',
    rating: 5,
    text: 'The makeup was fresh, vibrant, and perfect for the party. Got so many compliments! Definitely booking again.',
    avatar: 'Party',
  },
  {
    id: 5,
    name: 'Neha Singh',
    service: 'Photoshoot Makeup',
    rating: 5,
    text: 'The makeup was camera-ready and looked even better in photos. Very professional and detail-oriented team.',
    avatar: 'Shoot',
  },
  {
    id: 6,
    name: 'Ritika Patel',
    service: 'Bridal Makeup',
    rating: 5,
    text: 'Had my trial with them and was so impressed that I immediately booked for my wedding. They delivered exactly as promised!',
    avatar: 'Love',
  },
];

export default function TestimonialsSection() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section
      id="testimonials"
      className="bg-gradient-to-b from-[#FFF8F5] to-white px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-16 text-center"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-[#D4A373]">
            Client Love
          </p>
          <h2 className="heading-md mb-4 text-[#2B2B2B]">What Our Clients Say</h2>
          <p className="mx-auto max-w-2xl text-[#2B2B2B] opacity-75">
            Real reviews from real clients. Your trust is our greatest achievement.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial={false}
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {testimonials.map((testimonial) => (
            <motion.div
              key={testimonial.id}
              variants={cardVariants}
              whileHover={{ y: -8 }}
              className="card-luxury group bg-gradient-to-br from-white to-[#FFF8F5]"
            >
              <div className="mb-4 flex gap-1">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={18}
                    className="fill-[#D4A373] text-[#D4A373]"
                  />
                ))}
              </div>

              <p className="mb-6 leading-relaxed text-[#2B2B2B] italic">
                &ldquo;{testimonial.text}&rdquo;
              </p>

              <div className="flex items-center gap-3 border-t border-[#EAD7D1] pt-4">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#F3E4DB] text-sm font-semibold text-[#B76E79]">
                  {testimonial.avatar}
                </div>
                <div>
                  <p className="font-semibold text-[#2B2B2B]">{testimonial.name}</p>
                  <p className="text-sm font-medium text-[#D4A373]">
                    {testimonial.service}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="mb-4 text-[#2B2B2B] opacity-75">
            Join our list of 100+ happy clients. Share your experience with K2
            Makeover Studio.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
