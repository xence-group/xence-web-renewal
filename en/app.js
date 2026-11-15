import { h, render, Component as PC } from '/vendor/preact.module.js';
import htm from '/vendor/htm.module.js';
const html = htm.bind(h);

class App extends PC {
constructor(props) {
super(props);
this.D = {"techs": [{"num": "01", "title": "Design engine", "tag": "COMPUTATIONAL DESIGN", "body": "Feed in what’s actually available — lengths, sections, quantities — and the engine generates the structure and every cut. One rule set designs greenhouses, furniture and pavilions.", "media": "/assets/t1_design.mp4", "caption": "Irregular stock automatically allocated to frame members", "alt": "Animation of inventory boards being allocated to a greenhouse frame", "video": true}, {"num": "02", "title": "Structural analysis", "tag": "STRUCTURAL ANALYSIS", "body": "Snow and wind loads are run across the full 3D frame, checking deflection and utilisation member by member — the evidence that non-standard material can carry real loads.", "media": "/assets/out_t2_analysis.mp4", "caption": "Snow and wind load cases on the 3D frame, utilisation per member (illustrative)", "alt": "Animation of a greenhouse frame deflecting under snow and wind, members coloured by utilisation", "video": true}, {"num": "03", "title": "Digital fabrication", "tag": "FABRICATION", "body": "We scan irregular stock and shape each member around its curve, grain and waney edge instead of cutting them away. Timber joints lock it together — no steel hardware, fully demountable.", "media": "/assets/out_t3_fab.mp4", "caption": "A curved board scanned, and a member shaped to follow its curve", "alt": "Animation of a curved board being scanned and a member and toolpath following its shape", "video": true}, {"num": "04", "title": "3D printing", "tag": "ADDITIVE MANUFACTURING", "body": "Free-form geometry is stood up, checked for overhangs and automatically reshaped to be printable before slicing. Shown here in steel (WAAM); the same pipeline runs resin and wood composite.", "media": "/assets/out_t4_waam_v4.mp4", "caption": "Stood up, checked for overhangs, auto-adjusted to be printable, then built bottom-up (steel WAAM example)", "alt": "Animation of a curved surface rotating upright and being printed layer by layer", "video": true}, {"num": "05", "title": "Material Passport", "tag": "TRACEABILITY", "body": "Felling, haulage, sawing, drying, fabrication, building: each step adds its history and carbon to one QR code that travels with the piece into its next use. Live since October 2026.", "media": "/assets/out_t5_passport.mp4", "caption": "History and carbon build up in one QR code, forest to building (sample record)", "alt": "Animation of a QR passport collecting records from forest, trailer, sawmill, kiln, fabrication and building", "video": true}, {"num": "06", "title": "LCA & operating data", "tag": "WHOLE-LIFE CARBON", "body": "We calculate whole-life carbon with J-CAT and One Click LCA, then pair it with operating data to evidence a building’s value as an asset.", "media": "/assets/t6_lca.mp4", "caption": "Greenhouse carbon storage, whole-life carbon in J-CAT, and campus facility-cost analytics", "alt": "Animation showing carbon storage, lifecycle carbon breakdown and facility cost breakdown", "video": true}], "projects": [{"id": "p1", "cat": "gh", "img": "/assets/gh_night_in.jpg", "title": "Circular Timber Greenhouse™", "type": "Greenhouse", "input": "Sawmill offcuts", "tech": "Design engine · Analysis", "place": "Mie", "year": "2025", "status": "Completed", "desc": "A timber greenhouse whose structure is built from sawmill offcuts. Fully demountable; units link together to scale. Red Dot Design Award 2026."}, {"id": "p2", "cat": "gh", "img": "/assets/higashiura.jpg", "title": "Self-build greenhouse, Higashiura (2 units, 130 m²)", "type": "Greenhouse", "input": "Sawmill offcuts", "tech": "Design engine · Fabrication", "place": "Higashiura, Aichi", "year": "2026", "status": "Under construction", "desc": "A three-zone greenhouse — forestry seedlings, strawberries, tomatoes — raised with numbered parts by the people who will farm it."}, {"id": "p3", "cat": "fu", "img": "/assets/tsite.jpg", "title": "Lantern stand ⇄ bench, Daikanyama T-SITE", "type": "Furniture", "input": "Sawmill offcuts", "tech": "Fabrication · Passport", "place": "Tokyo", "year": "2026", "status": "Completed", "desc": "Lantern stands for a summer festival, reassembled into benches once it ended. No steel hardware — and a Material Passport for every part."}, {"id": "p4", "cat": "fu", "img": "/assets/table.jpg", "title": "New-material furniture, Nagoya University C-TECs", "type": "Furniture", "input": "New material [confirm]", "tech": "Fabrication", "place": "Nagoya", "year": "2026", "status": "Delivered", "desc": "Furniture for the exchange space at Nagoya University’s Institute of Innovation for Future Society. [Add material and spec]"}, {"id": "p11", "cat": "fu", "img": "/assets/bench3d_a.jpg", "title": "3D-printed bench", "type": "Furniture", "input": "Steel", "tech": "Metal 3D printing (WAAM)", "place": "Aichi", "year": "2025", "status": "Completed", "desc": "A bench re-sliced for WAAM and printed in one continuous piece of steel — lattice seat and ribbed legs included."}, {"id": "p12", "cat": "ar", "img": "/assets/woodnode.jpg", "title": "WoodNode — a joint that turns offcuts into architecture", "type": "Architecture", "input": "Sawmill offcuts", "tech": "Metal 3D printing · Topology optimisation", "place": "[Location]", "year": "2024", "status": "Completed", "desc": "A structural joint that lets sawmill offcuts carry loads. Each node is metal 3D-printed to fit its pieces and topology-optimised for strength and low weight. With Takenaka Corporation, Shimoda Flange and Noji Lumber. Excellence Award, Urban Infrastructure Technology Promotion Conference."}, {"id": "p7", "cat": "ar", "img": "/assets/arch_fix.jpg", "title": "House of large-diameter logs", "type": "Architecture", "input": "Large-diameter logs", "tech": "Analysis · Fabrication", "place": "Tokyo", "year": "2026", "status": "Under construction", "desc": "A house that puts hard-to-sell large-diameter logs to work as built-up structural beams."}, {"id": "p8", "cat": "ma", "img": "/assets/wf_bench.jpg", "title": "Wood-flour resin pellets (with Takenaka and Kurabo)", "type": "Material & data", "input": "Offcuts · Wood flour", "tech": "Materials R&D", "place": "Adopted in Nihonbashi, Tokyo", "year": "2025", "status": "610 kg delivered", "desc": "Engineered-wood offcuts milled to flour and compounded with biodegradable resin or recycled PP into a mouldable material."}], "filters": [["all", "All"], ["fu", "Furniture"], ["gh", "Greenhouse"], ["ar", "Architecture"], ["ma", "Material & data"]], "kinds": {"col": "Posts", "raf": "Rafters", "tie": "Ties", "beam": "Beams & purlins", "sill": "Sills", "brace": "Braces"}, "ui": {"explode": "Take it apart", "assemble": "Put it back together", "unit": " unit", "units": " units"}};
this.state = { tech: 0, bays: 8, span: 1, units: 2, exploded: false, filter: 'all', row: 'p1', heroSrc: '', heroPoster: '' };
this.muteRef = (el) => { if (el) { el.muted = true; el.defaultMuted = true; try { const p = el.play(); if (p && p.catch) p.catch(() => {}); } catch (e) {} } };
}
componentDidMount() {
const mob = typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(max-width: 760px)').matches;
this.setState({ heroSrc: mob ? '/assets/hero_m.mp4' : '/assets/hero_d.mp4', heroPoster: mob ? '/assets/poster_m.jpg' : '/assets/poster_d.jpg' }, () => { setTimeout(() => { try { const v = document.querySelector('#mission video'); if (v) { v.muted = true; v.load(); const p = v.play(); if (p && p.catch) p.catch(() => {}); } } catch (e) {} }, 50); });
this.durs = [7, 10, 9, 13, 10, 12];
this.schedule = () => { clearTimeout(this.timer); const i = this.state.tech; this.timer = setTimeout(() => { if (this.props.autoplayTech !== false) this.setState((s) => ({ tech: (s.tech + 1) % 6 }), this.schedule); else this.schedule(); }, this.durs[i] * 1000 + 600); };
this.schedule();
}
componentWillUnmount() { clearTimeout(this.timer); }
model() {
const D = this.D;
const spans = [4.8, 6.4, 8.0];
const Wd = spans[this.state.span], bays = this.state.bays, units = this.state.units;
const bay = 1.6, He = 2.6, Hr = He + Wd * 0.26, L = bays * bay, Wt = units * Wd;
const m = [];
const add = (a, b, k) => m.push({ a, b, k, len: Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]) });
for (let u = 0; u < units; u++) {
const y0 = u * Wd;
for (let i = 0; i <= bays; i++) {
const x = i * bay;
if (u === 0) add([x, y0, 0], [x, y0, He], 'col');
add([x, y0 + Wd, 0], [x, y0 + Wd, He], 'col');
add([x, y0, He], [x, y0 + Wd / 2, Hr], 'raf');
add([x, y0 + Wd, He], [x, y0 + Wd / 2, Hr], 'raf');
add([x, y0 + Wd * 0.22, He + (Hr - He) * 0.44], [x, y0 + Wd * 0.78, He + (Hr - He) * 0.44], 'tie');
}
const rows = [[y0 + Wd / 2, Hr], [y0 + Wd * 0.25, He + (Hr - He) * 0.5], [y0 + Wd * 0.75, He + (Hr - He) * 0.5], [y0 + Wd, He], [y0 + Wd, 0]];
if (u === 0) rows.push([y0, He], [y0, 0], [y0, He * 0.5]);
rows.forEach(([y, z]) => { for (let i = 0; i < bays; i++) add([i * bay, y, z], [(i + 1) * bay, y, z], z === 0 ? 'sill' : 'beam'); });
}
[0, bays - 1].forEach((i) => { add([i * bay, 0, 0], [(i + 1) * bay, 0, He], 'brace'); add([i * bay, Wt, 0], [(i + 1) * bay, Wt, He], 'brace'); });
const c30 = Math.cos(Math.PI / 6), s30 = Math.sin(Math.PI / 6);
const raw = (p) => [(p[0] - p[1]) * c30, (p[0] + p[1]) * s30 - p[2] * 1.05];
let x0 = 1e9, x1 = -1e9, y0b = 1e9, y1b = -1e9;
m.forEach((e) => [e.a, e.b].forEach((q) => { const r = raw(q); x0 = Math.min(x0, r[0]); x1 = Math.max(x1, r[0]); y0b = Math.min(y0b, r[1]); y1b = Math.max(y1b, r[1]); }));
const sc = Math.min(800 / (x1 - x0), 480 / (y1b - y0b)), cx = (x0 + x1) / 2, cy = (y0b + y1b) / 2;
const P = (p) => { const r = raw(p); return [450 + (r[0] - cx) * sc, 330 + (r[1] - cy) * sc]; };
const sec = { col: 0.105 * 0.105, raf: 0.06 * 0.15, tie: 0.045 * 0.105, beam: 0.105 * 0.105, sill: 0.105 * 0.105, brace: 0.045 * 0.09 };
const order = ['col', 'raf', 'tie', 'beam', 'sill', 'brace'];
const groups = {}; order.forEach((k) => (groups[k] = []));
m.forEach((e, i) => groups[e.k].push(i));
order.forEach((k) => groups[k].sort((a, b) => m[b].len - m[a].len));
const layout = (ps) => {
const pos = {}, labels = []; let y = 64;
order.forEach((k) => {
const g = groups[k]; if (!g.length) return;
labels.push({ k, y: y + 4, y2: y + 22, n: g.length, label: D.kinds[k] });
let x = 190, ry = y;
g.forEach((i) => { const w = Math.max(6, m[i].len * ps); if (x + w > 870) { x = 190; ry += 6; } pos[i] = { x, y: ry, s: w }; x += w + 4; });
y = Math.max(ry, y + 26) + 30;
});
return { pos, labels, h: y };
};
let ps = 44, lay = layout(ps);
while (lay.h > 585 && ps > 6) { ps -= 2; lay = layout(ps); }
let vol = 0;
const accent = this.props.accent ?? '#FF5528';
const ex = this.state.exploded;
const lines = m.map((e, i) => {
vol += e.len * sec[e.k];
const A = P(e.a), Bp = P(e.b);
const strong = e.k === 'col' || e.k === 'raf';
let x, y, a, s;
if (ex) { const q = lay.pos[i]; x = q.x; y = q.y; a = 0; s = q.s; }
else { x = A[0]; y = A[1]; a = Math.atan2(Bp[1] - A[1], Bp[0] - A[0]) * 180 / Math.PI; s = Math.hypot(Bp[0] - A[0], Bp[1] - A[1]); }
return { x: x.toFixed(1), y: y.toFixed(1), a: a.toFixed(2), s: s.toFixed(2), d: Math.min(i * 5, 1000), c: e.k === 'brace' ? accent : (strong ? '#000000' : '#696660'), w: strong ? 3 : 1.8 };
});
const co2 = vol * 0.314 * 0.5 * 44 / 12;
const nConv = Math.ceil(vol / 0.40 / 0.56), nX = Math.ceil(vol / 0.95 / 0.56);
const icons = (n) => Array.from({ length: Math.min(n, 90) }, (_, i) => ({ d: i * 18 }));
return { lines, labels: lay.labels, count: m.length, vol: vol.toFixed(2), co2: co2.toFixed(2), area: Math.round(L * Wt), lengthM: L.toFixed(1), nConv, nX, treesConv: icons(nConv), treesX: icons(nX), co2Trees: Math.max(1, Math.round(co2 / 0.505)) };
}
renderVals() {
const D = this.D;
const accent = this.props.accent ?? '#FF5528';
const techs = D.techs.map((t, i) => { const sel = i === this.state.tech; return { ...t, selected: sel, isVideo: sel && t.video, isImage: !t.video, fit: t.num === '06' ? 'contain' : 'cover', numColor: sel ? accent : '#696660', color: sel ? '#FFFFFF' : '#8a877f', pick: () => this.setState({ tech: i }, this.schedule), dur: (this.durs ? this.durs[i] : 8) + 0.6 }; });
const f = this.model();
const chip = (on, dark) => ({ bg: on ? (dark ? '#000' : '#fff') : 'transparent', fg: on ? (dark ? '#fff' : '#000') : (dark ? '#000' : '#fff') });
const spanL = ['4.8 m', '6.4 m', '8.0 m'];
const spans = spanL.map((label, i) => ({ label, on: this.state.span === i, ...chip(this.state.span === i, true), pick: () => this.setState({ span: i }) }));
const unitsList = [1, 2, 3].map((n) => ({ label: n + (n === 1 ? D.ui.unit : D.ui.units), on: this.state.units === n, ...chip(this.state.units === n, true), pick: () => this.setState({ units: n }) }));
const flt = this.state.filter;
const visible = D.projects.filter((p) => flt === 'all' || p.cat === flt);
const rowSel = visible.some((p) => p.id === this.state.row) ? this.state.row : (visible[0] ? visible[0].id : '');
const stc = (s) => /完成|納品|Completed|Delivered|610/.test(s) ? '#FFFFFF' : (/運用|Live|完了/.test(s) ? accent : '#A9A69F');
const rows = visible.map((p, i) => { const on = p.id === rowSel; return { ...p, no: String(D.projects.indexOf(p) + 1).padStart(3, '0'), on, hasImg: !!p.img, noImg: !p.img, numColor: on ? accent : '#A9A69F', stColor: stc(p.status), pad: on ? '16px' : '0px', bg: on ? '#1a1a19' : 'transparent', pick: () => this.setState({ row: p.id }) }; });
const filters = D.filters.map(([k, label]) => ({ label, n: k === 'all' ? D.projects.length : D.projects.filter((p) => p.cat === k).length, on: flt === k, ...chip(flt === k, false), pick: () => this.setState({ filter: k }) }));
return {
heroSrc: this.state.heroSrc || undefined, heroPoster: this.state.heroPoster || undefined,
accent, accentDark: '#C93A12', muteRef: this.muteRef,
techs, spans, unitsList, rows, filters, ...f, bays: this.state.bays,
modeLabel: (this.state.exploded ? 'KIT OF PARTS' : 'LIVE MODEL') + ' — ' + this.state.bays + ' × ' + spanL[this.state.span] + ' × ' + this.state.units,
onBays: (e) => this.setState({ bays: parseInt(e.target.value, 10) }),
exploded: this.state.exploded, toggleExplode: () => this.setState((s) => ({ exploded: !s.exploded })),
explodeLabel: this.state.exploded ? D.ui.assemble : D.ui.explode, explodeBg: this.state.exploded ? '#000' : '#fff', explodeFg: this.state.exploded ? '#fff' : '#000'
};
}
}

