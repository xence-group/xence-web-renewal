#!/usr/bin/env python3
"""Product Passport の公開ページを生成する。

  python3 src/pp/build.py

src/pp/passports.json の items 1件ごとに /pp/<id>/index.html を書き出す。
QRコードに印字した URL（https://xencegroup.com/pp/<id>）はこのページに届く。
"""
import html
import json
import pathlib

ROOT = pathlib.Path(__file__).resolve().parents[2]
DATA = json.loads((ROOT / "src/pp/passports.json").read_text(encoding="utf-8"))

CSS = """
*{box-sizing:border-box}
html{-webkit-text-size-adjust:100%}
body{margin:0;background:#EDECE9;color:#111;font-family:'Zen Kaku Gothic New',sans-serif;-webkit-font-smoothing:antialiased}
a{color:inherit}
.en{font-family:Montserrat,sans-serif}
.page{max-width:560px;margin:0 auto;background:#fff;min-height:100vh}
header{position:sticky;top:0;z-index:10;display:flex;align-items:center;justify-content:space-between;gap:12px;background:#111;color:#fff;padding:16px 20px}
header a{display:flex;align-items:center}
header img{height:16px;width:auto;display:block}
header span{font-family:Montserrat,sans-serif;font-weight:700;font-size:15px;letter-spacing:.02em}
.top{text-align:center;padding:48px 20px 8px}
.brand{margin:0;font-family:Montserrat,sans-serif;font-weight:800;font-size:34px;letter-spacing:.02em}
.model{margin:14px 0 0;font-family:Montserrat,sans-serif;font-weight:700;font-size:18px}
.pid{margin:18px 0 0;font-family:Montserrat,sans-serif;font-size:13px;color:#6B6964;letter-spacing:.04em}
.hero{display:block;width:100%;height:auto;margin:24px 0 0;background:#F6F5F2;aspect-ratio:3/2;object-fit:cover}
.intro{padding:40px 20px 8px}
.intro h2{margin:0 0 20px;font-size:28px;line-height:1.35;font-weight:900}
.intro p{margin:0 0 16px;font-size:14px;line-height:1.9;color:#333}
.video{display:block;width:100%;height:auto;margin:32px 0 0;background:#000;aspect-ratio:16/9;object-fit:cover}
.sec{padding:64px 0 0}
.head{text-align:center;margin:0 0 28px}
.head h2{margin:0;font-family:Montserrat,sans-serif;font-weight:800;font-size:28px}
.head p{margin:6px 0 0;font-size:12px;color:#6B6964}
.gallery{display:flex;gap:12px;overflow-x:auto;scroll-snap-type:x mandatory;padding:0 20px 8px;-webkit-overflow-scrolling:touch;scrollbar-width:none}
.gallery::-webkit-scrollbar{display:none}
.gallery img{flex:0 0 84%;width:84%;height:auto;aspect-ratio:3/2;object-fit:cover;border-radius:12px;scroll-snap-align:center;background:#F6F5F2}
.dots{display:flex;justify-content:center;gap:6px;margin:14px 0 0}
.dots i{width:6px;height:6px;border-radius:50%;background:#D3D1CC}
.dots i.on{background:#111}
.story{padding:48px 20px 0}
.story h3{margin:0 0 16px;font-size:20px;line-height:1.6;font-weight:900}
.story p{margin:0 0 24px;font-size:14px;line-height:1.9;color:#333}
.story img{display:block;width:100%;height:auto}
.mat{margin:0 20px;border-top:1px solid #D3D1CC}
.mat div{display:grid;grid-template-columns:7.5em 1fr;gap:12px;padding:18px 0;border-bottom:1px solid #D3D1CC;font-size:14px;line-height:1.6}
.mat dt{color:#6B6964}
.mat dd{margin:0;font-weight:500}
.stats{margin:48px 20px 0;padding:32px 24px;border-radius:16px;background:#FF5528;color:#fff}
.stats .lab{margin:0;font-size:18px;font-weight:900}
.stats .num{margin:8px 0 0;font-family:Montserrat,sans-serif;font-weight:800;font-size:56px;line-height:1.05}
.stats .num small{font-size:22px;margin-left:8px}
.stats .lab + .num + .lab{margin-top:28px}
.contact{text-align:center;padding:40px 20px 56px}
.contact a{display:inline-flex;align-items:center;gap:12px;background:#111;color:#fff;text-decoration:none;font-weight:700;font-size:14px;padding:14px 26px;border-radius:999px}
.contact a:after{content:"";width:10px;height:10px;border-radius:50%;background:#FF5528}
footer{background:#111;color:#fff;padding:48px 20px 32px;font-size:13px;line-height:1.8}
footer img{height:14px;width:auto;display:block;margin:0 0 20px}
footer b{display:block;font-size:15px;margin-bottom:6px}
footer .links{display:flex;gap:20px;margin:24px 0 0;font-family:Montserrat,sans-serif;font-weight:600}
footer .links a{text-decoration:none}
footer small{display:block;margin-top:28px;color:#A9A69F;font-family:Montserrat,sans-serif}
@media (prefers-color-scheme:dark){body{background:#000}}
"""

