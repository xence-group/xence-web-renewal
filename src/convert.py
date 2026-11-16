import re, json, html as H, shutil, os, sys

SRC = '/home/claude/xweb/project'
OUT = '/home/claude/site_build/dist'
ASSETS = {}
for l in open('/tmp/idsha.txt'):
    pass
LOCAL = {}
loc = {}
for l in open('/tmp/local_hash.txt'):
    p = l.split(None, 1)
    if len(p) == 2: loc.setdefault(p[0], p[1].strip())
for l in open('/tmp/idsha.txt'):
    i, s = l.split()
    LOCAL[i] = loc[s]

import os.path
if os.path.exists('/tmp/extra_ids.txt'):
    for l in open('/tmp/extra_ids.txt'):
        if l.strip(): i, p = l.split(); LOCAL[i] = p
NAMES = {}
def asset_url(bid):
    if bid not in NAMES:
        src = LOCAL[bid]
        base = os.path.basename(src)
        name = base
        n = 2
        while name in NAMES.values():
            stem, ext = os.path.splitext(base); name = f'{stem}_{n}{ext}'; n += 1
        NAMES[bid] = name
        os.makedirs(OUT + '/assets', exist_ok=True)
        shutil.copy(src, OUT + '/assets/' + name)
    return '/assets/' + NAMES[bid]

SVG_CAMEL = ['strokeWidth','strokeLinecap','strokeLinejoin','vectorEffect','strokeDasharray','strokeDashoffset','fillOpacity','strokeOpacity','fontSize','fontWeight','fontFamily','textAnchor','dominantBaseline','stopColor','stopOpacity','clipPath','fillRule','clipRule','strokeMiterlimit']
VOID = ['img','input','br','hr','source','wbr','meta','link']

def convert(fname, lang, other_href, other_label):
    src = open(f'{SRC}/{fname}', encoding='utf-8').read()
    src = re.sub(r'/_blob/([0-9a-f]{32})', lambda m: asset_url(m.group(1)), src)
    title = re.search(r'<title>(.*?)</title>', src, re.S).group(1)
    xdc = re.search(r'<x-dc>(.*)</x-dc>', src, re.S).group(1)
    script = re.search(r'<script type="text/x-dc"[^>]*data-props=\'([^\']*)\'[^>]*>(.*?)</script>', src, re.S)
    props = {k: v.get('default') for k, v in json.loads(script.group(1)).items() if not k.startswith('$')}
    cls = script.group(2)
    # pull head-ish things out
    heads = re.findall(r'<link[^>]*>|<style>.*?</style>', xdc, re.S)
    for h in heads: xdc = xdc.replace(h, '')
    heads = [h.replace('{{accent}}', props['accent']) for h in heads]
    xdc = re.sub(r'<!--.*?-->', '', xdc, flags=re.S)
    # language switch
    pass
    # attributes
    xdc = re.sub(r'\s+hint-placeholder-[a-z]+="[^"]*"', '', xdc)
    for a in SVG_CAMEL:
        kebab = re.sub(r'([A-Z])', lambda m: '-' + m.group(1).lower(), a)
        xdc = re.sub(r'(\s)' + a + '=', r'\1' + kebab + '=', xdc)
    xdc = re.sub(r'(<input[^>]*type="range"[^>]*?)onChange=', r'\1onInput=', xdc)
    xdc = re.sub(r'<(' + '|'.join(VOID) + r')(\s[^>]*?)?\s*/?>', lambda m: f'<{m.group(1)}{m.group(2) or ""} />', xdc)
    # tokenize
    tok = re.compile(r'<sc-for list="\{\{([^}]*)\}\}" as="(\w+)"[^>]*>|</sc-for>|<sc-if value="\{\{([^}]*)\}\}"[^>]*>|</sc-if>|\{\{([^}]*)\}\}')
    stack = []
    def R(e):
        e = e.strip()
        if e in ('true', 'false'): return e
        root = e.split('.')[0]
        return e if root in stack else 'V.' + e
    def esc(s):
        s = s.replace('&lt;', '\x00LT\x00').replace('&gt;', '\x00GT\x00')
        s = H.unescape(s)
        s = s.replace('\\', '\\\\').replace('`', '\\`').replace('${', '\\${')
        return s.replace('\x00LT\x00', "${'<'}").replace('\x00GT\x00', "${'>'}")
    out = []; pos = 0
    for m in tok.finditer(xdc):
        out.append(esc(xdc[pos:m.start()])); pos = m.end()
        t = m.group(0)
        if m.group(1) is not None:
            out.append('${(' + R(m.group(1)) + ' || []).map((' + m.group(2) + ') => html`'); stack.append(m.group(2))
        elif t == '</sc-for>':
            out.append('`)}'); stack.pop()
        elif m.group(3) is not None:
            out.append('${' + R(m.group(3)) + ' ? html`')
        elif t == '</sc-if>':
            out.append('` : null}')
        else:
            out.append('${' + R(m.group(4)) + '}')
    out.append(esc(xdc[pos:]))
    tpl = ''.join(out).strip()
    assert not stack
    cls = cls.replace('class Component extends DCLogic', 'class App extends PC')
    js = f'''import {{ h, render, Component as PC }} from '/vendor/preact.module.js';
import htm from '/vendor/htm.module.js';
const html = htm.bind(h);
{cls}
App.prototype.render = function () {{ const V = this.renderVals(); return html`{tpl}`; }};
render(h(App, {json.dumps(props)}), document.getElementById('app'));
'''
    page = f'''<!doctype html>
<html lang="{lang}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>{title}</title>
<link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
{chr(10).join(heads)}
<style>html,body{{margin:0;background:#000}}html{{scroll-behavior:smooth}}</style>
</head>
<body>
<div id="app"></div>
<script type="module" src="{'/app.js' if lang == 'ja' else '/en/app.js'}"></script>
</body>
</html>
'''
    d = OUT if lang == 'ja' else OUT + '/en'
    os.makedirs(d, exist_ok=True)
    open(d + '/index.html', 'w', encoding='utf-8').write(page)
    open(d + '/app.js', 'w', encoding='utf-8').write(js)

if os.path.exists(OUT): shutil.rmtree(OUT)
os.makedirs(OUT + '/vendor')
shutil.copy('/home/claude/site_build/preact/dist/preact.module.js', OUT + '/vendor/')
shutil.copy('/home/claude/site_build/htm/dist/htm.module.js', OUT + '/vendor/')
convert('Main.dc.html', 'ja', '/en/', 'EN')
convert('MainEN.dc.html', 'en', '/', 'JA')
open(OUT + '/netlify.toml', 'w').write('''[[headers]]
  for = "/assets/*"
  [headers.values]
    Cache-Control = "public, max-age=31536000"
''')
print('ok', len(NAMES))
