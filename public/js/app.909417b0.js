webpackJsonp([1],{0:function(e,t,n){e.exports=n("x35b")},1:function(e,t){},"4PG8":function(e,t){},"4c2u":function(e,t){},"6jys":function(e,t){},D0Eq:function(e,t){},G3BA:function(e,t){},O4VS:function(e,t){},kog4:function(e,t){},oxek:function(e,t){},qLT4:function(e,t){},uqH2:function(e,t){},x35b:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var i=n("/5sW"),o=(n("mJx5"),n("Z60a")),r=n.n(o),a=n("C9uT"),c=n.n(a),s=n("T/v0"),l=n.n(s),f=n("j/rp"),u=n.n(f),p=n("Oy1H"),d=n.n(p),v=n("EOM2"),h=this&&this.__decorate||function(e,t,n,i){var o,r=arguments.length,a=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"===("undefined"===typeof Reflect?"undefined":d()(Reflect))&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,n,i);else for(var c=e.length-1;c>=0;c--)(o=e[c])&&(a=(r<3?o(a):r>3?o(t,n,a):o(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},g=function(e){function t(){return r()(this,t),l()(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u()(t,e),t}(v["Vue"]);g=h([v["Component"]],g);var y=g,m=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},b=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h2",{staticStyle:{"text-align":"center"}},[e._v("editor")])])}],_=n("XyMi");function O(e){n("O4VS")}var j=!1,P=O,R="data-v-0603e6a0",E=null,k=Object(_["a"])(y,m,b,j,P,R,E),w=k.exports,C=n("DmT9"),V=n.n(C),T=!0;"false"===Object({NODE_ENV:"production",BASE_URL:"/"}).VUE_APP_SOCKET&&(T=!1);var S=V()({autoConnect:T,path:"/api"}),A=S,x=n("wY90"),$=n.n(x),z=this&&this.__decorate||function(e,t,n,i){var o,r=arguments.length,a=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"===("undefined"===typeof Reflect?"undefined":d()(Reflect))&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,n,i);else for(var c=e.length-1;c>=0;c--)(o=e[c])&&(a=(r<3?o(a):r>3?o(t,n,a):o(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},D=this&&this.__metadata||function(e,t){if("object"===("undefined"===typeof Reflect?"undefined":d()(Reflect))&&"function"===typeof Reflect.metadata)return Reflect.metadata(e,t)},L=function(e){function t(){var e;return r()(this,t),e=l()(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments)),e.selected="Info",e.logs=[],e}return u()(t,e),c()(t,[{key:"clearLogs",value:function(){this.logs=[]}},{key:"logEmpty",value:function(){return 0===this.logs.length}},{key:"appendLog",value:function(e){var t=new Date(e.timestamp);this.logs.unshift({level:e.level,msg:e.msg,time:t.toLocaleString()})}},{key:"mounted",value:function(){var e=this,t=A.io.socket("/log");t.on("connect",function(){e.clearLogs(),t.on("log",function(t){t.forEach(e.appendLog)})})}},{key:"levelToVal",value:function(e){switch(e.toLowerCase().substring(0,4)){case"debu":return 4;case"info":return 2;case"warn":return 1;case"erro":return 0;default:return 2}}},{key:"clearIcon",get:function(){return $.a}},{key:"filteredLogs",get:function(){var e=this;return this.logs.filter(function(t){return e.levelToVal(t.level)<=e.levelToVal(e.selected)})}}]),t}(v["Vue"]);z([Object(v["Provide"])(),D("design:type",String)],L.prototype,"selected",void 0),z([Object(v["Provide"])(),D("design:type",Object)],L.prototype,"logs",void 0),L=z([v["Component"]],L);var I=L,N=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("div",{staticClass:"select"},[n("select",{directives:[{name:"model",rawName:"v-model",value:e.selected,expression:"selected"}],on:{change:function(t){var n=Array.prototype.filter.call(t.target.options,function(e){return e.selected}).map(function(e){var t="_value"in e?e._value:e.value;return t});e.selected=t.target.multiple?n:n[0]}}},[n("option",[e._v("Debug")]),n("option",[e._v("Info")]),n("option",[e._v("Warning")]),n("option",[e._v("Error")])])]),n("div",{directives:[{name:"tooltip",rawName:"v-tooltip.bottom",value:{content:"Clear Log",delay:{show:1500}},expression:"{ content: 'Clear Log', delay: { show: 1500 } }",modifiers:{bottom:!0}}],staticClass:"clear",on:{click:function(t){e.clearLogs()}}},[n("font-awesome-icon",{attrs:{icon:e.clearIcon,size:"xs"}})],1),e.logEmpty()?n("div",{staticClass:"empty"},[n("h2",[e._v("empty log")])]):n("div",{staticClass:"logs"},[n("table",e._l(e.filteredLogs,function(t,i){return n("tr",{key:i,class:t.level},[n("td",{staticClass:"time"},[e._v(e._s(t.time))]),n("td",{staticClass:"lvl"},[e._v(e._s(t.level))]),n("td",{staticClass:"msg"},[e._v(e._s(t.msg))])])}))])])},H=[];function B(e){n("z0DE")}var G=!1,M=B,W="data-v-3875f094",q=null,J=Object(_["a"])(I,N,H,G,M,W,q),K=J.exports,U=this&&this.__decorate||function(e,t,n,i){var o,r=arguments.length,a=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"===("undefined"===typeof Reflect?"undefined":d()(Reflect))&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,n,i);else for(var c=e.length-1;c>=0;c--)(o=e[c])&&(a=(r<3?o(a):r>3?o(t,n,a):o(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},Y=function(e){function t(){return r()(this,t),l()(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u()(t,e),t}(v["Vue"]);Y=U([v["Component"]],Y);var Z=Y,X=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},F=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",[n("h2",{staticStyle:{"text-align":"center"}},[e._v("project")])])}];function Q(e){n("D0Eq")}var ee=!1,te=Q,ne="data-v-0d2fc9b8",ie=null,oe=Object(_["a"])(Z,X,F,ee,te,ne,ie),re=oe.exports,ae=this&&this.__decorate||function(e,t,n,i){var o,r=arguments.length,a=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"===("undefined"===typeof Reflect?"undefined":d()(Reflect))&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,n,i);else for(var c=e.length-1;c>=0;c--)(o=e[c])&&(a=(r<3?o(a):r>3?o(t,n,a):o(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},ce=this&&this.__metadata||function(e,t){if("object"===("undefined"===typeof Reflect?"undefined":d()(Reflect))&&"function"===typeof Reflect.metadata)return Reflect.metadata(e,t)},se=function(e){function t(){var e;return r()(this,t),e=l()(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments)),e.isActive=!1,e}return u()(t,e),c()(t,[{key:"activate",value:function(){this.isActive=!0}},{key:"deactivate",value:function(){this.isActive=!1}},{key:"created",value:function(){var e=this.$parent;e.register(this)}},{key:"beforeDestroy",value:function(){var e=this.$parent;e.unregister(this)}}]),t}(v["Vue"]);ae([Object(v["Prop"])(),ce("design:type",String)],se.prototype,"label",void 0),ae([Object(v["Provide"])(),ce("design:type",Boolean)],se.prototype,"isActive",void 0),se=ae([v["Component"]],se);var le=se,fe=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{directives:[{name:"show",rawName:"v-show",value:e.isActive,expression:"isActive"}],staticClass:"tab-item"},[e._t("default")],2)},ue=[];function pe(e){n("kog4")}var de=!1,ve=pe,he="data-v-bd34fac8",ge=null,ye=Object(_["a"])(le,fe,ue,de,ve,he,ge),me=ye.exports,be=this&&this.__decorate||function(e,t,n,i){var o,r=arguments.length,a=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"===("undefined"===typeof Reflect?"undefined":d()(Reflect))&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,n,i);else for(var c=e.length-1;c>=0;c--)(o=e[c])&&(a=(r<3?o(a):r>3?o(t,n,a):o(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},_e=this&&this.__metadata||function(e,t){if("object"===("undefined"===typeof Reflect?"undefined":d()(Reflect))&&"function"===typeof Reflect.metadata)return Reflect.metadata(e,t)},Oe=function(e){function t(){var e;return r()(this,t),e=l()(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments)),e.tabs=[],e}return u()(t,e),c()(t,[{key:"register",value:function(e){this.tabs.push(e)}},{key:"unregister",value:function(e){this.tabs=this.tabs.filter(function(t){return t!==e})}},{key:"tabClick",value:function(e){this.$store.dispatch("setPanelTab",e)}},{key:"mounted",value:function(){var e=this;this.tabs[0].activate(),this.$store.watch(function(t){return e.$store.state.panelTab},function(t){e.tabs.forEach(function(e,n){t===n?e.activate():e.deactivate()})})}},{key:"activeTab",get:function(){return this.$store.state.panelTab}}]),t}(v["Vue"]);be([Object(v["Provide"])(),_e("design:type",Array)],Oe.prototype,"tabs",void 0),Oe=be([v["Component"]],Oe);var je=Oe,Pe=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"b-tabs"},[n("nav",{staticClass:"tabs is-small"},[n("ul",e._l(e.tabs,function(t,i){return n("li",{key:i,class:{"is-active":e.activeTab===i}},[n("a",{on:{click:function(t){e.tabClick(i)}}},[n("span",[e._v(e._s(t.label))])])])}))]),n("section",{staticClass:"tab-content"},[e._t("default")],2)])},Re=[];function Ee(e){n("xvD9")}var ke=!1,we=Ee,Ce="data-v-0eb08d16",Ve=null,Te=Object(_["a"])(je,Pe,Re,ke,we,Ce,Ve),Se=Te.exports,Ae=n("R2KS"),xe=this&&this.__decorate||function(e,t,n,i){var o,r=arguments.length,a=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"===("undefined"===typeof Reflect?"undefined":d()(Reflect))&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,n,i);else for(var c=e.length-1;c>=0;c--)(o=e[c])&&(a=(r<3?o(a):r>3?o(t,n,a):o(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},$e=this&&this.__metadata||function(e,t){if("object"===("undefined"===typeof Reflect?"undefined":d()(Reflect))&&"function"===typeof Reflect.metadata)return Reflect.metadata(e,t)},ze=function(e){function t(){return r()(this,t),l()(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u()(t,e),c()(t,[{key:"fit",value:function(){var e=this.term.element.parentElement,t=window.getComputedStyle(e),n=parseInt(t.getPropertyValue("height"),10),i=Math.max(0,parseInt(t.getPropertyValue("width"),10)),o=window.getComputedStyle(this.term.element),r={bottom:parseInt(o.getPropertyValue("padding-bottom"),10),left:parseInt(o.getPropertyValue("padding-left"),10),right:parseInt(o.getPropertyValue("padding-right"),10),top:parseInt(o.getPropertyValue("padding-top"),10)},a=r.top+r.bottom,c=r.right+r.left,s=n-a,l=this.term.viewport.scrollBarWidth,f=i-c-l,u=this.term.renderer;if(u.dimensions.actualCellWidth&&u.dimensions.actualCellWidth){var p=Math.floor(f/u.dimensions.actualCellWidth),d=Math.floor(s/u.dimensions.actualCellHeight);this.term.rows===d&&this.term.cols===p||(u.clear(),this.term.resize(p,d))}}},{key:"resize",value:function(){var e=this.term.renderer;e||this.term.open(this.$refs.xterm),this.fit(),this.term.focus()}},{key:"mounted",value:function(){this.initTerminal(),this.term.on("resize",this.logResize)}},{key:"logResize",value:function(e){}},{key:"initTerminal",value:function(){this.term=new Ae["Terminal"]({cursorBlink:!0,scrollback:2e3})}}]),t}(v["Vue"]);xe([Object(v["Provide"])(),$e("design:type","function"===typeof(De="undefined"!==typeof Ae["Terminal"]&&Ae["Terminal"])&&De||Object)],ze.prototype,"term",void 0),ze=xe([v["Component"]],ze);var De,Le=ze,Ie=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{ref:"xterm",staticClass:"term"},[n("resize-observer",{on:{notify:e.resize}})],1)},Ne=[];function He(e){n("oxek"),n("4c2u")}var Be=!1,Ge=He,Me="data-v-c1eb0900",We=null,qe=Object(_["a"])(Le,Ie,Ne,Be,Ge,Me,We),Je=qe.exports,Ke=n("KeE0"),Ue=n.n(Ke),Ye=this&&this.__decorate||function(e,t,n,i){var o,r=arguments.length,a=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"===("undefined"===typeof Reflect?"undefined":d()(Reflect))&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,n,i);else for(var c=e.length-1;c>=0;c--)(o=e[c])&&(a=(r<3?o(a):r>3?o(t,n,a):o(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},Ze=function(e){function t(){return r()(this,t),l()(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u()(t,e),c()(t,[{key:"closePanel",value:function(){this.$store.dispatch("setPanelHeight",0)}},{key:"closeIcon",get:function(){return Ue.a}}]),t}(v["Vue"]);Ze=Ye([Object(v["Component"])({components:{Log:K,Project:re,Tab:me,Tabs:Se,Term:Je}})],Ze);var Xe=Ze,Fe=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"panel"},[n("tabs",[n("tab",{attrs:{label:"PROJECT"}},[n("project")],1),n("tab",{attrs:{label:"TERMINAL"}},[n("term")],1),n("tab",{attrs:{label:"LOG"}},[n("log")],1)],1),n("div",{directives:[{name:"tooltip",rawName:"v-tooltip.bottom",value:{content:"Close Panel",delay:{show:1500}},expression:"{ content: 'Close Panel', delay: { show: 1500 } }",modifiers:{bottom:!0}}],staticClass:"close",on:{click:function(t){e.closePanel()}}},[n("font-awesome-icon",{attrs:{icon:e.closeIcon,size:"xs"}})],1)],1)},Qe=[];function et(e){n("4PG8")}var tt=!1,nt=et,it="data-v-152768c9",ot=null,rt=Object(_["a"])(Xe,Fe,Qe,tt,nt,it,ot),at=rt.exports,ct=n("+pZb"),st=n.n(ct),lt=n("WWqi"),ft=n.n(lt),ut=n("ilBI"),pt=n.n(ut),dt=this&&this.__decorate||function(e,t,n,i){var o,r=arguments.length,a=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"===("undefined"===typeof Reflect?"undefined":d()(Reflect))&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,n,i);else for(var c=e.length-1;c>=0;c--)(o=e[c])&&(a=(r<3?o(a):r>3?o(t,n,a):o(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},vt=function(e){function t(){return r()(this,t),l()(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u()(t,e),c()(t,[{key:"togglePanel",value:function(e){this.$store.dispatch("togglePanel",e)}},{key:"fileIcon",get:function(){return ft.a}},{key:"terminalIcon",get:function(){return pt.a}},{key:"logIcon",get:function(){return st.a}},{key:"projectActive",get:function(){return this.$store.getters.projectPanelActive}},{key:"terminalActive",get:function(){return this.$store.getters.terminalPanelActive}},{key:"logActive",get:function(){return this.$store.getters.logPanelActive}}]),t}(v["Vue"]);vt=dt([v["Component"]],vt);var ht=vt,gt=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"sidebar"},[n("div",{directives:[{name:"tooltip",rawName:"v-tooltip.right",value:{content:"Project",delay:{show:1500}},expression:"{ content: 'Project', delay: { show: 1500 } }",modifiers:{right:!0}}],staticClass:"item",class:{active:e.projectActive},on:{click:function(t){e.togglePanel(0)}}},[n("font-awesome-icon",{attrs:{icon:e.fileIcon}})],1),n("div",{directives:[{name:"tooltip",rawName:"v-tooltip.right",value:{content:"Terminal",delay:{show:1500}},expression:"{ content: 'Terminal', delay: { show: 1500 } }",modifiers:{right:!0}}],staticClass:"item",class:{active:e.terminalActive},on:{click:function(t){e.togglePanel(1)}}},[n("font-awesome-icon",{attrs:{icon:e.terminalIcon}})],1),n("div",{directives:[{name:"tooltip",rawName:"v-tooltip.right",value:{content:"Log",delay:{show:1500}},expression:"{ content: 'Log', delay: { show: 1500 } }",modifiers:{right:!0}}],staticClass:"item",class:{active:e.logActive},on:{click:function(t){e.togglePanel(2)}}},[n("font-awesome-icon",{attrs:{icon:e.logIcon}})],1)])},yt=[];function mt(e){n("6jys")}var bt=!1,_t=mt,Ot="data-v-255f6562",jt=null,Pt=Object(_["a"])(ht,gt,yt,bt,_t,Ot,jt),Rt=Pt.exports,Et=n("SOu3"),kt=n.n(Et),wt=this&&this.__decorate||function(e,t,n,i){var o,r=arguments.length,a=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"===("undefined"===typeof Reflect?"undefined":d()(Reflect))&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,n,i);else for(var c=e.length-1;c>=0;c--)(o=e[c])&&(a=(r<3?o(a):r>3?o(t,n,a):o(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},Ct=this&&this.__metadata||function(e,t){if("object"===("undefined"===typeof Reflect?"undefined":d()(Reflect))&&"function"===typeof Reflect.metadata)return Reflect.metadata(e,t)},Vt=function(e){function t(){return r()(this,t),l()(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u()(t,e),c()(t,[{key:"onDragEnd",value:function(){this.$emit("onDragEnd",this.split.getSizes())}},{key:"collapse",value:function(e){this.split.collapse(e)}},{key:"setSizes",value:function(e){this.split.setSizes(e)}},{key:"mounted",value:function(){var e={cursor:"horizontal"===this.direction?"col-resize":"row-resize",direction:this.direction,gutterSize:this.gutterSize,minSize:this.minSize,onDragEnd:this.onDragEnd,sizes:this.sizes,snapOffset:this.snapOffset};this.split=kt()(this.elements,e)}}]),t}(v["Vue"]);wt([Object(v["Prop"])(),Ct("design:type",Array)],Vt.prototype,"elements",void 0),wt([Object(v["Prop"])({default:"horizontal"}),Ct("design:type",String)],Vt.prototype,"direction",void 0),wt([Object(v["Prop"])(),Ct("design:type",Array)],Vt.prototype,"sizes",void 0),wt([Object(v["Prop"])(),Ct("design:type",Array)],Vt.prototype,"minSize",void 0),wt([Object(v["Prop"])(),Ct("design:type",Number)],Vt.prototype,"gutterSize",void 0),wt([Object(v["Prop"])(),Ct("design:type",Number)],Vt.prototype,"snapOffset",void 0),Vt=wt([v["Component"]],Vt);var Tt=Vt,St=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"split-container"},[e._t("default")],2)},At=[];function xt(e){n("qLT4")}var $t=!1,zt=xt,Dt=null,Lt=null,It=Object(_["a"])(Tt,St,At,$t,zt,Dt,Lt),Nt=It.exports,Ht=this&&this.__decorate||function(e,t,n,i){var o,r=arguments.length,a=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"===("undefined"===typeof Reflect?"undefined":d()(Reflect))&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,n,i);else for(var c=e.length-1;c>=0;c--)(o=e[c])&&(a=(r<3?o(a):r>3?o(t,n,a):o(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},Bt=this&&this.__metadata||function(e,t){if("object"===("undefined"===typeof Reflect?"undefined":d()(Reflect))&&"function"===typeof Reflect.metadata)return Reflect.metadata(e,t)},Gt=function(e){function t(){return r()(this,t),l()(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u()(t,e),c()(t,[{key:"mounted",value:function(){var e=this,t=A.io.socket("/server");t.on("connect",function(){t.emit("version"),t.on("version",function(t){e.$store.dispatch("setServerVersion",t)})})}},{key:"serverVersion",get:function(){return this.$store.state.serverVersion}}]),t}(v["Vue"]);Ht([Object(v["Prop"])({default:"0.1.0"}),Bt("design:type",String)],Gt.prototype,"uiVersion",void 0),Gt=Ht([v["Component"]],Gt);var Mt=Gt,Wt=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("footer",{staticClass:"footer"},[n("div",{staticClass:"version disable-select"},[e._v("\n    ui "+e._s(e.uiVersion)+", server "+e._s(e.serverVersion)+"\n  ")])])},qt=[];function Jt(e){n("uqH2")}var Kt=!1,Ut=Jt,Yt="data-v-56ba1904",Zt=null,Xt=Object(_["a"])(Mt,Wt,qt,Kt,Ut,Yt,Zt),Ft=Xt.exports,Qt=this&&this.__decorate||function(e,t,n,i){var o,r=arguments.length,a=r<3?t:null===i?i=Object.getOwnPropertyDescriptor(t,n):i;if("object"===("undefined"===typeof Reflect?"undefined":d()(Reflect))&&"function"===typeof Reflect.decorate)a=Reflect.decorate(e,t,n,i);else for(var c=e.length-1;c>=0;c--)(o=e[c])&&(a=(r<3?o(a):r>3?o(t,n,a):o(t,n))||a);return r>3&&a&&Object.defineProperty(t,n,a),a},en=function(e){function t(){return r()(this,t),l()(this,(t.__proto__||Object.getPrototypeOf(t)).apply(this,arguments))}return u()(t,e),c()(t,[{key:"splitChanged",value:function(e){this.$store.dispatch("setPanelHeight",e[1])}},{key:"mounted",value:function(){var e=this;this.$store.watch(function(t){return e.$store.getters.panelVisible},function(t){var n=e.$refs.split;if(t){var i=e.$store.state.panelHeight;n.setSizes([100-i,i])}else n.collapse(1)})}}]),t}(v["Vue"]);en=Qt([Object(v["Component"])({components:{Editor:w,Panel:at,SideBar:Rt,SplitView:Nt,StatusBar:Ft}})],en);var tn=en,nn=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"}},[n("side-bar"),n("main",[n("split-view",{ref:"split",attrs:{elements:["#editor","#panel"],direction:"vertical",sizes:[100,0],"min-size":[80,0],"gutter-size":1,"snap-offset":60},on:{onDragEnd:e.splitChanged}},[n("editor",{attrs:{id:"editor"}}),n("panel",{attrs:{id:"panel"}})],1)],1),n("status-bar")],1)},on=[];function rn(e){n("G3BA")}var an,cn=!1,sn=rn,ln=null,fn=null,un=Object(_["a"])(tn,nn,on,cn,sn,ln,fn),pn=un.exports,dn=n("fKPv"),vn=n.n(dn),hn=n("NYxO");i["default"].use(hn["a"]);var gn=30,yn=new hn["a"].Store({actions:{setPanelHeight:function(e,t){var n=e.commit;n("SET_PANEL_HEIGHT",t)},setPanelTab:function(e,t){var n=e.commit;n("SET_PANEL_TAB",t)},setServerVersion:function(e,t){var n=e.commit;n("SET_SERVER_VERSION",t)},togglePanel:function(e,t){var n=e.commit;n("TOGGLE_PANEL",t)}},getters:{logPanelActive:function(e){return e.panelVisible&&2===e.panelTab},panelVisible:function(e){return e.panelVisible},projectPanelActive:function(e){return e.panelVisible&&0===e.panelTab},terminalPanelActive:function(e){return e.panelVisible&&1===e.panelTab}},mutations:(an={},vn()(an,"SET_PANEL_HEIGHT",function(e,t){e.panelHeightSaved=e.panelHeight,e.panelHeight=t,e.panelVisible=0!==Math.round(e.panelHeight)}),vn()(an,"SET_PANEL_TAB",function(e,t){e.panelTab=t}),vn()(an,"SET_SERVER_VERSION",function(e,t){e.serverVersion=t}),vn()(an,"TOGGLE_PANEL",function(e,t){e.panelTab!==t?(e.panelTab=t,e.panelVisible=!0):e.panelVisible=!e.panelVisible,e.panelVisible&&0===Math.round(e.panelHeight)&&(e.panelHeight=e.panelHeightSaved)}),an),state:{panelHeight:gn,panelHeightSaved:gn,panelTab:0,panelVisible:!1,serverVersion:"dev"},strict:!1}),mn=n("VN6J"),bn=n("U0v6"),_n=n.n(bn),On=n("A4r5");i["default"].config.productionTip=!1,i["default"].directive("tooltip",mn["a"]),i["default"].component("font-awesome-icon",_n.a),i["default"].component("resize-observer",On["a"]),new i["default"]({render:function(e){return e(pn)},store:yn}).$mount("#app")},xvD9:function(e,t){},z0DE:function(e,t){}},[0]);
//# sourceMappingURL=app.909417b0.js.map