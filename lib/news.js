// XENCE news source: Google Sheet "XENCE ウェブサイト ニュース管理" (tab "news").
// Edit the sheet to add news; no redeploy is needed. FALLBACK is used only if the sheet can't be reached.
import { ARCHIVE } from '/lib/news-archive.js';
export const SHEET_ID = '1jqEVQglAgmz7-vEnXTXcyz-r9akOx1on-Ko4J2pKa0A';
export const FALLBACK = [{"date": "2026/10/23", "id": "9LhNPbQ0", "ja": "「未活用材をどれだけ使えたか」代官山T-SITEにて木材トレーサビリティの試験運用を開始", "en": "Daikanyama T-SITE begins a timber traceability trial: how much unused wood was put to use", "bodyJa": "", "bodyEn": "", "img": "", "link": "studio:9LhNPbQ0"}, {"date": "2026/9/11", "id": "_kRFwB8a", "ja": "代官山T-SITE「爽涼祭」に、端材から生まれた提灯台が登場", "en": "Lantern stands made from offcuts at Daikanyama T-SITE’s summer festival", "bodyJa": "", "bodyEn": "", "img": "", "link": "studio:_kRFwB8a"}, {"date": "2026/7/22", "id": "9VckaqYJ", "ja": "日経木材新聞にて「サーキュラー木造温室®︎」をご紹介いただきました", "en": "Circular Timber Greenhouse® featured in the Nikkei Mokuzai Shimbun", "bodyJa": "", "bodyEn": "", "img": "", "link": "studio:9VckaqYJ"}, {"date": "2026/6/30", "id": "260630", "ja": "XENCE、愛知県の補助金事業に採択「サーキュラー木造温室™」の新モデル開発を開始", "en": "Selected for an Aichi Prefecture grant; development of a new Circular Timber Greenhouse™ model begins", "bodyJa": "", "bodyEn": "", "img": "", "link": "studio:260630"}, {"date": "2026/6/16", "id": "260616", "ja": "施工特化の新部門「XENCE Engineering」を発足", "en": "XENCE Engineering, a new construction-focused division, launches", "bodyJa": "", "bodyEn": "", "img": "", "link": "studio:260616"}, {"date": "2026/6/2", "id": "260602", "ja": "「サーキュラー木造温室™」が Red Dot Design Award 2026 アーバンデザイン部門を受賞", "en": "Circular Timber Greenhouse™ wins Red Dot Design Award 2026, Urban Design", "bodyJa": "", "bodyEn": "", "img": "", "link": "studio:260602"}, {"date": "2026/4/7", "id": "260407", "ja": "プレスリリース｜名古屋大学発ベンチャーに認定。デジタル設計施工×未利用木材で、建設業を「ジェネレーティブコントラクト」へ", "en": "Press release: certified as a Nagoya University venture, moving construction toward the “generative contract”", "bodyJa": "", "bodyEn": "", "img": "", "link": "studio:260407"}, {"date": "2026/3/30", "id": "zNSZMKlS", "ja": "中京テレビ「アプデの森」でサーキュラー木造温室®︎をご紹介いただきました", "en": "Circular Timber Greenhouse® featured on Chukyo TV’s “Apude no Mori”", "bodyJa": "", "bodyEn": "", "img": "", "link": "studio:zNSZMKlS"}, {"date": "2026/1/16", "id": "260116", "ja": "超異分野学会 愛知フォーラム2026 |「サーキュラー木造温室」が大冷工業賞を受賞しました", "en": "Circular Timber Greenhouse wins the Dairei Kogyo Award at the Hyper-Interdisciplinary Conference Aichi Forum 2026", "bodyJa": "", "bodyEn": "", "img": "", "link": "studio:260116"}, {"date": "2025/12/31", "id": "260101", "ja": "XENCE、2026年1月1日より株式会社化し、新たなスタート。", "en": "XENCE incorporates as a kabushiki kaisha from 1 January 2026", "bodyJa": "", "bodyEn": "", "img": "", "link": "studio:260101"}, {"date": "2025/12/20", "id": "251220", "ja": "日経クロステックに取材掲載いただきました", "en": "Featured in Nikkei xTECH", "bodyJa": "", "bodyEn": "", "img": "", "link": "studio:251220"}, {"date": "2025/9/30", "id": "251001", "ja": "グッドデザイン賞 2025 | サーキュラー木造温室が受賞しました", "en": "Circular Timber Greenhouse wins the Good Design Award 2025", "bodyJa": "", "bodyEn": "", "img": "", "link": "studio:251001"}, {"date": "2025/9/29", "id": "250930", "ja": "ウッドデザイン賞 2025 | サーキュラー木造温室が受賞しました", "en": "Circular Timber Greenhouse wins the Japan Wood Design Award 2025", "bodyJa": "", "bodyEn": "", "img": "", "link": "studio:250930"}, {"date": "2024/11/20", "id": "241120", "ja": "第36回技術研究発表会 優秀賞 | 金属3Dプリンター製接合部の開発が受賞しました", "en": "Excellence Award at the 36th Technical Research Presentation for a metal 3D-printed joint", "bodyJa": "", "bodyEn": "", "img": "", "link": "studio:241120"}];

