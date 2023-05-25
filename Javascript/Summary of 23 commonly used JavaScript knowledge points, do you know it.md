---
title: Summary of 23 commonly used JavaScript knowledge points, do you know it
lang: en-US
date: 2023-04-09 14:55:00
author: XXXWeii
tags:
  - JavaScript
---

Recently, I revisited the Red Book and found some interesting writing methods. Many things are used in daily life, but I found that there are still different writing methods. Combined with some methods used in daily work, I will summarize an article that is frequently used in daily life. You may not know the point, I hope it can help you:

## One line of code completes structure plus assignment

---

We often use structure assignments in our daily life. Usually, we structure first and then assign values. Of course, we can also complete the deconstruction and assignment operations in one line. It seems very simplified. Of course, you know the readability!

```js
let people = { name: null, age: null };
let result = { name: "Zhang San", age: 16 };

({ name: people.name, age: people.age } = result);
console.log(people); // {"name":"Zhang San","age":16}###
```

## Deconstruct the basic data type

---

We should not use such scenarios in daily life, but in fact we can also deconstruct the basic data types

```js
const { length: a } = "1234";
console. log(a); // 4
```

## Deconstruct the array to quickly get the last value

---

In fact, we can get the `length` attribute by deconstructing and assigning an array, and we can do more things through this feature.

```js
const arr = [1, 2, 3];
const { 0: first, length, [length - 1]: last } = arr;
first; // 1
last; // 3
length; // 3
```

## Convert the subscript to Chinese zero one two three...

---

We need to convert the corresponding 012345 into Chinese one, two, three, four, five... for the list that may be in daily life. I saw in the old project that there are many lines manually defined by myself, so I wrote a method conversion like this

```js
export function transferNumber(number){
   const INDEX_MAP = ['zero', 'one'.....]
   if(!number) return
   if(number === 10) return INDEX_MAP[number]
   return [...number.toString()].reduce( (pre, cur) => pre + INDEX_MAP[cur] , '' )
}
```

## Different ways of judging integers

---

```js
/* 1. Any integer will be divisible by 1, that is, the remainder is 0. Use this rule to determine whether it is an integer. But not exact for strings */
function isInteger(obj) {
   return obj % 1 === 0;
}

/* 1. Add a judgment that is a number */
function isInteger(obj) {
   return typeof obj === "number" && obj % 1 === 0;
}

/* 2. Use Math.round, Math.ceil, and Math.floor to judge whether the integer is equal to itself after rounding. Use this feature to determine whether it is an integer*/
function isInteger(obj) {
   return Math. floor(obj) === obj;
}

/* 3. Judging by parseInt that some scenes are inaccurate */
function isInteger(obj) {
   return parseInt(obj, 10) === obj;
}

/* 4. By bitwise operator */
function isInteger(obj) {
   return (obj | 0) === obj;
}
```

## Detect the theme color of the system through css to modify the style globally

---

The attribute `prefers-color-scheme` of `@media` can know the current system theme. Of course, you need to check the compatibility before using it.

```js
@media (prefers-color-scheme: dark) { //... }
@media (prefers-color-scheme: light) { //... }
```

JavaScript can also easily do

```js
window. addEventListener("theme-mode", (event) => {
   if (event. mode == "dark") {
   }
   if (event. mode == "light") {
   }
});

window
   .matchMedia("(prefers-color-scheme: dark)")
   .addEventListener("change", (event) => {
     if (event. matches) {
     } // dark mode
   });
```

## Randomly shuffle the array

---

Get a random number through `0.5`-`Math.random()`, and then use `sort` twice to sort and disrupt more thoroughly, but this method is actually not random enough. If it is an enterprise-level application, it is recommended to use the second shuffling algorithm

```js
shuffle(arr) {
       return arr.sort(() => 0.5 - Math.random()).sort(() => 0.5 - Math.random());
  },
function shuffle(arr) {
   for (let i = arr. length - 1; i > 0; i--) {
     const randomIndex = Math. floor(Math. random() * (i + 1))
     ;[arr[i], arr[randomIndex]] = [arr[randomIndex], arr[i]]
   }
   return arr
}
```

## Randomly get a Boolean value

---

The same as the previous principle, through random number acquisition, the interval of `Math.random()` is `0-0.99`, with `0.5` in the middle of 50% probability

