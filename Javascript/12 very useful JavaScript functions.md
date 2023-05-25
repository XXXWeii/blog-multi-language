---
title: 12 very useful JavaScript functions
lang: en-US
date: 2023-04-05 14:55:00
author: XXXWeii
tags:
  - JavaScript
---

## Generate random colors

---

Does your website need to generate random colors? The following line of code will do it.

```js
const generateRandomHexColor = () =>
   `#${Math.floor(Math.random() * 0xffffff).toString(16)}`;

console.log(generateRandomHexColor());
```

## Array reordering

---

Reordering the elements of an array is a very important skill, but there is no such function in native Array.

```js
const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);

const arr = [1, 2, 3, 4, 5];
console.log(shuffle(arr));
```

## copy to clipboard

---

Copy to clipboard is a very useful function that improves user convenience.

```js
const copyToClipboard = (text) =>
   navigator. clipboard &&
   navigator.clipboard.writeText &&
   navigator.clipboard.writeText(text);

copyToClipboard("Hello World!");
```

## Detect dark theme

---

The dark theme is becoming more and more popular, and many users will enable the case mode in the device. We can improve the user experience by switching the application to the dark theme.

```js
const isDarkMode = () =>
   window.matchMedia &&
   window.matchMedia("(prefers-color-scheme: dark)").matches;

console.log(isDarkMode());
```

## scroll to top

---

The easiest way to scroll an element to the top is to use `scrollIntoView`. Set `block` to `start` to scroll to the top; set `behavior` to `smooth` to enable smooth scrolling.

```js
const scrollToTop = (element) =>
   element.scrollIntoView({ behavior: "smooth", block: "start" });
```

## scroll to bottom

---

Like scrolling to the top, scrolling to the bottom only needs to set `block` to `end`.

```js
const scrollToBottom = (element) =>
   element.scrollIntoView({ behavior: "smooth", block: "end" });
```

## Check if the element is on screen

---

The best way to check if an element is in a window is to use `IntersectionObserver`.

```js
const callback = (entries) => {
   entries. forEach((entry) => {
     if (entry. isIntersecting) {
       // `entry.target` is the dom element
       console.log(`${entry.target.id} is visible`);
     }
   });
};

const options = {
   threshold: 1.0,
};
const observer = new IntersectionObserver(callback, options);
const btn = document. getElementById("btn");
const bottomBtn = document. getElementById("bottom-btn");
observer. observe(btn);
observer. observe(bottomBtn);
```

## Testing Equipment

---

Use `navigator.userAgent` to detect which platform device the website is running on.

```js
const detectDeviceType = () =>
   /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
     navigator. userAgent
   )
     ? "Mobile"
     : "Desktop";

console.log(detectDeviceType());
```

## hide element

---

We can set the `style.visibility` of the element to `hidden` to hide the visibility of the element, but the space of the element will still be occupied. Setting an element's `style.display` to `none` will remove the element from the rendering stream.

```js
const hideElement = (el, removeFromFlow = false) => {
   removeFromFlow
     ? (el. style. display = "none")
     : (el. style. visibility = "hidden");
};
```

## Get parameters from the URL

---

There is a URL object in JavaScript, through which the parameters in the URL can be obtained very conveniently.

```js
const getParamByUrl = (key) => {
   const url = new URL(location.href);
   return url. searchParams. get(key);
};
```

## deep copy object

---

Deep copying an object is very simple, first convert the object to a string, and then convert it to an object.

```js
const deepCopy = (obj) => JSON. parse(JSON. stringify(obj));
```

In addition to the API utilizing JSON, there is a newer structuredClone API for deep copying objects, but it is not supported in all browsers.

```
structuredClone(obj)
```

## wait function

---

JavaScript provides the `setTimeout` function, but it does not return a Promise object, so we cannot use `async` to act on this function, but we can encapsulate the waiting function.

```js
const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const asyncFn = async () => {
   await wait(1000);
   console.log("Waiting for the end of the asynchronous function execution");
};

asyncFn();
```
