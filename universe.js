const imageCaptions={"p10-0": "An overall view of the treehouse model, with small living spaces arranged around a branching structure.", "p10-1": "A closer view of the curved wall, furniture, and walkway beneath the branch.", "p10-4-upright": "A pencil study of curved lines and the relationship between the branch and supporting structure.", "p10-6": "A low-angle detail showing how the layered platforms frame the space below.", "p15-0": "A blue skeleton study, with pale bones set against a dark background.", "p15-1": "A closer study of the rib cage, using blue lines to describe its curved structure.", "p9-7": "A root form passes through a white horizontal platform, connecting the spaces above and below.", "p9-4": "A pencil sketch exploring intersecting planes and the placement of the vertical form.", "p9-6": "The root shown on its own, revealing its branching shape and natural points of support.", "p9-8": "An alternate view of the assembled model, with a small figure suggesting its scale.", "p14-0": "A blue ball seen through the goal net, a small point of color against the grass.", "p14-1": "A closer view of the goal net, where curved lines overlap the field in the background.", "p12-4": "Red and dark plant-like forms fill a tilted box, creating an imagined miniature environment.", "p12-0": "A pale branching form supports a dark box containing red, organic textures.", "p12-1": "White branching forms stretch across green patches inside a transparent-sided box.", "p12-2": "Dark, tangled forms and pale branches create a dense landscape within the box.", "p16-0": "A vertical architectural composition combining a tall central form with overlapping structural lines.", "p16-1": "An architectural study of beams, platforms, and layered black-and-white textures."};
const portraitImages={"p10-0": false, "p10-1": false, "p10-4-upright": false, "p10-6": false, "p15-0": true, "p15-1": false, "p9-7": false, "p9-4": false, "p9-6": false, "p9-8": false, "p14-0": false, "p14-1": false, "p12-4": false, "p12-0": true, "p12-1": true, "p12-2": false, "p16-0": true, "p16-1": true};
const projects=[
{title:'Treehouse',category:'3D',subtitle:'Branches, shelter & layered spaces',image:'p10-0',gallery:['p10-0','p10-1','p10-4-upright','p10-6'],copy:'An exploration of natural materials and layered spaces. Branches become a framework for imagining shelter, connecting small structures with the forms of a tree.'},
{title:'Blue skeletons',category:'2D',subtitle:'A study of lines and inner structures',image:'p15-0',gallery:['p15-0','p15-1'],copy:'These works explore the skeleton as a structure of lines and connected forms. Blue brings the internal framework into focus, inviting a closer look at rhythm and detail.'},
{title:'Root-based structures',category:'3D',subtitle:'Natural forms, balance & support',image:'p9-7',gallery:['p9-7','p9-4','p9-6','p9-8'],copy:'A study of how natural forms can suggest support and space. Roots and branching structures become a starting point for exploring connections and balance.'},
{title:'An ordinary encounter',category:'Photography',subtitle:'A blue ball and a goal net',image:'p14-0',gallery:['p14-0','p14-1'],copy:'A blue ball caught my attention after class. These photographs come from a small pause in an everyday place: a moment of noticing the relationship between an object, a net, and the space around them.'},
{title:'Imagined plant life',category:'3D',subtitle:'Mutant plants & miniature worlds',image:'p12-4',gallery:['p12-4','p12-0','p12-1','p12-2'],copy:'Plant boxes become small spaces for imagined forms of life. This work explores the playful side of making, combining unfamiliar shapes with the idea of growth.'},
{title:'Architectural studies',category:'2D',subtitle:'Black, white & the spaces between',image:'p16-0',gallery:['p16-0','p16-1'],copy:'Black-and-white works exploring architectural forms and the relationship between light, shadow, and structure. The limited palette draws attention to edges and spatial detail.'}
];
const desk=document.querySelector('#desk'),project=document.querySelector('#project'),about=document.querySelector('#about');let current=0,filter='All',dragged=false;
const desktop=[[3,20,-7],[38,85,6],[69,0,-4],[8,545,5],[43,540,-5],[72,540,8]];
const mobile=[[0,20,-6],[53,120,5],[0,540,4],[53,650,-5],[0,1060,-4],[53,1160,5]];
let composition=0;
function layout(shuffle=false){
 if(shuffle){
  const palette=['#fff6e8','#ff9dc5','#b9c7ff','#ffc18f','#a9e4da'];
  document.querySelectorAll('.piece:not(.hidden)').forEach(el=>{
   const current=el.dataset.cardColor;
   const choices=palette.filter(color=>color!==current);
   const color=choices[Math.floor(Math.random()*choices.length)];
   el.style.backgroundColor=color;el.dataset.cardColor=color;
  });
 }
 const visible=[...document.querySelectorAll('.piece:not(.hidden)')];
 const W=desk.clientWidth,small=W<620;
 if(filter!=='All'){
  const filteredOrder=visible.slice();
  if(shuffle&&filteredOrder.length>1){for(let i=filteredOrder.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[filteredOrder[i],filteredOrder[j]]=[filteredOrder[j],filteredOrder[i]]}if(filteredOrder.every((el,i)=>el===visible[i]))filteredOrder.push(filteredOrder.shift())}
  const count=visible.length,pad=24,gap=30;
  const width=Math.min(350,(W-pad*2-gap*(count-1))/count);
  const total=count*width+gap*(count-1),start=(W-total)/2;
  let height=0;
  filteredOrder.forEach((el,i)=>{el.style.width=width+'px';el.style.left=(start+i*(width+gap))+'px';const offset=shuffle?Math.random()*20:[5,16,0][i%3],angle=shuffle?((parseFloat(el.style.getPropertyValue('--tilt'))||-2)>0?-(1.5+Math.random()*2.5):1.5+Math.random()*2.5):count===1?-2:[-3,2.5,-1.5][i%3];el.style.top=(28+offset)+'px';el.style.setProperty('--tilt',angle+'deg');el.style.zIndex='';height=Math.max(height,el.offsetHeight+offset+12)});
  desk.style.height=(height+65)+'px';return;
 }

 let order=visible.slice();
 if(shuffle){for(let i=order.length-1;i>0;i--){const j=Math.floor(Math.random()*(i+1));[order[i],order[j]]=[order[j],order[i]]}if(order.length>1&&order.every((el,i)=>el===visible[i]))order.push(order.shift())}
 if(shuffle)composition=(composition+1)%9;
 if(composition!==0&&order.length>2&&W>=380){
  const n=order.length,mode=composition;
  const width=W*(W<700?.31:.235);
  const boxes=order.map(el=>{const w=width*(mode>=7?.88+Math.random()*.22:1);el.style.width=w+'px';return {el,w,h:el.offsetHeight}});
  const maxH=Math.max(...boxes.map(b=>b.h));
  const ring=mode===1||mode===2;
  boxes.forEach((b,i)=>{
   let x,y;
   if(ring){
    const a=-Math.PI/2+i*Math.PI*2/n;
    const rx=(W-width-70)/2;
    const ry=mode===1?Math.max(maxH*1.05,rx):Math.max(maxH*.95,rx*.62);
    x=W/2+Math.cos(a)*rx-b.w/2;y=35+ry+Math.sin(a)*ry;
   }else if(mode===3){
    const col=i%2,row=Math.floor(i/2);
    x=30+col*(W-b.w-65)+(Math.sin(i*1.6)*W*.035);
    y=30+row*(maxH*.86+60)+col*maxH*.32;
   }else if(mode===4){
    const lanes=W<700?2:3,col=i%lanes,row=Math.floor(i/lanes);
    x=30+col*(W-b.w-60)/(lanes-1);y=30+row*(maxH+80)+Math.sin(col*1.7+row)*maxH*.38;
   }else if(mode===5){
    const lanes=W<700?2:3,col=i%lanes,row=Math.floor(i/lanes);
    x=30+col*(W-b.w-60)/(lanes-1);y=30+row*(maxH+60)+col*maxH*.3;
   }else if(mode===6){
    const t=i/(n-1),a=t*Math.PI*2;
    x=30+t*(W-b.w-60);y=35+i*(maxH*.55)+Math.sin(a)*maxH*.3;
   }else{
    x=25+Math.random()*(W-b.w-50);y=30+Math.random()*maxH*2.5;
   }
   b.x=Math.max(15,Math.min(W-b.w-15,x));b.y=y;b.angle=mode>=7?Math.random()*28-14:Math.random()*12-6;
  });
  if(ring){
   // Fit cards to the ring instead of pushing them out of its silhouette.
   let factor=1;
   for(let i=0;i<n;i++)for(let j=i+1;j<n;j++){
    const a=boxes[i],b=boxes[j],dx=Math.abs((a.x+a.w/2)-(b.x+b.w/2)),dy=Math.abs((a.y+a.h/2)-(b.y+b.h/2));
    factor=Math.min(factor,Math.max(dx/((a.w+b.w)/2+35),dy/((a.h+b.h)/2+35)));
   }
   factor=Math.min(1,factor*.94);
   boxes.forEach(b=>{const cx=b.x+b.w/2,cy=b.y+b.h/2;b.el.style.width=(b.w*factor)+'px';b.w*=factor;b.h=b.el.offsetHeight;b.x=cx-b.w/2;b.y=cy-b.h/2});
  }else{
   for(let pass=0;pass<n*n;pass++){
    let moved=false;
    for(let i=0;i<n;i++)for(let j=i+1;j<n;j++){
     const a=boxes[i],b=boxes[j];
     const ox=(a.w+b.w)/2+30-Math.abs((a.x+a.w/2)-(b.x+b.w/2));
     const oy=(a.h+b.h)/2+35-Math.abs((a.y+a.h/2)-(b.y+b.h/2));
     if(ox>0&&oy>0){const lower=a.y>b.y?a:b;lower.y+=oy+8;moved=true}
    }if(!moved)break;
   }
  }
  const lead=Math.min(...boxes.map(b=>b.y));
  boxes.forEach(b=>{b.y-=lead-30;b.el.style.left=b.x+'px';b.el.style.top=b.y+'px';b.el.style.setProperty('--tilt',b.angle+'deg');b.el.style.zIndex=''});
  desk.style.height=(Math.max(...boxes.map(b=>b.y+b.h))+55)+'px';return;
 }
 const cols=Math.min(order.length,W<380?1:W<850?2:3),pad=small?20:32;
 const slot=(W-pad*2)/cols,gap=small?38:65;
 let top=30;
 for(let row=0;row<Math.ceil(order.length/cols);row++){
  const group=order.slice(row*cols,(row+1)*cols),rowSlot=(W-pad*2)/group.length;
  let bottom=top;
  group.forEach((el,col)=>{
   const i=row*cols+col;
   const size=shuffle?.95+Math.random()*.08:[1,.96,1.02,.97,1.01,.95][i%6];
   const width=(slot-gap)*size;el.style.width=width+'px';
   const angle=shuffle?Math.random()*10-5:[-4,3,-2,4,-3,2][i%6];
   const stagger=shuffle?Math.random()*(small?26:42):[0,32,12,23,0,30][i%6];
   const drift=shuffle?(Math.random()-.5)*12:[-5,6,-3,5,-4,3][i%6];
   const y=top+stagger,x=pad+rowSlot*(col+.5)-width/2+drift;
   el.style.left=x+'px';el.style.top=y+'px';el.style.setProperty('--tilt',angle+'deg');el.style.zIndex='';
   bottom=Math.max(bottom,y+el.offsetHeight+Math.abs(Math.sin(angle*Math.PI/180))*width/2);
  });
  top=bottom+(small?35:45);
 }
 desk.style.height=(top+10)+'px';
}
function openProject(i){current=i;const p=projects[i];document.querySelector('#project-content').innerHTML=`<span class="label">DISCOVERY ${String(i+1).padStart(2,'0')} / ${p.category}</span><h2>${p.title}</h2><p class="description">${p.copy}</p><div class="gallery">${p.gallery.map((x,n)=>`<figure class="gallery-item ${portraitImages[x]?'portrait':'landscape'}"><img src="assets/${x}.png" alt="${imageCaptions[x]}" loading="lazy"><figcaption><span class="image-number">${String(n+1).padStart(2,'0')}</span><p>${imageCaptions[x]}</p></figcaption></figure>`).join('')}</div>`;if(!project.open)project.showModal();project.scrollTop=0;document.body.style.overflow='hidden'}
desk.innerHTML=projects.map((p,i)=>`<button class="piece" data-id="${i}" aria-label="Explore ${p.title}"><img src="assets/${p.image}.png" alt="${p.title}" draggable="false"><span class="caption">${p.title}<span>↗</span></span><small>0${i+1} / ${p.category.toUpperCase()}</small></button>`).join('');layout();let start;
desk.addEventListener('pointerdown',e=>{const el=e.target.closest('.piece');if(!el||e.button!==0)return;dragged=false;start={el,x:e.clientX,y:e.clientY,left:el.offsetLeft,top:el.offsetTop};el.setPointerCapture(e.pointerId)});
desk.addEventListener('pointermove',e=>{if(!start)return;const dx=e.clientX-start.x,dy=e.clientY-start.y;if(Math.hypot(dx,dy)>7)dragged=true;if(dragged){start.el.style.left=Math.max(0,Math.min(desk.clientWidth-start.el.offsetWidth,start.left+dx))+'px';start.el.style.top=Math.max(0,Math.min(desk.clientHeight-start.el.offsetHeight,start.top+dy))+'px';start.el.style.zIndex=15}});
desk.addEventListener('pointerup',()=>{start=null});desk.addEventListener('pointercancel',()=>{start=null});desk.addEventListener('click',e=>{const el=e.target.closest('.piece');if(el&&!dragged)openProject(+el.dataset.id);dragged=false});
document.querySelectorAll('[data-filter]').forEach(b=>b.onclick=()=>{filter=b.dataset.filter;document.querySelectorAll('[data-filter]').forEach(x=>{x.classList.toggle('selected',x===b);x.setAttribute('aria-pressed',x===b)});document.querySelectorAll('.piece').forEach((x,i)=>x.classList.toggle('hidden',filter!=='All'&&projects[i].category!==filter));layout()});
document.querySelector('#shuffle').onclick=()=>layout(true);
document.querySelectorAll('dialog .close').forEach(b=>b.onclick=()=>b.closest('dialog').close());document.querySelectorAll('dialog').forEach(d=>d.addEventListener('close',()=>document.body.style.overflow=''));document.querySelector('#next').onclick=()=>openProject((current+1)%projects.length);
const pages=[['I look closely.','I notice small details in everyday life. A blue ball after class, the shape of a branch, a pattern of shadows — these small encounters can become the beginning of a project.'],['I think with my hands.','I enjoy natural materials and explore how shapes and structures fit together. Drawing and building help me follow an idea, test a connection, and discover something unexpected.'],['I leave room to imagine.','My work moves between 2D, 3D, and photography. This little universe brings them together through curiosity: looking at what is already there, then imagining what else it could become.']];let page=0;function pageRender(){document.querySelector('#page-number').textContent=`0${page+1} / 03`;document.querySelector('#page-copy').innerHTML=`<h3>${pages[page][0]}</h3><p>${pages[page][1]}</p>`}pageRender();document.querySelector('#turn-page').onclick=()=>{page=(page+1)%pages.length;pageRender()};function showAbout(){about.showModal();document.body.style.overflow='hidden'}document.querySelector('#about-open').onclick=showAbout;document.querySelector('#about-open-2').onclick=showAbout;
document.querySelector('#surprise').onclick=()=>{const c=document.querySelector('#confetti');for(let i=0;i<24;i++){const s=document.createElement('span');s.className='confetti';s.textContent=['✳','☺','✦','oh!','↝'][i%5];s.style.left=Math.random()*100+'%';s.style.top='-50px';s.style.color=['#e8ff70','#ff9dc5','#fff6e8'][i%3];s.style.animationDelay=Math.random()*.5+'s';c.append(s);setTimeout(()=>s.remove(),3200)}};document.querySelector('#motion').onclick=e=>{const off=document.body.classList.toggle('still');e.target.textContent=off?'motion: off':'motion: on';e.target.setAttribute('aria-pressed',off)};let resizeTimer;addEventListener('resize',()=>{clearTimeout(resizeTimer);resizeTimer=setTimeout(()=>layout(),100)});document.fonts.ready.then(()=>layout());

const closeZone=document.querySelector('#project-close-zone');
// Keep the close control inside the dialog top layer while fixing it to the viewport.
project.prepend(closeZone);
const galleryObserver=new MutationObserver(()=>{closeZone.hidden=!project.open});
galleryObserver.observe(project,{attributes:true,attributeFilter:['open']});
document.querySelector('#floating-project-close').onclick=()=>project.close();
