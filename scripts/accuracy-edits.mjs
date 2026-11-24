#!/usr/bin/env node
/**
 * scripts/accuracy-edits.mjs  — run AFTER clean-content.mjs.  Idempotent.
 * Removes unsupported claims, fixes stale counts and list numbering, and fills the gaps on the monsoon page.
 *   node scripts/accuracy-edits.mjs [--dry-run] [path/to/pages.json]
 */
import fs from 'node:fs';
const args = process.argv.slice(2);
const DRY = args.includes('--dry-run');
const FILE = args.find((a) => !a.startsWith('--')) ?? 'content/pages.json';
const data = JSON.parse(fs.readFileSync(FILE, 'utf8'));
const g = Object.fromEntries(data.map((p) => [p.slug, p]));
const stats = new Map(); const bump = (k, n = 1) => n && stats.set(k, (stats.get(k) ?? 0) + n);
const exact = (name, t, a, b) => { const parts = t.split(a); bump(name, parts.length - 1); return parts.join(b); };
const rx = (name, t, re, r) => t.replace(re, (...m) => { bump(name); return typeof r === 'function' ? r(...m) : r; });
const eachText = (p, fn) => { p.bodyHtml = fn(p.bodyHtml); for (const f of p.faqs ?? []) { f.question = fn(f.question); f.answer = fn(f.answer); } };

/* ---- Monsoon Flood Damage page ---- */
const m = g['monsoon-flood-damage-arizona'];
if (m) {
  m.h1 = exact('monsoon: H1 "only" claim', m.h1, 'The Only Arizona Specialists', '24/7 Emergency Response');
  m.title = exact('monsoon: title', m.title, 'AZ Specialists', '24/7 Emergency');
  m.meta = 'Monsoon flooding hit your Arizona home? 24/7 emergency water extraction and drying across 23 Arizona communities. All insurance accepted. Call (928) 267-9292.';
  eachText(m, (t) => {
    t = exact('monsoon: unverifiable "every season" claim', t,
      'Arizona Water Damage Restoration is IICRC-certified and veteran-owned, with a team that has responded to monsoon flooding across our 23-community Arizona service area every season. Call',
      'Arizona Water Damage Restoration provides 24/7 emergency response for monsoon flooding across our 23-community Arizona service area. Call');
    t = exact('monsoon: exaggerated rainfall rate', t, 'can deliver 3--5 inches of rain per hour in communities like', 'can produce intense, short-lived downpours in communities like');
    t = exact('monsoon: unsupported "highest risk" superlative', t, 'highest residential flash flood risk in Maricopa County', 'an area where flash flooding is a real concern');
    return t;
  });
  if (!m.bodyHtml.includes('What to Do Right Away After Monsoon Flooding')) {
    const NEW = `<h2>What to Do Right Away After Monsoon Flooding</h2>
<ol>
<li><strong>Put safety first.</strong> Stay out of standing water if outlets, cords, or appliances could be energized. Turn off power at the breaker only if you can reach it without stepping through water.</li>
<li><strong>Stop new water if you can.</strong> Close doors to keep out runoff, put barriers in place, and shut off the main water valve if a pipe or fixture is also leaking.</li>
<li><strong>Treat floodwater as contaminated.</strong> Water that enters from outside carries mud, debris, and bacteria. Avoid direct contact, keep children and pets out, and do not use a household vacuum on it.</li>
<li><strong>Document before you move things.</strong> Take photos and video of the water line, damaged belongings, and where the water came in. Your insurance adjuster will ask for them.</li>
<li><strong>Lift what you safely can.</strong> Move furniture, electronics, and valuables to dry areas, but leave heavy cleanup and structural drying to professionals.</li>
<li><strong>Call a professional right away.</strong> Water left in carpet, padding, drywall, and wall cavities spreads, and mold can begin to grow within a day or two in Arizona's warm indoor temperatures. Call (928) 267-9292.</li>
</ol>
<h2>Roof Leaks, Standing Water, and Hidden Damage</h2>
<p>Monsoon damage is not always a flooded floor. Wind-driven rain can get past damaged shingles, flashing, skylights, and window seals, then travel along framing and show up as ceiling stains or bubbling paint far from where it entered. Ground-level flooding can leave standing water on slab floors and in garages, and homes with crawlspaces or lower-level areas can collect water out of sight. Wet drywall, insulation, baseboards, and subfloors hold moisture long after the surface looks dry, which is why professional extraction and moisture-monitored drying matter more than fans and towels alone.</p>
<h2>When to Call a Professional</h2>
<p>Call right away if water has reached drywall, flooring, or insulation; if the water came from outside, a sewer line, or an unknown source; if you see ceiling stains or sagging after a storm; if there is a musty smell; or if you cannot tell how far the moisture has spread. If you are unsure, a quick call is better than waiting. If anyone in the home is elderly, has asthma, or is otherwise sensitive to mold, treat it as more urgent.</p>
`;
    const marker = '<h2>Our Arizona Monsoon Response Protocol</h2>';
    if (m.bodyHtml.includes(marker)) { m.bodyHtml = m.bodyHtml.replace(marker, NEW + marker); bump('monsoon: customer-guidance sections added (3)'); }
    else console.warn('WARN: monsoon protocol heading not found; sections not inserted');
  }
}


