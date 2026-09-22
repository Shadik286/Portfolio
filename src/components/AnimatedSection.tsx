"use client";

import { motion } from "framer-motion";
import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface AnimatedSectionProps {
  children: ReactNode;
  id?: string;
  className?: string;
  delay?: number;
}

export function AnimatedSection({ children, id, className, delay = 0 }: AnimatedSectionProps) {
  return (
    <motion.section
      id={id}
      className={cn("min-h-screen py-24 flex items-center relative z-10", className)}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      <div className="container mx-auto px-6 w-full">
        {children}
      </div>
    </motion.section>
  );
}
