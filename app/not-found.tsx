import type { Metadata } from "next";
import Link from "next/link";
import { SITE, SERVICES } from "@/content/site-config";
import { IconPhone } from "@/components/Icons";
import ServiceCardImage from "@/components/ServiceCardImage";

export const metadata: Metadata = {
  title: "Page Not Found | Arizona Water Damage Restoration",
  robots: { index: false, follow: true },
};

export default function NotFound() {
  const topServices = SERVICES.slice(0, 4);

  return (
    <section className="page-hero" style={{ paddingBottom: "0" }}>
      <div className="container" style={{ textAlign: "center", maxWidth: "680px" }}>
        <span className="eyebrow">404 — Page Not Found</span>
        <h1 style={{ marginBottom: "16px" }}>We Couldn&apos;t Find That Page</h1>
        <p style={{ margin: "0 auto 32px" }}>
          The page you&apos;re looking for may have moved or the link may be out of date. If you have a water
          damage emergency, don&apos;t wait on a broken link — call us directly.
        </p>
        <div className="hero-actions" style={{ justifyContent: "center", marginBottom: "48px" }}>
          <a href={SITE.phoneHref} className="btn btn-primary">
            <IconPhone className="w-4 h-4" /> Call {SITE.phone}
          </a>
          <Link href="/" className="btn btn-outline-light">Back to Homepage</Link>
        </div>
      </div>

      <section style={{ background: "var(--bg)", padding: "56px 0 84px" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <h2 style={{ color: "var(--navy)", fontSize: "22px", marginBottom: "24px", textAlign: "center" }}>
            Or find what you need:
          </h2>
          <div className="services-grid" style={{ gridTemplateColumns: "repeat(2, 1fr)" }}>
            {topServices.map((s, i) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="service-card">
                <ServiceCardImage slug={s.slug} variant={i} />
                <div className="card-body">
                  <h3>{s.name.replace(" Arizona", "")}</h3>
                  <p>{s.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: "12px", marginTop: "28px", flexWrap: "wrap" }}>
            <Link href="/service-areas" className="btn btn-secondary btn-sm">All Service Areas</Link>
            <Link href="/blog" className="btn btn-secondary btn-sm">Blog &amp; Resources</Link>
            <Link href="/contact" className="btn btn-secondary btn-sm">Contact Us</Link>
          </div>
        </div>
      </section>
    </section>
  );
}
