"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, ExternalLink } from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "../ui/SectionHeading";
import { Card, fly } from "../ui/Card";
import { Parallax } from "../ui/Parallax";
import { reveal } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Project = (typeof portfolioData.projects)[number];

function ProjectCard({ project, featured }: { project: Project; featured: boolean }) {
  const hasLinks = Boolean(project.github || project.live);

  return (
    <Card
      as="article"
      className={cn(
        "group flex h-full flex-col overflow-hidden p-0",
        featured && "lg:flex-row"
      )}
    >
      {/* ----------------------------------------------------------- media */}
      <div
        className={cn(
          "relative shrink-0 overflow-hidden border-line",
          featured ? "border-b lg:w-[46%] lg:border-b-0 lg:border-r" : "border-b"
        )}
      >
        <Parallax
          distance={featured ? 26 : 18}
          className={cn("relative overflow-hidden", featured ? "h-56 lg:h-full lg:min-h-[320px]" : "h-44")}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={project.image}
            alt={`${project.name} artwork`}
            loading="lazy"
            className="h-[126%] w-full -translate-y-[10%] object-cover transition-transform duration-700 group-hover:scale-[1.04]"
          />
          <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-surface via-transparent to-transparent opacity-80" />
        </Parallax>

        <span
          className="absolute left-4 top-4 rounded-full border border-line bg-ink/85 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-fg-muted backdrop-blur-sm"
          {...fly({ x: -10, y: -6, z: 46 })}
        >
          {project.category}
        </span>
      </div>

      {/* ------------------------------------------------------------ body */}
      <div className="flex flex-1 flex-col p-6">
        <h3
          className="text-xl font-semibold tracking-tight text-fg"
          {...fly({ x: -10, y: 8, z: 40 })}
        >
          {project.name}
        </h3>

        <p
          className="mt-3 text-pretty text-[14.5px] leading-relaxed text-fg-muted"
          {...fly({ x: 8, y: 9, z: 28, d: 0.05 })}
        >
          {project.description}
        </p>

        {/* metrics — the numbers that make the scope legible at a glance */}
        <dl
          className="mt-6 grid grid-cols-3 gap-3 border-y border-line py-4"
          {...fly({ x: 0, y: 10, z: 22, d: 0.09 })}
        >
          {project.metrics.map((m) => (
            <div key={m.label}>
              <dt className="font-mono text-base font-semibold text-primary">{m.value}</dt>
              <dd className="mt-0.5 text-[10.5px] uppercase leading-tight tracking-[0.12em] text-fg-dim">
                {m.label}
              </dd>
            </div>
          ))}
        </dl>

        {/* features — only on the featured card, where there is room */}
        {featured && (
          <ul className="mt-5 grid gap-2 sm:grid-cols-2">
            {project.features.slice(0, 6).map((feature, i) => (
              <li
                key={feature}
                className="flex items-start gap-2 text-[13px] leading-snug text-fg-muted"
                {...fly({ x: 0, y: 7, z: 16, d: 0.12 + i * 0.03 })}
              >
                <span className="mt-[6px] h-1 w-1 shrink-0 rounded-full bg-primary" />
                {feature}
              </li>
            ))}
          </ul>
        )}

        <ul className="mt-6 flex flex-wrap gap-1.5">
          {project.techStack.map((tech, i) => (
            <li
              key={tech}
              className="rounded-md border border-line bg-ink-raised/60 px-2.5 py-1 font-mono text-[11px] text-fg-dim transition-colors duration-300 group-hover:border-line-hi group-hover:text-fg-muted"
              {...fly({ x: 0, y: 7, r: i % 2 ? 3 : -3, z: 14, d: 0.15 + i * 0.03 })}
            >
              {tech}
            </li>
          ))}
        </ul>

        {hasLinks && (
          <div
            className="mt-6 flex flex-wrap items-center gap-2 pt-1"
            {...fly({ x: 0, y: 11, z: 32, d: 0.2 })}
          >
            {project.live && (
              <a
                href={project.live}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-[13px] font-medium text-white transition-colors duration-300 hover:bg-primary-deep"
                data-interactive
              >
                <ExternalLink className="h-3.5 w-3.5" />
                Live app
              </a>
            )}
            {project.github && (
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-line px-4 py-2 text-[13px] text-fg-muted transition-colors duration-300 hover:border-line-hi hover:text-fg"
                data-interactive
              >
                <FaGithub className="h-3.5 w-3.5" />
                Repository
              </a>
            )}
          </div>
        )}

        {!hasLinks && (
          <p
            className="mt-6 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-dim"
            {...fly({ x: 0, y: 8, z: 20, d: 0.2 })}
          >
            Private repository
          </p>
        )}
      </div>
    </Card>
  );
}

export function ProjectsSection() {
  const [featured, ...rest] = portfolioData.projects;

  return (
    <section
      id="projects"
      className="relative border-t border-line px-6 py-28 md:px-12 md:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="03"
          kicker="Selected work"
          title="Products I built end to end."
          lead="Each of these covers the whole stack — the interface, the API behind it, and the schema underneath. Numbers are the real scope, not estimates."
        />

        <div className="card-stage grid gap-5">
          <motion.div
            {...reveal()}
          >
            <ProjectCard project={featured} featured />
          </motion.div>

          <div className="grid gap-5 md:grid-cols-3">
            {rest.map((project, i) => (
              <motion.div
                key={project.id}
                {...reveal(i * 0.08)}
              >
                <ProjectCard project={project} featured={false} />
              </motion.div>
            ))}
          </div>
        </div>

        <motion.a
          href={portfolioData.personal.social.github}
          target="_blank"
          rel="noopener noreferrer"
          className="group mt-10 inline-flex items-center gap-2 text-sm text-fg-muted transition-colors hover:text-fg"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          data-interactive
        >
          More on GitHub
          <ArrowUpRight className="h-4 w-4 text-primary transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </motion.a>
      </div>
    </section>
  );
}
