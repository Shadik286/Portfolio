"use client";

import type { ComponentType } from "react";
import { motion } from "framer-motion";
import {
  ArrowUpRight,
  Boxes,
  CloudUpload,
  CreditCard,
  Database,
  FileText,
  Gauge,
  GitBranch,
  Languages,
  Layers,
  Library,
  ListChecks,
  Network,
  Receipt,
  Rocket,
  Server,
  ShieldCheck,
  Smartphone,
  Sparkles,
  Workflow,
  Zap,
} from "lucide-react";
import { FaGithub } from "react-icons/fa";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "../ui/SectionHeading";
import { Card, fly } from "../ui/Card";
import { reveal } from "@/lib/motion";
import { cn } from "@/lib/utils";

type Project = (typeof portfolioData.projects)[number];
type IconType = ComponentType<{ className?: string }>;

/**
 * A capability reads faster with a mark beside it, so every feature is matched
 * to an icon by what it talks about. Ordered — the first pattern that matches
 * wins, so the narrow cases sit above the broad ones.
 */
const FEATURE_ICONS: [RegExp, IconType][] = [
  [/bkash|payment/i, CreditCard],
  [/subscription|billing|coupon/i, Receipt],
  [/biometric|pin login/i, ShieldCheck],
  [/jwt|auth|token/i, ShieldCheck],
  [/localization|bangla|language/i, Languages],
  [/cloudinary|upload/i, CloudUpload],
  [/pdf|report|lecture|document/i, FileText],
  [/pgvector|vector|embedding/i, Boxes],
  [/rag|pipeline/i, Workflow],
  [/gemini|llm|\bai\b/i, Sparkles],
  [/quiz|note generation|automatic note/i, ListChecks],
  [/arxiv|pubmed|crossref|academic|source/i, Library],
  [/rate limit|retry/i, Gauge],
  [/cach/i, Zap],
  [/version/i, GitBranch],
  [/deploy|architecture/i, Rocket],
  [/screen|mobile|flutter/i, Smartphone],
  [/database|postgres|supabase|table|sql/i, Database],
  [/backend|fastapi|server|node/i, Server],
  [/rest|api|endpoint|route/i, Network],
  [/spa|react|typescript|frontend/i, Layers],
];

function iconFor(feature: string): IconType {
  for (const [pattern, Icon] of FEATURE_ICONS) {
    if (pattern.test(feature)) return Icon;
  }
  return Sparkles;
}

/**
 * The metrics already state the headline numbers, so any feature that opens
 * with one of them is dropped rather than printed twice. What is left is
 * trimmed to whole rows — a mosaic with a ragged last row shows its gap
 * colour as a bare slab.
 */
function coreFeatures(project: Project, columns: number, rows: number) {
  const values = project.metrics.map((m) => m.value);
  const distinct = project.features.filter(
    (feature) => !values.some((value) => feature.startsWith(value))
  );
  const capped = distinct.slice(0, columns * rows);
  const whole = Math.floor(capped.length / columns) * columns;
  return whole > 0 ? capped.slice(0, whole) : capped;
}

/* -------------------------------------------------------------------------- */

function ProjectCard({
  project,
  index,
  featured = false,
}: {
  project: Project;
  index: string;
  featured?: boolean;
}) {
  const columns = featured ? 3 : 1;
  const features = coreFeatures(project, columns, featured ? 2 : 4);
  const hasLinks = Boolean(project.live || project.github);

  return (
    <Card as="article" className="pcard flex h-full flex-col overflow-hidden p-0">
      {/* ------------------------------------------------------------ head */}
      <header className={featured ? "p-7 md:p-9" : "p-5"}>
        <div className="pcard-rail" {...fly({ x: -8, y: 6, z: 40 })}>
          <span className="pcard-idx">{index}</span>
          <span className="pcard-rule" aria-hidden="true" />
          <span className="pcard-cat">{project.category}</span>
        </div>

        <h3
          className={cn("pcard-title", featured ? "text-[32px] md:text-[40px]" : "text-[19px]")}
          {...fly({ x: -8, y: 8, z: 38, d: 0.04 })}
        >
          {project.name}
        </h3>

        <p
          className={cn(
            "mt-2.5 leading-relaxed text-fg-muted",
            featured ? "max-w-[44ch] text-[15px]" : "text-[13.5px]"
          )}
          {...fly({ x: 6, y: 7, z: 28, d: 0.07 })}
        >
          {project.description}
        </p>

        <ul className="pcard-metrics" {...fly({ x: 0, y: 7, z: 22, d: 0.1 })}>
          {project.metrics.map((m) => (
            <li key={m.label}>
              <b>{m.value}</b>
              <span>{m.label}</span>
            </li>
          ))}
        </ul>
      </header>

      {/* --------------------------------------------------------- capabilities */}
      {features.length > 0 && (
        <div
          className={cn("pcard-mosaic", featured && "sm:grid-cols-2 lg:grid-cols-3")}
          role="list"
          aria-label={`${project.name} capabilities`}
        >
          {features.map((feature, i) => {
            const Icon = iconFor(feature);
            return (
              <div
                key={feature}
                role="listitem"
                className="pcard-cell"
                {...fly({ x: 0, y: 7, z: 14 + (i % 3) * 5, d: 0.12 + i * 0.045 })}
              >
                <Icon className="pcard-cell-ico" />
                <span>{feature}</span>
              </div>
            );
          })}
        </div>
      )}

      {/* ---------------------------------------------------------- footer */}
      <footer
        className={cn(
          "mt-auto flex flex-col gap-5",
          featured ? "p-7 md:px-9 md:py-7" : "p-5"
        )}
      >
        <p className="pcard-stack" {...fly({ x: 0, y: 6, z: 16, d: 0.2 })}>
          {project.techStack.map((tech, i) => (
            <span key={tech}>
              {i > 0 && <span className="pcard-sep">/</span>}
              {tech}
            </span>
          ))}
        </p>

        <div {...fly({ x: 0, y: 8, z: 26, d: 0.24 })}>
          {!hasLinks ? (
            <p className="pcard-private">Private repository</p>
          ) : (
            <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
              {project.live &&
                (featured ? (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pcard-cta group/cta"
                    data-interactive
                  >
                    Live app
                    <ArrowUpRight className="h-3.5 w-3.5 transition-transform duration-300 group-hover/cta:translate-x-0.5 group-hover/cta:-translate-y-0.5" />
                  </a>
                ) : (
                  <a
                    href={project.live}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="pcard-link pcard-link-primary"
                    data-interactive
                  >
                    Live app
                    <ArrowUpRight className="pcard-ico h-3.5 w-3.5" />
                  </a>
                ))}

              {project.github && (
                <a
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="pcard-link"
                  data-interactive
                >
                  <FaGithub className="h-3.5 w-3.5" />
                  Repository
                  <ArrowUpRight className="pcard-ico h-3.5 w-3.5" />
                </a>
              )}
            </div>
          )}
        </div>
      </footer>
    </Card>
  );
}

/* -------------------------------------------------------------------------- */

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
          lead="Whole-stack builds — interface, API and schema. The numbers are real scope, not estimates."
        />

        <div className="card-stage grid gap-5">
          <motion.div {...reveal()}>
            <ProjectCard project={featured} index="01" featured />
          </motion.div>

          <div className="grid gap-5 md:grid-cols-3">
            {rest.map((project, i) => (
              <motion.div key={project.id} {...reveal(i * 0.08)}>
                <ProjectCard project={project} index={String(i + 2).padStart(2, "0")} />
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
