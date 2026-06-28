'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import { AlertCircle, CheckCircle, Loader, Send } from 'lucide-react';
import { motion } from 'framer-motion';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const formSchema = z.object({
  fullName: z.string().min(2, 'Name must be at least 2 characters'),
  phone: z
    .string()
    .regex(/^[0-9]{10}$/, 'Please enter a valid 10-digit phone number'),
  service: z.string().min(1, 'Please select a service'),
  preferredDate: z.string().min(1, 'Please select a preferred date'),
  message: z.string().optional(),
  botField: z.string().optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function ContactForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null;
    message: string;
  }>({ type: null, message: '' });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true);
    setSubmitStatus({ type: null, message: '' });

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (response.ok) {
        setSubmitStatus({
          type: 'success',
          message: 'Thank you! We received your inquiry. We will contact you shortly.',
        });
        reset();
        setTimeout(() => {
          setSubmitStatus({ type: null, message: '' });
        }, 5000);
      } else {
        setSubmitStatus({
          type: 'error',
          message: result.message || 'Something went wrong. Please try again.',
        });
      }
    } catch {
      setSubmitStatus({
        type: 'error',
        message: 'Network error. Please try again later.',
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const services = [
    'Bridal Makeup',
    'Engagement Makeup',
    'Reception Makeup',
    'Party Makeup',
    'Guest Makeup',
    'Course Guide Inquiry',
  ];

  return (
    <section
      id="contact"
      className="bg-gradient-to-b from-[#FFF8F5] to-white px-4 py-20 sm:px-6 lg:px-8"
    >
      <div className="mx-auto max-w-3xl">
        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="mb-12 text-center"
        >
          <p className="mb-4 text-sm font-medium uppercase tracking-widest text-[#D4A373]">
            Get in Touch
          </p>
          <h2 className="heading-md mb-4 text-[#2B2B2B]">Book Your Consultation</h2>
          <p className="text-[#2B2B2B] opacity-75">
            Fill out the form below and we&apos;ll get back to you within 24 hours with
            personalized recommendations.
          </p>
        </motion.div>

        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="card-luxury bg-white"
        >
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="mb-2 block text-sm font-semibold text-[#2B2B2B]">
                Full Name *
              </label>
              <input
                type="text"
                placeholder="Your name"
                {...register('fullName')}
                className="w-full rounded-lg border-2 border-[#EAD7D1] px-4 py-3 transition-colors focus:border-[#D4A373] focus:outline-none"
              />
              {errors.fullName && (
                <p className="mt-1 text-sm text-[#B76E79]">{errors.fullName.message}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#2B2B2B]">
                Phone Number *
              </label>
              <input
                type="tel"
                placeholder="10-digit mobile number"
                {...register('phone')}
                className="w-full rounded-lg border-2 border-[#EAD7D1] px-4 py-3 transition-colors focus:border-[#D4A373] focus:outline-none"
              />
              {errors.phone && (
                <p className="mt-1 text-sm text-[#B76E79]">{errors.phone.message}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#2B2B2B]">
                Service Needed *
              </label>
              <select
                {...register('service')}
                className="w-full rounded-lg border-2 border-[#EAD7D1] bg-white px-4 py-3 transition-colors focus:border-[#D4A373] focus:outline-none"
              >
                <option value="">Select a service</option>
                {services.map((service) => (
                  <option key={service} value={service}>
                    {service}
                  </option>
                ))}
              </select>
              {errors.service && (
                <p className="mt-1 text-sm text-[#B76E79]">{errors.service.message}</p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#2B2B2B]">
                Preferred Date *
              </label>
              <input
                type="date"
                {...register('preferredDate')}
                className="w-full rounded-lg border-2 border-[#EAD7D1] px-4 py-3 transition-colors focus:border-[#D4A373] focus:outline-none"
              />
              {errors.preferredDate && (
                <p className="mt-1 text-sm text-[#B76E79]">
                  {errors.preferredDate.message}
                </p>
              )}
            </div>

            <div>
              <label className="mb-2 block text-sm font-semibold text-[#2B2B2B]">
                Additional Message
              </label>
              <textarea
                placeholder="Tell us more about your makeup preferences, style, or any special requirements"
                rows={4}
                {...register('message')}
                className="w-full resize-none rounded-lg border-2 border-[#EAD7D1] px-4 py-3 transition-colors focus:border-[#D4A373] focus:outline-none"
              />
            </div>

            <input
              type="text"
              {...register('botField')}
              autoComplete="off"
              tabIndex={-1}
              className="hidden"
              aria-hidden="true"
            />

            {submitStatus.type === 'success' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3 rounded border-l-4 border-green-500 bg-green-50 p-4"
              >
                <CheckCircle size={20} className="shrink-0 text-green-600" />
                <p className="font-medium text-green-700">{submitStatus.message}</p>
              </motion.div>
            )}

            {submitStatus.type === 'error' && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex gap-3 rounded border-l-4 border-red-500 bg-red-50 p-4"
              >
                <AlertCircle size={20} className="shrink-0 text-red-600" />
                <p className="font-medium text-red-700">{submitStatus.message}</p>
              </motion.div>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="btn-primary flex w-full items-center justify-center gap-2 disabled:cursor-not-allowed disabled:opacity-75"
            >
              {isSubmitting ? (
                <>
                  <Loader size={18} className="animate-spin" />
                  Submitting...
                </>
              ) : (
                <>
                  <Send size={18} />
                  Book Consultation
                </>
              )}
            </button>

            <p className="text-center text-xs text-[#2B2B2B] opacity-60">
              We respect your privacy. Your information is secure and will only be used
              to contact you about your booking.
            </p>
          </form>
        </motion.div>

        <motion.div
          initial={false}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="mt-12 grid grid-cols-1 gap-6 text-center md:grid-cols-2"
        >
          <div>
            <p className="mb-2 font-semibold text-[#D4A373]">WhatsApp</p>
            <a
              href="https://wa.me/919876543210"
              target="_blank"
              rel="noopener noreferrer"
              className="font-medium text-[#2B2B2B] transition-colors hover:text-[#D4A373]"
            >
              Chat with us
            </a>
          </div>
          <div>
            <p className="mb-2 font-semibold text-[#D4A373]">Response Time</p>
            <p className="text-[#2B2B2B] opacity-75">Within 24 hours</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
