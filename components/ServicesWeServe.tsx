import Link from "next/link";
import ServiceCardImage from "./ServiceCardImage";
import { SERVICES } from "@/content/site-config";
import { IconArrow } from "./Icons";

export default function ServicesWeServe({ areaName }: { areaName: string }) {
  return (
    <section style={{ background: "var(--bg)" }}>
      <div className="container">
        <div className="section-head">
          <div>
            <span className="eyebrow">Services Available Here</span>
            <h2>Services We Serve in {areaName}</h2>
          </div>
          <p className="sub">All 11 water damage restoration services, available at the same 60-minute response standard in {areaName}.</p>
        </div>
        <div className="services-grid">
          {SERVICES.map((s, i) => (
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
      </div>
    </section>
  );
}
