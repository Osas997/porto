import { MetadataRoute } from "next";
import { siteConfig } from "@/lib/data";

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || siteConfig.url || "https://muhammadariq.my.id";

  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/admin/", "/auth/", "/api/"],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}
