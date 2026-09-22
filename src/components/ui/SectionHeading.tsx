"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SectionHeadingProps {
  /** Two-digit section index, e.g. "02" */
  index: string;
  kicker: string;
  title: string;
  lead?: string;
  align?: "left" | "center";
  className?: string;
}

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * One heading treatment for every section, so the page reads as one system.
 * On scroll the rule draws itself outward and the title arrives word by word
 * from under a clipping mask, which is what gives each section its beat.
 */
export function SectionHeading({
  index,
  kicker,
  title,
  lead,
  align = "left",
  className,
}: SectionHeadingProps) {
  const words = title.split(" ");

  return (
    <motion.header
      className={cn("mb-14 max-w-2xl", align === "center" && "mx-auto text-center", className)}
      initial="hidden"
      whileInView="shown"
      viewport={{ once: true, margin: "-80px" }}
    >
      <div
        className={cn(
          "mb-5 flex items-center gap-3",
          align === "center" && "justify-center"
        )}
      >
        <motion.span
          className="font-mono text-xs tracking-[0.3em] text-primary"
          variants={{
            hidden: { opacity: 0, x: -8 },
            shown: { opacity: 1, x: 0, transition: { duration: 0.5, ease: EASE } },
          }}
        >
          {index}
        </motion.span>

        {/* the rule draws itself */}
        <motion.span
          className="h-px w-8 origin-left bg-line-hi"
          variants={{
            hidden: { scaleX: 0 },
            shown: { scaleX: 1, transition: { duration: 0.6, delay: 0.1, ease: EASE } },
          }}
        />

        <motion.span
          className="font-mono text-xs uppercase tracking-[0.3em] text-fg-dim"
          variants={{
            hidden: { opacity: 0, x: 8 },
            shown: { opacity: 1, x: 0, transition: { duration: 0.5, delay: 0.15, ease: EASE } },
          }}
        >
          {kicker}
        </motion.span>
      </div>

      {/* title: each word rises out of its own clipping mask */}
      <h2
        className={cn(
          "flex flex-wrap gap-x-[0.28em] text-balance text-3xl font-semibold tracking-tight text-fg md:text-[2.75rem] md:leading-[1.1]",
          align === "center" && "justify-center"
        )}
      >
        {words.map((word, i) => (
          <span key={`${word}-${i}`} className="inline-block overflow-hidden pb-[0.08em]">
            <motion.span
              className="inline-block"
              variants={{
                hidden: { y: "110%" },
                shown: {
                  y: "0%",
                  transition: { duration: 0.75, delay: 0.12 + i * 0.055, ease: EASE },
                },
              }}
            >
              {word}
            </motion.span>
          </span>
        ))}
      </h2>

      {lead && (
        <motion.p
          className="mt-5 text-pretty text-base leading-relaxed text-fg-muted md:text-lg"
          variants={{
            hidden: { opacity: 0, y: 14 },
            shown: {
              opacity: 1,
              y: 0,
              transition: { duration: 0.7, delay: 0.25 + words.length * 0.03, ease: EASE },
            },
          }}
        >
          {lead}
        </motion.p>
      )}
    </motion.header>
  );
}
