/* Purple3D · módulo Drywall */
Purple3D.register({id:'drywall',name:'Drywall',hint:'Tocá una pieza para sacarla o ponerla de nuevo. Arrastrá para girar.',css:"\n:root{--ac:#b69df8;--mut:#a9a5b1;--ln:#3b3a42}\n*{box-sizing:border-box}\nbody{margin:0;background:#202126;color:#e6e1e9;font:16px system-ui,sans-serif}\n#hint{margin:0;padding:12px 16px;background:#000;font-size:18px}\n#cv{height:46vh;min-height:300px;background:#000;touch-action:none}\n#cv canvas{display:block;width:100%;height:100%}\nmain{padding:8px 16px 48px}\n.row{display:flex;align-items:center;gap:12px;margin:12px 0}\n.row span{width:96px;color:var(--mut)}\n.row b{min-width:130px;font-weight:400}\ninput[type=range]{flex:1;accent-color:var(--ac);padding:0;border:0;background:none}\nbutton,select,input,textarea{font:inherit;color:inherit;background:#15151a;border:1px solid var(--ln);border-radius:12px;padding:12px 14px;min-width:0}\nbutton.on{background:var(--ac);color:#1d1635;border-color:var(--ac)}\n.bt{display:flex;flex-wrap:wrap;gap:10px;margin:10px 0}\n.g{display:grid;grid-template-columns:1fr 1fr;gap:10px;margin-top:10px}\n.g label{display:flex;flex-direction:column;gap:4px;color:var(--mut);font-size:14px}\n.sr{display:grid;grid-template-columns:1fr 1fr 80px 52px;gap:8px;margin:8px 0}\n#st{margin:14px 0 6px}.ok{color:#6fd08c}.wr{color:#e8b04a}\n.av{border-left:4px solid #e8b04a;background:#1a1a20;border-radius:8px;padding:12px;color:var(--mut);margin:14px 0}\ndetails{margin:16px 0}summary{cursor:pointer;color:var(--mut);font-size:18px}\ntextarea{width:100%;height:110px;margin-top:10px}pre{white-space:pre-wrap;font-size:13px;color:var(--mut)}\n#ov{position:fixed;inset:0;background:rgba(0,0,0,.9);display:none;flex-direction:column;align-items:center;gap:12px;padding:16px;overflow:auto;z-index:9}\n#ov img{width:100%;max-width:900px;border-radius:12px}\n\n/* === Suite Purple: layout app (mobile first + desktop) === */\nhtml,body{height:100%;overscroll-behavior:none;-webkit-tap-highlight-color:transparent}\nbody{display:flex;flex-direction:column;position:relative;overflow:hidden}\n#hint{position:absolute;z-index:2;top:8px;left:12px;right:12px;margin:0;padding:0;background:none;font-size:.85rem;color:#e8e8ee;text-shadow:0 1px 2px #000;pointer-events:none}\n#cv{flex:none;height:44dvh;min-height:240px}\nmain{flex:1;min-height:0;overflow:auto;padding:12px 16px 32px}\nbutton{min-height:44px}\n:focus-visible{outline:3px solid var(--ac);outline-offset:2px}\n@media (min-width:820px){body{flex-direction:row}#cv{flex:1;height:100%;min-height:0}main{flex:none;width:420px;max-width:42vw;border-left:1px solid var(--ln)}}\n",html:"\n<div class=\"row\"><span>Explosión</span><input id=\"ex\" type=\"range\" min=\"0\" max=\"100\" value=\"0\"></div>\n<div class=\"row\"><span>Montaje</span><input id=\"mo\" type=\"range\" min=\"1\" max=\"5\" value=\"5\"><b id=\"ml\"></b></div>\n<div class=\"bt\"><button id=\"bD\" class=\"on\">Desarmar</button><button id=\"bR\">Reiniciar</button><button id=\"bP\" class=\"on\">Quitar placas</button></div>\n<div class=\"bt\" id=\"vb\"><button data-v=\"ventana\" class=\"on\">Ventana</button><button data-v=\"puerta\">Puerta</button><button data-v=\"sin\">Sin vano</button></div>\n<div class=\"bt\"><button id=\"bE\">Exportar imagen</button></div>\n<div id=\"st\"></div><div id=\"vn\" style=\"color:var(--mut)\"></div>\n<div class=\"av\"><b>Aviso:</b> este programa sirve solo para visualizar. No pretende ni debe usarse para reemplazar el plano ni el cálculo estructural correspondiente.</div>\n\n<details open><summary>▼ Medidas del panel</summary><div class=\"g\" id=\"pr\">\n<label>Largo (mm)<input id=\"L\" type=\"number\" inputmode=\"numeric\" value=\"3600\"></label>\n<label>Alto (mm)<input id=\"H\" type=\"number\" inputmode=\"numeric\" value=\"2700\"></label>\n<label>Perfil (mm)<select id=\"perf\"><option>70</option><option>90</option><option>100</option></select></label>\n<label>Separación montantes<select id=\"sep\"><option>400</option><option>480</option><option>600</option></select></label>\n<label>Placa (espesor)<select id=\"esp\"><option>9.5</option><option selected>12.5</option><option>15</option></select></label>\n<label>Capas por cara<select id=\"capas\"><option>1</option><option>2</option></select></label>\n<label>Sentido<select id=\"sent\"><option value=\"v\">Placas verticales</option><option value=\"h\">Placas horizontales</option></select></label>\n<label>Placa estándar<select id=\"plate\"><option value=\"1200x2400\">1200 × 2400</option><option value=\"1200x2600\">1200 × 2600</option><option value=\"1200x3000\">1200 × 3000</option></select></label>\n<label>Ancho vano<input id=\"vw\" type=\"number\" inputmode=\"numeric\" value=\"1200\"></label>\n<label>Alto vano<input id=\"vh\" type=\"number\" inputmode=\"numeric\" value=\"1200\"></label>\n<label>Antepecho<input id=\"vs\" type=\"number\" inputmode=\"numeric\" value=\"900\"></label>\n<label>Posición X vano<input id=\"vx\" type=\"number\" inputmode=\"numeric\" value=\"1200\"></label>\n</div></details>\n<div id=\"chk\"></div>\n\n<details open><summary>▼ Placas disponibles</summary>\n<div style=\"color:var(--mut);font-size:14px;margin-top:8px\">Largo · ancho · cantidad (mm). Si no cargás nada, se calcula con stock ilimitado de placa estándar. Las placas se cortan según haga falta.</div>\n<div id=\"stock\"></div>\n<div class=\"bt\"><button id=\"bA\">+ Agregar placa</button><button id=\"bF\">Cargar lista completa</button><button id=\"bV\">Vaciar</button></div>\n<div style=\"color:var(--mut);margin-top:12px;font-weight:600\">Pegar listado de placas</div>\n<textarea id=\"tx\" placeholder=\"Una línea por tipo de placa, por ejemplo:&#10;6 × Placa 1200 x 2400 mm&#10;2 × Placa 1200 x 2600 mm\"></textarea>\n<div class=\"row\"><label><input id=\"rp\" type=\"checkbox\" checked style=\"width:20px;height:20px\"> Reemplazar la lista actual</label></div>\n<div class=\"bt\"><button id=\"bI\" class=\"on\">Importar listado</button></div>\n</details>\n\n<details><summary>Listado de corte</summary><pre id=\"ls\"></pre></details>\n<div id=\"ov\"><img id=\"oi\"><div class=\"bt\"><button id=\"bS\" class=\"on\">Guardar PNG</button><button id=\"bC\">Cerrar</button></div><p style=\"color:#fff;text-align:center\">Tocá Guardar PNG, o mantené apretada la imagen para guardarla.</p></div>\n\n",
mount(ctx){
const $=s=>document.querySelector(s),F=35,K=.001;
const C={s:0x7e90ab,m:0x5b7fb3,j:0xe0883a,d:0x5fb58a,c:0xb066c8,a:0xb7c0ca,b:0xdccaa4};
const STEPS=['','1. Soleras','2. Montantes','3. Vano','4. Placas cara A','5. Placas cara B'];
let vano='ventana',stock=[],hid=new Set(),ex=0,exT=0,mont=5,parts=[],meshes=[],pieces=[],O=null,OS=[],extra=[],bad=0,stTxt='';
const num=id=>+$('#'+id).value||0;
function params(){const[s,l]=$('#plate').value.split('x').map(Number);return{L:Math.max(num('L'),600),H:Math.max(num('H'),600),sep:num('sep'),W:num('perf'),esp:+$('#esp').value,capas:+$('#capas').value,sent:$('#sent').value,s,l,vw:num('vw'),vh:num('vh'),vs:num('vs'),vx:num('vx')}}
function sub(r,o){const a=Math.max(r.x0,o.x0),b=Math.min(r.x1,o.x1),c=Math.max(r.y0,o.y0),d=Math.min(r.y1,o.y1);
if(a>=b||c>=d)return[r];
return[{x0:r.x0,x1:a,y0:r.y0,y1:r.y1},{x0:b,x1:r.x1,y0:r.y0,y1:r.y1},{x0:a,x1:b,y0:r.y0,y1:c},{x0:a,x1:b,y0:d,y1:r.y1}].filter(q=>q.x1-q.x0>1&&q.y1-q.y0>1)}
function validate(p,dropped){const err=[...(dropped||[])],warn=[],{L,H,sep,vw,vh,vs,vx}=p;
if(num('L')<600||num('H')<600)err.push('Largo y alto mínimos: 600 mm. Se usó el mínimo.');
if(vano!='sin'){
if(vw>L-200)err.push('Ancho de vano ('+vw+' mm) no entra en el panel: se recortó a '+(L-200)+' mm.');
if(vx<100||vx+vw>L-100)warn.push('Vano a menos de 100 mm de un borde: se corrió para que entre.');
if(vano=='ventana'&&vs<100)warn.push('Antepecho menor a 100 mm: se corrigió.');
if(vs+vh>H-150&&vano=='ventana')err.push('El vano (antepecho + alto = '+(vs+vh)+' mm) deja menos de 150 mm hasta arriba: se recortó.');
if(vano=='puerta'&&vh>H-150)err.push('Alto de puerta ('+vh+' mm) no entra en el panel: se recortó.');
if(vw>1500)warn.push('Vano de '+vw+' mm: el dintel debe verificarse por cálculo.');}
if(sep>600)warn.push('Separación de '+sep+' mm: supera el máximo habitual (600 mm).');
if(L>6000)warn.push('Panel de '+L+' mm: verificá si conviene dividirlo.');
Purple3D.report(document.getElementById('chk'),{err,warn,asm:[
'Solera arriba y abajo; montantes a la separación elegida, más uno en cada borde.',
'En el vano: jamba a cada lado, dintel y (en ventana) antepecho; montantes cortos sobre y bajo el vano.',
'Con 2 capas, la segunda capa se corre medio ancho de placa para trabar juntas.',
'Las placas se cortan por el vano; se avisa si una junta cae sin apoyo en un montante.',
'No incluye cálculo estructural ni fijaciones.']})}
function build(){
const p=params(),{L,H,sep,W,esp,capas,sent}=p;parts=[];pieces=[];O=null;OS=[];bad=0;
const add=(step,name,x0,x1,y0,y1,z0,z1,col,x)=>parts.push({step,name,x0,x1,y0,y1,z0,z1,col,...x});
const mkO=(t,w,h,s,x)=>{const vw=Math.min(w,L-4*F),x0=Math.max(2*F,Math.min(x,L-vw-2*F)),y0=t=='puerta'?0:Math.max(2*F,s);return{t,x0,x1:x0+vw,y0,y1:Math.min(H-3*F,y0+h)}},cand=[],dropped=[];
if(vano!='sin')cand.push(mkO(vano,p.vw,p.vh,p.vs,p.vx));extra.forEach(e=>cand.push(mkO(e.t,e.w,e.h,e.s,e.x)));
cand.sort((a,b)=>a.x0-b.x0).forEach(o=>{const pr=OS[OS.length-1];if(pr&&o.x0-pr.x1<150)dropped.push('Vano en X '+Math.round(o.x0)+' mm: queda a menos de 150 mm del vano anterior; se omitió.');else OS.push(o)});
O=OS[0]||null;validate(p,dropped);
add(1,'Solera',0,L,0,F,-W/2,W/2,C.s);add(1,'Solera',0,L,H-F,H,-W/2,W/2,C.s);
const cs=[F/2];for(let k=1;k*sep<L-1.5*F;k++)if(k*sep>1.5*F)cs.push(k*sep);cs.push(L-F/2);
const z=W/2-1;
cs.forEach(c=>{const x0=c-F/2,x1=c+F/2;
const o=OS.find(o=>x1>o.x0-F&&x0<o.x1+F);if(o){if(x0>=o.x0&&x1<=o.x1){add(3,'Montante corto',x0,x1,o.y1+F,H-1,-z,z,C.c);if(o.y0>0)add(3,'Montante corto',x0,x1,1,o.y0-F,-z,z,C.c)}return}
add(2,'Montante',x0,x1,1,H-1,-z,z,C.m)});
OS.forEach(o=>{add(3,'Jamba',o.x0-F,o.x0,1,H-1,-z,z,C.j);add(3,'Jamba',o.x1,o.x1+F,1,H-1,-z,z,C.j);
add(3,'Dintel',o.x0,o.x1,o.y1,o.y1+F,-W/2,W/2,C.d);if(o.y0>0)add(3,'Antepecho',o.x0,o.x1,o.y0-F,o.y0,-W/2,W/2,C.d)});
const w=sent=='v'?p.s:p.l,h=sent=='v'?p.l:p.s,js=new Set();
for(let f=0;f<2;f++)for(let l=0;l<capas;l++){
const off=l%2?w/2:0,zb=W/2+l*esp,[z0,z1]=f?[-zb-esp,-zb]:[zb,zb+esp];
for(let x=-off;x<L;x+=w)for(let y=0;y<H;y+=h){
const r={x0:Math.max(x,0),x1:Math.min(x+w,L),y0:y,y1:Math.min(y+h,H)};
for(const q of OS.reduce((rs,o)=>rs.flatMap(r=>sub(r,o)),[r])){
add(4+f,'Placa',q.x0,q.x1,q.y0,q.y1,z0,z1,f?C.b:C.a,{lay:l,face:f});
const a=q.x1-q.x0,b=q.y1-q.y0;pieces.push(sent=='v'?{s:a,l:b}:{s:b,l:a});
if(f==0&&l==0&&q.x0>1)js.add(Math.round(q.x0))}}}
js.forEach(x=>{if(!cs.some(c=>Math.abs(c-x)<=F/2))bad++});
}
function place(b,p){let k=-1,m=1e12;b.f.forEach((r,i)=>{if(r.w>=p.s&&r.h>=p.l&&r.w*r.h<m){m=r.w*r.h;k=i}});
if(k<0)return false;const r=b.f.splice(k,1)[0];
if(r.w-p.s>0)b.f.push({x:r.x+p.s,y:r.y,w:r.w-p.s,h:r.h});
if(r.h-p.l>0)b.f.push({x:r.x,y:r.y+p.l,w:p.s,h:r.h-p.l});b.n++;return true}
function nest(ps,st){const bins=[],av=[],P=params();
st.forEach(r=>{for(let i=0;i<r.n;i++)av.push({S:r.s,L:r.l})});
ps.sort((a,b)=>b.s*b.l-a.s*a.l);
for(const p of ps){let ok=bins.some(b=>place(b,p));
while(!ok&&av.length){const a=av.shift(),b={S:a.S,L:a.L,n:0,f:[{x:0,y:0,w:a.S,h:a.L}]};bins.push(b);ok=place(b,p)}
if(!ok){const b={S:P.s,L:P.l,x:1,n:0,f:[{x:0,y:0,w:P.s,h:P.l}]};bins.push(b);place(b,p)}}
return bins.filter(b=>b.n)}
function lines(){const p=params(),m={},pm={};
parts.filter(q=>q.step<4).forEach(q=>{const h=q.x1-q.x0>q.y1-q.y0,len=Math.round(h?q.x1-q.x0:q.y1-q.y0),t=/Solera|Dintel|Antepecho/.test(q.name)?'PGU':'PGC',k=`${q.name} ${t} ${p.W} x 0.50 · ${len} mm`;m[k]=(m[k]||0)+1});
parts.filter(q=>q.step>3).forEach(q=>{const k=`Placa ${p.esp} mm · ${Math.round(q.x1-q.x0)} × ${Math.round(q.y1-q.y0)} mm`;pm[k]=(pm[k]||0)+1});
return Object.entries(m).map(([k,n])=>`${n} × ${k}`).concat(Object.entries(pm).sort((a,b)=>b[1]-a[1]).map(([k,n])=>`${n} × ${k}`))}
function calc(){
const p=params(),ub=nest(pieces.map(x=>({...x})),stock.map(x=>({...x}))),ext=ub.filter(b=>b.x).length,own=ub.length-ext;
const tot=ub.reduce((a,b)=>a+b.S*b.L,0),ar=pieces.reduce((a,q)=>a+q.s*q.l,0),ap=tot?Math.round(100*ar/tot):0,ws=[];
if(bad)ws.push(`${bad} junta(s) de la 1.ª capa no caen sobre un montante`);
if(stock.length&&ext)ws.push(`faltan ${ext} placa(s) en el stock cargado`);
let t=stock.length?`Stock: usa ${own} de ${stock.reduce((a,r)=>a+r.n,0)} placas`:`Se necesitan ${ub.length} placas de ${p.s} × ${p.l} mm`;
t+=` · aprovechamiento ${ap}%`;
const first=ws.length?`<span class="wr">⚠ ${ws.join(' · ')}</span>`:`<span class="ok">✓ Panel completo: ${pieces.length} piezas de placa</span>`;
$('#st').innerHTML=first+'<br>'+t;stTxt=(ws.length?'⚠ '+ws.join(' · '):'✓ Panel completo: '+pieces.length+' piezas de placa')+' · '+t;
$('#vn').textContent=OS.map((o,i)=>`▭ Vano ${i+1}: ${Math.round(o.x1-o.x0)} × ${Math.round(o.y1-o.y0)} mm libre entre jambas`).join(' · ');
$('#ls').textContent=lines().join('\n')}

const V=ctx.viewer,EX=q=>q.step==1?[0,(q.y0?1:-1)*.3,0]:q.step==2?[0,0,.35]:q.step==3?[0,0,.7]:q.step==4?[0,0,1.3+q.lay*.35]:[0,0,-(1.3+q.lay*.35)];
function fit(){const p=params();V.fit(p.L/2,p.H/2,0,Math.max(p.L,p.H))}
/* edición manual: las ediciones se guardan como operaciones y se reaplican sobre el armado automático */
let ed=[],edKey='',edit=false,selId=-1,edMsg='';
function applyEd(){const p=params(),z=p.W/2-1;parts.forEach((q,i)=>q.id=i);
ed.forEach(o=>{const q=parts.find(x=>x.id===o.id);
if(o.t=='del'&&q)parts.splice(parts.indexOf(q),1);
else if(o.t=='mv'&&q){q.x0+=o.dx;q.x1+=o.dx;q.y0+=o.dy;q.y1+=o.dy}
else if(o.t=='dup'&&q)parts.push({...q,id:o.nid,x0:q.x0+o.dx,x1:q.x1+o.dx,y0:q.y0+o.dy,y1:q.y1+o.dy});
else if(o.t=='add')parts.push({id:o.nid,step:2,name:'Montante',x0:p.L/2-F/2,x1:p.L/2+F/2,y0:1,y1:p.H-1,z0:-z,z1:z,col:C.m})});
pieces=parts.filter(q=>q.step>3).map(q=>{const a=q.x1-q.x0,b=q.y1-q.y0;return p.sent=='v'?{s:a,l:b}:{s:b,l:a}})}
const eb=document.createElement('div');
eb.innerHTML='<div class="bt"><button id="bed">Editar piezas</button><button id="bun" hidden>Deshacer</button><button id="bre" hidden>Restaurar automático</button></div><div id="edp" hidden><div id="edn" style="margin:6px 0;color:var(--mut)"></div><div class="bt"><label style="display:flex;align-items:center;gap:6px">Paso (mm)<input id="edst" type="number" inputmode="numeric" min="1" value="10" style="width:76px"></label><button data-m="-1,0" aria-label="Izquierda">◀</button><button data-m="1,0" aria-label="Derecha">▶</button><button data-m="0,1" aria-label="Arriba">▲</button><button data-m="0,-1" aria-label="Abajo">▼</button></div><div class="bt"><button id="edd">Duplicar</button><button id="edx">Eliminar</button><button id="eda">+ Montante</button></div></div><div id="edm" style="color:var(--mut)"></div>';
$('#st').parentNode.insertBefore(eb,$('#st'));
function nid(){return Math.max(-1,...parts.map(q=>q.id))+1}
function showEd(){const q=parts.find(x=>x.id===selId);if(!q)selId=-1;
$('#edp').hidden=!edit;$('#bun').hidden=$('#bre').hidden=!edit;$('#bun').disabled=!ed.length;
$('#bed').textContent=edit?'Salir de edición':'Editar piezas';$('#bed').classList.toggle('on',edit);
$('#edn').textContent=q?`Seleccionada: ${q.name} · ${Math.round(q.x1-q.x0)} × ${Math.round(q.y1-q.y0)} mm · X ${Math.round(q.x0)} · Y ${Math.round(q.y0)}`:'Tocá una pieza del panel para seleccionarla.';
document.querySelectorAll('#edp button').forEach(b=>{if(b.id!='eda')b.disabled=!q});$('#edm').textContent=edMsg}
function op(o){ed.push(o);all()}
$('#bed').onclick=()=>{edit=!edit;if(!edit)selId=-1;edMsg='';showEd()};
$('#bun').onclick=()=>{ed.pop();selId=-1;all()};
$('#bre').onclick=()=>{ed=[];selId=-1;edMsg='Panel restaurado al armado automático.';all()};
$('#edp').onclick=e=>{const b=e.target;if(b.dataset.m){const[x,y]=b.dataset.m.split(',').map(Number),s=Math.max(1,+$('#edst').value||10);op({t:'mv',id:selId,dx:x*s,dy:y*s})}};
$('#edx').onclick=()=>{const id=selId;selId=-1;op({t:'del',id})};
$('#edd').onclick=()=>{const n=nid();op({t:'dup',id:selId,nid:n,dx:100,dy:0});selId=n};
$('#eda').onclick=()=>{const n=nid();op({t:'add',nid:n});selId=n};
V.ontap=e=>{if(!edit)return V._pick(e);const h=V.raycast(e,V.meshes.filter(m=>m.visible))[0];if(h){selId=parts[h.object.userData.i].id;showEd()}};
V.onframe=()=>{const i=parts.findIndex(q=>q.id===selId);V.meshes.forEach((m,k)=>m.material.emissive.setHex(k===i?0x4b3bd0:0))};
/* vanos adicionales */
const xb=document.createElement('div');
xb.innerHTML='<details open><summary>▼ Vanos adicionales</summary><div style="color:var(--mut);font-size:13px;margin-top:6px">Tipo · Ancho · Alto · Antepecho · Posición X (mm). Entre vanos debe quedar al menos 150 mm.</div><div id="xv"></div><div class="bt"><button id="xa">+ Agregar vano</button></div></details>';
$('#chk').parentNode.insertBefore(xb,$('#chk'));
function drawX(){$('#xv').innerHTML=extra.map((e,i)=>`<div class="sr" style="grid-template-columns:96px repeat(4,1fr) 44px"><select data-i="${i}" data-k="t"><option value="ventana"${e.t=='ventana'?' selected':''}>Ventana</option><option value="puerta"${e.t=='puerta'?' selected':''}>Puerta</option></select>`+['w','h','s','x'].map(k=>`<input type="number" inputmode="numeric" value="${e[k]}" data-i="${i}" data-k="${k}" aria-label="${k}">`).join('')+`<button data-x="${i}" aria-label="Quitar vano">×</button></div>`).join('')}
$('#xv').oninput=e=>{const d=e.target.dataset;if(d.k===undefined)return;extra[d.i][d.k]=d.k=='t'?e.target.value:+e.target.value||0;all()};
$('#xv').onclick=e=>{const i=e.target.dataset.x;if(i===undefined)return;extra.splice(+i,1);drawX();all()};
$('#xa').onclick=()=>{extra.push({t:'ventana',w:900,h:1200,s:900,x:Math.max(0,params().L-1500)});drawX();all()};
function all(){const key=JSON.stringify([params(),vano,extra]);if(key!==edKey){if(ed.length)edMsg='Se descartaron las ediciones manuales al cambiar las medidas.';ed=[];selId=-1;edKey=key}
build();applyEd();V.setParts(parts,EX);calc();
if(ed.length){$('#st').innerHTML+='<br><span class="wr">✎ Panel editado manualmente ('+ed.length+' cambio/s): verificalo contra tu criterio.</span>';stTxt+=' · ✎ editado manualmente ('+ed.length+')'}
showEd();edMsg='';$('#ml').textContent=STEPS[+$('#mo').value];$('#bP').textContent='Quitar placas'}
V.onex=e=>{$('#ex').value=e*100};
$('#ex').oninput=e=>V.setExplosion(e.target.value/100);
$('#mo').oninput=e=>{V.setStep(+e.target.value);$('#ml').textContent=STEPS[+e.target.value]};
$('#bD').onclick=()=>{const on=V.exT<.5;V.setExplosion(on?1:0,true);$('#bD').textContent=on?'Armar':'Desarmar'};
$('#bR').onclick=()=>{V.reset();$('#mo').value=5;$('#ex').value=0;$('#bD').textContent='Desarmar';$('#bP').textContent='Quitar placas';$('#ml').textContent=STEPS[5]};
$('#bP').onclick=()=>{$('#bP').textContent=V.toggleWhere(q=>q.step>3)?'Poner placas':'Quitar placas'};
$('#vb').onclick=e=>{const v=e.target.dataset.v;if(!v)return;vano=v;[...$('#vb').children].forEach(b=>b.classList.toggle('on',b==e.target));
if(v=='puerta'){$('#vw').value=900;$('#vh').value=2050}if(v=='ventana'){$('#vw').value=1200;$('#vh').value=1200;$('#vs').value=900}all()};
$('#pr').oninput=()=>{all();fit()};
/* stock */
function drawStock(){$('#stock').innerHTML=stock.map((r,i)=>`<div class="sr"><input type="number" inputmode="numeric" value="${r.l}" data-i="${i}" data-k="l"><input type="number" inputmode="numeric" value="${r.s}" data-i="${i}" data-k="s"><input type="number" inputmode="numeric" value="${r.n}" data-i="${i}" data-k="n"><button data-x="${i}">×</button></div>`).join('')}
$('#stock').oninput=e=>{const d=e.target.dataset;if(d.k){stock[d.i][d.k]=Math.max(0,+e.target.value||0);calc()}};
$('#stock').onclick=e=>{const i=e.target.dataset.x;if(i!==undefined){stock.splice(+i,1);drawStock();calc()}};
$('#bA').onclick=()=>{const p=params();stock.push({l:p.l,s:p.s,n:1});drawStock();calc()};
$('#bV').onclick=()=>{stock=[];drawStock();calc()};
$('#bF').onclick=()=>{const p=params(),n=nest(pieces.map(x=>({...x})),[]).length;stock=[{l:p.l,s:p.s,n}];drawStock();calc()};
$('#bI').onclick=()=>{const out=[];$('#tx').value.split('\n').forEach(l=>{const n=parseInt(l),nums=(l.replace(/^\s*\d+\s*[x×]/i,'').match(/\d{3,4}/g)||[]).slice(-2).map(Number);
if(n>0&&nums.length==2)out.push({n,l:Math.max(...nums),s:Math.min(...nums)})});
if(!out.length)return;stock=$('#rp').checked?out:stock.concat(out);drawStock();calc()};
/* exportar */
function exportImg(){
const p=params(),ls=lines(),sc=1160/p.L,top=110,hh=p.H*sc,Hh=Math.round(top+hh+70+ls.length*26+130),c=document.createElement('canvas');
c.width=1240;c.height=Hh;const g=c.getContext('2d'),X=40,rx=a=>X+a*sc,ry=a=>top+(p.H-a)*sc;
g.fillStyle='#15151a';g.fillRect(0,0,1240,Hh);
g.fillStyle='#fff';g.font='bold 30px sans-serif';g.fillText('Panel drywall · '+({ventana:'Vano ventana',puerta:'Vano puerta',sin:'Sin vano'})[vano],X,48);
g.fillStyle='#a9a5b1';g.font='18px sans-serif';g.fillText(`Vista frontal · ${p.L} × ${p.H} mm · perfiles ${p.W} x 0.50 · placa ${p.esp} mm × ${p.capas} capa(s) por cara`,X,80);
parts.filter(q=>q.step<4).forEach(q=>{g.fillStyle='#'+q.col.toString(16).padStart(6,'0');g.fillRect(rx(q.x0),ry(q.y1),(q.x1-q.x0)*sc,(q.y1-q.y0)*sc)});
g.strokeStyle='rgba(255,255,255,.45)';g.setLineDash([6,5]);
parts.filter(q=>q.step==4&&q.lay==0).forEach(q=>g.strokeRect(rx(q.x0),ry(q.y1),(q.x1-q.x0)*sc,(q.y1-q.y0)*sc));
g.setLineDash([]);g.strokeStyle='#666';g.strokeRect(X,top,p.L*sc,hh);
OS.forEach((o,i)=>{g.fillStyle='#fff';g.font='20px sans-serif';g.textAlign='center';g.fillText((OS.length>1?`Vano ${i+1} · `:'Vano ')+`${Math.round(o.x1-o.x0)} × ${Math.round(o.y1-o.y0)} mm`,rx((o.x0+o.x1)/2),ry((o.y0+o.y1)/2));g.textAlign='left'});
let y=top+hh+44;g.fillStyle='#fff';g.font='bold 20px sans-serif';g.fillText('Listado de corte',X,y);
g.font='17px sans-serif';g.fillStyle='#d8d4de';ls.forEach(l=>{y+=26;g.fillText(l,X,y)});
y+=40;g.fillStyle=/⚠/.test(stTxt)?'#e8b04a':'#6fd08c';g.font='16px sans-serif';g.fillText(stTxt,X,y);
y+=32;g.fillStyle='#8d8995';g.font='14px sans-serif';g.fillText('Aviso: este programa sirve solo para visualizar. No pretende ni debe usarse para reemplazar el plano ni el cálculo estructural correspondiente.',X,y);
$('#oi').src=c.toDataURL('image/png');$('#ov').style.display='flex'}
$('#bE').onclick=exportImg;$('#bC').onclick=()=>$('#ov').style.display='none';
$('#bS').onclick=()=>{const a=document.createElement('a');a.href=$('#oi').src;a.download='panel-drywall.png';a.click()};
all();fit();drawStock();
}});
