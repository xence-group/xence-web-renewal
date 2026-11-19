// XENCE circular greenhouse — parametric member list.
// Ported from the greenhouse LP model (gh.js): gable trusses every 2 m, 25° roof,
// eaves 2.5 m, purlins ~0.9 m, film fasteners (vinipet) @0.5 m.
// Axes: x across bays, y up, z along the ridge. No three.js dependency.

export const SECTIONS = {
  // [width, height] in metres, from the 128 m² study model
  wood:  { rafter: [0.045, 0.135], tie: [0.075, 0.090], king: [0.045, 0.045], side: [0.060, 0.090], mid: [0.075, 0.075], purlin: [0.045, 0.060], beam: [0.105, 0.105] },
  steel: { rafter: [0.045, 0.075], tie: [0.050, 0.050], king: [0.040, 0.040], side: [0.030, 0.060], mid: [0.040, 0.040], purlin: [0.030, 0.060], beam: [0.060, 0.060] },
};
export const ROLES = ['side', 'mid', 'rafter', 'tie', 'king', 'beam', 'purlin', 'fast'];
export const FRAME = 2.0, EAVE = 2.5, PITCH = 25;

// p = { bays (number of gable units), spans (number of 2 m frames), bayW (m), structure: 'wood'|'hybrid'|'steel' }
export function ghMembers(p) {
  const bayW = p.bayW, W = bayW * p.bays, D = FRAME * p.spans, H = EAVE;
  const rise = (bayW / 2) * Math.tan(PITCH * Math.PI / 180), R = H + rise;
  const out = [];
  const sec = (role) => {
    if (p.structure === 'hybrid' && ['side', 'mid', 'tie', 'beam'].includes(role)) return { s: SECTIONS.steel[role], m: 'steel' };
    const k = p.structure === 'steel' ? 'steel' : 'wood';
    return { s: SECTIONS[k][role], m: k };
  };
  const member = (role, a, b) => { const { s, m } = sec(role); out.push({ role, mat: m, a, b, w: s[0], h: s[1] }); };
  const x0 = -W / 2, z0 = -D / 2;
  for (let k = 0; k <= p.spans; k++) {
    const z = z0 + k * FRAME;
    for (let i = 0; i < p.bays; i++) {
      const xa = x0 + i * bayW, xb = xa + bayW, xm = xa + bayW / 2;
      member('rafter', [xa, H, z], [xm, R, z]);
      member('rafter', [xb, H, z], [xm, R, z]);
      member('tie', [xa, H - 0.05, z], [xb, H - 0.05, z]);
      member('king', [xm, H, z], [xm, R - 0.05, z]);
    }
    for (let i = 0; i <= p.bays; i++) {
      const x = x0 + i * bayW;
      member(i === 0 || i === p.bays ? 'side' : 'mid', [x, 0, z], [x, H, z]);
    }
  }
  for (let i = 0; i < p.bays; i++) {
    const xa = x0 + i * bayW, xb = xa + bayW, xm = xa + bayW / 2;
    member('purlin', [xm, R + 0.02, z0], [xm, R + 0.02, -z0]);
    const n = Math.max(1, Math.floor(Math.hypot(bayW / 2, rise) / 0.9));
    for (let j = 1; j <= n; j++) {
      const t = j / (n + 1);
      for (const xe of [xa, xb]) { const x = xe + (xm - xe) * t, y = H + rise * t + 0.09; member('purlin', [x, y, z0], [x, y, -z0]); }
    }
  }
  for (let i = 0; i <= p.bays; i++) { const x = x0 + i * bayW; member('beam', [x, H + 0.02, z0], [x, H + 0.02, -z0]); }
  // film fasteners (vinipet 32×13 @0.5 m)
  const off = 0.13, fw = 0.032, fh = 0.013;
  const fast = (a, b, w = fw, h = fh) => out.push({ role: 'fast', mat: 'vini', a, b, w, h });
  for (let i = 0; i < p.bays; i++) {
    const xa = x0 + i * bayW, xb = xa + bayW, xm = xa + bayW / 2;
    for (let z = z0; z <= -z0 + 1e-6; z += 0.5) { fast([xa, H + off, z], [xm, R + off, z]); fast([xb, H + off, z], [xm, R + off, z]); }
  }
  for (let z = z0; z <= -z0 + 1e-6; z += 0.5) { fast([x0 - 0.06, 0, z], [x0 - 0.06, H, z], fh, fw); fast([-x0 + 0.06, 0, z], [-x0 + 0.06, H, z], fh, fw); }
  for (let x = x0; x <= -x0 + 1e-6; x += 0.5) {
    const local = ((x - x0) % bayW + bayW) % bayW, t = 1 - Math.abs(local - bayW / 2) / (bayW / 2), top = H + rise * t;
    for (const ze of [z0 - 0.06, -z0 + 0.06]) fast([x, 0, ze], [x, top, ze]);
  }
  out.forEach((m) => { m.len = Math.hypot(m.b[0] - m.a[0], m.b[1] - m.a[1], m.b[2] - m.a[2]); });
  return { members: out, dims: { W, D, H, R, bayW, rise, area: W * D } };
}

// quantities for the stats panel
export function ghStats(model) {
  let woodVol = 0, steelKg = 0, count = 0;
  const byRole = {};
  for (const m of model.members) {
    byRole[m.role] = (byRole[m.role] || 0) + 1;
    if (m.role === 'fast') continue;
    count++;
    if (m.mat === 'wood') woodVol += m.len * m.w * m.h;
    else steelKg += m.len * 4.0; // light-gauge section, ~4 kg/m (indicative)
  }
  const co2 = woodVol * 0.314 * 0.5 * 44 / 12;
  return { count, woodVol, steelKg, co2, byRole, area: model.dims.area };
}
