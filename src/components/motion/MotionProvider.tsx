"use client";

import { MotionConfig } from "framer-motion";
import { ReactNode } from "react";
import { ScrollProgressBar } from "./ScrollProgressBar";

export function MotionProvider({ children }: { children: ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <ScrollProgressBar />
      {children}
    </MotionConfig>
  );
}
