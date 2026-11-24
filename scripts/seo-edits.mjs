#!/usr/bin/env node
/**
 * scripts/seo-edits.mjs — on-page SEO fixes for content/pages.json. Idempotent. Run after the other two scripts.
 *   node scripts/seo-edits.mjs [--dry-run] [path/to/pages.json]
 */
import fs from 'node:fs';
const args = process.argv.slice(2); const DRY = args.includes('--dry-run');
const FILE = args.find((a) => !a.startsWith('--')) ?? 'content/pages.json';
const data = JSON.parse(fs.readFileSync(FILE, 'utf8')); const g = Object.fromEntries(data.map((p) => [p.slug, p]));
const stats = new Map(); const bump = (k, n = 1) => n && stats.set(k, (stats.get(k) ?? 0) + n);
const MAX_TITLE = 60;

/* 1. Titles: the site template used to append the brand; titles are now final, so keep each within ~60 chars
      (Google truncates around there). Service/area titles keep first + phone segment; blog titles keep leading segments. */
for (const p of data) {
  if (p.title.length <= MAX_TITLE) continue;
  const segs = p.title.split(' | ').map((s) => s.trim());
  const hasPhone = /\(\d{3}\) \d{3}-\d{4}$/.test(segs[segs.length - 1]);
  let kept;
  if (hasPhone && segs.length >= 2) {
    const first = segs[0], last = segs[segs.length - 1], mid = segs.slice(1, -1);
    kept = [first]; for (const m of mid) if ([...kept, m, last].join(' | ').length <= MAX_TITLE) kept.push(m); kept.push(last);
  } else { kept = [segs[0]]; for (const s of segs.slice(1)) if ([...kept, s].join(' | ').length <= MAX_TITLE) kept.push(s); else break; }
  const t = kept.join(' | '); if (t !== p.title && t.length <= MAX_TITLE + 4) { p.title = t; bump('title shortened to ≤60 chars'); }
}

const TITLE_OVERRIDE = { 'homeowners-insurance-water-damage-arizona': 'Does Insurance Cover Water Damage in Arizona? 2026 Guide' };
for (const [slug, t] of Object.entries(TITLE_OVERRIDE)) if (g[slug] && g[slug].title.length > MAX_TITLE && g[slug].title !== t) { g[slug].title = t; bump('single-segment title shortened'); }

/* 2. Meta descriptions over 160 characters */
const META = {
  'flood-cleanup-arizona': 'Flooded home or business in Arizona? IICRC-certified flood cleanup team. Water extraction, drying, and sanitizing. Call (928) 267-9292.',
  'arizona-monsoon-water-damage-guide': 'How to protect your Arizona home from monsoon water damage: flood risks across 23 AZ communities, prevention tips, and what to do if flooding hits.',
  'water-damage-restoration-cost-arizona': 'What Arizona water damage restoration really costs by damage type, what insurance covers, and how to limit your out-of-pocket cost. Call (928) 267-9292.',
  'homeowners-insurance-water-damage-arizona': 'Does Arizona homeowners insurance cover monsoon and flood water damage? What is covered, what is not, and how to protect your claim.',
};
for (const [slug, m] of Object.entries(META)) if (g[slug] && g[slug].meta !== m && g[slug].meta.length > 160) { g[slug].meta = m; bump('meta description trimmed to ≤160'); }

/* 3. Overlong H1s on three area pages (keep the keyword-bearing start, drop the trailing slogan) */
for (const p of data) {
  if (p.category === 'city' && p.h1.length > 80 && p.h1.includes(' · ')) { p.h1 = p.h1.split(' · ')[0].trim(); bump('H1 shortened (was >80 chars)'); }
  else if (p.category === 'city' && p.h1.length > 80) { const cut = p.h1.slice(0, 80).replace(/[\s,—-]+\S*$/, ''); if (cut.length > 40) { p.h1 = cut; bump('H1 shortened (was >80 chars)'); } }
}

