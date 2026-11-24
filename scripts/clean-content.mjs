#!/usr/bin/env node
/**
 * scripts/clean-content.mjs
 *
 * Removes internal SEO/research/business-plan content that leaked into the
 * public page copy in content/pages.json, repairs the template-merge damage
 * around it, and rebuilds the fields derived from it (hero lead, FAQ schema).
 *
 * Usage (from the project root):
 *   node scripts/clean-content.mjs --dry-run     # report only, writes nothing
 *   node scripts/clean-content.mjs               # writes a backup, then cleans
 *   node scripts/clean-content.mjs path/to/pages.json
 *
 * Safe to run more than once: every rule is a no-op when its target is gone.
 * Order matters (page-specific fixes run before the global sweeps).
 */
import fs from 'node:fs';

const args = process.argv.slice(2);
const DRY = args.includes('--dry-run');
const FILE = args.find((a) => !a.startsWith('--')) ?? 'content/pages.json';

if (!fs.existsSync(FILE)) {
  console.error(`Cannot find ${FILE}. Run this from the project root, or pass the path.`);
  process.exit(1);
}
const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const bySlug = Object.fromEntries(data.map((p) => [p.slug, p]));

const stats = new Map();
const bump = (k, n = 1) => { if (n) stats.set(k, (stats.get(k) ?? 0) + n); };
const removedSentences = [];

/* ---------------- helpers ---------------- */
const exact = (name, text, oldStr, newStr) => {
  const parts = text.split(oldStr);
  bump(name, parts.length - 1);
  return parts.join(newStr);
};
const rx = (name, text, pattern, replacement) => {
  let n = 0;
  const out = text.replace(pattern, (...m) => {
    n++;
    return typeof replacement === 'function' ? replacement(...m) : replacement;
  });
  bump(name, n);
  return out;
};
// apply fn to a page's body and to every FAQ question/answer
const mapPage = (page, fn) => {
  page.bodyHtml = fn(page.bodyHtml);
  for (const f of page.faqs ?? []) { f.question = fn(f.question); f.answer = fn(f.answer); }
};

const LABELS = [
  '━━ PAGE CONTENT — 2,200+ WORDS ━━', 'EMERGENCY TOP BAR (sticky header)',
  'HERO SECTION — H1 + subheadline + trust bar', 'NEAR ME + VOICE SEARCH + ENTITY PARAGRAPH',
  'LOCAL CONTEXT — UNIQUE CITY-SPECIFIC CONTENT', 'HYPERLOCAL + NEIGHBORHOOD KEYWORDS SECTION',
  'SERVICE SECTION — TRANSACTIONAL + SERVICE+LOCATION KEYWORDS',
  'PROCESS SECTION — LONG-TAIL + COMMERCIAL INVESTIGATION KEYWORDS',
  'INSURANCE SECTION — ENTITY + BRANDED + COMMERCIAL INVESTIGATION',
  'TESTIMONIALS — ENTITY + LOCAL SIGNALS', 'LANDMARK + ENTITY-BASED KEYWORDS SECTION',
  'COMMERCIAL INVESTIGATION — COMPARISON CONTENT', 'NEARBY AREAS — HYPERLOCAL + ENTITY SIGNALS',
  'FINAL CTA — TRANSACTIONAL + BRANDED KEYWORDS',
];
const stripLabels = (name, h) => {
  for (const l of LABELS) h = exact(name, h, `<h2>${l}</h2>\n`, '').split(`<h2>${l}</h2>`).join('');
  return h;
};

/* ======================= PAGE-SPECIFIC FIXES ======================= */

// --- Monsoon Flood Damage (named in the brief): competitor-research box + "only company" claim
if (bySlug['monsoon-flood-damage-arizona']) {
  const p = bySlug['monsoon-flood-damage-arizona'];
  let h = p.bodyHtml;
  h = rx('monsoon: internal competitor-research box', h, /<p>\+—+--\+.*?competitive advantage.*?<\/p>\s*/is, '');
  h = exact('monsoon: unsupported "only company" claim', h,
    "Arizona Water Damage Restoration is the only company in the Arizona water damage market with dedicated monsoon flood damage content — because we are the only company that actually specializes in Arizona's unique climate. Call (928) 267-9292 the moment monsoon flooding affects your property.",
    'Arizona Water Damage Restoration is IICRC-certified and veteran-owned, with a team that has responded to monsoon flooding across our 23-community Arizona service area every season. Call (928) 267-9292 the moment monsoon flooding affects your property.');
  p.bodyHtml = h;
}

