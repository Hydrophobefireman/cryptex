(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{111:function(t,e,n){"use strict";n.r(e);n(28);var s=n(5);let o=Object(s.h)();Object(s.d)("Map",o);const r=Object(s.d)("Set",o),i=(Object(s.d)("WeakMap",o)&&Object(s.d)("WeakSet",o),"__@@set"),c=t=>t!=t,u=(t,e)=>t===e||c(t)&&c(e),a=t=>0===t?0:t;let l,h,f;if("undefined"!=typeof Symbol){function p(t,e){const n=t[i];let s=0;const o=n.length;return{[Symbol.iterator]:function(){return this},next:function(){if(s<o){const t=n[s++];return{value:e?[t,t]:t,done:!1}}return{value:void 0,done:!0}}}}l=function(){return p(this,!0)},h=function(){return p(this,!1)},f=function(){return p(this,!1)}}else l=f=h=function(){console.warn("no symbol support")};var b={keys:f,values:h,entries:l},d=n(44);function y(t,e){if(n=t,!(null!=(s=e)&&"undefined"!=typeof Symbol&&s[Symbol.hasInstance]?s[Symbol.hasInstance](n):n instanceof s))throw new TypeError("Cannot call a class as a function");var n,s}const w=function t(e,n){if(y(this,t),!n&&r)return new Set(e);this[i]=[],function(t,e){if(null==e)return;if(!Object(s.g)(e))throw new Error("value:"+String(e)+" is not iterable");const n=e.length;for(let s=0;s<n;s++){const n=e[s];t.add(n)}}(this,e)};var g;(g=w).prototype.add=function(t){return this.has(t)||this[i].push(a(t)),this},g.prototype.has=function(t){const e=this[i],n=e.length;for(let s=0;s<n;s++){const n=e[s];if(u(n,t))return!0}return!1},g.prototype.delete=function(t){let e=!1;return this[i]=this[i].filter(n=>{const s=!u(n,t);return s||(e=!0),s}),e},g.prototype.forEach=function(t,e){const n=this[i],s=n.length;for(let o=0;o<s;o++){const s=n[o],r=this;e?t.call(e,s,s,r):t(s,s,r)}},g.prototype.clear=function(){this[i].length=0},Object.defineProperty(g.prototype,"size",{enumerable:!1,configurable:!0,get:function(){return this[i].length}}),"undefined"!=typeof Symbol&&(g.prototype[Symbol.iterator]=b.values,g.prototype[Symbol.toStringTag]="Set"),Object(d.a)(g.prototype,b),w[Symbol.species]=w;var S=w;n.d(e,"default",(function(){return m}));class m{_onMessage(t){const{data:e}=t;console.log(e),this._emitSubscription(e)}_emitSubscription(t){this._subscriptions.forEach(e=>e(t))}subscribe(t){if("function"!=typeof t)throw new Error("not a function");this._subscriptions.add(t)}subscribeType(t,e){const n=n=>n.type===t&&e(n);return this.subscribe(n),n}waitFor(t){return new Promise(e=>{let n;n=this.subscribeType(t,t=>{this.unsubscribe(n),e(t)})})}unsubscribe(t){this._subscriptions.delete(t)}sendType(t,e){return t={...t,type:e},console.log("sending=>",t),this.send(t)}transfer(t,e){this._worker.postMessage(t,e)}send(t){return this._worker.postMessage(t)}constructor(t){this._subscriptions=new S,this._worker=t||self,this._worker.addEventListener("message",this._onMessage.bind(this))}}}}]);