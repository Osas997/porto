"use client";

import { motion } from "framer-motion";
import {
  staggerContainer,
  fadeInUp,
  itemVariant,
} from "@/lib/animations";
import type { Skill } from "@/generated/prisma/client";
import Image from "next/image";

interface SkillsShowcaseProps {
  skills: Skill[];
}

// Color mapping for categories
const categoryColors: Record<string, { bg: string; border: string; text: string; glow: string }> = {
  "Frontend": { bg: "bg-secondary/10", border: "border-secondary/30", text: "text-secondary", glow: "shadow-secondary/20" },
  "Backend": { bg: "bg-tertiary/10", border: "border-tertiary/30", text: "text-tertiary", glow: "shadow-tertiary/20" },
  "Tools": { bg: "bg-primary/10", border: "border-primary/30", text: "text-primary", glow: "shadow-primary/20" },
  "Design": { bg: "bg-warning/10", border: "border-warning/30", text: "text-warning", glow: "shadow-warning/20" },
  "Database": { bg: "bg-info/10", border: "border-info/30", text: "text-info", glow: "shadow-info/20" },
  "DevOps": { bg: "bg-success/10", border: "border-success/30", text: "text-success", glow: "shadow-success/20" },
  "Mobile": { bg: "bg-error/10", border: "border-error/30", text: "text-error", glow: "shadow-error/20" },
  "default": { bg: "bg-surface-container-high", border: "border-outline-variant", text: "text-on-surface", glow: "shadow-secondary/10" },
};

function getCategoryStyle(category: string) {
  return categoryColors[category] || categoryColors["default"];
}

function groupSkillsByCategory(skills: Skill[]): Map<string, Skill[]> {
  const grouped = new Map<string, Skill[]>();
  
  for (const skill of skills) {
    const category = skill.category || "Uncategorized";
    if (!grouped.has(category)) {
      grouped.set(category, []);
    }
    grouped.get(category)!.push(skill);
  }
  
  return grouped;
}

export function SkillsShowcase({ skills }: SkillsShowcaseProps) {
  if (skills.length === 0) {
    return (
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        className="mb-[120px]"
      >
        <h2 className="font-[Inter] text-[clamp(32px,4vw,48px)] font-bold leading-[1.2] tracking-[-0.02em] text-on-surface mb-12">
          Technical Arsenal
        </h2>
        <div className="glass-panel rounded-xl p-12 text-center">
          <p className="text-on-surface-variant">No skills added yet.</p>
        </div>
      </motion.section>
    );
  }

  const groupedSkills = groupSkillsByCategory(skills);

  return (
    <motion.section
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      className="mb-[120px]"
    >
      <motion.h2
        variants={fadeInUp}
        className="font-[Inter] text-[clamp(32px,4vw,48px)] font-bold leading-[1.2] tracking-[-0.02em] text-on-surface mb-12"
      >
        Technical Arsenal
      </motion.h2>

      <div className="space-y-8">
        {Array.from(groupedSkills.entries()).map(([category, categorySkills], categoryIndex) => {
          const style = getCategoryStyle(category);
          
          return (
            <motion.div
              key={category}
              variants={itemVariant}
              className="glass-panel rounded-xl p-8 relative overflow-hidden group"
            >
              {/* Category Header */}
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-12 h-12 rounded-xl ${style.bg} ${style.border} border flex items-center justify-center`}>
                  <span className={`material-symbols-outlined ${style.text} text-2xl`}>
                    {getCategoryIcon(category)}
                  </span>
                </div>
                <div>
                  <h3 className={`font-[Inter] text-2xl font-semibold ${style.text}`}>
                    {category}
                  </h3>
                  <p className="font-[Space_Grotesk] text-xs font-bold tracking-[0.1em] text-on-surface-variant uppercase">
                    {categorySkills.length} Technologies
                  </p>
                </div>
              </div>

              {/* Skills Grid - Pro Max UI */}
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                {categorySkills.map((skill, index) => (
                  <motion.div
                    key={skill.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.05, duration: 0.4 }}
                    viewport={{ once: true }}
                    whileHover={{ 
                      scale: 1.05, 
                      y: -4,
                      transition: { duration: 0.2 }
                    }}
                    className={`relative group/skill cursor-default`}
                  >
                    <div 
                      className={`
                        relative p-4 rounded-xl border ${style.border} bg-surface-container-lowest/50
                        hover:${style.bg} hover:shadow-lg hover:${style.glow}
                        transition-all duration-300
                        flex flex-col items-center gap-3
                      `}
                    >
                      {/* Logo Container */}
                      <div className={`
                        w-14 h-14 rounded-xl ${style.bg} ${style.border} border
                        flex items-center justify-center overflow-hidden
                        group-hover/skill:scale-110 transition-transform duration-300
                      `}>
                        {skill.logo ? (
                          <Image
                            src={skill.logo}
                            alt={skill.name}
                            width={40}
                            height={40}
                            className="w-8 h-8 object-contain"
                          />
                        ) : (
                          <span className={`material-symbols-outlined ${style.text} text-2xl`}>
                            {getDefaultIcon(skill.name)}
                          </span>
                        )}
                      </div>

                      {/* Skill Name */}
                      <span className={`font-[Inter] text-sm font-medium text-center ${style.text} group-hover/skill:text-on-surface transition-colors`}>
                        {skill.name}
                      </span>

                      {/* Hover Glow Effect */}
                      <div className={`
                        absolute inset-0 rounded-xl opacity-0 
                        group-hover/skill:opacity-100 transition-opacity duration-500
                        bg-gradient-to-br from-${style.text.replace('text-', '')}/5 to-transparent
                        pointer-events-none
                      `} />
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Background Decorative Element */}
              <div className={`
                absolute -top-20 -right-20 w-40 h-40 
                ${style.bg} rounded-full blur-3xl opacity-20 
                group-hover:opacity-30 transition-opacity duration-700
              `} />
            </motion.div>
          );
        })}
      </div>
    </motion.section>
  );
}

// Helper to get appropriate icon for category
function getCategoryIcon(category: string): string {
  const icons: Record<string, string> = {
    "Frontend": "code",
    "Backend": "dns",
    "Tools": "build",
    "Design": "palette",
    "Database": "database",
    "DevOps": "cloud",
    "Mobile": "smartphone",
    "Uncategorized": "widgets",
  };
  return icons[category] || "widgets";
}

// Helper to get default icon for skill name
function getDefaultIcon(name: string): string {
  const nameLower = name.toLowerCase();
  if (nameLower.includes("react")) return "code";
  if (nameLower.includes("javascript") || nameLower.includes("js")) return "javascript";
  if (nameLower.includes("typescript") || nameLower.includes("ts")) return "code_blocks";
  if (nameLower.includes("css")) return "style";
  if (nameLower.includes("html")) return "html";
  if (nameLower.includes("node")) return "dns";
  if (nameLower.includes("database") || nameLower.includes("sql")) return "database";
  if (nameLower.includes("git")) return "commit";
  if (nameLower.includes("figma")) return "design_services";
  if (nameLower.includes("docker")) return "view_in_ar";
  return "star";
}
