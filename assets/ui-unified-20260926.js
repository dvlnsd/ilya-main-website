
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
const ensureTelegram=()=>{
 document.querySelectorAll(".footer").forEach(footer=>{let links=footer.querySelector(".footer-socials");if(!links){links=document.createElement("div");links.className="footer-socials";footer.appendChild(links)}
 if(!links.querySelector('a[href*="t.me/"]')){const a=document.createElement("a");a.href=TELEGRAM;a.target="_blank";a.rel="noreferrer";a.textContent="TELEGRAM";links.prepend(a)}
 });
};
const cleanSearch=()=>{
 const label=document.querySelector(".journal-search"),q=document.getElementById("journalSearch");if(!q)return;
 [...label.childNodes].forEach(n=>{if(n!==q&&n.nodeType===Node.TEXT_NODE)n.remove()});
 if(!q.dataset.searchReady){q.value="";q.placeholder="Поиск по материалам";q.dataset.searchReady="true"}
};
const init=()=>{ensureMenu();waveButton();ensureTelegram();cleanSearch()};
const openMenu=()=>{ensureMenu();const m=document.getElementById("unifiedMenu");m.classList.add("is-open");document.body.style.overflow="hidden";document.querySelector(".site-header .menu-trigger")?.setAttribute("aria-expanded","true");m.querySelector(".unified-menu-close")?.focus()};
const closeMenu=()=>{const m=document.getElementById("unifiedMenu");if(!m)return;m.classList.remove("is-open");document.body.style.overflow="";document.querySelector(".site-header .menu-trigger")?.setAttribute("aria-expanded","false")};
document.addEventListener("click",e=>{const trigger=e.target.closest?.(".site-header .menu-trigger");if(trigger){e.preventDefault();e.stopImmediatePropagation();openMenu();return}if(e.target.closest?.("[data-menu-close]")){e.preventDefault();closeMenu()}},true);
document.addEventListener("keydown",e=>{if(e.key==="Escape")closeMenu()});
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",init,{once:true});else init();
let queued=false;new MutationObserver(()=>{if(queued)return;queued=true;requestAnimationFrame(()=>{queued=false;init()})}).observe(document.documentElement,{childList:true,subtree:true});
})();