'use client';

import { BookOpen, Download, Eye } from 'lucide-react';
import { motion } from 'framer-motion';

export default function CourseGuideSection() {
  const containerVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <section id="course" className="bg-white px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-[#D4A373]">
            Learn with us
          </p>
          <h2 className="heading-md mb-4 text-[#2B2B2B]">
            K2 Quick Mastery Makeup Guide
          </h2>
          <p className="text-[#2B2B2B] opacity-75">
            Learn essential makeup techniques through our curated coursework guide
            designed for beginners and aspiring makeup artists.
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial={false}
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-8 md:grid-cols-3"
        >
          <motion.div whileHover={{ y: -8 }} className="card-luxury md:col-span-1">
            <div className="relative mb-6 flex h-48 items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-[#D4A373] to-[#B76E79]">
              <BookOpen
                size={64}
                className="text-white opacity-80 transition-transform group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
            </div>
            <h3 className="mb-2 text-lg font-semibold text-[#2B2B2B]">Complete Guide</h3>
            <p className="text-sm text-[#2B2B2B] opacity-75">
              Comprehensive makeup basics and advanced techniques in one guide.
            </p>
          </motion.div>

          <motion.div whileHover={{ y: -8 }} className="card-luxury md:col-span-2">
            <h3 className="mb-6 text-xl font-semibold text-[#2B2B2B]">
              What&apos;s Inside?
            </h3>
            <div className="space-y-4">
              <div className="flex gap-3">
                <div className="font-bold text-[#D4A373]">+</div>
                <div>
                  <p className="font-medium text-[#2B2B2B]">Face Preparation</p>
                  <p className="text-sm text-[#2B2B2B] opacity-75">
                    Skin care, primer, and foundation techniques
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="font-bold text-[#D4A373]">+</div>
                <div>
                  <p className="font-medium text-[#2B2B2B]">Eye Makeup Mastery</p>
                  <p className="text-sm text-[#2B2B2B] opacity-75">
                    Eyeshadow, eyeliner, and brow techniques
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="font-bold text-[#D4A373]">+</div>
                <div>
                  <p className="font-medium text-[#2B2B2B]">Contouring and Highlighting</p>
                  <p className="text-sm text-[#2B2B2B] opacity-75">
                    Face shaping and glow techniques
                  </p>
                </div>
              </div>
              <div className="flex gap-3">
                <div className="font-bold text-[#D4A373]">+</div>
                <div>
                  <p className="font-medium text-[#2B2B2B]">Lip and Finish</p>
                  <p className="text-sm text-[#2B2B2B] opacity-75">
                    Lip color selection and makeup setting
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>

        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          viewport={{ once: true }}
          className="mt-12 flex flex-col justify-center gap-4 sm:flex-row"
        >
          <a
            href="/K2_Makeover_Studio_Bridal_Makeup_Quick_Mastery_Guide.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2 rounded-full border-2 border-[#D4A373] px-8 py-3 font-semibold text-[#D4A373] transition-all hover:bg-[#D4A373] hover:text-white"
          >
            <Eye size={20} />
            Preview Guide
          </a>
          <a
            href="/K2_Makeover_Studio_Bridal_Makeup_Quick_Mastery_Guide.pdf"
            download
            className="flex items-center justify-center gap-2 rounded-full bg-[#D4A373] px-8 py-3 font-semibold text-white shadow-lg transition-all hover:bg-[#c49563] hover:shadow-xl"
          >
            <Download size={20} />
            Download PDF
          </a>
        </motion.div>

        <motion.p
          initial={false}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
          viewport={{ once: true }}
          className="mt-6 text-center text-sm text-[#2B2B2B] opacity-75"
        >
          Free download for all visitors. No enrollment required.
        </motion.p>
      </div>
    </section>
  );
}
