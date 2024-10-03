import{a as m,S as b,i as d}from"./assets/vendor-pJyzcLlr.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function a(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=a(e);fetch(e.href,r)}})();const y=s=>` <li class="gallery-item">
    <a class="gallery-link" href="${s.largeImageURL}">
      <img class="gallery-img"
      src="${s.webformatURL}"
      alt="${s.tags}"
      loading="lazy" />
    </a>
    <ul class="gallery-info">
      <li class="gallery-info-item">
        <p class="gallery-info-title">Likes</p>
        <p class="gallery-info-text">${s.likes}</p>
      </li>
      <li class="gallery-info-item">
        <p class="gallery-info-title">Views</p>
        <p class="gallery-info-text">${s.views}</p>
      </li>
      <li class="gallery-info-item">
        <p class="gallery-info-title">Comments</p>
        <p class="gallery-info-text">${s.comments}</p>
      </li>
      <li class="gallery-info-item">
        <p class="gallery-info-title">Downloads</p>
        <p class="gallery-info-text">${s.downloads}</p>
      </li>
    </ul>
  </li>`;m.defaults.baseURL="https://pixabay.com/api/";const f=(s,t)=>{const a={params:{key:"45539852-e7385dbf9677b23660ec365b6",q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:t,per_page:15}};return m.get("",a)},h=document.querySelector(".js-search-form"),l=document.querySelector(".js-gallery"),i=document.querySelector(".loader"),c=document.querySelector(".loader-btn");c.insertAdjacentElement("afterend",i);const L=new b(".js-gallery a",{captionDelay:250,captionPosition:"bottom",captionsData:"alt",overlayOpacity:1});let n=1,p="",g=0;const v=async s=>{try{if(s.preventDefault(),p=h.elements.user_query.value.trim(),p===""){d.warning({message:"Please enter a search query.",position:"bottomRight"});return}l.innerHTML="",g=0,i.classList.remove("is-hidden"),n=1;const t=await f(p,n),a=t.data;if(!a.hits||a.hits.length===0){d.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"bottomRight"}),l.innerHTML="",h.reset(),i.classList.add("is-hidden"),c.classList.add("is-hidden");return}const o=a.hits.map(e=>y(e)).join("");l.innerHTML=o,L.refresh(),c.classList.remove("is-hidden"),h.reset(),g+=t.data.hits.length}catch(t){console.log(t),d.error({message:"An error occurred. Please try again later.",position:"bottomRight"})}finally{i.classList.add("is-hidden")}},w=async s=>{try{n++;const t=await f(p,n),a=t.data;if(!a.hits||a.hits.length===0)return;const o=a.hits.map(r=>y(r)).join("");l.insertAdjacentHTML("beforeend",o),L.refresh();const{height:e}=l.firstElementChild.getBoundingClientRect();scrollBy({top:e*2,behavior:"smooth"}),g+=t.data.hits.length,Math.ceil(a.totalHits/15)===n&&(d.show({message:"We're sorry, but you've reached the end of search results.",position:"topRight",backgroundColor:"#ef4040",messageColor:"#fff",timeout:5e3}),i.classList.add("is-hidden"),c.classList.add("is-hidden"))}catch(t){console.log(t)}};h.addEventListener("submit",v);c.addEventListener("click",w);
//# sourceMappingURL=index.js.map
