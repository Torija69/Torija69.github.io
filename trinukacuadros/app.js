(() => {
'use strict';
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const KEY = 'trinuka-concursos-pintura:v1';

/* ---------- Fecha de hoy (admite ?hoy=AAAA-MM-DD para pruebas) ---------- */
const qsHoy = new URLSearchParams(location.search).get('hoy');
const TODAY = qsHoy ? parse(qsHoy) : startOfDay(new Date());

function parse(s){ if(!s) return null; const [y,m,d]=String(s).slice(0,10).split('-').map(Number); if(!y||!m||!d) return null; return new Date(y,m-1,d); }
function startOfDay(d){ return new Date(d.getFullYear(),d.getMonth(),d.getDate()); }
function iso(d){ return d.getFullYear()+'-'+String(d.getMonth()+1).padStart(2,'0')+'-'+String(d.getDate()).padStart(2,'0'); }
function addDays(d,n){ const x=new Date(d); x.setDate(x.getDate()+n); return x; }
function diffDays(a,b){ return Math.round((startOfDay(a)-startOfDay(b))/86400000); }
const fmtD = new Intl.DateTimeFormat('es-ES',{day:'numeric',month:'short',year:'numeric'});
const fmtDM = new Intl.DateTimeFormat('es-ES',{day:'numeric',month:'short'});
const fmtMon = new Intl.DateTimeFormat('es-ES',{month:'short'});
const fmtMonY = new Intl.DateTimeFormat('es-ES',{month:'long',year:'numeric'});
const fmtEur = new Intl.NumberFormat('es-ES',{style:'currency',currency:'EUR',maximumFractionDigits:0});
function fd(s){ const d=parse(s); return d?fmtD.format(d).replace('.',''):''; }
/* Solo se aceptan enlaces http(s); cualquier otro esquema (javascript:, data:…) se descarta */
function safeUrl(u){ u=String(u??'').trim(); return /^https?:\/\//i.test(u)?u:''; }
function safeId(s){ return String(s??'').replace(/[^\w-]/g,'').slice(0,80); }
function limpia(c){ if(!c||typeof c!=='object') return null; const o={...c, id:safeId(c.id)}; if(!o.id) return null; ['urlBases','fuente'].forEach(k=>{ if(k in o) o[k]=safeUrl(o[k]); }); return o; }
function esc(s){ return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c])); }

/* ---------- Almacenamiento ---------- */
let memory = null, persistent = true;
function load(){
  try{ const raw = localStorage.getItem(KEY); return norm(raw?JSON.parse(raw):{}); }
  catch(e){ persistent=false; return norm(memory||{}); }
}
function norm(s){
  s=(s&&typeof s==='object')?s:{};
  const obj=v=>(v&&typeof v==='object'&&!Array.isArray(v))?v:{};
  const editados={}; Object.entries(obj(s.editados)).forEach(([k,v])=>{ const id=safeId(k); const c=limpia({...obj(v),id}); if(c) editados[id]=c; });
  const seg={}; Object.entries(obj(s.seg)).forEach(([k,v])=>{ const id=safeId(k); if(id) seg[id]=obj(v); });
  return {seg, propios:(Array.isArray(s.propios)?s.propios:[]).map(limpia).filter(Boolean), editados,
    ocultos:(Array.isArray(s.ocultos)?s.ocultos:[]).map(safeId).filter(Boolean), prefs:obj(s.prefs)};
}
let store = load();
function save(){
  try{ localStorage.setItem(KEY, JSON.stringify(store)); }
  catch(e){ memory=store; if(persistent){ persistent=false; toast('Este navegador no permite guardar: usa «Datos → Guardar copia».'); } }
}

/* ---------- Modelo ---------- */
const BASE = window.CONCURSOS_BASE || [];
function all(){
  const base = BASE.filter(b=>!store.ocultos.includes(b.id)).map(b=>store.editados[b.id]?{...b,...store.editados[b.id],_edit:true}:b);
  return base.concat(store.propios.map(p=>({...p,_propio:true})));
}
function byId(id){ return all().find(c=>c.id===id); }

