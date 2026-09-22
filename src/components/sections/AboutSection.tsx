"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { motion, useInView, useReducedMotion } from "framer-motion";
import { portfolioData } from "@/data/portfolio";
import { SectionHeading } from "../ui/SectionHeading";
import { Card, fly } from "../ui/Card";
import { reveal } from "@/lib/motion";

const { about } = portfolioData;

/** Tokens for the shadik.cpp card, kept as data so the colouring stays consistent. */
type Tok = { t: string; c?: "kw" | "ty" | "str" | "num" | "fn" | "cm" | "pp" };

const K = (t: string): Tok => ({ t, c: "kw" });
const T = (t: string): Tok => ({ t, c: "ty" });
const S = (t: string): Tok => ({ t, c: "str" });
const N = (t: string): Tok => ({ t, c: "num" });
const F = (t: string): Tok => ({ t, c: "fn" });
const C = (t: string): Tok => ({ t, c: "cm" });
const P = (t: string): Tok => ({ t });

/**
 * The stacks shown on the source card. Padding is derived from the longest
 * key, which keeps the value braces in one column no matter what changes.
 */
const STACKS: [key: string, values: string[]][] = [
  ["languages", ["C++", "C", "Java", "Python", "TypeScript", "JavaScript", "Dart"]],
  ["frontend", ["React", "Flutter", "Tailwind CSS", "HTML5", "CSS3"]],
  ["backend", ["Prisma", "REST API", "JWT", "OAuth 2.0"]],
  ["databases", ["PostgreSQL", "MySQL", "pgvector", "ChromaDB"]],
  [
    "ai",
    ["PyTorch", "CNN", "ANN", "RAG", "LLM API Integration", "NumPy", "Pandas", "scikit-learn"],
  ],
  ["tools", ["Git", "GitHub", "Supabase", "Vercel", "cPanel", "Cloudinary"]],
  ["core", ["Data Structures & Algorithms", "OOP", "DBMS"]],
];

const KEY_WIDTH = Math.max(...STACKS.map(([key]) => key.length));

const stackLines: Tok[][] = STACKS.map(([key, values]) => [
  P("    {"),
  S(`"${key}"`),
  P(`,${" ".repeat(KEY_WIDTH - key.length + 1)}{`),
  ...values.flatMap((v, i) => (i === 0 ? [S(`"${v}"`)] : [P(", "), S(`"${v}"`)])),
  P("}},"),
]);

const codeLines: Tok[][] = [
  [{ t: "#include", c: "pp" }, P(" "), S("<bits/stdc++.h>")],
  [],
  [K("struct"), P(" "), T("Shadik"), P(" {")],
  [T("  string"), P(" role = "), S('"AI / Software Engineer"'), P(";")],
  [T("  string"), P(" base = "), S('"Sylhet, Bangladesh"'), P(";")],
  [],
  [C("  // competitive programming")],
  [T("  int"), P("    cf_rating = "), N("1576"), P(";"), C("     // Specialist")],
  [T("  string"), P(" atcoder   = "), S('"6 Kyu"'), P(";")],
  [],
  [C("  // engineering")],
  [T("  map"), P("<"), T("string"), P(", "), T("vector"), P("<"), T("string"), P(">> stacks = {")],
  ...stackLines,
  [P("  };")],
  [],
  [K("  void"), P(" "), F("solve"), P("("), T("Problem"), P(" p) {")],
  [F("    bound"), P("(p);"), C("                  // worst case first")],
  [K("    while"), P(" (!p."), F("solved"), P("()) "), F("iterate"), P("();")],
  [F("    ship"), P("(p);")],
  [P("  }")],
  [],
  [K("  bool"), P(" open_to_work = "), N("true"), P(";")],
  [P("};")],
];

const tokenClass: Record<NonNullable<Tok["c"]>, string> = {
  kw: "text-primary-soft",
  ty: "text-primary",
  str: "text-amber",
  num: "text-amber",
  fn: "text-fg",
  cm: "text-fg-dim italic",
  pp: "text-primary-soft",
};

/** How long the whole file takes to type itself out. Lower = faster. */
const TYPE_DURATION_MS = 7000;

const lineLength = (line: Tok[]) => line.reduce((n, tok) => n + tok.t.length, 0);

export function AboutSection() {
  const codeRef = useRef<HTMLPreElement>(null);
  const inView = useInView(codeRef, { once: true, margin: "-120px" });
  const reduced = useReducedMotion();

  // Character offset each line starts at. The +1 per line stands in for the
  // newline, so blank lines still cost time and the pause reads naturally.
  const { offsets, total } = useMemo(() => {
    const offs: number[] = [];
    let acc = 0;
    for (const line of codeLines) {
      offs.push(acc);
      acc += lineLength(line) + 1;
    }
    return { offsets: offs, total: acc };
  }, []);

  const [typed, setTyped] = useState(0);

  useEffect(() => {
    if (!inView) return;
    if (reduced) {
      setTyped(total);
      return;
    }
    let raf = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const t = Math.min((now - start) / TYPE_DURATION_MS, 1);
      setTyped(Math.floor(t * total));
      if (t < 1) raf = requestAnimationFrame(tick);
      else setTyped(total);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, reduced, total]);

  const done = typed >= total;

  return (
    <section id="about" className="relative border-t border-line px-6 py-28 md:px-12 md:py-36">
      <div className="mx-auto max-w-6xl">
        <SectionHeading index="01" kicker="About" title="Me, as a struct." />

        <motion.div className="card-stage" {...reveal()}>
          <Card className="overflow-hidden p-0">
            <div className="flex items-center gap-2 border-b border-line bg-ink-raised/80 px-4 py-3 md:px-6">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]" />
              <span className="ml-3 font-mono text-xs text-fg-dim">
                {about.codeCard.filename}
              </span>
              <span className="ml-auto font-mono text-[10px] uppercase tracking-[0.18em] text-fg-dim">
                {done ? "C++" : "typing"}
              </span>
            </div>

            {/* Every row is always rendered, so the card height never jumps
                while the file types itself in. */}
            <pre
              ref={codeRef}
              className="overflow-x-auto px-6 py-7 font-mono text-[12.5px] leading-[1.9] md:px-8 md:text-[14px]"
            >
              <code>
                {codeLines.map((line, i) => {
                  const start = offsets[i];
                  const len = lineLength(line);
                  const visible = Math.max(0, Math.min(typed - start, len));
                  const started = typed > start;
                  const isCursorLine = started && typed <= start + len;

                  let used = 0;

                  return (
                    <div
                      key={i}
                      className="grid grid-cols-[2.25rem_1fr] gap-3"
                      {...fly({ x: -8, y: 5, z: 12, d: i * 0.01 })}
                    >
                      <span className="select-none text-right text-fg-dim/50">
                        {started ? i + 1 : ""}
                      </span>
                      <span className="whitespace-pre text-fg-muted">
                        {visible === 0 && !isCursorLine ? " " : null}
                        {line.map((tok, j) => {
                          const take = Math.max(0, Math.min(visible - used, tok.t.length));
                          used += tok.t.length;
                          if (take <= 0) return null;
                          return (
                            <span key={j} className={tok.c ? tokenClass[tok.c] : undefined}>
                              {tok.t.slice(0, take)}
                            </span>
                          );
                        })}
                        {!reduced && isCursorLine && (
                          <span className="caret ml-px inline-block h-[1.05em] w-[0.5em] translate-y-[0.18em] bg-primary" />
                        )}
                      </span>
                    </div>
                  );
                })}
              </code>
            </pre>

          </Card>
        </motion.div>
      </div>
    </section>
  );
}
