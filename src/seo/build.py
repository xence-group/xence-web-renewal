#!/usr/bin/env python3
"""Generate the crawler-facing layer of xencegroup.com (no visual change).

- <head> meta: description, canonical, hreflang, Open Graph, JSON-LD
- a static, semantic copy of each page's text inside #app (hidden once JS runs,
  removed by app.js before Preact renders) so crawlers that do not run JS can read it
- robots.txt, sitemap.xml, llms.txt, llms-full.txt

Run from the repo root:  python3 src/seo/build.py
Refresh the page outlines first if the visible copy changed:
  python3 -m http.server 8790 &  node src/seo/outline.mjs   (writes src/seo/outline_*.json)
"""
import html, json, re, subprocess, datetime, pathlib

ROOT = pathlib.Path(__file__).resolve().parents[2]
SITE = 'https://xencegroup.com'
TODAY = datetime.date.today().isoformat()
E = lambda s: html.escape(str(s), quote=True)

# ---------------------------------------------------------------- facts
ORG = {
    'name': 'XENCE',
    'legal_ja': '株式会社XENCE', 'legal_en': 'XENCE Inc.',
    'kana': 'ぜんす',
    'founded': '2022-01-28',
    'corp_no': '1180003023459',
    'email': 'info@xencegroup.com',
    'postal': '460-0008', 'region': '愛知県', 'locality': '名古屋市中区',
    'street': '栄一丁目29番地29号 SIMON 10 SAKAE 401',
    'street_en': 'SIMON 10 SAKAE 401, 1-29-29 Sakae, Naka-ku',
    'founder_ja': '小澤巧太郎', 'founder_en': 'Kotaro Ozawa',
    'office_reg': '一級建築士事務所 愛知県知事登録（い－4）第14198号',
    'instagram': 'https://www.instagram.com/xence_architecture_studio/',
}
AWARDS = ['Red Dot Award 2026 (Urban Design) — Circular Timber Greenhouse™',
          'Good Design Award 2025', 'Japan Wood Design Award 2025', 'Nagoya University Venture (certified 2026)']
DESC = {
    'ja': 'XENCE（ゼンス／株式会社XENCE）は名古屋大学発のサーキュラー建築スタートアップ。端材・大径木・解体材など規格外の木材を、自動設計・3D構造解析・デジタル加工・金属3Dプリントのジョイントで建築に変え、設計・施工・指定管理（運営）とMaterial Passport・LCAまでひとつのデータでつなぐ一級建築士事務所。サーキュラー木造温室™はRed Dot Award 2026受賞。名古屋を拠点とする。',
    'en': 'XENCE is a Nagoya University venture and licensed architecture practice that turns non-standard timber — sawmill offcuts, large-diameter logs, demolition wood — into architecture using computational design, 3D structural analysis, digital fabrication and metal 3D-printed joints, and links design, construction, operation, Material Passports and LCA in one stream of data. Its Circular Timber Greenhouse™ won a Red Dot Award 2026. Based in Nagoya, Japan.',
}
TITLE = {'ja': 'XENCE — あらゆる素材を建築に。', 'en': 'XENCE — Waste in. Assets out.'}
KNOWS = ['circular construction', 'timber architecture', 'non-standard timber', 'sawmill offcuts', 'large-diameter logs',
         'computational design', 'parametric design', 'structural analysis', 'digital fabrication', 'WAAM metal 3D printing',
         'timber joints', 'greenhouse design and construction', 'modular architecture', 'material passport', 'digital product passport',
         'life cycle assessment (LCA)', 'J-CAT', 'whole-life carbon', 'facility management', 'circular economy',
         'サーキュラーエコノミー', '木造温室', '未利用材', '大径木', '耳材', '金属3Dプリント', 'マテリアルパスポート', 'ファシリティマネジメント']

