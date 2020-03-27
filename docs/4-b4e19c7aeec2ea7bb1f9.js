(window.webpackJsonp=window.webpackJsonp||[]).push([[4],{97:function(t,e,i){"use strict";i.r(e),i.d(e,"default",(function(){return I}));i(21),i(34);var s=i(20),a=i.n(s),r=i(0),n=i(4),o="keys"in n.a?n.a.keys:function(t){const e=[];for(const i in t)n.e.call(t,i)&&e.push(i);return e},c="entries"in n.a?n.a.entries:function(t){const e=o(t);let i=e.length;const s=Array(i);for(;i--;){const a=e[i];s[i]=[a,t[a]]}return s};const l={clear:"CLEAR",file:"FILE",error:"ERROR"},g={};c(l).map(([t,e])=>g[t]="ack-".concat(e));var d=i(35),h=i(10);const u="ondrop"in HTMLElement.prototype,M=window.__fshare.cfg.supports;class I extends r.c{constructor(...t){super(...t),a()(this,"state",{file:null,isWorking:!1,method:M.length>1?null:M[0].algo,hasError:!1,errType:"",hasResult:!1,key:""}),a()(this,"errState",t=>this.setState({hasError:!0,errType:t,isWorking:!1})),a()(this,"ERROR_MESSAGES",{invalidMethod:"Please Select a Valid Method",noKey:"Please Enter your Key",errorDecryption:"An error occured while decrypting, please check the key and try again"}),a()(this,"onDrop",t=>{let e;if(t.stopPropagation(),t.preventDefault(),t.dataTransfer.items)for(const i of t.dataTransfer.items)"file"===i.kind&&(e=i.getAsFile());else for(const i of t.dataTransfer.files)e=i;return this.setState({file:e})}),a()(this,"onDragOver",t=>t.preventDefault()),a()(this,"_fromFilePicker",()=>{const t=Object(d.a)(document.createElement("input"),{type:"file"});t.addEventListener("change",()=>this.setState({file:t.files[0]})),t.click()}),a()(this,"_noFile",Object(r.g)(r.d,null,Object(r.g)("div",{dataText:""},"Click to add file or drag and drop"),u&&Object(r.g)("div",{class:h.c,...this.getEventListeners()},Object(r.g)("div",{style:{backgroundImage:"url('".concat("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIyNCIgaGVpZ2h0PSIyNCIgdmlld0JveD0iMCAwIDI0IDI0Ij48cGF0aCBkPSJNMTYuNSA2djExLjVjMCAyLjIxLTEuNzkgNC00IDRzLTQtMS43OS00LTRWNWMwLTEuMzggMS4xMi0yLjUgMi41LTIuNXMyLjUgMS4xMiAyLjUgMi41djEwLjVjMCAuNTUtLjQ1IDEtMSAxcy0xLS40NS0xLTFWNkgxMHY5LjVjMCAxLjM4IDEuMTIgMi41IDIuNSAyLjVzMi41LTEuMTIgMi41LTIuNVY1YzAtMi4yMS0xLjc5LTQtNC00UzcgMi43OSA3IDV2MTIuNWMwIDMuMDQgMi40NiA1LjUgNS41IDUuNXM1LjUtMi40NiA1LjUtNS41VjZoLTEuNXoiPjwvcGF0aD48cGF0aCBkPSJNMCAwaDI0djI0SDB6IiBmaWxsPSJub25lIj48L3BhdGg+PC9zdmc+","')"),height:"24px",width:"24px"}}),"Drag & drop or ",Object(r.g)("span",{class:"hoverable "+h.b,onClick:this._fromFilePicker},"Select a file")))),a()(this,"_actionText",""),a()(this,"_actionTextOnClick",()=>new Promise(t=>setTimeout(t,1e4))),a()(this,"_handleClick",()=>{this.setState({isWorking:!0}),Promise.resolve(this._actionTextOnClick()).then(t=>this.setState({isWorking:!1}))}),a()(this,"_keyInput",t=>this.setState({key:t.target.value})),a()(this,"_gotFile",()=>Object(r.g)("div",{},Object(r.g)("div",{class:h.l,style:{backgroundImage:"url(".concat("data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0MCIgaGVpZ2h0PSI0MCIgdmlld0JveD0iMCAwIDI0IDI0Ij48ZGVmcy8+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgyNHYyNEgwVjB6Ii8+PHBhdGggZD0iTTE0IDdIOHYxNGgxMXYtOWgtNXoiIG9wYWNpdHk9Ii4zIi8+PHBhdGggZD0iTTE2IDFINEwyIDN2MTRoMlYzaDEyVjF6bS0xIDRIOEw2IDd2MTRsMiAyaDExbDItMlYxMWwtNi02em00IDE2SDhWN2g2djVoNXY5eiIvPjwvc3ZnPg==",")")}}),Object(r.g)(p,{data:this.state.file}),this.state.isWorkingisWorking?null:this._getMethod(),Object(r.g)("button",{class:[h.k,this.state.isWorking&&!this.state.hasError?h.f:""],onClick:this.state.isWorking?null:this._handleClick},(!this.state.isWorking||this.state.hasError)&&this._actionText),this.state.hasError&&Object(r.g)("div",{err:!0},this.ERROR_MESSAGES[this.state.errType])))}static _getBlob(t,e){const i=new Blob([t],{type:e});return URL.createObjectURL(i)}getFile(){return new Promise(t=>{const e=new FileReader;e.addEventListener("load",()=>t(e.result)),e.readAsArrayBuffer(this.state.file)})}getEventListeners(){return{onDragOver:this.onDragOver,onDrop:this.onDrop}}_getMethod(){return Object(r.g)("div",null,Object(r.g)("input",{value:this.state.key,class:h.j,placeHolder:"Enter key",onInput:this._keyInput}),M.length>1&&Object(r.g)("select",{onInput:t=>this.setState({method:t.target.selectedOptions[0].value})},Object(r.g)("option",{value:null},"Select an algorithm"),M.map(t=>Object(r.g)("option",{value:t.algo},t.displayName))))}render({},{file:t,hasResult:e}){return e?this._gotResult():t?this._gotFile():this._noFile}}function p({data:t}){return Object(r.g)("div",{class:h.e},["name","lastModifiedDate","size","type"].map(e=>Object(r.g)("div",{class:h.i},Object(r.g)("div",{class:"prop k"},e),Object(r.g)("div",{class:"prop v"},function(t,e){return e?e instanceof Date?e.toDateString():"size"===t?(t=>{const e=0|t/1048576;if(e)return"".concat(e," MB");const i=0|t/1024;return i?"".concat(i," KB"):"".concat(t," b")})(e):e:"N/A"}(e,t[e])))))}I.WORKER_COMMANDS=l,I.WORKER_RESPONSES=g}}]);