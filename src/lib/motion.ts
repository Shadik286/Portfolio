import type { Variants } from "framer-motion";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * The page-wide entrance for anything that arrives on scroll.
 *
 * Cards tilt up from a shallow rotateX as they rise, so entering feels like
 * the card swinging into the page rather than sliding over it. One helper
 * keeps every section on the same curve and the same trigger point.
 */
export function reveal(delay = 0) {
  return {
    initial: { opacity: 0, y: 34, rotateX: 6, scale: 0.985, transformPerspective: 1000 },
    whileInView: { opacity: 1, y: 0, rotateX: 0, scale: 1, transformPerspective: 1000 },
    viewport: { once: true, margin: "-70px" },
    transition: { duration: 0.75, delay, ease: EASE },
  } as const;
}

/** Plain rise, for text that should not rotate. */
export function riseIn(delay = 0) {
  return {
    initial: { opacity: 0, y: 22 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true, margin: "-70px" },
    transition: { duration: 0.65, delay, ease: EASE },
  } as const;
}

/** Parent/child pair for staggering a list as it scrolls into view. */
export const staggerParent: Variants = {
  hidden: {},
  shown: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

export const staggerChild: Variants = {
  hidden: { opacity: 0, y: 18 },
  shown: { opacity: 1, y: 0, transition: { duration: 0.55, ease: EASE } },
};
