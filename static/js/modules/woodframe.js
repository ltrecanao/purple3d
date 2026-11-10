/* Módulo Purple3D · Woodframing
   Panel de pared de entramado liviano de madera (platform frame): soleras, montantes, un vano opcional
   (puerta o ventana) con kings, jacks, dintel y antepecho, bloqueos, capas de panelizado (OSB, membrana, placa cementicia, lana de vidrio, barrera de vapor y yeso), listado de corte y control
   de faltantes y sobrantes de madera. Todo en milímetros. Contrato: references/contrato.md.

   AVISO: el resultado puede confundirse con un plano o un cálculo estructural. El aviso va en tres lugares
   coherentes: registry.json (campo "aviso"), el bloque #disc del html, y la imagen y el listado exportados. */
Purple3D.register({
id:'woodframe',
name:'Woodframing',
hint:'Tocá una pieza para sacarla o ponerla de nuevo. Arrastrá para girar.',
css:`
:root{--bg:#faf8ff;--card:#fff;--tx:#1e1b2e;--mut:#5e5877;--bd:#e4def5;--ac:#6d28d9;--acx:#fff;--soft:#f0eafd;--bad:#b3261e;--wrn:#8a5a00;--ok:#1b6e3c;
box-sizing:border-box;padding-top:env(safe-area-inset-top,0px);padding-bottom:env(safe-area-inset-bottom,0px)}
@media (prefers-color-scheme:dark){:root{--bg:#14111f;--card:#1d1930;--tx:#efeaff;--mut:#a9a1c4;--bd:#332c4d;--ac:#a78bfa;--acx:#1a1230;--soft:#251f3d;--bad:#ff8a80;--wrn:#f0c36a;--ok:#7ddc9f}}
*{box-sizing:border-box}
html,body{height:100%;margin:0}
body{background:var(--bg);color:var(--tx);font-family:system-ui,-apple-system,"Segoe UI",Roboto,sans-serif}
#pn{background:var(--card);padding:10px 14px}
:focus-visible{outline:3px solid var(--ac);outline-offset:2px;border-radius:6px}
button{font:inherit;font-size:.9rem;min-height:40px;padding:0 12px;border-radius:8px;border:1px solid var(--bd);background:var(--bg);color:var(--tx);cursor:pointer}
button.pri{background:var(--ac);color:var(--acx);border-color:var(--ac)}
.row{display:flex;align-items:center;flex-wrap:wrap;gap:10px;margin-bottom:8px}
.row label{font-size:.8rem;color:var(--mut);min-width:78px}
.row input[type=range]{flex:1;accent-color:var(--ac);min-width:120px}
.row output{font-size:.8rem;min-width:130px;text-align:right}
.bt{display:flex;flex-wrap:wrap;gap:8px;margin:8px 0}
.mp{display:grid;grid-template-columns:1fr 1fr;gap:8px;margin:8px 0}
.mp label{display:flex;flex-direction:column;font-size:.75rem;color:var(--mut);gap:2px;min-width:0}
.mp input{font:inherit;font-size:.9rem;min-height:40px;padding:6px 8px;border-radius:8px;border:1px solid var(--bd);background:var(--bg);color:var(--tx);min-width:0}
.ck{display:flex;flex-wrap:wrap;gap:4px 16px;margin:6px 0}
.ck label{display:inline-flex;align-items:center;gap:8px;min-height:40px;font-size:.85rem}
.ck input{width:20px;height:20px;accent-color:var(--ac)}
details{font-size:.85rem;color:var(--mut);margin:8px 0}
summary{cursor:pointer;color:var(--tx);font-weight:600;min-height:32px}
pre{white-space:pre-wrap;margin:6px 0;font-size:.8rem;color:var(--tx);font-family:inherit}
#disc{font-size:.75rem;line-height:1.4;color:var(--mut);border:1px solid var(--bd);border-left:3px solid #d9a441;border-radius:6px;padding:6px 8px;margin:8px 0}
.pr{display:flex;gap:6px;margin:6px 0}
.pr select,.pr input{font:inherit;font-size:.85rem;min-height:40px;padding:6px;border-radius:8px;border:1px solid var(--bd);background:var(--bg);color:var(--tx);min-width:0}
.pr select{flex:1}.pr input{width:84px}.pr input[data-f=qty]{width:64px}
.kf{display:flex;align-items:center;gap:8px;font-size:.8rem;margin:6px 0}
.kf input{font:inherit;width:72px;min-height:40px;padding:6px;border-radius:8px;border:1px solid var(--bd);background:var(--bg);color:var(--tx)}
#fal{font-size:.82rem;margin:8px 0}#fal div{margin:3px 0}
.bad{color:var(--bad)}.wrn{color:var(--wrn)}.ok{color:var(--ok)}.mt{color:var(--mut)}
#km{font-size:.8rem;color:var(--mut);margin:4px 0;min-height:1em}
#lay{display:block;font-size:.85rem;margin:6px 0}#lay[hidden]{display:none}#lay b{display:block;margin:6px 0 0;color:var(--tx)}#lay label{display:inline-flex;align-items:center;gap:8px;min-height:36px;margin-right:14px;color:var(--tx)}#lay input{width:20px;height:20px;accent-color:var(--ac)}
#ov{position:fixed;inset:0;z-index:20;background:rgba(0,0,0,.88);display:flex;flex-direction:column;align-items:center;gap:10px;padding:calc(12px + env(safe-area-inset-top,0px)) 12px calc(12px + env(safe-area-inset-bottom,0px));overflow:auto}
#ov[hidden]{display:none}
#ov img{max-width:100%;height:auto;border-radius:8px}
#ovm{font-size:.8rem;color:#e8e8ee;text-align:center;margin:0}
`,
html:`
<details id="mp" open><summary>Medidas del panel</summary><div class="mp">
<label>Largo (mm)<input id="pL" type="number" inputmode="numeric" value="3600"></label>
<label>Alto (mm)<input id="pH" type="number" inputmode="numeric" value="2700"></label>
<label>Separación entre montantes (mm)<input id="pS" type="number" inputmode="numeric" value="400"></label>
<label>Espesor de la pieza (mm)<input id="pT" type="number" inputmode="numeric" value="45"></label>
<label>Ancho de la pieza (mm)<input id="pD" type="number" inputmode="numeric" value="90"></label>
</div>
<div class="ck"><label><input id="cD" type="checkbox" checked>Doble solera superior</label><label><input id="cB" type="checkbox">Bloqueos a media altura</label></div>
</details>
<details id="mv" open><summary>Vano</summary>
<div class="ck"><label><input id="cV" type="checkbox" checked>Con vano</label></div>
<div class="mp">
<label>Ancho libre (mm)<input id="pW" type="number" inputmode="numeric" value="1200"></label>
<label>Alto libre (mm)<input id="pV" type="number" inputmode="numeric" value="1200"></label>
<label>Antepecho desde el piso (0 = puerta)<input id="pA" type="number" inputmode="numeric" value="900"></label>
<label>Posición desde el borde izquierdo (mm)<input id="pX" type="number" inputmode="numeric" value="1200"></label>
<label>Alto del dintel (mm)<input id="pI" type="number" inputmode="numeric" value="190"></label>
</div></details>
<div id="chk"></div>
<div class="row"><label for="ex">Explosión</label><input id="ex" type="range" min="0" max="100" value="0"></div>
<div class="row"><label for="st">Montaje</label><input id="st" type="range" min="1" max="11" step="1" value="11"><output id="stl" for="st"></output></div>
<div class="bt"><button id="bD" class="pri">Desarmar</button><button id="bR">Reiniciar</button><button id="bP">Panelizar</button><button id="bE">Exportar imagen</button></div>
<div id="lay" hidden></div>
<div id="disc" class="av"><b>Aviso:</b> Este módulo sirve solo para visualizar. No pretende ni debe usarse para reemplazar el plano ni el cálculo estructural correspondiente.</div>
<details id="sk" open><summary>Madera disponible</summary>
<div id="rows"></div>
<div class="kf"><label for="pK">Corte de sierra (mm)</label><input id="pK" type="number" inputmode="numeric" value="3"></div>
<div class="bt"><button id="bA">+ Agregar pieza</button><button id="bF">Cargar lista completa</button><button id="bV">Vaciar</button></div>
</details>
<div id="fal" role="status"></div>
<details><summary>Listado de corte</summary><pre id="ls"></pre>
<div class="bt"><button id="bK">Copiar listado</button><button id="bX">Descargar CSV</button></div><div id="km" role="status"></div></details>
<div id="ov" hidden><img id="oi" alt="Vista del panel de madera"><div class="bt"><button id="bS" class="pri">Guardar PNG</button><button id="bC">Cerrar</button></div><p id="ovm">Tocá Guardar PNG, o mantené apretada la imagen para guardarla.</p></div>
`,
mount(ctx){
const $=s=>ctx.panel.querySelector(s),V=ctx.viewer;
const COL={sol:0x8a5a2b,mon:0xd8b27a,king:0xd9a441,jack:0xe0703a,dint:0x6bb38a,ant:0x4f9ea8,cort:0xe6cf9a,blq:0xa0724a,osb:0xc9a56b,falta:0xd9534f};
const STEPS=['','1. Soleras','2. Montantes','3. Kings y jacks','4. Dintel y antepecho','5. Montantes cortos','6. Bloqueos','7. Doble solera','8. Tableros OSB','9. Membrana y placa cementicia','10. Lana de vidrio y barrera de vapor','11. Placa de yeso'];
const AV='Este módulo sirve solo para visualizar. No pretende ni debe usarse para reemplazar el plano ni el cálculo estructural correspondiente.';
const MINR=50;
/* capas de panelizado: exterior hacia +Z, interior hacia -Z. Las placas van en hojas comerciales; membrana, barrera y lana, en rollo continuo. */
const LAY=[
 {k:'osb',side:'ext',name:'Tablero OSB',e:11,w:1220,h:2440,col:COL.osb,op:1,step:8,dz:1.3},
 {k:'mem',side:'ext',name:'Membrana hidrófuga',e:2,col:0xf4f4f4,op:.85,step:9,dz:1.6},
 {k:'cem',side:'ext',name:'Placa cementicia',e:8,w:1200,h:2400,col:0x9aa1a6,op:1,step:9,dz:1.9},
 {k:'lana',side:'int',name:'Lana de vidrio',e:0,col:0xf0d34a,op:.85,step:10,dz:-.6},
 {k:'bar',side:'int',name:'Barrera de vapor',e:2,col:0x9ecbe8,op:.55,step:10,dz:-1},
 {k:'yeso',side:'int',name:'Placa de yeso',e:12.5,w:1200,h:2400,col:0xe8e4da,op:1,step:11,dz:-1.4}];
const SIDE={ext:'Exterior',int:'Interior'},layOn={};LAY.forEach(l=>{layOn[l.k]=true});
let parts=[],cur=null,desarmado=false,pan=false,stock=[],lastLH='';
const num=id=>+$('#'+id).value||0;
const clamp=(v,a,b)=>Math.max(a,Math.min(b,v));
const fmt=n=>String(n).replace('.',',');

/* 1. Parámetros: toda entrada se corrige a un rango razonable y se informa */
function params(){
 const err=[],warn=[];
 const fix=(v,a,b,t)=>{const x=Math.round(v),r=Math.round(clamp(x,a,b));if(r!==x)err.push(t+': '+x+' mm fuera de rango ('+a+'–'+b+'). Se usó '+r+' mm.');return r};
 const t=fix(num('pT'),25,75,'Espesor de la pieza'),D=fix(num('pD'),60,240,'Ancho de la pieza');
 const L=fix(num('pL'),900,12000,'Largo'),H=fix(num('pH'),1800,4000,'Alto'),sep=fix(num('pS'),200,800,'Separación entre montantes');
 const nTop=$('#cD').checked?2:1,top=H-nTop*t,op=$('#cV').checked;
 let w=0,vh=0,vs=0,vx=0,hd=0;
 if(op){
  hd=fix(num('pI'),90,400,'Alto del dintel');
  w=fix(num('pW'),300,L-6*t,'Ancho del vano');
  vx=fix(num('pX'),3*t,L-3*t-w,'Posición del vano');
  const vsMax=Math.max(0,top-hd-300),raw=Math.round(num('pA'));
  vs=clamp(raw,0,vsMax);
  if(vs>0&&vs<300)vs=vsMax>=300?300:0;
  if(vs!==raw)err.push('Antepecho: '+raw+' mm no es válido (0 para puerta, o de 300 a '+vsMax+'). Se usó '+vs+' mm.');
  vh=fix(num('pV'),300,top-hd-vs,'Alto del vano');
  if(w>1500)warn.push('Vano de '+w+' mm: el dintel debe verificarse por cálculo; el alto de '+hd+' mm es un dato ingresado, no calculado.');
  if(vx<300||L-vx-w<300)warn.push('Vano a menos de 300 mm de un borde: revisá el encuentro con el montante de esquina.');
  const gap=top-vs-vh-hd;
  if(gap>0&&gap<t)warn.push('Quedan '+gap+' mm entre el dintel y la solera superior: no se generan montantes cortos. Ajustá el alto del dintel o del vano.');
  if(D<2*t)warn.push('El ancho de la pieza es menor que dos espesores: el dintel se modela con una sola pieza.');
 }
 if(sep!==400&&sep!==600)warn.push('Separación de '+sep+' mm: lo habitual es 400 o 600 mm.');
 if(L>6000)warn.push('Panel de '+L+' mm: verificá si conviene dividirlo (transporte y montaje).');
 return{p:{L,H,sep,t,D,nTop,top,op,w,vh,vs,vx,hd,blq:$('#cB').checked,pan},err,warn}}

/* 2. Cálculo: genera las piezas en mm (nada de dibujo acá) */
function build(p){
 const{L,H,sep,t,D,nTop,top,op,w,vh,vs,vx,hd}=p,Z0=-D/2,Z1=D/2,out=[];
 const xL=vx,xR=vx+w,vTop=vs+vh,secS=t+' × '+D,secH=t+' × '+hd;
 const add=o=>{o.col0=o.col;o.dims=o.sec?o.sec+' × '+o.len:fmt(o.e)+' × '+Math.round(o.x1-o.x0)+' × '+Math.round(o.y1-o.y0);out.push(o);return o};
 const mad=(step,name,sec,x0,x1,y0,y1,z0,z1,col,len)=>add({step,name,sec,len,x0,x1,y0,y1,z0,z1,col});
 /* soleras (en una puerta la solera inferior se corta en el vano) */
 if(op&&vs===0){mad(1,'Solera inferior',secS,0,xL,0,t,Z0,Z1,COL.sol,xL);mad(1,'Solera inferior',secS,xR,L,0,t,Z0,Z1,COL.sol,L-xR)}
 else mad(1,'Solera inferior',secS,0,L,0,t,Z0,Z1,COL.sol,L);
 mad(1,'Solera superior',secS,0,L,top,top+t,Z0,Z1,COL.sol,L);
 if(nTop===2)mad(7,'Solera superior',secS,0,L,top+t,H,Z0,Z1,COL.sol,L);
 /* montantes: extremos y grilla al eje, fuera de la zona de kings y jacks */
 const hs=top-t,occ=[[0,t],[L-t,L]];if(op)occ.push([xL-2*t,xR+2*t]);
 const grid=[];for(let c=sep;c<L-t;c+=sep){const a=Math.round(c-t/2);grid.push([a,a+t])}
 const libres=grid.filter(g=>!occ.some(o=>g[0]<o[1]&&g[1]>o[0]));
 const fulls=[[0,t],[L-t,L]].concat(libres);
 fulls.forEach(g=>mad(2,'Montante',secS,g[0],g[1],t,top,Z0,Z1,COL.mon,hs));
 let kl=null,kr=null;
 if(op){
  kl=[xL-2*t,xL-t];kr=[xR+t,xR+2*t];fulls.push(kl,kr);
  [kl,kr].forEach(g=>mad(3,'King',secS,g[0],g[1],t,top,Z0,Z1,COL.king,hs));
  [[xL-t,xL],[xR,xR+t]].forEach(g=>mad(3,'Jack',secS,g[0],g[1],t,vTop,Z0,Z1,COL.jack,vTop-t));
  /* dintel doble apoyado en los jacks, entre kings */
  const hx0=xL-t,hx1=xR+t;
  if(D>=2*t){mad(4,'Dintel',secH,hx0,hx1,vTop,vTop+hd,Z0,Z0+t,COL.dint,w+2*t);mad(4,'Dintel',secH,hx0,hx1,vTop,vTop+hd,Z1-t,Z1,COL.dint,w+2*t)}
  else{const hz=Math.min(t,D)/2;mad(4,'Dintel',secH,hx0,hx1,vTop,vTop+hd,-hz,hz,COL.dint,w+2*t)}
  if(vs>0)mad(4,'Antepecho',secS,xL,xR,vs-t,vs,Z0,Z1,COL.ant,w);
  /* montantes cortos: sobre el dintel y bajo el antepecho, al eje de la grilla */
  const ya=vTop+hd;
  if(top-ya>=t)grid.filter(g=>g[0]>=xL-t&&g[1]<=xR+t).forEach(g=>mad(5,'Montante corto',secS,g[0],g[1],ya,top,Z0,Z1,COL.cort,top-ya));
  if(vs>0)grid.filter(g=>g[0]>=xL&&g[1]<=xR).forEach(g=>mad(5,'Montante corto',secS,g[0],g[1],t,vs-t,Z0,Z1,COL.cort,vs-2*t));
 }
 /* bloqueos entre montantes de altura completa (no cruzan el vano) */
 if(p.blq){
  const yb=Math.round((t+top)/2-t/2),f=fulls.slice().sort((a,b)=>a[0]-b[0]);
  for(let i=0;i<f.length-1;i++){const a=f[i],b=f[i+1],gap=b[0]-a[1];
   if(gap<=0||(op&&a===kl&&b===kr))continue;
   mad(6,'Bloqueo',secS,a[1],b[0],yb,yb+t,Z0,Z1,COL.blq,gap)}
 }
 /* panelizado: capas exteriores (OSB, membrana, placa cementicia) e interiores (lana, barrera de vapor, yeso), todas recortadas por el vano */
 const hojas={};
 if(p.pan){
  const R=op?[xL,xR,vs,vTop]:null;
  const lanaE=Math.max(20,D-10);
  const zl=ly=>ly.k==='osb'?[Z1,Z1+11]:ly.k==='mem'?[Z1+11,Z1+13]:ly.k==='cem'?[Z1+13,Z1+21]:ly.k==='lana'?[-lanaE/2,lanaE/2]:ly.k==='bar'?[Z0-2,Z0]:[Z0-14.5,Z0-2];
  const cortar=T=>{const rs=[];
   if(!R||R[0]>=T[1]||R[1]<=T[0]||R[2]>=T[3]||R[3]<=T[2])rs.push(T);
   else{const a=Math.max(T[0],R[0]),b=Math.min(T[1],R[1]);
    if(R[0]>T[0])rs.push([T[0],R[0],T[2],T[3]]);
    if(R[1]<T[1])rs.push([R[1],T[1],T[2],T[3]]);
    if(R[2]>T[2])rs.push([a,b,T[2],R[2]]);
    if(R[3]<T[3])rs.push([a,b,R[3],T[3]])}
   return rs};
  LAY.filter(ly=>layOn[ly.k]).forEach(ly=>{
   const z=zl(ly),e=z[1]-z[0],tiles=[];let n=0,area=0;
   if(ly.w){for(let x=0;x<L;x+=ly.w)for(let y=0;y<H;y+=ly.h)tiles.push([x,Math.min(x+ly.w,L),y,Math.min(y+ly.h,H)])}
   else tiles.push([0,L,0,H]);
   tiles.forEach(T=>{
    if(R&&R[0]<=T[0]&&R[1]>=T[1]&&R[2]<=T[2]&&R[3]>=T[3])return;
    n++;
    cortar(T).forEach(r=>{if(r[1]-r[0]>=MINR&&r[3]-r[2]>=MINR){area+=(r[1]-r[0])*(r[3]-r[2])/1e6;
     add({step:ly.step,name:ly.name+' '+fmt(e)+' mm',sec:'',len:0,e:e,x0:r[0],x1:r[1],y0:r[2],y1:r[3],z0:z[0],z1:z[1],col:ly.col,op:ly.op,dz:ly.dz,layer:ly.k})}})});
   hojas[ly.k]={n,area}})
 }
 /* explosión: cada paso se separa en una dirección (metros por unidad de explosión) */
 const DZ={2:.2,3:.4,4:.6,5:.8,6:1};
 out.forEach(q=>{const cx=(q.x0+q.x1)/2;let dy=0;
  if(q.step===1)dy=q.y0<H/2?-.3:.3;else if(q.step===7)dy=.5;
  q.xp=[(cx-L/2)*.00025,dy,q.dz!==undefined?q.dz:(DZ[q.step]||0)]});
 return{out,hojas}}
const EX=q=>q.xp||[0,0,0];

/* 3. Listado de corte: agrupa piezas iguales */
function groups(){const m={};parts.forEach(q=>{const k=q.name+'|'+q.dims;if(!m[k])m[k]={n:0,name:q.name,dims:q.dims,step:q.step};m[k].n++;m[k].step=Math.min(m[k].step,q.step)});
 return Object.values(m).sort((a,b)=>a.step-b.step||a.name.localeCompare(b.name)||a.dims.localeCompare(b.dims,'es',{numeric:true}))}
const lines=()=>groups().map(g=>g.n+' × '+g.name+' · '+g.dims+' mm');
function volumen(){return parts.filter(q=>q.sec).reduce((s,q)=>s+(q.x1-q.x0)*(q.y1-q.y0)*(q.z1-q.z0),0)/1e9}
function resumen(){const r=lines();
 const cp=LAY.filter(ly=>cur.hojas[ly.k]);
 if(cp.length){r.push('');cp.forEach(ly=>{const h=cur.hojas[ly.k];r.push(ly.w?ly.name+': '+h.n+' hojas de '+ly.w+' × '+ly.h+' mm (sin aprovechar recortes entre hojas).':ly.name+': '+fmt(h.area.toFixed(2))+' m² en rollo, con el vano recortado.')})}
 r.push('','Madera: '+fmt(volumen().toFixed(3))+' m³ (sin desperdicio).');return r}
function texto(){const p=cur.p;return ['Woodframing · panel de '+p.L+' × '+p.H+' mm · montantes cada '+p.sep+' mm · pieza '+p.t+' × '+p.D+' mm',''].concat(resumen(),['','Aviso: '+AV]).join('\n')}
function csv(){return '\ufeff'+['Cantidad;Pieza;Medidas (mm)'].concat(groups().map(g=>g.n+';'+g.name+';'+g.dims)).join('\r\n')+'\r\n"Aviso: '+AV+'"\r\n'}

/* 4. Madera disponible: faltantes, sobrantes y plan de corte (mejor ajuste, sin optimizar la compra) */
const secs=()=>[...new Set(parts.filter(q=>q.sec).map(q=>q.sec))];
function ln(cls,txt){const d=document.createElement('div');d.className=cls;d.textContent=txt;return d}
function check(){
 const fal=$('#fal');fal.textContent='';parts.forEach(q=>{q.miss=false});
 if(!stock.length){fal.appendChild(ln('mt','Cargá la madera disponible para ver faltantes y sobrantes. «Cargar lista completa» arma un stock con el largo exacto de cada pieza.'))}
 else{
  const kerf=clamp(Math.round(num('pK')),0,20),miss={},left={},cuts={};
  [...new Set(secs().concat(stock.map(r=>r.sec)))].forEach(sec=>{
   const need=parts.filter(q=>q.sec===sec).sort((a,b)=>b.len-a.len),pool=[];
   stock.filter(r=>r.sec===sec).forEach(r=>{for(let i=0;i<Math.min(r.qty,300);i++)if(r.len>0)pool.push({len:r.len,rem:r.len,c:[]})});
   need.forEach(q=>{let b=null;pool.forEach(s=>{if(s.rem>=q.len&&(!b||s.rem<b.rem))b=s});
    if(!b){q.miss=true;const k=q.name+' · '+q.sec+' × '+q.len+' mm';miss[k]=(miss[k]||0)+1;return}
    b.c.push(q.len);b.rem=Math.max(0,b.rem-q.len-kerf)});
   pool.forEach(s=>{if(!s.c.length){const k=sec+' × '+s.len+' mm';left[k]=(left[k]||0)+1}
    else if(s.c.length>1||s.rem>0||s.c[0]<s.len){const k=sec+' × '+s.len+' mm → '+s.c.join(' + ')+(s.rem>0?' (resto '+s.rem+' mm)':'');cuts[k]=(cuts[k]||0)+1}})});
  const nm=parts.filter(q=>q.miss).length,nl=parts.filter(q=>q.sec).length;
  if(nm)fal.appendChild(ln('bad','⛔ Panel incompleto: faltan '+nm+' de '+nl+' piezas de madera.'));
  Object.keys(miss).forEach(k=>fal.appendChild(ln('bad','⛔ Falta '+miss[k]+' × '+k)));
  Object.keys(left).forEach(k=>fal.appendChild(ln('wrn','⚠ Sobra '+left[k]+' × '+k+' (sin usar)')));
  Object.keys(cuts).forEach(k=>fal.appendChild(ln('mt','✂ Cortar '+cuts[k]+' × '+k)));
  if(!nm&&!Object.keys(left).length)fal.appendChild(ln('ok','✔ Madera suficiente, sin faltantes ni sobrantes de piezas completas.'));
 }
 /* las piezas faltantes se pintan de rojo (y llevan el texto de arriba: no dependen del color) */
 parts.forEach((q,i)=>{q.col=q.miss?COL.falta:q.col0;const m=V.meshes&&V.meshes[i];if(m&&m.material&&m.material.color&&m.material.color.setHex)m.material.color.setHex(q.col)})}

function draw(){
 const ss=secs(),rows=$('#rows');rows.textContent='';
 stock.forEach((r,i)=>{
  const d=document.createElement('div'),s=document.createElement('select'),l=document.createElement('input'),n=document.createElement('input'),x=document.createElement('button');
  d.className='pr';s.dataset.i=i;s.dataset.f='sec';s.setAttribute('aria-label','Sección de la madera '+(i+1));
  (ss.includes(r.sec)?ss:ss.concat(r.sec)).forEach(v=>{const o=document.createElement('option');o.textContent=v;o.selected=v===r.sec;s.appendChild(o)});
  [[l,'len',r.len,'Largo (mm)'],[n,'qty',r.qty,'Cantidad']].forEach(([e,f,v,a])=>{e.type='number';e.inputMode='numeric';e.min=0;e.dataset.i=i;e.dataset.f=f;e.value=v;e.setAttribute('aria-label',a+' de la madera '+(i+1))});
  x.textContent='×';x.dataset.x=i;x.setAttribute('aria-label','Quitar la madera '+(i+1));
  d.append(s,l,n,x);rows.appendChild(d)})}
$('#rows').addEventListener('input',e=>{const d=e.target.dataset;if(d.i===undefined||!stock[d.i])return;
 stock[d.i][d.f]=d.f==='sec'?e.target.value:clamp(Math.floor(+e.target.value)||0,0,d.f==='len'?20000:500);check()});
$('#rows').addEventListener('change',e=>{if(e.target.dataset.f==='sec'){stock[e.target.dataset.i].sec=e.target.value;check()}});
$('#rows').addEventListener('click',e=>{const x=e.target.dataset.x;if(x===undefined)return;stock.splice(+x,1);draw();check()});
$('#pK').oninput=check;
$('#bA').onclick=()=>{const s=secs()[0]||'',mx=Math.max(0,...parts.filter(q=>q.sec===s).map(q=>q.len));stock.push({sec:s,len:mx,qty:1});draw();check()};
$('#bF').onclick=()=>{const c={};parts.filter(q=>q.sec).forEach(q=>{const k=q.sec+'|'+q.len;c[k]=(c[k]||0)+1});
 stock=Object.keys(c).sort().map(k=>{const a=k.split('|');return{sec:a[0],len:+a[1],qty:c[k]}});draw();check()};
$('#bV').onclick=()=>{stock=[];draw();check()};

/* 5. Render y controles */
function render(){
 const{p,err,warn}=params();const b=build(p);parts=b.out;cur={p,hojas:b.hojas};
 Purple3D.report($('#chk'),{err,warn,asm:[
  'Todas las convenciones constructivas de este módulo son supuestos pendientes de revisión por quien conozca el oficio.',
  'Panel recto de pared de entramado liviano (platform frame), de un solo tramo y con un vano opcional (puerta o ventana). Sin esquinas, encuentros entre paneles ni arriostramientos.',
  'Escuadría de '+p.t+' × '+p.D+' mm (espesor × ancho): es un dato editable, verificá la medida real con tu aserradero. El ancho de la pieza es el espesor del panel.',
  'Montantes al eje cada '+p.sep+' mm contados desde el borde, más uno en cada extremo. Las soleras corren a todo el largo.',
  (p.nTop===2?'Doble solera superior, con la segunda del mismo largo que la primera (sin solape de juntas).':'Una sola solera superior.'),
  'Vano: king y jack a cada lado, dintel doble apoyado en los jacks y, en ventanas, antepecho plano con montantes cortos debajo. Sobre el dintel hay montantes cortos al eje de la grilla; si quedan menos altos que el espesor de la pieza, se omiten. En una puerta (antepecho 0) la solera inferior se corta en el vano.',
  'El alto del dintel es un dato ingresado: no se calcula según la luz ni las cargas.',
  'Bloqueos opcionales a media altura entre montantes de altura completa, sin escalonar.',
  'Panelizar: exterior con tablero OSB de 11 mm (hojas de 1220 × 2440 mm, en vertical), membrana hidrófuga y placa cementicia de 8 mm (hojas de 1200 × 2400 mm); interior con lana de vidrio (espesor del panel menos 10 mm), barrera de vapor y placa de yeso de 12,5 mm (hojas de 1200 × 2400 mm). Todo recortado por el vano; los recortes de menos de '+MINR+' mm de ancho o alto se omiten (se resuelven al colocar la hoja). Membrana, barrera y lana se tratan como rollo continuo. Sin juntas desfasadas, clavado, tornillería ni cintas de junta.',
  'Faltantes y sobrantes: se asigna cada pieza a la madera disponible de su misma sección, de la más justa a la más holgada, descontando el corte de sierra. No optimiza la compra.',
  'No incluye clavos, herrajes, tolerancias de armado ni contracción de la madera.']});
 V.setParts(parts,EX);
 const lh=p.L+'x'+p.H;if(lh!==lastLH){lastLH=lh;V.fit(p.L/2,p.H/2,0,Math.max(p.L,p.H))}
 V.setStep(num('st'));V.setExplosion(num('ex')/100);
 $('#ls').textContent=resumen().join('\n');draw();check()}

const stepTxt=()=>{$('#stl').textContent=STEPS[num('st')]||''};
const msg=t=>{$('#km').textContent=t};
$('#ex').oninput=()=>V.setExplosion(num('ex')/100);
$('#st').oninput=()=>{stepTxt();V.setStep(num('st'))};
V.onex=v=>{$('#ex').value=Math.round(v*100)};
$('#bD').onclick=()=>{desarmado=!desarmado;V.setExplosion(desarmado?1:0,true);$('#bD').textContent=desarmado?'Armar':'Desarmar'};
$('#bR').onclick=()=>{desarmado=false;$('#bD').textContent='Desarmar';$('#st').value=11;stepTxt();V.reset()};
const lay=$('#lay');
['ext','int'].forEach(sd=>{const t=document.createElement('b');t.textContent=SIDE[sd];lay.appendChild(t);
 LAY.filter(l=>l.side===sd).forEach(l=>{const lb=document.createElement('label'),i=document.createElement('input');i.type='checkbox';i.checked=true;i.dataset.k=l.k;lb.append(i,l.name);lay.appendChild(lb)})});
lay.addEventListener('change',e=>{const k=e.target.dataset.k;if(k===undefined)return;layOn[k]=e.target.checked;render()});
$('#bP').onclick=()=>{pan=!pan;lay.hidden=!pan;$('#bP').textContent=pan?'Quitar paneles':'Panelizar';$('#bP').classList.toggle('pri',pan);render()};
ctx.panel.querySelectorAll('#mp input,#mv input').forEach(i=>i.addEventListener('input',render));

/* 6. Exportaciones: la imagen y el listado llevan el aviso */
function conAviso(url,cb){
 const im=new Image();
 im.onload=()=>{try{
  const W=Math.max(im.width,640),pad=Math.round(W*.02),fs=Math.max(13,Math.round(W/60)),fh=Math.round(fs*1.4),c=document.createElement('canvas'),g=c.getContext('2d');
  const fuente=fs+'px system-ui,-apple-system,"Segoe UI",Roboto,sans-serif',p=cur.p;g.font=fuente;
  const rows=[];let l='';('Aviso: '+AV).split(' ').forEach(w=>{const t=l?l+' '+w:w;if(g.measureText(t).width>W-2*pad&&l){rows.push(l);l=w}else l=t});rows.push(l);
  c.width=W;c.height=im.height+pad*2+fh*(rows.length+1);
  g.fillStyle='#000';g.fillRect(0,0,c.width,c.height);g.drawImage(im,Math.round((W-im.width)/2),0);
  g.font=fuente;g.fillStyle='#e8e8ee';g.textBaseline='alphabetic';
  g.fillText('Woodframing · '+p.L+' × '+p.H+' mm · montantes cada '+p.sep+' mm',pad,im.height+pad+fs);
  rows.forEach((r,i)=>g.fillText(r,pad,im.height+pad+fs+fh*(i+1)));
  cb(c.toDataURL('image/png'))}catch(e){cb(url)}};
 im.onerror=()=>cb(url);im.src=url}
$('#bE').onclick=()=>{conAviso(V.snapshot(),u=>{$('#oi').src=u;$('#ov').hidden=false;$('#bS').focus()})};
$('#bC').onclick=()=>{$('#ov').hidden=true};
function bajar(href,nombre){const a=document.createElement('a');a.href=href;a.download=nombre;document.body.appendChild(a);a.click();a.remove()}
$('#bS').onclick=()=>bajar($('#oi').src,'woodframing.png');
$('#bX').onclick=()=>{try{const u=URL.createObjectURL(new Blob([csv()],{type:'text/csv;charset=utf-8'}));bajar(u,'woodframing-listado.csv');setTimeout(()=>URL.revokeObjectURL(u),1000);msg('Listado descargado.')}catch(e){msg('No se pudo descargar: usá Copiar listado.')}};
$('#bK').onclick=()=>{const t=texto(),ok=()=>msg('Listado copiado.'),ko=()=>{
  const a=document.createElement('textarea');a.value=t;a.style.cssText='position:fixed;opacity:0';document.body.appendChild(a);a.select();
  let r=false;try{r=document.execCommand('copy')}catch(e){}a.remove();msg(r?'Listado copiado.':'No se pudo copiar: usá Descargar CSV.')};
 try{navigator.clipboard.writeText(t).then(ok,ko)}catch(e){ko()}};

stepTxt();render()
}
});
