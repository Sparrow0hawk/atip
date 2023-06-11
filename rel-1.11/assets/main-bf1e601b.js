import{S as K,i as Q,s as X,F as Y,b as z,a as x,e as p,c as h,t as tt,d as D,f as m,g as O,h as o,j as W,m as G,l as L,k as et,n as R,o as V,p as j,q as Z,r as at,u as nt,v as ot,w as lt}from"./maplibre_helpers-22323140.js";import{A as it,a as st}from"./About-fda3ecc4.js";function rt(a){let e,r,q,u,g,w,k,y,f,F,C,E,d,l,n,I,b,S,i,A,_,s,c,J,$,N,T,P,M;_=new Y({props:{label:"Upload ATIP GeoJSON file",uniqueId:"load-geojson",loadFile:a[4]}});function H(t){a[9](t)}let U={};return a[1]!==void 0&&(U.open=a[1]),$=new it({props:U}),z.push(()=>x($,"open",H,a[1])),{c(){e=p("div"),r=p("h1"),r.textContent="Welcome to ATIP v2",q=h(),u=p("button"),u.textContent="About",g=h(),w=p("p"),w.textContent="Select Transport Authority or Local Authority District:",k=h(),y=p("div"),f=p("input"),F=h(),C=p("datalist"),E=h(),d=p("button"),l=tt("Start"),I=h(),b=p("p"),b.textContent="Or pick a Transport Authority on the map",S=h(),i=p("p"),i.textContent="Or upload an ATIP file:",A=h(),D(_.$$.fragment),s=h(),c=p("div"),J=h(),D($.$$.fragment),m(u,"type","button"),m(u,"class","svelte-ynp6gq"),m(f,"data-testid","transport-authority"),m(f,"list","authorities-list"),m(C,"id","authorities-list"),m(d,"type","button"),d.disabled=n=!a[3],m(d,"class","svelte-ynp6gq"),m(e,"class","left svelte-ynp6gq"),m(c,"id","map"),m(c,"class","svelte-ynp6gq")},m(t,v){O(t,e,v),o(e,r),o(e,q),o(e,u),o(e,g),o(e,w),o(e,k),o(e,y),o(y,f),W(f,a[0]),o(y,F),o(y,C),a[8](C),o(y,E),o(y,d),o(d,l),o(e,I),o(e,b),o(e,S),o(e,i),o(e,A),G(_,e,null),O(t,s,v),O(t,c,v),O(t,J,v),G($,t,v),T=!0,P||(M=[L(u,"click",a[6]),L(f,"input",a[7]),L(d,"click",a[5])],P=!0)},p(t,[v]){v&1&&f.value!==t[0]&&W(f,t[0]),(!T||v&8&&n!==(n=!t[3]))&&(d.disabled=n);const B={};!N&&v&2&&(N=!0,B.open=t[1],et(()=>N=!1)),$.$set(B)},i(t){T||(R(_.$$.fragment,t),R($.$$.fragment,t),T=!0)},o(t){V(_.$$.fragment,t),V($.$$.fragment,t),T=!1},d(t){t&&j(e),a[8](null),Z(_),t&&j(s),t&&j(c),t&&j(J),Z($,t),P=!1,at(M)}}}function ut(a){if(a.features.length>0){let e=a.features[0].properties;for(let r of["planning","v2","criticals"])if(e&&r in e)return r}return"v1"}function pt(a,e,r){let q,u=!1,g,w,k=new Set;nt(async()=>{let l="boundary",n="boundary-layer";const b=await(await fetch(st)).text(),S=JSON.parse(b);for(let s of S.features){let c=document.createElement("option");c.value=s.properties.name,w.appendChild(c),k.add(s.properties.name)}S.features=S.features.filter(s=>s.properties.level=="TA");let i=new ot.Map({container:"map",style:"https://api.maptiler.com/maps/streets/style.json?key=MZEJTanw3WpxRvt7qDfo"}),A=null;function _(){A!==null&&i.setFeatureState({source:l,id:A},{hover:!1})}i.on("load",function(){i.fitBounds(lt(S),{padding:20,animate:!1}),i.addSource(l,{type:"geojson",data:S,generateId:!0}),i.addLayer({id:n,source:l,type:"fill",paint:{"fill-color":"rgb(200, 100, 240)","fill-outline-color":"rgb(200, 100, 240)","fill-opacity":["case",["boolean",["feature-state","hover"],!1],.8,.4]}}),i.on("mousemove",n,s=>{s.features.length>0&&(_(),A=s.features[0].id,i.setFeatureState({source:l,id:A},{hover:!0}))}),i.on("mouseleave",n,()=>{_(),A=null}),i.on("click",n,function(s){let c=s.features[0].properties.name;window.location.href=`scheme.html?authority=${c}`})})});function y(l){try{let n=JSON.parse(l);if(!n.authority)throw new Error("File doesn't have an authority set; is it an ATIP file?");if(!k.has(n.authority))throw new Error(`Unknown authority ${n.authority}`);let I=n.authority,b=ut(n);b!="v1"&&(I+=`_${b}`),window.localStorage.setItem(I,JSON.stringify(n)),window.location.href=`scheme.html?authority=${n.authority}&schema=${b}`}catch(n){window.alert(`Couldn't load scheme from a file: ${n}`)}}function f(){window.location.href=`scheme.html?authority=${g}`}const F=()=>r(1,u=!u);function C(){g=this.value,r(0,g)}function E(l){z[l?"unshift":"push"](()=>{w=l,r(2,w)})}function d(l){u=l,r(1,u)}return a.$$.update=()=>{a.$$.dirty&1&&r(3,q=k.has(g))},[g,u,w,q,y,f,F,C,E,d]}class ft extends K{constructor(e){super(),Q(this,e,pt,rt,X,{})}}new ft({target:document.getElementById("app")});
