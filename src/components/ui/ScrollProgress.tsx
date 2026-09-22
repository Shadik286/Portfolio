"use client";

import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Reading-progress rail pinned to the top of the viewport. Springing the
 * raw scroll value keeps it from twitching on trackpad scroll.
 */
export function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  return (
    <motion.div
      aria-hidden
      style={{ scaleX }}
      className="fixed inset-x-0 top-0 z-[60] h-[2px] origin-left bg-gradient-to-r from-primary via-primary-soft to-amber shadow-[0_0_12px_rgba(76,125,255,0.6)]"
    />
  );
}
