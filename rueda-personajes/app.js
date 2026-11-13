(function () {
"use strict";
const BOOKS = window.BOOKS, CATS = window.CATS, PEOPLE = window.PEOPLE;
const byId = Object.fromEntries(PEOPLE.map(p => [p.id, p]));
const catLabel = Object.fromEntries(CATS.map(c => [c.id, c.l]));
const COLOR = {
  renegados: "#7a1f2b", sombra: "#3a3a3a", ashaman: "#4b3f72", familia: "#8a6d3b", aessedai: "#2f6f8f",
  guardianes: "#5b7b4a", aiel: "#b06a2c", seanchan: "#8b3a62", hijos: "#9a9a8a", banda: "#b5442e",
  mar: "#1f7a7a", ogier: "#6b5b3e", tuathaan: "#c28a1e", cuerno: "#a08a2a", dosrios: "#42602f",
  dragon: "#c23b22", reinos: "#60634f",
};
const REL = {
  familia: ["Familia", "Familia"], pareja: ["Pareja", "Pareja"], guardian: ["Vínculo de Guardián", "Vínculo de Guardián"],
  maestro: ["Su mentor", "Su alumno"], alumno: ["Su alumno", "Su mentor"], aliado: ["Aliado", "Aliado"],
  enemigo: ["Enemigo", "Enemigo"], rival: ["Rival", "Rival"], lealtad: ["Le es leal a", "Le es leal"],
};
const REL_ORDER = ["familia", "pareja", "guardian", "maestro", "alumno", "lealtad", "aliado", "rival", "enemigo"];

// ---------- estado de spoilers
const LS = window.localStorage;
let level = 1, np = false;
try { const v = +LS.getItem("rt-libro"); if (v >= 1 && v <= 14) level = v; np = LS.getItem("rt-np") === "1"; } catch (e) { /* sin almacenamiento */ }
let view = "red", openId = null;
const inc = b => b === 0 ? np : (b != null && b <= level);
const bookName = n => { const b = BOOKS[n]; return n === 0 ? b.t : `Libro ${n} · ${b.t}`; };
const esc = s => String(s ?? "").replace(/[&<>"]/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
const ord = b => b === 0 ? -1 : b; // Nueva Primavera es anterior a todo

function isVisible(p) { return p.libros.some(inc) || Object.keys(p.fichas).some(k => inc(+k)); }
function curF(p) { const fs = p.f.filter(x => inc(x.b)).sort((a, b) => ord(a.b) - ord(b.b)); return fs[fs.length - 1] || null; }
function isDead(p) { return p.muerte != null && inc(p.muerte); }
function aliasNow(p) { return [...new Set(p.alias.filter(a => inc(a.b)).map(a => a.t))]; }

// adyacencia sin dirección, con la etiqueta vista desde cada extremo
const ADJ = {};
PEOPLE.forEach(p => ADJ[p.id] = []);
PEOPLE.forEach(p => p.rel.forEach(r => {
  if (!byId[r.a]) return;
  ADJ[p.id].push({ o: r.a, t: r.t, lab: (REL[r.t] || [r.t])[0], b: r.b, h: r.h, d: r.d });
  ADJ[r.a].push({ o: p.id, t: r.t, lab: (REL[r.t] || [r.t, r.t])[1], b: r.b, h: r.h, d: r.d, inv: true });
}));
function relsNow(id) {
  const seen = new Map();
  for (const r of ADJ[id]) {
    if (!inc(r.b) || !isVisible(byId[r.o])) continue;
    const k = r.o + "|" + r.lab;
    if (!seen.has(k) || (!seen.get(k).d && r.d)) seen.set(k, r);
  }
  return [...seen.values()];
}

// ---------- selector de libro
const booksEl = document.getElementById("books");
for (let n = 1; n <= 14; n++) {
  const b = document.createElement("button");
  b.type = "button"; b.className = "book"; b.dataset.n = n;
  b.innerHTML = `<b>${n}</b><span>${esc(BOOKS[n].t)}</span>`;
  b.addEventListener("click", () => askLevel(n));
  booksEl.appendChild(b);
}
const npT = document.getElementById("npToggle");
npT.addEventListener("change", () => {
  if (npT.checked) {
    npT.checked = false;
    confirmAsk("¿Incluir Nueva Primavera?", "La precuela cuenta hechos de veinte años antes de El Ojo del Mundo, y revela secretos de Moraine, Lan y la Torre Blanca. ¿La añado?", "Sí, incluirla",
      () => { np = true; save(); render(); });
  } else { np = false; save(); render(); }
});
function askLevel(n) {
  if (n <= level) { level = n; save(); render(); return; }
  confirmAsk(`¿Mostrar hasta el libro ${n}?`,
    `Verás personajes, relaciones, cambios de bando y muertes hasta el final de ${bookName(n)}. Hazlo solo si ya lo has leído o escuchado.`,
    `Sí, mostrar hasta el libro ${n}`, () => { level = n; save(); render(); });
}
function save() { try { LS.setItem("rt-libro", level); LS.setItem("rt-np", np ? "1" : "0"); } catch (e) { /* nada */ } }

const dlg = document.getElementById("confirm");
let onYes = null;
function confirmAsk(title, text, yes, fn) {
  document.getElementById("cTitle").textContent = title;
  document.getElementById("cText").textContent = text;
  document.getElementById("cYes").textContent = yes;
  onYes = fn;
  if (dlg.showModal) dlg.showModal(); else if (window.confirm(text)) fn();
}
dlg.addEventListener("close", () => { if (dlg.returnValue === "si" && onYes) onYes(); onYes = null; dlg.returnValue = ""; });

function paintBooks() {
  [...booksEl.children].forEach(b => {
    const n = +b.dataset.n;
    b.setAttribute("aria-pressed", n === level ? "true" : "false");
    b.classList.toggle("read", n < level);
    b.classList.toggle("locked", n > level);
    b.title = n > level ? `Bloqueado: ${bookName(n)}. Pulsa para confirmar.` : bookName(n);
  });
  npT.checked = np;
  document.getElementById("spNow").textContent = bookName(level) + (np ? " · con Nueva Primavera" : "");
}

// ---------- filtros
const q = document.getElementById("q"), fCat = document.getElementById("fCat"), fNac = document.getElementById("fNac"),
  fLib = document.getElementById("fLib"), fEst = document.getElementById("fEst"), fOrd = document.getElementById("fOrd");
[q, fCat, fNac, fLib, fEst, fOrd].forEach(el => el.addEventListener(el === q ? "input" : "change", () => renderView()));
function fillSelect(el, opts, first) {
  const cur = el.value;
  el.innerHTML = `<option value="">${first}</option>` + opts.map(([v, l]) => `<option value="${esc(v)}">${esc(l)}</option>`).join("");
  if (opts.some(([v]) => String(v) === cur)) el.value = cur;
}
function refreshFilters(vis) {
  const cats = {}, nacs = {};
  vis.forEach(p => { const f = curF(p); if (f) cats[f.c] = (cats[f.c] || 0) + 1; nacs[p.nac] = (nacs[p.nac] || 0) + 1; });
  fillSelect(fCat, CATS.filter(c => cats[c.id]).map(c => [c.id, `${c.l} (${cats[c.id]})`]), "Todas");
  fillSelect(fNac, Object.keys(nacs).sort((a, b) => a.localeCompare(b, "es")).map(n => [n, `${n} (${nacs[n]})`]), "Todas");
  const libs = []; if (np) libs.push([0, "Nueva Primavera"]);
  for (let n = 1; n <= level; n++) libs.push([n, `${n} · ${BOOKS[n].t}`]);
  fillSelect(fLib, libs, "Cualquier libro");
}
const norm = s => String(s || "").normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
function filtered(vis) {
  const t = norm(q.value.trim());
  let out = vis.filter(p => {
    if (t && !norm([p.n, p.en, ...aliasNow(p)].join(" ")).includes(t)) return false;
    if (fCat.value) { const f = curF(p); if (!f || f.c !== fCat.value) return false; }
    if (fNac.value && p.nac !== fNac.value) return false;
    if (fLib.value !== "" && !p.libros.includes(+fLib.value)) return false;
    if (fEst.value === "vivo" && isDead(p)) return false;
    if (fEst.value === "muerto" && !isDead(p)) return false;
    return true;
  });
  const deg = id => relsNow(id).length;
  if (fOrd.value === "aparicion") out.sort((a, b) => firstSeen(a) - firstSeen(b) || a.n.localeCompare(b.n, "es"));
  else if (fOrd.value === "relaciones") out.sort((a, b) => deg(b.id) - deg(a.id) || a.n.localeCompare(b.n, "es"));
  else out.sort((a, b) => a.n.localeCompare(b.n, "es"));
  return out;
}
function firstSeen(p) { const l = [...p.libros, ...Object.keys(p.fichas).map(Number)].filter(inc).map(ord); return Math.min(...l); }
function booksLine(p) {
  const l = p.libros.filter(inc);
  if (!l.length) return "Mencionado, sin aparecer en escena";
  const names = l.map(n => n === 0 ? "NP" : n);
  // compacta rangos consecutivos
  const parts = []; let s = null, prev = null;
  for (const n of l) { if (s === null) { s = prev = n; continue; } if (n === prev + 1) { prev = n; continue; } parts.push([s, prev]); s = prev = n; }
  if (s !== null) parts.push([s, prev]);
  const txt = parts.map(([a, b]) => a === b ? (a === 0 ? "NP" : a) : `${a === 0 ? "NP" : a}–${b}`).join(", ");
  return (names.length === 1 ? "Libro " : "Libros ") + txt;
}

// ---------- tarjetas
const listEl = document.getElementById("vLista"), countEl = document.getElementById("count");
function renderList(list) {
  if (!list.length) { listEl.innerHTML = `<div class="tj-state tj-state--empty">No hay personajes con estos filtros hasta ${esc(bookName(level))}.</div>`; return; }
  listEl.innerHTML = list.map(p => {
    const f = curF(p), al = aliasNow(p).slice(0, 2);
    return `<button type="button" class="card" data-id="${p.id}" style="--c:${COLOR[f ? f.c : "reinos"]}">
      <span class="c-name">${esc(p.n)}${isDead(p) ? ` <span class="dead" title="Muere en el libro ${p.muerte}">† ${p.muerte === 0 ? "NP" : p.muerte}</span>` : ""}</span>
      ${p.en && p.en !== p.n ? `<span class="c-en">${esc(p.en)}</span>` : ""}
      ${al.length ? `<span class="c-alias">${esc(al.join(" · "))}</span>` : ""}
      <span class="c-fac"><i></i>${esc(f ? f.v : "Sin facción")}</span>
      <span class="c-meta">${esc(p.nac)} · ${esc(booksLine(p))}</span>
    </button>`;
  }).join("");
}
listEl.addEventListener("click", e => { const c = e.target.closest(".card"); if (c) openFicha(c.dataset.id); });

// ---------- ficha
const ficha = document.getElementById("ficha"), fBody = document.getElementById("fBody");
document.getElementById("fClose").addEventListener("click", closeFicha);
document.addEventListener("keydown", e => { if (e.key === "Escape" && !ficha.hidden && !dlg.open) closeFicha(); });
function closeFicha() { ficha.hidden = true; openId = null; document.body.classList.remove("has-ficha"); setUrl(); highlight(null); }
function openFicha(id) {
  const p = byId[id]; if (!p || !isVisible(p)) return;
  openId = id; ficha.hidden = false; document.body.classList.add("has-ficha");
  const f = curF(p), al = aliasNow(p);
  const hist = p.f.filter(x => inc(x.b)).sort((a, b) => ord(a.b) - ord(b.b));
  const books = [...new Set([...p.libros, ...Object.keys(p.fichas).map(Number), ...p.ev.map(e => e.b)])].filter(inc).sort((a, b) => ord(a) - ord(b));
  const timeline = books.map(b => {
    const txt = p.fichas[b] || p.fichas[String(b)];
    const evs = p.ev.filter(e => e.b === b);
    if (!txt && !evs.length) return "";
    return `<li><h4>${esc(bookName(b))}</h4>${txt ? `<p>${esc(txt)}</p>` : ""}${evs.length ? `<ul class="ev">${evs.map(e => `<li>${esc(e.t)}</li>`).join("")}</ul>` : ""}</li>`;
  }).join("");
  const rels = relsNow(id);
  const groups = {};
  rels.forEach(r => (groups[r.lab] = groups[r.lab] || []).push(r));
  const labOrder = [...new Set(REL_ORDER.flatMap(t => REL[t]))];
  const relHtml = Object.keys(groups).sort((a, b) => labOrder.indexOf(a) - labOrder.indexOf(b)).map(lab =>
    `<div class="rg"><h4>${esc(lab)}</h4><ul>${groups[lab].map(r => {
      const o = byId[r.o], of = curF(o);
      const ended = r.h != null && level >= r.h && r.h !== 0;
      return `<li><button type="button" class="rlink" data-id="${o.id}" style="--c:${COLOR[of ? of.c : "reinos"]}"><i></i>${esc(o.n)}</button>${r.d ? ` <span class="rd">${esc(r.d)}</span>` : ""}${ended ? ` <span class="rd">(hasta el libro ${r.h})</span>` : ""}</li>`;
    }).join("")}</ul></div>`).join("");
  fBody.innerHTML = `
    <p class="f-cat" style="--c:${COLOR[f ? f.c : "reinos"]}"><i></i>${esc(f ? catLabel[f.c] : "Sin facción")}</p>
    <h2 id="fNombre" class="tj-title">${esc(p.n)}</h2>
    ${p.en && p.en !== p.n ? `<p class="tj-muted f-en">${esc(p.en)}</p>` : ""}
    ${al.length ? `<p class="f-alias"><b>También:</b> ${esc(al.join(" · "))}</p>` : ""}
    <dl class="f-dl">
      <dt>Facción</dt><dd>${hist.length ? hist.map(x => `${esc(x.v)} <span class="tj-muted">(${x.b === 0 ? "NP" : "libro " + x.b})</span>`).join("<br>") : "—"}</dd>
      <dt>Origen</dt><dd>${esc(p.nac)}</dd>
      <dt>Estado</dt><dd>${isDead(p) ? `Muere en ${esc(bookName(p.muerte))}` : `Vivo al final de ${esc(bookName(level))}`}</dd>
      <dt>Aparece</dt><dd>${esc(booksLine(p))}</dd>
    </dl>
    ${timeline ? `<h3>Por libro</h3><ol class="tl">${timeline}</ol>` : ""}
    <h3>Relaciones <span class="tj-muted">(${rels.length})</span></h3>
    ${relHtml || `<p class="tj-muted">Sin relaciones registradas hasta este libro.</p>`}
    ${p.src ? `<p class="src">Fuente: <a href="${esc(p.src)}" target="_blank" rel="noopener">A Wheel of Time Wiki</a>. Atención: la página de origen contiene spoilers de toda la saga.</p>` : ""}`;
  fBody.querySelectorAll(".rlink").forEach(b => b.addEventListener("click", () => openFicha(b.dataset.id)));
  ficha.scrollTop = 0; ficha.focus({ preventScroll: true });
  setUrl(); highlight(id);
}
function setUrl() {
  const u = new URL(location.href);
  if (openId) u.searchParams.set("p", openId); else u.searchParams.delete("p");
  u.searchParams.delete("libro");
  history.replaceState(null, "", u);
}

// ---------- red
const svgEl = document.getElementById("graph");
const legendEl = document.getElementById("legend");
let sim = null, nodeSel = null, linkSel = null, labelSel = null;
const pos = {};
function renderGraph(list) {
  if (!window.d3) { svgEl.outerHTML = `<div class="tj-state tj-state--error">No se ha podido cargar la librería de la red. Usa la lista.</div>`; return; }
  const d3 = window.d3, svg = d3.select(svgEl);
  svg.selectAll("*").remove();
  const ids = new Set(list.map(p => p.id));
  const nodes = list.map(p => { const o = pos[p.id] || {}; const f = curF(p); return { id: p.id, n: p.n, c: f ? f.c : "reinos", dead: isDead(p), x: o.x, y: o.y }; });
  const seen = new Set(), links = [];
  list.forEach(p => relsNow(p.id).forEach(r => {
    if (!ids.has(r.o)) return; const k = [p.id, r.o].sort().join("|"); if (seen.has(k)) return; seen.add(k);
    links.push({ source: p.id, target: r.o, t: r.t });
  }));
  const deg = {}; links.forEach(l => { deg[l.source] = (deg[l.source] || 0) + 1; deg[l.target] = (deg[l.target] || 0) + 1; });
  nodes.forEach(n => n.r = 4 + Math.min(12, Math.sqrt(deg[n.id] || 0) * 2.2));
  const present = [...new Set(nodes.map(n => n.c))];
  legendEl.innerHTML = CATS.filter(c => present.includes(c.id)).map(c => `<span><i style="background:${COLOR[c.id]}"></i>${esc(c.l)}</span>`).join("");
  const { width, height } = svgEl.getBoundingClientRect();
  const root = svg.append("g");
  svg.call(d3.zoom().scaleExtent([.2, 5]).on("zoom", e => root.attr("transform", e.transform)));
  linkSel = root.append("g").attr("class", "links").selectAll("line").data(links).join("line")
    .attr("class", d => "l-" + d.t);
  nodeSel = root.append("g").selectAll("circle").data(nodes).join("circle")
    .attr("r", d => d.r).attr("fill", d => COLOR[d.c]).attr("class", d => d.dead ? "dead" : "")
    .on("click", (e, d) => { e.stopPropagation(); openFicha(d.id); })
    .call(d3.drag().on("start", (e, d) => { if (!e.active) sim.alphaTarget(.2).restart(); d.fx = d.x; d.fy = d.y; })
      .on("drag", (e, d) => { d.fx = e.x; d.fy = e.y; })
      .on("end", (e, d) => { if (!e.active) sim.alphaTarget(0); d.fx = null; d.fy = null; }));
  nodeSel.append("title").text(d => d.n);
  const big = nodes.length <= 60 ? 0 : nodes.length > 150 ? 6 : 3;
  labelSel = root.append("g").attr("class", "labels").selectAll("text").data(nodes).join("text")
    .text(d => d.n.split(" ")[0] === "El" || d.n.length < 14 ? d.n : d.n.split(" ").slice(0, 2).join(" "))
    .attr("class", d => (deg[d.id] || 0) >= big ? "" : "minor").attr("dy", d => d.r + 12);
  if (sim) sim.stop();
  sim = d3.forceSimulation(nodes)
    .force("link", d3.forceLink(links).id(d => d.id).distance(60).strength(.25))
    .force("charge", d3.forceManyBody().strength(nodes.length > 150 ? -90 : -180))
    .force("collide", d3.forceCollide(d => d.r + 6))
    .force("x", d3.forceX(width / 2).strength(.05)).force("y", d3.forceY(height / 2).strength(.07))
    .on("tick", () => {
      linkSel.attr("x1", d => d.source.x).attr("y1", d => d.source.y).attr("x2", d => d.target.x).attr("y2", d => d.target.y);
      nodeSel.attr("cx", d => d.x).attr("cy", d => d.y);
      labelSel.attr("x", d => d.x).attr("y", d => d.y);
      nodes.forEach(n => pos[n.id] = { x: n.x, y: n.y });
    });
  svg.on("click", () => closeFicha());
  highlight(openId);
}
function highlight(id) {
  if (!nodeSel) return;
  if (!id) { nodeSel.classed("dim", false).classed("sel", false); linkSel.classed("dim", false).classed("hot", false); labelSel.classed("dim", false).classed("show", false); return; }
  const nb = new Set([id]);
  linkSel.each(l => { if (l.source.id === id) nb.add(l.target.id); if (l.target.id === id) nb.add(l.source.id); });
  nodeSel.classed("dim", d => !nb.has(d.id)).classed("sel", d => d.id === id);
  labelSel.classed("dim", d => !nb.has(d.id)).classed("show", d => nb.has(d.id));
  linkSel.classed("dim", l => l.source.id !== id && l.target.id !== id).classed("hot", l => l.source.id === id || l.target.id === id);
}

// ---------- vistas
document.querySelectorAll(".tab").forEach(t => t.addEventListener("click", () => {
  view = t.dataset.view;
  document.querySelectorAll(".tab").forEach(x => x.setAttribute("aria-pressed", x === t ? "true" : "false"));
  renderView();
}));
let lastVis = [];
function renderView() {
  const list = filtered(lastVis);
  countEl.textContent = `${list.length} de ${lastVis.length} personajes conocidos hasta ${bookName(level)}${np ? " (con Nueva Primavera)" : ""}.`;
  document.getElementById("vLista").hidden = view !== "lista";
  document.getElementById("vRed").hidden = view !== "red";
  if (view === "lista") renderList(list); else renderGraph(list);
}
function render() {
  paintBooks();
  lastVis = PEOPLE.filter(isVisible);
  refreshFilters(lastVis);
  renderView();
  if (openId) { if (isVisible(byId[openId])) openFicha(openId); else closeFicha(); }
}

// ---------- arranque: aviso de spoilers antes de mostrar nada
const params = new URLSearchParams(location.search);
const want = +params.get("libro");
const wantP = params.get("p");
const ini = document.getElementById("inicio"), iLib = document.getElementById("iLibro"), iNp = document.getElementById("iNp");
for (let n = 1; n <= 14; n++) iLib.add(new Option(bookName(n), n));
iLib.value = String(want >= 1 && want <= 14 ? want : level);
iNp.checked = np;
document.body.classList.add("gated");
const enter = () => {
  level = +iLib.value || 1; np = iNp.checked; save();
  document.body.classList.remove("gated");
  render();
  if (wantP && byId[wantP] && isVisible(byId[wantP])) openFicha(wantP);
};
ini.addEventListener("cancel", e => e.preventDefault()); // no se cierra con Escape sin elegir
ini.addEventListener("close", () => {
  if (ini.returnValue === "si") enter(); else ini.showModal(); // Escape no salta el aviso
});
if (ini.showModal) ini.showModal(); else enter();
})();
