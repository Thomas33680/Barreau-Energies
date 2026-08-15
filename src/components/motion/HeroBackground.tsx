"use client";

import { motion } from "framer-motion";

/** Hélice à pales pleines incurvées (façon ventilateur de PAC/clim), plus réaliste que l'icône Fan de lucide. */
function PropellerIcon({ size, className }: { size: number; className?: string }) {
  const blade =
    "M50,50 C42,36 44,18 62,9 C76,2 90,8 88,18 C85,32 68,42 50,50 Z";

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      fill="currentColor"
      stroke="none"
      className={className}
    >
      <path d={blade} />
      <path d={blade} transform="rotate(120 50 50)" />
      <path d={blade} transform="rotate(240 50 50)" />
      <circle cx="50" cy="50" r="6" />
    </svg>
  );
}

const particles = Array.from({ length: 16 }, (_, i) => {
  const left = (i * 37) % 100;
  const size = 3 + ((i * 7) % 5);
  const duration = 10 + ((i * 5) % 9);
  const delay = (i * 1.3) % 8;
  return { id: i, left, size, duration, delay };
});

export function HeroBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <motion.div
        className="absolute -right-32 -top-32 h-96 w-96 rounded-full bg-brand-green/20 blur-3xl"
        animate={{ x: [0, 40, -10, 0], y: [0, -20, 30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -bottom-32 left-1/3 h-96 w-96 rounded-full bg-brand-blue/20 blur-3xl"
        animate={{ x: [0, -30, 20, 0], y: [0, 25, -15, 0] }}
        transition={{ duration: 24, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute left-1/4 top-1/4 h-64 w-64 rounded-full bg-brand-orange/10 blur-3xl"
        animate={{ x: [0, 20, -25, 0], y: [0, -15, 10, 0] }}
        transition={{ duration: 26, repeat: Infinity, ease: "easeInOut" }}
      />

      <PropellerIcon
        size={420}
        className="motion-safe:animate-[fan-spin_16s_linear_infinite] absolute -right-20 -top-20 text-ink/[0.05]"
      />

      {particles.map((p) => (
        <span
          key={p.id}
          className="motion-safe:animate-[float-up_var(--duration)_linear_infinite] absolute bottom-0 rounded-full bg-ink/10"
          style={
            {
              left: `${p.left}%`,
              width: p.size,
              height: p.size,
              animationDelay: `${p.delay}s`,
              "--duration": `${p.duration}s`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
