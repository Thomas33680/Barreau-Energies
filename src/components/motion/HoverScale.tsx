"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";

export function HoverScale({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      whileHover={{ scale: 1.04 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      {children}
    </motion.div>
  );
}
