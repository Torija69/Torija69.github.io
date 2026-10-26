(() => {
  const CLAVE = "torija-repaso-permisob-v1";
  const MAX = 3; // acertada 3 veces seguidas = dominada
  const $ = (s) => document.querySelector(s);
  const esc = (t) => String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const grupo = (id) => GRUPOS.find((g) => g.id === id) || { nombre: id };
  const tipo = (id) => TIPOS.find((t) => t.id === id) || { nombre: id };

  let estado = cargar();
  let filtroGrupo = "todos";
  let filtroTipo = "todos";
  let actual = null;
  let girada = false;
  let sesion = { vistas: 0, sabidas: 0 };
  let repasarIgual = false;

  function cargar() {
    try {
      const d = JSON.parse(localStorage.getItem(CLAVE));
      if (d && typeof d === "object") return { cajas: d.cajas || {}, extras: d.extras || [], resultados: d.resultados || [] };
    } catch (e) { /* datos corruptos: empezar de cero */ }
    return { cajas: {}, extras: [], resultados: [] };
  }
  function guardar() { localStorage.setItem(CLAVE, JSON.stringify(estado)); }
  const errores = () => [...ERRORES_BASE, ...estado.extras];
  const caja = (id) => estado.cajas[id] || 0;
  const resultados = () => {
    const m = new Map(RESULTADOS_BASE.map((r) => [r.test, r.fallos]));
    estado.resultados.forEach((r) => m.set(r.test, r.fallos));
    return [...m].map(([test, fallos]) => ({ test, fallos })).sort((a, b) => a.test - b.test);
  };
  const cajasHTML = (n) => `<span class="cajas" title="Aciertos seguidos (3 = dominada)" aria-label="Aciertos seguidos: ${n} de ${MAX}">${Array.from({ length: MAX }, (_, i) => `<i class="${i < n ? "on" : ""}"></i>`).join("")}</span>`;

  /* ---------- Navegación ---------- */
  document.querySelectorAll(".tab").forEach((b) => b.addEventListener("click", () => mostrar(b.dataset.vista)));
  function mostrar(v) {
    document.querySelectorAll(".tab").forEach((b) => { if (b.dataset.vista === v) b.setAttribute("aria-current", "page"); else b.removeAttribute("aria-current"); });
    document.querySelectorAll(".vista").forEach((s) => (s.hidden = s.id !== `v-${v}`));
    if (v === "repasar") pintarRepaso();
    if (v === "errores") pintarLista();
    if (v === "progreso") pintarProgreso();
    history.replaceState(null, "", `#${v}`);
    window.scrollTo(0, 0);
  }

  /* ---------- Repaso ---------- */
  function filtrosRepaso() {
    const cont = $("#filtros-repaso");
    const opciones = [{ id: "todos", nombre: "Todos" }, ...GRUPOS];
    cont.innerHTML = opciones.map((g) => {
      const n = g.id === "todos" ? errores().length : errores().filter((e) => e.grupo === g.id).length;
      return n ? `<button type="button" class="tj-filter" data-g="${g.id}" aria-pressed="${filtroGrupo === g.id}">${esc(g.nombre)} (${n})</button>` : "";
    }).join("");
    cont.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => {
      filtroGrupo = b.dataset.g; actual = null; repasarIgual = false; pintarRepaso();
    }));
  }
  function mazo() { return errores().filter((e) => filtroGrupo === "todos" || e.grupo === filtroGrupo); }
  function siguiente() {
    const m = mazo();
    let candidatas = repasarIgual ? m : m.filter((e) => caja(e.id) < MAX);
    if (!candidatas.length) return null;
    const min = Math.min(...candidatas.map((e) => caja(e.id)));
    let peores = candidatas.filter((e) => caja(e.id) === min);
    if (peores.length > 1 && actual) peores = peores.filter((e) => e.id !== actual.id);
    else if (peores.length === 1 && actual && peores[0].id === actual.id && candidatas.length > 1) peores = candidatas.filter((e) => e.id !== actual.id);
    return peores[Math.floor(Math.random() * peores.length)];
  }
  function pintarRepaso() {
    filtrosRepaso();
    const m = mazo();
    const dom = m.filter((e) => caja(e.id) >= MAX).length;
    $("#repaso-estado").innerHTML = `<span><strong>${dom}</strong> de ${m.length} dominadas</span><span>Esta sesión: <strong>${sesion.sabidas}</strong> sabidas de ${sesion.vistas}</span>`;
    if (!actual) { actual = siguiente(); girada = false; }
    const t = $("#tarjeta");
    if (!actual) {
      t.innerHTML = `<div class="tj-state tj-state--success"><h2>Grupo dominado</h2><p>Todas las tarjetas de este grupo se han acertado ${MAX} veces seguidas. Conviene repasarlas de vez en cuando antes del examen.</p><button type="button" class="tj-button" id="igual">Repasar igualmente</button></div>`;
      $("#igual").addEventListener("click", () => { repasarIgual = true; pintarRepaso(); });
      return;
    }
    const e = actual;
    t.innerHTML = `
      <div class="meta"><span class="chip chip--osc">Test ${e.test} · Pregunta ${e.q}</span><span class="chip">${esc(grupo(e.grupo).nombre)}</span><span class="chip">${esc(tipo(e.tipo).nombre)}</span>${cajasHTML(caja(e.id))}</div>
      <h2 class="pregunta">${esc(e.pregunta)}</h2>
      ${girada ? `
        <div class="reverso">
          <dl>
            <div class="fila mal"><dt>Marcó</dt><dd>${esc(e.marcaste)}</dd></div>
            <div class="fila bien"><dt>Correcta</dt><dd>${esc(e.correcta)}</dd></div>
            <div class="fila"><dt>Regla</dt><dd>${esc(e.regla)}</dd></div>
          </dl>
          ${e.truco ? `<p class="truco">${esc(e.truco)}</p>` : ""}
        </div>
        <div class="acciones">
          <button type="button" class="tj-button" id="sabe">La sabía</button>
          <button type="button" class="tj-button tj-button--secondary" id="nosabe">Todavía no</button>
          ${e.enlace ? `<a class="enlace" href="${esc(e.enlace)}" target="_blank" rel="noopener">Ver el test ${e.test} en TodoTest</a>` : ""}
        </div>` : `
        <p class="pista">Piensa la respuesta y por qué es así. Después gira la tarjeta.</p>
        <div class="acciones"><button type="button" class="tj-button" id="girar">Ver la respuesta</button></div>`}
    `;
    if (!girada) $("#girar").addEventListener("click", () => { girada = true; pintarRepaso(); $("#sabe").focus(); });
    else {
      $("#sabe").addEventListener("click", () => responder(true));
      $("#nosabe").addEventListener("click", () => responder(false));
    }
  }
  function responder(sabe) {
    const id = actual.id;
    estado.cajas[id] = sabe ? Math.min(MAX, caja(id) + 1) : 0;
    sesion.vistas++; if (sabe) sesion.sabidas++;
    guardar();
    const prev = actual;
    actual = siguiente(); girada = false;
    if (!actual && repasarIgual) actual = prev;
    pintarRepaso();
    const g = $("#girar") || $("#igual"); if (g) g.focus();
  }

  /* ---------- Lista ---------- */
  function pintarLista() {
    const f = $("#filtros-tipo");
    f.innerHTML = [{ id: "todos", nombre: "Todos los tipos" }, ...TIPOS].map((t) =>
      `<button type="button" class="tj-filter" data-t="${t.id}" aria-pressed="${filtroTipo === t.id}" ${t.ayuda ? `title="${esc(t.ayuda)}"` : ""}>${esc(t.nombre)}</button>`).join("");
    f.querySelectorAll("button").forEach((b) => b.addEventListener("click", () => { filtroTipo = b.dataset.t; pintarLista(); }));
    const lista = errores().filter((e) => filtroTipo === "todos" || e.tipo === filtroTipo);
    const ayuda = filtroTipo !== "todos" ? `<p class="tj-muted peq">${esc(tipo(filtroTipo).ayuda)}</p>` : "";
    if (!lista.length) { $("#lista-errores").innerHTML = ayuda + `<div class="tj-state tj-state--empty grupo">No hay errores de este tipo.</div>`; return; }
    $("#lista-errores").innerHTML = ayuda + GRUPOS.map((g) => {
      const items = lista.filter((e) => e.grupo === g.id).sort((a, b) => a.test - b.test || a.q - b.q);
      if (!items.length) return "";
      return `<section class="grupo"><div class="grupo-cab"><h2>${esc(g.nombre)}</h2><span class="tj-muted peq">${items.length} ${items.length === 1 ? "error" : "errores"}${g.prioridad ? " · prioridad, se repite en varios tests" : ""}</span></div>
        <div class="items">${items.map((e) => `
          <article class="tj-card item">
            <div class="meta"><span class="chip chip--osc">T${e.test} · P${e.q}</span><span class="chip">${esc(tipo(e.tipo).nombre)}</span>${cajasHTML(caja(e.id))}</div>
            <h3>${esc(e.pregunta)}</h3>
            <p class="correcta"><strong>Correcta:</strong> ${esc(e.correcta)}</p>
            ${e.truco ? `<p class="truco">${esc(e.truco)}</p>` : ""}
            <details><summary>Qué marcó y la regla</summary><p><strong>Marcó:</strong> ${esc(e.marcaste)}</p><p>${esc(e.regla)}</p>
            ${e.enlace ? `<a class="enlace" href="${esc(e.enlace)}" target="_blank" rel="noopener">Test ${e.test} en TodoTest</a>` : ""}
            ${e.base ? "" : `<p><button type="button" class="borrar" data-id="${esc(e.id)}">Eliminar este fallo</button></p>`}</details>
          </article>`).join("")}</div></section>`;
    }).join("");
    document.querySelectorAll(".borrar").forEach((b) => b.addEventListener("click", () => {
      if (!confirm("¿Eliminar este fallo añadido?")) return;
      estado.extras = estado.extras.filter((e) => e.id !== b.dataset.id); delete estado.cajas[b.dataset.id]; guardar(); pintarLista();
    }));
  }

  /* ---------- Progreso ---------- */
  function pintarProgreso() {
    const r = resultados();
    const media = r.reduce((s, x) => s + x.fallos, 0) / (r.length || 1);
    const aprob = r.filter((x) => x.fallos <= 3).length;
    const todos = errores();
    const dom = todos.filter((e) => caja(e.id) >= MAX).length;
    const fmt = (n) => n.toLocaleString("es-ES", { maximumFractionDigits: 1 });
    $("#resumen").innerHTML = `
      <div class="dato-res"><b>${r.length}</b><span>tests registrados</span></div>
      <div class="dato-res"><b>${fmt(media)}</b><span>fallos de media</span></div>
      <div class="dato-res"><b>${aprob} de ${r.length}</b><span>aprobados (3 fallos o menos)</span></div>
      <div class="dato-res"><b>${dom} de ${todos.length}</b><span>errores dominados</span></div>`;
    const max = Math.max(10, ...r.map((x) => x.fallos));
    const g = $("#graf-tests");
    g.setAttribute("aria-label", "Fallos por test: " + r.map((x) => `test ${x.test}, ${x.fallos}`).join("; "));
    g.innerHTML = `<div class="objetivo" style="bottom:${(3 / max) * 150}px"></div>` +
      r.map((x) => `<div class="col"><span class="v">${x.fallos}</span><div class="b ${x.fallos <= 3 ? "ok" : ""}" style="height:${(x.fallos / max) * 150}px"></div></div>`).join("");
    let ejes = g.nextElementSibling;
    if (!ejes || !ejes.classList.contains("ejes")) { ejes = document.createElement("div"); ejes.className = "ejes"; ejes.setAttribute("aria-hidden", "true"); g.after(ejes); }
    ejes.innerHTML = r.map((x) => `<span>T${x.test}</span>`).join("");

    const barra = (nombre, total, d, maxT) => `<div class="hbar"><div class="lab"><span>${esc(nombre)}</span><span>${d} / ${total}</span></div>
      <div class="pista-b" aria-hidden="true"><div class="dom" style="width:${(d / maxT) * 100}%"></div><div class="rel" style="width:${((total - d) / maxT) * 100}%"></div></div></div>`;
    const porG = GRUPOS.map((x) => { const it = todos.filter((e) => e.grupo === x.id); return { n: x.nombre, t: it.length, d: it.filter((e) => caja(e.id) >= MAX).length }; }).filter((x) => x.t).sort((a, b) => b.t - a.t);
    const mG = Math.max(...porG.map((x) => x.t));
    $("#graf-grupos").innerHTML = porG.map((x) => barra(x.n, x.t, x.d, mG)).join("");
    const porT = TIPOS.map((x) => { const it = todos.filter((e) => e.tipo === x.id); return { n: x.nombre, t: it.length, d: it.filter((e) => caja(e.id) >= MAX).length }; }).sort((a, b) => b.t - a.t);
    const mT = Math.max(1, ...porT.map((x) => x.t));
    $("#graf-tipos").innerHTML = porT.map((x) => barra(x.n, x.t, x.d, mT)).join("");
  }

  $("#exportar").addEventListener("click", () => {
    const blob = new Blob([JSON.stringify(estado, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = `repaso-permiso-b-${new Date().toISOString().slice(0, 10)}.json`; a.click();
    URL.revokeObjectURL(a.href);
    $("#copia-estado").textContent = "Copia exportada.";
  });
  $("#importar").addEventListener("change", async (ev) => {
    const f = ev.target.files[0]; if (!f) return;
    try {
      const d = JSON.parse(await f.text());
      if (!d || typeof d.cajas !== "object" || !Array.isArray(d.extras)) throw new Error();
      estado = { cajas: d.cajas, extras: d.extras, resultados: d.resultados || [] }; guardar(); actual = null;
      $("#copia-estado").className = "peq ok-campo"; $("#copia-estado").textContent = "Copia importada correctamente.";
      pintarProgreso();
    } catch { $("#copia-estado").className = "peq error-campo"; $("#copia-estado").textContent = "El archivo no es una copia válida de esta app."; }
    ev.target.value = "";
  });
  $("#reiniciar").addEventListener("click", () => {
    if (!confirm("¿Reiniciar el repaso? Se borra lo aprendido, pero se conservan los fallos y resultados añadidos.")) return;
    estado.cajas = {}; guardar(); actual = null; sesion = { vistas: 0, sabidas: 0 }; pintarProgreso();
    $("#copia-estado").className = "peq ok-campo"; $("#copia-estado").textContent = "Repaso reiniciado.";
  });

  /* ---------- Añadir ---------- */
  $("#e-grupo").innerHTML = GRUPOS.map((g) => `<option value="${g.id}">${esc(g.nombre)}</option>`).join("");
  $("#e-tipo").innerHTML = TIPOS.map((t) => `<option value="${t.id}">${esc(t.nombre)}</option>`).join("");

  function validar(form, errEl) {
    let ok = true;
    form.querySelectorAll("[required]").forEach((c) => {
      const malo = !c.value.trim() || (c.type === "number" && !c.checkValidity());
      c.setAttribute("aria-invalid", malo ? "true" : "false"); if (malo) ok = false;
    });
    errEl.textContent = ok ? "" : "Revisa los campos marcados: faltan datos o hay un número fuera de rango.";
    return ok;
  }
  $("#form-resultado").addEventListener("submit", (ev) => {
    ev.preventDefault(); $("#r-ok").textContent = "";
    if (!validar(ev.target, $("#r-error"))) return;
    const test = +$("#r-test").value, fallos = +$("#r-fallos").value;
    estado.resultados = estado.resultados.filter((r) => r.test !== test).concat({ test, fallos }); guardar();
    $("#r-ok").textContent = `Test ${test} guardado con ${fallos} fallos. ${fallos <= 3 ? "Aprobado." : "Suspendido."}`;
    $("#e-test").value = test; ev.target.reset();
  });
  $("#form-error").addEventListener("submit", (ev) => {
    ev.preventDefault(); $("#e-ok").textContent = "";
    if (!validar(ev.target, $("#e-error"))) return;
    const test = +$("#e-test").value, q = +$("#e-q").value, id = `t${test}-p${q}`;
    if (errores().some((e) => e.id === id)) { $("#e-error").textContent = `Ya existe un fallo para el test ${test}, pregunta ${q}.`; $("#e-q").setAttribute("aria-invalid", "true"); return; }
    const v = (s) => $(s).value.trim();
    estado.extras.push({ id, test, q, grupo: v("#e-grupo"), tipo: v("#e-tipo"), pregunta: v("#e-pregunta"), marcaste: v("#e-marcaste"), correcta: v("#e-correcta"), regla: v("#e-regla"), truco: v("#e-truco"), enlace: `https://www.todotest.com/tests/test.asp?tip=3&t=${test}` });
    guardar();
    $("#e-ok").textContent = `Fallo T${test} · P${q} añadido a «${grupo(v("#e-grupo")).nombre}». Saldrá pronto en el repaso.`;
    ["#e-q", "#e-pregunta", "#e-marcaste", "#e-correcta", "#e-regla", "#e-truco"].forEach((s) => ($(s).value = ""));
    $("#e-q").focus();
  });

  const inicio = location.hash.slice(1);
  mostrar(["repasar", "errores", "progreso", "anadir"].includes(inicio) ? inicio : "repasar");
})();
