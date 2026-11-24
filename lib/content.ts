import pagesData from "@/content/pages.json";

export type PageContent = {
  slug: string;
  category: "service" | "city" | "county" | "blog";
  dir: string;
  url: string;
  title: string;
  meta: string;
  h1: string;
  lead: string;
  bodyHtml: string;
  related: { label: string; href: string }[];
  faqs: { question: string; answer: string }[];
};

const ALL_PAGES = pagesData as PageContent[];

export function getPagesByCategory(dir: string, category?: string) {
  return ALL_PAGES.filter(
    (p) => p.dir === dir && (!category || p.category === category)
  );
}

export function getPageBySlug(dir: string, slug: string): PageContent | undefined {
  return ALL_PAGES.find((p) => p.dir === dir && p.slug === slug);
}

export function getAllServiceSlugs() {
  return ALL_PAGES.filter((p) => p.dir === "services").map((p) => p.slug);
}

export function getAllServiceAreaSlugs() {
  return ALL_PAGES.filter((p) => p.dir === "service-areas").map((p) => p.slug);
}

export function getAllBlogSlugs() {
  return ALL_PAGES.filter((p) => p.dir === "blog").map((p) => p.slug);
}
