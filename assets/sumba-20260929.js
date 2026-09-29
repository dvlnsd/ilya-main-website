(()=>{
  "use strict";
  const root=document.querySelector("[data-sumba-sequence]");
  if(!root||matchMedia("(prefers-reduced-motion: reduce)").matches)return;

  const clips=Array.from({length:7},(_,i)=>`/videos/sumba-20260929/clip-${String(i).padStart(2,"0")}.mp4`);
  const layers=[...root.querySelectorAll("[data-video-layer]")];
  if(layers.length!==2)return;

  let active=0;
  let index=0;
  let switching=false;
  let visible=true;
  let startedAt=0;

  const prepare=(video,clipIndex)=>{
    video.src=clips[clipIndex];
    video.load();
  };

  const playActive=()=>{
    if(!visible)return;
    if(!startedAt)startedAt=Date.now()-layers[active].currentTime*1000;
    layers[active].play().catch(()=>{});
  };

  const advance=()=>{
    if(switching)return;
    switching=true;
    const oldLayer=layers[active];
    const nextLayer=layers[1-active];
    const nextIndex=(index+1)%clips.length;

    nextLayer.currentTime=0;
    const reveal=()=>{
      nextLayer.classList.add("is-active");
      nextLayer.removeAttribute("aria-hidden");
      oldLayer.classList.remove("is-active");
      oldLayer.setAttribute("aria-hidden","true");
      oldLayer.pause();
      active=1-active;
      index=nextIndex;
      startedAt=Date.now();
      root.dataset.segment=String(index);
      if(index===0)root.dataset.loop=String(Number(root.dataset.loop||0)+1);
      const following=(index+1)%clips.length;
      prepare(oldLayer,following);
      switching=false;
    };

    nextLayer.play().then(reveal).catch(()=>{
      reveal();
      playActive();
    });
  };

  layers.forEach(video=>{
    video.muted=true;
    video.defaultMuted=true;
    video.playsInline=true;
  });

  prepare(layers[0],0);
  prepare(layers[1],1);
  layers[0].addEventListener("canplay",playActive,{once:true});

  const observer=new IntersectionObserver(entries=>{
    visible=entries[0]?.isIntersecting!==false;
    if(visible)playActive();
    else{layers[active].pause();startedAt=0}
  },{threshold:.08});
  observer.observe(root);

  document.addEventListener("visibilitychange",()=>{
    if(document.hidden){layers[active].pause();startedAt=0}
    else playActive();
  });

  setInterval(()=>{
    if(!visible||switching)return;
    const video=layers[active];
    if(!startedAt)startedAt=Date.now()-video.currentTime*1000;
    const expected=(Date.now()-startedAt)/1000;
    if(video.duration&&expected>=video.duration-.04){advance();return}
    if(video.paused&&!video.ended)video.play().catch(()=>{});
    if(video.duration&&video.currentTime+.28<expected){
      try{video.currentTime=Math.min(expected,video.duration-.08)}catch(_){}
    }
  },140);

  playActive();
})();
