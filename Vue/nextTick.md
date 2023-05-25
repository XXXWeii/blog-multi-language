---
title: Vue's nextTick source code analysis
lang: en-US
date: 2022-02-15 16:09:00
author: XXXWeii
tags:
  - Vue
---

`nextTick` supports two forms of usage:

1. Callback function form.
2. If the current link supports `Promise`, it also supports the form of `Promise.then`.

```js
let pending = false,
timeFunc,
callbacks=[];

//cb: callback function for execution, context: execution context parameter
function nextTick(cb, context){
   let _resolve=null;
   callbacks. push(() => {
     if(cb){
       try {
         cb. call(context)
       }catch(e){
         handleError(e, ctx, 'nextTick)
       }
     }else if(_resolve){
       _resolve(context)
     }
   })
   if(!pending){
     pending=true;
     timeFunc()
   }
   if(!cb&&typeof Promise !== "undefind"){
     rteurn new Promise(resolve=>_resolve=resolve)
   }
}

let isUsingMicroTask = false;
if (typeof Promise !== 'undefined' && isNative(Promise)) {
   // Judgment 1: Whether Promise is natively supported
   const p = Promise. resolve()
   timerFunc = () => {
     p.then(flushCallbacks)
     if (isIOS) setTimeout(noop)
   }
   isUsingMicroTask = true
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
   isNative(MutationObserver) ||
   MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
   // Judgment 2: Whether MutationObserver is natively supported
   let counter = 1
   const observer = new MutationObserver(flushCallbacks)
   const textNode = document. createTextNode(String(counter))
   observer. observe(textNode, {
     characterData: true
   })
   timerFunc = () => {
     counter = (counter + 1) % 2
     textNode. data = String(counter)
   }
   isUsingMicroTask = true
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
   // Judgment 3: Whether setImmediate is natively supported
   timerFunc = () => {
     setImmediate(flushCallbacks)
   }
} else {
   // Judgment 4: None of the above works, use setTimeout directly
   timerFunc = () => {
     setTimeout(flushCallbacks, 0)
   }
}

function flushCallbacks () {
   pending = false
   const copies = callbacks. slice(0)
   callbacks. length = 0
   for (let i = 0; i < copies. length; i++) {
     copies[i]()
   }
}

nextTick(()=>{
   console.log("nextTick callback")
})
nextTick().then(()=>{
   console.log("nextTick Promise")
})
```
