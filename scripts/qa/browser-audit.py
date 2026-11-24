import json, sys
from playwright.sync_api import sync_playwright
BASE = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:4050'
sm = __import__('urllib.request').request.urlopen(BASE + '/sitemap.xml').read().decode()
import re; paths = [re.sub(r'^https?://[^/]+', '', u) or '/' for u in re.findall(r'<loc>([^<]+)</loc>', sm)]
CONTRAST = r"""() => {
 const parse=c=>{const m=c.match(/rgba?\(([^)]+)\)/);if(!m)return null;const p=m[1].split(',').map(parseFloat);return{r:p[0],g:p[1],b:p[2],a:p.length>3?p[3]:1}};
 const lum=({r,g,b})=>{const f=v=>{v/=255;return v<=0.03928?v/12.92:Math.pow((v+0.055)/1.055,2.4)};return 0.2126*f(r)+0.7152*f(g)+0.0722*f(b)};
 const blend=(f,b)=>({r:f.r*f.a+b.r*(1-f.a),g:f.g*f.a+b.g*(1-f.a),b:f.b*f.a+b.b*(1-f.a),a:1});
 const bgOf=el=>{const L=[];let e=el;while(e&&e!==document.documentElement){const cs=getComputedStyle(e);const bg=parse(cs.backgroundColor);if(bg&&bg.a>0){L.push(bg);if(bg.a>=1)break}const bi=cs.backgroundImage;if(bi&&bi!=='none'){const cols=[...bi.matchAll(/rgba?\([^)]+\)/g)].map(m=>parse(m[0])).filter(Boolean);if(cols.length){const a={r:0,g:0,b:0,a:1};cols.forEach(c=>{a.r+=c.r;a.g+=c.g;a.b+=c.b});a.r/=cols.length;a.g/=cols.length;a.b/=cols.length;L.push(a);break}}e=e.parentElement}let base={r:255,g:255,b:255,a:1};for(let i=L.length-1;i>=0;i--)base=blend(L[i],base);return base};
 const out={};
 for(const el of document.querySelectorAll('body *')){if(el.closest('.sr-only,.hp-field,.skip-link,script,style,svg'))continue;const cs=getComputedStyle(el);if(cs.display==='none'||cs.visibility==='hidden'||+cs.opacity===0)continue;
  if(![...el.childNodes].some(n=>n.nodeType===3&&n.textContent.trim().length>1))continue;const r=el.getBoundingClientRect();if(!r.width||!r.height)continue;
  const fg=parse(cs.color);if(!fg)continue;const bg=bgOf(el);const f=blend(fg,bg);const L1=lum(f),L2=lum(bg);const ratio=(Math.max(L1,L2)+0.05)/(Math.min(L1,L2)+0.05);
  const px=parseFloat(cs.fontSize),bold=parseInt(cs.fontWeight)>=700;const large=px>=24||(px>=18.66&&bold);const need=large?3:4.5;
  if(ratio<need){const k=el.tagName+'.'+(el.className||'').toString().split(' ')[0]+' '+cs.color+' on bg';(out[k]??={ratio:+ratio.toFixed(2),need,count:0,sample:el.textContent.trim().slice(0,40)}).count++}}
 return out}"""
INIT = """window.__m={lcp:0,cls:0};new PerformanceObserver(l=>{for(const e of l.getEntries())window.__m.lcp=e.startTime}).observe({type:'largest-contentful-paint',buffered:true});new PerformanceObserver(l=>{for(const e of l.getEntries())if(!e.hadRecentInput)window.__m.cls+=e.value}).observe({type:'layout-shift',buffered:true});"""
res = {'console': {}, 'contrast': {}, 'vitals': {}, 'failedReq': {}}
with sync_playwright() as p:
    b = p.chromium.launch()
    ctx = b.new_context(viewport={'width': 1280, 'height': 900}); pg = ctx.new_page(); cur = ['']
    pg.on('console', lambda m: res['console'].setdefault(cur[0], []).append(m.text[:140]) if m.type == 'error' else None)
    pg.on('pageerror', lambda e: res['console'].setdefault(cur[0], []).append('PAGEERROR ' + str(e)[:140]))
    pg.on('requestfailed', lambda r: res['failedReq'].setdefault(cur[0], []).append(r.url[:100]))
    for path in paths:
        cur[0] = path; pg.goto(BASE + path, wait_until='networkidle'); pg.wait_for_timeout(150)
        for k, v in pg.evaluate(CONTRAST).items():
            e = res['contrast'].setdefault(k, {**v, 'count': 0, 'pages': []}); e['count'] += v['count']; e['ratio'] = min(e['ratio'], v['ratio'])
            if len(e['pages']) < 3: e['pages'].append(path)
    ctx.close()
    for path in ['/', '/services/flood-cleanup-arizona', '/service-areas/water-damage-wickenburg-az', '/service-areas', '/contact', '/faq', '/blog', '/about']:
        c = b.new_context(viewport={'width': 375, 'height': 812}, device_scale_factor=2); q = c.new_page(); q.add_init_script(INIT)
        q.goto(BASE + path, wait_until='networkidle'); q.wait_for_timeout(600); m = q.evaluate('window.__m')
        res['vitals'][path] = {'lcp_ms': round(m['lcp']), 'cls': round(m['cls'], 4)}; c.close()
    b.close()
json.dump(res, open('/home/claude/browser-audit.json', 'w'))
print('pages', len(paths), '| console-error pages:', len(res['console']), '| contrast groups failing:', len(res['contrast']))
for k, v in sorted(res['contrast'].items(), key=lambda kv: kv[1]['ratio'])[:14]: print(f"  {v['ratio']:5} (need {v['need']}) x{v['count']:3} {k}  e.g. '{v['sample']}'  {v['pages'][0]}")
print('vitals (lab, mobile 375px, no throttling):', json.dumps(res['vitals']))
print('console errors:', {k: v[:2] for k, v in res['console'].items()})
