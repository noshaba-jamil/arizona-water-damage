import fs from 'node:fs';
export const A = JSON.parse(fs.readFileSync('/home/claude/audit.json', 'utf8')), BA = JSON.parse(fs.readFileSync('/home/claude/browser-audit.json', 'utf8'));
export const RM = JSON.parse(fs.readFileSync('/home/claude/regress-matrix.json', 'utf8')), RI = JSON.parse(fs.readFileSync('/home/claude/regress-interact.json', 'utf8'));
export const J = JSON.parse(fs.readFileSync('/home/claude/proj/nextjs-site/content/pages.json', 'utf8')); export const P = A.pages, X = A.extras;
export const DOM = 'https://waterdamagerestoration-arizona.com'; export const SITE_PHONE = '(928) 267-9292';
const jOf = (p) => J.find((x) => '/' + x.dir + '/' + x.slug === p.path);
export const kind = (p) => p.path === '/' ? 'home' : /^\/services\/./.test(p.path) ? 'service' : /^\/service-areas\/./.test(p.path) ? (jOf(p)?.category === 'county' ? 'county' : 'city') : /^\/blog\/./.test(p.path) ? 'blog' : 'static';
export const words = (h) => h.replace(/<[^>]+>/g, ' ').split(/\s+/).filter(Boolean).length;
export const norm = (s) => s.replace(/<[^>]+>/g, '').toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
export const has = (text, kw) => { const t = norm(text); return kw.every((w) => t.includes(w)); };
export const ofKind = (...k) => P.filter((p) => k.includes(kind(p)));
export const SVC_KW = { 'emergency-water-damage-arizona': ['emergency', 'water', 'damage'], 'monsoon-flood-damage-arizona': ['monsoon', 'flood'], 'mold-remediation-arizona': ['mold', 'remediation'], 'flood-cleanup-arizona': ['flood', 'cleanup'], 'sewage-backup-cleanup-arizona': ['sewage', 'backup'], 'commercial-water-damage-arizona': ['commercial', 'water', 'damage'], 'burst-pipe-water-damage-arizona': ['burst', 'pipe'], 'water-damage-insurance-claim-arizona': ['insurance', 'claim'], 'ceiling-water-damage-arizona': ['ceiling', 'water', 'damage'], 'water-removal-arizona': ['water', 'removal'], 'structural-drying-dehumidification-arizona': ['structural', 'drying'] };
export const place = (p) => (p.path.split('/').pop() || '').replace(/^water-damage-/, '').replace(/-az$/, '').replace(/-/g, ' ');
export const kwOf = (p) => kind(p) === 'service' ? SVC_KW[p.path.split('/').pop()] : ['water', 'damage', ...place(p).split(' ')];
export const kwText = (p) => kwOf(p)?.join(' ');
const inb = Object.fromEntries(P.map((p) => [p.path, new Set()])); const paths = new Set(P.map((p) => p.path));
for (const p of P) for (const a of p.anchors) { const t = a.href.split('#')[0].split('?')[0].replace(/\/$/, '') || '/'; if (paths.has(t) && t !== p.path) inb[t].add(p.path); }
export const inbound = inb; export const pathOf = (h) => h.split('#')[0].split('?')[0].replace(/\/$/, '') || '/';
const links = (p, re) => new Set(p.anchors.map((a) => pathOf(a.href)).filter((h) => re.test(h)));
export const svcLinks = (p) => links(p, /^\/services\/./), areaLinks = (p) => links(p, /^\/service-areas\/./), blogLinks = (p) => links(p, /^\/blog\/./);
export const R = (cond, pass, fail, lvl = 'NEEDS') => ({ s: cond ? 'PASS' : lvl, n: cond ? pass : fail });
export const NA = (n) => ({ s: 'N/A', n });
const cnt = (arr, f) => arr.filter(f).length; export { cnt };
const sh = (html) => { const w = html.replace(/<[^>]+>/g, ' ').toLowerCase().replace(/[^a-z0-9 ]+/g, ' ').split(/\s+/).filter(Boolean); const s = new Set(); for (let i = 0; i + 6 <= w.length; i++) s.add(w.slice(i, i + 6).join(' ')); return s; };
export function maxOverlap(cat) { const ps = J.filter((p) => p.category === cat).map((p) => ({ slug: p.slug, s: sh(p.bodyHtml) })); let m = [0, '']; for (let i = 0; i < ps.length; i++) for (let j = i + 1; j < ps.length; j++) { let n = 0; for (const x of ps[i].s) if (ps[j].s.has(x)) n++; const v = n / Math.min(ps[i].s.size, ps[j].s.size); if (v > m[0]) m = [v, `${ps[i].slug} ↔ ${ps[j].slug}`]; } return m; }
export const jac = (a, b) => { const x = new Set(norm(a).split(' ')), y = new Set(norm(b).split(' ')); let i = 0; for (const t of x) if (y.has(t)) i++; return i / (x.size + y.size - i); };
export const uWords = (p) => words(jOf(p)?.bodyHtml ?? '');
export { jOf };
