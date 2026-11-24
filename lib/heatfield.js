// XENCE Research — "heat field" motion graphic (canvas, no dependencies).
// Each square is drawn at a size proportional to its temperature. Heat that was
// dumped into the air around the data centre travels through the heat interface
// and fills the greenhouse and the fish farm, then the loop starts again.
// Usage: mountHeatField(canvas, { lang: 'ja' | 'en', still: false, t: null })
//   still:true draws one frame (t seconds, default the "filled" moment) — used for
//   thumbnails, the PDF cover and the OGP image, so motion and stills always match.

const W = 1600, H = 900, CELL = 20;
const DUR = 14;                  // loop length (s)
export const KEY_T = 10.2;       // the frame used for stills
const ORANGE = [255, 85, 40], WHITE = [255, 255, 255], GREY = [105, 102, 96];

const LABEL = {
  ja: { dc: 'データセンター', dcs: '5 MW・排熱 30–35℃', hi: '熱インターフェース', gh: '木造温室', ghs: '1.8 ha', fish: '陸上養殖棟', house: '住宅地', km: '1 km',
        legend: 'マスの大きさ＝温度（℃）', air: '空気へ捨てる熱', share: '配る熱' },
  en: { dc: 'Data centre', dcs: '5 MW · heat at 30–35 °C', hi: 'Heat interface', gh: 'Timber greenhouse', ghs: '1.8 ha', fish: 'Fish farm', house: 'Housing', km: '1 km',
        legend: 'Square size = temperature (°C)', air: 'Heat thrown into the air', share: 'Heat that is shared' },
};

// blocks in design units
const DC = { x: 100, y: 330, w: 260, h: 400 };
const HI = { x: 420, y: 560, w: 60, h: 60 };
const GH = { x: 540, y: 220, w: 520, h: 510 };
const FF = { x: 1120, y: 460, w: 220, h: 270 };
const HOUSES = [[1440, 250], [1520, 250], [1440, 400], [1520, 400], [1450, 550], [1530, 550], [1440, 690], [1520, 690]];

const clamp = (v, a = 0, b = 1) => Math.max(a, Math.min(b, v));
const ease = (v) => { v = clamp(v); return v * v * (3 - 2 * v); };
const inside = (b, x, y) => x >= b.x && x < b.x + b.w && y >= b.y && y < b.y + b.h;
const hash = (x, y) => { const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453; return s - Math.floor(s); };

// temperature (°C) of a cell centre at time t
function temp(x, y, t) {
  const n = hash(x, y);
  const flicker = Math.sin(t * 2.2 + n * 6.28) * 0.6;
  // phases: 0–3 s heat only dumped to air, 3–9 s heat flows to recipients, 9–12 hold, 12–14 fade
  const route = ease((t - 2.6) / 1.2);            // interface opens
  const fade = 1 - ease((t - 12.2) / 1.6);
  if (inside(DC, x, y)) return 31 + n * 4 + flicker;
  if (inside(HI, x, y)) return 12 + (21 + flicker) * Math.max(route * fade, 0.15);
  if (inside(GH, x, y)) {
    const d = Math.hypot(x - GH.x, (y - (HI.y + HI.h / 2)) * 0.8) / 640;   // wavefront from the inlet
    const f = ease((t - 3.4 - d * 4.2) / 1.1) * fade;
    return 12 + (12.5 + n * 5 - d * 3 + flicker) * f;
  }
  if (inside(FF, x, y)) {
    const d = Math.hypot(x - FF.x, y - (FF.y + FF.h / 2)) / 300;
    const f = ease((t - 6.6 - d * 1.6) / 1.0) * fade;
    return 12 + (14 + n * 4 - d * 2 + flicker) * f;
  }
  // ambient: the halo of heat dumped into the air shrinks as the heat is routed away
  const dx = Math.max(DC.x - x, 0, x - (DC.x + DC.w)), dy = Math.max(DC.y - y, 0, y - (DC.y + DC.h));
  const dist = Math.hypot(dx, dy);
  const halo = (1 - ease((t - 3) / 3) * 0.85) * Math.max(Math.min(1, ease(t / 1.2) + (1 - fade)), 0.15);
  return 12 + 9 * Math.exp(-dist / 70) * halo + n * 0.8;
}

