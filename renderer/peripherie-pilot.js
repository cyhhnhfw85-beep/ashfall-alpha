/* ASHFALL / ENV-P01 Pilot 01 | 2D Canvas | no gameplay dependency, no repository mutation.
 * Render API floor(ctx,room,obstacles); walls(ctx,room,wallRects,doors).
 * World routing intentionally NOT active in this standalone proof.
 * All physical props use pre-existing obstacle rectangles; no newly collidable geometry.
 */
(function(root){'use strict';
 const C={ink:'#09151d',void:'#0b171e',steel:'#1b2d37',steel2:'#304953',silver:'#79939a',hi:'#b7c8c4',rust:'#9f6841',amber:'#e8aa55',cyan:'#68d3ce',danger:'#e27c6d'};
 const PALETTES={standard:['#16242e','#1e313b',C.amber],start:['#152b32','#1d3b43',C.cyan],arena:['#2a2529','#373037','#e6b46b'],boss:['#29242a','#352a30','#e17b74'],exit:['#25282b','#344047','#d4b975'],outpost:['#172731','#28414b','#83d2d3']};
 function seed(room){const v=[room.id,room.index,room.key,room.kind,room.sector,room.x,room.y].join('|');let h=2166136261;for(let i=0;i<v.length;i++)h=Math.imul(h^v.charCodeAt(i),16777619);return h|0}
 function random(x,y,s){let n=(Math.imul((x|0)+s,0x9e3779b1)^Math.imul((y|0)-s,0x85ebca6b))|0;n=Math.imul(n^(n>>>16),0x7feb352d);return ((n^(n>>>15))>>>0)/4294967296}
 function fill(c,x,y,w,h,color){if(w>0&&h>0){c.fillStyle=color;c.fillRect(x,y,w,h)}}
 function stroke(c,x,y,w,h,color,lw=1){if(w>0&&h>0){c.strokeStyle=color;c.lineWidth=lw;c.strokeRect(x+.5,y+.5,w-1,h-1)}}
 function ln(c,x,y,X,Y,color,lw=1){c.beginPath();c.moveTo(x,y);c.lineTo(X,Y);c.strokeStyle=color;c.lineWidth=lw;c.stroke()}
 function circle(c,x,y,r,color){c.fillStyle=color;c.beginPath();c.arc(x,y,r,0,Math.PI*2);c.fill()}
 function aura(c,x,y,r,col,a){let g=c.createRadialGradient(x,y,0,x,y,r);g.addColorStop(0,col);g.addColorStop(1,'transparent');c.save();c.globalAlpha=a;c.fillStyle=g;c.fillRect(x-r,y-r,2*r,2*r);c.restore()}
 function palette(room){return PALETTES[room?.kind]||PALETTES.standard}
 function floor(c,room,obstacles){room=room&&typeof room==='object'?room:{kind:'standard'};obstacles=Array.isArray(obstacles)?obstacles:[];
  const W=c.canvas.width,H=c.canvas.height,s=seed(room),p=palette(room),accent=p[2];c.save();
  const bg=c.createLinearGradient(0,0,W*.6,H);bg.addColorStop(0,p[1]);bg.addColorStop(.48,p[0]);bg.addColorStop(1,'#0d1a24');fill(c,0,0,W,H,bg);
  // Recessed plates: moderate value variation; center of arena deliberately quiet.
  const step=112,ox=-((s>>>4)%step),oy=-((s>>>12)%step);
  for(let gy=oy;gy<H;gy+=step){for(let gx=ox;gx<W;gx+=step){let ix=Math.round((gx-ox)/step),iy=Math.round((gy-oy)/step),h=random(ix,iy,s);
   fill(c,gx+3,gy+3,step-6,step-6,h>.86?'#243b46':h<.14?'#15242c':'#1c303a');
   fill(c,gx+6,gy+6,step-12,3,'rgba(176,205,200,.07)');fill(c,gx+6,gy+step-10,step-12,4,'rgba(3,9,15,.25)');
   ln(c,gx+9,gy+11,gx+step-9,gy+11,'rgba(143,177,183,.13)');
   for(const dx of [10,step-13])for(const dy of [13,step-13])circle(c,gx+dx,gy+dy,1.6,'rgba(5,11,17,.7)');
   // Only peripheral tile detail: center remains low frequency for bullets and silhouettes.
   let midx=gx+step/2,midy=gy+step/2;const periphery=midx<W*.27||midx>W*.73||midy<H*.23||midy>H*.77;
   if(periphery&&h>.48){fill(c,gx+19,gy+step-28,step-38,8,'rgba(6,17,22,.25)');for(let k=0;k<5;k++)ln(c,gx+24+k*13,gy+step-26,gx+28+k*13,gy+step-22,'rgba(142,170,175,.15)');}
   if(periphery&&h>.67){fill(c,gx+20,gy+22,24,3,'rgba(215,156,78,.28)');fill(c,gx+20,gy+26,14,2,'rgba(6,12,18,.4)')}
  }}
  // Different interior floor narratives chosen by stable hash. No new solid object.
  const mode=Math.floor(random(13,29,s)*4);
  c.save();c.globalAlpha=.92;
  if(mode===0){ // service / recessed maintenance inspection bay
   const x=W*.13,y=H*.19,w=Math.min(W*.31,144),h=Math.min(H*.18,84);recess(c,x,y,w,h,accent,'service');
   for(let i=0;i<3;i++){fill(c,x+15+i*(w-30)/3,y+17,6,h-34,'#35535b')}
  }else if(mode===1){ // storage / numbered docking footprint
   const x=W*.12,y=H*.72,w=W*.24,h=H*.13;stroke(c,x,y,w,h,'rgba(228,164,81,.35)',3);
   for(let k=0;k<5;k++)ln(c,x+8+k*11,y+h-6,x+16+k*11,y+h-6,'rgba(231,172,92,.35)',2);
   signal(c,x+12,y+10,'B-07',accent);
  }else if(mode===2){ // damaged / surface scratches localized at sides
   const x=W*.72,y=H*.72;fill(c,x-34,y-20,75,44,'rgba(5,11,15,.20)');ln(c,x-27,y-12,x+8,y+9,'rgba(3,8,13,.46)',3);ln(c,x+8,y+9,x+29,y+15,'rgba(143,163,165,.16)',1);
   for(let k=0;k<6;k++)circle(c,x-30+random(k,4,s)*62,y-18+random(k,8,s)*34,1.8,'rgba(157,109,77,.25)');
  }else{ // power / inset insulated conduit
   let x=W*.69,y=H*.15,w=W*.18,h=H*.20;recess(c,x,y,w,h,C.cyan,'power');
   for(let k=0;k<4;k++)fill(c,x+10+k*(w-20)/4,y+14,4,h-28,'rgba(100,188,197,.18)');
  }c.restore();
  // Fixture feet and utilitarian floor elements, attached to borders only (nonblocking).
  for(let i=0;i<4;i++){const side=i%2?W-36:11,y=H*(.18+i*.2);fill(c,side,y,22,33,'#101e27');fill(c,side+4,y+4,14,25,'#29434c');fill(c,side+7,y+9,8,2,i%2?C.amber:C.cyan);}
  // Very low-alpha ambient lighting, never competing with danger/loot.
  aura(c,W*.13,H*.16,Math.min(W,H)*.25,C.amber,.09);aura(c,W*.88,H*.78,Math.min(W,H)*.29,C.cyan,.08);
  const top=c.createLinearGradient(0,0,0,44);top.addColorStop(0,'rgba(2,8,14,.57)');top.addColorStop(1,'transparent');fill(c,0,0,W,44,top);
  const left=c.createLinearGradient(0,0,30,0);left.addColorStop(0,'rgba(4,9,15,.37)');left.addColorStop(1,'transparent');fill(c,0,0,30,H,left);
  // ONLY actual gameplay obstacle rectangles become massed decorative props.
  obstacles.forEach((o,i)=>{if(!Array.isArray(o)||o.length<4)return;const [x,y,w,h]=o;if(!(w>12&&h>12))return;prop(c,x,y,w,h,(Math.floor(random(i,77,s)*5)),accent)});
  c.restore();
 }
 function signal(c,x,y,label,col){c.save();c.font='bold 8px monospace';c.textBaseline='top';c.fillStyle=col;c.globalAlpha=.7;c.fillText(label,x,y);c.restore()}
 function recess(c,x,y,w,h,accent,name){if(w<25||h<22)return;fill(c,x+3,y+5,w,h,'rgba(1,8,13,.36)');fill(c,x,y,w,h,'#0d1b23');stroke(c,x,y,w,h,'#38525b',2);fill(c,x+7,y+7,w-14,h-14,'#142630');
  ln(c,x+6,y+5,x+w-6,y+5,'rgba(177,207,200,.24)',2);fill(c,x+8,y+h-10,Math.min(23,w-16),3,accent);
  if(name==='service')for(let k=0;k<4;k++)fill(c,x+13+k*((w-26)/4),y+13,2,h-26,'rgba(114,154,161,.3)');
 }
 function prop(c,x,y,w,h,kind,accent){
  // Strictly confined to the real collision bounds, with no fake overhanging machinery.
  if(w<13||h<13)return;c.save();c.beginPath();c.rect(x,y,w,h);c.clip();
  fill(c,x,y,w,h,'#07141b');const g=c.createLinearGradient(x,y,x+w*.16,y+h);g.addColorStop(0,'#728b8f');g.addColorStop(.1,'#405c64');g.addColorStop(.48,'#263f49');g.addColorStop(1,'#12252d');fill(c,x+2,y+2,w-4,h-4,g);
  stroke(c,x+2,y+2,w-4,h-4,'#10212a',2);fill(c,x+5,y+5,w-10,4,'rgba(201,223,212,.23)');fill(c,x+5,y+h-11,w-10,6,'rgba(3,9,15,.4)');
  const min=Math.min(w,h),pad=Math.min(8,min*.12);
  if(kind===0){ // cargo container
   fill(c,x+w*.42,y+pad,Math.max(3,w*.13),h-pad*2,'#1a3037');fill(c,x+pad,y+h*.41,w-pad*2,Math.max(3,h*.12),'#152b34');
   stroke(c,x+pad*1.6,y+pad*1.5,w-pad*3.2,h-pad*3,'rgba(143,181,179,.34)');
   signal(c,x+pad*2,y+pad*2,'C-04',accent);
  }else if(kind===1){ // terminal
   fill(c,x+pad,y+pad,w-pad*2,h*.47,'#071c27');fill(c,x+pad+3,y+pad+3,w-pad*2-6,Math.max(2,h*.37),'#114452');
   for(let k=0;k<4;k++)fill(c,x+pad+6+k*(w-pad*2-13)/4,y+pad+8,Math.max(2,w*.10),3,k===0?C.cyan:'#33758a');
   fill(c,x+pad,y+h*.72,w-pad*2,4,'#1b2c33');
  }else if(kind===2){ // generator fan
   const cx=x+w*.48,cy=y+h*.48,r=Math.min(w,h)*.26;circle(c,cx,cy,r+5,'#0e222c');c.beginPath();c.arc(cx,cy,r,0,Math.PI*2);c.strokeStyle='#8ba1a4';c.lineWidth=2.5;c.stroke();
   for(let k=0;k<6;k++){let a=Math.PI*k/3;ln(c,cx,cy,cx+Math.cos(a)*r*.78,cy+Math.sin(a)*r*.78,'#42616b',3)}circle(c,cx,cy,4,C.ink);
   fill(c,x+w*.82,y+8,4,h-16,'#0d212b');
  }else if(kind===3){ // storage locker
   fill(c,x+pad,y+pad,w-pad*2,h-pad*2,'#263e49');stroke(c,x+pad,y+pad,w-pad*2,h-pad*2,'#708890');
   ln(c,x+w*.5,y+pad+3,x+w*.5,y+h-pad-3,'#11232b',3);fill(c,x+w*.47,y+h*.48,4,8,C.amber);
   fill(c,x+pad+5,y+pad+5,Math.max(3,w*.17),3,'rgba(193,218,210,.34)');
  }else{ // industrial compressor
   fill(c,x+pad,y+h*.26,w-pad*2,h*.38,'#142a34');for(let i=0;i<5;i++)fill(c,x+pad+4+i*(w-pad*2-8)/5,y+h*.28,Math.max(2,w*.075),h*.31,'#536f76');
   fill(c,x+pad,y+h*.73,w-pad*2,3,'#17252d');fill(c,x+pad+3,y+h*.77,Math.min(w*.3,22),3,C.amber);
  }
  if(min>30){for(const dx of [7,w-10])for(const dy of [8,h-11])circle(c,x+dx,y+dy,1.8,'#0d1b23');fill(c,x+w-16,y+7,8,2,accent);}
  c.restore();
 }
 function walls(c,room,rects,doors){room=room&&typeof room==='object'?room:{kind:'standard'};rects=Array.isArray(rects)?rects:[];doors=Array.isArray(doors)?doors:[];const s=seed(room),accent=palette(room)[2];c.save();
  rects.forEach((a,i)=>{if(!Array.isArray(a)||a.length<4)return;const[x,y,w,h]=a;if(!(w>0&&h>0))return;let hor=w>=h;
   const g=c.createLinearGradient(x,y,hor?x:x+w,hor?y+h:y);g.addColorStop(0,'#6d878c');g.addColorStop(.15,'#35515b');g.addColorStop(.65,'#1c303a');g.addColorStop(1,'#0c1821');fill(c,x,y,w,h,g);
   stroke(c,x,y,w,h,'#0a171f',1);fill(c,x+2,y+2,Math.max(0,w-4),hor?3:Math.max(0,h-4),'rgba(179,212,213,.2)');
   // No fictitious walls: every reinforcement clipped to existing wall rectangle.
   c.save();c.beginPath();c.rect(x+1,y+1,Math.max(1,w-2),Math.max(1,h-2));c.clip();
   const len=hor?w:h;for(let u=24;u<len-12;u+=69){const xx=hor?x+u:x+2,yy=hor?y+2:y+u;
    fill(c,xx,yy,hor?5:Math.max(3,w-4),hor?Math.max(3,h-4):5,'rgba(7,15,21,.65)');
    if(random(i,u,s)>.38){const px=hor?xx+9:x+Math.max(2,w*.25),py=hor?y+Math.max(3,h*.28):yy+8;
     fill(c,px,py,hor?23:Math.max(3,w*.47),hor?Math.max(3,h*.44):23,'#294450');
     fill(c,px+3,py+3,hor?17:Math.max(1,w*.47-6),hor?Math.max(1,h*.44-6):17,'#102630');
     fill(c,px+4,py+4,hor?14:Math.max(1,w*.47-8),2,random(i,u+3,s)>.6?accent:'#627f86');
    }
   }
   c.restore();
  });
  // Doors are exclusively the door rectangles and lock flags passed by V32.
  doors.forEach((d,i)=>{const {x,y,w,h,locked,arena}=d;if(![x,y,w,h].every(Number.isFinite)||!(w>3&&h>3))return;
   const accent=locked?C.danger:arena?C.amber:C.cyan;c.save();fill(c,x,y,w,h,'#071a23');stroke(c,x,y,w,h,'#799099',2);
   fill(c,x+4,y+4,w-8,h-8,locked?'#3d282e':'#0c242e');stroke(c,x+4,y+4,w-8,h-8,accent,2);
   if(locked){const hor=w>h,len=hor?w:h;for(let k=7;k<len-6;k+=11){if(hor)ln(c,x+k,y+5,x+Math.min(k+8,w-5),y+h-5,'rgba(241,133,115,.70)',2);else ln(c,x+5,y+k,x+w-5,y+Math.min(k+8,h-5),'rgba(241,133,115,.70)',2)}}
   else{if(w>h)ln(c,x+8,y+h/2,x+w-8,y+h/2,accent,1.6);else ln(c,x+w/2,y+8,x+w/2,y+h-8,accent,1.6)}
   // Low energy halo is decorative only; open passage stays visually open.
   c.restore();
  });c.restore();
 }
 root.AshPeripheryPilot=Object.freeze({floor,walls,version:'ENV-P01-01',seed});
})(typeof window!=='undefined'?window:globalThis);
