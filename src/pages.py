# Generates the static sub pages: /contact/, /contact/thanks/, /news/ (and /en/ versions).
# Run from the repo root:  python3 src/pages.py
import os, html

ACCENT = '#FF5528'
# Google Apps Script web app "XENCE Web 問い合わせ受付" (writes to the sheet "XENCE ウェブサイト 問い合わせ" and mails info@)
CONTACT_ENDPOINT = 'https://script.google.com/macros/s/AKfycbwNJH9zN1_IyPzqld1dCi79nolaWi8QMdSWEU2YYkVTVo6E-hAZbu9atOSL57GQKK-U/exec'

T = {
 'ja': dict(
   pre='', other='/en', lang_ja='color:#fff', lang_en='color:#8a877f',
   font="'Zen Kaku Gothic New', sans-serif",
   title_contact='XENCE | Contact', title_thanks='XENCE | 送信完了', title_news='XENCE | News',
   lead='ご相談やお問い合わせなど、まずはフォームからお気軽にお問い合わせください。<br>建築の設計・施工、未活用材を使ったプロダクト開発、ファシリティマネジメント、LCA算定支援などのご相談を受け付けています。',
   type_label='お問い合わせ種別',
   types=[('build','建てたい・置きたい','温室、宿、住宅、什器の設計施工'),('resource','資源を活かしたい','製材所・解体事業者・自治体の方'),('partner','技術で組みたい','企業・大学・海外パートナーの方'),('invest','投資・事業提携','投資家・事業会社の方'),('recruit','採用・インターン','職種への応募、インターンのご相談'),('other','その他','取材・その他のご相談')],
   name='お名前', company='会社名', email='メールアドレス', message='お問い合わせ内容', req='必須', opt='任意',
   privacy='<a href="https://xencegroup.com/privacy-policy" target="_blank" rel="noopener">プライバシーポリシー</a>に同意する',
   submit='送信する', sending='送信中…', failed='送信できませんでした。お手数ですが info@xencegroup.com までメールでご連絡ください。',
   thanks_h='お問い合わせありがとうございました。', thanks_p='内容を確認のうえ、担当者よりご連絡いたします。<br>数日経っても返信がない場合は、お手数ですが info@xencegroup.com までご連絡ください。', back='トップへ戻る',
   news_lead='XENCEのお知らせ、受賞、メディア掲載。', loading='読み込み中…', news_back='← ニュース一覧へ', notfound='記事が見つかりませんでした。',
   foot1='株式会社XENCE ／ XENCE一級建築士事務所<br>愛知県知事登録（い－4）第14198号',
   foot2='Nagoya — 愛知県名古屋市中区栄1-29-29 SIMON 10 SAKAE 401'),
 'en': dict(
   pre='/en', other='', lang_ja='color:#8a877f', lang_en='color:#fff',
   font="Montserrat, 'Zen Kaku Gothic New', sans-serif",
   title_contact='XENCE | Contact', title_thanks='XENCE | Thank you', title_news='XENCE | News',
   lead='Tell us what you would like to build, supply or explore together.<br>We take on architectural design and construction, products made from unused timber, facility management and LCA support.',
   type_label='Topic',
   types=[('build','Build with us','Greenhouses, guesthouses, homes and furniture'),('resource','Supply materials','Sawmills, demolition firms and municipalities'),('partner','Partner on technology','Companies, universities and overseas partners'),('invest','Invest or partner','Investors and corporate partners'),('recruit','Careers & internships','Apply for a role or an internship'),('other','Other','Press and anything else')],
   name='Name', company='Company', email='Email', message='Message', req='Required', opt='Optional',
   privacy='I agree to the <a href="https://xencegroup.com/en/privacy-policy" target="_blank" rel="noopener">privacy policy</a>',
   submit='Send', sending='Sending…', failed='Your message could not be sent. Please email info@xencegroup.com.',
   thanks_h='Thank you for getting in touch.', thanks_p='We will review your message and reply soon.<br>If you have not heard from us within a few days, please write to info@xencegroup.com.', back='Back to top',
   news_lead='Announcements, awards and press coverage from XENCE.', loading='Loading…', news_back='← All news', notfound='Article not found.',
   foot1='XENCE Inc. ／ XENCE First-class Architect Office<br>Registered in Aichi Prefecture (I-4) No. 14198',
   foot2='Nagoya — SIMON 10 SAKAE 401, 1-29-29 Sakae, Naka-ku, Nagoya, Japan'),
}

