import { getSkills, getProfile } from "@/lib/cms";
import { AboutHero } from "@/components/about-hero";
import { SkillsShowcase } from "@/components/skills-showcase";
import { ExperienceTimeline } from "@/components/experience-timeline";
import { EducationTimeline } from "@/components/education-timeline";

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
