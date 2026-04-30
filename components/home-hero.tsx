"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  heroContainer,
  heroItem,
  fadeInRight,
  staggerContainer,
} from "@/lib/animations";
import { ArrowRight, Play } from "lucide-react";

interface HomeHeroProps {
  name: string;
  role: string;
  bio: string;
  latestProject?: {
    title: string;
    image: string;
  } | null;
}

export function HomeHero({ name, role, bio, latestProject }: HomeHeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center pt-32 pb-[120px] px-[5vw]">
      {/* Ambient Background Glows */}
      <motion.div
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.12, 0.08] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] bg-secondary rounded-full blur-[120px] pointer-events-none"
      />
      <motion.div
        initial={{ scale: 1, opacity: 0 }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.06, 0.1, 0.06] }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2,
        }}
        className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-tertiary rounded-full blur-[150px] pointer-events-none"
      />

      <div className="max-w-7xl w-full mx-auto grid grid-cols-1 lg:grid-cols-12 gap-6 relative z-10">
        {/* Content */}
        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="visible"
          className="lg:col-span-8 flex flex-col justify-center gap-12"
        >
          <div className="flex flex-col gap-3">
            <motion.span
              variants={heroItem}
              className="font-[Space_Grotesk] text-xs font-bold tracking-[0.1em] text-secondary uppercase inline-block border border-secondary/20 bg-secondary/5 px-3 py-1 rounded-full w-fit"
            >
              {role}
            </motion.span>
            <motion.h1
              variants={heroItem}
              className="font-[Inter] text-[clamp(40px,6vw,64px)] font-extrabold leading-[1.1] tracking-[-0.04em] text-on-surface max-w-4xl"
            >
              Building the <br />
              <span className="text-gradient">Future</span> of <br />
              Digital Experiences.
            </motion.h1>
          </div>

          <motion.p
            variants={heroItem}
            className="font-[Inter] text-lg leading-[1.6] text-on-surface-variant max-w-2xl"
          >
            {bio}
          </motion.p>

          <motion.div
            variants={heroItem}
            className="flex flex-wrap items-center gap-4"
          >
            <Link
              href="/projects"
              className="bg-gradient-to-r from-secondary to-tertiary text-on-secondary font-semibold text-base px-8 py-4 rounded-full neon-glow hover:shadow-[0_0_60px_rgba(192,193,255,0.4)] transition-all duration-300 flex items-center gap-2 active:scale-95"
            >
              View Projects
              <ArrowRight size={16} />
            </Link>
            <button className="glass-panel font-semibold text-base px-8 py-4 rounded-full text-on-surface hover:bg-white/5 transition-all duration-300 flex items-center gap-2 active:scale-95">
              <Play size={16} />
              Showreel
            </button>
          </motion.div>
        </motion.div>

        {/* Floating Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="lg:col-span-4 hidden lg:flex flex-col gap-6 justify-center relative"
        >
          {/* Floating Card 1 */}
          <motion.div
            variants={fadeInRight}
            whileHover={{ y: -8 }}
            className="glass-panel p-6 rounded-2xl relative translate-x-8 z-20 cursor-default"
          >
            <div className="flex items-center gap-4 mb-4">
              <div className="w-10 h-10 rounded-full bg-secondary/20 flex items-center justify-center text-secondary">
                <span className="material-symbols-outlined">code</span>
              </div>
              <div>
                <div className="font-[Space_Grotesk] text-xs font-bold tracking-[0.1em] text-on-surface-variant uppercase">
                  Stack
                </div>
                <div className="font-[Inter] text-lg font-semibold text-on-surface">
                  Laravel & Next.js
                </div>
              </div>
            </div>
            <div className="h-2 w-full bg-surface-container-high rounded-full overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "75%" }}
                transition={{ duration: 1.5, delay: 1, ease: "easeOut" }}
                className="h-full bg-gradient-to-r from-secondary to-tertiary"
              />
            </div>
          </motion.div>

          {/* Floating Card 2 */}
          <motion.div
            variants={fadeInRight}
            whileHover={{ y: -8 }}
            className="glass-panel p-6 rounded-2xl relative -translate-x-4 z-10 cursor-default"
          >
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-outline-variant">
                <Image
                  src={latestProject?.image || "/placeholder.svg"}
                  alt={latestProject?.title || "Latest project"}
                  width={48}
                  height={48}
                  className="w-full h-full object-cover"
                />
              </div>
              <div>
                <div className="font-[Space_Grotesk] text-xs font-bold tracking-[0.1em] text-on-surface-variant uppercase">
                  Latest Drop
                </div>
                <div className="font-[Inter] text-base font-semibold text-on-surface">
                  {latestProject?.title || "Coming Soon"}
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
