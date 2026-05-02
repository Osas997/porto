import { getSkills, getProfile } from "@/lib/cms";
import { AboutHero } from "@/components/about-hero";
import { SkillsShowcase } from "@/components/skills-showcase";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { EducationTimeline } from "@/components/education-timeline";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About",
  description:
    "High-fidelity, performance-driven interfaces for visionary brands. Bridging cinematic design and robust engineering.",
  keywords: [
    "about",
    "web developer",
    "backend developer",
    "express",
    "nextjs",
    "laravel",
  ],
  openGraph: {
    title: "About",
    description:
      "Building the future of digital experiences with technological elegance.",
    type: "website",
  },
};


export default async function AboutPage() {
  // Fetch data from CMS on the server
  const [skills, profile] = await Promise.all([
    getSkills(),
    getProfile(),
  ]);

  return (
    <div className="pt-[140px] px-[5vw] pb-[120px] max-w-[1280px] mx-auto w-full">
      <AboutHero
        name={profile?.name || "Digital Architect"}
        role={profile?.role || "Creative Developer"}
        bio={profile?.bio || "I forge high-fidelity interactive experiences at the intersection of design engineering and creative coding."}
        avatar={profile?.avatar}
        location={profile?.location}
        email={profile?.email}
        socials={profile?.socials}
      />

      <SkillsShowcase skills={skills} />

      <ExperienceTimeline experiences={profile?.experience || []} />

      <div className="pb-16"></div>

      <EducationTimeline education={profile?.education || []} />
    </div>
  );
}
