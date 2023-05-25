---
title: 7 JavaScript shorthand tricks you must know
lang: en-US
date: 2023-04-01 14:55:00
author: XXXWeii
tags:
  - JavaScript
---

This article will cover a plethora of JavaScript shorthand optimization tips that can help you write better code.

## 1. Multiple string checks

---

Usually, if we need to check whether a string is equal to one of several values, we tend to get tired very quickly. Luckily, JavaScript has a built-in method to help you with this.

```js
// normal writing
const isVowel = (letter) => {
   if (
     letter === "a" ||
     letter === "e" ||
     letter === "i" ||
     letter === "o" ||
     letter === "u"
   ) {
     return true;
   }
   return false;
};

// shorthand method
const isVowel = (letter) => ["a", "e", "i", "o", "u"]. includes(letter);
```

## 2. For-of and For-in loops

---

`For-of` and `For-in` loops are a great way to iterate over `array` or `object`, since there is no need to manually keep track of the index of the `object` keys.

```js
For-of
const arr = [1, 2, 3, 4, 5];

// normal writing
for (let i = 0; i < arr. length; i++) {
   const element = arr[i];
   //...
}

// shorthand method
for (const element of arr) {
   //...
}
For-in
const obj = {
   a: 1,
   b: 2,
   c: 3,
};

// normal writing
const keys = Object. keys(obj);
for (let i = 0; i < keys. length; i++) {
   const key = keys[i];
   const value = obj[key];
   //...
}

// shorthand method
for (const key in obj) {
   const value = obj[key];
   //...
}
```

## 3. Falsey (false value) check

---

If you want to check whether a variable is `null`, `undefined`, `0`, `false`, `NaN` or an empty `string`, you can use the logical NOT (`!`) operator to check all variables at once without writing multiple conditions. This makes it relatively easy to check whether a variable contains valid data.

```js
// normal writing
const isFalsey = (value) => {
   if (
     value === null ||
     value === undefined ||
     value === 0 ||
     value === false ||
     value === NaN ||
     value === ""
   ) {
     return true;
   }
   return false;
};

// shorthand method
const isFalsey = (value) => !value;
```

## 4. Ternary operator

---

As a JavaScript developer, you must have come across the ternary operator. This is a great way to write concise `if-else` statements. However, it can also be used to write concise code, and even chain them to check multiple conditions.

```js
// normal writing
let info;
if (value < minValue) {
   info = "Value is too small";
} else if (value > maxValue) {
   info = "Value is too large";
} else {
   info = "Value is in range";
}

// shorthand method
const info =
   value < minValue
     ? "Value is too small"
     : value > maxValue
     ? "Value is too large"
     : "Value is in range";
```

## 5. Function call

---

With the help of the ternary operator, you can also determine which function to call based on a condition.

> Note: The `call signature` of the functions must be the same, otherwise errors may be encountered.

```js
function f1() {
   //...
}
function f2() {
   //...
}

// normal writing
if (condition) {
   f1();
} else {
   f2();
}

// shorthand method
(condition ? f1 : f2)();
```

## 6. Shorthand for Switch

---

Often we can optimize long `switch` statements by using objects with keys as `switch` conditions and values as return values.

```js
const dayNumber = new Date(). getDay();

// normal writing
let day;
switch (dayNumber) {
   case 0:
     day = "Sunday";
     break;
   case 1:
     day = "Monday";
     break;
   case 2:
     day = "Tuesday";
     break;
   case 3:
     day = "Wednesday";
     break;
   case 4:
     day = "Thursday";
     break;
   case 5:
     day = "Friday";
     break;
   case 6:
     day = "Saturday";
}

// shorthand method
const days = {
   0: "Sunday",
   1: "Monday",
   2: "Tuesday",
   3: "Wednesday",
   4: "Thursday",
   5: "Friday",
   6: "Saturday",
};
const day = days[dayNumber];
```

## 7. Fallback value

---

The `||` operator can set a fallback value for a variable.

```js
// normal writing
let name;
if (user?.name) {
   name = user.name;
} else {
   name = "Anonymous";
}

// shorthand method
const name = user?.name || "Anonymous";
```

This article is over, thanks for reading!
