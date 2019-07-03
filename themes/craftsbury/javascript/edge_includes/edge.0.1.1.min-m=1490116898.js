//Copyright (c) 2011. Adobe Systems Incorporated.
// All rights reserved.
//
// Redistribution and use in source and binary forms, with or without
// modification, are permitted provided that the following conditions are met:
//
//   * Redistributions of source code must retain the above copyright notice,
//     this list of conditions and the following disclaimer.
//   * Redistributions in binary form must reproduce the above copyright notice,
//     this list of conditions and the following disclaimer in the documentation
//     and/or other materials provided with the distribution.
//   * Neither the name of Adobe Systems Incorporated nor the names of its
//     contributors may be used to endorse or promote products derived from this
//     software without specific prior written permission.
//
// THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS"
// AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE
// IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE
// ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT OWNER OR CONTRIBUTORS BE
// LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR
// CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF
// SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
// INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN
// CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
// ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
// POSSIBILITY OF SUCH DAMAGE.
//
// AdobePatentID="B1316"
// AdobePatentID="B1318"
//
// edge.0.0.1.min.js - version 0.1.1
(function( $ ){
(function(m){if(typeof m.Edge==="undefined")m.Edge={};var d=m.Edge;d.version="0.1.1";d.cloneJSONObject=function(n){var l,c;if(m.isArray(n)){l=[];var g,j=n.length;for(g=0;g<j;g++)c=n[g],l[g]=typeof c==="object"?d.cloneJSONObject(c):c}else for(g in l={},n)g!="prototype"&&(c=n[g],l[g]=typeof c==="object"?d.cloneJSONObject(c):c);return l};d.Notifier=function(){this.observers=[];this.notificationLevel=this.suppressNotifications=0};m.extend(d.Notifier.prototype,{addObserver:function(d){if(d){for(var l=
this.observers.length,c=0;c<l;c++)if(this.observers[c].observer==d)return;this.observers[l]={observer:d}}},removeObserver:function(d){if(d)for(var l=0;l<this.observers.length;l++)if(this.observers[l].observer==d)if(this.notificationLevel===0){this.observers.splice(l,1);break}else this.observers[l].deleted=!0},notifyObservers:function(d,l){if(d&&!this.suppressNotifications){l||(l={});l.methodName=d;this.notificationLevel++;var c;for(c=0;c<this.observers.length;c++){var g=this.observers[c];if(g=g&&
!g.deleted?g.observer:void 0)if(typeof g=="function")g(d,this,l);else if(g[d])g[d](this,l)}this.notificationLevel--;if(this.notificationLevel===0)for(c=this.observers.length-1;c>=0;c--)this.observers[c].deleted&&this.observers.splice(c,1)}},enableNotifications:function(){if(--this.suppressNotifications<0)this.suppressNotifications=0,d.Debug.reportError("Unbalanced enableNotifications() call!\n")},disableNotifications:function(){++this.suppressNotifications}});d.trimString=function(d){return d.replace(/^\s+|\s+$/g,
"")}})(jQuery);(function(m,d){function n(){d.Notifier.call(this);this.animationID="animID-"+n.nextID++}function l(a,b,c){d.Animation.call(this);if(typeof a=="function")this.handler=a;else if(typeof a=="string")this.eventType=a;this.handlerContext=c;this.data=b}function c(a,b,o,k){d.Notifier.call(this);this.animation=a;this.position=0;this.duration=-1;this.easing=typeof k=="function"?k:k&&m.easing[k]?k:c.defaultEasing;if(b!==void 0)this.position=b;if(o!==void 0)this.duration=o;this.timeline=null;this.dScale=1;this.dDuration=
0;this.done=!1}function g(a){this.parameters={};a&&m.extend(this,a)}function j(a){d.Animation.call(this);m.extend(this,d.Timeline.config);m.extend(this,a);this.duration=this.currentPosition=this.startPosition=this.timerStart=this.timer=0;this.interval=1E3/this.fps;this.objects=[]}var i={};n.nextID=1;m.extend(n.prototype,d.Notifier.prototype,{constructor:n,_setup:function(){},_update:function(){},getDuration:function(){return 0}});m.extend(l.prototype,n.prototype,{constructor:l,_update:function(a){this.done||
(this.handler?this.handler.call(this.handlerContext,a,this.data):this.eventType&&this.timeline&&this.timeline.notifyObservers(this.eventType,{elapsed:a,data:this.data}));this.done=!0},_setup:function(a){this.timeline=a;this.done=!1}});c.defaultEasing="linear";m.extend(c.prototype,d.Notifier.prototype,{constructor:c,_setup:function(a,b){this.timeline=a;var c=this.duration,k=null;this.animation&&this.animation.getDuration&&(k=this.animation.getDuration());this.dScale=c!=-1&&c!==0?k/c:1;this.dDuration=
c!=-1?c:k;this.done=!1;this.animation&&this.animation.setup&&this.animation.setup(a,b)},_update:function(a,b){if(!this.done){var c=a,k=this.dDuration;if(this.animation){var g;k===0?g=c>=0?1:0:(c>=k&&(c=k),c<=0&&(c=0),g=m.easing[this.easing](c/k,c,0,1,k));this.animation.update(c*this.dScale,g,b)}(b.playDirection=="reverse"?c<=0:c>=k)&&this.complete()}},complete:function(){this.done=!0;this.timeline&&this.timeline._updateComplete(this)},getPosition:function(){return this.position},setPosition:function(a){this.position=
a},getDuration:function(){return this.duration!=-1?this.duration:this.animation&&this.animation.getDuration?this.animation.getDuration():0},setDuration:function(a){this.duration=a>=0?a:-1}});j.config={dropFrames:!0,fps:60};var r=[];j.tick=function(){var a=r.slice(0);r=[];for(var b=a.length,c=0;c<b;c++)a[c].call()};m.extend(j.prototype,n.prototype,{constructor:j,play:function(a){this.notifyObservers("onPlay");var b=new g(a);b.timeline=this;this._setup(this,a);this.timerStart=(new Date).getTime();this.startPosition=
this.currentPosition;var c=this,k=function(){c._handleTimer(b,k)};this._handleTimer(b,k)},stop:function(){this.notifyObservers("onStop");this.timer&&clearTimeout(this.timer);this.timerStart=this.timer=0},seek:function(a,b){this.notifyObservers("onSeek");this.stop();var c=this.currentPosition;this.currentPosition=a;var k=new g(b);k.timeline=this;this._setup(this,b);this._updateSeek(this.currentPosition,1,k,c)},add:function(a,b,g,k){this.objects.push(new c(a,b,g,k));this.objects.sort(function(a,b){return a.position-
b.position})},getDuration:function(){for(var a=0,b=this.objects,c=this.objects.length,k=Math.max,g=0;g<c;g++)var d=b[g],a=k(a,d.position+d.getDuration());return a},currentPosition:function(){return this.currentPosition},_update:function(a,b,c){this.notifyObservers("onPreUpdate",{elapsed:a,easingConst:b});for(var k=this.objects,g=k.length,d=c.playDirection!="reverse",j=0;j<g;j++){var i=k[d?j:g-j-1];if(d?a>=i.position:a<=i.position+i.duration)i.animation.isTrigger?i.animation.fire():i._update(a-i.position,
c)}this.notifyObservers("onUpdate",{elapsed:a,easingConst:b});this.notifyObservers("onPostUpdate",{elapsed:a,easingConst:b,context:c})},_handleTimer:function(a,b){var c=(new Date).getTime()-this.timerStart,k=a.playDirection=="reverse",g=this.startPosition+(k?-c:c);this.currentPosition=g=Math.max(0,Math.min(g,this.duration));this._update(g,1,a);(!k?g<this.duration:g>0)?a.externalClock?r.push(b):this.timer=setTimeout(b,this.interval):(this.stop(),this.notifyObservers("onComplete",{elapsed:c}))},_setup:function(a,
b){d.Animation.prototype._setup.call(this,a);for(var c=this.objects,k=this.objects.length,g=0;g<k;g++){var j=c[g];j._done=!1;j._setup(this,b)}this.duration=this.getDuration()},_updateComplete:function(a){a._done=!0}});j.prototype._updateSeek=j.prototype._update;d.Animation=n;d.TimelineObject=c;d.Timeline=j;d.Timeline.createTimeline=function(a){return new d.Timeline(a)};d.Timeline.createTween=function(a){var b=i[a];if(b)return b.func.apply(b.context,Array.prototype.slice.call(arguments,1));return null};
d.Timeline.addTweenType=function(a,b,c){i[a]={func:b,context:c}};d.Timeline.createTrigger=function(a,b){return new l(a,b,arguments[arguments.length-1])};d.Timeline.createTimelineFromData=function(a){for(var b=jQuery.Edge.Timeline.createTimeline(),c=a.length,k=0;k<c;k++){var g=a[k],j=null;g.timeline?j=d.Timeline.createTimelineFromData(g.timeline):g.tween?j=d.Timeline.createTween.apply(null,g.tween):g.trigger&&(j=g.trigger.slice(0,2),j.push(this),j=d.Timeline.createTrigger.apply(null,j));j&&b.add(j,
g.position,g.duration,g.easing)}return b}})(jQuery,jQuery.Edge);(function(m,d){function n(c,g,j,i,m){d.Animation.call(this);this.name="prop tween";this.sourceElements=this.elements=g;this.deferElementResolution=!0;this.tweenType=l[c];this.updateTriggered=!1;this.property=j;this.fromValue=void 0;this.toValue=i;this.duration=1E3;this.fromValues=this.tokens=this.valueTemplate=null;m&&$.extend(this,m);this.deferElementResolution=this.deferElementResolution||typeof g=="string"&&g.search(/\$\{[^\{\}]+\}/)!=-1;if(!this.deferElementResolution)this.elements=this.resolveElementSelector(g);
var m=this.toValues=[],a=this.parseValue(i);$.isArray(i)||(i=[i]);if(!a||a.length===0)a=i;g=a.length;for(c=0;c<g;c++){var j=a[c],b={};typeof j=="string"?(b.value=parseFloat(j.replace(/[a-zA-Z%]+$/,"")),b.unit=j.replace(/^-?[0-9]*(\.[0-9]+)?/,"")):(typeof j=="number"&&(j=parseFloat(j)),b.value=j,b.unit="");m.push(b)}i.length>1&&!this.valueTemplate&&alert("Multiple values specified for attribute tween, but no template was provided!");i.length>1&&(!this.fromValue||!$.isArray(this.fromValue))&&alert("Multiple values specified for attribute tween, but no from values specified!");
if(this.fromValue){i=this.fromValues=[];if((c=this.parseValue(this.fromValue))&&c.length>0)this.fromValue=c;else if(!$.isArray(this.fromValue))this.fromValue=[this.fromValue];g=this.fromValue.length;for(c=0;c<g;c++)j=this.fromValue[c],typeof j=="string"?i[c]=parseFloat(j.replace(/[a-zA-Z%]+$/,"")):(typeof j=="number"&&(j=parseFloat(j)),i[c]=j);this.toValues.length!=this.fromValues.length&&alert("Number of 'from' and 'to' values does not match for "+this.tweenType+" tween.")}if(this.filter){if(!$.isArray(this.filter))this.filter=
[this.filter];i=this.filter;g=i.length;for(c=0;c<g;c++)typeof i[c]=="string"&&(i[c]=Math[i[c]]),typeof i[c]!="function"&&(i[c]=null)}if(this.valueTemplate)this.tokens=this.parseTemplate(this.valueTemplate)}var l={style:0,attribute:1,property:2};n.Token=function(c,g){this.value=c;this.isPlaceholder=g};n.substituteParameters=function(c,g){for(var j=c;g&&typeof j=="string"&&j.search(/\$\{/)!=-1;){var i=j.search(/\$\{/),l=j.search(/\}/);(i=j.slice(i+2,l))||alert("Invalid parameter name: "+i);typeof i==
"string"&&(i=d.trimString(i),i=i.replace(/[\"\']/g,""));j=j.replace(/\$\{[^\}]*\}/,g[i]);typeof j=="undefined"&&alert("Animation parameter ${"+i+"} is undefined!")}return j};$.extend(n.prototype,d.Animation.prototype,{constructor:n,setup:function(){this.updateTriggered=!1},update:function(c,g,d){var i=this.getElementSet(d);if(!this.updateTriggered)this.updateTriggered=!0,this.setupForAnimation(d);var l=this,a=this.tweenType,b=this.property,o;i.each(function(){var k=l.getPropertyTweenData(this,a,b);
if(k.animationID==l.animationID){var d=k.fromValues,j=k.toValues,k=k.tokens,i=l.filter,m=d.length,n=[];for(o=0;o<m;o++){var u=d[o],w=j[o];u+=(w.value-u)*g;i&&i[o]&&(u=i[o](u));n.push(u+w.unit)}d="";d=l.formatValue(n);if(!(d.length>0))if(k){d=k.length;j=[];for(o=0;o<d;o++)i=k[o],i.isPlaceholder?j.push(n[i.value]):j.push(i.value);d=j.join("")}else d=n.join("");l.setValue.call(this,a,b,d);l.notifyObservers("onUpdate",{elapsed:c,easingConst:g,property:b,value:d,element:this})}})},setValue:function(c,
g,d){switch(c){case 0:$(this).css(g,d);break;case 1:this.setAttribute(g,d);break;case 2:this[g]=d}},getDuration:function(){return this.duration},resolveElementSelector:function(c){c=n.substituteParameters(this.elements,c.parameters);if(!c)c=this.elements;return $(c)},getElementSet:function(c){var g=this.animationID;if(!c.animData)c.animData={};var d=c.animData[g];d||(d=c.animData[g]=this.deferElementResolution?this.resolveElementSelector(c):this.elements);return d},getValue:function(c,g){var d;switch(g){case 0:d=
$(this).css(c);break;case 1:d=this.getAttribute(c);break;case 2:d=this[c]+""}return d},setupForAnimation:function(c){var g=this,d=this.tweenType,i=this.property;this.getElementSet(c).each(function(){var c=g.getPropertyTweenData(this,d,i);c.animationID=g.animationID;c.toValues=g.toValues;c.tokens=g.tokens;if(g.fromValues)c.fromValues=g.fromValues;else{var a=g.getValue.call(this,i,d);a===void 0&&(a="0");var b=g.parseValue(a);if(b&&b.length>0)for(var c=c.fromValues=[],a=b.length,o=0;o<a;o++){var k=b[o];
c[o]=typeof k=="string"?parseFloat(k.replace(/[a-zA-Z%]+$/,"")):k}else c.fromValues=[parseFloat(a.replace(/[a-zA-Z%]+$/,""))]}})},parseTemplate:function(c){for(var d=c.length,j=[],i=0,l=/@@[0-9]+@@/g,a=null;i<d&&(a=l.exec(c));)a.index!=i&&j.push(new n.Token(c.substring(i,a.index),!1)),j.push(new n.Token(parseInt(a[0].replace(/@@/g,""),10),!0)),i=l.lastIndex;i<d&&j.push(new n.Token(c.substring(i,d),!1));return j},parseValue:function(){return[]},formatValue:function(){return""},getPropertyTweenData:function(c,
d,j){var i=$.data(c,"tweenData");i||(i={},$.data(c,"tweenData",i));(c=i[d])||(c=i[d]={});(d=c[j])||(d=c[j]={animationID:-1});return d}});d.PropertyTween=n;d.Timeline.addTweenType("style",function(c,d,j,i){return new n("style",c,d,j,i)});d.Timeline.addTweenType("attribute",function(c,d,j,i){return new n("attribute",c,d,j,i)});d.Timeline.addTweenType("property",function(c,d,j,i){return new n("property",c,d,j,i)})})(jQuery,jQuery.Edge);(function(m,d,n){function l(q,e,a,f,h){d.PropertyTween.call(this,q,e,a,f,h);this.name="transformTween"}var c,g,j=Math.asin,i=Math.sin,r=Math.cos,a=Math.tan,b=Math.atan2,o=Math.PI/180,k=180/Math.PI;l.removeData=function(q){var e=m.data(q,l.dataName);e&&(e.timeline&&c.unRegister(e.timeline,e.id),$ele.removeData(q,l.dataName))};var p=function(q){var e=0;typeof q=="string"?e=parseFloat(q.replace(/[a-zA-Z%]+$/,"")):typeof q=="number"&&(e=q);return e};l.applyTransform=function(q,e,a,f){var q=m(q),h="webkitAppearance"in
document.documentElement.style,b=!0;f&&(b=!f.dontForceZ);if(h){f="translate("+e.translateX+","+e.translateY+")";h=p(e.translateZ);if(h!==0||b)f+=" translateZ("+e.translateZ+")";f+=" rotate("+e.rotateZ+") ";h=p(e.rotateY);h!==0&&(f+=" rotateY("+e.rotateY+")");h=p(e.rotateX);h!==0&&(f+=" rotateX("+e.rotateX+")");f+=" skew("+e.skewX+","+e.skewY+") scale("+e.scaleX+","+e.scaleY+") ";h=p(e.scaleZ);h!=1&&(f+=" scaleZ("+e.scaleZ+")");e="-webkit-transform";q.css(e,f);a&&a.observers.length&&a.notifyObservers("onUpdate",
{elapsed:0,easingConst:0,property:e,value:f,element:q[0]})}else a=p(e.rotateY),f=p(e.rotateX),a=e.scaleX*r(o*a),b=e.scaleY*r(o*f),f="translate("+e.translateX+","+e.translateY+")",f+=" rotate("+e.rotateZ+")",f+=" skew("+e.skewX+", "+e.skewY+")",f+=" scale("+a+","+b+")",q.css("-moz-transform",f),q.css("-o-transform",f),q.css("-ms-transform",f),q.css("msTransform",f)};var t=function(a){if(a!==0&&Math.abs(a)<1.0E-6)return a.toFixed(6);return a.toString()};l.dataName="EdgeTransformData";var y=1;m.extend(l.prototype,
n.prototype,{constructor:l,setup:function(){this.updateTriggered=!1},setValue:function(a,e,b){m.data(this,l.dataName)[e]=b},getValue:function(){m.data(this,l.dataName)},setupForAnimation:function(a){var e=this;this.getElementSet(a).each(function(){var a=m.data(this,l.dataName);a||(a=e.buildTransformData(this),m.data(this,l.dataName,a))});n.prototype.setupForAnimation.call(this,a)},update:function(a,e,b){n.prototype.update.call(this,a,e,b);var f=this,h=this.property,d=this.tweenType;this.getElementSet(b).each(function(){if(f.getPropertyTweenData(this,
d,h).animationID==f.animationID){var a=m.data(this,l.dataName);a.timeline=b.timeline;a.tween=f;c.Register(b.timeline,a.id,a)}})},buildTransformData:function(a){var e=d.parseCanonicalTransform(a);if(e===null){var e={},b=d.getTransformProps(a);e.translateX="0px";e.translateY="0px";e.translateZ="0px";e.scaleX=1;e.scaleY=1;e.scaleZ=1;e.rotateX="0deg";e.rotateY="0deg";e.rotateZ="0deg";e.skewXZ=0;e.skewXY=0;e.skewYZ=0;e.skewX="0deg";e.skewY="0deg";e.matrix&&delete e.matrix;if(b)e.translateX=t(b.translation[0])+
"px",e.translateY=t(b.translation[1])+"px",e.translateZ=t(b.translation[2])+"px",e.scaleX=t(b.scale[0]),e.scaleY=t(b.scale[1]),e.scaleZ=t(b.scale[2]),e.rotateX=t(b.rotation[0]*k)+"deg",e.rotateY=t(b.rotation[1]*k)+"deg",e.rotateZ=t(b.rotation[2]*k)+"deg",e.skewXY=b.skew[0],e.skewXZ=b.skew[1],e.skewYZ=b.skew[2],e.skewX=t(Math.atan(b.skew[0])*k)+"deg"}e===null&&(e={});e.id="transform_"+y++;e.element=a;e.onFinalUpdate=c.prototype._applyTransform;return e}});var J={translate3d:0,translate:0,translateX:0,
translateY:0,translateZ:0,rotate:1,rotateZ:1,rotateX:1,rotateY:1,rotate3d:1,skew:2,skewX:2,skewY:2,scale3d:3,scale:3,scaleX:3,scaleY:3,scaleZ:3,perspective:4};d.getTransformProps=function(a,e){var b=typeof e=="string"?e:d.getTransform(a),f="webkitAppearance"in document.documentElement.style;if(b&&b!="none"&&f)f=new d.CSSMatrix,f.setMatrixValue(b),b=g.fromCSSMatrix(f);else if(b&&b!="none")b=g.fromCSSMatrixString(b);else return;return d.decomposeTransform(b)};d.getTransform=function(a){var e;"webkitAppearance"in
document.documentElement.style&&(e=m(a).css("-webkit-transform"));e||(e=m(a).css("-ms-transform"));e||(e=m(a).css("-moz-transform"));e||(e=m(a).css("-o-transform"));e||(e=m(a).css("transform"));return e};d.parseCanonicalTransform=function(a,e){var b=(typeof e=="string"?e:d.getTransform(a)).match(/(\w+\s*\([^\)]*\))/g);if(!b)return null;var f={},h={translateX:"0px",translateY:"0px",translateZ:"0px",scaleX:1,scaleY:1,scaleZ:1,rotateX:"0deg",rotateY:"0deg",rotateZ:"0deg",skewXZ:0,skewXY:0,skewYZ:0,skewX:"0deg",
skewY:"0deg"},c;for(c=0;c<b.length;c++){var k=b[c].match(/\w+/);if(f[k[0]]||J[k[0]]<0)return null;var g=b[c].match(/\([^\)]*\)/),g=g[0].replace(/[\(\)]/g,""),g=g.split(",");switch(k[0]){case "matrix":return null;case "translate3d":h.translateX=g[0];h.translateY=g.length>1?g[1]:"0px";h.translateZ=g.length>2?g[2]:"0px";f.translate3d=f.translate=f.translateX=f.translateY=f.translateZ=!0;break;case "translate":h.translateX=g[0];h.translateY=g.length>1?g[1]:"0px";f.translate3d=f.translate=f.translateX=
f.translateY=!0;break;case "translateX":h.translateX=g[0];f.translate3d=f.translate=f.translateX=!0;break;case "translateY":h.translateY=g[0];f.translate3d=f.translate=f.translateY=!0;break;case "translateZ":h.translateZ=g[0];f.translate3d=f.translateZ=!0;break;case "rotate3d":return f.rotate3d=f.rotate=f.rotateX=f.rotateY=f.rotateZ=!0,null;case "rotateX":h.rotateX=g[0];f.rotate3d=f.rotateX=!0;break;case "rotateY":h.rotateY=g[0];f.rotate3d=f.rotateY=!0;break;case "rotateZ":case "rotate":h.rotateZ=
g[0];f.rotate3d=f.rotate=f.rotateZ=!0;break;case "skew":h.skewX=g[0];h.skewY=g.length>1?g[1]:"0px";f.skew=f.skewX=f.skewY=!0;break;case "skewX":h.skewX=g[0];f.skew=f.skewX=!0;break;case "skewY":h.skewY=g[0];f.skew=f.skewY=!0;break;case "scale3d":h.scaleX=g[0];h.scaleY=g.length>1?g[1]:"0px";h.scaleZ=g.length>2?g[2]:"0px";f.scale3d=f.scale=f.scaleX=f.scaleY=f.scaleZ=!0;break;case "scale":h.scaleX=g[0];h.scaleY=g.length>1?g[1]:"0px";f.scale=f.scaleX=f.scaleY=!0;break;case "scaleX":h.scaleX=g[0];f.scale3d=
f.scale=f.scaleX=!0;break;case "scaleY":h.scaleY=g[0];f.scale3d=f.scale=f.scaleY=!0;break;case "scaleZ":h.scaleZ=g[0];f.scale3d=f.scaleZ=!0;break;case "perspective":f.perspective=!0}}return h};d.TransformTween=l;c=function(a){this.handlers={};this.timeline=a};c.Register=function(a,e,b){var f=a.updateFinalizer;if(typeof f=="undefined")f=new c(a),a.updateFinalizer=f,a.addObserver(f);f.handlers[e]=b};c.unRegister=function(a,e){var b=a.updateFinalizer;typeof b!="undefined"&&delete b.handlers[e]};m.extend(c.prototype,
{_finalizeUpdate:function(a,e){var b={elapsed:a,context:e},f;for(f in this.handlers)if(this.handlers.hasOwnProperty(f)){var h=this.handlers[f];if(h.onFinalUpdate)h.onFinalUpdate(b)}},onUpdate:function(a,e){this._finalizeUpdate(e.elapsed,e.context)},onComplete:function(){this.timeline&&this.timeline.removeObserver(this);this.timeline.updateFinalizer=void 0},_applyTransform:function(a){var e=m.data(this.element,l.dataName);l.applyTransform(this.element,e,e.tween,a.context)}});l.UpdateFinalizer=c;if(typeof CSSMatrix==
"undefined")if(typeof WebKitCSSMatrix!="undefined")d.CSSMatrix=WebKitCSSMatrix;else{if(typeof MozCSSMatrix!="undefined")d.CSSMatrix=MozCSSMatrix}else d.CSSMatrix=CSSMatrix;var x=function(a,e){for(var b=0,f=a.length,h=0;h<f;h++)b+=a[h]*e[h];return b},u=function(a){for(var e=0,b=a.length,f=0;f<b;f++)e+=a[f]*a[f];return Math.sqrt(e)},w=function(a){var e=a.length,b=u(a),f=Array(e);b===0&&(b=1);for(var h=0;h<e;h++)f[h]=a[h]/b;return f},I=function(a,e,b,f){var h=Array(3);h[0]=b*a[0]+f*e[0];h[1]=b*a[1]+
f*e[1];h[2]=b*a[2]+f*e[2];return h};g=function(a){var e,b;if(a)for(e=0;e<4;e++){this[e]=Array(4);for(b=0;b<4;b++)this[e][b]=a[e][b]}else for(e=0;e<4;e++){this[e]=Array(4);for(b=0;b<4;b++)this[e][b]=0;this[e][e]=1}this.size=4};g.fromCSSMatrix=function(a){var e=new g;e[0][0]=a.m11;e[0][1]=a.m12;e[0][2]=a.m13;e[0][3]=a.m14;e[1][0]=a.m21;e[1][1]=a.m22;e[1][2]=a.m23;e[1][3]=a.m24;e[2][0]=a.m31;e[2][1]=a.m32;e[2][2]=a.m33;e[2][3]=a.m34;e[3][0]=a.m41;e[3][1]=a.m42;e[3][2]=a.m43;e[3][3]=a.m44;return e};var s=
function(a){var e={};e.num=parseFloat(a);e.units=a.match(/\w+$/);if(typeof e.unit=="array")e.units=e.units[0];return e},v=function(a){a=a.toLowerCase();if(typeof a!="string")return 0;a=s(a);a.units=="deg"&&(a.num*=o);return a.num};g.fromCSSMatrixString=function(a){var e=new g,a=a.match(/(\w+\s*\([^\)]*\))/g);if(typeof a=="undefined"||a===null)return e;var b;for(b=0;b<a.length;b++){var f=a[b].match(/\w+/),h=a[b].match(/\([^\)]*\)/),h=h[0].replace(/[\(\)]/g,""),h=h.split(","),c,d;switch(f[0]){case "matrix":f=
new g;h.length==6&&(f[0][0]=parseFloat(h[0]),f[0][1]=parseFloat(h[1]),f[1][0]=parseFloat(h[2]),f[1][1]=parseFloat(h[3]),f[3][0]=parseFloat(h[4]),f[3][1]=parseFloat(h[5]),e.preMultiplyBy(f));break;case "translate3d":f=s(h[0]).num;c=h.length>1?s(h[1]).num:0;d=h.length>2?s(h[2]).num:0;e.translate3d(f,c,d);break;case "translate":f=s(h[0]).num;c=h.length>1?s(h[1]).num:0;e.translate3d(f,c,0);break;case "translateX":h=s(h[0]).num;e.translate3d(h,0,0);break;case "translateY":h=s(h[0]).num;e.translate3d(0,
h,0);break;case "translateZ":h=s(h[0]).num;e.translate3d(0,0,h);break;case "rotate3d":if(h.length>=3)f=s(h[0]).num,c=s(h[1]).num,d=s(h[2]).num,h=v(h[3]),e.rotate3d(f,c,d,h,!0);break;case "rotateX":h=v(h[0]);e.rotateX(h);break;case "rotateY":h=v(h[0]);e.rotateY(h);break;case "rotateZ":case "rotate":h=v(h[0]);e.rotateZ(h);break;case "skew":f=v(h[0]);h=v(h[1]);e.skew(f,h);break;case "skewX":h=v(h[0]);e.skew(h,0);break;case "skewY":h=v(h[0]);e.skew(0,h);break;case "scale3d":f=parseFloat(h[0]);c=h.length>
1?parseFloat(h[1]):1;h=h.length>2?parseFloat(h[2]):1;e.scale(f,c,h);break;case "scale":f=parseFloat(h[0]);c=h.length>1?parseFloat(h[1]):1;e.scale(f,c,0);break;case "scaleX":h=parseFloat(h[0]);e.scale(h,0,0);break;case "scaleY":h=parseFloat(h[0]);e.scale(0,h,0);break;case "scaleZ":h=parseFloat(h[0]);e.scale(0,0,h);break;case "perspective":h=parseFloat(h[0]),e.perspective(h)}}return e};m.extend(g.prototype,{identity:function(){for(var a=0;a<4;a++){this[a]=Array(4);for(var e=0;e<4;e++)this[a][e]=0;this[a][a]=
1}return this},determinant:function(){var a=this[0][0],e=this[0][1],b=this[0][2],f=this[0][3],h=this[1][0],c=this[1][1],d=this[1][2],g=this[1][3],k=this[2][0],j=this[2][1],i=this[2][2],o=this[2][3],l=this[3][0],m=this[3][1],n=this[3][2],p=this[3][3];return f*d*j*l-b*g*j*l-f*c*i*l+e*g*i*l+b*c*o*l-e*d*o*l-f*d*k*m+b*g*k*m+f*h*i*m-a*g*i*m-b*h*o*m+a*d*o*m+f*c*k*n-e*g*k*n-f*h*j*n+a*g*j*n+e*h*o*n-a*c*o*n-b*c*k*p+e*d*k*p+b*h*j*p-a*d*j*p-e*h*i*p+a*c*i*p},normalizeTransform:function(){if(this[3][3]===0)return!1;
for(var a=0;a<4;a++)for(var e=0;e<4;e++)this[a][e]/=this[3][3];return!0},transpose:function(){for(var a=new g,e=0;e<4;e++)for(var b=0;b<4;b++)a[e][b]=this[b][e];return a},toCSSMatrix:function(){var a=new d.CSSMatrix;a.m11=this[0][0];a.m12=this[0][1];a.m13=this[0][2];a.m14=this[0][3];a.m21=this[1][0];a.m22=this[1][1];a.m23=this[1][2];a.m24=this[1][3];a.m31=this[2][0];a.m32=this[2][1];a.m33=this[2][2];a.m34=this[2][3];a.m41=this[3][0];a.m42=this[3][1];a.m43=this[3][2];a.m44=this[3][3];return a},_inverse:function(){return this},
inverse:function(){if(d.CSSMatrix!==void 0){var a=this.toCSSMatrix().inverse();return g.fromCSSMatrix(a)}return this._inverse()},rotate3d:function(a,b,c,f,h){var g=new d.Matrix4x4;h||(f*=o);f&&(h=Math.sqrt(a*a+b*b+c*c),h!==0&&(a/=h,b/=h,c/=h,h=i(f),f=r(f),g[0][0]=1+(1-f)*(a*a-1),g[1][0]=-c*h+(1-f)*a*b,g[2][0]=b*h+(1-f)*a*c,g[3][0]=0,g[0][1]=c*h+(1-f)*a*b,g[1][1]=1+(1-f)*(b*b-1),g[2][1]=-a*h+(1-f)*b*c,g[3][1]=0,g[0][2]=-b*h+(1-f)*a*c,g[1][2]=a*h+(1-f)*b*c,g[2][2]=1+(1-f)*(c*c-1),g[3][2]=0,g[0][3]=
0,g[1][3]=0,g[2][3]=0,g[3][3]=1));return this.preMultiplyBy(g)},rotateX:function(a){return this.rotate3d(1,0,0,a)},rotateY:function(a){return this.rotate3d(0,1,0,a)},rotateZ:function(a){return this.rotate3d(0,0,1,a)},translate3d:function(a,b,c){this[3][0]+=a;this[3][1]+=b;this[3][2]+=c;return this},scale:function(a,b,c){if(a!=1||b!=1||c!=1){var f=new d.Matrix4x4;f[0][0]=a;f[1][1]=b;f[2][2]=c;return this.preMultiplyBy(f)}return this},skew:function(b,e,c){c||(b*=o,e*=o);b!==0&&(c=new d.Matrix4x4,c[1][0]=
a(b),this.preMultiplyBy(c));e!==0&&(b=new d.Matrix4x4,b[0][1]=a(e),this.preMultiplyBy(b));return this},perspective:function(a){if(a!==0){var b=new d.Matrix4x4;b[2][3]=1/a;this.preMultiplyBy(b)}return this},skewByFactors:function(a,b,c){a=new d.Matrix4x4;a[2][1]=c;this.preMultiplyBy(a);a.identity();a[2][0]=c;this.preMultiplyBy(a);a.identity();a[1][0]=c;this.preMultiplyBy(a);return this},applyPerspective:function(a,b,c,f){var h=new d.Matrix4x4;h[0][3]=a;h[1][3]=b;h[2][3]=c;h[3][3]=f;this.preMultiplyBy(h);
return this},preMultiplyBy:function(a){var b=a[0][0],c=a[0][1],f=a[0][2],h=a[0][3],g=a[1][0],d=a[1][1],k=a[1][2],j=a[1][3],i=a[2][0],o=a[2][1],l=a[2][2],m=a[2][3],n=a[3][0],p=a[3][1],t=a[3][2],a=a[3][3],r=this[0][0],s=this[0][1],y=this[0][2],u=this[0][3],v=this[1][0],w=this[1][1],x=this[1][2],z=this[1][3],A=this[2][0],B=this[2][1],C=this[2][2],D=this[2][3],E=this[3][0],F=this[3][1],G=this[3][2],H=this[3][3];this[0][0]=b*r+c*v+f*A+h*E;this[0][1]=b*s+c*w+f*B+h*F;this[0][2]=b*y+c*x+f*C+h*G;this[0][3]=
b*u+c*z+f*D+h*H;this[1][0]=g*r+d*v+k*A+j*E;this[1][1]=g*s+d*w+k*B+j*F;this[1][2]=g*y+d*x+k*C+j*G;this[1][3]=g*u+d*z+k*D+j*H;this[2][0]=i*r+o*v+l*A+m*E;this[2][1]=i*s+o*w+l*B+m*F;this[2][2]=i*y+o*x+l*C+m*G;this[2][3]=i*u+o*z+l*D+m*H;this[3][0]=n*r+p*v+t*A+a*E;this[3][1]=n*s+p*w+t*B+a*F;this[3][2]=n*y+p*x+t*C+a*G;this[3][3]=n*u+p*z+t*D+a*H;return this}});d.Matrix4x4=g;d.decomposeTransform=function(a){var e={},c=new g(a);if(!c.normalizeTransform())return null;e=new g(a);for(a=0;a<3;a++)e[a][3]=0;e[3][3]=
1;if(e.determinant(e)===0)return window.edge_authoring_mode&&alert("Bad perspective matrix"),null;var f=Array(4),a=Array(4);if(c[0][3]!==0||c[1][3]!==0||c[2][3]!==0){f[0]=c[0][3];f[1]=c[1][3];f[2]=c[2][3];f[3]=c[3][3];a=e.inverse();if(!a)return!1;a=a.transpose().rightMultiply(f);c[0][3]=c[1][3]=c[2][3]=0;c[3][3]=1}else a[0]=a[1]=a[2]=0,a[3]=1;e=Array(3);e[0]=c[3][0];c[3][0]=0;e[1]=c[3][1];c[3][1]=0;e[2]=c[3][2];c[3][2]=0;f=Array(3);f[0]=Array(3);f[1]=Array(3);f[2]=Array(3);for(var h=0;h<3;h++)f[h][0]=
c[h][0],f[h][1]=c[h][1],f[h][2]=c[h][2];c=Array(3);c[0]=u(f[0]);f[0]=w(f[0]);h=Array(3);h[0]=x(f[0],f[1]);f[1]=I(f[1],f[0],1,-h[0]);c[1]=u(f[1]);f[1]=w(f[1]);c[1]!==0&&(h[0]/=c[1]);h[1]=x(f[0],f[2]);f[2]=I(f[2],f[0],1,-h[1]);h[2]=x(f[1],f[2]);f[2]=I(f[2],f[1],1,-h[2]);c[2]=u(f[2]);c[2]!==0&&(f[2]=w(f[2]));c[2]!==0&&(h[1]/=c[2],h[2]/=c[2]);var d;d=f[1];var k=f[2],i=Array(3);d.length!=3||k.length!=3?d=null:(i[0]=d[1]*k[2]-d[2]*k[1],i[1]=d[2]*k[0]-d[0]*k[2],i[2]=d[0]*k[1]-d[1]*k[0],d=i);if(x(f[0],d)<
0)for(d=0;d<3;d++)c[d]*=-1,f[d][0]*=-1,f[d][1]*=-1,f[d][2]*=-1;d=Array(3);d[1]=j(-f[0][2]);r(d[1])!==0?(d[0]=b(f[1][2],f[2][2]),d[2]=b(f[0][1],f[0][0])):(d[0]=b(-f[2][0],f[1][1]),d[2]=0);return e={translation:e,rotation:d,scale:c,skew:h,perspective:a}};d.Timeline.addTweenType("transform",function(a,b,c,f){return new l("transform",a,b,c,f)})})(jQuery,jQuery.Edge,jQuery.Edge.PropertyTween);(function(m,d,n){function l(a,b,c,g,i){d.PropertyTween.call(this,a,b,c,g,i);this.name="colorTween"}m.extend(l.prototype,n.prototype,{constructor:l,getValue:function(a){return m(this).css(a)},setValue:function(a,b,c){m(this).css(b,c)},parseValue:function(a){var b=d.parseColorValue(a);if(b&&b.colorFunction&&b.values){var a=b.values,b=b.colorFunction,c=/hsl/gi;if(b.match(/rgb/gi))if(this.animationColorSpace&&this.animationColorSpace=="HSL")b={r:a[0],g:a[1],b:a[2]},(b=d.rgbToHSL(b))?a.length>3?(a=a[3],
a=[b.h,b.s,b.l,a]):a=[b.h,b.s,b.l]:a=[];else if(this.animationColorSpace){if(this.animationColorSpace!="RGB")return a}else this.animationColorSpace="RGB";else if(b.match(c))if(this.animationColorSpace&&this.animationColorSpace=="RGB")b={h:a[0],s:a[1],l:a[2]},(b=d.hslToRGB(b))?a.length>3?(a=a[3],a=[b.r,b.g,b.b,a]):a=[b.r,b.g,b.b]:a=[];else if(this.animationColorSpace){if(this.animationColorSpace!="HSL")return a}else this.animationColorSpace="HSL";a.length==3&&(a[3]=1);return a}},formatValue:function(a){if(a){var b;
this.animationColorSpace=="HSL"?(b="hsl",a=a.length==4?b+"a("+a[0]+","+a[1]+"%,"+a[2]+"%,"+a[3]+")":b+"("+a[0]+","+a[1]+"%,"+a[2]+"%)"):(b="rgb",a=a.length==4?b+"a("+a[0]+"%,"+a[1]+"%,"+a[2]+"%,"+a[3]+")":b+"("+a[0]+"%,"+a[1]+"%,"+a[2]+"%)");return a}}});d.ColorTween=l;d.parseColorValue=function(a){if(a){var b=[],c,d,g=/^\s*#([a-fA-F0-9])([a-fA-F0-9])([a-fA-F0-9])\s*$/;(d=/^\s*#([a-fA-F0-9]{2})([a-fA-F0-9]{2})([a-fA-F0-9]{2})\s*$/.exec(a))?(b=[parseInt(d[1],16)/255*100,parseInt(d[2],16)/255*100,parseInt(d[3],
16)/255*100],c="rgb"):(d=g.exec(a))?(b=[parseInt(d[1]+d[1],16)/255*100,parseInt(d[2]+d[2],16)/255*100,parseInt(d[3]+d[3],16)/255*100],c="rgb"):a=="transparent"&&(b=[0,0,0,0],c="rgb");c||(c=a.match(/\w+/),m.isArray(c)?c=c[0]:c||(c=""),(d=a.match(/\([^\)]*\)/))&&d.length>0&&(d=d[0].replace(/[\(\)]/g,"")));a=/rgb/gi;g=/hsl/gi;if(b.length===0)if(c.match(a))if((g=/^\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*,\s*([0-9]{1,3})\s*(?:,\s*([0-9](?:\.[0-9]+)?)\s*)?$/.exec(d))&&g.length>=4){for(a=0;a<3;a++)b[a]=g[a+
1]/255*100;g.length>4&&(g[4]||(g[4]=1),b[3]=g[4])}else{if((d=/^\s*([0-9]{1,3}(?:\.[0-9]+)?)\s*%\s*,\s*([0-9]{1,3}(?:\.[0-9]+)?)\s*%\s*,\s*([0-9]{1,3}(?:\.[0-9]+)?)\s*%\s*(?:,\s*([0-9](?:\.[0-9]+)?)\s*)?$/.exec(d))&&d.length>=4){if(d.length>=5)d.length=5,d[4]||(d[4]=1);for(a=0;a<d.length-1;a++)b[a]=d[a+1]}}else if(c.match(g)&&(d=/^\s*([0-9]{1,3}(?:\.[0-9]+)?)\s*,\s*([0-9]{1,3}(?:\.[0-9]+)?)\s*%\s*,\s*([0-9]{1,3}(?:\.[0-9]+)?)\s*%\s*(?:,\s*([0-9](?:\.[0-9]+)?)\s*)?$/.exec(d))&&d.length>=4){if(d.length>=
5)d.length=5,d[4]||(d[4]=1);for(a=0;a<d.length-1;a++)b[a]=d[a+1]}if(b)for(a=0;a<b.length;a++)b[a]=Math.round(b[a]*1E4)/1E4;return{colorFunction:c,values:b}}};var c=1/3,g=1/6,j=2/3,i=function(a){return a<0?a+1:a>1?a-1:a},r=function(a,b,c,d){return d<g?a+c*d:d<0.5?b:d<j?a+c*(j-d):a};d.hslToRGB=function(a){if(a===null||a.s<0||a.s>100||a.l<0||a.l>100)return null;for(;a.h>360;)a.h-=360;for(;a.h<0;)a.h=360+a.h;var b={},d=a.h/360,g=a.s/100,a=a.l/100;if(g===0)b.r=b.g=b.b=1;else{var g=a<=0.5?a*(1+g):a+g-a*
g,a=2*a-g,j=i(d+c),l=i(d),d=i(d-c),m=(g-a)*6;b.r=r(a,g,m,j);b.g=r(a,g,m,l);b.b=r(a,g,m,d)}b.r=Math.min(b.r*100,100);b.g=Math.min(b.g*100,100);b.b=Math.min(b.b*100,100);b.r=Math.round(b.r*1E4)/1E4;b.g=Math.round(b.g*1E4)/1E4;b.b=Math.round(b.b*1E4)/1E4;return b};d.rgbToHSL=function(a){if(a===null||a.r<0||a.r>100||a.g<0||a.g>100||a.b<0||a.b>100)return null;var b={h:0,s:0,l:0},c=a.r/100,d=a.g/100,a=a.b/100,g=Math.max(c,d,a),i=Math.min(c,d,a);b.l=(g+i)/2;if(g==i||b.l<=0)return b;var j=g-i;b.s=b.l<=0.5?
j/(g+i):j/(2-g-i);b.h=g==a?4+(c-d)/j:g==d?2+(a-c)/j:(d-a)/j;b.h*=60;if(b.h>360)b.h-=360;else if(b.h<0)b.h=360+b.h;b.s=Math.min(b.s*100,100);b.l=Math.min(b.l*100,100);b.h=Math.round(b.h*1E4)/1E4;b.s=Math.round(b.s*1E4)/1E4;b.l=Math.round(b.l*1E4)/1E4;return b};d.Timeline.addTweenType("color",function(a,b,c,d){return new l("color",a,b,c,d)})})(jQuery,jQuery.Edge,jQuery.Edge.PropertyTween);
})( jQuery );
