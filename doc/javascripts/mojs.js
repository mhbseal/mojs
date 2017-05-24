/*!
 * mo.js v0.2.6
 * http://mhbseal.com/api/mojs.html
 * (c) 2014-2017 Mu Haibao
 */
!function(t,e){"object"==typeof exports&&"object"==typeof module?module.exports=e():"function"==typeof define&&define.amd?define([],e):"object"==typeof exports?exports.mo=e():t.mo=e()}(this,function(){return function(t){function e(r){if(n[r])return n[r].exports;var o=n[r]={exports:{},id:r,loaded:!1};return t[r].call(o.exports,o,o.exports,e),o.loaded=!0,o.exports}var n={};return e.m=t,e.c=n,e.p="",e(0)}([function(t,e,n){var r;r=function(){"use strict";return{AbstractStorage:n(1),AbstractStore:n(3),LocalStore:n(5),SessionStore:n(6),common:n(2),Cookie:n(7),date:n(9),es5:n(8),IdCard:n(11),objectPath:n(4),ParseUrl:n(12),pubSub:n(13),rules:n(14),util:n(10)}}.call(e,n,e,t),!(void 0!==r&&(t.exports=r))},function(t,e,n){var r,o;r=[n(2)],o=function(t){"use strict";function e(t,e,n,r){for(var o=t.getItem(e),i=JSON.parse(o)||[],u=!0,s=0,a={key:n,timeout:r};s<i.length;s++)i[s].key===n&&(i[s]=a,u=!1);u&&i.push(a),t.setItem(e,JSON.stringify(i))}function n(t,e,n){var r,o,i,u,s=0;if(r=t.getItem(e)){for(o=JSON.parse(r),null==n&&(n=5),o.sort(function(t,e){return t.timeout-e.timeout}),i=o.splice(0,n),u=i.length;s<n;s++)t.removeItem(i[s].key);o.length?t.setItem(e,JSON.stringify(o)):t.removeItem(e)}else t.clear()}function r(t,e,n,r){var o={timeout:r};return null!=t&&(o.value=t),null!=e&&(o.oldValue=e),null!=n&&(o.tag=n),o}var o=t.baseClass(function(e){this.options=t.extend({storage:null,timeMapKey:"CACHE_TIME_MAP"},e)},{set:function(t,o,i,u,s){var a,c,l=+new Date,f=this.options.storage;null==u&&(u=l+864e5),null!=i&&this.getTag(t)!==i||(a=this.get(t,i,!s)),s?(c=o,o=a):c=a;try{return f.setItem(t,JSON.stringify(r(o,c,i,u))),e(f,this.options.timeMapKey,t,u),!0}catch(e){return"QuotaExceededError"===e.name&&(n(f,this.options.timeMapKey),this.set(t,o,i,u,s)),!1}},get:function(t,e,n){var r=this.options.storage.getItem(t),o=null;return r&&(r=JSON.parse(r),r.timeout>=+new Date&&(null==e||e&&e===r.tag)&&(o=n?r.oldValue:r.value)),o},getTag:function(t){var e=this.options.storage.getItem(t);return e?JSON.parse(e).tag:null},setExpireTime:function(t,e){var n=this.options.storage.getItem(t);return!!n&&(n=JSON.parse(n),this.set(t,n.value,n.tag,e))},getExpireTime:function(t){var e=this.options.storage.getItem(t);return e?JSON.parse(e).timeout:null},remove:function(t){return this.options.storage.removeItem(t)},clear:function(){return this.options.storage.clear()},gc:function(){var t,e,n,r,o,i=this.options.timeMapKey,u=this.options.storage,s=0,a=[];if(t=u.getItem(i)){for(e=JSON.parse(t),n=e.length;s<n;s++)o=e[s],r=o.key,"GUID"===r||this.get(r)||this.get(r,null,!0)?a.push(o):this.remove(r);a.length?u.setItem(i,JSON.stringify(a)):u.removeItem(i)}}});return o}.apply(e,r),!(void 0!==o&&(t.exports=o))},function(t,e,n){var r;r=function(){"use strict";function t(t){return"object"==typeof t||"function"==typeof t?n[c.call(t)]:typeof t}var e={},n={},r=function(){},o=Array.prototype,i=String.prototype,u=Object.prototype,s=i.trim,a=Object.keys,c=u.toString,l=u.hasOwnProperty,f=Object.create,p=o.isArray,h=/[^,| ]+/g,d=!{toString:null}.propertyIsEnumerable("toString"),g=["toString","toLocaleString","valueOf","hasOwnProperty","isPrototypeOf","propertyIsEnumerable","constructor"];return"Boolean Number String Function Date RegExp Object Array".replace(h,function(r){var o=r.toLowerCase();n["[object "+r+"]"]=o,e["is"+r]=function(e){return t(e)===o}}),e.has=function(t,e){return l.call(t,e)},e.forIn=function(t,n,r){for(var o in t)if(n.call(r,t[o],o,t)===!1)return;if(d)for(var i=0,u=g.length;i<u;i++)if(e.has(t,g[i])&&n.call(r,t[g[i]],g[i],t)===!1)return},e.extend=function(){var e,n,r,o,i,u,s,a=1,c=arguments,l=c.length,f=c[0];for(r="boolean"==typeof f,r&&(a++,f=c[1]),a===l&&(f=this,a--);a<l;a++)n=arguments[a],null!=n&&this.forIn(n,function(a,c){return e=f[c],f!==a&&void(r&&(i=a&&t(a))&&("object"===i&&this.has(n,c)||(s="array"===i))?(o=e&&t(e),s?(s=!1,u="array"===o?e:[]):u="object"===o?e:{},f[c]=this.extend(r,u,a)):void 0!==a&&(f[c]=a))},this);return f},e.extend({type:function(e){return null==e?e+"":t(e)},isArray:p||function(e){return"array"===t(e)},isArraylike:function(t){var e=t.length,n=this.type(t);return!!e||"array"===n||"number"==typeof e&&e>0&&e-1 in t||0===e},isNaN:function(t){return void 0!==t&&isNaN(t)},size:function(t){return null==t?0:this.isArraylike(t)?t.length:this.keys(t).length},trim:function(t){return s?s.call(t):void t.replace(/^[\s\uFEFF\xA0]+|[\s\uFEFF\xA0]+$/g,"")},keys:function(t){var e;return a?a(t):(e=[],this.forIn(t,function(n,r){this.has(t,r)&&e.push(r)}),e)},now:Date.now||function(){return+new Date},log:function(){window.console&&Function.apply.call(console.log,console,arguments)},baseCreate:function(t){if(!this.isObject(t))return{};if(f)return f(t);r.prototype=t;var e=new r;return r.prototype=null,e},baseClass:function(t,n,r){var o,i,u="object"!=typeof arguments[1];return u&&(r=n),i=null!=r,o=function(){arguments.length?(i&&r.apply(this,arguments),t.apply(this,arguments)):(i&&r.call(this),t.call(this))},i&&(o.superCtor=r,o.prototype=e.baseCreate(r.prototype),o.prototype.constructor=o),e.forIn(n,function(t,e){o.prototype[e]=t}),o}}),e}.call(e,n,e,t),!(void 0!==r&&(t.exports=r))},function(t,e,n){var r,o;r=[n(2),n(4)],o=function(t,e){"use strict";function n(t){var e,n=t.charAt(t.length-1),r=parseInt(t);switch(n="number"==typeof n?"D":n.toUpperCase()){case"H":e=60*r*60*1e3;break;case"M":e=60*r*1e3;break;case"S":e=1e3*r;break;default:e=24*r*60*60*1e3}return e}var r=t.baseClass(function(e){this.options=t.extend({proxy:null,key:null,lifeTime:"1H",rollbackEnabled:!1},e)},{set:function(t,e,r){if(!this.options.rollbackEnabled&&r)throw"param rollbackEnabled is false";var o=+new Date+n(this.options.lifeTime);return this.options.proxy.set(this.options.key,t,e,o,r)},setAttr:function(t,n,r,o){if(!this.options.rollbackEnabled&&o)throw"param rollbackEnabled is false";var i,u;{if("object"!=typeof t)return u=this.get(r,o)||{},e.set(u,t,n),this.set(u,r,o);for(i in t)t.hasOwnProperty(i)&&this.setAttr(i,t[i],r,o)}},get:function(t,e){return this.options.proxy.get(this.options.key,t,e)},getAttr:function(t,n,r){return e.get(this.get(n,r),t)},getTag:function(){return this.options.proxy.getTag(this.options.key)},remove:function(){return this.options.proxy.remove(this.options.key)},setExpireTime:function(t){return this.options.proxy.setExpireTime(this.options.key,t)},getExpireTime:function(){return this.options.proxy.getExpireTime(this.options.key)},rollback:function(t){var e=this.getTag();if(!this.options.rollbackEnabled)throw"param rollbackEnabled is false";if(this.set(this.get(null,!0),e))return t&&this.set(null,e,!0),!0}});return r}.apply(e,r),!(void 0!==o&&(t.exports=o))},function(t,e,n){var r;r=function(){"use strict";var t={set:function(t,e,n){if(!t||!e)return!1;for(var r=e.split("."),o=0,i=r.length;o<i-1;){var u=r[o];if(null==t[u]&&(t[u]={}),"object"!=typeof t[u])return!1;t=t[u],o++}return null!=n?t[r[o]]=n:delete t[r[o]],!0},get:function(t,e){if(!t||!e)return null;for(var n=e.split("."),r=0,o=n.length;r<o;)if(null==(t=t[n[r++]]))return null;return t}};return t}.call(e,n,e,t),!(void 0!==r&&(t.exports=r))},function(t,e,n){var r,o;r=[n(2),n(3),n(1)],o=function(t,e,n){"use strict";var r=t.baseClass(function(e){t.extend(this.options,e,{proxy:new n({storage:window.localStorage})})},e);return r}.apply(e,r),!(void 0!==o&&(t.exports=o))},function(t,e,n){var r,o;r=[n(2),n(3),n(1)],o=function(t,e,n){"use strict";var r=t.baseClass(function(e){t.extend(this.options,e,{proxy:new n({storage:window.sessionStorage})})},e);return r}.apply(e,r),!(void 0!==o&&(t.exports=o))},function(t,e,n){var r,o;r=[n(2),n(8)],o=function(t,e){"use strict";function n(t,e){return e?t:encodeURIComponent(t)}function r(t,e){return e?t:decodeURIComponent(t)}function o(t,e){return n(e?JSON.stringify(t):String(t))}function i(t,e){return e?JSON.parse(r(t)):r(t)}function u(e){this.options=t.extend({isRaw:!1,isJson:!1},e)}return u.prototype.set=function(t,e,r){var r=r||{},i=new Date;r.expires&&i.setTime(+i+864e5*+r.expires),document.cookie=[n(t,this.options.isRaw),"=",o(e,this.options.isJson),r.expires?"; expires="+i:"",r.path?"; path="+r.path:"",r.domain?"; domain="+r.domain:"",r.secure?"; secure":""].join("")},u.prototype.get=function(t){var n=document.cookie,o=n?n.split("; "):[],u="";return e.each(o,function(e){var n=e.split("="),o=r(n[0],this.options.isRaw);if(t===o)return u=i(n[1],this.options.isJson),!1},this),u},u.prototype.remove=function(t){this.set(t,"",{expires:-1})},u}.apply(e,r),!(void 0!==o&&(t.exports=o))},function(t,e,n){var r,o;r=[n(2)],o=function(t){"use strict";function e(t){return function(e,n,r,o){var i=e.length,u=t>0?0:i-1;for(arguments.length<3&&(r=e[u],u+=t);u>=0&&u<i;u+=t)r=n.call(o,r,e[u],u,e);return r}}var n={},r=Array.prototype,o=Function.prototype,i=r.slice,u=o.bind;return n={each:function(e,n,r){var o=0,i=e.length;if(t.isArraylike(e))for(;o<i&&n.call(r,e[o],o,e)!==!1;o++);else t.forIn(e,function(o,i){if(t.has(e,i)&&n.call(r,o,i,e)===!1)return!1})},map:function(t,e,n){var r=[];return this.each(t,function(t,o,i){r.push(e.call(n,t,o,i))}),r},filter:function(t,e,n){var r=[];return this.each(t,function(t,o,i){e.call(n,t,o,i)&&r.push(t)}),r},some:function(t,e,n){var r=!1;return this.each(t,function(t,o,i){if(e.call(n,t,o,i)===!0)return r=!0,!1}),r},every:function(t,e,n){var r=!0;return this.each(t,function(t,o,i){if(e.call(n,t,o,i)!==!0)return r=!1}),r},indexOf:function(e,n,r){var o=0,i=e.length;if("number"==typeof r&&(o=r<0?Math.max(0,i+r):r),n!==n){for(;o<i;o++)if(t.isNaN(e[o]))return o}else for(;o<i;o++)if(e[o]===n)return o;return-1},lastIndexOf:function(e,n,r){var o=e?e.length:0;if("number"==typeof r&&(o=r<0?o+r+1:Math.min(o,r+1)),n!==n){for(;--o>=0;)if(t.isNaN(e[o]))return o}else for(;--o>=0;)if(e[o]===n)return o;return-1},bind:function(e,n){if(u)return u.apply(e,i.call(arguments,1));if(!t.isFunction(e))throw new TypeError("Bind must be called on a function");var r=i.call(arguments,2),o=function(r,o){var i=t.baseCreate(e.prototype),u=e.apply(e instanceof r?i:n,o);return t.isObject(u)?u:i},s=function(){return o(s,r.concat(i.call(arguments)))};return s},reduce:e(1),reduceRight:e(-1)}}.apply(e,r),!(void 0!==o&&(t.exports=o))},function(t,e,n){var r,o;r=[n(10)],o=function(t){"use strict";function e(e,n,r,o){return r=r||0,function(){var i=this["get"+e]();return(r>0||i>-r)&&(i+=r),0===i&&r==-12&&(i=12),t.pad(i,n,0,!1,o)}}function n(t){return function(){var e=this.getDay();return p.day[t].split(",")[e]}}function r(t){return function(){var e=p.ampm[t].split(",");return this.getHours()<12?e[0]:e[1]}}function o(){return Math.ceil((this.getMonth()+1)/3)}function i(e){return function(){for(var n=[31,28,31,30,31,30,31,31,30,31,30,31],r=this.getFullYear(),o=this.getMonth(),i=this.getDate(),u=0,s=0;s<o;s++)u+=n[s];return u+=i,(o>1&&r%4===0&&r%100!==0||r%400===0)&&(u+=1),t.pad(u,e,0)}}function u(e,n){return function(){var r=s(this,e),o=a(this,e),i=+o-+r,u=1+Math.round(i/6048e5);return t.pad(u,n,0)}}function s(t,e){var n=t.getFullYear(),r=new Date(n,0,1).getDay(),o=e-r;return o>0&&(o-=7),new Date(n,0,1+o)}function a(t,e){var n=e-t.getDay();return n>0&&(n-=7),new Date(t.getFullYear(),t.getMonth(),t.getDate()+n)}function c(t){var e,n;if("string"==typeof t)f.test(t)?n=new Date(t):(e=t.match(l),n=e.length<3?new Date(+e[0]):new Date(e[0],e[1]-1,e[2]||1,e[3]||0,e[4]||0,e[5]||0,e[6]||0));else if("number"==typeof t||"[object Date]"===Object.prototype.toString.call(t))n=new Date(+t);else{if(null!=t)return!1;n=new Date}return n}var l=/\d+/g,f=/^\d+$/,p={ampm:["AM,PM","am,am","上午,下午"],day:["周日,周一,周二,周三,周四,周五,周六","星期日,星期一,星期二,星期三,星期四,星期五,星期六"]},h=/(\\?)([MQDdwYAaHhmsS]+)/g,d={M:e("Month",null,1),MM:e("Month",2,1),Q:o,D:e("Date"),DD:e("Date",2),DDD:i(),DDDD:i(3),d:e("Day"),ddd:n(0),dddd:n(1),YY:e("FullYear",2,null,!0),YYYY:e("FullYear"),w:u(0),ww:u(0,2),A:r(0),a:r(1),aa:r(2),H:e("Hours"),HH:e("Hours",2),h:e("Hours",null,-12),hh:e("Hours",2,-12),m:e("Minutes"),mm:e("Minutes",2),s:e("Seconds"),ss:e("Seconds",2),S:e("Milliseconds"),SS:e("Milliseconds",2),SSS:e("Milliseconds",3)},g={get:function(t){return c(t)},format:function(t,e){if(1===arguments.length&&(e=t,t=null),t=c(t))return e.replace(h,function(e,n,r){return n?r:d[r].call(t)})}},y=function(t){g[t]=function(e,n,r){return 2===arguments.length&&(r=n,n=e,e=null),e=c(e),"sub"===t&&(r=-r),e["set"+n](e["get"+n]()+r),e}};return y("add"),y("sub"),g}.apply(e,r),!(void 0!==o&&(t.exports=o))},function(t,e,n){var r;r=function(){"use strict";function t(){return(65536*(1+Math.random())|0).toString(16).substring(1)}var e={guid:function(){return t()+t()+"-"+t()+"-"+t()+"-"+t()+"-"+t()+t()+t()},getByteInfo:function(t,e){for(var n=0,r=t.length,o={length:0};n<r;n++)t.charCodeAt(n)>255?o.length+=2:o.length+=1,void 0!==e&&void 0===o.index&&o.length>e&&(o.index=n);return o},pad:function(t,e,n,r,o){return t+="",!e||!o&&t.length>=e?t:(null==n&&(n=""),n=new Array(e+1).join(n),t=r?(t+n).substring(0,e):(n+t).substr(-e))}};return e}.call(e,n,e,t),!(void 0!==r&&(t.exports=r))},function(t,e,n){var r;r=function(){"use strict";function t(t){this.num=t}var e=[7,9,10,5,8,4,2,1,6,3,7,9,10,5,8,4,2,1],n=[1,0,"X",9,8,7,6,5,4,3,2];return t.prototype.checkCode=function(){var t=this.num;if(18===t.length){for(var r=0,o=0;o<17;o++)r+=e[o]*t[o];if(t[17].toUpperCase()!==String(n[r%11]))return!1}return!0},t.prototype.checkBirth=function(){var t=this.getBirth(),e=new Date(t.year,t.month-1,t.day),n=e.getFullYear(),r=e.getMonth()+1,o=e.getDate(),i=new Date;return!(+t.year!==n||+t.month!==r||+t.day!==o||e>i)},t.prototype.getBirth=function(){var t=this.num;return 15===t.length&&(t=t.slice(0,6)+"19"+t.slice(6,16)),{year:t.slice(6,10),month:t.slice(10,12),day:t.slice(12,14)}},t.prototype.getSex=function(){var t,e=this.num;return t=18===e.length?e.substr(-2,1)%2:e.substr(-1,1)%2,t?"男":"女"},t}.call(e,n,e,t),!(void 0!==r&&(t.exports=r))},function(t,e,n){var r;r=function(){"use strict";function t(t){t||(t=window.location.href);for(var r,o=n.exec(t),i=this.result={Attr:{},Param:{}},u=14;u--;)i.Attr[e[u]]=o[u]||"";(r=i.Attr.query)&&r.replace(/(?:^|&)([^&=]*)=?([^&]*)/g,function(t,e,n){e&&(i.Param[e]=n)})}var e=["source","protocol","authority","userInfo","user","password","host","port","relative","path","directory","file","query","anchor"],n=/^(?:(?![^:@]+:[^:@\/]*@)([^:\/?#.]+):)?(?:\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?([^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/;return t.prototype.getAttr=function(t){var e=this.result.Attr;return t?e[t]:e},t.prototype.getParam=function(t){var e=this.result.Param;return t?e[t]:e},t}.call(e,n,e,t),!(void 0!==r&&(t.exports=r))},function(t,e,n){var r,o;r=[n(8),n(4)],o=function(t,e){"use strict";function n(r,o,i){var u=e.get(r,o);u&&t.each(u,function(t,e){~e.indexOf("id_")?t.handler.call(t.context,i):n(u,e,i)},this)}var r={},o=0,i={publish:function(t,e){n(r,t,e)},subscribe:function(t,n,i){var u=e.get(r,t);null==u&&e.set(r,t,u={}),u["id_"+o++]={handler:n,context:i}},unsubscribe:function(n,o){var i=e.get(r,n),u={};i&&(o?t.each(i,function(t,e){if(t.handler===o)return delete i[e],!1}):(t.each(i,function(t,e){~e.indexOf("id_")||(u[e]=t)}),e.set(r,n,u)))},clear:function(t){t?e.set(r,t,null):r={}}};return i}.apply(e,r),!(void 0!==o&&(t.exports=o))},function(t,e,n){var r;r=function(){"use strict";var t={isRequired:function(t){return""!==t},isChinese:function(t){return/^[\u4e00-\u9fa5]+$/.test(t)},isDoubleByte:function(t){return/[^\x00-\xff]/.test(t)},isZipcode:function(t){return/^\d{6}$/.test(t)},isQq:function(t){return/^[1-9]\d{4,9}$/.test(t)},isPicture:function(t){return/\.(jpg|bmp|gif|ico|pcx|jpeg|tif|png|raw|tga)$/.test(t)},isRar:function(t){return/\.(rar|zip|7zip|tgz|)$/.test(t)},isMobile:function(t){return/^1[34578]\d{9}$/.test(t)},isMoney:function(t){return/^([1-9]\d*(\.\d{1,2})?|0\.\d{1,2})$/.test(t)},isEnglish:function(t){return/^[A-Za-z]+$/.test(t)},isLowerCase:function(t){return/^[a-z]+$/.test(t)},isUpperCase:function(t){return/^[A-Z]+$/.test(t)},isNumber:function(t){return/^\d+$/.test(t)},isInteger:function(t){return/^-?[1-9]\d*$/.test(t)},isFloat:function(t){return/^-?([1-9]\d*|0)\.\d+$/.test(t)},isRealName:function(t){return/^[a-zA-Z\u4e00-\u9fa5]+$/.test(t)},isEmail:function(t){return/^\w+((-\w+)|(\.\w+))*\@[A-Za-z0-9]+((\.|-)[A-Za-z0-9]+)*\.[A-Za-z0-9]+$/.test(t)},isUrl:function(t){return/^(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/.test(t)},isIdCard:function(t){return/^(\d{15}|\d{17}[0-9a-zA-Z])$/.test(t)},isPhone:function(t){return/^(\d{3,4}-)\d{7,8}(-\d{1,6})?$/.test(t)},isAreaNum:function(t){return/^\d{3,4}$/.test(t)},isHostNum:function(t){return/^\d{7,8}$/.test(t)},isExtensionNum:function(t){return/^\d{1,6}$/.test(t)},isIp:function(t){return/^\d{1,3}\.\d{1,3}\.\d{1,3}\.\d{1,3}$/.test(t)}};return t}.call(e,n,e,t),!(void 0!==r&&(t.exports=r))}])});