const ETAPAS = {
  insc:{label:'Fin de presentación', short:'Presentación'},
  inscIni:{label:'Apertura de inscripción', short:'Apertura'},
  entrega:{label:'Entrega de obra', short:'Entrega'},
  fallo:{label:'Fallo del jurado', short:'Fallo'},
  expo:{label:'Exposición', short:'Exposición'}
};
function events(c){
  const ev=[];
  if(c.inscripcionInicio) ev.push({type:'inscIni',cls:'insc',start:parse(c.inscripcionInicio)});
  if(c.inscripcionFin) ev.push({type:'insc',cls:'insc',start:parse(c.inscripcionFin)});
  if(c.entregaInicio||c.entregaFin) ev.push({type:'entrega',cls:'entrega',start:parse(c.entregaInicio||c.entregaFin),end:parse(c.entregaFin||c.entregaInicio)});
  if(c.fallo) ev.push({type:'fallo',cls:'fallo',start:parse(c.fallo)});
  if(c.expoInicio||c.expoFin) ev.push({type:'expo',cls:'expo',start:parse(c.expoInicio||c.expoFin),end:parse(c.expoFin||c.expoInicio),openStart:!c.expoInicio,openEnd:!c.expoFin});
  return ev.filter(e=>e.start);
}
function lastDate(c){ let m=null; events(c).forEach(e=>{const d=e.end||e.start; if(!m||d>m)m=d;}); return m; }
function status(c){
  const ini=parse(c.inscripcionInicio), fin=parse(c.inscripcionFin);
  if(fin && fin>=TODAY) return (ini && ini>TODAY)?'proxima':'abierta';
  if(!fin && ini && ini>TODAY) return 'proxima';
  if(!fin && !ini){ const l=lastDate(c); return l&&l>=TODAY?'proxima':'finalizada'; }
  const l=lastDate(c); return l&&l>=TODAY?'curso':'finalizada';
}
const STATUS_LABEL={abierta:'Inscripción abierta',proxima:'Próxima',curso:'Fallo o exposición pendiente',finalizada:'Finalizada'};
function years(c){ const s=new Set(); events(c).forEach(e=>{s.add(e.start.getFullYear()); if(e.end) s.add(e.end.getFullYear());}); return s; }
/* Concursos con límite de edad máxima (solo jóvenes): no admiten a mayores de 35 */
function isJoven(c){ if(typeof c.edadMax==='number') return c.edadMax<=35; return /menores de 3[0-9]|18 a 3[0-9]|hasta 3[0-9] años|≤ ?3[0-9]|jóvenes pintores|pintura joven/i.test([c.requisitos,c.modalidad,c.nombre].join(' ')); }
function isGratis(c){ return /gratu/i.test(c.cuota||''); }
function nextKey(c){
  const f=parse(c.inscripcionFin);
  if(f && f>=TODAY) return f.getTime();
  const fut=events(c).map(e=>e.end&&e.end>=TODAY?(e.start>=TODAY?e.start:TODAY):e.start).filter(d=>d>=TODAY).sort((a,b)=>a-b)[0];
  return fut?fut.getTime()+1e12:9e15;
}

/* ---------- Seguimiento ---------- */
const SEG = [
  ['interesa','Me interesa'],['preparando','Preparando obra'],['inscrita','Inscrita'],
  ['seleccionada','Preseleccionada'],['enviada','Obra entregada'],['premiada','Premiada'],['descartada','No seleccionada / descartada']
];
const SEG_LABEL = Object.fromEntries(SEG);
function seg(id){ return store.seg[id]||null; }
function setSeg(id,patch){
  const cur=store.seg[id]||{};
  const next={...cur,...patch};
  if(!next.estado && !next.notas && !next.obra) delete store.seg[id]; else store.seg[id]=next;
  save(); renderAll();
}

/* ---------- Filtros ---------- */
const F = { q:'', year:'all', estado:'vigentes', ccaa:'all', premio:0, edad:(store.prefs&&store.prefs.edad)||'mayores35', gratis:false, sort:'plazo' };
function pass(c, ignoreEstado=false){
  if(F.q){ const t=[c.nombre,c.localidad,c.provincia,c.ccaa,c.tema,c.organizador,c.modalidad].join(' ').toLowerCase(); if(!F.q.toLowerCase().split(/\s+/).every(w=>t.includes(w))) return false; }
  if(F.year!=='all' && !years(c).has(+F.year)) return false;
  if(F.ccaa!=='all' && c.ccaa!==F.ccaa) return false;
  if(F.premio && !((c.primerPremio||0)>=F.premio)) return false;
  if(F.edad==='mayores35' && isJoven(c)) return false;
  if(F.edad==='jovenes' && !isJoven(c)) return false;
  if(F.gratis && !isGratis(c)) return false;
  if(!ignoreEstado){
    const s=status(c);
    if(F.estado==='vigentes' && s==='finalizada') return false;
    if(F.estado==='prevision' && !c.estimado) return false;
    if(['abierta','proxima','curso','finalizada'].includes(F.estado) && s!==F.estado) return false;
  }
  return true;
}
function filtered(ignoreEstado){ return all().filter(c=>pass(c,ignoreEstado)); }

/* ---------- Render: piezas comunes ---------- */
function tagsHTML(c){
  const s=status(c); let h=`<span class="tag tag--${s}">${STATUS_LABEL[s]}</span>`;
  if(c.estimado) h+=`<span class="tag tag--prevision">Previsión ${[...years(c)].sort()[0]||''}</span>`;
  if(c.ambito) h+=`<span class="tag">${esc(c.ambito)}</span>`;
  if(isJoven(c)) h+=`<span class="tag">Hasta ${typeof c.edadMax==='number'?c.edadMax:35} años</span>`;
  const sg=seg(c.id); if(sg&&sg.estado) h+=`<span class="tag tag--mine">${esc(SEG_LABEL[sg.estado])}</span>`;
  if(c._propio) h+=`<span class="tag">Añadido por ti</span>`;
  return h;
}
function rangeTxt(a,b){ if(a&&b&&a!==b) return fd(a)+' – '+fd(b); return fd(a||b); }
function prizeHTML(c){ return c.primerPremio?`<strong>${fmtEur.format(c.primerPremio)}</strong> primer premio`:esc(c.premioTexto||'Premio por confirmar'); }

