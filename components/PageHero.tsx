import Link from "next/link";
import { IconCheck, IconPhone } from "./Icons";
import { SITE } from "@/content/site-config";

export default function PageHero({
  eyebrow,
  h1,
  lead,
  badges,
  primaryCta,
  secondaryCta,
}: {
  eyebrow: string;
  h1: string;
  lead: string;
  badges?: string[];
  /** Defaults to "Call Now — (928) 267-9292" if not overridden. */
  primaryCta?: { label: string; href: string };
  /** Defaults to "Request Service" if not overridden. Pass null to omit. */
  secondaryCta?: { label: string; href: string } | null;
}) {
  const primary = primaryCta ?? { label: `Call Now — ${SITE.phone}`, href: SITE.phoneHref };
  const secondary = secondaryCta === null ? null : secondaryCta ?? { label: "Request Service", href: "/contact" };

  return (
    <section className="page-hero">
      <div className="container">
        <span className="eyebrow">{eyebrow}</span>
        <h1>{h1}</h1>
        <p>{lead}</p>

        <div className="hero-actions" style={{ marginTop: "22px", marginBottom: badges?.length ? "22px" : 0 }}>
          <a href={primary.href} className="btn btn-primary">
            {primary.href.startsWith("tel:") && <IconPhone className="w-4 h-4" />}
            {primary.label}
          </a>
          {secondary && (
            <Link href={secondary.href} className="btn btn-outline-light">
              {secondary.label}
            </Link>
          )}
        </div>

        {badges && badges.length > 0 && (
          <div className="badges">
            {badges.map((b) => (
              <span key={b} className="hero-badge">
                <IconCheck className="w-4 h-4" /> {b}
              </span>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
