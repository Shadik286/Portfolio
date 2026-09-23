"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowDownRight, MapPin } from "lucide-react";
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

export function ProfileSection() {
  const [parallax, setParallax] = useState({ x: 0, y: 0 });
  const reduced = useReducedMotion();

  // Scroll-linked hero: the copy lifts away faster than the portrait, and
  // both dim as the next section takes over.
  const heroRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const copyY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, -40]);
  const heroFade = useTransform(scrollYProgress, [0, 0.75], [1, 0]);
  const heroBlur = useTransform(scrollYProgress, [0, 1], ["blur(0px)", "blur(6px)"]);

  useEffect(() => {
    if (reduced) return;
    const onMove = (e: MouseEvent) => {
      setParallax({
        x: (e.clientX / window.innerWidth - 0.5) * 16,
        y: (e.clientY / window.innerHeight - 0.5) * 16,
      });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, [reduced]);

  return (
    <section
      ref={heroRef}
      id="profile"
      className="relative flex min-h-screen items-center overflow-hidden px-6 pb-24 pt-36 md:px-12"
    >
      <div className="mx-auto grid w-full max-w-6xl items-center gap-16 lg:grid-cols-[1.05fr_0.95fr]">
        {/* ---------------------------------------------------------- copy */}
        <motion.div
          className="relative z-20"
          style={reduced ? undefined : { y: copyY, opacity: heroFade, filter: heroBlur }}
        >
          <motion.div
            className="mb-7 inline-flex items-center gap-3 rounded-full border border-line bg-surface/70 px-4 py-2 backdrop-blur-sm"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            <span className="font-mono text-[11px] tracking-[0.18em] text-fg-muted">
              OPEN TO OPPORTUNITIES
            </span>
            <span className="h-3 w-px bg-line-hi" />
            <span className="flex items-center gap-1.5 font-mono text-[11px] tracking-[0.18em] text-fg-dim">
              <MapPin className="h-3 w-3" />
              {personal.location.toUpperCase()}
            </span>
          </motion.div>

          <motion.h1
            className="text-balance text-[2.75rem] font-semibold leading-[1.04] tracking-tight text-fg sm:text-6xl lg:text-[4.25rem]"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          >
            Md. Shadikur
            <br />
            <span className="text-gradient">Rahman Shadik</span>
          </motion.h1>

          <motion.div
            className="mt-6 flex items-center gap-4"
            initial={{ opacity: 0, x: -16 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.25 }}
          >
            <span className="h-px w-10 bg-primary" />
            <p className="font-mono text-sm uppercase tracking-[0.22em] text-primary md:text-base">
              {personal.title}
            </p>
          </motion.div>

          <motion.p
            className="mt-7 max-w-xl text-pretty text-base leading-relaxed text-fg-muted md:text-lg"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.35 }}
          >
            I build complete products end to end — Flutter and React interfaces,
            REST APIs, PostgreSQL schemas and RAG pipelines — with the
            problem-solving rigour of four years in competitive programming.
          </motion.p>

          <motion.div
            className="mt-10 flex flex-wrap items-center gap-3"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.45 }}
          >
            <a
              href="#projects"
              className="group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-medium text-white transition-all duration-300 hover:bg-primary-deep hover:shadow-[0_16px_40px_-16px] hover:shadow-primary"
              data-interactive
            >
              View selected work
              <ArrowDownRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:translate-y-0.5" />
            </a>
            <a
              href="#contact"
              className="inline-flex items-center gap-2 rounded-full border border-line bg-surface/60 px-6 py-3 text-sm text-fg-muted transition-all duration-300 hover:border-line-hi hover:text-fg"
              data-interactive
            >
              Get in touch
            </a>

            <div className="ml-1 flex items-center gap-1">
              {socials.map(({ href, label, Icon }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={label}
                  className="grid h-10 w-10 place-items-center rounded-full border border-transparent text-fg-dim transition-all duration-300 hover:border-line hover:bg-surface hover:text-fg"
                  data-interactive
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          </motion.div>
        </motion.div>

        {/* ------------------------------------------------------ portrait */}
        <motion.div
          className="relative mx-auto flex w-full max-w-sm items-center justify-center lg:max-w-none"
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          style={reduced ? undefined : { y: portraitY, opacity: heroFade }}
        >
          <motion.div
            className="relative aspect-[4/5] w-full max-w-[380px]"
            animate={{ x: -parallax.x * 0.4, y: -parallax.y * 0.4 }}
            transition={{ type: "spring", stiffness: 60, damping: 20 }}
          >
            {/* glow bed */}
            <div className="absolute -inset-10 rounded-full bg-primary/15 blur-[80px]" />

            {/* static offset frame — a design device, not motion */}
            <div className="absolute -inset-4 rounded-[2.25rem] border border-line/70" />

            {/* circular ring: rotation stays invisible, the dot does the work */}
            <motion.div
              className="absolute -inset-12 rounded-full border border-dashed border-line/60"
              animate={reduced ? undefined : { rotate: 360 }}
              transition={{ duration: 70, repeat: Infinity, ease: "linear" }}
            >
              <span className="absolute left-1/2 top-0 h-2 w-2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-primary shadow-[0_0_14px_2px] shadow-primary/60" />
            </motion.div>

            {/* the photo, masked so its lower edge dissolves into the page */}
            <div className="group relative h-full w-full overflow-hidden rounded-[1.75rem] border border-line bg-surface">
              <Image
                src={personal.photo}
                alt={`Portrait of ${personal.name}`}
                fill
                priority
                sizes="380px"
                className="object-cover object-top saturate-[0.85] transition-all duration-700 group-hover:scale-[1.03] group-hover:saturate-100"
                style={{
                  maskImage:
                    "linear-gradient(to bottom, #000 62%, rgba(0,0,0,0.55) 84%, transparent 100%)",
                  WebkitMaskImage:
                    "linear-gradient(to bottom, #000 62%, rgba(0,0,0,0.55) 84%, transparent 100%)",
                }}
              />

              {/* cobalt duotone, clearing on hover */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-primary/35 via-transparent to-primary-soft/20 opacity-90 mix-blend-soft-light transition-opacity duration-700 group-hover:opacity-30" />

              {/* fine scanline texture */}
              <div
                className="pointer-events-none absolute inset-0 opacity-[0.07]"
                style={{
                  backgroundImage:
                    "repeating-linear-gradient(0deg, #fff 0px, #fff 1px, transparent 1px, transparent 3px)",
                }}
              />

              {/* bottom fade into the page background */}
              <div className="pointer-events-none absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-ink to-transparent" />
            </div>

            {/* floating chip — counter-parallax so it feels closer */}
            <motion.div
              className="absolute -left-2 bottom-4 rounded-xl border border-line bg-ink-raised/90 px-4 py-2.5 shadow-xl backdrop-blur-md md:bottom-10"
              animate={{ x: parallax.x * 1.6, y: parallax.y * 1.6 }}
              transition={{ type: "spring", stiffness: 50, damping: 18 }}
            >
              <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-fg-dim">
                Roles
              </p>
              <p className="mt-1 font-mono text-[12px] font-semibold leading-[1.65] text-fg">
                <span className="block whitespace-nowrap">Competitive programmer</span>
                <span className="block whitespace-nowrap">AI Engineer · Software Engineer</span>
              </p>
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