App.prototype.render = function () { const V = this.renderVals(); return html`<helmet>



</helmet>
<div class="xroot" style="font-family: Montserrat, 'Zen Kaku Gothic New', sans-serif; color: #fff; background: #000; width: 100%">

<header class="site-head" style="position: fixed; top: 0; left: 0; right: 0; z-index: 50; background: rgba(0,0,0,0.62); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border-bottom: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; padding: 18px 4vw">
<div class="en" style="font-weight: 800; font-size: 24px; letter-spacing: 0.04em">XENCE</div>
<nav aria-label="Main" class="en" style="display: flex; gap: 26px; flex-wrap: wrap; align-items: center; font-size: 14px; font-weight: 600">
<a href="#model">Model</a><a href="#technology">Technology</a><a href="#configurator">Configurator</a><a href="#projects">Projects</a><a href="#impact">Impact</a><a href="#growth">Investors</a>
<a href="#contact" style="background: #fff; color: #000; padding: 12px 22px; border-radius: 999px; font-weight: 700">CONTACT <span class="live" style="color: ${V.accent}">●</span></a>
<span class="lang" style="color: #8a877f"><a href="/" style="color: #8a877f">JA</a> / <a href="/en/" style="color: #fff">EN</a></span>
</nav>
</header>

<section id="mission" style="position: relative; height: 100vh; min-height: 760px; overflow: hidden; background: #000">
<div class="par" style="position: absolute; inset: 0">
<video ref="${V.muteRef}" src="${V.heroSrc}" poster="${V.heroPoster}" autoPlay="${true}" muted="${true}" loop="${true}" playsInline="${true}" aria-label="Film: forest, logs, sawmill, design data, assembly, joinery and the finished greenhouse" style="width: 100%; height: 100%; object-fit: cover; display: block"></video>
</div>
<div class="hero-shade" style="position: absolute; inset: 0; background: linear-gradient(90deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 42%, rgba(0,0,0,0.12) 72%, rgba(0,0,0,0) 100%)"></div>
<div class="hero-copy" style="position: absolute; left: 4vw; right: 4vw; bottom: 140px; max-width: 760px">
<p class="en fadein" style="margin: 0 0 28px; font-size: 13px; letter-spacing: 0.24em; color: ${V.accent}; font-weight: 700">OUR MISSION</p>
<h1 style="margin: 0; font-size: clamp(34px, 4.4vw, 76px); line-height: 1.16; font-weight: 900; letter-spacing: -0.02em">
<span class="mask"><span>Waste in.</span></span>
<span class="mask d1"><span>Assets out.</span></span>
</h1>
<div class="fadein" style="display: flex; flex-direction: column; gap: 14px; margin-top: 28px">
<p class="en" style="margin: 0; font-size: clamp(17px, 1.4vw, 22px); font-weight: 700">Ending build-and-forget.</p>
<p style="margin: 0; max-width: 560px; font-size: 15px; line-height: 1.9; color: #E8E6E1">Offcuts. Oversized logs. Demolition timber. Sawdust. XENCE turns the materials construction rejects into architecture — then keeps every piece tracked, operated and ready for its next life, on one digital thread from design to fabrication to operation.</p>
</div>
</div>
<div style="position: absolute; left: 0; right: 0; bottom: 0; border-top: 1px solid rgba(255,255,255,0.25); padding: 22px 0; overflow: hidden; background: rgba(0,0,0,0.35)">
<div class="track en" style="gap: 56px; font-size: 15px; font-weight: 600; white-space: nowrap; color: #E8E6E1"><span>Red Dot Design Award 2026</span><span style="color: ${V.accent}">●</span><span>Good Design Award 2025</span><span style="color: ${V.accent}">●</span><span>Wood Design Award 2025</span><span style="color: ${V.accent}">●</span><span>Computational Design</span><span style="color: ${V.accent}">●</span><span>Structural Analysis</span><span style="color: ${V.accent}">●</span><span>Digital Fabrication</span><span style="color: ${V.accent}">●</span><span>3D Printing</span><span style="color: ${V.accent}">●</span><span>Material Passport</span><span style="color: ${V.accent}">●</span><span>Whole-life Carbon</span><span style="color: ${V.accent}">●</span><span>Nagoya ／ Düsseldorf</span><span style="color: ${V.accent}">●</span><span>Red Dot Design Award 2026</span><span style="color: ${V.accent}">●</span><span>Good Design Award 2025</span><span style="color: ${V.accent}">●</span><span>Wood Design Award 2025</span><span style="color: ${V.accent}">●</span><span>Computational Design</span><span style="color: ${V.accent}">●</span><span>Structural Analysis</span><span style="color: ${V.accent}">●</span><span>Digital Fabrication</span><span style="color: ${V.accent}">●</span><span>3D Printing</span><span style="color: ${V.accent}">●</span><span>Material Passport</span><span style="color: ${V.accent}">●</span><span>Whole-life Carbon</span><span style="color: ${V.accent}">●</span><span>Nagoya ／ Düsseldorf</span><span style="color: ${V.accent}">●</span></div>
</div>
<p class="en hero-cap fadein" style="position: absolute; right: 4vw; bottom: 140px; margin: 0; font-size: 11px; letter-spacing: 0.2em; color: #A9A69F; text-align: right; line-height: 2">SAME TIMBER, REASSEMBLED<br /><span style="color: #fff">PAVILION → GREENHOUSE → HOUSE</span></p>
</section>
<section id="awards" style="border-bottom: 1px solid #222; padding: 40px 4vw; box-sizing: border-box">
<div class="aw-row" style="max-width: 1440px; margin: 0 auto; display: flex; align-items: center; gap: 56px; flex-wrap: wrap">
<p class="en" style="margin: 0; font-size: 11px; letter-spacing: 0.22em; color: #A9A69F; line-height: 1.8">AWARDS &<br />RECOGNITION</p>
<div class="aw-logos" style="display: flex; align-items: center; gap: 56px; flex-wrap: wrap; flex: 1"><img src="/assets/w_reddot.png" alt="Red Dot Award 2026 Urban Design" loading="lazy" class="aw-logo" style="height: 64px; width: auto; display: block" /><img src="/assets/w_gda.png" alt="Good Design Award 2025" loading="lazy" class="aw-logo" style="height: 40px; width: auto; display: block" /><img src="/assets/w_jwda.png" alt="Japan Wood Design Award 2025" loading="lazy" class="aw-logo" style="height: 38px; width: auto; display: block" /><img src="/assets/w_nuv.png" alt="Nagoya University Venture" loading="lazy" class="aw-logo" style="height: 60px; width: auto; display: block" /></div>
<p class="aw-more" style="margin: 0; font-size: 14px; color: #D8D6D1">and many more</p>
</div>
</section>


<section id="works" style="padding: 56px 0 0">
<div style="display: flex; gap: 20px; overflow-x: auto; scroll-snap-type: x mandatory; padding: 0 4vw 8px; scrollbar-width: none"><figure style="margin: 0; flex: none; width: min(46vw, 640px); scroll-snap-align: start"><div class="zoom" style="aspect-ratio: 3 / 2; background: #111"><img src="/assets/gh_night_in.jpg" alt="Circular Timber Greenhouse™" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block" /></div><figcaption style="display: flex; justify-content: space-between; margin-top: 12px; font-size: 13px; color: #A9A69F"><span>Circular Timber Greenhouse™</span><span class="en">2025</span></figcaption></figure><figure style="margin: 0; flex: none; width: min(46vw, 640px); scroll-snap-align: start"><div class="zoom" style="aspect-ratio: 3 / 2; background: #111"><img src="/assets/bench3d_a.jpg" alt="3D-printed bench" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block" /></div><figcaption style="display: flex; justify-content: space-between; margin-top: 12px; font-size: 13px; color: #A9A69F"><span>3D-printed bench</span><span class="en">2025</span></figcaption></figure><figure style="margin: 0; flex: none; width: min(46vw, 640px); scroll-snap-align: start"><div class="zoom" style="aspect-ratio: 3 / 2; background: #111"><img src="/assets/joint.jpg" alt="Timber joint, no steel" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block" /></div><figcaption style="display: flex; justify-content: space-between; margin-top: 12px; font-size: 13px; color: #A9A69F"><span>Timber joint, no steel</span><span class="en"></span></figcaption></figure><figure style="margin: 0; flex: none; width: min(46vw, 640px); scroll-snap-align: start"><div class="zoom" style="aspect-ratio: 3 / 2; background: #111"><img src="/assets/higashiura.jpg" alt="Self-build greenhouse, Higashiura" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block" /></div><figcaption style="display: flex; justify-content: space-between; margin-top: 12px; font-size: 13px; color: #A9A69F"><span>Self-build greenhouse, Higashiura</span><span class="en">2026</span></figcaption></figure><figure style="margin: 0; flex: none; width: min(46vw, 640px); scroll-snap-align: start"><div class="zoom" style="aspect-ratio: 3 / 2; background: #111"><img src="/assets/gh_interior.jpg" alt="Inside the greenhouse" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block" /></div><figcaption style="display: flex; justify-content: space-between; margin-top: 12px; font-size: 13px; color: #A9A69F"><span>Inside the greenhouse</span><span class="en">2025</span></figcaption></figure><figure style="margin: 0; flex: none; width: min(46vw, 640px); scroll-snap-align: start"><div class="zoom" style="aspect-ratio: 3 / 2; background: #111"><img src="/assets/tsite.jpg" alt="Lantern stands, Daikanyama T-SITE" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block" /></div><figcaption style="display: flex; justify-content: space-between; margin-top: 12px; font-size: 13px; color: #A9A69F"><span>Lantern stands, Daikanyama T-SITE</span><span class="en">2026</span></figcaption></figure></div>
</section>
<section style="padding: 160px 4vw 140px; max-width: 1440px; margin: 0 auto; box-sizing: border-box">
<div style="display: flex; flex-wrap: wrap; gap: 72px; align-items: end">
<div class="reveal" style="flex: 999 1 560px; min-width: 0">
<p class="en" style="margin: 0 0 24px; font-size: 13px; letter-spacing: 0.22em; color: #A9A69F">WHY XENCE</p>
<h2 style="margin: 0; font-size: clamp(32px, 3.6vw, 56px); line-height: 1.45; font-weight: 900">Digital technology that turns every resource<br />into architecture that lasts — and keeps its value.</h2>
</div>
<div class="reveal" style="flex: 1 1 100%; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin-top: 8px">
<figure style="margin: 0"><div class="zoom revealimg" style="aspect-ratio: 4 / 5"><img src="/assets/forest.jpg" alt="Aerial view of a forest and logging road" style="width: 100%; height: 100%; object-fit: cover; display: block" /></div><figcaption class="en" style="margin-top: 10px; font-size: 11px; letter-spacing: 0.16em; color: #A9A69F">01 · THE FOREST</figcaption></figure>
<figure style="margin: 0"><div class="zoom revealimg" style="aspect-ratio: 4 / 5; background: #0b0b0b"><img src="/assets/logs.jpg" alt="A stack of irregular logs" style="width: 100%; height: 100%; object-fit: cover; display: block" /></div><figcaption class="en" style="margin-top: 10px; font-size: 11px; letter-spacing: 0.16em; color: #A9A69F">02 · LOGS LEFT AS NON-STANDARD</figcaption></figure>
<figure style="margin: 0"><div class="zoom revealimg" style="aspect-ratio: 4 / 5"><img src="/assets/waste.jpg" alt="Waste piled at a landfill" style="width: 100%; height: 100%; object-fit: cover; display: block" /></div><figcaption class="en" style="margin-top: 10px; font-size: 11px; letter-spacing: 0.16em; color: ${V.accent}">03 · RESOURCES THROWN AWAY</figcaption></figure>
</div>
</div>
<div class="stats3" style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 48px; margin-top: 96px"><div class="reveal" style="border-top: 2px solid #fff; padding-top: 24px"><p class="en" style="margin: 0; font-size: clamp(48px, 5vw, 80px); font-weight: 800; letter-spacing: -0.02em">~40%</p><p style="margin: 12px 0 0; font-size: 15px; line-height: 1.8; color: #D8D6D1">of a log becomes building material at a typical sawmill. The rest is burned, chipped or dumped.</p></div><div class="reveal" style="border-top: 2px solid #fff; padding-top: 24px"><p class="en" style="margin: 0; font-size: clamp(48px, 5vw, 80px); font-weight: 800; letter-spacing: -0.02em">5.53 Mt</p><p style="margin: 12px 0 0; font-size: 15px; line-height: 1.8; color: #D8D6D1">of construction timber waste every year in Japan — 96.2% of it ends up as chips or fuel.</p></div><div class="reveal" style="border-top: 2px solid #fff; padding-top: 24px"><p class="en" style="margin: 0; font-size: clamp(48px, 5vw, 80px); font-weight: 800; letter-spacing: -0.02em">35%+</p><p style="margin: 12px 0 0; font-size: 15px; line-height: 1.8; color: #D8D6D1">of all EU waste comes from construction, which consumes about half of every material we extract.</p></div></div>
<p style="margin: 24px 0 0; font-size: 12px; color: #8a877f">Sources: see “XENCE in numbers” below</p>
</section>

<section id="news" style="padding: 140px 4vw; max-width: 1440px; margin: 0 auto; box-sizing: border-box; border-top: none">

<div class="reveal"><div style="display: flex; justify-content: space-between; align-items: end; gap: 24px; margin-bottom: 24px"><h2 class="en" style="margin: 0; font-size: clamp(40px, 5vw, 76px); font-weight: 900">News</h2><a href="https://xencegroup.com/news" target="_blank" rel="noopener" class="en" style="font-size: 14px; color: #A9A69F">View all ↗</a></div><div style="border-top: 1px solid #fff"><a href="https://xencegroup.com/news/9LhNPbQ0" target="_blank" rel="noopener" class="row news-row" style="display: grid; grid-template-columns: 120px minmax(0, 1fr) 24px; gap: 24px; align-items: baseline; padding: 24px 0; border-bottom: 1px solid #333"><span class="en" style="font-size: 13px; color: #A9A69F">2026/10/23</span><span style="font-size: 17px; line-height: 1.7">Daikanyama T-SITE begins a timber traceability trial: how much unused wood was put to use</span><span class="en" style="color: ${V.accent}">↗</span></a><a href="https://xencegroup.com/news/_kRFwB8a" target="_blank" rel="noopener" class="row news-row" style="display: grid; grid-template-columns: 120px minmax(0, 1fr) 24px; gap: 24px; align-items: baseline; padding: 24px 0; border-bottom: 1px solid #333"><span class="en" style="font-size: 13px; color: #A9A69F">2026/9/11</span><span style="font-size: 17px; line-height: 1.7">Lantern stands made from offcuts at Daikanyama T-SITE’s summer festival</span><span class="en" style="color: ${V.accent}">↗</span></a><a href="https://xencegroup.com/news/9VckaqYJ" target="_blank" rel="noopener" class="row news-row" style="display: grid; grid-template-columns: 120px minmax(0, 1fr) 24px; gap: 24px; align-items: baseline; padding: 24px 0; border-bottom: 1px solid #333"><span class="en" style="font-size: 13px; color: #A9A69F">2026/7/22</span><span style="font-size: 17px; line-height: 1.7">Circular Timber Greenhouse® featured in the Nikkei Mokuzai Shimbun</span><span class="en" style="color: ${V.accent}">↗</span></a><a href="https://xencegroup.com/news/260630" target="_blank" rel="noopener" class="row news-row" style="display: grid; grid-template-columns: 120px minmax(0, 1fr) 24px; gap: 24px; align-items: baseline; padding: 24px 0; border-bottom: 1px solid #333"><span class="en" style="font-size: 13px; color: #A9A69F">2026/6/30</span><span style="font-size: 17px; line-height: 1.7">Selected for an Aichi Prefecture grant; development of a new Circular Timber Greenhouse™ model begins</span><span class="en" style="color: ${V.accent}">↗</span></a><a href="https://xencegroup.com/news/260616" target="_blank" rel="noopener" class="row news-row" style="display: grid; grid-template-columns: 120px minmax(0, 1fr) 24px; gap: 24px; align-items: baseline; padding: 24px 0; border-bottom: 1px solid #333"><span class="en" style="font-size: 13px; color: #A9A69F">2026/6/16</span><span style="font-size: 17px; line-height: 1.7">XENCE Engineering, a new construction-focused division, launches</span><span class="en" style="color: ${V.accent}">↗</span></a><details class="news-more"><summary style="padding: 22px 0; font-size: 14px; font-weight: 700; color: #A9A69F; cursor: pointer; list-style: none">Earlier news (9) ＋</summary><a href="https://xencegroup.com/news/260602" target="_blank" rel="noopener" class="row news-row" style="display: grid; grid-template-columns: 120px minmax(0, 1fr) 24px; gap: 24px; align-items: baseline; padding: 24px 0; border-bottom: 1px solid #333"><span class="en" style="font-size: 13px; color: #A9A69F">2026/6/2</span><span style="font-size: 17px; line-height: 1.7">Circular Timber Greenhouse™ wins Red Dot Design Award 2026, Urban Design</span><span class="en" style="color: ${V.accent}">↗</span></a><a href="https://xencegroup.com/news/260407" target="_blank" rel="noopener" class="row news-row" style="display: grid; grid-template-columns: 120px minmax(0, 1fr) 24px; gap: 24px; align-items: baseline; padding: 24px 0; border-bottom: 1px solid #333"><span class="en" style="font-size: 13px; color: #A9A69F">2026/4/7</span><span style="font-size: 17px; line-height: 1.7">Press release: certified as a Nagoya University venture, moving construction toward the “generative contract”</span><span class="en" style="color: ${V.accent}">↗</span></a><a href="https://xencegroup.com/news/zNSZMKlS" target="_blank" rel="noopener" class="row news-row" style="display: grid; grid-template-columns: 120px minmax(0, 1fr) 24px; gap: 24px; align-items: baseline; padding: 24px 0; border-bottom: 1px solid #333"><span class="en" style="font-size: 13px; color: #A9A69F">2026/3/30</span><span style="font-size: 17px; line-height: 1.7">Circular Timber Greenhouse® featured on Chukyo TV’s “Apude no Mori”</span><span class="en" style="color: ${V.accent}">↗</span></a><a href="https://xencegroup.com/news/260116" target="_blank" rel="noopener" class="row news-row" style="display: grid; grid-template-columns: 120px minmax(0, 1fr) 24px; gap: 24px; align-items: baseline; padding: 24px 0; border-bottom: 1px solid #333"><span class="en" style="font-size: 13px; color: #A9A69F">2026/1/16</span><span style="font-size: 17px; line-height: 1.7">Circular Timber Greenhouse wins the Dairei Kogyo Award at the Hyper-Interdisciplinary Conference Aichi Forum 2026</span><span class="en" style="color: ${V.accent}">↗</span></a><a href="https://xencegroup.com/news/260101" target="_blank" rel="noopener" class="row news-row" style="display: grid; grid-template-columns: 120px minmax(0, 1fr) 24px; gap: 24px; align-items: baseline; padding: 24px 0; border-bottom: 1px solid #333"><span class="en" style="font-size: 13px; color: #A9A69F">2025/12/31</span><span style="font-size: 17px; line-height: 1.7">XENCE incorporates as a kabushiki kaisha from 1 January 2026</span><span class="en" style="color: ${V.accent}">↗</span></a><a href="https://xencegroup.com/news/251220" target="_blank" rel="noopener" class="row news-row" style="display: grid; grid-template-columns: 120px minmax(0, 1fr) 24px; gap: 24px; align-items: baseline; padding: 24px 0; border-bottom: 1px solid #333"><span class="en" style="font-size: 13px; color: #A9A69F">2025/12/20</span><span style="font-size: 17px; line-height: 1.7">Featured in Nikkei xTECH</span><span class="en" style="color: ${V.accent}">↗</span></a><a href="https://xencegroup.com/news/251001" target="_blank" rel="noopener" class="row news-row" style="display: grid; grid-template-columns: 120px minmax(0, 1fr) 24px; gap: 24px; align-items: baseline; padding: 24px 0; border-bottom: 1px solid #333"><span class="en" style="font-size: 13px; color: #A9A69F">2025/9/30</span><span style="font-size: 17px; line-height: 1.7">Circular Timber Greenhouse wins the Good Design Award 2025</span><span class="en" style="color: ${V.accent}">↗</span></a><a href="https://xencegroup.com/news/250930" target="_blank" rel="noopener" class="row news-row" style="display: grid; grid-template-columns: 120px minmax(0, 1fr) 24px; gap: 24px; align-items: baseline; padding: 24px 0; border-bottom: 1px solid #333"><span class="en" style="font-size: 13px; color: #A9A69F">2025/9/29</span><span style="font-size: 17px; line-height: 1.7">Circular Timber Greenhouse wins the Japan Wood Design Award 2025</span><span class="en" style="color: ${V.accent}">↗</span></a><a href="https://xencegroup.com/news/241120" target="_blank" rel="noopener" class="row news-row" style="display: grid; grid-template-columns: 120px minmax(0, 1fr) 24px; gap: 24px; align-items: baseline; padding: 24px 0; border-bottom: 1px solid #333"><span class="en" style="font-size: 13px; color: #A9A69F">2024/11/20</span><span style="font-size: 17px; line-height: 1.7">Excellence Award at the 36th Technical Research Presentation for a metal 3D-printed joint</span><span class="en" style="color: ${V.accent}">↗</span></a></details></div></div>
</section>

<section id="model" style="background: #F4F3F1; color: #000; padding: 140px 4vw">
<div style="max-width: 1440px; margin: 0 auto">
<div style="display: flex; flex-wrap: wrap; gap: 64px; align-items: center">
<div class="reveal" style="flex: 999 1 560px; min-width: 0">
<p class="en" style="margin: 0 0 16px; font-size: 13px; letter-spacing: 0.22em; color: #696660">OUR MODEL</p>
<h2 style="margin: 0 0 28px; font-size: clamp(36px, 4.4vw, 68px); line-height: 1.25; font-weight: 900">Every material into architecture.<br />Architecture into lasting social assets.</h2>
<p style="margin: 0; max-width: 640px; font-size: 18px; line-height: 1.9; color: #333">XENCE designs and builds, then runs and manages what it builds. The data from every site goes back into our technology, so each building is faster and more certain than the last. <b>A building contract should not end at handover. XENCE connects material data, environmental performance and facility management as a platform for architecture.</b></p>
</div>
<div class="reveal" style="flex: 1 1 360px; display: flex; flex-direction: column; align-items: center">
<svg viewBox="-110 0 620 400" role="img" aria-label="Design → Build → Operate → R&D" style="width: 100%; max-width: 520px; height: auto; display: block">
<circle cx="200" cy="200" r="140" fill="none" stroke="#000" stroke-width="1.5" stroke-dasharray="4 6"></circle>
<g class="spin"><circle cx="200" cy="60" r="9" fill="${V.accent}"></circle></g>
<circle cx="200" cy="60" r="5" fill="#000"></circle><circle cx="340" cy="200" r="5" fill="#000"></circle><circle cx="200" cy="340" r="5" fill="#000"></circle><circle cx="60" cy="200" r="5" fill="#000"></circle>
<text x="200" y="34" text-anchor="middle" font-size="15" font-weight="700" fill="#000">Design</text>
<text x="352" y="205" text-anchor="start" font-size="15" font-weight="700" fill="#000">Build</text>
<text x="200" y="374" text-anchor="middle" font-size="15" font-weight="700" fill="#000">Operate</text>
<text x="48" y="205" text-anchor="end" font-size="15" font-weight="700" fill="#000">R&D</text>
<text x="200" y="196" text-anchor="middle" font-size="30" font-weight="800" fill="#000" font-family="Montserrat">XENCE</text>
<text x="200" y="222" text-anchor="middle" font-size="12" letter-spacing="2" fill="#696660" font-family="Montserrat">FLYWHEEL</text>
</svg>
<p style="margin: 20px 0 0; max-width: 420px; font-size: 14px; line-height: 1.85; color: #333">Design, build and operation in one company, with the data fed back into R&D. The more it turns, the faster and surer the next building.</p>
</div>
</div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px 32px; margin-top: 64px"><div class="reveal" style="border-top: 2px solid #000; padding-top: 16px"><p class="en" style="margin: 0; font-size: 11px; letter-spacing: 0.16em; color: ${V.accentDark}; font-weight: 700">DESIGN</p><h3 style="margin: 6px 0 6px; font-size: 22px; font-weight: 900">Design</h3><p style="margin: 0; font-size: 14px; line-height: 1.7; color: #333">A licensed architecture office designing greenhouses, homes and facilities.</p></div><div class="reveal" style="border-top: 2px solid #000; padding-top: 16px"><p class="en" style="margin: 0; font-size: 11px; letter-spacing: 0.16em; color: ${V.accentDark}; font-weight: 700">BUILD</p><h3 style="margin: 6px 0 6px; font-size: 22px; font-weight: 900">Build</h3><p style="margin: 0; font-size: 14px; line-height: 1.7; color: #333">We fabricate non-standard timber in-house and put it up ourselves.</p></div><div class="reveal" style="border-top: 2px solid #000; padding-top: 16px"><p class="en" style="margin: 0; font-size: 11px; letter-spacing: 0.16em; color: ${V.accentDark}; font-weight: 700">OPERATE</p><h3 style="margin: 6px 0 6px; font-size: 22px; font-weight: 900">Operate</h3><p style="margin: 0; font-size: 14px; line-height: 1.7; color: #333">We run and manage what we build — and keep its data.</p></div><div class="reveal" style="border-top: 2px solid #000; padding-top: 16px"><p class="en" style="margin: 0; font-size: 11px; letter-spacing: 0.16em; color: ${V.accentDark}; font-weight: 700">R&D</p><h3 style="margin: 6px 0 6px; font-size: 22px; font-weight: 900">Technology</h3><p style="margin: 0; font-size: 14px; line-height: 1.7; color: #333">Design engine, structural analysis and Material Passport, built in-house.</p></div></div>
</div>
</section>

<section id="technology" style="padding: 140px 4vw; max-width: 1440px; margin: 0 auto; box-sizing: border-box">
<div class="reveal" style="display: flex; justify-content: space-between; align-items: end; flex-wrap: wrap; gap: 24px; margin-bottom: 64px">
<div><p class="en" style="margin: 0 0 16px; font-size: 13px; letter-spacing: 0.22em; color: #A9A69F">TECHNOLOGY</p>
<h2 style="margin: 0; font-size: clamp(36px, 4vw, 60px); line-height: 1.3; font-weight: 900">Digital tools that make<br />the non-standard standard.</h2></div>
<p style="margin: 0; max-width: 460px; font-size: 16px; line-height: 1.9; color: #D8D6D1">Software we write ourselves links design, fabrication and operation into a single stream of data.</p>
</div>
<div class="tech-wrap" style="display: flex; flex-wrap: wrap; gap: 48px; align-items: stretch">
<div role="tablist" aria-label="Technologies" style="flex: 1 1 340px; display: flex; flex-direction: column">
${(V.techs || []).map((t) => html`
<button type="button" role="tab" aria-selected="${t.selected}" onClick="${t.pick}" style="position: relative; display: flex; gap: 16px; align-items: flex-start; text-align: left; width: 100%; font: inherit; color: ${t.color}; background: none; border: 0; border-bottom: 1px solid #2a2a28; padding: 20px 0; cursor: pointer; transition: color .3s">
<span class="en" style="font-size: 13px; color: ${t.numColor}; width: 32px">${t.num}</span>
<span style="flex: 1">
<span style="display: block; font-size: 21px; font-weight: 700">${t.title}</span>
${t.selected ? html`<span style="display: block; margin-top: 10px; font-size: 14px; line-height: 1.8; color: #D8D6D1; font-weight: 400">${t.body}</span>` : null}
</span>
${t.selected ? html`<span class="bar" style="position: absolute; left: 0; bottom: -1px; height: 2px; width: 100%; background: ${V.accent}; animation-duration: ${t.dur}s"></span>` : null}
</button>
`)}
</div>
<div class="tech-media" style="flex: 999 1 560px; min-width: 0; align-self: flex-start; position: relative; background: #111; aspect-ratio: 3 / 2; overflow: hidden">
${(V.techs || []).map((t) => html`
${t.selected ? html`
<div style="position: absolute; inset: 0; animation: fade .6s both">
${t.isVideo ? html`<video ref="${V.muteRef}" src="${t.media}" autoPlay="${true}" muted="${true}" loop="${true}" playsInline="${true}" aria-label="${t.alt}" style="width: 100%; height: 100%; object-fit: contain; background: #080808; display: block"></video>` : null}
${t.isImage ? html`<img src="${t.media}" alt="${t.alt}" style="width: 100%; height: 100%; object-fit: ${t.fit}; background: #fff; display: block; animation: fade .8s both" />` : null}
<div style="position: absolute; left: 0; right: 0; bottom: 0; padding: 16px 24px; background: rgba(0,0,0,0.72); font-size: 13px; line-height: 1.6"><span class="en" style="color: ${V.accent}; font-weight: 700; margin-right: 12px">${t.tag}</span>${t.caption}</div>
</div>
` : null}
`)}
</div>
</div>

</section>

<section id="configurator" style="background: #F4F3F1; color: #000; padding: 140px 4vw">
<div style="max-width: 1440px; margin: 0 auto">
<div class="reveal" style="display: flex; justify-content: space-between; align-items: end; flex-wrap: wrap; gap: 24px; margin-bottom: 56px">
<div><p class="en" style="margin: 0 0 16px; font-size: 13px; letter-spacing: 0.22em; color: #696660">TRY THE SYSTEM</p>
<h2 style="margin: 0; font-size: clamp(36px, 4vw, 60px); line-height: 1.3; font-weight: 900">Design a Circular Timber Greenhouse™.<br />Right here.</h2></div>
<p style="margin: 0; max-width: 480px; font-size: 16px; line-height: 1.9; color: #333">A lightweight build of our design engine. Change the inputs and the structure recalculates live. Hit “Take it apart” to see the kit of parts — and how many trees it took.</p>
</div>
<div class="cfg-wrap" style="display: flex; flex-wrap: wrap; gap: 32px; align-items: stretch">
<div class="cfg-ctrl" style="flex: 1 1 320px; display: flex; flex-direction: column; gap: 28px; background: #fff; padding: 32px; border: 1px solid #000">
<div>
<label for="cfg-bays" style="display: flex; justify-content: space-between; font-weight: 700; font-size: 15px"><span>Length</span><span class="en">${V.lengthM} m</span></label>
<input id="cfg-bays" type="range" min="3" max="14" step="1" value="${V.bays}" onInput="${V.onBays}" />
</div>
<div>
<p id="cfg-span" style="margin: 0 0 12px; font-weight: 700; font-size: 15px">Span</p>
<div role="group" aria-labelledby="cfg-span" style="display: flex; gap: 8px; flex-wrap: wrap">
${(V.spans || []).map((s) => html`<button type="button" class="en" onClick="${s.pick}" aria-pressed="${s.on}" style="font-family: inherit; font-size: 14px; font-weight: 700; padding: 12px 18px; min-height: 44px; border-radius: 999px; cursor: pointer; border: 1.5px solid #000; background: ${s.bg}; color: ${s.fg}">${s.label}</button>`)}
</div>
</div>
<div>
<p id="cfg-units" style="margin: 0 0 12px; font-weight: 700; font-size: 15px">Linked units</p>
<div role="group" aria-labelledby="cfg-units" style="display: flex; gap: 8px; flex-wrap: wrap">
${(V.unitsList || []).map((u) => html`<button type="button" class="en" onClick="${u.pick}" aria-pressed="${u.on}" style="font-family: inherit; font-size: 14px; font-weight: 700; padding: 12px 18px; min-height: 44px; border-radius: 999px; cursor: pointer; border: 1.5px solid #000; background: ${u.bg}; color: ${u.fg}">${u.label}</button>`)}
</div>
</div>
<button type="button" onClick="${V.toggleExplode}" aria-pressed="${V.exploded}" style="font: inherit; font-weight: 700; font-size: 16px; padding: 18px; border-radius: 999px; border: 1.5px solid #000; background: ${V.explodeBg}; color: ${V.explodeFg}; cursor: pointer">${V.explodeLabel}</button>
</div>
<div class="cfg-right" style="flex: 999 1 560px; min-width: 0; display: flex; flex-direction: column; gap: 1px; background: #000; border: 1px solid #000">
<div class="cfg-view" style="background: #fff; position: relative; overflow: hidden; display: flex; align-items: stretch">
<svg viewBox="0 0 900 600" role="img" aria-label="Greenhouse frame that updates with your settings; taken apart, the members line up by type" style="flex: 1; min-width: 0; height: auto; align-self: center; display: block">
${(V.lines || []).map((l) => html`
<line class="ln" x1="0" y1="0" x2="1" y2="0" stroke="${l.c}" stroke-width="${l.w}" stroke-linecap="round" vector-effect="non-scaling-stroke" style="transform: translate(${l.x}px, ${l.y}px) rotate(${l.a}deg) scaleX(${l.s}); transition-delay: ${l.d}ms"></line>
`)}
${V.exploded ? html`
${(V.labels || []).map((g) => html`
<text x="40" y="${g.y}" font-size="14" font-weight="700" fill="#000" style="animation: fade .6s .5s both">${g.label}</text>
<text x="40" y="${g.y2}" font-size="12" fill="#696660" font-family="Montserrat" style="animation: fade .6s .6s both">× ${g.n}</text>
`)}
` : null}
</svg>
<div class="cfg-stats" style="flex: none; width: 168px; display: flex; flex-direction: column; justify-content: center; gap: 22px; padding: 56px 24px 24px 0">
<div><p style="margin: 0; font-size: 12px; color: #696660">Members</p><p class="en" style="margin: 4px 0 0; font-size: 26px; font-weight: 700">${V.count}</p></div>
<div><p style="margin: 0; font-size: 12px; color: #696660">Floor area</p><p class="en" style="margin: 4px 0 0; font-size: 26px; font-weight: 700">${V.area}<span style="font-size: 13px"> m²</span></p></div>
<div><p style="margin: 0; font-size: 12px; color: #696660">Lumber volume</p><p class="en" style="margin: 4px 0 0; font-size: 26px; font-weight: 700">${V.vol}<span style="font-size: 13px"> m³</span></p></div>
<div><p style="margin: 0; font-size: 12px; color: #696660">Carbon stored</p><p class="en" style="margin: 4px 0 0; font-size: 26px; font-weight: 700; color: ${V.accentDark}">${V.co2}<span style="font-size: 13px"> t-CO₂</span></p></div>
</div>
<p class="en" style="position: absolute; left: 20px; top: 14px; margin: 0; font-size: 12px; letter-spacing: 0.14em; color: #696660"><span class="live" style="color: ${V.accent}">●</span> ${V.modeLabel}</p>
</div>
<div class="cfg-trees" style="background: #fff; padding: 24px 28px">
<p style="margin: 0 0 16px; font-weight: 700; font-size: 15px">The lumber in this greenhouse, counted in standing trees</p>
<div style="display: grid; grid-template-columns: minmax(150px, 220px) 1fr; gap: 14px 20px; align-items: center">
<p style="margin: 0; font-size: 13px; color: #696660">Conventional sawmilling (~40% yield)</p>
<div style="display: flex; flex-wrap: wrap; gap: 3px; align-items: end">
${(V.treesConv || []).map((t) => html`<svg class="tree" width="12" height="20" viewBox="0 0 12 20" aria-hidden="true" style="animation-delay: ${t.d}ms"><path d="M6 0 L12 13 H0 Z" fill="#B9B6AF"></path><rect x="5" y="13" width="2" height="7" fill="#B9B6AF"></rect></svg>`)}
<span class="en" style="margin-left: 8px; font-weight: 800; font-size: 20px">${V.nConv}</span><span style="font-size: 13px; margin-left: 4px">trees</span>
</div>
<p style="margin: 0; font-size: 13px; color: #000; font-weight: 700">XENCE (~95% utilisation)</p>
<div style="display: flex; flex-wrap: wrap; gap: 3px; align-items: end">
${(V.treesX || []).map((t) => html`<svg class="tree" width="12" height="20" viewBox="0 0 12 20" aria-hidden="true" style="animation-delay: ${t.d}ms"><path d="M6 0 L12 13 H0 Z" fill="${V.accentDark}"></path><rect x="5" y="13" width="2" height="7" fill="${V.accentDark}"></rect></svg>`)}
<span class="en" style="margin-left: 8px; font-weight: 800; font-size: 20px; color: ${V.accentDark}">${V.nX}</span><span style="font-size: 13px; margin-left: 4px">trees</span>
</div>
</div>
<p style="margin: 18px 0 0; font-size: 14px">Carbon stored ≈ <b class="en">${V.co2Trees}</b> standing cedars</p>
<p style="margin: 10px 0 0; font-size: 12px; line-height: 1.7; color: #696660">Simplified demo model with assumed sections. Japanese cedar: density 0.314 t/m³, carbon fraction 0.5; 0.56 m³ of stem per standing tree; 0.505 t CO₂ stored per tree.</p>
</div>
</div>
</div>
</div>
</section>

<section id="modules" style="padding: 140px 4vw; max-width: 1440px; margin: 0 auto; box-sizing: border-box">
<div class="reveal" style="display: flex; justify-content: space-between; align-items: end; flex-wrap: wrap; gap: 32px; margin-bottom: 56px">
<div><p class="en" style="margin: 0 0 16px; font-size: 13px; letter-spacing: 0.22em; color: #A9A69F">MODULAR SYSTEM</p>
<h2 style="margin: 0; font-size: clamp(36px, 4vw, 60px); line-height: 1.3; font-weight: 900">From joint to building,<br />one module scales.</h2></div>
<p style="margin: 0; max-width: 520px; font-size: 16px; line-height: 1.9; color: #D8D6D1">Our unit of design isn’t the building — it’s the joint. The same connection rules that join irregular timber assemble furniture, greenhouses and architecture, scaled up in software. At every size, design, fabrication and record data stay one continuous thread.</p>
</div>
<div class="reveal" style="margin-bottom: 64px"><video ref="${V.muteRef}" src="/assets/out_scale_v3.mp4" poster="/assets/house_frame.jpg" autoPlay="${true}" muted="${true}" loop="${true}" playsInline="${true}" aria-label="Motion graphic: a joint scaling up to furniture, greenhouses and buildings" style="width: 100%; aspect-ratio: 16 / 10; display: block; background: #000"></video></div>
<div class="mods-grid" style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 28px"><article class="reveal"><div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px"><span style="width: 10px; height: 10px; border-radius: 50%; background: ${V.accent}"></span><span style="flex: 1; height: 1px; background: #444"></span></div><div class="zoom" style="aspect-ratio: 4 / 3"><img src="/assets/joint_hi.jpg" alt="Metal 3D-printed node joining four waney-edged boards" style="width: 100%; height: 100%; object-fit: cover; display: block" /></div><p class="en" style="margin: 18px 0 6px; font-size: 12px; color: ${V.accent}; letter-spacing: 0.14em; font-weight: 700">01 — JOINT · 0.1 m</p><h3 style="margin: 0 0 10px; font-size: 22px; font-weight: 900">The joint</h3><p style="margin: 0; font-size: 14px; line-height: 1.8; color: #D8D6D1">Sawmill offcuts meet at a metal 3D-printed node, topology-optimised to fit each piece. Unbolt it and everything comes apart for reuse. The base unit of everything.</p></article><article class="reveal"><div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px"><span style="width: 10px; height: 10px; border-radius: 50%; background: ${V.accent}"></span><span style="flex: 1; height: 1px; background: #444"></span></div><div class="zoom" style="aspect-ratio: 4 / 3"><img src="/assets/tsite.jpg" alt="Lantern stands at Daikanyama T-SITE" style="width: 100%; height: 100%; object-fit: cover; display: block" /></div><p class="en" style="margin: 18px 0 6px; font-size: 12px; color: ${V.accent}; letter-spacing: 0.14em; font-weight: 700">02 — PRODUCT · 1 m</p><h3 style="margin: 0 0 10px; font-size: 22px; font-weight: 900">Furniture & product</h3><p style="margin: 0; font-size: 14px; line-height: 1.8; color: #D8D6D1">The same joint builds furniture. A festival lantern stand reassembles straight into a bench.</p></article><article class="reveal"><div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px"><span style="width: 10px; height: 10px; border-radius: 50%; background: ${V.accent}"></span><span style="flex: 1; height: 1px; background: #444"></span></div><div class="zoom" style="aspect-ratio: 4 / 3"><img src="/assets/gh_interior.jpg" alt="Inside the Circular Timber Greenhouse" style="width: 100%; height: 100%; object-fit: cover; display: block" /></div><p class="en" style="margin: 18px 0 6px; font-size: 12px; color: ${V.accent}; letter-spacing: 0.14em; font-weight: 700">03 — GREENHOUSE · 10 m</p><h3 style="margin: 0 0 10px; font-size: 22px; font-weight: 900">Greenhouse</h3><p style="margin: 0; font-size: 14px; line-height: 1.8; color: #D8D6D1">Modules link into greenhouses — from 80 m² to several hectares, without changing the rules.</p></article><article class="reveal"><div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px"><span style="width: 10px; height: 10px; border-radius: 50%; background: ${V.accent}"></span><span style="flex: 1; height: 1px; background: #444"></span></div><div class="zoom" style="aspect-ratio: 4 / 3"><img src="/assets/arch_fix.jpg" alt="Exterior rendering of a timber house designed by XENCE" style="width: 100%; height: 100%; object-fit: cover; display: block" /></div><p class="en" style="margin: 18px 0 6px; font-size: 12px; color: ${V.accent}; letter-spacing: 0.14em; font-weight: 700">04 — ARCHITECTURE · 12 m</p><h3 style="margin: 0 0 10px; font-size: 22px; font-weight: 900">Architecture</h3><p style="margin: 0; font-size: 14px; line-height: 1.8; color: #D8D6D1">Houses are designed on the same joint rules and data, down to every post-and-beam connection. Take one apart and it becomes material for the next building.</p></article></div>
</section>

<section id="projects" style="border-top: 1px solid #222; padding: 140px 4vw; max-width: 1440px; margin: 0 auto; box-sizing: border-box">
<div class="reveal" style="display: flex; justify-content: space-between; align-items: end; flex-wrap: wrap; gap: 24px; margin-bottom: 40px">
<div><p class="en" style="margin: 0 0 16px; font-size: 13px; letter-spacing: 0.22em; color: #A9A69F">PROJECT INDEX</p><h2 style="margin: 0; font-size: clamp(36px, 4vw, 60px); font-weight: 900">Projects</h2></div>
<div role="group" aria-label="Filter by type" style="display: flex; gap: 8px; flex-wrap: wrap">
${(V.filters || []).map((f) => html`<button type="button" onClick="${f.pick}" aria-pressed="${f.on}" style="font-family: inherit; font-size: 14px; font-weight: 700; padding: 12px 18px; min-height: 44px; border-radius: 999px; cursor: pointer; border: 1.5px solid #555; background: ${f.bg}; color: ${f.fg}">${f.label} <span class="en" style="opacity: .6">${f.n}</span></button>`)}
</div>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 48px; align-items: start">
<div style="flex: 999 1 600px; min-width: 0; overflow-x: auto">
<div class="en" style="display: grid; grid-template-columns: 48px 2.6fr 1.1fr 1.2fr 1fr; gap: 16px; font-size: 12px; color: #A9A69F; padding: 12px 0; border-bottom: 1px solid #fff; min-width: 680px"><span>No.</span><span>Project</span><span>Type</span><span>Input</span><span>Year</span></div>
${(V.rows || []).map((r) => html`
<button type="button" class="row" onClick="${r.pick}" aria-pressed="${r.on}" style="display: grid; grid-template-columns: 48px 2.6fr 1.1fr 1.2fr 1fr; gap: 16px; width: 100%; min-width: 680px; text-align: left; font: inherit; font-size: 14px; color: #fff; align-items: center; border: 0; border-bottom: 1px solid #333; cursor: pointer; padding: 20px ${r.pad}; background: ${r.bg}">
<span class="en" style="color: ${r.numColor}">${r.no}</span><span style="font-size: 17px; font-weight: 700">${r.title}</span><span>${r.type}</span><span style="color: #D8D6D1">${r.input}</span><span class="en" style="color: #D8D6D1; text-align: right">${r.year}</span>
</button>
`)}
</div>
<aside aria-label="Selected project" style="flex: 1 1 360px; position: sticky; top: 24px">
${(V.rows || []).map((r) => html`
${r.on ? html`
<div style="animation: fade .5s both">
${r.hasImg ? html`<div class="zoom" style="height: 320px"><img src="${r.img}" alt="${r.title}" style="width: 100%; height: 100%; object-fit: cover; display: block; animation: zoomout 1.4s cubic-bezier(.2,.8,.1,1) both" /></div>` : null}
${r.noImg ? html`<div style="height: 320px; background: #696660; display: flex; align-items: flex-end; padding: 16px; box-sizing: border-box; font-size: 13px">[Photo coming soon]</div>` : null}
<p class="en" style="margin: 20px 0 6px; font-size: 12px; color: ${V.accent}; letter-spacing: 0.14em">${r.no}</p>
<h3 style="margin: 0 0 12px; font-size: 23px">${r.title}</h3>
<p style="margin: 0 0 20px; font-size: 14px; line-height: 1.85; color: #D8D6D1">${r.desc}</p>
<div style="display: grid; grid-template-columns: 96px 1fr; row-gap: 10px; font-size: 13px; border-top: 1px solid #333; padding-top: 16px"><span style="color: #A9A69F">Type</span><span>${r.type}</span><span style="color: #A9A69F">Input</span><span>${r.input}</span><span style="color: #A9A69F">Technology</span><span>${r.tech}</span><span style="color: #A9A69F">Location</span><span>${r.place}</span><span style="color: #A9A69F">Year</span><span>${r.year}</span></div>
</div>
` : null}
`)}
</aside>
</div>
</section>

<section id="impact" style="background: ${V.accent}; color: #000; padding: 140px 4vw">
<div style="max-width: 1440px; margin: 0 auto">
<div class="reveal" style="display: flex; justify-content: space-between; align-items: end; flex-wrap: wrap; gap: 24px; margin-bottom: 64px">
<div><p class="en" style="margin: 0 0 16px; font-size: 13px; letter-spacing: 0.22em; font-weight: 700">IMPACT</p><h2 style="margin: 0; font-size: clamp(36px, 4vw, 60px); font-weight: 900">XENCE in numbers</h2></div>
<p style="margin: 0; max-width: 440px; font-size: 15px; line-height: 1.8">Results and targets are labelled separately. Every figure comes with its formula and source.</p>
</div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 48px 40px"><div class="reveal" style="border-top: 2px solid #000; padding-top: 20px"><p class="en" style="margin: 0 0 10px; font-size: 11px; letter-spacing: 0.16em; font-weight: 700">RESULT</p><p class="en" style="margin: 0; font-size: clamp(44px, 4.4vw, 68px); font-weight: 800; letter-spacing: -0.02em">40→95%</p><p style="margin: 10px 0 0; font-size: 14px; line-height: 1.75">Share of each log put to use — conventional sawmilling vs. XENCE’s design-to-fabrication process.</p></div><div class="reveal" style="border-top: 2px solid #000; padding-top: 20px"><p class="en" style="margin: 0 0 10px; font-size: 11px; letter-spacing: 0.16em; font-weight: 700">ASSESSED</p><p class="en" style="margin: 0; font-size: clamp(44px, 4.4vw, 68px); font-weight: 800; letter-spacing: -0.02em">840 t</p><p style="margin: 10px 0 0; font-size: 14px; line-height: 1.75">CO₂e locked in per hectare of timber greenhouse (structure, embodied stage).</p></div><div class="reveal" style="border-top: 2px solid #000; padding-top: 20px"><p class="en" style="margin: 0 0 10px; font-size: 11px; letter-spacing: 0.16em; font-weight: 700">ASSESSED</p><p class="en" style="margin: 0; font-size: clamp(44px, 4.4vw, 68px); font-weight: 800; letter-spacing: -0.02em">99.8 t</p><p style="margin: 10px 0 0; font-size: 14px; line-height: 1.75">CO₂ stored in a building we assessed (126.9 m³ of timber) — about 198 standing cedars.</p></div><div class="reveal" style="border-top: 2px solid #000; padding-top: 20px"><p class="en" style="margin: 0 0 10px; font-size: 11px; letter-spacing: 0.16em; font-weight: 700">ASSESSED</p><p class="en" style="margin: 0; font-size: clamp(44px, 4.4vw, 68px); font-weight: 800; letter-spacing: -0.02em">−19%</p><p style="margin: 10px 0 0; font-size: 14px; line-height: 1.75">Whole-life carbon of that building, 104.6 kg CO₂e/m², against an office average of 129.</p></div><div class="reveal" style="border-top: 2px solid #000; padding-top: 20px"><p class="en" style="margin: 0 0 10px; font-size: 11px; letter-spacing: 0.16em; font-weight: 700">RESULT</p><p class="en" style="margin: 0; font-size: clamp(44px, 4.4vw, 68px); font-weight: 800; letter-spacing: -0.02em">610 kg</p><p style="margin: 10px 0 0; font-size: 14px; line-height: 1.75">Wood-flour resin pellets made from offcuts and delivered.</p></div><div class="reveal" style="border-top: 2px solid #000; padding-top: 20px"><p class="en" style="margin: 0 0 10px; font-size: 11px; letter-spacing: 0.16em; font-weight: 700">TARGET</p><p class="en" style="margin: 0; font-size: clamp(44px, 4.4vw, 68px); font-weight: 800; letter-spacing: -0.02em">115 kt</p><p style="margin: 10px 0 0; font-size: 14px; line-height: 1.75">CO₂ stored per year once 200 sawmills route 200,000 m³ into buildings.</p></div></div>

</div>
</section>

<section id="growth" style="padding: 140px 4vw; max-width: 1440px; margin: 0 auto; box-sizing: border-box">
<div class="reveal" style="margin-bottom: 64px"><p class="en" style="margin: 0 0 16px; font-size: 13px; letter-spacing: 0.22em; color: #A9A69F">WHY IT LASTS</p><h2 style="margin: 0; font-size: clamp(36px, 4.4vw, 68px); line-height: 1.25; font-weight: 900">Why XENCE keeps<br />creating value.</h2><p style="margin: 24px 0 0; max-width: 760px; font-size: 16px; line-height: 1.85; color: #D8D6D1">Ending build-and-forget only works if the model itself keeps going. Here are six reasons it does.</p></div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 48px"><div class="reveal" style="border-top: 1px solid #444; padding-top: 24px"><p style="margin: 0; font-size: 13px; color: ${V.accent}; font-weight: 700; letter-spacing: 0.06em"><span class="en">01</span><span style="margin-left: 12px">Lifecycle operation</span></p><h3 style="margin: 12px 0 10px; font-size: 22px; font-weight: 900">Buildings keep producing value after handover</h3><p style="margin: 0; font-size: 15px; line-height: 1.85; color: #D8D6D1">After completion, XENCE keeps recording each building’s material history, carbon and operating data, and runs the facility. Because that record exists, the building becomes the bill of materials for the next one when it comes down. Its value doesn’t end at handover — and neither does our revenue.</p></div><div class="reveal" style="border-top: 1px solid #444; padding-top: 24px"><p style="margin: 0; font-size: 13px; color: ${V.accent}; font-weight: 700; letter-spacing: 0.06em"><span class="en">02</span><span style="margin-left: 12px">Parametric design</span></p><h3 style="margin: 12px 0 10px; font-size: 22px; font-weight: 900">One rule set, built again and again</h3><p style="margin: 0; font-size: 15px; line-height: 1.85; color: #D8D6D1">The Circular Timber Greenhouse™ is a package built on fixed joint and member rules, from ¥30,000 per m² (about ¥35m for 1,000 m²). We don’t redesign from scratch each time, so design effort per project falls as volume rises — and we reach more places.</p></div><div class="reveal" style="border-top: 1px solid #444; padding-top: 24px"><p style="margin: 0; font-size: 13px; color: ${V.accent}; font-weight: 700; letter-spacing: 0.06em"><span class="en">03</span><span style="margin-left: 12px">Digital fabrication</span></p><h3 style="margin: 12px 0 10px; font-size: 22px; font-weight: 900">The resource exists. The system to use it doesn’t — yet</h3><p style="margin: 0; font-size: 15px; line-height: 1.85; color: #D8D6D1">Japan produces 5.53 Mt of construction timber waste a year, and 96.2% of it is chipped or burned. A typical sawmill turns only about 40% of a log into building material. XENCE designs and fabricates irregular stock digitally, lifting utilisation to about 95%.</p></div><div class="reveal" style="border-top: 1px solid #444; padding-top: 24px"><p style="margin: 0; font-size: 13px; color: ${V.accent}; font-weight: 700; letter-spacing: 0.06em"><span class="en">04</span><span style="margin-left: 12px">Greenhouse market</span></p><h3 style="margin: 12px 0 10px; font-size: 22px; font-weight: 900">A market big enough to absorb it</h3><p style="margin: 0; font-size: 15px; line-height: 1.85; color: #D8D6D1">Japan has 37,000 ha under protected cultivation, only 1,478 ha of it glass. Converting just 1% (370 ha) to timber greenhouses at ¥30,000 per m² means ¥111bn of demand. Greenhouses are the first outlet that can take non-standard timber at volume.</p></div><div class="reveal" style="border-top: 1px solid #444; padding-top: 24px"><p style="margin: 0; font-size: 13px; color: ${V.accent}; font-weight: 700; letter-spacing: 0.06em"><span class="en">05</span><span style="margin-left: 12px">LCA & material passports</span></p><h3 style="margin: 12px 0 10px; font-size: 22px; font-weight: 900">The rules now ask for traceable buildings</h3><p style="margin: 0; font-size: 15px; line-height: 1.85; color: #D8D6D1">Under Japan’s revised Building Energy Efficiency Act (July 2026), a building LCA scheme is planned for FY2028, with mandatory filing for offices over 5,000 m². The EU is introducing Digital Product Passports. XENCE already runs J-CAT assessments and Material Passports in practice, so it can deliver the records these rules require from day one.</p></div><div class="reveal" style="border-top: 1px solid #444; padding-top: 24px"><p style="margin: 0; font-size: 13px; color: ${V.accent}; font-weight: 700; letter-spacing: 0.06em"><span class="en">06</span><span style="margin-left: 12px">Platform model</span></p><h3 style="margin: 12px 0 10px; font-size: 22px; font-weight: 900">Growth without forests or factories</h3><p style="margin: 0; font-size: 15px; line-height: 1.85; color: #D8D6D1">XENCE owns no forests and no mills. It links Japan’s ~3,500 sawmills — a ¥1.4tn precut and sawmilling market — and local builders through inventory and design data. With no plant to fund, each new region runs on the same system.</p></div></div>

<div class="reveal" style="margin-top: 64px"><p class="en" style="margin: 0 0 20px; font-size: 13px; letter-spacing: 0.22em; color: #A9A69F">Recognition & partners</p><div style="display: flex; flex-wrap: wrap; gap: 10px"><span style="padding: 12px 20px; border: 1px solid #444; border-radius: 999px; font-size: 14px">Red Dot Design Award 2026</span><span style="padding: 12px 20px; border: 1px solid #444; border-radius: 999px; font-size: 14px">Good Design Award 2025</span><span style="padding: 12px 20px; border: 1px solid #444; border-radius: 999px; font-size: 14px">Wood Design Award 2025</span><span style="padding: 12px 20px; border: 1px solid #444; border-radius: 999px; font-size: 14px">Nagoya University startup</span><span style="padding: 12px 20px; border: 1px solid #444; border-radius: 999px; font-size: 14px">Aichi Prefecture innovation grant</span><span style="padding: 12px 20px; border: 1px solid #444; border-radius: 999px; font-size: 14px">Partners incl. Takenaka Corporation, CCC</span></div></div>
</section>



<section id="studio" style="padding: 140px 4vw; max-width: 1440px; margin: 0 auto; box-sizing: border-box; border-top: 1px solid #222">
<div class="reveal" style="display: flex; justify-content: space-between; align-items: end; flex-wrap: wrap; gap: 24px; margin-bottom: 64px"><div><p class="en" style="margin: 0 0 16px; font-size: 13px; letter-spacing: 0.22em; color: #A9A69F">STUDIO</p><h2 class="en" style="margin: 0 0 16px; font-size: clamp(40px, 5vw, 76px); font-weight: 900">People</h2><p style="margin: 0; font-size: 17px; line-height: 1.8; color: #D8D6D1">Architects, engineers, researchers and operators. From Nagoya and Düsseldorf.</p></div><a href="#careers" class="en" style="background: #fff; color: #000; padding: 16px 28px; border-radius: 999px; font-weight: 700">Careers →</a></div>
<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 56px 24px"><div class="reveal"><div class="zoom" style="aspect-ratio: 1 / 1; overflow: hidden; background: #111"><img src="/assets/ko.jpg" alt="Kotaro Ozawa" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block" /></div><p class="en" style="margin: 20px 0 6px; font-size: 19px; font-weight: 800">Kotaro Ozawa</p><p class="en" style="margin: 0; font-size: 13px; line-height: 1.6; color: #A9A69F">Founder & CEO</p></div><div class="reveal"><div class="zoom" style="aspect-ratio: 1 / 1; overflow: hidden; background: #111"><img src="/assets/ao.jpg" alt="Asako Osedo" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block" /></div><p class="en" style="margin: 20px 0 6px; font-size: 19px; font-weight: 800">Asako Osedo</p><p class="en" style="margin: 0; font-size: 13px; line-height: 1.6; color: #A9A69F">Co-Director, Service Design Officer</p></div><div class="reveal"><div class="zoom" style="aspect-ratio: 1 / 1; overflow: hidden; background: #111"><img src="/assets/ks.jpg" alt="Koji Saito" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block" /></div><p class="en" style="margin: 20px 0 6px; font-size: 19px; font-weight: 800">Koji Saito</p><p class="en" style="margin: 0; font-size: 13px; line-height: 1.6; color: #A9A69F">Lead Architect</p></div><div class="reveal"><div class="zoom" style="aspect-ratio: 1 / 1; overflow: hidden; background: #111"><img src="/assets/ay.jpg" alt="Akihiro Yamada" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block" /></div><p class="en" style="margin: 20px 0 6px; font-size: 19px; font-weight: 800">Akihiro Yamada</p><p class="en" style="margin: 0; font-size: 13px; line-height: 1.6; color: #A9A69F">Lead Construction Management</p></div><div class="reveal"><div class="zoom" style="aspect-ratio: 1 / 1; overflow: hidden; background: #111"><img src="/assets/kj.jpg" alt="Kotaro Jin" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block" /></div><p class="en" style="margin: 20px 0 6px; font-size: 19px; font-weight: 800">Kotaro Jin</p><p class="en" style="margin: 0; font-size: 13px; line-height: 1.6; color: #A9A69F">Architect</p></div><div class="reveal"><div class="zoom" style="aspect-ratio: 1 / 1; overflow: hidden; background: #111"><img src="/assets/kk.jpg" alt="Kosuke Kuroda" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block" /></div><p class="en" style="margin: 20px 0 6px; font-size: 19px; font-weight: 800">Kosuke Kuroda</p><p class="en" style="margin: 0; font-size: 13px; line-height: 1.6; color: #A9A69F">Designer</p></div><div class="reveal"><div class="zoom" style="aspect-ratio: 1 / 1; overflow: hidden; background: #111"><img src="/assets/yk.jpg" alt="Yushi Kimoto" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block" /></div><p class="en" style="margin: 20px 0 6px; font-size: 19px; font-weight: 800">Yushi Kimoto</p><p class="en" style="margin: 0; font-size: 13px; line-height: 1.6; color: #A9A69F">Designer</p></div><div class="reveal"><div class="zoom" style="aspect-ratio: 1 / 1; overflow: hidden; background: #111"><img src="/assets/ms.jpg" alt="Mako Sumi" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block" /></div><p class="en" style="margin: 20px 0 6px; font-size: 19px; font-weight: 800">Mako Sumi</p><p class="en" style="margin: 0; font-size: 13px; line-height: 1.6; color: #A9A69F">Community Manager</p></div></div>
</section>

<section id="contact" style="padding: 140px 4vw; max-width: 1440px; margin: 0 auto; box-sizing: border-box">
<h2 class="reveal" style="margin: 0 0 56px; font-size: clamp(40px, 5vw, 76px); font-weight: 900; line-height: 1.2">If Japan’s ¥81tn construction<br />economy goes circular,<br />the world turns with it.</h2>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1px; background: #333; border: 1px solid #333"><a href="#c1" class="row" style="background: #000; padding: 36px; display: block"><span class="en" style="font-size: 12px; color: ${V.accent}">01</span><span style="display: block; margin-top: 12px; font-size: 22px; font-weight: 700">Build with us</span><span style="display: block; margin-top: 10px; font-size: 14px; color: #D8D6D1">Greenhouses, guesthouses, homes and furniture →</span></a><a href="#c2" class="row" style="background: #000; padding: 36px; display: block"><span class="en" style="font-size: 12px; color: ${V.accent}">02</span><span style="display: block; margin-top: 12px; font-size: 22px; font-weight: 700">Supply materials</span><span style="display: block; margin-top: 10px; font-size: 14px; color: #D8D6D1">For sawmills, demolition firms and municipalities →</span></a><a href="#c3" class="row" style="background: #000; padding: 36px; display: block"><span class="en" style="font-size: 12px; color: ${V.accent}">03</span><span style="display: block; margin-top: 12px; font-size: 22px; font-weight: 700">Partner on R&D</span><span style="display: block; margin-top: 10px; font-size: 14px; color: #D8D6D1">For companies, universities and international partners →</span></a><a href="#c4" class="row" style="background: #000; padding: 36px; display: block"><span class="en" style="font-size: 12px; color: ${V.accent}">04</span><span style="display: block; margin-top: 12px; font-size: 22px; font-weight: 700">Invest</span><span style="display: block; margin-top: 10px; font-size: 14px; color: #D8D6D1">For investors and strategic partners →</span></a></div>
</section>

<footer style="border-top: 1px solid #222; padding: 64px 4vw; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 32px; font-size: 13px; color: #A9A69F; line-height: 1.9">
<div><p class="en" style="margin: 0 0 12px; color: #fff; font-weight: 800; font-size: 20px">XENCE</p>XENCE Inc. ／ XENCE First-class Architect Office<br />Registered in Aichi Prefecture (I-4) No. 14198</div>
<div>Nagoya — SIMON 10 SAKAE 401, 1-29-29 Sakae, Naka-ku, Nagoya, Japan<br />Düsseldorf — Germany</div>
<div class="en">Instagram ／ note ／ LinkedIn<br />© XENCE Inc.</div>
</footer>
</div>`; };
render(h(App, {"accent": "#FF5528", "autoplayTech": true}), document.getElementById('app'));