CSS = '''
*{box-sizing:border-box}
body{margin:0;background:#000;color:#fff;font-family:%(font)s;-webkit-font-smoothing:antialiased}
a{color:#fff;text-decoration:none}a:hover{color:%(accent)s}
.en{font-family:Montserrat,sans-serif}
header{position:sticky;top:0;z-index:50;background:rgba(0,0,0,.62);backdrop-filter:blur(14px);-webkit-backdrop-filter:blur(14px);border-bottom:1px solid rgba(255,255,255,.08);display:flex;align-items:center;justify-content:space-between;flex-wrap:wrap;gap:16px;padding:18px 4vw}
header .logo{display:flex;align-items:center}header .logo img{height:22px;width:auto;display:block}
header nav{display:flex;gap:26px;flex-wrap:wrap;align-items:center;font-size:14px;font-weight:600}
header .cta{background:#fff;color:#000;padding:12px 22px;border-radius:999px;font-weight:700}
header .cta:hover{color:#000;opacity:.85}
header .lang{font-size:13px}
main{max-width:1440px;margin:0 auto;padding:120px 4vw 140px}
h1{margin:0 0 32px;font-size:clamp(48px,7vw,104px);font-weight:900;line-height:1;letter-spacing:-.01em}
.lead{max-width:760px;margin:0 0 72px;font-size:16px;line-height:2;color:#D8D6D1}
.grid{display:grid;grid-template-columns:minmax(0,1fr) minmax(0,2fr);gap:64px;border-top:1px solid #fff;padding-top:48px}
.side{font-size:13px;line-height:1.9;color:#A9A69F}
.side b{display:block;color:#fff;font-size:14px;margin-bottom:6px}
fieldset{border:0;margin:0 0 40px;padding:0}
legend,.lab{display:flex;gap:10px;align-items:baseline;font-size:13px;font-weight:700;margin-bottom:14px;padding:0}
.tag{font-size:11px;font-weight:700;color:%(accent)s}.tag.o{color:#8a877f}
.types{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:1px;background:#333;border:1px solid #333}
.types label{background:#000;padding:22px 24px;cursor:pointer;display:block;transition:background .3s}
.types label:hover{background:#151514}
.types label:last-child:nth-child(odd){grid-column:1/-1}
.types input{position:absolute;opacity:0;pointer-events:none}
.types .n{font-size:11px;color:%(accent)s}
.types .t{display:block;margin-top:8px;font-size:17px;font-weight:700}
.types .d{display:block;margin-top:6px;font-size:12.5px;color:#A9A69F;line-height:1.6}
.types input:checked + span{display:block}
.types label:has(input:checked){background:#fff;color:#000}
.types label:has(input:checked) .d{color:#333}
.types label:has(input:focus-visible){outline:2px solid %(accent)s;outline-offset:-2px}
.field{margin-bottom:36px}
.field input,.field textarea{width:100%%;background:transparent;border:0;border-bottom:1px solid #555;color:#fff;font:inherit;font-size:17px;padding:10px 0 14px;border-radius:0;outline:none;transition:border-color .3s}
.field textarea{min-height:200px;resize:vertical;line-height:1.8;border:1px solid #555;padding:14px 16px}
.field input:focus,.field textarea:focus{border-color:#fff}
.field input::placeholder,.field textarea::placeholder{color:#555}
.row2{display:grid;grid-template-columns:1fr 1fr;gap:40px}
.agree{display:flex;gap:12px;align-items:center;font-size:14px;margin:8px 0 40px;cursor:pointer}
.agree input{width:18px;height:18px;accent-color:%(accent)s;margin:0}
.agree a{text-decoration:underline;text-underline-offset:3px}
button{font:inherit;background:#fff;color:#000;border:0;border-radius:999px;padding:18px 40px;font-size:15px;font-weight:700;cursor:pointer;display:inline-flex;gap:12px;align-items:center;transition:opacity .3s}
button:hover{opacity:.85}button[disabled]{opacity:.4;cursor:default}
button .dot{color:%(accent)s}
.hp{position:absolute;left:-9999px}
.news{border-top:1px solid #fff}
.news a{display:grid;grid-template-columns:120px minmax(0,1fr) 24px;gap:24px;align-items:baseline;padding:24px 0;border-bottom:1px solid #333;transition:background .3s}
.news a:hover{background:#151514;color:#fff}
.news .d{font-size:13px;color:#A9A69F}.news .t{font-size:17px;line-height:1.7}.news .ar{color:%(accent)s}
.muted{color:#8a877f;font-size:14px}
article{max-width:860px}
article .date{font-size:13px;color:#A9A69F;margin-bottom:20px}
article h1{font-size:clamp(28px,3.4vw,46px);line-height:1.45;font-weight:900;letter-spacing:0;margin-bottom:48px}
article img{width:100%%;height:auto;display:block;margin:0 0 48px;background:#111}
article .body{font-size:16.5px;line-height:2.1;color:#E8E6E1;border-top:1px solid #333;padding-top:40px}
article .body p{margin:0 0 1.6em}
article .body figure{margin:2.4em 0}
article .body .video{position:relative;aspect-ratio:16/9;margin:0 0 2.4em;background:#111}
article .body .video iframe{position:absolute;inset:0;width:100%%;height:100%%;border:0}
article .body figure img{margin:0;width:100%%;height:auto}
article .body figcaption{font-size:13px;color:#A9A69F;margin-top:10px;line-height:1.7}
article .body h2{font-size:22px;line-height:1.6;font-weight:900;margin:2.4em 0 1em;color:#fff}
article .body .lead-in{font-size:18px;font-weight:700;color:#fff;margin-bottom:2em}
article .body a{color:%(accent)s;word-break:break-all}
.back{display:inline-block;margin-top:56px;font-size:14px;color:#A9A69F}
footer{border-top:1px solid #222;padding:64px 4vw;display:flex;justify-content:space-between;flex-wrap:wrap;gap:32px;font-size:13px;color:#A9A69F;line-height:1.9}
footer .f{margin:0 0 12px;color:#fff;font-weight:800;font-size:20px}
footer .fl a{color:#A9A69F}footer .fl a:hover{color:%(accent)s}
.eyebrow{margin:0 0 16px;font-size:13px;letter-spacing:.22em;color:#A9A69F}
.dl{display:grid;grid-template-columns:200px minmax(0,1fr);border-top:1px solid #fff;margin:0 0 96px}
.dl dt,.dl dd{margin:0;padding:22px 0;border-bottom:1px solid #333;font-size:15px;line-height:1.9}
.dl dt{color:#A9A69F;font-size:13px;padding-right:24px}
.dl dd a{text-decoration:underline;text-underline-offset:3px}
h2.sec{font-size:clamp(28px,3vw,44px);font-weight:900;margin:0 0 28px}
.tl{list-style:none;margin:0 0 96px;padding:0;border-top:1px solid #fff}
.tl li{display:grid;grid-template-columns:140px minmax(0,1fr);gap:24px;padding:20px 0;border-bottom:1px solid #333;font-size:15px;line-height:1.8}
.tl li span:first-child{color:#A9A69F}
.tl li a{text-decoration:underline;text-underline-offset:3px}
.pgrid{display:grid;grid-template-columns:repeat(auto-fill,minmax(300px,1fr));gap:48px 24px}
.pgrid a{display:block}.pgrid img{width:100%%;aspect-ratio:3/2;object-fit:cover;display:block;background:#111;transition:opacity .3s}.pgrid a:hover img{opacity:.85}
.pgrid .n{display:block;margin-top:16px;font-size:12px;color:%(accent)s;letter-spacing:.14em}.pgrid .t{display:block;margin-top:6px;font-size:19px;font-weight:800;line-height:1.5}.pgrid .m{display:block;margin-top:6px;font-size:13px;color:#A9A69F}
.phero{width:100%%;max-height:72vh;aspect-ratio:16/9;object-fit:cover;display:block;background:#111;margin:0 0 56px}
.pbody{display:grid;grid-template-columns:minmax(0,2fr) minmax(0,1fr);gap:64px;border-top:1px solid #fff;padding-top:40px;margin-bottom:96px}
.pbody p{margin:0 0 1.4em;font-size:17px;line-height:2.05;color:#E8E6E1}
.pbody .meta{display:grid;grid-template-columns:88px 1fr;row-gap:14px;font-size:14px;align-self:start}
.pbody .meta span:nth-child(odd){color:#A9A69F}
.rel a{display:block;padding:18px 0;border-bottom:1px solid #333;font-size:15px}
.pn{display:flex;justify-content:space-between;gap:24px;border-top:1px solid #333;padding-top:28px;font-size:14px;color:#A9A69F}
.pn a{color:#A9A69F}.pn a:hover{color:%(accent)s}
.cta2{display:inline-block;margin-top:48px;background:#fff;color:#000;padding:16px 28px;border-radius:999px;font-weight:700}.cta2:hover{color:#000;opacity:.85}
@media (max-width:860px){
 header nav .sec{display:none}
 header .cta{padding:10px 16px;font-size:12px}
 header .logo img{height:18px}
 main{padding:72px 5vw 100px}
 .grid{grid-template-columns:1fr;gap:40px}
 .row2{grid-template-columns:1fr;gap:0}
 .types{grid-template-columns:1fr}
 .news a{grid-template-columns:1fr 20px;gap:4px 12px}
 .news .d{grid-column:1/-1}
 .dl{grid-template-columns:1fr}.dl dt{padding-bottom:0;border-bottom:0}
 .tl li{grid-template-columns:1fr;gap:4px}
 .pbody{grid-template-columns:1fr;gap:40px}
}
'''

