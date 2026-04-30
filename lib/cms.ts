import { prisma } from "./prisma";
import type { Project, Skill, Profile } from "@/generated/prisma/client";

// Types for parsed JSON fields
export type Socials = {
  github?: string;
  linkedin?: string;
  twitter?: string;
  instagram?: string;
};

export type EducationItem = {
  institution: string;
  degree?: string;
  fieldOfStudy?: string;
  startYear?: string;
  endYear?: string;
};

export type ExperienceItem = {
  company: string;
  position: string;
  description?: string;
  startDate?: string;
  endDate?: string;
};

export type ProfileWithParsedFields = Omit<Profile, "socials" | "education" | "experience"> & {
  socials: Socials;
  education: EducationItem[];
  experience: ExperienceItem[];
};

// Helper to safely parse JSON
function safeJsonParse<T>(value: unknown, fallback: T): T {
  if (typeof value !== "string" || !value) return fallback;
  try {
    return JSON.parse(value) as T;
  } catch {
    return fallback;
  }
}

// ============================================
// Projects
// ============================================

export async function getProjects(): Promise<Project[]> {
  try {
    const projects = await prisma.project.findMany({
      orderBy: { createdAt: "desc" },
    });
    return projects;
  } catch (error) {
    console.error("Failed to fetch projects:", error);
    return [];
  }
}

export async function getFeaturedProjects(limit: number = 2): Promise<Project[]> {
  try {
    const projects = await prisma.project.findMany({
      where: { featured: true },
      orderBy: { createdAt: "desc" },
      take: limit,
    });
    return projects;
  } catch (error) {
    console.error("Failed to fetch featured projects:", error);
    return [];
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  try {
    const project = await prisma.project.findUnique({
      where: { id },
    });
    return project;
  } catch (error) {
    console.error("Failed to fetch project:", error);
    return null;
  }
}

// ============================================
// Skills
// ============================================

export async function getSkills(): Promise<Skill[]> {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { createdAt: "desc" },
    });
    return skills;
  } catch (error) {
    console.error("Failed to fetch skills:", error);
    return [];
  }
}

export async function getSkillsByCategory(): Promise<Map<string, Skill[]>> {
  try {
    const skills = await prisma.skill.findMany({
      orderBy: { createdAt: "desc" },
    });
    
    const grouped = new Map<string, Skill[]>();
    
    for (const skill of skills) {
      const category = skill.category || "Uncategorized";
      if (!grouped.has(category)) {
        grouped.set(category, []);
      }
      grouped.get(category)!.push(skill);
    }
    
    return grouped;
  } catch (error) {
    console.error("Failed to fetch skills by category:", error);
    return new Map();
  }
}

// ============================================
// Profile
// ============================================

export async function getProfile(): Promise<ProfileWithParsedFields | null> {
  try {
    const profile = await prisma.profile.findFirst();
    
    if (!profile) return null;
    
    return {
      ...profile,
      socials: safeJsonParse<Socials>(profile.socials, {}),
      education: safeJsonParse<EducationItem[]>(profile.education, []),
      experience: safeJsonParse<ExperienceItem[]>(profile.experience, []),
    };
  } catch (error) {
    console.error("Failed to fetch profile:", error);
    return null;
  }
}

// ============================================
// Site Config (combines profile + defaults)
// ============================================

export async function getSiteConfig() {
  const profile = await getProfile();
  
  return {
    name: profile?.name || "Neon Noir",
    title: profile?.name ? `${profile.name} Portfolio` : "Neon Noir Portfolio",
    description: profile?.bio || "High-fidelity, performance-driven interfaces for visionary brands.",
    email: profile?.email || "hello@example.com",
    location: profile?.location || "San Francisco, CA",
    role: profile?.role || "Digital Architect",
    avatar: profile?.avatar || "/images/avatar.jpg",
    socials: {
      github: profile?.socials?.github || "https://github.com",
      linkedin: profile?.socials?.linkedin || "https://linkedin.com",
      twitter: profile?.socials?.twitter || "https://twitter.com",
      instagram: profile?.socials?.instagram || "https://instagram.com",
    },
    education: profile?.education || [],
    experience: profile?.experience || [],
  };
}
