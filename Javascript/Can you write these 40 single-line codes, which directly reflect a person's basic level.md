---
title: Can you write these 40 single-line codes, which directly reflect a person's basic level! ! !
lang: en-US
author: XXXWeii
date: 2023-04-25 14:55:00
tags:
  - JavaScript
---

> Hello everyone, I am `XXXWeii👨🏻‍💻. Today I will share with you 40+ useful and practical `javascript` one-line codes, so that you will no longer be 996.

## array

------

### Generate an array

When you need to generate an array of 0-99
plan 1

```js
const createArr = (n) => Array. from(new Array(n), (v, i) => i)
const arr = createArr(100) // 0 - 99 array
```

Scenario 2

```js
const createArr = (n) => new Array(n).fill(0).map((v, i) => i)
createArr(100) // 0 - 99 array
```

### Shuffle the array

When you have an array, you need to shuffle the array

```js
const randomSort = list => list.sort(() => Math.random() - 0.5)
randomSort([0,1,2,3,4,5,6,7,8,9]) // arrange the results randomly
```

### Array deduplication

When you need to keep all duplicate elements in an array only one

```js
const removeDuplicates = list => [...new Set(list)]
removeDuplicates([0, 0, 2, 4, 5]) // [0,2,4,5]
```

### Intersection of multiple arrays

When you need to take the intersection of multiple arrays

```js
const intersection = (a, ...arr) => [...new Set(a)]. filter((v) => arr. every((b) => b. includes(v)))

intersection([1, 2, 3, 4], [2, 3, 4, 7, 8], [1, 3, 4, 9])
// [3, 4]
```

### Find the maximum index

But you need to find the index of the maximum value in an array

```js
const indexOfMax = (arr) => arr. reduce((prev, curr, i, a) => (curr > a[prev] ? i : prev), 0);
indexOfMax([1, 3, 9, 7, 5]); // 2
```

### Find the minimum value index

When you need to find the index of the minimum value in an array

```js
const indexOfMin = (arr) => arr. reduce((prev, curr, i, a) => (curr < a[prev] ? i : prev), 0)
indexOfMin([2, 5, 3, 4, 1, 0, 9]) // 5
```

### Find the closest value

When you need to find a closest value in an array

```js
const closest = (arr, n) => arr. reduce((prev, curr) => (Math. abs(curr - n) < Math. abs(prev - n) ? curr : prev))
closest([29, 87, 8, 78, 97, 20, 75, 33, 24, 17], 50) // 33
```

### Compress multiple arrays

When you need to compress multiple arrays into one

```js
const zip = (...arr) => Array.from({ length: Math.max(...arr.map((a) => a.length)) }, (_, i) => arr. map((a) => a[i]))
zip([1,2,3,4], ['a', 'b', 'c', 'd'], ['A', 'B', 'C', 'D'])
// [[1, 'a', 'A'], [2, 'b', 'B'], [3, 'c', 'C'], [4, 'd', 'D'] ]
```

### Matrix swap rows and columns

When you need to swap the rows and columns of a matrix

```js
const transpose = (matrix) => matrix[0]. map((col, i) => matrix. map((row) => row[i]));
transpose(
     [ // [
         [1, 2, 3], // [1, 4, 7],
         [4, 5, 6], // [2, 5, 8],
         [7, 8, 9], // [3, 6, 9],
      ] // ]
  );
```

## Number Conversion

------

### Hexadecimal Conversion

To convert decimal to n-ary, you can use toString(n)

```js
const toDecimal = (num, n = 10) => num.toString(n)
// Suppose the number 10 is to be converted to binary
toDecimal(10, 2) // '1010'
```

To convert base n to base 10, you can use parseInt(num, n)

```js
// The binary system of 10 is 1010
const toDecimalism = (num, n = 10) => parseInt(num, n)
toDecimalism(1010, 2)
```

## regular

------

### Phone number formatting

When you need to format the mobile phone number into the form of xxx-xxxx-xxxx

```js
const formatPhone = (str, sign = '-') => str.replace(/(\W|\s)/g, "").split(/^(\d{3})(\d{4} )(\d{4})$/).filter(item => item).join(sign)

formatPhone('13123456789') // '131-2345-6789'
formatPhone('13 1234 56 789', ' ') // '131 2345 6789'
```

### Remove extra spaces

When you need to combine multiple spaces in a piece of text into one space

```js
const setTrimOut = str => str.replace(/\s\s+/g, ' ')
const str = setTrimOut('hello, jack') //
```

## web

------

### Reload the current page

```js
const reload = () => location. reload();
reload()
```

### Scroll to the top of the page

If you need to flip the page to the very top

```js
const goToTop = () => window. scrollTo(0, 0);
goToTop()
```

### Element scrolling

If you want to scroll an element smoothly to the beginning of the visible area

```js
const scrollToTop = (element) =>
   element.scrollIntoView({ behavior: "smooth", block: "start" })
scrollToTop(document. body)
```

If you want to scroll an element smoothly to the end of the visible area

```js
const scrollToBottom = (element) =>
   element.scrollIntoView({ behavior: "smooth", block: "end" })
   scrollToBottom(document. body)
