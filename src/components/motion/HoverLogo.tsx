"use client";

import Image from "next/image";
import { motion } from "framer-motion";

export function HoverLogo({
  src,
  alt,
  width,
  height,
}: {
  src: string;
  alt: string;
  width: number;
  height: number;
}) {
  return (
    <motion.div whileHover={{ scale: 1.08 }} transition={{ type: "spring", stiffness: 300, damping: 15 }}>
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        className="h-7 w-auto object-contain grayscale transition-all duration-300 hover:grayscale-0 sm:h-9"
      />
    </motion.div>
  );
}
