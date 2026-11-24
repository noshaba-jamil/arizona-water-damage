import Link from "next/link";
import { AREA_INDEX, NEARBY } from "@/content/nearby";
import { IconArrow } from "./Icons";

export default function AreasWeAlsoServe({ currentSlug, areaName }: { currentSlug: string; areaName: string }) {
  const here = AREA_INDEX[currentSlug];
  const nearby = (NEARBY[currentSlug] ?? []).map((s) => AREA_INDEX[s]).filter(Boolean);
  if (!here || nearby.length === 0) return null;

  return (
    <section aria-labelledby="areas-also-heading" style={{ background: "var(--card)" }}>
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Nearby</span>
            <h2 id="areas-also-heading">Areas We Also Serve</h2>
          </div>
          <p className="sub">
            {here.isHub
              ? `Beyond ${areaName}, we also serve communities in these counties.`
              : `Not in ${areaName}? We also provide water damage restoration in these nearby communities.`}
          </p>
        </div>
        <ul className="areas-grid">
          {nearby.map((a) => (
            <li key={a.slug}>
              <Link href={`/service-areas/${a.slug}`} className="area-card">
                <span>
                  <span className="name">Water Damage Restoration in {a.name}</span>
                  <span className="sub">{a.isHub ? `${a.communityCount} communities` : a.county}</span>
                </span>
                <IconArrow />
              </Link>
            </li>
          ))}
        </ul>
        <div className="areas-more">
          {!here.isHub && <Link href={`/service-areas/${here.countyHubSlug}`}>All {here.county} communities →</Link>}
          <Link href="/service-areas">View all service areas →</Link>
          <Link href="/contact">Request service →</Link>
        </div>
      </div>
    </section>
  );
}
