(function(e){function t(t){for(var o,s,a=t[0],u=t[1],c=t[2],l=0,p=[];l<a.length;l++)s=a[l],r[s]&&p.push(r[s][0]),r[s]=0;for(o in u)Object.prototype.hasOwnProperty.call(u,o)&&(e[o]=u[o]);d&&d(t);while(p.length)p.shift()();return i.push.apply(i,c||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],o=!0,s=1;s<n.length;s++){var u=n[s];0!==r[u]&&(o=!1)}o&&(i.splice(t--,1),e=a(a.s=n[0]))}return e}var o={},r={app:0},i=[];function s(e){return a.p+"js/"+({about:"about"}[e]||e)+"."+{about:"18687928"}[e]+".js"}function a(t){if(o[t])return o[t].exports;var n=o[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,a),n.l=!0,n.exports}a.e=function(e){var t=[],n=r[e];if(0!==n)if(n)t.push(n[2]);else{var o=new Promise(function(t,o){n=r[e]=[t,o]});t.push(n[2]=o);var i,u=document.getElementsByTagName("head")[0],c=document.createElement("script");c.charset="utf-8",c.timeout=120,a.nc&&c.setAttribute("nonce",a.nc),c.src=s(e),i=function(t){c.onerror=c.onload=null,clearTimeout(l);var n=r[e];if(0!==n){if(n){var o=t&&("load"===t.type?"missing":t.type),i=t&&t.target&&t.target.src,s=new Error("Loading chunk "+e+" failed.\n("+o+": "+i+")");s.type=o,s.request=i,n[1](s)}r[e]=void 0}};var l=setTimeout(function(){i({type:"timeout",target:c})},12e4);c.onerror=c.onload=i,u.appendChild(c)}return Promise.all(t)},a.m=e,a.c=o,a.d=function(e,t,n){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(a.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)a.d(n,o,function(t){return e[t]}.bind(null,o));return n},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/",a.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],c=u.push.bind(u);u.push=t,u=u.slice();for(var l=0;l<u.length;l++)t(u[l]);var d=c;i.push([0,"chunk-vendors"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"23a3":function(e,t,n){},"56d7":function(e,t,n){"use strict";n.r(t);var o=n("2b0e"),r=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("div",{attrs:{id:"nav"}},[n("router-link",{attrs:{to:"/"}},[e._v("Home")]),e._v(" |\n    "),n("router-link",{attrs:{to:"/about"}},[e._v("About")])],1),n("main",[n("router-view")],1)])},i=[],s=(n("7c55"),n("2877")),a={},u=Object(s["a"])(a,r,i,!1,null,null,null);u.options.__file="App.vue";var c=u.exports,l=n("8c4f"),d=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("Feed",{attrs:{title:"Welcome to SmartCourse!",questions:e.feed}})],1)},p=[],f=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"Feed"},[n("h1",[e._v(e._s(e.title))]),n("section",{staticClass:"questions"},[n("ol",e._l(e.questions,function(e){return n("li",{key:e.id},[n("QuestionCard",{attrs:{question:e}})],1)}))])])},v=[],m=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"card"},[n("div",{staticClass:"meta-fields"},[n("p",[e._v(e._s(e.question.id))])]),n("div",{staticClass:"content"},[n("router-link",{attrs:{tag:"h2",to:{name:"question",params:{id:e.question.id}}}},[e._v("\n            "+e._s(e.question.title)+"\n        ")]),n("p",[e._v(e._s(e.question.body))])],1),n("aside",{staticClass:"date"},[n("time",[e._v(e._s(e.question.published))])])])},b=[],h={props:{question:Object}},_=h,O=(n("b59b"),Object(s["a"])(_,m,b,!1,null,"5134e67a",null));O.options.__file="QuestionCard.vue";var q=O.exports,g={name:"Feed",components:{QuestionCard:q},props:{title:String,questions:Array}},y=g,j=(n("d53b"),Object(s["a"])(y,f,v,!1,null,"5ac547ff",null));j.options.__file="Feed.vue";var E=j.exports,w=n("2f62"),G={name:"home",components:{Feed:E},computed:{...Object(w["b"])("questions",{feed:"feed"})},created(){this.$store.dispatch("questions/getFeed")}},C=G,S=Object(s["a"])(C,d,p,!1,null,null,null);S.options.__file="Home.vue";var F=S.exports;o["a"].use(l["a"]);var T=new l["a"]({mode:"history",routes:[{path:"/",name:"home",component:F},{path:"/about",name:"about",component:()=>n.e("about").then(n.bind(null,"f820"))},{path:"/question/:id",name:"question",props:({params:{id:e}})=>({id:e}),component:()=>n.e("about").then(n.bind(null,"e254"))}]});const L="http://localhost:3000/api",x=(e,t={})=>fetch(e,t).then(e=>e.json());function D(){return x(`${L}/_questions`)}function A(e){return x(`${L}/questions/${e}.json`)}var $=n("70f2"),k=n.n($);const N={loading:!1,search:"",questions:[],questionObj:{},error:{code:0,message:""}},P={feed:({questions:e})=>{return e.map(({id:e,meta:{uid:t},title:n,body:o})=>({id:e,title:n,body:o,author:t,published:k()(Date.now(),"DD/MM/YY")}))},question:({questionObj:{question:e}})=>e,answers:({questionObj:{answers:e}})=>e},I={REFRESH_FEED(e,t){e.questions=t},TOGGLE_LOADING(e,t){e.loading=t},FOCUS_QUESTION(e,t){e.questionObj=t}},M={async getFeed({commit:e}){e("TOGGLE_LOADING",!0),e("REFRESH_FEED",await D()),e("TOGGLE_LOADING",!1)},async getQuestion({commit:e},t){e("TOGGLE_LOADING",!0),e("FOCUS_QUESTION",await A(t)),e("TOGGLE_LOADING",!1)}};var Q={namespaced:!0,state:N,getters:P,actions:M,mutations:I};o["a"].use(w["a"]);var H=new w["a"].Store({modules:{questions:Q}});o["a"].config.productionTip=!1,new o["a"]({router:T,store:H,render:e=>e(c)}).$mount("#app")},"7c55":function(e,t,n){"use strict";var o=n("d3dd"),r=n.n(o);r.a},b59b:function(e,t,n){"use strict";var o=n("fc77"),r=n.n(o);r.a},d3dd:function(e,t,n){},d53b:function(e,t,n){"use strict";var o=n("23a3"),r=n.n(o);r.a},fc77:function(e,t,n){}});
//# sourceMappingURL=app.36bc0531.js.map