def jsonld(lang):
    url = SITE + ('/' if lang == 'ja' else '/en/')
    org = {
        '@type': ['Organization', 'ProfessionalService'], '@id': SITE + '/#org',
        'name': 'XENCE', 'legalName': ORG['legal_ja'], 'alternateName': ['株式会社XENCE', 'XENCE Inc.', 'ゼンス', 'ぜんす', 'XENCE（ゼンス）', '株式会社XENCE（ゼンス）', 'XENCE Architecture Studio', 'XENCE Engineering'],
        'url': SITE + '/', 'logo': SITE + '/assets/logo_xence_2026.png', 'image': SITE + '/assets/poster_d_v3.jpg',
        'description': DESC[lang], 'foundingDate': ORG['founded'], 'email': ORG['email'],
        'identifier': {'@type': 'PropertyValue', 'propertyID': '法人番号 (Japan Corporate Number)', 'value': ORG['corp_no']},
        'address': {'@type': 'PostalAddress', 'postalCode': ORG['postal'], 'addressRegion': ORG['region'], 'addressLocality': ORG['locality'],
                    'streetAddress': ORG['street'], 'addressCountry': 'JP'},
        'location': [{'@type': 'Place', 'name': 'Nagoya, Japan'}],
        'areaServed': ['JP', 'EU'],
        'founder': {'@id': SITE + '/#founder'},
        'award': AWARDS, 'knowsAbout': KNOWS, 'sameAs': [ORG['instagram'], 'https://www.instagram.com/xence.engineering/', 'https://prtimes.jp/main/html/searchrlp/company_id/123873'],
        'contactPoint': {'@type': 'ContactPoint', 'contactType': 'sales', 'email': ORG['email'], 'url': SITE + ('/contact/' if lang == 'ja' else '/en/contact/'), 'availableLanguage': ['ja', 'en']},
        'hasOfferCatalog': {'@type': 'OfferCatalog', 'name': 'Services', 'itemListElement': [
            {'@type': 'Offer', 'itemOffered': {'@type': 'Service', 'name': n}} for n in (
                ['建築設計（一級建築士事務所）', '施工', '施設の指定管理・ファシリティマネジメント', 'サーキュラー木造温室™の設計施工', '未利用材・規格外材の建築利用', 'LCA・ホールライフカーボン算定（J-CAT / One Click LCA）', 'Material Passport（木材トレーサビリティ）']
                if lang == 'ja' else
                ['Architectural design (licensed first-class architect office)', 'Construction', 'Facility operation and management', 'Circular Timber Greenhouse™ design & build', 'Building with non-standard and unused timber', 'LCA and whole-life carbon (J-CAT / One Click LCA)', 'Material Passport (timber traceability)'])]},
    }
    person = {'@type': 'Person', '@id': SITE + '/#founder', 'name': ORG['founder_en'], 'alternateName': ORG['founder_ja'],
              'jobTitle': 'Founder & CEO', 'worksFor': {'@id': SITE + '/#org'},
              'hasCredential': 'First-class registered architect (Japan)', 'alumniOf': 'The University of Tokyo',
              'sameAs': ['https://www.linkedin.com/in/ozawa-kotaro-7b8582162/', 'https://x.com/OzawaKotaro', 'https://www.instagram.com/kotaro_ozawa_/']}
    product = {'@type': 'Product', '@id': SITE + '/#greenhouse', 'name': 'Circular Timber Greenhouse™' if lang == 'en' else 'サーキュラー木造温室™',
               'brand': {'@id': SITE + '/#org'}, 'award': 'Red Dot Award 2026 (Urban Design)',
               'description': ('A timber greenhouse built from sawmill offcuts. Every member can be taken apart and reassembled, and units link together to scale; available in timber, hybrid and steel.'
                               if lang == 'en' else '製材所の端材を構造に使った木造温室。全部材を分解・再組立でき、連棟で面積を広げられる。木造・ハイブリッド・鉄骨から選べる。')}
    site = {'@type': 'WebSite', '@id': SITE + '/#website', 'url': SITE + '/', 'name': 'XENCE', 'inLanguage': ['ja', 'en'], 'publisher': {'@id': SITE + '/#org'}}
    page = {'@type': 'WebPage', '@id': url + '#page', 'url': url, 'name': TITLE[lang], 'description': DESC[lang], 'inLanguage': lang,
            'isPartOf': {'@id': SITE + '/#website'}, 'about': {'@id': SITE + '/#org'}, 'primaryImageOfPage': SITE + '/assets/poster_d_v3.jpg', 'dateModified': TODAY}
    return {'@context': 'https://schema.org', '@graph': [org, person, product, site, page]}

