"use client";

import { useEffect, useRef, useState, ReactNode } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { usePathname } from "next/navigation";
import Image from "next/image";

type Phase = "idle" | "covering" | "revealing";

const COVER_MS = 450;
const REVEAL_MS = 500;
const EASE: [number, number, number, number] = [0.4, 0, 0.2, 1];

export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const prefersReduced = useReducedMotion();
  const [displayChildren, setDisplayChildren] = useState(() => children);
  const [phase, setPhase] = useState<Phase>("idle");
  const previousPathname = useRef(pathname);

  useEffect(() => {
    if (prefersReduced || previousPathname.current === pathname) {
      previousPathname.current = pathname;
      return;
    }
    previousPathname.current = pathname;

    setPhase("covering");
    const coverTimer = setTimeout(() => {
      setDisplayChildren(children);
      setPhase("revealing");
    }, COVER_MS);

    return () => clearTimeout(coverTimer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname, prefersReduced]);

  useEffect(() => {
    if (phase !== "revealing") return;
    const revealTimer = setTimeout(() => setPhase("idle"), REVEAL_MS);
    return () => clearTimeout(revealTimer);
  }, [phase]);

  const content = prefersReduced ? children : displayChildren;

  return (
    <>
      {content}
      {phase !== "idle" && !prefersReduced && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center overflow-hidden bg-ink"
          initial={{ y: "-100%" }}
          animate={{ y: phase === "covering" ? "0%" : "100%" }}
          transition={{
            duration: phase === "covering" ? COVER_MS / 1000 : REVEAL_MS / 1000,
            ease: EASE,
          }}
        >
          <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/25 via-transparent to-brand-orange/25" />
          <motion.div
            initial={{ scale: 0.7, opacity: 0 }}
            animate={{
              scale: phase === "covering" ? 1 : 0.7,
              opacity: phase === "covering" ? 1 : 0,
            }}
            transition={{ duration: 0.28, delay: phase === "covering" ? 0.08 : 0 }}
          >
            <Image
              src="/logo-mark.png"
              alt=""
              width={340}
              height={406}
              className="h-16 w-auto drop-shadow-[0_0_24px_rgba(103,184,20,0.35)]"
            />
          </motion.div>
        </motion.div>
      )}
    </>
  );
}