const fmtDate = (s) => {
  if (!s) return '';
  let m = String(s).match(/Date\((\d+),(\d+),(\d+)/);
  if (m) return `${m[1]}/${+m[2] + 1}/${+m[3]}`;
  m = String(s).match(/(\d{4})[\/\-.](\d{1,2})[\/\-.](\d{1,2})/);
  if (m) return `${m[1]}/${+m[2]}/${+m[3]}`;
  return String(s);
};
const key = (d) => { const p = d.split('/').map(Number); return (p[0] || 0) * 10000 + (p[1] || 0) * 100 + (p[2] || 0); };
export const driveImg = (u) => {
  if (!u) return '';
  const m = String(u).match(/\/d\/([\w-]{20,})/) || String(u).match(/[?&]id=([\w-]{20,})/);
  return m ? `https://lh3.googleusercontent.com/d/${m[1]}=w1600` : u;
};

const isStudio = (u) => /^studio:|^https?:\/\/(www\.)?xencegroup\.com\/news\//.test(u || '');
const withArchive = (list) => list.map((n) => {
  const a = ARCHIVE[n.id];
  const o = { ...n };
  if (a && !o.bodyJa) o.bodyJa = a;
  if (isStudio(o.link)) o.link = '';
  return o;
});
let cache = null;
export function loadNews(timeout = 6000) {
  if (cache) return cache;
  cache = new Promise((resolve) => {
    const cb = '__xnews' + Date.now();
    const s = document.createElement('script');
    let done = false;
    const finish = (v) => { if (done) return; done = true; v = withArchive(v); try { delete window[cb]; } catch (e) {} s.remove(); resolve(v); };
    window[cb] = (res) => {
      try {
        const rows = (res.table && res.table.rows) || [];
        const val = (c, i) => (c[i] ? (c[i].v == null ? '' : c[i].v) : '');
        const out = [];
        rows.forEach((r) => {
          const c = r.c || [];
          if (val(c, 0) !== true) return;
          const date = fmtDate((c[1] && c[1].f) || val(c, 1));
          const ja = String(val(c, 3)).trim();
          if (!date || !ja) return;
          out.push({ date, id: String(val(c, 2)).trim(), ja, en: String(val(c, 4)).trim(), bodyJa: String(val(c, 5)), bodyEn: String(val(c, 6)), img: driveImg(String(val(c, 7)).trim()), link: String(val(c, 8)).trim() });
        });
        out.sort((a, b) => key(b.date) - key(a.date));
        finish(out.length ? out : FALLBACK);
      } catch (e) { finish(FALLBACK); }
    };
    s.src = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?headers=1&sheet=news&tqx=responseHandler:${cb}&_=${Date.now()}`;
    s.onerror = () => finish(FALLBACK);
    setTimeout(() => finish(FALLBACK), timeout);
    document.head.appendChild(s);
  });
  return cache;
}

// href for a news item: internal article page when it has a body, otherwise its external link
export const newsHref = (n, lang) => {
  const body = lang === 'en' ? (n.bodyEn || n.bodyJa) : n.bodyJa;
  if (body && n.id) return `${lang === 'en' ? '/en' : ''}/news/?id=${encodeURIComponent(n.id)}`;
  return n.link || '';
};
export const isExternal = (href) => /^https?:\/\//.test(href);
