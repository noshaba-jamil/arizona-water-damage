import type { Metadata } from "next";
import { socialMeta } from "@/lib/seo";
import Link from "next/link";
import fs from "fs";
import path from "path";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import Sidebar from "@/components/Sidebar";
import { IconCheck } from "@/components/Icons";
import { SITE } from "@/content/site-config";

export const metadata: Metadata = {
  title: "About Us | Arizona Water Damage Restoration | Wickenburg",
  description:
    "Locally operated, IICRC-certified, veteran-owned water damage restoration serving 23 Arizona communities. Real (928) number, real Wickenburg address.",
  alternates: { canonical: "/about" },
  ...socialMeta("About Us | Arizona Water Damage Restoration | Wickenburg",
    "Locally operated, IICRC-certified, veteran-owned water damage restoration serving 23 Arizona communities. Real (928) number, real Wickenburg address.",
    "/about"),
};

function getAboutHtml() {
  const filePath = path.join(process.cwd(), "content", "about-body.html");
  return fs.readFileSync(filePath, "utf-8");
}

export default function AboutPage() {
  const bodyHtml = getAboutHtml();
  const aboutSchema = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    name: `About ${SITE.name}`,
    url: `${SITE.url}/about`,
    about: { "@type": "LocalBusiness", "@id": `${SITE.url}/#business`, name: SITE.name, url: SITE.url },
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(aboutSchema) }} />
      <Breadcrumbs crumbs={[{ label: "Home", href: "/" }, { label: "About Us" }]} />
      <PageHero
        eyebrow="About Us"
        h1="Your Local Arizona Water Damage Restoration Team"
        lead="IICRC-certified, veteran-owned, and based right here in Wickenburg — not a national franchise reading off a coverage map."
        badges={["IICRC Certified", "Veteran-Owned", "23 Communities Served"]}
        primaryCta={{ label: "Contact Our Team", href: "/contact" }}
        secondaryCta={{ label: `Call ${SITE.phone}`, href: SITE.phoneHref }}
      />
      <section className="content-layout">
        <div className="container">
          <div className="prose" dangerouslySetInnerHTML={{ __html: bodyHtml }} />
          <Sidebar
            facts={[
              { k: "Address", v: `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.state}` },
              { k: "Hours", v: "24/7/365" },
            ]}
          />
        </div>
      </section>

      <section style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Our Values</span>
              <h2>What Guides How We Work</h2>
            </div>
            <p className="sub">The principles behind our 60-minute response standard and how we handle every Arizona property we're trusted with.</p>
          </div>
          <div className="services-grid">
            {[
              {
                title: "Fast Response",
                desc: "Every hour of delay makes water damage worse, especially in Arizona's heat — which is why we hold ourselves to a 60-minute response standard, 24/7.",
                link: { href: "/services/emergency-water-damage-arizona", label: "See our emergency response process" },
              },
              {
                title: "Transparency",
                desc: "A real (928) local number, a real Wickenburg address, and direct communication with your insurance adjuster — no call-center layer between you and the work being done.",
                link: { href: "/contact", label: "Get in touch directly" },
              },
              {
                title: "Certified Expertise",
                desc: "IICRC WRT and AMRT certified technicians, not general handymen — trained specifically in water damage restoration and mold remediation standards.",
                link: { href: "/services/mold-remediation-arizona", label: "Learn about our mold remediation standard" },
              },
              {
                title: "Reliability",
                desc: "We're locally based in Wickenburg and serve 23 Arizona communities with the same response standard — not a national franchise stretched thin across a coverage map.",
                link: { href: "/service-areas", label: "View our full service area" },
              },
              {
                title: "Customer Care",
                desc: "We coordinate directly with families, caregivers, or property managers when that's helpful, and document everything thoroughly so your insurance claim isn't an extra burden.",
                link: { href: "/services/water-damage-insurance-claim-arizona", label: "How we handle insurance claims" },
              },
              {
                title: "Safety",
                desc: "From Category 3 black-water protocols to structural drying verified by actual moisture readings, we follow IICRC S500 standards rather than guessing when a job is done.",
                link: { href: "/services/structural-drying-dehumidification-arizona", label: "See our drying standard" },
              },
            ].map((v) => (
              <div className="service-card" key={v.title} style={{ cursor: "default" }}>
                <div className="service-icon"><IconCheck className="w-6 h-6" /></div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
                <Link href={v.link.href} className="link">{v.link.label} →</Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
