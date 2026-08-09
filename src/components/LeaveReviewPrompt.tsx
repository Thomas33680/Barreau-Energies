"use client";

import { useState } from "react";
import { ReviewForm } from "@/components/ReviewForm";

export function LeaveReviewPrompt() {
  const [open, setOpen] = useState(false);

  if (open) {
    return (
      <div className="w-full max-w-xl rounded-2xl border border-ink/10 bg-white p-6 text-left shadow-sm sm:p-8">
        <ReviewForm />
      </div>
    );
  }

  return (
    <button
      type="button"
      onClick={() => setOpen(true)}
      className="inline-flex cursor-pointer items-center justify-center gap-2 rounded-full bg-brand-green px-6 py-3 text-sm font-semibold tracking-wide text-white transition-colors duration-200 hover:bg-brand-green/90"
    >
      Laisser un avis
    </button>
  );
}
