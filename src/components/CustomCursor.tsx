"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export function CustomCursor() {
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isAnchor, setIsAnchor] = useState(false);

  // Raw mouse position
  const mouseX = useMotionValue(-100);
  const mouseY = useMotionValue(-100);

  // Smooth springs for the cursor rings
  const smoothX = useSpring(mouseX, { stiffness: 300, damping: 25, mass: 0.5 });
  const smoothY = useSpring(mouseY, { stiffness: 300, damping: 25, mass: 0.5 });

  // Trailing ring for extra smoothness
  const trailingX = useSpring(mouseX, { stiffness: 150, damping: 20, mass: 1 });
  const trailingY = useSpring(mouseY, { stiffness: 150, damping: 20, mass: 1 });

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
      if (!isVisible) setIsVisible(true);
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      
      const anchor = target.closest("[data-anchor]");
      if (anchor) {
        setIsAnchor(true);
      } else {
        setIsAnchor(false);
      }

      if (
        target.tagName.toLowerCase() === "a" ||
        target.tagName.toLowerCase() === "button" ||
        target.closest("a") ||
        target.closest("button") ||
        target.closest("[data-interactive]") ||
        anchor
      ) {
        setIsHovering(true);
      } else {
        setIsHovering(false);
      }
    };

    const handleMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener("mousemove", updateMousePosition);
    window.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      window.removeEventListener("mousemove", updateMousePosition);
      window.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [isVisible, mouseX, mouseY]);

  // Hide on mobile/touch devices
  if (typeof window !== "undefined" && window.matchMedia("(hover: none)").matches) {
    return null;
  }

  return (
    <>
      {/* Inner Dot */}
      <motion.div
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[100] mix-blend-screen"
        style={{
          x: mouseX,
          y: mouseY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isAnchor ? 0 : (isHovering ? 0 : 1),
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ type: "spring", stiffness: 1000, damping: 50, mass: 0.1 }}
      />
      
      {/* Smooth Outer Ring */}
      <motion.div
        className="fixed top-0 left-0 w-10 h-10 border border-primary/50 rounded-full pointer-events-none z-[100] mix-blend-screen"
        style={{
          x: smoothX,
          y: smoothY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isAnchor ? 2.5 : (isHovering ? 1.5 : 1),
          opacity: isVisible ? (isAnchor ? 0.8 : 0.5) : 0,
          backgroundColor: isAnchor ? "rgba(59, 130, 246, 0.15)" : (isHovering ? "rgba(59, 130, 246, 0.05)" : "transparent"),
          borderWidth: isAnchor ? "2px" : "1px",
        }}
        transition={{ type: "spring", stiffness: 400, damping: 30, mass: 0.5 }}
      />

      {/* Trailing Distortion / Glow */}
      <motion.div
        className="fixed top-0 left-0 w-24 h-24 bg-primary/10 rounded-full blur-xl pointer-events-none z-[90] mix-blend-screen"
        style={{
          x: trailingX,
          y: trailingY,
          translateX: "-50%",
          translateY: "-50%",
        }}
        animate={{
          scale: isAnchor ? 2 : (isHovering ? 1.5 : 1),
          opacity: isVisible ? (isAnchor ? 1 : 0) : 0,
        }}
      />
    </>
  );
}
