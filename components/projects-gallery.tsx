"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  heroContainer,
  heroItem,
  staggerContainer,
  itemVariant,
} from "@/lib/animations";
import { Plus } from "lucide-react";
import type { Project } from "@/generated/prisma/client";

interface ProjectsGalleryProps {
  projects: Project[];
  socials: {
    github: string;
    linkedin: string;
    twitter: string;
  };
}

export function ProjectsGallery({ projects, socials }: ProjectsGalleryProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-24">
        <p className="text-on-surface-variant text-lg">No projects yet. Check back soon!</p>
      </div>
    );
  }

  // Helper to get category color based on tech stack
  const getCategoryStyle = (techStack: string) => {
    const tech = techStack.toLowerCase();
    if (tech.includes("webgl") || tech.includes("three")) {
      return { color: "tertiary", label: "Interactive" };
    }
    if (tech.includes("fintech") || tech.includes("finance")) {
      return { color: "tertiary", label: "Fintech" };
    }
    if (tech.includes("ai") || tech.includes("artificial intelligence")) {
      return { color: "tertiary", label: "AI" };
    }
    if (tech.includes("e-commerce") || tech.includes("shop")) {
      return { color: "secondary", label: "E-Commerce" };
    }
    if (tech.includes("brand") || tech.includes("identity")) {
      return { color: "secondary", label: "Brand" };
    }
    return { color: "secondary", label: "Development" };
  };

  return (
    <>
      {/* ═══ Header ═══ */}
      <motion.section
        variants={heroContainer}
        initial="hidden"
        animate="visible"
        className="mb-[120px] max-w-3xl"
      >
        <motion.h1
          variants={heroItem}
          className="font-[Inter] text-[clamp(40px,6vw,64px)] font-extrabold leading-[1.1] tracking-[-0.04em] text-on-background mb-6"
        >
          Selected Works
        </motion.h1>
        <motion.p
          variants={heroItem}
          className="font-[Inter] text-lg leading-[1.6] text-on-surface-variant"
        >
          A collection of high-fidelity digital experiences blurring the line
          between utility and art. Built with precision, designed for the future.
        </motion.p>
      </motion.section>

      {/* ═══ Gallery Grid ═══ */}
      <motion.section
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.05 }}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 auto-rows-[300px]"
      >
        {/* First Project - Large Span */}
        <motion.article
          variants={itemVariant}
          className="lg:col-span-8 row-span-2 glass-panel rounded-xl overflow-hidden group cursor-pointer hover:border-secondary/50 transition-all duration-300 relative flex flex-col"
        >
          <Link
            href={`/projects/${projects[0].id}`}
            className="absolute inset-0 z-20"
          />
          <div className="absolute inset-0 overflow-hidden z-0">
            <Image
              src={projects[0].image}
              alt={projects[0].title}
              fill
              className="object-cover opacity-60 mix-blend-luminosity group-hover:mix-blend-normal group-hover:opacity-100 transition-all duration-700 group-hover:scale-105"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
          </div>
          <div className="mt-auto p-12 relative z-10">
            <div className="flex gap-2 mb-3">
              <span className="px-3 py-1 bg-secondary/5 border border-tertiary/30 text-tertiary rounded-full font-[Space_Grotesk] text-xs font-bold tracking-[0.1em]">
                {getCategoryStyle(projects[0].techStack).label}
              </span>
            </div>
            <h2 className="font-[Inter] text-[clamp(28px,3vw,48px)] font-bold leading-[1.2] text-on-background mb-2 group-hover:text-secondary transition-colors">
              {projects[0].title}
            </h2>
            <p className="font-[Inter] text-base text-on-surface-variant max-w-xl">
              {projects[0].description}
            </p>
          </div>
        </motion.article>

        {/* Projects 2 & 3 - Side Column */}
        {projects.slice(1, 3).map((project) => {
          const category = getCategoryStyle(project.techStack);
          return (
            <motion.article
              key={project.id}
              variants={itemVariant}
              className="lg:col-span-4 row-span-1 glass-panel rounded-xl overflow-hidden group cursor-pointer hover:border-secondary/50 transition-all duration-300 relative flex flex-col"
            >
              <Link
                href={`/projects/${project.id}`}
                className="absolute inset-0 z-20"
              />
              <div className="absolute inset-0 overflow-hidden z-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-500 group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
              </div>
              <div className="mt-auto p-6 relative z-10">
                <div className="mb-3">
                  <span
                    className={`px-3 py-1 bg-secondary/5 border rounded-full font-[Space_Grotesk] text-xs font-bold tracking-[0.1em] ${
                      category.color === "secondary"
                        ? "border-secondary/30 text-secondary"
                        : "border-tertiary/30 text-tertiary"
                    }`}
                  >
                    {category.label}
                  </span>
                </div>
                <h2 className="font-[Inter] text-2xl font-semibold text-on-background group-hover:text-secondary transition-colors">
                  {project.title}
                </h2>
              </div>
            </motion.article>
          );
        })}

        {/* More Projects CTA */}
        <motion.article
          variants={itemVariant}
          className="lg:col-span-6 row-span-1 glass-panel rounded-xl overflow-hidden group cursor-pointer hover:border-secondary/50 transition-all duration-300 relative flex flex-col justify-center items-center text-center p-12 border-dashed border-2 border-outline-variant/30"
        >
          <a
            href={socials.github}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute inset-0 z-10"
          />
          <Plus
            size={48}
            className="text-on-surface-variant mb-4 group-hover:text-secondary transition-colors"
          />
          <h3 className="font-[Inter] text-2xl font-semibold text-on-background mb-2">
            More Projects
          </h3>
          <p className="font-[Inter] text-base text-on-surface-variant">
            View the complete archive on Github.
          </p>
        </motion.article>

        {/* Additional Projects */}
        {projects.slice(3).map((project) => {
          const category = getCategoryStyle(project.techStack);
          return (
            <motion.article
              key={project.id}
              variants={itemVariant}
              className="lg:col-span-6 row-span-1 glass-panel rounded-xl overflow-hidden group cursor-pointer hover:border-secondary/50 transition-all duration-300 relative flex flex-col"
            >
              <Link
                href={`/projects/${project.id}`}
                className="absolute inset-0 z-20"
              />
              <div className="absolute inset-0 overflow-hidden z-0">
                <Image
                  src={project.image}
                  alt={project.title}
                  fill
                  className="object-cover opacity-50 group-hover:opacity-80 transition-opacity duration-500 group-hover:scale-105 transition-transform"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/80 to-transparent" />
              </div>
              <div className="mt-auto p-6 relative z-10">
                <div className="mb-3">
                  <span
                    className={`px-3 py-1 bg-secondary/5 border rounded-full font-[Space_Grotesk] text-xs font-bold tracking-[0.1em] ${
                      category.color === "secondary"
                        ? "border-secondary/30 text-secondary"
                        : "border-tertiary/30 text-tertiary"
                    }`}
                  >
                    {category.label}
                  </span>
                </div>
                <h2 className="font-[Inter] text-2xl font-semibold text-on-background group-hover:text-secondary transition-colors">
                  {project.title}
                </h2>
              </div>
            </motion.article>
          );
        })}
      </motion.section>
    </>
  );
}