def head(lang, path, title, desc, extra_ld=None):
    alt_ja, alt_en = SITE + path.replace('/en/', '/', 1) if path.startswith('/en/') else SITE + path, SITE + (path if path.startswith('/en/') else '/en' + path)
    url = SITE + path
    ld = extra_ld or jsonld(lang)
    return '\n'.join([
        '<!--SEO:HEAD-->',
        f'<meta name="description" content="{E(desc)}">',
        '<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">',
        f'<link rel="canonical" href="{url}">',
        f'<link rel="alternate" hreflang="ja" href="{alt_ja}">',
        f'<link rel="alternate" hreflang="en" href="{alt_en}">',
        f'<link rel="alternate" hreflang="x-default" href="{alt_ja}">',
        '<link rel="alternate" type="text/plain" title="LLM summary" href="/llms.txt">',
        '<meta property="og:type" content="website">', '<meta property="og:site_name" content="XENCE">',
        f'<meta property="og:title" content="{E(title)}">', f'<meta property="og:description" content="{E(desc)}">',
        f'<meta property="og:url" content="{url}">', f'<meta property="og:image" content="{SITE}/assets/poster_d_v3.jpg">',
        '<meta property="og:image:width" content="1920">', '<meta property="og:image:height" content="1080">',
        f'<meta property="og:locale" content="{"ja_JP" if lang == "ja" else "en_US"}">',
        f'<meta property="og:locale:alternate" content="{"en_US" if lang == "ja" else "ja_JP"}">',
        '<meta name="twitter:card" content="summary_large_image">',
        '<meta name="theme-color" content="#000000">',
        '<script>document.documentElement.classList.add("js")</script>',
        '<style>.js #prerender{display:none!important}</style>',
        '<script type="application/ld+json">' + json.dumps(ld, ensure_ascii=False, separators=(',', ':')) + '</script>',
        '<!--/SEO:HEAD-->'])

SLUG = {'p1': 'circular-timber-greenhouse', 'p2': 'higashiura-greenhouse', 'p3': 'daikanyama-tsite-lantern-bench', 'p4': 'nagoya-university-ctecs-furniture',
        'p11': 'waam-3d-printed-bench', 'p12': 'woodnode', 'p7': 'large-diameter-timber-house', 'p8': 'wood-flour-resin-pellets',
        'p21': 'memu-open-research-campus', 'p22': 'nagoya-university-idea-stoa', 'p23': 'monomiyusan'}
CLEAN = lambda v: re.sub(r'\s*\[[^\]]*\]', '', v or '').strip()

def page_ld(lang, path, name, desc, kind='WebPage', extra=None):
    g = jsonld(lang)
    pg = g['@graph'][-1]; pg.update({'@type': kind, '@id': SITE + path + '#page', 'url': SITE + path, 'name': name, 'description': desc})
    if extra: g['@graph'].append(extra)
    return g

# ---------------------------------------------------------------- data from the app
def app_data(lang):
    s = (ROOT / ('app.js' if lang == 'ja' else 'en/app.js')).read_text()
    return json.loads(re.search(r'this\.D = (\{.*?\});\n', s).group(1))

def news_data():
    s = (ROOT / 'lib/news.js').read_text()
    fb = json.loads(re.search(r'export const FALLBACK = (\[.*?\]);\n', s, re.S).group(1))
    arch = json.loads(subprocess.check_output(['node', '--input-type=module', '-e',
        f"import {{ ARCHIVE }} from '{ROOT}/lib/news-archive.js'; console.log(JSON.stringify(ARCHIVE));"]))
    return fb, arch

def plain_body(md):
    md = re.sub(r'!\[[^\]]*\]\([^)]*\)', '', md)
    md = re.sub(r'\[youtube:[^\]]*\]', '', md)
    return re.sub(r'\n{3,}', '\n\n', md).strip()

