'use strict';
// Map decorative layers to the original 1536 × 1024 artwork, including mobile cropping.
(() => {
 const hero=document.querySelector('.hero');
 if(!hero) return;
 const scene=hero.querySelector('.living-scene');
 const toggle=hero.querySelector('.scene-toggle');
 const preference=matchMedia('(prefers-reduced-motion: reduce)');
 let paused=preference.matches;
 let visible=true;
 function fitScene(){
  const scale=Math.max(hero.clientWidth/1536,hero.clientHeight/1024);
  const width=1536*scale,height=1024*scale;
  const x=matchMedia('(max-width:767px)').matches?.61:.5;
  Object.assign(scene.style,{width:`${width}px`,height:`${height}px`,left:`${(hero.clientWidth-width)*x}px`,top:`${(hero.clientHeight-height)/2}px`});
 }
 function sync(){
  hero.classList.toggle('scene-paused',paused);
  hero.classList.toggle('scene-sleep',!visible||document.hidden);
  toggle.textContent=preference.matches?'Still scene':paused?'Play scene':'Pause scene';
  toggle.setAttribute('aria-pressed',String(paused));
  toggle.setAttribute('aria-label',preference.matches?'Scene motion is disabled by your reduced-motion preference':paused?'Play subtle campus animation':'Pause subtle campus animation');
  toggle.disabled=preference.matches;
 }
 toggle.addEventListener('click',()=>{paused=!paused;sync();});
 preference.addEventListener('change',()=>{paused=preference.matches;sync();});
 document.addEventListener('visibilitychange',sync);
 new ResizeObserver(fitScene).observe(hero);
 new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;sync();},{threshold:.01}).observe(hero);
 fitScene();sync();
})();
