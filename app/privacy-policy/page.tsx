import type { Metadata } from "next";
import { socialMeta } from "@/lib/seo";
import Breadcrumbs from "@/components/Breadcrumbs";
import { SITE } from "@/content/site-config";

export const metadata: Metadata = {
  title: "Privacy Policy | Arizona Water Damage Restoration",
  description:
    "How Arizona Water Damage Restoration collects and uses information from our contact form and phone calls.",
  alternates: { canonical: "/privacy-policy" },
  ...socialMeta("Privacy Policy | Arizona Water Damage Restoration",
    "How Arizona Water Damage Restoration collects and uses information from our contact form and phone calls.",
    "/privacy-policy"),
};

export default function PrivacyPolicyPage() {
  return (
    <>
      <Breadcrumbs crumbs={[{ label: "Home", href: "/" }, { label: "Privacy Policy" }]} />
      <section style={{ padding: "56px 0" }}>
        <div className="container" style={{ maxWidth: "820px" }}>
          <h1 style={{ fontSize: "32px", marginBottom: "24px" }}>Privacy Policy</h1>
          <div className="prose">
            <p>
              This page explains, in plain language, what information we collect when you use this website or call
              the number listed on it, and how we use it.
            </p>
            <h2>Information We Collect</h2>
            <p>
              <strong>Contact form.</strong> When you request service, we collect the details you enter: your name, phone
              number, city or ZIP code, the type of damage, how urgent it is, and any message you write. Your email address
              is optional. We also receive the IP address the request came from and the page you sent it from.
            </p>
            <p>
              <strong>Phone calls.</strong> Calls to the number on this site may be handled by a third-party call-routing
              service. That service may log details such as the time and length of the call and the calling number, and may
              record the call.
            </p>
            <p>
              This website does not use advertising cookies.
            </p>
            <h2>How We Use Information</h2>
            <p>
              We use what you send us to respond to your request, arrange an assessment or emergency response, follow up
              with you, and coordinate with your insurance company if you ask us to. We may also use it to keep this
              website secure and to prevent spam and misuse.
            </p>
            <h2>Who Receives It</h2>
            <p>
              Form submissions are delivered to us by email through a third-party email delivery provider. We may share
              your information with the restoration professionals and service providers who help respond to your request,
              with the providers that help us operate this website (such as email delivery and call routing), and where the
              law requires it.
            </p>
            <h2>Questions About Your Information</h2>
            <p>
              To ask a question about your information or to request that we update or remove it, contact us using the
              details below.
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
