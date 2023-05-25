---
title: 20 JavaScript Array Methods You Must Know
lang: en-US
date: 2023-04-02 14:55:00
author: XXXWeii
tags:
  - JavaScript
---

The `Array` object in JavaScript, like arrays in other programming languages, can store a collection of multiple items under a single variable name, and has members for performing common array operations.

## declare array

---

There are two different ways to declare arrays.

### Using new Array

With `new Array`, we can specify the elements we want to be in the array, like this:

```js
const fruits = new Array("Apple", "Banana");
console.log(fruits.length);
```

### Array Literal Notation

Using an array literal declaration, we can specify the values that the array will have. If we don't declare any value, the array will be empty.

```js
// Create a 'fruits' array with 2 elements from the array literal.
const fruits = ["Apple", "Banana"];
console.log(fruits.length);
```

The following is the method list and description of `Array` object.

## 1. forEach

---

The `forEach()` method will execute the specified function once for each array element.

`forEach()` calls the provided `callbackFn` function once for each element in the array, in ascending index order. It will not be called for deleted or uninitialized indexed properties.

```js
array.forEach(callback[, thisObject]);
const array1 = ['a', 'b', 'c'];

array1.forEach(element => console.log(element));

// expected output: "a"
// expected output: "b"
// expected output: "c"
```

## 2. map

---

The `Array.map()` method allows you to iterate over the array and modify its elements using a callback function. The callback function will then be executed on each element of the array.

```js
array. map(callback[, thisObject]);
let arr = [3, 4, 5, 6];

let modifiedArr = arr. map(function(element){
     return element *3;
});

console.log(modifiedArr); // [9, 12, 15, 18]
```

The `Array.map()` method is typically used to apply some change to an element, whether it is multiplying by a specific number like in the code above, or performing any other operation the application may require.

## 3. concat

---

The `concat()` method in JavaScript is a string method used to concatenate strings together. The `concat()` method appends one or more string values to the calling string and returns the result of the concatenation as a new string. Because the `concat()` method is a method of the `String` object, it must be called through a specific instance of the `String` class.

```js
array.concat(value1, value2, ..., valueN);
const array1 = ['a', 'b', 'c'];
const array2 = ['d', 'e', 'f'];
const array3 = array1.concat(array2);

console. log(array3);
// expected output: Array ["a", "b", "c", "d", "e", "f"]
```

## 4. push

---

The `push()` method in Javascript arrays appends the given element to the end of the array and returns the length of the new array.

If you want to add an element to the end of the array, use `push()`.

```js
array. push(element1, ..., elementN);
const countries = ["Nigeria", "Ghana", "Rwanda"];

countries. push("Kenya");

console.log(countries); // ["Nigeria","Ghana","Rwanda","Kenya"]
```

## 5. pop

---

The `pop()` method will remove the last element of the array and return that value to the caller. If you call `pop()` on an empty array, it will return `undefined`.

`Array.prototype.shift()` has similar behavior to `pop()`, but is applied to the first element in the array.

```js
array. pop();
const plants = ["broccoli", "cauliflower", "cabbage", "kale", "tomato"];

console.log(plants.pop());
// expected output: "tomato"

console.log(plants);
// expected output: Array ["broccoli", "cauliflower", "cabbage", "kale"]
```

## 6. splice

---

The `splice()` method is a generic method for changing the contents of an array by removing, replacing, or adding elements at a specified position in the array. This section describes how to use this method to add elements to specific positions.

```js
array.splice(index, howMany, [element1][, ..., elementN]);
const fruits = ["Banana", "Orange", "Apple", "Mango"];

fruits.splice(2, 0, "Lemon", "Kiwi"); //Banana,Orange,Lemon,Kiwi,Apple,Mango
```

## 7. slice

---

The `slice()` method returns a shallow copy of a portion of the array into a new array object selected from start to end (not including end), where start and end represent the indices of the items in that array. This method does not modify the original array.

```js
array. slice( begin [, end] );
const animals = ['ant', 'bison', 'camel', 'duck', 'elephant'];

console. log(animals. slice(2));
// expected output: Array ["camel", "duck", "elephant"]

console.log(animals.slice(2, 4));
// expected output: Array ["camel", "duck"]
```

## 8. shift

---

`shift()` is a built-in JavaScript function used to remove the first element from an array. The `shift()` function directly modifies the array being used. Also `shift()` returns the removed item in the array.

The `shift()` function deletes the item at index position 0, and shifts the value of the index number down by 1 in turn.

```js
array. shift();
const array1 = [1, 2, 3];

const firstElement = array1. shift();

console. log(array1);
// expected output: Array [2, 3]

console. log(firstElement);
// expected output: 1
```

## 9. unshift

---

The `unshift()` method will insert the given value at the beginning of the array-like object.

`Array.prototype.push()` has similar behavior to `unshift()`, but applied to the end of the array.

```js
array. unshift( element1, ..., elementN );
const array1 = [1, 2, 3];

console.log(array1.unshift(4, 5));
// expected output: 5

console. log(array1);
// expected output: Array [4, 5, 1, 2, 3]
```

## 10. join

---

