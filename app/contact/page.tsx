import { getSiteConfig } from "@/lib/cms";
import { ContactContent } from "@/components/contact-content";

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
