---
title: 23个常用 JavaScript 知识点总结，你都会吗？
lang: zh-CN
author: XXXWeii
date: 2023-04-09 14:55:00
tags:
  - JavaScript
---

最近重温了一遍红宝书，发现一些比较好玩的写法，很多东西日常都在用，但是发现还会有不一样的写法,结合一些日常工作中使用的方法，为大家总结一篇日常经常使用可能还不知道的点，希望对你能有所帮助：

## 一行代码完成结构加赋值

---

我们日常经常使用结构赋值，一般都是先结构，再赋值，当然我们也可以一行就完成解构加赋值操作，看起来非常简化，当然可读性你懂得！

```js
let people = { name: null, age: null };
let result = { name: "张三", age: 16 };

({ name: people.name, age: people.age } = result);
console.log(people); // {"name":"张三","age":16}###
```

## 对基础数据类型进行解构

---

日常中我们应该用不到这样的场景，但是实际上我们也可以对基础数据类型解构

```js
const { length: a } = "1234";
console.log(a); // 4
```

## 对数组解构快速拿到最后一项值

---

实际上我们是可以对数组解构赋值拿到`length`属性的，通过这个特性也可以做更多的事情。

```js
const arr = [1, 2, 3];
const { 0: first, length, [length - 1]: last } = arr;
first; // 1
last; // 3
length; // 3
```

## 将下标转为中文零一二三...

---

日常可能有的列表我们需要将对应的 012345 转为中文的一、二、三、四、五...，在老的项目看到还有通过自己手动定义很多行这样的写法，于是写了一个这样的方法转换

```js
export function transfromNumber(number){
  const  INDEX_MAP = ['零'，'一'.....]
  if(!number) return
  if(number === 10) return INDEX_MAP[number]
  return [...number.toString()].reduce( (pre, cur) => pre  + INDEX_MAP[cur] , '' )
}
```

## 判断整数的不同方法

---

```js
/* 1.任何整数都会被1整除，即余数是0。利用这个规则来判断是否是整数。但是对字符串不准确 */
function isInteger(obj) {
  return obj % 1 === 0;
}

/* 1. 添加一个是数字的判断 */
function isInteger(obj) {
  return typeof obj === "number" && obj % 1 === 0;
}

/* 2. 使用Math.round、Math.ceil、Math.floor判断 整数取整后还是等于自己。利用这个特性来判断是否是整数*/
function isInteger(obj) {
  return Math.floor(obj) === obj;
}

/* 3. 通过parseInt判断 某些场景不准确 */
function isInteger(obj) {
  return parseInt(obj, 10) === obj;
}

/* 4. 通过位运算符*/
function isInteger(obj) {
  return (obj | 0) === obj;
}
```

## 通过 css 检测系统的主题色从而全局修改样式

---

`@media`的属性`prefers-color-scheme`就可以知道当前的系统主题，当然使用前需要查查兼容性

```js
@media (prefers-color-scheme: dark) { //... }
@media (prefers-color-scheme: light) { //... }
```

javascript 也可以轻松做到

```js
window.addEventListener("theme-mode", (event) => {
  if (event.mode == "dark") {
  }
  if (event.mode == "light") {
  }
});

window
  .matchMedia("(prefers-color-scheme: dark)")
  .addEventListener("change", (event) => {
    if (event.matches) {
    } // dark mode
  });
```

## 数组随机打乱顺序

---

通过`0.5`-`Math.random()`得到一个随机数，再通过两次`sort`排序打乱的更彻底,但是这个方法实际上并不够随机，如果是企业级运用，建议使用第二种洗牌算法

```js
shuffle(arr) {
      return arr.sort(() => 0.5 - Math.random()). sort(() => 0.5 - Math.random());
 },
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    ;[arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]]
  }
  return arr
}
```

## 随机获取一个 Boolean 值

---

和上个原理相同，通过随机数获取，`Math.random()`的区间是`0-0.99`，用`0.5`在中间百分之五十的概率

```js
function randomBool() {
  return 0.5 - Math.random();
}
```

## 把数组最后一项移到第一项

---

```js
function (arr){
    return arr.push(arr.shift());
}
```

## 把数组的第一项放到最后一项

---

```js
function(arr){
  return arr.unshift(arr.pop());
}
```

## 利用 set 数组去重

---

```js
function uniqueArr(arr) {
  return [...new Set(arr)];
}
```

