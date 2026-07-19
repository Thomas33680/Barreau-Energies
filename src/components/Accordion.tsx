"use client";

import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { FaqItem } from "@/lib/site-config";

export function Accordion({ items }: { items: FaqItem[] }) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <div className="flex flex-col gap-4">
      {items.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={item.question}
            className="rounded-2xl border border-ink/10 bg-white"
          >
            <button
              type="button"
              onClick={() => setOpenIndex(isOpen ? null : index)}
              aria-expanded={isOpen}
              className="flex w-full cursor-pointer items-center justify-between gap-4 p-6 text-left"
            >
              <span className="text-base font-bold text-ink">{item.question}</span>
              <ChevronDown
                size={20}
                className={`shrink-0 text-brand-green transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
                aria-hidden="true"
              />
            </button>
            {isOpen && (
              <p className="px-6 pb-6 text-sm leading-relaxed text-ink/70">
                {item.answer}
              </p>
            )}
          </div>
        );
      })}
    </div>
  );
}
