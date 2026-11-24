import type { Metadata } from "next";
import { socialMeta } from "@/lib/seo";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import ServiceCardImage from "@/components/ServiceCardImage";
import { IconArrow } from "@/components/Icons";
import { SERVICES } from "@/content/site-config";

export const metadata: Metadata = {
  title: "Water Damage Restoration Services in Arizona | 11 Services",
  description:
    "11 water damage restoration services across Arizona — flood cleanup, mold remediation, burst pipes, commercial, insurance claims, and more.",
  alternates: { canonical: "/services" },
  ...socialMeta("Water Damage Restoration Services in Arizona | 11 Services",
    "11 water damage restoration services across Arizona — flood cleanup, mold remediation, burst pipes, commercial, insurance claims, and more.",
    "/services"),
};

export default function ServicesIndexPage() {
  return (
    <>
      <Breadcrumbs crumbs={[{ label: "Home", href: "/" }, { label: "Services" }]} />
      <PageHero
        eyebrow="Our Services"
        h1="Complete Water Damage Restoration Services"
        lead="11 specialized services covering every stage of water damage — from the first extraction to the final insurance-ready repair."
        badges={["IICRC Certified", "60-Min Response", "All Insurance"]}
        primaryCta={{ label: "Request Water Damage Service", href: "/contact" }}
      />
      <section>
        <div className="container">
          <p className="hub-intro">
            Water damage rarely stays one problem. A burst pipe can soak drywall, leave hidden moisture behind, and lead to mold within days,
            so these services are built to work together: emergency water removal first, then structural drying and dehumidification, then
            cleanup and repairs. Start with <Link href="/services/emergency-water-damage-arizona">emergency water damage response</Link>, see how
            we handle <Link href="/services/mold-remediation-arizona">mold remediation</Link>, or read about
            <Link href="/services/water-damage-insurance-claim-arizona"> insurance claim help</Link>. Not sure what you need? Call
            {" "}<a href="tel:+19282679292">(928) 267-9292</a> and tell us what happened.
          </p>
          <h2 className="sr-only">Our Services</h2>
          <div className="services-grid">
            {SERVICES.map((s, i) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="service-card">
                <ServiceCardImage slug={s.slug} variant={i} />
                <div className="card-body">
                  <h3>{s.name}</h3>
                  <p>{s.desc}</p>
                  <span className="link">Learn more <IconArrow className="w-3.5 h-3.5" /></span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <CTABanner />
    </>
  );
}