/* ---- County hubs: keyword-stuffed "neighborhood" list items -> plain neighborhood names ---- */
const NAME_FIX = {
  'Rainbow Acres AZ': 'Rainbow Acres', 'Desert Hills AZ': 'Desert Hills', 'The Highlands Wickenburg': 'The Highlands',
  'Saguaro Estates Wickenburg': 'Saguaro Estates', 'Rincon Valley Vail AZ': 'Rincon Valley', 'Civano Vail': 'Civano',
  'Rita Ranch Vail area': 'Rita Ranch', 'Rancho Sahuarita nearby': 'Rancho Sahuarita', 'Mesquite Ranch Vail AZ': 'Mesquite Ranch',
  'Vail Unincorporated Pima County': 'Unincorporated Vail area',
};
const KW_PREFIX = /^(?:water damage|flood cleanup|water restoration|emergency water|flood repair) /i;
const KW_SUFFIX = / (?:water damage|water restoration|flood cleanup)$/i;
for (const slug of ['water-damage-maricopa-county-az', 'water-damage-pima-county-az']) {
  const p = g[slug]; if (!p) continue;
  p.bodyHtml = p.bodyHtml.replace(/<li>([^<]*?) — 60-minute emergency response guaranteed<\/li>/g, (_, raw) => {
    let name = raw.replace(KW_PREFIX, '').replace(KW_SUFFIX, '').trim();
    name = NAME_FIX[name] ?? name;
    bump('hub neighborhood list: keyword stuffing removed');
    return `<li>${name}</li>`;
  });
  p.bodyHtml = exact('hub neighborhood list: intro wording', p.bodyHtml,
    'serves every neighborhood and community across the county:', 'serves neighborhoods and communities across the county, including:');
}

/* ---- Site-wide ---- */
for (const p of data) {
  // community count is 23 everywhere else on the site
  for (const k of ['title', 'meta', 'h1', 'lead']) {
    p[k] = rx('stale "21 communities" -> 23', p[k] ?? '', /\b21([ \-]+(?:Arizona |AZ )?(?:communit|cit))/g, (_, r) => `23${r}`);
    p[k] = rx('stale "all 21" -> "all 23"', p[k], /\b([Aa]ll) 21\b/g, (_, a) => `${a} 23`);
  }
  eachText(p, (t) => {
    t = rx('stale "21 communities" -> 23', t, /\b21([ \-]+(?:Arizona |AZ )?(?:communit|cit))/g, (_, r) => `23${r}`);
    t = rx('stale "all 21" -> "all 23"', t, /\b([Aa]ll) 21\b/g, (_, a) => `${a} 23`);
    // comparative claims with no rating data behind them
    t = exact('unsupported "the top-rated, IICRC-certified"', t, 'the top-rated, IICRC-certified', 'an IICRC-certified');
    t = exact('unsupported "a top-rated, veteran-owned"', t, 'a top-rated, veteran-owned', 'a veteran-owned');
    t = exact('unsupported "top-rated," (other)', t, 'top-rated, ', '');
    t = exact('unsupported "The Best … Company Near" heading', t, 'The Best Water Damage Restoration Company Near', 'Water Damage Restoration Near');
    return t;
  });
  // numbered step lists left over from the source document (e.g. "15. 16. 17.") -> start at 1
  const re = /<p>(<strong>)?(\d{1,2})\. /g;
  const found = [...p.bodyHtml.matchAll(re)].map((x) => ({ i: x.index, n: +x[2], len: x[0].length, strong: x[1] ?? '' }));
  const runs = []; let cur = [];
  for (const f of found) { if (cur.length && f.n === cur[cur.length - 1].n + 1) cur.push(f); else { if (cur.length) runs.push(cur); cur = [f]; } }
  if (cur.length) runs.push(cur);
  const edits = [];
  for (const run of runs) if (run.length >= 2 && run[0].n !== 1) run.forEach((f, idx) => edits.push({ ...f, to: idx + 1 }));
  if (edits.length) {
    let out = p.bodyHtml;
    for (const e of edits.sort((a, b) => b.i - a.i)) out = out.slice(0, e.i) + `<p>${e.strong}${e.to}. ` + out.slice(e.i + e.len);
    p.bodyHtml = out; bump('renumbered step-list items to start at 1', edits.length);
  }
}

console.log(`${DRY ? 'DRY RUN' : 'Done'}: ${FILE}`);
for (const [k, v] of [...stats].sort()) console.log(`  ${String(v).padStart(4)}  ${k}`);
if (!stats.size) console.log('  (no changes)');
if (!DRY) fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
