# Arizona Water Damage Restoration — Next.js Site

> **Start here.** This section describes the current state of the site. Sections further down are older build notes and may be out of date.

## Current state (latest pass)

**Stack:** Next.js 15.5 (App Router) · React 18 · TypeScript · Tailwind. Fully static except `/api/contact`.
**Canonical domain:** `https://waterdamagerestoration-arizona.com` — set once in `content/site-config.ts` (`SITE.url`); canonical tags, Open Graph, sitemap, robots and JSON-LD all read from it.

### 1. Lead form → email (required before launch)
The form posts to `/api/contact`, which validates on the server and sends the lead by email with [Resend](https://resend.com) (plain `fetch`, no extra package). **If the three variables below are not set, the form shows an error — it never pretends to send.**

| Variable | Example | Notes |
|---|---|---|
| `RESEND_API_KEY` | `re_…` | Resend → API Keys. Server-side only; never `NEXT_PUBLIC_`. |
| `CONTACT_FROM_EMAIL` | `Website Leads <leads@waterdamagerestoration-arizona.com>` | Domain must be verified in Resend (add the DNS records they give you). |
| `CONTACT_TO_EMAIL` | `you@yourdomain.com` | One address or several, comma-separated. |

Add them in Vercel → Project → Settings → Environment Variables (Production **and** Preview), then redeploy. See `.env.example`.

**Protections:** server-side validation of every field (shared with the browser in `lib/contact-validation.ts`) · control-character/CRLF stripping so nothing can inject headers · HTML-escaping in the email · honeypot field · minimum-fill-time check · rate limit (5 per IP per 10 min) · duplicate suppression (double-click safe) · same-origin check (CSRF) · 20 KB body cap · generic error messages (no stack traces, keys or paths).
**Known limit:** the rate limiter and duplicate check are in-memory, i.e. per serverless instance. For stronger limits across all instances, swap them for Upstash Redis. Cloudflare Turnstile is not included.

### 2. Content scripts (`scripts/`)
Run in this order against `content/pages.json`; both are idempotent and print what they changed.
```
node scripts/clean-content.mjs --dry-run     # report only
node scripts/clean-content.mjs               # removes leaked internal SEO/research/business notes, repairs merge damage
node scripts/accuracy-edits.mjs              # unsupported claims, stale counts, list numbering, monsoon page gaps
```
`clean-content.mjs` ends with a leak report; it should say `Remaining internal-content matches: 0`.

### 3. Added in this pass
"Areas We Also Serve" on all 26 service-area pages (`content/nearby.ts` — a build-time check fails the build if any link would 404) · area strip on all 11 service pages · skip link, `<main>` landmark, focus rings, Escape-to-close mobile menu · heading-order fixes · real Privacy/Terms text replacing the drafting placeholders · Next 14 → 15 security upgrade.

### 4. Things only you can verify (not changed)
The copy asserts IICRC certification, veteran-owned, "Licensed & Insured"/"bonded", BBB membership, USAA preferred vendor, a 60-minute response guarantee and appearing in ChatGPT/Gemini/Siri recommendations. None of this can be verified from the code. Confirm each is true, or remove it, before launch. If calls or form leads are passed to another company that performs the work, the Privacy Policy, Terms and the "local team" wording should say so. The Privacy/Terms text is plain-language and factual, **not legal advice**; have an attorney review it.

### 5. Build note
`next/font` downloads Montserrat and Inter from Google at build time (self-hosted afterwards). Vercel and normal machines are fine; fully offline builds will fail.


Next.js 14 (App Router) + TypeScript + Tailwind CSS. Fully statically generated (62 pages), matches the approved content and Premium Professional Red theme (see the Red Theme section below).

### 6. SEO (on-page + technical) — what is in place
- **Titles** are final, unique, ≤60 characters, and no longer get the brand name appended a second time. **Descriptions** are unique and 70–160 characters. One H1 per page, in order.
- **Canonical** = sitemap URL on every page (homepage included), all on `https://waterdamagerestoration-arizona.com`. Trailing-slash URLs 308 to the clean URL; unknown URLs return a real 404 (noindex).
- **Sitemap** lists all 54 pages with no fake `lastmod`; `robots.txt` blocks only `/api/` and points to the sitemap.
- **Social sharing:** full Open Graph + Twitter tags on every page, with a generated brand card (`/opengraph-image`). It is text-only; swap in a real photo-based card when you have one.
- **Structured data:** Organization + WebSite on every page; LocalBusiness on the home page; one `Service` per service/area page that points at the same business entity; Article on blog posts; FAQPage wherever FAQs are shown (a check confirms each question is visible on the page); BreadcrumbList on inner pages. No ratings or reviews are marked up.
- **Internal links:** no orphan pages; every blog post is linked from the service/area pages it relates to; every service links to its areas and every area links to its services and to nearby areas.
- Run `node scripts/seo-edits.mjs` after the other two content scripts if you re-import content.

**You still need to do (cannot be done from code):** add the property to Google Search Console and submit `/sitemap.xml`; claim/verify a Google Business Profile with the same name, address and phone as the footer; add real publish dates to the blog posts if you want Article rich results (they were not invented); add a real `www`→apex (or reverse) redirect in Vercel so only one host is indexable.

- **`/llms.txt`** (`app/llms.txt/route.ts`): a curated, auto-generated map of the site for AI assistants — business details, services, service areas, guides. It is a proposed convention (llmstxt.org), not a ranking factor, and uses neutral descriptions with no marketing claims. It rebuilds from the content files, so it never goes stale.

### 7. Content scripts and QA tools (all idempotent)
```
node scripts/clean-content.mjs      # removes leaked internal notes / competitor names / payout figures
node scripts/accuracy-edits.mjs     # unsupported claims, stale counts, list numbering
node scripts/seo-edits.mjs          # titles, descriptions, headings, FAQ schema, related links, ZIP lines, definitions
node scripts/expand-content.mjs     # inserts the long-form sections in content/expansions/*.json
```
`scripts/qa/` holds the audit tooling used for `SEO_AUDIT_REPORT.md` (build a test copy with `mkbc.sh`, crawl + browser audit with `run-audit.sh`, responsive/menu/keyboard/form tests with `run-regress.sh`, then `node scripts/qa/report.mjs`). The full 34-part audit is in **SEO_AUDIT_REPORT.md**.


## Getting started

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Build for production

```bash
npm run build
npm run start
```

`npm run build` statically generates all 57 pages (homepage, 11 services, 23 city pages, 3 county hubs, 8 blog posts, about/contact/legal). Deploy the output directly to Vercel — zero config needed, `next.config.js` is already set up.

## Content

All page copy lives in `content/pages.json`, generated from the approved source markdown. Site-wide data (NAP, service list, city/county list) lives in `content/site-config.ts` — **update the phone number and address there if they ever change**, and it propagates everywhere (schema, footer, header, every page).

## Red Theme — Premium Professional (full re-theme applied)

The site was originally built in a navy/blue/orange scheme. A follow-up brief confirmed a red-based theme was the intended direction and specified exact hex values, which have been applied site-wide:

| Token | Value | Used for |
|---|---|---|
| Primary Red | `#C62828` | Primary CTAs, links, icon accents, active nav states |
| Dark Red | `#8E1B1B` | Emergency/CTA section backgrounds, button hover state |
| Accent Red | `#E53935` | (reserved for future hover/highlight variations) |
| Light Red | `#FFEBEE` | Badge and callout backgrounds |
| Dark | `#111111` | Headings, dark section backgrounds (hero, footer, process section) |
| Light Background | `#F8F9FA` | Page background |
| Body Text | `#333333` | Main copy |
| Muted Text | `#666666` | Secondary copy |
| Border | `#E5E5E5` | Card and input borders |

**Typography**: Montserrat (headings, replacing Poppins/Manrope) + Inter (body, unchanged), both loaded via `next/font/google` — no change to the font-loading performance approach.

**How this was implemented safely**: the entire design system was already built on CSS custom properties (`app/globals.css`) rather than scattered hardcoded hex values, so the re-theme was a token-value swap, not a rewrite — the same variable names (`--navy`, `--blue`, `--orange`, etc.) now hold red-theme values, meaning every component using `var(--navy)` picked up the new palette automatically with zero changes to `.tsx` files. Only a few hardcoded `rgba()` shadow/glow values (30 total, none tied to content or logic) needed direct updates, plus the two auto-generated favicon files and one stray footer text color that bypassed the variable system.

**One deliberate deviation from the brief**: trust-indicator checkmarks (✓) were left green rather than recolored red. A red checkmark conventionally reads as an error/failure state, not a positive one — keeping green preserves the intended "this is good/verified" meaning. Say the word if you'd rather have these red or a different color for brand consistency.

**Verified after the re-theme** (not just changed and assumed correct):
- Full production build succeeds, still 62 pages, still 100% static
- Zero TypeScript errors
- Screenshotted homepage, service page, city page, FAQ page, and About page hero/CTA/card sections to confirm the red palette renders correctly with proper contrast and no leftover blue/orange
- Confirmed no remaining hardcoded references to the old navy/blue/orange hex values anywhere in the codebase (`grep` across all `.tsx`/`.ts`/`.js` files)



1. **Contact form backend** — `app/api/contact/route.ts` is a stub. Wire it to your actual lead destination (Ringba webhook, CRM, or email service).
2. **Privacy Policy / Terms** (`app/privacy-policy`, `app/terms`) — placeholder structure only, marked `[LEGAL REVIEW REQUIRED]`. Need an actual Arizona attorney.
3. **Fabricated testimonials** — the Maricopa/Pima county hub page content (in `content/pages.json`) still contains reviews that were never real. Flagged repeatedly through this build process; not yet removed.
4. **Mailbox suite number** — NAP address is missing a suite/box number; confirm against your actual mailbox agreement and update `content/site-config.ts`.
5. **Google Fonts require live internet access at build time** (`next/font/google` fetches Poppins/Manrope/Inter during `npm run build`). Works fine on your machine and on Vercel — just won't work in a fully offline/air-gapped build environment.
6. **OG/social share image** — no `opengraph-image` is set anywhere on the site, since that would require real photography or a designed graphic I don't have. Add one to `app/opengraph-image.png` (Next.js auto-picks it up) once you have real business photos or a branded share card.
7. **www vs non-www domain choice** — pick one as canonical in your DNS/Vercel domain settings; the app assumes `waterdamagerestoration-arizona.com` (no www) per `content/site-config.ts`. This is a hosting-level setting I can't configure from the codebase.
8. **CSP tightening if user-generated content is ever added** — see the comment block in `next.config.js` above `ContentSecurityPolicy`. Currently `script-src` includes `'unsafe-inline'` to allow this site's own JSON-LD schema without forcing every page into dynamic (non-static) rendering. Safe today because no user input is ever reflected back into a page; revisit with a build-time SHA-256 hash allowlist if that changes.
9. **Real business photography** — a set of enhancement instructions asked for real photos (technicians, equipment, job sites) on every important page. I don't have access to actual photos of this business, and generating AI images styled to look like genuine job-site photography would misrepresent a business that hasn't verified that imagery is real — that's a materially different problem than the illustrative SVG icons already used throughout the site, which never claim to be photographs. Source real photos, or explicitly approve stock photography (with proper licensing) as a stand-in, and I can wire them in with correct alt text, responsive sizing, and lazy loading.
10. ~~Logo/favicon color correction applied without asking~~ — **resolved**: the red theme was confirmed intentional in a follow-up brief with exact hex values. The site has since been fully re-themed to Premium Professional Red (`#C62828` primary / `#8E1B1B` dark red / `#E53935` accent) — see the Red Theme section below.

## Security, performance, and responsive audit (verified against a live server, not just code review)

- **Security headers were completely missing before this pass.** Implemented in `next.config.js`: `Strict-Transport-Security`, `X-Content-Type-Options`, `X-Frame-Options`, `Referrer-Policy`, `Permissions-Policy`, `Content-Security-Policy`. Verified two ways: (1) present in `.next/routes-manifest.json` after build, (2) present on actual HTTP responses from a running `next start` server, checked with `curl -D -` on multiple route types.
- **CSP initially broke the site's own schema markup and, later, the Contact page map** — both caught and fixed in this same pass, not shipped broken. First version blocked all inline JSON-LD `<script>` blocks (confirmed via Playwright console errors); fixed with a documented `'unsafe-inline'` tradeoff on `script-src` rather than nonces, which would force every page into dynamic rendering and undo the site's static-generation architecture. Second: the Google Maps embed had no `frame-src` allowlisted, so CSP fell back to `default-src 'self'` and silently blocked it — fixed by explicitly allowing `maps.google.com`/`www.google.com` in `frame-src`, then verified the header is actually served (not just configured) via `curl`.
- **Basic form spam protection was missing.** Added a honeypot field to `ContactForm.tsx` + server-side check in `app/api/contact/route.ts` — no external CAPTCHA service or API key required.
- **Canonical/sitemap/trailing-slash consistency** — verified live: canonical tag, sitemap `<loc>`, and internal `<Link>` hrefs all use the same no-trailing-slash URL form; the trailing-slash variant of a URL correctly 308-redirects to the canonical form.
- **Responsive/mobile — real bug found and fixed.** Tested all 6 required breakpoints (1920/1440/1024/768/480/375px) with Playwright: zero horizontal overflow, but the 768px tablet header was crowded (phone number + Call button + hamburger all visible at once). Fixed by hiding the spelled-out number at the hamburger breakpoint instead of a much narrower one.
- **Mobile menu functionally tested**, not just visually inspected: hamburger opens, submenus expand, tel: link is correct, and clicking a nav link actually navigates and closes the menu.
- **Image audit: zero raster images exist on this site.** Every visual is inline SVG or CSS. Confirmed by grepping the entire codebase for `<img`, `next/image`, and image file extensions.
- **No exposed secrets** — grepped the full codebase for API keys, tokens, passwords; none found.

## This pass — enhancement, SEO, internal linking, hero CTAs, branding (verified, not just implemented)

- **Contact page map added** using the real verified address (340 W Wickenburg Way, Wickenburg, AZ 85390) — no address was invented. Google Maps embed requires no API key. The iframe returns blank in this development sandbox specifically because `maps.google.com` isn't on this sandbox's outbound network allowlist (confirmed via direct `curl`, which returned an explicit `x-deny-reason: host_not_allowed` from the sandbox's own egress proxy) — this is a sandbox limitation, not a code bug, and the embed will render normally once deployed with real internet access.
- **Homepage: added Quick Links section** (organized by Services / Areas We Serve / Resources / Company, not a link wall) and **a Homepage FAQ section** (5 curated questions + link to the full FAQ page). The homepage's existing Trust Bar, Services grid, Process section, and Areas-Served split card already satisfied the "Why Choose Us," "Emergency Response," "Our Process," and "Areas We Serve" requirements from the enhancement brief — not duplicated to avoid redundant sections per the brief's own instruction.
- **Dedicated FAQ page created** at `/faq` — 36 questions (exceeds the 30+ requirement) organized under the exact required H2 structure (Emergency Water Damage, Water Removal, Water Damage Restoration, Flood Damage, Drying & Dehumidification, Insurance & Costs, Service Areas, General Questions), with jump-link navigation and `FAQPage` schema. Cross-checked against all 200+ existing service/city/blog FAQs for exact-duplicate questions: found 2, rephrased both to be complementary rather than duplicated, re-verified clean.
- **Contact page FAQ added** (5 questions specific to the contact/lead process, not duplicating the dedicated FAQ page) with `ContactPage` + `FAQPage` schema.
- **About page: added "Our Values" section** — 6 values (Fast Response, Transparency, Certified Expertise, Reliability, Customer Care, Safety), each linking naturally to a relevant service page. No claims beyond what's already established elsewhere on the site (certifications, response time, veteran-owned status) — nothing new invented.
- **Site-wide hero CTA gap found and fixed** — `PageHero`, the shared component used by roughly 40 pages (every service, every city/county, every blog post, About, FAQ, and all three index pages), had trust badges but **no CTA button at all**. This was a genuine, previously-unnoticed gap affecting nearly the whole site. Fixed once in the shared component (fixing all ~40 pages simultaneously), then added page-type-specific CTA wording per the brief's explicit examples: services get "Request [Service Name] Help," city pages get "Get Water Damage Help in [City]," blog posts get "Need Water Damage Help? Contact Us." A string-formatting bug in the first version of this (producing garbled labels like "Request Flood Cleanup in Help") was caught via screenshot review and fixed before delivery, then re-verified against all 11 real service H1s and a sample of city H1s to confirm every generated label reads correctly.
- **Logo + favicon created** using Premium Professional Red (`#C62828` / `#8E1B1B`) — initially built in the site's older navy/blue/orange scheme, corrected once the red theme was confirmed intentional (see the Red Theme section below).
- **A second real bug caught and fixed in this same pass**: several new FAQ accordions rendered with a giant, unconstrained chevron icon instead of a small collapsed arrow, because an invalid Tailwind class (`w-4.5`, not part of the default spacing scale) silently generated no CSS. Fixed by giving the `.chev` class an explicit pixel size in `globals.css` rather than relying on a utility class that happened not to exist — this also makes the fix resistant to the same mistake happening again elsewhere.
## Technical SEO implemented this pass (verified in the actual compiled build output, not just described)

- **`app/sitemap.ts`** — dynamic XML sitemap, auto-generated from the same content registry every page uses. Verified: 53 URLs in the compiled output, matching every real indexable page exactly.
- **`app/robots.ts`** — allows all crawlers, disallows `/api/`, points to the sitemap. Verified in compiled output.
- **`app/not-found.tsx`** — custom 404 page with a clear message, phone CTA, homepage link, top services, and links to service-areas/blog/contact. Verified rendered in the actual build.
- **`FAQPage` schema** — every page with an FAQ section now emits real `FAQPage` JSON-LD (200 Q&A pairs extracted site-wide), not just the visible accordion. Verified present in compiled HTML.
- **Site-wide `Organization` + `WebSite` schema** — added to the root layout (previously only per-page `LocalBusiness`/`Service`/`Article` schema existed). Verified present in compiled HTML.
- **Internal-linking gaps closed directly in the content pipeline** (`gen/export_json.py`), not just flagged:
  - 3 blog posts that had zero contextual links → each now links to 2–3 relevant service/location pages.
  - All 23 city pages → now link to their correct county hub (previously zero did).
  - Maricopa and Pima county hub pages → now link down to every city in that county (previously zero links each; Pinal already had partial coverage).
  - All 11 service pages → now link to Wickenburg (primary city) and the Maricopa County hub, closing the "service → relevant service area" gap.
  - Verified: **zero pages in the entire 45-page content set have empty related-links after the fix** (was 21 pages with zero or under-linked before).
- **Homepage service-area pills** — were rendered as inert `<span>` elements (not actually clickable). Now real `<Link>` components. Verified: 26 working links (23 cities + 3 county hubs) in the compiled homepage HTML.
- **Full site-wide broken-link crawl** run against the actual compiled build output (not the source), covering every internal `href` on every page: **0 broken links found** across all 53 unique internal hrefs.
- Canonical tags, per-page meta titles/descriptions, breadcrumbs (with `BreadcrumbList` schema) were already implemented in the prior version and were reverified as part of this pass — no gaps found there.


## Images and hero backgrounds (this pass)

**No fabricated "photorealistic" stock images were added** — that constraint held throughout this project, restated again in this pass. Instead:

- **Every page hero** (homepage + all ~40 pages using the shared `PageHero`/`.hero` component) now has a subtle background treatment: a dark overlay plus a faint concentric water-ripple motif and diagonal texture, built entirely from layered CSS gradients — a real, deliberate visual (not a placeholder), just not a photograph. Verified across all 6 required breakpoints with zero horizontal overflow introduced.
- **Homepage and Services-index service cards** now each show a distinct illustrated image panel — 11 genuinely different hand-picked SVG icons (siren/clock for Emergency, cloud+rain for Monsoon, water drop for Flood Cleanup, etc.) on a red/dark gradient banner with decorative ring accents, replacing the single repeated generic droplet icon every card used before. Verified visually; each card in the grid is now actually distinguishable from its neighbors.
- **New "Services We Serve in [Area]" section added to every one of the 23 city pages and 3 county hub pages** — lists and links all 11 real services, using the same illustrated card component. Fully data-driven from `content/site-config.ts`, so it can't drift out of sync with the real service list.
- **Found and fixed a real bug while touching this code**: the hero gradient still had a stale hardcoded navy-blue hex (`#0E2A46`) left over from before the red-theme conversion — missed in that earlier pass, caught and fixed in this one.

**Icon-to-service matching is approximate in a couple of spots** (e.g., Water Removal uses a general "pulse/signal" icon rather than a literal pump shape) — each icon is still genuinely distinct from every other service's icon, which was the actual requirement, but if closer literal accuracy matters, flag which ones and I'll swap the icon mapping in `components/ServiceCardImage.tsx`.

**Verified for this pass:**
- Full build succeeds, 62 pages, still 100% static (0 dynamic routes)
- Zero TypeScript errors
- Zero orphan pages, zero broken internal links (re-checked after adding the new section to 26 pages)
- Zero horizontal overflow and zero console errors at all 6 required breakpoints#   a r i z o n a - w a t e r - d a m a g e  
 