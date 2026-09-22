"use client";

import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";

/**
 * Two slow cobalt washes and a masked grid. Deliberately quiet — the cards
 * carry the colour, the background only gives them something to sit on.
 */
export function AnimatedBackground() {
  const [mounted, setMounted] = useState(false);
  const reduced = useReducedMotion();

  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-ink">
      {/* masked grid */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:56px_56px] [mask-image:radial-gradient(ellipse_70%_55%_at_50%_0%,#000_60%,transparent_100%)]" />

      <motion.div
        className="absolute -left-[12%] -top-[18%] h-[55%] w-[48%] rounded-full bg-primary/[0.09] blur-[130px]"
        animate={reduced ? undefined : { x: [0, 90, 0], y: [0, 50, 0] }}
        transition={{ duration: 28, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute -right-[10%] top-[28%] h-[50%] w-[42%] rounded-full bg-primary-soft/[0.07] blur-[130px]"
        animate={reduced ? undefined : { x: [0, -70, 0], y: [0, 80, 0] }}
        transition={{ duration: 34, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* vignette keeps the lower page calm */}
      <div className="absolute inset-x-0 bottom-0 h-[45%] bg-gradient-to-t from-ink via-ink/70 to-transparent" />
    </div>
  );
}
