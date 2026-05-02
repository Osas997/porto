"use client";

import { motion } from "framer-motion";
import {
  staggerContainer,
  fadeInUp,
  itemVariant,
} from "@/lib/animations";
import type { ExperienceItem } from "@/lib/cms";

interface ExperienceTimelineProps {
  experiences: ExperienceItem[];
}

export function ExperienceTimeline({ experiences }: ExperienceTimelineProps) {
  if (experiences.length === 0) {
    return (
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="font-[Inter] text-[clamp(32px,4vw,48px)] font-bold leading-[1.2] tracking-[-0.02em] text-on-surface mb-12">
          Experience
        </h2>
        <div className="glass-panel rounded-xl p-12 text-center">
          <p className="text-on-surface-variant">No experience entries yet.</p>
        </div>
      </motion.section>
    );
  }

  // Sort by end date (most recent first)
  const sortedExperiences = [...experiences].sort((a, b) => {
    // If no end date, treat as current (most recent)
    if (!a.endDate && b.endDate) return -1;
    if (a.endDate && !b.endDate) return 1;
    if (!a.endDate && !b.endDate) return 0;
    return new Date(b.endDate!).getTime() - new Date(a.endDate!).getTime();
  });

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
    >
      <motion.h2
        variants={fadeInUp}
        className="font-[Inter] text-[clamp(32px,4vw,48px)] font-bold leading-[1.2] tracking-[-0.02em] text-on-surface mb-12"
      >
        Experience
      </motion.h2>

      <div className="space-y-6">
        {sortedExperiences.map((item, i) => (
          <motion.div
            key={i}
            variants={itemVariant}
            className="glass-panel rounded-xl p-8 hover:border-secondary/30 transition-colors duration-300 group"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <span className="font-[Space_Grotesk] text-xs font-bold tracking-[0.1em] text-secondary uppercase w-40 shrink-0">
                {formatDateRange(item.startDate, item.endDate)}
              </span>
              <div>
                <h3 className="font-[Inter] text-xl font-semibold text-on-surface group-hover:text-secondary transition-colors">
                  {item.position}
                </h3>
                <p className="font-[Inter] text-sm text-on-surface-variant mt-1">
                  {item.company}
                </p>
                {item.description ? (
                  <p className="font-[Inter] text-base text-on-surface-variant mt-3">
                    {item.description}
                  </p>
                ) : null}
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.section>
  );
}

function formatDateRange(startDate?: string, endDate?: string): string {
  const formatDate = (date?: string) => {
    if (!date) return "Present";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", { year: "numeric", month: "short" });
  };

  const start = formatDate(startDate);
  const end = endDate ? formatDate(endDate) : "Present";
  
  // If both are just years, simplify
  if (start.length === 4 && end.length === 4) {
    return `${start} — ${end}`;
  }
  
  return `${start} — ${end}`;
}