/* ---------- Agenda ---------- */
function renderAgenda(){
  const list=filtered(true);
  const abiertas=list.filter(c=>status(c)==='abierta');
  const en30=abiertas.filter(c=>diffDays(parse(c.inscripcionFin),TODAY)<=30);
  const expos=list.filter(c=>events(c).some(e=>e.type==='expo' && (e.end||e.start)>=TODAY && e.start<=addDays(TODAY,90)));
  const mias=Object.values(store.seg).filter(s=>s.estado && s.estado!=='descartada').length;
  $('#kpis').innerHTML=[
    ['kpi--accent',abiertas.length,'Con inscripción abierta'],
    ['',en30.length,'Cierran en los próximos 30 días'],
    ['',expos.length,'Exposiciones en curso o en 90 días'],
    ['',mias,'Candidaturas en seguimiento']
  ].map(([k,n,l])=>`<div class="kpi ${k}"><div class="kpi__n">${n}</div><div class="kpi__l">${l}</div></div>`).join('');

  const dls=[]; const oth=[];
  list.forEach(c=>events(c).forEach(e=>{
    if(e.type==='insc' && e.start>=TODAY) dls.push({c,e,d:e.start});
    if(e.type==='inscIni' && e.start>TODAY) oth.push({c,e,d:e.start,lab:'Abre inscripción'});
    if(e.type==='entrega'){ const d=e.end||e.start; if(d>=TODAY) oth.push({c,e,d,lab:e.end&&e.start<e.end&&e.start>=TODAY?'Entrega de obra desde '+fmtDM.format(e.start)+' hasta':'Entrega de obra hasta'}); }
    if(e.type==='fallo' && e.start>=TODAY) oth.push({c,e,d:e.start,lab:'Fallo'});
    if(e.type==='expo'){
      if(e.start>=TODAY && !e.openStart) oth.push({c,e,d:e.start,lab:'Inaugura exposición'});
      else if(e.end && e.end>=TODAY && !e.openEnd) oth.push({c,e,d:e.end,lab:e.start<=TODAY?'Exposición abierta hasta':'Cierra exposición'});
    }
  }));
  dls.sort((a,b)=>a.d-b.d); oth.sort((a,b)=>a.d-b.d);
  const row=(x,lab)=>{
    const n=diffDays(x.d,TODAY);
    const left=n===0?'Hoy':n===1?'Mañana':'Faltan '+n+' días';
    return `<li><button class="dl" data-open="${x.c.id}">
      <div class="dl__date"><div class="dl__d">${x.d.getDate()}</div><div class="dl__m">${fmtMon.format(x.d).replace('.','')} ${String(x.d.getFullYear()).slice(2)}</div></div>
      <div><div class="dl__name">${esc(x.c.nombre)}</div><div class="dl__meta"><i class="dot dot--${x.e.cls}"></i> ${esc(lab||ETAPAS[x.e.type].label)} · ${esc(x.c.localidad||'')}${x.c.provincia&&x.c.provincia!==x.c.localidad?' ('+esc(x.c.provincia)+')':''} · ${x.c.primerPremio?fmtEur.format(x.c.primerPremio):'—'}${x.c.estimado?' · previsión':''}</div></div>
      <span class="dl__left ${n<=7?'is-urgent':''}">${left}</span></button></li>`;
  };
  $('#deadlines').innerHTML=dls.length?dls.slice(0,14).map(x=>row(x)).join(''):`<li class="empty">No hay plazos futuros con estos filtros.</li>`;
  $('#otherEvents').innerHTML=oth.length?oth.slice(0,14).map(x=>row(x,x.lab)).join(''):`<li class="empty">No hay entregas, fallos ni exposiciones próximas.</li>`;
}

/* ---------- Lista ---------- */
function renderList(){
  let list=filtered();
  const k={plazo:c=>nextKey(c),premio:c=>-(c.primerPremio||0),nombre:c=>c.nombre.toLowerCase(),expo:c=>{const d=parse(c.expoInicio||c.expoFin);return d?d.getTime():9e15;}}[F.sort];
  list.sort((a,b)=>{const x=k(a),y=k(b);return x<y?-1:x>y?1:0;});
  $('#resultCount').textContent=list.length+(list.length===1?' concurso':' concursos');
  $('#cards').innerHTML=list.length?list.map(c=>{
    const sg=seg(c.id);
    return `<article class="card ${c.estimado?'card--est':''}" data-open="${esc(c.id)}" tabindex="0">
      <div class="card__tags">${tagsHTML(c)}</div>
      <h3 class="card__title">${esc(c.nombre)}</h3>
      <p class="card__place">${esc([c.localidad,c.provincia!==c.localidad?c.provincia:null,c.ccaa].filter(Boolean).join(' · '))}</p>
      <p class="card__prize">${prizeHTML(c)}${c.tema&&!/^libre$/i.test(c.tema)&&!/ver bases|consultar/i.test(c.tema)?` · <span class="muted">Tema: ${esc(c.tema)}</span>`:''}</p>
      <dl class="timeline">
        <dt><i class="dot dot--insc"></i>Presentación</dt><dd>${c.inscripcionFin?(c.inscripcionInicio?fd(c.inscripcionInicio)+' – ':'hasta ')+fd(c.inscripcionFin):'Por confirmar'}</dd>
        ${(c.entregaInicio||c.entregaFin||c.entregaTexto)?`<dt><i class="dot dot--entrega"></i>Entrega</dt><dd>${c.entregaInicio||c.entregaFin?rangeTxt(c.entregaInicio,c.entregaFin):esc(c.entregaTexto)}</dd>`:''}
        ${(c.fallo||c.falloTexto)?`<dt><i class="dot dot--fallo"></i>Fallo</dt><dd>${c.falloTexto?esc(c.falloTexto):fd(c.fallo)}</dd>`:''}
        <dt><i class="dot dot--expo"></i>Exposición</dt><dd>${c.expoInicio&&c.expoFin?rangeTxt(c.expoInicio,c.expoFin):c.expoTexto?esc(c.expoTexto):c.expoInicio?'Desde '+fd(c.expoInicio):c.expoFin?'Hasta '+fd(c.expoFin):'Por confirmar'}</dd>
      </dl>
      <div class="card__foot">
        ${safeUrl(c.urlBases)||safeUrl(c.fuente)?`<a class="btn btn--sm" href="${esc(safeUrl(c.urlBases)||safeUrl(c.fuente))}" target="_blank" rel="noopener" data-stop>Bases ↗</a>`:''}
        <button class="btn btn--sm" data-follow="${esc(c.id)}" data-stop>${sg&&sg.estado?'En seguimiento':'Seguir'}</button>
        <button class="btn btn--sm btn--ghost" data-ics="${esc(c.id)}" data-stop>Añadir al calendario</button>
      </div>
    </article>`;}).join(''):`<div class="empty">No hay concursos con estos filtros. Prueba con «Todas» en Estado o amplía el año.</div>`;
}

