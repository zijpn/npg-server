webpackJsonp([1],{0:function(e,t,n){e.exports=n("x35b")},1:function(e,t){},"9uWz":function(e,t){},G3BA:function(e,t){},x35b:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r=n("/5sW"),o=n("Z60a"),i=n.n(o),c=n("T/v0"),a=n.n(c),u=n("j/rp"),s=n.n(u),f=n("Oy1H"),l=n.n(f),p=n("C9uT"),d=n.n(p),v=n("DmT9"),_=n.n(v),h=_()({path:"/api"}),m=h,b=n("EOM2"),y=this&&this.__decorate||function(e,t,n,r){var o,i=arguments.length,c=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"===("undefined"===typeof Reflect?"undefined":l()(Reflect))&&"function"===typeof Reflect.decorate)c=Reflect.decorate(e,t,n,r);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(c=(i<3?o(c):i>3?o(t,n,c):o(t,n))||c);return i>3&&c&&Object.defineProperty(t,n,c),c},O=this&&this.__metadata||function(e,t){if("object"===("undefined"===typeof Reflect?"undefined":l()(Reflect))&&"function"===typeof Reflect.metadata)return Reflect.metadata(e,t)},j=function(e){function t(){return i()(this,t),a()(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return s()(t,e),d()(t,[{key:"mounted",value:function(){var e=this;m.on("connect",function(){m.emit("version"),m.on("version",function(t){e.$store.dispatch("setServerVersion",t)})})}},{key:"serverVersion",get:function(){return this.$store.state.serverVersion}}]),t}(b["Vue"]);y([Object(b["Prop"])({default:"0.1.0"}),O("design:type",String)],j.prototype,"uiVersion",void 0),j=y([b["Component"]],j);var R=j,g=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("footer",{staticClass:"footer"},[n("div",{staticClass:"version"},[e._v("\n    ui "+e._s(e.uiVersion)+", server "+e._s(e.serverVersion)+"\n  ")])])},V=[],E=n("XyMi");function P(e){n("9uWz")}var S=!1,$=P,w="data-v-b0a292ea",x=null,C=Object(E["a"])(R,g,V,S,$,w,x),T=C.exports,k=this&&this.__decorate||function(e,t,n,r){var o,i=arguments.length,c=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"===("undefined"===typeof Reflect?"undefined":l()(Reflect))&&"function"===typeof Reflect.decorate)c=Reflect.decorate(e,t,n,r);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(c=(i<3?o(c):i>3?o(t,n,c):o(t,n))||c);return i>3&&c&&Object.defineProperty(t,n,c),c},D=function(e){function t(){return i()(this,t),a()(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return s()(t,e),t}(b["Vue"]);D=k([Object(b["Component"])({components:{StatusBar:T}})],D);var A=D,B=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("header",{attrs:{id:"nav"}},[n("router-link",{attrs:{to:"/"}},[e._v("Home")]),e._v(" |\n    "),n("router-link",{attrs:{to:"/about"}},[e._v("About")])],1),n("main",[n("router-view")],1),n("status-bar")],1)},M=[];function N(e){n("G3BA")}var W=!1,z=N,G=null,H=null,I=Object(E["a"])(A,B,M,W,z,G,H),q=I.exports,J=n("/ocq"),K=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},X=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"about"},[n("h1",[e._v("This is an about page")])])}],Y=null,Z=!1,F=null,L=null,Q=null,U=Object(E["a"])(Y,K,X,Z,F,L,Q),ee=U.exports,te=this&&this.__decorate||function(e,t,n,r){var o,i=arguments.length,c=i<3?t:null===r?r=Object.getOwnPropertyDescriptor(t,n):r;if("object"===("undefined"===typeof Reflect?"undefined":l()(Reflect))&&"function"===typeof Reflect.decorate)c=Reflect.decorate(e,t,n,r);else for(var a=e.length-1;a>=0;a--)(o=e[a])&&(c=(i<3?o(c):i>3?o(t,n,c):o(t,n))||c);return i>3&&c&&Object.defineProperty(t,n,c),c},ne=function(e){function t(){return i()(this,t),a()(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return s()(t,e),t}(b["Vue"]);ne=te([Object(b["Component"])({components:{}})],ne);var re=ne,oe=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},ie=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"home"},[n("h1",[e._v("This is the home page")])])}],ce=!1,ae=null,ue=null,se=null,fe=Object(E["a"])(re,oe,ie,ce,ae,ue,se),le=fe.exports;r["default"].use(J["a"]);var pe=new J["a"]({mode:"history",routes:[{component:le,name:"home",path:"/"},{component:ee,name:"about",path:"/about"}]}),de=n("fKPv"),ve=n.n(de),_e=n("NYxO");r["default"].use(_e["a"]);var he=new _e["a"].Store({actions:{setServerVersion:function(e,t){var n=e.commit;n("SET_SERVER_VERSION",t)}},mutations:ve()({},"SET_SERVER_VERSION",function(e,t){e.serverVersion=t}),state:{serverVersion:"dev"},strict:!1});r["default"].config.productionTip=!1,new r["default"]({render:function(e){return e(q)},router:pe,store:he}).$mount("#app")}},[0]);
//# sourceMappingURL=app.e1e5df15.js.map