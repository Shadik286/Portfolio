"use client";

import { FaGithub, FaLinkedin, FaCode } from "react-icons/fa";
import { SiCodeforces } from "react-icons/si";
import { portfolioData } from "@/data/portfolio";

const { personal } = portfolioData;

const socials = [
  { href: personal.social.github, label: "GitHub", Icon: FaGithub },
  { href: personal.social.linkedin, label: "LinkedIn", Icon: FaLinkedin },
  { href: personal.social.codeforces, label: "Codeforces", Icon: SiCodeforces },
  { href: personal.social.atcoder, label: "AtCoder", Icon: FaCode },
];

export function Footer() {
  return (
    <footer className="relative z-10 border-t border-line px-6 py-12 md:px-12">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-6 md:flex-row">
        <div className="text-center md:text-left">
          <p className="text-[15px] font-semibold tracking-tight text-fg">{personal.name}</p>
          <p className="mt-1 font-mono text-[11px] uppercase tracking-[0.16em] text-fg-dim">
            {personal.title} · {personal.location}
          </p>
        </div>

        <div className="flex items-center gap-1">
          {socials.map(({ href, label, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={label}
              className="grid h-10 w-10 place-items-center rounded-full border border-transparent text-fg-dim transition-all duration-300 hover:border-line hover:bg-surface hover:text-primary"
              data-interactive
            >
              <Icon className="h-[17px] w-[17px]" />
            </a>
          ))}
        </div>
      </div>

      <p className="mx-auto mt-8 max-w-6xl text-center font-mono text-[11px] text-fg-dim md:text-left">
        &copy; {new Date().getFullYear()} {personal.name}.
      </p>
    </footer>
  );
}
