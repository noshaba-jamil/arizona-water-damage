import { SITE, COUNTIES } from "@/content/site-config";
import { getPagesByCategory } from "@/lib/content";

// /llms.txt — a short, curated map of the site for AI assistants (the llmstxt.org convention).
// It is a proposed convention, not a ranking factor, and it is built from the same content as the sitemap,
// so it cannot drift out of date. Only facts that already appear on the site are stated here.
export const dynamic = "force-static";

// Neutral one-line descriptions (deliberately NOT the SEO meta descriptions, which contain marketing claims).
const NOTE: Record<string, string> = {
  "emergency-water-damage-arizona": "what counts as an emergency, the three water categories, and what happens during a response",
  "monsoon-flood-damage-arizona": "flash flooding, roof leaks and storm water damage during Arizona's monsoon season",
  "mold-remediation-arizona": "containment, removal and moisture control after mold growth",
  "flood-cleanup-arizona": "cleanup after floodwater from outside enters a building",
  "sewage-backup-cleanup-arizona": "safe cleanup of sewage and wastewater backups",
  "commercial-water-damage-arizona": "water damage in offices, stores and warehouses, planned around downtime",
  "burst-pipe-water-damage-arizona": "why pipes fail, first steps to take, and drying afterwards",
  "water-damage-insurance-claim-arizona": "how water damage claims work and what to document",
  "ceiling-water-damage-arizona": "finding the source and repairing water-damaged ceilings",
  "water-removal-arizona": "extracting standing water and deciding what stays and what goes",
  "structural-drying-dehumidification-arizona": "how a building is dried and how drying is measured",
};
const short = (h1: string) => h1.split(" — ")[0].replace(/\s+/g, " ").trim();
const link = (name: string, path: string, note?: string) => `- [${name}](${SITE.url}${path})${note ? `: ${note}` : ""}`;

export function GET() {
  const services = getPagesByCategory("services");
  const posts = getPagesByCategory("blog");
  const lines: string[] = [
    `# ${SITE.name}`,
    "",
    `> Water damage restoration for homes and businesses in ${COUNTIES.reduce((n, c) => n + c.cities.length, 0)} Arizona communities across ${COUNTIES.map((c) => c.name).join(", ").replace(/, ([^,]*)$/, " and $1")}, based in ${SITE.address.city}, Arizona. Services cover emergency water removal, structural drying, flood and monsoon damage, sewage backup, mold remediation, and help with insurance claims.`,
    "",
    "## Business details",
    `- Name: ${SITE.name}`,
    `- Address: ${SITE.address.street}, ${SITE.address.city}, ${SITE.address.state} ${SITE.address.zip}`,
    `- Phone: ${SITE.phone}`,
    `- Email: ${SITE.email}`,
    `- Website: ${SITE.url}`,
    "",
    "## Main pages",
    link("Home", ""),
    link("About", "/about", "who we are and how we work"),
    link("Contact", "/contact", "request service online or call"),
    link("FAQ", "/faq", "answers to common water damage questions"),
    link("All services", "/services", "overview of the eleven services"),
    link("All service areas", "/service-areas", "the communities and counties we serve"),
    link("Blog", "/blog", "guides on monsoon damage, costs, insurance and mold"),
    "",
    "## Services",
    ...services.map((p) => link(short(p.h1), p.url, NOTE[p.slug])),
    "",
    "## Service areas",
    ...COUNTIES.flatMap((c) => [
      "",
      `### ${c.name}`,
      link(`${c.name} overview`, `/service-areas/${c.hubSlug}`),
      ...c.cities.map((city) => link(city.name.replace(" — Primary HQ", ""), `/service-areas/${city.slug}`)),
    ]),
    "",
    "## Guides",
    ...posts.map((p) => link(short(p.h1), p.url)),
    "",
    "## Policies",
    link("Privacy Policy", "/privacy-policy"),
    link("Terms and Conditions", "/terms"),
    "",
  ];
  return new Response(lines.join("\n").replace(/\n{3,}/g, "\n\n"), {
    headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" },
  });
}
