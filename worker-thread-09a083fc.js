const currentJsRuntime$1=function(){return typeof process<"u"&&process.release?.name==="node"?"NODE":typeof window<"u"?"WEB":typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?"WORKER":"NODE"}();if(currentJsRuntime$1==="NODE"){let e=function(r){return new Promise(function(o,l){r.onload=r.onerror=function(d){r.onload=r.onerror=null,d.type==="load"?o(r.result):l(new Error("Failed to read the blob/file"))}})},t=function(){const r=new Uint8Array([1,2,3,4]),l=new File([r],"test").stream();try{return l.getReader({mode:"byob"}),!0}catch{return!1}};if(typeof File>"u"){class r extends Blob{constructor(l,d,p){super(l);let c;p?.lastModified&&(c=new Date),(!c||isNaN(c.getFullYear()))&&(c=new Date),this.lastModifiedDate=c,this.lastModified=c.getMilliseconds(),this.name=d||""}}global.File=r}typeof Blob.prototype.arrayBuffer>"u"&&(Blob.prototype.arrayBuffer=function(){const o=new FileReader;return o.readAsArrayBuffer(this),e(o)}),typeof Blob.prototype.text>"u"&&(Blob.prototype.text=function(){const o=new FileReader;return o.readAsText(this),e(o)}),(typeof Blob.prototype.stream>"u"||!t())&&(Blob.prototype.stream=function(){let r=0;const o=this;return new ReadableStream({type:"bytes",autoAllocateChunkSize:512*1024,async pull(l){const d=l.byobRequest.view,c=await o.slice(r,r+d.byteLength).arrayBuffer(),m=new Uint8Array(c);new Uint8Array(d.buffer).set(m);const _=m.byteLength;l.byobRequest.respond(_),r+=_,r>=o.size&&l.close()}})})}if(currentJsRuntime$1==="NODE"&&typeof CustomEvent>"u"){class e extends Event{constructor(r,o={}){super(r,o),this.detail=o.detail}initCustomEvent(){}}globalThis.CustomEvent=e}const FileErrorCodes={0:"No error occurred. System call completed successfully.",1:"Argument list too long.",2:"Permission denied.",3:"Address in use.",4:"Address not available.",5:"Address family not supported.",6:"Resource unavailable, or operation would block.",7:"Connection already in progress.",8:"Bad file descriptor.",9:"Bad message.",10:"Device or resource busy.",11:"Operation canceled.",12:"No child processes.",13:"Connection aborted.",14:"Connection refused.",15:"Connection reset.",16:"Resource deadlock would occur.",17:"Destination address required.",18:"Mathematics argument out of domain of function.",19:"Reserved.",20:"File exists.",21:"Bad address.",22:"File too large.",23:"Host is unreachable.",24:"Identifier removed.",25:"Illegal byte sequence.",26:"Operation in progress.",27:"Interrupted function.",28:"Invalid argument.",29:"I/O error.",30:"Socket is connected.",31:"There is a directory under that path.",32:"Too many levels of symbolic links.",33:"File descriptor value too large.",34:"Too many links.",35:"Message too large.",36:"Reserved.",37:"Filename too long.",38:"Network is down.",39:"Connection aborted by network.",40:"Network unreachable.",41:"Too many files open in system.",42:"No buffer space available.",43:"No such device.",44:"There is no such file or directory OR the parent directory does not exist.",45:"Executable file format error.",46:"No locks available.",47:"Reserved.",48:"Not enough space.",49:"No message of the desired type.",50:"Protocol not available.",51:"No space left on device.",52:"Function not supported.",53:"The socket is not connected.",54:"Not a directory or a symbolic link to a directory.",55:"Directory not empty.",56:"State not recoverable.",57:"Not a socket.",58:"Not supported, or operation not supported on socket.",59:"Inappropriate I/O control operation.",60:"No such device or address.",61:"Value too large to be stored in data type.",62:"Previous owner died.",63:"Operation not permitted.",64:"Broken pipe.",65:"Protocol error.",66:"Protocol not supported.",67:"Protocol wrong type for socket.",68:"Result too large.",69:"Read-only file system.",70:"Invalid seek.",71:"No such process.",72:"Reserved.",73:"Connection timed out.",74:"Text file busy.",75:"Cross-device link.",76:"Extension: Capabilities insufficient."};function getEmscriptenFsError(e){const t=typeof e=="object"?e?.errno:null;if(t in FileErrorCodes)return FileErrorCodes[t]}function rethrowFileSystemError(e=""){return function(r,o,l){const d=l.value;l.value=function(...p){try{return d.apply(this,p)}catch(c){const m=typeof c=="object"?c?.errno:null;if(m in FileErrorCodes){const _=FileErrorCodes[m],y=typeof p[1]=="string"?p[1]:null,w=y!==null?e.replaceAll("{path}",y):e;throw new Error(`${w}: ${_}`,{cause:c})}throw c}}}}const logEventType="playground-log",logEvent=(e,...t)=>{logger.dispatchEvent(new CustomEvent(logEventType,{detail:{log:e,args:t}}))},logToConsole=(e,...t)=>{switch(typeof e.message=="string"?Reflect.set(e,"message",prepareLogMessage(e.message)):e.message.message&&typeof e.message.message=="string"&&Reflect.set(e.message,"message",prepareLogMessage(e.message.message)),e.severity){case"Debug":console.debug(e.message,...t);break;case"Info":console.info(e.message,...t);break;case"Warn":console.warn(e.message,...t);break;case"Error":console.error(e.message,...t);break;case"Fatal":console.error(e.message,...t);break;default:console.log(e.message,...t)}},prepareLogMessage$1=e=>e instanceof Error?[e.message,e.stack].join(`
`):JSON.stringify(e,null,2),logs=[],addToLogArray=e=>{logs.push(e)},logToMemory=e=>{if(e.raw===!0)addToLogArray(e.message);else{const t=formatLogEntry(typeof e.message=="object"?prepareLogMessage$1(e.message):e.message,e.severity??"Info",e.prefix??"JavaScript");addToLogArray(t)}};class Logger extends EventTarget{constructor(t=[]){super(),this.handlers=t,this.fatalErrorEvent="playground-fatal-error"}getLogs(){return this.handlers.includes(logToMemory)?[...logs]:(this.error(`Logs aren't stored because the logToMemory handler isn't registered.
				If you're using a custom logger instance, make sure to register logToMemory handler.
			`),[])}logMessage(t,...r){for(const o of this.handlers)o(t,...r)}log(t,...r){this.logMessage({message:t,severity:void 0,prefix:"JavaScript",raw:!1},...r)}debug(t,...r){this.logMessage({message:t,severity:"Debug",prefix:"JavaScript",raw:!1},...r)}info(t,...r){this.logMessage({message:t,severity:"Info",prefix:"JavaScript",raw:!1},...r)}warn(t,...r){this.logMessage({message:t,severity:"Warn",prefix:"JavaScript",raw:!1},...r)}error(t,...r){this.logMessage({message:t,severity:"Error",prefix:"JavaScript",raw:!1},...r)}}const getDefaultHandlers=()=>{try{if(process.env.NODE_ENV==="test")return[logToMemory,logEvent]}catch{}return[logToMemory,logToConsole,logEvent]},logger=new Logger(getDefaultHandlers()),prepareLogMessage=e=>e.replace(/\t/g,""),formatLogEntry=(e,t,r)=>{const o=new Date,l=new Intl.DateTimeFormat("en-GB",{year:"numeric",month:"short",day:"2-digit",timeZone:"UTC"}).format(o).replace(/ /g,"-"),d=new Intl.DateTimeFormat("en-GB",{hour:"2-digit",minute:"2-digit",second:"2-digit",hour12:!1,timeZone:"UTC",timeZoneName:"short"}).format(o),p=l+" "+d;return e=prepareLogMessage(e),`[${p}] ${r} ${t}: ${e}`},SleepFinished=Symbol("SleepFinished");function sleep(e){return new Promise(t=>{setTimeout(()=>t(SleepFinished),e)})}class AcquireTimeoutError extends Error{constructor(){super("Acquiring lock timed out")}}class Semaphore{constructor({concurrency:t,timeout:r}){this._running=0,this.concurrency=t,this.timeout=r,this.queue=[]}get remaining(){return this.concurrency-this.running}get running(){return this._running}async acquire(){for(;;)if(this._running>=this.concurrency){const t=new Promise(r=>{this.queue.push(r)});this.timeout!==void 0?await Promise.race([t,sleep(this.timeout)]).then(r=>{if(r===SleepFinished)throw new AcquireTimeoutError}):await t}else{this._running++;let t=!1;return()=>{t||(t=!0,this._running--,this.queue.length>0&&this.queue.shift()())}}}async run(t){const r=await this.acquire();try{return await t()}finally{r()}}}function joinPaths(...e){function t(d){return d.substring(d.length-1)==="/"}let r=e.join("/");const o=r[0]==="/",l=t(r);return r=normalizePath$1(r),!r&&!o&&(r="."),r&&l&&!t(r)&&(r+="/"),r}function dirname(e){if(e==="/")return"/";e=normalizePath$1(e);const t=e.lastIndexOf("/");return t===-1?"":t===0?"/":e.substr(0,t)}function basename(e){if(e==="/")return"/";e=normalizePath$1(e);const t=e.lastIndexOf("/");return t===-1?e:e.substr(t+1)}function normalizePath$1(e){const t=e[0]==="/";return e=normalizePathsArray(e.split("/").filter(r=>!!r),!t).join("/"),(t?"/":"")+e.replace(/\/$/,"")}function normalizePathsArray(e,t){let r=0;for(let o=e.length-1;o>=0;o--){const l=e[o];l==="."?e.splice(o,1):l===".."?(e.splice(o,1),r++):r&&(e.splice(o,1),r--)}if(t)for(;r;r--)e.unshift("..");return e}function splitShellCommand(e){let o=0,l="";const d=[];let p="";for(let c=0;c<e.length;c++){const m=e[c];m==="\\"?((e[c+1]==='"'||e[c+1]==="'")&&c++,p+=e[c]):o===0?m==='"'||m==="'"?(o=1,l=m):m.match(/\s/)?(p.trim().length&&d.push(p.trim()),p=m):d.length&&!p?p=d.pop()+m:p+=m:o===1&&(m===l?(o=0,l=""):p+=m)}return p&&d.push(p.trim()),d}function createSpawnHandler(e){return function(t,r=[],o={}){const l=new ChildProcess,d=new ProcessApi(l);return setTimeout(async()=>{let p=[];if(r.length)p=[t,...r];else if(typeof t=="string")p=splitShellCommand(t);else if(Array.isArray(t))p=t;else throw new Error("Invalid command ",t);try{await e(p,d,o)}catch(c){l.emit("error",c),typeof c=="object"&&c!==null&&"message"in c&&typeof c.message=="string"&&d.stderr(c.message),d.exit(1)}l.emit("spawn",!0)}),l}}class EventEmitter{constructor(){this.listeners={}}emit(t,r){this.listeners[t]&&this.listeners[t].forEach(function(o){o(r)})}on(t,r){this.listeners[t]||(this.listeners[t]=[]),this.listeners[t].push(r)}}class ProcessApi extends EventEmitter{constructor(t){super(),this.childProcess=t,this.exited=!1,this.stdinData=[],t.on("stdin",r=>{this.stdinData?this.stdinData.push(r.slice()):this.emit("stdin",r)})}stdout(t){typeof t=="string"&&(t=new TextEncoder().encode(t)),this.childProcess.stdout.emit("data",t)}stdoutEnd(){this.childProcess.stdout.emit("end",{})}stderr(t){typeof t=="string"&&(t=new TextEncoder().encode(t)),this.childProcess.stderr.emit("data",t)}stderrEnd(){this.childProcess.stderr.emit("end",{})}exit(t){this.exited||(this.exited=!0,this.childProcess.emit("exit",t))}flushStdin(){if(this.stdinData)for(let t=0;t<this.stdinData.length;t++)this.emit("stdin",this.stdinData[t]);this.stdinData=null}}let lastPid=9743;class ChildProcess extends EventEmitter{constructor(t=lastPid++){super(),this.pid=t,this.stdout=new EventEmitter,this.stderr=new EventEmitter;const r=this;this.stdin={write:o=>{r.emit("stdin",o)}}}}function randomString(e=36,t="!@#$%^&*()_+=-[]/.,<>?"){const r="0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ"+t;let o="";for(let l=e;l>0;--l)o+=r[Math.floor(Math.random()*r.length)];return o}function phpVar(e){return`json_decode(base64_decode('${stringToBase64(JSON.stringify(e))}'), true)`}function phpVars(e){const t={};for(const r in e)t[r]=phpVar(e[r]);return t}function stringToBase64(e){return bytesToBase64(new TextEncoder().encode(e))}function bytesToBase64(e){const t=String.fromCodePoint(...e);return btoa(t)}var __defProp=Object.defineProperty,__getOwnPropDesc=Object.getOwnPropertyDescriptor,__decorateClass=(e,t,r,o)=>{for(var l=o>1?void 0:o?__getOwnPropDesc(t,r):t,d=e.length-1,p;d>=0;d--)(p=e[d])&&(l=(o?p(t,r,l):p(l))||l);return o&&l&&__defProp(t,r,l),l};const _FSHelpers=class M{static readFileAsText(t,r){return new TextDecoder().decode(M.readFileAsBuffer(t,r))}static readFileAsBuffer(t,r){return t.readFile(r)}static writeFile(t,r,o){t.writeFile(r,o)}static unlink(t,r){t.unlink(r)}static mv(t,r,o){try{const l=t.lookupPath(r).node.mount,d=M.fileExists(t,o)?t.lookupPath(o).node.mount:t.lookupPath(dirname(o)).node.mount;l.mountpoint!==d.mountpoint?(M.copyRecursive(t,r,o),M.isDir(t,r)?M.rmdir(t,r,{recursive:!0}):t.unlink(r)):t.rename(r,o)}catch(l){const d=getEmscriptenFsError(l);throw d?new Error(`Could not move ${r} to ${o}: ${d}`,{cause:l}):l}}static rmdir(t,r,o={recursive:!0}){o?.recursive&&M.listFiles(t,r).forEach(l=>{const d=`${r}/${l}`;M.isDir(t,d)?M.rmdir(t,d,o):M.unlink(t,d)}),t.rmdir(r)}static listFiles(t,r,o={prependPath:!1}){if(!M.fileExists(t,r))return[];try{const l=t.readdir(r).filter(d=>d!=="."&&d!=="..");if(o.prependPath){const d=r.replace(/\/$/,"");return l.map(p=>`${d}/${p}`)}return l}catch(l){return logger.error(l,{path:r}),[]}}static isDir(t,r){return M.fileExists(t,r)?t.isDir(t.lookupPath(r,{follow:!0}).node.mode):!1}static isFile(t,r){return M.fileExists(t,r)?t.isFile(t.lookupPath(r,{follow:!0}).node.mode):!1}static symlink(t,r,o){return t.symlink(r,o)}static isSymlink(t,r){return M.fileExists(t,r)?t.isLink(t.lookupPath(r).node.mode):!1}static readlink(t,r){return t.readlink(r)}static realpath(t,r){return t.lookupPath(r,{follow:!0}).path}static fileExists(t,r){try{return t.lookupPath(r),!0}catch{return!1}}static mkdir(t,r){t.mkdirTree(r)}static copyRecursive(t,r,o){const l=t.lookupPath(r).node;if(t.isDir(l.mode)){t.mkdirTree(o);const d=t.readdir(r).filter(p=>p!=="."&&p!=="..");for(const p of d)M.copyRecursive(t,joinPaths(r,p),joinPaths(o,p))}else t.writeFile(o,t.readFile(r))}};__decorateClass([rethrowFileSystemError('Could not read "{path}"')],_FSHelpers,"readFileAsText",1);__decorateClass([rethrowFileSystemError('Could not read "{path}"')],_FSHelpers,"readFileAsBuffer",1);__decorateClass([rethrowFileSystemError('Could not write to "{path}"')],_FSHelpers,"writeFile",1);__decorateClass([rethrowFileSystemError('Could not unlink "{path}"')],_FSHelpers,"unlink",1);__decorateClass([rethrowFileSystemError('Could not remove directory "{path}"')],_FSHelpers,"rmdir",1);__decorateClass([rethrowFileSystemError('Could not list files in "{path}"')],_FSHelpers,"listFiles",1);__decorateClass([rethrowFileSystemError('Could not stat "{path}"')],_FSHelpers,"isDir",1);__decorateClass([rethrowFileSystemError('Could not stat "{path}"')],_FSHelpers,"isFile",1);__decorateClass([rethrowFileSystemError('Could not stat "{path}"')],_FSHelpers,"realpath",1);__decorateClass([rethrowFileSystemError('Could not stat "{path}"')],_FSHelpers,"fileExists",1);__decorateClass([rethrowFileSystemError('Could not create directory "{path}"')],_FSHelpers,"mkdir",1);__decorateClass([rethrowFileSystemError('Could not copy files from "{path}"')],_FSHelpers,"copyRecursive",1);let FSHelpers=_FSHelpers;const _private=new WeakMap;class PHPWorker{constructor(t,r){this.absoluteUrl="",this.documentRoot="",_private.set(this,{monitor:r}),t&&this.__internal_setRequestHandler(t)}__internal_setRequestHandler(t){this.absoluteUrl=t.absoluteUrl,this.documentRoot=t.documentRoot,_private.set(this,{..._private.get(this),requestHandler:t})}__internal_getPHP(){return _private.get(this).php}async setPrimaryPHP(t){_private.set(this,{..._private.get(this),php:t})}pathToInternalUrl(t){return _private.get(this).requestHandler.pathToInternalUrl(t)}internalUrlToPath(t){return _private.get(this).requestHandler.internalUrlToPath(t)}async onDownloadProgress(t){return _private.get(this).monitor?.addEventListener("progress",t)}async mv(t,r){return _private.get(this).php.mv(t,r)}async rmdir(t,r){return _private.get(this).php.rmdir(t,r)}async request(t){return await _private.get(this).requestHandler.request(t)}async run(t){const{php:r,reap:o}=await _private.get(this).requestHandler.processManager.acquirePHPInstance();try{return await r.run(t)}finally{o()}}chdir(t){return _private.get(this).php.chdir(t)}setSapiName(t){_private.get(this).php.setSapiName(t)}mkdir(t){return _private.get(this).php.mkdir(t)}mkdirTree(t){return _private.get(this).php.mkdirTree(t)}readFileAsText(t){return _private.get(this).php.readFileAsText(t)}readFileAsBuffer(t){return _private.get(this).php.readFileAsBuffer(t)}writeFile(t,r){return _private.get(this).php.writeFile(t,r)}unlink(t){return _private.get(this).php.unlink(t)}listFiles(t,r){return _private.get(this).php.listFiles(t,r)}isDir(t){return _private.get(this).php.isDir(t)}isFile(t){return _private.get(this).php.isFile(t)}fileExists(t){return _private.get(this).php.fileExists(t)}onMessage(t){_private.get(this).php.onMessage(t)}defineConstant(t,r){_private.get(this).php.defineConstant(t,r)}addEventListener(t,r){_private.get(this).php.addEventListener(t,r)}removeEventListener(t,r){_private.get(this).php.removeEventListener(t,r)}}const responseTexts={500:"Internal Server Error",502:"Bad Gateway",404:"Not Found",403:"Forbidden",401:"Unauthorized",400:"Bad Request",301:"Moved Permanently",302:"Found",307:"Temporary Redirect",308:"Permanent Redirect",204:"No Content",201:"Created",200:"OK"};class PHPResponse{constructor(t,r,o,l="",d=0){this.httpStatusCode=t,this.headers=r,this.bytes=o,this.exitCode=d,this.errors=l}static forHttpCode(t,r=""){return new PHPResponse(t,{},new TextEncoder().encode(r||responseTexts[t]||""))}static fromRawData(t){return new PHPResponse(t.httpStatusCode,t.headers,t.bytes,t.errors,t.exitCode)}toRawData(){return{headers:this.headers,bytes:this.bytes,errors:this.errors,exitCode:this.exitCode,httpStatusCode:this.httpStatusCode}}get json(){return JSON.parse(this.text)}get text(){return new TextDecoder().decode(this.bytes)}}const RuntimeId=Symbol("RuntimeId"),loadedRuntimes=new Map;let lastRuntimeId=0;async function loadPHPRuntime(e,t={}){const[r,o,l]=makePromise(),d=e.init(currentJsRuntime,{onAbort(c){l(c),logger.error(c)},ENV:{},locateFile:c=>c,...t,noInitialRun:!0,onRuntimeInitialized(){t.onRuntimeInitialized&&t.onRuntimeInitialized(),o()}});await r;const p=++lastRuntimeId;return d.FS,d.id=p,d.originalExit=d._exit,d._exit=function(c){return d.outboundNetworkProxyServer&&(d.outboundNetworkProxyServer.close(),d.outboundNetworkProxyServer.closeAllConnections()),loadedRuntimes.delete(p),d.originalExit(c)},d[RuntimeId]=p,loadedRuntimes.set(p,d),p}function getLoadedRuntime(e){return loadedRuntimes.get(e)}const currentJsRuntime=function(){return typeof process<"u"&&process.release?.name==="node"?"NODE":typeof window<"u"?"WEB":typeof WorkerGlobalScope<"u"&&self instanceof WorkerGlobalScope?"WORKER":"NODE"}(),makePromise=()=>{const e=[],t=new Promise((r,o)=>{e.push(r,o)});return e.unshift(t),e},kError=Symbol("error"),kMessage=Symbol("message");class ErrorEvent2 extends Event{constructor(t,r={}){super(t),this[kError]=r.error===void 0?null:r.error,this[kMessage]=r.message===void 0?"":r.message}get error(){return this[kError]}get message(){return this[kMessage]}}Object.defineProperty(ErrorEvent2.prototype,"error",{enumerable:!0});Object.defineProperty(ErrorEvent2.prototype,"message",{enumerable:!0});const ErrorEvent=typeof globalThis.ErrorEvent=="function"?globalThis.ErrorEvent:ErrorEvent2;function isExitCodeZero(e){return e instanceof Error?"exitCode"in e&&e?.exitCode===0||e?.name==="ExitStatus"&&"status"in e&&e.status===0:!1}class UnhandledRejectionsTarget extends EventTarget{constructor(){super(...arguments),this.listenersCount=0}addEventListener(t,r){++this.listenersCount,super.addEventListener(t,r)}removeEventListener(t,r){--this.listenersCount,super.removeEventListener(t,r)}hasListeners(){return this.listenersCount>0}}function improveWASMErrorReporting(e){const t=new UnhandledRejectionsTarget;for(const r in e.wasmExports)if(typeof e.wasmExports[r]=="function"){const o=e.wasmExports[r];e.wasmExports[r]=function(...l){try{return o(...l)}catch(d){if(!(d instanceof Error))throw d;const p=clarifyErrorMessage(d,e.lastAsyncifyStackSource?.stack);if(e.lastAsyncifyStackSource&&(d.cause=e.lastAsyncifyStackSource),t.hasListeners()){t.dispatchEvent(new ErrorEvent("error",{error:d,message:p}));return}throw isExitCodeZero(d)||showCriticalErrorBox(p),d}}}return t}let functionsMaybeMissingFromAsyncify=[];function getFunctionsMaybeMissingFromAsyncify(){return functionsMaybeMissingFromAsyncify}function clarifyErrorMessage(e,t){if(e.message==="unreachable"){let r=UNREACHABLE_ERROR;t||(r+=`

This stack trace is lacking. For a better one initialize 
the PHP runtime with { debug: true }, e.g. PHPNode.load('8.1', { debug: true }).

`),functionsMaybeMissingFromAsyncify=extractPHPFunctionsFromStack(t||e.stack||"");for(const o of functionsMaybeMissingFromAsyncify)r+=`    * ${o}
`;return r}return e.message}const UNREACHABLE_ERROR=`
"unreachable" WASM instruction executed.

The typical reason is a PHP function missing from the ASYNCIFY_ONLY
list when building PHP.wasm.

You will need to file a new issue in the WordPress Playground repository
and paste this error message there:

https://github.com/WordPress/wordpress-playground/issues/new

If you're a core developer, the typical fix is to:

* Isolate a minimal reproduction of the error
* Add a reproduction of the error to php-asyncify.spec.ts in the WordPress Playground repository
* Run 'npm run fix-asyncify'
* Commit the changes, push to the repo, release updated NPM packages

Below is a list of all the PHP functions found in the stack trace to
help with the minimal reproduction. If they're all already listed in
the Dockerfile, you'll need to trigger this error again with long stack
traces enabled. In node.js, you can do it using the --stack-trace-limit=100
CLI option: 

`,redBg="\x1B[41m",bold="\x1B[1m",reset="\x1B[0m",eol="\x1B[K";let logged=!1;function showCriticalErrorBox(e){if(!logged&&(logged=!0,!e?.trim().startsWith("Program terminated with exit"))){logger.log(`${redBg}
${eol}
${bold}  WASM ERROR${reset}${redBg}`);for(const t of e.split(`
`))logger.log(`${eol}  ${t} `);logger.log(`${reset}`)}}function extractPHPFunctionsFromStack(e){try{const t=e.split(`
`).slice(1).map(r=>{const o=r.trim().substring(3).split(" ");return{fn:o.length>=2?o[0]:"<unknown>",isWasm:r.includes("wasm://")}}).filter(({fn:r,isWasm:o})=>o&&!r.startsWith("dynCall_")&&!r.startsWith("invoke_")).map(({fn:r})=>r);return Array.from(new Set(t))}catch{return[]}}const STRING="string",NUMBER="number",__private__dont__use=Symbol("__private__dont__use");class PHPExecutionFailureError extends Error{constructor(t,r,o){super(t),this.response=r,this.source=o}}const PHP_INI_PATH="/internal/shared/php.ini",AUTO_PREPEND_SCRIPT="/internal/shared/auto_prepend_file.php";class PHP{constructor(e){this.#webSapiInitialized=!1,this.#wasmErrorsTarget=null,this.#eventListeners=new Map,this.#messageListeners=[],this.semaphore=new Semaphore({concurrency:1}),e!==void 0&&this.initializeRuntime(e)}#sapiName;#webSapiInitialized;#wasmErrorsTarget;#eventListeners;#messageListeners;addEventListener(e,t){this.#eventListeners.has(e)||this.#eventListeners.set(e,new Set),this.#eventListeners.get(e).add(t)}removeEventListener(e,t){this.#eventListeners.get(e)?.delete(t)}dispatchEvent(e){const t=this.#eventListeners.get(e.type);if(t)for(const r of t)r(e)}onMessage(e){this.#messageListeners.push(e)}async setSpawnHandler(handler){typeof handler=="string"&&(handler=createSpawnHandler(eval(handler))),this[__private__dont__use].spawnProcess=handler}get absoluteUrl(){return this.requestHandler.absoluteUrl}get documentRoot(){return this.requestHandler.documentRoot}pathToInternalUrl(e){return this.requestHandler.pathToInternalUrl(e)}internalUrlToPath(e){return this.requestHandler.internalUrlToPath(e)}initializeRuntime(e){if(this[__private__dont__use])throw new Error("PHP runtime already initialized.");const t=getLoadedRuntime(e);if(!t)throw new Error("Invalid PHP runtime id.");this[__private__dont__use]=t,this[__private__dont__use].ccall("wasm_set_phpini_path",null,["string"],[PHP_INI_PATH]),this.fileExists(PHP_INI_PATH)||this.writeFile(PHP_INI_PATH,["auto_prepend_file="+AUTO_PREPEND_SCRIPT,"memory_limit=256M","ignore_repeated_errors = 1","error_reporting = E_ALL","display_errors = 1","html_errors = 1","display_startup_errors = On","log_errors = 1","always_populate_raw_post_data = -1","upload_max_filesize = 2000M","post_max_size = 2000M","disable_functions = curl_exec,curl_multi_exec","allow_url_fopen = Off","allow_url_include = Off","session.save_path = /home/web_user","implicit_flush = 1","output_buffering = 0","max_execution_time = 0","max_input_time = -1"].join(`
`)),this.fileExists(AUTO_PREPEND_SCRIPT)||this.writeFile(AUTO_PREPEND_SCRIPT,`<?php
				// Define constants set via defineConstant() calls
				if(file_exists('/internal/shared/consts.json')) {
					$consts = json_decode(file_get_contents('/internal/shared/consts.json'), true);
					foreach ($consts as $const => $value) {
						if (!defined($const) && is_scalar($value)) {
							define($const, $value);
						}
					}
				}
				// Preload all the files from /internal/shared/preload
				foreach (glob('/internal/shared/preload/*.php') as $file) {
					require_once $file;
				}
				`),t.onMessage=async r=>{for(const o of this.#messageListeners){const l=await o(r);if(l)return l}return""},this.#wasmErrorsTarget=improveWASMErrorReporting(t),this.dispatchEvent({type:"runtime.initialized"})}async setSapiName(e){if(this[__private__dont__use].ccall("wasm_set_sapi_name",NUMBER,[STRING],[e])!==0)throw new Error("Could not set SAPI name. This can only be done before the PHP WASM module is initialized.Did you already dispatch any requests?");this.#sapiName=e}chdir(e){this[__private__dont__use].FS.chdir(e)}async request(e){if(logger.warn("PHP.request() is deprecated. Please use new PHPRequestHandler() instead."),!this.requestHandler)throw new Error("No request handler available.");return this.requestHandler.request(e)}async run(e){const t=await this.semaphore.acquire();let r;try{if(this.#webSapiInitialized||(this.#initWebRuntime(),this.#webSapiInitialized=!0),e.scriptPath&&!this.fileExists(e.scriptPath))throw new Error(`The script path "${e.scriptPath}" does not exist.`);this.#setRelativeRequestUri(e.relativeUri||""),this.#setRequestMethod(e.method||"GET");const o=normalizeHeaders(e.headers||{}),l=o.host||"example.com:443",d=this.#inferPortFromHostAndProtocol(l,e.protocol||"http");if(this.#setRequestHost(l),this.#setRequestPort(d),this.#setRequestHeaders(o),e.body&&(r=this.#setRequestBody(e.body)),typeof e.code=="string")this.writeFile("/internal/eval.php",e.code),this.#setScriptPath("/internal/eval.php");else if(typeof e.scriptPath=="string")this.#setScriptPath(e.scriptPath||"");else throw new TypeError("The request object must have either a `code` or a `scriptPath` property.");const p=this.#prepareServerEntries(e.$_SERVER,o,d);for(const _ in p)this.#setServerGlobalEntry(_,p[_]);const c=e.env||{};for(const _ in c)this.#setEnv(_,c[_]);const m=await this.#handleRequest();if(m.exitCode!==0){logger.warn("PHP.run() output was:",m.text);const _=new PHPExecutionFailureError(`PHP.run() failed with exit code ${m.exitCode} and the following output: `+m.errors,m,"request");throw logger.error(_),_}return m}catch(o){throw this.dispatchEvent({type:"request.error",error:o,source:o.source??"php-wasm"}),o}finally{try{r&&this[__private__dont__use].free(r)}finally{t(),this.dispatchEvent({type:"request.end"})}}}#prepareServerEntries(e,t,r){const o={...e||{}};o.HTTPS=o.HTTPS||r===443?"on":"off";for(const l in t){let d="HTTP_";["content-type","content-length"].includes(l.toLowerCase())&&(d=""),o[`${d}${l.toUpperCase().replace(/-/g,"_")}`]=t[l]}return o}#initWebRuntime(){this[__private__dont__use].ccall("php_wasm_init",null,[],[])}#getResponseHeaders(){const e="/internal/headers.json";if(!this.fileExists(e))throw new Error("SAPI Error: Could not find response headers file.");const t=JSON.parse(this.readFileAsText(e)),r={};for(const o of t.headers){if(!o.includes(": "))continue;const l=o.indexOf(": "),d=o.substring(0,l).toLowerCase(),p=o.substring(l+2);d in r||(r[d]=[]),r[d].push(p)}return{headers:r,httpStatusCode:t.status}}#setRelativeRequestUri(e){if(this[__private__dont__use].ccall("wasm_set_request_uri",null,[STRING],[e]),e.includes("?")){const t=e.substring(e.indexOf("?")+1);this[__private__dont__use].ccall("wasm_set_query_string",null,[STRING],[t])}}#setRequestHost(e){this[__private__dont__use].ccall("wasm_set_request_host",null,[STRING],[e])}#setRequestPort(e){this[__private__dont__use].ccall("wasm_set_request_port",null,[NUMBER],[e])}#inferPortFromHostAndProtocol(e,t){let r;try{r=parseInt(new URL(e).port,10)}catch{}return(!r||isNaN(r)||r===80)&&(r=t==="https"?443:80),r}#setRequestMethod(e){this[__private__dont__use].ccall("wasm_set_request_method",null,[STRING],[e])}#setRequestHeaders(e){e.cookie&&this[__private__dont__use].ccall("wasm_set_cookies",null,[STRING],[e.cookie]),e["content-type"]&&this[__private__dont__use].ccall("wasm_set_content_type",null,[STRING],[e["content-type"]]),e["content-length"]&&this[__private__dont__use].ccall("wasm_set_content_length",null,[NUMBER],[parseInt(e["content-length"],10)])}#setRequestBody(e){let t,r;typeof e=="string"?(logger.warn("Passing a string as the request body is deprecated. Please use a Uint8Array instead. See https://github.com/WordPress/wordpress-playground/issues/997 for more details"),r=this[__private__dont__use].lengthBytesUTF8(e),t=r+1):(r=e.byteLength,t=e.byteLength);const o=this[__private__dont__use].malloc(t);if(!o)throw new Error("Could not allocate memory for the request body.");return typeof e=="string"?this[__private__dont__use].stringToUTF8(e,o,t+1):this[__private__dont__use].HEAPU8.set(e,o),this[__private__dont__use].ccall("wasm_set_request_body",null,[NUMBER],[o]),this[__private__dont__use].ccall("wasm_set_content_length",null,[NUMBER],[r]),o}#setScriptPath(e){this[__private__dont__use].ccall("wasm_set_path_translated",null,[STRING],[e])}#setServerGlobalEntry(e,t){this[__private__dont__use].ccall("wasm_add_SERVER_entry",null,[STRING,STRING],[e,t])}#setEnv(e,t){this[__private__dont__use].ccall("wasm_add_ENV_entry",null,[STRING,STRING],[e,t])}defineConstant(e,t){let r={};try{r=JSON.parse(this.fileExists("/internal/shared/consts.json")&&this.readFileAsText("/internal/shared/consts.json")||"{}")}catch{}this.writeFile("/internal/shared/consts.json",JSON.stringify({...r,[e]:t}))}async#handleRequest(){let e,t;try{e=await new Promise((l,d)=>{t=c=>{logger.error(c),logger.error(c.error);const m=new Error("Rethrown");m.cause=c.error,m.betterMessage=c.message,d(m)},this.#wasmErrorsTarget?.addEventListener("error",t);const p=this[__private__dont__use].ccall("wasm_sapi_handle_request",NUMBER,[],[],{async:!0});return p instanceof Promise?p.then(l,d):l(p)})}catch(l){for(const m in this)typeof this[m]=="function"&&(this[m]=()=>{throw new Error("PHP runtime has crashed – see the earlier error for details.")});this.functionsMaybeMissingFromAsyncify=getFunctionsMaybeMissingFromAsyncify();const d=l,p="betterMessage"in d?d.betterMessage:d.message,c=new Error(p);throw c.cause=d,logger.error(c),c}finally{this.#wasmErrorsTarget?.removeEventListener("error",t)}const{headers:r,httpStatusCode:o}=this.#getResponseHeaders();return new PHPResponse(e===0?o:500,r,this.readFileAsBuffer("/internal/stdout"),this.readFileAsText("/internal/stderr"),e)}mkdir(e){return FSHelpers.mkdir(this[__private__dont__use].FS,e)}mkdirTree(e){return FSHelpers.mkdir(this[__private__dont__use].FS,e)}readFileAsText(e){return FSHelpers.readFileAsText(this[__private__dont__use].FS,e)}readFileAsBuffer(e){return FSHelpers.readFileAsBuffer(this[__private__dont__use].FS,e)}writeFile(e,t){return FSHelpers.writeFile(this[__private__dont__use].FS,e,t)}unlink(e){return FSHelpers.unlink(this[__private__dont__use].FS,e)}mv(e,t){return FSHelpers.mv(this[__private__dont__use].FS,e,t)}rmdir(e,t={recursive:!0}){return FSHelpers.rmdir(this[__private__dont__use].FS,e,t)}listFiles(e,t={prependPath:!1}){return FSHelpers.listFiles(this[__private__dont__use].FS,e,t)}isDir(e){return FSHelpers.isDir(this[__private__dont__use].FS,e)}isFile(e){return FSHelpers.isFile(this[__private__dont__use].FS,e)}symlink(e,t){return FSHelpers.symlink(this[__private__dont__use].FS,e,t)}isSymlink(e){return FSHelpers.isSymlink(this[__private__dont__use].FS,e)}readlink(e){return FSHelpers.readlink(this[__private__dont__use].FS,e)}realpath(e){return FSHelpers.realpath(this[__private__dont__use].FS,e)}fileExists(e){return FSHelpers.fileExists(this[__private__dont__use].FS,e)}hotSwapPHPRuntime(e,t){const r=this[__private__dont__use].FS;try{this.exit()}catch{}this.initializeRuntime(e),this.#sapiName&&this.setSapiName(this.#sapiName),t&&copyFS(r,this[__private__dont__use].FS,t)}async mount(e,t){return await t(this,this[__private__dont__use].FS,e)}async cli(e){for(const t of e)this[__private__dont__use].ccall("wasm_add_cli_arg",null,[STRING],[t]);try{return await this[__private__dont__use].ccall("run_cli",null,[],[],{async:!0})}catch(t){if(isExitCodeZero(t))return 0;throw t}}setSkipShebang(e){this[__private__dont__use].ccall("wasm_set_skip_shebang",null,[NUMBER],[e?1:0])}exit(e=0){this.dispatchEvent({type:"runtime.beforedestroy"});try{this[__private__dont__use]._exit(e)}catch{}this.#webSapiInitialized=!1,this.#wasmErrorsTarget=null,delete this[__private__dont__use].onMessage,delete this[__private__dont__use]}[Symbol.dispose](){this.#webSapiInitialized&&this.exit(0)}}function normalizeHeaders(e){const t={};for(const r in e)t[r.toLowerCase()]=e[r];return t}function copyFS(e,t,r){let o;try{o=e.lookupPath(r)}catch{return}if(!("contents"in o.node))return;if(!e.isDir(o.node.mode)){t.writeFile(r,e.readFile(r));return}t.mkdirTree(r);const l=e.readdir(r).filter(d=>d!=="."&&d!=="..");for(const d of l)copyFS(e,t,joinPaths(r,d))}const{hasOwnProperty}=Object.prototype,encode=(e,t={})=>{typeof t=="string"&&(t={section:t}),t.align=t.align===!0,t.newline=t.newline===!0,t.sort=t.sort===!0,t.whitespace=t.whitespace===!0||t.align===!0,t.platform=t.platform||typeof process<"u"&&process.platform,t.bracketedArray=t.bracketedArray!==!1;const r=t.platform==="win32"?`\r
`:`
`,o=t.whitespace?" = ":"=",l=[],d=t.sort?Object.keys(e).sort():Object.keys(e);let p=0;t.align&&(p=safe(d.filter(_=>e[_]===null||Array.isArray(e[_])||typeof e[_]!="object").map(_=>Array.isArray(e[_])?`${_}[]`:_).concat([""]).reduce((_,y)=>safe(_).length>=safe(y).length?_:y)).length);let c="";const m=t.bracketedArray?"[]":"";for(const _ of d){const y=e[_];if(y&&Array.isArray(y))for(const w of y)c+=safe(`${_}${m}`).padEnd(p," ")+o+safe(w)+r;else y&&typeof y=="object"?l.push(_):c+=safe(_).padEnd(p," ")+o+safe(y)+r}t.section&&c.length&&(c="["+safe(t.section)+"]"+(t.newline?r+r:r)+c);for(const _ of l){const y=splitSections(_,".").join("\\."),w=(t.section?t.section+".":"")+y,x=encode(e[_],{...t,section:w});c.length&&x.length&&(c+=r),c+=x}return c};function splitSections(e,t){var r=0,o=0,l=0,d=[];do if(l=e.indexOf(t,r),l!==-1){if(r=l+t.length,l>0&&e[l-1]==="\\")continue;d.push(e.slice(o,l)),o=l+t.length}while(l!==-1);return d.push(e.slice(o)),d}const decode=(e,t={})=>{t.bracketedArray=t.bracketedArray!==!1;const r=Object.create(null);let o=r,l=null;const d=/^\[([^\]]*)\]\s*$|^([^=]+)(=(.*))?$/i,p=e.split(/[\r\n]+/g),c={};for(const _ of p){if(!_||_.match(/^\s*[;#]/)||_.match(/^\s*$/))continue;const y=_.match(d);if(!y)continue;if(y[1]!==void 0){if(l=unsafe(y[1]),l==="__proto__"){o=Object.create(null);continue}o=r[l]=r[l]||Object.create(null);continue}const w=unsafe(y[2]);let x;t.bracketedArray?x=w.length>2&&w.slice(-2)==="[]":(c[w]=(c?.[w]||0)+1,x=c[w]>1);const b=x?w.slice(0,-2):w;if(b==="__proto__")continue;const B=y[3]?unsafe(y[4]):!0,U=B==="true"||B==="false"||B==="null"?JSON.parse(B):B;x&&(hasOwnProperty.call(o,b)?Array.isArray(o[b])||(o[b]=[o[b]]):o[b]=[]),Array.isArray(o[b])?o[b].push(U):o[b]=U}const m=[];for(const _ of Object.keys(r)){if(!hasOwnProperty.call(r,_)||typeof r[_]!="object"||Array.isArray(r[_]))continue;const y=splitSections(_,".");o=r;const w=y.pop(),x=w.replace(/\\\./g,".");for(const b of y)b!=="__proto__"&&((!hasOwnProperty.call(o,b)||typeof o[b]!="object")&&(o[b]=Object.create(null)),o=o[b]);o===r&&x===w||(o[x]=r[_],m.push(_))}for(const _ of m)delete r[_];return r},isQuoted=e=>e.startsWith('"')&&e.endsWith('"')||e.startsWith("'")&&e.endsWith("'"),safe=e=>typeof e!="string"||e.match(/[=\r\n]/)||e.match(/^\[/)||e.length>1&&isQuoted(e)||e!==e.trim()?JSON.stringify(e):e.split(";").join("\\;").split("#").join("\\#"),unsafe=e=>{if(e=(e||"").trim(),isQuoted(e)){e.charAt(0)==="'"&&(e=e.slice(1,-1));try{e=JSON.parse(e)}catch{}}else{let t=!1,r="";for(let o=0,l=e.length;o<l;o++){const d=e.charAt(o);if(t)"\\;#".indexOf(d)!==-1?r+=d:r+="\\"+d,t=!1;else{if(";#".indexOf(d)!==-1)break;d==="\\"?t=!0:r+=d}}return t&&(r+="\\"),r.trim()}return e};var ini={parse:decode,decode,stringify:encode,encode,safe,unsafe};async function setPhpIniEntries(e,t){const r=ini.parse(await e.readFileAsText(PHP_INI_PATH));for(const[o,l]of Object.entries(t))l==null?delete r[o]:r[o]=l;await e.writeFile(PHP_INI_PATH,ini.stringify(r))}async function withPHPIniValues(e,t,r){const o=await e.readFileAsText(PHP_INI_PATH);try{return await setPhpIniEntries(e,t),await r()}finally{await e.writeFile(PHP_INI_PATH,o)}}class HttpCookieStore{constructor(){this.cookies={}}rememberCookiesFromResponseHeaders(t){if(t?.["set-cookie"])for(const r of t["set-cookie"])try{if(!r.includes("="))continue;const o=r.indexOf("="),l=r.substring(0,o),d=r.substring(o+1).split(";")[0];this.cookies[l]=d}catch(o){logger.error(o)}}getCookieRequestHeader(){const t=[];for(const r in this.cookies)t.push(`${r}=${this.cookies[r]}`);return t.join("; ")}}ReadableStream.prototype[Symbol.asyncIterator]||(ReadableStream.prototype[Symbol.asyncIterator]=async function*(){const e=this.getReader();try{for(;;){const{done:t,value:r}=await e.read();if(t)return;yield r}}finally{e.releaseLock()}},ReadableStream.prototype.iterate=ReadableStream.prototype[Symbol.asyncIterator]);class MaxPhpInstancesError extends Error{constructor(t){super(`Requested more concurrent PHP instances than the limit (${t}).`),this.name=this.constructor.name}}class PHPProcessManager{constructor(t){this.primaryIdle=!0,this.nextInstance=null,this.allInstances=[],this.maxPhpInstances=t?.maxPhpInstances??5,this.phpFactory=t?.phpFactory,this.primaryPhp=t?.primaryPhp,this.semaphore=new Semaphore({concurrency:this.maxPhpInstances,timeout:t?.timeout||5e3})}async getPrimaryPhp(){if(!this.phpFactory&&!this.primaryPhp)throw new Error("phpFactory or primaryPhp must be set before calling getPrimaryPhp().");if(!this.primaryPhp){const t=await this.spawn({isPrimary:!0});this.primaryPhp=t.php}return this.primaryPhp}async acquirePHPInstance(){if(this.primaryIdle)return this.primaryIdle=!1,{php:await this.getPrimaryPhp(),reap:()=>this.primaryIdle=!0};const t=this.nextInstance||this.spawn({isPrimary:!1});return this.semaphore.remaining>0?this.nextInstance=this.spawn({isPrimary:!1}):this.nextInstance=null,await t}spawn(t){if(t.isPrimary&&this.allInstances.length>0)throw new Error("Requested spawning a primary PHP instance when another primary instance already started spawning.");const r=this.doSpawn(t);this.allInstances.push(r);const o=()=>{this.allInstances=this.allInstances.filter(l=>l!==r)};return r.catch(l=>{throw o(),l}).then(l=>({...l,reap:()=>{o(),l.reap()}}))}async doSpawn(t){let r;try{r=await this.semaphore.acquire()}catch(o){throw o instanceof AcquireTimeoutError?new MaxPhpInstancesError(this.maxPhpInstances):o}try{const o=await this.phpFactory(t);return{php:o,reap(){o.exit(),r()}}}catch(o){throw r(),o}}async[Symbol.asyncDispose](){this.primaryPhp&&this.primaryPhp.exit(),await Promise.all(this.allInstances.map(t=>t.then(({reap:r})=>r())))}}const SupportedPHPVersions=["8.3","8.2","8.1","8.0","7.4","7.3","7.2","7.1","7.0"],LatestSupportedPHPVersion=SupportedPHPVersions[0],SupportedPHPVersionsList=SupportedPHPVersions,DEFAULT_BASE_URL="http://example.com";function toRelativeUrl(e){return e.toString().substring(e.origin.length)}function removePathPrefix(e,t){return!t||!e.startsWith(t)?e:e.substring(t.length)}function ensurePathPrefix(e,t){return!t||e.startsWith(t)?e:t+e}async function encodeAsMultipart(e){const t=`----${Math.random().toString(36).slice(2)}`,r=`multipart/form-data; boundary=${t}`,o=new TextEncoder,l=[];for(const[m,_]of Object.entries(e))l.push(`--${t}\r
`),l.push(`Content-Disposition: form-data; name="${m}"`),_ instanceof File&&l.push(`; filename="${_.name}"`),l.push(`\r
`),_ instanceof File&&(l.push("Content-Type: application/octet-stream"),l.push(`\r
`)),l.push(`\r
`),_ instanceof File?l.push(await fileToUint8Array(_)):l.push(_),l.push(`\r
`);l.push(`--${t}--\r
`);const d=l.reduce((m,_)=>m+_.length,0),p=new Uint8Array(d);let c=0;for(const m of l)p.set(typeof m=="string"?o.encode(m):m,c),c+=m.length;return{bytes:p,contentType:r}}function fileToUint8Array(e){return new Promise(t=>{const r=new FileReader;r.onload=()=>{t(new Uint8Array(r.result))},r.readAsArrayBuffer(e)})}const _default="application/octet-stream",asx="video/x-ms-asf",atom="application/atom+xml",avi="video/x-msvideo",avif="image/avif",bin="application/octet-stream",bmp="image/x-ms-bmp",cco="application/x-cocoa",css="text/css",data="application/octet-stream",deb="application/octet-stream",der="application/x-x509-ca-cert",dmg="application/octet-stream",doc="application/msword",docx="application/vnd.openxmlformats-officedocument.wordprocessingml.document",eot="application/vnd.ms-fontobject",flv="video/x-flv",gif="image/gif",gz="application/gzip",hqx="application/mac-binhex40",htc="text/x-component",html="text/html",ico="image/x-icon",iso="application/octet-stream",jad="text/vnd.sun.j2me.app-descriptor",jar="application/java-archive",jardiff="application/x-java-archive-diff",jng="image/x-jng",jnlp="application/x-java-jnlp-file",jpg="image/jpeg",jpeg="image/jpeg",js="application/javascript",json="application/json",kml="application/vnd.google-earth.kml+xml",kmz="application/vnd.google-earth.kmz",m3u8="application/vnd.apple.mpegurl",m4a="audio/x-m4a",m4v="video/x-m4v",md="text/plain",mid="audio/midi",mml="text/mathml",mng="video/x-mng",mov="video/quicktime",mp3="audio/mpeg",mp4="video/mp4",mpeg="video/mpeg",msi="application/octet-stream",odg="application/vnd.oasis.opendocument.graphics",odp="application/vnd.oasis.opendocument.presentation",ods="application/vnd.oasis.opendocument.spreadsheet",odt="application/vnd.oasis.opendocument.text",ogg="audio/ogg",otf="font/otf",pdf="application/pdf",pl="application/x-perl",png="image/png",ppt="application/vnd.ms-powerpoint",pptx="application/vnd.openxmlformats-officedocument.presentationml.presentation",prc="application/x-pilot",ps="application/postscript",ra="audio/x-realaudio",rar="application/x-rar-compressed",rpm="application/x-redhat-package-manager",rss="application/rss+xml",rtf="application/rtf",run="application/x-makeself",sea="application/x-sea",sit="application/x-stuffit",svg="image/svg+xml",swf="application/x-shockwave-flash",tcl="application/x-tcl",tar="application/x-tar",tif="image/tiff",ts="video/mp2t",ttf="font/ttf",txt="text/plain",wasm="application/wasm",wbmp="image/vnd.wap.wbmp",webm="video/webm",webp="image/webp",wml="text/vnd.wap.wml",wmlc="application/vnd.wap.wmlc",wmv="video/x-ms-wmv",woff="font/woff",woff2="font/woff2",xhtml="application/xhtml+xml",xls="application/vnd.ms-excel",xlsx="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",xml="text/xml",xpi="application/x-xpinstall",xspf="application/xspf+xml",zip="application/zip";var mimeTypes={_default,"3gpp":"video/3gpp","7z":"application/x-7z-compressed",asx,atom,avi,avif,bin,bmp,cco,css,data,deb,der,dmg,doc,docx,eot,flv,gif,gz,hqx,htc,html,ico,iso,jad,jar,jardiff,jng,jnlp,jpg,jpeg,js,json,kml,kmz,m3u8,m4a,m4v,md,mid,mml,mng,mov,mp3,mp4,mpeg,msi,odg,odp,ods,odt,ogg,otf,pdf,pl,png,ppt,pptx,prc,ps,ra,rar,rpm,rss,rtf,run,sea,sit,svg,swf,tcl,tar,tif,ts,ttf,txt,wasm,wbmp,webm,webp,wml,wmlc,wmv,woff,woff2,xhtml,xls,xlsx,xml,xpi,xspf,zip};class PHPRequestHandler{#e;#t;#n;#i;#s;#r;#o;#a;constructor(t){const{documentRoot:r="/www/",absoluteUrl:o=typeof location=="object"?location?.href:"",rewriteRules:l=[],getFileNotFoundAction:d=()=>({type:"404"})}=t;"processManager"in t?this.processManager=t.processManager:this.processManager=new PHPProcessManager({phpFactory:async m=>{const _=await t.phpFactory({...m,requestHandler:this});return _.requestHandler=this,_},maxPhpInstances:t.maxPhpInstances}),this.#a=new HttpCookieStore,this.#e=r;const p=new URL(o);this.#n=p.hostname,this.#i=p.port?Number(p.port):p.protocol==="https:"?443:80,this.#t=(p.protocol||"").replace(":","");const c=this.#i!==443&&this.#i!==80;this.#s=[this.#n,c?`:${this.#i}`:""].join(""),this.#r=p.pathname.replace(/\/+$/,""),this.#o=[`${this.#t}://`,this.#s,this.#r].join(""),this.rewriteRules=l,this.getFileNotFoundAction=d}async getPrimaryPhp(){return await this.processManager.getPrimaryPhp()}pathToInternalUrl(t){return`${this.absoluteUrl}${t}`}internalUrlToPath(t){const r=new URL(t);return r.pathname.startsWith(this.#r)&&(r.pathname=r.pathname.slice(this.#r.length)),toRelativeUrl(r)}get absoluteUrl(){return this.#o}get documentRoot(){return this.#e}async request(t){const r=t.url.startsWith("http://")||t.url.startsWith("https://"),o=new URL(t.url.split("#")[0],r?void 0:DEFAULT_BASE_URL),l=applyRewriteRules(removePathPrefix(decodeURIComponent(o.pathname),this.#r),this.rewriteRules),d=await this.getPrimaryPhp();let p=joinPaths(this.#e,l);if(d.isDir(p)){if(!p.endsWith("/"))return new PHPResponse(301,{Location:[`${o.pathname}/`]},new Uint8Array(0));for(const c of["index.php","index.html"]){const m=joinPaths(p,c);if(d.isFile(m)){p=m;break}}}if(!d.isFile(p)){const c=this.getFileNotFoundAction(l);switch(c.type){case"response":return c.response;case"internal-redirect":p=joinPaths(this.#e,c.uri);break;case"404":return PHPResponse.forHttpCode(404);default:throw new Error(`Unsupported file-not-found action type: '${c.type}'`)}}if(d.isFile(p))if(p.endsWith(".php")){const c={...t,url:o.toString()};return this.#c(c,p)}else return this.#l(d,p);else return PHPResponse.forHttpCode(404)}#l(t,r){const o=t.readFileAsBuffer(r);return new PHPResponse(200,{"content-length":[`${o.byteLength}`],"content-type":[inferMimeType(r)],"accept-ranges":["bytes"],"cache-control":["public, max-age=0"]},o)}async#c(t,r){let o;try{o=await this.processManager.acquirePHPInstance()}catch(l){return l instanceof MaxPhpInstancesError?PHPResponse.forHttpCode(502):PHPResponse.forHttpCode(500)}try{return await this.#u(o.php,t,r)}finally{o.reap()}}async#u(t,r,o){let l="GET";const d={host:this.#s,...normalizeHeaders(r.headers||{}),cookie:this.#a.getCookieRequestHeader()};let p=r.body;if(typeof p=="object"&&!(p instanceof Uint8Array)){l="POST";const{bytes:c,contentType:m}=await encodeAsMultipart(p);p=c,d["content-type"]=m}try{const c=await t.run({relativeUri:ensurePathPrefix(toRelativeUrl(new URL(r.url)),this.#r),protocol:this.#t,method:r.method||l,$_SERVER:{REMOTE_ADDR:"127.0.0.1",DOCUMENT_ROOT:this.#e,HTTPS:this.#o.startsWith("https://")?"on":""},body:p,scriptPath:o,headers:d});return this.#a.rememberCookiesFromResponseHeaders(c.headers),c}catch(c){const m=c;if(m?.response)return m.response;throw c}}}function inferMimeType(e){const t=e.split(".").pop();return mimeTypes[t]||mimeTypes._default}function applyRewriteRules(e,t){for(const r of t)if(new RegExp(r.match).test(e))return e.replace(r.match,r.replacement);return e}function rotatePHPRuntime({php:e,cwd:t,recreateRuntime:r,maxRequests:o=400}){let l=0;async function d(){const m=await e.semaphore.acquire();try{e.hotSwapPHPRuntime(await r(),t),l=0}finally{m()}}async function p(){++l<o||await d()}async function c(m){m.type==="request.error"&&m.source==="php-wasm"&&await d()}return e.addEventListener("request.error",c),e.addEventListener("request.end",p),function(){e.removeEventListener("request.error",c),e.removeEventListener("request.end",p)}}async function writeFiles(e,t,r,{rmRoot:o=!1}={}){o&&await e.isDir(t)&&await e.rmdir(t,{recursive:!0});for(const[l,d]of Object.entries(r)){const p=joinPaths(t,l);await e.fileExists(dirname(p))||await e.mkdir(dirname(p)),d instanceof Uint8Array||typeof d=="string"?await e.writeFile(p,d):await writeFiles(e,p,d)}}function proxyFileSystem(e,t,r){const o=Object.getOwnPropertySymbols(e)[0];for(const l of r)t.fileExists(l)||t.mkdir(l),e.fileExists(l)||e.mkdir(l),t[o].FS.mount(t[o].PROXYFS,{root:l,fs:e[o].FS},l)}/**
 * @license
 * Copyright 2019 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */const proxyMarker=Symbol("Comlink.proxy"),createEndpoint=Symbol("Comlink.endpoint"),releaseProxy=Symbol("Comlink.releaseProxy"),finalizer=Symbol("Comlink.finalizer"),throwMarker=Symbol("Comlink.thrown"),isObject=e=>typeof e=="object"&&e!==null||typeof e=="function",proxyTransferHandler={canHandle:e=>isObject(e)&&e[proxyMarker],serialize(e){const{port1:t,port2:r}=new MessageChannel;return expose(e,t),[r,[r]]},deserialize(e){return e.start(),wrap(e)}},throwTransferHandler={canHandle:e=>isObject(e)&&throwMarker in e,serialize({value:e}){let t;return e instanceof Error?t={isError:!0,value:{message:e.message,name:e.name,stack:e.stack}}:t={isError:!1,value:e},[t,[]]},deserialize(e){throw e.isError?Object.assign(new Error(e.value.message),e.value):e.value}},transferHandlers=new Map([["proxy",proxyTransferHandler],["throw",throwTransferHandler]]);function isAllowedOrigin(e,t){for(const r of e)if(t===r||r==="*"||r instanceof RegExp&&r.test(t))return!0;return!1}function expose(e,t=globalThis,r=["*"]){t.addEventListener("message",function o(l){if(!l||!l.data)return;if(!isAllowedOrigin(r,l.origin)){console.warn(`Invalid origin '${l.origin}' for comlink proxy`);return}const{id:d,type:p,path:c}=Object.assign({path:[]},l.data),m=(l.data.argumentList||[]).map(fromWireValue);let _;try{const y=c.slice(0,-1).reduce((x,b)=>x[b],e),w=c.reduce((x,b)=>x[b],e);switch(p){case"GET":_=w;break;case"SET":y[c.slice(-1)[0]]=fromWireValue(l.data.value),_=!0;break;case"APPLY":_=w.apply(y,m);break;case"CONSTRUCT":{const x=new w(...m);_=proxy(x)}break;case"ENDPOINT":{const{port1:x,port2:b}=new MessageChannel;expose(e,b),_=transfer(x,[x])}break;case"RELEASE":_=void 0;break;default:return}}catch(y){_={value:y,[throwMarker]:0}}Promise.resolve(_).catch(y=>({value:y,[throwMarker]:0})).then(y=>{const[w,x]=toWireValue(y);t.postMessage(Object.assign(Object.assign({},w),{id:d}),x),p==="RELEASE"&&(t.removeEventListener("message",o),closeEndPoint(t),finalizer in e&&typeof e[finalizer]=="function"&&e[finalizer]())}).catch(y=>{const[w,x]=toWireValue({value:new TypeError("Unserializable return value"),[throwMarker]:0});t.postMessage(Object.assign(Object.assign({},w),{id:d}),x)})}),t.start&&t.start()}function isMessagePort(e){return e.constructor.name==="MessagePort"}function closeEndPoint(e){isMessagePort(e)&&e.close()}function wrap(e,t){return createProxy(e,[],t)}function throwIfProxyReleased(e){if(e)throw new Error("Proxy has been released and is not useable")}function releaseEndpoint(e){return requestResponseMessage(e,{type:"RELEASE"}).then(()=>{closeEndPoint(e)})}const proxyCounter=new WeakMap,proxyFinalizers="FinalizationRegistry"in globalThis&&new FinalizationRegistry(e=>{const t=(proxyCounter.get(e)||0)-1;proxyCounter.set(e,t),t===0&&releaseEndpoint(e)});function registerProxy(e,t){const r=(proxyCounter.get(t)||0)+1;proxyCounter.set(t,r),proxyFinalizers&&proxyFinalizers.register(e,t,e)}function unregisterProxy(e){proxyFinalizers&&proxyFinalizers.unregister(e)}function createProxy(e,t=[],r=function(){}){let o=!1;const l=new Proxy(r,{get(d,p){if(throwIfProxyReleased(o),p===releaseProxy)return()=>{unregisterProxy(l),releaseEndpoint(e),o=!0};if(p==="then"){if(t.length===0)return{then:()=>l};const c=requestResponseMessage(e,{type:"GET",path:t.map(m=>m.toString())}).then(fromWireValue);return c.then.bind(c)}return createProxy(e,[...t,p])},set(d,p,c){throwIfProxyReleased(o);const[m,_]=toWireValue(c);return requestResponseMessage(e,{type:"SET",path:[...t,p].map(y=>y.toString()),value:m},_).then(fromWireValue)},apply(d,p,c){throwIfProxyReleased(o);const m=t[t.length-1];if(m===createEndpoint)return requestResponseMessage(e,{type:"ENDPOINT"}).then(fromWireValue);if(m==="bind")return createProxy(e,t.slice(0,-1));const[_,y]=processArguments(c);return requestResponseMessage(e,{type:"APPLY",path:t.map(w=>w.toString()),argumentList:_},y).then(fromWireValue)},construct(d,p){throwIfProxyReleased(o);const[c,m]=processArguments(p);return requestResponseMessage(e,{type:"CONSTRUCT",path:t.map(_=>_.toString()),argumentList:c},m).then(fromWireValue)}});return registerProxy(l,e),l}function myFlat(e){return Array.prototype.concat.apply([],e)}function processArguments(e){const t=e.map(toWireValue);return[t.map(r=>r[0]),myFlat(t.map(r=>r[1]))]}const transferCache=new WeakMap;function transfer(e,t){return transferCache.set(e,t),e}function proxy(e){return Object.assign(e,{[proxyMarker]:!0})}function windowEndpoint(e,t=globalThis,r="*"){return{postMessage:(o,l)=>e.postMessage(o,r,l),addEventListener:t.addEventListener.bind(t),removeEventListener:t.removeEventListener.bind(t)}}function toWireValue(e){for(const[t,r]of transferHandlers)if(r.canHandle(e)){const[o,l]=r.serialize(e);return[{type:"HANDLER",name:t,value:o},l]}return[{type:"RAW",value:e},transferCache.get(e)||[]]}function fromWireValue(e){switch(e.type){case"HANDLER":return transferHandlers.get(e.name).deserialize(e.value);case"RAW":return e.value}}function requestResponseMessage(e,t,r){return new Promise(o=>{const l=generateUUID();e.addEventListener("message",function d(p){!p.data||!p.data.id||p.data.id!==l||(e.removeEventListener("message",d),o(p.data))}),e.start&&e.start(),e.postMessage(Object.assign({id:l},t),r)})}function generateUUID(){return new Array(4).fill(0).map(()=>Math.floor(Math.random()*Number.MAX_SAFE_INTEGER).toString(16)).join("-")}function exposeAPI(e,t){setupTransferHandlers();const r=Promise.resolve();let o,l;const d=new Promise((m,_)=>{o=m,l=_}),p=proxyClone(e),c=new Proxy(p,{get:(m,_)=>_==="isConnected"?()=>r:_==="isReady"?()=>d:_ in m?m[_]:t?.[_]});return expose(c,typeof window<"u"?windowEndpoint(self.parent):void 0),[o,l,c]}let isTransferHandlersSetup=!1;function setupTransferHandlers(){if(isTransferHandlersSetup)return;isTransferHandlersSetup=!0,transferHandlers.set("EVENT",{canHandle:r=>r instanceof CustomEvent,serialize:r=>[{detail:r.detail},[]],deserialize:r=>r}),transferHandlers.set("FUNCTION",{canHandle:r=>typeof r=="function",serialize(r){const{port1:o,port2:l}=new MessageChannel;return expose(r,o),[l,[l]]},deserialize(r){return r.start(),wrap(r)}}),transferHandlers.set("PHPResponse",{canHandle:r=>typeof r=="object"&&r!==null&&"headers"in r&&"bytes"in r&&"errors"in r&&"exitCode"in r&&"httpStatusCode"in r,serialize(r){return[r.toRawData(),[]]},deserialize(r){return PHPResponse.fromRawData(r)}});const e=transferHandlers.get("throw"),t=e?.serialize;e.serialize=({value:r})=>{const o=t({value:r});return r.response&&(o[0].value.response=r.response),r.source&&(o[0].value.source=r.source),o}}function proxyClone(e){return new Proxy(e,{get(t,r){switch(typeof t[r]){case"function":return(...o)=>t[r](...o);case"object":return t[r]===null?t[r]:proxyClone(t[r]);case"undefined":case"number":case"string":return t[r];default:return proxy(t[r])}}})}const jspi=()=>(async()=>"Suspending"in WebAssembly)();async function getPHPLoaderModule(e=LatestSupportedPHPVersion){if(await jspi())switch(e){case"8.3":return await import("./assets/php_8_3-9936ba6d.js");case"8.2":return await import("./assets/php_8_2-fb8c25b1.js");case"8.1":return await import("./assets/php_8_1-ab2417bb.js");case"8.0":return await import("./assets/php_8_0-f20240da.js");case"7.4":return await import("./assets/php_7_4-020f1207.js");case"7.3":return await import("./assets/php_7_3-5f3892ef.js");case"7.2":return await import("./assets/php_7_2-e39846c9.js");case"7.1":return await import("./assets/php_7_1-1caffad3.js");case"7.0":return await import("./assets/php_7_0-896738fe.js")}else switch(e){case"8.3":return await import("./assets/php_8_3-8f42e022.js");case"8.2":return await import("./assets/php_8_2-7f6b50a9.js");case"8.1":return await import("./assets/php_8_1-7cd42296.js");case"8.0":return await import("./assets/php_8_0-bf0a6cf5.js");case"7.4":return await import("./assets/php_7_4-a1242d85.js");case"7.3":return await import("./assets/php_7_3-93f583aa.js");case"7.2":return await import("./assets/php_7_2-fac055a3.js");case"7.1":return await import("./assets/php_7_1-93817628.js");case"7.0":return await import("./assets/php_7_0-02f9b698.js")}throw new Error(`Unsupported PHP version ${e}`)}const fakeWebsocket=()=>({websocket:{decorator:e=>class extends e{constructor(){try{super()}catch{}}send(){return null}}}});async function loadWebRuntime(e,t={}){const r=await getPHPLoaderModule(e);return t.onPhpLoaderModuleLoaded?.(r),await loadPHPRuntime(r,{...t.emscriptenOptions||{},...fakeWebsocket()})}function journalFSEvents(e,t,r=()=>{}){function o(){t=normalizePath(t);const d=e[__private__dont__use].FS,p=createFSHooks(d,y=>{if(y.path.startsWith(t))r(y);else if(y.operation==="RENAME"&&y.toPath.startsWith(t))for(const w of recordExistingPath(e,y.path,y.toPath))r(w)}),c={};for(const[y]of Object.entries(p))c[y]=d[y];function m(){for(const[y,w]of Object.entries(p))d[y]=function(...x){return w(...x),c[y].apply(this,x)}}function _(){for(const[y,w]of Object.entries(c))e[__private__dont__use].FS[y]=w}e[__private__dont__use].journal={bind:m,unbind:_},m()}e.addEventListener("runtime.initialized",o),e[__private__dont__use]&&o();function l(){e[__private__dont__use].journal.unbind(),delete e[__private__dont__use].journal}return e.addEventListener("runtime.beforedestroy",l),function(){return e.removeEventListener("runtime.initialized",o),e.removeEventListener("runtime.beforedestroy",l),e[__private__dont__use].journal.unbind()}}const createFSHooks=(e,t=()=>{})=>({write(r){t({operation:"WRITE",path:r.path,nodeType:"file"})},truncate(r){let o;typeof r=="string"?o=e.lookupPath(r,{follow:!0}).node:o=r,t({operation:"WRITE",path:e.getPath(o),nodeType:"file"})},unlink(r){t({operation:"DELETE",path:r,nodeType:"file"})},mknod(r,o){e.isFile(o)&&t({operation:"CREATE",path:r,nodeType:"file"})},mkdir(r){t({operation:"CREATE",path:r,nodeType:"directory"})},rmdir(r){t({operation:"DELETE",path:r,nodeType:"directory"})},rename(r,o){try{const l=e.lookupPath(r,{follow:!0}),d=e.lookupPath(o,{parent:!0}).path;t({operation:"RENAME",nodeType:e.isDir(l.node.mode)?"directory":"file",path:l.path,toPath:joinPaths(d,basename(o))})}catch{}}});function replayFSJournal(e,t){e[__private__dont__use].journal.unbind();try{for(const r of t)r.operation==="CREATE"?r.nodeType==="file"?e.writeFile(r.path," "):e.mkdir(r.path):r.operation==="DELETE"?r.nodeType==="file"?e.unlink(r.path):e.rmdir(r.path):r.operation==="WRITE"?e.writeFile(r.path,r.data):r.operation==="RENAME"&&e.mv(r.path,r.toPath)}finally{e[__private__dont__use].journal.bind()}}function*recordExistingPath(e,t,r){if(e.isDir(t)){yield{operation:"CREATE",path:r,nodeType:"directory"};for(const o of e.listFiles(t))yield*recordExistingPath(e,joinPaths(t,o),joinPaths(r,o))}else yield{operation:"CREATE",path:r,nodeType:"file"},yield{operation:"WRITE",nodeType:"file",path:r}}function normalizePath(e){return e.replace(/\/$/,"").replace(/\/\/+/g,"/")}function createDirectoryHandleMountHandler(e,t={initialSync:{}}){return t={...t,initialSync:{...t.initialSync,direction:t.initialSync.direction??"opfs-to-memfs"}},async function(r,o,l){return t.initialSync.direction==="opfs-to-memfs"?(FSHelpers.fileExists(o,l)&&FSHelpers.rmdir(o,l),FSHelpers.mkdir(o,l),await copyOpfsToMemfs(o,e,l)):await copyMemfsToOpfs(o,e,l,t.initialSync.onProgress),journalFSEventsToOpfs(r,e,l)}}async function copyOpfsToMemfs(e,t,r){FSHelpers.mkdir(e,r);const o=new Semaphore({concurrency:40}),l=[],d=[[t,r]];for(;d.length>0;){const[p,c]=d.pop();for await(const m of p.values()){const _=o.run(async()=>{const y=joinPaths(c,m.name);if(m.kind==="directory"){try{e.mkdir(y)}catch(w){if(w?.errno!==20)throw logger.error(w),w}d.push([m,y])}else if(m.kind==="file"){const w=await m.getFile(),x=new Uint8Array(await w.arrayBuffer());e.createDataFile(c,m.name,x,!0,!0,!0)}l.splice(l.indexOf(_),1)});l.push(_)}for(;d.length===0&&l.length>0;)await Promise.any(l)}}async function copyMemfsToOpfs(e,t,r,o){e.mkdirTree(r);const l=[];async function d(y,w){await Promise.all(e.readdir(y).filter(x=>x!=="."&&x!=="..").map(async x=>{const b=joinPaths(y,x);if(!isMemfsDir(e,b)){l.push([w,b,x]);return}const B=await w.getDirectoryHandle(x,{create:!0});return await d(b,B)}))}await d(r,t);let p=0;const c=o&&throttle(o,100),m=100,_=new Set;try{for(const[y,w,x]of l){const b=overwriteOpfsFile(y,x,e,w).then(()=>{p++,_.delete(b),c?.({files:p,total:l.length})});_.add(b),_.size>=m&&(await Promise.race(_),c?.({files:p,total:l.length}))}}finally{await Promise.allSettled(_)}}function isMemfsDir(e,t){return e.isDir(e.lookupPath(t,{follow:!0}).node.mode)}async function overwriteOpfsFile(e,t,r,o){let l;try{l=r.readFile(o,{encoding:"binary"})}catch{return}const d=await e.getFileHandle(t,{create:!0}),p=d.createWritable!==void 0?await d.createWritable():await d.createSyncAccessHandle();try{await p.truncate(0),await p.write(l)}finally{await p.close()}}function journalFSEventsToOpfs(e,t,r){const o=[],l=journalFSEvents(e,r,c=>{o.push(c)}),d=new OpfsRewriter(e,t,r);async function p(){const c=await e.semaphore.acquire();try{for(;o.length;)await d.processEntry(o.shift())}finally{c()}}return e.addEventListener("request.end",p),function(){l(),e.removeEventListener("request.end",p)}}class OpfsRewriter{constructor(t,r,o){this.php=t,this.opfs=r,this.memfsRoot=normalizeMemfsPath(o)}toOpfsPath(t){return normalizeMemfsPath(t.substring(this.memfsRoot.length))}async processEntry(t){if(!t.path.startsWith(this.memfsRoot)||t.path===this.memfsRoot)return;const r=this.toOpfsPath(t.path),o=await resolveParent(this.opfs,r),l=getFilename(r);if(l)try{if(t.operation==="DELETE")try{await o.removeEntry(l,{recursive:!0})}catch{}else if(t.operation==="CREATE")t.nodeType==="directory"?await o.getDirectoryHandle(l,{create:!0}):await o.getFileHandle(l,{create:!0});else if(t.operation==="WRITE")await overwriteOpfsFile(o,l,this.php[__private__dont__use].FS,t.path);else if(t.operation==="RENAME"&&t.toPath.startsWith(this.memfsRoot)){const d=this.toOpfsPath(t.toPath),p=await resolveParent(this.opfs,d),c=getFilename(d);if(t.nodeType==="directory"){const m=await p.getDirectoryHandle(l,{create:!0});await copyMemfsToOpfs(this.php[__private__dont__use].FS,m,t.toPath),await o.removeEntry(l,{recursive:!0})}else(await o.getFileHandle(l)).move(p,c)}}catch(d){throw logger.log({entry:t,name:l}),logger.error(d),d}}}function normalizeMemfsPath(e){return e.replace(/\/$/,"").replace(/\/\/+/g,"/")}function getFilename(e){return e.substring(e.lastIndexOf("/")+1)}async function resolveParent(e,t){const r=t.replace(/^\/+|\/+$/g,"").replace(/\/+/,"/");if(!r)return e;const o=r.split("/");let l=e;for(let d=0;d<o.length-1;d++){const p=o[d];l=await l.getDirectoryHandle(p,{create:!0})}return l}function throttle(e,t){let r=0,o,l;return function(...p){l=p;const c=Date.now()-r;if(o===void 0){const m=Math.max(0,t-c);o=setTimeout(()=>{o=void 0,r=Date.now(),e(...l)},m)}}}function isURLScoped(e){return e.pathname.startsWith("/scope:")}function setURLScope(e,t){let r=new URL(e);if(isURLScoped(r))if(t){const o=r.pathname.split("/");o[1]=`scope:${t}`,r.pathname=o.join("/")}else r=removeURLScope(r);else if(t){const o=r.pathname==="/"?"":r.pathname;r.pathname=`/scope:${t}${o}`}return r}function removeURLScope(e){if(!isURLScoped(e))return e;const t=new URL(e),r=t.pathname.split("/");return t.pathname="/"+r.slice(2).join("/"),t}const wordPressSiteUrl=new URL("/",(import.meta||{}).url).origin;var url_nightly="/assets/wp-nightly-68e32d53.zip",url_beta="/assets/wp-beta-dc88ee35.zip",url_6_6="/assets/wp-6.6-1892a3ff.zip",url_6_5="/assets/wp-6.5-7e09c2ac.zip",url_6_4="/assets/wp-6.4-14d9f7dc.zip",url_6_3="/assets/wp-6.3-cad7e42e.zip";function getWordPressModuleDetails(e="6.6"){switch(e){case"nightly":return{size:28608940,url:url_nightly};case"beta":return{size:28608111,url:url_beta};case"6.6":return{size:18382656,url:url_6_6};case"6.5":return{size:18453985,url:url_6_5};case"6.4":return{size:18265208,url:url_6_4};case"6.3":return{size:3595053,url:url_6_3}}throw new Error("Unsupported WordPress module: "+e)}var url="/assets/sqlite-database-integration-7d5a8261.zip";const size=86873,nightly="nightly",beta="6.7-beta3";var MinifiedWordPressVersions={nightly,beta,"6.6":"6.6.2","6.5":"6.5.5","6.4":"6.4.5","6.3":"6.3.5"};const MinifiedWordPressVersionsList=Object.keys(MinifiedWordPressVersions),LatestMinifiedWordPressVersion=MinifiedWordPressVersionsList.filter(e=>e.match(/^\d/))[0];function wpVersionToStaticAssetsDirectory(e){return e in MinifiedWordPressVersions?`wp-${e}`:void 0}async function directoryHandleFromMountDevice(e){return e.type==="local-fs"?e.handle:opfsPathToDirectoryHandle(e.path)}async function opfsPathToDirectoryHandle(e){const t=e.split("/").filter(o=>o.length>0);let r=await navigator.storage.getDirectory();for(const o of t)r=await r.getDirectoryHandle(o,{create:!0});return r}class BaseError extends Error{constructor(t){super(t),this.caller=""}toJSON(){return{code:this.code,data:this.data,caller:this.caller,message:this.message,stack:this.stack}}fromJSON(t){const r=new BaseError(t.message);return r.code=t.code,r.data=t.data,r.caller=t.caller,r.stack=t.stack,r}get isIsomorphicGitError(){return!0}}var crc32={};/*! crc32.js (C) 2014-present SheetJS -- http://sheetjs.com */(function(e){(function(t){t(typeof DO_NOT_EXPORT_CRC>"u"?e:{})})(function(t){t.version="1.2.2";function r(){for(var P=0,C=new Array(256),E=0;E!=256;++E)P=E,P=P&1?-306674912^P>>>1:P>>>1,P=P&1?-306674912^P>>>1:P>>>1,P=P&1?-306674912^P>>>1:P>>>1,P=P&1?-306674912^P>>>1:P>>>1,P=P&1?-306674912^P>>>1:P>>>1,P=P&1?-306674912^P>>>1:P>>>1,P=P&1?-306674912^P>>>1:P>>>1,P=P&1?-306674912^P>>>1:P>>>1,C[E]=P;return typeof Int32Array<"u"?new Int32Array(C):C}var o=r();function l(P){var C=0,E=0,R=0,T=typeof Int32Array<"u"?new Int32Array(4096):new Array(4096);for(R=0;R!=256;++R)T[R]=P[R];for(R=0;R!=256;++R)for(E=P[R],C=256+R;C<4096;C+=256)E=T[C]=E>>>8^P[E&255];var k=[];for(R=1;R!=16;++R)k[R-1]=typeof Int32Array<"u"?T.subarray(R*256,R*256+256):T.slice(R*256,R*256+256);return k}var d=l(o),p=d[0],c=d[1],m=d[2],_=d[3],y=d[4],w=d[5],x=d[6],b=d[7],B=d[8],U=d[9],v=d[10],H=d[11],N=d[12],q=d[13],K=d[14];function W(P,C){for(var E=C^-1,R=0,T=P.length;R<T;)E=E>>>8^o[(E^P.charCodeAt(R++))&255];return~E}function Q(P,C){for(var E=C^-1,R=P.length-15,T=0;T<R;)E=K[P[T++]^E&255]^q[P[T++]^E>>8&255]^N[P[T++]^E>>16&255]^H[P[T++]^E>>>24]^v[P[T++]]^U[P[T++]]^B[P[T++]]^b[P[T++]]^x[P[T++]]^w[P[T++]]^y[P[T++]]^_[P[T++]]^m[P[T++]]^c[P[T++]]^p[P[T++]]^o[P[T++]];for(R+=15;T<R;)E=E>>>8^o[(E^P[T++])&255];return~E}function Y(P,C){for(var E=C^-1,R=0,T=P.length,k=0,z=0;R<T;)k=P.charCodeAt(R++),k<128?E=E>>>8^o[(E^k)&255]:k<2048?(E=E>>>8^o[(E^(192|k>>6&31))&255],E=E>>>8^o[(E^(128|k&63))&255]):k>=55296&&k<57344?(k=(k&1023)+64,z=P.charCodeAt(R++)&1023,E=E>>>8^o[(E^(240|k>>8&7))&255],E=E>>>8^o[(E^(128|k>>2&63))&255],E=E>>>8^o[(E^(128|z>>6&15|(k&3)<<4))&255],E=E>>>8^o[(E^(128|z&63))&255]):(E=E>>>8^o[(E^(224|k>>12&15))&255],E=E>>>8^o[(E^(128|k>>6&63))&255],E=E>>>8^o[(E^(128|k&63))&255]);return~E}t.table=o,t.bstr=W,t.buf=Q,t.str=Y})})(crc32);var buffer={},base64Js={};base64Js.byteLength=byteLength;base64Js.toByteArray=toByteArray;base64Js.fromByteArray=fromByteArray;var lookup=[],revLookup=[],Arr=typeof Uint8Array<"u"?Uint8Array:Array,code="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";for(var i=0,len=code.length;i<len;++i)lookup[i]=code[i],revLookup[code.charCodeAt(i)]=i;revLookup["-".charCodeAt(0)]=62;revLookup["_".charCodeAt(0)]=63;function getLens(e){var t=e.length;if(t%4>0)throw new Error("Invalid string. Length must be a multiple of 4");var r=e.indexOf("=");r===-1&&(r=t);var o=r===t?0:4-r%4;return[r,o]}function byteLength(e){var t=getLens(e),r=t[0],o=t[1];return(r+o)*3/4-o}function _byteLength(e,t,r){return(t+r)*3/4-r}function toByteArray(e){var t,r=getLens(e),o=r[0],l=r[1],d=new Arr(_byteLength(e,o,l)),p=0,c=l>0?o-4:o,m;for(m=0;m<c;m+=4)t=revLookup[e.charCodeAt(m)]<<18|revLookup[e.charCodeAt(m+1)]<<12|revLookup[e.charCodeAt(m+2)]<<6|revLookup[e.charCodeAt(m+3)],d[p++]=t>>16&255,d[p++]=t>>8&255,d[p++]=t&255;return l===2&&(t=revLookup[e.charCodeAt(m)]<<2|revLookup[e.charCodeAt(m+1)]>>4,d[p++]=t&255),l===1&&(t=revLookup[e.charCodeAt(m)]<<10|revLookup[e.charCodeAt(m+1)]<<4|revLookup[e.charCodeAt(m+2)]>>2,d[p++]=t>>8&255,d[p++]=t&255),d}function tripletToBase64(e){return lookup[e>>18&63]+lookup[e>>12&63]+lookup[e>>6&63]+lookup[e&63]}function encodeChunk(e,t,r){for(var o,l=[],d=t;d<r;d+=3)o=(e[d]<<16&16711680)+(e[d+1]<<8&65280)+(e[d+2]&255),l.push(tripletToBase64(o));return l.join("")}function fromByteArray(e){for(var t,r=e.length,o=r%3,l=[],d=16383,p=0,c=r-o;p<c;p+=d)l.push(encodeChunk(e,p,p+d>c?c:p+d));return o===1?(t=e[r-1],l.push(lookup[t>>2]+lookup[t<<4&63]+"==")):o===2&&(t=(e[r-2]<<8)+e[r-1],l.push(lookup[t>>10]+lookup[t>>4&63]+lookup[t<<2&63]+"=")),l.join("")}var ieee754={};/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */ieee754.read=function(e,t,r,o,l){var d,p,c=l*8-o-1,m=(1<<c)-1,_=m>>1,y=-7,w=r?l-1:0,x=r?-1:1,b=e[t+w];for(w+=x,d=b&(1<<-y)-1,b>>=-y,y+=c;y>0;d=d*256+e[t+w],w+=x,y-=8);for(p=d&(1<<-y)-1,d>>=-y,y+=o;y>0;p=p*256+e[t+w],w+=x,y-=8);if(d===0)d=1-_;else{if(d===m)return p?NaN:(b?-1:1)*(1/0);p=p+Math.pow(2,o),d=d-_}return(b?-1:1)*p*Math.pow(2,d-o)};ieee754.write=function(e,t,r,o,l,d){var p,c,m,_=d*8-l-1,y=(1<<_)-1,w=y>>1,x=l===23?Math.pow(2,-24)-Math.pow(2,-77):0,b=o?0:d-1,B=o?1:-1,U=t<0||t===0&&1/t<0?1:0;for(t=Math.abs(t),isNaN(t)||t===1/0?(c=isNaN(t)?1:0,p=y):(p=Math.floor(Math.log(t)/Math.LN2),t*(m=Math.pow(2,-p))<1&&(p--,m*=2),p+w>=1?t+=x/m:t+=x*Math.pow(2,1-w),t*m>=2&&(p++,m/=2),p+w>=y?(c=0,p=y):p+w>=1?(c=(t*m-1)*Math.pow(2,l),p=p+w):(c=t*Math.pow(2,w-1)*Math.pow(2,l),p=0));l>=8;e[r+b]=c&255,b+=B,c/=256,l-=8);for(p=p<<l|c,_+=l;_>0;e[r+b]=p&255,b+=B,p/=256,_-=8);e[r+b-B]|=U*128};/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */(function(e){const t=base64Js,r=ieee754,o=typeof Symbol=="function"&&typeof Symbol.for=="function"?Symbol.for("nodejs.util.inspect.custom"):null;e.Buffer=c,e.SlowBuffer=N,e.INSPECT_MAX_BYTES=50;const l=2147483647;e.kMaxLength=l,c.TYPED_ARRAY_SUPPORT=d(),!c.TYPED_ARRAY_SUPPORT&&typeof console<"u"&&typeof console.error=="function"&&console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");function d(){try{const a=new Uint8Array(1),n={foo:function(){return 42}};return Object.setPrototypeOf(n,Uint8Array.prototype),Object.setPrototypeOf(a,n),a.foo()===42}catch{return!1}}Object.defineProperty(c.prototype,"parent",{enumerable:!0,get:function(){if(c.isBuffer(this))return this.buffer}}),Object.defineProperty(c.prototype,"offset",{enumerable:!0,get:function(){if(c.isBuffer(this))return this.byteOffset}});function p(a){if(a>l)throw new RangeError('The value "'+a+'" is invalid for option "size"');const n=new Uint8Array(a);return Object.setPrototypeOf(n,c.prototype),n}function c(a,n,s){if(typeof a=="number"){if(typeof n=="string")throw new TypeError('The "string" argument must be of type string. Received type number');return w(a)}return m(a,n,s)}c.poolSize=8192;function m(a,n,s){if(typeof a=="string")return x(a,n);if(ArrayBuffer.isView(a))return B(a);if(a==null)throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof a);if(D(a,ArrayBuffer)||a&&D(a.buffer,ArrayBuffer)||typeof SharedArrayBuffer<"u"&&(D(a,SharedArrayBuffer)||a&&D(a.buffer,SharedArrayBuffer)))return U(a,n,s);if(typeof a=="number")throw new TypeError('The "value" argument must not be of type number. Received type number');const u=a.valueOf&&a.valueOf();if(u!=null&&u!==a)return c.from(u,n,s);const f=v(a);if(f)return f;if(typeof Symbol<"u"&&Symbol.toPrimitive!=null&&typeof a[Symbol.toPrimitive]=="function")return c.from(a[Symbol.toPrimitive]("string"),n,s);throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type "+typeof a)}c.from=function(a,n,s){return m(a,n,s)},Object.setPrototypeOf(c.prototype,Uint8Array.prototype),Object.setPrototypeOf(c,Uint8Array);function _(a){if(typeof a!="number")throw new TypeError('"size" argument must be of type number');if(a<0)throw new RangeError('The value "'+a+'" is invalid for option "size"')}function y(a,n,s){return _(a),a<=0?p(a):n!==void 0?typeof s=="string"?p(a).fill(n,s):p(a).fill(n):p(a)}c.alloc=function(a,n,s){return y(a,n,s)};function w(a){return _(a),p(a<0?0:H(a)|0)}c.allocUnsafe=function(a){return w(a)},c.allocUnsafeSlow=function(a){return w(a)};function x(a,n){if((typeof n!="string"||n==="")&&(n="utf8"),!c.isEncoding(n))throw new TypeError("Unknown encoding: "+n);const s=q(a,n)|0;let u=p(s);const f=u.write(a,n);return f!==s&&(u=u.slice(0,f)),u}function b(a){const n=a.length<0?0:H(a.length)|0,s=p(n);for(let u=0;u<n;u+=1)s[u]=a[u]&255;return s}function B(a){if(D(a,Uint8Array)){const n=new Uint8Array(a);return U(n.buffer,n.byteOffset,n.byteLength)}return b(a)}function U(a,n,s){if(n<0||a.byteLength<n)throw new RangeError('"offset" is outside of buffer bounds');if(a.byteLength<n+(s||0))throw new RangeError('"length" is outside of buffer bounds');let u;return n===void 0&&s===void 0?u=new Uint8Array(a):s===void 0?u=new Uint8Array(a,n):u=new Uint8Array(a,n,s),Object.setPrototypeOf(u,c.prototype),u}function v(a){if(c.isBuffer(a)){const n=H(a.length)|0,s=p(n);return s.length===0||a.copy(s,0,0,n),s}if(a.length!==void 0)return typeof a.length!="number"||te(a.length)?p(0):b(a);if(a.type==="Buffer"&&Array.isArray(a.data))return b(a.data)}function H(a){if(a>=l)throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x"+l.toString(16)+" bytes");return a|0}function N(a){return+a!=a&&(a=0),c.alloc(+a)}c.isBuffer=function(n){return n!=null&&n._isBuffer===!0&&n!==c.prototype},c.compare=function(n,s){if(D(n,Uint8Array)&&(n=c.from(n,n.offset,n.byteLength)),D(s,Uint8Array)&&(s=c.from(s,s.offset,s.byteLength)),!c.isBuffer(n)||!c.isBuffer(s))throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');if(n===s)return 0;let u=n.length,f=s.length;for(let h=0,g=Math.min(u,f);h<g;++h)if(n[h]!==s[h]){u=n[h],f=s[h];break}return u<f?-1:f<u?1:0},c.isEncoding=function(n){switch(String(n).toLowerCase()){case"hex":case"utf8":case"utf-8":case"ascii":case"latin1":case"binary":case"base64":case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return!0;default:return!1}},c.concat=function(n,s){if(!Array.isArray(n))throw new TypeError('"list" argument must be an Array of Buffers');if(n.length===0)return c.alloc(0);let u;if(s===void 0)for(s=0,u=0;u<n.length;++u)s+=n[u].length;const f=c.allocUnsafe(s);let h=0;for(u=0;u<n.length;++u){let g=n[u];if(D(g,Uint8Array))h+g.length>f.length?(c.isBuffer(g)||(g=c.from(g)),g.copy(f,h)):Uint8Array.prototype.set.call(f,g,h);else if(c.isBuffer(g))g.copy(f,h);else throw new TypeError('"list" argument must be an Array of Buffers');h+=g.length}return f};function q(a,n){if(c.isBuffer(a))return a.length;if(ArrayBuffer.isView(a)||D(a,ArrayBuffer))return a.byteLength;if(typeof a!="string")throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type '+typeof a);const s=a.length,u=arguments.length>2&&arguments[2]===!0;if(!u&&s===0)return 0;let f=!1;for(;;)switch(n){case"ascii":case"latin1":case"binary":return s;case"utf8":case"utf-8":return ee(a).length;case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return s*2;case"hex":return s>>>1;case"base64":return ue(a).length;default:if(f)return u?-1:ee(a).length;n=(""+n).toLowerCase(),f=!0}}c.byteLength=q;function K(a,n,s){let u=!1;if((n===void 0||n<0)&&(n=0),n>this.length||((s===void 0||s>this.length)&&(s=this.length),s<=0)||(s>>>=0,n>>>=0,s<=n))return"";for(a||(a="utf8");;)switch(a){case"hex":return he(this,n,s);case"utf8":case"utf-8":return z(this,n,s);case"ascii":return pe(this,n,s);case"latin1":case"binary":return fe(this,n,s);case"base64":return k(this,n,s);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return me(this,n,s);default:if(u)throw new TypeError("Unknown encoding: "+a);a=(a+"").toLowerCase(),u=!0}}c.prototype._isBuffer=!0;function W(a,n,s){const u=a[n];a[n]=a[s],a[s]=u}c.prototype.swap16=function(){const n=this.length;if(n%2!==0)throw new RangeError("Buffer size must be a multiple of 16-bits");for(let s=0;s<n;s+=2)W(this,s,s+1);return this},c.prototype.swap32=function(){const n=this.length;if(n%4!==0)throw new RangeError("Buffer size must be a multiple of 32-bits");for(let s=0;s<n;s+=4)W(this,s,s+3),W(this,s+1,s+2);return this},c.prototype.swap64=function(){const n=this.length;if(n%8!==0)throw new RangeError("Buffer size must be a multiple of 64-bits");for(let s=0;s<n;s+=8)W(this,s,s+7),W(this,s+1,s+6),W(this,s+2,s+5),W(this,s+3,s+4);return this},c.prototype.toString=function(){const n=this.length;return n===0?"":arguments.length===0?z(this,0,n):K.apply(this,arguments)},c.prototype.toLocaleString=c.prototype.toString,c.prototype.equals=function(n){if(!c.isBuffer(n))throw new TypeError("Argument must be a Buffer");return this===n?!0:c.compare(this,n)===0},c.prototype.inspect=function(){let n="";const s=e.INSPECT_MAX_BYTES;return n=this.toString("hex",0,s).replace(/(.{2})/g,"$1 ").trim(),this.length>s&&(n+=" ... "),"<Buffer "+n+">"},o&&(c.prototype[o]=c.prototype.inspect),c.prototype.compare=function(n,s,u,f,h){if(D(n,Uint8Array)&&(n=c.from(n,n.offset,n.byteLength)),!c.isBuffer(n))throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type '+typeof n);if(s===void 0&&(s=0),u===void 0&&(u=n?n.length:0),f===void 0&&(f=0),h===void 0&&(h=this.length),s<0||u>n.length||f<0||h>this.length)throw new RangeError("out of range index");if(f>=h&&s>=u)return 0;if(f>=h)return-1;if(s>=u)return 1;if(s>>>=0,u>>>=0,f>>>=0,h>>>=0,this===n)return 0;let g=h-f,F=u-s;const I=Math.min(g,F),$=this.slice(f,h),A=n.slice(s,u);for(let S=0;S<I;++S)if($[S]!==A[S]){g=$[S],F=A[S];break}return g<F?-1:F<g?1:0};function Q(a,n,s,u,f){if(a.length===0)return-1;if(typeof s=="string"?(u=s,s=0):s>2147483647?s=2147483647:s<-2147483648&&(s=-2147483648),s=+s,te(s)&&(s=f?0:a.length-1),s<0&&(s=a.length+s),s>=a.length){if(f)return-1;s=a.length-1}else if(s<0)if(f)s=0;else return-1;if(typeof n=="string"&&(n=c.from(n,u)),c.isBuffer(n))return n.length===0?-1:Y(a,n,s,u,f);if(typeof n=="number")return n=n&255,typeof Uint8Array.prototype.indexOf=="function"?f?Uint8Array.prototype.indexOf.call(a,n,s):Uint8Array.prototype.lastIndexOf.call(a,n,s):Y(a,[n],s,u,f);throw new TypeError("val must be string, number or Buffer")}function Y(a,n,s,u,f){let h=1,g=a.length,F=n.length;if(u!==void 0&&(u=String(u).toLowerCase(),u==="ucs2"||u==="ucs-2"||u==="utf16le"||u==="utf-16le")){if(a.length<2||n.length<2)return-1;h=2,g/=2,F/=2,s/=2}function I(A,S){return h===1?A[S]:A.readUInt16BE(S*h)}let $;if(f){let A=-1;for($=s;$<g;$++)if(I(a,$)===I(n,A===-1?0:$-A)){if(A===-1&&(A=$),$-A+1===F)return A*h}else A!==-1&&($-=$-A),A=-1}else for(s+F>g&&(s=g-F),$=s;$>=0;$--){let A=!0;for(let S=0;S<F;S++)if(I(a,$+S)!==I(n,S)){A=!1;break}if(A)return $}return-1}c.prototype.includes=function(n,s,u){return this.indexOf(n,s,u)!==-1},c.prototype.indexOf=function(n,s,u){return Q(this,n,s,u,!0)},c.prototype.lastIndexOf=function(n,s,u){return Q(this,n,s,u,!1)};function P(a,n,s,u){s=Number(s)||0;const f=a.length-s;u?(u=Number(u),u>f&&(u=f)):u=f;const h=n.length;u>h/2&&(u=h/2);let g;for(g=0;g<u;++g){const F=parseInt(n.substr(g*2,2),16);if(te(F))return g;a[s+g]=F}return g}function C(a,n,s,u){return Z(ee(n,a.length-s),a,s,u)}function E(a,n,s,u){return Z(we(n),a,s,u)}function R(a,n,s,u){return Z(ue(n),a,s,u)}function T(a,n,s,u){return Z(Pe(n,a.length-s),a,s,u)}c.prototype.write=function(n,s,u,f){if(s===void 0)f="utf8",u=this.length,s=0;else if(u===void 0&&typeof s=="string")f=s,u=this.length,s=0;else if(isFinite(s))s=s>>>0,isFinite(u)?(u=u>>>0,f===void 0&&(f="utf8")):(f=u,u=void 0);else throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");const h=this.length-s;if((u===void 0||u>h)&&(u=h),n.length>0&&(u<0||s<0)||s>this.length)throw new RangeError("Attempt to write outside buffer bounds");f||(f="utf8");let g=!1;for(;;)switch(f){case"hex":return P(this,n,s,u);case"utf8":case"utf-8":return C(this,n,s,u);case"ascii":case"latin1":case"binary":return E(this,n,s,u);case"base64":return R(this,n,s,u);case"ucs2":case"ucs-2":case"utf16le":case"utf-16le":return T(this,n,s,u);default:if(g)throw new TypeError("Unknown encoding: "+f);f=(""+f).toLowerCase(),g=!0}},c.prototype.toJSON=function(){return{type:"Buffer",data:Array.prototype.slice.call(this._arr||this,0)}};function k(a,n,s){return n===0&&s===a.length?t.fromByteArray(a):t.fromByteArray(a.slice(n,s))}function z(a,n,s){s=Math.min(a.length,s);const u=[];let f=n;for(;f<s;){const h=a[f];let g=null,F=h>239?4:h>223?3:h>191?2:1;if(f+F<=s){let I,$,A,S;switch(F){case 1:h<128&&(g=h);break;case 2:I=a[f+1],(I&192)===128&&(S=(h&31)<<6|I&63,S>127&&(g=S));break;case 3:I=a[f+1],$=a[f+2],(I&192)===128&&($&192)===128&&(S=(h&15)<<12|(I&63)<<6|$&63,S>2047&&(S<55296||S>57343)&&(g=S));break;case 4:I=a[f+1],$=a[f+2],A=a[f+3],(I&192)===128&&($&192)===128&&(A&192)===128&&(S=(h&15)<<18|(I&63)<<12|($&63)<<6|A&63,S>65535&&S<1114112&&(g=S))}}g===null?(g=65533,F=1):g>65535&&(g-=65536,u.push(g>>>10&1023|55296),g=56320|g&1023),u.push(g),f+=F}return de(u)}const re=4096;function de(a){const n=a.length;if(n<=re)return String.fromCharCode.apply(String,a);let s="",u=0;for(;u<n;)s+=String.fromCharCode.apply(String,a.slice(u,u+=re));return s}function pe(a,n,s){let u="";s=Math.min(a.length,s);for(let f=n;f<s;++f)u+=String.fromCharCode(a[f]&127);return u}function fe(a,n,s){let u="";s=Math.min(a.length,s);for(let f=n;f<s;++f)u+=String.fromCharCode(a[f]);return u}function he(a,n,s){const u=a.length;(!n||n<0)&&(n=0),(!s||s<0||s>u)&&(s=u);let f="";for(let h=n;h<s;++h)f+=Ee[a[h]];return f}function me(a,n,s){const u=a.slice(n,s);let f="";for(let h=0;h<u.length-1;h+=2)f+=String.fromCharCode(u[h]+u[h+1]*256);return f}c.prototype.slice=function(n,s){const u=this.length;n=~~n,s=s===void 0?u:~~s,n<0?(n+=u,n<0&&(n=0)):n>u&&(n=u),s<0?(s+=u,s<0&&(s=0)):s>u&&(s=u),s<n&&(s=n);const f=this.subarray(n,s);return Object.setPrototypeOf(f,c.prototype),f};function L(a,n,s){if(a%1!==0||a<0)throw new RangeError("offset is not uint");if(a+n>s)throw new RangeError("Trying to access beyond buffer length")}c.prototype.readUintLE=c.prototype.readUIntLE=function(n,s,u){n=n>>>0,s=s>>>0,u||L(n,s,this.length);let f=this[n],h=1,g=0;for(;++g<s&&(h*=256);)f+=this[n+g]*h;return f},c.prototype.readUintBE=c.prototype.readUIntBE=function(n,s,u){n=n>>>0,s=s>>>0,u||L(n,s,this.length);let f=this[n+--s],h=1;for(;s>0&&(h*=256);)f+=this[n+--s]*h;return f},c.prototype.readUint8=c.prototype.readUInt8=function(n,s){return n=n>>>0,s||L(n,1,this.length),this[n]},c.prototype.readUint16LE=c.prototype.readUInt16LE=function(n,s){return n=n>>>0,s||L(n,2,this.length),this[n]|this[n+1]<<8},c.prototype.readUint16BE=c.prototype.readUInt16BE=function(n,s){return n=n>>>0,s||L(n,2,this.length),this[n]<<8|this[n+1]},c.prototype.readUint32LE=c.prototype.readUInt32LE=function(n,s){return n=n>>>0,s||L(n,4,this.length),(this[n]|this[n+1]<<8|this[n+2]<<16)+this[n+3]*16777216},c.prototype.readUint32BE=c.prototype.readUInt32BE=function(n,s){return n=n>>>0,s||L(n,4,this.length),this[n]*16777216+(this[n+1]<<16|this[n+2]<<8|this[n+3])},c.prototype.readBigUInt64LE=j(function(n){n=n>>>0,G(n,"offset");const s=this[n],u=this[n+7];(s===void 0||u===void 0)&&J(n,this.length-8);const f=s+this[++n]*2**8+this[++n]*2**16+this[++n]*2**24,h=this[++n]+this[++n]*2**8+this[++n]*2**16+u*2**24;return BigInt(f)+(BigInt(h)<<BigInt(32))}),c.prototype.readBigUInt64BE=j(function(n){n=n>>>0,G(n,"offset");const s=this[n],u=this[n+7];(s===void 0||u===void 0)&&J(n,this.length-8);const f=s*2**24+this[++n]*2**16+this[++n]*2**8+this[++n],h=this[++n]*2**24+this[++n]*2**16+this[++n]*2**8+u;return(BigInt(f)<<BigInt(32))+BigInt(h)}),c.prototype.readIntLE=function(n,s,u){n=n>>>0,s=s>>>0,u||L(n,s,this.length);let f=this[n],h=1,g=0;for(;++g<s&&(h*=256);)f+=this[n+g]*h;return h*=128,f>=h&&(f-=Math.pow(2,8*s)),f},c.prototype.readIntBE=function(n,s,u){n=n>>>0,s=s>>>0,u||L(n,s,this.length);let f=s,h=1,g=this[n+--f];for(;f>0&&(h*=256);)g+=this[n+--f]*h;return h*=128,g>=h&&(g-=Math.pow(2,8*s)),g},c.prototype.readInt8=function(n,s){return n=n>>>0,s||L(n,1,this.length),this[n]&128?(255-this[n]+1)*-1:this[n]},c.prototype.readInt16LE=function(n,s){n=n>>>0,s||L(n,2,this.length);const u=this[n]|this[n+1]<<8;return u&32768?u|4294901760:u},c.prototype.readInt16BE=function(n,s){n=n>>>0,s||L(n,2,this.length);const u=this[n+1]|this[n]<<8;return u&32768?u|4294901760:u},c.prototype.readInt32LE=function(n,s){return n=n>>>0,s||L(n,4,this.length),this[n]|this[n+1]<<8|this[n+2]<<16|this[n+3]<<24},c.prototype.readInt32BE=function(n,s){return n=n>>>0,s||L(n,4,this.length),this[n]<<24|this[n+1]<<16|this[n+2]<<8|this[n+3]},c.prototype.readBigInt64LE=j(function(n){n=n>>>0,G(n,"offset");const s=this[n],u=this[n+7];(s===void 0||u===void 0)&&J(n,this.length-8);const f=this[n+4]+this[n+5]*2**8+this[n+6]*2**16+(u<<24);return(BigInt(f)<<BigInt(32))+BigInt(s+this[++n]*2**8+this[++n]*2**16+this[++n]*2**24)}),c.prototype.readBigInt64BE=j(function(n){n=n>>>0,G(n,"offset");const s=this[n],u=this[n+7];(s===void 0||u===void 0)&&J(n,this.length-8);const f=(s<<24)+this[++n]*2**16+this[++n]*2**8+this[++n];return(BigInt(f)<<BigInt(32))+BigInt(this[++n]*2**24+this[++n]*2**16+this[++n]*2**8+u)}),c.prototype.readFloatLE=function(n,s){return n=n>>>0,s||L(n,4,this.length),r.read(this,n,!0,23,4)},c.prototype.readFloatBE=function(n,s){return n=n>>>0,s||L(n,4,this.length),r.read(this,n,!1,23,4)},c.prototype.readDoubleLE=function(n,s){return n=n>>>0,s||L(n,8,this.length),r.read(this,n,!0,52,8)},c.prototype.readDoubleBE=function(n,s){return n=n>>>0,s||L(n,8,this.length),r.read(this,n,!1,52,8)};function O(a,n,s,u,f,h){if(!c.isBuffer(a))throw new TypeError('"buffer" argument must be a Buffer instance');if(n>f||n<h)throw new RangeError('"value" argument is out of bounds');if(s+u>a.length)throw new RangeError("Index out of range")}c.prototype.writeUintLE=c.prototype.writeUIntLE=function(n,s,u,f){if(n=+n,s=s>>>0,u=u>>>0,!f){const F=Math.pow(2,8*u)-1;O(this,n,s,u,F,0)}let h=1,g=0;for(this[s]=n&255;++g<u&&(h*=256);)this[s+g]=n/h&255;return s+u},c.prototype.writeUintBE=c.prototype.writeUIntBE=function(n,s,u,f){if(n=+n,s=s>>>0,u=u>>>0,!f){const F=Math.pow(2,8*u)-1;O(this,n,s,u,F,0)}let h=u-1,g=1;for(this[s+h]=n&255;--h>=0&&(g*=256);)this[s+h]=n/g&255;return s+u},c.prototype.writeUint8=c.prototype.writeUInt8=function(n,s,u){return n=+n,s=s>>>0,u||O(this,n,s,1,255,0),this[s]=n&255,s+1},c.prototype.writeUint16LE=c.prototype.writeUInt16LE=function(n,s,u){return n=+n,s=s>>>0,u||O(this,n,s,2,65535,0),this[s]=n&255,this[s+1]=n>>>8,s+2},c.prototype.writeUint16BE=c.prototype.writeUInt16BE=function(n,s,u){return n=+n,s=s>>>0,u||O(this,n,s,2,65535,0),this[s]=n>>>8,this[s+1]=n&255,s+2},c.prototype.writeUint32LE=c.prototype.writeUInt32LE=function(n,s,u){return n=+n,s=s>>>0,u||O(this,n,s,4,4294967295,0),this[s+3]=n>>>24,this[s+2]=n>>>16,this[s+1]=n>>>8,this[s]=n&255,s+4},c.prototype.writeUint32BE=c.prototype.writeUInt32BE=function(n,s,u){return n=+n,s=s>>>0,u||O(this,n,s,4,4294967295,0),this[s]=n>>>24,this[s+1]=n>>>16,this[s+2]=n>>>8,this[s+3]=n&255,s+4};function ne(a,n,s,u,f){ce(n,u,f,a,s,7);let h=Number(n&BigInt(4294967295));a[s++]=h,h=h>>8,a[s++]=h,h=h>>8,a[s++]=h,h=h>>8,a[s++]=h;let g=Number(n>>BigInt(32)&BigInt(4294967295));return a[s++]=g,g=g>>8,a[s++]=g,g=g>>8,a[s++]=g,g=g>>8,a[s++]=g,s}function ie(a,n,s,u,f){ce(n,u,f,a,s,7);let h=Number(n&BigInt(4294967295));a[s+7]=h,h=h>>8,a[s+6]=h,h=h>>8,a[s+5]=h,h=h>>8,a[s+4]=h;let g=Number(n>>BigInt(32)&BigInt(4294967295));return a[s+3]=g,g=g>>8,a[s+2]=g,g=g>>8,a[s+1]=g,g=g>>8,a[s]=g,s+8}c.prototype.writeBigUInt64LE=j(function(n,s=0){return ne(this,n,s,BigInt(0),BigInt("0xffffffffffffffff"))}),c.prototype.writeBigUInt64BE=j(function(n,s=0){return ie(this,n,s,BigInt(0),BigInt("0xffffffffffffffff"))}),c.prototype.writeIntLE=function(n,s,u,f){if(n=+n,s=s>>>0,!f){const I=Math.pow(2,8*u-1);O(this,n,s,u,I-1,-I)}let h=0,g=1,F=0;for(this[s]=n&255;++h<u&&(g*=256);)n<0&&F===0&&this[s+h-1]!==0&&(F=1),this[s+h]=(n/g>>0)-F&255;return s+u},c.prototype.writeIntBE=function(n,s,u,f){if(n=+n,s=s>>>0,!f){const I=Math.pow(2,8*u-1);O(this,n,s,u,I-1,-I)}let h=u-1,g=1,F=0;for(this[s+h]=n&255;--h>=0&&(g*=256);)n<0&&F===0&&this[s+h+1]!==0&&(F=1),this[s+h]=(n/g>>0)-F&255;return s+u},c.prototype.writeInt8=function(n,s,u){return n=+n,s=s>>>0,u||O(this,n,s,1,127,-128),n<0&&(n=255+n+1),this[s]=n&255,s+1},c.prototype.writeInt16LE=function(n,s,u){return n=+n,s=s>>>0,u||O(this,n,s,2,32767,-32768),this[s]=n&255,this[s+1]=n>>>8,s+2},c.prototype.writeInt16BE=function(n,s,u){return n=+n,s=s>>>0,u||O(this,n,s,2,32767,-32768),this[s]=n>>>8,this[s+1]=n&255,s+2},c.prototype.writeInt32LE=function(n,s,u){return n=+n,s=s>>>0,u||O(this,n,s,4,2147483647,-2147483648),this[s]=n&255,this[s+1]=n>>>8,this[s+2]=n>>>16,this[s+3]=n>>>24,s+4},c.prototype.writeInt32BE=function(n,s,u){return n=+n,s=s>>>0,u||O(this,n,s,4,2147483647,-2147483648),n<0&&(n=4294967295+n+1),this[s]=n>>>24,this[s+1]=n>>>16,this[s+2]=n>>>8,this[s+3]=n&255,s+4},c.prototype.writeBigInt64LE=j(function(n,s=0){return ne(this,n,s,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))}),c.prototype.writeBigInt64BE=j(function(n,s=0){return ie(this,n,s,-BigInt("0x8000000000000000"),BigInt("0x7fffffffffffffff"))});function se(a,n,s,u,f,h){if(s+u>a.length)throw new RangeError("Index out of range");if(s<0)throw new RangeError("Index out of range")}function oe(a,n,s,u,f){return n=+n,s=s>>>0,f||se(a,n,s,4),r.write(a,n,s,u,23,4),s+4}c.prototype.writeFloatLE=function(n,s,u){return oe(this,n,s,!0,u)},c.prototype.writeFloatBE=function(n,s,u){return oe(this,n,s,!1,u)};function ae(a,n,s,u,f){return n=+n,s=s>>>0,f||se(a,n,s,8),r.write(a,n,s,u,52,8),s+8}c.prototype.writeDoubleLE=function(n,s,u){return ae(this,n,s,!0,u)},c.prototype.writeDoubleBE=function(n,s,u){return ae(this,n,s,!1,u)},c.prototype.copy=function(n,s,u,f){if(!c.isBuffer(n))throw new TypeError("argument should be a Buffer");if(u||(u=0),!f&&f!==0&&(f=this.length),s>=n.length&&(s=n.length),s||(s=0),f>0&&f<u&&(f=u),f===u||n.length===0||this.length===0)return 0;if(s<0)throw new RangeError("targetStart out of bounds");if(u<0||u>=this.length)throw new RangeError("Index out of range");if(f<0)throw new RangeError("sourceEnd out of bounds");f>this.length&&(f=this.length),n.length-s<f-u&&(f=n.length-s+u);const h=f-u;return this===n&&typeof Uint8Array.prototype.copyWithin=="function"?this.copyWithin(s,u,f):Uint8Array.prototype.set.call(n,this.subarray(u,f),s),h},c.prototype.fill=function(n,s,u,f){if(typeof n=="string"){if(typeof s=="string"?(f=s,s=0,u=this.length):typeof u=="string"&&(f=u,u=this.length),f!==void 0&&typeof f!="string")throw new TypeError("encoding must be a string");if(typeof f=="string"&&!c.isEncoding(f))throw new TypeError("Unknown encoding: "+f);if(n.length===1){const g=n.charCodeAt(0);(f==="utf8"&&g<128||f==="latin1")&&(n=g)}}else typeof n=="number"?n=n&255:typeof n=="boolean"&&(n=Number(n));if(s<0||this.length<s||this.length<u)throw new RangeError("Out of range index");if(u<=s)return this;s=s>>>0,u=u===void 0?this.length:u>>>0,n||(n=0);let h;if(typeof n=="number")for(h=s;h<u;++h)this[h]=n;else{const g=c.isBuffer(n)?n:c.from(n,f),F=g.length;if(F===0)throw new TypeError('The value "'+n+'" is invalid for argument "value"');for(h=0;h<u-s;++h)this[h+s]=g[h%F]}return this};const V={};function X(a,n,s){V[a]=class extends s{constructor(){super(),Object.defineProperty(this,"message",{value:n.apply(this,arguments),writable:!0,configurable:!0}),this.name=`${this.name} [${a}]`,this.stack,delete this.name}get code(){return a}set code(f){Object.defineProperty(this,"code",{configurable:!0,enumerable:!0,value:f,writable:!0})}toString(){return`${this.name} [${a}]: ${this.message}`}}}X("ERR_BUFFER_OUT_OF_BOUNDS",function(a){return a?`${a} is outside of buffer bounds`:"Attempt to access memory outside buffer bounds"},RangeError),X("ERR_INVALID_ARG_TYPE",function(a,n){return`The "${a}" argument must be of type number. Received type ${typeof n}`},TypeError),X("ERR_OUT_OF_RANGE",function(a,n,s){let u=`The value of "${a}" is out of range.`,f=s;return Number.isInteger(s)&&Math.abs(s)>2**32?f=le(String(s)):typeof s=="bigint"&&(f=String(s),(s>BigInt(2)**BigInt(32)||s<-(BigInt(2)**BigInt(32)))&&(f=le(f)),f+="n"),u+=` It must be ${n}. Received ${f}`,u},RangeError);function le(a){let n="",s=a.length;const u=a[0]==="-"?1:0;for(;s>=u+4;s-=3)n=`_${a.slice(s-3,s)}${n}`;return`${a.slice(0,s)}${n}`}function _e(a,n,s){G(n,"offset"),(a[n]===void 0||a[n+s]===void 0)&&J(n,a.length-(s+1))}function ce(a,n,s,u,f,h){if(a>s||a<n){const g=typeof n=="bigint"?"n":"";let F;throw h>3?n===0||n===BigInt(0)?F=`>= 0${g} and < 2${g} ** ${(h+1)*8}${g}`:F=`>= -(2${g} ** ${(h+1)*8-1}${g}) and < 2 ** ${(h+1)*8-1}${g}`:F=`>= ${n}${g} and <= ${s}${g}`,new V.ERR_OUT_OF_RANGE("value",F,a)}_e(u,f,h)}function G(a,n){if(typeof a!="number")throw new V.ERR_INVALID_ARG_TYPE(n,"number",a)}function J(a,n,s){throw Math.floor(a)!==a?(G(a,s),new V.ERR_OUT_OF_RANGE(s||"offset","an integer",a)):n<0?new V.ERR_BUFFER_OUT_OF_BOUNDS:new V.ERR_OUT_OF_RANGE(s||"offset",`>= ${s?1:0} and <= ${n}`,a)}const ge=/[^+/0-9A-Za-z-_]/g;function ye(a){if(a=a.split("=")[0],a=a.trim().replace(ge,""),a.length<2)return"";for(;a.length%4!==0;)a=a+"=";return a}function ee(a,n){n=n||1/0;let s;const u=a.length;let f=null;const h=[];for(let g=0;g<u;++g){if(s=a.charCodeAt(g),s>55295&&s<57344){if(!f){if(s>56319){(n-=3)>-1&&h.push(239,191,189);continue}else if(g+1===u){(n-=3)>-1&&h.push(239,191,189);continue}f=s;continue}if(s<56320){(n-=3)>-1&&h.push(239,191,189),f=s;continue}s=(f-55296<<10|s-56320)+65536}else f&&(n-=3)>-1&&h.push(239,191,189);if(f=null,s<128){if((n-=1)<0)break;h.push(s)}else if(s<2048){if((n-=2)<0)break;h.push(s>>6|192,s&63|128)}else if(s<65536){if((n-=3)<0)break;h.push(s>>12|224,s>>6&63|128,s&63|128)}else if(s<1114112){if((n-=4)<0)break;h.push(s>>18|240,s>>12&63|128,s>>6&63|128,s&63|128)}else throw new Error("Invalid code point")}return h}function we(a){const n=[];for(let s=0;s<a.length;++s)n.push(a.charCodeAt(s)&255);return n}function Pe(a,n){let s,u,f;const h=[];for(let g=0;g<a.length&&!((n-=2)<0);++g)s=a.charCodeAt(g),u=s>>8,f=s%256,h.push(f),h.push(u);return h}function ue(a){return t.toByteArray(ye(a))}function Z(a,n,s,u){let f;for(f=0;f<u&&!(f+s>=n.length||f>=a.length);++f)n[f+s]=a[f];return f}function D(a,n){return a instanceof n||a!=null&&a.constructor!=null&&a.constructor.name!=null&&a.constructor.name===n.name}function te(a){return a!==a}const Ee=function(){const a="0123456789abcdef",n=new Array(256);for(let s=0;s<16;++s){const u=s*16;for(let f=0;f<16;++f)n[u+f]=a[s]+a[f]}return n}();function j(a){return typeof BigInt>"u"?xe:a}function xe(){throw new Error("BigInt not supported")}})(buffer);class ObjectTypeError extends BaseError{constructor(t,r,o,l){super(`Object ${t} ${l?`at ${l}`:""}was anticipated to be a ${o} but it is a ${r}.`),this.code=this.name=ObjectTypeError.code,this.data={oid:t,actual:r,expected:o,filepath:l}}}ObjectTypeError.code="ObjectTypeError";typeof window<"u"&&(window.Buffer=buffer.Buffer);const tmpPath="/tmp/file.zip",unzipFile=async(e,t,r,o=!0)=>{if(t instanceof File){const d=t;t=tmpPath,await e.writeFile(t,new Uint8Array(await d.arrayBuffer()))}const l=phpVars({zipPath:t,extractToPath:r,overwriteFiles:o});await e.run({code:`<?php
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
        unzip(${l.zipPath}, ${l.extractToPath}, ${l.overwriteFiles});
        `}),await e.fileExists(tmpPath)&&await e.unlink(tmpPath)},buildVersion="876f119af187240f303d71207cd705105f315893",CACHE_NAME_PREFIX="playground-cache",LATEST_CACHE_NAME=`${CACHE_NAME_PREFIX}-${buildVersion}`,promisedOfflineModeCache=caches.open(LATEST_CACHE_NAME);async function hasCachedResponse(e,t={ignoreSearch:!0}){return!!await(await promisedOfflineModeCache).match(e,t)}async function bootWordPress(e){async function t(l,d){const p=new PHP(await e.createPhpRuntime());return e.sapiName&&p.setSapiName(e.sapiName),l&&(p.requestHandler=l),e.phpIniEntries&&setPhpIniEntries(p,e.phpIniEntries),d?(await setupPlatformLevelMuPlugins(p),await writeFiles(p,"/",e.createFiles||{}),await preloadPhpInfoRoute(p,joinPaths(new URL(e.siteUrl).pathname,"phpinfo.php"))):proxyFileSystem(await l.getPrimaryPhp(),p,["/tmp",l.documentRoot,"/internal/shared"]),e.spawnHandler&&await p.setSpawnHandler(e.spawnHandler(l.processManager)),rotatePHPRuntime({php:p,cwd:l.documentRoot,recreateRuntime:e.createPhpRuntime,maxRequests:400}),p}const r=new PHPRequestHandler({phpFactory:async({isPrimary:l})=>t(r,l),documentRoot:e.documentRoot||"/wordpress",absoluteUrl:e.siteUrl,rewriteRules:wordPressRewriteRules,getFileNotFoundAction:e.getFileNotFoundAction??getFileNotFoundActionForWordPress}),o=await r.getPrimaryPhp();if(e.hooks?.beforeWordPressFiles&&await e.hooks.beforeWordPressFiles(o),e.wordPressZip&&await unzipWordPress(o,await e.wordPressZip),e.constants)for(const l in e.constants)o.defineConstant(l,e.constants[l]);if(o.defineConstant("WP_HOME",e.siteUrl),o.defineConstant("WP_SITEURL",e.siteUrl),e.hooks?.beforeDatabaseSetup&&await e.hooks.beforeDatabaseSetup(o),e.sqliteIntegrationPluginZip&&await preloadSqliteIntegration(o,await e.sqliteIntegrationPluginZip),await isWordPressInstalled(o)||await installWordPress(o),!await isWordPressInstalled(o))throw new Error("WordPress installation has failed.");return r}async function isWordPressInstalled(e){return(await e.run({code:`<?php
$wp_load = getenv('DOCUMENT_ROOT') . '/wp-load.php';
if (!file_exists($wp_load)) {
	echo '0';
	exit;
}
require $wp_load;
echo is_blog_installed() ? '1' : '0';
`,env:{DOCUMENT_ROOT:e.documentRoot}})).text==="1"}async function installWordPress(e){await withPHPIniValues(e,{disable_functions:"fsockopen",allow_url_fopen:"0"},async()=>await e.request({url:"/wp-admin/install.php?step=2",method:"POST",body:{language:"en",prefix:"wp_",weblog_title:"My WordPress Website",user_name:"admin",admin_password:"password",admin_password2:"password",Submit:"Install WordPress",pw_weak:"1",admin_email:"admin@localhost.com"}})),(await e.run({code:`<?php
$wp_load = getenv('DOCUMENT_ROOT') . '/wp-load.php';
if (!file_exists($wp_load)) {
	echo '0';
	exit;
}
require $wp_load;
$option_result = update_option(
	'permalink_structure',
	'/%year%/%monthnum%/%day%/%postname%/'
);
echo $option_result ? '1' : '0';
`,env:{DOCUMENT_ROOT:e.documentRoot}})).text!=="1"&&logger.warn("Failed to default to pretty permalinks after WP install.")}function getFileNotFoundActionForWordPress(e){return{type:"internal-redirect",uri:"/index.php"}}async function getLoadedWordPressVersion(e){const o=(await(await e.getPrimaryPhp()).run({code:`<?php
			require '${e.documentRoot}/wp-includes/version.php';
			echo $wp_version;
		`})).text;if(!o)throw new Error("Unable to read loaded WordPress version.");return versionStringToLoadedWordPressVersion(o)}function versionStringToLoadedWordPressVersion(e){if(/-(alpha|beta|RC)\d*-\d+$/.test(e))return"nightly";if(/-(beta|RC)\d*$/.test(e))return"beta";const o=e.match(/^(\d+\.\d+)(?:\.\d+)?$/);return o!==null?o[1]:e}const wordPressRewriteRules=[{match:/^\/(.*?)(\/wp-(content|admin|includes)\/.*)/g,replacement:"$2"}];async function setupPlatformLevelMuPlugins(e){await e.mkdir("/internal/shared/mu-plugins"),await e.writeFile("/internal/shared/preload/env.php",`<?php

        // Allow adding filters/actions prior to loading WordPress.
        // $function_to_add MUST be a string.
        function playground_add_filter( $tag, $function_to_add, $priority = 10, $accepted_args = 1 ) {
            global $wp_filter;
            $wp_filter[$tag][$priority][$function_to_add] = array('function' => $function_to_add, 'accepted_args' => $accepted_args);
        }
        function playground_add_action( $tag, $function_to_add, $priority = 10, $accepted_args = 1 ) {
            playground_add_filter( $tag, $function_to_add, $priority, $accepted_args );
        }

        // Load our mu-plugins after customer mu-plugins
        // NOTE: this means our mu-plugins can't use the muplugins_loaded action!
        playground_add_action( 'muplugins_loaded', 'playground_load_mu_plugins', 0 );
        function playground_load_mu_plugins() {
            // Load all PHP files from /internal/shared/mu-plugins, sorted by filename
            $mu_plugins_dir = '/internal/shared/mu-plugins';
            if(!is_dir($mu_plugins_dir)){
                return;
            }
            $mu_plugins = glob( $mu_plugins_dir . '/*.php' );
            sort( $mu_plugins );
            foreach ( $mu_plugins as $mu_plugin ) {
                require_once $mu_plugin;
            }
        }
    `),await e.writeFile("/internal/shared/mu-plugins/1-auto-login.php",`<?php
		/**
		 * Returns the username to auto-login as, if any.
		 * @return string|false
		 */
		function playground_get_username_for_auto_login() {
			/**
			 * Allow users to auto-login as a specific user on their first visit.
			 *
			 * Prevent the auto-login if it already happened by checking for the
			 * playground_auto_login_already_happened cookie.
			 * This is used to allow the user to logout.
			 */
			if ( defined('PLAYGROUND_AUTO_LOGIN_AS_USER') && !isset($_COOKIE['playground_auto_login_already_happened']) ) {
				return PLAYGROUND_AUTO_LOGIN_AS_USER;
			}
			/**
			 * Allow users to auto-login as a specific user by passing the
			 * playground_force_auto_login_as_user GET parameter.
			 */
			if ( defined('PLAYGROUND_FORCE_AUTO_LOGIN_ENABLED') && isset($_GET['playground_force_auto_login_as_user']) ) {
				return $_GET['playground_force_auto_login_as_user'];
			}
			return false;
		}
		/**
		 * Logs the user in on their first visit if the Playground runtime told us to.
		 */
		function playground_auto_login() {
			$user_name = playground_get_username_for_auto_login();
			if ( false === $user_name ) {
				return;
			}
			if (wp_doing_ajax() || defined('REST_REQUEST')) {
				return;
			}
			if ( is_user_logged_in() ) {
				return;
			}
			$user = get_user_by('login', $user_name);
			if (!$user) {
				return;
			}
			wp_set_current_user( $user->ID, $user->user_login );
			wp_set_auth_cookie( $user->ID );
			do_action( 'wp_login', $user->user_login, $user );
			setcookie('playground_auto_login_already_happened', '1');
		}

		/**
		 * Autologin users from the wp-login.php page.
		 *
		 * The wp hook isn't triggered on
		 **/
		add_action('init', function() {
			playground_auto_login();
			/**
			 * Check if the request is for the login page.
			 */
			if (is_login() && is_user_logged_in() && !empty($_GET['redirect_to'])) {
				wp_redirect($_GET['redirect_to']);
				exit;
			}
		}, 1);

		/**
		 * Disable the Site Admin Email Verification Screen for any session started
		 * via autologin.
		 */
		add_filter('admin_email_check_interval', function($interval) {
			if(false === playground_get_username_for_auto_login()) {
				return 0;
			}
			return $interval;
		});
		`),await e.writeFile("/internal/shared/mu-plugins/0-playground.php",`<?php
        // Needed because gethostbyname( 'wordpress.org' ) returns
        // a private network IP address for some reason.
        add_filter( 'allowed_redirect_hosts', function( $deprecated = '' ) {
            return array(
                'wordpress.org',
                'api.wordpress.org',
                'downloads.wordpress.org',
            );
        } );

		// Support pretty permalinks
        add_filter( 'got_url_rewrite', '__return_true' );

        // Create the fonts directory if missing
        if(!file_exists(WP_CONTENT_DIR . '/fonts')) {
            mkdir(WP_CONTENT_DIR . '/fonts');
        }

        $log_file = WP_CONTENT_DIR . '/debug.log';
        define('ERROR_LOG_FILE', $log_file);
        ini_set('error_log', $log_file);
        ?>`),await e.writeFile("/internal/shared/preload/error-handler.php",`<?php
		(function() {
			$playground_consts = [];
			if(file_exists('/internal/shared/consts.json')) {
				$playground_consts = @json_decode(file_get_contents('/internal/shared/consts.json'), true) ?: [];
				$playground_consts = array_keys($playground_consts);
			}
			set_error_handler(function($severity, $message, $file, $line) use($playground_consts) {
				/**
				 * This is a temporary workaround to hide the 32bit integer warnings that
				 * appear when using various time related function, such as strtotime and mktime.
				 * Examples of the warnings that are displayed:
				 *
				 * Warning: mktime(): Epoch doesn't fit in a PHP integer in <file>
				 * Warning: strtotime(): Epoch doesn't fit in a PHP integer in <file>
				 */
				if (strpos($message, "fit in a PHP integer") !== false) {
					return;
				}
				/**
				 * Networking support in Playground registers a http_api_transports filter.
				 *
				 * This filter is deprecated, and no longer actively used, but is needed for wp_http_supports().
				 * @see https://core.trac.wordpress.org/ticket/37708
				 */
				if (
					strpos($message, "http_api_transports") !== false &&
					strpos($message, "since version 6.4.0 with no alternative available") !== false
				) {
					return;
				}
				/**
				 * Playground defines some constants upfront, and some of them may be redefined
				 * in wp-config.php. For example, SITE_URL or WP_DEBUG. This is expected and
				 * we want Playground constants to take priority without showing warnings like:
				 *
				 * Warning: Constant SITE_URL already defined in
				 */
				if (strpos($message, "already defined") !== false) {
					foreach($playground_consts as $const) {
						if(strpos($message, "Constant $const already defined") !== false) {
							return;
						}
					}
				}
				/**
				 * Don't complain about network errors when not connected to the network.
				 */
				if (
					(
						! defined('USE_FETCH_FOR_REQUESTS') ||
						! USE_FETCH_FOR_REQUESTS
					) &&
					strpos($message, "WordPress could not establish a secure connection to WordPress.org") !== false)
				{
					return;
				}
				return false;
			});
		})();`)}async function preloadPhpInfoRoute(e,t="/phpinfo.php"){await e.writeFile("/internal/shared/preload/phpinfo.php",`<?php
    // Render PHPInfo if the requested page is /phpinfo.php
    if ( ${phpVar(t)} === $_SERVER['REQUEST_URI'] ) {
        phpinfo();
        exit;
    }
    `)}async function preloadSqliteIntegration(e,t){await e.isDir("/tmp/sqlite-database-integration")&&await e.rmdir("/tmp/sqlite-database-integration",{recursive:!0}),await e.mkdir("/tmp/sqlite-database-integration"),await unzipFile(e,t,"/tmp/sqlite-database-integration");const r="/internal/shared/sqlite-database-integration",o=await e.isDir("/tmp/sqlite-database-integration/sqlite-database-integration-main")?"/tmp/sqlite-database-integration/sqlite-database-integration-main":"/tmp/sqlite-database-integration/sqlite-database-integration-develop";await e.mv(o,r),await e.defineConstant("SQLITE_MAIN_FILE","1");const d=(await e.readFileAsText(joinPaths(r,"db.copy"))).replace("'{SQLITE_IMPLEMENTATION_FOLDER_PATH}'",phpVar(r)).replace("'{SQLITE_PLUGIN}'",phpVar(joinPaths(r,"load.php"))),p=joinPaths(await e.documentRoot,"wp-content/db.php"),c=`<?php
	// Do not preload this if WordPress comes with a custom db.php file.
	if(file_exists(${phpVar(p)})) {
		return;
	}
	?>`,m="/internal/shared/mu-plugins/sqlite-database-integration.php";await e.writeFile(m,c+d),await e.writeFile("/internal/shared/preload/0-sqlite.php",c+`<?php

/**
 * Loads the SQLite integration plugin before WordPress is loaded
 * and without creating a drop-in "db.php" file.
 *
 * Technically, it creates a global $wpdb object whose only two
 * purposes are to:
 *
 * * Exist – because the require_wp_db() WordPress function won't
 *           connect to MySQL if $wpdb is already set.
 * * Load the SQLite integration plugin the first time it's used
 *   and replace the global $wpdb reference with the SQLite one.
 *
 * This lets Playground keep the WordPress installation clean and
 * solves dillemas like:
 *
 * * Should we include db.php in Playground exports?
 * * Should we remove db.php from Playground imports?
 * * How should we treat stale db.php from long-lived OPFS sites?
 *
 * @see https://github.com/WordPress/wordpress-playground/discussions/1379 for
 *      more context.
 */
class Playground_SQLite_Integration_Loader {
	public function __call($name, $arguments) {
		$this->load_sqlite_integration();
		if($GLOBALS['wpdb'] === $this) {
			throw new Exception('Infinite loop detected in $wpdb – SQLite integration plugin could not be loaded');
		}
		return call_user_func_array(
			array($GLOBALS['wpdb'], $name),
			$arguments
		);
	}
	public function __get($name) {
		$this->load_sqlite_integration();
		if($GLOBALS['wpdb'] === $this) {
			throw new Exception('Infinite loop detected in $wpdb – SQLite integration plugin could not be loaded');
		}
		return $GLOBALS['wpdb']->$name;
	}
	public function __set($name, $value) {
		$this->load_sqlite_integration();
		if($GLOBALS['wpdb'] === $this) {
			throw new Exception('Infinite loop detected in $wpdb – SQLite integration plugin could not be loaded');
		}
		$GLOBALS['wpdb']->$name = $value;
	}
    protected function load_sqlite_integration() {
        require_once ${phpVar(m)};
    }
}
$wpdb = $GLOBALS['wpdb'] = new Playground_SQLite_Integration_Loader();

/**
 * WordPress is capable of using a preloaded global $wpdb. However, if
 * it cannot find the drop-in db.php plugin it still checks whether
 * the mysqli_connect() function exists even though it's not used.
 *
 * What WordPress demands, Playground shall provide.
 */
if(!function_exists('mysqli_connect')) {
	function mysqli_connect() {}
}

		`),await e.writeFile("/internal/shared/mu-plugins/sqlite-test.php",`<?php
		global $wpdb;
		if(!($wpdb instanceof WP_SQLite_DB)) {
			var_dump(isset($wpdb));
			die("SQLite integration not loaded " . get_class($wpdb));
		}
		`)}async function unzipWordPress(e,t){e.mkdir("/tmp/unzipped-wordpress"),await unzipFile(e,t,"/tmp/unzipped-wordpress"),e.fileExists("/tmp/unzipped-wordpress/wordpress.zip")&&await unzipFile(e,"/tmp/unzipped-wordpress/wordpress.zip","/tmp/unzipped-wordpress");let r=e.fileExists("/tmp/unzipped-wordpress/wordpress")?"/tmp/unzipped-wordpress/wordpress":e.fileExists("/tmp/unzipped-wordpress/build")?"/tmp/unzipped-wordpress/build":"/tmp/unzipped-wordpress";if(!e.fileExists(joinPaths(r,"wp-config-sample.php"))){const o=e.listFiles(r);if(o.length){const l=o[0];e.fileExists(joinPaths(r,l,"wp-config-sample.php"))&&(r=joinPaths(r,l))}}if(e.isDir(e.documentRoot)&&isCleanDirContainingSiteMetadata(e.documentRoot,e)){for(const o of e.listFiles(r)){const l=joinPaths(r,o),d=joinPaths(e.documentRoot,o);e.mv(l,d)}e.rmdir(r,{recursive:!0})}else e.mv(r,e.documentRoot);!e.fileExists(joinPaths(e.documentRoot,"wp-config.php"))&&e.fileExists(joinPaths(e.documentRoot,"wp-config-sample.php"))&&e.writeFile(joinPaths(e.documentRoot,"wp-config.php"),e.readFileAsText(joinPaths(e.documentRoot,"/wp-config-sample.php")))}function isCleanDirContainingSiteMetadata(e,t){const r=t.listFiles(e);return r.length===0||r.length===1&&r[0]==="playground-site-metadata.json"}function spawnHandlerFactory(e){return createSpawnHandler(async function(t,r,o){if(t[0]==="exec"&&t.shift(),t[0]==="/usr/bin/env"&&t[1]==="stty"&&t[2]==="size")r.stdout("18 140"),r.exit(0);else if(t[0]==="less")r.on("stdin",l=>{r.stdout(l)}),r.flushStdin(),r.exit(0);else if(t[0]==="fetch"){r.flushStdin(),fetch(t[1]).then(async l=>{const d=l.body?.getReader();if(!d){r.exit(1);return}for(;;){const{done:p,value:c}=await d.read();if(p){r.exit(0);break}r.stdout(c)}});return}else if(t[0]==="php"){const{php:l,reap:d}=await e.acquirePHPInstance();let p;try{const c=`<?php
                // Set the argv global.
                $GLOBALS['argv'] = array_merge([
                    "/wordpress/wp-cli.phar",
                    "--path=/wordpress"
                ], ${phpVar(t.slice(2))});

                // Provide stdin, stdout, stderr streams outside of
                // the CLI SAPI.
                define('STDIN', fopen('php://stdin', 'rb'));
                define('STDOUT', fopen('php://stdout', 'wb'));
                define('STDERR', fopen('/tmp/stderr', 'wb'));

                ${o.cwd?'chdir(getenv("DOCROOT")); ':""}
                `;t.includes("-r")?p=await l.run({code:`${c} ${t[t.indexOf("-r")+1]}`,env:o.env}):t[1]==="wp-cli.phar"?p=await l.run({code:`${c} require( "/wordpress/wp-cli.phar" );`,env:{...o.env,SHELL_PIPE:"0"}}):p=await l.run({scriptPath:t[1],env:o.env}),r.stdout(p.bytes),r.stderr(p.errors),r.exit(p.exitCode)}catch(c){logger.error("Error in childPHP:",c),c instanceof Error&&r.stderr(c.message),r.exit(1)}finally{d()}}else r.exit(1)})}async function backfillStaticFilesRemovedFromMinifiedBuild(e){if(!e.requestHandler){logger.warn("No PHP request handler available");return}try{const t=joinPaths(e.requestHandler.documentRoot,"wordpress-remote-asset-paths");if(!e.fileExists(t)||e.readFileAsText(t)==="")return;const r=await getWordPressStaticZipUrl(e);if(!r)return;const o=await fetch(r);if(!o?.ok)throw new Error(`Failed to fetch WordPress static assets: ${o.status} ${o.statusText}`);await unzipFile(e,new File([await o.blob()],"wordpress-static.zip"),e.requestHandler.documentRoot,!1),e.writeFile(t,"")}catch(t){logger.warn("Failed to download WordPress assets",t)}}async function hasCachedStaticFilesRemovedFromMinifiedBuild(e){const t=await getWordPressStaticZipUrl(e);return t?await hasCachedResponse(t):!1}async function getWordPressStaticZipUrl(e){const t=await getLoadedWordPressVersion(e.requestHandler),r=wpVersionToStaticAssetsDirectory(t);return r?joinPaths("/",r,"wordpress-static.zip"):!1}const FALLBACK_FILE_SIZE=5*1024*1024;class EmscriptenDownloadMonitor extends EventTarget{#e={};#t={};expectAssets(t){for(const[r,o]of Object.entries(t)){const l="http://example.com/",p=new URL(r,l).pathname.split("/").pop();p in this.#e||(this.#e[p]=o),p in this.#t||(this.#t[p]=0)}}async monitorFetch(t){const r=await t;return cloneResponseMonitorProgress(r,l=>{this.#n(r.url,l.detail.loaded,l.detail.total)})}#n(t,r,o){const l=new URL(t,"http://example.com").pathname.split("/").pop();o?l in this.#e||(this.#e[l]=o,this.#t[l]=r):o=this.#e[l],l in this.#t||logger.warn(`Registered a download #progress of an unregistered file "${l}". This may cause a sudden **decrease** in the #progress percentage as the total number of bytes increases during the download.`),this.#t[l]=r,this.dispatchEvent(new CustomEvent("progress",{detail:{loaded:sumValues(this.#t),total:sumValues(this.#e)}}))}}function sumValues(e){return Object.values(e).reduce((t,r)=>t+r,0)}function cloneResponseMonitorProgress(e,t){const r=e.headers.get("content-length")||"",o=parseInt(r,10)||FALLBACK_FILE_SIZE;function l(d,p){t(new CustomEvent("progress",{detail:{loaded:d,total:p}}))}return new Response(new ReadableStream({async start(d){if(!e.body){d.close();return}const p=e.body.getReader();let c=0;for(;;)try{const{done:m,value:_}=await p.read();if(_&&(c+=_.byteLength),m){l(c,c),d.close();break}else l(c,o),d.enqueue(_)}catch(m){logger.error({e:m}),d.error(m);break}}}),{status:e.status,statusText:e.statusText,headers:e.headers})}function createMemoizedFetch(e=fetch){const t={};return async function(o,l){t[o]||(t[o]=e(o,l).then(_=>({body:_.body,responseInit:{status:_.status,statusText:_.statusText,headers:_.headers}})));const{body:d,responseInit:p}=await t[o],[c,m]=d.tee();return t[o]={body:c,responseInit:p},new Response(m,p)}}var transportFetch=`<?php

/**
 * This transport delegates PHP HTTP requests to JavaScript synchronous XHR.
 *
 * This file isn't actually used. It's just here for reference and development. The actual
 * PHP code used in WordPress is hardcoded copy residing in wordpress.mjs in the _patchWordPressCode
 * function.
 *
 * The reason for calling it Wp_Http_Fetch and not something more natural like
 * Requests_Transport_Fetch is the _get_first_available_transport(). It checks for
 * a class named "Wp_Http_" . $transport_name – which means we must adhere to this
 * hardcoded pattern.
 */
class Wp_Http_Fetch_Base
{
	public $headers = '';

	public function __construct()
	{
	}

	public function __destruct()
	{
	}

	/**
	 * Delegates PHP HTTP requests to JavaScript synchronous XHR.
	 *
	 * @TODO Implement handling for more $options such as cookies, filename, auth, etc.
	 *
	 * @param $url
	 * @param $headers
	 * @param $data
	 * @param $options
	 *
	 * @return false|string
	 */
	public function request($url, $headers = array(), $data = array(), $options = array())
	{
		// Disable wp-cron requests that are extremely slow in node.js runtime environment.
		// @TODO: Make wp-cron requests faster.
		if (str_contains($url, '/wp-cron.php')) {
			return false;
		}

		if (!empty($data)) {
			$data_format = $options['data_format'];
			if ($data_format === 'query') {
				$url = self::format_get($url, $data);
				$data = '';
			} elseif (!is_string($data)) {
				$data = http_build_query($data, '', '&');
			}
		}

		$request = json_encode(
			array(
				'type' => 'request',
				'data' => [
					'headers' => $headers,
					'data' => $data,
					'url' => $url,
					'method' => $options['type'],
				]
			)
		);

		$this->headers = post_message_to_js($request);

		// Store a file if the request specifies it.
		// Are we sure that \`$this->headers\` includes the body of the response?
		$before_response_body = strpos($this->headers, "\\r\\n\\r\\n");
		if (isset($options['filename']) && $options['filename'] && false !== $before_response_body) {
			$response_body = substr($this->headers, $before_response_body + 4);
			$this->headers = substr($this->headers, 0, $before_response_body);
			file_put_contents($options['filename'], $response_body);
		}

		return $this->headers;
	}

	public function request_multiple($requests, $options)
	{
		$responses = array();
		$class = get_class($this);
		foreach ($requests as $id => $request) {
			try {
				$handler = new $class();
				$responses[$id] = $handler->request($request['url'], $request['headers'], $request['data'], $request['options']);
				$request['options']['hooks']->dispatch('transport.internal.parse_response', array(&$responses[$id], $request));
			} catch (Requests_Exception $e) {
				$responses[$id] = $e;
			}
			if (!is_string($responses[$id])) {
				$request['options']['hooks']->dispatch('multiple.request.complete', array(&$responses[$id], $id));
			}
		}

		return $responses;
	}

	protected static function format_get($url, $data)
	{
		if (!empty($data)) {
			$query = '';
			$url_parts = parse_url($url);
			if (empty($url_parts['query'])) {
				$url_parts['query'] = '';
			} else {
				$query = $url_parts['query'];
			}
			$query .= '&' . http_build_query($data, '', '&');
			$query = trim($query, '&');
			if (empty($url_parts['query'])) {
				$url .= '?' . $query;
			} else {
				$url = str_replace($url_parts['query'], $query, $url);
			}
		}

		return $url;
	}

	public static function test($capabilities = array())
	{
		if (!function_exists('post_message_to_js')) {
			return false;
		}

		return true;
	}
}

if (class_exists('\\WpOrg\\Requests\\Requests')) {
	class Wp_Http_Fetch extends Wp_Http_Fetch_Base implements \\WpOrg\\Requests\\Transport
	{

	}
} else {
	class Wp_Http_Fetch extends Wp_Http_Fetch_Base implements Requests_Transport
	{

	}
}
`,transportDummy=`<?php

/**
 * This transport does not perform any HTTP requests and only exists
 * to prevent the Requests class from complaining about not having any
 * transports.
 * 
 * The reason for calling it Wp_Http_Dummy and not something more natural like
 * Requests_Transport_Dummy is the _get_first_available_transport(). It checks for
 * a class named "Wp_Http_" . $transport_name – which means we must adhere to this
 * hardcoded pattern.
 */
class Wp_Http_Dummy_Base
{
	public $headers = '';

	public function __construct()
	{
	}

	public function __destruct()
	{
	}

	public function request($url, $headers = array(), $data = array(), $options = array())
	{
		return false;
	}

	public function request_multiple($requests, $options)
	{
		$responses = array();
		foreach ($requests as $id => $request) {
			$responses[] = false;
		}
		return $responses;
	}

	protected static function format_get($url, $data)
	{
		return $url;
	}

	public static function test($capabilities = array())
	{
		return true;
	}
}

if (class_exists('\\WpOrg\\Requests\\Requests')) {
	class Wp_Http_Dummy extends Wp_Http_Dummy_Base implements \\WpOrg\\Requests\\Transport
	{

	}
} else {
	class Wp_Http_Dummy extends Wp_Http_Dummy_Base implements Requests_Transport
	{

	}
}
`,playgroundWebMuPlugin=`<?php

/**
 * Add a notice to wp-login.php offering the username and password.
 */
add_filter(
	'login_message',
	function ( $message ) {
		return $message . <<<EOT
<div class="message info">
	<strong>username:</strong> <code>admin</code><br><strong>password</strong>: <code>password</code>
</div>
EOT;
	}
);

/**
 * Because the in-browser Playground doesn't have access to the internet,
 * network-dependent features like directories don't work. Normally, you'll
 * see a confusing message like "An unexpected error occurred." This mu-plugin
 * makes it more clear that the feature is not yet supported.
 *
 * https://github.com/WordPress/wordpress-playground/issues/498
 *
 * Added styling to hide the Popular tags section of the Plugins page
 * and the nonfunctional Try Again button (both Plugins and Themes) that's
 * appended when the message is displayed.
 *
 * https://github.com/WordPress/wordpress-playground/issues/927
 *
 */
add_action('admin_head', function () {
	echo '<style>
				:is(.plugins-popular-tags-wrapper:has(div.networking_err_msg),
				button.button.try-again) {
						display: none;
				}
		</style>';
});

add_action('init', 'networking_disabled');
function networking_disabled() {
	$networking_err_msg = '<div class="networking_err_msg">Network access is an <a href="https://github.com/WordPress/wordpress-playground/issues/85" target="_blank">experimental, opt-in feature</a>, which means you need to enable it to allow Playground to access the Plugins/Themes directories.
	<p>There are two alternative methods to enable global networking support:</p>
	<ol>
	<li>Using the <a href="https://wordpress.github.io/wordpress-playground/developers/apis/query-api/">Query API</a>: for example, https://playground.wordpress.net/<em>?networking=yes</em> <strong>or</strong>
	<li> Using the <a href="https://wordpress.github.io/wordpress-playground/blueprints/data-format/#features">Blueprint API</a>: add <code>"features": { "networking": true }</code> to the JSON file.
	</li></ol>
	<p>
	When browsing Playground as a standalone instance, you can enable networking via the settings panel: select the option "Network access (e.g. for browsing plugins)" and hit the "Apply changes" button.<p>
	<strong>Please note:</strong> This option is hidden when browsing Playground as an embedded iframe.</p></div>';
	return $networking_err_msg;
}

add_filter('plugins_api_result', function ($res) {
	if ($res instanceof WP_Error) {
		$res = new WP_Error(
			'plugins_api_failed',
			networking_disabled()
		);
	}
	return $res;
});

add_filter('gettext', function ($translation) {
	if( $GLOBALS['pagenow'] === 'theme-install.php') {
		if ($translation === 'An unexpected error occurred. Something may be wrong with WordPress.org or this server&#8217;s configuration. If you continue to have problems, please try the <a href="%s">support forums</a>.') {
			return networking_disabled();
		}
	}
	return $translation;
});

/**
 * Links with target="top" don't work in the playground iframe because of
 * the sandbox attribute. What they really should be targeting is the
 * playground iframe itself (name="playground"). This mu-plugin rewrites
 * all target="_top" links to target="playground" instead.
 *
 * https://github.com/WordPress/wordpress-playground/issues/266
 */
add_action('admin_print_scripts', function () {
	?>
	<script>
		document.addEventListener('click', function (event) {
			if (event.target.tagName === 'A' && ['_parent', '_top'].includes(event.target.target)) {
				event.target.target = 'wordpress-playground';
			}
		});
	<\/script>
	<?php
});

/**
 * The default WordPress requests transports have been disabled
 * at this point. However, the Requests class requires at least
 * one working transport or else it throws warnings and acts up.
 *
 * This mu-plugin provides that transport. It's one of the two:
 *
 * * WP_Http_Fetch – Sends requests using browser's fetch() function.
 * * WP_Http_Dummy – Does not send any requests and only exists to keep
 * 								the Requests class happy.
 */
$__requests_class = class_exists( '\\WpOrg\\Requests\\Requests' ) ? '\\WpOrg\\Requests\\Requests' : 'Requests';
if (defined('USE_FETCH_FOR_REQUESTS') && USE_FETCH_FOR_REQUESTS) {
	require(__DIR__ . '/playground-includes/wp_http_fetch.php');
	/**
	 * Force the Fetch transport to be used in Requests.
	 */
	add_action( 'requests-requests.before_request', function( $url, $headers, $data, $type, &$options ) {
		$options['transport'] = 'Wp_Http_Fetch';
	}, 10, 5 );

	/**
	 * Force wp_http_supports() to work, which uses deprecated WP_HTTP methods.
	 * This filter is deprecated, and no longer actively used, but is needed for wp_http_supports().
	 * @see https://core.trac.wordpress.org/ticket/37708
	 */
	add_filter('http_api_transports', function() {
		return [ 'Fetch' ];
	});

	/**
	 * Disable signature verification as it doesn't seem to work with
	 * fetch requests:
	 *
	 * https://downloads.wordpress.org/plugin/classic-editor.zip returns no signature header.
	 * https://downloads.wordpress.org/plugin/classic-editor.zip.sig returns 404.
	 *
	 * @TODO Investigate why.
	 */
	add_filter('wp_signature_hosts', function ($hosts) {
		return [];
	});

	// add_filter('http_request_host_is_external', function ($arg) {
	// 	return true;
	// });
	add_filter('http_request_host_is_external', '__return_true');
} else {
	require(__DIR__ . '/playground-includes/wp_http_dummy.php');
	$__requests_class::add_transport('Wp_Http_Dummy');

	add_action( 'requests-requests.before_request', function( $url, $headers, $data, $type, &$options ) {
		$options['transport'] = 'Wp_Http_Dummy';
	}, 10, 5 );

	add_filter('http_api_transports', function() {
		return [ 'Dummy' ];
	});
}

?>
`;self.postMessage("worker-script-started");const downloadMonitor=new EmscriptenDownloadMonitor,monitoredFetch=(e,t)=>downloadMonitor.monitorFetch(fetch(e,t)),memoizedFetch=createMemoizedFetch(monitoredFetch);class PlaygroundWorkerEndpoint extends PHPWorker{constructor(t){super(void 0,t),this.booted=!1,this.unmounts={}}async getWordPressModuleDetails(){return{majorVersion:this.loadedWordPressVersion||this.requestedWordPressVersion,staticAssetsDirectory:this.loadedWordPressVersion?wpVersionToStaticAssetsDirectory(this.loadedWordPressVersion):void 0}}async getMinifiedWordPressVersions(){return{all:MinifiedWordPressVersions,latest:LatestMinifiedWordPressVersion}}async hasOpfsMount(t){return t in this.unmounts}async mountOpfs(t,r){const o=await directoryHandleFromMountDevice(t.device),l=this.__internal_getPHP();this.unmounts[t.mountpoint]=await l.mount(t.mountpoint,createDirectoryHandleMountHandler(o,{initialSync:{onProgress:r,direction:t.initialSyncDirection}}))}async unmountOpfs(t){this.unmounts[t](),delete this.unmounts[t]}async backfillStaticFilesRemovedFromMinifiedBuild(){await backfillStaticFilesRemovedFromMinifiedBuild(this.__internal_getPHP())}async hasCachedStaticFilesRemovedFromMinifiedBuild(){return await hasCachedStaticFilesRemovedFromMinifiedBuild(this.__internal_getPHP())}async boot({scope:t,mounts:r=[],wpVersion:o=LatestMinifiedWordPressVersion,phpVersion:l="8.0",sapiName:d="cli",shouldInstallWordPress:p=!0}){if(this.booted)throw new Error("Playground already booted");if(this.booted=!0,this.scope=t,this.requestedWordPressVersion=o,o=MinifiedWordPressVersionsList.includes(o)?o:LatestMinifiedWordPressVersion,!SupportedPHPVersionsList.includes(l))throw new Error(`Unsupported PHP version: ${l}. Supported versions: ${SupportedPHPVersionsList.join(", ")}`);try{let c=null;if(p)if(this.requestedWordPressVersion.startsWith("http"))c=monitoredFetch(this.requestedWordPressVersion);else{const v=getWordPressModuleDetails(o);downloadMonitor.expectAssets({[v.url]:v.size}),c=monitoredFetch(v.url)}downloadMonitor.expectAssets({[url]:size});const m=downloadMonitor.monitorFetch(fetch(url)),_=p?{WP_DEBUG:!0,WP_DEBUG_LOG:!0,WP_DEBUG_DISPLAY:!1,AUTH_KEY:randomString(40),SECURE_AUTH_KEY:randomString(40),LOGGED_IN_KEY:randomString(40),NONCE_KEY:randomString(40),AUTH_SALT:randomString(40),SECURE_AUTH_SALT:randomString(40),LOGGED_IN_SALT:randomString(40),NONCE_SALT:randomString(40)}:{},y=this,w=new Set,x=await bootWordPress({siteUrl:setURLScope(wordPressSiteUrl,t).toString(),createPhpRuntime:async()=>{let v="";return await loadWebRuntime(l,{emscriptenOptions:{instantiateWasm(H,N){return memoizedFetch(v,{credentials:"same-origin"}).then(q=>WebAssembly.instantiateStreaming(q,H)).then(q=>{N(q.instance,q.module)}),{}}},onPhpLoaderModuleLoaded:H=>{v=H.dependencyFilename,downloadMonitor.expectAssets({[v]:H.dependenciesTotalSize})}})},wordPressZip:p?c.then(v=>v.blob()).then(v=>new File([v],"wp.zip")):void 0,sqliteIntegrationPluginZip:m.then(v=>v.blob()).then(v=>new File([v],"sqlite.zip")),spawnHandler:spawnHandlerFactory,sapiName:d,constants:_,hooks:{async beforeWordPressFiles(v){for(const H of r){const N=await directoryHandleFromMountDevice(H.device),q=await v.mount(H.mountpoint,createDirectoryHandleMountHandler(N,{initialSync:{direction:H.initialSyncDirection}}));y.unmounts[H.mountpoint]=q}}},createFiles:{"/internal/shared/mu-plugins":{"1-playground-web.php":playgroundWebMuPlugin,"playground-includes":{"wp_http_dummy.php":transportDummy,"wp_http_fetch.php":transportFetch}}},getFileNotFoundAction(v){return w.has(v)?{type:"response",response:new PHPResponse(404,{"x-backfill-from":["remote-host"],"x-file-type":["static"]},new TextEncoder().encode("404 File not found"))}:getFileNotFoundActionForWordPress(v)}});this.__internal_setRequestHandler(x);const b=await x.getPrimaryPhp();await this.setPrimaryPHP(b),this.loadedWordPressVersion=await getLoadedWordPressVersion(x),this.requestedWordPressVersion!==this.loadedWordPressVersion&&logger.warn(`Loaded WordPress version (${this.loadedWordPressVersion}) differs from requested version (${this.requestedWordPressVersion}).`);const B=wpVersionToStaticAssetsDirectory(this.loadedWordPressVersion),U=joinPaths(x.documentRoot,"wordpress-remote-asset-paths");if(B!==void 0&&!b.fileExists(U)){const v=new URL(joinPaths(B,"wordpress-remote-asset-paths"),wordPressSiteUrl);try{const H=await fetch(v).then(N=>N.text());b.writeFile(U,H)}catch{logger.warn(`Failed to fetch remote asset paths from ${v}`)}}b.isFile(U)&&b.readFileAsText(U).split(`
`).forEach(H=>w.add(joinPaths("/",H))),setApiReady()}catch(c){throw setAPIError(c),c}}async journalFSEvents(t,r){return journalFSEvents(this.__internal_getPHP(),t,r)}async replayFSJournal(t){return replayFSJournal(this.__internal_getPHP(),t)}}const[setApiReady,setAPIError]=exposeAPI(new PlaygroundWorkerEndpoint(downloadMonitor));
