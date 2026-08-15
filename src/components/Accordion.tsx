"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { FaqItem } from "@/lib/site-config";
import { StaggerGroup, StaggerItem } from "@/components/motion/StaggerGroup";

export function Accordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <StaggerGroup className="flex flex-col gap-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <StaggerItem
            key={item.question}
            className="overflow-hidden rounded-2xl border border-ink/10 bg-white transition-colors duration-200 hover:border-brand-green/30"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-center justify-between gap-4 p-6 text-left"
            >
              <span className="text-base font-bold text-ink">{item.question}</span>
              <motion.span
                animate={{ rotate: isOpen ? 180 : 0 }}
                transition={{ duration: 0.25 }}
                className="shrink-0 text-brand-green"
              >
                <ChevronDown size={20} aria-hidden="true" />
              </motion.span>
            </button>
            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <p className="px-6 pb-6 text-sm leading-relaxed text-ink/70">
                    {item.answer}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </StaggerItem>
        );
      })}
    </StaggerGroup>
  );
}