# Footer links. Add note / LinkedIn here (label, url) once their URLs are fixed.
SOCIAL = [('Instagram', 'https://www.instagram.com/xence_architecture_studio/'), ('Instagram — XENCE Engineering', 'https://www.instagram.com/xence.engineering/')]
def foot_links(L):
    pre = T[L]['pre']
    nav = [('Company' if L == 'en' else '会社概要', pre + '/company/'), ('Projects' if L == 'en' else 'プロジェクト', pre + '/projects/'), ('News', pre + '/news/'), ('Contact' if L == 'en' else 'お問い合わせ', pre + '/contact/')]
    a = lambda l, u, ext=False: f'<a href="{u}"' + (' target="_blank" rel="noopener"' if ext else '') + f'>{l}</a>'
    return ('<div class="fl">' + '<br>'.join(a(l, u) for l, u in nav) + '</div>'
            '<div class="fl en">' + '<br>'.join(a(l + ' ↗', u, True) for l, u in SOCIAL) + '<br><a href="mailto:info@xencegroup.com">info@xencegroup.com</a><br>© XENCE Inc.</div>')

def shell(L, title, body, path, script=''):
    t = T[L]; pre = t['pre']
    nav = ''.join(f'<a class="sec" href="{pre}/#{a}">{b}</a>' for a, b in [('model','Model'),('technology','Technology'),('projects','Projects'),('news','News'),('growth','Investors')])
    return f'''<!doctype html>
<html lang="{L}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{title}</title>
<link rel="icon" type="image/svg+xml" href="/assets/favicon_x2026.svg"><link rel="apple-touch-icon" href="/assets/apple-touch-icon_x2026.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800;900&amp;family=Zen+Kaku+Gothic+New:wght@400;500;700;900&amp;display=swap" rel="stylesheet">
<style>{CSS % dict(font=t['font'], accent=ACCENT)}</style>
</head>
<body>
<header>
<a class="logo en" href="{pre}/"><img src="/assets/logo_xence_wh_2026.svg" alt="XENCE" width="126" height="22"></a>
<nav class="en">{nav}
<a class="cta" href="{pre}/contact/">CONTACT <span style="color:{ACCENT}">●</span></a>
<span class="lang"><a href="{path}" style="{t['lang_ja']}">JA</a> / <a href="/en{path}" style="{t['lang_en']}">EN</a></span>
</nav>
</header>
{body}
<footer>
<div><p class="f en"><img src="/assets/logo_xence_wh_2026.svg" alt="XENCE" width="103" height="18" style="height:18px;width:auto;display:block"></p>{t['foot1']}</div>
<div>{t['foot2']}</div>
{foot_links(L)}
</footer>
{script}
</body>
</html>
'''

