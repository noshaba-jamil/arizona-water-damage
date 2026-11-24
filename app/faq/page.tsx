import type { Metadata } from "next";
import { socialMeta } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import PageHero from "@/components/PageHero";
import CTABanner from "@/components/CTABanner";
import { faqPageSchema } from "@/lib/schema";
import { SITE } from "@/content/site-config";
import Link from "next/link";
import { IconChevron } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Water Damage Restoration FAQ | Arizona Homeowners",
  description:
    "30+ answers to common questions about water damage restoration, water removal, flood cleanup, mold, insurance, and costs in Arizona. Call (928) 267-9292.",
  alternates: { canonical: "/faq" },
  ...socialMeta("Water Damage Restoration FAQ | Arizona Homeowners",
    "30+ answers to common questions about water damage restoration, water removal, flood cleanup, mold, insurance, and costs in Arizona. Call (928) 267-9292.",
    "/faq"),
};

type FAQ = { q: string; a: string };

// Where each answer goes into more depth. Keyed by the exact question text.
const SVC = (slug: string, label: string) => ({ href: `/services/${slug}`, label });
const FAQ_LINKS: Record<string, { href: string; label: string }> = {
  "How quickly should standing water be removed?": SVC("water-removal-arizona", "Water removal"),
  "What happens if standing water is left untreated?": SVC("water-removal-arizona", "Water removal"),
  "How does professional water removal work?": SVC("water-removal-arizona", "Water removal"),
  "What does water damage restoration actually include?": { href: "/services", label: "All restoration services" },
  "How long does water damage restoration take?": { href: "/blog/how-long-does-water-damage-restoration-take-arizona", label: "Restoration timeline guide" },
  "Is my water damage covered by insurance?": SVC("water-damage-insurance-claim-arizona", "Insurance claim help"),
  "What's the difference between water damage and flood damage?": SVC("flood-cleanup-arizona", "Flood cleanup"),
  "How common is flooding in Arizona?": SVC("monsoon-flood-damage-arizona", "Monsoon flood damage"),
  "Is flood cleanup different from regular water damage cleanup?": SVC("flood-cleanup-arizona", "Flood cleanup"),
  "Do you respond during active monsoon storms?": SVC("monsoon-flood-damage-arizona", "Monsoon flood damage"),
  "Isn't Arizona too dry for mold to be a problem after water damage?": SVC("mold-remediation-arizona", "Mold remediation"),
  "What method do you actually use to confirm a structure is dry?": SVC("structural-drying-dehumidification-arizona", "Structural drying"),
  "What equipment is used for structural drying?": SVC("structural-drying-dehumidification-arizona", "Structural drying"),
  "What's the difference between a covered claim and a denied one?": SVC("water-damage-insurance-claim-arizona", "Insurance claim help"),
  "How much does water damage restoration cost?": { href: "/blog/water-damage-restoration-cost-arizona", label: "Cost guide" },
  "What areas of Arizona do you serve?": { href: "/service-areas", label: "All service areas" },
  "Do you handle mold remediation as well as water damage?": SVC("mold-remediation-arizona", "Mold remediation"),
  "Do you handle both residential and commercial water damage?": SVC("commercial-water-damage-arizona", "Commercial water damage"),
  "Can I request service online instead of calling?": { href: "/contact", label: "Contact page" },
};
type FAQSection = { title: string; id: string; items: FAQ[] };

