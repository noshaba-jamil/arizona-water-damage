import type { Metadata } from "next";
import { SITE } from "@/content/site-config";

/** Branded 1200x630 share card, generated at /opengraph-image (see app/opengraph-image.tsx). */
export const OG_IMAGE = { url: "/opengraph-image", width: 1200, height: 630, alt: `${SITE.name} — 24/7 emergency water damage restoration in Arizona` };

/**
 * Open Graph + Twitter tags for a page. A page-level `openGraph` object REPLACES the one in the root layout
 * (Next.js does not deep-merge), so every page must supply the full set: site name, locale, type and image.
 */
export function socialMeta(title: string, description: string, path: string, type: "website" | "article" = "website"): Pick<Metadata, "openGraph" | "twitter"> {
  return {
    openGraph: { title, description, url: path, siteName: SITE.name, locale: "en_US", type, images: [OG_IMAGE] },
    twitter: { card: "summary_large_image", title, description, images: [OG_IMAGE.url] },
  };
}
