// XENCE circular greenhouse — 3D configurator view (three.js, no build step).
// Geometry comes from lib/ghmodel.js (same parametric model as the greenhouse LP).
import * as THREE from '/vendor/three.module.min.js';
import { OrbitControls } from '/vendor/OrbitControls.js';
import { ghMembers, ROLES } from '/lib/ghmodel.js';

const COL = { wood: 0xD2B48C, steel: 0xB7BCC0, vini: 0xC5CACE };

export function mountGreenhouse(el, opt = {}) {
  const labelsText = opt.labels || {};
  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  renderer.toneMapping = THREE.ACESFilmicToneMapping; renderer.toneMappingExposure = 1.05;
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.domElement.style.cssText = 'display:block;width:100%;height:100%;touch-action:pan-y;cursor:grab';
  el.appendChild(renderer.domElement);
  const overlay = document.createElement('div');
  overlay.style.cssText = 'position:absolute;inset:0;pointer-events:none;font-family:inherit';
  el.appendChild(overlay);

  const scene = new THREE.Scene();
  const BG = new THREE.Color('#F4F3F1');
  scene.background = BG; scene.fog = new THREE.Fog(BG, 70, 160);
  const cam = new THREE.PerspectiveCamera(32, 1.5, 0.1, 400);
  const controls = new OrbitControls(cam, renderer.domElement);
  controls.enableDamping = true; controls.dampingFactor = 0.08; controls.maxPolarAngle = Math.PI * 0.49;
  controls.enableZoom = true; controls.zoomToCursor = false; controls.minDistance = 6; controls.maxDistance = 140;
  controls.autoRotate = false;
  controls.addEventListener('start', () => { renderer.domElement.style.cursor = 'grabbing'; kick(); });
  controls.addEventListener('end', () => { renderer.domElement.style.cursor = 'grab'; });
  controls.addEventListener('change', () => kick());

  // lights
  scene.add(new THREE.HemisphereLight(0xffffff, 0xcfc9bd, 1.1));
  const sun = new THREE.DirectionalLight(0xfff4e6, 2.6);
  sun.castShadow = true; sun.shadow.mapSize.set(1536, 1536); sun.shadow.bias = -0.0003; sun.shadow.normalBias = 0.02; sun.shadow.radius = 3;
  scene.add(sun, sun.target);
  const fill = new THREE.DirectionalLight(0xdfe6f0, 0.5); fill.position.set(30, 18, 40); scene.add(fill);

  // ground: soft shadow catcher on paper
  const ground = new THREE.Mesh(new THREE.PlaneGeometry(600, 600), new THREE.ShadowMaterial({ color: 0x3a3630, opacity: 0.22 }));
  ground.rotation.x = -Math.PI / 2; ground.receiveShadow = true; scene.add(ground);
  const pad = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), new THREE.MeshStandardMaterial({ color: 0xEFEDE9, roughness: 1 }));
  pad.rotation.x = -Math.PI / 2; pad.position.y = 0.002; pad.receiveShadow = true; pad.visible = false; scene.add(pad);

  const mats = {
    wood: new THREE.MeshStandardMaterial({ color: COL.wood, roughness: 0.74 }),
    steel: new THREE.MeshStandardMaterial({ color: COL.steel, roughness: 0.38, metalness: 0.55 }),
    vini: new THREE.MeshStandardMaterial({ color: COL.vini, roughness: 0.35, metalness: 0.6 }),
    film: new THREE.MeshPhysicalMaterial({ color: 0xffffff, transparent: true, opacity: 0.17, roughness: 0.25, side: THREE.DoubleSide, depthWrite: false }),
    curb: new THREE.MeshStandardMaterial({ color: 0xC9C6BF, roughness: 0.92 }),
    soil: new THREE.MeshStandardMaterial({ color: 0x5b5146, roughness: 1 }),
    bed: new THREE.MeshStandardMaterial({ color: 0xD2B48C, roughness: 0.8 }),
    leaf: new THREE.MeshStandardMaterial({ color: 0x6f8061, roughness: 0.85, flatShading: true }),
    person: new THREE.MeshStandardMaterial({ color: 0x8f8b84, roughness: 0.9 }),
  };
  const box = new THREE.BoxGeometry(1, 1, 1);

  let groups = [], extras = new THREE.Group(), film = null, model = null, labels = [];
  scene.add(extras);
  let exploded = false, explodeT = 0, explodeFrom = 0, explodeStart = 0;
  let fitFrom = null, fitTo = null, fitStart = 0;

  const _m = new THREE.Matrix4(), _q = new THREE.Quaternion(), _s = new THREE.Vector3(), _p = new THREE.Vector3(), _b = new THREE.Matrix4();
  function memberTRS(a, b, len, w, h) {
    const A = new THREE.Vector3(...a), B = new THREE.Vector3(...b);
    const dir = B.clone().sub(A).normalize();
    let zA = new THREE.Vector3().crossVectors(dir, new THREE.Vector3(0, 1, 0));
    if (zA.lengthSq() < 1e-6 || Math.abs(dir.y) > 0.999) zA.set(0, 0, 1); else zA.normalize();
    const yA = new THREE.Vector3().crossVectors(zA, dir).normalize();
    _b.makeBasis(dir, yA, zA);
    return { p: A.add(B).multiplyScalar(0.5), q: new THREE.Quaternion().setFromRotationMatrix(_b), s: new THREE.Vector3(len, h, w) };
  }

  function clear() {
    groups.forEach((g) => { scene.remove(g.mesh); g.mesh.dispose(); });
    groups = [];
    if (film) { scene.remove(film); film.geometry.dispose(); film = null; }
    extras.traverse((o) => { if (o.geometry && o.geometry !== box) o.geometry.dispose(); });
    extras.clear();
    labels.forEach((l) => l.el.remove()); labels = [];
  }

  function build(p) {
    clear();
    model = ghMembers(p);
    const { W, D, H, R, bayW, rise } = model.dims;
    // exploded layout: members lie flat in rows, grouped by role
    const structural = model.members.filter((m) => m.role !== 'fast');
    const rowW = Math.max(W, 14);
    let z = -D / 2, layout = new Map();
    for (const role of ROLES) {
      if (role === 'fast') continue;
      const list = structural.filter((m) => m.role === role).sort((a, b) => b.len - a.len);
      if (!list.length) continue;
      let x = -rowW / 2, rowZ = z, maxH = 0;
      list.forEach((m) => {
        if (x + m.len > rowW / 2 + 1e-6) { x = -rowW / 2; rowZ += Math.max(0.28, maxH * 2.2); maxH = 0; }
        layout.set(m, { p: new THREE.Vector3(x + m.len / 2, m.h / 2 + 0.01, rowZ), q: new THREE.Quaternion(), s: new THREE.Vector3(m.len, m.h, m.w) });
        x += m.len + 0.12; maxH = Math.max(maxH, m.w);
      });
      labels.push({ role, n: list.length, pos: new THREE.Vector3(-rowW / 2, 0.05, z - 0.5) });
      z = rowZ + 1.6;
    }
    const layoutD = z + D / 2;
    // instanced meshes per material (fasteners separate so they can fade)
    const byKey = {};
    model.members.forEach((m, i) => { const key = m.role === 'fast' ? 'vini' : m.mat; (byKey[key] = byKey[key] || []).push(m); });
    for (const key of Object.keys(byKey)) {
      const L = byKey[key];
      const mesh = new THREE.InstancedMesh(box, mats[key], L.length);
      mesh.castShadow = true; mesh.receiveShadow = key !== 'vini';
      const items = L.map((m) => ({ a: memberTRS(m.a, m.b, m.len, m.w, m.h), b: layout.get(m) || null }));
      items.forEach((it, i) => { _m.compose(it.a.p, it.a.q, it.a.s); mesh.setMatrixAt(i, _m); });
      if (key === 'wood') { const c = new THREE.Color(); items.forEach((it, i) => { const r = ((i * 2654435761) >>> 0) / 4294967296; c.setHSL(0.085 + (r - 0.5) * 0.012, 0.5 + (r - 0.5) * 0.08, 0.55 + (r - 0.5) * 0.06); mesh.setColorAt(i, c); }); mats.wood.color.set(0xffffff); }
      mesh.frustumCulled = false;
      scene.add(mesh);
      groups.push({ key, mesh, items });
    }
    // film skin
    const pos = [], x0 = -W / 2, z0 = -D / 2, z1 = D / 2;
    const quad = (a, b, c, d) => pos.push(...a, ...b, ...c, ...a, ...c, ...d);
    for (let i = 0; i < p.bays; i++) {
      const xa = x0 + i * bayW, xb = xa + bayW, xm = xa + bayW / 2;
      quad([xa, H + 0.14, z0], [xm, R + 0.14, z0], [xm, R + 0.14, z1], [xa, H + 0.14, z1]);
      quad([xb, H + 0.14, z0], [xm, R + 0.14, z0], [xm, R + 0.14, z1], [xb, H + 0.14, z1]);
      for (const zz of [z0 - 0.07, z1 + 0.07]) { quad([xa, 0, zz], [xb, 0, zz], [xb, H, zz], [xa, H, zz]); pos.push(xa, H, zz, xb, H, zz, xm, R, zz); }
    }
    quad([x0 - 0.07, 0, z0], [x0 - 0.07, H, z0], [x0 - 0.07, H, z1], [x0 - 0.07, 0, z1]);
    quad([-x0 + 0.07, 0, z0], [-x0 + 0.07, H, z0], [-x0 + 0.07, H, z1], [-x0 + 0.07, 0, z1]);
    const fg = new THREE.BufferGeometry(); fg.setAttribute('position', new THREE.Float32BufferAttribute(pos, 3)); fg.computeVertexNormals();
    film = new THREE.Mesh(fg, mats.film); film.renderOrder = 2; scene.add(film);
    // RC curb, planting beds, plants, a person for scale
    const curbGeo = new THREE.BoxGeometry(1, 1, 1);
    const curb = (cx, cz, sx, sz) => { const m = new THREE.Mesh(curbGeo, mats.curb); m.position.set(cx, 0.1, cz); m.scale.set(sx, 0.2, sz); m.castShadow = m.receiveShadow = true; extras.add(m); };
    curb(0, z0 - 0.07, W + 0.4, 0.2); curb(0, z1 + 0.07, W + 0.4, 0.2); curb(x0 - 0.07, 0, 0.2, D); curb(-x0 + 0.07, 0, 0.2, D);
    const bedLen = Math.max(1, D - 3), plantGeo = new THREE.IcosahedronGeometry(0.26, 0);
    const plantPts = [];
    for (let i = 0; i < p.bays; i++) {
      const xa = x0 + i * bayW;
      const nBeds = Math.max(1, Math.floor((bayW - 1.4) / 1.6));
      for (let k = 0; k < nBeds; k++) {
        const bx = xa + bayW / 2 + (k - (nBeds - 1) / 2) * 1.6;
        const bed = new THREE.Mesh(curbGeo, mats.bed); bed.position.set(bx, 0.2, 0); bed.scale.set(0.9, 0.4, bedLen); bed.castShadow = bed.receiveShadow = true; extras.add(bed);
        const soil = new THREE.Mesh(curbGeo, mats.soil); soil.position.set(bx, 0.405, 0); soil.scale.set(0.8, 0.01, bedLen - 0.1); extras.add(soil);
        for (let zz = -bedLen / 2 + 0.3; zz < bedLen / 2; zz += 0.45) for (const dx of [-0.2, 0.2]) plantPts.push([bx + dx, zz]);
      }
    }
    const plants = new THREE.InstancedMesh(plantGeo, mats.leaf, plantPts.length);
    plantPts.forEach(([x, zz], i) => { const s = 0.8 + ((i * 37) % 9) * 0.06; _m.compose(_p.set(x, 0.52 + s * 0.12, zz), _q.setFromEuler(new THREE.Euler(i, i * 1.7, 0)), _s.set(s, s * 1.15, s)); plants.setMatrixAt(i, _m); });
    plants.castShadow = true; plants.receiveShadow = true; extras.add(plants);
    const person = new THREE.Group();
    const body = new THREE.Mesh(new THREE.CapsuleGeometry(0.2, 1.0, 4, 10), mats.person); body.position.y = 0.72;
    const head = new THREE.Mesh(new THREE.SphereGeometry(0.12, 12, 10), mats.person); head.position.y = 1.56;
    body.castShadow = head.castShadow = true; person.add(body, head); person.position.set(x0 + bayW * 0.5 + 0.9, 0, z1 + 2.2); extras.add(person);
    // pad
    pad.scale.set(Math.max(W, 14) + 6, Math.max(D, layoutD) + 6, 1); pad.position.z = (Math.max(D, layoutD) - D) / 2;
    // labels
    labels.forEach((l) => {
      const d = document.createElement('div');
      d.style.cssText = 'position:absolute;left:0;top:0;white-space:nowrap;font-size:12px;font-weight:700;color:#000;opacity:0;transition:opacity .4s;transform:translate(-100%,-50%);padding-right:10px';
      d.innerHTML = `${labelsText[l.role] || l.role} <span style="font-family:Montserrat,sans-serif;font-weight:500;color:#696660">× ${l.n}</span>`;
      overlay.appendChild(d); l.el = d;
    });
    // sun & shadow box
    const S = Math.max(W, D, layoutD) * 0.75 + 6;
    sun.position.set(-S * 0.9, S * 1.5, S * 1.1); sun.target.position.set(0, 0, 0);
    Object.assign(sun.shadow.camera, { left: -S, right: S, top: S, bottom: -S, near: 0.5, far: S * 6 }); sun.shadow.camera.updateProjectionMatrix();
    model.layoutD = layoutD;
    applyExplode(exploded ? 1 : 0);
  }

  function frameFor(isExploded) {
    const { W, D } = model.dims;
    const ext = isExploded ? Math.max(W, 14, model.layoutD) : Math.max(W, D);
    const dist = isExploded ? ext * 1.05 + 4 : ext * 1.3 + 8;
    const target = new THREE.Vector3(0, isExploded ? 0 : model.dims.R * 0.35, isExploded ? (model.layoutD - D) / 2 : 0);
    const dir = isExploded ? new THREE.Vector3(0.35, 0.95, 0.75).normalize() : new THREE.Vector3(1, 0.5, 1.15).normalize();
    return { pos: target.clone().addScaledVector(dir, dist), target };
  }
  function startFit(isExploded, instant) {
    const f = frameFor(isExploded);
    if (instant) { cam.position.copy(f.pos); controls.target.copy(f.target); controls.update(); return; }
    fitFrom = { pos: cam.position.clone(), target: controls.target.clone() }; fitTo = f; fitStart = performance.now();
  }

  const ease = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
  function applyExplode(t) {
    for (const g of groups) {
      const n = g.items.length;
      g.items.forEach((it, i) => {
        if (!it.b) return;
        const delay = (i / Math.max(1, n)) * 0.35;
        const s = ease(Math.min(1, Math.max(0, (t - delay) / 0.65)));
        _p.copy(it.a.p).lerp(it.b.p, s); _p.y += Math.sin(Math.PI * s) * 1.2;
        _q.copy(it.a.q).slerp(it.b.q, s);
        _m.compose(_p, _q, it.a.s); g.mesh.setMatrixAt(i, _m);
      });
      g.mesh.instanceMatrix.needsUpdate = true;
      if (g.key === 'vini') g.mesh.visible = t < 0.15;
    }
    if (film) { film.material.opacity = 0.17 * Math.max(0, 1 - t * 4); film.visible = t < 0.25; }
    extras.visible = t < 0.2;
    labels.forEach((l) => { if (l.el) l.el.style.opacity = t > 0.85 ? 1 : 0; });
  }

  function size() {
    const w = el.clientWidth || 600, h = el.clientHeight || 400;
    renderer.setSize(w, h, false); cam.aspect = w / h; cam.updateProjectionMatrix(); kick();
  }
  const ro = new ResizeObserver(size); ro.observe(el);

  let visible = true, raf = 0, idleUntil = 0;
  const io = new IntersectionObserver((e) => { visible = e[0].isIntersecting; if (visible) kick(); }, { threshold: 0.01 });
  io.observe(el);
  function kick() { idleUntil = performance.now() + 1500; if (!raf) raf = requestAnimationFrame(loop); }
  function loop(now) {
    raf = 0;
    if (!visible) return;
    let busy = false;
    if (explodeT !== (exploded ? 1 : 0)) {
      const k = Math.min(1, (now - explodeStart) / 1600);
      explodeT = exploded ? explodeFrom + (1 - explodeFrom) * k : explodeFrom * (1 - k);
      if (k >= 1) explodeT = exploded ? 1 : 0;
      applyExplode(explodeT); busy = true;
    }
    if (fitTo) {
      const k = ease(Math.min(1, (now - fitStart) / 1100));
      cam.position.lerpVectors(fitFrom.pos, fitTo.pos, k); controls.target.lerpVectors(fitFrom.target, fitTo.target, k);
      if (k >= 1) fitTo = null; busy = true;
    }
    controls.update();
    renderer.render(scene, cam);
    if (exploded) {
      const r = renderer.domElement.getBoundingClientRect();
      labels.forEach((l) => { const v = l.pos.clone().project(cam); l.el.style.left = ((v.x + 1) / 2 * r.width) + 'px'; l.el.style.top = ((1 - v.y) / 2 * r.height) + 'px'; });
    }
    if (busy || now < idleUntil) raf = requestAnimationFrame(loop);
  }

  let lastKey = '', pending = null, pendRaf = 0;
  function flush() {
    pendRaf = 0; if (!pending) return;
    const { p, isExploded } = pending; pending = null;
    const key = [p.bays, p.spans, p.bayW, p.structure].join('/');
    const first = !model;
    if (key !== lastKey) { build(p); lastKey = key; startFit(isExploded, first); }
    if (isExploded !== exploded) { exploded = isExploded; explodeFrom = explodeT; explodeStart = performance.now(); startFit(isExploded, false); }
    if (first) size();
    kick();
  }
  return {
    update(p, isExploded) {
      const key = [p.bays, p.spans, p.bayW, p.structure].join('/');
      if (key === lastKey && isExploded === exploded && !pending) return;
      pending = { p, isExploded };
      if (!model) flush(); else if (!pendRaf) pendRaf = requestAnimationFrame(flush);
    },
    dispose() { ro.disconnect(); io.disconnect(); cancelAnimationFrame(raf); clear(); renderer.dispose(); el.innerHTML = ''; },
  };
}
