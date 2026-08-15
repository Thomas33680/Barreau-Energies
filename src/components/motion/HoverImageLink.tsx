"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ReactNode } from "react";

const MotionLink = motion.create(Link);

export function HoverImageLink({
  href,
  className,
  children,
}: {
  href: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <MotionLink
      href={href}
      className={className}
      whileHover={{ y: -6 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
    >
      {children}
    </MotionLink>
  );
}