def contact(L):
    t = T[L]; pre = t['pre']
    types = ''.join(f'<label><input type="radio" name="type" value="{v}"{" required" if i == 0 else ""}><span class="n en">{i+1:02d}</span><span class="t">{a}</span><span class="d">{b}</span></label>' for i, (v, a, b) in enumerate(t['types']))
    side = ('<div class="side"><b>株式会社XENCE</b>〒460-0008<br>愛知県名古屋市中区栄一丁目29番29号<br>SIMON 10 SAKAE 401<br><br><b>メール</b><a href="mailto:info@xencegroup.com">info@xencegroup.com</a></div>' if L == 'ja' else
            '<div class="side"><b>XENCE Inc.</b>SIMON 10 SAKAE 401<br>1-29-29 Sakae, Naka-ku<br>Nagoya 460-0008, Japan<br><br><b>Email</b><a href="mailto:info@xencegroup.com">info@xencegroup.com</a></div>')
    req = f'<span class="tag">{t["req"]}</span>'; opt = f'<span class="tag o">{t["opt"]}</span>'
    body = f'''<main>
<h1 class="en">Contact</h1>
<p class="lead">{t['lead']}</p>
<div class="grid">
{side}
<form name="contact" method="POST" action="{CONTACT_ENDPOINT}" data-thanks="{pre}/contact/thanks/">
<input type="hidden" name="lang" value="{L}">
<p class="hp"><label>Don’t fill this out: <input name="bot-field"></label></p>
<fieldset><legend>{t['type_label']} {req}</legend><div class="types">{types}</div></fieldset>
<div class="row2">
<div class="field"><label class="lab" for="f-name">{t['name']} {req}</label><input id="f-name" name="name" required autocomplete="name"></div>
<div class="field"><label class="lab" for="f-company">{t['company']} {opt}</label><input id="f-company" name="company" autocomplete="organization"></div>
</div>
<div class="field"><label class="lab" for="f-email">{t['email']} {req}</label><input id="f-email" name="email" type="email" required autocomplete="email"></div>
<div class="field"><label class="lab" for="f-msg">{t['message']} {req}</label><textarea id="f-msg" name="message" required></textarea></div>
<label class="agree"><input type="checkbox" name="privacy" value="agree" required><span>{t['privacy']}</span></label>
<button type="submit">{t['submit']} <span class="dot">→</span></button>
</form>
</div>
</main>'''
    rl = ['Architect（一級建築士）','Construction Manager（施工管理者）','Facility Manager（アセット管理者）','Intern（インターン）','希望職種：'] if L=='ja' else ['Architect','Construction Manager','Facility Manager','Intern','Role: ']
    script = f'''<script>
(function(){{
var p=new URLSearchParams(location.search).get('type');
var r=p&&document.querySelector('input[name="type"][value="'+p.replace(/[^a-z]/g,'')+'"]'); if(r) r.checked=true;
var ro=new URLSearchParams(location.search).get('role'); var RL={{architect:'{rl[0]}',construction:'{rl[1]}',facility:'{rl[2]}',intern:'{rl[3]}'}}; if(ro&&RL[ro]){{var m=document.getElementById('f-msg'); if(m&&!m.value) m.value='{rl[4]}'+RL[ro]+'\\n\\n';}}
var f=document.querySelector('form');
f.addEventListener('submit',function(ev){{
 ev.preventDefault();var b=f.querySelector('button');b.disabled=true;b.firstChild.nodeValue='{t['sending']} ';
 fetch(f.action,{{method:'POST',mode:'no-cors',body:new URLSearchParams(new FormData(f))}})
  .then(function(){{location.href=f.dataset.thanks;}})
  .catch(function(){{b.disabled=false;b.firstChild.nodeValue='{t['submit']} ';alert('{t['failed']}');}});
}});
}})();
</script>'''
    return shell(L, t['title_contact'], body, '/contact/', script)

