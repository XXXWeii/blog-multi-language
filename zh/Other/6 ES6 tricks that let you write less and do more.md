---
title: 6个让你少写多做的 ES6 技巧
lang: zh-CN
date: 2023-04-14 14:55:00
author: XXXWeii
tags:
  - 其他
---

主要想跟大家分享 6 个实用的 ES6 技巧，希望这 6 个小技巧能够帮助到你。

下面我们开始今天的内容吧。

## 1.Array.of

---

关于奇怪的 Array 函数：

众所周知，我们可以通过 Array 函数来做以下事情。

初始化一个指定长度的数组。

设置数组的初始值。

```js
// 1. Initialize an array of the specified length
const array1 = Array(3); // [ , , ]
// 2. Set the initial value of the array
const array2 = Array(); // []
const array3 = Array(undefined); // [ undefined ]
const array4 = Array(1, 2, 3); // [ 1, 2, 3 ]
```

传递给 Array 函数的参数个数不一样，其功能也不一样。这常常让我感到困惑。

幸运的是，我们可以使用 Array.of 来弥补 Array 的不足。

```js
// it's not initializing an array of length 3
const array1 = Array.of(3); // [ 3 ]
const array2 = Array.of(); // []
const array3 = Array.of(undefined); // [ undefined ]
const array4 = Array.of(1, 2, 3); // [ 1, 2, 3 ]
```

## 2.Array.from

---

从方法中，我们可以通过 Array.from 方法将类数组对象、arguments 对象和 NodeList 对象转换为真正的数组。

**1).类数组对象**

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

**2).节点列表**

```js
const domsNodeList = document.querySelectorAll("div");
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

**4).Array.from 的第二个参数**

我们可以像“[].map”一样使用 Array.from 方法。

```js
const array = [1, 2, 3];
const array2 = array.map((num) => num * 2); // [2, 4, 6]
const array3 = Array.from(array, (num) => num * 2); // [2, 4, 6]
```

## 3.includes

---

我们经常会写这样的判断语句，在满足其中一个条件的情况下做某事。

```js
const num = 1;
if (num === 1 || num === 2 || num === 3 || num === 4) {
  console.log(num); // 1
}
```

其实，可以通过 include 方法来简化代码。

```js
const nums = [1, 2, 3, 4];
const num = 1;
if (nums.includes(num)) {
  console.log(num); // 1
}
```

## 4.使用“at 方法”读取数组的尾元素

---

你如何读取数组的尾部元素？是的，我们需要以“array.length-1”作为下标来读取。

```js
const array = [1, 2, 3, 4, 5];
const lastEle = array[array.length - 1]; // 5
// You can't read like that
const lastEle = array[-1]; // undefined
```

还有别的办法吗？

是的，“at”方法将成为您的魔法。当然，您可以读取数组中其他位置的元素。

```js
const array = [1, 2, 3, 4, 5];
const lastEle = array.at(-1); // 5
const ele1 = array.at(0); // 1
```

## 5.flat

---

flat() 方法创建一个新数组，其中所有子数组元素以递归方式连接到指定深度。

```js
const array = [1, [2, [3, [4, [5]]]]];
// The default depth is 1
const flat1 = array.flat(); // [ 1, 2, [ 3, [ 4, [ 5 ] ] ] ]
const flat2 = array.flat(2); // [ 1, 2, 3, [ 4, [ 5 ] ] ]
const flatAll = array.flat(Infinity); // [ 1, 2, 3, 4, 5 ]
```

## 6.findIndex

---

findIndex() 方法返回数组中满足提供的测试函数的第一个元素的索引。否则，它返回 -1，表示没有元素通过测试。”

```js
const array = [-1, 0, 10, 10, 20, 100];
const index1 = array.findIndex((num) => num < 0); // 0
const index2 = array.findIndex((num) => num >= 10); // 2
```
