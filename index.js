import{a as y,S as v,i as c}from"./assets/vendor-pJyzcLlr.js";(function(){const a=document.createElement("link").relList;if(a&&a.supports&&a.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const r of e)if(r.type==="childList")for(const u of r.addedNodes)u.tagName==="LINK"&&u.rel==="modulepreload"&&o(u)}).observe(document,{childList:!0,subtree:!0});function t(e){const r={};return e.integrity&&(r.integrity=e.integrity),e.referrerPolicy&&(r.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?r.credentials="include":e.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(e){if(e.ep)return;e.ep=!0;const r=t(e);fetch(e.href,r)}})();const f=s=>` <li class="gallery-item">
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
  </li>`;y.defaults.baseURL="https://pixabay.com/api/";const L=(s,a)=>{const t={params:{key:"45539852-e7385dbf9677b23660ec365b6",q:s,image_type:"photo",orientation:"horizontal",safesearch:!0,page:a,per_page:15}};return y.get("",t)},d=document.querySelector(".js-search-form"),h=document.querySelector(".js-gallery"),l=document.querySelector(".loader"),i=document.querySelector(".loader-btn");i.insertAdjacentElement("afterend",l);const b=new v(".js-gallery a",{captionDelay:250,captionPosition:"bottom",captionsData:"alt",overlayOpacity:1});let g=1,p="",n=0,m=0;const w=async s=>{try{if(s.preventDefault(),p=d.elements.user_query.value.trim(),p===""){c.warning({message:"Please enter a search query.",position:"bottomRight"});return}h.innerHTML="",n=0,l.classList.remove("is-hidden"),g=1;const t=(await L(p,g)).data;if(!t.hits||t.hits.length===0){c.error({message:"Sorry, there are no images matching your search query. Please try again!",position:"bottomRight"}),d.reset(),l.classList.add("is-hidden"),i.classList.add("is-hidden");return}m=t.totalHits;const o=t.hits.map(e=>f(e)).join("");h.innerHTML=o,b.refresh(),i.classList.remove("is-hidden"),d.reset(),n+=t.hits.length,n>=m&&i.classList.add("is-hidden")}catch(a){console.log(a),c.error({message:"An error occurred. Please try again later.",position:"bottomRight"})}finally{l.classList.add("is-hidden")}},P=async s=>{try{g++;const t=(await L(p,g)).data;if(!t.hits||t.hits.length===0)return;const o=t.hits.map(r=>f(r)).join("");h.insertAdjacentHTML("beforeend",o),b.refresh();const{height:e}=h.firstElementChild.getBoundingClientRect();scrollBy({top:e*2,behavior:"smooth"}),n+=t.hits.length,n>=m&&(c.show({message:"We're sorry, but you've reached the end of search results.",position:"topRight",backgroundColor:"#ef4040",messageColor:"#fff",timeout:5e3}),l.classList.add("is-hidden"),i.classList.add("is-hidden"))}catch(a){console.log(a)}};d.addEventListener("submit",w);i.addEventListener("click",P);
//# sourceMappingURL=index.js.map
