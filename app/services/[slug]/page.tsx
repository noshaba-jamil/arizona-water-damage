import type { Metadata } from "next";
import { socialMeta } from "@/lib/seo";
import { notFound } from "next/navigation";
import { getPageBySlug, getAllServiceSlugs } from "@/lib/content";
import { faqPageSchema } from "@/lib/schema";
import ContentPage from "@/components/ContentPage";
import ServiceAreasStrip from "@/components/ServiceAreasStrip";
import { SITE } from "@/content/site-config";

export function generateStaticParams() {
  return getAllServiceSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageBySlug("services", slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.meta,
    alternates: { canonical: page.url },
    ...socialMeta(page.title, page.meta, page.url),
  };
}

export default async function ServicePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPageBySlug("services", slug);
  if (!page) notFound();

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: page.h1,
    provider: {
      "@type": "LocalBusiness",
      name: SITE.name,
      telephone: "+1-928-267-9292",
      address: {
        "@type": "PostalAddress",
        streetAddress: SITE.address.street,
        addressLocality: SITE.address.city,
        addressRegion: SITE.address.state,
        postalCode: SITE.address.zip,
        addressCountry: "US",
      },
    },
    areaServed: "Arizona",
  };

  const faqSchema = faqPageSchema(page.faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <ContentPage
        crumbs={[{ label: "Home", href: "/" }, { label: "Services", href: "/services" }, { label: page.h1.split(" — ")[0].split(" - ")[0].slice(0, 40) }]}
        eyebrow="Our Services"
        h1={page.h1}
        lead={page.lead}
        badges={["IICRC Certified", "60-Min Response", "All Insurance"]}
        bodyHtml={page.bodyHtml}
        related={page.related}
        extraSection={<ServiceAreasStrip serviceName={page.h1.split(" — ")[0].split(" - ")[0].replace(" in Arizona", "").replace(" Arizona", "")} />}
        primaryCta={{ label: `Request ${page.h1.split(" — ")[0].split(" - ")[0].replace(" in Arizona", "").replace(" Arizona", "")} Help`, href: SITE.phoneHref }}
      />
    </>
  );
}
