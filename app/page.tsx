import { getFeaturedProjects, getSiteConfig } from "@/lib/cms";
import { HomeHero } from "@/components/home-hero";
import { FeaturedProjects } from "@/components/featured-projects";

export default async function HomePage() {
  // Fetch data from CMS on the server
  const [featuredProjects, siteConfig] = await Promise.all([
    getFeaturedProjects(2),
    getSiteConfig(),
  ]);

  return (
    <>
      <HomeHero
        name={siteConfig.name}
        role={siteConfig.role}
        bio={siteConfig.description}
        latestProject={featuredProjects[0] ? { title: featuredProjects[0].title, image: featuredProjects[0].image } : null}
      />
      <FeaturedProjects projects={featuredProjects} />
    </>
  );
}
