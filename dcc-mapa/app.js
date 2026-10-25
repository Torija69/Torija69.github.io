(function(){
const BOOKS=window.BOOKS, G=window.GROUPS, NODES=window.NODES;
const LINKS=window.LINKS.map(([s,t,type,label,b])=>({source:s,target:t,type,label,b}));
const byId=Object.fromEntries(NODES.map(n=>[n.id,n]));
const TYPE={aliado:{c:'#4fb3bf',l:'Aliados'},familia:{c:'#e3a43b',l:'Familia / pareja'},enemigo:{c:'#e0605e',l:'Enemigos'},trabajo:{c:'#8c8577',l:'Trabajo'}};
let level=8; { const v=+(new URLSearchParams(location.search).get('libro')||location.hash.replace('#libro=','')); if(v>=1&&v<=8) level=v; }
let selected=null, view='map';

// ---------- spoiler buttons
const booksEl=document.getElementById('books');
BOOKS.forEach(b=>{const btn=document.createElement('button');btn.textContent=b.n;btn.title=b.n+'. '+b.t+' — '+b.f;btn.onclick=()=>setLevel(b.n);booksEl.appendChild(btn);});
function paintBooks(){[...booksEl.children].forEach((b,i)=>{b.classList.toggle('on',i+1<level);b.classList.toggle('cur',i+1===level);});}

// ---------- legend
const lg=document.getElementById('legend');
lg.innerHTML=Object.values(G).map(g=>`<span><i style="background:${g.color}"></i>${g.label}</span>`).join('')+
 '<span class="sep"></span>'+Object.values(TYPE).map(t=>`<span><b style="border-color:${t.c}"></b>${t.l}</span>`).join('');

// ---------- graph
const svg=d3.select('#graph'); const root=svg.append('g');
const gLinks=root.append('g'), gLabels=root.append('g'), gNodes=root.append('g');
const zoom=d3.zoom().scaleExtent([.3,4]).on('zoom',e=>root.attr('transform',e.transform));
svg.call(zoom).on('dblclick.zoom',null);
svg.on('click',e=>{ if(e.target===svg.node()) select(null); });
const sim=d3.forceSimulation().force('link',d3.forceLink().id(d=>d.id).distance(l=>l.source.id==='carl'||l.target.id==='carl'?120:80).strength(.35))
  .force('charge',d3.forceManyBody().strength(-520)).force('collide',d3.forceCollide(d=>d.r+10+Math.min(40,(d.n||'').length*2.6)).iterations(3))
  .force('x',d3.forceX().strength(.04)).force('y',d3.forceY().strength(.05));
let nodeSel, linkSel, labelSel, visNodes=[], visLinks=[];
const pos={};
function size(){const r=svg.node().getBoundingClientRect();return [r.width||800,r.height||600];}

function visible(){
  visNodes=NODES.filter(n=>n.b<=level).map(n=>{const p=pos[n.id]||{}; return Object.assign(n,{x:p.x??(Math.random()-.5)*300,y:p.y??(Math.random()-.5)*300});});
  const ids=new Set(visNodes.map(n=>n.id));
  visLinks=LINKS.filter(l=>l.b<=level&&ids.has(id(l.source))&&ids.has(id(l.target))).map(l=>({...l,source:id(l.source),target:id(l.target)}));
  const deg={}; visLinks.forEach(l=>{deg[l.source]=(deg[l.source]||0)+1;deg[l.target]=(deg[l.target]||0)+1;});
  visNodes.forEach(n=>{n.r=n.id==='carl'||n.id==='donut'?14:Math.min(12,5+Math.sqrt(deg[n.id]||0)*2.2);n.deg=deg[n.id]||0;});
}
function id(x){return typeof x==='object'?x.id:x;}
function fl(f,short){return /^\d/.test(f)?(short?'P':'Piso ')+f:f;}
function dead(n){return n.death&&n.death[0]<=level;}

function render(){
  visible();
  linkSel=gLinks.selectAll('line').data(visLinks,d=>d.source+'>'+d.target).join('line')
    .attr('stroke',d=>TYPE[d.type].c).attr('stroke-opacity',.55).attr('stroke-width',d=>d.type==='familia'?2:1.3)
    .attr('stroke-dasharray',d=>d.type==='enemigo'?'5 4':d.type==='trabajo'?'2 3':null);
  labelSel=gLabels.selectAll('text').data(visLinks,d=>d.source+'>'+d.target).join('text').attr('class','edge-label').attr('text-anchor','middle').text(d=>d.label).style('display','none');
  nodeSel=gNodes.selectAll('g.node').data(visNodes,d=>d.id).join(enter=>{
    const g=enter.append('g').attr('class','node');
    g.append('circle'); g.append('text').attr('dy','.32em');
    g.call(d3.drag().on('start',(e,d)=>{if(!e.active)sim.alphaTarget(.2).restart();d.fx=d.x;d.fy=d.y;})
      .on('drag',(e,d)=>{d.fx=e.x;d.fy=e.y;}).on('end',(e,d)=>{if(!e.active)sim.alphaTarget(0);d.fx=null;d.fy=null;}));
    g.on('click',(e,d)=>{e.stopPropagation();select(d.id);});
    return g;});
  nodeSel.select('circle').attr('r',d=>d.r).attr('fill',d=>G[d.g].color).attr('fill-opacity',d=>dead(d)?.35:1)
    .attr('stroke-dasharray',d=>dead(d)?'2 2':null).attr('stroke',d=>dead(d)?G[d.g].color:null);
  nodeSel.select('text').attr('x',d=>d.r+5).text(d=>d.n+(dead(d)?' †':'')).style('font-weight',d=>d.r>=14?600:400);
  sim.nodes(visNodes).on('tick',tick); sim.force('link').links(visLinks); sim.alpha(.8).restart();
  highlight();
}
function tick(){
  linkSel.attr('x1',d=>d.source.x).attr('y1',d=>d.source.y).attr('x2',d=>d.target.x).attr('y2',d=>d.target.y);
  labelSel.attr('x',d=>(d.source.x+d.target.x)/2).attr('y',d=>(d.source.y+d.target.y)/2-3);
  nodeSel.attr('transform',d=>{pos[d.id]={x:d.x,y:d.y};return `translate(${d.x},${d.y})`;});
}
function highlight(){
  if(!nodeSel) return;
  if(!selected||!byId[selected]||byId[selected].b>level){
    nodeSel.classed('dim',false).classed('sel',false); linkSel.classed('dim',false); labelSel.style('display','none'); return;}
  const nb=new Set([selected]); visLinks.forEach(l=>{if(l.source.id===selected||l.source===selected)nb.add(id(l.target)); if(l.target.id===selected||l.target===selected)nb.add(id(l.source));});
  nodeSel.classed('dim',d=>!nb.has(d.id)).classed('sel',d=>d.id===selected);
  const on=l=>id(l.source)===selected||id(l.target)===selected;
  linkSel.classed('dim',l=>!on(l)); labelSel.style('display',l=>on(l)?null:'none');
}
function fit(anim=true){
  const [w,h]=size(); if(!visNodes.length) return;
  const xs=visNodes.map(n=>n.x), ys=visNodes.map(n=>n.y);
  const x0=Math.min(...xs)-60,x1=Math.max(...xs)+110,y0=Math.min(...ys)-40,y1=Math.max(...ys)+40;
  const lg=document.getElementById('legend'); const lh=(lg&&getComputedStyle(lg).position==='absolute')?lg.getBoundingClientRect().height+24:0; const top=70; const hh=h-lh-top;
  const k=Math.min(2,.95*Math.min(w/(x1-x0),hh/(y1-y0)));
  const t=d3.zoomIdentity.translate(w/2-k*(x0+x1)/2,top+hh/2-k*(y0+y1)/2).scale(k);
  (anim?svg.transition().duration(500):svg).call(zoom.transform,t);
}
function focusNode(nid){
  const n=visNodes.find(x=>x.id===nid); if(!n) return; const [w,h]=size();
  const k=Math.max(1.1,d3.zoomTransform(svg.node()).k);
  svg.transition().duration(500).call(zoom.transform,d3.zoomIdentity.translate(w/2-k*n.x,h/2-k*n.y).scale(k));
}
document.getElementById('zin').onclick=()=>svg.transition().call(zoom.scaleBy,1.3);
document.getElementById('zout').onclick=()=>svg.transition().call(zoom.scaleBy,1/1.3);
document.getElementById('zfit').onclick=()=>fit();

// ---------- panel
const panel=document.getElementById('panel');
function bookLabel(b){const B=BOOKS[b-1];return `Libro ${b}`;}
function renderPanel(){
  const n=selected&&byId[selected];
  if(!n||n.b>level){
    const count=NODES.filter(x=>x.b<=level).length;
    panel.innerHTML=`<div class="empty"><h2>¿Quién es este?</h2>
      <p>Busca el nombre del personaje o tócalo en el mapa y verás en qué <b>libro y piso</b> lo conocisteis, qué pasó después y con quién está relacionado.</p>
      <p>Marca arriba <b>el libro por el que vas</b>: todo lo posterior (personajes, relaciones y muertes) queda oculto para evitar spoilers.</p>
      <p>Ahora mismo ves <b>${count}</b> personajes hasta el libro ${level}: <i style="font-style:normal;color:var(--muted)">${BOOKS[level-1].t}</i>.</p>
      <p>Pulsa <kbd>/</kbd> para buscar.</p></div>${srcFooter()}`;
    return;}
  const B=BOOKS[n.b-1], g=G[n.g];
  const s=(n.s||[]).filter(x=>x[0]<=level&&x[0]>=n.b);
  const hiddenS=(n.s||[]).some(x=>x[0]>level)||(n.death&&n.death[0]>level);
  let tl=`<li class="first"><span class="lb">Libro ${n.b} · ${fl(n.f)}</span>Primer encuentro</li>`;
  s.forEach(x=>tl+=`<li><span class="lb">Libro ${x[0]} · ${BOOKS[x[0]-1].f.split('·')[0].trim()}</span>${x[1]}</li>`);
  if(dead(n)) tl+=`<li class="dead"><span class="lb">Libro ${n.death[0]}</span>${n.death[1]}</li>`;
  const rels=visLinks.filter(l=>id(l.source)===n.id||id(l.target)===n.id).map(l=>{const o=byId[id(l.source)===n.id?id(l.target):id(l.source)];return {o,l};})
    .sort((a,b)=>a.l.b-b.l.b);
  panel.innerHTML=`<div class="chip"><i style="background:${g.color}"></i>${g.label}${dead(n)?' · fallecido':''}</div>
    <div class="dname">${n.n}</div>
    <div class="met"><div class="k">Os conocisteis en</div><div class="v">Libro ${n.b} · ${fl(n.f)}</div><div class="t">${B.t}</div></div>
    <p class="desc">${n.d}</p>
    <h3>Encuentros con Carl</h3><ul class="tl">${tl}</ul>
    <h3>Relaciones (${rels.length})</h3>
    <div class="rels">${rels.map(({o,l})=>`<button class="rel" data-id="${o.id}"><i style="background:${TYPE[l.type].c}"></i><div>${o.n}<small>${l.label}</small></div><span>L${l.b}</span></button>`).join('')||'<p class="empty">Sin relaciones visibles todavía.</p>'}</div>
    ${hiddenS?`<p class="hidden-note">Hay más información en libros posteriores al ${level}, oculta para evitar spoilers.</p>`:''}
    ${srcFooter()}`;
  panel.querySelectorAll('.rel').forEach(b=>b.onclick=()=>{select(b.dataset.id);focusNode(b.dataset.id);});
}
function srcFooter(){return `<footer class="src"><p style="margin-bottom:6px"><i>Dungeon Crawler Carl</i> © Matt Dinniman. Personajes, nombres y textos pertenecen a su autor y editoriales; web de fans no oficial y sin ánimo de lucro.</p>Datos recopilados de wikis de fans (<a href="https://dungeoncrawlercarlwiki.com/wiki/characters/" target="_blank" rel="noopener">DCC Wiki</a>, <a href="https://dungeon-crawler-carl.fandom.com/wiki/Category:Characters" target="_blank" rel="noopener">Fandom</a>). Algún piso puede variar según la fuente.</footer>`;}

function select(nid,scroll){selected=nid; highlight(); renderPanel(); if(view==='list') paintList(); if(nid&&scroll&&window.innerWidth<860) panel.scrollIntoView({behavior:'smooth'});}

// ---------- list view
const list=document.getElementById('list');
function paintList(){
  list.innerHTML=BOOKS.filter(b=>b.n<=level).map(b=>{
    const ns=NODES.filter(n=>n.b===b.n);
    return `<section class="bk"><h2><span>L${b.n}</span>${b.t}<em>${b.f}</em></h2><div class="cards">${ns.map(n=>`<button class="card" data-id="${n.id}" style="${n.id===selected?'border-color:var(--accent)':''}"><i style="background:${G[n.g].color};opacity:${dead(n)?.4:1}"></i><b>${n.n}${dead(n)?' †':''}</b><span>${fl(n.f,1)}</span></button>`).join('')}</div></section>`;}).join('');
  list.querySelectorAll('.card').forEach(c=>c.onclick=()=>select(c.dataset.id,1));
}
function setView(v){view=v;document.getElementById('tMap').classList.toggle('on',v==='map');document.getElementById('tList').classList.toggle('on',v==='list');
  list.classList.toggle('on',v==='list');['graph','zoomCtl','legend'].forEach(i=>document.getElementById(i).style.visibility=v==='map'?'visible':'hidden');
  if(v==='list') paintList();}
document.getElementById('tMap').onclick=()=>setView('map');
document.getElementById('tList').onclick=()=>setView('list');

// ---------- search
const q=document.getElementById('q'), res=document.getElementById('results'); let hits=[],hi=0;
const norm=s=>s.normalize('NFD').replace(/[\u0300-\u036f]/g,'').toLowerCase();
q.addEventListener('input',()=>{const t=norm(q.value.trim()); if(!t){res.style.display='none';return;}
  const ws=t.split(/\s+/); const sc=n=>{const k=norm(n.n+' '+n.id+' '+(n.a||'')); if(norm(n.n).includes(t)||k.includes(t)) return 2; const dd=k+' '+norm(n.d); if(ws.every(w=>dd.includes(w))) return 1; return ws.some(w=>w.length>=3&&k.split(/\s+/).some(x=>x.startsWith(w)))?0.5:0;}; hits=NODES.filter(n=>n.b<=level&&sc(n)>0).sort((x,y)=>sc(y)-sc(x)).slice(0,8); hi=0; drawHits();});
function drawHits(){ if(!hits.length){res.innerHTML='<button disabled>Sin resultados hasta este libro</button>';res.style.display='block';return;}
  res.innerHTML=hits.map((n,i)=>`<button class="${i===hi?'hl':''}" data-id="${n.id}">${n.n}<span>L${n.b} · ${fl(n.f,1)}</span></button>`).join(''); res.style.display='block';
  res.querySelectorAll('button[data-id]').forEach(b=>b.onclick=()=>pick(b.dataset.id));}
function pick(nid){select(nid,1); if(view==='map') focusNode(nid); q.value=''; res.style.display='none'; q.blur();}
q.addEventListener('keydown',e=>{ if(!hits.length) return;
  if(e.key==='ArrowDown'){hi=(hi+1)%hits.length;drawHits();e.preventDefault();}
  else if(e.key==='ArrowUp'){hi=(hi-1+hits.length)%hits.length;drawHits();e.preventDefault();}
  else if(e.key==='Enter'){pick(hits[hi].id);} else if(e.key==='Escape'){res.style.display='none';}});
document.addEventListener('keydown',e=>{ if(e.key==='/'&&document.activeElement!==q){e.preventDefault();q.focus();}});
document.addEventListener('click',e=>{ if(!e.target.closest('.search')) res.style.display='none';});

function setLevel(n){level=n; try{history.replaceState(null,'','#libro='+n);}catch(e){} paintBooks(); render(); renderPanel(); if(view==='list') paintList(); setTimeout(()=>fit(),900);}
paintBooks(); render(); renderPanel();
setTimeout(()=>fit(false),50); setTimeout(()=>fit(),1400);
// Abrir una ficha desde un enlace externo (p. ej. la vista del Iron Tangle): ?p=<id>
{ const p=new URLSearchParams(location.search).get('p'); if(p&&byId[p]&&byId[p].b<=level) setTimeout(()=>{select(p,1); focusNode(p);},1600); }
window.addEventListener('resize',()=>fit(false));
// Aviso de spoilers y autoría: se cierra para esta visita (sin localStorage, ver spec)
document.getElementById('noticeClose').onclick=()=>{document.getElementById('notice').hidden=true; setTimeout(()=>fit(false),50);};
})();
