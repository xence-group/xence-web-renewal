import { h, render, Component as PC } from '/vendor/preact.module.js';
import htm from '/vendor/htm.module.js';
const html = htm.bind(h);

class App extends PC {
constructor(props) {
super(props);
this.D = {"techs": [{"num": "01", "title": "自動設計エンジン", "tag": "COMPUTATIONAL DESIGN", "body": "手元の材の寸法と数から、構造と部材の割付を自動で生成する。温室・家具・パビリオンを同じルールで設計できる。", "media": "/assets/t1_design.mp4", "caption": "不揃いな在庫材を、フレームの部材へ自動で割り当てる", "alt": "在庫材が温室フレームの部材に割り当てられていくアニメーション", "video": true}, {"num": "02", "title": "3D構造解析", "tag": "STRUCTURAL ANALYSIS", "body": "積雪と風の荷重を3Dフレーム全体にかけ、変形と部材ごとの検定比を確かめる。規格外の材でも構造に使える根拠をつくる。", "media": "/assets/out_t2_analysis.mp4", "caption": "積雪・風荷重による3Dフレームの変形と、部材ごとの検定比（イメージ）", "alt": "温室の3Dフレームが積雪と風で変形し、部材が検定比に応じて色分けされるアニメーション", "video": true}, {"num": "03", "title": "デジタル加工と接合", "tag": "FABRICATION", "body": "不整形な材をスキャンし、曲がりや木目、耳をそのまま活かす形で部材と継手を割り付ける。金物に頼らない木組みで組み上げ、分解もできる。", "media": "/assets/out_t3_fab.mp4", "caption": "曲がった耳材をスキャンし、材の曲がりに沿って部材と継手を割り付ける", "alt": "曲がった板材をスキャンし、その曲線に沿った部材と加工パスを生成するアニメーション", "video": true}, {"num": "04", "title": "3Dプリント", "tag": "ADDITIVE MANUFACTURING", "body": "自由な形を、積層できる向きに起こし、張り出しの角度を検出して積層できる形状へ自動で調整してから造形する。金属（WAAM）のほか、樹脂や木粉複合材にも同じ流れで対応する。", "media": "/assets/out_t4_waam_v4.mp4", "caption": "曲面を90度起こし、張り出しを検出して積層できる形に自動調整してから、下から積み上げる（金属WAAMの例）", "alt": "曲面が90度回転し、造形台の上に下から層を積み上げていくアニメーション", "video": true}, {"num": "05", "title": "Material Passport", "tag": "TRACEABILITY", "body": "伐採・運搬・製材・乾燥・加工・建物までの来歴とともに、木材の炭素固定量と各工程のGHG排出量をひとつのQRコードに記録し、次の利用へ受け継ぐ。2026年10月に運用開始。", "media": "/assets/out_t5_passport_v4.mp4", "caption": "森から建物まで、来歴・炭素固定量・GHG排出量をひとつのQRで引き継ぐ（記録例）", "alt": "森、トレーラー、製材所、乾燥、加工、建物の順に記録が加わるQRコード付きパスポートのアニメーション", "video": true}, {"num": "06", "title": "LCA・運用データ", "tag": "WHOLE-LIFE CARBON", "body": "建物の生涯CO₂をJ-CATやOne Click LCAで算定し、運用データとあわせて資産価値の根拠にする。", "media": "/assets/out_t6_lca_v4.mp4", "caption": "木造温室の炭素固定、J-CATによるホールライフカーボン、キャンパスの施設費分析", "alt": "炭素固定量、ライフサイクルCO2の内訳、施設費の内訳が順に表示されるアニメーション", "video": true}], "projects": [{"id": "p1", "cat": "gh", "img": "/assets/gh_night_in.jpg", "title": "サーキュラー木造温室™", "type": "温室", "input": "製材端材", "tech": "自動設計・構造解析", "place": "三重県", "year": "2025", "status": "完成", "desc": "製材所の端材を構造に使った木造温室。全部材を分解・再組立でき、連棟で面積を広げられる。Red Dot Design Award 2026 受賞。"}, {"id": "p2", "cat": "gh", "img": "/assets/higashiura.jpg", "title": "東浦町 セルフビルド温室（2連棟・130㎡）", "type": "温室", "input": "製材端材", "tech": "自動設計・デジタル加工", "place": "愛知県東浦町", "year": "2026", "status": "建設中", "desc": "林業用苗木・イチゴ・トマトの3ゾーンをもつ温室を、番号付きの部材で、使う人たち自身が組み上げる。"}, {"id": "p3", "cat": "fu", "img": "/assets/tsite.jpg", "title": "代官山T-SITE 提灯スタンド ⇄ ベンチ", "type": "家具・プロダクト", "input": "製材端材", "tech": "デジタル加工・Passport", "place": "東京", "year": "2026", "status": "完成", "desc": "夏祭りの提灯スタンドを、祭りの後にベンチへ組み替えた。金物を使わない木製ジョイントで、全部材にMaterial Passportを発行。"}, {"id": "p4", "cat": "fu", "img": "/assets/table.jpg", "title": "名古屋大学 C-TECs 新素材什器", "type": "家具・プロダクト", "input": "新素材 [要確認]", "tech": "デジタル加工", "place": "名古屋", "year": "2026", "status": "納品済", "desc": "名古屋大学 未来社会創造機構の交流スペースのために製作した什器。[素材・仕様を記入]"}, {"id": "p11", "cat": "fu", "img": "/assets/bench3d_a.jpg", "title": "3Dプリントベンチ", "type": "家具・プロダクト", "input": "金属", "tech": "金属3Dプリント（WAAM）", "place": "愛知県", "year": "2025", "status": "完成", "desc": "形状を積層用に自動変換し、WAAMで一体造形したベンチ。座面の格子と脚のリブまで、ひと続きの金属で積み上げている。"}, {"id": "p12", "cat": "ar", "img": "/assets/woodnode.jpg", "title": "端材を建築にするジョイント（WoodNode）", "type": "建築", "input": "耳材・端材", "tech": "金属3Dプリント・トポロジー最適化", "place": "[場所]", "year": "2024", "status": "完成", "desc": "製材所で出る耳材を構造に使うための建築ジョイント。材ごとに違う形に合わせて金属3Dプリントで造形し、トポロジー最適化で強度と軽さを両立した。竹中工務店・シモダフランジ・野地木材工業と協働。アーバンインフラ・テクノロジー推進会議 優秀賞。"}, {"id": "p7", "cat": "ar", "img": "/assets/arch_fix.jpg", "title": "大径木の家", "type": "建築", "input": "大径木", "tech": "構造解析・デジタル加工", "place": "東京都", "year": "2026", "status": "施工中", "desc": "流通しにくい大径木を、組立梁として構造に使う住宅。"}, {"id": "p8", "cat": "ma", "img": "/assets/wf_bench.jpg", "title": "木粉樹脂ペレット（竹中工務店・倉敷紡績と共同開発）", "type": "素材・データ", "input": "端材・木粉", "tech": "素材開発", "place": "東京・日本橋で採用", "year": "2025", "status": "610 kg 納入", "desc": "エンジニアリングウッドの端材を木粉にし、生分解性樹脂や再生PPと混ぜて成形材料にした。"}, {"id": "p21", "cat": "fm", "img": "/assets/memu.jpg", "title": "MEMU Open Research Campus", "type": "ファシリティマネジメント", "input": "既存施設", "tech": "ファシリティマネジメント", "place": "北海道大樹町", "year": "2022", "status": "運営中", "desc": "北海道大樹町の研究キャンパスで、施設のファシリティマネジメントを担う。既存の建物を活かしながら、使い方に合わせて手を入れ続けている。"}, {"id": "p22", "cat": "fm", "img": "/assets/ideastoa.jpg", "title": "名古屋大学 Idea Stoa", "type": "ファシリティマネジメント", "input": "既存施設", "tech": "ファシリティマネジメント", "place": "名古屋", "year": "2023", "status": "運営中", "desc": "レーザーカッターなどの工作機械を備えた、名古屋大学のものづくり・交流の拠点。施設のファシリティマネジメントを担う。"}, {"id": "p23", "cat": "fm", "img": "/assets/monomiyusan.jpg", "title": "物見遊山（遊棟）", "type": "ファシリティマネジメント", "input": "古民家", "tech": "ファシリティマネジメント・宿運営", "place": "岐阜県郡上市白鳥町", "year": "2026", "status": "運営中", "desc": "白鳥の暮らしや遊びを旅人に紹介し、受け継いでいく古民家の宿。地域の人と旅人がつながる拠点として運営している。"}], "filters": [["all", "すべて"], ["fu", "家具・プロダクト"], ["gh", "温室"], ["ar", "建築"], ["ma", "素材・データ"], ["fm", "ファシリティマネジメント"]], "kinds": {"col": "柱", "raf": "合掌", "tie": "陸梁", "beam": "桁・母屋", "sill": "土台", "brace": "筋かい"}, "ui": {"explode": "分解する", "assemble": "組み立てる", "unit": "棟", "units": "棟"}};
this.state = { tech: 0, bays: 6, span: 1, units: 2, exploded: false, filter: 'all', row: 'p1', heroSrc: '', heroPoster: '' };
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
const bay = 2.0, He = 2.6, Hr = He + Wd * 0.26, L = bays * bay, Wt = units * Wd;
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
modeLabel: (this.state.exploded ? 'KIT OF PARTS' : 'LIVE MODEL') + ' — ' + (this.state.bays * 2) + ' m × ' + spanL[this.state.span] + ' × ' + this.state.units,
onBays: (e) => this.setState({ bays: parseInt(e.target.value, 10) }),
exploded: this.state.exploded, toggleExplode: () => this.setState((s) => ({ exploded: !s.exploded })),
explodeLabel: this.state.exploded ? D.ui.assemble : D.ui.explode, explodeBg: this.state.exploded ? '#000' : '#fff', explodeFg: this.state.exploded ? '#fff' : '#000'
};
}
}

