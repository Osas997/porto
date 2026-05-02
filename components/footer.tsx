"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { fadeInUp, staggerContainer } from "@/lib/animations";
import { usePathname } from "next/navigation";

interface FooterProps {
  siteName: string;
  socials: {
    github?: string;
    instagram?: string;
    linkedin?: string;
  };
}

export default function Footer({ siteName, socials }: FooterProps) {
  const footerLinks = [
    { label: "Github", href: socials.github || "https://github.com" },
    { label: "Instagram", href: socials.instagram || "https://instagram.com" },
    { label: "Linked In", href: socials.linkedin || "https://linkedin.com" },
  ].filter(link => link.href);
  const pathname = usePathname();

  if (pathname?.startsWith("/admin")) {
    return null;
  }

  return (
    <motion.footer
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="mt-auto border-t footer-border border-white/5 bg-transparent w-full"
    >
      <div className="max-w-7xl mx-auto px-8 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        <motion.div variants={fadeInUp}>
          <Link
            href="/"
            className="text-lg font-bold text-on-surface tracking-tighter hover:text-secondary transition-colors duration-300"
          >
            {siteName}
          </Link>
        </motion.div>

        <motion.div variants={fadeInUp} className="flex items-center gap-6">
          {footerLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="font-[Inter] text-sm text-on-surface-variant hover:text-secondary transition-colors duration-300"
            >
              {link.label}
            </a>
          ))}
        </motion.div>

        <motion.p
          variants={fadeInUp}
          className="font-[Inter] text-sm text-on-surface-variant/60"
        >
          © {new Date().getFullYear()} {siteName} Portfolio.
        </motion.p>
      </div>
    </motion.footer>
  );
}