# ---------------------------------------------------------------- static body
SKIP_SECTIONS = {'HEADER', 'FOOTER', 'configurator'}
def static_home(lang):
    D = app_data(lang)
    o = json.loads((ROOT / f'src/seo/outline_{lang}.json').read_text())
    fb, _ = news_data()
    out = [f'<article id="prerender" lang="{lang}">',
           f'<header><p><a href="{"/" if lang == "ja" else "/en/"}">XENCE</a> — {E(ORG["legal_ja"] if lang == "ja" else ORG["legal_en"])}</p>',
           '<nav><ul>' + ''.join(f'<li><a href="{h}">{t}</a></li>' for h, t in [
               ('#model', 'Model'), ('#technology', 'Technology'), ('#configurator', 'Configurator'), ('#projects', 'Projects'),
               ('#impact', 'Impact'), ('#growth', 'Investors'), ('/news/' if lang == 'ja' else '/en/news/', 'News'),
               ('/contact/' if lang == 'ja' else '/en/contact/', 'Contact'), ('/en/' if lang == 'ja' else '/', 'English' if lang == 'ja' else '日本語')]) + '</ul></nav></header>']
    for sec in o:
        sid = sec['id']
        if sid in SKIP_SECTIONS: continue
        out.append(f'<section id="s-{sid.lower()}">')
        if sid == 'technology':
            for it in sec['items']:
                if it['t'] in ('H2', 'P') and it['txt']: out.append(f'<{"h2" if it["t"] == "H2" else "p"}>{E(it["txt"])}</{"h2" if it["t"] == "H2" else "p"}>')
            for t in D['techs']:
                out.append(f'<h3>{E(t["num"])} {E(t["title"])} ({E(t["tag"])})</h3><p>{E(t["body"])}</p><p>{E(t["caption"])}</p>')
        elif sid == 'projects':
            out.append(f'<h2>{"プロジェクト" if lang == "ja" else "Projects"}</h2><ul>')
            for p in D['projects']:
                meta = ' / '.join(x for x in [p['type'], p['input'], p['tech'], p['place'], p['year'], p['status']] if x)
                out.append(f'<li><h3><a href="{"/en" if lang == "en" else ""}/projects/{SLUG[p["id"]]}/">{E(p["title"])}</a></h3><p>{E(CLEAN(meta))}</p><p>{E(CLEAN(p["desc"]))}</p></li>')
            out.append('</ul>')
        elif sid == 'news':
            out.append('<h2>News</h2><ul>')
            for n in fb:
                t = n['ja'] if lang == 'ja' else (n['en'] or n['ja'])
                href = ('/news/' if lang == 'ja' else '/en/news/') + '?id=' + n['id']
                out.append(f'<li><time>{E(n["date"])}</time> <a href="{href}">{E(t)}</a></li>')
            out.append('</ul>')
        else:
            seen = set()
            for it in sec['items']:
                txt = it['txt']
                if not txt or txt in seen or txt in ('●',): continue
                seen.add(txt)
                tag = {'H1': 'h1', 'H2': 'h2', 'H3': 'h3'}.get(it['t'], 'p')
                if it['t'] == 'A' and it['href'] and not it['href'].startswith('#'):
                    out.append(f'<p><a href="{E(it["href"])}">{E(txt)}</a></p>')
                elif it['t'] == 'IMG':
                    out.append(f'<p>{E(txt)}</p>') if sid in ('awards',) else None
                else:
                    out.append(f'<{tag}>{E(txt)}</{tag}>')
        out.append('</section>')
    # company facts
    if lang == 'ja':
        out.append('<section id="s-company"><h2>会社概要</h2><dl>'
                   f'<dt>社名</dt><dd>{ORG["legal_ja"]}（XENCE／ゼンス／ぜんす）</dd><dt>設立</dt><dd>2022年1月28日</dd>'
                   f'<dt>本社</dt><dd>〒{ORG["postal"]} {ORG["region"]}{ORG["locality"]}{ORG["street"]}</dd><dt>拠点</dt><dd>名古屋（愛知県）</dd>'
                   f'<dt>代表</dt><dd>代表取締役CEO {ORG["founder_ja"]}（一級建築士）</dd><dt>登録</dt><dd>{ORG["office_reg"]}</dd>'
                   '<dt>事業内容</dt><dd>建築および製造物のデザイン・設計・施工・運営およびコンサルティング</dd>'
                   f'<dt>法人番号</dt><dd>{ORG["corp_no"]}</dd><dt>認定・受賞</dt><dd>{"、".join(AWARDS)}</dd>'
                   f'<dt>連絡先</dt><dd><a href="mailto:{ORG["email"]}">{ORG["email"]}</a>／<a href="/contact/">お問い合わせフォーム</a></dd></dl></section>')
    else:
        out.append('<section id="s-company"><h2>Company</h2><dl>'
                   f'<dt>Name</dt><dd>{ORG["legal_en"]} (株式会社XENCE)</dd><dt>Founded</dt><dd>28 January 2022</dd>'
                   f'<dt>Head office</dt><dd>{ORG["street_en"]}, Nagoya, Aichi {ORG["postal"]}, Japan</dd><dt>Base</dt><dd>Nagoya, Japan</dd>'
                   f'<dt>CEO</dt><dd>{ORG["founder_en"]}, Founder & CEO (first-class registered architect)</dd>'
                   '<dt>Registration</dt><dd>First-class architect office, Aichi Prefecture registration No. 14198</dd>'
                   f'<dt>Recognition</dt><dd>{"; ".join(AWARDS)}</dd>'
                   f'<dt>Contact</dt><dd><a href="mailto:{ORG["email"]}">{ORG["email"]}</a> / <a href="/en/contact/">contact form</a></dd></dl></section>')
    out.append(f'<footer><p>© XENCE · <a href="/llms.txt">llms.txt</a> · <a href="/sitemap.xml">sitemap</a></p></footer></article>')
    return '\n'.join(x for x in out if x)

