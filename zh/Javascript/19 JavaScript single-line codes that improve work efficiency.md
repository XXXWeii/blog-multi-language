---
title: 19个提高工作效率的JavaScript单行代码
lang: zh-CN
author: XXXWeii
date: 2023-05-23 13:42:00
tags:
  - JavaScript
---

## **1.# 生成随机字符串**

------

当我们需要一个唯一id时，通过`Math.random`创建一个随机字符串简直不要太方便噢！！！

```js
const randomString = () => Math.random().toString(36).slice(2)
randomString() // gi1qtdego0b
randomString() // f3qixv40mot
randomString() // eeelv1pm3ja
```

## 2.# 转义HTML特殊字符

------

解决XSS方法之一就是转义HTML。

```js
const escape = (str) => str.replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[m]))
escape('<div class="medium">Hi Medium.</div>') 
// &lt;div class=&quot;medium&quot;&gt;Hi Medium.&lt;/div&gt
```

## 3.# 单词首字母大写

------

```js
const uppercaseWords = (str) => str.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase())
uppercaseWords('hello world'); // 'Hello World'
```

## 4.# 将字符串转换为小驼峰

------

```js
const toCamelCase = (str) => str.trim().replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : ''));
toCamelCase('background-color'); // backgroundColor
toCamelCase('-webkit-scrollbar-thumb'); // WebkitScrollbarThumb
toCamelCase('_hello_world'); // HelloWorld
toCamelCase('hello_world'); // helloWorld
```

## 5.# 删除数组中的重复值

------

得益于ES6，使用Set数据类型来对数组去重太方便了。

```js
const removeDuplicates = (arr) => [...new Set(arr)]
console.log(removeDuplicates([1, 2, 2, 3, 3, 4, 4, 5, 5, 6])) 
// [1, 2, 3, 4, 5, 6]
```

## 6.# 铺平一个数组

------

```js
const flat = (arr) =>
    [].concat.apply(
        [],
        arr.map((a) => (Array.isArray(a) ? flat(a) : a))
    )
// Or
const flat = (arr) => arr.reduce((a, b) => (Array.isArray(b) ? [...a, ...flat(b)] : [...a, b]), [])
flat(['cat', ['lion', 'tiger']]) // ['cat', 'lion', 'tiger']
```

## 7.# 移除数组中的假值

------

```js
const removeFalsy = (arr) => arr.filter(Boolean)
removeFalsy([0, 'a string', '', NaN, true, 5, undefined, 'another string', false])
// ['a string', true, 5, 'another string']
```

## 8.# 确认一个数字是奇数还是偶数

------

```js
const isEven = num => num % 2 === 0
isEven(2) // true
isEven(1) // false
```

## 9.# 获取两个数字之间的随机数

------

```js
const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min)
random(1, 50) // 25
random(1, 50) // 34
```

## 10.# 计算平均值

------

```js
const average = (...args) => args.reduce((a, b) => a + b) / args.length;
average(1, 2, 3, 4, 5);   // 3
```

## 11.# 将数字截断到固定的小数点

------

```js
const round = (n, d) => Number(Math.round(n + "e" + d) + "e-" + d)
round(1.005, 2) //1.01
round(1.555, 2) //1.56
```

## 12.# 计算两个日期之间天数

------

```js
const diffDays = (date, otherDate) => Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));
diffDays(new Date("2021-11-3"), new Date("2022-2-1"))  // 90
```

## 13.# 从日期中获取是一年中的哪一天

------

```js
const dayOfYear = (date) => Math.floor((date - new Date(date.getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24))
dayOfYear(new Date()) // 74
```

## 14.# 获取一个随机的颜色值

------

```js
const randomColor = () => `#${Math.random().toString(16).slice(2, 8).padEnd(6, '0')}`
randomColor() // #9dae4f
randomColor() // #6ef10e
```

## 15.# 将RGB颜色转换为十六进制颜色值

------

```js
const rgbToHex = (r, g, b) => "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
rgbToHex(255, 255, 255)  // '#ffffff'
```

## 16.# 清除所有的cookie

------

```js
const clearCookies = () => document.cookie.split(';').forEach((c) => (document.cookie = c.replace(/^ +/, '').replace(/=.*/, `=;expires=${new Date().toUTCString()};path=/`)))
```

## 17.# 检测黑暗模式

------

```js
const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
```

## 18.# 交换两个变量的值

------

```js
[foo, bar] = [bar, foo]
```

## 19.# 暂停一会

------

```js
const pause = (millis) => new Promise(resolve => setTimeout(resolve, millis))
const fn = async () => {
  await pause(1000)
  console.log('fatfish') // 1s later
}
fn()
```

