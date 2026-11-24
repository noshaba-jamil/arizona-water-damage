import type { Metadata } from "next";
import { socialMeta } from "@/lib/seo";
import Link from "next/link";
import { SITE, COUNTIES, SERVICES } from "@/content/site-config";
import CTABanner from "@/components/CTABanner";
import ServiceCardImage from "@/components/ServiceCardImage";
import {
  IconDrop, IconPhone, IconCheck, IconClock, IconShieldLike, IconArrow, IconChevron,
} from "@/components/Icons";

export const metadata: Metadata = {
  title: SITE.defaultTitle,
  description: SITE.defaultDescription,
  alternates: { canonical: "/" },
  ...socialMeta(SITE.defaultTitle, SITE.defaultDescription, "/"),
};

const featuredServices = SERVICES.slice(0, 6);

export default function HomePage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `${SITE.url}/#business`,
    url: SITE.url,
    image: `${SITE.url}/opengraph-image`,
    logo: `${SITE.url}/apple-icon`,
    description: SITE.defaultDescription,
    parentOrganization: { "@id": `${SITE.url}/#organization` },
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
    areaServed: ["Maricopa County, AZ", "Pima County, AZ", "Pinal County, AZ"],
    priceRange: "$$",
    openingHours: "Mo-Su 00:00-23:59",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      {/* ---------------- HERO ---------------- */}
      <section className="hero" style={{ padding: 0 }}>
        <div className="container">
          <div>
            <div className="hero-eyebrow"><span className="pulse" /> 60-Minute Emergency Response — Statewide Arizona</div>
            <h1>Arizona Water Damage Restoration — Local <span className="accent">928</span> Team Responds in 60 Minutes</h1>
            <p className="lead">A real Arizona company with a real local number and a real Wickenburg address — not a Phoenix call center, not an out-of-state lead generator. IICRC-certified, veteran-owned, serving 23 communities across Maricopa, Pima &amp; Pinal Counties.</p>
            <div className="hero-actions">
              <a href={SITE.phoneHref} className="btn btn-primary">
                <IconPhone className="w-4 h-4" /> Call {SITE.phone}
              </a>
              <Link href="/contact" className="btn btn-outline-light">Request Service</Link>
            </div>
            <div className="hero-badges">
              <span className="hero-badge"><IconCheck className="w-4 h-4" /> IICRC Certified</span>
              <span className="hero-badge"><IconCheck className="w-4 h-4" /> Veteran-Owned</span>
              <span className="hero-badge"><IconCheck className="w-4 h-4" /> All Insurance Accepted</span>
              <span className="hero-badge"><IconCheck className="w-4 h-4" /> Local (928) Number</span>
            </div>
          </div>

          <div className="hero-panel">
            <div className="panel-badge">
              <div className="panel-icon"><IconClock /></div>
              <div>
                <div className="t1">24/7 Emergency</div>
                <div className="t2">We&apos;re Ready Now</div>
              </div>
            </div>
            <div className="hero-stats">
              <div className="hero-stat"><div className="num">60 Min</div><div className="lbl">Guaranteed response time</div></div>
              <div className="hero-stat"><div className="num">23</div><div className="lbl">Arizona communities served</div></div>
              <div className="hero-stat"><div className="num">3</div><div className="lbl">Counties — Maricopa, Pima, Pinal</div></div>
              <div className="hero-stat"><div className="num">$50</div><div className="lbl">Off your first service call</div></div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- TRUST BAR ---------------- */}
      <section className="trust-bar" style={{ padding: 0 }}>
        <div className="container">
          <div className="trust-item">
            <div className="trust-icon"><IconClock className="w-5 h-5 text-blue" /></div>
            <div><p className="trust-title">24/7 Emergency Response</p><p>We&apos;re available around the clock, every day of the year.</p></div>
          </div>
          <div className="trust-item">
            <div className="trust-icon"><IconShieldLike className="w-5 h-5 text-blue" /></div>
            <div><p className="trust-title">IICRC Certified Technicians</p><p>WRT &amp; AMRT certified — highly trained experts you can trust.</p></div>
          </div>
          <div className="trust-item">
            <div className="trust-icon"><IconCheck className="w-5 h-5 text-blue" /></div>
            <div><p className="trust-title">Work With All Insurance</p><p>We handle documentation and adjuster coordination for you.</p></div>
          </div>
          <div className="trust-item">
            <div className="trust-icon"><IconDrop className="w-5 h-5" /></div>
            <div><p className="trust-title">Local Arizona Owned</p><p>Real (928) number, real Wickenburg address — not a call center.</p></div>
          </div>
        </div>
      </section>

      {/* ---------------- SERVICES ---------------- */}
      <section id="services">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Our Services</span>
              <h2>Complete Water Damage Restoration Across Arizona</h2>
            </div>
            <p className="sub">Full-service water damage restoration engineered for Arizona&apos;s climate — from monsoon flash floods to slab leaks to the mold risk our desert heat accelerates.</p>
          </div>

          <div className="services-grid">
            {featuredServices.map((s, i) => (
              <Link key={s.slug} href={`/services/${s.slug}`} className="service-card">
                <ServiceCardImage slug={s.slug} variant={i} />
                <div className="card-body">
                  <h3>{s.name.replace(" Arizona", "")}</h3>
                  <p>{s.desc}</p>
                  <span className="link">Learn more <IconArrow className="w-3.5 h-3.5" /></span>
                </div>
              </Link>
            ))}
          </div>
          <div style={{ textAlign: "center", marginTop: "40px" }}>
            <Link href="/services" className="btn btn-primary">View All 11 Services</Link>
          </div>
        </div>
      </section>

      {/* ---------------- PROCESS ---------------- */}
      <section className="process-section">
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Our Process</span>
              <h2>What Happens When You Call</h2>
            </div>
            <p className="sub">Every Arizona water damage emergency follows the same disciplined process — from your first call to a fully restored, documented, insurance-ready property.</p>
          </div>
          <div className="process-grid">
            {[
              { n: "01", title: `Call ${SITE.phone}`, desc: "A real Arizona professional answers in under 60 seconds — 24/7/365, no answering service.", icon: <IconPhone /> },
              { n: "02", title: "60-Minute Dispatch", desc: "Our nearest technician arrives on-site and assesses the water category, source, and extent.", icon: <IconClock /> },
              { n: "03", title: "Extract & Dry", desc: "Industrial extraction and IICRC S500 structural drying, with daily moisture monitoring.", icon: <IconDrop /> },
              { n: "04", title: "Restore & Document", desc: "Full repair and reconstruction, with complete documentation for your insurance claim.", icon: <IconShieldLike /> },
            ].map((step) => (
              <div className="process-step" key={step.n}>
                <div className="process-num">{step.n}<span className="line" /></div>
                <div className="process-step-icon">{step.icon}</div>
                <h3>{step.title}</h3>
                <p>{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------------- ABOUT + SERVICE AREAS ---------------- */}
      <section className="split-section">
        <div className="container">
          <div className="split-card">
            <span className="eyebrow">About Us</span>
            <h2 style={{ fontSize: "26px", marginBottom: "14px" }}>Your Local Arizona Water Damage Restoration Team</h2>
            <p style={{ fontSize: "15px", color: "var(--text-slate)" }}>
              We are a locally operated, IICRC-certified, veteran-owned restoration company serving 23 communities across
              Maricopa, Pima, and Pinal Counties. We are not a Phoenix call center routing your call to an unknown
              contractor, and we are not an out-of-state lead generation site — we&apos;re a real Arizona company with a
              real (928) local number and a real Wickenburg address.
            </p>
            <ul className="checklist">
              <li><IconCheck /> 24/7 emergency response, 60-minute guarantee</li>
              <li><IconCheck /> IICRC WRT &amp; AMRT certified technicians</li>
              <li><IconCheck /> Veteran-owned, locally based in Wickenburg, AZ</li>
              <li><IconCheck /> We work directly with all major AZ insurance carriers</li>
            </ul>
            <Link href="/about" className="btn btn-secondary" style={{ marginTop: "26px" }}>More About Us</Link>
          </div>

          <div className="split-card navy">
            <span className="eyebrow">Service Areas</span>
            <h2 style={{ fontSize: "26px", marginBottom: "10px" }}>Proudly Serving 23 Arizona Communities</h2>
            <p style={{ fontSize: "14.5px" }}>Across three counties — with a real local team that knows the terrain, not a national franchise reading off a coverage map.</p>

            {COUNTIES.map((county) => (
              <div className="county-block" key={county.name}>
                <h3>{county.name}</h3>
                <div className="city-pill-row">
                  {county.cities.map((c) => (
                    <Link href={`/service-areas/${c.slug}`} className="city-pill" key={c.slug}>{c.name}</Link>
                  ))}
                </div>
              </div>
            ))}
            <Link href="/service-areas" className="btn btn-outline-light" style={{ marginTop: "24px" }}>View All Service Areas</Link>
          </div>
        </div>
      </section>

      {/* ---------------- QUICK LINKS ---------------- */}
      <section style={{ background: "var(--bg)" }}>
        <div className="container">
          <div className="section-head">
            <div>
              <span className="eyebrow">Explore</span>
              <h2>Quick Links</h2>
            </div>
            <p className="sub">Every important part of the site, organized by topic — not a link wall.</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: "28px" }}>
            <div>
              <h3 style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: ".05em", color: "var(--blue)", fontWeight: 700, marginBottom: "14px" }}>Services</h3>
              <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "10px" }}>
                {SERVICES.slice(0, 6).map((s) => (
                  <li key={s.slug}><Link href={`/services/${s.slug}`} style={{ fontSize: "14.5px", color: "var(--text-main)" }}>{s.name.replace(" Arizona", "")}</Link></li>
                ))}
                <li><Link href="/services" style={{ fontSize: "14.5px", color: "var(--blue)", fontWeight: 600 }}>View all 11 services →</Link></li>
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: ".05em", color: "var(--blue)", fontWeight: 700, marginBottom: "14px" }}>Areas We Serve</h3>
              <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "10px" }}>
                <li><Link href="/service-areas/water-damage-wickenburg-az" style={{ fontSize: "14.5px", color: "var(--text-main)" }}>Wickenburg (Primary HQ)</Link></li>
                <li><Link href="/service-areas/water-damage-maricopa-county-az" style={{ fontSize: "14.5px", color: "var(--text-main)" }}>Maricopa County</Link></li>
                <li><Link href="/service-areas/water-damage-pima-county-az" style={{ fontSize: "14.5px", color: "var(--text-main)" }}>Pima County</Link></li>
                <li><Link href="/service-areas/water-damage-pinal-county-az" style={{ fontSize: "14.5px", color: "var(--text-main)" }}>Pinal County</Link></li>
                <li><Link href="/service-areas" style={{ fontSize: "14.5px", color: "var(--blue)", fontWeight: 600 }}>View all 23 cities →</Link></li>
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: ".05em", color: "var(--blue)", fontWeight: 700, marginBottom: "14px" }}>Resources</h3>
              <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "10px" }}>
                <li><Link href="/blog" style={{ fontSize: "14.5px", color: "var(--text-main)" }}>Blog &amp; Guides</Link></li>
                <li><Link href="/faq" style={{ fontSize: "14.5px", color: "var(--text-main)" }}>Frequently Asked Questions</Link></li>
                <li><Link href="/blog/arizona-monsoon-water-damage-guide" style={{ fontSize: "14.5px", color: "var(--text-main)" }}>Monsoon Preparedness Guide</Link></li>
                <li><Link href="/blog/water-damage-restoration-cost-arizona" style={{ fontSize: "14.5px", color: "var(--text-main)" }}>Restoration Cost Guide</Link></li>
              </ul>
            </div>
            <div>
              <h3 style={{ fontSize: "13px", textTransform: "uppercase", letterSpacing: ".05em", color: "var(--blue)", fontWeight: 700, marginBottom: "14px" }}>Company</h3>
              <ul style={{ listStyle: "none", padding: 0, display: "grid", gap: "10px" }}>
                <li><Link href="/about" style={{ fontSize: "14.5px", color: "var(--text-main)" }}>About Us</Link></li>
                <li><Link href="/contact" style={{ fontSize: "14.5px", color: "var(--text-main)" }}>Contact</Link></li>
                <li><Link href="/services/water-damage-insurance-claim-arizona" style={{ fontSize: "14.5px", color: "var(--text-main)" }}>Insurance Claim Help</Link></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ---------------- HOMEPAGE FAQ ---------------- */}
      <section>
        <div className="container" style={{ maxWidth: "820px" }}>
          <div className="section-head">
            <div>
              <span className="eyebrow">Common Questions</span>
              <h2>Frequently Asked Questions</h2>
            </div>
          </div>
          <div className="faq-list">
            <details className="faq-item">
              <summary>How fast can you respond to a water damage emergency in Arizona?<IconChevron className="chev" /></summary>
              <div className="answer">We guarantee 60-minute emergency response anywhere across our 23-community Arizona service area, 24/7/365.</div>
            </details>
            <details className="faq-item">
              <summary>Do you work with my homeowners insurance?<IconChevron className="chev" /></summary>
              <div className="answer">Yes — we work directly with all major Arizona carriers and document every job to support your claim. See our <Link href="/services/water-damage-insurance-claim-arizona">Insurance Claim page</Link> for details on what's typically covered.</div>
            </details>
            <details className="faq-item">
              <summary>What areas of Arizona do you serve?<IconChevron className="chev" /></summary>
              <div className="answer">23 communities across Maricopa, Pima, and Pinal Counties, based out of Wickenburg, AZ. See our full <Link href="/service-areas">Service Areas</Link> list.</div>
            </details>
            <details className="faq-item">
              <summary>Is mold a real risk after water damage in Arizona's dry climate?<IconChevron className="chev" /></summary>
              <div className="answer">Yes — once water is trapped inside a wall or under flooring, Arizona's warm indoor temperatures can accelerate mold growth. See our <Link href="/services/mold-remediation-arizona">Mold Remediation</Link> page.</div>
            </details>
            <details className="faq-item">
              <summary>Are your technicians certified?<IconChevron className="chev" /></summary>
              <div className="answer">Yes — IICRC Water Damage Restoration Technician (WRT) and Applied Microbial Remediation Technician (AMRT) certified.</div>
            </details>
          </div>
          <div style={{ textAlign: "center", marginTop: "32px" }}>
            <Link href="/faq" className="btn btn-secondary">View All FAQs</Link>
          </div>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