const SECTIONS: FAQSection[] = [
  {
    title: "Emergency Water Damage",
    id: "emergency",
    items: [
      {
        q: "What should I do first when I discover water damage?",
        a: "Shut off the water source if you can safely reach it (main shutoff valve, or the specific fixture), turn off electricity to affected rooms if it's safe to do so without entering standing water, and call for professional extraction as soon as possible. In Arizona's heat, delays of even a few hours meaningfully increase mold risk.",
      },
      {
        q: "How fast can you respond to a water damage emergency in Arizona?",
        a: "We guarantee 60-minute emergency response anywhere across our 23-community Arizona service area, 24 hours a day, 7 days a week, including holidays.",
      },
      {
        q: "Is water damage always an emergency?",
        a: "Not always — a small, contained spill that's been fully dried within an hour may not need emergency service. But any water damage source that's still active (a running leak, a burst pipe, ongoing flooding) should be treated as urgent, since damage and mold risk compound quickly.",
      },
      {
        q: "Can I wait until morning if water damage happens at night?",
        a: "We don't recommend it. Standing water and trapped moisture start causing additional damage and elevate mold risk from the moment they occur, which is why we operate 24/7 rather than only during business hours.",
      },
    ],
  },
  {
    title: "Water Removal",
    id: "water-removal",
    items: [
      {
        q: "How quickly should standing water be removed?",
        a: "As soon as possible — ideally within a few hours. The longer water sits, the more it wicks into flooring, baseboards, and drywall, and the faster mold risk builds in Arizona's warm indoor conditions.",
      },
      {
        q: "What happens if standing water is left untreated?",
        a: "Untreated standing water spreads into porous materials (carpet, drywall, subfloor), increases structural damage, and creates the moisture conditions mold needs — visible mold growth can begin within 24–48 hours in Arizona's warm indoor temperatures.",
      },
      {
        q: "How does professional water removal work?",
        a: "We assess the water category and source, then use truck-mounted or portable extraction equipment to remove standing water from floors, carpet, and affected materials, including sub-surface extraction under flooring where water has penetrated beneath a moisture barrier.",
      },
      {
        q: "Can I remove water myself with a wet/dry vacuum?",
        a: "For a very small, contained spill, yes. For anything beyond that — especially water that may be contaminated (Category 2 or 3) or that's reached carpet padding, subfloor, or wall cavities — a household vacuum isn't sufficient and can also pose an electrocution risk.",
      },
    ],
  },
  {
    title: "Water Damage Restoration",
    id: "restoration",
    items: [
      {
        q: "What does water damage restoration actually include?",
        a: "Extraction of standing water, structural drying and dehumidification, cleaning and sanitizing (for contaminated water), and repair or reconstruction of damaged materials — drywall, flooring, baseboards, and in some cases structural elements.",
      },
      {
        q: "How long does water damage restoration take?",
        a: "For a typical single-room event: extraction the same day, 3–5 days of structural drying, then 1–2 weeks for repairs depending on scope. Larger or contaminated events extend this. See our dedicated restoration-timeline guide for a full breakdown.",
      },
      {
        q: "Do you handle both residential and commercial water damage?",
        a: "Yes. Our commercial team operates on the same 24/7, 60-minute response standard for offices, retail, multi-family, and industrial properties.",
      },
      {
        q: "Is my water damage covered by insurance?",
        a: "It depends on the source. Sudden, accidental damage (a burst pipe, storm damage to a roof) is typically covered under standard homeowners policies; gradual leaks and ground-level flooding often aren't without specific coverage. See our Insurance & Costs section below for more detail.",
      },
      {
        q: "What's the difference between water damage and flood damage?",
        a: "In insurance and restoration terms, 'water damage' generally refers to water from an internal source (plumbing, appliances, roof leaks), while 'flood damage' specifically means water rising from ground level (monsoon flash flooding, wash overflow) — the distinction matters because they're often covered by different insurance policies.",
      },
    ],
  },
  {
    title: "Flood Damage",
    id: "flood",
    items: [
      {
        q: "How common is flooding in Arizona?",
        a: "More common than many people expect — Arizona's monsoon season (roughly July–September) produces intense, fast-moving rainfall that overwhelms desert washes and storm drains, causing flash flooding across the Phoenix, Tucson, and Pinal County areas we serve.",
      },
      {
        q: "Is flood cleanup different from regular water damage cleanup?",
        a: "Yes — floodwater typically carries dirt, debris, and sometimes agricultural or sewage contamination, so it's usually treated as Category 2 or 3 contaminated water, requiring more thorough sanitization than a clean supply-line leak.",
      },
      {
        q: "Do you respond during active monsoon storms?",
        a: "Yes, our team is on standby specifically during monsoon season given the predictable spike in call volume, and we respond to active flooding emergencies rather than waiting for the storm to fully pass.",
      },
      {
        q: "What should I do if my property floods during a storm?",
        a: "If it's safe to do so, turn off electricity to affected areas, avoid walking through standing floodwater, and call for extraction as soon as possible. Don't drive through flooded washes or roads, even ones you cross regularly — water levels can be deceptively dangerous.",
      },
    ],
  },
  {
    title: "Drying & Dehumidification",
    id: "drying",
    items: [
      {
        q: "Isn't Arizona too dry for mold to be a problem after water damage?",
        a: "No — once water intrudes and becomes trapped inside a wall cavity or under flooring, the ambient dryness outside doesn't help. Arizona's warm indoor temperatures can actually accelerate mold growth once moisture is trapped, compared to cooler climates.",
      },
      {
        q: "What method do you actually use to confirm a structure is dry?",
        a: "Moisture meter readings compared against normal target levels for each material type (drywall, subfloor, framing) — not a visual or touch check. See our Drying & Dehumidification service page for the full daily-monitoring process.",
      },
      {
        q: "Do I need professional drying if I already removed the water myself?",
        a: "Often, yes. Removing visible standing water doesn't address moisture that's penetrated into subfloor, wall cavities, or framing, which needs active drying equipment and monitoring to resolve properly.",
      },
      {
        q: "What equipment is used for structural drying?",
        a: "Industrial air movers to accelerate evaporation and commercial dehumidifiers to remove that moisture from the air, positioned according to a moisture map rather than placed uniformly around a room.",
      },
    ],
  },
  {
    title: "Insurance & Costs",
    id: "insurance",
    items: [
      {
        q: "What's the difference between a covered claim and a denied one?",
        a: "Generally, whether the water damage was sudden and accidental (a burst pipe, storm damage) versus gradual or ground-level (a slow leak, monsoon flooding). See our full Insurance Claim page for a complete breakdown by source.",
      },
      {
        q: "Will you work directly with my insurance company?",
        a: "Yes. We document damage thoroughly (photos, moisture readings, detailed scope of work) and communicate directly with your adjuster throughout the process.",
      },
      {
        q: "How much does water damage restoration cost?",
        a: "Cost depends heavily on the water category, square footage affected, and how much material needs replacement versus drying and reuse. See our dedicated restoration-cost guide for realistic ranges by damage type.",
      },
      {
        q: "Do you offer free inspections or estimates?",
        a: "Yes, we provide a free inspection as part of our initial response.",
      },
      {
        q: "What's the current new-customer offer?",
        a: "$50 off your first service call — mentioned throughout the site and confirmed at the time you call.",
      },
    ],
  },
  {
    title: "Service Areas",
    id: "service-areas",
    items: [
      {
        q: "What areas of Arizona do you serve?",
        a: "23 communities across Maricopa, Pima, and Pinal Counties, based out of Wickenburg, AZ. See our full Service Areas page for the complete list by county.",
      },
      {
        q: "Are you based in Phoenix?",
        a: "No — we're based in Wickenburg, AZ, not Phoenix. We deliberately built our coverage around being a genuinely local Arizona team rather than a Phoenix-metro call center.",
      },
      {
        q: "Do you serve rural or remote Arizona properties?",
        a: "Yes — several of our service-area communities (Wittmann, New River, Arizona City, parts of Eloy) are rural, and we plan routing and staffing specifically to maintain our 60-minute response standard there too.",
      },
      {
        q: "How do I know if my city is in your service area?",
        a: "Check our Service Areas page, organized by Maricopa, Pima, and Pinal County — if your city isn't listed, call us directly at (928) 267-9292 and we can confirm.",
      },
    ],
  },
  {
    title: "General Questions",
    id: "general",
    items: [
      {
        q: "Are you IICRC certified?",
        a: "Yes — our technicians hold IICRC Water Damage Restoration Technician (WRT) and Applied Microbial Remediation Technician (AMRT) certifications.",
      },
      {
        q: "Is your company veteran-owned?",
        a: "Yes.",
      },
      {
        q: "Do you handle mold remediation as well as water damage?",
        a: "Yes — mold remediation is one of our core services, since mold risk follows almost directly from any water damage event in Arizona's climate.",
      },
      {
        q: "Can I request service online instead of calling?",
        a: "Yes, use our Contact page to request a free assessment. For active emergencies, calling directly is faster than waiting for a form response.",
      },
      {
        q: "What information should I have ready when I call?",
        a: "Your address, a brief description of what happened and when, and whether the water source has been stopped. If you're not sure it has, mention that too — we can talk you through finding a shutoff valve if needed.",
      },
      {
        q: "Do you work with USAA and other military-affiliated insurance?",
        a: "Yes — given the strong presence of current and former military families across our Arizona service area, we have specific experience with USAA's claims process.",
      },
    ],
  },
];