```js
function randomBool() {
   return 0.5 - Math. random();
}
```

## Move the last item of the array to the first item

---

```js
function (arr){
     return arr. push(arr. shift());
}
```

## Put the first item of the array into the last item

---

```js
function(arr){
   return arr. unshift(arr. pop());
}
```

## Use the set array to deduplicate

---

```js
function uniqueArr(arr) {
   return [...new Set(arr)];
}
```

## dom node smooth scroll to but area, top, bottom

---

The original `scrollTo` method has no animation, similar to anchor point jumping, which is relatively blunt, and this method will have a smooth transition effect

```js
function scrollTo(element) {
   element.scrollIntoView({ behavior: "smooth", block: "start" }); // top
   element.scrollIntoView({ behavior: "smooth", block: "end" }); // bottom
   element.scrollIntoView({ behavior: "smooth" }); // visible area
}
```

## get random color

---

In daily life, we often need to obtain a random color, which can be done by random number

```js
function getRandomColor() {
   return `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;
}
```

## Check if it is an empty object

---

You can judge whether it is an empty array by using the `Reflect` static method of Es6 to judge its length, or you can judge by `Object.keys()`

```js
function isEmpty(obj) {
   return Reflect.ownKeys(obj).length === 0 && obj.constructor === Object;
}
```

## Boolean conversion

---

In some scenarios, we will define `boolean` values as scenarios, but non-empty strings in js will be considered `true`

```js
function toBoolean(value, truthyValues = ["true"]) {
   const normalizedValue = String(value).toLowerCase().trim();
   return truthyValues. includes(normalizedValue);
}
toBoolean("TRUE"); // true
toBoolean("FALSE"); // false
toBoolean("YES", ["yes"]); // true
```

## Various array cloning methods

---

There are actually many methods of array cloning, see if there are any you haven't seen!

```js
const clone = (arr) => arr. slice(0);
const clone = (arr) => [...arr];
const clone = (arr) => Array. from(arr);
const clone = (arr) => arr. map((x) => x);
const clone = (arr) => JSON. parse(JSON. stringify(arr));
const clone = (arr) => arr. concat([]);
const clone = (arr) => structuredClone(arr);
```

## Compare two time sizes

---

Get the timestamp comparison by calling `getTime`

```js
function compare(a, b) {
   return a.getTime() > b.getTime();
}
```

## Calculate the difference in months between two times

---

```js
function monthDiff(startDate, endDate) {
   return Math.max(
     0,
     (endDate. getFullYear() - startDate. getFullYear()) * 12 -
       startDate. getMonth() +
       endDate. getMonth()
   );
}
```

## Extract the year, month, day, hour, minute, and second from the time in one step

---

Time formatting is easy to solve, and the year, month, day, hour, minute, second, and millisecond can be obtained in one step. Since `toISOString` will lose the time zone, the time difference will be eight hours, so we can add eight hours before formatting

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

## Determine whether a parameter is a function

---

Sometimes our method needs to pass in a function callback, but we need to detect its type. We can detect it through the prototype method of `Object`. Of course, this method can accurately detect any type.

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

## Calculate the distance between two coordinates

---

```js
function distance(p1, p2){
     return `Math.sqrt(Math.pow(p2.x - p1.x, 2) + Math.pow(p2.y - p1.y, 2));
}
```

## Check if two dom nodes overlap

---

In some scenarios, we need to judge whether the dom has collided or overlapped. We can get the `x1`, `y1`, `x2`, `y2` coordinates of the dom through `getBoundingClientRect` and then compare the coordinates to judge it.

```js
function overlaps = (a, b) {
    return (a.x1 < b.x2 && b.x1 < a.x2) || (a.y1 < b.y2 && b.y1 < a.y2);
}
```

## Determine whether it is a NodeJs environment

---

The daily development of the front-end is inseparable from nodeJs. By judging the global environment to detect whether it is a nodeJs environment

```js
function isNode() {
   return (
     typeof process !== "undefined" &&
     process.versions != null &&
     process.versions.node != null
   );
}
```

## Parameter summation

---

I saw before that there is a method of summing through the physical form of the function, and you can use `reduce` in one line

```js
function sum(...args) {
  args.reduce((a, b) => a + b);
}
```
