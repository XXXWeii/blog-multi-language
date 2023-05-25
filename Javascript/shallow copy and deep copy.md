---
title: shallow copy and deep copy
lang: en-US
date: 2022-03-01 14:55:00
author: XXXWeii
tags:
  - JavaScript
---

# shallow copy and deep copy

Implementation of shallow copy:

```js
function shallowCopy(object) {
   // just copy the object
   if (!object || typeof object !== "object") return;

   // Judging whether to create an array or an object according to the type of object
   let newObject = Array.isArray(object) ? [] : {};

   // Traversing the object, and judging that the properties of the object are copied
   for (let key in object) {
     if (object. hasOwnProperty(key)) {
       newObject[key] = object[key];
     }
   }

   return newObject;
}
```

Implementation of deep copy:

```js
function deepCopy(object) {
  if (!object || typeof object !== "object") return;

  let newObject = Array.isArray(object) ? [] : {};

  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      newObject[key] =
        typeof object[key] === "object" ? deepCopy(object[key]) : object[key];
    }
  }

  return newObject;
}
```

```js
/**
  * deep copy
  * @param {Object} obj the object to be copied
  * @param {Map} map is used to store the address of the circular reference object
  */

function deepClone(obj = {}, map = new Map()) {
   if (typeof obj !== "object") {
     return obj;
   }
   if (map. get(obj)) {
     return map. get(obj);
   }

   let result = {};
   // initialize the return result
   if (
     obj instanceof Array ||
     // The reason for adding || is to prevent the prototype of Array from being rewritten, so is Array.isArray
     Object.prototype.toString(obj) === "[object Array]"
   ) {
     result = [];
   }
   // prevent circular references
   map.set(obj, result);
   for (const key in obj) {
     // Make sure key is not a prototype property
     if (obj. hasOwnProperty(key)) {
       // call recursively
       result[key] = deepClone(obj[key], map);
     }
   }

   // return result
   return result;
}
```