## dom 节点平滑滚动到可是区域，顶部，底部

---

原生的`scrollTo`方法没有动画，类似于锚点跳转，比较生硬，可以通过这个方法会自带平滑的过度效果

```js
function scrollTo(element) {
  element.scrollIntoView({ behavior: "smooth", block: "start" }); // 顶部
  element.scrollIntoView({ behavior: "smooth", block: "end" }); // 底部
  element.scrollIntoView({ behavior: "smooth" }); // 可视区域
}
```

## 获取随机颜色

---

日常我们经常会需要获取一个随机颜色，通过随机数即可完成

```js
function getRandomColor() {
  return `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
}
```

## 检测是否为空对象

---

通过使用 Es6 的`Reflect`静态方法判断他的长度就可以判断是否是空数组了，也可以通过`Object.keys()`来判断

```js
function isEmpty(obj) {
  return Reflect.ownKeys(obj).length === 0 && obj.constructor === Object;
}
```

## Boolean 转换

---

一些场景下我们会将`boolean`值定义为场景，但是在 js 中非空的字符串都会被认为是`true`

```js
function toBoolean(value, truthyValues = ["true"]) {
  const normalizedValue = String(value).toLowerCase().trim();
  return truthyValues.includes(normalizedValue);
}
toBoolean("TRUE"); // true
toBoolean("FALSE"); // false
toBoolean("YES", ["yes"]); // true
```

## 各种数组克隆方法

---

数组克隆的方法其实特别多了，看看有没有你没见过的！

```js
const clone = (arr) => arr.slice(0);
const clone = (arr) => [...arr];
const clone = (arr) => Array.from(arr);
const clone = (arr) => arr.map((x) => x);
const clone = (arr) => JSON.parse(JSON.stringify(arr));
const clone = (arr) => arr.concat([]);
const clone = (arr) => structuredClone(arr);
```

## 比较两个时间大小

---

通过调用`getTime`获取时间戳比较就可以了

```js
function compare(a, b) {
  return a.getTime() > b.getTime();
}
```

## 计算两个时间之间的月份差异

---

```js
function monthDiff(startDate, endDate) {
  return Math.max(
    0,
    (endDate.getFullYear() - startDate.getFullYear()) * 12 -
      startDate.getMonth() +
      endDate.getMonth()
  );
}
```

## 一步从时间中提取年月日时分秒

---

时间格式化轻松解决，一步获取到年月日时分秒毫秒，由于`toISOString`会丢失时区，导致时间差八小时，所以在格式化之前我们加上八个小时时间即可

```js
function extract(date) {
  const d = new Date(new Date(date).getTime() + 8 * 3600 * 1000);
  return new Date(d)
    .toISOString()
    .split(/[^0-9]/)
    .slice(0, -1);
}
console.log(extract(new Date())); // ['2022', '09', '19', '18', '06', '11', '187']
```

## 判断一个参数是不是函数

---

有时候我们的方法需要传入一个函数回调，但是需要检测其类型，我们可以通过`Object`的原型方法去检测，当然这个方法可以准确检测任何类型。

```js
function isFunction(v) {
  return [
    "[object Function]",
    "[object GeneratorFunction]",
    "[object AsyncFunction]",
    "[object Promise]",
  ].includes(Object.prototype.toString.call(v));
}
```

## 计算两个坐标之间的距离

---

```js
function distance(p1, p2){
    return `Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}
```

## 检测两个 dom 节点是否覆盖重叠

---

有些场景下我们需要判断 dom 是否发生碰撞了或者重叠了，我们可以通过`getBoundingClientRect`获取到 dom 的`x1`,`y1`,`x2`,`y2`坐标然后进行坐标比对即可判断出来

```js
function overlaps = (a, b) {
   return (a.x1 < b.x2 && b.x1 < a.x2) || (a.y1 < b.y2 && b.y1 < a.y2);
}
```

## 判断是否是 NodeJs 环境

---

前端的日常开发是离不开 nodeJs 的，通过判断全局环境来检测是否是 nodeJs 环境

```js
function isNode() {
  return (
    typeof process !== "undefined" &&
    process.versions != null &&
    process.versions.node != null
  );
}
```

## 参数求和

---

之前看到有通过函数柯理化形式来求和的，通过`reduce`一行即可

```js
function sum(...args) {
  args.reduce((a, b) => a + b);
}
```
