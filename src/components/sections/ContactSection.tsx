"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Mail, MapPin, Phone } from "lucide-react";
import { FaGithub, FaLinkedin, FaCode } from "react-icons/fa";
import { SiCodeforces } from "react-icons/si";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "../ui/SectionHeading";
import { Card, fly } from "../ui/Card";
import { reveal } from "@/lib/motion";

const { personal } = portfolioData;

const links = [
  { href: personal.social.github, label: "GitHub", handle: "Shadik286", Icon: FaGithub },
  { href: personal.social.linkedin, label: "LinkedIn", handle: "shadikrahman286", Icon: FaLinkedin },
  { href: personal.social.codeforces, label: "Codeforces", handle: "sdKrhMn286", Icon: SiCodeforces },
  { href: personal.social.atcoder, label: "AtCoder", handle: "sadik286", Icon: FaCode },
];

export function ContactSection() {
  return (
    <section
      id="contact"
      className="relative border-t border-line px-6 py-28 md:px-12 md:py-36"
    >
      <div className="mx-auto max-w-6xl">
        <SectionHeading
          index="07"
          kicker="Contact"
          title="Let us build something."
          lead="Open to software and AI engineering roles, internships and freelance work. Email reaches me fastest."
        />

        <div className="card-stage grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div
            {...reveal()}
          >
            <Card className="h-full p-8">
              <span
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-dim"
                {...fly({ x: -8, y: 7, z: 36 })}
              >
                Start a conversation
              </span>

              <a
                href={`mailto:${personal.email}`}
                className="group mt-5 flex items-center gap-3 text-xl font-medium tracking-tight text-fg transition-colors hover:text-primary md:text-[1.75rem]"
                {...fly({ x: -8, y: 9, z: 34, d: 0.05 })}
                data-interactive
              >
                <span className="break-all">{personal.email}</span>
                <ArrowUpRight className="h-5 w-5 shrink-0 text-primary transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1" />
              </a>

              <dl className="mt-10 grid gap-4 sm:grid-cols-2">
                <div className="flex items-center gap-3" {...fly({ x: -8, y: 8, z: 22, d: 0.1 })}>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-ink-raised text-primary">
                    <Phone className="h-4 w-4" />
                  </span>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.14em] text-fg-dim">Phone</dt>
                    <dd className="font-mono text-[13.5px] text-fg-muted">{personal.phone}</dd>
                  </div>
                </div>

                <div className="flex items-center gap-3" {...fly({ x: 8, y: 8, z: 22, d: 0.14 })}>
                  <span className="grid h-9 w-9 shrink-0 place-items-center rounded-lg border border-line bg-ink-raised text-primary">
                    <MapPin className="h-4 w-4" />
                  </span>
                  <div>
                    <dt className="text-[10px] uppercase tracking-[0.14em] text-fg-dim">Based in</dt>
                    <dd className="text-[13.5px] text-fg-muted">{personal.location}</dd>
                  </div>
                </div>
              </dl>

              <a
                href={`mailto:${personal.email}`}
                className="mt-10 inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-colors duration-300 hover:bg-primary-deep"
                {...fly({ x: 0, y: 10, z: 30, d: 0.18 })}
                data-interactive
              >
                <Mail className="h-4 w-4" />
                Send an email
              </a>
            </Card>
          </motion.div>

          <motion.div
            {...reveal(0.1)}
          >
            <Card className="h-full p-8">
              <span
                className="font-mono text-[10px] uppercase tracking-[0.2em] text-fg-dim"
                {...fly({ x: -8, y: 7, z: 34 })}
              >
                Profiles
              </span>

              <ul className="mt-5 flex flex-col gap-2">
                {links.map((link, i) => (
                  <li key={link.label} {...fly({ x: 0, y: 8, z: 16 + i * 5, d: 0.05 + i * 0.05 })}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-3 rounded-xl border border-line bg-ink-raised/60 px-4 py-3 transition-colors duration-300 hover:border-primary/40"
                      data-interactive
                    >
                      <link.Icon className="h-4 w-4 shrink-0 text-fg-dim transition-colors group-hover:text-primary" />
                      <span className="text-[14px] text-fg">{link.label}</span>
                      <span className="ml-auto truncate font-mono text-[12px] text-fg-dim">
                        {link.handle}
                      </span>
                      <ArrowUpRight className="h-3.5 w-3.5 shrink-0 text-fg-dim transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-primary" />
                    </a>
                  </li>
                ))}
              </ul>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
