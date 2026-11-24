import Link from "next/link";
import { SITE } from "@/content/site-config";
import { IconPhone } from "./Icons";

export type RelatedLink = { label: string; href: string };

export default function Sidebar({
  facts,
  related,
  secondaryCta,
}: {
  facts?: { k: string; v: string }[];
  related?: RelatedLink[];
  /** Defaults to "Request Service" → /contact. Override on the Contact
      page itself, where linking to /contact again is redundant. */
  secondaryCta?: { label: string; href: string };
}) {
  const defaultFacts = [
    { k: "Response Time", v: "60 Minutes" },
    { k: "Availability", v: "24/7/365" },
    { k: "Certification", v: "IICRC WRT/AMRT" },
    { k: "Address", v: "Wickenburg, AZ" },
  ];
  const f = facts ?? defaultFacts;
  const secondary = secondaryCta ?? { label: "Request Service", href: "/contact" };

  return (
    <aside>
      <div className="sidebar-card">
        <h3>Water Damage Emergency?</h3>
        <p className="sub">A real Arizona professional answers in under 60 seconds.</p>
        <a href={SITE.phoneHref} className="btn btn-primary btn-block">
          <IconPhone className="w-4 h-4" /> {SITE.phone}
        </a>
        <Link href={secondary.href} className="btn btn-outline-light btn-block" style={{ borderColor: "rgba(255,255,255,0.3)" }}>
          {secondary.label}
        </Link>
        <div className="sidebar-facts">
          {f.map((row) => (
            <div className="row" key={row.k}>
              <span className="k">{row.k}</span>
              <span className="v">{row.v}</span>
            </div>
          ))}
        </div>
      </div>

      {related && related.length > 0 && (
        <div className="related-links-card">
          <h3>Related Pages</h3>
          <ul>
            {related.map((r) => (
              <li key={r.href}><Link href={r.href}>{r.label}</Link></li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
