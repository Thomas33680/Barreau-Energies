"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function HoverLogo({ src, alt }: { src: string; alt: string }) {
  return (
    <motion.div
      whileHover={{ scale: 1.08 }}
      transition={{ type: "spring", stiffness: 300, damping: 15 }}
      className="relative h-10 w-32 sm:h-12 sm:w-36"
    >
      <Image
        src={src}
        alt={alt}
        fill
        sizes="160px"
        className="object-contain grayscale transition-all duration-300 hover:grayscale-0"
      />
    </motion.div>
  );
}
