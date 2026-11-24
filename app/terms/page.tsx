import type { Metadata } from "next";
import { socialMeta } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE } from "@/content/site-config";

export const metadata: Metadata = {
  title: "Terms and Conditions | Arizona Water Damage Restoration",
  description:
    "Terms for using the Arizona Water Damage Restoration website and requesting service.",
  alternates: { canonical: "/terms" },
  ...socialMeta("Terms and Conditions | Arizona Water Damage Restoration",
    "Terms for using the Arizona Water Damage Restoration website and requesting service.",
    "/terms"),
};

export default function TermsPage() {
  return (
    <>
      <Breadcrumbs crumbs={[{ label: "Home", href: "/" }, { label: "Terms and Conditions" }]} />
      <section style={{ padding: "56px 0" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <h1 style={{ fontSize: "32px", marginBottom: "24px" }}>Terms and Conditions</h1>
          <div className="prose">
            <h2>Using This Website</h2>
            <p>
              This website provides general information about water damage restoration services in Arizona and lets you
              request service. The information here is general in nature and is not a substitute for an inspection of your
              property.
            </p>
            <h2>Requesting Service</h2>
            <p>
              Submitting the contact form or calling us is a request for service, not a service agreement. The scope of any
              work, the price, and the schedule are agreed with you directly before work begins.
            </p>
            <h2>Emergencies</h2>
            <p>
              If anyone is in danger, or you see sparks, smell gas, or have water near live electrical equipment, leave the
              area and call 911 first. For a water damage emergency that is not an immediate danger, call {SITE.phone}
              instead of waiting for a form response.
            </p>
            <h2>Contact</h2>
            <p>
              {SITE.name}, {SITE.address.full} — {SITE.phone}
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