function mix(a, b, k) { return `rgb(${a.map((v, i) => Math.round(v + (b[i] - v) * k)).join(',')})`; }

function drawFrame(ctx, t, lang) {
  const L = LABEL[lang] || LABEL.ja;
  ctx.fillStyle = '#000'; ctx.fillRect(0, 0, W, H);
  for (let y = CELL / 2; y < H; y += CELL) {
    for (let x = CELL / 2; x < W; x += CELL) {
      const T = temp(x, y, t);
      const k = clamp((T - 10) / 26);
      const s = Math.max(1.6, (CELL - 3) * k);
      let col;
      if (inside(DC, x, y)) col = mix(GREY, WHITE, clamp((T - 28) / 8));
      else if (inside(GH, x, y) || inside(FF, x, y) || inside(HI, x, y)) col = T < 15 ? mix(GREY, GREY, 0) : mix(GREY, ORANGE, clamp((T - 15) / 10));
      else col = T > 15 ? mix(GREY, ORANGE, clamp((T - 15) / 14) * 0.75) : 'rgb(70,68,64)';
      ctx.fillStyle = col;
      ctx.fillRect(x - s / 2, y - s / 2, s, s);
    }
  }
  // pipe + moving pulses
  const route = ease((t - 2.6) / 1.2) * (1 - ease((t - 12.2) / 1.6));
  const pipe = [[DC.x + DC.w, HI.y + HI.h / 2], [HI.x, HI.y + HI.h / 2]];
  const pipe2 = [[HI.x + HI.w, HI.y + HI.h / 2], [GH.x, HI.y + HI.h / 2]];
  const pipe3 = [[GH.x + GH.w, FF.y + FF.h / 2], [FF.x, FF.y + FF.h / 2]];
  ctx.strokeStyle = `rgba(255,85,40,${0.25 + 0.75 * route})`; ctx.lineWidth = 2;
  for (const p of [pipe, pipe2, pipe3]) { ctx.beginPath(); ctx.moveTo(...p[0]); ctx.lineTo(...p[1]); ctx.stroke(); }
  if (route > 0.05) {
    ctx.fillStyle = '#FF5528';
    for (const p of [pipe, pipe2, pipe3]) for (let i = 0; i < 3; i++) {
      const u = (t * 0.9 + i / 3) % 1;
      ctx.fillRect(p[0][0] + (p[1][0] - p[0][0]) * u - 4, p[0][1] - 4, 8, 8);
    }
  }
  // outlines
  ctx.lineWidth = 1.5;
  ctx.strokeStyle = 'rgba(255,255,255,.55)'; ctx.strokeRect(DC.x, DC.y, DC.w, DC.h);
  ctx.strokeStyle = `rgba(255,85,40,${0.35 + 0.65 * route})`; ctx.strokeRect(HI.x, HI.y, HI.w, HI.h); ctx.strokeRect(GH.x, GH.y, GH.w, GH.h); ctx.strokeRect(FF.x, FF.y, FF.w, FF.h);
  ctx.strokeStyle = 'rgba(255,255,255,.7)';
  for (const [hx, hy] of HOUSES) ctx.strokeRect(hx, hy, 56, 56);
  // 1 km arc
  ctx.setLineDash([4, 6]); ctx.strokeStyle = 'rgba(255,255,255,.35)';
  ctx.beginPath(); ctx.arc(DC.x + DC.w / 2, DC.y + DC.h / 2, 1200, -0.42, 0.42); ctx.stroke(); ctx.setLineDash([]);
  // labels
  const font = lang === 'en' ? "600 22px Montserrat, sans-serif" : "700 22px 'Zen Kaku Gothic New', sans-serif";
  const sub = lang === 'en' ? "500 17px Montserrat, sans-serif" : "500 17px 'Zen Kaku Gothic New', sans-serif";
  const lab = (x, y, a, b, c = '#fff') => { ctx.fillStyle = c; ctx.font = font; ctx.fillText(a, x, y); if (b) { ctx.fillStyle = '#A9A69F'; ctx.font = sub; ctx.fillText(b, x, y + 24); } };
  lab(DC.x, DC.y - 44, L.dc, L.dcs);
  lab(GH.x, GH.y - 44, L.gh, L.ghs, '#FF5528');
  lab(FF.x, FF.y - 44, L.fish, '', '#FF5528');
  ctx.strokeStyle = `rgba(255,85,40,${0.35 + 0.65 * route})`; ctx.beginPath(); ctx.moveTo(HI.x + HI.w / 2, HI.y + HI.h); ctx.lineTo(HI.x + HI.w / 2, 762); ctx.stroke();
  lab(HI.x - 40, 790, L.hi, '', '#FF5528');
  lab(1440, 220, L.house);
  ctx.fillStyle = '#A9A69F'; ctx.font = sub; ctx.fillText(L.km, 1330, 150);
  // legend
  ctx.font = sub; ctx.fillStyle = '#A9A69F'; ctx.fillText(L.legend, 100, 840);
  let lx = 100 + ctx.measureText(L.legend).width + 24;
  for (const T of [12, 20, 25, 30, 35]) {
    const s = Math.max(1.6, (CELL - 3) * clamp((T - 10) / 26));
    ctx.fillStyle = T < 15 ? 'rgb(70,68,64)' : mix(GREY, ORANGE, clamp((T - 15) / 10));
    ctx.fillRect(lx, 834 - s / 2, s, s);
    ctx.fillStyle = '#A9A69F'; ctx.fillText(String(T), lx + 22, 840); lx += 74;
  }
  // phase caption
  const capA = 1 - ease((t - 2.4) / 0.8), capB = ease((t - 4) / 0.8) * (1 - ease((t - 12.2) / 1));
  ctx.font = font;
  if (capA > 0.01) { ctx.fillStyle = `rgba(169,166,159,${capA})`; ctx.fillText('← ' + L.air, DC.x + DC.w + 40, DC.y - 10); }
  if (capB > 0.01) { ctx.fillStyle = `rgba(255,85,40,${capB})`; ctx.fillText(L.share + ' →', HI.x - 20, HI.y - 26); }
}

export function mountHeatField(canvas, opt = {}) {
  const lang = opt.lang || 'ja';
  const ctx = canvas.getContext('2d');
  const fit = () => {
    const r = canvas.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round((r.width || W) * dpr); canvas.height = Math.round((r.width || W) * dpr * H / W);
    ctx.setTransform(canvas.width / W, 0, 0, canvas.height / H, 0, 0);
  };
  fit();
  const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (opt.still || reduce) {
    const draw = () => { fit(); drawFrame(ctx, opt.t == null ? KEY_T : opt.t, lang); };
    (document.fonts ? document.fonts.ready : Promise.resolve()).then(draw);
    window.addEventListener('resize', draw);
    return { stop() {} };
  }
  let raf = 0, t0 = performance.now(), visible = true;
  const loop = (now) => { if (visible) drawFrame(ctx, ((now - t0) / 1000) % DUR, lang); raf = requestAnimationFrame(loop); };
  raf = requestAnimationFrame(loop);
  window.addEventListener('resize', fit);
  if ('IntersectionObserver' in window) new IntersectionObserver((e) => { visible = e[0].isIntersecting; }).observe(canvas);
  return { stop() { cancelAnimationFrame(raf); } };
}
export const SCENES = { heat: mountHeatField };
