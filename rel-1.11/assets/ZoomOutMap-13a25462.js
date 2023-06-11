import{S as z,i as F,s as I,e as b,t as L,aj as te,f as m,g as y,h as g,ak as J,l as P,U as B,p as v,r as ie,ai as ae,O as re,x as D,c as M,as as V,y as E,z as N,A as W,n as C,o as O,I as G,K as ce,N as H,M as ue,L as fe,R as pe,Q as de,P as me,ap as U,T as _e,E as be,a8 as se,a9 as ne,am as A,at as R,ag as oe,d as ge,m as ye,q as ve,B as q,au as he,u as we,b as ke,ae as Se,w as Ce}from"./maplibre_helpers-22323140.js";function Le(o){let e,n,t,s,l,i,c;return{c(){e=b("div"),n=L(`Basemap:
  `),t=b("select"),s=b("option"),s.textContent="Streets",l=b("option"),l.textContent="Satellite",s.__value="streets",s.value=s.__value,l.__value="hybrid",l.value=l.__value,o[0]===void 0&&te(()=>o[2].call(t)),m(e,"class","svelte-1tbnm6i")},m(u,a){y(u,e,a),g(e,n),g(e,t),g(t,s),g(t,l),J(t,o[0]),i||(c=[P(t,"change",o[2]),P(t,"change",o[1])],i=!0)},p(u,[a]){a&1&&J(t,u[0])},i:B,o:B,d(u){u&&v(e),i=!1,ie(c)}}}function Be(o,e,n){let{style:t}=e;function s(){let i=new URLSearchParams(window.location.search);i.set("style",t);let c=`${window.location.pathname}?${i.toString()}${window.location.hash}`;window.location.href=c}function l(){t=ae(this),n(0,t)}return o.$$set=i=>{"style"in i&&n(0,t=i.style)},[t,s,l]}class st extends z{constructor(e){super(),F(this,e,Be,Le,I,{style:0})}}const T=[];function j(o,e=B){let n;const t=new Set;function s(c){if(I(o,c)&&(o=c,n)){const u=!T.length;for(const a of t)a[1](),T.push(a,o);if(u){for(let a=0;a<T.length;a+=2)T[a][0](T[a+1]);T.length=0}}}function l(c){s(c(o))}function i(c,u=B){const a=[c,u];return t.add(a),t.size===1&&(n=e(s)||B),c(o),()=>{t.delete(a),t.size===0&&(n(),n=null)}}return{set:s,update:l,subscribe:i}}function Me(o){return o=="google"||o=="bing"}const Z=j(null),nt=j(null),le=j(re()),Oe=j(null),Ie=j(null),je=j(null),qe=j(null),ze=j(Fe());ze.subscribe(o=>window.localStorage.setItem("userSettings",JSON.stringify(o)));const ot=j("edit-attribute");function lt(o){let e=new Set;for(let t of o.features)e.add(t.id);let n=e.size+1;for(;e.has(n);)n++;return n}function it(o){console.log(`Deleting intervention ${o}`),le.update(e=>(e.features=e.features.filter(n=>n.id!=o),e)),Oe.set(null),Ie.set(null),je.set(null),qe.set(null)}function Fe(){let o={streetViewImagery:"google",avoidDoublingBack:!1};try{let e=JSON.parse(window.localStorage.getItem("userSettings")||"{}");Me(e.streetViewImagery)&&(o.streetViewImagery=e.streetViewImagery),typeof e.avoidDoublingBack=="boolean"&&(o.avoidDoublingBack=e.avoidDoublingBack)}catch(e){console.log(`Couldn't parse userSettings from local storage: ${e}`)}return o}const Te=o=>({}),K=o=>({}),$e=o=>({}),Q=o=>({});function Pe(o){let e,n,t,s,l,i,c,u,a,p,_;const d=o[3].sidebar,f=D(d,o,o[2],Q),S=o[3].main,w=D(S,o,o[2],K);return{c(){e=b("div"),n=b("aside"),t=b("div"),f&&f.c(),s=M(),l=b("button"),l.textContent="→",c=M(),u=b("main"),w&&w.c(),m(t,"class","sidebar-content content-container svelte-ect12w"),m(l,"type","button"),m(l,"class","sidebar-toggle rounded-rect svelte-ect12w"),m(n,"class",i=V(o[0]?"":"collapsed")+" svelte-ect12w"),m(u,"class","svelte-ect12w"),m(e,"class","overall-layout svelte-ect12w")},m(r,h){y(r,e,h),g(e,n),g(n,t),f&&f.m(t,null),g(n,s),g(n,l),g(e,c),g(e,u),w&&w.m(u,null),a=!0,p||(_=P(l,"click",o[1]),p=!0)},p(r,[h]){f&&f.p&&(!a||h&4)&&E(f,d,r,r[2],a?W(d,r[2],h,$e):N(r[2]),Q),(!a||h&1&&i!==(i=V(r[0]?"":"collapsed")+" svelte-ect12w"))&&m(n,"class",i),w&&w.p&&(!a||h&4)&&E(w,S,r,r[2],a?W(S,r[2],h,Te):N(r[2]),K)},i(r){a||(C(f,r),C(w,r),a=!0)},o(r){O(f,r),O(w,r),a=!1},d(r){r&&v(e),f&&f.d(r),w&&w.d(r),p=!1,_()}}}function Re(o,e,n){let{$$slots:t={},$$scope:s}=e,l=!0;function i(){n(0,l=!l)}return o.$$set=c=>{"$$scope"in c&&n(2,s=c.$$scope)},[l,i,s,t]}class at extends z{constructor(e){super(),F(this,e,Re,Pe,I,{})}}const k={area:"#e41a1c",route:"#377eb8",crossing:"#4daf4a",other:"#984ea3",preapp:"#e41a1c",outline:"#377eb8","reserved matters":"#4daf4a","local plan":"#984ea3",hovering:"black",lineEndpointColor:"black"},De=10,X=10;let $="interventions";function Ee(o,e,n){let t,s;G(o,Z,p=>n(1,t=p)),G(o,le,p=>n(2,s=p));let{schema:l}=e;ce(t,$,s);const i=["match",["get","intervention_type"],"area",k.area,"route",k.route,"crossing",k.crossing,"other",k.other,"white"],c=["match",["get","reference_type",["get","planning"]],"preapp",k.preapp,"outline",k.outline,"reserved matters",k["reserved matters"],"local plan",k["local plan"],"white"],u=["!=","hide_while_editing",!0];return H(t,{id:"interventions-points",source:$,filter:["all",pe,u,["!=","endpoint",!0]],color:i,radius:De}),ue(t,{id:"interventions-lines",source:$,filter:["all",de,u],color:i,width:X}),H(t,{id:"interventions-lines-endpoints",source:$,filter:["==","endpoint",!0],radius:.5*X,opacity:0,strokeColor:k.lineEndpointColor,strokeWidth:2}),fe(t,{id:"interventions-polygons",source:$,filter:["all",me,u],color:l=="planning"?c:i,opacity:.5}),o.$$set=p=>{"schema"in p&&n(0,l=p.schema)},o.$$.update=()=>{if(o.$$.dirty&6){let p=JSON.parse(JSON.stringify(s)),_=[];for(let d of p.features)if(d.geometry.type=="LineString"&&!d.properties.hide_while_editing)for(let f of[d.geometry.coordinates[0],d.geometry.coordinates[d.geometry.coordinates.length-1]])_.push({type:"Feature",properties:{endpoint:!0},geometry:{type:"Point",coordinates:f}});p.features=p.features.concat(_),t.getSource($).setData(p)}},[l,t,s]}class rt extends z{constructor(e){super(),F(this,e,Ee,null,I,{schema:0})}}function Ne(o){const e=o-1;return e*e*e+1}function Y(o,{delay:e=0,duration:n=400,easing:t=Ne}={}){const s=getComputedStyle(o),l=+s.opacity,i=parseFloat(s.height),c=parseFloat(s.paddingTop),u=parseFloat(s.paddingBottom),a=parseFloat(s.marginTop),p=parseFloat(s.marginBottom),_=parseFloat(s.borderTopWidth),d=parseFloat(s.borderBottomWidth);return{delay:e,duration:n,easing:t,css:f=>`overflow: hidden;opacity: ${Math.min(f*20,1)*l};height: ${f*i}px;padding-top: ${f*c}px;padding-bottom: ${f*u}px;margin-top: ${f*a}px;margin-bottom: ${f*p}px;border-top-width: ${f*_}px;border-bottom-width: ${f*d}px;`}}function x(o){let e,n,t;const s=o[3].default,l=D(s,o,o[2],null);return{c(){e=b("div"),l&&l.c()},m(i,c){y(i,e,c),l&&l.m(e,null),t=!0},p(i,c){l&&l.p&&(!t||c&4)&&E(l,s,i,i[2],t?W(s,i[2],c,null):N(i[2]),null)},i(i){t||(C(l,i),te(()=>{n||(n=A(e,Y,{duration:100},!0)),n.run(1)}),t=!0)},o(i){O(l,i),n||(n=A(e,Y,{duration:100},!1)),n.run(0),t=!1},d(i){i&&v(e),l&&l.d(i),i&&n&&n.end()}}}function We(o){let e,n,t,s,l,i,c,u,a,p,_=o[0]&&x(o);return{c(){e=b("button"),n=U("svg"),t=U("path"),s=M(),l=L(o[1]),i=M(),_&&_.c(),c=_e(),m(t,"d","M9 5l7 7-7 7"),m(n,"style","tran"),m(n,"width","20"),m(n,"height","20"),m(n,"fill","none"),m(n,"stroke-linecap","round"),m(n,"stroke-linejoin","round"),m(n,"stroke-width","2"),m(n,"viewBox","0 0 24 24"),m(n,"stroke","currentColor"),m(n,"class","svelte-una9lq"),m(e,"aria-expanded",o[0]),m(e,"class","svelte-una9lq")},m(d,f){y(d,e,f),g(e,n),g(n,t),g(e,s),g(e,l),y(d,i,f),_&&_.m(d,f),y(d,c,f),u=!0,a||(p=P(e,"click",o[4]),a=!0)},p(d,[f]){(!u||f&2)&&be(l,d[1]),(!u||f&1)&&m(e,"aria-expanded",d[0]),d[0]?_?(_.p(d,f),f&1&&C(_,1)):(_=x(d),_.c(),C(_,1),_.m(c.parentNode,c)):_&&(se(),O(_,1,1,()=>{_=null}),ne())},i(d){u||(C(_),u=!0)},o(d){O(_),u=!1},d(d){d&&v(e),d&&v(i),_&&_.d(d),d&&v(c),a=!1,p()}}}function Ge(o,e,n){let{$$slots:t={},$$scope:s}=e,{label:l}=e,{open:i=!1}=e;const c=()=>n(0,i=!i);return o.$$set=u=>{"label"in u&&n(1,l=u.label),"open"in u&&n(0,i=u.open),"$$scope"in u&&n(2,s=u.$$scope)},[i,l,s,t,c]}class Ze extends z{constructor(e){super(),F(this,e,Ge,We,I,{label:1,open:0})}}function Je(o,e,n){let t;G(o,Z,a=>n(2,t=a));let{layers:s}=e,{contents:l}=e,i=new R.Popup({closeButton:!1,closeOnClick:!1,maxWidth:"none"});t.on("mousemove",c),t.on("mouseout",u),oe(()=>{t.off("mousemove",c),t.off("mouseout",u),i.remove()});function c(a){if(!s.every(_=>t.getLayer(_))){i.remove();return}let p=t.queryRenderedFeatures(a.point,{layers:s});p.length>0?i.setLngLat(a.lngLat).setHTML(l(p[0].properties)).addTo(t):i.remove()}function u(){i.remove()}return o.$$set=a=>{"layers"in a&&n(0,s=a.layers),"contents"in a&&n(1,l=a.contents)},[s,l]}class ct extends z{constructor(e){super(),F(this,e,Je,null,I,{layers:0,contents:1})}}function Ve(o){let e,n,t,s,l,i,c,u,a,p,_,d,f,S,w;return{c(){e=b("li"),n=b("span"),t=L("Areas"),s=M(),l=b("li"),i=b("span"),c=L("Routes"),u=M(),a=b("li"),p=b("span"),_=L("Crossings"),d=M(),f=b("li"),S=b("span"),w=L("Other"),m(n,"class","svelte-l42ea0"),q(n,"background",k.area),m(i,"class","svelte-l42ea0"),q(i,"background",k.route),m(p,"class","svelte-l42ea0"),q(p,"background",k.crossing),m(S,"class","svelte-l42ea0"),q(S,"background",k.other)},m(r,h){y(r,e,h),g(e,n),g(e,t),y(r,s,h),y(r,l,h),g(l,i),g(l,c),y(r,u,h),y(r,a,h),g(a,p),g(a,_),y(r,d,h),y(r,f,h),g(f,S),g(f,w)},p:B,d(r){r&&v(e),r&&v(s),r&&v(l),r&&v(u),r&&v(a),r&&v(d),r&&v(f)}}}function He(o){let e,n,t,s,l,i,c,u,a,p,_,d,f,S,w;return{c(){e=b("li"),n=b("span"),t=L("Preapp"),s=M(),l=b("li"),i=b("span"),c=L("Outline"),u=M(),a=b("li"),p=b("span"),_=L("Reserved matters"),d=M(),f=b("li"),S=b("span"),w=L("Local plan"),m(n,"class","svelte-l42ea0"),q(n,"background",k.preapp),m(i,"class","svelte-l42ea0"),q(i,"background",k.outline),m(p,"class","svelte-l42ea0"),q(p,"background",k["reserved matters"]),m(S,"class","svelte-l42ea0"),q(S,"background",k["local plan"])},m(r,h){y(r,e,h),g(e,n),g(e,t),y(r,s,h),y(r,l,h),g(l,i),g(l,c),y(r,u,h),y(r,a,h),g(a,p),g(a,_),y(r,d,h),y(r,f,h),g(f,S),g(f,w)},p:B,d(r){r&&v(e),r&&v(s),r&&v(l),r&&v(u),r&&v(a),r&&v(d),r&&v(f)}}}function Ue(o){let e;function n(l,i){return l[0]=="planning"?He:Ve}let t=n(o),s=t(o);return{c(){e=b("ul"),s.c()},m(l,i){y(l,e,i),s.m(e,null)},p(l,i){t===(t=n(l))&&s?s.p(l,i):(s.d(1),s=t(l),s&&(s.c(),s.m(e,null)))},d(l){l&&v(e),s.d()}}}function Ae(o){let e,n,t;return n=new Ze({props:{label:"Objects",open:!0,$$slots:{default:[Ue]},$$scope:{ctx:o}}}),{c(){e=b("div"),ge(n.$$.fragment),m(e,"class","svelte-l42ea0")},m(s,l){y(s,e,l),ye(n,e,null),t=!0},p(s,[l]){const i={};l&3&&(i.$$scope={dirty:l,ctx:s}),n.$set(i)},i(s){t||(C(n.$$.fragment,s),t=!0)},o(s){O(n.$$.fragment,s),t=!1},d(s){s&&v(e),ve(n)}}}function Ke(o,e,n){let{schema:t}=e;return o.$$set=s=>{"schema"in s&&n(0,t=s.schema)},[t]}class ut extends z{constructor(e){super(),F(this,e,Ke,Ae,I,{schema:0})}}function ee(o){let e;const n=o[4].default,t=D(n,o,o[3],null);return{c(){t&&t.c()},m(s,l){t&&t.m(s,l),e=!0},p(s,l){t&&t.p&&(!e||l&8)&&E(t,n,s,s[3],e?W(n,s[3],l,null):N(s[3]),null)},i(s){e||(C(t,s),e=!0)},o(s){O(t,s),e=!1},d(s){t&&t.d(s)}}}function Qe(o){let e,n,t=o[1]&&ee(o);return{c(){e=b("div"),t&&t.c(),m(e,"class","map svelte-12dpf1u")},m(s,l){y(s,e,l),t&&t.m(e,null),o[5](e),n=!0},p(s,[l]){s[1]?t?(t.p(s,l),l&2&&C(t,1)):(t=ee(s),t.c(),C(t,1),t.m(e,null)):t&&(se(),O(t,1,1,()=>{t=null}),ne())},i(s){n||(C(t),n=!0)},o(s){O(t),n=!1},d(s){s&&v(e),t&&t.d(),o[5](null)}}}function Xe(o,e,n){let{$$slots:t={},$$scope:s}=e,{style:l}=e,i,c,u=!1;he("setCamera",!window.location.hash),we(()=>{i=new R.Map({container:c,style:`https://api.maptiler.com/maps/${l}/style.json?key=MZEJTanw3WpxRvt7qDfo`,hash:!0}),i.addControl(new R.ScaleControl({})),i.addControl(new R.NavigationControl({visualizePitch:!0}),"bottom-right"),i.on("load",()=>{n(1,u=!0),Z.set(i)}),new ResizeObserver(()=>{i.resize()}).observe(c)}),oe(()=>{i.remove()});function a(p){ke[p?"unshift":"push"](()=>{c=p,n(0,c)})}return o.$$set=p=>{"style"in p&&n(2,l=p.style),"$$scope"in p&&n(3,s=p.$$scope)},[c,u,l,s,t,a]}class ft extends z{constructor(e){super(),F(this,e,Xe,Qe,I,{style:2})}}const Ye="/atip/rel-1.11/assets/zoom_out_map-b2e1091a.svg";function xe(o){let e,n,t,s,l;return{c(){e=b("button"),n=b("img"),Se(n.src,t=Ye)||m(n,"src",t),m(n,"alt","Zoom to show entire boundary"),m(e,"type","button"),m(e,"title","Zoom to show entire boundary"),m(e,"class","svelte-qzjsqo")},m(i,c){y(i,e,c),g(e,n),s||(l=P(e,"click",o[0]),s=!0)},p:B,i:B,o:B,d(i){i&&v(e),s=!1,l()}}}function et(o,e,n){let t;G(o,Z,i=>n(2,t=i));let{boundaryGeojson:s}=e;function l(){t.fitBounds(Ce(s),{padding:20,animate:!0,duration:500})}return o.$$set=i=>{"boundaryGeojson"in i&&n(1,s=i.boundaryGeojson)},[l,s]}class pt extends z{constructor(e){super(),F(this,e,et,xe,I,{boundaryGeojson:1})}}export{st as B,Ze as C,rt as I,at as L,ct as M,pt as Z,Ie as a,De as b,k as c,ot as d,Y as e,Oe as f,le as g,it as h,ft as i,ut as j,X as l,Z as m,lt as n,qe as o,nt as r,je as s,ze as u};
