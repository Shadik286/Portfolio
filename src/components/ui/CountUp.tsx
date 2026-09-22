"use client";

import { useEffect, useRef, useState } from "react";
import { useInView, useReducedMotion } from "framer-motion";

interface CountUpProps {
  /** Digits to animate, e.g. "1576" or "61st" or "3.78". */
  value: string;
  className?: string;
  duration?: number;
}

/**
 * Counts the numeric part of a value up when it scrolls into view, keeping
 * any suffix ("st", "+") pinned so the label never reflows mid-animation.
 */
export function CountUp({ value, className, duration = 1400 }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const reduced = useReducedMotion();

  const match = value.match(/^([\d.]+)(.*)$/);
  const target = match ? parseFloat(match[1]) : NaN;
  const suffix = match ? match[2] : "";
  const decimals = match && match[1].includes(".") ? match[1].split(".")[1].length : 0;

  const [shown, setShown] = useState(() => (Number.isNaN(target) ? value : "0"));

  useEffect(() => {
    if (!inView || Number.isNaN(target)) return;
    if (reduced) {
      setShown(target.toFixed(decimals));
      return;
    }
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - t, 3);
      setShown((target * eased).toFixed(decimals));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, target, decimals, duration, reduced]);

  if (Number.isNaN(target)) {
    return (
      <span ref={ref} className={className}>
        {value}
      </span>
    );
  }

  return (
    <span ref={ref} className={className}>
      {shown}
      {suffix}
    </span>
  );
}
