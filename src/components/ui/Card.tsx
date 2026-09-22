"use client";

import { useRef, type CSSProperties, type ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Props for a child that flies into place when its card is hovered.
 * x/y are the pixels it sits away from home at rest, r a slight rotation,
 * z how far it lifts toward the viewer, d its place in the stagger.
 *
 * Returns props to spread rather than a className, so it can never clobber
 * the className an element already carries.
 */
export function fly({
  x = 0,
  y = 10,
  r = 0,
  z = 26,
  d = 0,
}: { x?: number; y?: number; r?: number; z?: number; d?: number } = {}) {
  return {
    "data-fly": true,
    style: {
      "--fx": `${x}px`,
      "--fy": `${y}px`,
      "--fr": `${r}deg`,
      "--fz": `${z}px`,
      "--fd": `${d}s`,
    } as CSSProperties,
  };
}

interface CardProps {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  /** 3D tilt under the pointer. Off for tall or text-heavy cards. */
  tilt?: boolean;
  /** Amber lighting — achievement cards only. */
  amber?: boolean;
  as?: "div" | "article" | "li";
}

export function Card({
  children,
  className,
  style,
  tilt = false,
  amber = false,
  as: Tag = "div",
}: CardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const handleMove = (e: React.PointerEvent<HTMLElement>) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    if (tilt) {
      el.style.transform = `perspective(1000px) rotateX(${(0.5 - py) * 7}deg) rotateY(${
        (px - 0.5) * 7
      }deg) translateY(-4px)`;
    }
  };

  const handleLeave = () => {
    const el = ref.current;
    if (!el || !tilt) return;
    el.style.transform = "";
  };

  return (
    <Tag
      ref={ref as never}
      className={cn("card", amber && "card-amber", className)}
      style={style}
      onPointerMove={handleMove}
      onPointerLeave={handleLeave}
    >
      {children}
    </Tag>
  );
}
