"use client";

import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Trophy } from "lucide-react";
import { SiCodeforces } from "react-icons/si";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "../ui/SectionHeading";
import { Card, fly } from "../ui/Card";
import { reveal, staggerChild, staggerParent } from "@/lib/motion";

const cp = portfolioData.competitiveProgramming;
const social = portfolioData.personal.social;

/**
 * Codeforces and AtCoder are separate judges with separate rating systems, so
 * each gets its own card linking to its own profile. Nothing is shared between
 * them but the amber that marks every achievement on the page.
 */
const platformMeta: Record<
  string,
  { href: string; Icon?: ComponentType<{ className?: string }>; monogram?: string; scale: string }
> = {
  Codeforces: { href: social.codeforces, Icon: SiCodeforces, scale: "Max rating" },
  AtCoder: { href: social.atcoder, monogram: "AC", scale: "Kyu rank" },
};

function PlatformCard({ platform }: { platform: (typeof cp.platforms)[number] }) {
  const meta = platformMeta[platform.name];

  return (
    <a
      href={meta.href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block h-full"
      data-interactive
    >
      <Card amber className="flex h-full flex-col p-8">
        <div className="flex items-center gap-3" {...fly({ x: -10, y: 8, z: 42 })}>
          {meta.Icon ? (
            <meta.Icon className="h-5 w-5 text-amber" />
          ) : (
            <span className="grid h-5 w-5 place-items-center rounded-[5px] border border-amber/40 font-mono text-[9px] font-bold text-amber">
              {meta.monogram}
            </span>
          )}
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-fg-dim">
            {platform.name}
          </span>
          <ArrowUpRight className="ml-auto h-4 w-4 text-fg-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-amber" />
        </div>

        <p
          className="mt-7 text-4xl font-semibold tracking-tight text-amber md:text-5xl"
          {...fly({ x: -8, y: 10, z: 36, d: 0.05 })}
        >
          {platform.rank}
        </p>

        <p
          className="mt-auto pt-7 flex items-baseline gap-2.5"
          {...fly({ x: 8, y: 9, z: 26, d: 0.1 })}
        >
          {platform.maxRating && (
            <span className="font-mono text-2xl font-semibold text-fg">
              {platform.maxRating}
            </span>
          )}
          <span className="text-[11px] uppercase tracking-[0.14em] text-fg-dim">
            {meta.scale}
          </span>
        </p>
      </Card>
    </a>
  );
}

export function CPSection() {
  return (
    <section
      id="competitive-programming"
      className="relative border-t border-line px-6 py-28 md:px-12 md:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="05"
          kicker="Competitive programming"
          title="Four years of contests."
          lead="Ratings and placements, verbatim. This is the discipline the rest of my engineering rests on."
        />

        <div className="card-stage grid gap-5">
          {/* ------------------------------------------- judges, one per card */}
          <div className="grid gap-5 md:grid-cols-2">
            {cp.platforms.map((platform, i) => (
              <motion.div key={platform.name} {...reveal(i * 0.08)}>
                <PlatformCard platform={platform} />
              </motion.div>
            ))}
          </div>

          {/* --------------------------------------------------- international */}
          <div className="grid gap-5 md:grid-cols-2">
            {cp.international.map((item, i) => (
              <motion.div key={item.event} {...reveal(0.08 + i * 0.08)}>
                <Card amber className="h-full p-6">
                  <div className="mb-3 flex items-center gap-2" {...fly({ x: -8, y: 7, z: 38 })}>
                    <Trophy className="h-4 w-4 text-amber" />
                    <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-dim">
                      International
                    </span>
                  </div>
                  <p
                    className="text-[15px] font-medium text-fg"
                    {...fly({ x: 6, y: 8, z: 26, d: 0.05 })}
                  >
                    {item.event}
                  </p>
                  <p
                    className="mt-1.5 flex items-baseline gap-2 font-mono text-sm text-amber"
                    {...fly({ x: 6, y: 8, z: 20, d: 0.09 })}
                  >
                    {item.result}
                    {item.detail && (
                      <span className="text-[11px] tracking-[0.08em] text-fg-dim">
                        {item.detail}
                      </span>
                    )}
                  </p>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* ------------------------------------------ inter-university grid */}
          <motion.div {...reveal(0.1)}>
            <Card className="p-7">
              <div
                className="mb-6 flex items-baseline justify-between"
                {...fly({ x: -8, y: 7, z: 34 })}
              >
                <h3 className="text-base font-semibold tracking-tight text-fg">
                  Inter-university contests
                </h3>
                <span className="font-mono text-[11px] text-fg-dim">
                  {String(cp.national.length).padStart(2, "0")} events
                </span>
              </div>

              <motion.ul
                className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3"
                variants={staggerParent}
                initial="hidden"
                whileInView="shown"
                viewport={{ once: true, margin: "-40px" }}
              >
                {cp.national.map((item, i) => (
                  <motion.li
                    variants={staggerChild}
                    key={item.event}
                    className="flex items-start justify-between gap-3 rounded-lg border border-line bg-ink-raised/60 px-4 py-3 transition-colors duration-300 hover:border-amber/35"
                    {...fly({ x: 0, y: 8, r: i % 2 ? 2 : -2, z: 14 + (i % 3) * 5, d: 0.04 + i * 0.03 })}
                  >
                    <span className="min-w-0">
                      <span className="block text-[13px] text-fg-muted">{item.event}</span>
                      {item.detail && (
                        <span className="mt-0.5 block font-mono text-[10.5px] tracking-[0.06em] text-fg-dim">
                          {item.detail}
                        </span>
                      )}
                    </span>
                    <span className="shrink-0 font-mono text-[15px] font-semibold text-amber">
                      {item.result}
                    </span>
                  </motion.li>
                ))}
              </motion.ul>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