def static_news(lang):
    fb, arch = news_data()
    out = [f'<article id="prerender" lang="{lang}"><h1>XENCE News</h1>']
    for n in fb:
        t = n['ja'] if lang == 'ja' else (n['en'] or n['ja'])
        href = ('/news/' if lang == 'ja' else '/en/news/') + '?id=' + n['id']
        body = plain_body(arch.get(n['id'], ''))
        lead = next((l[2:] for l in body.split('\n') if l.startswith('> ')), '')
        out.append(f'<section><h2><a href="{href}">{E(t)}</a></h2><p><time>{E(n["date"])}</time></p>' + (f'<p>{E(lead)}</p>' if lead else '') + '</section>')
    out.append('<p><a href="/">XENCE</a></p></article>')
    return '\n'.join(out)

def static_contact(lang):
    if lang == 'ja':
        return ('<article id="prerender" lang="ja"><h1>XENCEへのお問い合わせ</h1><ul>'
                '<li>建てたい・置きたい：温室、宿、住宅、什器の設計施工</li><li>資源を活かしたい：製材所・解体事業者・自治体の方</li>'
                '<li>技術で組みたい：企業・大学・海外パートナーの方</li><li>投資・事業提携：投資家・事業会社の方</li></ul>'
                f'<p>メール：<a href="mailto:{ORG["email"]}">{ORG["email"]}</a></p><p><a href="/">XENCE トップへ</a></p></article>')
    return ('<article id="prerender" lang="en"><h1>Contact XENCE</h1><ul>'
            '<li>Build: greenhouses, stays, houses and furniture, designed and built</li><li>Resources: sawmills, demolition contractors, municipalities</li>'
            '<li>Technology partners: companies, universities, overseas partners</li><li>Investment and business partnerships</li></ul>'
            f'<p>Email: <a href="mailto:{ORG["email"]}">{ORG["email"]}</a></p><p><a href="/en/">XENCE home</a></p></article>')

# ---------------------------------------------------------------- inject
def inject(path, head_html, body_html, body_anchor):
    p = ROOT / path; s = p.read_text()
    s = re.sub(r'\n?<!--SEO:HEAD-->.*?<!--/SEO:HEAD-->', '', s, flags=re.S)
    s = s.replace('</title>', '</title>\n' + head_html, 1)
    s = re.sub(r'<article id="prerender".*?</article>\n?', '', s, flags=re.S)
    if not body_html:
        p.write_text(s); return
    if body_anchor == 'app':
        s = re.sub(r'<div id="app">\s*</div>', lambda m: '<div id="app">\n' + body_html + '\n</div>', s, count=1)
    else:
        s = s.replace('<body>', '<body>\n' + body_html, 1)
    p.write_text(s)

