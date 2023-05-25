---
title: 19 JavaScript single-line codes that improve work efficiency
lang: en-US
author: XXXWeii
date: 2023-05-23 13:42:00
tags:
  - JavaScript
---

## **1.# Generate a random string**

------

When we need a unique id, it is not too convenient to create a random string through `Math.random`! ! !

```js
const randomString = () => Math. random(). toString(36). slice(2)
randomString() // gi1qtdego0b
randomString() // f3qixv40mot
randomString() // eeelv1pm3ja
```

## 2.# Escape HTML special characters

------

One of the solutions to XSS is to escape HTML.

```js
const escape = (str) => str.replace(/[&<>"']/g, (m) => ({ '&': '&amp;', '<': '&lt;', '> ': '&gt;', '"': '&quot;', "'": '&#39;' }[m]))
escape('<div class="medium">Hi Medium.</div>')
// &lt;div class=&quot;medium&quot;&gt;Hi Medium.&lt;/div&gt
```

## 3.# Capitalize the first letter of the word

------

```js
const uppercaseWords = (str) => str.replace(/^(.)|\s+(.)/g, (c) => c.toUpperCase())
uppercaseWords('hello world'); // 'Hello World'
```

## 4.# Convert the string to camel case

------

```js
const toCamelCase = (str) => str.trim().replace(/[-_\s]+(.)?/g, (_, c) => (c ? c.toUpperCase() : '') );
toCamelCase('background-color'); // backgroundColor
toCamelCase('-webkit-scrollbar-thumb'); // WebkitScrollbarThumb
toCamelCase('_hello_world'); // HelloWorld
toCamelCase('hello_world'); // helloWorld
```

## 5.# Delete duplicate values in the array

------

Thanks to ES6, it is very convenient to use the Set data type to deduplicate arrays.

```js
const removeDuplicates = (arr) => [...new Set(arr)]
console.log(removeDuplicates([1, 2, 2, 3, 3, 4, 4, 5, 5, 6]))
// [1, 2, 3, 4, 5, 6]
```

## 6.# Flatten an array

------

```js
const flat = (arr) =>
     [].concat.apply(
         [],
         arr. map((a) => (Array. isArray(a) ? flat(a) : a))
     )
// Or
const flat = (arr) => arr.reduce((a, b) => (Array.isArray(b) ? [...a, ...flat(b)] : [...a, b] ), [])
flat(['cat', ['lion', 'tiger']]) // ['cat', 'lion', 'tiger']
```

## 7.# Remove false values from the array

------

```js
const removeFalsy = (arr) => arr. filter(Boolean)
removeFalsy([0, 'a string', '', NaN, true, 5, undefined, 'another string', false])
// ['a string', true, 5, 'another string']
```

## 8.# Confirm whether a number is odd or even

------

```js
const isEven = num => num % 2 === 0
isEven(2) // true
isEven(1) // false
```

## 9.# Get a random number between two numbers

------

```js
const random = (min, max) => Math. floor(Math. random() * (max - min + 1) + min)
random(1, 50) // 25
random(1, 50) // 34
```

## 10.# Calculate the average

------

```js
const average = (...args) => args. reduce((a, b) => a + b) / args. length;
average(1, 2, 3, 4, 5); // 3
```

## 11.# Truncate numbers to a fixed decimal point

------

```js
const round = (n, d) => Number(Math. round(n + "e" + d) + "e-" + d)
round(1.005, 2) //1.01
round(1.555, 2) //1.56
```

## 12.# Calculate the number of days between two dates

------

```js
const diffDays = (date, otherDate) => Math.ceil(Math.abs(date - otherDate) / (1000 * 60 * 60 * 24));
diffDays(new Date("2021-11-3"), new Date("2022-2-1")) // 90
```

## 13.# Get the day of the year from the date

------

```js
const dayOfYear = (date) => Math. floor((date - new Date(date. getFullYear(), 0, 0)) / (1000 * 60 * 60 * 24))
dayOfYear(new Date()) // 74
```

## 14.# Get a random color value

------

```js
const randomColor = () => `#${Math. random(). toString(16). slice(2, 8). padEnd(6, '0')}`
randomColor() // #9dae4f
randomColor() // #6ef10e
```

## 15.# Convert RGB color to hexadecimal color value

------

```js
const rgbToHex = (r, g, b) => "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
rgbToHex(255, 255, 255) // '#ffffff'
```

## 16.# Clear all cookies

------

```js
const clearCookies = () => document.cookie.split(';').forEach((c) => (document.cookie = c.replace(/^ +/, '').replace(/=.*/ , `=;expires=${new Date().toUTCString()};path=/`)))
```

## 17.# Detect dark mode

------

```js
const isDarkMode = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
```

## 18.# Swap the values of two variables

------

```js
[foo, bar] = [bar, foo]
```

## 19.# Pause for a while

------

```js
const pause = (millis) => new Promise(resolve => setTimeout(resolve, millis))
const fn = async () => {
   await pause(1000)
   console.log('fatfish') // 1s later
}
fn()
```
