/* Mis cielos v1.0.0 */
(function () {
  "use strict";
  var VERSION = "1.0.0";
  var MESES = ["enero", "febrero", "marzo", "abril", "mayo", "junio", "julio", "agosto", "septiembre", "octubre", "noviembre", "diciembre"];
  var SEMANA = ["L", "M", "X", "J", "V", "S", "D"];
  var $ = function (id) { return document.getElementById(id); };
  var datos = null, filtro = "todos", lista = [], pos = 0, origen = null;

  function fechaObj(f) { var p = f.split("-"); return new Date(+p[0], +p[1] - 1, +p[2]); }
  function fechaLarga(f) {
    return fechaObj(f).toLocaleDateString("es-ES", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  }
  function cap(s) { return s.charAt(0).toUpperCase() + s.slice(1); }
  function ruta(d, mini) { return "img/" + datos.anio + "/" + (mini ? "thumb/" : "") + d.fecha + ".webp"; }
  function el(tag, cls, txt) { var e = document.createElement(tag); if (cls) e.className = cls; if (txt != null) e.textContent = txt; return e; }

  function cargar(anio) {
    return fetch("data/" + anio + ".json", { cache: "no-cache" }).then(function (r) {
      if (!r.ok) throw new Error("HTTP " + r.status);
      return r.json();
    });
  }

  function pintar() {
    var dias = datos.dias;
    var ultima = dias[dias.length - 1];
    // Portada
    var img = $("portada-img");
    img.src = ruta(ultima);
    img.alt = "Cielo del " + fechaLarga(ultima.fecha) + ", " + ultima.tipo;
    $("portada-fecha").textContent = "Último cielo · " + fechaLarga(ultima.fecha);
    $("portada-boton").onclick = function (e) { abrir(dias, dias.length - 1, e.currentTarget); };
    // Cifras
    var amaneceres = dias.filter(function (d) { return d.tipo === "amanecer"; }).length;
    var cifras = [["Días con foto", dias.length], ["Amaneceres", amaneceres], ["Atardeceres", dias.length - amaneceres]];
    var dl = $("cifras"); dl.textContent = "";
    cifras.forEach(function (c) { var w = el("div"); w.appendChild(el("dt", null, c[0])); w.appendChild(el("dd", null, String(c[1]))); dl.appendChild(w); });
    pintarMeses();
    pintarCalendario();
  }

  function pintarMeses() {
    var ol = $("meses"); ol.textContent = "";
    var dest = datos.dias.filter(function (d) { return d.destacada; });
    var ultMes = +datos.dias[datos.dias.length - 1].fecha.slice(5, 7);
    for (var m = 1; m <= 12; m++) {
      var d = dest.filter(function (x) { return +x.fecha.slice(5, 7) === m; })[0];
      var li = el("li", "mes");
      if (d) {
        var b = el("button"); b.type = "button";
        b.setAttribute("aria-label", "Ver el cielo de " + MESES[m - 1] + ": " + fechaLarga(d.fecha));
        var im = el("img"); im.src = ruta(d, true); im.alt = ""; im.loading = "lazy"; im.width = 480; im.height = 360;
        var pie = el("div", "mes-pie"); pie.appendChild(el("strong", null, cap(MESES[m - 1])));
        pie.appendChild(el("span", null, d.fecha.slice(8, 10).replace(/^0/, "") + " de " + MESES[m - 1] + " · " + d.tipo));
        b.appendChild(im); b.appendChild(pie); li.appendChild(b);
        (function (i) { b.onclick = function (e) { abrir(dest, i, e.currentTarget); }; })(dest.indexOf(d));
      } else {
        li.className = "mes mes--vacio";
        var t = el("div"); t.appendChild(el("strong", null, cap(MESES[m - 1])));
        t.appendChild(el("span", null, m > ultMes ? "Pronto" : "Sin foto destacada"));
        li.appendChild(t);
      }
      ol.appendChild(li);
    }
  }

  function pintarCalendario() {
    var cont = $("cal"); cont.textContent = "";
    var porFecha = {}; datos.dias.forEach(function (d) { porFecha[d.fecha] = d; });
    var visibles = datos.dias.filter(function (d) { return filtro === "todos" || d.tipo === filtro; });
    var ultima = datos.dias[datos.dias.length - 1].fecha;
    var ultMes = +ultima.slice(5, 7);
    for (var m = 1; m <= ultMes; m++) {
      var sec = el("section", "cal-mes");
      var mm = String(m).padStart(2, "0");
      var nMes = datos.dias.filter(function (d) { return d.fecha.slice(5, 7) === mm; }).length;
      var h = el("h3", null, cap(MESES[m - 1])); h.appendChild(el("small", null, nMes + (nMes === 1 ? " cielo" : " cielos")));
      sec.appendChild(h);
      var cab = el("div", "cal-semana"); cab.setAttribute("aria-hidden", "true");
      SEMANA.forEach(function (s) { cab.appendChild(el("span", null, s)); });
      sec.appendChild(cab);
      var grid = el("div", "cal-dias"); grid.setAttribute("role", "list");
      var primero = new Date(datos.anio, m - 1, 1);
      var hueco = (primero.getDay() + 6) % 7;
      for (var i = 0; i < hueco; i++) grid.appendChild(el("div", "cal-dia cal-dia--fuera"));
      var total = new Date(datos.anio, m, 0).getDate();
      for (var dnum = 1; dnum <= total; dnum++) {
        var f = datos.anio + "-" + mm + "-" + String(dnum).padStart(2, "0");
        var d = porFecha[f];
        var c = el("div", "cal-dia"); c.setAttribute("role", "listitem");
        if (d) {
          var activa = filtro === "todos" || d.tipo === filtro;
          var b = el("button"); b.type = "button";
          b.setAttribute("aria-label", cap(fechaLarga(f)) + ", " + d.tipo);
          var im = el("img"); im.src = ruta(d, true); im.alt = ""; im.loading = "lazy"; im.decoding = "async";
          b.appendChild(im);
          if (activa) {
            (function (dd) { b.onclick = function (e) { abrir(visibles, visibles.indexOf(dd), e.currentTarget); }; })(d);
          } else { c.classList.add("cal-dia--atenuado"); b.disabled = true; b.tabIndex = -1; }
          c.appendChild(b);
        } else {
          c.classList.add(f > ultima ? "cal-dia--futuro" : "cal-dia--sin");
          c.setAttribute("aria-label", cap(fechaLarga(f)) + (f > ultima ? ", todavía no" : ", sin foto"));
        }
        c.appendChild(el("span", "cal-num", String(dnum)));
        grid.appendChild(c);
      }
      sec.appendChild(grid);
      cont.appendChild(sec);
    }
  }

  // Visor
  var visor = $("visor");
  function mostrar() {
    var d = lista[pos];
    var img = $("visor-img");
    img.src = ruta(d);
    img.alt = "Cielo del " + fechaLarga(d.fecha) + ", " + d.tipo;
    $("visor-fecha").textContent = cap(fechaLarga(d.fecha));
    $("visor-info").textContent = cap(d.tipo) + " · " + d.hora + " · " + datos.lugar + " · " + (pos + 1) + " de " + lista.length;
    $("visor-ant").disabled = pos === 0;
    $("visor-sig").disabled = pos === lista.length - 1;
    [pos - 1, pos + 1].forEach(function (i) { if (lista[i]) { var p = new Image(); p.src = ruta(lista[i]); } });
  }
  function abrir(l, i, desde) {
    lista = l; pos = Math.max(0, i); origen = desde || null;
    mostrar();
    if (typeof visor.showModal === "function") visor.showModal(); else visor.setAttribute("open", "");
    $("visor-cerrar").focus();
  }
  function mover(n) { var p = pos + n; if (p >= 0 && p < lista.length) { pos = p; mostrar(); } }
  $("visor-cerrar").onclick = function () { visor.close(); };
  $("visor-ant").onclick = function () { mover(-1); };
  $("visor-sig").onclick = function () { mover(1); };
  visor.addEventListener("close", function () { if (origen && origen.focus) origen.focus(); });
  visor.addEventListener("keydown", function (e) {
    if (e.key === "ArrowLeft") { e.preventDefault(); mover(-1); }
    else if (e.key === "ArrowRight") { e.preventDefault(); mover(1); }
  });
  visor.addEventListener("click", function (e) { if (e.target === visor || e.target.classList.contains("visor-foto")) visor.close(); });
  var x0 = null;
  var zona = visor.querySelector(".visor-foto");
  zona.addEventListener("touchstart", function (e) { x0 = e.touches[0].clientX; }, { passive: true });
  zona.addEventListener("touchend", function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0; x0 = null;
    if (Math.abs(dx) > 40) mover(dx < 0 ? 1 : -1);
  });

  // Filtros
  document.querySelectorAll("[data-filtro]").forEach(function (b) {
    b.addEventListener("click", function () {
      filtro = b.getAttribute("data-filtro");
      document.querySelectorAll("[data-filtro]").forEach(function (o) { o.setAttribute("aria-pressed", String(o === b)); });
      pintarCalendario();
    });
  });

  // Arranque
  $("version").textContent = VERSION;
  fetch("data/anios.json", { cache: "no-cache" }).then(function (r) { return r.json(); }).then(function (a) {
    var sel = $("anio");
    a.anios.slice().sort().reverse().forEach(function (y) { var o = el("option", null, String(y)); o.value = y; sel.appendChild(o); });
    sel.onchange = function () { cargar(sel.value).then(function (d) { datos = d; pintar(); }); };
    return cargar(sel.value);
  }).then(function (d) { datos = d; pintar(); }).catch(function () {
    $("portada-fecha").textContent = "No se han podido cargar las fotos. Recarga la página.";
  });
})();
