"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

export function ScrollHero({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0.6]);
  const blur = useTransform(scrollYProgress, [0, 1], [0, 6]);
  const filter = useTransform(blur, (v) => `blur(${v}px)`);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ scale, opacity, filter }}
    >
      {children}
    </motion.div>
  );
}
