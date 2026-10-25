const designs={
  precision:{name:'Precisión',number:'01',heading:'Claridad que no distrae.',description:'Azul tinta, superficies claras y una retícula precisa. La interfaz se aparta para que destaquen la información y las tareas.',fit:'La exploraría primero en herramientas de gestión, agendas y paneles de seguimiento.',palette:['#233146','#294f82','#e9eef6','#f5f7fa','#ffffff'],paletteText:'Tinta · Azul profundo · Niebla · Blanco',font:'Satoshi',fontText:'Satoshi. Una sola familia, jerarquías claras.',fontStyle:"'Satoshi', sans-serif"},
  margen:{name:'Margen',number:'02',heading:'Un espacio que invita a quedarse.',description:'Papel cálido, títulos con carácter editorial y líneas finas. Una identidad tranquila que da protagonismo a las palabras.',fit:'La exploraría primero en mapas literarios, lecturas, documentación y un dossier personal.',palette:['#362e28','#8d4733','#eee3d6','#f5f0e7','#fbf8f2'],paletteText:'Café · Terracota · Arena · Papel',font:'Boska + Satoshi',fontText:'Boska en títulos. Satoshi en textos y controles.',fontStyle:"'Boska', Georgia, serif"},
  taller:{name:'Taller',number:'03',heading:'Ideas con presencia propia.',description:'Carbón y lima mate, titulares con peso y formas más suaves. Una identidad expresiva sin renunciar al orden.',fit:'La exploraría primero en catálogos visuales, proyectos creativos y colecciones personales.',palette:['#292c23','#d1dc76','#e9ecda','#f2f1e9','#fbfaf5'],paletteText:'Carbón · Lima mate · Salvia · Marfil',font:'Cabinet Grotesk + Satoshi',fontText:'Cabinet Grotesk en títulos. Satoshi en la interfaz.',fontStyle:"'Cabinet Grotesk', sans-serif"}
};
const projects=[
  {id:1,name:'Mapa de lecturas',category:'Lecturas',description:'Personajes, lugares e historias conectadas.',status:'En curso'},
  {id:2,name:'Agenda personal',category:'Aplicaciones',description:'Tiempo y tareas con un poco más de orden.',status:'En curso'},
  {id:3,name:'Cuaderno visual',category:'Creatividad',description:'Una colección de imágenes e ideas por explorar.',status:'En curso'},
  {id:4,name:'Biblioteca de mundos',category:'Lecturas',description:'Un lugar para volver a tus universos favoritos.',status:'En curso'},
  {id:5,name:'Panel de hábitos',category:'Aplicaciones',description:'Pequeños avances, una mirada de conjunto.',status:'En curso'},
  {id:6,name:'Estudio de imágenes',category:'Creatividad',description:'Referencias y composiciones para la próxima idea.',status:'En curso'}
];
let theme='taller',filter='Todos',section='projects';
const favorites=new Set();
const $=s=>document.querySelector(s);
const safe=s=>s.replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
function render(){
  const query=$('#search').value.trim().toLocaleLowerCase('es');
  const items=projects.filter(p=>(filter==='Todos'||p.category===filter)&&(section!=='favorites'||favorites.has(p.id))&&`${p.name} ${p.description}`.toLocaleLowerCase('es').includes(query));
  $('#project-grid').innerHTML=items.length?items.map(p=>`<article class="project-card"><div class="card-top"><span class="project-category">${safe(p.category)}</span><button class="favorite" data-id="${p.id}" aria-pressed="${favorites.has(p.id)}" aria-label="${favorites.has(p.id)?'Quitar de':'Añadir a'} favoritos: ${safe(p.name)}" title="${favorites.has(p.id)?'Quitar de favoritos':'Añadir a favoritos'}">${favorites.has(p.id)?'★':'☆'}</button></div><h3>${safe(p.name)}</h3><p>${safe(p.description)}</p><div class="card-bottom"><span class="status">${p.status}</span><span class="card-index">${String(p.id).padStart(2,'0')} / PROYECTO</span></div></article>`).join(''):`<div class="empty"><h3>${section==='favorites'&&!favorites.size?'Tus favoritos empiezan aquí':'No hay coincidencias'}</h3><p>${section==='favorites'&&!favorites.size?'Marca la estrella de un proyecto para guardarlo en esta visita.':'Prueba otra búsqueda o cambia de categoría.'}</p></div>`;
  $('#fav-count').textContent=favorites.size;
  $('#total-count').textContent=String(projects.length).padStart(2,'0');
  $('#project-grid').querySelectorAll('.favorite').forEach(b=>b.addEventListener('click',()=>{const id=Number(b.dataset.id);favorites.has(id)?favorites.delete(id):favorites.add(id);render()}));
}
function setTheme(key){
  theme=key;const d=designs[key];
  $('#prototype').dataset.design=key;
  document.querySelectorAll('[data-theme]').forEach(b=>{b.classList.toggle('active',b.dataset.theme===key);b.setAttribute('aria-pressed',b.dataset.theme===key?'true':'false')});
  $('#current-name').textContent=`${d.number} / ${d.name.toUpperCase()}`;
  $('#design-heading').textContent=d.heading;
  $('#design-description').textContent=d.description;
  $('#design-fit').textContent=d.fit;
  $('#swatches').innerHTML=d.palette.map(c=>`<span class="swatch" style="background:${c}" title="${c}" aria-label="Color ${c}"></span>`).join('');
  $('#palette-caption').textContent=d.paletteText;
  $('#type-sample').style.fontFamily=d.fontStyle;
  $('#font-caption').textContent=d.fontText;
  $('#choose').textContent=`Elegir ${d.name} ↗`;
  $('#choice-result').textContent='';
}
document.querySelectorAll('[data-theme]').forEach(b=>b.addEventListener('click',()=>setTheme(b.dataset.theme)));
document.querySelectorAll('[data-view]').forEach(b=>b.addEventListener('click',()=>{$('#stage').classList.toggle('mobile',b.dataset.view==='mobile');document.querySelectorAll('[data-view]').forEach(v=>v.setAttribute('aria-pressed',v===b?'true':'false'))}));
document.querySelectorAll('[data-filter]').forEach(b=>b.addEventListener('click',()=>{filter=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(v=>{v.setAttribute('aria-pressed',v===b?'true':'false');v.classList.toggle('selected',v===b)});render()}));
document.querySelectorAll('[data-section]').forEach(b=>b.addEventListener('click',()=>{section=b.dataset.section;document.querySelectorAll('[data-section]').forEach(v=>{v.classList.toggle('active',v===b);v.setAttribute('aria-pressed',v===b?'true':'false')});$('.app-title-row h2').textContent=section==='favorites'?'Mis favoritos':'Mis proyectos';render()}));
$('#search').addEventListener('input',render);
$('#new-project').addEventListener('click',()=>$('#project-dialog').showModal());
$('#close-dialog').addEventListener('click',()=>$('#project-dialog').close());
$('#project-form').addEventListener('submit',e=>{e.preventDefault();const name=$('#project-name').value.trim();if(!name){$('#project-name').setCustomValidity('Escribe un nombre para el proyecto.');$('#project-name').reportValidity();return}projects.push({id:projects.length+1,name,category:$('#project-category').value,description:'Tu nueva idea, lista para tomar forma.',status:'Borrador'});$('#project-dialog').close();$('#project-form').reset();$('#search').value='';document.querySelector('[data-section=projects]').click();document.querySelector('[data-filter=Todos]').click();render()});
$('#project-name').addEventListener('input',()=>$('#project-name').setCustomValidity(''));
$('#choose').addEventListener('click',()=>{$('#choice-result').textContent=`Tu preferencia para esta visita: ${designs[theme].name}. Dímelo en el chat para que la convirtamos en la base del sistema. Esta elección no modifica tus artefactos ni se conserva al recargar.`});
setTheme(theme);render();
