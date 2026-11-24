import Link from "next/link";
import { SITE } from "@/content/site-config";
import { IconPhone } from "./Icons";

export default function CTABanner() {
  return (
    <section className="cta-banner" style={{ padding: 0 }}>
      <div className="container">
        <div className="msg">
          <div className="msg-icon"><IconPhone /></div>
          <div>
            <h3>Water Damage Emergency Right Now?</h3>
            <p>Our Arizona team is standing by 24/7 — a real person answers in under 60 seconds.</p>
          </div>
        </div>
        <div className="actions">
          <a href={SITE.phoneHref} className="btn btn-secondary">{SITE.phone}</a>
          <Link href="/contact" className="btn btn-outline-light">Request Service</Link>
        </div>
      </div>
    </section>
  );
}
