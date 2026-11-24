/** @type {import('next').NextConfig} */

// CSP note: script-src includes 'unsafe-inline' specifically to allow this
// site's own build-time-generated JSON-LD structured data (Organization,
// WebSite, LocalBusiness, Service, Article, FAQPage, BreadcrumbList — 6
// files, all server components). The stricter alternative is a nonce or
// per-script SHA-256 hash, but both require the CSP header to be computed
// per-request (via middleware + next/headers), which forces every page
// that reads it into dynamic (SSR) rendering — trading away the full static
// generation this site was deliberately built and verified for, on a
// rank-and-rent site where Core Web Vitals directly affects both rankings
// and conversion. Given the site has zero user-generated content reflected
// back into any page (the contact form never echoes input into HTML), the
// realistic XSS surface 'unsafe-inline' opens here is low. If that changes
// (e.g. a future feature renders user input), revisit this — a hash-based
// script-src computed at build time is the correct next step, not nonces
// (which still force dynamic rendering).
//
// frame-src explicitly allows the Google Maps embed on the Contact page
// (the "Find Us" section, added for the verified business address). CSP
// falls back to default-src when frame-src is unset, which would silently
// block the map — this bit us once already; verified working after adding
// the explicit allowlist below.
const ContentSecurityPolicy = `
  default-src 'self';
  script-src 'self' 'unsafe-inline';
  style-src 'self' 'unsafe-inline';
  img-src 'self' data:;
  font-src 'self';
  connect-src 'self';
  frame-src https://www.google.com https://maps.google.com;
  frame-ancestors 'none';
  base-uri 'self';
  form-action 'self';
`.replace(/\s{2,}/g, " ").trim();

const securityHeaders = [
  // Forces HTTPS for a year, including subdomains. Vercel serves HTTPS by
  // default on custom domains, so this is defense-in-depth, not a
  // workaround for a missing certificate.
  { key: "Strict-Transport-Security", value: "max-age=31536000; includeSubDomains; preload" },
  { key: "X-Content-Type-Options", value: "nosniff" },
  // Legacy fallback for browsers/crawlers that don't respect CSP
  // frame-ancestors — belt-and-suspenders against clickjacking.
  { key: "X-Frame-Options", value: "DENY" },
  { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
  // Disables browser features this site has no use for. Add back
  // selectively (e.g. geolocation) only if a real feature needs it.
  { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=(), interest-cohort=()" },
  { key: "Content-Security-Policy", value: ContentSecurityPolicy },
];

const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ["image/avif", "image/webp"],
  },
  compress: true,
  trailingSlash: false, // explicit, matches the no-trailing-slash canonical URLs used site-wide
  productionBrowserSourceMaps: false, // don't ship readable source maps publicly
  poweredByHeader: false,             // don't advertise the framework in responses
  async headers() {
    return [
      {
        source: "/:path*",
        headers: securityHeaders,
      },
    ];
  },
};

module.exports = nextConfig;