/* ---------- Calendario mensual ---------- */
let calMonth = new Date(TODAY.getFullYear(),TODAY.getMonth(),1);
let expandedDay=null;
function renderCal(){
  {const t=fmtMonY.format(calMonth); $('#calTitle').textContent=t.charAt(0).toUpperCase()+t.slice(1);}
  const list=filtered(true).filter(c=>F.estado!=='prevision'||c.estimado);
  const map={};
  const push=(d,item)=>{const k=iso(d);(map[k]=map[k]||[]).push(item);};
  list.forEach(c=>events(c).forEach(e=>{
    const base={id:c.id,cls:e.cls,est:!!c.estimado,name:c.nombre};
    if(e.type==='inscIni') push(e.start,{...base,lab:'Abre: ',range:true});
    else if(e.type==='insc') push(e.start,{...base,lab:'Cierra: '});
    else if(e.type==='fallo') push(e.start,{...base,lab:'Fallo: '});
    else if(e.type==='entrega'){ if(e.end&&+e.end!==+e.start){push(e.start,{...base,lab:'Entrega desde: ',range:true});push(e.end,{...base,lab:'Entrega hasta: '});} else push(e.start,{...base,lab:'Entrega: '}); }
    else if(e.type==='expo'){ if(!e.openStart) push(e.start,{...base,lab:'Inaugura: '}); if(e.end&&!e.openEnd&&+e.end!==+e.start) push(e.end,{...base,lab:'Cierra expo: ',range:true}); }
  }));
  const first=new Date(calMonth); const offset=(first.getDay()+6)%7;
  const start=addDays(first,-offset);
  const dows=['Lun','Mar','Mié','Jue','Vie','Sáb','Dom'];
  let h=dows.map(d=>`<div class="cal__dow">${d}</div>`).join('');
  for(let i=0;i<42;i++){
    const d=addDays(start,i); const out=d.getMonth()!==calMonth.getMonth();
    if(i>=35 && out && d.getDate()<=7 && i%7===0) break;
    const items=map[iso(d)]||[];
    const full=expandedDay===iso(d); const shown=full?items:items.slice(0,4);
    h+=`<div class="cal__day ${out?'is-out':''} ${+d===+TODAY?'is-today':''} ${items.length?'':'is-empty'}">
      <span class="cal__n" data-dow="${dows[i%7]} · ${fmtDM.format(d)}">${d.getDate()}</span>
      ${shown.map(it=>`<button class="ev ev--${it.cls} ${it.range?'ev--range':''} ${it.est?'is-est':''}" data-open="${it.id}" title="${esc(it.lab+it.name)}">${esc(it.lab+it.name)}</button>`).join('')}
      ${!full&&items.length>4?`<button class="ev ev--more" data-day="${iso(d)}">+${items.length-4} más</button>`:''}
    </div>`;
  }
  $('#cal').innerHTML=h;
}

