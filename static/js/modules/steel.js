/* Purple3D · módulo Steelframing */
Purple3D.register({id:'steel',name:'Steelframing',hint:'Tocá una pieza para sacarla o ponerla de nuevo. Arrastrá para girar.',css:"\n:root{--bg:#f6f5f2;--card:#fff;--tx:#1d1d1b;--mut:#6b6a65;--bd:#dcdad3;--ac:#5b3fa6;--acx:#fff;\nbox-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}\n@media (prefers-color-scheme:dark){:root:not([data-theme=\"light\"]){--bg:#17161a;--card:#222126;--tx:#eeedf0;--mut:#9b99a3;--bd:#38363f;--ac:#a58bf0;--acx:#17161a}}\n:root[data-theme=\"dark\"]{--bg:#17161a;--card:#222126;--tx:#eeedf0;--mut:#9b99a3;--bd:#38363f;--ac:#a58bf0;--acx:#17161a}\nhtml{scroll-padding-top:env(safe-area-inset-top,0px)}\n*{box-sizing:border-box}\nhtml,body{height:100%;margin:0}\nbody{background:var(--bg);color:var(--tx);font-family:system-ui,-apple-system,\"Segoe UI\",Roboto,sans-serif}\n#pn{background:var(--card);padding:10px 14px}\n.row{display:flex;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:8px}\n.row label{font-size:.8rem;color:var(--mut);min-width:78px}\n.row input[type=range]{flex:1;accent-color:var(--ac)}\n.row span{font-size:.8rem;min-width:110px;text-align:right}\nbutton{font-size:.9rem;padding:8px 12px;border-radius:8px;border:1px solid var(--bd);background:var(--bg);color:var(--tx)}\nbutton.pri{background:var(--ac);color:var(--acx);border-color:var(--ac)}\n.hide{display:none}#lay{font-size:.8rem;margin-bottom:8px}#lay b{display:block;margin-top:4px}#lay label{display:inline-flex;align-items:center;gap:6px;margin:2px 12px 2px 0}\ndetails{font-size:.8rem;color:var(--mut)}\nsummary{cursor:pointer}\n#exp{position:fixed;inset:0;z-index:20;background:rgba(0,0,0,.88);display:flex;flex-direction:column;align-items:center;gap:10px;padding:calc(12px + env(safe-area-inset-top,0px)) 12px calc(12px + env(safe-area-inset-bottom,0px));overflow:auto}\n#exp.hide{display:none}#exp img{max-width:100%;height:auto;border-radius:8px}#exp .bt2{display:flex;gap:8px}#exm{font-size:.8rem;color:#e8e8ee;text-align:center}\n#disc{font-size:.72rem;line-height:1.35;color:var(--mut);border:1px solid var(--bd);border-left:3px solid #d9a441;border-radius:6px;padding:6px 8px;margin-bottom:8px}\n#warn{font-size:.8rem;margin-bottom:8px}#warn div{margin:2px 0}\n.w{color:#e0584a}.n{color:#d9a441}.ok{color:#4caf7a}\n.pr{display:flex;gap:6px;margin:6px 0}.pr select,.pr input{font-size:.85rem;padding:6px;border-radius:8px;border:1px solid var(--bd);background:var(--bg);color:var(--tx);min-width:0}\n.pr select{width:84px}.pr input[data-f=len]{flex:1}.pr input[data-f=qty]{width:62px}\n#perf>div{margin-top:6px}\n#imp{width:100%;min-height:84px;margin-top:6px;font:inherit;font-size:.8rem;padding:6px;border-radius:8px;border:1px solid var(--bd);background:var(--bg);color:var(--tx)}\n#impm{font-size:.75rem;margin-top:6px}#perf .bt{display:flex;gap:8px;flex-wrap:wrap;margin-top:8px}\n\n\n:root{--ac:#6d28d9;--acx:#fff}\n@media (prefers-color-scheme:dark){:root:not([data-theme=\"light\"]){--ac:#a78bfa;--acx:#1a1230}}\nbutton{min-height:40px}\n:focus-visible{outline:3px solid var(--ac);outline-offset:2px}\n\n.mp{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:8px 0}.mp label{display:flex;flex-direction:column;font-size:.75rem;color:var(--mut);gap:2px;min-width:0}\n.mp input{font-size:.9rem;padding:8px;border-radius:8px;border:1px solid var(--bd);background:var(--bg);color:var(--tx);min-width:0}\n",html:"<details id=\"mp\" open><summary>Medidas del panel</summary><div class=\"mp\">\n<label>Largo (mm)<input id=\"pL\" type=\"number\" inputmode=\"numeric\" value=\"3600\"></label>\n<label>Alto (mm)<input id=\"pH\" type=\"number\" inputmode=\"numeric\" value=\"2700\"></label>\n<label>Separación montantes<input id=\"pS\" type=\"number\" inputmode=\"numeric\" value=\"400\"></label>\n<label>Ancho de vano (luz)<input id=\"pW\" type=\"number\" inputmode=\"numeric\" value=\"1780\"></label>\n<label>Alto de vano<input id=\"pV\" type=\"number\" inputmode=\"numeric\" value=\"1200\"></label>\n<label>Antepecho (desde el piso)<input id=\"pA\" type=\"number\" inputmode=\"numeric\" value=\"800\"></label>\n<label>Posición del vano (desde el borde izq.)<input id=\"pX\" type=\"number\" inputmode=\"numeric\" value=\"1445\"></label></div>\n</details><div id=\"pmsg\"></div>\n\n  <div class=\"row\"><label for=\"ex\">Explosión</label><input id=\"ex\" type=\"range\" min=\"0\" max=\"1\" step=\"0.01\" value=\"0\"></div>\n  <div class=\"row\"><label for=\"st\">Montaje</label><input id=\"st\" type=\"range\" min=\"0\" max=\"6\" step=\"1\" value=\"6\"><span id=\"stl\"></span></div>\n  <div class=\"row\"><button class=\"pri\" id=\"bd\">Desarmar</button><button id=\"br\">Reiniciar</button><button id=\"bp\">Panelizar</button><button id=\"mw\" class=\"pri\">Vano portante</button><button id=\"mn\">Vano no portante</button><button id=\"bx\">Exportar imagen</button></div>\n  <div id=\"warn\"></div>\n  <div id=\"disc\"><b>Aviso:</b> este módulo sirve solo para visualizar. No pretende ni debe usarse para reemplazar el plano ni el cálculo estructural correspondiente.</div>\n  <details id=\"perf\" open><summary>Perfiles disponibles</summary><div><div id=\"rows\"></div>\n    <div style=\"font-size:.75rem\">Tipo · largo (mm) · cantidad. Si un perfil es más largo que el necesario se corta.</div>\n    <div class=\"bt\"><button id=\"pa\">+ Agregar perfil</button><button id=\"pf\">Cargar lista completa</button><button id=\"pv\">Vaciar</button></div>\n    <div style=\"margin-top:12px\"><b style=\"font-size:.8rem\">Pegar listado de corte</b>\n    <textarea id=\"imp\" placeholder=\"Una línea por perfil, por ejemplo:\n2 × Solera PGU 100 x 0.94 · 3600 mm\n7 × Montante PGC 100 x 0.94 · 2698 mm\n1 × Dintel PGU 100 x 0.94 · 1780 mm\"></textarea>\n    <label style=\"font-size:.8rem;display:flex;gap:6px;align-items:center;margin-top:6px\"><input type=\"checkbox\" id=\"impr\" checked>Reemplazar la lista actual</label>\n    <div class=\"bt\"><button class=\"pri\" id=\"pi\">Importar listado</button></div><div id=\"impm\"></div></div></div></details>\n  <div id=\"lay\" class=\"hide\"></div><details><summary>Listado de corte</summary><div id=\"lst\"></div></details>\n<div id=\"exp\" class=\"hide\"><img id=\"expi\" alt=\"Vista frontal del panel\"><div class=\"bt2\"><button class=\"pri\" id=\"exs\">Guardar PNG</button><button id=\"exc\">Cerrar</button></div><div id=\"exm\"></div></div>\n\n",
mount(host){
const t = 0.003; // espesor visual (el real es 0,94 mm)
const VW = host.viewer, scene = VW.scene, cam = VW.camera;
VW.lights.clear(); VW.lights.add(new THREE.HemisphereLight(0xffffff, 0x556070, 0.95));
const dl0 = new THREE.DirectionalLight(0xffffff, 0.8); dl0.position.set(3, 6, 5); VW.lights.add(dl0);
function bx(g, w, h, d, x, y, z, m) {
  const s = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
  s.position.set(x, y, z); g.add(s);
}
// PGC 100: eje en X, alma en Y, alas hacia +Z
function C(len, m) {
  const g = new THREE.Group(), W = 0.1, F = 0.04, L = 0.012;
  bx(g, len, W, t, 0, 0, 0, m);
  for (const s of [-1, 1]) {
    bx(g, len, t, F, 0, s * (W / 2 - t / 2), F / 2, m);
    bx(g, len, L, t, 0, s * (W / 2 - t - L / 2), F - t / 2, m);
  }
  return g;
}
// PGU 100: eje en X, alma horizontal, alas hacia dir en Y
function U(len, dir, m) {
  const g = new THREE.Group();
  bx(g, len, t, 0.102, 0, 0, 0, m);
  for (const s of [-1, 1]) bx(g, len, 0.035, t, 0, dir * 0.0175, s * (0.051 - t / 2), m);
  return g;
}
const Q = new THREE.Quaternion().setFromAxisAngle(new THREE.Vector3(1, 1, 1).normalize(), 2 * Math.PI / 3); // eje X a Y, alma a Z, alas a +X

const COL = {sol: 0xb8c0cc, mon: 0x6f8fb8, king: 0xd9a441, jack: 0xe0703a, dint: 0x6bb38a, clip: 0xb06fb8, vano: 0x8f9bb0};
const STEP = {sol: 1, mon: 2, king: 3, jack: 3, dint: 4, clip: 5, vano: 6};
const STEPN = ["Sin piezas", "Soleras", "Montantes", "Kings y jacks", "Dinteles", "Clippes", "Jambas del vano"];
const pieces = [];
function add(cat, name, len, g, pos, dir) {
  g.position.copy(pos);
  const p = {g, cat, name, len, home: pos.clone(), dir, det: false, step: STEP[cat], mat: g.children[0].material, cur: pos.clone()};
  g.traverse(o => { if (o.isMesh) o.userData.p = p; });
  scene.add(g); pieces.push(p);
}
const mk = c => new THREE.MeshStandardMaterial({color: COL[c], metalness: 0.55, roughness: 0.4, side: THREE.DoubleSide});
function stud(cat, name, len, cx, cy, dir) {
  const g = C(len / 1000, mk(cat)); g.quaternion.copy(Q);
  add(cat, name, len, g, new THREE.Vector3(cx - 0.02, cy, 0), dir);
}
const V = (x, y, z) => new THREE.Vector3(x, y, z);
let P, xL, xR, xc, xh, VL, vTop, vw, lastLH = "", OV = [], exV = [];
const layerOn = {}; let pan = false, edit = false, edits = 0, sel = null, undo = [];
// soleras del vano: 100 mm de cada extremo se doblan hacia el vano (largo = ancho del vano + 200 mm)
function VS(dir, xl, xr) {
  const m = mk("vano"), th = 0.1, g = U(xr - xl - 2 * t, dir, m);
  for (const s of [-1, 1]) bx(g, t, th, 0.102, s * ((xr - xl) / 2 - t / 2), dir * th / 2, 0, m);
  return g;
}
function readP() {
  const err = [], warn = [];
  const g = id => parseFloat(document.getElementById(id).value) || 0;
  const c = (v, a, b, n) => { const r = Math.round(Math.min(b, Math.max(a, v))); if (r !== Math.round(v)) err.push(n + ": " + Math.round(v) + " mm fuera de rango (" + a + "–" + b + "). Se usó " + r + " mm."); return r; };
  const L = c(g("pL"), 1500, 12000, "Largo"), H = c(g("pH"), 2000, 4000, "Alto"), sep = c(g("pS"), 200, 600, "Separación de montantes");
  const w = c(g("pW"), 300, L - 320, "Ancho de vano"), vh = c(g("pV"), 300, H - 450, "Alto de vano"), vs = c(g("pA"), 200, H - 250 - vh, "Antepecho");
  const vx = c(g("pX"), 160, L - 160 - w, "Posición del vano");
  const raw = [{vx, vw: w, vh, vs}];
  exV.forEach((e, i) => { const n = "Vano " + (i + 2), ew = c(e.w, 300, L - 320, n + " ancho"), eh = c(e.h, 300, H - 450, n + " alto"), es = c(e.s, 200, H - 250 - eh, n + " antepecho"), ep = c(e.x, 160, L - 160 - ew, n + " posición"); raw.push({vx: ep, vw: ew, vh: eh, vs: es}); });
  raw.sort((a, b) => a.vx - b.vx);
  const ops = [];
  raw.forEach(o => { const pr = ops[ops.length - 1]; if (pr && o.vx - (pr.vx + pr.vw) < 300) err.push("El vano en X " + o.vx + " mm queda a menos de 300 mm del anterior: se omitió."); else ops.push(o); });
  if (sep !== 400 && sep !== 600) warn.push("Separación de " + sep + " mm: lo habitual es 400 o 600 mm.");
  if (L > 6000) warn.push("Panel de " + L + " mm: verificá si conviene dividirlo (transporte y montaje).");
  if (w > 1500) warn.push("Vano de " + w + " mm: el dintel debe verificarse por cálculo.");
  if (vx < 300 || L - vx - w < 300) warn.push("Vano a menos de 300 mm de un borde: revisá el encuentro con el montante de esquina.");
  if (vs + vh > H - 450) warn.push("Poca altura sobre el vano (" + (H - vs - vh) + " mm): revisá el dintel.");
  Purple3D.report(document.getElementById("pmsg"), {err, warn, asm: [
    "Perfiles PGC/PGU 100 x 0,94 mm.",
    "Soleras PGU arriba y abajo; montantes PGC a la separación elegida, más uno en cada borde.",
    "Alrededor del vano: king a cada lado (portante: más jack).",
    "Dintel tipo cajón (2 PGC espalda con espalda + PGU) bajo la solera superior.",
    "Clippes a 400 mm máx. sobre y bajo el vano; soleras del vano con 100 mm de doblez en cada extremo.",
    "Varios vanos: cada uno con sus propios king, jack, dintel, clippes y soleras; separación mínima entre vanos de 300 mm.",
    "No hay arriostramientos ni cálculo estructural: dimensioná aparte."]});
  return {L, H, sep, vw: w, vh, vs, vx, ops};
}
function generate() {
  edits = 0; sel = null; undo.length = 0;
  pieces.forEach(p => { scene.remove(p.g); p.g.traverse(o => { if (o.geometry) o.geometry.dispose(); }); });
  pieces.length = 0;
  P = readP();
  const {L, H, sep} = P, Hm = H / 1000;
  OV = P.ops.map(o => { const xl = o.vx / 1000; return {vx: o.vx, xL: xl, xR: xl + o.vw / 1000, xc: xl + o.vw / 2000, vw: o.vw, VL: o.vw + 200, vs: o.vs, vh: o.vh, vTop: o.vs + o.vh}; });
  ({vw, xL, xR, xc, VL, vTop} = OV[0]); xh = xc;
  // soleras PGU
  let g = U(L / 1000, 1, mk("sol")); add("sol", "Solera PGU 100 x 0.94", L, g, V(L / 2000, t / 2, 0), V(0, -0.5, 0));
  g = U(L / 1000, -1, mk("sol")); add("sol", "Solera PGU 100 x 0.94", L, g, V(L / 2000, Hm - t / 2, 0), V(0, 0.5, 0));
  // montantes: bordes + separación fija fuera de las zonas de reyes de cada vano
  const zones = OV.map(o => [o.vx - 105, o.vx + o.vw + 106]), xs = [20];
  for (let c = sep; c < L - 65; c += sep) if (!zones.some(z => c >= z[0] && c < z[1])) xs.push(c);
  xs.push(L - 20);
  xs.forEach(x => stud("mon", "Montante PGC 100 x 0.94", H - 2, x / 1000, Hm / 2, V(0, 0, 0.5)));
  OV.forEach(o => {
    const n0 = pieces.length, {xL, xR, xc, vw, VL, vTop} = o, xh = xc;
    // reyes y apoyos (portante: rey + jack; no portante: el rey hace de jamba)
    [xL - 0.06, xR + 0.06].forEach(x => stud("king", "King PGC 100 x 0.94", H - 2, x, Hm / 2, V(0, 0, 0.9)));
    [xL - 0.02, xR + 0.02].forEach(x => { stud("king", "King PGC 100 x 0.94", H - 2, x, Hm / 2, V(0, 0, 0.9)); pieces[pieces.length - 1].only = "nb"; });
    [xL - 0.02, xR + 0.02].forEach(x => stud("jack", "Jack PGC 100 x 0.94", H - 103, x, t + (H - 103) / 2000, V(0, 0, 1.3)));
    // dintel (viga cajón): 2 PGC espalda con espalda + 1 PGU, bajo la solera superior
    g = C((vw + 80) / 1000, mk("dint")); add("dint", "Dintel PGC 100 x 0.94", vw + 80, g, V(xh, Hm - 0.05, t / 2), V(0, 0.1, 1.7));
    g = C((vw + 80) / 1000, mk("dint")); g.rotation.y = Math.PI; add("dint", "Dintel PGC 100 x 0.94", vw + 80, g, V(xh, Hm - 0.05, -t / 2), V(0, 0.1, -1.7));
    g = U((vw + 70) / 1000, 1, mk("dint")); add("dint", "Dintel PGU 100 x 0.94", vw + 70, g, V(xh, Hm - 0.1015, 0), V(0, -0.2, 0));
    g = U(xR - xL, 1, mk("dint")); add("dint", "Dintel PGU 100 x 0.94", vw, g, V(xc, Hm - 0.1015, 0), V(0, -0.2, 0)); pieces[pieces.length - 1].only = "nb";
    // clippes: separación máxima de 400 mm
    const n = Math.max(1, Math.ceil(vw / 400) - 1);
    for (let i = 1; i <= n; i++) {
      const x = xL + (xR - xL) * i / (n + 1);
      stud("clip", "Clippe sup PGC 100 x 0.94", H - 103 - vTop, x, (vTop + H - 103) / 2000, V(0, 0.5, 0.7));
      stud("clip", "Clippe inf PGC 100 x 0.94", o.vs - 2, x, t + o.vs / 2000, V(0, -0.5, 0.7));
    }
    g = VS(-1, xL, xR); add("vano", "Vano PGU 100 x 0.94", VL, g, V(xc, vTop / 1000 - t / 2, 0), V(0, 0.25, 1.4));
    g = VS(1, xL, xR); add("vano", "Vano PGU 100 x 0.94", VL, g, V(xc, o.vs / 1000 + 0.002 + t / 2, 0), V(0, -0.25, 1.4));
    pieces.slice(n0).forEach(p => { p.o = o; });
  });
  pieces.forEach(p => { p.dir = p.dir.clone(); p.dir.x += (p.home.x - L / 2000) * 0.25; });
  pieces.forEach(p => { if (p.only) return; if (["jack", "king", "dint"].indexOf(p.cat) > -1) p.only = "win"; else if (["clip", "vano"].indexOf(p.cat) > -1) p.only = "win nb"; });
  // capas de panelizado (con el hueco del vano)
  const sh = new THREE.Shape();
  sh.moveTo(0, 0); sh.lineTo(L / 1000, 0); sh.lineTo(L / 1000, Hm); sh.lineTo(0, Hm); sh.lineTo(0, 0);
  OV.forEach(o => { const hole = new THREE.Path();
    hole.moveTo(o.xL, o.vs / 1000); hole.lineTo(o.xL, o.vTop / 1000); hole.lineTo(o.xR, o.vTop / 1000); hole.lineTo(o.xR, o.vs / 1000); hole.lineTo(o.xL, o.vs / 1000);
    sh.holes.push(hole); });
  LAY.forEach(l => {
    const th = l[3], m = new THREE.MeshStandardMaterial({color: l[4], roughness: 0.8, metalness: 0, transparent: l[5] < 1, opacity: l[5], side: THREE.DoubleSide});
    const mesh = new THREE.Mesh(new THREE.ExtrudeGeometry(sh, {depth: th, bevelEnabled: false}), m);
    mesh.position.z = l[2];
    const gr = new THREE.Group(); gr.add(mesh); gr.visible = false; scene.add(gr);
    const p = {g: gr, cat: "lay", name: l[1], len: 0, home: V(0, 0, 0), dir: V(0, 0, l[6]), det: false, step: 0, mat: m, cur: V(0, 0, 0), layer: l[1], lbl: l[1]};
    mesh.userData.p = p; pieces.push(p);
  });
  adopt();
  const lh = L + "x" + H;
  if (lh !== lastLH) { lastLH = lh; VW.fit(L / 2, H / 2, 0, Math.max(L, H)); }
}
// UI
const ex = document.getElementById("ex"), st = document.getElementById("st"), info = document.getElementById("hint");
let exv = 0, ext = 0, step = 6;
ex.addEventListener("input", () => { ext = exv = parseFloat(ex.value); });
st.addEventListener("input", () => { step = parseInt(st.value, 10); lbl(); });
function lbl() { document.getElementById("stl").textContent = step + ". " + STEPN[step]; }
document.getElementById("bd").addEventListener("click", e => {
  ext = ext > 0.5 ? 0 : 1; e.target.textContent = ext > 0.5 ? "Armar" : "Desarmar";
});
document.getElementById("br").addEventListener("click", () => {
  pieces.forEach(p => p.det = false); ext = 0; step = 6; st.value = 6; lbl();
  document.getElementById("bd").textContent = "Desarmar";
});
function listing() {
  const cnt = {};
  REQ.forEach(p => { const k = p.name + " · " + p.len + " mm"; cnt[k] = (cnt[k] || 0) + 1; });
  document.getElementById("lst").innerHTML = Object.keys(cnt).map(k => cnt[k] + " × " + k).join("<br>");
}
lbl();

// capas de panelizado: exterior hacia +Z, interior hacia -Z (con el hueco de la ventana)
const LAY = [
  ["ext", "OSB 11 mm", 0.052, 0.011, 0xc9a56b, 1, 2.4],
  ["ext", "Membrana hidrófuga", 0.063, 0.002, 0xf4f4f4, 0.9, 2.8],
  ["ext", "Placa cementicia 8 mm", 0.065, 0.008, 0x9aa1a6, 1, 3.2],
  ["int", "Lana de vidrio 80 mm", -0.04, 0.08, 0xf0d34a, 0.85, -2.2],
  ["int", "Barrera de vapor", -0.054, 0.002, 0x9ecbe8, 0.55, -2.6],
  ["int", "Placa de yeso 12.5 mm", -0.0665, 0.0125, 0xe8e4da, 1, -3.0]
];
LAY.forEach(l => { layerOn[l[1]] = true; });
const lay = document.getElementById("lay"), bp = document.getElementById("bp");
const SIDE = {ext: "Exterior", int: "Interior"};
lay.innerHTML = ["ext", "int"].map(k => "<b>" + SIDE[k] + "</b>" + LAY.filter(l => l[0] === k).map(l =>
  '<label><input type="checkbox" checked data-n="' + l[1] + '">' + l[1] + "</label>").join("")).join("");
lay.addEventListener("change", e => { layerOn[e.target.dataset.n] = e.target.checked; });
bp.addEventListener("click", () => {
  pan = !pan; lay.classList.toggle("hide", !pan);
  bp.textContent = pan ? "Quitar paneles" : "Panelizar"; bp.classList.toggle("pri", pan);
});

// perfiles disponibles -> construcción
let ALL = [], REQ = [], stock = [];
function adopt() { ALL = pieces.filter(p => p.cat !== "lay"); ALL.forEach(p => { p.type = p.name.indexOf("PGC") > -1 ? "PGC" : "PGU"; p.miss = false; }); }
generate(); REQ = ALL;
const rows = document.getElementById("rows"), warn = document.getElementById("warn");
const esc = x => String(x).replace(/[&<>]/g, "");
function fill() {
  const c = {}; REQ.forEach(p => { const k = p.type + "|" + p.len; c[k] = (c[k] || 0) + 1; });
  stock = Object.keys(c).sort().map(k => { const a = k.split("|"); return {type: a[0], len: +a[1], qty: c[k]}; });
  draw(); build();
}
function draw() {
  rows.innerHTML = stock.map((r, i) => '<div class="pr"><select data-i="' + i + '" data-f="type">' +
    ["PGC", "PGU"].map(t => "<option" + (t === r.type ? " selected" : "") + ">" + t + "</option>").join("") +
    '</select><input type="number" inputmode="numeric" min="1" data-i="' + i + '" data-f="len" value="' + r.len +
    '"><input type="number" inputmode="numeric" min="0" data-i="' + i + '" data-f="qty" value="' + r.qty +
    '"><button data-x="' + i + '">×</button></div>').join("");
}
rows.addEventListener("input", e => {
  const d = e.target.dataset; if (d.i === undefined) return;
  stock[d.i][d.f] = d.f === "type" ? e.target.value : Math.max(0, Math.floor(parseFloat(e.target.value)) || 0);
  build();
});
rows.addEventListener("click", e => { const x = e.target.dataset.x; if (x === undefined) return; stock.splice(x, 1); draw(); build(); });
document.getElementById("pa").addEventListener("click", () => { stock.push({type: "PGC", len: P.H - 2, qty: 1}); draw(); build(); });
document.getElementById("pf").addEventListener("click", fill);
document.getElementById("pv").addEventListener("click", () => { stock = []; draw(); build(); });
function build() {
  const pool = [];
  stock.forEach(r => { for (let i = 0; i < Math.min(r.qty, 500); i++) if (r.len > 0) pool.push({type: r.type, len: r.len, used: false}); });
  const miss = {}, cuts = {};
  REQ.slice().sort((a, b) => b.len - a.len).forEach(p => {
    let b = null;
    pool.forEach(q => { if (!q.used && q.type === p.type && q.len >= p.len && (!b || q.len < b.len)) b = q; });
    if (!b) { p.miss = true; const k = p.name + " · " + p.len + " mm"; miss[k] = (miss[k] || 0) + 1; return; }
    p.miss = false; b.used = true;
    if (b.len > p.len) { const k = b.type + " de " + b.len + " mm → " + p.len + " mm (resto " + (b.len - p.len) + " mm)"; cuts[k] = (cuts[k] || 0) + 1; }
  });
  const left = {};
  pool.forEach(q => { if (!q.used) { const k = q.type + " 100 · " + q.len + " mm"; left[k] = (left[k] || 0) + 1; } });
  const out = [];
  Object.keys(miss).forEach(k => out.push('<div class="w">⚠ Falta ' + miss[k] + " × " + esc(k) + "</div>"));
  Object.keys(left).forEach(k => out.push('<div class="n">⚠ Sobra ' + left[k] + " × " + esc(k) + "</div>"));
  Object.keys(cuts).forEach(k => out.push('<div class="n">✂ Cortar ' + cuts[k] + " × " + esc(k) + "</div>"));
  if (!out.length) out.push('<div class="ok">✓ Panel completo, sin faltantes ni sobrantes.</div>');
  OV.forEach((o, i) => { const lw = Math.round((o.xR - o.xL) * 1000); out.push('<div style="color:var(--mut)">▭ Vano ' + (i + 1) + ': ' + lw + ' mm libre entre jambas · solera del vano ' + o.VL + ' mm (' + lw + ' + 2 × 100)</div>'); });
  if (edits) out.push('<div class="n">✎ Panel editado manualmente (' + edits + ' cambio/s): verificalo contra tu criterio constructivo.</div>');
  const nm = REQ.filter(p => p.miss).length;
  if (nm) out.unshift('<div class="w"><b>Panel incompleto: faltan ' + nm + " de " + REQ.length + " piezas.</b></div>");
  warn.innerHTML = out.join("");
}
// importar listado de corte pegado
function parseCut(txt) {
  const ok = [], bad = [];
  txt.split(/\n|;/).forEach(raw => {
    let l = raw.trim(); if (!l || /^listado/i.test(l)) return;
    const m = l.match(/PG[CU]/i); if (!m) { bad.push(l); return; }
    const type = m[0].toUpperCase();
    l = l.replace(/PG[CU]\s*100/i, " ").replace(/PG[CU]/ig, " ").replace(/[x×]\s*0[.,]\d+/ig, " ");
    let q = 1, a;
    if ((a = l.match(/^\s*(\d+)\s*[x×]/i)) || (a = l.match(/[x×]\s*(\d+)\s*$/i)) || (a = l.match(/(?:cant\w*|qty)\s*[:=]?\s*(\d+)/i))) { q = +a[1]; l = l.replace(a[0], " "); }
    const n = l.match(/\d{3,5}/);
    if (!n || q < 1) { bad.push(raw.trim()); return; }
    ok.push({type, len: +n[0], qty: q});
  });
  return {ok, bad};
}
document.getElementById("pi").addEventListener("click", () => {
  const r = parseCut(document.getElementById("imp").value), msg = document.getElementById("impm");
  if (document.getElementById("impr").checked && r.ok.length) stock = [];
  r.ok.forEach(o => { const e = stock.find(s => s.type === o.type && s.len === o.len); if (e) e.qty += o.qty; else stock.push(o); });
  draw(); build();
  msg.innerHTML = (r.ok.length ? '<div class="ok">✓ ' + r.ok.length + " línea(s) importada(s).</div>" : '<div class="w">No se importó ninguna línea.</div>') +
    r.bad.map(b => '<div class="w">No entendí: ' + esc(b) + "</div>").join("");
});
let mode = "win";
function setMode(md) {
  mode = md;
  REQ = ALL.filter(p => !p.only || p.only.split(" ").indexOf(md) > -1);
  ALL.forEach(p => { p.out = REQ.indexOf(p) < 0; p.miss = false; });
  document.getElementById("mw").classList.toggle("pri", md === "win");
  document.getElementById("mn").classList.toggle("pri", md === "nb");
  listing(); fill();
}
document.getElementById("mw").addEventListener("click", () => setMode("win"));
document.getElementById("mn").addEventListener("click", () => setMode("nb"));
setMode("win");
function regen() { const had = edits; generate(); setMode(mode); showEd(); if (had) edmsg.textContent = "Se descartaron las ediciones manuales al cambiar las medidas."; }
document.getElementById("mp").addEventListener("change", regen);
const xb = document.createElement("div");
xb.innerHTML = '<details open><summary>Vanos adicionales</summary><div style="font-size:.8rem;color:var(--mut);margin:6px 0">Ancho · Alto · Antepecho · Posición X (mm). Entre vanos debe quedar al menos 300 mm.</div><div id="xv"></div><div class="row"><button id="xa">+ Agregar vano</button></div></details>';
document.getElementById("pmsg").parentNode.insertBefore(xb, document.getElementById("pmsg"));
const xv = document.getElementById("xv");
function drawX() { xv.innerHTML = exV.map((e, i) => '<div style="display:grid;grid-template-columns:repeat(4,1fr) 40px;gap:6px;margin:6px 0">' + ["w", "h", "s", "x"].map(k => '<input type="number" inputmode="numeric" value="' + e[k] + '" data-i="' + i + '" data-k="' + k + '" aria-label="Vano ' + (i + 2) + ' ' + k + '">').join("") + '<button data-x="' + i + '" aria-label="Quitar vano">×</button></div>').join(""); }
xv.addEventListener("change", e => { const d = e.target.dataset; if (d.k === undefined) return; exV[d.i][d.k] = parseFloat(e.target.value) || 0; regen(); });
xv.addEventListener("click", e => { const i = e.target.dataset.x; if (i === undefined) return; exV.splice(+i, 1); drawX(); regen(); });
document.getElementById("xa").addEventListener("click", () => { if (exV.length >= 4) return; exV.push({w: 900, h: 1200, s: 900, x: Math.max(160, P.L - 1400)}); drawX(); regen(); });

// exportar imagen: vista frontal 2D del panel actual, dibujada con las piezas reales del modelo
function renderPNG() {
  const s = 1080 / P.L, M = 70, PW = P.L * s, PH = P.H * s, W = PW + 2 * M, FONT = "system-ui,'Segoe UI',Roboto,sans-serif", LH = 25, y0 = 96;
  const cv = document.createElement("canvas"), ctx = cv.getContext("2d");
  const wrapT = (t, w, f) => { ctx.font = f; const o = []; let l = ""; t.split(" ").forEach(wd => { const n = l ? l + " " + wd : wd; if (ctx.measureText(n).width > w && l) { o.push(l); l = wd; } else l = n; }); if (l) o.push(l); return o; };
  const cnt = {}; REQ.filter(p => !p.miss).forEach(p => { const k = p.name + " · " + p.len + " mm"; cnt[k] = (cnt[k] || 0) + 1; });
  const cut = Object.keys(cnt).map(k => cnt[k] + " × " + k);
  const CC = {w: "#e0584a", n: "#d9a441", ok: "#4caf7a"}, wl = [];
  Array.from(warn.children).forEach(d => wrapT(d.textContent, W - 2 * M, "17px " + FONT).forEach(l => wl.push({tx: l, c: CC[d.className] || "#9b99a3"})));
  const dl = wrapT(document.getElementById("disc").textContent, W - 2 * M, "15px " + FONT);
  const H = y0 + PH + 40 + (cut.length + 1) * LH + 16 + wl.length * LH + 16 + dl.length * 21 + 36;
  cv.width = W; cv.height = H;
  ctx.fillStyle = "#17161a"; ctx.fillRect(0, 0, W, H);
  const X = x => M + x * 1000 * s, Y = y => y0 + (P.H / 1000 - y) * 1000 * s;
  const R = (x, y, w, h, c) => { ctx.fillStyle = c; ctx.fillRect(X(x), Y(y + h), Math.max(w * 1000 * s, 2), Math.max(h * 1000 * s, 2)); };
  const T = (tx, x, y, f, c, al) => { ctx.font = f; ctx.fillStyle = c; ctx.textAlign = al || "left"; ctx.fillText(tx, x, y); };
  T("Panel steelframing · " + (mode === "nb" ? "Vano no portante" : "Vano portante"), M, 42, "600 30px " + FONT, "#eeedf0");
  T("Vista frontal · " + P.L + " × " + P.H + " mm · perfiles 100 x 0.94", M, 72, "17px " + FONT, "#9b99a3");
  REQ.forEach(p => {
    if (p.miss) return;
    const c = "#" + COL[p.cat].toString(16).padStart(6, "0"), h = p.home, L = p.len / 1000;
    if (p.cat === "sol") R(0, h.y < P.H / 2000 ? 0 : P.H / 1000 - 0.006, P.L / 1000, 0.006, c);
    else if (["mon", "king", "jack", "clip"].indexOf(p.cat) > -1) R(h.x, h.y - L / 2, 0.04, L, c);
    else if (p.cat === "dint" && p.type === "PGC") R(h.x - L / 2, h.y - 0.05, L, 0.1, c);
    else if (p.cat === "dint") R(h.x - L / 2, h.y, L, 0.012, c);
    else if (p.cat === "vano") { const o = p.o, bot = h.y < (o.vs + o.vTop) / 2000; R(o.xL, bot ? o.vs / 1000 : o.vTop / 1000 - 0.006, o.xR - o.xL, 0.006, c); [o.xL, o.xR - 0.006].forEach(x => R(x, bot ? o.vs / 1000 : o.vTop / 1000 - 0.1, 0.006, 0.1, c)); }
  });
  OV.forEach((o, i) => { const vwr = Math.round((o.xR - o.xL) * 1000), cy = Y((o.vs + o.vTop) / 2000), pre = OV.length > 1 ? "Vano " + (i + 1) + " " : "Vano ";
    T(pre + vwr + " × " + o.vh + " mm", X(o.xc), cy, "18px " + FONT, "#eeedf0", "center");
    T("solera del vano " + o.VL + " = " + vwr + " + 2 × 100", X(o.xc), cy + 24, "14px " + FONT, "#9b99a3", "center");
    T(String(o.vs), X(o.xL) - 10, Y(o.vs / 1000) + 5, "14px " + FONT, "#9b99a3", "right"); T(String(o.vTop), X(o.xL) - 10, Y(o.vTop / 1000) + 5, "14px " + FONT, "#9b99a3", "right"); });
  let y = y0 + PH + 44;
  T("Listado de corte", M, y, "600 18px " + FONT, "#eeedf0"); y += LH;
  cut.forEach(l => { T(l, M, y, "16px " + FONT, "#c9c7d0"); y += LH; });
  y += 16; wl.forEach(l => { T(l.tx, M, y, "17px " + FONT, l.c); y += LH; });
  y += 16; dl.forEach(l => { T(l, M, y, "15px " + FONT, "#9b99a3"); y += 21; });
  return cv;
}
const expEl = document.getElementById("exp"), expM = document.getElementById("exm");
let expBlob = null;
document.getElementById("bx").addEventListener("click", async () => {
  const cv = renderPNG();
  document.getElementById("expi").src = cv.toDataURL("image/png");
  expBlob = await new Promise(r => cv.toBlob(r, "image/png"));
  expM.textContent = "Tocá Guardar PNG, o mantené apretada la imagen para guardarla."; expEl.classList.remove("hide");
});
document.getElementById("exc").addEventListener("click", () => expEl.classList.add("hide"));
document.getElementById("exs").addEventListener("click", async () => {
  if (!expBlob) { expM.textContent = "Mantené apretada la imagen para guardarla."; return; }
  const filename = "panel-" + (mode === "nb" ? "vano-no-portante" : "vano-portante") + ".png";
  try {
    const d = window.claude && await window.claude.use("downloads");
    if (d) { await d.save({filename, data: expBlob}); expM.textContent = "Listo."; return; }
  } catch (e) {
    if (e && e.code === "declined") { expM.textContent = ""; return; }
  }
  // Respaldo para GitHub Pages / navegador normal
  try {
    const url = URL.createObjectURL(expBlob);
    const a = document.createElement("a");
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
    expM.textContent = "Listo. Si no se descargó, mantené apretada la imagen para guardarla.";
  } catch (e) {
    expM.textContent = "No se pudo guardar: mantené apretada la imagen para guardarla.";
  }
});

// edición manual: seleccionar, mover, duplicar, eliminar y agregar piezas (el listado y los faltantes se recalculan)
const edBox = document.createElement("div");
edBox.innerHTML = '<div class="row"><button id="bed">Editar piezas</button><button id="bund" class="hide">Deshacer</button><button id="bres" class="hide">Restaurar automático</button></div>' +
  '<div id="edp" class="hide"><div id="edn" style="font-size:.85rem;margin-bottom:6px"></div>' +
  '<div class="row"><label for="edst">Paso (mm)</label><input id="edst" type="number" inputmode="numeric" min="1" value="10" style="width:70px">' +
  '<button data-m="-1,0" aria-label="Izquierda">◀</button><button data-m="1,0" aria-label="Derecha">▶</button><button data-m="0,1" aria-label="Arriba">▲</button><button data-m="0,-1" aria-label="Abajo">▼</button></div>' +
  '<div class="row"><button id="edd">Duplicar</button><button id="edx">Eliminar</button><button id="eda">+ Montante</button></div></div>' +
  '<div id="edmsg" style="font-size:.8rem;color:var(--mut)"></div>';
warn.parentNode.insertBefore(edBox, warn);
const edmsg = document.getElementById("edmsg"), edn = document.getElementById("edn");
function snap() { undo.push({all: ALL.slice(), pos: ALL.map(p => [p.home.x, p.home.y])}); if (undo.length > 50) undo.shift(); }
document.getElementById("bund").addEventListener("click", () => {
  const s = undo.pop(); if (!s) return;
  ALL.forEach(p => { if (s.all.indexOf(p) < 0) { scene.remove(p.g); const i = pieces.indexOf(p); if (i > -1) pieces.splice(i, 1); } });
  s.all.forEach((p, i) => { if (ALL.indexOf(p) < 0) { scene.add(p.g); pieces.push(p); } p.home.x = s.pos[i][0]; p.home.y = s.pos[i][1]; });
  ALL = s.all.slice(); sel = null; edits = Math.max(0, edits - 1); refresh();
});
function refresh() { REQ = ALL.filter(p => !p.only || p.only.split(" ").indexOf(mode) > -1); ALL.forEach(p => { p.out = REQ.indexOf(p) < 0; }); listing(); build(); showEd(); }
function showEd() {
  document.getElementById("edp").classList.toggle("hide", !edit);
  document.getElementById("bres").classList.toggle("hide", !edit);
  document.getElementById("bund").classList.toggle("hide", !edit); document.getElementById("bund").disabled = !undo.length;
  document.getElementById("bed").textContent = edit ? "Salir de edición" : "Editar piezas";
  document.getElementById("bed").classList.toggle("pri", edit);
  edn.textContent = sel ? "Seleccionada: " + sel.name + " · " + sel.len + " mm · X " + Math.round(sel.home.x * 1000) + " · Y " + Math.round(sel.home.y * 1000) : "Tocá una pieza del panel para seleccionarla.";
  document.querySelectorAll("#edp button").forEach(b => { if (b.id !== "eda") b.disabled = !sel; });
}
document.getElementById("bed").addEventListener("click", () => { edit = !edit; if (!edit) sel = null; edmsg.textContent = ""; info.textContent = edit ? "Modo edición: tocá una pieza para seleccionarla." : ""; showEd(); });
document.getElementById("bres").addEventListener("click", () => { regen(); edmsg.textContent = "Panel restaurado al armado automático."; });
document.getElementById("edp").addEventListener("click", e => {
  const m = e.target.dataset.m; if (!m || !sel) return;
  const st = Math.max(1, parseFloat(document.getElementById("edst").value) || 10), [dx, dy] = m.split(",").map(Number);
  snap(); sel.home.x += dx * st / 1000; sel.home.y += dy * st / 1000; edits++; refresh();
});
document.getElementById("edx").addEventListener("click", () => {
  if (!sel) return; snap(); scene.remove(sel.g);
  pieces.splice(pieces.indexOf(sel), 1); ALL.splice(ALL.indexOf(sel), 1); sel = null; edits++; refresh();
});
document.getElementById("edd").addEventListener("click", () => {
  if (!sel) return; snap();
  const ms = []; sel.g.traverse(o => { if (o.isMesh) { ms.push([o, o.userData]); o.userData = {}; } });
  const g = sel.g.clone(true); ms.forEach(([o, u]) => { o.userData = u; });
  const m = sel.mat.clone(); g.traverse(o => { if (o.isMesh) o.material = m; });
  const np = Object.assign({}, sel, {g, mat: m, home: sel.home.clone(), cur: sel.cur.clone(), dir: sel.dir.clone(), det: false, miss: false});
  g.traverse(o => { if (o.isMesh) o.userData.p = np; });
  if (["mon", "king", "jack", "clip"].indexOf(np.cat) > -1) np.home.x += 0.1; else np.home.y += 0.1;
  g.position.copy(np.home); scene.add(g); pieces.push(np); ALL.push(np); sel = np; edits++; refresh();
});
document.getElementById("eda").addEventListener("click", () => {
  snap(); stud("mon", "Montante PGC 100 x 0.94", P.H - 2, P.L / 2000, P.H / 2000, V(0, 0, 0.5));
  const np = pieces[pieces.length - 1]; np.type = "PGC"; np.miss = false; ALL.push(np); sel = np; edits++; refresh();
});
showEd();

VW.ontap = e => {
  const meshes = []; pieces.forEach(p => { if (p.g.visible) p.g.traverse(o => o.isMesh && o.visible && meshes.push(o)); });
  const h = VW.raycast(e, meshes)[0];
  if (!h) return;
  const p = h.object.userData.p; if (edit) { if (p.cat !== "lay") { sel = p; showEd(); } return; } p.det = !p.det;
  info.textContent = (p.lbl || p.name + " · " + p.len + " mm") + " · " + (p.det ? "sacada del panel" : "en su lugar");
};
const tmp = new THREE.Vector3();
VW.onframe = () => {
  exv += (ext - exv) * 0.1; if (Math.abs(ext - exv) < 0.002) exv = ext;
  if (document.activeElement !== ex) ex.value = exv;
  pieces.forEach(p => {
    p.g.visible = p.layer ? pan && layerOn[p.layer] : step >= p.step && !p.miss && !p.out;
    tmp.copy(p.home).addScaledVector(p.dir, exv);
    if (p.det) tmp.z += 2.4;
    p.cur.lerp(tmp, 0.15); p.g.position.copy(p.cur);
    p.mat.emissive.setHex(p === sel ? 0x4b3bd0 : p.det ? 0x5a2a00 : 0x000000);
  });
};
}});