def thanks(L):
    t = T[L]; pre = t['pre']
    body = f'''<main>
<h1 class="en">Thank you</h1>
<p class="lead" style="margin-bottom:24px;color:#fff;font-size:20px;font-weight:700">{t['thanks_h']}</p>
<p class="lead">{t['thanks_p']}</p>
<a class="back" href="{pre}/">← {t['back']}</a>
</main>'''
    return shell(L, t['title_thanks'], body, '/contact/thanks/')

def news(L):
    t = T[L]
    body = f'''<main id="news-root">
<h1 class="en">News</h1>
<p class="lead">{t['news_lead']}</p>
<div class="news" id="news-list"><p class="muted" style="padding:24px 0">{t['loading']}</p></div>
</main>'''
    script = f'''<script type="module">
import {{ loadNews, newsHref, isExternal }} from '/lib/news.js';
const L = '{L}', PRE = '{t['pre']}';
const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({{'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}})[c]);
const link = (t) => t.replace(/(https?:\\/\\/[^\\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>');
const fmtBody = (s) => esc(s.trim()).split(/\\n\\s*\\n/).map((p) => {{
  const im = p.match(/^!\\[([^\\]]*)\\]\\(([^)\\s]+)\\)$/);
  if (im) {{ const src = im[2].startsWith('drive:') ? 'https://lh3.googleusercontent.com/d/' + im[2].slice(6) + '=w1600' : im[2]; return '<figure><img src="' + src + '" alt="' + im[1] + '" loading="lazy">' + (im[1] ? '<figcaption>' + im[1] + '</figcaption>' : '') + '</figure>'; }}
  const yt = p.match(/^\\[youtube:([\\w-]{{6,}})\\]$/);
  if (yt) return '<div class="video"><iframe src="https://www.youtube-nocookie.com/embed/' + yt[1] + '" title="YouTube" allow="encrypted-media; picture-in-picture" allowfullscreen loading="lazy"></iframe></div>';
  if (p.startsWith('## ')) return '<h2>' + p.slice(3) + '</h2>';
  if (p.startsWith('&gt; ')) return '<p class="lead-in">' + link(p.slice(5).replace(/\\n/g, '<br>')) + '</p>';
  return '<p>' + link(p.replace(/\\n/g, '<br>')) + '</p>';
}}).join('');
const id = new URLSearchParams(location.search).get('id');
const root = document.getElementById('news-root');
loadNews().then((list) => {{
  if (id) {{
    const n = list.find((x) => x.id === id);
    if (!n) {{ root.innerHTML = '<p class="lead">{t['notfound']}</p><a class="back" href="' + PRE + '/news/">{t['news_back']}</a>'; return; }}
    const title = L === 'en' ? (n.en || n.ja) : n.ja;
    const body = L === 'en' ? (n.bodyEn || n.bodyJa) : n.bodyJa;
    document.title = 'XENCE | ' + title;
    root.innerHTML = '<article><div class="date en">' + esc(n.date) + '</div><h1>' + esc(title) + '</h1>' + (n.img ? '<img src="' + esc(n.img) + '" alt="">' : '') + '<div class="body">' + fmtBody(body || '') + (n.link ? '<p><a href="' + esc(n.link) + '" target="_blank" rel="noopener">' + esc(n.link) + '</a></p>' : '') + '</div><a class="back" href="' + PRE + '/news/">{t['news_back']}</a></article>';
    return;
  }}
  document.getElementById('news-list').innerHTML = list.map((n) => {{
    const href = newsHref(n, L) || '#'; const ext = isExternal(href);
    return '<a href="' + esc(href) + '"' + (ext ? ' target="_blank" rel="noopener"' : '') + '><span class="d en">' + esc(n.date) + '</span><span class="t">' + esc(L === 'en' ? (n.en || n.ja) : n.ja) + '</span><span class="ar en">' + (ext ? '↗' : '→') + '</span></a>';
  }}).join('');
}});
</script>'''
    return shell(L, t['title_news'], body, '/news/', script)

root = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
for L in ('ja', 'en'):
    base = os.path.join(root, '' if L == 'ja' else 'en')
    for rel, fn in (('contact', contact), ('contact/thanks', thanks), ('news', news)):
        d = os.path.join(base, rel); os.makedirs(d, exist_ok=True)
        open(os.path.join(d, 'index.html'), 'w', encoding='utf-8').write(fn(L))
        print(os.path.relpath(os.path.join(d, 'index.html'), root))

# ---------------------------------------------------------------- company & projects
import re as _re, json as _json
def _app_data(L):
    src = open(os.path.join(root, 'app.js' if L == 'ja' else 'en/app.js'), encoding='utf-8').read()
    return _json.loads(_re.search(r'this\.D = (\{.*?\});\n', src).group(1))
SLUG = {'p1': 'circular-timber-greenhouse', 'p2': 'higashiura-greenhouse', 'p3': 'daikanyama-tsite-lantern-bench', 'p4': 'nagoya-university-ctecs-furniture',
        'p11': 'waam-3d-printed-bench', 'p12': 'woodnode', 'p7': 'large-diameter-timber-house', 'p8': 'wood-flour-resin-pellets',
        'p21': 'memu-open-research-campus', 'p22': 'nagoya-university-idea-stoa', 'p23': 'monomiyusan'}
# news ids related to each project (shown as links on the project page)
REL = {'p1': ['260602', '251001', '250930', '260116', '260630', '9VckaqYJ', 'zNSZMKlS', '251220'], 'p3': ['_kRFwB8a', '9LhNPbQ0'], 'p12': ['241120']}
_clean = lambda v: _re.sub(r'\s*\[[^\]]*\]', '', v or '').strip()
def _news():
    src = open(os.path.join(root, 'lib/news.js'), encoding='utf-8').read()
    return {n['id']: n for n in _json.loads(_re.search(r'export const FALLBACK = (\[.*?\]);\n', src, _re.S).group(1))}