/* ---------- Cronología (Gantt) ---------- */
const G0=new Date(2026,9,1), G1=new Date(2028,0,1);
function pos(d){ return Math.max(0,Math.min(100,(d-G0)/(G1-G0)*100)); }
function renderGantt(){
  const months=[]; for(let d=new Date(G0); d<G1; d=new Date(d.getFullYear(),d.getMonth()+1,1)) months.push(new Date(d));
  const cols=`grid-template-columns:repeat(${months.length},1fr)`;
  const list=filtered().filter(c=>events(c).some(e=>(e.end||e.start)>=G0 && e.start<G1))
    .sort((a,b)=>{const fa=events(a).map(e=>e.start).sort((x,y)=>x-y)[0], fb=events(b).map(e=>e.start).sort((x,y)=>x-y)[0]; return (parse(a.inscripcionFin)||fa)-(parse(b.inscripcionFin)||fb);});
  let h=`<div class="g-row g-row--head"><div class="g-label"><strong>Concurso</strong></div><div class="g-track"><div class="g-months" style="${cols}">${months.map(m=>`<div class="g-month">${fmtMon.format(m).replace('.','')} ${String(m.getFullYear()).slice(2)}</div>`).join('')}</div></div></div>`;
  list.forEach(c=>{
    const est=c.estimado?'is-est':'';
    let bars='';
    const ini=parse(c.inscripcionInicio), fin=parse(c.inscripcionFin);
    if(fin){ const s=ini||addDays(fin,-7); bars+=`<div class="g-bar g-bar--insc ${est}" style="left:${pos(s)}%;width:${Math.max(.4,pos(fin)-pos(s))}%" title="Inscripción: ${ini?fd(c.inscripcionInicio)+' – ':'hasta '}${fd(c.inscripcionFin)}"></div>`; }
    events(c).forEach(e=>{
      if(e.type==='entrega'){ const s=e.start,t=e.end||e.start; bars+=`<div class="g-bar g-bar--entrega ${est}" style="left:${pos(s)}%;width:${Math.max(.4,pos(t)-pos(s))}%" title="Entrega: ${rangeTxt(iso(s),iso(t))}"></div>`; }
      if(e.type==='expo'){ const s=e.openStart?addDays(e.end,-21):e.start, t=e.openEnd?addDays(e.start,21):e.end; bars+=`<div class="g-bar g-bar--expo ${est}" style="left:${pos(s)}%;width:${Math.max(.4,pos(t)-pos(s))}%;${e.openStart||e.openEnd?'opacity:.55':''}" title="Exposición: ${c.expoTexto?esc(c.expoTexto):rangeTxt(c.expoInicio,c.expoFin)}"></div>`; }
      if(e.type==='fallo'){ bars+=`<div class="g-fallo" style="left:${pos(e.start)}%" title="Fallo: ${esc(c.falloTexto||fd(c.fallo))}"></div>`; }
    });
    h+=`<div class="g-row"><div class="g-label" data-open="${esc(c.id)}">${esc(c.nombre)}<small>${esc(c.localidad||'')}${c.estimado?' · previsión':''}</small></div><div class="g-track"><div class="g-grid" style="${cols}">${months.map(()=>'<div></div>').join('')}</div>${bars}</div></div>`;
  });
  if(!list.length) h+=`<div class="empty">No hay concursos con fechas en este periodo.</div>`;
  $('#gantt').innerHTML=h;
  if(TODAY>=G0 && TODAY<G1){
    const track=$('#gantt .g-row--head .g-track'); const label=$('#gantt .g-label');
    const lw=label.getBoundingClientRect().width, tw=track.getBoundingClientRect().width;
    const line=document.createElement('div'); line.className='g-today'; line.style.left=(lw+tw*pos(TODAY)/100)+'px'; line.innerHTML='<span>Hoy</span>';
    $('#gantt').appendChild(line);
  }
}

/* ---------- Mis candidaturas ---------- */
function renderBoard(){
  const items=all().filter(c=>seg(c.id)&&seg(c.id).estado);
  $('#countMias').textContent=items.filter(c=>seg(c.id).estado!=='descartada').length;
  if(!items.length){ $('#board').innerHTML=`<div class="empty" style="grid-column:1/-1">Todavía no sigues ningún concurso. Abre una ficha y marca «Me interesa» para empezar tu seguimiento.</div>`; return; }
  $('#board').innerHTML=SEG.map(([k,l])=>{
    const its=items.filter(c=>seg(c.id).estado===k).sort((a,b)=>nextKey(a)-nextKey(b));
    return `<div class="col"><h3>${l}<span>${its.length}</span></h3>${its.map(c=>{const s=seg(c.id);const n=c.inscripcionFin&&parse(c.inscripcionFin)>=TODAY?diffDays(parse(c.inscripcionFin),TODAY):null;return `<div class="mini" data-open="${esc(c.id)}" tabindex="0"><div class="mini__t">${esc(c.nombre)}</div><div class="mini__m">${esc(c.localidad||'')} · ${n!==null?'cierra en '+n+' días':STATUS_LABEL[status(c)]}</div>${s.obra?`<div class="mini__note">Obra: ${esc(s.obra)}</div>`:''}${s.notas?`<div class="mini__note">${esc(s.notas)}</div>`:''}</div>`;}).join('')}</div>`;
  }).join('');
}

