"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  heroContainer,
  heroItem,
} from "@/lib/animations";
import { ArrowRight } from "lucide-react";

interface AboutHeroProps {
  name: string;
  role: string;
  bio: string;
  avatar?: string | null;
  location?: string | null;
  email?: string | null;
  socials?: {
    github?: string;
    linkedin?: string;
    twitter?: string;
    instagram?: string;
  } | null;
}

export function AboutHero({ name, role, bio, avatar, location, email, socials }: AboutHeroProps) {
  return (
    <section className="grid grid-cols-1 lg:grid-cols-12 gap-6 mb-[120px]">
      <motion.div
        variants={heroContainer}
        initial="hidden"
        animate="visible"
        className="lg:col-span-7 flex flex-col justify-center gap-6 z-10"
      >
        <motion.div
          variants={heroItem}
          className="inline-flex items-center gap-2 bg-secondary/5 border border-secondary/10 rounded-full px-4 py-1.5 w-fit"
        >
          <span className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
          <span className="font-[Space_Grotesk] text-xs font-bold tracking-[0.1em] text-secondary uppercase">
            {role}
          </span>
        </motion.div>

        <motion.h1
          variants={heroItem}
          className="font-[Inter] text-[clamp(32px,6vw,48px)] font-extrabold leading-[1.1] tracking-[-0.04em] text-on-surface"
        >
          {name}
          <br />
        </motion.h1>

        <motion.p
          variants={heroItem}
          className="font-[Inter] text-lg leading-[1.6] text-on-surface-variant max-w-xl"
        >
          {bio}
        </motion.p>

        <motion.div variants={heroItem} className="flex flex-wrap gap-4 mt-4">
          <Link
            href="/contact"
            className="glass-panel font-[Space_Grotesk] text-xs font-bold tracking-[0.1em] text-on-surface uppercase px-6 py-3 rounded-full hover:border-secondary hover:bg-secondary/5 transition-all duration-300 flex items-center gap-2 group"
          >
            View Resume
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>

        {(location || email || socials) && (
          <motion.div variants={heroItem} className="flex flex-wrap items-center gap-6 mt-2 text-sm text-on-surface-variant font-[Inter]">
            {location && (
              <span className="flex items-center gap-2">
                <span className="material-symbols-outlined text-tertiary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>location_on</span>
                {location}
              </span>
            )}
            {email && (
              <a href={`mailto:${email}`} className="flex items-center gap-2 hover:text-tertiary transition-colors duration-300">
                <span className="material-symbols-outlined text-secondary text-sm" style={{ fontVariationSettings: "'FILL' 1" }}>mail</span>
                {email}
              </a>
            )}
            {socials && (
              <div className="flex items-center gap-3">
                {socials.github && (
                  <a href={socials.github} target="_blank" rel="noopener noreferrer" className="hover:text-tertiary transition-colors duration-300" aria-label="GitHub">
                    <span className="material-symbols-outlined text-sm">terminal</span>
                  </a>
                )}
                {socials.linkedin && (
                  <a href={socials.linkedin} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors duration-300" aria-label="LinkedIn">
                    <span className="material-symbols-outlined text-sm">hub</span>
                  </a>
                )}
                {socials.twitter && (
                  <a href={socials.twitter} target="_blank" rel="noopener noreferrer" className="hover:text-secondary transition-colors duration-300" aria-label="Twitter">
                    <span className="material-symbols-outlined text-sm">alternate_email</span>
                  </a>
                )}
                {socials.instagram && (
                  <a href={socials.instagram} target="_blank" rel="noopener noreferrer" className="hover:text-tertiary transition-colors duration-300" aria-label="Instagram">
                    <span className="material-symbols-outlined text-sm">photo_camera</span>
                  </a>
                )}
              </div>
            )}
          </motion.div>
        )}
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
        className="lg:col-span-5 relative mt-12 lg:mt-0"
      >
        <div className="absolute inset-0 bg-gradient-to-tr from-secondary/20 to-tertiary/20 rounded-2xl blur-3xl -z-10" />
        <div className="glass-panel rounded-2xl overflow-hidden aspect-[4/5] relative group">
          <Image
            src={avatar || "https://lh3.googleusercontent.com/aida-public/AB6AXuBnUQeCsmGSQVLsMoFEfnWC0BnZ5NqXvX_B--G6g7C52VS1Rwmbyh3AcFwCPSb_nVMtwbALLnVZYsvbDu1J9EHG7lh4hJpRwJJEPFR3Cpk2Oneb054l_Ood5YR6UGuFsfAHF2k_NML47omUXGMmjzvvvg3uqeTlTJwA1xB7tkvQ6KBSBAldAKzQtQ2RA9rsBnunl7lYL_XHEEZvLiGUjHK5ixk5EpIbKj1JaK1FIm8DHnjZO58EQDync_SkM1jKj3pfOupDJZg01SA"}
            alt={name}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-105 opacity-80 hover:mix-blend-normal"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent opacity-80" />
        </div>
      </motion.div>
    </section>
  );
}
