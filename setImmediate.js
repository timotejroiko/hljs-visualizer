/*
Copyright (c) 2012 Barnesandnoble.com, llc, Donavon West, and Domenic Denicola

Permission is hereby granted, free of charge, to any person obtaining
a copy of this software and associated documentation files (the
"Software"), to deal in the Software without restriction, including
without limitation the rights to use, copy, modify, merge, publish,
distribute, sublicense, and/or sell copies of the Software, and to
permit persons to whom the Software is furnished to do so, subject to
the following conditions:

The above copyright notice and this permission notice shall be
included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
/*
Fork by
https://github.com/Katochimoto/setImmediate
*/

!function(e,t){"object"==typeof exports&&"undefined"!=typeof module?module.exports=t():"function"==typeof define&&define.amd?define(t):e.immediate=t()}(this,function(){"use strict";function e(e){var t=Array.prototype.slice.call(arguments,1),n=t.length;return n?1===n?function(){return e.call(void 0,t[0])}:2===n?function(){return e.call(void 0,t[0],t[1])}:3===n?function(){return e.call(void 0,t[0],t[1],t[2])}:function(){return e.apply(void 0,t)}:function(){return e.call(void 0)}}function t(t){return b[y]=e.apply(void 0,t),y++}function n(e){delete b[e]}function r(t){if(I)g.setTimeout(e(r,t),0);else{var i=b[t];if(i){I=!0;try{i()}finally{n(t),I=!1}}}}function i(){var n=function(){var n=t(arguments);return g.setTimeout(e(r,n),0),n};return n.usePolifill="setTimeout",n}function a(){return"setTimeout"in g}function o(){var n=function(){var n=t(arguments);return g.process.nextTick(e(r,n)),n};return n.usePolifill="nextTick",n}function u(){return"[object process]"===Object.prototype.toString.call(g.process)}function s(){var e="setImmediate$"+Math.random()+"$",n=function(t){t.source===g&&"string"==typeof t.data&&0===t.data.indexOf(e)&&r(Number(t.data.slice(e.length)))};g.addEventListener?g.addEventListener("message",n,!1):g.attachEvent("onmessage",n);var i=function(){var n=t(arguments);return g.postMessage(e+n,"*"),n};return i.usePolifill="postMessage",i}function c(){if(g.importScripts||!g.postMessage)return!1;if(g.navigator&&/Chrome/.test(g.navigator.userAgent))return!1;var e=!0,t=g.onmessage;return g.onmessage=function(){e=!1},g.postMessage("","*"),g.onmessage=t,e}function f(){var e=new g.MessageChannel;e.port1.onmessage=function(e){r(Number(e.data))};var n=function(){var n=t(arguments);return e.port2.postMessage(n),n};return n.usePolifill="messageChannel",n}function l(){return Boolean(g.MessageChannel)}function m(){var e=g.document.documentElement,n=function(){var n=t(arguments),i=g.document.createElement("script");return i.onreadystatechange=function(){r(n),i.onreadystatechange=null,e.removeChild(i),i=null},e.appendChild(i),n};return n.usePolifill="readyStateChange",n}function d(){return g.document&&"onreadystatechange"in g.document.createElement("script")}function v(){g.setImmediate!==U&&(g.setImmediate=U,g.msSetImmediate=U,g.clearImmediate=x,g.msClearImmediate=x)}function p(e,t){for(var n=0;n<e.length;n++){var r=e[n];if(r.canUse())return r.init()}return t.init()}var g=function(){return this||(0,eval)("this")}(),h=function(){return!(g.navigator&&/Trident|Edge/.test(g.navigator.userAgent))}(),y=1,I=!1,b={},C=Object.freeze({init:i,canUse:a}),j=Object.freeze({init:o,canUse:u}),M=Object.freeze({init:s,canUse:c}),E=Object.freeze({init:f,canUse:l}),O=Object.freeze({init:m,canUse:d}),T=[j,M,E,O],U=h?g.setImmediate||g.msSetImmediate||p(T,C):i(),x=h?g.clearImmediate||g.msClearImmediate||n:n;return{setImmediate:U,clearImmediate:x,polifill:v}});