export default function FAQPage() {
  const allFaqs = SECTIONS.flatMap((s) => s.items.map((i) => ({ question: i.q, answer: i.a })));
  const schema = faqPageSchema(allFaqs);

  return (
    <>
      {schema && (
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      )}
      <Breadcrumbs crumbs={[{ label: "Home", href: "/" }, { label: "FAQ" }]} />
      <PageHero
        eyebrow="Frequently Asked Questions"
        h1="Frequently Asked Questions About Water Damage Restoration"
        lead={`${allFaqs.length} answers covering emergency response, water removal, flood damage, drying, insurance, and our Arizona service area. Still have a question? Call ${SITE.phone}.`}
        badges={["IICRC Certified", "60-Min Response", "All Insurance"]}
        primaryCta={{ label: "Still Have Questions? Contact Us", href: "/contact" }}
        secondaryCta={{ label: `Call ${SITE.phone}`, href: SITE.phoneHref }}
      />

      <section className="content-layout">
        <div className="container">
          <div className="prose">
            <p>
              Below are answers to the questions we hear most from Arizona homeowners and property managers dealing
              with water damage. If you don&apos;t see your question here, every service page also has FAQs specific
              to that topic — or just call us directly at <a href={SITE.phoneHref}>{SITE.phone}</a>.
            </p>

            {/* Jump links — organized, not a link wall */}
            <nav aria-label="FAQ sections" style={{ margin: "24px 0" }}>
              <div className="city-pill-row">
                {SECTIONS.map((s) => (
                  <a key={s.id} href={`#${s.id}`} className="city-pill" style={{ color: "var(--navy)", background: "var(--blue-soft)", borderColor: "transparent" }}>
                    {s.title}
                  </a>
                ))}
              </div>
            </nav>

            {SECTIONS.map((section) => (
              <div key={section.id} id={section.id}>
                <h2>{section.title}</h2>
                <div className="faq-list">
                  {section.items.map((item, i) => (
                    <details className="faq-item" key={i}>
                      <summary>
                        {item.q}
                        <IconChevron className="chev" />
                      </summary>
                      <div className="answer">
                        {item.a}
                        {FAQ_LINKS[item.q] && (
                          <p style={{ margin: "10px 0 0" }}>
                            <Link href={FAQ_LINKS[item.q].href} style={{ color: "var(--blue)", fontWeight: 600 }}>{FAQ_LINKS[item.q].label} →</Link>
                          </p>
                        )}
                      </div>
                    </details>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <aside>
            <div className="sidebar-card">
              <h3>Still Have Questions?</h3>
              <p className="sub">A real Arizona professional answers in under 60 seconds.</p>
              <a href={SITE.phoneHref} className="btn btn-primary btn-block">
                {SITE.phone}
              </a>
              <a href="/contact" className="btn btn-outline-light btn-block" style={{ borderColor: "rgba(255,255,255,0.3)" }}>
                Contact Us
              </a>
            </div>
          </aside>
        </div>
      </section>

      <CTABanner />
    </>
  );
}
