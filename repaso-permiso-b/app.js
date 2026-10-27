(() => {
  const CLAVE_V1 = "torija-repaso-permisob-v1"; // progreso local de la v1.0.0 (se migra al entrar)
  const CLAVE_SESION = "torija-repaso-permisob-sesion";
  const MAX = 3; // acertada 3 veces seguidas = dominada
  const { url: SB, clave: APIKEY, esquema: ESQUEMA } = window.SUPABASE;
  const $ = (s) => document.querySelector(s);
  const esc = (t) => String(t ?? "").replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const grupo = (id) => GRUPOS.find((g) => g.id === id) || { nombre: id };
  const tipo = (id) => TIPOS.find((t) => t.id === id) || { nombre: id };

  let estado = { fallos: [], resultados: [], cajas: {} };
  let urlsImagen = {}; // id del fallo -> URL firmada (bucket privado permiso-b)
  const BUCKET = "permiso-b";
  let filtroGrupo = "todos";
  let filtroTipo = "todos";
  let actual = null;
  let girada = false;
  let sesion = { vistas: 0, sabidas: 0 };
  let repasarIgual = false;
  let vistaActual = "repasar";

  /* ---------- Sesión (Supabase Auth, sin dependencias) ---------- */
  let auth = leerSesion();
  function leerSesion() { try { return JSON.parse(localStorage.getItem(CLAVE_SESION)); } catch { return null; } }
  function guardarSesion(d) {
    auth = d ? { access_token: d.access_token, refresh_token: d.refresh_token, expires_at: d.expires_at || Math.floor(Date.now() / 1000) + (d.expires_in || 3600), user: { id: d.user.id, email: d.user.email } } : null;
    if (auth) localStorage.setItem(CLAVE_SESION, JSON.stringify(auth)); else localStorage.removeItem(CLAVE_SESION);
  }
  async function token(grant, body) {
    const r = await fetch(`${SB}/auth/v1/token?grant_type=${grant}`, { method: "POST", headers: { apikey: APIKEY, "Content-Type": "application/json" }, body: JSON.stringify(body) });
    const d = await r.json().catch(() => ({}));
    if (!r.ok) { const e = new Error(d.error_description || d.msg || "Error de acceso"); e.code = d.error_code || d.error; throw e; }
    guardarSesion(d); return d;
  }
  let renovando = null;
  async function renovar() {
    if (!auth?.refresh_token) throw new Error("sin sesión");
    renovando = renovando || token("refresh_token", { refresh_token: auth.refresh_token }).finally(() => { renovando = null; });
    return renovando;
  }
  async function api(ruta, { method = "GET", body, prefer } = {}, reintento = true) {
    if (auth && auth.expires_at - 60 < Date.now() / 1000) { try { await renovar(); } catch { return caducada(); } }
    const h = { apikey: APIKEY, Authorization: `Bearer ${auth?.access_token}`, "Accept-Profile": ESQUEMA, "Content-Profile": ESQUEMA };
    if (body !== undefined) h["Content-Type"] = "application/json";
    if (prefer) h.Prefer = prefer;
    const r = await fetch(`${SB}/rest/v1/${ruta}`, { method, headers: h, body: body === undefined ? undefined : JSON.stringify(body) });
    if (r.status === 401 && reintento) { try { await renovar(); return api(ruta, { method, body, prefer }, false); } catch { return caducada(); } }
    if (!r.ok) { const d = await r.json().catch(() => ({})); const e = new Error(d.message || r.statusText); e.code = d.code; e.status = r.status; throw e; }
    return r.status === 204 ? null : r.json().catch(() => null);
  }
  async function tokenVigente() {
    if (auth && auth.expires_at - 60 < Date.now() / 1000) { try { await renovar(); } catch { return caducada(); } }
    return auth.access_token;
  }
  async function storage(ruta, init = {}) {
    const t = await tokenVigente();
    const r = await fetch(`${SB}/storage/v1/${ruta}`, { ...init, headers: { apikey: APIKEY, Authorization: `Bearer ${t}`, ...(init.headers || {}) } });
    if (!r.ok) { const e = new Error(`storage ${r.status}`); e.status = r.status; throw e; }
    return r.json().catch(() => null);
  }
  async function firmarImagenes() {
    const conImagen = estado.fallos.filter((f) => f.imagen);
    if (!conImagen.length) { urlsImagen = {}; return; }
    try {
      const r = await storage(`object/sign/${BUCKET}`, { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ expiresIn: 21600, paths: conImagen.map((f) => f.imagen) }) });
      const porRuta = Object.fromEntries((r || []).filter((x) => x.signedURL && !x.error).map((x) => [x.path, `${SB}/storage/v1${x.signedURL}`]));
      urlsImagen = Object.fromEntries(conImagen.filter((f) => porRuta[f.imagen]).map((f) => [f.id, porRuta[f.imagen]]));
    } catch { urlsImagen = {}; }
  }
  // Reduce la foto a 1200 px como máximo y la convierte en JPEG antes de subirla.
  async function prepararFoto(file) {
    if (!/^image\//.test(file.type) && !/\.(jpe?g|png|webp|heic|heif)$/i.test(file.name)) throw new Error("tipo");
    const bmp = await createImageBitmap(file).catch(() => { throw new Error("leer"); });
    const k = Math.min(1, 1200 / Math.max(bmp.width, bmp.height));
    const c = document.createElement("canvas"); c.width = Math.round(bmp.width * k); c.height = Math.round(bmp.height * k);
    c.getContext("2d").drawImage(bmp, 0, 0, c.width, c.height);
    const blob = await new Promise((ok) => c.toBlob(ok, "image/jpeg", 0.85));
    if (!blob || blob.size > 2 * 1024 * 1024) throw new Error("grande");
    return blob;
  }
  const fotoHTML = (e, clase = "") => urlsImagen[e.id]
    ? `<figure class="foto ${clase}"><button type="button" class="foto-btn" data-src="${esc(urlsImagen[e.id])}" aria-label="Ampliar la imagen de la pregunta ${e.q} del test ${e.test}"><img src="${esc(urlsImagen[e.id])}" alt="Imagen de la pregunta ${e.q} del test ${e.test}" loading="lazy" decoding="async"></button></figure>`
    : "";
  function activarFotos(raiz) {
    raiz.querySelectorAll(".foto-btn").forEach((b) => b.addEventListener("click", () => {
      $("#visor-img").src = b.dataset.src; $("#visor-img").alt = b.querySelector("img").alt;
      $("#visor").showModal();
    }));
  }
  $("#visor").addEventListener("click", () => $("#visor").close());
  $("#visor").addEventListener("close", () => { $("#visor-img").removeAttribute("src"); });

  function caducada() { guardarSesion(null); pantallaLogin("La sesión ha caducado. Vuelve a entrar."); throw new Error("sesión caducada"); }

  /* ---------- Datos ---------- */
  async function cargarTodo() {
    const [fallos, resultados, progreso] = await Promise.all([
      api("fallos?select=*&order=test,q"),
      api("resultados?select=test,fallos,fecha&order=test"),
      api(`progreso?select=fallo_id,caja&user_id=eq.${auth.user.id}`),
    ]);
    estado = { fallos: fallos.map((f) => ({ ...f, base: f.origen !== "app" })), resultados, cajas: Object.fromEntries(progreso.map((p) => [p.fallo_id, p.caja])) };
    await firmarImagenes();
  }
  const errores = () => estado.fallos;
  const caja = (id) => estado.cajas[id] || 0;
  const resultados = () => estado.resultados.map((r) => ({ test: r.test, fallos: r.fallos })).sort((a, b) => a.test - b.test);
  const guardarCaja = (id, n) => api("progreso?on_conflict=user_id,fallo_id", { method: "POST", body: [{ user_id: auth.user.id, fallo_id: id, caja: n, actualizado: new Date().toISOString() }], prefer: "resolution=merge-duplicates,return=minimal" });
  const cajasHTML = (n) => `<span class="cajas" title="Aciertos seguidos (3 = dominada)" aria-label="Aciertos seguidos: ${n} de ${MAX}">${Array.from({ length: MAX }, (_, i) => `<i class="${i < n ? "on" : ""}"></i>`).join("")}</span>`;

  // Sube una copia con el formato de la v1.0.0 ({cajas, extras, resultados}). Conserva lo mejor de cada lado.
  async function subirCopia(d) {
    const extras = (d.extras || []).filter((e) => e && e.id && e.test && e.q);
    if (extras.length) await api("fallos?on_conflict=id", { method: "POST", prefer: "resolution=ignore-duplicates,return=minimal",
      body: extras.map((e) => ({ id: `t${e.test}-p${e.q}`, test: +e.test, q: +e.q, grupo: e.grupo, tipo: e.tipo, pregunta: e.pregunta, marcaste: e.marcaste, correcta: e.correcta, regla: e.regla, truco: e.truco || null, enlace: `https://www.todotest.com/tests/test.asp?tip=3&t=${+e.test}`, origen: "app" })) });
    const res = (d.resultados || []).filter((r) => Number.isInteger(+r.test) && Number.isInteger(+r.fallos));
    if (res.length) await api("resultados?on_conflict=test", { method: "POST", prefer: "resolution=merge-duplicates,return=minimal", body: res.map((r) => ({ test: +r.test, fallos: +r.fallos, origen: "app" })) });
    await cargarTodo();
    const ids = new Set(estado.fallos.map((f) => f.id));
    const cajas = Object.entries(d.cajas || {}).filter(([id, n]) => ids.has(id) && +n > caja(id)).map(([id, n]) => ({ user_id: auth.user.id, fallo_id: id, caja: Math.min(MAX, Math.max(0, +n)) }));
    if (cajas.length) await api("progreso?on_conflict=user_id,fallo_id", { method: "POST", body: cajas, prefer: "resolution=merge-duplicates,return=minimal" });
    if (cajas.length) await cargarTodo();
    return { extras: extras.length, resultados: res.length, cajas: cajas.length };
  }
  async function migrarLocal() {
    let d; try { d = JSON.parse(localStorage.getItem(CLAVE_V1)); } catch { d = null; }
    if (!d || typeof d !== "object") return null;
    const r = await subirCopia(d);
    localStorage.setItem(CLAVE_V1 + "-migrado", localStorage.getItem(CLAVE_V1));
    localStorage.removeItem(CLAVE_V1);
    return r;
  }

  /* ---------- Acceso ---------- */
  function pantallaLogin(msg) {
    $("#nav").hidden = true; $("#cargando").hidden = true;
    document.querySelectorAll(".vista").forEach((s) => (s.hidden = s.id !== "v-login"));
    $("#l-error").textContent = msg || "";
    $("#l-boton").disabled = false; $("#l-boton").textContent = "Entrar";
  }
  async function entrarApp() {
    document.querySelectorAll(".vista").forEach((s) => (s.hidden = true));
    $("#cargando").hidden = false; $("#cargando").textContent = "Cargando tus errores…";
    try {
      const m = await api("miembros?select=email");
      if (!m.length) { await salir(); return pantallaLogin("Esta cuenta no tiene acceso a este repaso."); }
      await cargarTodo();
      const mig = await migrarLocal().catch(() => null);
      $("#cargando").hidden = true; $("#nav").hidden = false; $("#c-email").textContent = auth.user.email;
      const inicio = location.hash.slice(1);
      mostrar(["repasar", "errores", "progreso", "anadir"].includes(inicio) ? inicio : "repasar");
      if (mig && (mig.cajas || mig.extras || mig.resultados)) { $("#copia-estado").className = "peq ok-campo"; $("#copia-estado").textContent = `Se ha pasado a la nube el progreso guardado en este navegador (${mig.cajas} tarjetas, ${mig.extras} fallos y ${mig.resultados} resultados).`; }
    } catch (e) {
      if (e.message === "sesión caducada") return;
      $("#cargando").textContent = "No se han podido cargar los datos. Comprueba la conexión y recarga la página.";
      $("#cargando").className = "tj-state tj-state--error cargando";
    }
  }
  async function salir() {
    try { if (auth) await fetch(`${SB}/auth/v1/logout`, { method: "POST", headers: { apikey: APIKEY, Authorization: `Bearer ${auth.access_token}` } }); } catch { /* sin red */ }
    guardarSesion(null); estado = { fallos: [], resultados: [], cajas: {} }; actual = null;
  }
  $("#form-login").addEventListener("submit", async (ev) => {
    ev.preventDefault();
    const email = $("#l-email").value.trim().toLowerCase(), password = $("#l-pass").value;
    if (!email || !password) { $("#l-error").textContent = "Escribe el correo y la contraseña."; return; }
    $("#l-boton").disabled = true; $("#l-boton").textContent = "Entrando…"; $("#l-error").textContent = "";
    try { await token("password", { email, password }); $("#l-pass").value = ""; await entrarApp(); }
    catch (e) { pantallaLogin(e.code === "invalid_credentials" || /invalid/i.test(e.message) ? "Correo o contraseña incorrectos." : "No se ha podido entrar. Inténtalo de nuevo."); }
  });
  $("#salir").addEventListener("click", async () => { await salir(); pantallaLogin("Has salido."); });
  $("#form-pass").addEventListener("submit", async (ev) => {
    ev.preventDefault(); $("#c-ok").textContent = ""; $("#c-error").textContent = "";
    const p = $("#c-pass").value;
    if (p.length < 8) { $("#c-error").textContent = "La contraseña debe tener al menos 8 caracteres."; return; }
    const r = await fetch(`${SB}/auth/v1/user`, { method: "PUT", headers: { apikey: APIKEY, Authorization: `Bearer ${auth.access_token}`, "Content-Type": "application/json" }, body: JSON.stringify({ password: p }) });
    if (r.ok) { $("#c-ok").textContent = "Contraseña cambiada."; $("#c-pass").value = ""; }
    else { const d = await r.json().catch(() => ({})); $("#c-error").textContent = d.error_code === "same_password" ? "Es la misma contraseña que ya tenías." : d.error_code === "weak_password" ? "La contraseña es demasiado débil." : "No se ha podido cambiar la contraseña."; }
  });
  // Al volver a la pestaña, recargar para ver los fallos dados de alta desde la conversación.
  document.addEventListener("visibilitychange", async () => {
    if (document.visibilityState !== "visible" || !auth || $("#nav").hidden) return;
    try { await cargarTodo(); if (vistaActual !== "repasar") mostrar(vistaActual); else if (!girada) { actual = null; pintarRepaso(); } } catch { /* se reintenta la próxima vez */ }
  });

  /* ---------- Navegación ---------- */
  document.querySelectorAll(".tab").forEach((b) => b.addEventListener("click", () => mostrar(b.dataset.vista)));
  function mostrar(v) {
    document.querySelectorAll(".tab").forEach((b) => { if (b.dataset.vista === v) b.setAttribute("aria-current", "page"); else b.removeAttribute("aria-current"); });
    document.querySelectorAll(".vista").forEach((s) => (s.hidden = s.id !== `v-${v}`));
    if (v === "repasar") pintarRepaso();
    if (v === "errores") pintarLista();
    if (v === "progreso") pintarProgreso();
    vistaActual = v;
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
      ${fotoHTML(e, "foto--tarjeta")}
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
    activarFotos(t);
    if (!girada) $("#girar").addEventListener("click", () => { girada = true; pintarRepaso(); $("#sabe").focus(); });
    else {
      $("#sabe").addEventListener("click", () => responder(true));
      $("#nosabe").addEventListener("click", () => responder(false));
    }
  }
  function responder(sabe) {
    const id = actual.id;
    const n = sabe ? Math.min(MAX, caja(id) + 1) : 0;
    estado.cajas[id] = n;
    sesion.vistas++; if (sabe) sesion.sabidas++;
    guardarCaja(id, n).catch(() => { $("#repaso-estado").insertAdjacentHTML("beforeend", `<span class="error-campo">No se ha guardado la última respuesta. Revisa la conexión.</span>`); });
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
            ${fotoHTML(e, "foto--lista")}
            <h3>${esc(e.pregunta)}</h3>
            <p class="correcta"><strong>Correcta:</strong> ${esc(e.correcta)}</p>
            ${e.truco ? `<p class="truco">${esc(e.truco)}</p>` : ""}
            <details><summary>Qué marcó y la regla</summary><p><strong>Marcó:</strong> ${esc(e.marcaste)}</p><p>${esc(e.regla)}</p>
            ${e.enlace ? `<a class="enlace" href="${esc(e.enlace)}" target="_blank" rel="noopener">Test ${e.test} en TodoTest</a>` : ""}
            ${e.base ? "" : `<p><button type="button" class="borrar" data-id="${esc(e.id)}">Eliminar este fallo</button></p>`}</details>
          </article>`).join("")}</div></section>`;
    }).join("");
    activarFotos($("#lista-errores"));
    document.querySelectorAll(".borrar").forEach((b) => b.addEventListener("click", async () => {
      if (!confirm("¿Eliminar este fallo añadido? Se borra para los dos.")) return;
      const f = estado.fallos.find((x) => x.id === b.dataset.id);
      try {
        await api(`fallos?id=eq.${encodeURIComponent(b.dataset.id)}`, { method: "DELETE" });
        if (f?.imagen) await storage(`object/${BUCKET}`, { method: "DELETE", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ prefixes: [f.imagen] }) }).catch(() => {});
        await cargarTodo(); if (actual?.id === b.dataset.id) actual = null; pintarLista(); }
      catch { alert("No se ha podido eliminar. Revisa la conexión."); }
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

  const avisoCopia = (ok, t) => { $("#copia-estado").className = `peq ${ok ? "ok-campo" : "error-campo"}`; $("#copia-estado").textContent = t; };
  $("#exportar").addEventListener("click", () => {
    const copia = { version: "2.0.0", usuario: auth.user.email, cajas: estado.cajas, extras: estado.fallos.filter((f) => f.origen === "app"), fallos: estado.fallos, resultados: estado.resultados };
    const blob = new Blob([JSON.stringify(copia, null, 2)], { type: "application/json" });
    const a = document.createElement("a");
    a.href = URL.createObjectURL(blob); a.download = `repaso-permiso-b-${new Date().toISOString().slice(0, 10)}.json`; a.click();
    URL.revokeObjectURL(a.href);
    avisoCopia(true, "Copia exportada.");
  });
  $("#importar").addEventListener("change", async (ev) => {
    const f = ev.target.files[0]; if (!f) return;
    try {
      const d = JSON.parse(await f.text());
      if (!d || typeof d.cajas !== "object" || !Array.isArray(d.extras)) throw new Error("formato");
      const r = await subirCopia(d); actual = null;
      avisoCopia(true, `Copia importada: ${r.cajas} tarjetas, ${r.extras} fallos y ${r.resultados} resultados.`);
      pintarProgreso();
    } catch (e) { avisoCopia(false, e.message === "formato" || e instanceof SyntaxError ? "El archivo no es una copia válida de esta app." : "No se ha podido importar la copia. Revisa la conexión."); }
    ev.target.value = "";
  });
  $("#reiniciar").addEventListener("click", async () => {
    if (!confirm("¿Reiniciar tu repaso? Se borra lo aprendido por ti, pero se conservan los fallos y resultados.")) return;
    try { await api(`progreso?user_id=eq.${auth.user.id}`, { method: "DELETE" }); estado.cajas = {}; actual = null; sesion = { vistas: 0, sabidas: 0 }; pintarProgreso(); avisoCopia(true, "Repaso reiniciado."); }
    catch { avisoCopia(false, "No se ha podido reiniciar. Revisa la conexión."); }
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
  $("#form-resultado").addEventListener("submit", async (ev) => {
    ev.preventDefault(); $("#r-ok").textContent = "";
    if (!validar(ev.target, $("#r-error"))) return;
    const test = +$("#r-test").value, fallos = +$("#r-fallos").value;
    try { await api("resultados?on_conflict=test", { method: "POST", body: [{ test, fallos, origen: "app", actualizado: new Date().toISOString() }], prefer: "resolution=merge-duplicates,return=minimal" }); await cargarTodo(); }
    catch { $("#r-error").textContent = "No se ha podido guardar. Revisa la conexión."; return; }
    $("#r-ok").textContent = `Test ${test} guardado con ${fallos} fallos. ${fallos <= 3 ? "Aprobado." : "Suspendido."}`;
    $("#e-test").value = test; ev.target.reset();
  });
  $("#form-error").addEventListener("submit", async (ev) => {
    ev.preventDefault(); $("#e-ok").textContent = "";
    if (!validar(ev.target, $("#e-error"))) return;
    const test = +$("#e-test").value, q = +$("#e-q").value, id = `t${test}-p${q}`;
    if (errores().some((e) => e.id === id)) { $("#e-error").textContent = `Ya existe un fallo para el test ${test}, pregunta ${q}.`; $("#e-q").setAttribute("aria-invalid", "true"); return; }
    const v = (s) => $(s).value.trim();
    const archivo = $("#e-imagen").files[0];
    let imagen = null;
    if (archivo) {
      try {
        const blob = await prepararFoto(archivo);
        await storage(`object/${BUCKET}/${id}.jpg`, { method: "POST", headers: { "Content-Type": "image/jpeg", "x-upsert": "true" }, body: blob });
        imagen = `${id}.jpg`;
      } catch (e) {
        $("#e-error").textContent = e.message === "tipo" || e.message === "leer" ? "La imagen no se puede leer. Usa una foto JPEG, PNG o WebP." : e.message === "grande" ? "La imagen es demasiado grande." : "No se ha podido subir la imagen. Revisa la conexión.";
        return;
      }
    }
    try { await api("fallos", { method: "POST", body: { id, test, q, grupo: v("#e-grupo"), tipo: v("#e-tipo"), pregunta: v("#e-pregunta"), marcaste: v("#e-marcaste"), correcta: v("#e-correcta"), regla: v("#e-regla"), truco: v("#e-truco") || null, enlace: `https://www.todotest.com/tests/test.asp?tip=3&t=${test}`, origen: "app", imagen, imagen_origen: imagen ? "app" : null }, prefer: "return=minimal" }); await cargarTodo(); }
    catch (e) { $("#e-error").textContent = e.code === "23505" ? `Ya existe un fallo para el test ${test}, pregunta ${q}.` : "No se ha podido guardar. Revisa los datos y la conexión."; return; }
    $("#e-ok").textContent = `Fallo T${test} · P${q} añadido a «${grupo(v("#e-grupo")).nombre}». Saldrá pronto en el repaso.`;
    ["#e-q", "#e-pregunta", "#e-marcaste", "#e-correcta", "#e-regla", "#e-truco", "#e-imagen"].forEach((s) => ($(s).value = ""));
    $("#e-q").focus();
  });

  if (auth?.refresh_token) entrarApp(); else pantallaLogin();
})();
