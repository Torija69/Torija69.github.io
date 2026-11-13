// Inventario v1.4.0 · objetos de Carl, Princess Donut y Katia por libro, con control de spoilers.
(function () {
  const BOOKS = window.BOOKS || [];
  const INV = window.INVENTORY || {};
  const WHO = [
    { id: 'carl', n: 'Carl', c: '#b4532a' },
    { id: 'donut', n: 'Princess Donut', c: '#7b4fa0' },
    { id: 'katia', n: 'Katia Grim', c: '#2f6f8f' }
  ];
  const TYPES = [
    ['arma', 'Armas'], ['equipo', 'Equipo'], ['objeto', 'Objetos'], ['pocion', 'Pociones'], ['tatuaje', 'Tatuajes']
  ];
  const TYPE_L = { arma: 'Arma', equipo: 'Equipo', objeto: 'Objeto', pocion: 'Poción', tatuaje: 'Tatuaje' };

  const params = new URLSearchParams(location.search);
  let level = 8;
  { const v = +(params.get('libro') || location.hash.replace('#libro=', '')); if (v >= 1 && v <= 8) level = v; }
  let who = WHO.some(w => w.id === params.get('p')) ? params.get('p') : 'all';
  let mode = params.get('vista') === 'actual' ? 'actual' : 'crono';
  const types = new Set(TYPES.map(t => t[0]));
  let q = '';

  const $ = id => document.getElementById(id);
  const esc = s => String(s == null ? '' : s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const norm = s => String(s || '').toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  const mapLink = id => `../index.html?libro=${level}&p=${id}`;

  function syncUrl() {
    const u = new URLSearchParams();
    u.set('libro', level);
    if (who !== 'all') u.set('p', who);
    if (mode === 'actual') u.set('vista', 'actual');
    try { history.replaceState(null, '', '?' + u.toString()); } catch (e) {}
    $('backMap').href = `../index.html?libro=${level}` + (who !== 'all' ? `&p=${who}` : '');
  }

  function seg(el, items, current, onPick) {
    el.innerHTML = items.map(([v, label, color]) =>
      `<button type="button" data-v="${esc(v)}" aria-pressed="${String(v) === String(current)}">${color ? `<span class="sw" style="background:${color}"></span>` : ''}${esc(label)}</button>`).join('');
    el.querySelectorAll('button').forEach(b => b.onclick = () => onPick(b.dataset.v));
  }

  function paintControls() {
    seg($('books'), BOOKS.map(b => [b.n, String(b.n)]), level, v => { level = +v; update(); });
    seg($('who'), [['all', 'Los tres']].concat(WHO.map(w => [w.id, w.n, w.c])), who, v => { who = v; update(); });
    seg($('mode'), [['crono', 'Por libro en que lo consigue'], ['actual', `Lo que lleva al acabar el libro ${level}`]], mode, v => { mode = v; update(); });
    $('books').querySelectorAll('button').forEach((b, i) => b.title = `${BOOKS[i].t} · ${BOOKS[i].f}`);
    $('types').innerHTML = TYPES.map(([v, l]) => `<button type="button" class="tj-filter" data-v="${v}" aria-pressed="${types.has(v)}">${l}</button>`).join('');
    $('types').querySelectorAll('button').forEach(b => b.onclick = () => {
      const v = b.dataset.v;
      if (types.has(v) && types.size > 1) types.delete(v); else types.add(v);
      update();
    });
  }

  function visible(it) {
    if (it.b > level || !types.has(it.t)) return false;
    if (mode === 'actual' && it.end && it.end[0] <= level) return false;
    // Las pociones se gastan al usarlas: solo siguen en el inventario si consta que se usan más tarde.
    if (mode === 'actual' && it.t === 'pocion' && !(it.end && it.end[0] > level)) return false;
    if (q) {
      const hay = norm([it.n, it.es, it.d].join(' '));
      if (!q.split(/\s+/).every(w => hay.includes(w))) return false;
    }
    return true;
  }

  function card(it, w) {
    const hist = (it.h || []).filter(h => h[0] <= level);
    const laterH = (it.h || []).some(h => h[0] > level);
    const ended = it.end && it.end[0] <= level;
    const laterEnd = it.end && it.end[0] > level;
    const lines = hist.map(h => `<li><b>Libro ${h[0]}.</b> ${esc(h[1])}</li>`);
    if (ended) lines.push(`<li class="end"><b>Libro ${it.end[0]} · fin.</b> ${esc(it.end[1])}</li>`);
    return `<article class="item${ended ? ' gone' : ''}" style="--who:${w.c}">
      <header><h3><span class="n-en" lang="en">${esc(it.n)}</span>${it.es ? ` <span class="n-es">· ${esc(it.es)}</span>` : ''}</h3><span class="type t-${it.t}">${TYPE_L[it.t] || esc(it.t)}</span></header>
      ${mode === 'actual' ? `<div class="es">Desde el libro ${it.b}</div>` : ''}
      <p>${esc(it.d)}</p>
      ${lines.length ? `<ul>${lines.join('')}</ul>` : ''}
      ${(laterH || laterEnd) ? `<p class="hidden-note">Hay más sobre este objeto en libros posteriores al ${level}, oculto para evitar spoilers.</p>` : ''}
      ${it.src ? `<div class="src">Fuente: <a href="${esc(it.src)}" target="_blank" rel="noopener">${esc(srcName(it.src))}</a></div>` : ''}
    </article>`;
  }

  function srcName(u) {
    if (u.includes('dcc-compendium')) return 'compendio de cdkolb';
    try { return new URL(u).hostname.replace(/^www\./, ''); } catch (e) { return 'fuente'; }
  }

  function column(w, items, bookN) {
    const head = `<h3 class="col-h"><span class="sw" style="background:${w.c}"></span><a href="${mapLink(w.id)}" title="Ver la ficha de ${esc(w.n)} en el mapa">${esc(w.n)}</a></h3>`;
    const empty = mode === 'actual' ? 'Sin objetos destacados con estos filtros.' : `Nada destacado en el libro ${bookN} con estos filtros.`;
    return `<div class="col">${head}${items.length ? items.map(it => card(it, w)).join('') : `<p class="col-empty">${empty}</p>`}</div>`;
  }

  function render() {
    const ws = WHO.filter(w => who === 'all' || w.id === who);
    const per = {};
    ws.forEach(w => per[w.id] = (INV[w.id] || []).filter(visible));
    const total = ws.reduce((a, w) => a + per[w.id].length, 0);
    let html = '';
    if (!total) {
      html = '<div class="empty">No hay objetos que coincidan con estos filtros hasta este libro.</div>';
    } else if (mode === 'actual') {
      const b = BOOKS[level - 1];
      html = `<section class="book"><div class="book-head"><h2>Al acabar el libro ${level}</h2><span class="bt">${esc(b.t)} · ${esc(b.f)}</span></div>
        <p class="hidden-note">Sin lo perdido, destruido, regalado ni las pociones ya consumidas.</p>
        <div class="cols">${ws.map(w => column(w, per[w.id].slice().sort((x, y) => x.b - y.b), level)).join('')}</div></section>`;
    } else {
      for (let n = level; n >= 1; n--) {
        const rows = ws.map(w => [w, per[w.id].filter(it => it.b === n)]);
        if (!rows.some(r => r[1].length)) continue;
        const b = BOOKS[n - 1];
        html += `<section class="book" id="libro-${n}"><div class="book-head"><h2>Libro ${n}</h2><span class="bt">${esc(b.t)} · ${esc(b.f)}</span></div>
          <div class="cols">${rows.map(([w, its]) => column(w, its, n)).join('')}</div></section>`;
      }
    }
    $('out').innerHTML = html;
    const all = ws.flatMap(w => per[w.id]);
    const st = [[all.length, 'objetos visibles'], [all.filter(i => i.t === 'pocion').length, 'pociones y consumibles'], [level, 'libro de lectura']];
    $('stats').innerHTML = st.map(([v, l]) => `<div class="stat"><div class="stat-v">${v}</div><div class="stat-l">${l}</div></div>`).join('');
  }

  function update() { paintControls(); syncUrl(); render(); }

  $('q').addEventListener('input', e => { q = norm(e.target.value.trim()); render(); });
  update();
})();
