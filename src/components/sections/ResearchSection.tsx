"use client";

import { motion } from "framer-motion";
import { AudioLines, Braces, ShieldCheck, Video } from "lucide-react";
import { SiPytorch } from "react-icons/si";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "../ui/SectionHeading";
import { Card, fly } from "../ui/Card";
import { reveal } from "@/lib/motion";

const research = portfolioData.research;

const pipeline = [
  { Icon: AudioLines, label: "Audio stream", note: "Spectral features" },
  { Icon: Video, label: "Video stream", note: "Frame-level cues" },
  { Icon: Braces, label: "Cross-modal consistency", note: "Tri-level modelling" },
  { Icon: ShieldCheck, label: "Detection", note: "Real vs. synthetic" },
];

export function ResearchSection() {
  return (
    <section
      id="research"
      className="relative border-t border-line px-6 py-28 md:px-12 md:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="06"
          kicker="Research"
          title="Undergraduate thesis."
          lead={research.description}
        />

        <motion.div
          className="card-stage"
          {...reveal()}
        >
          <Card className="overflow-hidden p-0">
            <div className="grid lg:grid-cols-[0.9fr_1.1fr]">
              {/* title block */}
              <div className="border-b border-line p-8 lg:border-b-0 lg:border-r">
                <div className="mb-5 flex items-center gap-2.5" {...fly({ x: -10, y: 8, z: 42 })}>
                  <SiPytorch className="h-4 w-4 text-primary" />
                  <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-dim">
                    {research.tech}
                  </span>
                </div>

                <h3
                  className="text-4xl font-semibold tracking-tight text-fg md:text-5xl"
                  {...fly({ x: -8, y: 10, z: 36, d: 0.05 })}
                >
                  {research.title}
                </h3>

                <p
                  className="mt-4 text-pretty text-[15px] leading-relaxed text-fg-muted"
                  {...fly({ x: 8, y: 9, z: 24, d: 0.1 })}
                >
                  {research.subtitle}
                </p>

                <p
                  className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-dim"
                  {...fly({ x: 0, y: 8, z: 18, d: 0.14 })}
                >
                  Sylhet Engineering College · 2026
                </p>
              </div>

              {/* pipeline */}
              <div className="p-8">
                <p className="mb-6 font-mono text-[10px] uppercase tracking-[0.2em] text-fg-dim">
                  Pipeline
                </p>

                <ol className="relative flex flex-col gap-3">
                  {pipeline.map((step, i) => (
                    <li
                      key={step.label}
                      className="flex items-center gap-4 rounded-xl border border-line bg-ink-raised/60 px-4 py-3.5 transition-colors duration-300 hover:border-primary/35"
                      {...fly({ x: 0, y: 8, z: 14 + i * 6, d: 0.06 + i * 0.06 })}
                    >
                      <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                        <step.Icon className="h-[17px] w-[17px]" />
                      </span>
                      <div className="min-w-0">
                        <p className="text-[14px] font-medium text-fg">{step.label}</p>
                        <p className="text-[12px] text-fg-dim">{step.note}</p>
                      </div>
                      <span className="ml-auto font-mono text-[11px] text-fg-dim">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </section>
  );
}
