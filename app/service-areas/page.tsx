import type { Metadata } from "next";
import { socialMeta } from "@/lib/seo";
import Link from "next/link";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import { COUNTIES } from "@/content/site-config";

export const metadata: Metadata = {
  title: "Water Damage Restoration Service Areas | 23 Arizona Cities",
  description:
    "Water damage restoration across 23 Arizona communities in Maricopa, Pima & Pinal Counties. Find your city and call (928) 267-9292.",
  alternates: { canonical: "/service-areas" },
  ...socialMeta("Water Damage Restoration Service Areas | 23 Arizona Cities",
    "Water damage restoration across 23 Arizona communities in Maricopa, Pima & Pinal Counties. Find your city and call (928) 267-9292.",
    "/service-areas"),
};

export default function ServiceAreasIndexPage() {
  return (
    <>
      <Breadcrumbs crumbs={[{ label: "Home", href: "/" }, { label: "Service Areas" }]} />
      <PageHero
        eyebrow="Service Areas"
        h1="All 23 Arizona Communities We Serve"
        lead="Across Maricopa, Pima, and Pinal Counties — a real local team, not a national franchise reading off a coverage map."
        badges={["23 Cities", "3 Counties", "60-Min Response"]}
        primaryCta={{ label: "Find Service in Your Area", href: "/contact" }}
      />
      <section>
        <div className="container" style={{ maxWidth: "920px" }}>
          <p className="hub-intro">
            We serve 23 communities across Maricopa, Pima, and Pinal Counties from our base in Wickenburg. Each county page covers local
            conditions and the communities we serve, and each community page lists the services available there. Start with your county
            (<Link href="/service-areas/water-damage-maricopa-county-az">Maricopa</Link>,{" "}
            <Link href="/service-areas/water-damage-pima-county-az">Pima</Link>, or{" "}
            <Link href="/service-areas/water-damage-pinal-county-az">Pinal</Link>) or go straight to your city below. If you do not see your
            community, call <a href="tel:+19282679292">(928) 267-9292</a> and we will tell you whether we can help.
          </p>
          <h2 className="sr-only">Service Areas by County</h2>
          {COUNTIES.map((county) => (
            <div className="split-card" style={{ marginBottom: "24px" }} key={county.name}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: "12px", marginBottom: "18px" }}>
                <h3 style={{ fontSize: "22px" }}>{county.name}</h3>
                <Link href={`/service-areas/${county.hubSlug}`} className="btn btn-secondary btn-sm">
                  View County Hub →
                </Link>
              </div>
              <div className="city-pill-row">
                {county.cities.map((city) => (
                  <Link
                    key={city.slug}
                    href={`/service-areas/${city.slug}`}
                    className="city-pill"
                    style={{ color: "var(--navy)", background: "var(--blue-soft)", borderColor: "transparent" }}
                  >
                    {city.name}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      <CTABanner />
    </>
  );
}
