(window.webpackJsonp=window.webpackJsonp||[]).push([[8],{212:function(t,e,i){"use strict";i.r(e);i(223);var n=i(30),s=i.n(n),l=i(21),r=i(225),a=i(240),o=i.n(a),c=i(1),u=i(226),g=i.n(u);let h=l.d.promise();const d=async t=>await t,p=new o.a;let f=l.e.promise();const v=async t=>t instanceof Promise||t.prototype?new(await t)(p):t;e.default=Object(r.a)(l.b,(function(t){return class extends t{constructor(){super(...arguments),s()(this,"_actionText","Decrypt"),s()(this,"_actionTextOnClick",async()=>{f=await v(f);const{method:e,key:i}=this.state;if(!e)return this.errState("invalidMethod");if(!i)return this.errState("noKey");const n=await this.getFile();f.subscribeType(t.WORKER_RESPONSES.error,()=>this.errState("errorDecryption")),f.transfer({type:t.WORKER_COMMANDS.file,file:n,method:e,key:i},[n]);const s=await f.waitFor(t.WORKER_RESPONSES.file),l=await this._getFileType();this.setState({fileType:l,hasResult:t._getBlob(s.file,l||"application/octet-stream")})}),s()(this,"__inlineTypes",["image","text","video","audio"])}async _getFileType(){const t=this.state.file.name,e=t?t.split("."):["download"],i=e[e.length-2],n=await d(h);return console.log(n),n[i]||"application/octet-stream"}_gotResult(){const t=this.state.file.name,e=t?t.split("."):["download"],i=e.length-1,n=e.slice(0,i).join(".");return Object(c.g)("div",null,Object(c.g)("div",{style:{backgroundImage:"url(".concat(g.a,")")},class:"svg-box-div"}),Object(c.g)("div",null,"Your file is ready"),Object(c.g)("div",null,"File:",Object(c.g)("span",{class:"file-name-download"},n)),Object(c.g)("a",{href:this.state.hasResult,download:n},Object(c.g)("button",{class:"start-app-action "},"Download")),this.__inlineTypes.some(t=>this.state.fileType.includes(t))?Object(c.g)(c.d,null,Object(c.g)("div",null,"Preview:"),Object(c.g)("iframe",{src:this.state.hasResult,style:{display:"block",width:"50%",margin:"auto"}})):null)}}}))},223:function(t,e,i){"use strict";var n=i(124),s=i(12),l=i(224),r=i(125),a=i(91),o=i(92),c=i(94),u=i(22),g=Math.min,h=[].push,d=!u((function(){RegExp(4294967295,"y")}));i(93)("split",2,(function(t,e,i,u){var p;return p="c"=="abbc".split(/(b)*/)[1]||4!="test".split(/(?:)/,-1).length||2!="ab".split(/(?:ab)*/).length||4!=".".split(/(.?)(.?)/).length||".".split(/()()/).length>1||"".split(/.?/).length?function(t,e){var s=String(this);if(void 0===t&&0===e)return[];if(!n(t))return i.call(s,t,e);for(var l,r,a,o=[],u=(t.ignoreCase?"i":"")+(t.multiline?"m":"")+(t.unicode?"u":"")+(t.sticky?"y":""),g=0,d=void 0===e?4294967295:e>>>0,p=new RegExp(t.source,u+"g");(l=c.call(p,s))&&!((r=p.lastIndex)>g&&(o.push(s.slice(g,l.index)),l.length>1&&l.index<s.length&&h.apply(o,l.slice(1)),a=l[0].length,g=r,o.length>=d));)p.lastIndex===l.index&&p.lastIndex++;return g===s.length?!a&&p.test("")||o.push(""):o.push(s.slice(g)),o.length>d?o.slice(0,d):o}:"0".split(void 0,0).length?function(t,e){return void 0===t&&0===e?[]:i.call(this,t,e)}:i,[function(i,n){var s=t(this),l=null==i?void 0:i[e];return void 0!==l?l.call(i,s,n):p.call(String(s),i,n)},function(t,e){var n=u(p,t,this,e,p!==i);if(n.done)return n.value;var c=s(t),h=String(this),f=l(c,RegExp),v=c.unicode,w=(c.ignoreCase?"i":"")+(c.multiline?"m":"")+(c.unicode?"u":"")+(d?"y":"g"),y=new f(d?c:"^(?:"+c.source+")",w),b=void 0===e?4294967295:e>>>0;if(0===b)return[];if(0===h.length)return null===o(y,h)?[h]:[];for(var I=0,m=0,D=[];m<h.length;){y.lastIndex=d?m:0;var S,x=o(y,d?h:h.slice(m));if(null===x||(S=g(a(y.lastIndex+(d?0:m)),h.length))===I)m=r(h,m,v);else{if(D.push(h.slice(I,m)),D.length===b)return D;for(var j=1;j<=x.length-1;j++)if(D.push(x[j]),D.length===b)return D;m=I=S}}return D.push(h.slice(I)),D}]}))},224:function(t,e,i){var n=i(12),s=i(123),l=i(5)("species");t.exports=function(t,e){var i,r=n(t).constructor;return void 0===r||null==(i=n(r)[l])?e:s(i)}},225:function(t,e,i){"use strict";function n(t,e){let{promise:i}=t;return new Promise(t=>i().then(i=>t(e(i))))}i.d(e,"a",(function(){return n}))},226:function(t,e){t.exports="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0Ij48ZGVmcy8+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgyNHYyNEgwVjB6Ii8+PHBhdGggZD0iTTE5LjQgMTBhNy41IDcuNSAwIDAwLTE0LTJBNiA2IDAgMDA2IDIwaDEzYTUgNSAwIDAwLjQtMTB6bS0uNCA4SDZhNCA0IDAgMDEtLjQtOGgxbC41LTFhNS41IDUuNSAwIDAxMTAuMyAxLjRsLjMgMS41IDEuNS4xYTMgMyAwIDAxLS4yIDZ6bS01LjUtOGgtM3YzSDhsNCA0IDQtNGgtMi41eiIvPjwvc3ZnPg=="},240:function(t,e,i){t.exports=function(){return new Worker(i.p+"7bd78a63bc686d51285f.worker.js")}}}]);