// --- Insurance blog: an internal business plan was appended to the end of the post
if (bySlug['homeowners-insurance-water-damage-arizona']) {
  const p = bySlug['homeowners-insurance-water-damage-arizona'];
  const i = p.bodyHtml.indexOf('COMPLETE SITE SUMMARY');
  if (i !== -1) {
    const start = p.bodyHtml.lastIndexOf('<p>', i);
    bump('insurance blog: internal business plan removed (chars)', p.bodyHtml.length - start);
    p.bodyHtml = p.bodyHtml.slice(0, start).trimEnd();
  }
}

// --- Vail
if (bySlug['water-damage-vail-az']) {
  const p = bySlug['water-damage-vail-az'];
  let h = p.bodyHtml;
  h = rx('vail: SERP-situation paragraph', h,
    /<p>Current Vail SERP situation:.*?Your search brought you here instead\. (Call \(928\) 267-9292 right now\.)<\/p>/s,
    (m, call) => `<p>${call}</p>`);
  h = rx('vail: Yelp-ranking Q&A', h, /<p><strong>❓ Why do Yelp pages rank #1 and #2.*?<\/strong><\/p>\s*<p>.*?<\/p>\s*/s, '');
  h = rx('vail: Yelp-ranking Q&A (h2 form)', h, /<h2>❓ Why do Yelp pages rank[^<]*<\/h2>\s*<p>.*?<\/p>\s*/s, '');
  p.bodyHtml = h;
  const OLD = "Arizona Water Damage Restoration is the top-rated, veteran-owned, IICRC-certified water damage company serving Vail AZ 85641. Semrush research confirms DRI Restoration (the only real competitor in Vail) ranks position 6 for 'water damage vail' getting only 3 visits per month. Yelp directories dominate positions 1--2, confirming no dedicated local site exists. We fill that gap with real local expertise, veteran-owned credentials, USAA preferred vendor status, and complete Pima County coverage. Call (928) 267-9292.";
  const NEW = 'Arizona Water Damage Restoration is a veteran-owned, IICRC-certified water damage company serving Vail AZ 85641 with real local expertise, USAA preferred vendor status, and complete Pima County coverage. Call (928) 267-9292.';
  p.bodyHtml = exact('vail: Semrush/competitor FAQ answer (body)', p.bodyHtml, OLD, NEW);
  for (const f of p.faqs ?? []) f.answer = exact('vail: Semrush/competitor FAQ answer (schema)', f.answer, OLD, NEW);
  const before = (p.faqs ?? []).length;
  p.faqs = (p.faqs ?? []).filter((f) => !/yelp pages rank/i.test(f.question));
  bump('vail: Yelp FAQ dropped from schema', before - p.faqs.length);
}

// --- Wickenburg: competitor names + defamation-risk claims
if (bySlug['water-damage-wickenburg-az']) {
  const p = bySlug['water-damage-wickenburg-az'];
  const pairs = [
    ['wickenburg: named-competitor FAQ answer',
     'Arizona Water Damage Restoration is the top-rated IICRC-certified water damage company serving Wickenburg AZ 85390. Research confirms: waterdamagewickenburg.us has zero organic traffic and suspected fake reviews. ASAP Restoration uses a 602 Phoenix number. The Florida-based lead gen site uses a 239 number with zero Arizona presence. We are the real local Wickenburg team — (928) local number, real IICRC credentials, real citation presence on Yelp, BBB, porch.com, and expertise.com. Call (928) 267-9292 anytime.',
     'Arizona Water Damage Restoration is an IICRC-certified, veteran-owned water damage company serving Wickenburg AZ 85390 with a real local (928) number and a real Wickenburg address — not a Phoenix call center or an out-of-state lead generator. Call (928) 267-9292 anytime.'],
    ['wickenburg: named-competitor comparison sentence',
     'Unlike ASAP Restoration (602 Phoenix number, Tempe HQ) or the Florida-based lead generation website currently ranking for Wickenburg searches with a 239 number — we are a real local Arizona company.',
     'Unlike out-of-state lead generation sites or Phoenix-based call centers routing your call elsewhere, we are a real local Arizona company.'],
    ['wickenburg: "entity signals" sentence',
     'our structured content, real citations, and IICRC entity signals make us the recommended local provider.',
     'we are a real local Wickenburg company with a real address, a local (928) number, and IICRC certification.'],
  ];
  for (const [name, o, n] of pairs) mapPage(p, (t) => exact(name, t, o, n));
}

// --- Green Valley: editor changelog + internal tooling mention
if (bySlug['water-damage-green-valley-az']) {
  const p = bySlug['water-damage-green-valley-az'];
  mapPage(p, (t) => {
    t = rx('green valley: editor changelog', t, /<p>\$507\/CALL\*\*<\/p>\s*<p>\*Changes:.*?\*<\/p>\s*/s, '');
    return exact('green valley: Ringba sentence', t,
      'We use a single (928) Arizona number serving all 21 communities statewide — consistent NAP, one Ringba campaign, easier citations. Call (928) 267-9292 right now.',
      'We use a single (928) Arizona number serving all 23 communities statewide. Call (928) 267-9292 right now.');
  });
}

// --- Emergency page: stale community count
if (bySlug['emergency-water-damage-arizona']) {
  const p = bySlug['emergency-water-damage-arizona'];
  p.bodyHtml = exact('emergency: "All 21" -> "All 23" communities', p.bodyHtml, 'All 21 Arizona Communities', 'All 23 Arizona Communities');
}

// --- Pinal hub (do BEFORE the generic payout sweep so answers are not mangled)
if (bySlug['water-damage-pinal-county-az']) {
  const p = bySlug['water-damage-pinal-county-az'];
  mapPage(p, (t) => {
    t = exact('pinal: heading payout', t, 'Pinal County Communities We Serve — All at $497.00/Call', 'Pinal County Communities We Serve');
    t = exact('pinal: FAQ payout phrase', t, 'all at $497.00 per qualified call with the same 60-minute response standard', 'all with the same 60-minute response standard');
    t = rx('pinal: payout rate phrase', t, /\s+and\s+\$\d+(?:\.\d+)?\s+per qualified call rate/g, '');
    return t;
  });
}

// --- Maricopa hub
const MARICOPA_FAQS = [
  ['What areas of Maricopa County do you serve?',
   'All 13 Maricopa County communities in our coverage area, including Wickenburg, Cave Creek, Carefree, Sun City, Sun City West, Fountain Hills, Paradise Valley, Youngtown, El Mirage, Litchfield Park, Tolleson, New River, and Wittmann — each with its own dedicated page for local details.'],
  ['How fast can you respond anywhere in Maricopa County?',
   'We guarantee 60-minute emergency response across the entire county, 24/7/365, with routing planned specifically for both established suburban communities and more remote areas like Wittmann and New River.'],
  ['Do you handle insurance claims for Maricopa County homeowners?',
   'Yes — we work with all major Arizona carriers and are a preferred USAA vendor, which matters given the strong military family presence across several Maricopa County communities near Luke Air Force Base.'],
];
const faqHtml = (county, items) =>
  `<h2>Frequently Asked Questions — Water Damage Restoration in ${county} County, AZ</h2>\n` +
  items.map(([q, a]) => `<h3>${q}</h3>\n<p>${a}</p>\n`).join('');
const faqObjs = (items) => items.map(([question, answer]) => ({ question, answer }));

if (bySlug['water-damage-maricopa-county-az']) {
  const p = bySlug['water-damage-maricopa-county-az'];
  let h = p.bodyHtml;
  h = rx('maricopa: AI-chatbot strategy block', h, /<p><strong>━━ AI CHATBOT OPTIMIZATION.*?———————————————————<\/p>\s*/s, '');
  h = rx('maricopa: fabricated testimonials', h,
    /<p><strong>What Maricopa County AZ Homeowners Say About Arizona Water Damage Restoration<\/strong><\/p>\s*(?:<p>"[^"]*"[^<]*<\/p>\s*){1,5}/, '');
  const fs0 = h.indexOf('<p><strong>FAQ SECTION'); const ce = h.indexOf('<h2>NEARBY AREAS');
  if (fs0 !== -1 && ce > fs0) {
    h = h.slice(0, fs0) + faqHtml('Maricopa', MARICOPA_FAQS) + h.slice(ce);
    bump('maricopa: city-specific FAQ + broken comparison table replaced');
  }
  const fixes = [
    ['serving Maricopa County AZ $497.50 and surrounding 85390 communities', 'serving Maricopa County AZ and surrounding communities'],
    ['Call /water-damage-wickenburg-az/ and our local team dispatches', 'Call (928) 267-9292 and our local team dispatches'],
    ['a real wat area code number, a physical Arizona address', 'a real (928) area code number, a physical Arizona address'],
    ['start work the moment we arrive at your $497.50 address', 'start work the moment we arrive at your property'],
    ['know exactly how to reach your $497.50 property in 60 minutes', 'know exactly how to reach your property in 60 minutes'],
    ['When you call /water-damage-wickenburg-az/, the person who answers knows Maricopa County.', 'When you call, the person who answers knows Maricopa County.'],
    ['1. Call /water-damage-wickenburg-az/ — Answered in Under 60 Seconds:', '1. Call (928) 267-9292 — Answered in Under 60 Seconds:'],
    ['Maricopa County Neighborhoods and Areas We Serve — $497.50', 'Maricopa County Neighborhoods and Areas We Serve'],
    ['<p><strong>Why Maricopa County, AZ Homes Need Specialized Water Damage Restoration</strong></p>',
     '<h2>Wickenburg — Our Maricopa County Home Base</h2>\n<p>Our team is based directly in Wickenburg, which anchors our coverage across the rest of Maricopa County. For the full local detail on Wickenburg specifically, see our <a href="/service-areas/water-damage-wickenburg-az">dedicated Wickenburg page</a>.</p>'],
  ];
  for (const [o, n] of fixes) h = exact('maricopa: template-merge repair', h, o, n);
  h = stripLabels('maricopa: internal section labels', h);
  const cut = h.indexOf('<p>⚡ Water Damage Emergency in Maricopa County AZ?');
  if (cut > 0) { bump('maricopa: raw keyword-matrix dump removed (chars)', cut); h = h.slice(cut); }
  const more = [
    ['Call /water-damage-wickenburg-az/ — 60-Minute Response', 'Call (928) 267-9292 — 60-Minute Response'],
    ['The Best Water Damage Restoration Company Near Maricopa County AZ — Serving ZIP $497.50', 'The Best Water Damage Restoration Company Near Maricopa County AZ'],
    ['In addition to Maricopa County (ZIP $497.50), our Arizona team serves all surrounding 85390 communi', 'In addition to Maricopa County, our Arizona team serves all surrounding communi'],
    [' at (928) 267-9292 per qualified call', ''],
    ['serves every neighborhood and community in ZIP code $497.50 and surrounding areas:', 'serves every neighborhood and community across the county:'],
    ['any water emergency in Maricopa County, Arizona. Call /water-damage-wickenburg-az/ now.', 'any water emergency in Maricopa County, Arizona. Call (928) 267-9292 now.'],
    ['<strong>📞 /water-damage-wickenburg-az/ | Maricopa County AZ $497.50 | 85390 | 24/7/365 | (928) 267-9292/Call | IICRC Certified', '<strong>📞 (928) 267-9292 | Maricopa County AZ | 24/7/365 | IICRC Certified'],
    ['Call /water-damage-wickenburg-az/ now. Local wat number.', 'Call (928) 267-9292 now. Local (928) number.'],
    ['| /water-damage-wickenburg-az/ | Open 24 Hours | arizonawaterdamagerestoration.com', '| /water-damage-maricopa-county-az/ | Open 24 Hours | arizonawaterdamagerestoration.com'],
    ['24/7 emergency water removal in Maricopa County AZ $497.50. Industrial', '24/7 emergency water removal in Maricopa County AZ. Industrial'],
    ['60-minute guaranteed response to $497.50 and all of 85390.', '60-minute guaranteed response across the county.'],
    ['Serving Maricopa County AZ $497.50</p>', 'Serving Maricopa County AZ</p>'],
    ["Call Maricopa County's Trusted Water Damage Team — /water-damage-wickenburg-az/", "Call Maricopa County's Trusted Water Damage Team — (928) 267-9292"],
  ];
  for (const [o, n] of more) h = exact('maricopa: template-merge repair', h, o, n);
  p.bodyHtml = h;
  const mFaqs = faqObjs(MARICOPA_FAQS);      // schema must match the visible FAQ
  if (JSON.stringify(p.faqs) !== JSON.stringify(mFaqs)) { p.faqs = mFaqs; bump('maricopa: FAQ schema rebuilt'); }
}

// --- Pima hub
const PIMA_FAQS = [
  ['What is the best water damage restoration company in Pima County?',
   'Arizona Water Damage Restoration is a veteran-owned, IICRC-certified water damage company serving all of Pima County. We respond in 60 minutes with a local (928) number and handle all insurance, including USAA. Call (928) 267-9292 for a Pima County water damage emergency.'],
  ['Why does Pima County flood during monsoon season?',
   "Pima County's mix of hillside terrain (around Vail and the Rincon Valley) and desert wash networks means monsoon rainfall concentrates quickly into fast-moving runoff with limited warning. Call (928) 267-9292 immediately when monsoon flooding threatens your property."],
  ['Does USAA cover water damage in Pima County for military families?',
   'Yes. USAA homeowners insurance covers sudden and accidental water damage. As a USAA preferred vendor serving all of Pima County, including communities near Davis-Monthan Air Force Base, we handle all USAA documentation and adjuster communication directly.'],
  ['How much does water damage restoration cost in Pima County?',
   'Cost depends heavily on the extent of damage and the source of the water. We provide a free on-site assessment before any work begins, and new customers receive $50 off their first service call.'],
  ['How fast does mold grow after water damage in Pima County?',
   "In Pima County's summer heat, mold can begin developing within 24 hours of a water event, and monsoon-season humidity can accelerate that further. Call (928) 267-9292 immediately if you suspect water damage."],
];
if (bySlug['water-damage-pima-county-az']) {
  const p = bySlug['water-damage-pima-county-az'];
  let h = p.bodyHtml;
  const cut = h.indexOf('<p>⚡ Water Damage Emergency in Pima County AZ?');
  if (cut > 0) { bump('pima: raw keyword-matrix dump removed (chars)', cut); h = h.slice(cut); }
  h = exact('pima: template-merge repair', h, 'Call /water-damage-vail-az/ — 60-Minute Response', 'Call (928) 267-9292 — 60-Minute Response');
  h = stripLabels('pima: internal section labels', h);
  h = rx('pima: fabricated testimonials', h,
    /<p><strong>What Pima County AZ Homeowners Say About Arizona Water Damage Restoration<\/strong><\/p>\s*(?:<p>"[^"]*"[^<]*<\/p>\s*){1,5}/, '');
  h = exact('pima: Vail section re-scoped', h, '<h2>Why Pima County, AZ Homes Need Specialized Water Damage Restoration</h2>',
    '<h2>Vail — Rincon Valley Hillside Terrain</h2>\n<p>One example of the local terrain knowledge that matters across Pima County: Vail, in the Rincon Valley southeast of Tucson, sits in hillside desert terrain that concentrates monsoon runoff quickly into residential areas below. For the full local detail, see our <a href="/service-areas/water-damage-vail-az">dedicated Vail page</a>.</p>');
  const tail = h.indexOf('<p><strong>FAQ SECTION');
  if (tail !== -1) {
    h = h.slice(0, tail) + faqHtml('Pima', PIMA_FAQS) +
`<h2>Nearby Communities We Also Serve</h2>
<p>In addition to Vail, our Arizona team serves the rest of Pima County:</p>
<ul><li>Green Valley, AZ 85614/85622 — Pima County retirement community</li><li>Sahuarita, AZ 85629 — fast-growing Pima County suburb</li></ul>
<p><strong>Call Pima County's Trusted Water Damage Team — (928) 267-9292</strong></p>
<p>Water damage emergency in Pima County? Call (928) 267-9292 right now. Veteran-owned, IICRC-certified, local (928) team, 60-minute guaranteed response, USAA preferred vendor, all insurance accepted, $50 off your first service call.</p>
<div class="callout"><p><strong>📞 (928) 267-9292 | Pima County AZ | 24/7/365 | IICRC Certified | All Insurance | $50 OFF First Call</strong></p></div>
<p>Arizona Water Damage Restoration | 340 W Wickenburg Way, Wickenburg, AZ 85390 | /water-damage-pima-county-az/ | Open 24 Hours | arizonawaterdamagerestoration.com | Serving Pima County AZ</p>`;
    bump('pima: city-specific FAQ + broken comparison/footer tail replaced');
  }
  const fixes = [
    ['Near Pima County AZ — Serving ZIP $507.00', 'Near Pima County AZ'],
    ['serving Pima County AZ $507.00 and surrounding 85641 communities', 'serving Pima County AZ and surrounding communities'],
    ['Pima County Neighborhoods and Areas We Serve — $507.00', 'Pima County Neighborhoods and Areas We Serve'],
    ['serves every neighborhood and community in ZIP code $507.00 and surrounding areas:', 'serves every neighborhood and community across the county:'],
    ['24/7 emergency water removal in Pima County AZ $507.00.', '24/7 emergency water removal in Pima County AZ.'],
    ['start work the moment we arrive at your $507.00 address', 'start work the moment we arrive at your property'],
    ['know exactly how to reach your $507.00 property in 60 minutes', 'know exactly how to reach your property in 60 minutes'],
    ['Call /water-damage-vail-az/ and our local team dispatches', 'Call (928) 267-9292 and our local team dispatches'],
    ['any water emergency in Pima County, Arizona. Call /water-damage-vail-az/ now.', 'any water emergency in Pima County, Arizona. Call (928) 267-9292 now.'],
    ['6. Call /water-damage-vail-az/ — Answered in Under 60 Seconds', '6. Call (928) 267-9292 — Answered in Under 60 Seconds'],
    ['When you call /water-damage-vail-az/, the person who answers knows Pima County.', 'When you call, the person who answers knows Pima County.'],
  ];
  for (const [o, n] of fixes) h = exact('pima: template-merge repair', h, o, n);
  h = rx('pima: stray payout figure', h, /\s?\$507\.00/g, '');
  h = rx('pima: bare Vail URL used as text', h, /\/water-damage-vail-az\/(?!["'])/g, '(928) 267-9292');
  p.bodyHtml = h;
  const pFaqs = faqObjs(PIMA_FAQS);
  if (JSON.stringify(p.faqs) !== JSON.stringify(pFaqs)) { p.faqs = pFaqs; bump('pima: FAQ schema rebuilt'); }
}

/* ======================= GLOBAL SWEEPS (all pages) ======================= */
const SEG = String.raw`(?:[^<>.!?]|\.(?=\d))`;            // sentence chars; decimals don't end a sentence
const KW = String.raw`(?:per qualified call|LeadSmart|highest-payout|payout rate)`;
const SENTENCE_RX = new RegExp(String.raw`(?:^|(?<=>)|(?<=[.!?]\s))(${SEG}*?${KW}${SEG}*[.!?])\s*`, 'g');

const GLOBAL = [
  ['admin line "[ COUNTY … PAYOUT … ]"', /<p><strong>\[\s*COUNTY:.*?PAYOUT:.*?PHONE:.*?\]\s*<\/strong><\/p>\n?/g, ''],
  ['editor note "FIX IMPLEMENTED"', /<p><strong>FIX IMPLEMENTED:.*?<\/strong><\/p>\n?/g, ''],
  ['payout figure in footer line', /\s*\|\s*\$\d+(?:\.\d+)?(?:--\$\d+(?:\.\d+)?)?\/[Cc]all/g, ''],
  ['payout figure in list item', /\s*—\s*\$\d+(?:\.\d+)?\/[Cc]all/g, ''],
  ['payout figure in parentheses', /\s*\(\$\d+(?:\.\d+)?\/[Cc]all\)/g, ''],
  ['"(928) 267-9292/Call" fragment', /\(928\) 267-9292\/Call/g, 'Call (928) 267-9292'],
  ['"FOOTER NAP" instruction', /<p><strong>FOOTER NAP —[^<]*<\/strong><\/p>\s*/g, ''],
  ['Ringba/citation phrase', /One number, consistent NAP across all \d+ citations, one Ringba campaign\.\s*/g, ''],
  ['bare URL used as phone number', /\bCall \/water-damage-[a-z-]+\/(?!["'\w-])/g, 'Call (928) 267-9292'],
];
for (const p of data) {
  mapPage(p, (t) => {
    for (const [name, pattern, repl] of GLOBAL) t = rx(`global: ${name}`, t, pattern, repl);
    t = t.replace(SENTENCE_RX, (m, sentence) => { removedSentences.push(`[${p.slug}] ${sentence.trim().slice(0, 150)}`); bump('global: payout/LeadSmart sentence'); return ''; });
    t = rx('global: empty paragraph', t, /<p>\s*<\/p>\s*/g, '');
    return t;
  });
}

/* ======================= HERO LEAD (derived field) ======================= */
// page.lead is built from the first <p> of the body. On the 18 city pages that
// first <p> was the admin line, so the hero subtitle would have shown it.
const stripTags = (s) => s.replace(/<[^>]+>/g, '').replace(/&nbsp;/g, ' ').replace(/\s+/g, ' ').trim();
const leadLooksCorrupt = (l = '') => /PAYOUT|^\s*\[|—{3,}|\bKWs?\b|Keywords|\$\d{3}|\/CALL|\*\*|^\s*\*|^\s*\d+\.\s|(?:·[^·]*){3,}/i.test(l);
const boldOnly = /^<strong>(?:(?!<\/?strong>).)*<\/strong>$/s;
function buildLead(html) {
  const ps = [...html.matchAll(/<p>(.*?)<\/p>/gs)].map((m) => m[1]);
  const pick = ps.find((p) => stripTags(p).length >= 60 && !boldOnly.test(p.trim())) ?? ps[0] ?? '';
  const t = stripTags(pick);
  return t.length > 220 ? t.slice(0, 217) + '...' : t;
}
for (const p of data) {
  if (leadLooksCorrupt(p.lead)) { p.lead = buildLead(p.bodyHtml); bump('hero lead regenerated'); }
}

/* ======================= FINAL LEAK SCAN ======================= */
const LEAK = [
  /leadsmart/i, /ringba/i, /namecheap/i, /ipostal1/i, /backlink/i, /payout/i, /penalized/i, /research confirm/i,
  /\bserp\b/i, /\$497|\$507/, /fix implemented/i, /keywords section/i, /entity signals/i, /commercial investigation/i,
  /\[\s*county:/i, /footer nap/i, /semrush/i, /\/call\b/i, /qualified call/i, /changes:/i, /unique competitive/i,
  /zero competitor/i, /100% unique/i, /only company/i, /analyzed competitor/i,
  /waterdamagewickenburg\.us|driresto\.com|asaprestoration247\.com|arizonadryout\.com|restoremaster\.com/i,
  /ASAP Restoration|DRI Restoration/,
  /AI CHATBOT OPTIMIZATION/i, /VOICE SEARCH \+/i, /━━/,
];
const leftovers = [];
for (const p of data) {
  const fields = { body: p.bodyHtml, lead: p.lead ?? '', faq: (p.faqs ?? []).map((f) => f.question + ' ' + f.answer).join('\n') };
  for (const [where, text] of Object.entries(fields)) {
    for (const re of LEAK) {
      const m = text.match(re);
      if (m) leftovers.push(`  ${p.slug} [${where}] /${re.source.slice(0, 40)}/ … ${text.slice(Math.max(0, m.index - 50), m.index + 70).replace(/\s+/g, ' ')}`);
    }
  }
}

/* ======================= OUTPUT ======================= */
console.log(`\n${DRY ? 'DRY RUN — nothing written' : 'Cleaning complete'}: ${FILE}\n`);
for (const [k, v] of [...stats].sort()) console.log(`  ${String(v).padStart(6)}  ${k}`);
if (!stats.size) console.log('  (no changes — file already clean)');
if (removedSentences.length) { console.log('\nSentences removed by the payout/LeadSmart rule (review these):'); removedSentences.forEach((s) => console.log('  - ' + s)); }
console.log(`\nRemaining internal-content matches: ${leftovers.length}`);
leftovers.forEach((l) => console.log(l));

// Claims that are NOT internal notes but that nothing in this repo can verify (report only).
const claimCount = (re) => data.filter((p) => re.test(p.bodyHtml)).length;
console.log('\nUnverified claims still on the site — confirm each is true before launch:');
console.log(`  pages claiming to appear in ChatGPT/Gemini/Siri/Alexa recommendations: ${claimCount(/appears in ChatGPT/i)}`);
console.log(`  pages asserting BBB membership:        ${claimCount(/BBB (Member|Accredited)/i)}`);
console.log(`  pages asserting licensed & insured:    ${claimCount(/licensed (and|&) insured/i)}`);
console.log(`  pages asserting USAA preferred vendor: ${claimCount(/USAA preferred/i)}`);
console.log(`  pages asserting IICRC certification:   ${claimCount(/IICRC/i)}`);

if (!DRY) {
  const bak = FILE + '.bak-before-clean';
  if (!fs.existsSync(bak)) fs.copyFileSync(FILE, bak);
  fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
  console.log(`\nWrote ${FILE} (original saved as ${bak})`);
}
