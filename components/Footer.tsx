import Link from "next/link";
import { SITE, SERVICES } from "@/content/site-config";
import { IconDrop, IconPhone, IconMail, IconPin } from "./Icons";

export default function Footer() {
  return (
    <footer className="site-footer">
      <div className="container">
        <div className="footer-top">
          <div className="footer-brand">
            <div className="brand">
              <div className="brand-mark"><IconDrop /></div>
              <div className="brand-text">
                <div className="name">Arizona Water Damage</div>
                <div className="tagline" style={{ color: "#999999" }}>{SITE.tagline}</div>
              </div>
            </div>
            <p>IICRC-certified, veteran-owned water damage restoration serving 23 Arizona communities across Maricopa, Pima &amp; Pinal Counties, 24/7/365.</p>
            <div className="footer-contact-line"><IconPhone /><a href={SITE.phoneHref}>{SITE.phone}</a></div>
            <div className="footer-contact-line"><IconMail /><a href={`mailto:${SITE.email}`}>{SITE.email}</a></div>
            <div className="footer-contact-line"><IconPin /><span>{SITE.address.full}</span></div>
          </div>

          <div className="footer-col">
            <h2 className="footer-heading">Services</h2>
            <ul>
              {SERVICES.slice(2, 7).map((s) => (
                <li key={s.slug}><Link href={`/services/${s.slug}`}>{s.name.replace(" Arizona", "")}</Link></li>
              ))}
            </ul>
          </div>

          <div className="footer-col">
            <h2 className="footer-heading">Service Areas</h2>
            <ul>
              <li><Link href="/service-areas/water-damage-wickenburg-az">Wickenburg</Link></li>
              <li><Link href="/service-areas/water-damage-maricopa-county-az">Maricopa County</Link></li>
              <li><Link href="/service-areas/water-damage-pima-county-az">Pima County</Link></li>
              <li><Link href="/service-areas/water-damage-pinal-county-az">Pinal County</Link></li>
              <li><Link href="/service-areas">All 23 Cities</Link></li>
            </ul>
          </div>

          <div className="footer-col">
            <h2 className="footer-heading">Company</h2>
            <ul>
              <li><Link href="/about">About Us</Link></li>
              <li><Link href="/blog">Blog</Link></li>
              <li><Link href="/faq">FAQ</Link></li>
              <li><Link href="/contact">Contact</Link></li>
              <li><Link href="/services/water-damage-insurance-claim-arizona">Insurance Help</Link></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Arizona Water Damage Restoration. All Rights Reserved.</span>
          <div className="legal-links">
            <Link href="/privacy-policy">Privacy Policy</Link>
            <Link href="/terms">Terms &amp; Conditions</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