/* ---------- Ficha ---------- */
let openId=null;
function openDrawer(id){
  const c=byId(id); if(!c) return; openId=id;
  $('#dKicker').textContent=[c.localidad,c.provincia!==c.localidad?c.provincia:null,c.ccaa].filter(Boolean).join(' · ');
  $('#dTitle').textContent=c.nombre;
  const steps=[];
  if(c.inscripcionInicio) steps.push(['insc','Apertura de inscripción',fd(c.inscripcionInicio),parse(c.inscripcionInicio)]);
  steps.push(['insc','Fin de presentación',c.inscripcionFin?fd(c.inscripcionFin):'Por confirmar',parse(c.inscripcionFin)]);
  if(c.entregaInicio||c.entregaFin||c.entregaTexto) steps.push(['entrega','Entrega de obra (seleccionadas)',c.entregaInicio||c.entregaFin?rangeTxt(c.entregaInicio,c.entregaFin):c.entregaTexto,parse(c.entregaFin||c.entregaInicio)]);
  if(c.fallo||c.falloTexto) steps.push(['fallo','Fallo',c.falloTexto||fd(c.fallo),parse(c.fallo)]);
  steps.push(['expo','Exposición',(c.expoInicio&&c.expoFin?rangeTxt(c.expoInicio,c.expoFin):c.expoTexto||(c.expoInicio?'Desde '+fd(c.expoInicio):c.expoFin?'Hasta '+fd(c.expoFin):'Por confirmar'))+(c.expoLugar?' · '+c.expoLugar:''),parse(c.expoFin||c.expoInicio)]);
  const sg=seg(id)||{};
  const kv=[['Organiza',c.organizador],['Modalidad',c.modalidad],['Ámbito',c.ambito],['Premios',c.premioTexto||(c.primerPremio?fmtEur.format(c.primerPremio):'')],['Cuota',c.cuota],['Requisitos',c.requisitos],['Medidas y técnica',c.medidas],['Tema',c.tema],['Cómo inscribirse',c.inscripcion],['Notas',c.notas]].filter(([,v])=>v);
  $('#dBody').innerHTML=`
    <div class="card__tags">${tagsHTML(c)}</div>
    ${c.estimado?`<p class="note note--est">Fechas estimadas a partir de la edición anterior. Confirma el calendario en las bases oficiales cuando se publiquen y edita la ficha para ajustarlo.</p>`:''}
    <section class="sec"><h3>Calendario</h3><ol class="steps">${steps.map(([k,t,d,dt])=>`<li class="step step--${k} ${dt&&dt<TODAY?'is-past':''}"><div class="step__t">${esc(t)}</div><div class="step__d">${esc(d)}</div></li>`).join('')}</ol></section>
    <section class="sec"><h3>Resumen de las bases</h3><dl class="kv">${kv.map(([k,v])=>`<dt>${k}</dt><dd>${esc(v)}</dd>`).join('')}</dl></section>
    <section class="sec"><h3>Enlaces</h3><div class="actions">
      ${safeUrl(c.urlBases)?`<a class="btn btn--primary" href="${esc(safeUrl(c.urlBases))}" target="_blank" rel="noopener">Bases oficiales ↗</a>`:''}
      ${safeUrl(c.fuente)&&c.fuente!==c.urlBases?`<a class="btn" href="${esc(safeUrl(c.fuente))}" target="_blank" rel="noopener">Ficha consultada ↗</a>`:''}
    </div></section>
    <section class="sec track"><h3>Mi seguimiento</h3>
      <div class="seg" role="group" aria-label="Estado de mi candidatura">${SEG.map(([k,l])=>`<button type="button" data-seg="${k}" class="${sg.estado===k?'is-on':''}">${l}</button>`).join('')}</div>
      <label class="field"><span>Obra que presento</span><input id="segObra" value="${esc(sg.obra||'')}" placeholder="Título, técnica, medidas"></label>
      <label class="field"><span>Notas</span><textarea id="segNotas" rows="3" placeholder="Documentación pendiente, envío, transporte…">${esc(sg.notas||'')}</textarea></label>
    </section>
    <section class="sec"><h3>Acciones</h3><div class="actions">
      <button class="btn" data-ics="${esc(c.id)}">Añadir al calendario (.ics)</button>
      <button class="btn" id="dEdit">Editar ficha</button>
      <button class="btn" id="dDup">Duplicar para el año siguiente</button>
      ${c._propio?`<button class="btn" id="dDel">Eliminar</button>`:c._edit?`<button class="btn" id="dRestore">Restaurar datos originales</button>`:`<button class="btn btn--ghost" id="dHide">Ocultar</button>`}
    </div></section>`;
  $('#scrim').hidden=false; $('#drawer').classList.add('is-open'); $('#drawer').setAttribute('aria-hidden','false');
  $('#dClose').focus();
  $$('#dBody [data-seg]').forEach(b=>b.onclick=()=>{ const k=b.dataset.seg; setSeg(id,{estado:sg.estado===k?null:k}); openDrawer(id); });
  $('#segObra').onchange=e=>setSeg(id,{obra:e.target.value.trim()});
  $('#segNotas').onchange=e=>setSeg(id,{notas:e.target.value.trim()});
  $('#dEdit').onclick=()=>openForm(c);
  $('#dDup').onclick=()=>{ const n=shiftYear(c); store.propios.push(n); save(); renderAll(); openDrawer(n.id); toast('Edición duplicada con fechas +1 año (marcada como previsión).'); };
  const del=$('#dDel'); if(del) del.onclick=()=>{ if(!confirm('¿Eliminar este concurso?')) return; store.propios=store.propios.filter(p=>p.id!==id); delete store.seg[id]; save(); closeDrawer(); renderAll(); };
  const rs=$('#dRestore'); if(rs) rs.onclick=()=>{ delete store.editados[id]; save(); renderAll(); openDrawer(id); toast('Datos originales restaurados.'); };
  const hd=$('#dHide'); if(hd) hd.onclick=()=>{ store.ocultos.push(id); save(); closeDrawer(); renderAll(); toast('Concurso oculto. «Datos → Borrar mis datos» lo recupera.'); };
}
function closeDrawer(){ openId=null; $('#drawer').classList.remove('is-open'); $('#drawer').setAttribute('aria-hidden','true'); $('#scrim').hidden=true; }
const DATE_FIELDS=['inscripcionInicio','inscripcionFin','entregaInicio','entregaFin','fallo','expoInicio','expoFin'];
function shiftYear(c){
  const n={...c}; delete n._propio; delete n._edit;
  n.id='p-'+Date.now().toString(36); n.estimado=true;
  DATE_FIELDS.forEach(f=>{ const d=parse(c[f]); if(d) n[f]=iso(new Date(d.getFullYear()+1,d.getMonth(),d.getDate())); });
  ['falloTexto','expoTexto','entregaTexto'].forEach(f=>delete n[f]);
  n.nombre=c.nombre.replace(/20(2\d)/g,(m,y)=>'20'+(+y+1));
  if(n.nombre===c.nombre) n.nombre=c.nombre+' (siguiente edición)';
  return n;
}