SCRIPT = """
(function(){var g=document.querySelector('.gallery'),d=document.querySelectorAll('.dots i');if(!g||!d.length)return;
g.addEventListener('scroll',function(){var w=g.scrollWidth-g.clientWidth,i=w>0?Math.round(g.scrollLeft/w*(d.length-1)):0;
d.forEach(function(e,k){e.classList.toggle('on',k===i)})},{passive:true});})();
"""


def e(s):
    return html.escape(s, quote=True)


def page(item, m):
    pid = item["id"]
    url = f"https://xencegroup.com/pp/{pid}/"
    title = f"XENCE | Product Passport | {m['brand']} {m['model']} #{pid}"
    desc = m["catch"] + " " + m["body"][0]
    body = "".join(f"<p>{e(p)}</p>" for p in m["body"])
    gallery = "".join(
        f'<img src="{g}" alt="{e(m["brand"])} {e(m["model"])} 写真{i + 1}" loading="lazy" width="1200" height="800">'
        for i, g in enumerate(m["gallery"])
    )
    dots = "".join(f'<i class="{"on" if i == 0 else ""}"></i>' for i in range(len(m["gallery"])))
    mats = "".join(f"<div><dt>{e(k)}</dt><dd>{e(v)}</dd></div>" for k, v in m["materials"])
    return f"""<!doctype html>
<html lang="ja">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>{e(title)}</title>
<meta name="description" content="{e(desc)}">
<meta name="robots" content="noindex, follow">
<link rel="canonical" href="{url}">
<meta property="og:type" content="website">
<meta property="og:site_name" content="XENCE">
<meta property="og:title" content="{e(title)}">
<meta property="og:description" content="{e(desc)}">
<meta property="og:url" content="{url}">
<meta property="og:image" content="https://xencegroup.com{m['gallery'][0]}">
<meta name="theme-color" content="#111111">
<link rel="icon" type="image/svg+xml" href="/assets/favicon_x2026.svg"><link rel="apple-touch-icon" href="/assets/apple-touch-icon_x2026.png">
<link rel="preconnect" href="https://fonts.googleapis.com">
<link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@500;600;700;800&amp;family=Zen+Kaku+Gothic+New:wght@400;500;700;900&amp;display=swap" rel="stylesheet">
<style>{CSS}</style>
</head>
<body>
<div class="page">
<header><a href="/" aria-label="XENCE"><img src="/assets/logo_xence_wh_2026.svg" alt="XENCE" width="92" height="16"></a><span>Product Passport</span></header>
<main>
<section class="top">
<p class="brand">{e(m['brand'])}</p>
<p class="model">{e(m['model'])}</p>
<p class="pid">#{e(pid)}</p>
</section>
<img class="hero" src="{m['hero']}" alt="{e(m['hero_alt'])}" width="1200" height="800">
<section class="intro">
<h2>{e(m['catch'])}</h2>
{body}
</section>
<video class="video" src="{m['video']}#t=0.01" poster="{m['video_poster']}" autoplay muted loop playsinline preload="metadata"></video>
<section class="sec">
<div class="head"><h2>Gallery</h2><p>ギャラリー</p></div>
<div class="gallery">{gallery}</div>
<div class="dots">{dots}</div>
<div class="story">
<h3>{m['story_title']}</h3>
<p>{e(m['story_body'])}</p>
<img src="{m['story_img']}" alt="{e(m['story_img_alt'])}" loading="lazy" width="1254" height="836">
</div>
</section>
<section class="sec">
<div class="head"><h2>Materials</h2><p>素材情報</p></div>
<dl class="mat">{mats}</dl>
<div class="stats">
<p class="lab">この製品の未活用材割合</p>
<p class="num">{e(m['unused_ratio'])}<small>%</small></p>
<p class="lab">炭素貯蔵量</p>
<p class="num">{e(m['carbon_kg'])}<small>kg CO2</small></p>
</div>
</section>
<div class="contact"><a href="/contact/">お問い合わせ</a></div>
</main>
<footer>
<img src="/assets/logo_xence_wh_2026.svg" alt="XENCE" width="80" height="14">
<b>株式会社 XENCE（ゼンス）</b>
愛知県名古屋市中区栄一丁目29番29号<br>SIMON 10 SAKAE 401
<div class="links"><a href="/">XENCE Inc.</a><a href="https://note.com/xence" rel="noopener">note</a></div>
<small>©2026 XENCE Inc. All Rights Reserved.</small>
</footer>
</div>
<script>{SCRIPT}</script>
</body>
</html>
"""


def main():
    for item in DATA["items"]:
        m = DATA["models"][item["model"]]
        out = ROOT / "pp" / item["id"] / "index.html"
        out.parent.mkdir(parents=True, exist_ok=True)
        out.write_text(page(item, m), encoding="utf-8")
        print("wrote", out.relative_to(ROOT))


if __name__ == "__main__":
    main()
