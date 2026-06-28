'use client';

import Image from 'next/image';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';
import { useEffect, useState } from 'react';

const portfolioItems = [
  {
    id: 1,
    category: 'Bridal',
    title: 'Soft Bridal Glow',
    image: '/images/portfolio-extracted/portfolio-extracted-page1-img1.jpeg',
  },
  {
    id: 2,
    category: 'Engagement',
    title: 'Golden Engagement Look',
    image: '/images/portfolio-extracted/portfolio-extracted-page2-img1.jpeg',
  },
  {
    id: 3,
    category: 'Reception',
    title: 'Reception Radiance',
    image: '/images/portfolio-extracted/portfolio-extracted-page3-img1.jpeg',
  },
  {
    id: 4,
    category: 'Party',
    title: 'Party Glam Finish',
    image: '/images/portfolio-extracted/portfolio-extracted-page4-img1.jpeg',
  },
  {
    id: 5,
    category: 'Photoshoot',
    title: 'Studio Photoshoot Style',
    image: '/images/portfolio-extracted/portfolio-extracted-page5-img1.jpeg',
  },
  {
    id: 6,
    category: 'Bridal',
    title: 'Bridal Highlight Contour',
    image: '/images/portfolio-extracted/portfolio-extracted-page6-img1.jpeg',
  },
  {
    id: 7,
    category: 'Engagement',
    title: 'Romantic Engagement Makeup',
    image: '/images/portfolio-extracted/portfolio-extracted-page7-img1.jpeg',
  },
  {
    id: 8,
    category: 'Reception',
    title: 'Reception Statement Eye',
    image: '/images/portfolio-extracted/portfolio-extracted-page8-img1.jpeg',
  },
  {
    id: 9,
    category: 'Party',
    title: 'Bold Party Glam',
    image: '/images/portfolio-extracted/portfolio-extracted-page9-img1.jpeg',
  },
  {
    id: 10,
    category: 'Photoshoot',
    title: 'Editorial Makeup Look',
    image: '/images/portfolio-extracted/portfolio-extracted-page10-img1.jpeg',
  },
];

const categories = ['All', 'Bridal', 'Engagement', 'Reception', 'Party', 'Photoshoot'];
const AUTO_SLIDE_MS = 3500;

export default function PortfolioSection() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(1);

  const filteredItems =
    selectedCategory === 'All'
      ? portfolioItems
      : portfolioItems.filter((item) => item.category === selectedCategory);

  const itemVariants = {
    initial: (currentDirection: number) => ({
      opacity: 0,
      x: currentDirection > 0 ? -140 : 140,
      scale: 0.98,
    }),
    animate: {
      opacity: 1,
      x: 0,
      scale: 1,
      transition: { duration: 0.75, ease: 'easeOut' as const },
    },
    exit: (currentDirection: number) => ({
      opacity: 0,
      x: currentDirection > 0 ? 140 : -140,
      scale: 0.98,
      transition: { duration: 0.55, ease: 'easeIn' as const },
    }),
  };

  const goToSlide = (index: number) => {
    setDirection(index >= currentIndex ? 1 : -1);
    setCurrentIndex(index);
  };

  const nextSlide = () => {
    setDirection(1);
    setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrentIndex((prev) => (prev === 0 ? filteredItems.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (filteredItems.length <= 1) {
      return;
    }

    const intervalId = window.setInterval(() => {
      setDirection(1);
      setCurrentIndex((prev) => (prev + 1) % filteredItems.length);
    }, AUTO_SLIDE_MS);

    return () => window.clearInterval(intervalId);
  }, [filteredItems.length, currentIndex]);

  return (
    <section
      id="portfolio"
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
            Our Work
          </p>
          <h2 className="heading-md mb-8 text-[#2B2B2B]">Portfolio Gallery</h2>

          <div className="mb-8 flex flex-wrap justify-center gap-3">
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => {
                  setSelectedCategory(category);
                  setCurrentIndex(0);
                  setDirection(1);
                }}
                className={`rounded-full px-6 py-2 font-medium transition-all ${
                  selectedCategory === category
                    ? 'bg-[#D4A373] text-white shadow-lg'
                    : 'border-2 border-[#EAD7D1] bg-white text-[#2B2B2B] hover:border-[#D4A373]'
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={false}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="relative"
        >
          <div className="relative h-[26rem] overflow-hidden rounded-[2rem] border border-[#EAD7D1] bg-gradient-to-br from-[#EAD7D1] via-[#FFF8F5] to-white shadow-2xl sm:h-[34rem]">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,_rgba(255,255,255,0.9),_transparent_45%)]" />

            <AnimatePresence initial={false} custom={direction}>
              <motion.div
                key={filteredItems[currentIndex].id}
                custom={direction}
                variants={itemVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="absolute inset-0"
              >
                <div className="absolute inset-0 p-4 pb-24 sm:p-6 sm:pb-28">
                  <div className="relative h-full w-full overflow-hidden rounded-[1.5rem]">
                    <Image
                      src={filteredItems[currentIndex].image}
                      alt={filteredItems[currentIndex].title}
                      fill
                      sizes="(max-width: 640px) 100vw, 1200px"
                      className="object-contain"
                      priority={currentIndex === 0}
                    />
                  </div>
                </div>

                <div className="absolute inset-x-0 bottom-0 flex flex-col items-center justify-end px-6 pb-8 text-[#2B2B2B] sm:px-10">
                  <p className="mb-2 text-sm font-medium uppercase tracking-[0.22em] text-[#D4A373]">
                    {filteredItems[currentIndex].category}
                  </p>
                  <h3 className="text-2xl font-bold sm:text-3xl text-center">
                    {filteredItems[currentIndex].title}
                  </h3>
                </div>
              </motion.div>
            </AnimatePresence>

            <button
              onClick={prevSlide}
              className="absolute left-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/85 p-3 shadow-lg transition-all hover:bg-white hover:shadow-xl"
              aria-label="Previous portfolio photo"
            >
              <ChevronLeft size={24} className="text-[#D4A373]" />
            </button>
            <button
              onClick={() => nextSlide()}
              className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white/85 p-3 shadow-lg transition-all hover:bg-white hover:shadow-xl"
              aria-label="Next portfolio photo"
            >
              <ChevronRight size={24} className="text-[#D4A373]" />
            </button>

            <div className="absolute bottom-4 left-1/2 z-10 flex -translate-x-1/2 gap-2">
              {filteredItems.map((item, index) => (
                <motion.button
                  key={item.id}
                  onClick={() => goToSlide(index)}
                  className={`h-2 rounded-full transition-all ${
                    index === currentIndex
                      ? 'w-10 bg-white'
                      : 'w-2 bg-white/55 hover:bg-white/80'
                  }`}
                  aria-label={`Show ${item.title}`}
                />
              ))}
            </div>
          </div>

          <div className="mt-6 text-center">
            <p className="font-medium text-[#2B2B2B] opacity-75">
              {currentIndex + 1} / {filteredItems.length}
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 text-center"
        >
          <p className="mx-auto max-w-2xl text-[#2B2B2B] opacity-75">
            Every look is unique and customized based on your preferences. Our
            portfolio showcases our expertise in HD bridal makeup, event styling,
            and creative makeup artistry.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
