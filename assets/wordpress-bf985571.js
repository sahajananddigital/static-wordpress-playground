(function(){const r=document.createElement("link").relList;if(r&&r.supports&&r.supports("modulepreload"))return;for(const c of document.querySelectorAll('link[rel="modulepreload"]'))a(c);new MutationObserver(c=>{for(const p of c)if(p.type==="childList")for(const f of p.addedNodes)f.tagName==="LINK"&&f.rel==="modulepreload"&&a(f)}).observe(document,{childList:!0,subtree:!0});function i(c){const p={};return c.integrity&&(p.integrity=c.integrity),c.referrerPolicy&&(p.referrerPolicy=c.referrerPolicy),c.crossOrigin==="use-credentials"?p.credentials="include":c.crossOrigin==="anonymous"?p.credentials="omit":p.credentials="same-origin",p}function a(c){if(c.ep)return;c.ep=!0;const p=i(c);fetch(c.href,p)}})();const tt=function(){return typeof process<"u"&&process.release?.name==="node"?"NODE":typeof window<"u"?"WEB":typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?"WORKER":"NODE"}();if(tt==="NODE"){let n=function(i){return new Promise(function(a,c){i.onload=i.onerror=function(p){i.onload=i.onerror=null,p.type==="load"?a(i.result):c(new Error("Failed to read the blob/file"))}})},r=function(){const i=new Uint8Array([1,2,3,4]),c=new File([i],"test").stream();try{return c.getReader({mode:"byob"}),!0}catch{return!1}};if(typeof File>"u"){class i extends Blob{constructor(c,p,f){super(c);let u;f?.lastModified&&(u=new Date),(!u||isNaN(u.getFullYear()))&&(u=new Date),this.lastModifiedDate=u,this.lastModified=u.getMilliseconds(),this.name=p||""}}global.File=i}typeof Blob.prototype.arrayBuffer>"u"&&(Blob.prototype.arrayBuffer=function(){const a=new FileReader;return a.readAsArrayBuffer(this),n(a)}),typeof Blob.prototype.text>"u"&&(Blob.prototype.text=function(){const a=new FileReader;return a.readAsText(this),n(a)}),(typeof Blob.prototype.stream>"u"||!r())&&(Blob.prototype.stream=function(){let i=0;const a=this;return new ReadableStream({type:"bytes",autoAllocateChunkSize:512*1024,async pull(c){const p=c.byobRequest.view,u=await a.slice(i,i+p.byteLength).arrayBuffer(),m=new Uint8Array(u);new Uint8Array(p.buffer).set(m);const $=m.byteLength;c.byobRequest.respond($),i+=$,i>=a.size&&c.close()}})})}if(tt==="NODE"&&typeof CustomEvent>"u"){class n extends Event{constructor(i,a={}){super(i,a),this.detail=a.detail}initCustomEvent(){}}globalThis.CustomEvent=n}const le={0:"No error occurred. System call completed successfully.",1:"Argument list too long.",2:"Permission denied.",3:"Address in use.",4:"Address not available.",5:"Address family not supported.",6:"Resource unavailable, or operation would block.",7:"Connection already in progress.",8:"Bad file descriptor.",9:"Bad message.",10:"Device or resource busy.",11:"Operation canceled.",12:"No child processes.",13:"Connection aborted.",14:"Connection refused.",15:"Connection reset.",16:"Resource deadlock would occur.",17:"Destination address required.",18:"Mathematics argument out of domain of function.",19:"Reserved.",20:"File exists.",21:"Bad address.",22:"File too large.",23:"Host is unreachable.",24:"Identifier removed.",25:"Illegal byte sequence.",26:"Operation in progress.",27:"Interrupted function.",28:"Invalid argument.",29:"I/O error.",30:"Socket is connected.",31:"There is a directory under that path.",32:"Too many levels of symbolic links.",33:"File descriptor value too large.",34:"Too many links.",35:"Message too large.",36:"Reserved.",37:"Filename too long.",38:"Network is down.",39:"Connection aborted by network.",40:"Network unreachable.",41:"Too many files open in system.",42:"No buffer space available.",43:"No such device.",44:"There is no such file or directory OR the parent directory does not exist.",45:"Executable file format error.",46:"No locks available.",47:"Reserved.",48:"Not enough space.",49:"No message of the desired type.",50:"Protocol not available.",51:"No space left on device.",52:"Function not supported.",53:"The socket is not connected.",54:"Not a directory or a symbolic link to a directory.",55:"Directory not empty.",56:"State not recoverable.",57:"Not a socket.",58:"Not supported, or operation not supported on socket.",59:"Inappropriate I/O control operation.",60:"No such device or address.",61:"Value too large to be stored in data type.",62:"Previous owner died.",63:"Operation not permitted.",64:"Broken pipe.",65:"Protocol error.",66:"Protocol not supported.",67:"Protocol wrong type for socket.",68:"Result too large.",69:"Read-only file system.",70:"Invalid seek.",71:"No such process.",72:"Reserved.",73:"Connection timed out.",74:"Text file busy.",75:"Cross-device link.",76:"Extension: Capabilities insufficient."};function zt(n){const r=typeof n=="object"?n?.errno:null;if(r in le)return le[r]}function D(n=""){return function(i,a,c){const p=c.value;c.value=function(...f){try{return p.apply(this,f)}catch(u){const m=typeof u=="object"?u?.errno:null;if(m in le){const $=le[m],w=typeof f[1]=="string"?f[1]:null,y=w!==null?n.replaceAll("{path}",w):n;throw new Error(`${y}: ${$}`,{cause:u})}throw u}}}}const Gt="playground-log",Qe=(n,...r)=>{q.dispatchEvent(new CustomEvent(Gt,{detail:{log:n,args:r}}))},qt=(n,...r)=>{switch(typeof n.message=="string"?Reflect.set(n,"message",Re(n.message)):n.message.message&&typeof n.message.message=="string"&&Reflect.set(n.message,"message",Re(n.message.message)),n.severity){case"Debug":console.debug(n.message,...r);break;case"Info":console.info(n.message,...r);break;case"Warn":console.warn(n.message,...r);break;case"Error":console.error(n.message,...r);break;case"Fatal":console.error(n.message,...r);break;default:console.log(n.message,...r)}},Ht=n=>n instanceof Error?[n.message,n.stack].join(`
`):JSON.stringify(n,null,2),nt=[],Je=n=>{nt.push(n)},Ce=n=>{if(n.raw===!0)Je(n.message);else{const r=Qt(typeof n.message=="object"?Ht(n.message):n.message,n.severity??"Info",n.prefix??"JavaScript");Je(r)}};class jt extends EventTarget{constructor(r=[]){super(),this.handlers=r,this.fatalErrorEvent="playground-fatal-error"}getLogs(){return this.handlers.includes(Ce)?[...nt]:(this.error(`Logs aren't stored because the logToMemory handler isn't registered.
				If you're using a custom logger instance, make sure to register logToMemory handler.
			`),[])}logMessage(r,...i){for(const a of this.handlers)a(r,...i)}log(r,...i){this.logMessage({message:r,severity:void 0,prefix:"JavaScript",raw:!1},...i)}debug(r,...i){this.logMessage({message:r,severity:"Debug",prefix:"JavaScript",raw:!1},...i)}info(r,...i){this.logMessage({message:r,severity:"Info",prefix:"JavaScript",raw:!1},...i)}warn(r,...i){this.logMessage({message:r,severity:"Warn",prefix:"JavaScript",raw:!1},...i)}error(r,...i){this.logMessage({message:r,severity:"Error",prefix:"JavaScript",raw:!1},...i)}}const Vt=()=>{try{if(process.env.NODE_ENV==="test")return[Ce,Qe]}catch{}return[Ce,qt,Qe]},q=new jt(Vt()),Re=n=>n.replace(/\t/g,""),Qt=(n,r,i)=>{const a=new Date,c=new Intl.DateTimeFormat("en-GB",{year:"numeric",month:"short",day:"2-digit",timeZone:"UTC"}).format(a).replace(/ /g,"-"),p=new Intl.DateTimeFormat("en-GB",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1,timeZone:"UTC",timeZoneName:"short"}).format(a),f=c+" "+p;return n=Re(n),`[${f}] ${i} ${r}: ${n}`};class Ye extends Error{constructor(r,i){super(r),this.userFriendlyMessage=i,this.userFriendlyMessage||(this.userFriendlyMessage=r)}}function B(...n){function r(p){return p.substring(p.length-1)==="/"}let i=n.join("/");const a=i[0]==="/",c=r(i);return i=rt(i),!i&&!a&&(i="."),i&&c&&!r(i)&&(i+="/"),i}function pe(n){if(n==="/")return"/";n=rt(n);const r=n.lastIndexOf("/");return r===-1?"":r===0?"/":n.substr(0,r)}function rt(n){const r=n[0]==="/";return n=Jt(n.split("/").filter(i=>!!i),!r).join("/"),(r?"/":"")+n.replace(/\/$/,"")}function Jt(n,r){let i=0;for(let a=n.length-1;a>=0;a--){const c=n[a];c==="."?n.splice(a,1):c===".."?(n.splice(a,1),i++):i&&(n.splice(a,1),i--)}if(r)for(;i;i--)n.unshift("..");return n}function it(n=36,r="!@#$%^&*()_+=-[]/.,<>?"){const i="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"+r;let a="";for(let c=n;c>0;--c)a+=i[Math.floor(Math.random()*i.length)];return a}function Yt(){return it(36,"-_")}function U(n){return`json_decode(base64_decode('${Xt(JSON.stringify(n))}'), true)`}function me(n){const r={};for(const i in n)r[i]=U(n[i]);return r}function Xt(n){return Zt(new TextEncoder().encode(n))}function Zt(n){const r=String.fromCodePoint(...n);return btoa(r)}var Kt=Object.defineProperty,en=Object.getOwnPropertyDescriptor,W=(n,r,i,a)=>{for(var c=a>1?void 0:a?en(r,i):r,p=n.length-1,f;p>=0;p--)(f=n[p])&&(c=(a?f(r,i,c):f(c))||c);return a&&c&&Kt(r,i,c),c};const z=class L{static readFileAsText(r,i){return new TextDecoder().decode(L.readFileAsBuffer(r,i))}static readFileAsBuffer(r,i){return r.readFile(i)}static writeFile(r,i,a){r.writeFile(i,a)}static unlink(r,i){r.unlink(i)}static mv(r,i,a){try{const c=r.lookupPath(i).node.mount,p=L.fileExists(r,a)?r.lookupPath(a).node.mount:r.lookupPath(pe(a)).node.mount;c.mountpoint!==p.mountpoint?(L.copyRecursive(r,i,a),L.isDir(r,i)?L.rmdir(r,i,{recursive:!0}):r.unlink(i)):r.rename(i,a)}catch(c){const p=zt(c);throw p?new Error(`Could not move ${i} to ${a}: ${p}`,{cause:c}):c}}static rmdir(r,i,a={recursive:!0}){a?.recursive&&L.listFiles(r,i).forEach(c=>{const p=`${i}/${c}`;L.isDir(r,p)?L.rmdir(r,p,a):L.unlink(r,p)}),r.rmdir(i)}static listFiles(r,i,a={prependPath:!1}){if(!L.fileExists(r,i))return[];try{const c=r.readdir(i).filter(p=>p!=="."&&p!=="..");if(a.prependPath){const p=i.replace(/\/$/,"");return c.map(f=>`${p}/${f}`)}return c}catch(c){return q.error(c,{path:i}),[]}}static isDir(r,i){return L.fileExists(r,i)?r.isDir(r.lookupPath(i,{follow:!0}).node.mode):!1}static isFile(r,i){return L.fileExists(r,i)?r.isFile(r.lookupPath(i,{follow:!0}).node.mode):!1}static symlink(r,i,a){return r.symlink(i,a)}static isSymlink(r,i){return L.fileExists(r,i)?r.isLink(r.lookupPath(i).node.mode):!1}static readlink(r,i){return r.readlink(i)}static realpath(r,i){return r.lookupPath(i,{follow:!0}).path}static fileExists(r,i){try{return r.lookupPath(i),!0}catch{return!1}}static mkdir(r,i){r.mkdirTree(i)}static copyRecursive(r,i,a){const c=r.lookupPath(i).node;if(r.isDir(c.mode)){r.mkdirTree(a);const p=r.readdir(i).filter(f=>f!=="."&&f!=="..");for(const f of p)L.copyRecursive(r,B(i,f),B(a,f))}else r.writeFile(a,r.readFile(i))}};W([D('Could not read "{path}"')],z,"readFileAsText",1);W([D('Could not read "{path}"')],z,"readFileAsBuffer",1);W([D('Could not write to "{path}"')],z,"writeFile",1);W([D('Could not unlink "{path}"')],z,"unlink",1);W([D('Could not remove directory "{path}"')],z,"rmdir",1);W([D('Could not list files in "{path}"')],z,"listFiles",1);W([D('Could not stat "{path}"')],z,"isDir",1);W([D('Could not stat "{path}"')],z,"isFile",1);W([D('Could not stat "{path}"')],z,"realpath",1);W([D('Could not stat "{path}"')],z,"fileExists",1);W([D('Could not create directory "{path}"')],z,"mkdir",1);W([D('Could not copy files from "{path}"')],z,"copyRecursive",1);const tn={500:"Internal Server Error",502:"Bad Gateway",404:"Not Found",403:"Forbidden",401:"Unauthorized",400:"Bad Request",301:"Moved Permanently",302:"Found",307:"Temporary Redirect",308:"Permanent Redirect",204:"No Content",201:"Created",200:"OK"};class fe{constructor(r,i,a,c="",p=0){this.httpStatusCode=r,this.headers=i,this.bytes=a,this.exitCode=p,this.errors=c}static forHttpCode(r,i=""){return new fe(r,{},new TextEncoder().encode(i||tn[r]||""))}static fromRawData(r){return new fe(r.httpStatusCode,r.headers,r.bytes,r.errors,r.exitCode)}toRawData(){return{headers:this.headers,bytes:this.bytes,errors:this.errors,exitCode:this.exitCode,httpStatusCode:this.httpStatusCode}}get json(){return JSON.parse(this.text)}get text(){return new TextDecoder().decode(this.bytes)}}(function(){return typeof process<"u"&&process.release?.name==="node"?"NODE":typeof window<"u"?"WEB":typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?"WORKER":"NODE"})();ReadableStream.prototype[Symbol.asyncIterator]||(ReadableStream.prototype[Symbol.asyncIterator]=async function*(){const n=this.getReader();try{for(;;){const{done:r,value:i}=await n.read();if(r)return;yield i}}finally{n.releaseLock()}},ReadableStream.prototype.iterate=ReadableStream.prototype[Symbol.asyncIterator]);async function ye(n,r,i,{rmRoot:a=!1}={}){a&&await n.isDir(r)&&await n.rmdir(r,{recursive:!0});for(const[c,p]of Object.entries(i)){const f=B(r,c);await n.fileExists(pe(f))||await n.mkdir(pe(f)),p instanceof Uint8Array||typeof p=="string"?await n.writeFile(f,p):await ye(n,f,p)}}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const ot=Symbol("Comlink.proxy"),nn=Symbol("Comlink.endpoint"),rn=Symbol("Comlink.releaseProxy"),Be=Symbol("Comlink.finalizer"),ue=Symbol("Comlink.thrown"),st=n=>typeof n=="object"&&n!==null||typeof n=="function",on={canHandle:n=>st(n)&&n[ot],serialize(n){const{port1:r,port2:i}=new MessageChannel;return ge(n,r),[i,[i]]},deserialize(n){return n.start(),Se(n)}},sn={canHandle:n=>st(n)&&ue in n,serialize({value:n}){let r;return n instanceof Error?r={isError:!0,value:{message:n.message,name:n.name,stack:n.stack}}:r={isError:!1,value:n},[r,[]]},deserialize(n){throw n.isError?Object.assign(new Error(n.value.message),n.value):n.value}},te=new Map([["proxy",on],["throw",sn]]);function an(n,r){for(const i of n)if(r===i||i==="*"||i instanceof RegExp&&i.test(r))return!0;return!1}function ge(n,r=globalThis,i=["*"]){r.addEventListener("message",function a(c){if(!c||!c.data)return;if(!an(i,c.origin)){console.warn(`Invalid origin '${c.origin}' for comlink proxy`);return}const{id:p,type:f,path:u}=Object.assign({path:[]},c.data),m=(c.data.argumentList||[]).map(J);let $;try{const w=u.slice(0,-1).reduce((_,b)=>_[b],n),y=u.reduce((_,b)=>_[b],n);switch(f){case"GET":$=y;break;case"SET":w[u.slice(-1)[0]]=J(c.data.value),$=!0;break;case"APPLY":$=y.apply(w,m);break;case"CONSTRUCT":{const _=new y(...m);$=lt(_)}break;case"ENDPOINT":{const{port1:_,port2:b}=new MessageChannel;ge(n,b),$=fn(_,[_])}break;case"RELEASE":$=void 0;break;default:return}}catch(w){$={value:w,[ue]:0}}Promise.resolve($).catch(w=>({value:w,[ue]:0})).then(w=>{const[y,_]=we(w);r.postMessage(Object.assign(Object.assign({},y),{id:p}),_),f==="RELEASE"&&(r.removeEventListener("message",a),at(r),Be in n&&typeof n[Be]=="function"&&n[Be]())}).catch(w=>{const[y,_]=we({value:new TypeError("Unserializable return value"),[ue]:0});r.postMessage(Object.assign(Object.assign({},y),{id:p}),_)})}),r.start&&r.start()}function cn(n){return n.constructor.name==="MessagePort"}function at(n){cn(n)&&n.close()}function Se(n,r){return Pe(n,[],r)}function ce(n){if(n)throw new Error("Proxy has been released and is not useable")}function ct(n){return ee(n,{type:"RELEASE"}).then(()=>{at(n)})}const de=new WeakMap,he="FinalizationRegistry"in globalThis&&new FinalizationRegistry(n=>{const r=(de.get(n)||0)-1;de.set(n,r),r===0&&ct(n)});function un(n,r){const i=(de.get(r)||0)+1;de.set(r,i),he&&he.register(n,r,n)}function ln(n){he&&he.unregister(n)}function Pe(n,r=[],i=function(){}){let a=!1;const c=new Proxy(i,{get(p,f){if(ce(a),f===rn)return()=>{ln(c),ct(n),a=!0};if(f==="then"){if(r.length===0)return{then:()=>c};const u=ee(n,{type:"GET",path:r.map(m=>m.toString())}).then(J);return u.then.bind(u)}return Pe(n,[...r,f])},set(p,f,u){ce(a);const[m,$]=we(u);return ee(n,{type:"SET",path:[...r,f].map(w=>w.toString()),value:m},$).then(J)},apply(p,f,u){ce(a);const m=r[r.length-1];if(m===nn)return ee(n,{type:"ENDPOINT"}).then(J);if(m==="bind")return Pe(n,r.slice(0,-1));const[$,w]=Xe(u);return ee(n,{type:"APPLY",path:r.map(y=>y.toString()),argumentList:$},w).then(J)},construct(p,f){ce(a);const[u,m]=Xe(f);return ee(n,{type:"CONSTRUCT",path:r.map($=>$.toString()),argumentList:u},m).then(J)}});return un(c,n),c}function pn(n){return Array.prototype.concat.apply([],n)}function Xe(n){const r=n.map(we);return[r.map(i=>i[0]),pn(r.map(i=>i[1]))]}const ut=new WeakMap;function fn(n,r){return ut.set(n,r),n}function lt(n){return Object.assign(n,{[ot]:!0})}function pt(n,r=globalThis,i="*"){return{postMessage:(a,c)=>n.postMessage(a,i,c),addEventListener:r.addEventListener.bind(r),removeEventListener:r.removeEventListener.bind(r)}}function we(n){for(const[r,i]of te)if(i.canHandle(n)){const[a,c]=i.serialize(n);return[{type:"HANDLER",name:r,value:a},c]}return[{type:"RAW",value:n},ut.get(n)||[]]}function J(n){switch(n.type){case"HANDLER":return te.get(n.name).deserialize(n.value);case"RAW":return n.value}}function ee(n,r,i){return new Promise(a=>{const c=dn();n.addEventListener("message",function p(f){!f.data||!f.data.id||f.data.id!==c||(n.removeEventListener("message",p),a(f.data))}),n.start&&n.start(),n.postMessage(Object.assign({id:c},r),i)})}function dn(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}function hn(n,r=void 0){ft();const i=n instanceof Worker?n:pt(n,r),a=Se(i),c=ve(a);return new Proxy(c,{get:(p,f)=>f==="isConnected"?async()=>{for(;;)try{await wn(a.isConnected(),200);break}catch{}}:a[f]})}async function wn(n,r){return new Promise((i,a)=>{setTimeout(a,r),n.then(i)})}function mn(n,r){ft();const i=Promise.resolve();let a,c;const p=new Promise((m,$)=>{a=m,c=$}),f=ve(n),u=new Proxy(f,{get:(m,$)=>$==="isConnected"?()=>i:$==="isReady"?()=>p:$ in m?m[$]:r?.[$]});return ge(u,typeof window<"u"?pt(self.parent):void 0),[a,c,u]}let Ze=!1;function ft(){if(Ze)return;Ze=!0,te.set("EVENT",{canHandle:i=>i instanceof CustomEvent,serialize:i=>[{detail:i.detail},[]],deserialize:i=>i}),te.set("FUNCTION",{canHandle:i=>typeof i=="function",serialize(i){const{port1:a,port2:c}=new MessageChannel;return ge(i,a),[c,[c]]},deserialize(i){return i.start(),Se(i)}}),te.set("PHPResponse",{canHandle:i=>typeof i=="object"&&i!==null&&"headers"in i&&"bytes"in i&&"errors"in i&&"exitCode"in i&&"httpStatusCode"in i,serialize(i){return[i.toRawData(),[]]},deserialize(i){return fe.fromRawData(i)}});const n=te.get("throw"),r=n?.serialize;n.serialize=({value:i})=>{const a=r({value:i});return i.response&&(a[0].value.response=i.response),i.source&&(a[0].value.source=i.source),a}}function ve(n){return new Proxy(n,{get(r,i){switch(typeof r[i]){case"function":return(...a)=>r[i](...a);case"object":return r[i]===null?r[i]:ve(r[i]);case"undefined":case"number":case"string":return r[i];default:return lt(r[i])}}})}function yn(n,r){window.addEventListener("message",i=>{i.source===n.contentWindow&&(r&&i.origin!==r||typeof i.data!="object"||i.data.type!=="relay"||window.parent.postMessage(i.data,"*"))}),window.addEventListener("message",i=>{i.source===window.parent&&(typeof i.data!="object"||i.data.type!=="relay"||n?.contentWindow?.postMessage(i.data))})}async function gn(n){const r=new Worker(n,{type:"module"});return new Promise((i,a)=>{r.onerror=p=>{const f=new Error(`WebWorker failed to load at ${n}. ${p.message?`Original error: ${p.message}`:""}`);f.filename=p.filename,a(f)};function c(p){p.data==="worker-script-started"&&(i(r),r.removeEventListener("message",c))}r.addEventListener("message",c)})}const $n="_overlay_1571u_1",En="_is-hidden_1571u_17",_n="_wrapper_1571u_22",xn="_wrapper-definite_1571u_32",bn="_progress-bar_1571u_32",kn="_is-indefinite_1571u_32",Fn="_wrapper-indefinite_1571u_33",Tn="_is-definite_1571u_33",Bn="_indefinite-loading_1571u_1",In="_caption_1571u_81",O={overlay:$n,isHidden:En,wrapper:_n,wrapperDefinite:xn,progressBar:bn,isIndefinite:kn,wrapperIndefinite:Fn,isDefinite:Tn,indefiniteLoading:Bn,caption:In};class An{constructor(r={}){this.caption="Preparing WordPress",this.progress=0,this.isIndefinite=!1,this.visible=!0,this.element=document.createElement("div"),this.captionElement=document.createElement("h3"),this.element.appendChild(this.captionElement),this.setOptions(r)}setOptions(r){"caption"in r&&r.caption&&(this.caption=r.caption),"progress"in r&&(this.progress=r.progress),"isIndefinite"in r&&(this.isIndefinite=r.isIndefinite),"visible"in r&&(this.visible=r.visible),this.updateElement()}destroy(){this.setOptions({visible:!1}),setTimeout(()=>{this.element.remove()},500)}updateElement(){this.element.className="",this.element.classList.add(O.overlay),this.visible||this.element.classList.add(O.isHidden),this.captionElement.className="",this.captionElement.classList.add(O.caption),this.captionElement.textContent=this.caption+"...";const r=this.element.querySelector(`.${O.wrapper}`);r&&this.element.removeChild(r),this.isIndefinite?this.element.appendChild(this.createProgressIndefinite()):this.element.appendChild(this.createProgress())}createProgress(){const r=document.createElement("div");r.classList.add(O.wrapper,O.wrapperDefinite);const i=document.createElement("div");return i.classList.add(O.progressBar,O.isDefinite),i.style.width=this.progress+"%",r.appendChild(i),r}createProgressIndefinite(){const r=document.createElement("div");r.classList.add(O.wrapper,O.wrapperIndefinite);const i=document.createElement("div");return i.classList.add(O.progressBar,O.isIndefinite),r.appendChild(i),r}}const Cn="/worker-thread-09a083fc.js",Rn="/sw.js",dt=["db.php","plugins/akismet","plugins/hello.php","plugins/wordpress-importer","mu-plugins/sqlite-database-integration","mu-plugins/playground-includes","mu-plugins/0-playground.php","mu-plugins/0-sqlite.php","themes/twentytwenty","themes/twentytwentyone","themes/twentytwentytwo","themes/twentytwentythree","themes/twentytwentyfour","themes/twentytwentyfive","themes/twentytwentysix"],ht=async(n,{pluginPath:r,pluginName:i},a)=>{a?.tracker.setCaption(`Activating ${i||r}`);const c=await n.documentRoot,p=await n.run({code:`<?php
			define( 'WP_ADMIN', true );
			require_once( ${U(c)}. "/wp-load.php" );
			require_once( ${U(c)}. "/wp-admin/includes/plugin.php" );

			// Set current user to admin
			wp_set_current_user( get_users(array('role' => 'Administrator') )[0]->ID );

			$plugin_path = ${U(r)};
			$response = false;
			if (!is_dir($plugin_path)) {
				$response = activate_plugin($plugin_path);
			}

			// Activate plugin by name if activation by path wasn't successful
			if ( null !== $response ) {
				foreach ( ( glob( $plugin_path . '/*.php' ) ?: array() ) as $file ) {
					$info = get_plugin_data( $file, false, false );
					if ( ! empty( $info['Name'] ) ) {
						$response = activate_plugin( $file );
						break;
					}
				}
			}

			if ( null === $response ) {
				die('Plugin activated successfully');
			} else if ( is_wp_error( $response ) ) {
				throw new Exception( $response->get_error_message() );
			}

			throw new Exception( 'Unable to activate plugin' );
		`});if(p.text!=="Plugin activated successfully")throw q.debug(p),new Error(`Plugin ${r} could not be activated – WordPress exited with no error. Sometimes, when $_SERVER or site options are not configured correctly, WordPress exits early with a 301 redirect. Inspect the "debug" logs in the console for more details`)},wt=async(n,{themeFolderName:r},i)=>{i?.tracker.setCaption(`Activating ${r}`);const a=await n.documentRoot,c=`${a}/wp-content/themes/${r}`;if(!await n.fileExists(c))throw new Error(`
			Couldn't activate theme ${r}.
			Theme not found at the provided theme path: ${c}.
			Check the theme path to ensure it's correct.
			If the theme is not installed, you can install it using the installTheme step.
			More info can be found in the Blueprint documentation: https://wordpress.github.io/wordpress-playground/blueprints/steps/#ActivateThemeStep
		`);const p=await n.run({code:`<?php
			define( 'WP_ADMIN', true );
			require_once( getenv('docroot') . "/wp-load.php" );

			// Set current user to admin
			wp_set_current_user( get_users(array('role' => 'Administrator') )[0]->ID );

			switch_theme( getenv('themeFolderName') );

			if( wp_get_theme()->get_stylesheet() !== getenv('themeFolderName') ) {
				throw new Exception( 'Theme ' . getenv('themeFolderName') . ' could not be activated.' );				
			}
			die('Theme activated successfully');
		`,env:{docroot:a,themeFolderName:r}});if(p.text!=="Theme activated successfully")throw q.debug(p),new Error(`Theme ${r} could not be activated – WordPress exited with no error. Sometimes, when $_SERVER or site options are not configured correctly, WordPress exits early with a 301 redirect. Inspect the "debug" logs in the console for more details`)},Pn=async(n,{code:r})=>await n.run({code:r}),Sn=async(n,{options:r})=>await n.run(r),mt=async(n,{path:r})=>{await n.unlink(r)},vn=async(n,{sql:r},i)=>{i?.tracker.setCaption("Executing SQL Queries");const a=`/tmp/${Yt()}.sql`;await n.writeFile(a,new Uint8Array(await r.arrayBuffer()));const c=await n.documentRoot,p=me({docroot:c,sqlFilename:a}),f=await n.run({code:`<?php
		require_once ${p.docroot} . '/wp-load.php';

		$handle = fopen(${p.sqlFilename}, 'r');
		$buffer = '';

		global $wpdb;

		while ($bytes = fgets($handle)) {
			$buffer .= $bytes;

			if (!feof($handle) && substr($buffer, -1, 1) !== "
") {
				continue;
			}

			$wpdb->query($buffer);
			$buffer = '';
		}
	`});return await mt(n,{path:a}),f},Un=async(n,{request:r})=>{q.warn('Deprecated: The Blueprint step "request" is deprecated and will be removed in a future release.');const i=await n.request(r);if(i.httpStatusCode>399||i.httpStatusCode<200)throw q.warn("WordPress response was",{response:i}),new Error(`Request failed with status ${i.httpStatusCode}`);return i},Ln=`<?php

/**
 * Rewrites the wp-config.php file to ensure specific constants are defined
 * with specific values.
 * 
 * Example:
 * 
 * \`\`\`php
 * <?php
 * define('WP_DEBUG', true);
 * // The third define() argument is also supported:
 * define('SAVEQUERIES', false, true);
 * 
 * // Expression
 * define(true ? 'WP_DEBUG_LOG' : 'WP_DEBUG_LOG', 123);
 * 
 * // Guarded expressions shouldn't be wrapped twice
 * if(!defined(1 ? 'A' : 'B')) {
 *     define(1 ? 'A' : 'B', 0);
 * }
 * 
 * // More advanced expression
 * define((function() use($x) {
 *     return [$x, 'a'];
 * })(), 123);
 * \`\`\`
 * 
 * Rewritten with
 * 
 *     $constants = [
 *        'WP_DEBUG' => false,
 *        'WP_DEBUG_LOG' => true,
 *        'SAVEQUERIES' => true,
 *        'NEW_CONSTANT' => "new constant",
 *     ];
 * 
 * \`\`\`php
 * <?php
 * define('WP_DEBUG_LOG',true);
 * define('NEW_CONSTANT','new constant');
 * ?><?php
 * define('WP_DEBUG',false);
 * // The third define() argument is also supported:
 * define('SAVEQUERIES',true, true);
 * 
 * // Expression
 * if(!defined($const ? 'WP_DEBUG_LOG' : 'WP_DEBUG_LOG')) {
 *      define($const ? 'WP_DEBUG_LOG' : 'WP_DEBUG_LOG', 123);
 * }
 * 
 * // Guarded expressions shouldn't be wrapped twice
 * if(!defined(1 ? 'A' : 'B')) {
 *     define(1 ? 'A' : 'B', 0);
 * }
 * 
 * // More advanced expression
 * if(!defined((function() use($x) {
 *    return [$x, 'a'];
 * })())) {
 *     define((function() use($x) {
 *         return [$x, 'a'];
 *     })(), 123);
 * }
 * \`\`\`
 * 
 * @param mixed $content
 * @return string
 */
function rewrite_wp_config_to_define_constants($content, $constants = [])
{
    $tokens = array_reverse(token_get_all($content));
    $output = [];
    $defined_expressions = [];

    // Look through all the tokens and find the define calls
    do {
        $buffer = [];
        $name_buffer = [];
        $value_buffer = [];
        $third_arg_buffer = [];

        // Capture everything until the define call into output.
        // Capturing the define call into a buffer.
        // Example:
        //     <?php echo 'a'; define  (
        //     ^^^^^^^^^^^^^^^^^^^^^^
        //           output   |buffer
        while ($token = array_pop($tokens)) {
            if (is_array($token) && $token[0] === T_STRING && (strtolower($token[1]) === 'define' || strtolower($token[1]) === 'defined')) {
                $buffer[] = $token;
                break;
            }
            $output[] = $token;
        }

        // Maybe we didn't find a define call and reached the end of the file?
        if (!count($tokens)) {
            break;
        }

        // Keep track of the "defined" expressions that are already accounted for
        if($token[1] === 'defined') {
            $output[] = $token;
            $defined_expression = [];
            $open_parenthesis = 0;
            // Capture everything up to the opening parenthesis, including the parenthesis
            // e.g. defined  (
            //           ^^^^
            while ($token = array_pop($tokens)) {
                $output[] = $token;
                if ($token === "(") {
                    ++$open_parenthesis;
                    break;
                }
            }

            // Capture everything up to the closing parenthesis, including the parenthesis
            // e.g. defined  (
            //           ^^^^
            while ($token = array_pop($tokens)) {
                $output[] = $token;
                if ($token === ")") {
                    --$open_parenthesis;
                }
                if ($open_parenthesis === 0) {
                    break;
                }
                $defined_expression[] = $token;
            }

            $defined_expressions[] = stringify_tokens(skip_whitespace($defined_expression));
            continue;
        }

        // Capture everything up to the opening parenthesis, including the parenthesis
        // e.g. define  (
        //           ^^^^
        while ($token = array_pop($tokens)) {
            $buffer[] = $token;
            if ($token === "(") {
                break;
            }
        }

        // Capture the first argument – it's the first expression after the opening
        // parenthesis and before the comma:
        // Examples:
        //     define("WP_DEBUG", true);
        //            ^^^^^^^^^^^
        //
        //     define(count([1,2]) > 2 ? 'WP_DEBUG' : 'FOO', true);
        //            ^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^
        $open_parenthesis = 0;
        while ($token = array_pop($tokens)) {
            $buffer[] = $token;
            if ($token === "(" || $token === "[" || $token === "{") {
                ++$open_parenthesis;
            } elseif ($token === ")" || $token === "]" || $token === "}") {
                --$open_parenthesis;
            } elseif ($token === "," && $open_parenthesis === 0) {
                break;
            }

            // Don't capture the comma as a part of the constant name
            $name_buffer[] = $token;
        }

        // Capture everything until the closing parenthesis
        //     define("WP_DEBUG", true);
        //                       ^^^^^^
        $open_parenthesis = 0;
        $is_second_argument = true;
        while ($token = array_pop($tokens)) {
            $buffer[] = $token;
            if ($token === ")" && $open_parenthesis === 0) {
                // Final parenthesis of the define call.
                break;
            } else if ($token === "(" || $token === "[" || $token === "{") {
                ++$open_parenthesis;
            } elseif ($token === ")" || $token === "]" || $token === "}") {
                --$open_parenthesis;
            } elseif ($token === "," && $open_parenthesis === 0) {
                // This define call has more than 2 arguments! The third one is the
                // boolean value indicating $is_case_insensitive. Let's continue capturing
                // to $third_arg_buffer.
                $is_second_argument = false;
            }
            if ($is_second_argument) {
                $value_buffer[] = $token;
            } else {
                $third_arg_buffer[] = $token;
            }
        }

        // Capture until the semicolon
        //     define("WP_DEBUG", true)  ;
        //                             ^^^
        while ($token = array_pop($tokens)) {
            $buffer[] = $token;
            if ($token === ";") {
                break;
            }
        }

        // Decide whether $name_buffer is a constant name or an expression
        $name_token = null;
        $name_token_index = $token;
        $name_is_literal = true;
        foreach ($name_buffer as $k => $token) {
            if (is_array($token)) {
                if ($token[0] === T_WHITESPACE || $token[0] === T_COMMENT || $token[0] === T_DOC_COMMENT) {
                    continue;
                } else if ($token[0] === T_STRING || $token[0] === T_CONSTANT_ENCAPSED_STRING) {
                    $name_token = $token;
                    $name_token_index = $k;
                } else {
                    $name_is_literal = false;
                    break;
                }
            } else if ($token !== "(" && $token !== ")") {
                $name_is_literal = false;
                break;
            }
        }

        // We can't handle expressions as constant names. Let's wrap that define
        // call in an if(!defined()) statement, just in case it collides with
        // a constant name.
        if (!$name_is_literal) {
            // Ensure the defined expression is not already accounted for
            foreach ($defined_expressions as $defined_expression) {
                if ($defined_expression === stringify_tokens(skip_whitespace($name_buffer))) {
                    $output = array_merge($output, $buffer);
                    continue 2;
                }
            }
            $output = array_merge(
                $output,
                ["if(!defined("],
                $name_buffer,
                [")) {\\n     "],
                ['define('],
                $name_buffer,
                [','],
                $value_buffer,
                $third_arg_buffer,
                [");"],
                ["\\n}\\n"]
            );
            continue;
        }

        // Yay, we have a literal constant name in the buffer now. Let's
        // get its value:
        $name = eval('return ' . $name_token[1] . ';');

        // If the constant name is not in the list of constants we're looking,
        // we can ignore it.
        if (!array_key_exists($name, $constants)) {
            $output = array_merge($output, $buffer);
            continue;
        }

        // We now have a define() call that defines a constant we're looking for.
        // Let's rewrite its value to the one 
        $output = array_merge(
            $output,
            ['define('],
            $name_buffer,
            [','],
            [var_export($constants[$name], true)],
            $third_arg_buffer,
            [");"]
        );

        // Remove the constant from the list so we can process any remaining
        // constants later.
        unset($constants[$name]);
    } while (count($tokens));

    // Add any constants that weren't found in the file
    if (count($constants)) {
        $prepend = [
            "<?php \\n"
        ];
        foreach ($constants as $name => $value) {
            $prepend = array_merge(
                $prepend,
                [
                    "define(",
                    var_export($name, true),
                    ',',
                    var_export($value, true),
                    ");\\n"
                ]
            );
        }
        $prepend[] = "?>";
        $output = array_merge(
            $prepend,
            $output
        );
    }

    // Translate the output tokens back into a string
    return stringify_tokens($output);
}

function stringify_tokens($tokens) {
    $output = '';
    foreach ($tokens as $token) {
        if (is_array($token)) {
            $output .= $token[1];
        } else {
            $output .= $token;
        }
    }
    return $output;
}

function skip_whitespace($tokens) {
    $output = [];
    foreach ($tokens as $token) {
        if (is_array($token) && ($token[0] === T_WHITESPACE || $token[0] === T_COMMENT || $token[0] === T_DOC_COMMENT)) {
            continue;
        }
        $output[] = $token;
    }
    return $output;
}
`,$e=async(n,{consts:r,method:i="define-before-run"})=>{switch(i){case"define-before-run":await Nn(n,r);break;case"rewrite-wp-config":{const a=await n.documentRoot,c=B(a,"/wp-config.php"),p=await n.readFileAsText(c),f=await On(n,p,r);await n.writeFile(c,f);break}default:throw new Error(`Invalid method: ${i}`)}};async function Nn(n,r){for(const i in r)await n.defineConstant(i,r[i])}async function On(n,r,i){await n.writeFile("/tmp/code.php",r);const a=me({consts:i});return await n.run({code:`${Ln}
	$wp_config_path = '/tmp/code.php';
	$wp_config = file_get_contents($wp_config_path);
	$new_wp_config = rewrite_wp_config_to_define_constants($wp_config, ${a.consts});
	file_put_contents($wp_config_path, $new_wp_config);
	`}),await n.readFileAsText("/tmp/code.php")}const yt=async(n,{options:r})=>{const i=await n.documentRoot;await n.run({code:`<?php
		include ${U(i)} . '/wp-load.php';
		$site_options = ${U(r)};
		foreach($site_options as $name => $value) {
			update_option($name, $value);
		}
		echo "Success";
		`})},Mn=async(n,{meta:r,userId:i})=>{const a=await n.documentRoot;await n.run({code:`<?php
		include ${U(a)} . '/wp-load.php';
		$meta = ${U(r)};
		foreach($meta as $name => $value) {
			update_user_meta(${U(i)}, $name, $value);
		}
		`})},gt="/tmp/wp-cli.phar",$t=async(n,r=gt)=>{if(!await n.fileExists(r))throw new Error(`wp-cli.phar not found at ${r}.
			You can enable wp-cli support by adding "wp-cli" to the list of extra libraries in your blueprint as follows:
			{
				"extraLibraries": [ "wp-cli" ]
			}
			Read more about it in the documentation.
			https://wordpress.github.io/wordpress-playground/blueprints/data-format#extra-libraries`)},Et=async(n,{command:r,wpCliPath:i=gt})=>{await $t(n,i);let a;if(typeof r=="string"?(r=r.trim(),a=Dn(r)):a=r,a.shift()!=="wp")throw new Error('The first argument must be "wp".');const p=await n.documentRoot;await n.writeFile("/tmp/stdout",""),await n.writeFile("/tmp/stderr",""),await n.writeFile(B(p,"run-cli.php"),`<?php
		// Set up the environment to emulate a shell script
		// call.

		// Set SHELL_PIPE to 0 to ensure WP-CLI formats
		// the output as ASCII tables.
		// @see https://github.com/wp-cli/wp-cli/issues/1102
		putenv( 'SHELL_PIPE=0' );

		// Set the argv global.
		$GLOBALS['argv'] = array_merge([
		  "/tmp/wp-cli.phar",
		  "--path=${p}"
		], ${U(a)});

		// Provide stdin, stdout, stderr streams outside of
		// the CLI SAPI.
		define('STDIN', fopen('php://stdin', 'rb'));
		define('STDOUT', fopen('php://stdout', 'wb'));
		define('STDERR', fopen('php://stderr', 'wb'));

		require( ${U(i)} );
		`);const f=await n.run({scriptPath:B(p,"run-cli.php")});if(f.errors)throw new Error(f.errors);return f};function Dn(n){let a=0,c="";const p=[];let f="";for(let u=0;u<n.length;u++){const m=n[u];a===0?m==='"'||m==="'"?(a=1,c=m):m.match(/\s/)?(f&&p.push(f),f=""):f+=m:a===1&&(m==="\\"?(u++,f+=n[u]):m===c?(a=0,c=""):f+=m)}return f&&p.push(f),p}const Wn=async(n,{wpCliPath:r})=>{await $t(n,r),await $e(n,{consts:{WP_ALLOW_MULTISITE:1}});const i=new URL(await n.absoluteUrl);if(i.port!==""){let p=`The current host is ${i.host}, but WordPress multisites do not support custom ports.`;throw i.hostname==="localhost"&&(p+=" For development, you can set up a playground.test domain using the instructions at https://wordpress.github.io/wordpress-playground/contributing/code."),new Error(p)}const a=i.pathname.replace(/\/$/,"")+"/",c=`${i.protocol}//${i.hostname}${a}`;await yt(n,{options:{siteurl:c,home:c}}),await Et(n,{command:"wp core multisite-convert"})},zn=async(n,{fromPath:r,toPath:i})=>{await n.writeFile(i,await n.readFileAsBuffer(r))},Gn=async(n,{fromPath:r,toPath:i})=>{await n.mv(r,i)},qn=async(n,{path:r})=>{await n.mkdir(r)},Hn=async(n,{path:r})=>{await n.rmdir(r)},_t=async(n,{path:r,data:i})=>{i instanceof File&&(i=new Uint8Array(await i.arrayBuffer())),r.startsWith("/wordpress/wp-content/mu-plugins")&&!await n.fileExists("/wordpress/wp-content/mu-plugins")&&await n.mkdir("/wordpress/wp-content/mu-plugins"),await n.writeFile(r,i)},jn=async(n,{writeToPath:r,filesTree:i})=>{await ye(n,r,i.files)},xt=async(n,{siteUrl:r})=>{await $e(n,{consts:{WP_HOME:r,WP_SITEURL:r}})},Vn=async(n,{file:r},i)=>{i?.tracker?.setCaption("Importing content"),await _t(n,{path:"/tmp/import.wxr",data:r});const a=await n.documentRoot;await n.run({code:`<?php
		require ${U(a)} . '/wp-load.php';
		require ${U(a)} . '/wp-admin/includes/admin.php';
  
		kses_remove_filters();
		$admin_id = get_users(array('role' => 'Administrator') )[0]->ID;
        wp_set_current_user( $admin_id );
		$importer = new WXR_Importer( array(
			'fetch_attachments' => true,
			'default_author' => $admin_id
		) );
		$logger = new WP_Importer_Logger_CLI();
		$importer->set_logger( $logger );

		// Slashes from the imported content are lost if we don't call wp_slash here.
		add_action( 'wp_insert_post_data', function( $data ) {
			return wp_slash($data);
		});

		$result = $importer->import( '/tmp/import.wxr' );
		`})},bt=async(n,{themeSlug:r=""},i)=>{i?.tracker?.setCaption("Importing theme starter content");const a=await n.documentRoot;await n.run({code:`<?php

		/**
		 * Ensure that the customizer loads as an admin user.
		 *
		 * For compatibility with themes, this MUST be run prior to theme inclusion, which is why this is a plugins_loaded filter instead
		 * of running _wp_customize_include() manually after load.
		 */
		function importThemeStarterContent_plugins_loaded() {
			// Set as the admin user, this ensures we can customize the site.
			wp_set_current_user(
				get_users( [ 'role' => 'Administrator' ] )[0]
			);

			// Force the site to be fresh, although it should already be.
			add_filter( 'pre_option_fresh_site', '__return_true' );

			/*
			 * Simulate this request as the customizer loading with the current theme in preview mode.
			 *
			 * See _wp_customize_include()
			 */
			$_REQUEST['wp_customize']    = 'on';
			$_REQUEST['customize_theme'] = ${U(r)} ?: get_stylesheet();

			/*
			 * Claim this is a ajax request saving settings, to avoid the preview filters being applied.
			 */
			$_REQUEST['action'] = 'customize_save';
			add_filter( 'wp_doing_ajax', '__return_true' );

			$_GET = $_REQUEST;
		}
		playground_add_filter( 'plugins_loaded', 'importThemeStarterContent_plugins_loaded', 0 );

		require ${U(a)} . '/wp-load.php';

		// Return early if there's no starter content.
		if ( ! get_theme_starter_content() ) {
			return;
		}

		// Import the Starter Content.
		$wp_customize->import_theme_starter_content();

		// Publish the changeset, which publishes the starter content.
		wp_publish_post( $wp_customize->changeset_post_id() );
		`})},Ie="/tmp/file.zip",kt=async(n,r,i,a=!0)=>{if(r instanceof File){const p=r;r=Ie,await n.writeFile(r,new Uint8Array(await p.arrayBuffer()))}const c=me({zipPath:r,extractToPath:i,overwriteFiles:a});await n.run({code:`<?php
        function unzip($zipPath, $extractTo, $overwriteFiles = true)
        {
            if (!is_dir($extractTo)) {
                mkdir($extractTo, 0777, true);
            }
            $zip = new ZipArchive;
            $res = $zip->open($zipPath);
            if ($res === TRUE) {
				for ($i = 0; $i < $zip->numFiles; $i++) {
					$filename = $zip->getNameIndex($i);
					$fileinfo = pathinfo($filename);
					$extractFilePath = rtrim($extractTo, '/') . '/' . $filename;
					// Check if file exists and $overwriteFiles is false
					if (!file_exists($extractFilePath) || $overwriteFiles) {
						// Extract file
						$zip->extractTo($extractTo, $filename);
					}
				}
				$zip->close();
				chmod($extractTo, 0777);
            } else {
                throw new Exception("Could not unzip file");
            }
        }
        unzip(${c.zipPath}, ${c.extractToPath}, ${c.overwriteFiles});
        `}),await n.fileExists(Ie)&&await n.unlink(Ie)},Ue=async(n,{zipFile:r,zipPath:i,extractToPath:a})=>{if(i)q.warn('The "zipPath" option of the unzip() Blueprint step is deprecated and will be removed. Use "zipFile" instead.');else if(!r)throw new Error("Either zipPath or zipFile must be provided");await kt(n,r||i,a)},Qn=async(n,{wordPressFilesZip:r,pathInZip:i=""})=>{const a=await n.documentRoot;let c=B("/tmp","import");await n.mkdir(c),await Ue(n,{zipFile:r,extractToPath:c}),c=B(c,i);const p=B(c,"wp-content"),f=B(a,"wp-content");for(const w of dt){const y=B(p,w);await Ke(n,y);const _=B(f,w);await n.fileExists(_)&&(await n.mkdir(pe(y)),await n.mv(_,y))}const u=B(c,"wp-content","database");await n.fileExists(u)||await n.mv(B(a,"wp-content","database"),u);const m=await n.listFiles(c);for(const w of m)await Ke(n,B(a,w)),await n.mv(B(c,w),B(a,w));await n.rmdir(c),await xt(n,{siteUrl:await n.absoluteUrl});const $=U(B(a,"wp-admin","upgrade.php"));await n.run({code:`<?php
            $_GET['step'] = 'upgrade_db';
            require ${$};
            `})};async function Ke(n,r){await n.fileExists(r)&&(await n.isDir(r)?await n.rmdir(r):await n.unlink(r))}async function Jn(n){const r=await n.request({url:"/wp-admin/export.php?download=true&content=all"});return new File([r.bytes],"export.xml")}async function Ft(n,{targetPath:r,zipFile:i,ifAlreadyInstalled:a="overwrite",targetFolderName:c=""}){const f=i.name.replace(/\.zip$/,""),u=B(await n.documentRoot,"wp-content"),m=B(u,it()),$=B(m,"assets",f);await n.fileExists($)&&await n.rmdir(m,{recursive:!0}),await n.mkdir(m);try{await Ue(n,{zipFile:i,extractToPath:$});let w=await n.listFiles($,{prependPath:!0});w=w.filter(G=>!G.endsWith("/__MACOSX"));const y=w.length===1&&await n.isDir(w[0]);let _,b="";y?(b=w[0],_=w[0].split("/").pop()):(b=$,_=f),c&&c.length&&(_=c);const S=`${r}/${_}`;if(await n.fileExists(S)){if(!await n.isDir(S))throw new Error(`Cannot install asset ${_} to ${S} because a file with the same name already exists. Note it's a file, not a directory! Is this by mistake?`);if(a==="overwrite")await n.rmdir(S,{recursive:!0});else{if(a==="skip")return{assetFolderPath:S,assetFolderName:_};throw new Error(`Cannot install asset ${_} to ${r} because it already exists and the ifAlreadyInstalled option was set to ${a}`)}}return await n.mv(b,S),{assetFolderPath:S,assetFolderName:_}}finally{await n.rmdir(m,{recursive:!0})}}function Tt(n){const r=n.split(".").shift().replace(/-/g," ");return r.charAt(0).toUpperCase()+r.slice(1).toLowerCase()}const Yn=async(n,{pluginData:r,pluginZipFile:i,ifAlreadyInstalled:a,options:c={}},p)=>{i&&(r=i,q.warn('The "pluginZipFile" option is deprecated. Use "pluginData" instead.'));const f="targetFolderName"in c?c.targetFolderName:"";let u="",m="";if(r instanceof File){const w=r.name.split("/").pop()||"plugin.zip";m=Tt(w),p?.tracker.setCaption(`Installing the ${m} plugin`);const y=await Ft(n,{ifAlreadyInstalled:a,zipFile:r,targetPath:`${await n.documentRoot}/wp-content/plugins`,targetFolderName:f});u=y.assetFolderPath,m=y.assetFolderName}else if(r){m=r.name,p?.tracker.setCaption(`Installing the ${m} plugin`);const w=B(await n.documentRoot,"wp-content","plugins",f||r.name);await ye(n,w,r.files,{rmRoot:!0}),u=w}("activate"in c?c.activate:!0)&&await ht(n,{pluginPath:u,pluginName:m},p)},Xn=async(n,{themeData:r,themeZipFile:i,ifAlreadyInstalled:a,options:c={}},p)=>{i&&(r=i,q.warn('The "themeZipFile" option is deprecated. Use "themeData" instead.'));const f="targetFolderName"in c?c.targetFolderName:"";let u="",m="";if(r instanceof File){const y=r.name.split("/").pop()||"theme.zip";m=Tt(y),p?.tracker.setCaption(`Installing the ${m} theme`),u=(await Ft(n,{ifAlreadyInstalled:a,zipFile:r,targetPath:`${await n.documentRoot}/wp-content/themes`,targetFolderName:f})).assetFolderName}else{m=r.name,u=f||m,p?.tracker.setCaption(`Installing the ${m} theme`);const y=B(await n.documentRoot,"wp-content","themes",u);await ye(n,y,r.files,{rmRoot:!0})}("activate"in c?c.activate:!0)&&await wt(n,{themeFolderName:u},p),("importStarterContent"in c?c.importStarterContent:!1)&&await bt(n,{themeSlug:u},p)},Zn=async(n,{username:r="admin"}={},i)=>{i?.tracker.setCaption(i?.initialCaption||"Logging in"),n.defineConstant("PLAYGROUND_AUTO_LOGIN_AS_USER",r)},Kn=async(n,r,i)=>{i?.tracker?.setCaption("Resetting WordPress data");const a=await n.documentRoot;await n.run({env:{DOCROOT:a},code:`<?php
		require getenv('DOCROOT') . '/wp-load.php';

		$GLOBALS['@pdo']->query('DELETE FROM wp_posts WHERE id > 0');
		$GLOBALS['@pdo']->query("UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='wp_posts'");
		
		$GLOBALS['@pdo']->query('DELETE FROM wp_postmeta WHERE post_id > 1');
		$GLOBALS['@pdo']->query("UPDATE SQLITE_SEQUENCE SET SEQ=20 WHERE NAME='wp_postmeta'");

		$GLOBALS['@pdo']->query('DELETE FROM wp_comments');
		$GLOBALS['@pdo']->query("UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='wp_comments'");

		$GLOBALS['@pdo']->query('DELETE FROM wp_commentmeta');
		$GLOBALS['@pdo']->query("UPDATE SQLITE_SEQUENCE SET SEQ=0 WHERE NAME='wp_commentmeta'");
		`})},er=async(n,{options:r})=>{await n.request({url:"/wp-admin/install.php?step=2",method:"POST",body:{language:"en",prefix:"wp_",weblog_title:"My WordPress Website",user_name:r.adminPassword||"admin",admin_password:r.adminPassword||"password",admin_password2:r.adminPassword||"password",Submit:"Install WordPress",pw_weak:"1",admin_email:"admin@localhost.com"}})},tr=async(n,{selfContained:r=!1}={})=>{const i="/tmp/wordpress-playground.zip",a=await n.documentRoot,c=B(a,"wp-content");let p=dt;r&&(p=p.filter(m=>!m.startsWith("themes/twenty")).filter(m=>m!=="mu-plugins/sqlite-database-integration"));const f=me({zipPath:i,wpContentPath:c,documentRoot:a,exceptPaths:p.map(m=>B(a,"wp-content",m)),additionalPaths:r?{[B(a,"wp-config.php")]:"wp-config.php"}:{}});await rr(n,`zipDir(${f.wpContentPath}, ${f.zipPath}, array(
			'exclude_paths' => ${f.exceptPaths},
			'zip_root'      => ${f.documentRoot},
			'additional_paths' => ${f.additionalPaths}
		));`);const u=await n.readFileAsBuffer(i);return n.unlink(i),u},nr=`<?php

function zipDir($root, $output, $options = array())
{
    $root = rtrim($root, '/');
    $additionalPaths = array_key_exists('additional_paths', $options) ? $options['additional_paths'] : array();
    $excludePaths = array_key_exists('exclude_paths', $options) ? $options['exclude_paths'] : array();
    $zip_root = array_key_exists('zip_root', $options) ? $options['zip_root'] : $root;

    $zip = new ZipArchive;
    $res = $zip->open($output, ZipArchive::CREATE);
    if ($res === TRUE) {
        $directories = array(
            $root . '/'
        );
        while (sizeof($directories)) {
            $current_dir = array_pop($directories);

            if ($handle = opendir($current_dir)) {
                while (false !== ($entry = readdir($handle))) {
                    if ($entry == '.' || $entry == '..') {
                        continue;
                    }

                    $entry = join_paths($current_dir, $entry);
                    if (in_array($entry, $excludePaths)) {
                        continue;
                    }

                    if (is_dir($entry)) {
                        $directory_path = $entry . '/';
                        array_push($directories, $directory_path);
                    } else if (is_file($entry)) {
                        $zip->addFile($entry, substr($entry, strlen($zip_root)));
                    }
                }
                closedir($handle);
            }
        }
        foreach ($additionalPaths as $disk_path => $zip_path) {
            $zip->addFile($disk_path, $zip_path);
        }
        $zip->close();
        chmod($output, 0777);
    }
}

function join_paths()
{
    $paths = array();

    foreach (func_get_args() as $arg) {
        if ($arg !== '') {
            $paths[] = $arg;
        }
    }

    return preg_replace('#/+#', '/', join('/', $paths));
}
`;async function rr(n,r){return await n.run({code:nr+r})}const ir=async(n,{language:r},i)=>{i?.tracker.setCaption(i?.initialCaption||"Translating"),await n.defineConstant("WPLANG",r);const a=await n.documentRoot,p=[{url:`https://downloads.wordpress.org/translation/core/${(await n.run({code:`<?php
			require '${a}/wp-includes/version.php';
			echo $wp_version;
		`})).text}/${r}.zip`,type:"core"}],u=(await n.run({code:`<?php
		require_once('${a}/wp-load.php');
		require_once('${a}/wp-admin/includes/plugin.php');
		echo json_encode(
			array_values(
				array_map(
					function($plugin) {
						return [
							'slug'    => $plugin['TextDomain'],
							'version' => $plugin['Version']
						];
					},
					array_filter(
						get_plugins(),
						function($plugin) {
							return !empty($plugin['TextDomain']);
						}
					)
				)
			)
		);`})).json;for(const{slug:w,version:y}of u)p.push({url:`https://downloads.wordpress.org/translation/plugin/${w}/${y}/${r}.zip`,type:"plugin"});const $=(await n.run({code:`<?php
		require_once('${a}/wp-load.php');
		require_once('${a}/wp-admin/includes/theme.php');
		echo json_encode(
			array_values(
				array_map(
					function($theme) {
						return [
							'slug'    => $theme->get('TextDomain'),
							'version' => $theme->get('Version')
						];
					},
					wp_get_themes()
				)
			)
		);`})).json;for(const{slug:w,version:y}of $)p.push({url:`https://downloads.wordpress.org/translation/theme/${w}/${y}/${r}.zip`,type:"theme"});await n.isDir(`${a}/wp-content/languages/plugins`)||await n.mkdir(`${a}/wp-content/languages/plugins`),await n.isDir(`${a}/wp-content/languages/themes`)||await n.mkdir(`${a}/wp-content/languages/themes`);for(const{url:w,type:y}of p)try{const _=await fetch(w);if(!_.ok)throw new Error(`Failed to download translations for ${y}: ${_.statusText}`);let b=`${a}/wp-content/languages`;y==="plugin"?b+="/plugins":y==="theme"&&(b+="/themes"),await kt(n,new File([await _.blob()],`${r}-${y}.zip`),b)}catch(_){if(y==="core")throw new Error(`Failed to download translations for WordPress. Please check if the language code ${r} is correct. You can find all available languages and translations on https://translate.wordpress.org/.`);q.warn(`Error downloading translations for ${y}: ${_}`)}},or=Object.freeze(Object.defineProperty({__proto__:null,activatePlugin:ht,activateTheme:wt,cp:zn,defineSiteUrl:xt,defineWpConfigConsts:$e,enableMultisite:Wn,exportWXR:Jn,importThemeStarterContent:bt,importWordPressFiles:Qn,importWxr:Vn,installPlugin:Yn,installTheme:Xn,login:Zn,mkdir:qn,mv:Gn,request:Un,resetData:Kn,rm:mt,rmdir:Hn,runPHP:Pn,runPHPWithOptions:Sn,runSql:vn,runWpInstallationWizard:er,setSiteLanguage:ir,setSiteOptions:yt,unzip:Ue,updateUserMeta:Mn,wpCLI:Et,writeFile:_t,writeFiles:jn,zipWpContent:tr},Symbol.toStringTag,{value:"Module"}));class Le extends Error{constructor(r){super(r),this.caller=""}toJSON(){return{code:this.code,data:this.data,caller:this.caller,message:this.message,stack:this.stack}}fromJSON(r){const i=new Le(r.message);return i.code=r.code,i.data=r.data,i.caller=r.caller,i.stack=r.stack,i}get isIsomorphicGitError(){return!0}}var sr={};/*! crc32.js (C) 2014-present SheetJS -- http://sheetjs.com */(function(n){(function(r){r(typeof DO_NOT_EXPORT_CRC>"u"?n:{})})(function(r){r.version="1.2.2";function i(){for(var g=0,v=new Array(256),E=0;E!=256;++E)g=E,g=g&1?-306674912^g>>>1:g>>>1,g=g&1?-306674912^g>>>1:g>>>1,g=g&1?-306674912^g>>>1:g>>>1,g=g&1?-306674912^g>>>1:g>>>1,g=g&1?-306674912^g>>>1:g>>>1,g=g&1?-306674912^g>>>1:g>>>1,g=g&1?-306674912^g>>>1:g>>>1,g=g&1?-306674912^g>>>1:g>>>1,v[E]=g;return typeof Int32Array<"u"?new Int32Array(v):v}var a=i();function c(g){var v=0,E=0,k=0,F=typeof Int32Array<"u"?new Int32Array(4096):new Array(4096);for(k=0;k!=256;++k)F[k]=g[k];for(k=0;k!=256;++k)for(E=g[k],v=256+k;v<4096;v+=256)E=F[v]=E>>>8^g[E&255];var R=[];for(k=1;k!=16;++k)R[k-1]=typeof Int32Array<"u"?F.subarray(k*256,k*256+256):F.slice(k*256,k*256+256);return R}var p=c(a),f=p[0],u=p[1],m=p[2],$=p[3],w=p[4],y=p[5],_=p[6],b=p[7],S=p[8],G=p[9],_e=p[10],ne=p[11],xe=p[12],ie=p[13],be=p[14];function V(g,v){for(var E=v^-1,k=0,F=g.length;k<F;)E=E>>>8^a[(E^g.charCodeAt(k++))&255];return~E}function oe(g,v){for(var E=v^-1,k=g.length-15,F=0;F<k;)E=be[g[F++]^E&255]^ie[g[F++]^E>>8&255]^xe[g[F++]^E>>16&255]^ne[g[F++]^E>>>24]^_e[g[F++]]^G[g[F++]]^S[g[F++]]^b[g[F++]]^_[g[F++]]^y[g[F++]]^w[g[F++]]^$[g[F++]]^m[g[F++]]^u[g[F++]]^f[g[F++]]^a[g[F++]];for(k+=15;F<k;)E=E>>>8^a[(E^g[F++])&255];return~E}function se(g,v){for(var E=v^-1,k=0,F=g.length,R=0,Y=0;k<F;)R=g.charCodeAt(k++),R<128?E=E>>>8^a[(E^R)&255]:R<2048?(E=E>>>8^a[(E^(192|R>>6&31))&255],E=E>>>8^a[(E^(128|R&63))&255]):R>=55296&&R<57344?(R=(R&1023)+64,Y=g.charCodeAt(k++)&1023,E=E>>>8^a[(E^(240|R>>8&7))&255],E=E>>>8^a[(E^(128|R>>2&63))&255],E=E>>>8^a[(E^(128|Y>>6&15|(R&3)<<4))&255],E=E>>>8^a[(E^(128|Y&63))&255]):(E=E>>>8^a[(E^(224|R>>12&15))&255],E=E>>>8^a[(E^(128|R>>6&63))&255],E=E>>>8^a[(E^(128|R&63))&255]);return~E}r.table=a,r.bstr=V,r.buf=oe,r.str=se})})(sr);var Bt={},Ee={};Ee.byteLength=ur;Ee.toByteArray=pr;Ee.fromByteArray=hr;var j=[],M=[],ar=typeof Uint8Array<"u"?Uint8Array:Array,Ae="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(var K=0,cr=Ae.length;K<cr;++K)j[K]=Ae[K],M[Ae.charCodeAt(K)]=K;M["-".charCodeAt(0)]=62;M["_".charCodeAt(0)]=63;function It(n){var r=n.length;if(r%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var i=n.indexOf("=");i===-1&&(i=r);var a=i===r?0:4-i%4;return[i,a]}function ur(n){var r=It(n),i=r[0],a=r[1];return(i+a)*3/4-a}function lr(n,r,i){return(r+i)*3/4-i}function pr(n){var r,i=It(n),a=i[0],c=i[1],p=new ar(lr(n,a,c)),f=0,u=c>0?a-4:a,m;for(m=0;m<u;m+=4)r=M[n.charCodeAt(m)]<<18|M[n.charCodeAt(m+1)]<<12|M[n.charCodeAt(m+2)]<<6|M[n.charCodeAt(m+3)],p[f++]=r>>16&255,p[f++]=r>>8&255,p[f++]=r&255;return c===2&&(r=M[n.charCodeAt(m)]<<2|M[n.charCodeAt(m+1)]>>4,p[f++]=r&255),c===1&&(r=M[n.charCodeAt(m)]<<10|M[n.charCodeAt(m+1)]<<4|M[n.charCodeAt(m+2)]>>2,p[f++]=r>>8&255,p[f++]=r&255),p}function fr(n){return j[n>>18&63]+j[n>>12&63]+j[n>>6&63]+j[n&63]}function dr(n,r,i){for(var a,c=[],p=r;p<i;p+=3)a=(n[p]<<16&16711680)+(n[p+1]<<8&65280)+(n[p+2]&255),c.push(fr(a));return c.join("")}function hr(n){for(var r,i=n.length,a=i%3,c=[],p=16383,f=0,u=i-a;f<u;f+=p)c.push(dr(n,f,f+p>u?u:f+p));return a===1?(r=n[i-1],c.push(j[r>>2]+j[r<<4&63]+"==")):a===2&&(r=(n[i-2]<<8)+n[i-1],c.push(j[r>>10]+j[r>>4&63]+j[r<<2&63]+"=")),c.join("")}var Ne={};/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */Ne.read=function(n,r,i,a,c){var p,f,u=c*8-a-1,m=(1<<u)-1,$=m>>1,w=-7,y=i?c-1:0,_=i?-1:1,b=n[r+y];for(y+=_,p=b&(1<<-w)-1,b>>=-w,w+=u;w>0;p=p*256+n[r+y],y+=_,w-=8);for(f=p&(1<<-w)-1,p>>=-w,w+=a;w>0;f=f*256+n[r+y],y+=_,w-=8);if(p===0)p=1-$;else{if(p===m)return f?NaN:(b?-1:1)*(1/0);f=f+Math.pow(2,a),p=p-$}return(b?-1:1)*f*Math.pow(2,p-a)};Ne.write=function(n,r,i,a,c,p){var f,u,m,$=p*8-c-1,w=(1<<$)-1,y=w>>1,_=c===23?Math.pow(2,-24)-Math.pow(2,-77):0,b=a?0:p-1,S=a?1:-1,G=r<0||r===0&&1/r<0?1:0;for(r=Math.abs(r),isNaN(r)||r===1/0?(u=isNaN(r)?1:0,f=w):(f=Math.floor(Math.log(r)/Math.LN2),r*(m=Math.pow(2,-f))<1&&(f--,m*=2),f+y>=1?r+=_/m:r+=_*Math.pow(2,1-y),r*m>=2&&(f++,m/=2),f+y>=w?(u=0,f=w):f+y>=1?(u=(r*m-1)*Math.pow(2,c),f=f+y):(u=r*Math.pow(2,y-1)*Math.pow(2,c),f=0));c>=8;n[i+b]=u&255,b+=S,u/=256,c-=8);for(f=f<<c|u,$+=c;$>0;n[i+b]=f&255,b+=S,f/=256,$-=8);n[i+b-S]|=G*128};/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */(function(n){const r=Ee,i=Ne,a=typeof Symbol=="function"&&typeof Symbol.for=="function"?Symbol.for("nodejs.util.inspect.custom"):null;n.Buffer=u,n.SlowBuffer=xe,n.INSPECT_MAX_BYTES=50;const c=2147483647;n.kMaxLength=c,u.TYPED_ARRAY_SUPPORT=p(),!u.TYPED_ARRAY_SUPPORT&&typeof console<"u"&&typeof console.error=="function"&&console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");function p(){try{const o=new Uint8Array(1),e={foo:function(){return 42}};return Object.setPrototypeOf(e,Uint8Array.prototype),Object.setPrototypeOf(o,e),o.foo()===42}catch{return!1}}Object.defineProperty(u.prototype,"parent",{enumerable:!0,get:function(){if(u.isBuffer(this))return this.buffer}}),Object.defineProperty(u.prototype,"offset",{enumerable:!0,get:function(){if(u.isBuffer(this))return this.byteOffset}});function f(o){if(o>c)throw new RangeError('The value "'+o+'" is invalid for option "size"');const e=new Uint8Array(o);return Object.setPrototypeOf(e,u.prototype),e}function u(o,e,t){if(typeof o=="number"){if(typeof e=="string")throw new TypeError('The "string" argument must be of type string. Received type number');return y(o)}return m(o,e,t)}u.poolSize=8192;function m(o,e,t){if(typeof o=="string")return _(o,e);if(ArrayBuffer.isView(o))return S(o);if(o==null)throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof o);if(H(o,ArrayBuffer)||o&&H(o.buffer,ArrayBuffer)||typeof SharedArrayBuffer<"u"&&(H(o,SharedArrayBuffer)||o&&H(o.buffer,SharedArrayBuffer)))return G(o,e,t);if(typeof o=="number")throw new TypeError('The "value" argument must not be of type number. Received type number');const s=o.valueOf&&o.valueOf();if(s!=null&&s!==o)return u.from(s,e,t);const l=_e(o);if(l)return l;if(typeof Symbol<"u"&&Symbol.toPrimitive!=null&&typeof o[Symbol.toPrimitive]=="function")return u.from(o[Symbol.toPrimitive]("string"),e,t);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof o)}u.from=function(o,e,t){return m(o,e,t)},Object.setPrototypeOf(u.prototype,Uint8Array.prototype),Object.setPrototypeOf(u,Uint8Array);function $(o){if(typeof o!="number")throw new TypeError('"size" argument must be of type number');if(o<0)throw new RangeError('The value "'+o+'" is invalid for option "size"')}function w(o,e,t){return $(o),o<=0?f(o):e!==void 0?typeof t=="string"?f(o).fill(e,t):f(o).fill(e):f(o)}u.alloc=function(o,e,t){return w(o,e,t)};function y(o){return $(o),f(o<0?0:ne(o)|0)}u.allocUnsafe=function(o){return y(o)},u.allocUnsafeSlow=function(o){return y(o)};function _(o,e){if((typeof e!="string"||e==="")&&(e="utf8"),!u.isEncoding(e))throw new TypeError("Unknown encoding: "+e);const t=ie(o,e)|0;let s=f(t);const l=s.write(o,e);return l!==t&&(s=s.slice(0,l)),s}function b(o){const e=o.length<0?0:ne(o.length)|0,t=f(e);for(let s=0;s<e;s+=1)t[s]=o[s]&255;return t}function S(o){if(H(o,Uint8Array)){const e=new Uint8Array(o);return G(e.buffer,e.byteOffset,e.byteLength)}return b(o)}function G(o,e,t){if(e<0||o.byteLength<e)throw new RangeError('"offset" is outside of buffer bounds');if(o.byteLength<e+(t||0))throw new RangeError('"length" is outside of buffer bounds');let s;return e===void 0&&t===void 0?s=new Uint8Array(o):t===void 0?s=new Uint8Array(o,e):s=new Uint8Array(o,e,t),Object.setPrototypeOf(s,u.prototype),s}function _e(o){if(u.isBuffer(o)){const e=ne(o.length)|0,t=f(e);return t.length===0||o.copy(t,0,0,e),t}if(o.length!==void 0)return typeof o.length!="number"||Te(o.length)?f(0):b(o);if(o.type==="Buffer"&&Array.isArray(o.data))return b(o.data)}function ne(o){if(o>=c)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+c.toString(16)+" bytes");return o|0}function xe(o){return+o!=o&&(o=0),u.alloc(+o)}u.isBuffer=function(e){return e!=null&&e._isBuffer===!0&&e!==u.prototype},u.compare=function(e,t){if(H(e,Uint8Array)&&(e=u.from(e,e.offset,e.byteLength)),H(t,Uint8Array)&&(t=u.from(t,t.offset,t.byteLength)),!u.isBuffer(e)||!u.isBuffer(t))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(e===t)return 0;let s=e.length,l=t.length;for(let d=0,h=Math.min(s,l);d<h;++d)if(e[d]!==t[d]){s=e[d],l=t[d];break}return s<l?-1:l<s?1:0},u.isEncoding=function(e){switch(String(e).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},u.concat=function(e,t){if(!Array.isArray(e))throw new TypeError('"list" argument must be an Array of Buffers');if(e.length===0)return u.alloc(0);let s;if(t===void 0)for(t=0,s=0;s<e.length;++s)t+=e[s].length;const l=u.allocUnsafe(t);let d=0;for(s=0;s<e.length;++s){let h=e[s];if(H(h,Uint8Array))d+h.length>l.length?(u.isBuffer(h)||(h=u.from(h)),h.copy(l,d)):Uint8Array.prototype.set.call(l,h,d);else if(u.isBuffer(h))h.copy(l,d);else throw new TypeError('"list" argument must be an Array of Buffers');d+=h.length}return l};function ie(o,e){if(u.isBuffer(o))return o.length;if(ArrayBuffer.isView(o)||H(o,ArrayBuffer))return o.byteLength;if(typeof o!="string")throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof o);const t=o.length,s=arguments.length>2&&arguments[2]===!0;if(!s&&t===0)return 0;let l=!1;for(;;)switch(e){case"ascii":case"latin1":case"binary":return t;case"utf8":case"utf-8":return Fe(o).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return t*2;case"hex":return t>>>1;case"base64":return Ve(o).length;default:if(l)return s?-1:Fe(o).length;e=(""+e).toLowerCase(),l=!0}}u.byteLength=ie;function be(o,e,t){let s=!1;if((e===void 0||e<0)&&(e=0),e>this.length||((t===void 0||t>this.length)&&(t=this.length),t<=0)||(t>>>=0,e>>>=0,t<=e))return"";for(o||(o="utf8");;)switch(o){case"hex":return St(this,e,t);case"utf8":case"utf-8":return Y(this,e,t);case"ascii":return Rt(this,e,t);case"latin1":case"binary":return Pt(this,e,t);case"base64":return R(this,e,t);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return vt(this,e,t);default:if(s)throw new TypeError("Unknown encoding: "+o);o=(o+"").toLowerCase(),s=!0}}u.prototype._isBuffer=!0;function V(o,e,t){const s=o[e];o[e]=o[t],o[t]=s}u.prototype.swap16=function(){const e=this.length;if(e%2!==0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(let t=0;t<e;t+=2)V(this,t,t+1);return this},u.prototype.swap32=function(){const e=this.length;if(e%4!==0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(let t=0;t<e;t+=4)V(this,t,t+3),V(this,t+1,t+2);return this},u.prototype.swap64=function(){const e=this.length;if(e%8!==0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(let t=0;t<e;t+=8)V(this,t,t+7),V(this,t+1,t+6),V(this,t+2,t+5),V(this,t+3,t+4);return this},u.prototype.toString=function(){const e=this.length;return e===0?"":arguments.length===0?Y(this,0,e):be.apply(this,arguments)},u.prototype.toLocaleString=u.prototype.toString,u.prototype.equals=function(e){if(!u.isBuffer(e))throw new TypeError("Argument must be a Buffer");return this===e?!0:u.compare(this,e)===0},u.prototype.inspect=function(){let e="";const t=n.INSPECT_MAX_BYTES;return e=this.toString("hex",0,t).replace(/(.{2})/g,"$1 ").trim(),this.length>t&&(e+=" ... "),"<Buffer "+e+">"},a&&(u.prototype[a]=u.prototype.inspect),u.prototype.compare=function(e,t,s,l,d){if(H(e,Uint8Array)&&(e=u.from(e,e.offset,e.byteLength)),!u.isBuffer(e))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof e);if(t===void 0&&(t=0),s===void 0&&(s=e?e.length:0),l===void 0&&(l=0),d===void 0&&(d=this.length),t<0||s>e.length||l<0||d>this.length)throw new RangeError("out of range index");if(l>=d&&t>=s)return 0;if(l>=d)return-1;if(t>=s)return 1;if(t>>>=0,s>>>=0,l>>>=0,d>>>=0,this===e)return 0;let h=d-l,x=s-t;const A=Math.min(h,x),I=this.slice(l,d),C=e.slice(t,s);for(let T=0;T<A;++T)if(I[T]!==C[T]){h=I[T],x=C[T];break}return h<x?-1:x<h?1:0};function oe(o,e,t,s,l){if(o.length===0)return-1;if(typeof t=="string"?(s=t,t=0):t>2147483647?t=2147483647:t<-2147483648&&(t=-2147483648),t=+t,Te(t)&&(t=l?0:o.length-1),t<0&&(t=o.length+t),t>=o.length){if(l)return-1;t=o.length-1}else if(t<0)if(l)t=0;else return-1;if(typeof e=="string"&&(e=u.from(e,s)),u.isBuffer(e))return e.length===0?-1:se(o,e,t,s,l);if(typeof e=="number")return e=e&255,typeof Uint8Array.prototype.indexOf=="function"?l?Uint8Array.prototype.indexOf.call(o,e,t):Uint8Array.prototype.lastIndexOf.call(o,e,t):se(o,[e],t,s,l);throw new TypeError("val must be string, number or Buffer")}function se(o,e,t,s,l){let d=1,h=o.length,x=e.length;if(s!==void 0&&(s=String(s).toLowerCase(),s==="ucs2"||s==="ucs-2"||s==="utf16le"||s==="utf-16le")){if(o.length<2||e.length<2)return-1;d=2,h/=2,x/=2,t/=2}function A(C,T){return d===1?C[T]:C.readUInt16BE(T*d)}let I;if(l){let C=-1;for(I=t;I<h;I++)if(A(o,I)===A(e,C===-1?0:I-C)){if(C===-1&&(C=I),I-C+1===x)return C*d}else C!==-1&&(I-=I-C),C=-1}else for(t+x>h&&(t=h-x),I=t;I>=0;I--){let C=!0;for(let T=0;T<x;T++)if(A(o,I+T)!==A(e,T)){C=!1;break}if(C)return I}return-1}u.prototype.includes=function(e,t,s){return this.indexOf(e,t,s)!==-1},u.prototype.indexOf=function(e,t,s){return oe(this,e,t,s,!0)},u.prototype.lastIndexOf=function(e,t,s){return oe(this,e,t,s,!1)};function g(o,e,t,s){t=Number(t)||0;const l=o.length-t;s?(s=Number(s),s>l&&(s=l)):s=l;const d=e.length;s>d/2&&(s=d/2);let h;for(h=0;h<s;++h){const x=parseInt(e.substr(h*2,2),16);if(Te(x))return h;o[t+h]=x}return h}function v(o,e,t,s){return ae(Fe(e,o.length-t),o,t,s)}function E(o,e,t,s){return ae(Ot(e),o,t,s)}function k(o,e,t,s){return ae(Ve(e),o,t,s)}function F(o,e,t,s){return ae(Mt(e,o.length-t),o,t,s)}u.prototype.write=function(e,t,s,l){if(t===void 0)l="utf8",s=this.length,t=0;else if(s===void 0&&typeof t=="string")l=t,s=this.length,t=0;else if(isFinite(t))t=t>>>0,isFinite(s)?(s=s>>>0,l===void 0&&(l="utf8")):(l=s,s=void 0);else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");const d=this.length-t;if((s===void 0||s>d)&&(s=d),e.length>0&&(s<0||t<0)||t>this.length)throw new RangeError("Attempt to write outside buffer bounds");l||(l="utf8");let h=!1;for(;;)switch(l){case"hex":return g(this,e,t,s);case"utf8":case"utf-8":return v(this,e,t,s);case"ascii":case"latin1":case"binary":return E(this,e,t,s);case"base64":return k(this,e,t,s);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return F(this,e,t,s);default:if(h)throw new TypeError("Unknown encoding: "+l);l=(""+l).toLowerCase(),h=!0}},u.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};function R(o,e,t){return e===0&&t===o.length?r.fromByteArray(o):r.fromByteArray(o.slice(e,t))}function Y(o,e,t){t=Math.min(o.length,t);const s=[];let l=e;for(;l<t;){const d=o[l];let h=null,x=d>239?4:d>223?3:d>191?2:1;if(l+x<=t){let A,I,C,T;switch(x){case 1:d<128&&(h=d);break;case 2:A=o[l+1],(A&192)===128&&(T=(d&31)<<6|A&63,T>127&&(h=T));break;case 3:A=o[l+1],I=o[l+2],(A&192)===128&&(I&192)===128&&(T=(d&15)<<12|(A&63)<<6|I&63,T>2047&&(T<55296||T>57343)&&(h=T));break;case 4:A=o[l+1],I=o[l+2],C=o[l+3],(A&192)===128&&(I&192)===128&&(C&192)===128&&(T=(d&15)<<18|(A&63)<<12|(I&63)<<6|C&63,T>65535&&T<1114112&&(h=T))}}h===null?(h=65533,x=1):h>65535&&(h-=65536,s.push(h>>>10&1023|55296),h=56320|h&1023),s.push(h),l+=x}return Ct(s)}const Me=4096;function Ct(o){const e=o.length;if(e<=Me)return String.fromCharCode.apply(String,o);let t="",s=0;for(;s<e;)t+=String.fromCharCode.apply(String,o.slice(s,s+=Me));return t}function Rt(o,e,t){let s="";t=Math.min(o.length,t);for(let l=e;l<t;++l)s+=String.fromCharCode(o[l]&127);return s}function Pt(o,e,t){let s="";t=Math.min(o.length,t);for(let l=e;l<t;++l)s+=String.fromCharCode(o[l]);return s}function St(o,e,t){const s=o.length;(!e||e<0)&&(e=0),(!t||t<0||t>s)&&(t=s);let l="";for(let d=e;d<t;++d)l+=Dt[o[d]];return l}function vt(o,e,t){const s=o.slice(e,t);let l="";for(let d=0;d<s.length-1;d+=2)l+=String.fromCharCode(s[d]+s[d+1]*256);return l}u.prototype.slice=function(e,t){const s=this.length;e=~~e,t=t===void 0?s:~~t,e<0?(e+=s,e<0&&(e=0)):e>s&&(e=s),t<0?(t+=s,t<0&&(t=0)):t>s&&(t=s),t<e&&(t=e);const l=this.subarray(e,t);return Object.setPrototypeOf(l,u.prototype),l};function P(o,e,t){if(o%1!==0||o<0)throw new RangeError("offset is not uint");if(o+e>t)throw new RangeError("Trying to access beyond buffer length")}u.prototype.readUintLE=u.prototype.readUIntLE=function(e,t,s){e=e>>>0,t=t>>>0,s||P(e,t,this.length);let l=this[e],d=1,h=0;for(;++h<t&&(d*=256);)l+=this[e+h]*d;return l},u.prototype.readUintBE=u.prototype.readUIntBE=function(e,t,s){e=e>>>0,t=t>>>0,s||P(e,t,this.length);let l=this[e+--t],d=1;for(;t>0&&(d*=256);)l+=this[e+--t]*d;return l},u.prototype.readUint8=u.prototype.readUInt8=function(e,t){return e=e>>>0,t||P(e,1,this.length),this[e]},u.prototype.readUint16LE=u.prototype.readUInt16LE=function(e,t){return e=e>>>0,t||P(e,2,this.length),this[e]|this[e+1]<<8},u.prototype.readUint16BE=u.prototype.readUInt16BE=function(e,t){return e=e>>>0,t||P(e,2,this.length),this[e]<<8|this[e+1]},u.prototype.readUint32LE=u.prototype.readUInt32LE=function(e,t){return e=e>>>0,t||P(e,4,this.length),(this[e]|this[e+1]<<8|this[e+2]<<16)+this[e+3]*16777216},u.prototype.readUint32BE=u.prototype.readUInt32BE=function(e,t){return e=e>>>0,t||P(e,4,this.length),this[e]*16777216+(this[e+1]<<16|this[e+2]<<8|this[e+3])},u.prototype.readBigUInt64LE=Q(function(e){e=e>>>0,Z(e,"offset");const t=this[e],s=this[e+7];(t===void 0||s===void 0)&&re(e,this.length-8);const l=t+this[++e]*2**8+this[++e]*2**16+this[++e]*2**24,d=this[++e]+this[++e]*2**8+this[++e]*2**16+s*2**24;return BigInt(l)+(BigInt(d)<<BigInt(32))}),u.prototype.readBigUInt64BE=Q(function(e){e=e>>>0,Z(e,"offset");const t=this[e],s=this[e+7];(t===void 0||s===void 0)&&re(e,this.length-8);const l=t*2**24+this[++e]*2**16+this[++e]*2**8+this[++e],d=this[++e]*2**24+this[++e]*2**16+this[++e]*2**8+s;return(BigInt(l)<<BigInt(32))+BigInt(d)}),u.prototype.readIntLE=function(e,t,s){e=e>>>0,t=t>>>0,s||P(e,t,this.length);let l=this[e],d=1,h=0;for(;++h<t&&(d*=256);)l+=this[e+h]*d;return d*=128,l>=d&&(l-=Math.pow(2,8*t)),l},u.prototype.readIntBE=function(e,t,s){e=e>>>0,t=t>>>0,s||P(e,t,this.length);let l=t,d=1,h=this[e+--l];for(;l>0&&(d*=256);)h+=this[e+--l]*d;return d*=128,h>=d&&(h-=Math.pow(2,8*t)),h},u.prototype.readInt8=function(e,t){return e=e>>>0,t||P(e,1,this.length),this[e]&128?(255-this[e]+1)*-1:this[e]},u.prototype.readInt16LE=function(e,t){e=e>>>0,t||P(e,2,this.length);const s=this[e]|this[e+1]<<8;return s&32768?s|4294901760:s},u.prototype.readInt16BE=function(e,t){e=e>>>0,t||P(e,2,this.length);const s=this[e+1]|this[e]<<8;return s&32768?s|4294901760:s},u.prototype.readInt32LE=function(e,t){return e=e>>>0,t||P(e,4,this.length),this[e]|this[e+1]<<8|this[e+2]<<16|this[e+3]<<24},u.prototype.readInt32BE=function(e,t){return e=e>>>0,t||P(e,4,this.length),this[e]<<24|this[e+1]<<16|this[e+2]<<8|this[e+3]},u.prototype.readBigInt64LE=Q(function(e){e=e>>>0,Z(e,"offset");const t=this[e],s=this[e+7];(t===void 0||s===void 0)&&re(e,this.length-8);const l=this[e+4]+this[e+5]*2**8+this[e+6]*2**16+(s<<24);return(BigInt(l)<<BigInt(32))+BigInt(t+this[++e]*2**8+this[++e]*2**16+this[++e]*2**24)}),u.prototype.readBigInt64BE=Q(function(e){e=e>>>0,Z(e,"offset");const t=this[e],s=this[e+7];(t===void 0||s===void 0)&&re(e,this.length-8);const l=(t<<24)+this[++e]*2**16+this[++e]*2**8+this[++e];return(BigInt(l)<<BigInt(32))+BigInt(this[++e]*2**24+this[++e]*2**16+this[++e]*2**8+s)}),u.prototype.readFloatLE=function(e,t){return e=e>>>0,t||P(e,4,this.length),i.read(this,e,!0,23,4)},u.prototype.readFloatBE=function(e,t){return e=e>>>0,t||P(e,4,this.length),i.read(this,e,!1,23,4)},u.prototype.readDoubleLE=function(e,t){return e=e>>>0,t||P(e,8,this.length),i.read(this,e,!0,52,8)},u.prototype.readDoubleBE=function(e,t){return e=e>>>0,t||P(e,8,this.length),i.read(this,e,!1,52,8)};function N(o,e,t,s,l,d){if(!u.isBuffer(o))throw new TypeError('"buffer" argument must be a Buffer instance');if(e>l||e<d)throw new RangeError('"value" argument is out of bounds');if(t+s>o.length)throw new RangeError("Index out of range")}u.prototype.writeUintLE=u.prototype.writeUIntLE=function(e,t,s,l){if(e=+e,t=t>>>0,s=s>>>0,!l){const x=Math.pow(2,8*s)-1;N(this,e,t,s,x,0)}let d=1,h=0;for(this[t]=e&255;++h<s&&(d*=256);)this[t+h]=e/d&255;return t+s},u.prototype.writeUintBE=u.prototype.writeUIntBE=function(e,t,s,l){if(e=+e,t=t>>>0,s=s>>>0,!l){const x=Math.pow(2,8*s)-1;N(this,e,t,s,x,0)}let d=s-1,h=1;for(this[t+d]=e&255;--d>=0&&(h*=256);)this[t+d]=e/h&255;return t+s},u.prototype.writeUint8=u.prototype.writeUInt8=function(e,t,s){return e=+e,t=t>>>0,s||N(this,e,t,1,255,0),this[t]=e&255,t+1},u.prototype.writeUint16LE=u.prototype.writeUInt16LE=function(e,t,s){return e=+e,t=t>>>0,s||N(this,e,t,2,65535,0),this[t]=e&255,this[t+1]=e>>>8,t+2},u.prototype.writeUint16BE=u.prototype.writeUInt16BE=function(e,t,s){return e=+e,t=t>>>0,s||N(this,e,t,2,65535,0),this[t]=e>>>8,this[t+1]=e&255,t+2},u.prototype.writeUint32LE=u.prototype.writeUInt32LE=function(e,t,s){return e=+e,t=t>>>0,s||N(this,e,t,4,4294967295,0),this[t+3]=e>>>24,this[t+2]=e>>>16,this[t+1]=e>>>8,this[t]=e&255,t+4},u.prototype.writeUint32BE=u.prototype.writeUInt32BE=function(e,t,s){return e=+e,t=t>>>0,s||N(this,e,t,4,4294967295,0),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=e&255,t+4};function De(o,e,t,s,l){je(e,s,l,o,t,7);let d=Number(e&BigInt(4294967295));o[t++]=d,d=d>>8,o[t++]=d,d=d>>8,o[t++]=d,d=d>>8,o[t++]=d;let h=Number(e>>BigInt(32)&BigInt(4294967295));return o[t++]=h,h=h>>8,o[t++]=h,h=h>>8,o[t++]=h,h=h>>8,o[t++]=h,t}function We(o,e,t,s,l){je(e,s,l,o,t,7);let d=Number(e&BigInt(4294967295));o[t+7]=d,d=d>>8,o[t+6]=d,d=d>>8,o[t+5]=d,d=d>>8,o[t+4]=d;let h=Number(e>>BigInt(32)&BigInt(4294967295));return o[t+3]=h,h=h>>8,o[t+2]=h,h=h>>8,o[t+1]=h,h=h>>8,o[t]=h,t+8}u.prototype.writeBigUInt64LE=Q(function(e,t=0){return De(this,e,t,BigInt(0),BigInt("0xffffffffffffffff"))}),u.prototype.writeBigUInt64BE=Q(function(e,t=0){return We(this,e,t,BigInt(0),BigInt("0xffffffffffffffff"))}),u.prototype.writeIntLE=function(e,t,s,l){if(e=+e,t=t>>>0,!l){const A=Math.pow(2,8*s-1);N(this,e,t,s,A-1,-A)}let d=0,h=1,x=0;for(this[t]=e&255;++d<s&&(h*=256);)e<0&&x===0&&this[t+d-1]!==0&&(x=1),this[t+d]=(e/h>>0)-x&255;return t+s},u.prototype.writeIntBE=function(e,t,s,l){if(e=+e,t=t>>>0,!l){const A=Math.pow(2,8*s-1);N(this,e,t,s,A-1,-A)}let d=s-1,h=1,x=0;for(this[t+d]=e&255;--d>=0&&(h*=256);)e<0&&x===0&&this[t+d+1]!==0&&(x=1),this[t+d]=(e/h>>0)-x&255;return t+s},u.prototype.writeInt8=function(e,t,s){return e=+e,t=t>>>0,s||N(this,e,t,1,127,-128),e<0&&(e=255+e+1),this[t]=e&255,t+1},u.prototype.writeInt16LE=function(e,t,s){return e=+e,t=t>>>0,s||N(this,e,t,2,32767,-32768),this[t]=e&255,this[t+1]=e>>>8,t+2},u.prototype.writeInt16BE=function(e,t,s){return e=+e,t=t>>>0,s||N(this,e,t,2,32767,-32768),this[t]=e>>>8,this[t+1]=e&255,t+2},u.prototype.writeInt32LE=function(e,t,s){return e=+e,t=t>>>0,s||N(this,e,t,4,2147483647,-2147483648),this[t]=e&255,this[t+1]=e>>>8,this[t+2]=e>>>16,this[t+3]=e>>>24,t+4},u.prototype.writeInt32BE=function(e,t,s){return e=+e,t=t>>>0,s||N(this,e,t,4,2147483647,-2147483648),e<0&&(e=4294967295+e+1),this[t]=e>>>24,this[t+1]=e>>>16,this[t+2]=e>>>8,this[t+3]=e&255,t+4},u.prototype.writeBigInt64LE=Q(function(e,t=0){return De(this,e,t,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))}),u.prototype.writeBigInt64BE=Q(function(e,t=0){return We(this,e,t,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))});function ze(o,e,t,s,l,d){if(t+s>o.length)throw new RangeError("Index out of range");if(t<0)throw new RangeError("Index out of range")}function Ge(o,e,t,s,l){return e=+e,t=t>>>0,l||ze(o,e,t,4),i.write(o,e,t,s,23,4),t+4}u.prototype.writeFloatLE=function(e,t,s){return Ge(this,e,t,!0,s)},u.prototype.writeFloatBE=function(e,t,s){return Ge(this,e,t,!1,s)};function qe(o,e,t,s,l){return e=+e,t=t>>>0,l||ze(o,e,t,8),i.write(o,e,t,s,52,8),t+8}u.prototype.writeDoubleLE=function(e,t,s){return qe(this,e,t,!0,s)},u.prototype.writeDoubleBE=function(e,t,s){return qe(this,e,t,!1,s)},u.prototype.copy=function(e,t,s,l){if(!u.isBuffer(e))throw new TypeError("argument should be a Buffer");if(s||(s=0),!l&&l!==0&&(l=this.length),t>=e.length&&(t=e.length),t||(t=0),l>0&&l<s&&(l=s),l===s||e.length===0||this.length===0)return 0;if(t<0)throw new RangeError("targetStart out of bounds");if(s<0||s>=this.length)throw new RangeError("Index out of range");if(l<0)throw new RangeError("sourceEnd out of bounds");l>this.length&&(l=this.length),e.length-t<l-s&&(l=e.length-t+s);const d=l-s;return this===e&&typeof Uint8Array.prototype.copyWithin=="function"?this.copyWithin(t,s,l):Uint8Array.prototype.set.call(e,this.subarray(s,l),t),d},u.prototype.fill=function(e,t,s,l){if(typeof e=="string"){if(typeof t=="string"?(l=t,t=0,s=this.length):typeof s=="string"&&(l=s,s=this.length),l!==void 0&&typeof l!="string")throw new TypeError("encoding must be a string");if(typeof l=="string"&&!u.isEncoding(l))throw new TypeError("Unknown encoding: "+l);if(e.length===1){const h=e.charCodeAt(0);(l==="utf8"&&h<128||l==="latin1")&&(e=h)}}else typeof e=="number"?e=e&255:typeof e=="boolean"&&(e=Number(e));if(t<0||this.length<t||this.length<s)throw new RangeError("Out of range index");if(s<=t)return this;t=t>>>0,s=s===void 0?this.length:s>>>0,e||(e=0);let d;if(typeof e=="number")for(d=t;d<s;++d)this[d]=e;else{const h=u.isBuffer(e)?e:u.from(e,l),x=h.length;if(x===0)throw new TypeError('The value "'+e+'" is invalid for argument "value"');for(d=0;d<s-t;++d)this[d+t]=h[d%x]}return this};const X={};function ke(o,e,t){X[o]=class extends t{constructor(){super(),Object.defineProperty(this,"message",{value:e.apply(this,arguments),writable:!0,configurable:!0}),this.name=`${this.name} [${o}]`,this.stack,delete this.name}get code(){return o}set code(l){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,value:l,writable:!0})}toString(){return`${this.name} [${o}]: ${this.message}`}}}ke("ERR_BUFFER_OUT_OF_BOUNDS",function(o){return o?`${o} is outside of buffer bounds`:"Attempt to access memory outside buffer bounds"},RangeError),ke("ERR_INVALID_ARG_TYPE",function(o,e){return`The "${o}" argument must be of type number. Received type ${typeof e}`},TypeError),ke("ERR_OUT_OF_RANGE",function(o,e,t){let s=`The value of "${o}" is out of range.`,l=t;return Number.isInteger(t)&&Math.abs(t)>2**32?l=He(String(t)):typeof t=="bigint"&&(l=String(t),(t>BigInt(2)**BigInt(32)||t<-(BigInt(2)**BigInt(32)))&&(l=He(l)),l+="n"),s+=` It must be ${e}. Received ${l}`,s},RangeError);function He(o){let e="",t=o.length;const s=o[0]==="-"?1:0;for(;t>=s+4;t-=3)e=`_${o.slice(t-3,t)}${e}`;return`${o.slice(0,t)}${e}`}function Ut(o,e,t){Z(e,"offset"),(o[e]===void 0||o[e+t]===void 0)&&re(e,o.length-(t+1))}function je(o,e,t,s,l,d){if(o>t||o<e){const h=typeof e=="bigint"?"n":"";let x;throw d>3?e===0||e===BigInt(0)?x=`>= 0${h} and < 2${h} ** ${(d+1)*8}${h}`:x=`>= -(2${h} ** ${(d+1)*8-1}${h}) and < 2 ** ${(d+1)*8-1}${h}`:x=`>= ${e}${h} and <= ${t}${h}`,new X.ERR_OUT_OF_RANGE("value",x,o)}Ut(s,l,d)}function Z(o,e){if(typeof o!="number")throw new X.ERR_INVALID_ARG_TYPE(e,"number",o)}function re(o,e,t){throw Math.floor(o)!==o?(Z(o,t),new X.ERR_OUT_OF_RANGE(t||"offset","an integer",o)):e<0?new X.ERR_BUFFER_OUT_OF_BOUNDS:new X.ERR_OUT_OF_RANGE(t||"offset",`>= ${t?1:0} and <= ${e}`,o)}const Lt=/[^+/0-9A-Za-z-_]/g;function Nt(o){if(o=o.split("=")[0],o=o.trim().replace(Lt,""),o.length<2)return"";for(;o.length%4!==0;)o=o+"=";return o}function Fe(o,e){e=e||1/0;let t;const s=o.length;let l=null;const d=[];for(let h=0;h<s;++h){if(t=o.charCodeAt(h),t>55295&&t<57344){if(!l){if(t>56319){(e-=3)>-1&&d.push(239,191,189);continue}else if(h+1===s){(e-=3)>-1&&d.push(239,191,189);continue}l=t;continue}if(t<56320){(e-=3)>-1&&d.push(239,191,189),l=t;continue}t=(l-55296<<10|t-56320)+65536}else l&&(e-=3)>-1&&d.push(239,191,189);if(l=null,t<128){if((e-=1)<0)break;d.push(t)}else if(t<2048){if((e-=2)<0)break;d.push(t>>6|192,t&63|128)}else if(t<65536){if((e-=3)<0)break;d.push(t>>12|224,t>>6&63|128,t&63|128)}else if(t<1114112){if((e-=4)<0)break;d.push(t>>18|240,t>>12&63|128,t>>6&63|128,t&63|128)}else throw new Error("Invalid code point")}return d}function Ot(o){const e=[];for(let t=0;t<o.length;++t)e.push(o.charCodeAt(t)&255);return e}function Mt(o,e){let t,s,l;const d=[];for(let h=0;h<o.length&&!((e-=2)<0);++h)t=o.charCodeAt(h),s=t>>8,l=t%256,d.push(l),d.push(s);return d}function Ve(o){return r.toByteArray(Nt(o))}function ae(o,e,t,s){let l;for(l=0;l<s&&!(l+t>=e.length||l>=o.length);++l)e[l+t]=o[l];return l}function H(o,e){return o instanceof e||o!=null&&o.constructor!=null&&o.constructor.name!=null&&o.constructor.name===e.name}function Te(o){return o!==o}const Dt=function(){const o="0123456789abcdef",e=new Array(256);for(let t=0;t<16;++t){const s=t*16;for(let l=0;l<16;++l)e[s+l]=o[t]+o[l]}return e}();function Q(o){return typeof BigInt>"u"?Wt:o}function Wt(){throw new Error("BigInt not supported")}})(Bt);class Oe extends Le{constructor(r,i,a,c){super(`Object ${r} ${c?`at ${c}`:""}was anticipated to be a ${a} but it is a ${i}.`),this.code=this.name=Oe.code,this.data={oid:r,actual:i,expected:a,filepath:c}}}Oe.code="ObjectTypeError";typeof window<"u"&&(window.Buffer=Bt.Buffer);const{wpCLI:wr,...et}=or;({...et,importFile:et.importWxr});async function mr(n){await $e(n,{consts:{USE_FETCH_FOR_REQUESTS:!0}}),await n.onMessage(async r=>{let i;try{i=JSON.parse(r)}catch{return""}const{type:a,data:c}=i;return a!=="request"?"":(c.headers?Array.isArray(c.headers)&&(c.headers=Object.fromEntries(c.headers)):c.headers={},new URL(c.url).hostname===window.location.hostname&&(c.headers["x-request-issuer"]="php"),yr(c))})}async function yr(n,r=fetch){const i=new URL(n.url).hostname,a=["w.org","s.w.org"].includes(i)?`/plugin-proxy.php?url=${encodeURIComponent(n.url)}`:n.url;let c;try{const w=n.method||"GET",y=n.headers||{};w=="POST"&&(y["Content-Type"]="application/x-www-form-urlencoded"),c=await r(a,{method:w,headers:y,body:n.data,credentials:"omit"})}catch{return new TextEncoder().encode(`HTTP/1.1 400 Invalid Request\r
content-type: text/plain\r
\r
Playground could not serve the request.`)}const p=[];c.headers.forEach((w,y)=>{p.push(y+": "+w)});const f=["HTTP/1.1 "+c.status+" "+c.statusText,...p].join(`\r
`)+`\r
\r
`,u=new TextEncoder().encode(f),m=new Uint8Array(await c.arrayBuffer()),$=new Uint8Array(u.byteLength+m.byteLength);return $.set(u),$.set(m,u.byteLength),$}function gr(n,r){return{type:"response",requestId:n,response:r}}const At=new URL("/",(import.meta||{}).url).origin,$r=new URL(Cn,At)+"",Er=new URL(Rn,At),_r=new URL(document.location.href).searchParams;async function xr(){kr();const n=_r.has("progressbar");let r;n&&(r=new An,document.body.prepend(r.element));const i=navigator.serviceWorker;if(!i)throw window.isSecureContext?new Ye("Service workers are not supported in your browser."):new Ye("WordPress Playground uses service workers and may only work on HTTPS and http://localhost/ sites, but the current site is neither.");const a=await i.register(Er+"",{type:"module",updateViaCache:"none"});try{await a.update()}catch(w){q.error("Failed to update service worker.",w)}const c=hn(await gn($r)),p=document.querySelector("#wp"),f={async onDownloadProgress(w){return c.onDownloadProgress(w)},async journalFSEvents(w,y){return c.journalFSEvents(w,y)},async replayFSJournal(w){return c.replayFSJournal(w)},async addEventListener(w,y){return await c.addEventListener(w,y)},async removeEventListener(w,y){return await c.removeEventListener(w,y)},async setProgress(w){if(!r)throw new Error("Progress bar not available");r.setOptions(w)},async setLoaded(){if(!r)throw new Error("Progress bar not available");r.destroy()},async onNavigation(w){p.addEventListener("load",async y=>{try{const _=await $.internalUrlToPath(y.currentTarget.contentWindow.location.href);w(_)}catch{}})},async goTo(w){w.startsWith("/")||(w="/"+w),w==="/wp-admin"&&(w="/wp-admin/");const y=await $.pathToInternalUrl(w),_=p.src;if(y===_&&p.contentWindow)try{p.contentWindow.location.href=y;return}catch{}p.src=y},async getCurrentURL(){let w="";try{w=p.contentWindow.location.href}catch{}return w||(w=p.src),await $.internalUrlToPath(w)},async setIframeSandboxFlags(w){p.setAttribute("sandbox",w.join(" "))},async onMessage(w){return await c.onMessage(w)},async mountOpfs(w,y){return await c.mountOpfs(w,y)},async unmountOpfs(w){return await c.unmountOpfs(w)},async backfillStaticFilesRemovedFromMinifiedBuild(){await c.backfillStaticFilesRemovedFromMinifiedBuild()},async hasCachedStaticFilesRemovedFromMinifiedBuild(){return await c.hasCachedStaticFilesRemovedFromMinifiedBuild()},async boot(w){await c.boot(w),navigator.serviceWorker.addEventListener("message",async function(_){if(w.scope&&_.data.scope!==w.scope)return;const b=_.data.args||[],S=_.data.method,G=await c[S](...b);_.source.postMessage(gr(_.data.requestId,G))}),i.startMessages();try{await c.isReady(),yn(p,br(await $.absoluteUrl)),w.withNetworking&&await mr(c),u()}catch(y){throw m(y),y}await f.hasCachedStaticFilesRemovedFromMinifiedBuild()?await f.backfillStaticFilesRemovedFromMinifiedBuild():p.addEventListener("load",()=>{f.backfillStaticFilesRemovedFromMinifiedBuild()})}};await c.isConnected();const[u,m,$]=mn(f,c);return $}function br(n){return new URL(n,"https://example.com").origin}function kr(){let n=!1;try{n=window.parent!==window&&window.parent.IS_WASM_WORDPRESS}catch{}if(n)throw new Error(`The service worker did not load correctly. This is a bug,
			please report it on https://github.com/WordPress/wordpress-playground/issues`);window.IS_WASM_WORDPRESS=!0}const Fr="nightly",Tr="6.7-beta3",Br={nightly:Fr,beta:Tr,"6.6":"6.6.2","6.5":"6.5.5","6.4":"6.4.5","6.3":"6.3.5"},Ir=Object.keys(Br);Ir.filter(n=>n.match(/^\d/))[0];window.top!=window.self&&document.body.classList.add("is-embedded");try{window.playground=await xr()}catch(n){console.error(n),document.body.className="has-error",document.body.innerHTML="",n?.name==="NotSupportedError"?document.body.append(await Cr()):document.body.append(Ar(n))}finally{document.body.classList.remove("is-loading")}function Ar(n){const r=document.createDocumentFragment(),i=document.createElement("div");i.className="error-message";const a=n.userFriendlyMessage||"See the developer tools for error details.";i.innerHTML="Ooops! WordPress Playground had a hiccup! <br/><br/> "+a,r.append(i);const c=document.createElement("button");c.innerText="Try again",c.onclick=()=>{window.location.reload()},r.append(c);const p=document.createElement("p");return p.innerHTML=`
					If the problem persists, please
					<a href="https://github.com/WordPress/playground-tools/issues/new"
						target="_blank"
						>report an issue on GitHub</a>.
				`,r.append(p),r}async function Cr(){const n=document.createDocumentFragment();let r=!1;try{const{state:i}=await navigator.permissions.query({name:"storage-access"});r=i==="granted"}catch{}if(r||!("requestStorageAccess"in document)){const i=document.createElement("div");i.innerText="It looks like you have disabled third-party cookies in your browser. This also disables the Service Worker API used by WordPress Playground. Please re-enable third-party cookies and try again.",n.append(i);const a=document.createElement("button");a.innerText="Try again",a.onclick=()=>{window.location.reload()},n.append(a)}else{const i=document.createElement("div");i.innerText="WordPress Playground needs to use storage in your browser.",n.append(i);const a=document.createElement("button");a.innerText="Allow storage access",n.append(a),a.onclick=async()=>{try{await document.requestStorageAccess(),window.location.reload()}catch{i.innerHTML=`
								<p>
									Oops! Playground failed to start. Here's what to do:
								</p>

								<h3>Did you disable third-party cookies?</h3>
								<p>
									It also disables the required Service Worker API. Please re-enable
									third-party cookies and try again.
								</p>

								<h3>Did you refuse to grant Playground storage access?</h3>
								<p>
									Click the button below and grant storage access. Note the button may
									not work if you have disabled third-party cookies in your browser.
								</p>
								<p>
									If neither method helped, please
									<a href="https://github.com/WordPress/playground-tools/issues/new"
										target="_blank">
										report an issue on GitHub
									</a>.
								</p>
								`}}}return n}