def main():
    for lang, pre in (('ja', ''), ('en', '/en')):
        inject(f'{pre.strip("/") + "/" if pre else ""}index.html', head(lang, pre + '/', TITLE[lang], DESC[lang]), static_home(lang), 'app')
        nd = 'XENCEのニュース・プレスリリース。サーキュラー木造温室™、Material Passport、未利用材の建築利用などの最新情報。' if lang == 'ja' else 'News and press releases from XENCE: the Circular Timber Greenhouse™, Material Passport, and building with unused timber.'
        inject(f'{pre.strip("/") + "/" if pre else ""}news/index.html', head(lang, pre + '/news/', 'XENCE | News', nd), static_news(lang), 'body')
        cd = 'XENCEへのお問い合わせ。温室・宿・住宅・什器の設計施工、未利用材の活用、技術連携、投資・事業提携のご相談。' if lang == 'ja' else 'Contact XENCE about design & build, putting unused timber to work, technology partnerships, or investment.'
        inject(f'{pre.strip("/") + "/" if pre else ""}contact/index.html', head(lang, pre + '/contact/', 'XENCE | Contact', cd), static_contact(lang), 'body')
        # company & projects (already static HTML: head metadata only)
        cdesc = ('株式会社XENCE（XENCE Inc.）の会社概要。設立2022年、名古屋大学発ベンチャー、一級建築士事務所。本社は名古屋。沿革・受賞・メディア掲載。' if lang == 'ja'
                 else 'Company profile of XENCE Inc. (株式会社XENCE): founded 2022, Nagoya University venture, licensed architecture office in Nagoya. History, awards and media.')
        inject(f'{pre.strip("/") + "/" if pre else ""}company/index.html', head(lang, pre + '/company/', 'XENCE | ' + ('会社概要' if lang == 'ja' else 'Company'), cdesc,
               page_ld(lang, pre + '/company/', 'XENCE | Company', cdesc, 'AboutPage')), '', 'body')
        D = app_data(lang)
        pdesc = ('XENCEのプロジェクト一覧。サーキュラー木造温室™、代官山T-SITE、大径木の家、WoodNode、MEMUなど。' if lang == 'ja' else 'XENCE projects: Circular Timber Greenhouse™, Daikanyama T-SITE, a house of large-diameter timber, WoodNode, MEMU and more.')
        items = [{'@type': 'ListItem', 'position': i + 1, 'url': SITE + pre + '/projects/' + SLUG[p['id']] + '/', 'name': p['title']} for i, p in enumerate(D['projects'])]
        inject(f'{pre.strip("/") + "/" if pre else ""}projects/index.html', head(lang, pre + '/projects/', 'XENCE | Projects', pdesc,
               page_ld(lang, pre + '/projects/', 'XENCE | Projects', pdesc, 'CollectionPage', {'@type': 'ItemList', 'itemListElement': items})), '', 'body')
        for p in D['projects']:
            path = pre + '/projects/' + SLUG[p['id']] + '/'
            d = CLEAN(p['desc'])
            work = {'@type': 'CreativeWork', '@id': SITE + path + '#work', 'name': p['title'], 'description': d, 'image': SITE + p['img'],
                    'creator': {'@id': SITE + '/#org'}, 'dateCreated': p['year'], 'locationCreated': CLEAN(p['place']) or None,
                    'keywords': ', '.join(x for x in [p['type'], CLEAN(p['input']), p['tech']] if x), 'inLanguage': lang}
            work = {k: v for k, v in work.items() if v}
            inject(path.lstrip('/') + 'index.html', head(lang, path, 'XENCE | ' + p['title'], (d or p['title'])[:160], page_ld(lang, path, p['title'], d, 'WebPage', work)), '', 'body')
    write_txt()

