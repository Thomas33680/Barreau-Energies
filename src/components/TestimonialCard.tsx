"use client";

import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { Testimonial } from "@/lib/site-config";

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className="flex flex-col rounded-2xl border border-ink/10 bg-white p-8 shadow-sm transition-shadow duration-300 hover:shadow-xl hover:shadow-ink/10"
    >
      <div className="flex gap-1 text-brand-orange" aria-label={`${testimonial.rating} sur 5 étoiles`}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star
            key={i}
            size={16}
            fill={i < testimonial.rating ? "currentColor" : "none"}
            aria-hidden="true"
          />
        ))}
      </div>
      <p className="mt-4 flex-1 text-sm leading-relaxed text-ink/75">
        « {testimonial.quote} »
      </p>
      <div className="mt-6 border-t border-ink/10 pt-4">
        <p className="text-sm font-bold text-ink">{testimonial.name}</p>
        <p className="text-xs text-ink/50">
          {testimonial.location} — {testimonial.service}
        </p>
      </div>
    </motion.div>
  );
}
