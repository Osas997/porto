import { getProjects, getSiteConfig } from "@/lib/cms";
import { ProjectsGallery } from "@/components/projects-gallery";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "High-fidelity, performance-driven interfaces for visionary brands. Bridging cinematic design and robust engineering.",
  keywords: [
    "projects",
    "web developer",
    "backend developer",
    "express",
    "nextjs",
    "laravel",
  ],
  openGraph: {
    title: "Projects",
    description:
      "Building the future of digital experiences with technological elegance.",
    type: "website",
  },
};


export default async function ProjectsPage() {
  // Fetch projects from CMS on the server
  const [projects, siteConfig] = await Promise.all([
    getProjects(),
    getSiteConfig()
  ]);

  return (
    <div className="pt-[160px] pb-[120px] px-[5vw] w-full max-w-[1280px] mx-auto">
      <ProjectsGallery projects={projects} socials={siteConfig.socials} />
    </div>
  );
}
