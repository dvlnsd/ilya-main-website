
(()=>{"use strict";
const TELEGRAM="https://t.me/Chaika_Ilya";
const waveButton=()=>{
 const header=document.querySelector(".site-header");if(!header)return;
 let trigger=header.querySelector(".menu-trigger");
 if(!trigger)return;
 if(trigger.tagName!=="BUTTON"){
   const button=document.createElement("button");button.type="button";button.className=trigger.className;button.setAttribute("aria-label","Открыть меню");trigger.replaceWith(button);trigger=button;
 }
 trigger.type="button";trigger.removeAttribute("href");trigger.setAttribute("aria-label","Открыть меню");trigger.setAttribute("aria-haspopup","dialog");trigger.setAttribute("aria-expanded",document.getElementById("unifiedMenu")?.classList.contains("is-open")?"true":"false");trigger.dataset.unifiedMenuTrigger="true";
 const contact=header.querySelector(".contact-trigger");
 if(contact&&contact.tagName!=="A"){const a=document.createElement("a");a.className=contact.className;a.textContent=contact.textContent||"Связаться";a.href=TELEGRAM;a.target="_blank";a.rel="noreferrer";contact.replaceWith(a)}
};
const ensureMenu=()=>{
 if(document.getElementById("unifiedMenu"))return;
 const menu=document.createElement("div");menu.id="unifiedMenu";menu.className="unified-menu";menu.setAttribute("role","dialog");menu.setAttribute("aria-modal","true");menu.setAttribute("aria-label","Меню сайта");menu.innerHTML='<div class="unified-menu-backdrop" data-menu-close></div><div class="unified-menu-panel"><button class="unified-menu-close" type="button" aria-label="Закрыть меню" data-menu-close>Закрыть</button><nav class="unified-menu-nav"><a href="/surf-trips.html">Серф-трипы</a><a href="/surf-coaching-bali.html">Обучение и гайдинг</a><a href="/surf-journal.html">Серф-журнал</a><a href="/surf-shop.html">Магазин</a></nav></div>';
 document.body.appendChild(menu);
};
const ensureSocials=()=>{
 const socialLinks=[
  {href:TELEGRAM,label:"TELEGRAM"},
  {href:"https://wa.me/79242347607",label:"WHATSAPP"},
  {href:"https://instagram.com/chaika_ilya",label:"INSTAGRAM"},
  {href:"https://youtube.com/@chaika_ilya",label:"YOUTUBE"}
 ];
 document.querySelectorAll(".footer").forEach(footer=>{
  let links=footer.querySelector(".footer-socials");
  if(!links){links=document.createElement("div");links.className="footer-socials";const note=footer.querySelector(".footer-note");note?footer.insertBefore(links,note):footer.appendChild(links)}
  socialLinks.forEach(item=>{if(![...links.querySelectorAll("a")].some(a=>a.href===new URL(item.href,location.href).href)){const a=document.createElement("a");a.href=item.href;a.target="_blank";a.rel="noreferrer";a.textContent=item.label;links.appendChild(a)}})
 });
};
const cleanSearch=()=>{
 const label=document.querySelector(".journal-search"),q=document.getElementById("journalSearch");if(!q)return;
 [...label.childNodes].forEach(n=>{if(n!==q&&n.nodeType===Node.TEXT_NODE)n.remove()});
 if(!q.dataset.searchReady){q.value="";q.placeholder="Поиск по материалам";q.dataset.searchReady="true"}
};
const initSumbaGallery=()=>{
 const track=document.querySelector("[data-sumba-gallery]");if(!track||track.dataset.ready)return;track.dataset.ready="true";
 const shell=track.closest(".sumba-gallery-shell"),step=()=>Math.min(track.clientWidth*.86,540);
 shell?.querySelector("[data-sumba-prev]")?.addEventListener("click",()=>track.scrollBy({left:-step(),behavior:"smooth"}));
 shell?.querySelector("[data-sumba-next]")?.addEventListener("click",()=>track.scrollBy({left:step(),behavior:"smooth"}));
 let paused=false;const advance=()=>{if(paused)return;const end=track.scrollLeft+track.clientWidth>=track.scrollWidth-20;track.scrollTo({left:end?0:track.scrollLeft+step(),behavior:"smooth"})};
 const timer=setInterval(advance,4200);track.addEventListener('pointerdown',()=>paused=true);track.addEventListener('pointerup',()=>{paused=false});track.addEventListener('touchstart',()=>paused=true,{passive:true});track.addEventListener('touchend',()=>{paused=false},{passive:true});
};
const initSumbaVideo=()=>{
 const video=document.querySelector(".sumba-content-video");if(!video||video.dataset.ready)return;video.dataset.ready="true";
 video.muted=true;video.defaultMuted=true;video.playsInline=true;
 let last=-1,stalled=0;
 const play=()=>video.play().catch(()=>{});
 const timer=setInterval(()=>{
  if(!document.contains(video)){clearInterval(timer);return}
  const rect=video.getBoundingClientRect(),visible=rect.bottom>0&&rect.top<innerHeight;
  if(!visible||video.paused||video.seeking){last=video.currentTime;stalled=0;return}
  const now=video.currentTime;
  if(last>=0&&Math.abs(now-last)<.025)stalled++;else stalled=0;
  if(stalled>=2&&Number.isFinite(video.duration)){video.currentTime=Math.min(now+.75,video.duration-.1);stalled=0;play()}
  last=video.currentTime;
 },650);
 video.addEventListener("canplay",play,{once:true});
 new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting)play();else video.pause()}),{threshold:.12}).observe(video);
 play();
};
const initSeamlessSumbaVideo=()=>{
 const box=document.querySelector('.sumba-seamless-video');if(!box||box.dataset.ready)return;box.dataset.ready='1';
 const parts=box.dataset.parts.split(','),players=[...box.querySelectorAll('video')];let active=0,part=0;
 const load=(player,index)=>{player.src=parts[index];player.load()};load(players[0],0);load(players[1],1);
 players.forEach((player,index)=>player.addEventListener('ended',()=>{if(index!==active)return;const next=1-active;players[next].currentTime=0;players[next].play().catch(()=>{});players[next].classList.add('is-active');players[active].classList.remove('is-active');active=next;part=(part+1)%parts.length;setTimeout(()=>load(players[1-active],(part+1)%parts.length),120)}));
 players[0].play().catch(()=>{});
};
const init=()=>{ensureMenu();waveButton();ensureSocials();cleanSearch();initSumbaGallery();initSumbaVideo();initSeamlessSumbaVideo()};
const openMenu=()=>{ensureMenu();const m=document.getElementById("unifiedMenu");m.classList.add("is-open");document.body.style.overflow="hidden";document.querySelector(".site-header .menu-trigger")?.setAttribute("aria-expanded","true");m.querySelector(".unified-menu-close")?.focus()};
const closeMenu=()=>{const m=document.getElementById("unifiedMenu");if(!m)return;m.classList.remove("is-open");document.body.style.overflow="";document.querySelector(".site-header .menu-trigger")?.setAttribute("aria-expanded","false")};
document.addEventListener("click",e=>{const trigger=e.target.closest?.(".site-header .menu-trigger");if(trigger){e.preventDefault();e.stopImmediatePropagation();openMenu();return}if(e.target.closest?.("[data-menu-close]")){e.preventDefault();closeMenu()}},true);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMenu()});
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
let queued=false;new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;init()})}).observe(document.documentElement,{childList:true,subtree:true});
})();