/* 4. Blog posts were linked only from the blog index. Link each from the service/area pages it genuinely relates to. */
const blogs = data.filter((p) => p.category === 'blog'); const blog = (re) => blogs.find((b) => re.test(b.slug));
const B = { monsoon: blog(/monsoon/), flash: blog(/flash-flood/), cost: blog(/cost/), ins: blog(/insurance/), howlong: blog(/how-long/), mold: blog(/mold/), signs: blog(/signs/), hass: blog(/hassayampa/) };
const WIRE = {
  'monsoon-flood-damage-arizona': ['monsoon', 'flash'], 'flood-cleanup-arizona': ['flash', 'howlong'], 'emergency-water-damage-arizona': ['signs', 'howlong'],
  'water-removal-arizona': ['howlong', 'signs'], 'structural-drying-dehumidification-arizona': ['howlong', 'mold'], 'mold-remediation-arizona': ['mold', 'signs'],
  'water-damage-insurance-claim-arizona': ['ins', 'cost'], 'burst-pipe-water-damage-arizona': ['signs', 'cost'], 'ceiling-water-damage-arizona': ['signs', 'mold'],
  'commercial-water-damage-arizona': ['cost', 'ins'], 'water-damage-wickenburg-az': ['hass', 'flash'],
  'water-damage-maricopa-county-az': ['monsoon', 'cost'], 'water-damage-pima-county-az': ['monsoon', 'cost'], 'water-damage-pinal-county-az': ['monsoon', 'cost'],
};
for (const [slug, keys] of Object.entries(WIRE)) {
  const p = g[slug]; if (!p) continue;
  for (const k of keys) {
    const b = B[k]; if (!b) { console.warn(`WARN: no blog matched "${k}"`); continue; }
    const href = `/blog/${b.slug}`;
    if (!(p.related ?? []).some((r) => r.href === href)) { (p.related ??= []).push({ label: b.h1.split(' — ')[0].slice(0, 70), href }); bump('blog post linked from a related service/area page'); }
  }
}