def company(L):
    pre = T[L]['pre']; N = _news()
    nl = lambda i: (pre + '/news/?id=' + i)
    if L == 'ja':
        rows = [('社名', '株式会社XENCE（ゼンス／ぜんす）'), ('英文表記', 'XENCE Inc.'), ('設立', '2022年1月28日（2026年1月1日 合同会社から株式会社へ組織変更）'),
                ('代表者', '代表取締役CEO 小澤巧太郎（一級建築士）'), ('本社', '〒460-0008 愛知県名古屋市中区栄一丁目29番29号 SIMON 10 SAKAE 401'), ('拠点', '名古屋（愛知県）'),
                ('資本金', '300万円'), ('事業内容', '建築および製造物のデザイン・設計・施工・運営およびコンサルティング<br>サーキュラー木造温室™の設計施工、未利用材・規格外材の建築利用、施設の指定管理・ファシリティマネジメント、LCA・ホールライフカーボン算定、Material Passport'),
                ('建築士事務所登録', 'XENCE一級建築士事務所　一級 愛知県知事登録（い－4）第14198号'), ('法人番号', '1180003023459'), ('認定', '名古屋大学発ベンチャー（2026年4月）'),
                ('部門', 'XENCE Architecture Studio（設計）／ XENCE Engineering（施工、2026年6月発足）'), ('お問い合わせ', '<a href="mailto:info@xencegroup.com">info@xencegroup.com</a>　／　<a href="' + pre + '/contact/">お問い合わせフォーム</a>')]
        hist = [('2022年1月', '合同会社XENCE 設立', None), ('2023年3月', '一級建築士事務所を登録', None), ('2024年11月', '金属3Dプリンター製接合部の開発が第36回技術研究発表会 優秀賞を受賞', '241120'),
                ('2025年9月', 'サーキュラー木造温室がウッドデザイン賞2025・グッドデザイン賞2025を受賞', '251001'), ('2026年1月', '株式会社XENCEへ組織変更、コーポレートロゴを刷新', '260101'),
                ('2026年1月', 'サーキュラー木造温室が超異分野学会 愛知フォーラム2026 大冷工業賞を受賞', '260116'), ('2026年4月', '名古屋大学発ベンチャーに認定', '260407'),
                ('2026年6月', 'サーキュラー木造温室™が Red Dot Design Award 2026 アーバンデザイン部門を受賞', '260602'), ('2026年6月', '施工部門「XENCE Engineering」を発足', '260616'),
                ('2026年6月', '愛知県「革新事業創造事業費補助金」に採択', '260630'), ('2026年10月', '代官山T-SITEで木材トレーサビリティ（Product Passport）の試験運用を開始', '9LhNPbQ0')]
        media = [('2025年11月', 'MAINTAINABLE「建てるほどCO2が減る温室」', 'https://maintainable.jp/circular/xence/26/11/2025/'), ('2025年12月', 'AXIS web「XENCEが循環型木造温室を販売開始」', 'https://www.axismag.jp/posts/2025/12/688378.html'), ('2025年12月', '日経クロステック「建設3Dプリンターと木の端材の融合」', '251220'), ('2026年3月', '中京テレビ「アプデの森」', 'zNSZMKlS'), ('2026年6月', 'MAINTAINABLE「サーキュラー木造温室が国際デザイン賞を受賞」', 'https://maintainable.jp/circular/xence-circular-wooden-greenhouse-red-dot-design-award-2026/18/06/2026/'), ('2026年7月', '日刊木材新聞', '9VckaqYJ')]
        h1, lead, h_hist, h_media = 'Company', 'XENCEは、建設業が使わずに手放してきた木材を、デジタル技術で建築に変える名古屋大学発のスタートアップです。設計・施工・指定管理をひと続きで担い、素材を社会の中で循環させます。', '沿革', 'メディア掲載'
        team = '<p class="lead">チームは<a href="/#studio" style="text-decoration:underline;text-underline-offset:3px">トップページのPeople</a>をご覧ください。</p>'
    else:
        rows = [('Company name', 'XENCE Inc. (株式会社XENCE)'), ('Founded', '28 January 2022 (reorganised as a kabushiki kaisha on 1 January 2026)'), ('CEO', 'Kotaro Ozawa, Founder & CEO (first-class registered architect)'),
                ('Head office', 'SIMON 10 SAKAE 401, 1-29-29 Sakae, Naka-ku, Nagoya, Aichi 460-0008, Japan'), ('Base', 'Nagoya, Japan'), ('Capital', 'JPY 3 million'),
                ('Business', 'Design, engineering, construction, operation and consulting for buildings and products: the Circular Timber Greenhouse™, building with unused and non-standard timber, facility management, LCA and whole-life carbon, Material Passport'),
                ('Registration', 'XENCE First-class Architect Office, Aichi Prefecture registration (I-4) No. 14198'), ('Corporate number', '1180003023459'), ('Certification', 'Nagoya University Venture (April 2026)'),
                ('Divisions', 'XENCE Architecture Studio (design) / XENCE Engineering (construction, since June 2026)'), ('Contact', '<a href="mailto:info@xencegroup.com">info@xencegroup.com</a> / <a href="' + pre + '/contact/">contact form</a>')]
        hist = [('Jan 2022', 'XENCE founded (as a godo kaisha)', None), ('Mar 2023', 'Registered as a first-class architect office', None), ('Nov 2024', 'Excellence Award at the 36th Technical Research Presentation for a metal 3D-printed joint', '241120'),
                ('Sep 2025', 'Circular Timber Greenhouse wins the Japan Wood Design Award 2025 and the Good Design Award 2025', '251001'), ('Jan 2026', 'Reorganised as XENCE Inc.; new corporate identity', '260101'),
                ('Jan 2026', 'Dairei Kogyo Award, Hyper-Interdisciplinary Conference Aichi Forum 2026', '260116'), ('Apr 2026', 'Certified as a Nagoya University Venture', '260407'),
                ('Jun 2026', 'Circular Timber Greenhouse™ wins the Red Dot Design Award 2026, Urban Design', '260602'), ('Jun 2026', 'XENCE Engineering, a construction division, launches', '260616'),
                ('Jun 2026', 'Selected for an Aichi Prefecture innovation grant', '260630'), ('Oct 2026', 'Timber traceability (Product Passport) trial begins at Daikanyama T-SITE', '9LhNPbQ0')]
        media = [('Nov 2025', 'MAINTAINABLE (in Japanese)', 'https://maintainable.jp/circular/xence/26/11/2025/'), ('Dec 2025', 'AXIS web (in Japanese)', 'https://www.axismag.jp/posts/2025/12/688378.html'), ('Dec 2025', 'Nikkei xTECH', '251220'), ('Mar 2026', 'Chukyo TV “Apude no Mori”', 'zNSZMKlS'), ('Jun 2026', 'MAINTAINABLE — Red Dot award (in Japanese)', 'https://maintainable.jp/circular/xence-circular-wooden-greenhouse-red-dot-design-award-2026/18/06/2026/'), ('Jul 2026', 'Nikkan Mokuzai Shimbun', '9VckaqYJ')]
        h1, lead, h_hist, h_media = 'Company', 'XENCE is a Nagoya University venture that turns the timber construction leaves behind into architecture with digital technology. We design, build and operate as one continuous service, so materials keep circulating.', 'History', 'Media'
        team = '<p class="lead">Meet the team in <a href="/en/#studio" style="text-decoration:underline;text-underline-offset:3px">People</a> on the home page.</p>'
    li = lambda d, t, i: f'<li><span class="en">{d}</span><span>' + (f'<a href="{i}" target="_blank" rel="noopener">{t} ↗</a>' if i and i.startswith('http') else f'<a href="{nl(i)}">{t}</a>' if i and i in N else t) + '</span></li>'
    body = (f'<main><p class="eyebrow en">ABOUT XENCE</p><h1 class="en">{h1}</h1><p class="lead">{lead}</p>'
            '<dl class="dl">' + ''.join(f'<dt>{a}</dt><dd>{b}</dd>' for a, b in rows) + '</dl>'
            f'<h2 class="sec">{h_hist}</h2><ul class="tl">' + ''.join(li(*x) for x in hist) + '</ul>'
            f'<h2 class="sec">{h_media}</h2><ul class="tl">' + ''.join(li(*x) for x in media) + '</ul>' + team + '</main>')
    return shell(L, 'XENCE | ' + ('会社概要' if L == 'ja' else 'Company'), body, '/company/')

