---
title: 1000 if elses teach you how to achieve branch optimization
lang: en-US
date: 2023-02-19 16:01:00
author: XXXWeii
tags:
  - JavaScript
---

While surfing the web recently, I came across this piece of code:

```js
function getUserDescribe(name) {
   if (name === "Xiao Liu") {
     console.log("Brother Liu");
   } else if (name === "Xiaohong") {
     console.log("Little Red Sister");
   } else if (name === "Chen Long") {
     console.log("Master");
   } else if (name === "Li Long") {
     console.log("Master");
   } else if (name === "Dapeng") {
     console.log("wicked");
   } else {
     console.log("This person is quite mysterious!");
   }
}
```

At first glance, I don’t think there is anything abnormal, but if there are 1000 judgment conditions, is it possible to write 1000 `if` branches according to this writing method?

If you write a lot of `if` branches, and may also have **branch-in-branch**, it is conceivable that the readability and maintainability of the entire code will be greatly reduced, which is indeed a headache in actual development Question, is there any way to realize the requirements and avoid these problems?

## 1️⃣ Simple branch optimization

---

This involves **branch optimization**, let us change our thinking and optimize the above code structure:

```js
function getUserDescribe(name) {
   const describeForNameMap = {
     Xiao Liu: () => console.log("Brother Liu"),
     Xiaohong: () => console.log("Little Red Sister"),
     Chen Long: () => console.log("Master"),
     Li Long: () => console.log("Master"),
     Dapeng: () => console.log("wicked person"),
   };
   describeForNameMap[name]
     ? describeForNameMap[name]()
     : console.log("This person is quite mysterious!");
}
```

The judgments in the problem code are all simple **equality judgments**, then we can write these judgment conditions as an attribute into the object `describeForNameMap`, and the corresponding values of these attributes are the processing functions after the conditions are met.

After that, we only need to get the corresponding value in the `describeForNameMap` object through the parameters received by the `getUserDescribe` function, and run the value if it exists (because the value is a function).

In this way, the original `if` branch judgment is converted into a simple `key value` corresponding value, and the condition corresponds to the processing function one by one, which is clear at a glance.

## 2️⃣ Complex branch optimization

---

So what should we do if the judgment condition in our `if` branch is not just a simple equality judgment, but also has some expressions that need to be calculated? (As follows)

```js
function getUserDescribe(name) {
   if (name. length > 3) {
     console.log("The name is too long");
   } else if (name. length < 2) {
     console.log("The name is too short");
   } else if (name[0] === "Chen") {
     console.log("Xiao Chen");
   } else if (name[0] === "Li" && name !== "Li Peng") {
     console.log("Xiao Li");
   } else if (name === "Li Peng") {
     console.log("Administrator");
   } else {
     console.log("This person is quite mysterious!");
   }
}
```

For codes with this structure, objects cannot be introduced for branch optimization. We can introduce **two-dimensional array** for branch optimization:

```js
function getUserDescribe(name) {
   const describeForNameMap = [
     [
       (name) => name.length > 3, // judgment condition
       () => console.log("The name is too long"), // Execute the function
     ],
     [(name) => name.length < 2, () => console.log("The name is too short")],
     [(name) => name[0] === "Chen", () => console.log("Xiao Chen")],
     [(name) => name === "Dapeng", () => console.log("Administrator")],
     [(name) => name[0] === "Li" && name !== "Li Peng", () => console.log("Xiao Li")],
   ];
   // Get subarrays that meet the conditions
   const getDescribe = describeForNameMap. find((item) => item[0](name));
   // If the sub-array exists, run the second element in the sub-array (execute function)
   getDescribe ? getDescribe[1]() : console.log("This person is quite mysterious!");
}
```

Above we defined a `describeForNameMap` array, each element in the array represents a set of judgment conditions and its execution function (also an array), and then we use the `find` method of the array to find the `describeForNameMap` array that meets the judgment conditions sub-array.

## 3️⃣ Extract branch

---

The `describeForNameMap` object we defined in the above example is an independent structure, we can completely pull it out:

```js
const describeForNameMap = {
   Xiao Liu: () => console.log("Brother Liu"),
   Xiaohong: () => console.log("Little Red Sister"),
   Chen Long: () => console.log("Master"),
   Li Long: () => console.log("Master"),
   Dapeng: () => console.log("wicked person"),
};

function getUserDescribe(name) {
   describeForNameMap[name]
     ? describeForNameMap[name]()
     : console.log("This person is quite mysterious!");
}
const describeForNameMap = [
   [
     (name) => name.length > 3, // judgment condition
     () => console.log("The name is too long"), // Execute the function
   ],
   [(name) => name.length < 2, () => console.log("The name is too short")],
   [(name) => name[0] === "Chen", () => console.log("Xiao Chen")],
   [(name) => name === "Dapeng", () => console.log("Administrator")],
   [(name) => name[0] === "Li" && name !== "Li Peng", () => console.log("Xiao Li")],
];

function getUserDescribe(name) {
   // Get subarrays that meet the conditions
   const getDescribe = describeForNameMap. find((item) => item[0](name));
   // If the sub-array exists, run the second element in the sub-array (execute function)
   getDescribe ? getDescribe[1]() : console.log("This person is quite mysterious!");
}
```

> Through modular development, this `map` object can also be written into a separate `js` file, and then imported where it needs to be used.

## 4️⃣ Controversy

---

In this way, the entire `getUserDescribe` function becomes very concise, and some students may ask what is the use of this? Isn't this more troublesome? If you really think `if else` is not good-looking, then I just use `if return` instead of `else`:

```js
function getUserDescribe(name) {
   if (name === "Xiao Liu") {
     console.log("Brother Liu");
     return;
   }
   if (name === "Xiaohong") {
     console.log("Little Red Sister");
     return;
   }
   if (name === "Chen Long") {
     console.log("Master");
     return;
   }
   if (name === "Li Long") {
     console.log("Master");
     return;
   }
   if (name === "Dapeng") {
     console.log("wicked");
     return;
   }
   console.log("This person is quite mysterious!");
}
```

Just imagine, if you have 1000 judgment branches in your `getUserDescribe` function, and also have a large number of processing codes executed according to the judgment results, and the `getUserDescribe` function will return the value of the judgment result after processing.

At this time, the key point of the `getUserDescribe` function lies in the processing of the judgment result, not in the branch through which the result is obtained, for example:

```js
function getUserDescribe(name) {
   let str; // Store the judgment result
   if (name. length > 3) {
     str = "Name is too long";
   } else if (name. length < 2) {
     str = "Name is too short";
   } else if (name[0] === "Chen") {
     str = "Xiao Chen";
   } else if (name[0] === "Li" && name !== "Li Peng") {
     str = "Xiao Li";
   } else if (name === "Li Peng") {
     str = "Administrator";
   } else {
     str = "This person is more mysterious!";
   }
   // Some processing of the judgment result str
   //......
   console. log(str);
   return str;
}
```

If you do not perform branch optimization, the `getUserDescribe` function will be occupied by a large number of `if` branches, making the focus of the `getUserDescribe` function lost (the `getUserDescribe` function **focuses on the processing of the judgment result**, not It depends on which branch the result was obtained from), then you can look at our optimized code again:

```js
const describeForNameMap = [
   [(name) => name.length > 3, () => "name is too long"],
   [(name) => name.length < 2, () => "name is too short"],
   [(name) => name[0] === "Chen", () => "Xiao Chen"],
   [(name) => name === "Doc", () => "Administrator"],
   [(name) => name[0] === "Li" && name !== "Li Peng", () => "Xiao Li"],
];

function getUserDescribe(name) {
   let str; // Store the judgment result
   const getDescribe = describeForNameMap. find((item) => item[0](name));
   if (getDescribe) {
     str = getDescribe[1]();
   } else {
     str = "This person is more mysterious!";
   }
   // Some processing of the judgment result str
   //......
   console. log(str);
   return str;
}
```

Looking at the optimized `getUserDescribe` function, we can know that it gets a value from `describeForNameMap` and assigns it to `str` (we don't care how `describeForNameMap` returns the value), and then does something to `str` deal with. This highlights the key point of the `getUserDescribe` function (**processing the judgment result str**).

> In this example, the second element of the `describeForNameMap` sub-array can directly use a value: `[(name) => name.length > 3, "The name is too long"]`, but for the sake of overall code scalability It is recommended to use functions, because functions can receive parameters, which is convenient for more complex scenarios in the future.

## 🔼 Conclusion

---

**Branch optimization** has different implementation methods and application scenarios in various languages. This article introduces two ideas of code branch optimization through `JavaScript`. The implementation of the code is very simple, and the focus is on the application of this idea .

In fact, the issue of branch optimization has always been controversial, and there are currently two views:

- **Viewpoint 1**: There is no need to optimize it at all, and because the optimized code creates an additional `object/array`, searching for `object/array` is more useless than simple `if else` performance.
- **Viewpoint 2**: Branch-optimized code is more readable/maintainable, and the performance problems caused by the introduction of `object/array` are not worth mentioning in today's era.
