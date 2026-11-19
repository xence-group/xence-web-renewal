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
   types=[('build','建てたい・置きたい','温室、宿、住宅、什器の設計施工'),('resource','資源を活かしたい','製材所・解体事業者・自治体の方'),('partner','技術で組みたい','企業・大学・海外パートナーの方'),('invest','投資・事業提携','投資家・事業会社の方'),('other','その他','取材・採用・その他のご相談')],
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
   types=[('build','Build with us','Greenhouses, guesthouses, homes and furniture'),('resource','Supply materials','Sawmills, demolition firms and municipalities'),('partner','Partner on technology','Companies, universities and overseas partners'),('invest','Invest or partner','Investors and corporate partners'),('other','Other','Press, careers and anything else')],
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
header .logo{font-weight:800;font-size:24px;letter-spacing:.04em}
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
article .body a{color:%(accent)s;word-break:break-all}
.back{display:inline-block;margin-top:56px;font-size:14px;color:#A9A69F}
footer{border-top:1px solid #222;padding:64px 4vw;display:flex;justify-content:space-between;flex-wrap:wrap;gap:32px;font-size:13px;color:#A9A69F;line-height:1.9}
footer .f{margin:0 0 12px;color:#fff;font-weight:800;font-size:20px}
@media (max-width:860px){
 header nav .sec{display:none}
 header .cta{padding:10px 16px;font-size:12px}
 header .logo{font-size:20px}
 main{padding:72px 5vw 100px}
 .grid{grid-template-columns:1fr;gap:40px}
 .row2{grid-template-columns:1fr;gap:0}
 .types{grid-template-columns:1fr}
 .news a{grid-template-columns:1fr 20px;gap:4px 12px}
 .news .d{grid-column:1/-1}
}
'''

def shell(L, title, body, path, script=''):
    t = T[L]; pre = t['pre']
    nav = ''.join(f'<a class="sec" href="{pre}/#{a}">{b}</a>' for a, b in [('model','Model'),('technology','Technology'),('projects','Projects'),('news','News'),('growth','Investors')])
    return f'''<!doctype html>
<html lang="{L}">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="robots" content="noindex, nofollow">
<title>{title}</title>
<link rel="icon" type="image/svg+xml" href="/assets/favicon.svg">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800;900&amp;family=Zen+Kaku+Gothic+New:wght@400;500;700;900&amp;display=swap" rel="stylesheet">
<style>{CSS % dict(font=t['font'], accent=ACCENT)}</style>
</head>
<body>
<header>
<a class="logo en" href="{pre}/">XENCE</a>
<nav class="en">{nav}
<a class="cta" href="{pre}/contact/">CONTACT <span style="color:{ACCENT}">●</span></a>
<span class="lang"><a href="{path}" style="{t['lang_ja']}">JA</a> / <a href="/en{path}" style="{t['lang_en']}">EN</a></span>
</nav>
</header>
{body}
<footer>
<div><p class="f en">XENCE</p>{t['foot1']}</div>
<div>{t['foot2']}</div>
<div class="en">Instagram ／ note ／ LinkedIn<br>© XENCE Inc.</div>
</footer>
{script}
</body>
</html>
'''

def contact(L):
    t = T[L]; pre = t['pre']
    types = ''.join(f'<label><input type="radio" name="type" value="{v}"{" required" if i == 0 else ""}><span class="n en">{i+1:02d}</span><span class="t">{a}</span><span class="d">{b}</span></label>' for i, (v, a, b) in enumerate(t['types']))
    side = ('<div class="side"><b>株式会社XENCE</b>〒460-0008<br>愛知県名古屋市中区栄一丁目29番29号<br>SIMON 10 SAKAE 401<br><br><b>Düsseldorf</b>欧州でのご相談も承ります。<br><br><b>メール</b><a href="mailto:info@xencegroup.com">info@xencegroup.com</a></div>' if L == 'ja' else
            '<div class="side"><b>XENCE Inc.</b>SIMON 10 SAKAE 401<br>1-29-29 Sakae, Naka-ku<br>Nagoya 460-0008, Japan<br><br><b>Düsseldorf</b>We also meet partners in Europe.<br><br><b>Email</b><a href="mailto:info@xencegroup.com">info@xencegroup.com</a></div>')
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
    script = f'''<script>
(function(){{
var p=new URLSearchParams(location.search).get('type');
var r=p&&document.querySelector('input[name="type"][value="'+p.replace(/[^a-z]/g,'')+'"]'); if(r) r.checked=true;
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
const fmtBody = (s) => esc(s.trim()).split(/\\n\\s*\\n/).map((p) => '<p>' + p.replace(/\\n/g, '<br>').replace(/(https?:\\/\\/[^\\s<]+)/g, '<a href="$1" target="_blank" rel="noopener">$1</a>') + '</p>').join('');
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
