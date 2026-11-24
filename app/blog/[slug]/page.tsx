import type { Metadata } from "next";
import { socialMeta } from "@/lib/seo";
import { notFound } from "next/navigation";
import { getPageBySlug, getAllBlogSlugs } from "@/lib/content";
import { faqPageSchema } from "@/lib/schema";
import ContentPage from "@/components/ContentPage";
import { SITE } from "@/content/site-config";

export function generateStaticParams() {
  return getAllBlogSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageBySlug("blog", slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.meta,
    alternates: { canonical: page.url },
    ...socialMeta(page.title, page.meta, page.url, "article"),
  };
}

export default async function BlogPostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPageBySlug("blog", slug);
  if (!page) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    url: `${SITE.url}${page.url}`,
    mainEntityOfPage: { "@type": "WebPage", "@id": `${SITE.url}${page.url}` },
    image: [`${SITE.url}/opengraph-image`],
    headline: page.h1,
    author: { "@type": "Organization", name: SITE.name },
    publisher: { "@type": "Organization", name: SITE.name },
  };

  const faqSchema = faqPageSchema(page.faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <ContentPage
        bodyTag="article"
        crumbs={[{ label: "Home", href: "/" }, { label: "Blog", href: "/blog" }, { label: page.h1.slice(0, 40) }]}
        eyebrow="Resource Guide"
        h1={page.h1}
        lead={page.lead}
        bodyHtml={page.bodyHtml}
        related={page.related}
        primaryCta={{ label: "Need Water Damage Help? Contact Us", href: SITE.phoneHref }}
        facts={[
          { k: "Category", v: "Resource Guide" },
          { k: "Response Time", v: "60 Minutes" },
          { k: "Availability", v: "24/7/365" },
        ]}
      />
    </>
  );
}
