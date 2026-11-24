import Breadcrumbs from "./Breadcrumbs";
import PageHero from "./PageHero";
import CTABanner from "./CTABanner";
import Sidebar, { RelatedLink } from "./Sidebar";

export default function ContentPage({
  crumbs,
  eyebrow,
  h1,
  lead,
  badges,
  bodyHtml,
  related,
  facts,
  primaryCta,
  secondaryCta,
  extraSection,
  bodyTag,
}: {
  crumbs: { label: string; href?: string }[];
  eyebrow: string;
  h1: string;
  lead: string;
  badges?: string[];
  bodyHtml: string;
  related?: RelatedLink[];
  facts?: { k: string; v: string }[];
  primaryCta?: { label: string; href: string };
  secondaryCta?: { label: string; href: string } | null;
  /** Rendered full-width, after the main content+sidebar layout and
      before the closing CTA banner. Used for page-type-specific sections
      like "Services We Serve in This Area" on service-area pages. */
  extraSection?: React.ReactNode;
  /** Use "article" for blog posts so the post is marked up as a self-contained article. */
  bodyTag?: "div" | "article";
}) {
  const Body = bodyTag ?? "div";
  return (
    <>
      <Breadcrumbs crumbs={crumbs} />
      <PageHero eyebrow={eyebrow} h1={h1} lead={lead} badges={badges} primaryCta={primaryCta} secondaryCta={secondaryCta} />
      <section className="content-layout">
        <div className="container">
          <Body className="prose" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
          <Sidebar related={related} facts={facts} />
        </div>
      </section>
      {extraSection}
      <CTABanner />
    </>
  );
}
