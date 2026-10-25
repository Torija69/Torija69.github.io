(function(){
const { SRC, COLOR_LINES, NAMED_TRAINS, VEHICLES, PORTALS, KNOWN, JOURNEY } = window.DCC;
const $ = (s) => document.querySelector(s);
const esc0 = (s) => String(s ?? "").replace(/[&<>"]/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" }[c]));
// Personajes del mapa principal (ids de ../data.js) que aparecen en los textos: se enlazan a su ficha.
const PJ = [["Princess Donut","donut"],["Donut","donut"],["Katia Grim","katia"],["Katia","katia"],["Mordecai","mordecai"],["Mongo","mongo"],
  ["Imani","imani"],["Elle","elle"],["Li Jun","lijun"],["Daniel Bautista","bautista"],["Bautista","bautista"],["Prepotente","prepotente"],
  ["Miriam Dom","miriam"],["Tserendolgor","ren"],["Frank Q","frank"],["Hekla","hekla"],["Eva","eva"],["Quan","quan"],["Agatha","agatha"],
  ["Bomo","bomo"],["Sledge","sledge"],["Zev","zev"],["Loita","loita"],["Chaco","chaco"],["Bea","bea"],["Maestro","maestro"]];
const PJ_RE = new RegExp("(?<![\\p{L}])(" + PJ.map((p) => p[0]).join("|") + ")(?![\\p{L}])", "gu");
const PJ_ID = Object.fromEntries(PJ);
const esc = (s) => esc0(s).replace(PJ_RE, (m) => `<a class="pj" href="../index.html?libro=3&p=${PJ_ID[m]}" title="Ver la ficha de ${m} en el mapa">${m}</a>`);
const srcLink = (k, label) => `<a class="src" href="${SRC[k]}" target="_blank" rel="noopener">${label || srcName(k)}</a>`;
function srcName(k) {
  return { floor: "Wiki: Fourth Floor", untangle: "Wiki: Untangling the Iron Tangle", book: "Wiki: resumen por capítulos",
    reddit: "Análisis en r/DungeonCrawlerCarl", nightmare: "Wiki: Nightmare Express", vermillion: "Wiki: Vermillion Line Rescue",
    cookbook: "The Crawler's Cookbook", recap: "Mana Toast: resumen del libro 3", tizquick: "DCC Database: Tizquick",
    abyss: "DCC Database: Abyss Station", ch21: "Storiluna: capítulo 21" }[k] || k;
}

/* ---------- Stats ---------- */
const stats = [
  ["436", "estaciones por línea (10 = patio, 436 = Abismo)"],
  ["5", "escaleras oficiales: 12, 24, 36, 48, 72"],
  ["3 días", "recorrido completo de una línea de color"],
  ["90 min", "vuelta del Nightmare Express"],
  ["10 días", "hasta el colapso del piso"],
  [String(COLOR_LINES.length), "líneas de colores con nombre conocido"],
];
$("#stats").innerHTML = stats.map(([v, l]) => `<div class="stat"><div class="stat-v">${v}</div><div class="stat-l">${l}</div></div>`).join("");

/* ---------- Target diagram ---------- */
(function drawTarget() {
  const svg = $("#target"); const c = 220;
  const rings = [
    { r: 205, label: "10 · Patios de trenes (A–Q)", cls: "r-yard" },
    { r: 178, label: "12–72 · Escaleras", cls: "r-stairs" },
    { r: 152, label: "60 · Estación de empleados", cls: "r-emp" },
    { r: 132, label: "75 · Crash Interdiction", cls: "r-75" },
    { r: 100, label: "81–432 · Tramo largo", cls: "r-mid" },
    { r: 62, label: "433 Mimic · 434 · 435 Fin", cls: "r-end" },
    { r: 30, label: "436 Abismo", cls: "r-abyss" },
  ];
  let h = "";
  rings.forEach((g) => { h += `<circle cx="${c}" cy="${c}" r="${g.r}" class="ring ${g.cls}"/>`; });
  // tangled noodles
  const cols = ["#e0313f", "#f2c81b", "#5a4fd0", "#2fa457", "#c99ad6", "#e8432f", "#2f8cff", "#cc7a22"];
  cols.forEach((col, i) => {
    const a = (i / cols.length) * Math.PI * 2 + 0.3;
    const x0 = c + Math.cos(a) * 205, y0 = c + Math.sin(a) * 205;
    const a1 = a + 1.1, a2 = a - 0.7;
    const x1 = c + Math.cos(a1) * 150, y1 = c + Math.sin(a1) * 150;
    const x2 = c + Math.cos(a2) * 90, y2 = c + Math.sin(a2) * 90;
    const x3 = c + Math.cos(a + 0.4) * 32, y3 = c + Math.sin(a + 0.4) * 32;
    h += `<path d="M${x0},${y0} C${x1},${y1} ${x2},${y2} ${x3},${y3}" stroke="${col}" class="noodle"/>`;
  });
  // figure-eight Nightmare
  h += `<path class="nightmare" d="M${c - 120},${c} C${c - 120},${c - 70} ${c - 10},${c - 70} ${c},${c} C${c + 10},${c + 70} ${c + 120},${c + 70} ${c + 120},${c} C${c + 120},${c - 70} ${c + 10},${c - 70} ${c},${c} C${c - 10},${c + 70} ${c - 120},${c + 70} ${c - 120},${c}Z"/>`;
  // labels on right side
  rings.forEach((g, i) => {
    const y = c - g.r + 13;
    h += `<text x="${c}" y="${y}" class="ring-label" text-anchor="middle">${g.label}</text>`;
  });
  h += `<text x="${c + 122}" y="${c + 4}" class="nm-label">Nightmare (∞)</text>`;
  svg.innerHTML = h;
})();

/* ---------- Station classification ---------- */
const STAIRS = new Set([12, 24, 36, 48, 72]);
const isPrime = (n) => { if (n < 2) return false; for (let i = 2; i * i <= n; i++) if (n % i === 0) return false; return true; };

const TYPES = {
  yard: { label: "Patio de trenes", cls: "t-yard" },
  stairs: { label: "Escalera", cls: "t-stairs" },
  transfer: { label: "Transbordo + sala segura", cls: "t-transfer" },
  cavern: { label: "Caverna de solo salida", cls: "t-cavern" },
  station: { label: "Estación con mobs", cls: "t-station" },
  near: { label: "Estación (tramo corto, sin datos)", cls: "t-near" },
  special: { label: "Especial", cls: "t-special" },
  abyss: { label: "Abismo", cls: "t-abyss" },
};

function classify(n) {
  if (n === 10) return "yard";
  if (n === 436) return "abyss";
  if ([50, 58, 60, 75, 433, 434, 435].includes(n) || n === 18) return "special";
  if (STAIRS.has(n)) return "stairs";
  if (isPrime(n) || n === 67) return "transfer";
  if (n % 5 === 0) return "cavern";
  if (n > 75) return "station";
  return "near";
}

function stationInfo(n) {
  const t = classify(n);
  const k = KNOWN[n] || {};
  const tags = []; let mobs = "", safe = false;
  if (t === "transfer") {
    safe = true; tags.push("Sala segura");
    if (n % 10 === 1) tags.push("Desperado Club");
    if (n % 10 === 9) tags.push("Club Vanquisher (iglesia)");
    mobs = "No: las estaciones de transbordo (números primos) no tienen mobs propios.";
  } else if (t === "cavern") {
    tags.push("Portal de vuelta", "Rev-Up Vitamin Shots");
    mobs = "Jefes de barrio: un Krakaren (fabrica la droga) y Pookas (reparten las dosis; atacados se vuelven cabras gigantes). Aquí bajan todos los mobs del tren.";
  } else if (t === "stairs") {
    tags.push("Escalera al piso siguiente", "Abre 6 h antes del colapso");
  } else if (t === "station") {
    mobs = "Sí: cada estación no prima y no acabada en 0/5 tras la 75 tiene su tipo de mob, que sube al tren hasta la siguiente caverna.";
  } else if (t === "near") {
    mobs = "Sin datos. Del 11 al 72 las estaciones están a una o dos manzanas de distancia.";
  } else if (t === "yard") {
    tags.push("Station 10", "Oficinas de los NPC");
  } else if (t === "abyss") {
    tags.push("Solo trenes con nombre y carros de reparación");
  }
  if (n === 11) tags.push("Suben revisor y mozos");
  if (n === 12) tags.push("Suben los conserjes Jikininki");
  if (n === 433) tags.push("Escalera oculta");
  if (k.mobs) mobs = k.mobs;
  if (k.nomobs) mobs = mobs || "No";
  return { n, t, k, tags, mobs, safe };
}

/* ---------- Legend & grid ---------- */
$("#legend").innerHTML = Object.entries(TYPES).map(([k, v]) => `<span class="lg"><i class="sw ${v.cls}"></i>${v.label}</span>`).join("") +
  `<span class="lg"><i class="sw known-sw"></i>Con datos del libro</span>`;

const grid = $("#grid");
let gh = "";
for (let n = 10; n <= 436; n++) {
  const t = classify(n);
  const known = KNOWN[n] ? " known" : "";
  gh += `<button class="cell ${TYPES[t].cls}${known}" data-n="${n}" role="option" aria-label="Estación ${n}: ${TYPES[t].label}">${n}</button>`;
}
grid.innerHTML = gh;

function showStation(n) {
  n = Math.max(10, Math.min(436, Number(n) || 83));
  const s = stationInfo(n);
  grid.querySelectorAll(".cell.sel").forEach((c) => c.classList.remove("sel"));
  const cell = grid.querySelector(`[data-n="${n}"]`);
  if (cell) cell.classList.add("sel");
  const linesHere = COLOR_LINES.filter((l) => l.stations.includes(n));
  const trainsHere = NAMED_TRAINS.filter((t) => t.route.some((r) => r.n === n));
  $("#detail").innerHTML = `
    <div class="d-num">${n}</div>
    <div class="d-type ${TYPES[s.t].cls}">${TYPES[s.t].label}</div>
    ${s.k.name ? `<h3 class="d-name">${esc(s.k.name)}</h3>` : ""}
    ${s.tags.length ? `<div class="chips">${s.tags.map((t) => `<span class="chip">${esc(t)}</span>`).join("")}</div>` : ""}
    ${s.k.info ? `<p>${esc(s.k.info)}</p>` : ""}
    ${s.mobs ? `<div class="d-row"><span>Monstruos</span><p>${esc(s.mobs)}</p></div>` : ""}
    ${s.k.lines ? `<div class="d-row"><span>Líneas</span><p>${esc(s.k.lines)}</p></div>` : ""}
    ${linesHere.length || trainsHere.length ? `<div class="d-lines">${linesHere.map((l) => `<span class="pill" style="--c:${l.hex}">${l.es}</span>`).join("")}${trainsHere.map((t) => `<span class="pill named-pill">${esc(t.name)}</span>`).join("")}</div>` : ""}
    <p class="d-src">${s.k.name || s.k.info || s.k.mobs ? srcLink("untangle") : "Tipo deducido por las reglas de numeración · " + srcLink("floor")}</p>`;
}
grid.addEventListener("click", (e) => { const b = e.target.closest(".cell"); if (b) { showStation(b.dataset.n); $("#stationInput").value = b.dataset.n; } });
$("#stationInput").addEventListener("input", (e) => { const v = Number(e.target.value); if (v >= 10 && v <= 436) { showStation(v); grid.querySelector(`[data-n="${v}"]`)?.scrollIntoView({ block: "nearest" }); } });
showStation(83);

$("#rules").innerHTML = [
  ["10", "Patio de trenes: se montan los trenes y suben los maquinistas."],
  ["11 · 12", "En la 11 suben revisor y mozos; en la 12, los conserjes Jikininki."],
  ["12, 24, 36, 48, 72", "Escaleras. Solo abren 6 horas antes del colapso. Todos los crawlers aparecen más allá de la 72, así que hay que volver hacia atrás."],
  ["Números primos", "Transbordo con sala segura. Si acaba en 1, Desperado Club; si acaba en 9, Club Vanquisher."],
  ["Acabadas en 0 o 5", "Cavernas de solo salida: los mobs bajan, reciben su Rev-Up Vitamin Shot y vuelven por portal. También tienen la montaña rusa al patio."],
  ["60 · 75", "60: pueblo de empleados (abandonado). 75: base de reparación y seguridad gnoll y hobgoblin."],
  ["433 · 434 · 435 · 436", "433: falso nudo (Station Mimic). 434: vacía. 435: fin de línea y portal de empleados (Kravyad). 436: Abismo."],
].map(([a, b]) => `<li><b>${a}</b><span>${b}</span></li>`).join("") + `<li class="rule-src">${srcLink("floor")} · ${srcLink("untangle")}</li>`;

/* ---------- Colored lines ---------- */
let lineFilter = "all";
$("#lineFilters").innerHTML = [["all", "Todas"], ["doc", "Con estaciones documentadas"], ["name", "Solo citadas por nombre"]]
  .map(([k, l]) => `<button class="fbtn${k === "all" ? " on" : ""}" data-f="${k}">${l}</button>`).join("");
$("#lineFilters").addEventListener("click", (e) => {
  const b = e.target.closest(".fbtn"); if (!b) return;
  lineFilter = b.dataset.f;
  document.querySelectorAll(".fbtn").forEach((x) => x.classList.toggle("on", x === b));
  renderLines();
});
function renderLines() {
  const list = COLOR_LINES.filter((l) => lineFilter === "all" || (lineFilter === "doc" ? l.stations.length || l.chapters !== "—" : !l.stations.length && l.chapters === "—"));
  $("#lines").innerHTML = list.map((l) => `
    <article class="line-card" style="--c:${l.hex}">
      <div class="line-bar"></div>
      <div class="line-body">
        <header><h3>Línea ${esc(l.es)}</h3><span class="en">${esc(l.en)}</span></header>
        ${l.stations.length ? `<div class="stops">${l.stations.map((s) => `<button class="stop" data-n="${s}">${s}</button>`).join("")}</div>` : ""}
        <p>${esc(l.notes)}</p>
        <dl>
          <div><dt>Monstruos</dt><dd>Sí${l.mobsSeen !== "—" ? ": " + esc(l.mobsSeen) : ""}</dd></div>
          ${l.chapters !== "—" ? `<div><dt>Capítulos</dt><dd>${esc(l.chapters)}</dd></div>` : ""}
        </dl>
        <p class="d-src">${srcLink(l.src)}</p>
      </div>
    </article>`).join("");
}
renderLines();
document.addEventListener("click", (e) => {
  const s = e.target.closest(".stop"); if (!s) return;
  showStation(s.dataset.n); $("#stationInput").value = s.dataset.n;
  document.getElementById("estaciones").scrollIntoView({ behavior: "smooth" });
});

/* ---------- Named trains ---------- */
$("#named").innerHTML = NAMED_TRAINS.map((t) => `
  <article class="named-card ${t.mobs.startsWith("no") ? "safe" : ""}">
    <header>
      <div><h3>${esc(t.name)}</h3><span class="kind">${esc(t.kind)}</span></div>
      <span class="mob-badge ${t.mobs.startsWith("no") ? "no" : t.mobs === "?" ? "unk" : "yes"}">${t.mobs.startsWith("no") ? "Sin monstruos" : t.mobs === "?" ? "Sin datos" : "Con monstruos"}</span>
    </header>
    <p>${esc(t.desc)}</p>
    ${t.route.length ? `<ol class="route">${t.route.map((r) => `<li><button class="stop" data-n="${r.n}">${r.n}</button><span>${esc(r.l)}</span></li>`).join("")}</ol>` : ""}
    <p class="crew"><b>A bordo:</b> ${esc(t.crew)}</p>
    <p class="d-src">${srcLink(t.src)}</p>
  </article>`).join("");

/* ---------- Consist ---------- */
const CARS = {
  1: { t: "Maquinista", d: "Mantauro, jefe de barrio. Su mapa muestra toda la línea y su llave solo sirve para su color. Solo sale si hay descarrilamiento.", cls: "car-eng" },
  5: { t: "Sala de descanso del revisor", d: "Revisor enano (como Vernon o Tizquick). Los monstruos no entran en este vagón: refugio seguro.", cls: "car-safe" },
  10: { t: "Equipaje de los mozos", d: "Grapple porters que reparten maletas de premio. Los mobs sí pueden irrumpir aquí.", cls: "car-port" },
  15: { t: "Conserjes Jikininki", d: "Janitor ghouls que suben en la 12. Los mobs también pueden entrar.", cls: "car-jan" },
};
$("#consist").innerHTML = Array.from({ length: 20 }, (_, i) => {
  const n = i + 1; const c = CARS[n];
  return `<button class="car ${c ? c.cls : "car-pax"}" data-car="${n}" aria-label="Vagón ${n}${c ? ": " + c.t : ": pasajeros"}"><span>${n}</span></button>`;
}).join("");
function showCar(n) {
  const c = CARS[n] || { t: "Vagón de pasajeros", d: "Lleva a los mobs entre su estación y la siguiente caverna acabada en 0 o 5. Si se pasan de parada entran en pánico y no pueden quedarse en el tren." };
  document.querySelectorAll(".car").forEach((x) => x.classList.toggle("sel", Number(x.dataset.car) === n));
  $("#carInfo").innerHTML = `<b>Vagón ${n} · ${c.t}.</b> ${c.d} ${srcLink("floor")}`;
}
$("#consist").addEventListener("click", (e) => { const b = e.target.closest(".car"); if (b) showCar(Number(b.dataset.car)); });
showCar(1);

$("#vehicles").innerHTML = VEHICLES.map((v) => `
  <article class="veh">
    <header><h3>${esc(v.name)}</h3><span class="tag">${esc(v.tag)}</span></header>
    <p>${esc(v.desc)}</p>
    <div class="veh-foot"><span class="mob-badge ${v.mobs === "no" ? "no" : "yes"}">${v.mobs === "no" ? "Sin monstruos" : v.mobs === "sí" ? "Con monstruos" : "Con " + esc(v.mobs)}</span>${srcLink(v.src)}</div>
  </article>`).join("");

/* ---------- Portals ---------- */
$("#portals").innerHTML = PORTALS.map((p, i) => `
  <article class="portal">
    <div class="p-idx">${String(i + 1).padStart(2, "0")}</div>
    <div>
      <h3>${esc(p.where)}</h3>
      <div class="p-flow"><span>Destino</span><b>${esc(p.to)}</b></div>
      <div class="p-flow"><span>Llave</span><b>${esc(p.key)}</b></div>
      <p>${esc(p.desc)}</p>
      <p class="d-src">${srcLink(p.src)}</p>
    </div>
  </article>`).join("");

/* ---------- Monsters ---------- */
$("#mobYes").innerHTML = [
  "<b>Todas las líneas de colores</b>: vagones de pasajeros con los mobs de cada estación, más conserjes Jikininki en el vagón 15. El personal no es hostil si no se le provoca.",
  "<b>Nightmare Express</b>: 38 vagones con monstruos gigantes que hay que cruzar.",
  "<b>Dismemberment Limited</b>: war mage Dismember y su ejército de fleshers.",
  "<b>Tren diésel sin nombre</b>: war mage orco con drill crabs.",
  "<b>Estaciones no primas y no acabadas en 0/5 tras la 75</b>: un tipo de mob distinto en cada una.",
  "<b>Cavernas (0/5)</b>: jefes Krakaren y Pooka.",
  "<b>Escaleras</b>: 12 Jikininki, 24 Krakaren Crotch Dumplings, 36 Wrath Ghouls, 48 Festering Ghouls, 72 Blister Ghouls.",
  "<b>433 Station Mimic</b>, <b>435 Kravyad</b> y <b>Patio E</b> con miles de Festering Ghouls.",
].map((x) => `<li>${x}</li>`).join("");
$("#mobNo").innerHTML = [
  "<b>Vagón 5</b> de cualquier línea de color: los monstruos no entran.",
  "<b>Homeward Bound</b>: solo empleados; no se ven mobs.",
  "<b>Escape Velocity</b>: nada indica que lleve war mages ni mobs.",
  "<b>Carros de reparación</b> de la estación 75.",
  "<b>Transbordos (números primos)</b>: sala segura y, a veces, tiendas, gremios o clubes.",
  "<b>18 y 434</b> (Barren Stations), <b>58</b> (sin mobs, algo raro) y <b>60</b> (abandonada).",
].map((x) => `<li>${x}</li>`).join("");
$("#cycle").innerHTML = [
  "El mob sube al tren en su estación.",
  "Baja en la siguiente estación acabada en 0 o 5 y recibe su Rev-Up Vitamin Shot del Pooka.",
  "Vuelve por el portal a su estación de origen y repite el ciclo.",
  "Si no consigue la droga (tren destruido, vía cortada, jefes muertos) sufre abstinencia y muta.",
  "Si muere suelta Krakaren Crotch Dumplings, que van a la 24. Si sobrevive se convierte en Wrath Ghoul (36) o Festering Ghoul (48).",
].map((x) => `<li>${x}</li>`).join("") ;
$("#cycle").insertAdjacentHTML("afterend", `<p class="d-src">${srcLink("reddit")} · ${srcLink("floor")}</p>`);

/* ---------- Journey ---------- */
const lineColor = (id) => (COLOR_LINES.find((l) => l.id === id) || {}).hex || "#e9e4d8";
const lineName = (id) => id === "named" ? "Tren con nombre / empleados" : "Línea " + (COLOR_LINES.find((l) => l.id === id) || {}).es;
$("#journey").innerHTML = JOURNEY.map((j) => `
  <li style="--c:${lineColor(j.line)}">
    <span class="j-ch">Cap. ${j.ch}</span>
    <span class="j-line">${lineName(j.line)}</span>
    <span class="j-txt">${esc(j.txt)}</span>
  </li>`).join("") + `<li class="j-src">${srcLink("book")}</li>`;

/* ---------- Sources ---------- */
$("#sources").innerHTML = Object.keys(SRC).map((k) => `<li><a href="${SRC[k]}" target="_blank" rel="noopener">${srcName(k)}</a><span>${SRC[k].replace(/^https?:\/\//, "").slice(0, 70)}</span></li>`).join("");
})();