/* ---------- Formulario ---------- */
let editing=null;
function openForm(c){
  editing=c||null;
  const f=$('#form'); f.reset();
  $('#formTitle').textContent=c?'Editar concurso':'Añadir concurso';
  if(c){ [...f.elements].forEach(el=>{ if(!el.name) return; if(el.type==='checkbox') el.checked=!!c[el.name]; else el.value=c[el.name]??''; }); }
  $('#modal').showModal();
}
$('#form').addEventListener('submit',e=>{
  e.preventDefault();
  const f=e.target; const o={};
  [...f.elements].forEach(el=>{ if(!el.name) return; if(el.type==='checkbox') o[el.name]=el.checked; else if(el.type==='number') o[el.name]=el.value?+el.value:null; else o[el.name]=el.value.trim()||null; });
  if(!o.nombre) return;
  for(const k of ['urlBases','fuente']){ if(o[k]&&!safeUrl(o[k])){ toast('Los enlaces deben empezar por http:// o https://'); return; } }
  if(editing && editing._propio){ store.propios=store.propios.map(p=>p.id===editing.id?{...p,...o}:p); }
  else if(editing){ store.editados[editing.id]={...(store.editados[editing.id]||{}),...o}; ['falloTexto','expoTexto','entregaTexto'].forEach(k=>{ if(o[k.replace('Texto','')]!==editing[k.replace('Texto','')]) store.editados[editing.id][k]=null; }); }
  else { o.id='p-'+Date.now().toString(36); store.propios.push(o); }
  save(); $('#modal').close(); renderAll();
  const id=editing?editing.id:store.propios[store.propios.length-1].id; openDrawer(id);
  toast('Concurso guardado.');
});
$('#formCancel').onclick=()=>$('#modal').close();

/* ---------- ICS ---------- */
function icsEsc(s){ return String(s||'').replace(/\\/g,'\\\\').replace(/\n/g,'\\n').replace(/[,;]/g,m=>'\\'+m); }
function icsDate(d){ return iso(d).replace(/-/g,''); }
function buildIcs(list){
  const L=['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Trinuka Cuadros//Certamenes de pintura//ES','CALSCALE:GREGORIAN','X-WR-CALNAME:Certámenes de pintura'];
  const stamp=new Date().toISOString().replace(/[-:]/g,'').slice(0,15)+'Z';
  list.forEach(c=>{
    const desc=[c.premioTexto,c.requisitos&&('Requisitos: '+c.requisitos),c.medidas&&('Medidas: '+c.medidas),c.inscripcion&&('Inscripción: '+c.inscripcion),c.urlBases&&('Bases: '+c.urlBases),c.estimado&&'Fechas estimadas: confirmar en bases.'].filter(Boolean).join('\n');
    const add=(suffix,title,s,e,alarm)=>{
      L.push('BEGIN:VEVENT','UID:'+c.id+'-'+suffix+'@trinuka-cuadros','DTSTAMP:'+stamp,'DTSTART;VALUE=DATE:'+icsDate(s),'DTEND;VALUE=DATE:'+icsDate(addDays(e||s,1)),'SUMMARY:'+icsEsc(title+' · '+c.nombre),'LOCATION:'+icsEsc([c.expoLugar&&suffix==='expo'?c.expoLugar:null,c.localidad,c.provincia].filter(Boolean).join(', ')),'DESCRIPTION:'+icsEsc(desc));
      if(safeUrl(c.urlBases)||safeUrl(c.fuente)) L.push('URL:'+(safeUrl(c.urlBases)||safeUrl(c.fuente)));
      if(alarm) L.push('BEGIN:VALARM','ACTION:DISPLAY','DESCRIPTION:'+icsEsc('Cierra en 7 días: '+c.nombre),'TRIGGER:-P7D','END:VALARM','BEGIN:VALARM','ACTION:DISPLAY','DESCRIPTION:'+icsEsc('Cierra mañana: '+c.nombre),'TRIGGER:-P1D','END:VALARM');
      L.push('END:VEVENT');
    };
    events(c).forEach(e=>{
      if(e.type==='insc') add('insc','Fin presentación',e.start,null,true);
      if(e.type==='inscIni') add('ini','Abre inscripción',e.start);
      if(e.type==='entrega') add('entrega','Entrega de obra',e.start,e.end,true);
      if(e.type==='fallo') add('fallo','Fallo',e.start);
      if(e.type==='expo'&&!e.openStart&&!e.openEnd) add('expo','Exposición',e.start,e.end);
      else if(e.type==='expo') add('expo',e.openEnd?'Inaugura exposición':'Cierra exposición',e.openEnd?e.start:e.end);
    });
  });
  L.push('END:VCALENDAR');
  return L.join('\r\n');
}
function download(name,content,type){
  const blob=new Blob([content],{type}); const a=document.createElement('a');
  a.href=URL.createObjectURL(blob); a.download=name; document.body.appendChild(a); a.click();
  setTimeout(()=>{URL.revokeObjectURL(a.href);a.remove();},500);
}
$('#btnIcs').onclick=()=>{ const l=filtered(); if(!l.length) return toast('No hay concursos que exportar.'); download('certamenes-pintura.ics',buildIcs(l),'text/calendar'); toast(l.length+' concursos exportados al calendario.'); };

