"use client";

import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { Binary, Brain, Database, Layers, Server, Terminal, Wrench } from "lucide-react";
import {
  SiC,
  SiCplusplus,
  SiCloudinary,
  SiCpanel,
  SiCss,
  SiDart,
  SiFastapi,
  SiFlutter,
  SiGit,
  SiGithub,
  SiGooglegemini,
  SiHtml5,
  SiJavascript,
  SiJsonwebtokens,
  SiMysql,
  SiNextdotjs,
  SiNodedotjs,
  SiNumpy,
  SiOpenjdk,
  SiPandas,
  SiPostgresql,
  SiPrisma,
  SiPython,
  SiPytorch,
  SiReact,
  SiScikitlearn,
  SiSupabase,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from "react-icons/si";
import { SectionHeading } from "../ui/SectionHeading";
import { Card, fly } from "../ui/Card";
import { reveal, staggerChild, staggerParent } from "@/lib/motion";

type IconType = ComponentType<{ className?: string }>;

/** Logo per skill where one exists; the rest fall back to a monogram. */
const logos: Record<string, IconType> = {
  C: SiC,
  "C++": SiCplusplus,
  Java: SiOpenjdk,
  Python: SiPython,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Dart: SiDart,
  HTML5: SiHtml5,
  CSS3: SiCss,
  React: SiReact,
  "Next.js": SiNextdotjs,
  Flutter: SiFlutter,
  "Tailwind CSS": SiTailwindcss,
  "Node.js": SiNodedotjs,
  FastAPI: SiFastapi,
  Prisma: SiPrisma,
  JWT: SiJsonwebtokens,
  PostgreSQL: SiPostgresql,
  MySQL: SiMysql,
  PyTorch: SiPytorch,
  NumPy: SiNumpy,
  Pandas: SiPandas,
  "scikit-learn": SiScikitlearn,
  Git: SiGit,
  GitHub: SiGithub,
  Supabase: SiSupabase,
  Vercel: SiVercel,
  cPanel: SiCpanel,
  "FastAPI Cloud": SiFastapi,
  Cloudinary: SiCloudinary,
  "LLM API Integration": SiGooglegemini,
};

const groups: {
  id: string;
  title: string;
  note: string;
  Icon: IconType;
  skills: string[];
}[] = [
  {
    id: "languages",
    title: "Languages",
    note: "C++ is home — four years of contests in it",
    Icon: Terminal,
    skills: ["C++", "C", "Java", "Python", "TypeScript", "JavaScript", "Dart"],
  },
  {
    id: "frontend",
    title: "Frontend & Mobile",
    note: "13-screen Flutter app, React and Next.js SPAs",
    Icon: Layers,
    skills: ["React", "Next.js", "Flutter", "Tailwind CSS", "HTML5", "CSS3"],
  },
  {
    id: "backend",
    title: "Backend",
    note: "42 REST endpoints in production on Renten",
    Icon: Server,
    skills: ["Node.js", "FastAPI", "Prisma", "REST API", "JWT", "OAuth 2.0"],
  },
  {
    id: "databases",
    title: "Databases",
    note: "23-table schema design, vector search",
    Icon: Database,
    skills: ["PostgreSQL", "MySQL", "pgvector", "ChromaDB"],
  },
  {
    id: "ai",
    title: "AI & Machine Learning",
    note: "RAG pipelines and a multimodal thesis in PyTorch",
    Icon: Brain,
    skills: [
      "PyTorch",
      "RAG",
      "CNN",
      "ANN",
      "LLM API Integration",
      "NumPy",
      "Pandas",
      "scikit-learn",
    ],
  },
  {
    id: "tools",
    title: "Tools & Platforms",
    note: "Shipped on Vercel, cPanel and FastAPI Cloud",
    Icon: Wrench,
    skills: ["Git", "GitHub", "Supabase", "Vercel", "cPanel", "Cloudinary"],
  },
  {
    id: "core",
    title: "Core CS",
    note: "The part contests actually taught me",
    Icon: Binary,
    skills: ["Data Structures & Algorithms", "OOP", "DBMS"],
  },
];

function SkillChip({ name, index }: { name: string; index: number }) {
  const Logo = logos[name];
  return (
    <motion.li
      variants={staggerChild}
      className="group/chip flex items-center gap-2 rounded-lg border border-line bg-ink-raised/60 px-3 py-2 transition-colors duration-300 hover:border-primary/40 hover:bg-primary/[0.07]"
      {...fly({
        x: 0,
        y: 8,
        r: index % 2 ? 2 : -2,
        z: 16 + (index % 4) * 4,
        d: 0.05 + index * 0.035,
      })}
    >
      {Logo ? (
        <Logo className="h-3.5 w-3.5 shrink-0 text-fg-dim transition-colors duration-300 group-hover/chip:text-primary" />
      ) : (
        <span className="grid h-3.5 w-3.5 shrink-0 place-items-center rounded-sm bg-line font-mono text-[8px] text-fg-dim transition-colors duration-300 group-hover/chip:bg-primary/25 group-hover/chip:text-primary">
          {name.charAt(0)}
        </span>
      )}
      <span className="whitespace-nowrap text-[13px] text-fg-muted transition-colors duration-300 group-hover/chip:text-fg">
        {name}
      </span>
    </motion.li>
  );
}

export function SkillsSection() {
  return (
    <section
      id="skills"
      className="relative border-t border-line px-6 py-28 md:px-12 md:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="02"
          kicker="Toolkit"
          title="What I build with."
          lead="Grouped by where it sits in a product rather than by how well I know it — each card notes where I have actually used the group in anger."
        />

        {/* A 12-column bed so the seven cards land in exactly two rows:
            four across the top (3 cols each), three below (4 cols each). */}
        <div className="card-stage grid gap-5 sm:grid-cols-2 lg:grid-cols-12">
          {groups.map((group, gi) => (
            <motion.div
              key={group.id}
              className={gi < 4 ? "lg:col-span-3" : "lg:col-span-4"}
              {...reveal((gi % 4) * 0.08)}
            >
              <Card tilt className="h-full p-6">
                <div
                  className="mb-1 flex items-center gap-3"
                  {...fly({ x: -8, y: 7, z: 38 })}
                >
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-primary/25 bg-primary/10 text-primary">
                    <group.Icon className="h-[18px] w-[18px]" />
                  </span>
                  <h3 className="text-[15px] font-semibold tracking-tight text-fg">
                    {group.title}
                  </h3>
                  <span className="ml-auto font-mono text-[11px] text-fg-dim">
                    {String(group.skills.length).padStart(2, "0")}
                  </span>
                </div>

                <p
                  className="mb-5 pl-12 text-[12.5px] leading-snug text-fg-dim"
                  {...fly({ x: 6, y: 6, z: 24, d: 0.04 })}
                >
                  {group.note}
                </p>

                <motion.ul
                  className="flex flex-wrap gap-2"
                  variants={staggerParent}
                  initial="hidden"
                  whileInView="shown"
                  viewport={{ once: true, margin: "-40px" }}
                >
                  {group.skills.map((skill, i) => (
                    <SkillChip key={skill} name={skill} index={i} />
                  ))}
                </motion.ul>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
