import { getProjects, getProjectById } from "@/lib/cms";
import { ProjectDetail } from "@/components/project-detail";
import { notFound } from "next/navigation";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((project) => ({
    id: project.id,
  }));
}

export async function generateMetadata({
  params,
}: PageProps): Promise<Metadata> {
  const { id } = await params;
  const project = await getProjectById(id);
  if (!project) return { title: "Not Found" };

  return {
    title: project.title,
    description: project.description.slice(0, 160),
  };
}

export default async function ProjectDetailPage({ params }: PageProps) {
  const { id } = await params;
  
  // Fetch project and all projects in parallel
  const [project, allProjects] = await Promise.all([
    getProjectById(id),
    getProjects(),
  ]);

  if (!project) notFound();

  return <ProjectDetail project={project} allProjects={allProjects} />;
}