The `join()` method in JavaScript arrays is a built-in method that creates and returns a new string by concatenating all elements of the array. The `join()` method will join the items of the array to a string and return that string. The specified delimiter is used to separate the elements of the array. The default separator is a comma (`,`).

```js
array.join(separator);
const elements = ["Fire", "Air", "Water"];

console.log(elements.join());
// expected output: "Fire,Air,Water"

console.log(elements.join(""));
// expected output: "FireAirWater"

console.log(elements.join("-"));
// expected output: "Fire-Air-Water"
```

## 11. every

---

The `every()` method tests whether all elements in the array satisfy the specified condition. Returns a boolean value.

```js
array. every(callback[, thisObject]);
const isBelowThreshold = (currentValue) => currentValue < 40;

const array1 = [1, 30, 39, 29, 10, 13];

console.log(array1.every(isBelowThreshold));
// expected output: true
```

## 12. filter

---

The `filter()` method creates a shallow copy of part of the given array, filtering down to the elements in the given array that pass the conditional test implemented by the provided function.

```js
array. filter(callback[, thisObject]);
const words = ['spray', 'limit', 'elite', 'exuberant', 'destruction', 'present'];

const result = words. filter(word => word. length > 6);

console. log(result);
// expected output: Array ["exuberant", "destruction", "present"]
```

## 13. indexOf

---

The `indexOf()` method returns the first index where the given element can be found in the array, or -1 if it does not exist.

```js
array. indexOf(searchElement[, fromIndex]);
const beasts = ['ant', 'bison', 'camel', 'duck', 'bison'];

console.log(beasts.indexOf('bison'));
// expected output: 1

// start from index 2
console.log(beasts.indexOf('bison', 2));
// expected output: 4

console.log(beasts.indexOf('giraffe'));
// expected output: -1
```

## 14. reduce

---

The `reduce()` method executes the user-supplied `reducer` callback function on each element of the array in order, passing in the computed return value of the previous element. The end result of running the reducer on all elements of the array is a single value.

```js
array. reduce(callback[, initialValue]);
const array1 = [1, 2, 3, 4];

// 0 + 1 + 2 + 3 + 4
const initialValue = 0;
const sumWithInitial = array1. reduce(
   (previousValue, currentValue) => previousValue + currentValue,
   initialValue
);

console.log(sumWithInitial)
```

## 15. reverse

---

The `reverse()` method will reverse the array and return a reference to the same array, with the first array element becoming the last and the last array element becoming the first. In other words, the order of elements in the array will be turned in the opposite direction from before.

```js
array. reverse();
const array1 = ["one", "two", "three"];
console.log("array1:", array1);
// expected output: "array1:" Array ["one", "two", "three"]

const reversed = array1. reverse();
console.log("reversed:", reversed);
// expected output: "reversed:" Array ["three", "two", "one"]

// Careful: reverse is destructive -- it changes the original array.
console.log("array1:", array1);
// expected output: "array1:" Array ["three", "two", "one"]
```

## 16.sort

---

The `sort()` method sorts the elements of an array in-place and returns a reference to the same array, while the array is sorted at this time. The default sort order is ascending, the elements are converted to strings, and their sequences of UTF-16 code unit values are compared.

```js
array. sort(compareFunction);
const months = ["March", "Jan", "Feb", "Dec"];
months. sort();
console. log(months);
// expected output: Array ["Dec", "Feb", "Jan", "March"]

const array1 = [1, 30, 4, 21, 100000];
array1. sort();
console. log(array1);
// expected output: Array [1, 100000, 21, 30, 4]
```

## 17. toString

---

The `toString()` method returns a string representing the object.

```js
array.toString();
function Dog(name) {
   this.name = name;
}

const dog1 = new Dog("Gabby");

Dog.prototype.toString = function dogToString() {
   return `${this.name}`;
};

console.log(dog1.toString());
// expected output: "Gabby"
```

## 18. at

---

The `at()` method accepts an integer value and returns the item at index, both positive and negative. Negative integers count down from the last item in the array.

```js
array.at(index);
const array1 = [5, 12, 8, 130, 44];

let index = 2;

console. log(
   `Using an index of ${index} the item returned is ${array1.at(index)}`
);
// expected output: "Using an index of 2 the item returned is 8"

index = -2;

console.log(`Using an index of ${index} item returned is ${array1.at(index)}`);
// expected output: "Using an index of -2 item returned is 130"
```

## 19. find

---

The `find()` method returns the first element in the array that satisfies the conditional test function. Return `undefined` if no value satisfies the provided test function.

```js
array. find(function(currentValue, index, arr), thisValue)
const array1 = [5, 12, 8, 130, 44];

const found = array1. find(element => element > 10);

console. log(found);
// expected output: 12
```

## 20.some

---

The `some()` method tests whether at least one element in the array passes the conditional test implemented by the function. Return `true` if such an element is found in the array; otherwise return `false`. This method does not modify the original array.

```js
array.some(callback[, thisObject]);
const array = [1, 2, 3, 4, 5];

// checks whether an element is even
const even = (element) => element % 2 === 0;

console. log(array. some(even));
// expected output: true
```

Thanks for reading everyone!
