(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-dffc"],{"+8RG":function(t,a,n){"use strict";n.r(a);var i=n("7BsA"),e=n.n(i),s=n("GmhH"),r={components:{CountTo:e.a},data:function(){return{count:{newIp:0,newVisits:0,recentIp:0,recentVisits:0}}},mounted:function(){var t=this;Object(s.b)().then(function(a){t.count.newIp=a.newIp,t.count.newVisits=a.newVisits,t.count.recentIp=a.recentIp,t.count.recentVisits=a.recentVisits})}},l=(n("40VJ"),n("KHd+")),o=Object(l.a)(r,function(){var t=this,a=t.$createElement,n=t._self._c||a;return n("el-row",{staticClass:"panel-group",attrs:{gutter:40}},[n("el-col",{staticClass:"card-panel-col",attrs:{xs:12,sm:12,lg:6}},[n("div",{staticClass:"card-panel"},[n("div",{staticClass:"card-panel-icon-wrapper icon-people"},[n("svg-icon",{attrs:{"icon-class":"visits","class-name":"card-panel-icon"}})],1),t._v(" "),n("div",{staticClass:"card-panel-description"},[n("div",{staticClass:"card-panel-text"},[t._v("Daily Pv")]),t._v(" "),n("count-to",{staticClass:"card-panel-num",attrs:{"start-val":0,"end-val":t.count.newVisits,duration:2600}})],1)])]),t._v(" "),n("el-col",{staticClass:"card-panel-col",attrs:{xs:12,sm:12,lg:6}},[n("div",{staticClass:"card-panel"},[n("div",{staticClass:"card-panel-icon-wrapper icon-message"},[n("svg-icon",{attrs:{"icon-class":"ipvisits","class-name":"card-panel-icon"}})],1),t._v(" "),n("div",{staticClass:"card-panel-description"},[n("div",{staticClass:"card-panel-text"},[t._v("Daily Ip")]),t._v(" "),n("count-to",{staticClass:"card-panel-num",attrs:{"start-val":0,"end-val":t.count.newIp,duration:3e3}})],1)])]),t._v(" "),n("el-col",{staticClass:"card-panel-col",attrs:{xs:12,sm:12,lg:6}},[n("div",{staticClass:"card-panel"},[n("div",{staticClass:"card-panel-icon-wrapper icon-money"},[n("svg-icon",{attrs:{"icon-class":"visits","class-name":"card-panel-icon"}})],1),t._v(" "),n("div",{staticClass:"card-panel-description"},[n("div",{staticClass:"card-panel-text"},[t._v("Weekly Pv")]),t._v(" "),n("count-to",{staticClass:"card-panel-num",attrs:{"start-val":0,"end-val":t.count.recentVisits,duration:3200}})],1)])]),t._v(" "),n("el-col",{staticClass:"card-panel-col",attrs:{xs:12,sm:12,lg:6}},[n("div",{staticClass:"card-panel"},[n("div",{staticClass:"card-panel-icon-wrapper icon-shopping"},[n("svg-icon",{attrs:{"icon-class":"ipvisits","class-name":"card-panel-icon"}})],1),t._v(" "),n("div",{staticClass:"card-panel-description"},[n("div",{staticClass:"card-panel-text"},[t._v("Weekly Ip")]),t._v(" "),n("count-to",{staticClass:"card-panel-num",attrs:{"start-val":0,"end-val":t.count.recentIp,duration:3600}})],1)])])],1)},[],!1,null,"63f4333a",null);o.options.__file="PanelGroup.vue";a.default=o.exports},"40VJ":function(t,a,n){"use strict";var i=n("yPla");n.n(i).a},"7BsA":function(t,a,n){t.exports=function(t){function a(i){if(n[i])return n[i].exports;var e=n[i]={i:i,l:!1,exports:{}};return t[i].call(e.exports,e,e.exports,a),e.l=!0,e.exports}var n={};return a.m=t,a.c=n,a.i=function(t){return t},a.d=function(t,n,i){a.o(t,n)||Object.defineProperty(t,n,{configurable:!1,enumerable:!0,get:i})},a.n=function(t){var n=t&&t.__esModule?function(){return t.default}:function(){return t};return a.d(n,"a",n),n},a.o=function(t,a){return Object.prototype.hasOwnProperty.call(t,a)},a.p="/dist/",a(a.s=2)}([function(t,a,n){var i=n(4)(n(1),n(5),null,null);t.exports=i.exports},function(t,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=n(3);a.default={props:{startVal:{type:Number,required:!1,default:0},endVal:{type:Number,required:!1,default:2017},duration:{type:Number,required:!1,default:3e3},autoplay:{type:Boolean,required:!1,default:!0},decimals:{type:Number,required:!1,default:0,validator:function(t){return t>=0}},decimal:{type:String,required:!1,default:"."},separator:{type:String,required:!1,default:","},prefix:{type:String,required:!1,default:""},suffix:{type:String,required:!1,default:""},useEasing:{type:Boolean,required:!1,default:!0},easingFn:{type:Function,default:function(t,a,n,i){return n*(1-Math.pow(2,-10*t/i))*1024/1023+a}}},data:function(){return{localStartVal:this.startVal,displayValue:this.formatNumber(this.startVal),printVal:null,paused:!1,localDuration:this.duration,startTime:null,timestamp:null,remaining:null,rAF:null}},computed:{countDown:function(){return this.startVal>this.endVal}},watch:{startVal:function(){this.autoplay&&this.start()},endVal:function(){this.autoplay&&this.start()}},mounted:function(){this.autoplay&&this.start(),this.$emit("mountedCallback")},methods:{start:function(){this.localStartVal=this.startVal,this.startTime=null,this.localDuration=this.duration,this.paused=!1,this.rAF=(0,i.requestAnimationFrame)(this.count)},pauseResume:function(){this.paused?(this.resume(),this.paused=!1):(this.pause(),this.paused=!0)},pause:function(){(0,i.cancelAnimationFrame)(this.rAF)},resume:function(){this.startTime=null,this.localDuration=+this.remaining,this.localStartVal=+this.printVal,(0,i.requestAnimationFrame)(this.count)},reset:function(){this.startTime=null,(0,i.cancelAnimationFrame)(this.rAF),this.displayValue=this.formatNumber(this.startVal)},count:function(t){this.startTime||(this.startTime=t),this.timestamp=t;var a=t-this.startTime;this.remaining=this.localDuration-a,this.useEasing?this.countDown?this.printVal=this.localStartVal-this.easingFn(a,0,this.localStartVal-this.endVal,this.localDuration):this.printVal=this.easingFn(a,this.localStartVal,this.endVal-this.localStartVal,this.localDuration):this.countDown?this.printVal=this.localStartVal-(this.localStartVal-this.endVal)*(a/this.localDuration):this.printVal=this.localStartVal+(this.localStartVal-this.startVal)*(a/this.localDuration),this.countDown?this.printVal=this.printVal<this.endVal?this.endVal:this.printVal:this.printVal=this.printVal>this.endVal?this.endVal:this.printVal,this.displayValue=this.formatNumber(this.printVal),a<this.localDuration?this.rAF=(0,i.requestAnimationFrame)(this.count):this.$emit("callback")},isNumber:function(t){return!isNaN(parseFloat(t))},formatNumber:function(t){t=t.toFixed(this.decimals);var a=(t+="").split("."),n=a[0],i=a.length>1?this.decimal+a[1]:"",e=/(\d+)(\d{3})/;if(this.separator&&!this.isNumber(this.separator))for(;e.test(n);)n=n.replace(e,"$1"+this.separator+"$2");return this.prefix+n+i+this.suffix}},destroyed:function(){(0,i.cancelAnimationFrame)(this.rAF)}}},function(t,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=n(0),e=function(t){return t&&t.__esModule?t:{default:t}}(i);a.default=e.default,"undefined"!=typeof window&&window.Vue&&window.Vue.component("count-to",e.default)},function(t,a,n){"use strict";Object.defineProperty(a,"__esModule",{value:!0});var i=0,e="webkit moz ms o".split(" "),s=void 0,r=void 0;if("undefined"==typeof window)a.requestAnimationFrame=s=function(){},a.cancelAnimationFrame=r=function(){};else{a.requestAnimationFrame=s=window.requestAnimationFrame,a.cancelAnimationFrame=r=window.cancelAnimationFrame;for(var l=void 0,o=0;o<e.length&&(!s||!r);o++)l=e[o],a.requestAnimationFrame=s=s||window[l+"RequestAnimationFrame"],a.cancelAnimationFrame=r=r||window[l+"CancelAnimationFrame"]||window[l+"CancelRequestAnimationFrame"];s&&r||(a.requestAnimationFrame=s=function(t){var a=(new Date).getTime(),n=Math.max(0,16-(a-i)),e=window.setTimeout(function(){t(a+n)},n);return i=a+n,e},a.cancelAnimationFrame=r=function(t){window.clearTimeout(t)})}a.requestAnimationFrame=s,a.cancelAnimationFrame=r},function(t,a){t.exports=function(t,a,n,i){var e,s=t=t||{},r=typeof t.default;"object"!==r&&"function"!==r||(e=t,s=t.default);var l="function"==typeof s?s.options:s;if(a&&(l.render=a.render,l.staticRenderFns=a.staticRenderFns),n&&(l._scopeId=n),i){var o=Object.create(l.computed||null);Object.keys(i).forEach(function(t){var a=i[t];o[t]=function(){return a}}),l.computed=o}return{esModule:e,exports:s,options:l}}},function(t,a){t.exports={render:function(){var t=this,a=t.$createElement;return(t._self._c||a)("span",[t._v("\n  "+t._s(t.displayValue)+"\n")])},staticRenderFns:[]}}])},GmhH:function(t,a,n){"use strict";n.d(a,"a",function(){return e}),n.d(a,"b",function(){return s}),n.d(a,"c",function(){return r});var i=n("t3Un");function e(){return Object(i.a)({url:"api/visits",method:"post"})}function s(){return Object(i.a)({url:"api/visits",method:"get"})}function r(){return Object(i.a)({url:"api/visits/chartData",method:"get"})}},yPla:function(t,a,n){}}]);