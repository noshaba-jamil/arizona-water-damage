#!/usr/bin/env node
/**
 * scripts/expand-content.mjs — inserts the long-form sections in content/expansions/*.json into content/pages.json.
 * Each section group goes just before the page's FAQ block (or before the closing call-to-action if there is no FAQ).
 * Idempotent: a marker comment stops it adding the same group twice. Edit the JSON, change the "v" number, re-run to replace.
 *   node scripts/expand-content.mjs [--dry-run]
 */
import fs from 'node:fs'; import path from 'node:path';
const DRY = process.argv.includes('--dry-run');
const FILE = 'content/pages.json'; const dir = 'content/expansions';
const data = JSON.parse(fs.readFileSync(FILE, 'utf8')); const g = Object.fromEntries(data.map((p) => [p.slug, p]));
const words = (h) => h.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
let added = 0, pages = 0, missing = [];
for (const f of fs.readdirSync(dir).filter((x) => x.endsWith('.json')).sort()) {
  const ex = JSON.parse(fs.readFileSync(path.join(dir, f), 'utf8'));
  for (const [slug, spec] of Object.entries(ex)) {
    const p = g[slug]; if (!p) { missing.push(slug); continue; }
    const v = spec.v ?? 1; const open = `<!--exp:${v}-->`, close = '<!--/exp-->';
    // remove any earlier version of this group so edits replace rather than stack
    const before = words(p.bodyHtml);
    p.bodyHtml = p.bodyHtml.replace(/<!--exp:\d+-->[\s\S]*?<!--\/exp-->\n?/g, (m) => (m.startsWith(open) ? m : ''));
    if (p.bodyHtml.includes(open)) continue;
    const block = `${open}\n${spec.html.trim()}\n${close}\n`;
    const m = spec.before ? p.bodyHtml.match(new RegExp('<h2>' + spec.before.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'))) : p.bodyHtml.match(/<h2>[^<]*(?:FAQ|Frequently Asked|❓|\?)/);
    if (m) p.bodyHtml = p.bodyHtml.slice(0, m.index) + block + p.bodyHtml.slice(m.index);
    else { const c = p.bodyHtml.lastIndexOf('<div class="callout">'); p.bodyHtml = c > 0 ? p.bodyHtml.slice(0, c) + block + p.bodyHtml.slice(c) : p.bodyHtml + '\n' + block; }
    added += words(p.bodyHtml) - before; pages++;
  }
}
console.log(`${DRY ? 'DRY RUN' : 'Done'}: ${pages} page(s) expanded, +${added} words${missing.length ? ' | unknown slugs: ' + missing.join(',') : ''}`);
if (!DRY) fs.writeFileSync(FILE, JSON.stringify(data, null, 2));
