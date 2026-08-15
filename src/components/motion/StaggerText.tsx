"use client";

import { motion, Variants } from "framer-motion";

const container: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.05 },
  },
};

const word: Variants = {
  hidden: { opacity: 0, y: 18 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};

export function StaggerText({
  text,
  className,
}: {
  text: string;
  className?: string;
}) {
  const words = text.split(" ");

  return (
    <motion.h1
      className={className}
      initial="hidden"
      animate="visible"
      variants={container}
      aria-label={text}
    >
      {words.map((w, i) => (
        <motion.span
          key={i}
          variants={word}
          className="inline-block whitespace-pre"
          aria-hidden="true"
        >
          {w}
          {i < words.length - 1 ? " " : ""}
        </motion.span>
      ))}
    </motion.h1>
  );
}