/* 5. Heading hygiene: no H2 that repeats the H1, no emoji in headings, FAQ questions as H3 under one FAQ H2 */
const norm = (t) => t.replace(/<[^>]+>/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
for (const p of data) {
  let h = p.bodyHtml; const h1n = norm(p.h1);
  h = h.replace(/<h2>(.*?)<\/h2>/g, (m, t) => {
    const n = norm(t);
    if (n && (n === h1n || n.slice(0, 32) === h1n.slice(0, 32))) {
      const place = (t.match(/^Water Damage Restoration in (.+?)(?:, AZ|, Arizona| AZ| —|$)/) || [])[1];
      if (place) { bump('H2 that repeated the H1 rewritten'); return `<h2>How We Help Homeowners in ${place}</h2>`; }
    }
    return m;
  });
  h = h.replace(/<h2>❓\s*/g, () => { bump('emoji removed from heading'); return '<h2>'; });
  // FAQ questions: demote to H3 beneath an FAQ H2 (insert the parent on service pages that lack one)
  const isQ = (t) => /\?\s*$/.test(t.replace(/<[^>]+>/g, '').trim());
  const heads = [...h.matchAll(/<h2>(.*?)<\/h2>/g)];
  const qs = heads.filter((m) => isQ(m[1]));
  const hasParent = heads.some((m) => /FAQ|Frequently Asked/i.test(m[1]) && !isQ(m[1]));
  if (p.category === 'service' && qs.length >= 2 && !hasParent) { h = h.replace(qs[0][0], '<h2>Frequently Asked Questions</h2>\n' + qs[0][0]); bump('FAQ parent heading added'); }
  let inFaq = false;
  h = h.replace(/<h2>(.*?)<\/h2>/g, (m, t) => {
    if (/FAQ|Frequently Asked/i.test(t) && !isQ(t)) { inFaq = true; return m; }
    if (inFaq && isQ(t)) { bump('FAQ question demoted H2 → H3'); return `<h3>${t}</h3>`; }
    if (!isQ(t)) inFaq = false;
    return m;
  });
  p.bodyHtml = h;
}


/* 6. Remove claims that AI assistants/search engines recommend the business (unverifiable; replaced with real selection advice) */
const AI = /ChatGPT|Gemini|Siri|Alexa|Perplexity|Copilot/;
const NEWA = (place) => `Call (928) 267-9292 any time for emergency water damage help in ${place}. When you compare companies, ask how quickly they can arrive, whether they use moisture meters and a written scope of work, and whether they will work with your insurance company. We are a Wickenburg-based team with a local (928) number and a Wickenburg address.`;
for (const p of data) {
  let h = p.bodyHtml; if (!AI.test(h) && !(p.faqs ?? []).some((f) => AI.test(f.question + f.answer))) continue;
  const fixes = [
    ["Whether you found us on ChatGPT, Google, Apple Maps, Bing, or a neighbor's recommendation — you are in the right place.", 'However you found us, whether a search, a map listing or a neighbor\'s recommendation, you are in the right place.'],
    ['AI chatbots and voice assistants may recommend us — but when you call, you speak to a human, every time.', 'When you call, you speak with a person.'],
    ['You found us — and ChatGPT, Gemini, Siri, and Bing will tell you the same. Call', 'You found us. Call'],
  ];
  for (const [a, b] of fixes) if (h.includes(a)) { h = h.split(a).join(b); bump('AI-recommendation claim removed (sentence)'); }
  h = h.replace(/,? asking ChatGPT "[^"]*"/g, () => { bump('AI-recommendation claim removed (phrase)'); return ''; });
  h = h.replace(/<(h[23])>(Can ChatGPT[^<]*?(?:in|near) ([^<?]+?)\?)<\/\1>\s*<p>[\s\S]*?<\/p>/g, (m, tag, q, place) => {
    bump('AI-chatbot FAQ replaced with real selection advice'); const pl = place.replace(/ Arizona$/, '').trim();
    return `<${tag}>How do I find reliable water damage help in ${pl}?</${tag}>\n<p>${NEWA(pl)}</p>`;
  });
  p.bodyHtml = h;
  for (const f of p.faqs ?? []) if (AI.test(f.question + f.answer)) {
    const place = (f.question.match(/(?:in|near) (.+?)\?/) || [])[1]?.replace(/ Arizona$/, '') ?? 'Arizona';
    f.question = `How do I find reliable water damage help in ${place}?`; f.answer = NEWA(place); bump('AI-chatbot FAQ replaced in FAQ schema');
  }
  const left = (h.match(new RegExp(AI.source, 'g')) || []).length; if (left) console.warn(`WARN ${p.slug}: ${left} AI-term mention(s) remain`);
}

/* 7. Blog posts: link each to two related articles */
{
  const bl = data.filter((p) => p.category === 'blog'); const f = (re) => bl.find((b) => re.test(b.slug));
  const REL = [[/monsoon/, /flash-flood/], [/cost/, /insurance/], [/how-long/, /mold/], [/signs/, /how-long/], [/hassayampa/, /monsoon/]];
  for (const [a, b] of REL) for (const [x, y] of [[f(a), f(b)], [f(b), f(a)]]) {
    if (!x || !y || x === y) continue; const href = `/blog/${y.slug}`;
    if (!(x.related ?? []).some((r) => r.href === href)) { (x.related ??= []).push({ label: y.h1.split(' — ')[0].slice(0, 70), href }); bump('related-article link added between blog posts'); }
  }
}


/* 8. Unique, location-specific section headings on city pages (the originals differed only by place name) */
const CH = {
  wickenburg: ['Flood and Plumbing Risks Along the Hassayampa', 'Wickenburg Homes and Ranches', "Wickenburg's Historic Homes and Desert Climate", 'Water Damage Help From a Wickenburg-Based Team'],
  wittmann: ['Water Risks on Rural Wittmann Properties', 'Wittmann Homes, Wells and Outbuildings', "Wittmann's Distance, Roads and Well Systems", 'Reaching Wittmann Properties Quickly'],
  'new-river': ['Freeze, Wash and Storm Risks in New River', 'New River Homes and Acreage', 'High-Desert Conditions Around New River', 'Help for New River Homeowners'],
  'cave-creek': ['Wash, Storm and Plumbing Risks in Cave Creek', 'Cave Creek Homes and Horse Properties', 'Foothill Living and Water in Cave Creek', 'Help in the Cave Creek Foothills'],
  carefree: ['Hillside Runoff and Roof Risks in Carefree', "Carefree's Custom Homes", "Carefree's Slopes, Finishes and Seasonal Homes", 'Caring for Carefree Homes After a Loss'],
  'fountain-hills': ['Mountainside Water Risks in Fountain Hills', 'Fountain Hills Hillside Homes', 'Retaining Walls and Views: Fountain Hills Homes', 'Fountain Hills Water Damage, Start to Finish'],
  'paradise-valley': ['Large-Home Water Risks in Paradise Valley', 'Paradise Valley Estates', 'Finishes, Pools and Privacy in Paradise Valley', 'Discreet Help in Paradise Valley'],
  'sun-city': ['Aging-System Water Risks in Sun City', 'Sun City Homeowners', 'What Sets Sun City Homes Apart', 'Supporting Sun City Residents and Families'],
  'sun-city-west': ['Common Water Risks in Sun City West', 'Sun City West Homes', 'Sun City West Systems at Mid-Life', 'Help in Sun City West'],
  youngtown: ['Older-Home Water Risks in Youngtown', "Youngtown's Compact Homes", "Youngtown's Original Plumbing and Roofs", 'Straightforward Help for Youngtown Residents'],
  'el-mirage': ['Flat-Ground Storm Risks in El Mirage', 'El Mirage Homes and Rentals', 'Housing Mix and Drainage in El Mirage', 'What to Do First in El Mirage'],
  'litchfield-park': ['Tree-Root and Pipe Risks in Litchfield Park', 'Litchfield Park Homes', 'Mature Streets and Aging Lines in Litchfield Park', 'Litchfield Park, Step by Step'],
  tolleson: ['Irrigation and Plumbing Risks in Tolleson', 'Tolleson Homes and Businesses', "Tolleson's Mix of Homes, Farms and Warehouses", 'Help for Tolleson Residents and Businesses'],
  vail: ['Runoff and Plumbing Risks in Vail', 'Vail Homes and Rural Lots', 'The Rincon Valley and Water in Vail', 'Vail Water Damage Help, Step by Step'],
  'green-valley': ['Seasonal-Home Water Risks in Green Valley', 'Green Valley Homeowners', 'Retirement-Community Conditions in Green Valley', 'Help for Green Valley Families'],
  sahuarita: ['New-Home Plumbing Risks in Sahuarita', 'Sahuarita Homes', "Sahuarita's Newer Neighborhoods and Water", 'Fast Help in Sahuarita'],
  'apache-junction': ['Wash and Manufactured-Home Risks in Apache Junction', 'Apache Junction Homes and Parks', 'Living Below the Superstitions: Water in Apache Junction', 'Help in Apache Junction'],
  'gold-canyon': ['Foothill Runoff Risks in Gold Canyon', 'Gold Canyon Homes', 'Golf-Community Living and Water in Gold Canyon', 'Help in Gold Canyon'],
  florence: ['Historic and New-Home Risks in Florence', 'Florence Homes and Historic Buildings', 'Old Adobe, New Neighborhoods: Water in Florence', 'Help in Florence'],
  coolidge: ['Canal and Flat-Ground Risks in Coolidge', 'Coolidge Homes and Farms', 'Farmland and Water Near Coolidge Homes', 'Help in Coolidge'],
  'arizona-city': ['Standing-Water Risks in Arizona City', 'Arizona City Homes', 'Block and Manufactured Homes in Arizona City', 'Help in Arizona City'],
  eloy: ['Farm-Country Water Risks in Eloy', 'Eloy Homes, Farms and Businesses', "Eloy's Flat Terrain and Irrigation", 'Help in Eloy'],
  'valley-farms': ['Well, Septic and Ditch Risks in Valley Farms', 'Valley Farms Properties', 'Rural Valley Farms and Water Damage', 'Help in Valley Farms'],
};
for (const p of data) {
  if (p.category !== 'city') continue; const k = p.slug.replace(/^water-damage-/, '').replace(/-az$/, ''); const H = CH[k]; if (!H) continue;
  p.bodyHtml = p.bodyHtml
    .replace(/<h2>Water Damage Risks in [^<]*<\/h2>/, () => { bump('city heading made location-specific'); return `<h2>${H[0]}</h2>`; })
    .replace(/<h2>Our Water Damage Services in [^<]*<\/h2>/, () => { bump('city heading made location-specific'); return `<h2>Water Damage Services for ${H[1]}</h2>`; })
    .replace(/<h2>Local Water Damage Considerations in [^<]*<\/h2>/, () => { bump('city heading made location-specific'); return `<h2>${H[2]}</h2>`; })
    .replace(/<h2>How We Help Homeowners in [^<]*<\/h2>/, () => { bump('city heading made location-specific'); return `<h2>${H[3]}</h2>`; });
}

/* 9. Remaining H2s that repeat the H1 */
for (const p of data) {
  p.bodyHtml = p.bodyHtml.replace(/<h2>([^<]+?) (?:Restoration )?Across Arizona<\/h2>/, (m, svc) => { bump('H2 that repeated the H1 rewritten'); return `<h2>What ${svc} Involves in Arizona</h2>`; });
}
{ const c = g['water-damage-restoration-cost-arizona']; if (c) c.bodyHtml = c.bodyHtml.replace('<h2>How Much Does Water Damage Restoration Cost in Arizona?</h2>', () => { bump('H2 that repeated the H1 rewritten'); return '<h2>The Short Answer on Cost</h2>'; }); }

/* 10. More related-article links so every post links two others */
{
  const bl = data.filter((p) => p.category === 'blog'); const f = (re) => bl.find((b) => re.test(b.slug));
  for (const [a, b] of [[/cost/, /how-long/], [/insurance/, /monsoon/], [/mold/, /signs/], [/flash-flood/, /hassayampa/]]) for (const [x, y] of [[f(a), f(b)], [f(b), f(a)]]) {
    if (!x || !y || x === y) continue; const href = `/blog/${y.slug}`;
    if (!(x.related ?? []).some((r) => r.href === href)) { (x.related ??= []).push({ label: y.h1.split(' — ')[0].slice(0, 70), href }); bump('related-article link added between blog posts'); }
  }
}

/* 10b. Emergency page: two more FAQs (it had only two) */
{ const e = g['emergency-water-damage-arizona']; const tag = '<h2>Frequently Asked Questions</h2>';
  if (e && !e.bodyHtml.includes('What should I do first when I discover water damage?') && e.bodyHtml.includes(tag)) {
    const i = e.bodyHtml.indexOf(tag) + tag.length; const rest = e.bodyHtml.slice(i); const end = rest.search(/<h2>|<div class="callout">/); const pos = i + (end < 0 ? rest.length : end);
    const add = `<h3>What should I do first when I discover water damage?</h3>\n<p>Shut off the water at the main valve or the affected fixture, stay away from electrical hazards, photograph the damage, and call a restoration company right away. Acting in the first hour limits how far water spreads.</p>\n<h3>Is it safe to stay in the house after a water event?</h3>\n<p>It depends on the water source and the electrical situation. Clean water from a supply line is usually less hazardous than sewage or floodwater, but wet electrical equipment, sagging ceilings and contaminated water are reasons to leave the affected area and wait for a professional assessment.</p>\n`;
    e.bodyHtml = e.bodyHtml.slice(0, pos) + add + e.bodyHtml.slice(pos); bump('emergency page: FAQs added'); } }

/* 11. Rebuild each page's FAQ structured data from the Q&As actually visible on the page (schema must match the page) */
{
  const clean = (t) => t.replace(/<[^>]+>/g, ' ').replace(/&amp;/g, '&').replace(/\s+/g, ' ').trim();
  for (const p of data) {
    const hs = [...p.bodyHtml.matchAll(/<h2>(.*?)<\/h2>/g)]; const par = hs.find((m) => /FAQ|Frequently Asked/i.test(m[1]) && !/\?\s*$/.test(clean(m[1]))); if (!par) continue;
    const start = par.index + par[0].length; const rest = p.bodyHtml.slice(start); const endM = rest.match(/<h2>|<div class="callout">/); const sect = endM ? rest.slice(0, endM.index) : rest;
    const items = []; const re = /<h3>(.*?)<\/h3>|<p><strong>(.*?\?)<\/strong><\/p>|<p>([\s\S]*?)<\/p>/g; let cur = null, m;
    while ((m = re.exec(sect))) { const q = m[1] ?? m[2]; if (q !== undefined) { cur = { question: clean(q).replace(/^❓\s*/, ''), answer: '' }; items.push(cur); } else if (cur) cur.answer += (cur.answer ? ' ' : '') + clean(m[3]); }
    const good = items.filter((i) => i.question.endsWith('?') && i.answer.length > 20);
    if (good.length >= (p.faqs?.length ?? 0) && JSON.stringify(good) !== JSON.stringify(p.faqs)) { p.faqs = good; bump('FAQ structured data rebuilt from visible Q&As'); }
  }
}


/* 12. Opening definition (AEO/LLMO): one plain-language sentence pair on service pages that lacked one */
const DEF = {
  'monsoon-flood-damage-arizona': "Monsoon flood damage is water damage caused by Arizona's summer storm season (June 15 to September 30): flash flooding and runoff entering a building, wind-driven rain getting through the roof or windows, and the moisture and mold that follow.",
  'burst-pipe-water-damage-arizona': 'A burst pipe is a split or break in a pressurized supply line that releases water into walls, floors or ceilings. Unlike a slow drip, it keeps flowing until the water is shut off, so the first step is always the main valve.',
  'ceiling-water-damage-arizona': 'Ceiling water damage is moisture in the drywall, insulation or framing above a room, usually from a roof leak, an air-conditioning condensate problem or plumbing in the floor above. It often shows up as a stain, sag or bubbling paint long after the leak began.',
  'sewage-backup-cleanup-arizona': 'A sewage backup is wastewater from a sewer or septic line flowing back into a building through floor drains, toilets or tubs. It is classed as Category 3 (black) water because it can carry disease-causing organisms.',
  'commercial-water-damage-arizona': 'Commercial water damage restoration is the extraction, drying and repair of water-damaged offices, stores, warehouses and other business properties, planned around operations, tenants and building systems to limit downtime.',
  'water-damage-insurance-claim-arizona': 'A water damage insurance claim is a request to your insurer to pay for covered damage from a sudden water event, supported by documentation of the cause, the damage and the steps taken to prevent further loss.',
};
for (const [slug, text] of Object.entries(DEF)) { const p = g[slug]; if (!p || p.bodyHtml.includes('<strong>In short:</strong>')) continue; const i = p.bodyHtml.indexOf('</p>'); if (i < 0) continue; p.bodyHtml = p.bodyHtml.slice(0, i + 4) + `\n<p><strong>In short:</strong> ${text}</p>` + p.bodyHtml.slice(i + 4); bump('opening definition added'); }


/* 13. ZIP codes served (one factual line per city page; Valley Farms omitted because its ZIP could not be confirmed) */
const ZIPS = { wickenburg: '85390', wittmann: '85361', 'new-river': '85087', 'cave-creek': '85331', carefree: '85377', 'fountain-hills': '85268', 'paradise-valley': '85253', 'sun-city': '85351, 85372, 85373', 'sun-city-west': '85375', youngtown: '85363', 'el-mirage': '85335', 'litchfield-park': '85340', tolleson: '85353', vail: '85641', 'green-valley': '85614, 85622', sahuarita: '85629', 'apache-junction': '85119, 85120', 'gold-canyon': '85118', florence: '85132', coolidge: '85128', 'arizona-city': '85123', eloy: '85131' };
const NAMES = { 'new-river': 'New River', 'cave-creek': 'Cave Creek', 'fountain-hills': 'Fountain Hills', 'paradise-valley': 'Paradise Valley', 'sun-city': 'Sun City', 'sun-city-west': 'Sun City West', 'el-mirage': 'El Mirage', 'litchfield-park': 'Litchfield Park', 'green-valley': 'Green Valley', 'apache-junction': 'Apache Junction', 'gold-canyon': 'Gold Canyon', 'arizona-city': 'Arizona City' };
for (const p of data) {
  if (p.category !== 'city') continue; const k = p.slug.replace(/^water-damage-/, '').replace(/-az$/, ''); const z = ZIPS[k]; if (!z || p.bodyHtml.includes('<strong>ZIP codes we serve')) continue;
  const city = NAMES[k] ?? k.charAt(0).toUpperCase() + k.slice(1); const i = p.bodyHtml.indexOf('</p>'); if (i < 0) continue;
  p.bodyHtml = p.bodyHtml.slice(0, i + 4) + `\n<p><strong>ZIP codes we serve in ${city}:</strong> ${z}.</p>` + p.bodyHtml.slice(i + 4); bump('ZIP line added to city page');
}

console.log(`${DRY ? 'DRY RUN' : 'Done'}: ${FILE}`); for (const [k, v] of [...stats].sort()) console.log(`  ${String(v).padStart(4)}  ${k}`); if (!stats.size) console.log('  (no changes)');
if (!DRY) fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
