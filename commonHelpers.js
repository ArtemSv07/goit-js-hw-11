import{S as h,i as u}from"./assets/vendor-46aac873.js";(function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))r(e);new MutationObserver(e=>{for(const t of e)if(t.type==="childList")for(const o of t.addedNodes)o.tagName==="LINK"&&o.rel==="modulepreload"&&r(o)}).observe(document,{childList:!0,subtree:!0});function a(e){const t={};return e.integrity&&(t.integrity=e.integrity),e.referrerpolicy&&(t.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?t.credentials="include":e.crossorigin==="anonymous"?t.credentials="omit":t.credentials="same-origin",t}function r(e){if(e.ep)return;e.ep=!0;const t=a(e);fetch(e.href,t)}})();const l=document.querySelector("input"),L=document.querySelector(".form"),c=document.createDocumentFragment(),d=document.querySelector(".gallery"),v="https://pixabay.com/api/",b="42159131-e2480a23f0f5c24b1f6f03d93",S={overlayOpacity:.8,captionsData:"alt",captionDelay:250},w=new h(".gallery a",S);L.addEventListener("submit",s=>{s.preventDefault(),d.innerHTML='<span class="loader"></span>';const n=l.value.trim();n?$(n):u.warning({message:"You forgot to enter your details"}),l.value=""});function $(s){const a=(()=>{const r=new URL(v);return r.searchParams.append("key",b),r})();a.searchParams.append("q",s),fetch(a).then(r=>r.json()).then(r=>{const e=r.hits;e.length>0?e.forEach(({webformatURL:t,largeImageURL:o,tags:f,likes:m,views:p,comments:g,downloads:y})=>{const i=document.createElement("li");i.classList.add("gallery-item"),i.insertAdjacentHTML("beforeend",`<a class="gallery-link" href="${o}">
              <img class="gallery-image" src="${t}" alt="${f}" />
              <div class="div">
              <p>likes ${m}</p>
              <p>views ${p}</p>
              <p>comments ${g}</p>
              <p>downloads ${y}</p>
              </div>
            </a>`),c.appendChild(i)}):u.warning({message:"Sorry, there are no images matching your search query. Please try again!"}),d.appendChild(c),w.refresh()})}
//# sourceMappingURL=commonHelpers.js.map
