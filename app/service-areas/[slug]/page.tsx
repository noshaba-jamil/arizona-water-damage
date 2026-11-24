import type { Metadata } from "next";
import { socialMeta } from "@/lib/seo";
import { notFound } from "next/navigation";
import { getPageBySlug, getAllServiceAreaSlugs } from "@/lib/content";
import { faqPageSchema } from "@/lib/schema";
import ContentPage from "@/components/ContentPage";
import ServicesWeServe from "@/components/ServicesWeServe";
import AreasWeAlsoServe from "@/components/AreasWeAlsoServe";
import { SITE } from "@/content/site-config";

export function generateStaticParams() {
  return getAllServiceAreaSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const page = getPageBySlug("service-areas", slug);
  if (!page) return {};
  return {
    title: page.title,
    description: page.meta,
    alternates: { canonical: page.url },
    ...socialMeta(page.title, page.meta, page.url),
  };
}

export default async function ServiceAreaPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const page = getPageBySlug("service-areas", slug);
  if (!page) notFound();

  const areaName = page.h1.split(" — ")[0].split(" - ")[0].replace("Water Damage Restoration in ", "").replace(",", "");
  const isCounty = page.category === "county";
  const pageUrl = `${SITE.url}${page.url}`;
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Service",
    "@id": `${pageUrl}#service`,
    name: `Water Damage Restoration in ${areaName}`,
    serviceType: "Water damage restoration",
    url: pageUrl,
    areaServed: { "@type": page.category === "county" ? "AdministrativeArea" : "City", name: areaName },
    provider: {
      "@type": "LocalBusiness",
      "@id": `${SITE.url}/#business`,
      name: SITE.name,
      url: SITE.url,
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
  };

  const faqSchema = faqPageSchema(page.faqs);

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <ContentPage
        crumbs={[
          { label: "Home", href: "/" },
          { label: "Service Areas", href: "/service-areas" },
          { label: page.h1.split(" — ")[0].split(" - ")[0].slice(0, 40) },
        ]}
        eyebrow={isCounty ? "Service Area — County Hub" : "Service Area"}
        h1={page.h1}
        lead={page.lead}
        badges={["IICRC Certified", "60-Min Response", "All Insurance"]}
        bodyHtml={page.bodyHtml}
        related={page.related}
        primaryCta={{ label: `Get Water Damage Help in ${areaName}`, href: SITE.phoneHref }}
        extraSection={<><ServicesWeServe areaName={areaName} /><AreasWeAlsoServe currentSlug={slug} areaName={areaName} /></>}
      />
    </>
  );
}