```

### Check whether the current IE browser

```js
const isIE = !!document.documentMode;
```

### Strip html from given text

When you need to filter out all the tags in a certain text

```js
const stripHtml = (html) => new DOMParser().parseFromString(html, 'text/html').body.textContent || '';
stripHtml('<div>test</div>') // 'test'
```

### Redirection

when you need to jump to other pages

```js
const goTo = (url) => (location. href = url);
```

### Text Paste

When you need to copy text to the clipboard

```js
const copy = (text) => navigator.clipboard?.writeText && navigator.clipboard.writeText(text)
copy('the text you need to paste')
```

## date

------

### Determine whether the date is today

```js
const isToday = (date) => date.toISOString().slice(0, 10) === new Date().toISOString().slice(0, 10)
```

### date conversion

When you need to convert date to YYYY-MM-DD format

```js
const formatYmd = (date) => date.toISOString().slice(0, 10);
formatYmd(new Date())
```

### Second conversion

When you need to convert seconds to hh:mm:ss format

```js
const formatSeconds = (s) => new Date(s * 1000).toISOString().substr(11, 8)
formatSeconds(200) // 00:03:20
```

### Get the first day of a certain year and month

When you need to get the first day of a certain year and month

```js
const getFirstDate = (d = new Date()) => new Date(d. getFullYear(), d. getMonth(), 1);
getFirstDate(new Date('2022-04')) // Fri Apr 01 2022 00:00:00 GMT+0800 (China Standard Time)
```

### Get the last day of a certain year and month

When you need to get the last day of a certain year and month

```js
const getLastDate = (d = new Date()) => new Date(d. getFullYear(), d. getMonth() + 1, 0);
getLastDate(new Date('2023-03-04')) // Fri Mar 31 2023 00:00:00 GMT+0800 (China Standard Time)
```

### Get the number of days in a year, month and month

When you need to get the total number of days in a certain month of a certain year

```js
const getDaysNum = (year, month) => new Date(year, month, 0).getDate()
const day = getDaysNum(2024, 2) // 29
```

## function

------

### Asynchronous function judgment

Determine whether a function is an asynchronous function

```js
const isAsyncFunction = (v) => Object.prototype.toString.call(v) === '[object AsyncFunction]'
isAsyncFunction(async function () {}); // true
```

## number

------

### Truncating Numbers

When you need to truncate some numbers after the decimal point without rounding

```js
const toFixed = (n, fixed) => `${n}`.match(new RegExp(`^-?\d+(?:.\d{0,${fixed}})?`))[0]
toFixed(10.255, 2) // 10.25
```

### rounding

When you need to truncate some numbers after the decimal point, and take rounding

```js
const round = (n, decimals = 0) => Number(`${Math. round(`${n}e${decimals}`)}e-${decimals}`)
round(10.255, 2) // 10.26
```

### Zero padding

When you need to pad the front with zeros when a number num is less than len digits

```js
const replenishZero = (num, len, zero = 0) => num.toString().padStart(len, zero)
replenishZero(8, 2) // 08
```

## object

------

### Remove invalid attributes

When you need to delete all properties in an object whose property value is null or undefined

```js
const removeNullUndefined = (obj) => Object.entries(obj).reduce((a, [k, v]) => (v == null ? a : ((a[k] = v), a)), {});

removeNullUndefined({name: '', age: undefined, sex: null}) // { name: '' }
```

### Invert object key value

When you need to exchange key-value pairs of objects

```js
const invert = (obj) => Object. keys(obj). reduce((res, k) => Object. assign(res, { [obj[k]]: k }), {})
invert({name: 'jack'}) // {jack: 'name'}
```

### Convert string to object

When you need to convert a string of strings such as '{name: "jack"}' into an object, using JSON.parse directly will report an error.

```js
const strParse = (str) => JSON.parse(str.replace(/(\w+)\s*:/g, (_, p1) => `"${p1}":`).replace(/\ '/g, "\""))

strParse('{name: "jack"}')
```

## other

------

### Comparing two objects

When you need to compare two objects, js equals can only judge whether the addresses of the objects are the same. When the addresses are different, it cannot judge whether the key-value pairs of the two objects are consistent.

```js
const isEqual = (...objects) => objects.every(obj => JSON.stringify(obj) === JSON.stringify(objects[0]))
isEqual({name: 'jack'}, {name: 'jack'}) // true
isEqual({name: 'jack'}, {name: 'jack1'}, {name: 'jack'}) // false
```

### Random color generation

when you need to get a random color

```js
const getRandomColor = () => `#${Math.floor(Math.random() * 0xffffff).toString(16)}`
getRandomColor() // '#4c2fd7'
```

### Color format conversion

When you need to convert hexadecimal color to rgb

```js
const hexToRgb = hex => hex.replace(/^#?([a-f\d])([a-f\d])([a-f\d])$/i, (_, r, g, b) => `#${r}${r}${g}${g}${b}${b}`).substring(1).match(/.{2}/g).map((x) => parseInt(x, 16));
hexToRgb('#00ffff'); // [0, 255, 255]
hexToRgb('#0ff'); // [0, 255, 255]
```

### Get random ip

when you need to generate an ip address

```js
const randomIp = () =>
     Array(4)
         .fill(0)
         .map((_, i) => Math.floor(Math.random() * 255) + (i === 0 ? 1 : 0))
         .join('.');
```

###uuid

when you need to generate an id

```js
const uuid = (a) => (a ? (a ^ ((Math. random() * 16) >> (a / 4))).toString(16) : ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, uuid))
uuid()
```

### Get cookies

When you need to convert cookie to object

```js
const getCookie = () => document.cookie
     .split(';')
     .map((item) => item.split('='))
     .reduce((acc, [k, v]) => (acc[k.trim().replace('"', '')] = v) && acc, {})

getCookie()
```

### Forced wait

When you need to wait for a while, but don't want to write in the setTimeout function, causing callback hell

```js
const sleep = async (t) => new Promise((resolve) => setTimeout(resolve, t));
sleep(2000).then(() => {console.log('time')});
```

> This article is reproduced from: https://juejin.cn/post/7228449980108423224 Author: simple_lau
