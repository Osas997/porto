"use client";

import { motion } from "framer-motion";
import {
  staggerContainer,
  fadeInUp,
  itemVariant,
} from "@/lib/animations";
import type { EducationItem } from "@/lib/cms";

interface EducationTimelineProps {
  education: EducationItem[];
}

export function EducationTimeline({ education }: EducationTimelineProps) {
  if (education.length === 0) {
    return (
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <h2 className="font-[Inter] text-[clamp(32px,4vw,48px)] font-bold leading-[1.2] tracking-[-0.02em] text-on-surface mb-12">
          Education
        </h2>
        <div className="glass-panel rounded-xl p-12 text-center">
          <p className="text-on-surface-variant">No education entries yet.</p>
        </div>
      </motion.section>
    );
  }

  // Sort by end year (most recent first)
  const sortedEducation = [...education].sort((a, b) => {
    if (!a.endYear && b.endYear) return -1;
    if (a.endYear && !b.endYear) return 1;
    if (!a.endYear && !b.endYear) return 0;
    return parseInt(b.endYear!) - parseInt(a.endYear!);
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
        Education
      </motion.h2>

      <div className="space-y-6">
        {sortedEducation.map((item, i) => (
          <motion.div
            key={i}
            variants={itemVariant}
            className="glass-panel rounded-xl p-8 hover:border-secondary/30 transition-colors duration-300 group"
          >
            <div className="flex flex-col md:flex-row md:items-center gap-4 md:gap-8">
              <span className="font-[Space_Grotesk] text-xs font-bold tracking-[0.1em] text-secondary uppercase w-40 shrink-0">
                {formatYearRange(item.startYear, item.endYear)}
              </span>
              <div>
                <h3 className="font-[Inter] text-xl font-semibold text-on-surface group-hover:text-secondary transition-colors">
                  {item.degree || item.fieldOfStudy || "Education"}
                </h3>
                <p className="font-[Inter] text-sm text-on-surface-variant mt-1">
                  {item.institution}
                </p>
                {item.fieldOfStudy && item.degree ? (
                  <p className="font-[Inter] text-base text-on-surface-variant mt-3">
                    {item.fieldOfStudy}
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

function formatYearRange(startYear?: string, endYear?: string): string {
  const start = startYear || "—";
  const end = endYear || "Present";
  return `${start} — ${end}`;
}
