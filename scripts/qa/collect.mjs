import fs from 'node:fs';
const B = process.env.BASE || 'http://localhost:4050', OUT = process.env.OUT || '/home/claude/audit.json';
const text = (s) => s.replace(/<script[\s\S]*?<\/script>|<style[\s\S]*?<\/style>/g, ' ').replace(/<[^>]+>/g, ' ').replace(/&[a-z#0-9]+;/gi, ' ').replace(/\s+/g, ' ').trim();
const attr = (t, n) => (t.match(new RegExp(n + '="([^"]*)"')) || [])[1];
const norm = (x) => x.toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const sm = await (await fetch(B + '/sitemap.xml')).text();
const urls = [...sm.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1]);
const out = { sitemap: sm, pages: [], extras: {} };
for (const u of urls) {
  const path = new URL(u).pathname; const r = await fetch(B + path, { redirect: 'manual', headers: { 'Accept-Encoding': 'gzip' } });
  const html = await r.text(); const ms = [...html.matchAll(/<meta\s[^>]*>/g)].map((m) => m[0]);
  const meta = (k, v) => { const t = ms.find((x) => attr(x, k) === v); return t ? attr(t, 'content') : undefined; };
  const ld = [...html.matchAll(/<script type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)].map((m) => { try { return JSON.parse(m[1]); } catch { return { __invalid: true }; } });
  const mainHtml = (html.match(/<main[\s\S]*?<\/main>/) || [html])[0]; const vis = norm(text(html));
  const fq = ld.filter((j) => [].concat(j['@type']).includes('FAQPage')).flatMap((j) => j.mainEntity ?? []);
  const heads = [...html.matchAll(/<h([1-6])[^>]*>([\s\S]*?)<\/h\1>/g)].map((m) => ({ l: +m[1], t: text(m[2]) }));
  const idList = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]); const dupIds = idList.filter((x, i) => idList.indexOf(x) !== i);
  const vtext = text(html); const aTags = [...html.matchAll(/<a\s[^>]*>[\s\S]*?<\/a>/g)].map((m) => m[0]);
  const emptyAnchors = aTags.filter((a) => !text(a) && !/aria-label="[^"]+"/.test(a)).length;
  const phones = [...new Set([...vtext.matchAll(/\(?\b\d{3}\)?[ .-]\d{3}[ -.]\d{4}\b/g)].map((m) => m[0]))];
  const emails = [...new Set([...html.matchAll(/[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,}/g)].map((m) => m[0].toLowerCase()))];
  const addr = [...new Set([...vtext.matchAll(/\d{2,5} [NSEW]\.? [A-Z][a-z]+ [A-Za-z]+(?:, [A-Za-z ]+, [A-Z]{2} \d{5})?/g)].map((m) => m[0]))];
  const httpRefs = (html.match(/(?:src|href|action)="http:\/\//g) || []).length; const tels = (html.match(/href="tel:/g) || []).length;
  const mailtos = [...html.matchAll(/href="mailto:([^"]+)"/g)].map((m) => m[1]);
  out.pages.push({ dupIds, emptyAnchors, phones, emails, addr, httpRefs, tels, mailtos, path, url: u, status: r.status, bytes: Buffer.byteLength(html), enc: r.headers.get('content-encoding'), cache: r.headers.get('cache-control'), xrobots: r.headers.get('x-robots-tag'),
    lang: (html.match(/<html[^>]*lang="([^"]*)"/) || [])[1], viewport: meta('name', 'viewport'), title: (html.match(/<title>([\s\S]*?)<\/title>/) || [])[1], desc: meta('name', 'description'), robots: meta('name', 'robots'),
    canonical: [...html.matchAll(/<link rel="canonical" href="([^"]*)"/g)].map((m) => m[1]),
    og: Object.fromEntries(ms.filter((x) => /property="og:/.test(x)).map((x) => [attr(x, 'property'), attr(x, 'content')])), tw: Object.fromEntries(ms.filter((x) => /name="twitter:/.test(x)).map((x) => [attr(x, 'name'), attr(x, 'content')])),
    heads, mainWords: text(mainHtml).split(' ').length, imgs: [...html.matchAll(/<img\s[^>]*>/g)].map((m) => m[0]),
    landmarks: { main: (html.match(/<main[ >]/g) || []).length, header: (html.match(/<header[ >]/g) || []).length, nav: (html.match(/<nav[ >]/g) || []).length, footer: (html.match(/<footer[ >]/g) || []).length, article: (html.match(/<article[ >]/g) || []).length, skip: /class="skip-link"/.test(html) },
    forms: [...html.matchAll(/<form[\s\S]*?<\/form>/g)].map((m) => m[0]).length, icons: [...html.matchAll(/<link rel="(?:icon|apple-touch-icon|shortcut icon)"[^>]*>/g)].length,
    anchors: [...html.matchAll(/<a\s[^>]*href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/g)].map((m) => ({ href: m[1], text: text(m[2]) })),
    ldTypes: ld.map((j) => j.__invalid ? 'INVALID' : (j['@type'] ?? '?')), ld, faqParity: fq.length ? { total: fq.length, found: fq.filter((q) => vis.includes(norm(q.name))).length } : null });
}
const head = async (p, init = {}) => { const r = await fetch(B + p, { redirect: 'manual', ...init }); return { status: r.status, loc: r.headers.get('location'), ctype: r.headers.get('content-type'), body: init.method === 'HEAD' ? '' : (await r.text()).slice(0, 3000), h: Object.fromEntries(r.headers.entries()) }; };
for (const [k, p] of Object.entries({ trailingSlash: '/services/flood-cleanup-arizona/', upper: '/SERVICES/flood-cleanup-arizona', indexhtml: '/index.html', notFound: '/this-page-does-not-exist', notFoundDeep: '/services/not-a-service', apiGet: '/api/contact', robots: '/robots.txt', favicon: '/favicon.ico', icon: '/icon', appleIcon: '/apple-icon', ogImage: '/opengraph-image', twImage: '/twitter-image', home: '/' })) out.extras[k] = await head(p);
fs.writeFileSync(OUT, JSON.stringify(out)); console.log('collected', out.pages.length, 'pages');