# ---------------------------------------------------------------- txt files
AI_BOTS = ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'ClaudeBot', 'Claude-SearchBot', 'Claude-User', 'anthropic-ai', 'PerplexityBot', 'Perplexity-User',
           'Google-Extended', 'GoogleOther', 'Googlebot', 'Bingbot', 'Applebot', 'Applebot-Extended', 'Amazonbot', 'meta-externalagent', 'cohere-ai',
           'DuckAssistBot', 'MistralAI-User', 'YouBot', 'CCBot']

def write_txt():
    fb, arch = news_data()
    (ROOT / 'robots.txt').write_text(
        '# xencegroup.com — XENCE welcomes search engines and AI assistants.\n'
        '# Summary for language models: https://xencegroup.com/llms.txt\n\n'
        'User-agent: *\nContent-Signal: search=yes, ai-input=yes, ai-train=yes\nAllow: /\nDisallow: /assets/archive/\n\n'
        + ''.join(f'User-agent: {b}\n' for b in AI_BOTS) + 'Allow: /\nDisallow: /assets/archive/\n\n'
        'Sitemap: https://xencegroup.com/sitemap.xml\n')
    urls = [('/', '/en/', '1.0', 'weekly'), ('/news/', '/en/news/', '0.8', 'weekly'), ('/contact/', '/en/contact/', '0.6', 'monthly')]
    urls += [('/company/', '/en/company/', '0.9', 'monthly'), ('/projects/', '/en/projects/', '0.8', 'monthly')]
    urls += [(f'/projects/{v}/', f'/en/projects/{v}/', '0.7', 'monthly') for v in SLUG.values()]
    urls += [(f'/news/?id={n["id"]}', f'/en/news/?id={n["id"]}', '0.6', 'yearly') for n in fb]
    x = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">']
    for ja, en, pr, cf in urls:
        for loc in (ja, en):
            x.append(f'<url><loc>{E(SITE + loc)}</loc><lastmod>{TODAY}</lastmod><changefreq>{cf}</changefreq><priority>{pr}</priority>'
                     f'<xhtml:link rel="alternate" hreflang="ja" href="{E(SITE + ja)}"/><xhtml:link rel="alternate" hreflang="en" href="{E(SITE + en)}"/>'
                     f'<xhtml:link rel="alternate" hreflang="x-default" href="{E(SITE + ja)}"/></url>')
    x.append('</urlset>')
    (ROOT / 'sitemap.xml').write_text('\n'.join(x) + '\n')

    Dj, De = app_data('ja'), app_data('en')
    oj = json.loads((ROOT / 'src/seo/outline_ja.json').read_text())
    sec = lambda o, sid: [i for s in o if s['id'] == sid for i in s['items']]
    impact = [i['txt'] for i in sec(oj, 'impact') if i['t'] == 'P'][2:]
    growth = sec(oj, 'growth')

    llms = f"""# XENCE

> {DESC['en']}

XENCE (株式会社XENCE, read "zensu") is a circular-architecture startup certified as a Nagoya University venture and registered as a first-class architect office in Aichi, Japan. It designs, builds and operates buildings — greenhouses, houses, stays, furniture and pavilions — made from timber the construction industry usually discards, and records each piece's origin, carbon and reuse in a Material Passport. Founder & CEO: Kotaro Ozawa (小澤巧太郎), first-class registered architect.

Who XENCE works with: owners who want to build greenhouses, stays, houses or fixtures; sawmills, demolition contractors and municipalities with unused timber; companies, universities and overseas partners in digital fabrication, LCA and circular construction; investors and business partners.

## Key pages
- [Home (Japanese)](https://xencegroup.com/): mission, model, technology, projects, impact, team
- [Home (English)](https://xencegroup.com/en/)
- [Company profile](https://xencegroup.com/company/) ([English](https://xencegroup.com/en/company/)): facts, history, awards, media
- [Projects](https://xencegroup.com/projects/) ([English](https://xencegroup.com/en/projects/)): one page per project
- [News](https://xencegroup.com/news/): press releases and media coverage
- [Contact](https://xencegroup.com/contact/): build / resources / technology partners / investment
- [Full text for language models](https://xencegroup.com/llms-full.txt)

## Facts
- Legal name: 株式会社XENCE (XENCE Inc.) — founded 28 January 2022 — Japan Corporate Number 1180003023459
- Head office: SIMON 10 SAKAE 401, 1-29-29 Sakae, Naka-ku, Nagoya, Aichi 460-0008, Japan
- First-class architect office, Aichi Prefecture registration No. 14198
- Recognition: {'; '.join(AWARDS)}
- Flagship product: Circular Timber Greenhouse™ — timber built from sawmill offcuts, demountable, modular; timber, hybrid or steel
- Contact: info@xencegroup.com

## Optional
- [Instagram](https://www.instagram.com/xence_architecture_studio/)
"""
    (ROOT / 'llms.txt').write_text(llms)

    full = [f'# XENCE — full profile\n\nLast updated: {TODAY}. Source: https://xencegroup.com/ (Japanese) and https://xencegroup.com/en/ (English).\n',
            '## Summary (English)\n', DESC['en'], '\n## 概要（日本語）\n', DESC['ja'], '\n## Mission\n',
            '「建てて終わり」を、終わらせる。 — Waste in. Assets out. 端材、大径木、解体材、木粉。建設が使えずに手放してきた規格外の資源を、XENCEは建築に変えます。設計・施工・運用をひとつのデジタルデータでつなぎ、建てた後も記録し、運用し、次の建築へ循環させます。',
            '\n## Business model / 事業モデル\n']
    full += [f'- {i["txt"]}' for i in sec(oj, 'model') if i['t'] in ('H2', 'P', 'H3')]
    full.append('\n## Technology / 技術\n')
    for a, b in zip(Dj['techs'], De['techs']):
        full.append(f'### {a["num"]} {b["title"]} / {a["title"]}\n- EN: {b["body"]}\n- JA: {a["body"]}\n')
    full.append('## Modular system / モジュール\n')
    full += [f'- {i["txt"]}' for i in sec(oj, 'modules') if i['t'] in ('H2', 'P', 'H3')]
    full.append('\n## Projects / プロジェクト\n')
    for a, b in zip(Dj['projects'], De['projects']):
        full.append(f'### {b["title"]} / {a["title"]}\n- {b["type"]} · {CLEAN(b["place"])} · {b["year"]} · {b["status"]}\n- URL: https://xencegroup.com/projects/{SLUG[a["id"]]}/\n- EN: {CLEAN(b["desc"])}\n- JA: {CLEAN(a["desc"])}\n')
    full.append('## Impact (with calculation basis on the website) / 数字で見るXENCE\n')
    full += [f'- {t}' for t in impact]
    full.append('\n## Why XENCE lasts / 価値を出し続けられる理由\n')
    full += [('### ' if i['t'] == 'H3' else '') + i['txt'] for i in growth if i['t'] in ('H3', 'P')][2:]
    full.append('\n## Team\n')
    full += [f'- {i["txt"]}' for i in sec(oj, 'studio') if i['t'] == 'P'][1:]
    full.append('\n## News / ニュース\n')
    for n in fb:
        full.append(f'### {n["date"]} — {n["ja"]}\n{("EN: " + n["en"]) if n["en"] else ""}\nURL: https://xencegroup.com/news/?id={n["id"]}\n\n{plain_body(arch.get(n["id"], ""))[:2500]}\n')
    full.append('\n## Company / 会社概要\n- 株式会社XENCE (XENCE Inc.), founded 2022-01-28, Japan Corporate Number 1180003023459\n'
                '- Head office: 〒460-0008 愛知県名古屋市中区栄一丁目29番地29号 SIMON 10 SAKAE 401\n'
                f'- {ORG["office_reg"]}\n- Business: architectural design, construction, operation and consulting for buildings and products\n'
                '- Founder & CEO: Kotaro Ozawa (小澤巧太郎), first-class registered architect\n'
                '- Contact: info@xencegroup.com — https://xencegroup.com/contact/\n')
    (ROOT / 'llms-full.txt').write_text('\n'.join(full))

if __name__ == '__main__':
    main()
    print('ok')
