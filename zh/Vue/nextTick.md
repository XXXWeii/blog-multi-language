---
title: Vue的nextTick源码解析
lang: zh-CN
date: 2022-02-15 16:09:00
author: XXXWeii
tags:
  - Vue
---

`nextTick` 支持两种形式使用方式：

1. 回调函数形式。
2. 如果当前环节支持 `Promise`，还支持 `Promise.then` 的形式。

```js
let pending = false,
timeFunc,
callbacks=[];

//cb:执行的回调函数,context:执行上下文参数
function nextTick(cb,context){
  let _resolve=null;
  callbacks.push(()=>{
    if(cb){
      try{
        cb.call(context)
      }catch(e){
        handleError(e,ctx,'nextTick)
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
  //判断1：是否原生支持Promise
  const p = Promise.resolve()
  timerFunc = () => {
    p.then(flushCallbacks)
    if (isIOS) setTimeout(noop)
  }
  isUsingMicroTask = true
} else if (!isIE && typeof MutationObserver !== 'undefined' && (
  isNative(MutationObserver) ||
  MutationObserver.toString() === '[object MutationObserverConstructor]'
)) {
  //判断2：是否原生支持MutationObserver
  let counter = 1
  const observer = new MutationObserver(flushCallbacks)
  const textNode = document.createTextNode(String(counter))
  observer.observe(textNode, {
    characterData: true
  })
  timerFunc = () => {
    counter = (counter + 1) % 2
    textNode.data = String(counter)
  }
  isUsingMicroTask = true
} else if (typeof setImmediate !== 'undefined' && isNative(setImmediate)) {
  //判断3：是否原生支持setImmediate
  timerFunc = () => {
    setImmediate(flushCallbacks)
  }
} else {
  //判断4：上面都不行，直接用setTimeout
  timerFunc = () => {
    setTimeout(flushCallbacks, 0)
  }
}

function flushCallbacks () {
  pending = false
  const copies = callbacks.slice(0)
  callbacks.length = 0
  for (let i = 0; i < copies.length; i++) {
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
