import Link from "next/link";
import { COUNTIES } from "@/content/site-config";
import { IconArrow } from "./Icons";

// Shown on every service page: ties each service to the places it is available.
export default function ServiceAreasStrip({ serviceName }: { serviceName: string }) {
  return (
    <section aria-labelledby="service-areas-strip-heading" style={{ background: "var(--card)" }}>
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Where We Work</span>
            <h2 id="service-areas-strip-heading">Where We Provide {serviceName}</h2>
          </div>
          <p className="sub">Choose your county to see the communities we serve and local details.</p>
        </div>
        <ul className="areas-grid">
          {COUNTIES.map((c) => {
            const shown = c.cities.slice(0, 4).map((x) => x.name.replace(" — Primary HQ", "")).join(", ");
            const more = c.cities.length - 4;
            return (
              <li key={c.hubSlug}>
                <Link href={`/service-areas/${c.hubSlug}`} className="area-card">
                  <span>
                    <span className="name">{c.name}</span>
                    <span className="sub">{shown}{more > 0 ? ` and ${more} more` : ""}</span>
                  </span>
                  <IconArrow />
                </Link>
              </li>
            );
          })}
        </ul>
        <div className="areas-more">
          <Link href="/service-areas/water-damage-wickenburg-az">Our home base: Wickenburg →</Link>
          <Link href="/service-areas">All {COUNTIES.reduce((n, c) => n + c.cities.length, 0)} service areas →</Link>
          <Link href="/contact">Request service →</Link>
        </div>
      </div>
    </section>
  );
}
