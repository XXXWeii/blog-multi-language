---
title: 6 ES6 tricks that let you write less and do more
lang: en-US
date: 2023-04-14 14:55:00
author: XXXWeii
tags:
  - Other
---

I mainly want to share with you 6 practical ES6 tips, I hope these 6 tips can help you.

Let's start today's content.

## 1. Array.of

---

About the weird Array function:

As we all know, we can do the following things with Array functions.

Initializes an array of the specified length.

Set the initial value of the array.

```js
// 1. Initialize an array of the specified length
const array1 = Array(3); // [ , , ]
// 2. Set the initial value of the array
const array2 = Array(); // []
const array3 = Array(undefined); // [ undefined ]
const array4 = Array(1, 2, 3); // [ 1, 2, 3 ]
```

The number of parameters passed to the Array function is different, and its function is also different. This often confuses me.

Fortunately, we can use Array.of to make up for the lack of Array.

```js
// it's not initializing an array of length 3
const array1 = Array.of(3); // [ 3 ]
const array2 = Array.of(); // []
const array3 = Array.of(undefined); // [ undefined ]
const array4 = Array.of(1, 2, 3); // [ 1, 2, 3 ]
```

## 2. Array. from

---

From the method, we can convert array-like objects, arguments objects, and NodeList objects into real arrays via the Array.from method.

**1).Array-like object**

```js
const arrayLike = {
   0: "fatfish",
   1: "medium",
   length: 2,
};
const array1 = [].slice.call(arrayLike); // ['fatfish', 'medium']
// A more convenient way
const array2 = Array.from(arrayLike); // ['fatfish', 'medium']
```

**2). Node list**

```js
const domsNodeList = document. querySelectorAll("div");
const domsArray = Array.from(domsNodeList); // [ dom, dom, dom, ... ]
```

**3).Arguments**

```js
const logInfo = function () {
   console.log("arguments", arguments);
   console.log("Array.from arguments", Array.from(arguments));
};
logInfo("fatfish", 100);
logInfo("fatfish");
```

**4).The second parameter of Array.from**

We can use Array.from method like "[].map".

```js
const array = [1, 2, 3];
const array2 = array. map((num) => num * 2); // [2, 4, 6]
const array3 = Array.from(array, (num) => num * 2); // [2, 4, 6]
```

## 3. includes

---

We often write judgment statements that do something if one of the conditions is met.

```js
const num = 1;
if (num === 1 || num === 2 || num === 3 || num === 4) {
   console.log(num); // 1
}
```

In fact, the code can be simplified by the include method.

```js
const nums = [1, 2, 3, 4];
const num = 1;
if (nums. includes(num)) {
   console.log(num); // 1
}
```

## 4. Use the "at method" to read the tail element of the array

---

How do you read the tail element of the array? Yes, we need to read with "array.length-1" as the subscript.

```js
const array = [1, 2, 3, 4, 5];
const lastEle = array[array. length - 1]; // 5
// You can't read like that
const lastEle = array[-1]; // undefined
```

Is there any other method?

Yes, the "at" method will do the magic for you. Of course, you can read elements elsewhere in the array.

```js
const array = [1, 2, 3, 4, 5];
const lastEle = array.at(-1); // 5
const ele1 = array. at(0); // 1
```

## 5.flat

---

The flat() method creates a new array in which all subarray elements are recursively concatenated to the specified depth.

```js
const array = [1, [2, [3, [4, [5]]]]];
// The default depth is 1
const flat1 = array. flat(); // [ 1, 2, [ 3, [ 4, [ 5 ] ] ] ]
const flat2 = array.flat(2); // [ 1, 2, 3, [ 4, [ 5 ] ] ]
const flatAll = array. flat(Infinity); // [ 1, 2, 3, 4, 5 ]
```

## 6. findIndex

---

The findIndex() method returns the index of the first element in the array that satisfies the provided test function. Otherwise, it returns -1, indicating that no element passed the test. "

```js
const array = [-1, 0, 10, 10, 20, 100];
const index1 = array.findIndex((num) => num < 0); // 0
const index2 = array.findIndex((num) => num >= 10); // 2
```
