import json, time, urllib.request, re, sys
from playwright.sync_api import sync_playwright
BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:4020'; MOCK = 'http://localhost:4010'
mock = lambda p: urllib.request.urlopen(MOCK + p).read().decode()
sm = urllib.request.urlopen(BASE + '/sitemap.xml').read().decode()
ALL = [re.sub(r'^https?://[^/]+', '', u) or '/' for u in re.findall(r'<loc>([^<]+)</loc>', sm)] + ['/no-such-page']
REP = ['/', '/services', '/services/monsoon-flood-damage-arizona', '/services/flood-cleanup-arizona', '/service-areas', '/service-areas/water-damage-wickenburg-az', '/service-areas/water-damage-maricopa-county-az', '/service-areas/water-damage-vail-az', '/blog', '/blog/arizona-monsoon-water-damage-guide', '/about', '/contact', '/faq', '/privacy-policy', '/terms', '/no-such-page']
MODE = sys.argv[2] if len(sys.argv) > 2 else 'all'
WIDTHS = [1920, 1440, 1366, 1280, 1024, 768, 480, 430, 414, 390, 375, 360]
R = {'checks': [], 'matrix': {}}
def ok(name, cond, detail=''): R['checks'].append({'name': name, 'ok': bool(cond), 'detail': str(detail)[:160]}); print(('PASS ' if cond else 'FAIL ') + name + ('' if cond else '  ' + str(detail)[:140]))
JS = """()=>{const vw=document.documentElement.clientWidth,o={ov:document.documentElement.scrollWidth>vw+1,edge:0,tap:0};const skip=e=>e.closest('.sr-only,.hp-field,.skip-link,script,style,[aria-hidden="true"]');
for(const el of document.querySelectorAll('body *')){const cs=getComputedStyle(el);if(cs.display==='none'||cs.visibility==='hidden')continue;const r=el.getBoundingClientRect();if(!r.width||!r.height||skip(el))continue;
if(r.right>vw+1&&cs.position!=='fixed'){let p=el,c=false;while((p=p.parentElement)){const x=getComputedStyle(p).overflowX;if((x==='hidden'||x==='auto'||x==='scroll')&&p.getBoundingClientRect().right<=vw+1){c=true;break}}if(!c)o.edge++}
if(/^(BUTTON|INPUT|SELECT|TEXTAREA)$/.test(el.tagName)||el.classList.contains('btn')){if(el.type!=='hidden'&&r.height<38)o.tap++}}return o}"""
with sync_playwright() as p:
    b = p.chromium.launch(); bad = []; n = 0
    if MODE in ('matrix', 'all'):
        jobs = [(w, path) for w in WIDTHS for path in REP] + [(w, path) for w in (360, 1440) for path in ALL if path not in REP]
        for w in sorted({j[0] for j in jobs}):
            pg = b.new_context(viewport={'width': w, 'height': 900}).new_page()
            for path in [j[1] for j in jobs if j[0] == w]:
                n += 1; pg.goto(BASE + path, wait_until='domcontentloaded'); pg.wait_for_load_state('load'); r = pg.evaluate(JS)
                if r['ov'] or r['edge'] or (r['tap'] and w <= 480): bad.append((w, path, r))
            pg.context.close()
        R['matrix'] = {'checks': n, 'widths': len(WIDTHS), 'pages': len(ALL), 'issues': len(bad)}
        ok(f'responsive: {len(WIDTHS)} widths x {len(REP)} page types + all {len(ALL)} pages at 360px and 1440px ({n} loads): no overflow / past-edge / small tap targets', not bad, bad[:2])
    if MODE == 'matrix': json.dump(R, open('/home/claude/regress-matrix.json', 'w')); print(f"\n{sum(c['ok'] for c in R['checks'])}/{len(R['checks'])} passed"); b.close(); raise SystemExit
    for w in [360, 390, 430, 768]:
        pg = b.new_context(viewport={'width': w, 'height': 800}).new_page(); pg.goto(BASE + '/', wait_until='networkidle')
        pg.click('button.mobile-toggle'); pg.wait_for_timeout(200); opened = pg.is_visible('.mobile-menu') and pg.get_attribute('button.mobile-toggle', 'aria-expanded') == 'true'
        pg.keyboard.press('Escape'); pg.wait_for_timeout(150); closed = not pg.is_visible('.mobile-menu')
        pg.click('button.mobile-toggle'); pg.locator('.mobile-menu a:has-text("About Us")').first.click(); pg.wait_for_url('**/about'); navd = pg.url.endswith('/about') and not pg.is_visible('.mobile-menu')
        ok(f'mobile menu @{w}px: opens (aria-expanded), Escape closes, link navigates', opened and closed and navd, (opened, closed, navd)); pg.context.close()
    d = b.new_context(viewport={'width': 1280, 'height': 800}).new_page(); d.goto(BASE + '/faq', wait_until='networkidle'); d.keyboard.press('Tab')
    ok('keyboard: first Tab stop is the skip link', 'skip-link' in d.evaluate("document.activeElement.className")); d.wait_for_timeout(300); d.keyboard.press('Enter'); d.wait_for_timeout(150)
    ok('keyboard: skip link moves focus to <main>', d.evaluate('document.activeElement.id') == 'main')
    d.goto(BASE + '/', wait_until='networkidle'); d.focus('nav.main-nav .has-dropdown > a'); d.wait_for_timeout(250)
    ok('keyboard: desktop Services dropdown opens on focus', d.is_visible('nav.main-nav .has-dropdown .dropdown'))
    pg = b.new_context(viewport={'width': 1280, 'height': 900}).new_page(); RUN = str(int(time.time())); reqs = []; pg.on('request', lambda r: reqs.append(1) if '/api/contact' in r.url else None)
    def fill(tag):
        pg.fill('#name', 'Maria Lopez'); pg.fill('#phone', '(928) 555-' + RUN[-4:]); pg.fill('#email', 'maria@example.com'); pg.fill('#city', 'Wickenburg')
        pg.select_option('#type', 'Water Damage'); pg.select_option('#urgency', 'Emergency — Right Now'); pg.fill('#message', f'regress {tag} {RUN}')
    mock('/__mode?m=ok'); pg.goto(BASE + '/contact', wait_until='networkidle'); pg.wait_for_timeout(2000)
    pg.click('form.contact-form button[type=submit]'); pg.wait_for_timeout(200)
    ok('form: empty submit shows 5 inline errors and sends nothing', pg.locator('.field-error').count() == 5 and not reqs)
    fill('a'); pg.locator('form.contact-form button[type=submit]').dblclick(); pg.wait_for_selector('text=Your request has been received', timeout=8000)
    ok('form: valid submit shows success; double-click = 1 request, 1 email', len(reqs) == 1 and len(json.loads(mock('/__log'))) == 1, (len(reqs), mock('/__log')[:60]))
    pg.goto(BASE + '/contact', wait_until='networkidle'); pg.wait_for_timeout(2000); mock('/__mode?m=fail'); fill('b'); pg.click('form.contact-form button[type=submit]'); pg.wait_for_selector('.form-alert', timeout=8000)
    ok('form: provider failure shows an error and never a success message', "couldn't submit" in pg.inner_text('.form-alert') and pg.locator('text=Your request has been received').count() == 0)
    b.close()
json.dump(R, open('/home/claude/regress-interact.json', 'w')); print(f"\n{sum(c['ok'] for c in R['checks'])}/{len(R['checks'])} passed")
