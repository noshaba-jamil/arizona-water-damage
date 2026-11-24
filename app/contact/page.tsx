import type { Metadata } from "next";
import { socialMeta } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHero from "@/components/PageHero";
import Sidebar from "@/components/Sidebar";
import ContactForm from "@/components/ContactForm";
import { faqPageSchema } from "@/lib/schema";
import { IconChevron } from "@/components/Icons";
import { COUNTIES, SITE } from "@/content/site-config";

export const metadata: Metadata = {
  title: "Contact Arizona Water Damage Restoration | (928) 267-9292",
  description:
    "Contact Arizona Water Damage Restoration for a free assessment. 24/7 emergency line, serving 23 communities across Maricopa, Pima & Pinal Counties.",
  alternates: { canonical: "/contact" },
  ...socialMeta("Contact Arizona Water Damage Restoration | (928) 267-9292",
    "Contact Arizona Water Damage Restoration for a free assessment. 24/7 emergency line, serving 23 communities across Maricopa, Pima & Pinal Counties.",
    "/contact"),
};

const contactFaqs = [
  {
    question: "How do I request service?",
    answer:
      "Call " + SITE.phone + " for immediate/emergency needs, or use the form on this page for a free assessment request if it's not an active emergency.",
  },
  {
    question: "What happens after I contact you?",
    answer:
      "For calls, a real Arizona team member answers directly and dispatches a technician, typically within 60 minutes. For form submissions, we follow up to confirm details and schedule an assessment or emergency response as needed.",
  },
  {
    question: "What information should I have ready?",
    answer:
      "Your address, a brief description of what happened, and whether the water source has been stopped. If you're unsure, mention that too.",
  },
  {
    question: "Do you offer emergency service outside business hours?",
    answer: "Yes — we operate 24/7/365 with no separate after-hours line.",
  },
  {
    question: "Is the assessment really free?",
    answer: "Yes, the initial inspection and assessment is free, and new customers also receive $50 off their first service call.",
  },
];

export default function ContactPage() {
  const faqSchema = faqPageSchema(contactFaqs);
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Arizona Water Damage Restoration",
    url: `${SITE.url}/contact`,
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }} />
      {faqSchema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      )}
      <Breadcrumbs crumbs={[{ label: "Home", href: "/" }, { label: "Contact" }]} />
      <PageHero
        eyebrow="Contact Us"
        h1="Get Your Free Arizona Water Damage Assessment"
        lead="Answered 24 hours a day, 7 days a week — average answer time under 60 seconds."
        badges={["24/7 Live Answer", "Free Assessment", "All Insurance Accepted"]}
        primaryCta={{ label: `Call Now — ${SITE.phone}`, href: SITE.phoneHref }}
        secondaryCta={{ label: "Jump to Contact Form", href: "#contact-form" }}
      />
      <section className="content-layout">
        <div className="container">
          <div className="prose">
            <div className="callout">
              <p>
                <strong>
                  📞 Emergency Line: <a href={SITE.phoneHref}>{SITE.phone}</a>
                </strong>{" "}
                — answered 24/7, average answer time under 60 seconds. One number serves all 23 Arizona
                communities across Maricopa, Pima, and Pinal Counties.
              </p>
            </div>

            <h2 id="contact-form">Request Your Free Assessment</h2>
            <ContactForm />

            <h2>Our Full Arizona Service Area</h2>
            <div className="info-panel">
              {COUNTIES.map((county) => (
                <div key={county.name}>
                  <div className="row">
                    <span className="k">{county.name}</span>
                    <span className="v">{county.cities.length} communities</span>
                  </div>
                  <p style={{ fontSize: "13.5px", color: "var(--text-slate)", marginTop: "-6px", marginBottom: "14px" }}>
                    {county.cities.map((c) => c.name.replace(" — Primary HQ", "")).join(", ")}
                  </p>
                </div>
              ))}
            </div>

            <h2>Find Us</h2>
            <p>
              Our home base is {SITE.address.full}. This map shows our verified business location — it does not
              indicate the extent of our service area, which covers 23 communities across Maricopa, Pima, and Pinal
              Counties. See our <a href="/service-areas">Service Areas page</a> for the full list.
            </p>
            <div
              style={{
                borderRadius: "var(--radius-lg)",
                overflow: "hidden",
                border: "1px solid var(--border)",
                aspectRatio: "16 / 9",
              }}
            >
              <iframe
                title={`Map showing ${SITE.name} location at ${SITE.address.full}`}
                src={`https://maps.google.com/maps?q=${encodeURIComponent(SITE.address.full)}&z=14&output=embed`}
                width="100%"
                height="100%"
                style={{ border: 0, display: "block" }}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>

            <h2>Contact FAQ</h2>
            <div className="faq-list">
              {contactFaqs.map((item, i) => (
                <details className="faq-item" key={i}>
                  <summary>{item.question}<IconChevron className="chev" /></summary>
                  <div className="answer">{item.answer}</div>
                </details>
              ))}
            </div>
          </div>

          <Sidebar
            facts={[
              { k: "Email", v: SITE.email },
              { k: "Address", v: `${SITE.address.street}, ${SITE.address.city}, ${SITE.address.state}` },
              { k: "Hours", v: "Open 24 Hours" },
            ]}
            secondaryCta={{ label: "Jump to Form", href: "#contact-form" }}
          />
        </div>
      </section>
    </>
  );
}
