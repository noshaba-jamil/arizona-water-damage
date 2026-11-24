import json, glob
def add(slug, html):
    for f in sorted(glob.glob('/home/claude/proj/nextjs-site/content/expansions/*.json')):
        d = json.load(open(f))
        if slug in d:
            if html.strip()[:60] in d[slug]['html']: return 'already'
            d[slug]['html'] += '\n' + html.strip(); d[slug]['v'] = d[slug].get('v', 1) + 1
            json.dump(d, open(f, 'w'), indent=1, ensure_ascii=False); return 'ok'
    raise SystemExit('slug not found: ' + slug)
