import { getSiteConfig } from "@/lib/cms";
import { ContactContent } from "@/components/contact-content";
import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "High-fidelity, performance-driven interfaces for visionary brands. Bridging cinematic design and robust engineering.",
  keywords: [
    "contact",
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


export default async function ContactPage() {
  // Fetch site config from CMS on the server
  const siteConfig = await getSiteConfig();

  return (
    <ContactContent
      email={siteConfig.email}
      location={siteConfig.location}
      socials={siteConfig.socials}
    />
  );
}
