"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { navLinks } from "@/lib/data";
import { navbarVariant } from "@/lib/animations";
import { Menu, X, Mail, Code2 } from "lucide-react";
import ThemeToggle from "./theme-toggle";

interface NavbarProps {
  siteName: string;
  email: string;
  socials: {
    github?: string;
    linkedin?: string;
    twitter?: string;
  };
}

export default function Navbar({ siteName, email, socials }: NavbarProps) {
  const pathname = usePathname();
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  if (pathname?.startsWith("/auth")) {
    return null;
  }

  return (
    <motion.nav
      variants={navbarVariant}
      initial="hidden"
      animate="visible"
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center py-3 pointer-events-none"
    >
      <motion.div
        className={`pointer-events-auto rounded-full mt-6 mx-auto w-fit px-6 border shadow-[0_0_40px_rgba(59,130,246,0.1)] flex items-center gap-8 py-3 transition-all duration-500 ${
          scrolled
            ? "navbar-glass-scrolled bg-neutral-950/80 backdrop-blur-2xl border-white/15 scale-[0.97]"
            : "navbar-glass bg-neutral-950/70 backdrop-blur-xl border-white/10"
        }`}
      >
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-black tracking-tighter theme-text-primary text-white hover:text-secondary transition-colors duration-300"
        >
          {siteName}
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`font-[Inter] uppercase tracking-widest text-xs font-semibold transition-all duration-300 relative ${
                  isActive
                    ? "text-secondary"
                    : "theme-text-muted text-neutral-400 hover:text-secondary"
                }`}
              >
                {link.label}
                {isActive && (
                  <motion.div
                    layoutId="nav-underline"
                    className="absolute -bottom-1 left-0 right-0 h-[2px] bg-secondary"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3 pl-4 border-l theme-border-subtle border-white/10">
          {/* Theme Toggle */}
          <ThemeToggle />

          <a
            href={`mailto:${email}`}
            className="theme-text-muted text-neutral-400 hover:text-secondary transition-all duration-300 flex items-center justify-center w-8 h-8 rounded-full theme-bg-hover hover:bg-white/5"
            aria-label="Email"
          >
            <Mail size={18} />
          </a>
          <a
            href={socials.github || "https://github.com/osas997"}
            target="_blank"
            rel="noopener noreferrer"
            className="theme-text-muted text-neutral-400 hover:text-secondary transition-all duration-300 flex items-center justify-center w-8 h-8 rounded-full theme-bg-hover hover:bg-white/5"
            aria-label="GitHub"
          >
            <Code2 size={18} />
          </a>
          <Link
            href="/contact"
            className="bg-gradient-to-r from-secondary to-tertiary text-on-secondary px-4 py-2 rounded-full font-[Space_Grotesk] uppercase tracking-widest text-xs font-bold hover:shadow-[0_0_20px_rgba(192,193,255,0.4)] transition-all duration-300 active:scale-95"
          >
            Resume
          </Link>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden theme-text-muted text-neutral-400 hover:text-secondary transition-colors pointer-events-auto"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          {mobileOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </motion.div>

      {/* Mobile Menu */}
      {mobileOpen && (
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          className="absolute top-full left-4 right-4 mt-2 pointer-events-auto mobile-menu-glass bg-neutral-950/95 backdrop-blur-2xl border border-white/10 rounded-2xl p-6 flex flex-col gap-4 md:hidden"
        >
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMobileOpen(false)}
              className={`font-[Inter] uppercase tracking-widest text-sm font-semibold py-2 ${
                pathname === link.href
                  ? "text-secondary"
                  : "theme-text-muted text-neutral-400 hover:text-secondary"
              } transition-colors`}
            >
              {link.label}
            </Link>
          ))}
          <div className="border-t theme-border-subtle border-white/10 pt-4 flex items-center gap-4">
            <ThemeToggle />
            <a
              href={`mailto:${email}`}
              className="theme-text-muted text-neutral-400 hover:text-secondary transition-colors"
            >
              <Mail size={20} />
            </a>
            <a
              href={socials.github || "https://github.com/osas997"}
              target="_blank"
              rel="noopener noreferrer"
              className="theme-text-muted text-neutral-400 hover:text-secondary transition-colors"
            >
              <Code2 size={20} />
            </a>
          </div>
        </motion.div>
      )}
    </motion.nav>
  );
}
