"use client";

import { motion } from "framer-motion";

const blobs = [
  { className: "absolute -left-24 top-10 h-80 w-80 rounded-full bg-sky-400/25 blur-3xl", animate: { x: [0, 30, 0], y: [0, -22, 0] }, duration: 14 },
  { className: "absolute right-0 top-24 h-96 w-96 rounded-full bg-indigo-400/20 blur-3xl", animate: { x: [0, -34, 0], y: [0, 26, 0] }, duration: 17 },
  { className: "absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-emerald-400/20 blur-3xl", animate: { x: [0, 22, 0], y: [0, -18, 0] }, duration: 15 },
];

const particles = [
  { top: "18%", left: "12%", size: "size-2", delay: 0 },
  { top: "32%", left: "82%", size: "size-1.5", delay: 1.2 },
  { top: "64%", left: "20%", size: "size-2.5", delay: 0.6 },
  { top: "74%", left: "70%", size: "size-1.5", delay: 1.8 },
  { top: "46%", left: "46%", size: "size-2", delay: 2.4 },
];

export function AnimatedBackground() {
  return (
    <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
      {blobs.map((blob, index) => (
        <motion.div
          key={index}
          className={blob.className}
          animate={blob.animate}
          transition={{ duration: blob.duration, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
        />
      ))}

      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(148,163,184,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(148,163,184,0.08)_1px,transparent_1px)] [background-size:64px_64px] [mask-image:radial-gradient(ellipse_at_center,black,transparent_75%)]" />

      {particles.map((particle, index) => (
        <motion.span
          key={index}
          className={`absolute rounded-full bg-white/70 shadow-[0_0_18px_rgba(56,189,248,0.6)] dark:bg-sky-300/60 ${particle.size}`}
          style={{ top: particle.top, left: particle.left }}
          animate={{ y: [0, -16, 0], opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: particle.delay }}
        />
      ))}
    </div>
  );
}
