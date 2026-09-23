"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Plus } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "../ui/SectionHeading";
import { reveal } from "@/lib/motion";

/**
 * Experience reads as a timeline of collapsed rows: role, employer and dates
 * on one line. Pointing at a row (or tabbing to it) opens the achievements
 * underneath it. The most recent role is open on arrival so the section is
 * never empty, and clicking toggles for touch devices that have no hover.
 */
export function ExperienceSection() {
  const [open, setOpen] = useState(0);

  return (
    <section
      id="experience"
      className="relative border-t border-line px-6 py-28 md:px-12 md:py-36"
    >
      <div className="mx-auto max-w-4xl">
        <SectionHeading
          index="04"
          kicker="Experience"
          title="Teaching what I build."
          lead="Two years inside the bdApps developer community, first as a campus ambassador and now mentoring the regional developer team."
        />

        <ol className="xp-list">
          {portfolioData.experience.map((exp, i) => {
            const isOpen = open === i;
            const role = exp.role.split("\u2014")[0].trim();
            const unit = exp.role.split("\u2014")[1]?.trim();

            return (
              <motion.li
                key={exp.role}
                className="xp-item"
                data-open={isOpen || undefined}
                {...reveal(i * 0.08)}
              >
                <button
                  type="button"
                  className="xp-head"
                  aria-expanded={isOpen}
                  aria-controls={`xp-panel-${i}`}
                  onMouseEnter={() => setOpen(i)}
                  onFocus={() => setOpen(i)}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  data-interactive
                >
                  <span className="xp-node" aria-hidden="true" />

                  <span className="min-w-0 flex-1 text-left">
                    <span className="flex flex-wrap items-baseline gap-x-2.5 gap-y-1">
                      <span className="text-[17px] font-semibold tracking-tight text-fg md:text-[19px]">
                        {role}
                      </span>
                      {unit && (
                        <span className="font-mono text-[10px] uppercase tracking-[0.14em] text-fg-dim">
                          {unit}
                        </span>
                      )}
                    </span>
                    <span className="mt-1 block text-sm text-primary">{exp.company}</span>
                    <span className="mt-1.5 block font-mono text-[10px] tracking-[0.1em] text-fg-dim sm:hidden">
                      {exp.period}
                    </span>
                  </span>

                  <span className="xp-period max-sm:hidden">{exp.period}</span>

                  <span className="xp-toggle" aria-hidden="true">
                    <Plus className="h-[15px] w-[15px]" />
                  </span>
                </button>

                <motion.div
                  id={`xp-panel-${i}`}
                  className="overflow-hidden"
                  initial={false}
                  animate={{ height: isOpen ? "auto" : 0, opacity: isOpen ? 1 : 0 }}
                  transition={{
                    height: { duration: 0.45, ease: [0.16, 1, 0.3, 1] },
                    opacity: { duration: isOpen ? 0.35 : 0.2, delay: isOpen ? 0.08 : 0 },
                  }}
                >
                  <ul className="xp-body">
                    {exp.achievements.map((achievement, ai) => (
                      <li
                        key={achievement}
                        className="xp-point"
                        style={{ transitionDelay: `${0.1 + ai * 0.06}s` }}
                      >
                        <span className="xp-bullet" aria-hidden="true" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </motion.div>
              </motion.li>
            );
          })}
        </ol>
      </div>
    </section>
  );
}
