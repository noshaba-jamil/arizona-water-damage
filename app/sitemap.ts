import { MetadataRoute } from "next";
import { SITE, SERVICES, BLOG_POSTS } from "@/content/site-config";
import { getAllServiceAreaSlugs } from "@/lib/content";

// Auto-generated from the same content registry every other page uses —
// add a page to content/pages.json or content/site-config.ts and it is
// automatically included here on the next build. No manual sitemap
// maintenance, no risk of it drifting out of sync with real pages.
export default function sitemap(): MetadataRoute.Sitemap {
  // The homepage entry is SITE.url without a trailing slash so it matches the canonical exactly (Next.js emits it that way).
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE.url, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE.url}/about`, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE.url}/contact`, changeFrequency: "monthly", priority: 0.7 },
    { url: `${SITE.url}/services`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE.url}/service-areas`, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE.url}/blog`, changeFrequency: "weekly", priority: 0.7 },
    { url: `${SITE.url}/faq`, changeFrequency: "monthly", priority: 0.7 },
    // Legal pages: low priority, included for completeness/crawlability,
    // not pages we want ranking or receiving crawl budget priority.
    { url: `${SITE.url}/privacy-policy`, changeFrequency: "yearly", priority: 0.1 },
    { url: `${SITE.url}/terms`, changeFrequency: "yearly", priority: 0.1 },
  ];

  const servicePages: MetadataRoute.Sitemap = SERVICES.map((s) => ({
    url: `${SITE.url}/services/${s.slug}`,
    changeFrequency: "monthly",
    priority: 0.85,
  }));

  const areaSlugs = getAllServiceAreaSlugs();
  const areaPages: MetadataRoute.Sitemap = areaSlugs.map((slug) => ({
    url: `${SITE.url}/service-areas/${slug}`,
    changeFrequency: "monthly",
    // County hubs get slightly higher priority than individual city pages —
    // matches their role as the stronger, more-linked-to page in the hierarchy.
    priority: slug.includes("county") ? 0.85 : 0.8,
  }));

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((b) => ({
    url: `${SITE.url}/blog/${b.slug}`,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  return [...staticPages, ...servicePages, ...areaPages, ...blogPages];
}
