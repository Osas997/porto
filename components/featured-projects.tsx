"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  staggerContainer,
  fadeInUp,
  itemVariant,
} from "@/lib/animations";
import { ArrowRight } from "lucide-react";
import type { ProjectWithParsedFields } from "@/lib/cms";

interface FeaturedProjectsProps {
  projects: ProjectWithParsedFields[];
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  if (projects.length === 0) {
    return (
      <section className="max-w-7xl mx-auto px-margin-page pb-section-gap">
        <div className="text-center py-12">
          <p className="text-on-surface-variant">No featured projects yet.</p>
        </div>
      </section>
    );
  }

  // Parse techStack for display as tags
  const getTags = (techStack: string): string[] => {
    try {
      const parsed = JSON.parse(techStack);
      if (Array.isArray(parsed)) return parsed.slice(0, 2);
      return techStack.split(",").slice(0, 2).map(s => s.trim());
    } catch {
      return techStack.split(",").slice(0, 2).map(s => s.trim());
    }
  };

  return (
    <section className="max-w-7xl mx-auto px-margin-page pb-section-gap">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.1 }}
        className="flex flex-col gap-6"
      >
        <motion.div variants={fadeInUp} className="flex items-end justify-between mb-8">
          <div>
            <span className="font-[Space_Grotesk] text-xs font-bold tracking-[0.1em] text-secondary uppercase">
              Selected Works
            </span>
            <h2 className="font-[Inter] text-[clamp(32px,4vw,48px)] font-bold leading-[1.2] tracking-[-0.02em] text-on-surface mt-2">
              Featured Projects
            </h2>
          </div>
          <Link
            href="/projects"
            className="hidden md:flex items-center gap-2 text-secondary hover:text-tertiary transition-colors font-[Inter] text-sm font-semibold group"
          >
            View All
            <ArrowRight
              size={14}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <motion.div key={project.id} variants={itemVariant}>
              <Link href={`/projects/${project.id}`}>
                <article className="glass-panel rounded-xl overflow-hidden group cursor-pointer hover:border-secondary/50 transition-all duration-300 relative h-[400px] flex flex-col">
                  <div className="absolute inset-0 overflow-hidden z-0">
                    <Image
                      src={project.image}
                      alt={project.title}
                      fill
                      className="object-cover opacity-50 group-hover:opacity-80 group-hover:scale-105 transition-all duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
                  </div>
                  <div className="mt-auto p-8 relative z-10">
                    <div className="flex gap-2 mb-3 flex-wrap">
                      {getTags(project.techStack).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-secondary/5 border border-secondary/30 rounded-full font-[Space_Grotesk] text-xs font-bold tracking-[0.1em] text-secondary"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="font-[Inter] text-2xl font-semibold text-on-surface group-hover:text-secondary transition-colors">
                      {project.title}
                    </h3>
                    <p className="font-[Inter] text-base text-on-surface-variant mt-2 line-clamp-2">
                      {project.description}
                    </p>
                  </div>
                </article>
              </Link>
            </motion.div>
          ))}
        </div>

        <motion.div variants={fadeInUp} className="md:hidden mt-4">
          <Link
            href="/projects"
            className="flex items-center justify-center gap-2 text-secondary font-[Inter] text-sm font-semibold py-3"
          >
            View All Projects
            <ArrowRight size={14} />
          </Link>
        </motion.div>
      </motion.div>
    </section>
  );
}
