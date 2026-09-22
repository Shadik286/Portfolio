"use client";

import { motion } from "framer-motion";
import { GraduationCap, Users } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "../ui/SectionHeading";
import { Card, fly } from "../ui/Card";
import { reveal } from "@/lib/motion";

const { leadership, education } = portfolioData;

export function LeadershipEducationSection() {
  return (
    <section
      id="education"
      className="relative border-t border-line px-6 py-28 md:px-12 md:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="06"
          kicker="Leadership & education"
          title="Off the keyboard."
          lead="Running the programming club I came up through, and finishing a CSE degree while doing it."
        />

        <div className="card-stage grid gap-5 lg:grid-cols-[1fr_1fr]">
          <div className="flex flex-col gap-5">
            {leadership.map((role, i) => (
              <motion.div
                key={`${role.role}-${role.period}`}
                {...reveal(i * 0.08)}
              >
                <Card className="p-6">
                  <div className="flex items-start gap-4">
                    <span
                      className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-primary/25 bg-primary/10 text-primary"
                      {...fly({ x: -9, y: 7, z: 38 })}
                    >
                      <Users className="h-[18px] w-[18px]" />
                    </span>
                    <div className="min-w-0 flex-1">
                      <h3
                        className="text-[15px] font-semibold tracking-tight text-fg"
                        {...fly({ x: 8, y: 7, z: 28, d: 0.04 })}
                      >
                        {role.role}
                      </h3>
                      <p
                        className="mt-1 text-[13.5px] text-fg-muted"
                        {...fly({ x: 8, y: 7, z: 20, d: 0.08 })}
                      >
                        {role.organization}
                      </p>
                    </div>
                    <span
                      className="shrink-0 font-mono text-[10.5px] tracking-[0.1em] text-fg-dim"
                      {...fly({ x: 10, y: -5, z: 32, d: 0.06 })}
                    >
                      {role.period}
                    </span>
                  </div>
                </Card>
              </motion.div>
            ))}
          </div>

          <motion.div
            {...reveal(0.1)}
          >
            <Card tilt className="h-full p-8">
              <div className="mb-6 flex items-center gap-3" {...fly({ x: -10, y: 8, z: 42 })}>
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                  <GraduationCap className="h-[18px] w-[18px]" />
                </span>
                <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-dim">
                  Education
                </span>
                <span className="ml-auto font-mono text-[10.5px] tracking-[0.1em] text-fg-dim">
                  {education.period}
                </span>
              </div>

              <h3
                className="text-pretty text-2xl font-semibold leading-tight tracking-tight text-fg"
                {...fly({ x: -8, y: 9, z: 34, d: 0.05 })}
              >
                {education.degree}
              </h3>

              <p
                className="mt-3 text-[15px] text-fg-muted"
                {...fly({ x: 8, y: 8, z: 24, d: 0.09 })}
              >
                {education.institution}
              </p>

              <div
                className="mt-7 flex items-baseline gap-3 border-t border-line pt-6"
                {...fly({ x: 0, y: 10, z: 20, d: 0.13 })}
              >
                <p className="font-mono text-3xl font-semibold text-fg">{education.cgpa}</p>
                <p className="text-[11px] uppercase tracking-[0.14em] text-fg-dim">CGPA</p>
              </div>

              <div className="mt-6" {...fly({ x: 0, y: 9, z: 16, d: 0.17 })}>
                <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-dim">
                  Thesis
                </p>
                <p className="mt-2 text-pretty text-[13.5px] leading-relaxed text-fg-muted">
                  {education.thesis}
                </p>
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
