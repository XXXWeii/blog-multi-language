---
title: 数据类型的判断
lang: zh-CN
author: XXXWeii
date: 2022-05-23 13:42:00
tags:
  - JavaScript
---

## 一、基本数据类型

---

JS 中七种内置类型（null，undefined，boolean，number，string，symbol，object）又分为两大类型

### 两大类型：

- 基本类型：null，undefined,boolean,number,string,symbol
- 引用类型 Object：Array，Function，Date，RegExp 等

![两大基本类型](./images/base_data.png)

## 二、数据类型的判断

- typeof:能判断所有值类型、函数。不可对 null、对象、数组进行精确判断，因为都返回`object`。

```js
console.log(typeof undefined); // undefined
console.log(typeof 2); // number
console.log(typeof true); // boolean
console.log(typeof "str"); // string
console.log(typeof Symbol("foo")); // symbol
console.log(typeof 2172141653n); // bigint
console.log(typeof function () {}); // function
// 不能判别
console.log(typeof []); // object
console.log(typeof {}); // object
console.log(typeof null); // object
```

- instanceof：能判断对象类型，不能判断基本数据类型，其内部运行机制是判断在其原型链中能否找到该类型的原型。比如考虑以下代码：

```js
class People {}
class Student extends People {}

const vortesnail = new Student();

console.log(vortesnail instanceof People); // true
console.log(vortesnail instanceof Student); // true
```

其实现就是顺着原型链去找，如果能找到对应的 Xxxxx.prototype  即为 true 。比如这里的 vortesnail  作为实例，顺着原型链能找到 Student.prototype  及 People.prototype ，所以都为 true 。

- Object.prototype.toString.call()：所有原始数据类型都是能判断的，还有 Error 对象，Date 对象等。

```js
Object.prototype.toString.call(2); // "[object Number]"
Object.prototype.toString.call(""); // "[object String]"
Object.prototype.toString.call(true); // "[object Boolean]"
Object.prototype.toString.call(undefined); // "[object Undefined]"
Object.prototype.toString.call(null); // "[object Null]"
Object.prototype.toString.call(Math); // "[object Math]"
Object.prototype.toString.call({}); // "[object Object]"
Object.prototype.toString.call([]); // "[object Array]"
Object.prototype.toString.call(function () {}); // "[object Function]"
```

在面试中有一个经常被问的问题就是：如何判断变量是否为数组？

```js
Array.isArray(arr); // true
arr.__proto__ === Array.prototype; // true
arr instanceof Array; // true
Object.prototype.toString.call(arr); // "[object Array]"

function toRawType(value) {
  return Object.prototype.toString.call(value).slice(8, -1).toLowerCase();
}
```
