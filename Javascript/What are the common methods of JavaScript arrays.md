---
title: What are the common methods of JavaScript arrays
lang: en-US
date: 2022-03-29 17:12:00
author: XXXWeii
tags:
  - JavaScript
---

![JavaScript数组的常用方法有哪些](./images//JavaScriptArray.png "JavaScript数组的常用方法有哪些")

## 1. Operation method

---

The basic operations of an array can be summarized as adding, deleting, modifying, and checking. It is necessary to pay attention to which methods will affect the original array and which methods will not

The following is a summary of the common operation methods of arrays.

<b>Increase</b>

The first three below are adding methods that affect the original array, and the fourth one will not affect the original array

- push()
- unshift()
-splice()
-concat()

push()

The `push()` method accepts any number of arguments and adds them to the end of the array, returning the latest length of the array

```js
const colors = []; // create an array
const count = colors.push("red", "green"); //Input two items from the end of the array
console.log(`count:${count}`);
```

unshift()

`unshift()` adds any number of values at the beginning of the array, then returns the new array length

```js
const colors = new Array(); // create an array
const count = colors.unshift("red", "green"); //Input two items from the beginning of the array
console.log(`count:${count}`);
```

splice()

`splice()` passes in three parameters, which are the start position, 0 (the number of elements to be deleted), and the inserted element, and returns an empty array

```js
const colors = ["red", "green", "blue"];
const removed = colors. splice(1, 0, "yellow", "orange");
console.log(colors); // red,yellow,orange,green,blue
console. log(removed); // []
```

concat()

`concat()` will first create a copy of the current array, then append its parameters to the end of the copy, and finally return this newly constructed array without affecting the original array

```js
const colors = ["red", "green", "blue"];
const colors2 = colors. concat("yellow", ["black", "brown"]);
console.log(colors); // ["red", "green","blue"]
console.log(colors2); // ["red", "green", "blue", "yellow", "black", "brown"]
```

<b>Delete</b>

The following three will affect the original array, and the last item will not affect the original array:

- pop()
-shift()
-splice()
- slice()

pop()

The `pop()` method is used to delete the last item of the array, reduce the `length` value of the array, and return the deleted item

```js
const colors = ["red", "green"];
const item = colors.pop(); // Get the last item
console.log(item); // green
console.log(colors.length); // 1
```

shift()

The `shift()` method is used to delete the first item of the array, reduce the `length` value of the array, and return the deleted item

```js
const colors = ["red", "green"];
const item = colors.shift(); // get the first item
console.log(item); // red
console.log(colors.length); // 1
```

splice()

`splice()` passes in two parameters, which are the starting position and the number of deleted elements, and returns an array containing deleted elements

```js
const colors = ["red", "green", "blue"];
const removed = colors.splice(0, 1); // remove the first item
console.log(colors); //green,blue
console.log(removed); // red, an array with only one element
```

slice()

`slice()` is used to create a new array containing one or more elements from the original array, without affecting the original array

```js
const colors = ["red", "green", "blue", "yellow", "purple"];
const colors2 = colors. slice(1);
const colors3 = colors. slice(1, 4);
console.log(colors); // red,green,blue,yellow,purple
concole.log(colors2); //green,blue,yellow,purple
concole.log(colors3); //green,blue,yellow
```

<b>Change</b>

That is to modify the contents of the original array, commonly used `splice`

`splice()` passes in three parameters, which are the starting position, the number of elements to be deleted, and any number of elements to be inserted, and return the array of deleted elements, which will affect the original array

```js
const colors = ["red", "green", "blue"];
const removed = colors.splice(1, 1, "red", "purple"); // insert two values, remove one element
console.log(colors); // red,red,purple,blue
console.log(removed); // green, an array with only one element
```

<b>Check</b>

That is, find the element and return the element coordinate or element value

- indexOf()
- includes()
- find()

indexOf()

Returns the position of the element to be found in the array, or -1 if not found

```js
const numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
numbers. indexOf(4); // 3
```

includes()

Returns the position of the element to be found in the array, if found returns `true`, otherwise `false`

```js
const numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
numbers. includes(4); // true
```

find()

returns the first matching element

```js
const people = [
   {
     name: "Matt",
     age: 27,
   },
   {
     name: "Nicholas",
     age: 29,
   },
];
people. find((element, index, array) => element. age < 28); // // {name: "Matt", age: 27}
```

## 2. Sorting method

---

Arrays have two methods that can be used to reorder elements:

-reverse()
- sort()

<b>reverse()</b>

As the name suggests, reverse array elements

```js
const values = [1, 2, 3, 4, 5];
values. reverse();
alert(values); // 5,4,3,2,1
```

<b>sort()</b>

The sort() method accepts a comparison function to determine which value should come first

```js
function compare(value1, value2) {
   if (value1 < value2) {
     return -1;
   } else if (value1 > value2) {
     return 1;
   } else {
     return 0;
   }
}
const values = [0, 1, 5, 10, 15];
values. sort(compare);
alert(values); // 0,1,5,10,15
```

## 3. conversion method

---

Common conversion methods are:

<b>join()</b>

The join() method takes one argument, the string delimiter, and returns a string containing all items

```js
const colors = ["red", "green", "blue"];
alert(colors. join(",")); // red, green, blue
alert(colors. join("||")); // red||green||blue
```

## 4. iterative method

---

The methods commonly used to iterate arrays (without changing the original array) are as follows:

-some()
- every()
- forEach()
- filter()
- map()

some()

Runs the passed function on each item in the array, and returns true if one of the functions returns true

```js
const numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
const someResult = numbers.some((item, index, array) => item > 2);
console. log(someResult); // true
```

every()

Runs the passed function on each item of the array, and returns true if the function returns true for each item

```js
const numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
const everyResult = numbers.every((item, index, array) => item > 2);
console. log(everyResult); // false
```

forEach()

Runs the passed function on each item in the array, returns no value

```js
const numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
numbers. forEach((item, index, array) => {
   // do something
});
```

filter()

Run the incoming function on each item of the array, and the items that the function returns true will form the array and return

```js
const numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
const filterResult = numbers. filter((item, index, array) => item > 2);
console.log(filterResult); // 3,4,5,4,3
```

map()

Runs the passed function on each item in the array, returning an array consisting of the results of each function call

```js
const numbers = [1, 2, 3, 4, 5, 4, 3, 2, 1];
const mapResult = numbers.map((item, index, array) => item * 2);
console.log(mapResult); // 2,4,6,8,10,8,6,4,2
```
