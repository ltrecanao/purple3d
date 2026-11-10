/* Purple3D · motor de visualización 3D (agnóstico: no conoce ningún módulo).
   Extensión: viewer.scene/camera/renderer/lights, onframe(), ontap(e), raycast(e,objs). Los modelos vienen en mm; la escena trabaja en metros.
   Un módulo entrega partes {step,name,x0,x1,y0,y1,z0,z1,col,...} y una función de explosión. */
(function(){
const K=.001;
class Viewer{
constructor(el){
const T=THREE,R=this.R=new T.WebGLRenderer({antialias:true,preserveDrawingBuffer:true});
R.setClearColor(0);R.setPixelRatio(Math.min(devicePixelRatio||1,2));el.appendChild(R.domElement);this.el=el;
this.S=new T.Scene();this.C=new T.PerspectiveCamera(40,1,.05,200);this.G=new T.Group();
this.grid=new T.GridHelper(12,24,0x555566,0x2a2a35);
this.lights=new T.Group();this.lights.add(new T.AmbientLight(0xffffff,.65));const dl=new T.DirectionalLight(0xffffff,.7);dl.position.set(3,6,5);this.lights.add(dl);
this.S.add(this.lights,this.grid,this.G);this.scene=this.S;this.camera=this.C;this.renderer=R;
Object.assign(this,{tg:new T.Vector3(),th:.6,ph:1.25,rd:7,ex:0,exT:0,mont:Infinity,hid:new Set(),parts:[],meshes:[],exf:()=>[0,0,0],onex:null,onpick:null,onframe:null,ontap:null});
this._input();new ResizeObserver(()=>this.resize()).observe(el);this.resize();
const loop=()=>{requestAnimationFrame(loop);
if(Math.abs(this.ex-this.exT)>.002){this.ex+=(this.exT-this.ex)*.14;if(this.onex)this.onex(this.ex);this.update()}
if(this.onframe)this.onframe(this);this.R.render(this.S,this.C)};loop()}
resize(){const w=this.el.clientWidth,h=this.el.clientHeight;if(!w||!h)return;this.R.setSize(w,h,false);this.C.aspect=w/h;this.C.updateProjectionMatrix()}
cam(){const{tg,rd,ph,th}=this;this.C.position.set(tg.x+rd*Math.sin(ph)*Math.sin(th),tg.y+rd*Math.cos(ph),tg.z+rd*Math.sin(ph)*Math.cos(th));this.C.lookAt(tg)}
fit(cx,cy,cz,size){this.tg.set(cx*K,cy*K,cz*K);this.rd=size*K*1.9;this.th=.6;this.ph=1.25;this.grid.position.set(this.tg.x,0,this.tg.z);this.home=[cx,cy,cz,size];this.cam()}
setParts(parts,exf){const T=THREE;while(this.G.children.length)this.G.remove(this.G.children[0]);
this.parts=parts;if(exf)this.exf=exf;this.hid.clear();
this.meshes=parts.map((q,i)=>{const g=new T.BoxGeometry((q.x1-q.x0)*K,(q.y1-q.y0)*K,(q.z1-q.z0)*K),m=new T.Mesh(g,new T.MeshLambertMaterial({color:q.col}));
m.add(new T.LineSegments(new T.EdgesGeometry(g),new T.LineBasicMaterial({color:0,transparent:true,opacity:.35})));
q.bx=(q.x0+q.x1)/2*K;q.by=(q.y0+q.y1)/2*K;q.bz=(q.z0+q.z1)/2*K;m.userData.i=i;this.G.add(m);return m});this.update()}
update(){this.meshes.forEach((m,i)=>{const q=this.parts[i],g=this.hid.has(i),o=this.exf(q)||[0,0,0],e=this.ex;
m.visible=(q.step||1)<=this.mont;m.material.transparent=g;m.material.opacity=g?.08:1;m.material.depthWrite=!g;m.children[0].visible=!g;
m.position.set(q.bx+o[0]*e,q.by+o[1]*e,q.bz+o[2]*e)})}
setStep(n){this.mont=n;this.update()}
setExplosion(v,anim){this.exT=v;if(!anim){this.ex=v;this.update()}}
toggleWhere(pred){const ids=this.parts.map((q,i)=>pred(q)?i:-1).filter(i=>i>=0),h=ids.every(i=>this.hid.has(i));
ids.forEach(i=>h?this.hid.delete(i):this.hid.add(i));this.update();return !h}
reset(){this.ex=this.exT=0;this.mont=Infinity;this.hid.clear();if(this.onex)this.onex(0);if(this.home)this.fit(...this.home);this.update()}
snapshot(){this.R.render(this.S,this.C);return this.R.domElement.toDataURL('image/png')}
raycast(e,objs){const r=this.R.domElement.getBoundingClientRect(),rc=new THREE.Raycaster();
rc.setFromCamera(new THREE.Vector2((e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height*2-1)),this.C);return rc.intersectObjects(objs,false)}
_pick(e){const cv=this.R.domElement,r=cv.getBoundingClientRect(),rc=new THREE.Raycaster();
rc.setFromCamera(new THREE.Vector2((e.clientX-r.left)/r.width*2-1,-((e.clientY-r.top)/r.height*2-1)),this.C);
const h=rc.intersectObjects(this.meshes.filter(m=>m.visible),false),t=h.find(x=>!this.hid.has(x.object.userData.i))||h[0];
if(t){const i=t.object.userData.i;this.hid.has(i)?this.hid.delete(i):this.hid.add(i);this.update();if(this.onpick)this.onpick(this.parts[i],i)}}
_input(){const cv=this.R.domElement,pt=new Map();let mv=0;cv.style.touchAction='none';
cv.onpointerdown=e=>{cv.setPointerCapture(e.pointerId);pt.set(e.pointerId,{x:e.clientX,y:e.clientY});mv=0};
cv.onpointermove=e=>{const a=pt.get(e.pointerId);if(!a)return;
if(pt.size==1){const dx=e.clientX-a.x,dy=e.clientY-a.y;mv+=Math.abs(dx)+Math.abs(dy);this.th-=dx*.008;this.ph=Math.max(.2,Math.min(2.9,this.ph-dy*.008))}
else{const o=[...pt.entries()].find(([k])=>k!=e.pointerId)[1],d0=Math.hypot(a.x-o.x,a.y-o.y),d1=Math.hypot(e.clientX-o.x,e.clientY-o.y);if(d1>0)this.rd=Math.max(.5,Math.min(40,this.rd*d0/d1));mv+=9}
a.x=e.clientX;a.y=e.clientY;this.cam()};
cv.onpointerup=e=>{if(pt.size==1&&mv<6){this.ontap?this.ontap(e):this._pick(e)}pt.delete(e.pointerId)};cv.onpointercancel=e=>pt.delete(e.pointerId);
cv.onwheel=e=>{e.preventDefault();this.rd=Math.max(.5,Math.min(40,this.rd*(1+e.deltaY*.001)));this.cam()}}
}
window.Purple3D={Viewer,modules:{},register(m){this.modules[m.id]=m},
/* report(el,{err,warn,asm}): muestra errores, advertencias y supuestos del armado (texto interno, no HTML del usuario) */
report(el,r){const e=x=>String(x).replace(/[&<>]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;'}[c])),li=(a,c,i)=>a.map(t=>'<div style="color:'+c+';margin:3px 0">'+i+' '+e(t)+'</div>').join('');
el.innerHTML='<div style="font-size:.85rem;margin:8px 0" role="status">'+li(r.err||[],'#d9534f','⛔')+li(r.warn||[],'#d99a1f','⚠')+((r.err||[]).length+(r.warn||[]).length?'':'<div style="color:#3fa564">✔ Medidas válidas</div>')+'</div>'
+(r.asm?'<details style="font-size:.85rem;margin:8px 0"><summary style="cursor:pointer"><b>Supuestos del armado</b> (verificá que coincidan con tu criterio)</summary><ul style="margin:6px 0;padding-left:20px">'+r.asm.map(t=>'<li>'+e(t)+'</li>').join('')+'</ul></details>':'')}};
})();
