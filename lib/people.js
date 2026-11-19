// XENCE people source: Google Sheet "XENCE ウェブサイト ニュース管理" (tab "people").
// Columns: 掲載 (checkbox) | 順番 | 名前 | 役職 | 写真 (Drive link or /assets/ path).
// Uncheck 掲載 to hide someone; add a row to add someone. FALLBACK is used only if the sheet can't be reached.
import { SHEET_ID, driveImg } from '/lib/news.js';
export const FALLBACK = [
  { name: 'Kotaro Ozawa', role: 'Founder & CEO', img: '/assets/ko.jpg' },
  { name: 'Asako Osedo', role: 'Co-Director, Service Design Officer', img: '/assets/ao.jpg' },
  { name: 'Koji Saito', role: 'Lead Architect', img: '/assets/ks.jpg' },
  { name: 'Akihiro Yamada', role: 'Lead Construction Management', img: '/assets/ay.jpg' },
  { name: 'Kotaro Jin', role: 'Architect', img: '/assets/kj.jpg' },
  { name: 'Kosuke Kuroda', role: 'Designer', img: '/assets/kk.jpg' },
  { name: 'Mako Sumi', role: 'Community Manager', img: '/assets/ms.jpg' },
];
let cache = null;
export function loadPeople(timeout = 6000) {
  if (cache) return cache;
  cache = new Promise((resolve) => {
    const cb = '__xppl' + Date.now();
    const s = document.createElement('script');
    let done = false;
    const finish = (v) => { if (done) return; done = true; try { delete window[cb]; } catch (e) {} s.remove(); resolve(v); };
    window[cb] = (res) => {
      try {
        const rows = (res.table && res.table.rows) || [];
        const val = (c, i) => (c[i] ? (c[i].v == null ? '' : c[i].v) : '');
        const out = [];
        rows.forEach((r) => {
          const c = r.c || [];
          if (val(c, 0) !== true) return;
          const name = String(val(c, 2)).trim();
          if (!name) return;
          const img = String(val(c, 4)).trim();
          out.push({ order: Number(val(c, 1)) || 999, name, role: String(val(c, 3)).trim(), img: img.startsWith('/') ? img : driveImg(img) });
        });
        out.sort((a, b) => a.order - b.order);
        finish(out.length ? out : FALLBACK);
      } catch (e) { finish(FALLBACK); }
    };
    s.src = `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?headers=1&sheet=people&tqx=responseHandler:${cb}&_=${Date.now()}`;
    s.onerror = () => finish(FALLBACK);
    setTimeout(() => finish(FALLBACK), timeout);
    document.head.appendChild(s);
  });
  return cache;
}
