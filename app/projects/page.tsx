import { getProjects } from "@/lib/cms";
import { ProjectsGallery } from "@/components/projects-gallery";

export default async function ProjectsPage() {
  // Fetch projects from CMS on the server
  const projects = await getProjects();

  return (
    <div className="pt-[160px] pb-[120px] px-[5vw] w-full max-w-[1280px] mx-auto">
      <ProjectsGallery projects={projects} />
    </div>
  );
}
