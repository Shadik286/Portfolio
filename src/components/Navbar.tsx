"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const navLinks = [
  { name: "ABOUT", href: "#about" },
  { name: "STACK", href: "#skills" },
  { name: "WORK", href: "#projects" },
  { name: "EXPERIENCE", href: "#experience" },
  { name: "CP", href: "#competitive-programming" },
  { name: "CONTACT", href: "#contact" },
];

export function Navbar() {
  const [activeSection, setActiveSection] = useState("home");
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      // Scroll spy logic
      const sections = navLinks.map((link) => link.href.substring(1));
      const scrollPosition = window.scrollY + 100;

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const offsetTop = element.offsetTop;
          const offsetBottom = offsetTop + element.offsetHeight;

          if (scrollPosition >= offsetTop && scrollPosition < offsetBottom) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.header
        className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4 md:px-8"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 200, damping: 20 }}
      >
        <div className={cn(
          "flex items-center justify-between px-6 py-3 rounded-full transition-all duration-500 w-full max-w-6xl",
          isScrolled ? "border border-line bg-ink-raised/75 shadow-2xl backdrop-blur-xl" : "border border-transparent bg-transparent"
        )}>
          <a
            href="#profile"
            className="text-xs font-semibold uppercase tracking-[0.2em] text-fg transition-colors hover:text-primary md:text-sm"
          >
            Shadikur Rahman
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className={cn(
                  "font-mono text-[10px] tracking-[0.2em] transition-colors hover:text-fg",
                  activeSection === link.href.substring(1) ? "text-primary" : "text-fg-dim"
                )}
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="p-1 text-fg md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </motion.header>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8 bg-ink/96 backdrop-blur-xl md:hidden"
          >
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={cn(
                  "text-xl font-mono tracking-widest transition-colors hover:text-primary",
                  activeSection === link.href.substring(1) ? "text-primary" : "text-fg-muted"
                )}
              >
                {link.name}
              </a>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
    </>
  );
}
