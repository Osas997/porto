"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import type { ProjectWithParsedFields } from "@/lib/cms";
import {
  heroContainer,
  heroItem,
  staggerContainer,
  fadeInUp,
  itemVariant,
} from "@/lib/animations";
import { ExternalLink, Code2, ChevronLeft, ChevronRight } from "lucide-react";

interface ProjectDetailProps {
  project: ProjectWithParsedFields;
  allProjects: ProjectWithParsedFields[];
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

      {/* ═══ Project Showcase Gallery ═══ */}
      {project.images.length > 0 && (
        <motion.section
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.1 }}
          className="w-full max-w-7xl mx-auto px-[5vw] py-[80px]"
        >
          <motion.div variants={fadeInUp} className="mb-8">
            <span className="font-[Space_Grotesk] text-xs font-bold tracking-[0.1em] text-secondary uppercase">
              Showcase
            </span>
            <h2 className="font-[Inter] text-[clamp(28px,3vw,40px)] font-bold leading-[1.2] tracking-[-0.02em] text-on-surface mt-2">
              Project Gallery
            </h2>
          </motion.div>

          <motion.div variants={fadeInUp}>
            <ProjectImageCarousel images={project.images} title={project.title} />
          </motion.div>
        </motion.section>
      )}

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

// Image Carousel Component
function ProjectImageCarousel({ images, title }: { images: string[]; title: string }) {
  const [current, setCurrent] = useState(0);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const prev = () => setCurrent((c) => (c === 0 ? images.length - 1 : c - 1));
  const next = () => setCurrent((c) => (c === images.length - 1 ? 0 : c + 1));

  return (
    <>
      {/* Main Carousel */}
      <div className="relative group">
        {/* Main Image */}
        <div
          className="relative aspect-video rounded-xl overflow-hidden cursor-pointer"
          onClick={() => setLightboxOpen(true)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0"
            >
              <Image
                src={images[current]}
                alt={`${title} - Image ${current + 1}`}
                fill
                className="object-cover"
                priority={current === 0}
              />
            </motion.div>
          </AnimatePresence>

          {/* Overlay gradient */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

          {/* Image counter */}
          <div className="absolute bottom-4 left-4 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm">
            <span className="font-[Space_Grotesk] text-xs font-bold text-white">
              {current + 1} / {images.length}
            </span>
          </div>
        </div>

        {/* Navigation Arrows */}
        {images.length > 1 && (
          <>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
            >
              <ChevronLeft size={20} />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 p-2 rounded-full bg-black/50 backdrop-blur-sm text-white opacity-0 group-hover:opacity-100 transition-opacity hover:bg-black/70"
            >
              <ChevronRight size={20} />
            </button>
          </>
        )}
      </div>

      {/* Thumbnail Strip */}
      {images.length > 1 && (
        <div className="flex gap-3 mt-4 overflow-x-auto pb-2">
          {images.map((img, idx) => (
            <button
              key={idx}
              onClick={() => setCurrent(idx)}
              className={`relative flex-shrink-0 w-24 h-16 rounded-lg overflow-hidden border-2 transition-all duration-200 ${
                idx === current
                  ? "border-secondary ring-1 ring-secondary/30"
                  : "border-transparent opacity-60 hover:opacity-100"
              }`}
            >
              <Image
                src={img}
                alt={`${title} - Thumbnail ${idx + 1}`}
                fill
                className="object-cover"
              />
            </button>
          ))}
        </div>
      )}

      {/* Lightbox */}
      {lightboxOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-sm flex items-center justify-center"
          onClick={() => setLightboxOpen(false)}
        >
          <button
            onClick={() => setLightboxOpen(false)}
            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors z-50"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <line x1="18" y1="6" x2="6" y2="18" />
              <line x1="6" y1="6" x2="18" y2="18" />
            </svg>
          </button>

          <div className="relative w-[90vw] h-[80vh]" onClick={(e) => e.stopPropagation()}>
            <Image
              src={images[current]}
              alt={`${title} - Image ${current + 1}`}
              fill
              className="object-contain"
            />
          </div>

          {images.length > 1 && (
            <>
              <button
                onClick={(e) => { e.stopPropagation(); prev(); }}
                className="absolute left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={(e) => { e.stopPropagation(); next(); }}
                className="absolute right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
              >
                <ChevronRight size={24} />
              </button>
            </>
          )}

          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm">
            <span className="font-[Space_Grotesk] text-sm font-bold text-white">
              {current + 1} / {images.length}
            </span>
          </div>
        </motion.div>
      )}
    </>
  );
}
