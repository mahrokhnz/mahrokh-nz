var w=Object.defineProperty;var E=(c,r,t)=>r in c?w(c,r,{enumerable:!0,configurable:!0,writable:!0,value:t}):c[r]=t;var x=(c,r,t)=>(E(c,typeof r!="symbol"?r+"":r,t),t);(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))o(e);new MutationObserver(e=>{for(const l of e)if(l.type==="childList")for(const a of l.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&o(a)}).observe(document,{childList:!0,subtree:!0});function t(e){const l={};return e.integrity&&(l.integrity=e.integrity),e.referrerPolicy&&(l.referrerPolicy=e.referrerPolicy),e.crossOrigin==="use-credentials"?l.credentials="include":e.crossOrigin==="anonymous"?l.credentials="omit":l.credentials="same-origin",l}function o(e){if(e.ep)return;e.ep=!0;const l=t(e);fetch(e.href,l)}})();const g=document.documentElement,S=document.querySelector(".language"),d=document.querySelector(".languageWrapper"),s=document.querySelector(".en"),u=document.querySelector(".fa"),b="en";let v,h={};document.addEventListener("DOMContentLoaded",()=>{C(b)});async function C(c){if(c===v)return;const r=await q(c);v=c,h=r,M()}async function q(c){return(await fetch(`lang/${c}.json`)).json()}function M(){document.querySelectorAll("[data-i18n-key]").forEach(r=>{k(r)})}function k(c){const r=c.getAttribute("data-i18n-key");c.innerText=h[r]}S.addEventListener("click",c=>{c.stopPropagation(),d.classList.toggle("active")});s.addEventListener("click",()=>{s.classList.contains("active")||(u.classList.remove("active"),s.classList.add("active"),C("en"),g.lang="en")});u.addEventListener("click",()=>{u.classList.contains("active")||(s.classList.remove("active"),u.classList.add("active"),C("fa"),g.lang="fa")});document.addEventListener("click",()=>{d.classList.contains("active")&&d.classList.remove("active")});const T=`<svg class="svgContainer" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="180" fill="currentColor" r="5"/>
        <circle cx="70" cy="180" fill="currentColor" r="5"/>
        <circle cx="90" cy="180" fill="currentColor" r="5"/>
        <circle cx="110" cy="180" fill="currentColor" r="5"/>
        <circle cx="130" cy="180" fill="currentColor" r="5"/>

        <circle cx="50" cy="200" fill="currentColor" r="5"/>
        <circle cx="70" cy="200" fill="currentColor" r="5"/>
        <circle cx="90" cy="200" fill="currentColor" r="5"/>
        <circle cx="110" cy="200" fill="currentColor" r="5"/>
        <circle cx="130" cy="200" fill="currentColor" r="5"/>

        <circle cx="50" cy="220" fill="currentColor" r="5"/>
        <circle cx="70" cy="220" fill="currentColor" r="5"/>
        <circle cx="90" cy="220" fill="currentColor" r="5"/>
        <circle cx="110" cy="220" fill="currentColor" r="5"/>
        <circle cx="130" cy="220" fill="currentColor" r="5"/>

        <circle cx="50" cy="240" fill="currentColor" r="5"/>
        <circle cx="70" cy="240" fill="currentColor" r="5"/>
        <circle cx="90" cy="240" fill="currentColor" r="5"/>
        <circle cx="110" cy="240" fill="currentColor" r="5"/>
        <circle cx="130" cy="240" fill="currentColor" r="5"/>

        <circle cx="50" cy="260" fill="currentColor" r="5"/>
        <circle cx="70" cy="260" fill="currentColor" r="5"/>
        <circle cx="90" cy="260" fill="currentColor" r="5"/>
        <circle cx="110" cy="260" fill="currentColor" r="5"/>
        <circle cx="130" cy="260" fill="currentColor" r="5"/>

        <circle cx="50" cy="280" fill="currentColor" r="5"/>
        <circle cx="70" cy="280" fill="currentColor" r="5"/>
        <circle cx="90" cy="280" fill="currentColor" r="5"/>
        <circle cx="110" cy="280" fill="currentColor" r="5"/>
        <circle cx="130" cy="280" fill="currentColor" r="5"/>

        <circle cx="50" cy="300" fill="currentColor" r="5"/>
        <circle cx="70" cy="300" fill="currentColor" r="5"/>
        <circle cx="90" cy="300" fill="currentColor" r="5"/>
        <circle cx="110" cy="300" fill="currentColor" r="5"/>
        <circle cx="130" cy="300" fill="currentColor" r="5"/>
    </svg>`,A=`<svg class="svgContainer" viewBox="0 0 1440 320" xmlns="http://www.w3.org/2000/svg">
                <circle cx="900" cy="90" fill="currentColor" r="5"/>
                <circle cx="920" cy="90" fill="currentColor" r="5"/>
                <circle cx="940" cy="90" fill="currentColor" r="5"/>
                <circle cx="960" cy="90" fill="currentColor" r="5"/>
                <circle cx="980" cy="90" fill="currentColor" r="5"/>
                <circle cx="1000" cy="90" fill="currentColor" r="5"/>
                <circle cx="1020" cy="90" fill="currentColor" r="5"/>

                <circle cx="900" cy="110" fill="currentColor" r="5"/>
                <circle cx="920" cy="110" fill="currentColor" r="5"/>
                <circle cx="940" cy="110" fill="currentColor" r="5"/>
                <circle cx="960" cy="110" fill="currentColor" r="5"/>
                <circle cx="980" cy="110" fill="currentColor" r="5"/>
                <circle cx="1000" cy="110" fill="currentColor" r="5"/>
                <circle cx="1020" cy="110" fill="currentColor" r="5"/>

                <circle cx="900" cy="130" fill="currentColor" r="5"/>
                <circle cx="920" cy="130" fill="currentColor" r="5"/>
                <circle cx="940" cy="130" fill="currentColor" r="5"/>
                <circle cx="960" cy="130" fill="currentColor" r="5"/>
                <circle cx="980" cy="130" fill="currentColor" r="5"/>
                <circle cx="1000" cy="130" fill="currentColor" r="5"/>
                <circle cx="1020" cy="130" fill="currentColor" r="5"/>

                <circle cx="900" cy="150" fill="currentColor" r="5"/>
                <circle cx="920" cy="150" fill="currentColor" r="5"/>
                <circle cx="940" cy="150" fill="currentColor" r="5"/>
                <circle cx="960" cy="150" fill="currentColor" r="5"/>
                <circle cx="980" cy="150" fill="currentColor" r="5"/>
                <circle cx="1000" cy="150" fill="currentColor" r="5"/>
                <circle cx="1020" cy="150" fill="currentColor" r="5"/>

                <circle cx="900" cy="170" fill="currentColor" r="5"/>
                <circle cx="920" cy="170" fill="currentColor" r="5"/>
                <circle cx="940" cy="170" fill="currentColor" r="5"/>
                <circle cx="960" cy="170" fill="currentColor" r="5"/>
                <circle cx="980" cy="170" fill="currentColor" r="5"/>
                <circle cx="1000" cy="170" fill="currentColor" r="5"/>
                <circle cx="1020" cy="170" fill="currentColor" r="5"/>
            </svg>
`;class P extends HTMLElement{constructor(){super();x(this,"direction",this.getAttribute("direction"));this.innerHTML=this.direction==="vertical"?T:A}}customElements.define("svg-path",P);const p=document.documentElement,f=document.body,H=document.querySelector(".firstColumn"),O=document.querySelector(".secondColumn"),j=document.querySelectorAll(".theme"),y=document.querySelector(".bachelor"),m=document.querySelector(".master"),D=document.querySelector(".copyWrite"),i=document.querySelector(".hamburgerMenu"),L=document.querySelector(".headerMenu"),N=document.querySelectorAll(".menuItem"),n=[],Y=[{column:1,row:1,title:"Html",count:9},{column:1,row:1,title:"CSS (Stylus/Sass)",count:9},{column:1,row:1,title:"Responsive Web Design",count:10},{column:1,row:1,title:"JavaScript",count:8},{column:1,row:1,title:"React.js",count:7},{column:1,row:1,title:"Git",count:7},{column:1,row:1,title:"Ubuntu",count:4},{column:1,row:1,title:"English",count:9},{column:2,row:1,title:"Data Structure",count:8},{column:2,row:1,title:"MySQL",count:5},{column:2,row:1,title:"Node.js",count:3},{column:2,row:1,title:"Express.js",count:2},{column:2,row:1,title:"Deno",count:1}],F=()=>{for(let c=0;c<n.length;c++)n[c].classList.add("active")},I=()=>{for(let c=0;c<n.length;c++)n[c].classList.remove("active")},W=(c,r,t=10)=>{let o=0,e=0;for(;o<t;){const l=document.createElement("div");c.appendChild(l),l.classList.add("circle"),e<r&&(n.push(l),e++),o++}};Y.map(c=>{const r=document.createElement("div");c.column===1?H.appendChild(r):O.appendChild(r),r.classList.add("skill");const t=document.createElement("h3");r.appendChild(t),t.innerHTML=c.title;const o=document.createElement("div");r.appendChild(o),o.classList.add("wrapper"),W(o,c.count)});document.addEventListener("scroll",()=>{const c=window.innerHeight,r=window.scrollY;r>1.5*c&&r<2.5*c?F():I()});const B=c=>{p.setAttribute("data-theme",c)},K=()=>{const c=p.getAttribute("data-theme");B(c==="dark"?"light":"dark")};j.forEach(c=>{c.addEventListener("click",K)});m.addEventListener("click",()=>{m.classList.add("active"),y.classList.remove("active")});y.addEventListener("click",()=>{y.classList.add("active"),m.classList.remove("active")});const R=new Date,V=R.getFullYear();D.innerHTML=`© ${V} MAHrokh &#t127769 Tehran, Iran. All rights reserved.`;i.addEventListener("click",()=>{f.style.overflowY="unset",i.classList.toggle("open"),L.classList.toggle("openMenu"),i.classList.contains("open")&&(f.style.overflowY="hidden")});N.forEach(c=>{c.addEventListener("click",()=>{L.classList.remove("openMenu"),i.classList.remove("open"),i.classList.remove("open"),f.style.overflowY="unset"})});