def projects_index(L):
    pre = T[L]['pre']; D = _app_data(L)
    cards = ''.join(f'<a href="{pre}/projects/{SLUG[p["id"]]}/"><img src="{p["img"]}" alt="{p["title"]}" loading="lazy"><span class="n en">{i+1:03d} · {p["type"]}</span><span class="t">{p["title"]}</span><span class="m">' + ' · '.join(x for x in [_clean(p['place']), p['year'], p['status']] if x) + '</span></a>' for i, p in enumerate(D['projects']))
    lead = 'XENCEが設計・施工・運営に関わったプロジェクト。家具から温室、建築、素材、施設運営まで。' if L == 'ja' else 'Projects XENCE has designed, built or runs — from furniture and greenhouses to architecture, materials and facility operation.'
    body = f'<main><p class="eyebrow en">PROJECT INDEX</p><h1 class="en">Projects</h1><p class="lead">{lead}</p><div class="pgrid">{cards}</div></main>'
    return shell(L, 'XENCE | ' + ('プロジェクト' if L == 'ja' else 'Projects'), body, '/projects/')

def project(L, i):
    pre = T[L]['pre']; D = _app_data(L); P = D['projects']; p = P[i]; N = _news()
    lab = ['種類', '素材', '技術', '場所', '年', '状況'] if L == 'ja' else ['Type', 'Material', 'Technology', 'Location', 'Year', 'Status']
    vals = [p['type'], p['input'], p['tech'], p['place'], p['year'], p['status']]
    meta = ''.join(f'<span>{a}</span><span>{_clean(v)}</span>' for a, v in zip(lab, vals) if _clean(v))
    rel = [N[x] for x in REL.get(p['id'], []) if x in N]
    relh = ('<h2 class="sec">' + ('関連ニュース' if L == 'ja' else 'Related news') + '</h2><div class="rel" style="margin-bottom:96px">' +
            ''.join(f'<a href="{pre}/news/?id={n["id"]}"><span class="en" style="color:#A9A69F;margin-right:16px">{n["date"]}</span>{(n["en"] or n["ja"]) if L == "en" else n["ja"]}</a>' for n in rel) + '</div>') if rel else ''
    prv, nxt = P[i - 1], P[(i + 1) % len(P)]
    body = (f'<main><p class="eyebrow en"><a href="{pre}/projects/">PROJECT INDEX</a> · {i+1:03d}</p><h1 style="font-size:clamp(34px,4.6vw,68px);line-height:1.25">{p["title"]}</h1>'
            f'<img class="phero" src="{p["img"]}" alt="{p["title"]}">'
            f'<div class="pbody"><div><p>{_clean(p["desc"])}</p><a class="cta2" href="{pre}/contact/?type=build">' + ('このプロジェクトについて問い合わせる' if L == 'ja' else 'Ask us about this project') + '</a></div>'
            f'<div class="meta">{meta}</div></div>{relh}'
            f'<nav class="pn"><a href="{pre}/projects/{SLUG[prv["id"]]}/">← {prv["title"]}</a><a href="{pre}/projects/{SLUG[nxt["id"]]}/">{nxt["title"]} →</a></nav></main>')
    return shell(L, 'XENCE | ' + p['title'], body, f'/projects/{SLUG[p["id"]]}/')

def write_extra():
    for L in ('ja', 'en'):
        base = os.path.join(root, '' if L == 'ja' else 'en')
        pages = [('company', company(L)), ('projects', projects_index(L))] + [(f'projects/{SLUG[p["id"]]}', project(L, i)) for i, p in enumerate(_app_data(L)['projects'])]
        for rel, html_ in pages:
            d = os.path.join(base, rel); os.makedirs(d, exist_ok=True)
            open(os.path.join(d, 'index.html'), 'w', encoding='utf-8').write(html_)
            print(os.path.relpath(os.path.join(d, 'index.html'), root))
write_extra()
