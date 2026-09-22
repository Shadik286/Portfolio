"use client";

import { motion } from "framer-motion";
import { Briefcase } from "lucide-react";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "../ui/SectionHeading";
import { Card, fly } from "../ui/Card";
import { reveal } from "@/lib/motion";

export function ExperienceSection() {
  return (
    <section
      id="experience"
      className="relative border-t border-line px-6 py-28 md:px-12 md:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="04"
          kicker="Experience"
          title="Teaching what I build."
          lead="Two years inside the bdApps developer community, first as a campus ambassador and now mentoring the regional developer team."
        />

        <div className="card-stage grid gap-5 md:grid-cols-2">
          {portfolioData.experience.map((exp, i) => (
            <motion.div
              key={exp.role}
              {...reveal(i * 0.1)}
            >
              <Card tilt className="h-full p-7">
                <div className="mb-5 flex items-start gap-4" {...fly({ x: -10, y: 8, z: 40 })}>
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl border border-primary/25 bg-primary/10 text-primary">
                    <Briefcase className="h-[18px] w-[18px]" />
                  </span>
                  <div>
                    <h3 className="text-[17px] font-semibold leading-snug tracking-tight text-fg">
                      {exp.role.split("\u2014")[0].trim()}
                    </h3>
                    <p className="mt-1 text-sm text-primary">{exp.company}</p>
                  </div>
                  <span className="ml-auto shrink-0 rounded-full border border-line px-3 py-1 font-mono text-[10px] tracking-[0.1em] text-fg-dim">
                    {exp.period}
                  </span>
                </div>

                <ul className="flex flex-col gap-2.5">
                  {exp.achievements.map((achievement, ai) => (
                    <li
                      key={achievement}
                      className="flex items-start gap-3 text-[14px] leading-relaxed text-fg-muted"
                      {...fly({ x: 0, y: 8, z: 16 + ai * 4, d: 0.06 + ai * 0.05 })}
                    >
                      <span className="mt-[7px] h-1 w-1 shrink-0 rounded-full bg-primary" />
                      {achievement}
                    </li>
                  ))}
                </ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
