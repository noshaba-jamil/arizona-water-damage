import { MetadataRoute } from "next";
import { SITE } from "@/content/site-config";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/api/"], // API routes aren't content, nothing to index there
    },
    sitemap: `${SITE.url}/sitemap.xml`,
  };
}