/* ---------- Menú de datos ---------- */
$('#btnMenu').onclick=e=>{ const m=$('#menu'); m.hidden=!m.hidden; e.currentTarget.setAttribute('aria-expanded',String(!m.hidden)); };
document.addEventListener('click',e=>{ if(!e.target.closest('#menu,#btnMenu')) $('#menu').hidden=true; });
$('#menu').addEventListener('click',e=>{
  const a=e.target.dataset.act; if(!a) return; $('#menu').hidden=true;
  if(a==='export') download('mis-concursos-pintura-'+iso(new Date())+'.json',JSON.stringify({app:'trinuka-concursos',version:1,exportado:new Date().toISOString(),store},null,2),'application/json');
  if(a==='print'){ setView('lista'); setTimeout(()=>window.print(),100); }
  if(a==='reset' && confirm('¿Borrar tu seguimiento, concursos añadidos y ediciones? Los datos iniciales se mantienen.')){ store=norm({}); save(); renderAll(); toast('Datos personales borrados.'); }
});
$('#fileImport').onchange=async e=>{
  const f=e.target.files[0]; if(!f) return;
  try{ const j=JSON.parse(await f.text()); const s=norm(j.store||j);
    store={prefs:{...store.prefs,...s.prefs},seg:{...store.seg,...s.seg},editados:{...store.editados,...s.editados},ocultos:[...new Set([...store.ocultos,...s.ocultos])],propios:[...store.propios.filter(p=>!s.propios.some(q=>q.id===p.id)),...s.propios]};
    save(); renderAll(); toast('Copia restaurada.');
  }catch(err){ toast('El archivo no es una copia válida.'); }
  e.target.value=''; $('#menu').hidden=true;
};

/* ---------- Vistas y eventos ---------- */
let view='agenda';
function setView(v){
  view=v;
  $$('.tab').forEach(t=>{const on=t.dataset.view===v;t.classList.toggle('is-active',on);t.setAttribute('aria-selected',String(on));});
  $$('.view').forEach(s=>s.classList.toggle('is-active',s.id==='view-'+v));
  renderView();
}
function renderView(){ ({agenda:renderAgenda,lista:renderList,calendario:renderCal,cronologia:renderGantt,mias:renderBoard})[view](); }
function renderAll(){ renderBoard(); renderView(); }
$$('.tab').forEach(t=>t.onclick=()=>setView(t.dataset.view));
$('#btnAdd').onclick=()=>openForm(null);
$('#calPrev').onclick=()=>{calMonth=new Date(calMonth.getFullYear(),calMonth.getMonth()-1,1);renderCal();};
$('#calNext').onclick=()=>{calMonth=new Date(calMonth.getFullYear(),calMonth.getMonth()+1,1);renderCal();};
$('#calToday').onclick=()=>{calMonth=new Date(TODAY.getFullYear(),TODAY.getMonth(),1);renderCal();};
$('#dClose').onclick=closeDrawer; $('#scrim').onclick=closeDrawer;
document.addEventListener('keydown',e=>{ if(e.key==='Escape'&&openId) closeDrawer(); if(e.key==='Enter'&&e.target.matches('[data-open].card,[data-open].mini')) openDrawer(e.target.dataset.open); });
document.addEventListener('click',e=>{
  const ics=e.target.closest('[data-ics]'); if(ics){ const c=byId(ics.dataset.ics); download((c.id)+'.ics',buildIcs([c]),'text/calendar'); toast('Calendario descargado: ábrelo para añadir las fechas.'); return; }
  const fol=e.target.closest('[data-follow]'); if(fol){ const id=fol.dataset.follow; const s=seg(id); setSeg(id,{estado:s&&s.estado?null:'interesa'}); toast(s&&s.estado?'Dejas de seguir este concurso.':'Añadido a «Mis candidaturas».'); return; }
  if(e.target.closest('[data-stop]')) return;
  const more=e.target.closest('[data-day]'); if(more){ expandedDay=more.dataset.day; renderCal(); return; }
  const op=e.target.closest('[data-open]'); if(op) openDrawer(op.dataset.open);
});
const bind=(id,key,fn=v=>v)=>$(id).addEventListener(id==='#fSearch'?'input':'change',e=>{F[key]=fn(e.target.type==='checkbox'?e.target.checked:e.target.value);renderView();});
bind('#fSearch','q'); bind('#fYear','year'); bind('#fEstado','estado'); bind('#fCcaa','ccaa'); bind('#fPremio','premio',Number); bind('#fEdad','edad'); $('#fEdad').value=F.edad; $('#fEdad').addEventListener('change',e=>{store.prefs={...store.prefs,edad:e.target.value};save();}); bind('#fGratis','gratis'); bind('#fSort','sort');
window.addEventListener('resize',()=>{ if(view==='cronologia') renderGantt(); });

let tt; function toast(m){ const t=$('#toast'); t.textContent=m; t.classList.add('is-on'); clearTimeout(tt); tt=setTimeout(()=>t.classList.remove('is-on'),2800); }

/* ---------- Inicio ---------- */
const ccaas=[...new Set(all().map(c=>c.ccaa).filter(Boolean))].sort((a,b)=>a.localeCompare(b,'es'));
$('#fCcaa').insertAdjacentHTML('beforeend',ccaas.map(c=>`<option>${esc(c)}</option>`).join(''));
$('#ccaaList').innerHTML=ccaas.map(c=>`<option value="${esc(c)}">`).join('');
$('#dataVersion').textContent=fd(window.DATA_VERSION);
renderAll();
})();