App.prototype.render = function () { const V = this.renderVals(); return html`<helmet>



</helmet>
<div class="xroot" style="font-family: 'Zen Kaku Gothic New', sans-serif; color: #fff; background: #000; width: 100%">

<header class="site-head" style="position: fixed; top: 0; left: 0; right: 0; z-index: 50; background: rgba(0,0,0,0.62); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); border-bottom: 1px solid rgba(255,255,255,0.08); display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 16px; padding: 18px 4vw">
<div class="en" style="font-weight: 800; font-size: 24px; letter-spacing: 0.04em">XENCE</div>
<nav aria-label="Main" class="en" style="display: flex; gap: 26px; flex-wrap: wrap; align-items: center; font-size: 14px; font-weight: 600">
<a href="#model">Model</a><a href="#technology">Technology</a><a href="#configurator">Configurator</a><a href="#projects">Projects</a><a href="#impact">Impact</a><a href="#growth">Investors</a>
<a href="#contact" style="background: #fff; color: #000; padding: 12px 22px; border-radius: 999px; font-weight: 700">CONTACT <span class="live" style="color: ${V.accent}">●</span></a>
<span class="lang" style="color: #8a877f"><a href="/" style="color: #fff">JA</a> / <a href="/en/" style="color: #8a877f">EN</a></span>
</nav>
</header>

<section id="mission" style="position: relative; height: 100vh; min-height: 760px; overflow: hidden; background: #000">
<div class="par" style="position: absolute; inset: 0">
<video ref="${V.muteRef}" src="${V.heroSrc}" poster="${V.heroPoster}" autoPlay="${true}" muted="${true}" loop="${true}" playsInline="${true}" aria-label="森、丸太、製材所、設計データ、建方、木組み、完成した温室をつなぐ映像" style="width: 100%; height: 100%; object-fit: cover; display: block"></video>
</div>
<div class="hero-shade" style="position: absolute; inset: 0; background: linear-gradient(90deg, rgba(0,0,0,0.82) 0%, rgba(0,0,0,0.55) 42%, rgba(0,0,0,0.12) 72%, rgba(0,0,0,0) 100%)"></div>
<div class="hero-copy" style="position: absolute; left: 4vw; right: 4vw; bottom: 140px; max-width: 760px">
<p class="en fadein" style="margin: 0 0 28px; font-size: 13px; letter-spacing: 0.24em; color: ${V.accent}; font-weight: 700">OUR MISSION</p>
<h1 style="margin: 0; font-size: clamp(34px, 4.4vw, 76px); line-height: 1.16; font-weight: 900; letter-spacing: -0.02em">
<span class="mask"><span>「建てて終わり」を、</span></span>
<span class="mask d1"><span>終わらせる。</span></span>
</h1>
<div class="fadein" style="display: flex; flex-direction: column; gap: 14px; margin-top: 28px">
<p class="en" style="margin: 0; font-size: clamp(17px, 1.4vw, 22px); font-weight: 700">Waste in. Assets out.</p>
<p style="margin: 0; max-width: 560px; font-size: 15px; line-height: 1.9; color: #E8E6E1">端材、大径木、解体材、木粉。建設が使えずに手放してきた規格外の資源を、XENCEは建築に変えます。設計・施工・運用をひとつのデジタルデータでつなぎ、建てた後も記録し、運用し、次の建築へ循環させます。</p>
</div>
</div>
<div style="position: absolute; left: 0; right: 0; bottom: 0; border-top: 1px solid rgba(255,255,255,0.25); padding: 22px 0; overflow: hidden; background: rgba(0,0,0,0.35)">
<div class="track en" style="gap: 56px; font-size: 15px; font-weight: 600; white-space: nowrap; color: #E8E6E1"><span>Red Dot Design Award 2026</span><span style="color: ${V.accent}">●</span><span>グッドデザイン賞 2025</span><span style="color: ${V.accent}">●</span><span>ウッドデザイン賞 2025</span><span style="color: ${V.accent}">●</span><span>Computational Design</span><span style="color: ${V.accent}">●</span><span>Structural Analysis</span><span style="color: ${V.accent}">●</span><span>Digital Fabrication</span><span style="color: ${V.accent}">●</span><span>3D Printing</span><span style="color: ${V.accent}">●</span><span>Material Passport</span><span style="color: ${V.accent}">●</span><span>Whole-life Carbon</span><span style="color: ${V.accent}">●</span><span>Nagoya ／ Düsseldorf</span><span style="color: ${V.accent}">●</span><span>Red Dot Design Award 2026</span><span style="color: ${V.accent}">●</span><span>グッドデザイン賞 2025</span><span style="color: ${V.accent}">●</span><span>ウッドデザイン賞 2025</span><span style="color: ${V.accent}">●</span><span>Computational Design</span><span style="color: ${V.accent}">●</span><span>Structural Analysis</span><span style="color: ${V.accent}">●</span><span>Digital Fabrication</span><span style="color: ${V.accent}">●</span><span>3D Printing</span><span style="color: ${V.accent}">●</span><span>Material Passport</span><span style="color: ${V.accent}">●</span><span>Whole-life Carbon</span><span style="color: ${V.accent}">●</span><span>Nagoya ／ Düsseldorf</span><span style="color: ${V.accent}">●</span></div>
</div>
<p class="en hero-cap fadein" style="position: absolute; right: 4vw; bottom: 140px; margin: 0; font-size: 11px; letter-spacing: 0.2em; color: #A9A69F; text-align: right; line-height: 2">SAME TIMBER, REASSEMBLED<br /><span style="color: #fff">PAVILION → GREENHOUSE → HOUSE</span></p>
</section>
<section id="awards" style="border-bottom: 1px solid #222; padding: 40px 4vw; box-sizing: border-box">
<div class="aw-row" style="max-width: 1440px; margin: 0 auto; display: flex; align-items: center; gap: 56px; flex-wrap: wrap">
<p class="en" style="margin: 0; font-size: 11px; letter-spacing: 0.22em; color: #A9A69F; line-height: 1.8">AWARDS &<br />RECOGNITION</p>
<div class="aw-logos" style="display: flex; align-items: center; gap: 56px; flex-wrap: wrap; flex: 1"><img src="/assets/w_reddot.png" alt="Red Dot Award 2026 Urban Design" loading="lazy" class="aw-logo" style="height: 64px; width: auto; display: block" /><img src="/assets/w_gda.png" alt="Good Design Award 2025" loading="lazy" class="aw-logo" style="height: 40px; width: auto; display: block" /><img src="/assets/w_jwda.png" alt="Japan Wood Design Award 2025" loading="lazy" class="aw-logo" style="height: 64px; width: auto; display: block" /><img src="/assets/w_nuv.png" alt="Nagoya University Venture" loading="lazy" class="aw-logo" style="height: 60px; width: auto; display: block" /></div>
<p class="aw-more" style="margin: 0; font-size: 14px; color: #D8D6D1">ほか受賞多数</p>
</div>
</section>


<section id="works" style="padding: 56px 0 0">
<div style="display: flex; gap: 20px; overflow-x: auto; scroll-snap-type: x mandatory; padding: 0 4vw 8px; scrollbar-width: none"><figure style="margin: 0; flex: none; width: min(46vw, 640px); scroll-snap-align: start"><div class="zoom" style="aspect-ratio: 3 / 2; background: #111"><img src="/assets/gh_interior.jpg" alt="温室の内部" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block" /></div><figcaption style="display: flex; justify-content: space-between; margin-top: 12px; font-size: 13px; color: #A9A69F"><span>温室の内部</span><span class="en">2025</span></figcaption></figure><figure style="margin: 0; flex: none; width: min(46vw, 640px); scroll-snap-align: start"><div class="zoom" style="aspect-ratio: 3 / 2; background: #111"><img src="/assets/tsite.jpg" alt="代官山T-SITE 提灯スタンド" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block" /></div><figcaption style="display: flex; justify-content: space-between; margin-top: 12px; font-size: 13px; color: #A9A69F"><span>代官山T-SITE 提灯スタンド</span><span class="en">2026</span></figcaption></figure><figure style="margin: 0; flex: none; width: min(46vw, 640px); scroll-snap-align: start"><div class="zoom" style="aspect-ratio: 3 / 2; background: #111"><img src="/assets/gh_night_in.jpg" alt="サーキュラー木造温室™" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block" /></div><figcaption style="display: flex; justify-content: space-between; margin-top: 12px; font-size: 13px; color: #A9A69F"><span>サーキュラー木造温室™</span><span class="en">2025</span></figcaption></figure><figure style="margin: 0; flex: none; width: min(46vw, 640px); scroll-snap-align: start"><div class="zoom" style="aspect-ratio: 3 / 2; background: #111"><img src="/assets/bench3d_a.jpg" alt="3Dプリントベンチ" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block" /></div><figcaption style="display: flex; justify-content: space-between; margin-top: 12px; font-size: 13px; color: #A9A69F"><span>3Dプリントベンチ</span><span class="en">2025</span></figcaption></figure><figure style="margin: 0; flex: none; width: min(46vw, 640px); scroll-snap-align: start"><div class="zoom" style="aspect-ratio: 3 / 2; background: #111"><img src="/assets/joint.jpg" alt="金物を使わない木組み" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block" /></div><figcaption style="display: flex; justify-content: space-between; margin-top: 12px; font-size: 13px; color: #A9A69F"><span>金物を使わない木組み</span><span class="en"></span></figcaption></figure><figure style="margin: 0; flex: none; width: min(46vw, 640px); scroll-snap-align: start"><div class="zoom" style="aspect-ratio: 3 / 2; background: #111"><img src="/assets/higashiura.jpg" alt="東浦町 セルフビルド温室" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block" /></div><figcaption style="display: flex; justify-content: space-between; margin-top: 12px; font-size: 13px; color: #A9A69F"><span>東浦町 セルフビルド温室</span><span class="en">2026</span></figcaption></figure></div>
</section>
<section style="padding: 160px 4vw 140px; max-width: 1440px; margin: 0 auto; box-sizing: border-box">
<div style="display: flex; flex-wrap: wrap; gap: 72px; align-items: end">
<div class="reveal" style="flex: 999 1 560px; min-width: 0">
<p class="en" style="margin: 0 0 24px; font-size: 13px; letter-spacing: 0.22em; color: #A9A69F">WHY XENCE</p>
<h2 style="margin: 0; font-size: clamp(32px, 3.6vw, 56px); line-height: 1.45; font-weight: 900">デジタル技術で、あらゆる資源を<br />未来に残る建築の資産に。</h2>
</div>
<div class="reveal" style="flex: 1 1 100%; display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; margin-top: 8px">
<figure style="margin: 0"><div class="zoom revealimg" style="aspect-ratio: 4 / 5"><img src="/assets/forest.jpg" alt="上空から見た森と林道" style="width: 100%; height: 100%; object-fit: cover; display: block" /></div><figcaption class="en" style="margin-top: 10px; font-size: 11px; letter-spacing: 0.16em; color: #A9A69F">01 · 森の資源</figcaption></figure>
<figure style="margin: 0"><div class="zoom revealimg" style="aspect-ratio: 4 / 5; background: #0b0b0b"><img src="/assets/logs.jpg" alt="断面も太さも不揃いな丸太の山" style="width: 100%; height: 100%; object-fit: cover; display: block" /></div><figcaption class="en" style="margin-top: 10px; font-size: 11px; letter-spacing: 0.16em; color: #A9A69F">02 · 規格外として残る丸太</figcaption></figure>
<figure style="margin: 0"><div class="zoom revealimg" style="aspect-ratio: 4 / 5"><img src="/assets/waste.jpg" alt="埋立地に積み上がる廃棄物" style="width: 100%; height: 100%; object-fit: cover; display: block" /></div><figcaption class="en" style="margin-top: 10px; font-size: 11px; letter-spacing: 0.16em; color: ${V.accent}">03 · 捨てられていく資源</figcaption></figure>
</div>
</div>
<div class="stats3" style="display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 48px; margin-top: 96px"><div class="reveal" style="border-top: 2px solid #fff; padding-top: 24px"><p class="en" style="margin: 0; font-size: clamp(48px, 5vw, 80px); font-weight: 800; letter-spacing: -0.02em">約40%</p><p style="margin: 12px 0 0; font-size: 15px; line-height: 1.8; color: #D8D6D1">丸太のうち、一般的な製材で建材になる割合。残りは燃料・チップ・廃棄へ回る。</p></div><div class="reveal" style="border-top: 2px solid #fff; padding-top: 24px"><p class="en" style="margin: 0; font-size: clamp(48px, 5vw, 80px); font-weight: 800; letter-spacing: -0.02em">553万t</p><p style="margin: 12px 0 0; font-size: 15px; line-height: 1.8; color: #D8D6D1">国内で毎年出る建設発生木材。そのうち96.2%がチップや燃料として処理されている。</p></div><div class="reveal" style="border-top: 2px solid #fff; padding-top: 24px"><p class="en" style="margin: 0; font-size: clamp(48px, 5vw, 80px); font-weight: 800; letter-spacing: -0.02em">35%+</p><p style="margin: 12px 0 0; font-size: 15px; line-height: 1.8; color: #D8D6D1">EUの廃棄物のうち建設由来の割合。採取される資源の約半分は建設に使われている。</p></div></div>
<p style="margin: 24px 0 0; font-size: 12px; color: #8a877f">出典は「数字で見るXENCE」の計算根拠を参照</p>
</section>

<section id="news" style="padding: 140px 4vw; max-width: 1440px; margin: 0 auto; box-sizing: border-box; border-top: none">

<div class="reveal"><div style="display: flex; justify-content: space-between; align-items: end; gap: 24px; margin-bottom: 24px"><h2 class="en" style="margin: 0; font-size: clamp(40px, 5vw, 76px); font-weight: 900">News</h2><a href="https://xencegroup.com/news" target="_blank" rel="noopener" class="en" style="font-size: 14px; color: #A9A69F">View all ↗</a></div><div style="border-top: 1px solid #fff"><a href="https://xencegroup.com/news/9LhNPbQ0" target="_blank" rel="noopener" class="row news-row" style="display: grid; grid-template-columns: 120px minmax(0, 1fr) 24px; gap: 24px; align-items: baseline; padding: 24px 0; border-bottom: 1px solid #333"><span class="en" style="font-size: 13px; color: #A9A69F">2026/10/23</span><span style="font-size: 17px; line-height: 1.7">「未活用材をどれだけ使えたか」代官山T-SITEにて木材トレーサビリティの試験運用を開始</span><span class="en" style="color: ${V.accent}">↗</span></a><a href="https://xencegroup.com/news/_kRFwB8a" target="_blank" rel="noopener" class="row news-row" style="display: grid; grid-template-columns: 120px minmax(0, 1fr) 24px; gap: 24px; align-items: baseline; padding: 24px 0; border-bottom: 1px solid #333"><span class="en" style="font-size: 13px; color: #A9A69F">2026/9/11</span><span style="font-size: 17px; line-height: 1.7">代官山T-SITE「爽涼祭」に、端材から生まれた提灯台が登場</span><span class="en" style="color: ${V.accent}">↗</span></a><a href="https://xencegroup.com/news/9VckaqYJ" target="_blank" rel="noopener" class="row news-row" style="display: grid; grid-template-columns: 120px minmax(0, 1fr) 24px; gap: 24px; align-items: baseline; padding: 24px 0; border-bottom: 1px solid #333"><span class="en" style="font-size: 13px; color: #A9A69F">2026/7/22</span><span style="font-size: 17px; line-height: 1.7">日経木材新聞にて「サーキュラー木造温室®︎」をご紹介いただきました</span><span class="en" style="color: ${V.accent}">↗</span></a><a href="https://xencegroup.com/news/260630" target="_blank" rel="noopener" class="row news-row" style="display: grid; grid-template-columns: 120px minmax(0, 1fr) 24px; gap: 24px; align-items: baseline; padding: 24px 0; border-bottom: 1px solid #333"><span class="en" style="font-size: 13px; color: #A9A69F">2026/6/30</span><span style="font-size: 17px; line-height: 1.7">XENCE、愛知県の補助金事業に採択「サーキュラー木造温室™」の新モデル開発を開始</span><span class="en" style="color: ${V.accent}">↗</span></a><a href="https://xencegroup.com/news/260616" target="_blank" rel="noopener" class="row news-row" style="display: grid; grid-template-columns: 120px minmax(0, 1fr) 24px; gap: 24px; align-items: baseline; padding: 24px 0; border-bottom: 1px solid #333"><span class="en" style="font-size: 13px; color: #A9A69F">2026/6/16</span><span style="font-size: 17px; line-height: 1.7">施工特化の新部門「XENCE Engineering」を発足</span><span class="en" style="color: ${V.accent}">↗</span></a><details class="news-more"><summary style="padding: 22px 0; font-size: 14px; font-weight: 700; color: #A9A69F; cursor: pointer; list-style: none">過去のニュースを見る（9件） ＋</summary><a href="https://xencegroup.com/news/260602" target="_blank" rel="noopener" class="row news-row" style="display: grid; grid-template-columns: 120px minmax(0, 1fr) 24px; gap: 24px; align-items: baseline; padding: 24px 0; border-bottom: 1px solid #333"><span class="en" style="font-size: 13px; color: #A9A69F">2026/6/2</span><span style="font-size: 17px; line-height: 1.7">「サーキュラー木造温室™」が Red Dot Design Award 2026 アーバンデザイン部門を受賞</span><span class="en" style="color: ${V.accent}">↗</span></a><a href="https://xencegroup.com/news/260407" target="_blank" rel="noopener" class="row news-row" style="display: grid; grid-template-columns: 120px minmax(0, 1fr) 24px; gap: 24px; align-items: baseline; padding: 24px 0; border-bottom: 1px solid #333"><span class="en" style="font-size: 13px; color: #A9A69F">2026/4/7</span><span style="font-size: 17px; line-height: 1.7">プレスリリース｜名古屋大学発ベンチャーに認定。デジタル設計施工×未利用木材で、建設業を「ジェネレーティブコントラクト」へ</span><span class="en" style="color: ${V.accent}">↗</span></a><a href="https://xencegroup.com/news/zNSZMKlS" target="_blank" rel="noopener" class="row news-row" style="display: grid; grid-template-columns: 120px minmax(0, 1fr) 24px; gap: 24px; align-items: baseline; padding: 24px 0; border-bottom: 1px solid #333"><span class="en" style="font-size: 13px; color: #A9A69F">2026/3/30</span><span style="font-size: 17px; line-height: 1.7">中京テレビ「アプデの森」でサーキュラー木造温室®︎をご紹介いただきました</span><span class="en" style="color: ${V.accent}">↗</span></a><a href="https://xencegroup.com/news/260116" target="_blank" rel="noopener" class="row news-row" style="display: grid; grid-template-columns: 120px minmax(0, 1fr) 24px; gap: 24px; align-items: baseline; padding: 24px 0; border-bottom: 1px solid #333"><span class="en" style="font-size: 13px; color: #A9A69F">2026/1/16</span><span style="font-size: 17px; line-height: 1.7">超異分野学会 愛知フォーラム2026 |「サーキュラー木造温室」が大冷工業賞を受賞しました</span><span class="en" style="color: ${V.accent}">↗</span></a><a href="https://xencegroup.com/news/260101" target="_blank" rel="noopener" class="row news-row" style="display: grid; grid-template-columns: 120px minmax(0, 1fr) 24px; gap: 24px; align-items: baseline; padding: 24px 0; border-bottom: 1px solid #333"><span class="en" style="font-size: 13px; color: #A9A69F">2025/12/31</span><span style="font-size: 17px; line-height: 1.7">XENCE、2026年1月1日より株式会社化し、新たなスタート。</span><span class="en" style="color: ${V.accent}">↗</span></a><a href="https://xencegroup.com/news/251220" target="_blank" rel="noopener" class="row news-row" style="display: grid; grid-template-columns: 120px minmax(0, 1fr) 24px; gap: 24px; align-items: baseline; padding: 24px 0; border-bottom: 1px solid #333"><span class="en" style="font-size: 13px; color: #A9A69F">2025/12/20</span><span style="font-size: 17px; line-height: 1.7">日経クロステックに取材掲載いただきました</span><span class="en" style="color: ${V.accent}">↗</span></a><a href="https://xencegroup.com/news/251001" target="_blank" rel="noopener" class="row news-row" style="display: grid; grid-template-columns: 120px minmax(0, 1fr) 24px; gap: 24px; align-items: baseline; padding: 24px 0; border-bottom: 1px solid #333"><span class="en" style="font-size: 13px; color: #A9A69F">2025/9/30</span><span style="font-size: 17px; line-height: 1.7">グッドデザイン賞 2025 | サーキュラー木造温室が受賞しました</span><span class="en" style="color: ${V.accent}">↗</span></a><a href="https://xencegroup.com/news/250930" target="_blank" rel="noopener" class="row news-row" style="display: grid; grid-template-columns: 120px minmax(0, 1fr) 24px; gap: 24px; align-items: baseline; padding: 24px 0; border-bottom: 1px solid #333"><span class="en" style="font-size: 13px; color: #A9A69F">2025/9/29</span><span style="font-size: 17px; line-height: 1.7">ウッドデザイン賞 2025 | サーキュラー木造温室が受賞しました</span><span class="en" style="color: ${V.accent}">↗</span></a><a href="https://xencegroup.com/news/241120" target="_blank" rel="noopener" class="row news-row" style="display: grid; grid-template-columns: 120px minmax(0, 1fr) 24px; gap: 24px; align-items: baseline; padding: 24px 0; border-bottom: 1px solid #333"><span class="en" style="font-size: 13px; color: #A9A69F">2024/11/20</span><span style="font-size: 17px; line-height: 1.7">第36回技術研究発表会 優秀賞 | 金属3Dプリンター製接合部の開発が受賞しました</span><span class="en" style="color: ${V.accent}">↗</span></a></details></div></div>
</section>

<section id="model" style="background: #F4F3F1; color: #000; padding: 140px 4vw">
<div style="max-width: 1440px; margin: 0 auto">
<div style="display: flex; flex-wrap: wrap; gap: 64px; align-items: center">
<div class="reveal" style="flex: 999 1 560px; min-width: 0">
<p class="en" style="margin: 0 0 16px; font-size: 13px; letter-spacing: 0.22em; color: #696660">OUR MODEL</p>
<h2 style="margin: 0 0 28px; font-size: clamp(36px, 4.4vw, 68px); line-height: 1.25; font-weight: 900">あらゆる素材を建築に。<br />建築を、持続可能な社会資産に。</h2>
<p style="margin: 0; max-width: 640px; font-size: 18px; line-height: 1.9; color: #333">XENCEは設計も施工も自社で行い、建てた施設の指定管理・運営まで担います。そこで得たデータを技術開発に戻し、次の建築をより速く、確かにする。<b>建築の請負を、建てて終わりにしない。素材のデータから環境配慮、運営マネジメントまでをつなぐ、建築のプラットフォーマーになります。</b></p>
</div>
<div class="reveal" style="flex: 1 1 360px; display: flex; flex-direction: column; align-items: center">
<svg viewBox="-110 0 620 400" role="img" aria-label="設計 → 施工 → 指定管理 → 技術開発" style="width: 100%; max-width: 520px; height: auto; display: block">
<circle cx="200" cy="200" r="140" fill="none" stroke="#000" stroke-width="1.5" stroke-dasharray="4 6"></circle>
<g class="spin"><circle cx="200" cy="60" r="9" fill="${V.accent}"></circle></g>
<circle cx="200" cy="60" r="5" fill="#000"></circle><circle cx="340" cy="200" r="5" fill="#000"></circle><circle cx="200" cy="340" r="5" fill="#000"></circle><circle cx="60" cy="200" r="5" fill="#000"></circle>
<text x="200" y="34" text-anchor="middle" font-size="15" font-weight="700" fill="#000">設計</text>
<text x="352" y="205" text-anchor="start" font-size="15" font-weight="700" fill="#000">施工</text>
<text x="200" y="374" text-anchor="middle" font-size="15" font-weight="700" fill="#000">指定管理</text>
<text x="48" y="205" text-anchor="end" font-size="15" font-weight="700" fill="#000">技術開発</text>
<text x="200" y="196" text-anchor="middle" font-size="30" font-weight="800" fill="#000" font-family="Montserrat">XENCE</text>
<text x="200" y="222" text-anchor="middle" font-size="12" letter-spacing="2" fill="#696660" font-family="Montserrat">FLYWHEEL</text>
</svg>
<p style="margin: 20px 0 0; max-width: 420px; font-size: 14px; line-height: 1.85; color: #333">設計・施工・指定管理を一社で行い、そこで得たデータを技術開発に戻す。回るほど、次の建築が速く確かになる。</p>
</div>
</div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); gap: 24px 32px; margin-top: 64px"><div class="reveal" style="border-top: 2px solid #000; padding-top: 16px"><p class="en" style="margin: 0; font-size: 11px; letter-spacing: 0.16em; color: ${V.accentDark}; font-weight: 700">DESIGN</p><h3 style="margin: 6px 0 6px; font-size: 22px; font-weight: 900">設計</h3><p style="margin: 0; font-size: 14px; line-height: 1.7; color: #333">一級建築士事務所として、温室・住宅・施設を設計する。</p></div><div class="reveal" style="border-top: 2px solid #000; padding-top: 16px"><p class="en" style="margin: 0; font-size: 11px; letter-spacing: 0.16em; color: ${V.accentDark}; font-weight: 700">BUILD</p><h3 style="margin: 6px 0 6px; font-size: 22px; font-weight: 900">施工</h3><p style="margin: 0; font-size: 14px; line-height: 1.7; color: #333">規格外の材を自社で加工し、組み上げる。</p></div><div class="reveal" style="border-top: 2px solid #000; padding-top: 16px"><p class="en" style="margin: 0; font-size: 11px; letter-spacing: 0.16em; color: ${V.accentDark}; font-weight: 700">OPERATE</p><h3 style="margin: 6px 0 6px; font-size: 22px; font-weight: 900">指定管理</h3><p style="margin: 0; font-size: 14px; line-height: 1.7; color: #333">建てた施設を運営・管理し、データを残す。</p></div><div class="reveal" style="border-top: 2px solid #000; padding-top: 16px"><p class="en" style="margin: 0; font-size: 11px; letter-spacing: 0.16em; color: ${V.accentDark}; font-weight: 700">R&D</p><h3 style="margin: 6px 0 6px; font-size: 22px; font-weight: 900">技術開発</h3><p style="margin: 0; font-size: 14px; line-height: 1.7; color: #333">自動設計・構造解析・Passportを自社で開発する。</p></div></div>
</div>
</section>

<section id="technology" style="padding: 140px 4vw; max-width: 1440px; margin: 0 auto; box-sizing: border-box">
<div class="reveal" style="display: flex; justify-content: space-between; align-items: end; flex-wrap: wrap; gap: 24px; margin-bottom: 64px">
<div><p class="en" style="margin: 0 0 16px; font-size: 13px; letter-spacing: 0.22em; color: #A9A69F">TECHNOLOGY</p>
<h2 style="margin: 0; font-size: clamp(36px, 4vw, 60px); line-height: 1.3; font-weight: 900">規格外を、<br />標準にするデジタル技術。</h2></div>
<p style="margin: 0; max-width: 460px; font-size: 16px; line-height: 1.9; color: #D8D6D1">自社で開発したツールで、設計・施工・運用をひとつのデータでつなぎます。</p>
</div>
<div class="tech-wrap" style="display: flex; flex-wrap: wrap; gap: 48px; align-items: stretch">
<div role="tablist" aria-label="技術" style="flex: 1 1 340px; display: flex; flex-direction: column">
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
<h2 style="margin: 0; font-size: clamp(36px, 4vw, 60px); line-height: 1.3; font-weight: 900">サーキュラー木造温室™を、<br />ここで設計してみる。</h2></div>
<p style="margin: 0; max-width: 480px; font-size: 16px; line-height: 1.9; color: #333">自動設計エンジンの体験版です。条件を変えると構造と数量がその場で変わります。「分解する」で部材を整列させ、何本の立木から製材されたかも確かめられます。</p>
</div>
<div class="cfg-wrap" style="display: flex; flex-wrap: wrap; gap: 32px; align-items: stretch">
<div class="cfg-ctrl" style="flex: 1 1 320px; display: flex; flex-direction: column; gap: 28px; background: #fff; padding: 32px; border: 1px solid #000">
<div>
<label for="cfg-bays" style="display: flex; justify-content: space-between; font-weight: 700; font-size: 15px"><span>奥行き</span><span class="en">${V.lengthM} m</span></label>
<input id="cfg-bays" type="range" min="2" max="25" step="1" value="${V.bays}" onInput="${V.onBays}" />
</div>
<div>
<p id="cfg-span" style="margin: 0 0 12px; font-weight: 700; font-size: 15px">間口</p>
<div role="group" aria-labelledby="cfg-span" style="display: flex; gap: 8px; flex-wrap: wrap">
${(V.spans || []).map((s) => html`<button type="button" class="en" onClick="${s.pick}" aria-pressed="${s.on}" style="font-family: inherit; font-size: 14px; font-weight: 700; padding: 12px 18px; min-height: 44px; border-radius: 999px; cursor: pointer; border: 1.5px solid #000; background: ${s.bg}; color: ${s.fg}">${s.label}</button>`)}
</div>
</div>
<div>
<p id="cfg-units" style="margin: 0 0 12px; font-weight: 700; font-size: 15px">連棟</p>
<div role="group" aria-labelledby="cfg-units" style="display: flex; gap: 8px; flex-wrap: wrap">
${(V.unitsList || []).map((u) => html`<button type="button" class="en" onClick="${u.pick}" aria-pressed="${u.on}" style="font-family: inherit; font-size: 14px; font-weight: 700; padding: 12px 18px; min-height: 44px; border-radius: 999px; cursor: pointer; border: 1.5px solid #000; background: ${u.bg}; color: ${u.fg}">${u.label}</button>`)}
</div>
</div>
<button type="button" onClick="${V.toggleExplode}" aria-pressed="${V.exploded}" style="font: inherit; font-weight: 700; font-size: 16px; padding: 18px; border-radius: 999px; border: 1.5px solid #000; background: ${V.explodeBg}; color: ${V.explodeFg}; cursor: pointer">${V.explodeLabel}</button>
</div>
<div class="cfg-right" style="flex: 999 1 560px; min-width: 0; display: flex; flex-direction: column; gap: 1px; background: #000; border: 1px solid #000">
<div class="cfg-view" style="background: #fff; position: relative; overflow: hidden; display: flex; align-items: stretch">
<svg viewBox="0 0 900 600" role="img" aria-label="設定に応じて変わる温室フレームの図。分解すると部材が種類ごとに整列する" style="flex: 1; min-width: 0; height: auto; align-self: center; display: block">
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
<div><p style="margin: 0; font-size: 12px; color: #696660">部材数</p><p class="en" style="margin: 4px 0 0; font-size: 26px; font-weight: 700">${V.count}</p></div>
<div><p style="margin: 0; font-size: 12px; color: #696660">床面積</p><p class="en" style="margin: 4px 0 0; font-size: 26px; font-weight: 700">${V.area}<span style="font-size: 13px"> m²</span></p></div>
<div><p style="margin: 0; font-size: 12px; color: #696660">製材品の量</p><p class="en" style="margin: 4px 0 0; font-size: 26px; font-weight: 700">${V.vol}<span style="font-size: 13px"> m³</span></p></div>
<div><p style="margin: 0; font-size: 12px; color: #696660">炭素貯蔵量</p><p class="en" style="margin: 4px 0 0; font-size: 26px; font-weight: 700; color: ${V.accentDark}">${V.co2}<span style="font-size: 13px"> t-CO₂</span></p></div>
</div>
<p class="en" style="position: absolute; left: 20px; top: 14px; margin: 0; font-size: 12px; letter-spacing: 0.14em; color: #696660"><span class="live" style="color: ${V.accent}">●</span> ${V.modeLabel}</p>
</div>
<div class="cfg-trees" style="background: #fff; padding: 24px 28px">
<p style="margin: 0 0 16px; font-weight: 700; font-size: 15px">この温室の製材品を、立木に換算すると</p>
<div style="display: grid; grid-template-columns: minmax(150px, 220px) 1fr; gap: 14px 20px; align-items: center">
<p style="margin: 0; font-size: 13px; color: #696660">従来の製材（歩留まり約40%）</p>
<div style="display: flex; flex-wrap: wrap; gap: 3px; align-items: end">
${(V.treesConv || []).map((t) => html`<svg class="tree" width="12" height="20" viewBox="0 0 12 20" aria-hidden="true" style="animation-delay: ${t.d}ms"><path d="M6 0 L12 13 H0 Z" fill="#B9B6AF"></path><rect x="5" y="13" width="2" height="7" fill="#B9B6AF"></rect></svg>`)}
<span class="en" style="margin-left: 8px; font-weight: 800; font-size: 20px">${V.nConv}</span><span style="font-size: 13px; margin-left: 4px">本</span>
</div>
<p style="margin: 0; font-size: 13px; color: #000; font-weight: 700">XENCE（利用率約95%）</p>
<div style="display: flex; flex-wrap: wrap; gap: 3px; align-items: end">
${(V.treesX || []).map((t) => html`<svg class="tree" width="12" height="20" viewBox="0 0 12 20" aria-hidden="true" style="animation-delay: ${t.d}ms"><path d="M6 0 L12 13 H0 Z" fill="${V.accentDark}"></path><rect x="5" y="13" width="2" height="7" fill="${V.accentDark}"></rect></svg>`)}
<span class="en" style="margin-left: 8px; font-weight: 800; font-size: 20px; color: ${V.accentDark}">${V.nX}</span><span style="font-size: 13px; margin-left: 4px">本</span>
</div>
</div>
<p style="margin: 18px 0 0; font-size: 14px">炭素貯蔵量はスギ立木 約 <b class="en">${V.co2Trees}</b> 本分</p>
<p style="margin: 10px 0 0; font-size: 12px; line-height: 1.7; color: #696660">※ 体験用の簡易モデルで、断面は仮定値です。スギの容積密度0.314 t/m³・炭素含有率0.5、立木1本の幹材積0.56 m³、スギ1本のCO₂蓄積0.505 tで換算しています。</p>
</div>
</div>
</div>
</div>
</section>

<section id="modules" style="padding: 140px 4vw; max-width: 1440px; margin: 0 auto; box-sizing: border-box">
<div class="reveal" style="display: flex; justify-content: space-between; align-items: end; flex-wrap: wrap; gap: 32px; margin-bottom: 56px">
<div><p class="en" style="margin: 0 0 16px; font-size: 13px; letter-spacing: 0.22em; color: #A9A69F">MODULAR SYSTEM</p>
<h2 style="margin: 0; font-size: clamp(36px, 4vw, 60px); line-height: 1.3; font-weight: 900">ジョイントから建築まで、<br />ひとつのモジュールで拡張する。</h2></div>
<p style="margin: 0; max-width: 520px; font-size: 16px; line-height: 1.9; color: #D8D6D1">XENCEの設計単位は、建物ではなくジョイントです。不揃いな材をつなぐ同じ接合ルールを、家具・プロダクト、温室、建築へとデジタルに組み上げていきます。大きさが変わっても、設計・加工・記録のデータは一本でつながっています。</p>
</div>
<div class="reveal" style="margin-bottom: 64px"><video ref="${V.muteRef}" src="/assets/out_scale_v8.mp4" poster="/assets/scale_poster_v8.jpg" autoPlay="${true}" muted="${true}" loop="${true}" playsInline="${true}" aria-label="代官山T-SITEの提灯スタンドのジョイントが組み上がり、スタンド、東浦町の温室、木造3階建ての建築へと拡張していくモーショングラフィック" style="width: 100%; aspect-ratio: 16 / 10; display: block; background: #000"></video></div>
<div class="mods-grid" style="display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); gap: 28px"><article class="reveal"><div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px"><span style="width: 10px; height: 10px; border-radius: 50%; background: ${V.accent}"></span><span style="flex: 1; height: 1px; background: #444"></span></div><div class="zoom" style="aspect-ratio: 4 / 3"><img src="/assets/joint_hi.jpg" alt="耳付きの板材4枚を放射状につなぐ金属3Dプリントのジョイント" style="width: 100%; height: 100%; object-fit: cover; display: block" /></div><p class="en" style="margin: 18px 0 6px; font-size: 12px; color: ${V.accent}; letter-spacing: 0.14em; font-weight: 700">01 — JOINT · 0.1 m</p><h3 style="margin: 0 0 10px; font-size: 22px; font-weight: 900">ジョイント</h3><p style="margin: 0; font-size: 14px; line-height: 1.8; color: #D8D6D1">製材所の耳材を、金属3Dプリントのジョイントでつなぐ。トポロジー最適化で材ごとに形を変え、ボルトを外せば分解して再利用できる。すべての基本単位。</p></article><article class="reveal"><div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px"><span style="width: 10px; height: 10px; border-radius: 50%; background: ${V.accent}"></span><span style="flex: 1; height: 1px; background: #444"></span></div><div class="zoom" style="aspect-ratio: 4 / 3"><img src="/assets/tsite.jpg" alt="代官山T-SITEの提灯スタンド" style="width: 100%; height: 100%; object-fit: cover; display: block" /></div><p class="en" style="margin: 18px 0 6px; font-size: 12px; color: ${V.accent}; letter-spacing: 0.14em; font-weight: 700">02 — PRODUCT · 1 m</p><h3 style="margin: 0 0 10px; font-size: 22px; font-weight: 900">家具・プロダクト</h3><p style="margin: 0; font-size: 14px; line-height: 1.8; color: #D8D6D1">同じ耳材が、別のモジュールで什器に変わる。祭りの提灯スタンドが、そのままベンチに組み替わる。</p></article><article class="reveal"><div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px"><span style="width: 10px; height: 10px; border-radius: 50%; background: ${V.accent}"></span><span style="flex: 1; height: 1px; background: #444"></span></div><div class="zoom" style="aspect-ratio: 4 / 3"><img src="/assets/gh_interior.jpg" alt="サーキュラー木造温室の内部と木製トラス" style="width: 100%; height: 100%; object-fit: cover; display: block" /></div><p class="en" style="margin: 18px 0 6px; font-size: 12px; color: ${V.accent}; letter-spacing: 0.14em; font-weight: 700">03 — GREENHOUSE · 10 m</p><h3 style="margin: 0 0 10px; font-size: 22px; font-weight: 900">温室</h3><p style="margin: 0; font-size: 14px; line-height: 1.8; color: #D8D6D1">モジュールを連ねて温室に。80㎡から数haまで、設計ルールを変えずに広げる。</p></article><article class="reveal"><div style="display: flex; align-items: center; gap: 10px; margin-bottom: 18px"><span style="width: 10px; height: 10px; border-radius: 50%; background: ${V.accent}"></span><span style="flex: 1; height: 1px; background: #444"></span></div><div class="zoom" style="aspect-ratio: 4 / 3"><img src="/assets/arch_fix.jpg" alt="XENCEが設計する木造住宅の外観パース" style="width: 100%; height: 100%; object-fit: cover; display: block" /></div><p class="en" style="margin: 18px 0 6px; font-size: 12px; color: ${V.accent}; letter-spacing: 0.14em; font-weight: 700">04 — ARCHITECTURE · 12 m</p><h3 style="margin: 0 0 10px; font-size: 22px; font-weight: 900">建築</h3><p style="margin: 0; font-size: 14px; line-height: 1.8; color: #D8D6D1">住宅も同じジョイントのルールとデータで設計する。柱・梁の接合まで一本のデータでつながり、分解すれば次の建築の材料になる。</p></article></div>
</section>

<section id="projects" style="border-top: 1px solid #222; padding: 140px 4vw; max-width: 1440px; margin: 0 auto; box-sizing: border-box">
<div class="reveal" style="display: flex; justify-content: space-between; align-items: end; flex-wrap: wrap; gap: 24px; margin-bottom: 40px">
<div><p class="en" style="margin: 0 0 16px; font-size: 13px; letter-spacing: 0.22em; color: #A9A69F">PROJECT INDEX</p><h2 style="margin: 0; font-size: clamp(36px, 4vw, 60px); font-weight: 900">プロジェクト</h2></div>
<div role="group" aria-label="種類で絞り込み" style="display: flex; gap: 8px; flex-wrap: wrap">
${(V.filters || []).map((f) => html`<button type="button" onClick="${f.pick}" aria-pressed="${f.on}" style="font-family: inherit; font-size: 14px; font-weight: 700; padding: 12px 18px; min-height: 44px; border-radius: 999px; cursor: pointer; border: 1.5px solid #555; background: ${f.bg}; color: ${f.fg}">${f.label} <span class="en" style="opacity: .6">${f.n}</span></button>`)}
</div>
</div>
<div style="display: flex; flex-wrap: wrap; gap: 48px; align-items: start">
<div style="flex: 999 1 600px; min-width: 0; overflow-x: auto">
<div class="en" style="display: grid; grid-template-columns: 48px 2.6fr 1.1fr 1.2fr 1fr; gap: 16px; font-size: 12px; color: #A9A69F; padding: 12px 0; border-bottom: 1px solid #fff; min-width: 680px"><span>No.</span><span>Project</span><span>Type</span><span>Input</span><span>年</span></div>
${(V.rows || []).map((r) => html`
<button type="button" class="row" onClick="${r.pick}" aria-pressed="${r.on}" style="display: grid; grid-template-columns: 48px 2.6fr 1.1fr 1.2fr 1fr; gap: 16px; width: 100%; min-width: 680px; text-align: left; font: inherit; font-size: 14px; color: #fff; align-items: center; border: 0; border-bottom: 1px solid #333; cursor: pointer; padding: 20px ${r.pad}; background: ${r.bg}">
<span class="en" style="color: ${r.numColor}">${r.no}</span><span style="font-size: 17px; font-weight: 700">${r.title}</span><span>${r.type}</span><span style="color: #D8D6D1">${r.input}</span><span class="en" style="color: #D8D6D1; text-align: right">${r.year}</span>
</button>
`)}
</div>
<aside aria-label="選択中のプロジェクト" style="flex: 1 1 360px; position: sticky; top: 24px">
${(V.rows || []).map((r) => html`
${r.on ? html`
<div style="animation: fade .5s both">
${r.hasImg ? html`<div class="zoom" style="height: 320px"><img src="${r.img}" alt="${r.title}" style="width: 100%; height: 100%; object-fit: cover; display: block; animation: zoomout 1.4s cubic-bezier(.2,.8,.1,1) both" /></div>` : null}
${r.noImg ? html`<div style="height: 320px; background: #696660; display: flex; align-items: flex-end; padding: 16px; box-sizing: border-box; font-size: 13px">[写真 準備中]</div>` : null}
<p class="en" style="margin: 20px 0 6px; font-size: 12px; color: ${V.accent}; letter-spacing: 0.14em">${r.no}</p>
<h3 style="margin: 0 0 12px; font-size: 23px">${r.title}</h3>
<p style="margin: 0 0 20px; font-size: 14px; line-height: 1.85; color: #D8D6D1">${r.desc}</p>
<div style="display: grid; grid-template-columns: 96px 1fr; row-gap: 10px; font-size: 13px; border-top: 1px solid #333; padding-top: 16px"><span style="color: #A9A69F">種類</span><span>${r.type}</span><span style="color: #A9A69F">素材</span><span>${r.input}</span><span style="color: #A9A69F">技術</span><span>${r.tech}</span><span style="color: #A9A69F">場所</span><span>${r.place}</span><span style="color: #A9A69F">年</span><span>${r.year}</span></div>
</div>
` : null}
`)}
</aside>
</div>
</section>

<section id="impact" style="background: ${V.accent}; color: #000; padding: 140px 4vw">
<div style="max-width: 1440px; margin: 0 auto">
<div class="reveal" style="display: flex; justify-content: space-between; align-items: end; flex-wrap: wrap; gap: 24px; margin-bottom: 64px">
<div><p class="en" style="margin: 0 0 16px; font-size: 13px; letter-spacing: 0.22em; font-weight: 700">IMPACT</p><h2 style="margin: 0; font-size: clamp(36px, 4vw, 60px); font-weight: 900">数字で見るXENCE</h2></div>
<p style="margin: 0; max-width: 440px; font-size: 15px; line-height: 1.8">実績値と目標値を分けて表示しています。すべての数字に計算式と出典を付けています。</p>
</div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 48px 40px"><div class="reveal" style="border-top: 2px solid #000; padding-top: 20px"><p class="en" style="margin: 0 0 10px; font-size: 11px; letter-spacing: 0.16em; font-weight: 700">実績値</p><p class="en" style="margin: 0; font-size: clamp(44px, 4.4vw, 68px); font-weight: 800; letter-spacing: -0.02em">40→95%</p><p style="margin: 10px 0 0; font-size: 14px; line-height: 1.75">原木1m³あたりの木材利用率。一般的な製材と、XENCEの設計・加工プロセスの比較。</p></div><div class="reveal" style="border-top: 2px solid #000; padding-top: 20px"><p class="en" style="margin: 0 0 10px; font-size: 11px; letter-spacing: 0.16em; font-weight: 700">算定値</p><p class="en" style="margin: 0; font-size: clamp(44px, 4.4vw, 68px); font-weight: 800; letter-spacing: -0.02em">840 t</p><p style="margin: 10px 0 0; font-size: 14px; line-height: 1.75">木造温室1haあたりの炭素固定量（CO₂換算、躯体・建設時）。</p></div><div class="reveal" style="border-top: 2px solid #000; padding-top: 20px"><p class="en" style="margin: 0 0 10px; font-size: 11px; letter-spacing: 0.16em; font-weight: 700">算定値</p><p class="en" style="margin: 0; font-size: clamp(44px, 4.4vw, 68px); font-weight: 800; letter-spacing: -0.02em">99.8 t</p><p style="margin: 10px 0 0; font-size: 14px; line-height: 1.75">XENCEがLCA算定した建物（木材126.9 m³）の炭素貯蔵量。スギ立木 約198本分。</p></div><div class="reveal" style="border-top: 2px solid #000; padding-top: 20px"><p class="en" style="margin: 0 0 10px; font-size: 11px; letter-spacing: 0.16em; font-weight: 700">算定値</p><p class="en" style="margin: 0; font-size: clamp(44px, 4.4vw, 68px); font-weight: 800; letter-spacing: -0.02em">−19%</p><p style="margin: 10px 0 0; font-size: 14px; line-height: 1.75">同じ建物のホールライフカーボン104.6 kg-CO₂e/㎡。事務所の平均値129 kgとの比較。</p></div><div class="reveal" style="border-top: 2px solid #000; padding-top: 20px"><p class="en" style="margin: 0 0 10px; font-size: 11px; letter-spacing: 0.16em; font-weight: 700">実績値</p><p class="en" style="margin: 0; font-size: clamp(44px, 4.4vw, 68px); font-weight: 800; letter-spacing: -0.02em">610 kg</p><p style="margin: 10px 0 0; font-size: 14px; line-height: 1.75">端材・木粉から製造し、納入した木粉樹脂ペレット。</p></div><div class="reveal" style="border-top: 2px solid #000; padding-top: 20px"><p class="en" style="margin: 0 0 10px; font-size: 11px; letter-spacing: 0.16em; font-weight: 700">目標値</p><p class="en" style="margin: 0; font-size: clamp(44px, 4.4vw, 68px); font-weight: 800; letter-spacing: -0.02em">11.5万 t</p><p style="margin: 10px 0 0; font-size: 14px; line-height: 1.75">製材所200社・年20万m³を建築に流したときの年間炭素貯蔵量（CO₂換算）。</p></div></div>

</div>
</section>

<section id="growth" style="padding: 140px 4vw; max-width: 1440px; margin: 0 auto; box-sizing: border-box">
<div class="reveal" style="margin-bottom: 64px"><p class="en" style="margin: 0 0 16px; font-size: 13px; letter-spacing: 0.22em; color: #A9A69F">WHY IT LASTS</p><h2 style="margin: 0; font-size: clamp(36px, 4.4vw, 68px); line-height: 1.25; font-weight: 900">XENCEが、社会に<br />価値を出し続けられる理由。</h2><p style="margin: 24px 0 0; max-width: 760px; font-size: 16px; line-height: 1.85; color: #D8D6D1">「建てて終わり」を終わらせるには、その仕組み自体が続かなければなりません。XENCEがそれを続けられる理由は、次の6つです。</p></div>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(280px, 1fr)); gap: 48px"><div class="reveal" style="border-top: 1px solid #444; padding-top: 24px"><p style="margin: 0; font-size: 13px; color: ${V.accent}; font-weight: 700; letter-spacing: 0.06em"><span class="en">01</span><span style="margin-left: 12px">ライフサイクル運営</span></p><h3 style="margin: 12px 0 10px; font-size: 22px; font-weight: 900">設計データが、そのまま運用と開示の基盤になるから</h3><p style="margin: 0; font-size: 15px; line-height: 1.85; color: #D8D6D1">XENCEは設計の段階から、部材ごとのLCCO₂と建物を構成する3Dデータを一つのモデルにまとめる。このモデルがファシリティマネジメントと非財務情報開示の基盤になり、竣工後の運用・保全・CO₂報告まで同じデータで支援できる。素材のデータ、接合部の製造データ（シモダフランジ）、施設の運用データ（MEMU）、LCAが一つにつながることで、XENCEは建てて終わる会社ではなく、建築のデータを回し続けるプラットフォームになる。</p></div><div class="reveal" style="border-top: 1px solid #444; padding-top: 24px"><p style="margin: 0; font-size: 13px; color: ${V.accent}; font-weight: 700; letter-spacing: 0.06em"><span class="en">02</span><span style="margin-left: 12px">パラメトリックデザイン</span></p><h3 style="margin: 12px 0 10px; font-size: 22px; font-weight: 900">一度つくった設計ルールが、何度でも価値を生むから</h3><p style="margin: 0; font-size: 15px; line-height: 1.85; color: #D8D6D1">サーキュラー木造温室™は、接合部と部材の割付をパラメトリックなルールとして持つモジュール商品である。敷地や規模の条件を入れれば、構造・数量・見積・加工データまでが自動で出るため、案件ごとに設計を一からつくり直す必要がない。件数が増えるほど1件あたりの設計・積算の工数は下がり、利益率が上がりやすい。設計ルールそのものが資産として積み上がり、より速く、より多くの場所に届けられる。</p></div><div class="reveal" style="border-top: 1px solid #444; padding-top: 24px"><p style="margin: 0; font-size: 13px; color: ${V.accent}; font-weight: 700; letter-spacing: 0.06em"><span class="en">03</span><span style="margin-left: 12px">デジタルファブリケーション</span></p><h3 style="margin: 12px 0 10px; font-size: 22px; font-weight: 900">あらゆる地域のものづくりを加速させられるから</h3><p style="margin: 0; font-size: 15px; line-height: 1.85; color: #D8D6D1">全国の製材所には、製材機やNCなどの加工機がすでにある。XENCEは不揃いな材を前提にした設計データを、各地の機械に合わせて出力する。既存の設備がそのまま付加価値の高い部材をつくる製造ツールに変わり、工場を新設せずに地域ごとのものづくりを立ち上げられる。</p></div><div class="reveal" style="border-top: 1px solid #444; padding-top: 24px"><p style="margin: 0; font-size: 13px; color: ${V.accent}; font-weight: 700; letter-spacing: 0.06em"><span class="en">04</span><span style="margin-left: 12px">施設園芸マーケット</span></p><h3 style="margin: 12px 0 10px; font-size: 22px; font-weight: 900">受け止める市場が大きいから</h3><p style="margin: 0; font-size: 15px; line-height: 1.85; color: #D8D6D1">国内の施設園芸は37,000 haある。その1%（370 ha）を木造温室に置き換えるだけで、㎡4万円で約1,480億円の需要になる。木造温室は、植物工場やアクアポニクスなど多様化する農業建築を受け止める。</p></div><div class="reveal" style="border-top: 1px solid #444; padding-top: 24px"><p style="margin: 0; font-size: 13px; color: ${V.accent}; font-weight: 700; letter-spacing: 0.06em"><span class="en">05</span><span style="margin-left: 12px">LCA・マテリアルパスポート</span></p><h3 style="margin: 12px 0 10px; font-size: 22px; font-weight: 900">社会制度が、数値証明された環境建築を求め始めたから</h3><p style="margin: 0; font-size: 15px; line-height: 1.85; color: #D8D6D1">改正建築物省エネ法（2026年7月公布）にもとづき、国は2028年度に建築物のLCA評価制度を始める方針で、5,000㎡以上の事務所には届出義務を予定している。EUでもデジタルプロダクトパスポートの導入が進む。XENCEはJ-CATによる算定とMaterial Passportをすでに実務で運用しているため、制度が求める数値を始まった時点から出せる。</p></div><div class="reveal" style="border-top: 1px solid #444; padding-top: 24px"><p style="margin: 0; font-size: 13px; color: ${V.accent}; font-weight: 700; letter-spacing: 0.06em"><span class="en">06</span><span style="margin-left: 12px">プラットフォーマー</span></p><h3 style="margin: 12px 0 10px; font-size: 22px; font-weight: 900">森も工場も持たず、協働により迅速に広げるから</h3><p style="margin: 0; font-size: 15px; line-height: 1.85; color: #D8D6D1">XENCEは森林も製材工場も所有しない。全国約3,500の製材所（プレカット・製材で約1.4兆円の市場）と地域の工務店を、在庫データと設計データでつなぐ。設備投資に縛られず、地域のパートナーとの協働で、同じ仕組みのまま迅速に広がる。</p></div></div>

<div class="reveal" style="margin-top: 64px"><p class="en" style="margin: 0 0 20px; font-size: 13px; letter-spacing: 0.22em; color: #A9A69F">評価</p><div style="display: flex; flex-wrap: wrap; gap: 10px"><span style="padding: 12px 20px; border: 1px solid #444; border-radius: 999px; font-size: 14px">Red Dot Design Award 2026</span><span style="padding: 12px 20px; border: 1px solid #444; border-radius: 999px; font-size: 14px">グッドデザイン賞 2025</span><span style="padding: 12px 20px; border: 1px solid #444; border-radius: 999px; font-size: 14px">ウッドデザイン賞 2025</span><span style="padding: 12px 20px; border: 1px solid #444; border-radius: 999px; font-size: 14px">名古屋大学発ベンチャー</span><span style="padding: 12px 20px; border: 1px solid #444; border-radius: 999px; font-size: 14px">愛知県 革新事業創造事業費補助金 採択</span></div></div>
</section>



<section id="studio" style="padding: 140px 4vw; max-width: 1440px; margin: 0 auto; box-sizing: border-box; border-top: 1px solid #222">
<div class="reveal" style="display: flex; justify-content: space-between; align-items: end; flex-wrap: wrap; gap: 24px; margin-bottom: 64px"><div><p class="en" style="margin: 0 0 16px; font-size: 13px; letter-spacing: 0.22em; color: #A9A69F">STUDIO</p><h2 class="en" style="margin: 0 0 16px; font-size: clamp(40px, 5vw, 76px); font-weight: 900">People</h2><p style="margin: 0; font-size: 17px; line-height: 1.8; color: #D8D6D1">建築士、エンジニア、研究者、運営チーム。名古屋とデュッセルドルフから。</p></div><a href="#careers" class="en" style="background: #fff; color: #000; padding: 16px 28px; border-radius: 999px; font-weight: 700">Careers →</a></div>
<div style="display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 56px 24px"><div class="reveal"><div class="zoom" style="aspect-ratio: 1 / 1; overflow: hidden; background: #111"><img src="/assets/ko.jpg" alt="Kotaro Ozawa" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block" /></div><p class="en" style="margin: 20px 0 6px; font-size: 19px; font-weight: 800">Kotaro Ozawa</p><p class="en" style="margin: 0; font-size: 13px; line-height: 1.6; color: #A9A69F">Founder & CEO</p></div><div class="reveal"><div class="zoom" style="aspect-ratio: 1 / 1; overflow: hidden; background: #111"><img src="/assets/ao.jpg" alt="Asako Osedo" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block" /></div><p class="en" style="margin: 20px 0 6px; font-size: 19px; font-weight: 800">Asako Osedo</p><p class="en" style="margin: 0; font-size: 13px; line-height: 1.6; color: #A9A69F">Co-Director, Service Design Officer</p></div><div class="reveal"><div class="zoom" style="aspect-ratio: 1 / 1; overflow: hidden; background: #111"><img src="/assets/ks.jpg" alt="Koji Saito" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block" /></div><p class="en" style="margin: 20px 0 6px; font-size: 19px; font-weight: 800">Koji Saito</p><p class="en" style="margin: 0; font-size: 13px; line-height: 1.6; color: #A9A69F">Lead Architect</p></div><div class="reveal"><div class="zoom" style="aspect-ratio: 1 / 1; overflow: hidden; background: #111"><img src="/assets/ay.jpg" alt="Akihiro Yamada" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block" /></div><p class="en" style="margin: 20px 0 6px; font-size: 19px; font-weight: 800">Akihiro Yamada</p><p class="en" style="margin: 0; font-size: 13px; line-height: 1.6; color: #A9A69F">Lead Construction Management</p></div><div class="reveal"><div class="zoom" style="aspect-ratio: 1 / 1; overflow: hidden; background: #111"><img src="/assets/kj.jpg" alt="Kotaro Jin" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block" /></div><p class="en" style="margin: 20px 0 6px; font-size: 19px; font-weight: 800">Kotaro Jin</p><p class="en" style="margin: 0; font-size: 13px; line-height: 1.6; color: #A9A69F">Architect</p></div><div class="reveal"><div class="zoom" style="aspect-ratio: 1 / 1; overflow: hidden; background: #111"><img src="/assets/kk.jpg" alt="Kosuke Kuroda" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block" /></div><p class="en" style="margin: 20px 0 6px; font-size: 19px; font-weight: 800">Kosuke Kuroda</p><p class="en" style="margin: 0; font-size: 13px; line-height: 1.6; color: #A9A69F">Designer</p></div><div class="reveal"><div class="zoom" style="aspect-ratio: 1 / 1; overflow: hidden; background: #111"><img src="/assets/yk.jpg" alt="Yushi Kimoto" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block" /></div><p class="en" style="margin: 20px 0 6px; font-size: 19px; font-weight: 800">Yushi Kimoto</p><p class="en" style="margin: 0; font-size: 13px; line-height: 1.6; color: #A9A69F">Designer</p></div><div class="reveal"><div class="zoom" style="aspect-ratio: 1 / 1; overflow: hidden; background: #111"><img src="/assets/ms.jpg" alt="Mako Sumi" loading="lazy" style="width: 100%; height: 100%; object-fit: cover; display: block" /></div><p class="en" style="margin: 20px 0 6px; font-size: 19px; font-weight: 800">Mako Sumi</p><p class="en" style="margin: 0; font-size: 13px; line-height: 1.6; color: #A9A69F">Community Manager</p></div></div>
</section>

<section id="contact" style="padding: 140px 4vw; max-width: 1440px; margin: 0 auto; box-sizing: border-box">
<h2 class="reveal" style="margin: 0 0 56px; font-size: clamp(40px, 5vw, 76px); font-weight: 900; line-height: 1.2">日本の建設投資81兆円を、<br />国産のモジュール建築に。<br />世界を、循環社会に変える。</h2>
<div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(260px, 1fr)); gap: 1px; background: #333; border: 1px solid #333"><a href="mailto:info@xencegroup.com?subject=%E3%80%90%E3%81%8A%E5%95%8F%E3%81%84%E5%90%88%E3%82%8F%E3%81%9B%E3%80%91%E5%BB%BA%E3%81%A6%E3%81%9F%E3%81%84%E3%83%BB%E7%BD%AE%E3%81%8D%E3%81%9F%E3%81%84" class="row" style="background: #000; padding: 36px; display: block"><span class="en" style="font-size: 12px; color: ${V.accent}">01</span><span style="display: block; margin-top: 12px; font-size: 22px; font-weight: 700">建てたい・置きたい</span><span style="display: block; margin-top: 10px; font-size: 14px; color: #D8D6D1">温室、宿、住宅、什器の設計施工 →</span></a><a href="mailto:info@xencegroup.com?subject=%E3%80%90%E3%81%8A%E5%95%8F%E3%81%84%E5%90%88%E3%82%8F%E3%81%9B%E3%80%91%E8%B3%87%E6%BA%90%E3%82%92%E6%B4%BB%E3%81%8B%E3%81%97%E3%81%9F%E3%81%84" class="row" style="background: #000; padding: 36px; display: block"><span class="en" style="font-size: 12px; color: ${V.accent}">02</span><span style="display: block; margin-top: 12px; font-size: 22px; font-weight: 700">資源を活かしたい</span><span style="display: block; margin-top: 10px; font-size: 14px; color: #D8D6D1">製材所・解体事業者・自治体の方 →</span></a><a href="mailto:info@xencegroup.com?subject=%E3%80%90%E3%81%8A%E5%95%8F%E3%81%84%E5%90%88%E3%82%8F%E3%81%9B%E3%80%91%E6%8A%80%E8%A1%93%E3%81%A7%E7%B5%84%E3%81%BF%E3%81%9F%E3%81%84" class="row" style="background: #000; padding: 36px; display: block"><span class="en" style="font-size: 12px; color: ${V.accent}">03</span><span style="display: block; margin-top: 12px; font-size: 22px; font-weight: 700">技術で組みたい</span><span style="display: block; margin-top: 10px; font-size: 14px; color: #D8D6D1">企業・大学・海外パートナーの方 →</span></a><a href="mailto:info@xencegroup.com?subject=%E3%80%90%E3%81%8A%E5%95%8F%E3%81%84%E5%90%88%E3%82%8F%E3%81%9B%E3%80%91%E6%8A%95%E8%B3%87%E3%83%BB%E4%BA%8B%E6%A5%AD%E6%8F%90%E6%90%BA" class="row" style="background: #000; padding: 36px; display: block"><span class="en" style="font-size: 12px; color: ${V.accent}">04</span><span style="display: block; margin-top: 12px; font-size: 22px; font-weight: 700">投資・事業提携</span><span style="display: block; margin-top: 10px; font-size: 14px; color: #D8D6D1">投資家・事業会社の方 →</span></a></div>
</section>

<footer style="border-top: 1px solid #222; padding: 64px 4vw; display: flex; justify-content: space-between; flex-wrap: wrap; gap: 32px; font-size: 13px; color: #A9A69F; line-height: 1.9">
<div><p class="en" style="margin: 0 0 12px; color: #fff; font-weight: 800; font-size: 20px">XENCE</p>株式会社XENCE ／ XENCE一級建築士事務所<br />愛知県知事登録（い－4）第14198号</div>
<div>Nagoya — 愛知県名古屋市中区栄1-29-29 SIMON 10 SAKAE 401</div>
<div class="en">Instagram ／ note ／ LinkedIn<br />© XENCE Inc.</div>
</footer>
</div>`; };
render(h(App, {"accent": "#FF5528", "autoplayTech": true}), document.getElementById('app'));
