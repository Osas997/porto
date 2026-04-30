"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import type { Project } from "@/generated/prisma/client";
import {
  heroContainer,
  heroItem,
  staggerContainer,
  fadeInUp,
  itemVariant,
} from "@/lib/animations";
import { ExternalLink, Code2 } from "lucide-react";

interface ProjectDetailProps {
  project: Project;
  allProjects: Project[];
}

export function ProjectDetail({ project, allProjects }: ProjectDetailProps) {
  // Parse tech stack
  const techStack = parseTechStack(project.techStack);

  // Find next project (next in array, or first if at end)
  const currentIndex = allProjects.findIndex(p => p.id === project.id);
  const nextProject = allProjects.length > 1 
    ? allProjects[(currentIndex + 1) % allProjects.length]
    : null;

  return (
    <>
      {/* ═══ Hero Section ═══ */}
      <section className="relative min-h-screen flex items-center justify-center pt-32 pb-[120px] overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 z-0">
          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover opacity-40 mix-blend-luminosity"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-primary-container via-primary-container/80 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-r from-background via-transparent to-background" />
        </div>

        <motion.div
          variants={heroContainer}
          initial="hidden"
          animate="visible"
          className="relative z-10 w-full max-w-7xl mx-auto px-[5vw] text-center"
        >
          <motion.div
            variants={heroItem}
            className="inline-flex items-center justify-center px-4 py-2 rounded-full glass-panel mb-8 border-secondary/30"
          >
            <span className="font-[Space_Grotesk] text-xs font-bold tracking-[0.2em] text-secondary uppercase">
              Project Case Study
            </span>
          </motion.div>

          <motion.h1
            variants={heroItem}
            className="font-[Inter] text-[clamp(40px,7vw,64px)] font-extrabold leading-[1.1] tracking-[-0.04em] text-on-surface mb-6 drop-shadow-2xl"
          >
            {project.title}
          </motion.h1>

          <motion.p
            variants={heroItem}
            className="font-[Inter] text-lg leading-[1.6] text-on-surface-variant max-w-2xl mx-auto"
          >
            {project.description}
          </motion.p>

          {/* Action Buttons */}
          <motion.div 
            variants={heroItem}
            className="flex flex-wrap justify-center gap-4 mt-8"
          >
            {project.demoUrl && (
              <a
                href={project.demoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-gradient-to-r from-secondary to-tertiary text-on-secondary font-semibold text-base px-8 py-4 rounded-full neon-glow hover:shadow-[0_0_60px_rgba(192,193,255,0.4)] transition-all duration-300 flex items-center gap-2 active:scale-95"
              >
                <ExternalLink size={18} />
                View Live Demo
              </a>
            )}
            {project.githubUrl && (
              <a
                href={project.githubUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="glass-panel font-semibold text-base px-8 py-4 rounded-full text-on-surface hover:bg-white/5 transition-all duration-300 flex items-center gap-2 active:scale-95"
              >
                <Code2 size={18} />
                View Source
              </a>
            )}
          </motion.div>
        </motion.div>
      </section>

      {/* ═══ Project Brief & Tech Stack ═══ */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="w-full max-w-7xl mx-auto px-[5vw] py-[120px]"
      >
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Description */}
          <motion.div
            variants={fadeInUp}
            className="lg:col-span-8 glass-panel p-12 rounded-xl neon-glow"
          >
            <h2 className="font-[Inter] text-2xl font-semibold text-on-surface mb-6">
              About This Project
            </h2>
            <p className="font-[Inter] text-lg leading-[1.6] text-on-surface-variant">
              {project.description}
            </p>
          </motion.div>

          {/* Sidebar Info */}
          <div className="lg:col-span-4 flex flex-col gap-6">
            <motion.div variants={itemVariant} className="glass-panel p-6 rounded-xl">
              <h3 className="font-[Space_Grotesk] text-xs font-bold tracking-[0.1em] text-outline uppercase mb-3">
                Status
              </h3>
              <p className="font-[Inter] text-base text-on-surface font-medium">
                {project.featured ? "Featured Project" : "Project"}
              </p>
            </motion.div>

            <motion.div
              variants={itemVariant}
              className="glass-panel p-6 rounded-xl flex-grow"
            >
              <h3 className="font-[Space_Grotesk] text-xs font-bold tracking-[0.1em] text-outline uppercase mb-3">
                Technology Stack
              </h3>
              <div className="flex flex-wrap gap-2 mt-4">
                {techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-full border border-tertiary/20 bg-tertiary/5 font-[Space_Grotesk] text-xs font-bold tracking-[0.1em] text-tertiary"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>

            {/* Links */}
            {(project.demoUrl || project.githubUrl) && (
              <motion.div variants={itemVariant} className="glass-panel p-6 rounded-xl">
                <h3 className="font-[Space_Grotesk] text-xs font-bold tracking-[0.1em] text-outline uppercase mb-3">
                  Links
                </h3>
                <div className="space-y-2">
                  {project.demoUrl && (
                    <a
                      href={project.demoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-secondary hover:text-tertiary transition-colors"
                    >
                      <ExternalLink size={16} />
                      <span className="font-[Inter] text-sm">Live Demo</span>
                    </a>
                  )}
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-secondary hover:text-tertiary transition-colors"
                    >
                      <Code2 size={16} />
                      <span className="font-[Inter] text-sm">Source Code</span>
                    </a>
                  )}
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </motion.section>

      {/* ═══ Next Project ═══ */}
      {nextProject && nextProject.id !== project.id && (
        <Link href={`/projects/${nextProject.id}`}>
          <motion.section
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="w-full border-t footer-border border-outline-variant/20 py-[120px] text-center hover:bg-secondary/[0.02] transition-colors duration-500 cursor-pointer group"
          >
            <div className="max-w-4xl mx-auto px-[5vw]">
              <span className="font-[Space_Grotesk] text-xs font-bold tracking-[0.2em] text-outline uppercase mb-3 block group-hover:text-secondary transition-colors duration-300">
                Next Project
              </span>
              <h2 className="font-[Inter] text-[clamp(40px,6vw,64px)] font-extrabold leading-[1.1] tracking-[-0.04em] text-on-surface group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-secondary group-hover:to-tertiary transition-all duration-500">
                {nextProject.title}
              </h2>
            </div>
          </motion.section>
        </Link>
      )}
    </>
  );
}

// Helper to parse tech stack from string to array
function parseTechStack(techStack: string): string[] {
  try {
    const parsed = JSON.parse(techStack);
    if (Array.isArray(parsed)) return parsed;
  } catch {
    // Not JSON, treat as comma-separated
  }
  return techStack.split(",").map(s => s.trim()).filter(Boolean);
}
