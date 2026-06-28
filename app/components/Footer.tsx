'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { MessageCircle, MapPin, Phone, Heart } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-b from-[#2B2B2B] to-black text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-10 h-10 rounded-full bg-gradient-to-br from-[#D4A373] to-[#B76E79] flex items-center justify-center">
                <span className="text-white font-bold font-serif">K2</span>
              </div>
              <div>
                <p className="font-bold text-lg">K2 Makeover</p>
                <p className="text-xs text-[#D4A373]">Premium Studio</p>
              </div>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Professional makeup artistry for every special occasion. Your beauty, our passion.
            </p>
          </motion.div>

          {/* Quick Links */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-lg mb-4 text-[#D4A373]">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="#services" className="text-gray-400 hover:text-[#D4A373] transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="#portfolio" className="text-gray-400 hover:text-[#D4A373] transition-colors">
                  Portfolio
                </Link>
              </li>
              <li>
                <Link href="#about" className="text-gray-400 hover:text-[#D4A373] transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="#contact" className="text-gray-400 hover:text-[#D4A373] transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </motion.div>

          {/* Services */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-lg mb-4 text-[#D4A373]">Services</h3>
            <ul className="space-y-2 text-sm">
              <li className="text-gray-400">HD Bridal Makeup</li>
              <li className="text-gray-400">Engagement Makeup</li>
              <li className="text-gray-400">Reception Makeup</li>
              <li className="text-gray-400">Party Makeup</li>
            </ul>
          </motion.div>

          {/* Contact Info */}
          <motion.div
            initial={false}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            viewport={{ once: true }}
          >
            <h3 className="font-semibold text-lg mb-4 text-[#D4A373]">Connect</h3>
            <div className="space-y-3">
              <a
                href="https://wa.me/919876543210"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-gray-400 hover:text-[#D4A373] transition-colors"
              >
                <MessageCircle size={18} />
                WhatsApp
              </a>
              <div className="flex items-center gap-2 text-gray-400">
                <Phone size={18} />
                <span>+91 98765 43210</span>
              </div>
              <div className="flex items-center gap-2 text-gray-400">
                <MapPin size={18} />
                <span>Coimbatore, India</span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 my-8" />

        {/* Bottom */}
        <motion.div
          initial={false}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row justify-between items-center gap-4"
        >
          <p className="text-gray-400 text-sm text-center sm:text-left">
            &copy; {currentYear} K2 Makeover Studio. All rights reserved.
          </p>
          <div className="flex items-center gap-1 text-gray-400 text-sm">
            Made with <Heart size={16} className="text-[#B76E79] fill-[#B76E79]" /> for makeup lovers
          </div>
        </motion.div>

        {/* SEO Footer Links */}
        <div className="mt-8 pt-8 border-t border-gray-800 grid grid-cols-2 md:grid-cols-4 gap-4 text-xs text-gray-500">
          <a href="#" className="hover:text-[#D4A373]">Makeup Artist Coimbatore</a>
          <a href="#" className="hover:text-[#D4A373]">Bridal Makeup Services</a>
          <a href="#" className="hover:text-[#D4A373]">Professional Makeup</a>
          <a href="#" className="hover:text-[#D4A373]">Event Makeup Artist</a>
        </div>
      </div>
    </footer>
  );
}
