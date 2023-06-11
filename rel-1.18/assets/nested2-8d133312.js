import{S as ve,i as Ce,s as je,d as z,m as J,n as k,o as C,q as M,I as me,ag as Be,F as Fe,e as h,c as w,t as b,f as H,g as G,h as o,j as _e,l as V,E,a8 as we,a9 as ye,p as D,ah as Ie,r as Se,w as he,T as Le,U as Oe}from"./maplibre_helpers-22323140.js";import{L as Ne,g as ee,Z as ze,i as Je,I as Me,B as Te,j as qe,M as Ee,m as Ge,C as De}from"./ZoomOutMap-b71b77a4.js";function de(n,e,l){const r=n.slice();return r[17]=e[l],r}function ge(n){let e,l;return e=new De({props:{label:`${n[17].scheme_reference}: ${n[17].num_features} features`,$$slots:{default:[Ue]},$$scope:{ctx:n}}}),{c(){z(e.$$.fragment)},m(r,t){J(e,r,t),l=!0},p(r,t){const a={};t&1&&(a.label=`${r[17].scheme_reference}: ${r[17].num_features} features`),t&1048577&&(a.$$scope={dirty:t,ctx:r}),e.$set(a)},i(r){l||(k(e.$$.fragment,r),l=!0)},o(r){C(e.$$.fragment,r),l=!1},d(r){M(e,r)}}}function Ue(n){let e,l,r,t=n[17].authority_or_region+"",a,c,g,p,s=n[17].capital_scheme_id+"",d,U,O,T,v=n[17].funding_programme+"",j,Z,q,I,B,i,u,y,m,K;function P(){return n[12](n[17])}function Q(){return n[13](n[17])}return{c(){e=h("ul"),l=h("li"),r=b("Authority or region: "),a=b(t),c=w(),g=h("li"),p=b("Capital scheme ID: "),d=b(s),U=w(),O=h("li"),T=b("Funding programme: "),j=b(v),Z=w(),q=h("li"),I=h("button"),I.textContent="Show on map",B=w(),i=h("li"),u=h("button"),u.textContent="Edit scheme",y=w(),H(I,"type","button"),H(u,"type","button")},m(L,F){G(L,e,F),o(e,l),o(l,r),o(l,a),o(e,c),o(e,g),o(g,p),o(g,d),o(e,U),o(e,O),o(O,T),o(O,j),o(e,Z),o(e,q),o(q,I),o(e,B),o(e,i),o(i,u),G(L,y,F),m||(K=[V(I,"click",P),V(u,"click",Q)],m=!0)},p(L,F){n=L,F&1&&t!==(t=n[17].authority_or_region+"")&&E(a,t),F&1&&s!==(s=n[17].capital_scheme_id+"")&&E(d,s),F&1&&v!==(v=n[17].funding_programme+"")&&E(j,v)},d(L){L&&D(e),L&&D(y),m=!1,Se(K)}}}function $e(n){let e=n[2].has(n[17].scheme_reference),l,r,t=e&&ge(n);return{c(){t&&t.c(),l=Le()},m(a,c){t&&t.m(a,c),G(a,l,c),r=!0},p(a,c){c&5&&(e=a[2].has(a[17].scheme_reference)),e?t?(t.p(a,c),c&5&&k(t,1)):(t=ge(a),t.c(),k(t,1),t.m(l.parentNode,l)):t&&(we(),C(t,1,1,()=>{t=null}),ye())},i(a){r||(k(t),r=!0)},o(a){C(t),r=!1},d(a){t&&t.d(a),a&&D(l)}}}function Ze(n){let e,l,r,t,a,c,g,p,s,d,U,O,T,v,j,Z,q,I,B,i,u,y,m,K,P=n[2].size+"",Q,L,F=n[3].route+"",te,se,W=n[3].area+"",re,ae,X=n[3].crossing+"",le,ie,Y=n[3].other+"",ne,fe,ue,x,N,oe,ce;c=new ze({props:{boundaryGeojson:n[4]}}),p=new Fe({props:{label:"Load from GeoJSON",uniqueId:"load_geojson",loadFile:n[6]}});let A=n[0],_=[];for(let f=0;f<A.length;f+=1)_[f]=$e(de(n,A,f));const ke=f=>C(_[f],1,1,()=>{_[f]=null});return{c(){e=h("div"),l=h("button"),l.textContent="Home",r=w(),t=h("h1"),a=b(`Browse schemes
      `),z(c.$$.fragment),g=w(),z(p.$$.fragment),s=w(),d=h("br"),U=w(),O=h("br"),T=w(),v=h("div"),j=h("label"),Z=b("Filter by any field: "),q=h("br"),I=w(),B=h("input"),i=w(),u=h("button"),u.textContent="Clear",y=w(),m=h("p"),K=b("Showing "),Q=b(P),L=b(" schemes ("),te=b(F),se=b(" routes, "),re=b(W),ae=b(` areas,
      `),le=b(X),ie=b(" crossings, "),ne=b(Y),fe=b(" other)"),ue=w(),x=h("ul");for(let f=0;f<_.length;f+=1)_[f].c();H(l,"type","button"),H(B,"type","text"),H(u,"type","button"),H(e,"slot","sidebar")},m(f,$){G(f,e,$),o(e,l),o(e,r),o(e,t),o(t,a),J(c,t,null),o(e,g),J(p,e,null),o(e,s),o(e,d),o(e,U),o(e,O),o(e,T),o(e,v),o(v,j),o(j,Z),o(j,q),o(j,I),o(j,B),_e(B,n[1]),o(v,i),o(v,u),o(e,y),o(e,m),o(m,K),o(m,Q),o(m,L),o(m,te),o(m,se),o(m,re),o(m,ae),o(m,le),o(m,ie),o(m,ne),o(m,fe),o(e,ue),o(e,x);for(let R=0;R<_.length;R+=1)_[R].m(x,null);N=!0,oe||(ce=[V(l,"click",n[9]),V(B,"input",n[10]),V(u,"click",n[11])],oe=!0)},p(f,$){const R={};if($&16&&(R.boundaryGeojson=f[4]),c.$set(R),$&2&&B.value!==f[1]&&_e(B,f[1]),(!N||$&4)&&P!==(P=f[2].size+"")&&E(Q,P),(!N||$&8)&&F!==(F=f[3].route+"")&&E(te,F),(!N||$&8)&&W!==(W=f[3].area+"")&&E(re,W),(!N||$&8)&&X!==(X=f[3].crossing+"")&&E(le,X),(!N||$&8)&&Y!==(Y=f[3].other+"")&&E(ne,Y),$&389){A=f[0];let S;for(S=0;S<A.length;S+=1){const pe=de(f,A,S);_[S]?(_[S].p(pe,$),k(_[S],1)):(_[S]=$e(pe),_[S].c(),k(_[S],1),_[S].m(x,null))}for(we(),S=A.length;S<_.length;S+=1)ke(S);ye()}},i(f){if(!N){k(c.$$.fragment,f),k(p.$$.fragment,f);for(let $=0;$<A.length;$+=1)k(_[$]);N=!0}},o(f){C(c.$$.fragment,f),C(p.$$.fragment,f),_=_.filter(Boolean);for(let $=0;$<_.length;$+=1)C(_[$]);N=!1},d(f){f&&D(e),M(c),M(p),Ie(_,f),oe=!1,Se(ce)}}}function Ae(n){let e,l,r,t,a,c,g,p;return e=new Me({props:{schema:be}}),r=new Te({props:{style:n[5]}}),a=new qe({props:{schema:be}}),g=new Ee({props:{layers:["interventions-points","interventions-lines","interventions-polygons"],contents:Re}}),{c(){z(e.$$.fragment),l=w(),z(r.$$.fragment),t=w(),z(a.$$.fragment),c=w(),z(g.$$.fragment)},m(s,d){J(e,s,d),G(s,l,d),J(r,s,d),G(s,t,d),J(a,s,d),G(s,c,d),J(g,s,d),p=!0},p:Oe,i(s){p||(k(e.$$.fragment,s),k(r.$$.fragment,s),k(a.$$.fragment,s),k(g.$$.fragment,s),p=!0)},o(s){C(e.$$.fragment,s),C(r.$$.fragment,s),C(a.$$.fragment,s),C(g.$$.fragment,s),p=!1},d(s){M(e,s),s&&D(l),M(r,s),s&&D(t),M(a,s),s&&D(c),M(g,s)}}}function He(n){let e,l,r;return l=new Je({props:{style:n[5],$$slots:{default:[Ae]},$$scope:{ctx:n}}}),{c(){e=h("div"),z(l.$$.fragment),H(e,"slot","main")},m(t,a){G(t,e,a),J(l,e,null),r=!0},p(t,a){const c={};a&1048576&&(c.$$scope={dirty:a,ctx:t}),l.$set(c)},i(t){r||(k(l.$$.fragment,t),r=!0)},o(t){C(l.$$.fragment,t),r=!1},d(t){t&&D(e),M(l)}}}function Pe(n){let e,l;return e=new Ne({props:{$$slots:{main:[He],sidebar:[Ze]},$$scope:{ctx:n}}}),{c(){z(e.$$.fragment)},m(r,t){J(e,r,t),l=!0},p(r,[t]){const a={};t&1048607&&(a.$$scope={dirty:t,ctx:r}),e.$set(a)},i(r){l||(k(e.$$.fragment,r),l=!0)},o(r){C(e.$$.fragment,r),l=!1},d(r){M(e,r)}}}const be="v1";function Re(n){var e="<table>";for(let[l,r]of Object.entries(n))e+=`<tr><td>${l}</td><td>${r}</td></tr>`;return e+="</table>",e}function Ke(n,e,l){let r,t;me(n,ee,i=>l(4,r=i)),me(n,Ge,i=>l(14,t=i));let c=new URLSearchParams(window.location.search).get("style")||"streets",g=[],p="",s=new Set,d={area:0,route:0,crossing:0,other:0};Be(()=>{ee.set(null)});function U(i){try{let u=JSON.parse(i);ee.set(u),O(u),t==null||t.fitBounds(he(u),{padding:20,animate:!1})}catch(u){window.alert(`Couldn't load schemes from a file: ${u}`)}}function O(i){let u={};for(let[y,m]of Object.entries(i.schemes))u[y]={scheme_reference:y,num_features:0,...m};for(let y of i.features)u[y.properties.scheme_reference].num_features++;l(0,g=Object.values(u))}function T(i){let u={type:"FeatureCollection",features:r.features.filter(y=>y.properties.scheme_reference==i.scheme_reference)};t==null||t.fitBounds(he(u),{padding:20,animate:!1})}function v(i){let u={type:"FeatureCollection",features:r.features.filter(m=>m.properties.scheme_reference==i.scheme_reference)},y=i.authority_or_region;window.localStorage.setItem(y,JSON.stringify(u)),window.open(`scheme.html?authority=${i.authority_or_region}`,"_blank")}const j=()=>window.open("index.html");function Z(){p=this.value,l(1,p)}const q=()=>l(1,p=""),I=i=>T(i),B=i=>v(i);return n.$$.update=()=>{if(n.$$.dirty&31){if(s.clear(),p){let i=p.toLowerCase();for(let u of r.features)JSON.stringify(u.properties).toLowerCase().includes(i)&&s.add(u.properties.scheme_reference)}else for(let i of g)s.add(i.scheme_reference);ee.update(i=>{if(!i)return null;for(let u of i.features)s.has(u.properties.scheme_reference)?delete u.properties.hide_while_editing:u.properties.hide_while_editing=!0;return i}),l(3,d={area:0,route:0,crossing:0,other:0});for(let i of r==null?void 0:r.features)s.has(i.properties.scheme_reference)&&l(3,d[i.properties.intervention_type]++,d);l(2,s),l(1,p),l(4,r),l(0,g),l(3,d)}},[g,p,s,d,r,c,U,T,v,j,Z,q,I,B]}class Qe extends ve{constructor(e){super(),Ce(this,e,Ke,Pe,je,{})}}new Qe({target:document.getElementById("app")});
