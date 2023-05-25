---
title: 11 JavaScript Code Optimization Tips
lang: en-US
date: 2023-01-20 14:55:00
author: XXXWeii
tags:
  - JavaScript
---

## Introduction

---

Mainly introduce the following points:

- Extract function
- Merge duplicate conditional fragments
- Extract the conditional branch statement into a function
- Use loops wisely
- Let the function exit early instead of nested conditional branches
- pass object parameters instead of long parameter lists
- Use less ternary operators
- Reasonable use of chain calls
- Break down large classes
- Use bitwise operators
- pure function

This article will be updated continuously, and any deficiencies are welcome to add in the comment area.

## 1. Extract function

---

benefit:

- Avoid super large functions.
- Independent functions help code reuse.
- Independent functions are easier to override.
- If the independent function has a good name, it will act as a comment.
- Semanticization implements multiple separate logics in different functions, which can make the code logic clear and clearly see what each step is doing.

**Code example:**

Get data, then manipulate dom to display data, and finally add events

Before function extraction

```js
// The logic is all written together. You need to read all the logic to know what this code does. Partial logic cannot be reused
function main() {
   $.ajax.get("/getData").then((res) => {
     const ul = document. getElementById("ul");
     ul.innerHTML = res.list
       .map((text) => `<li class="li">${text}</li>`)
       .join("\n");
     const list = document. getElementsByClassName("li");
     for (let i = 0; i < list. length; i++) {
       list[i].addEventListener("focus", () => {
         // do something
       });
     }
   });
}
```

After the function is refined

```js
function getData() {
   return $.ajax.get("/getData").then((res) => res.data.list);
}
function showList(list) {
   const ul = document. getElementById("ul");
   ul.innerHTML = list.map((text) => `<li class="li">${text}</li>`).join("\n");
}
function addEvent() {
   const list = document. getElementsByClassName("li");
   for (let i = 0; i < list. length; i++) {
     list[i].addEventListener("focus", () => {
       // do something
     });
   }
}
// The logic is clear, you can understand what each step is doing at a glance, and some extracted functions can also be reused
async function main() {
   const list = await getData(); // get data
   showList(list); // display the page
   addEvent(); // add event
}
```

## 2. Merge duplicate conditional fragments

---

If there are some conditional branch statements in a function body, and some repeated codes are scattered inside these conditional branch statements, then it is necessary to merge and deduplicate.

```js
// before merge
function main(currPage) {
   if (currPage <= 0) {
     currPage = 0;
     jump(currPage); // jump
   } else if (currPage >= totalPage) {
     currPage = totalPage;
     jump(currPage); // jump
   } else {
     jump(currPage); // jump
   }
}

// after merge
function main(currPage) {
   if (currPage <= 0) {
     currPage = 0;
   } else if (currPage >= totalPage) {
     currPage = totalPage;
   }
   jump(currPage); // Separate the jump function
}
```

## 3. Extract the conditional branch statement into a function

---

Complicated conditional branch statements are an important reason why the program is difficult to read and understand, and it is easy to lead to a huge function. Sometimes conditional branch statements can be refined into semantic functions to make the code more intuitive and logic clear.

```js
// Determine the discount intensity according to different seasons
function getPrice(price) {
   var date = new Date();
   if (date.getMonth() >= 6 && date.getMonth() <= 9) {
     // summer
     return price * 0.8;
   }
   return price;
}

// is it summer
function isSummer() {
   var date = new Date();
   return date.getMonth() >= 6 && date.getMonth() <= 9;
}
// After refining the conditions
function getPrice(price) {
   if (isSummer()) {
     return price * 0.8;
   }
   return price;
}
```

## 4. Reasonable use of loops

---

If multiple pieces of code are actually responsible for some repetitive work, you can use loops instead to make the amount of code less.

```js
// Determine what browser it is
function getBrowser() {
   const str = navigator. userAgent;
   if (str. includes("QQBrowser")) {
     return "qq";
   } else if (str. includes("Chrome")) {
     return "chrome";
   } else if (str. includes("Safari")) {
     return "safri";
   } else if (str. includes("Firefox")) {
     return "firefox";
   } else if (explorer. indexOf("Opera") >= 0) {
     return "opera";
   } else if (str. includes("msie")) {
     return "ie";
   } else {
     return "other";
   }
}

// Loop judgment, abstract the corresponding relationship into configuration, which is clearer and clearer
function getBrowser() {
   const str = navigator. userAgent;
   const list = [
     { key: "QQBrowser", browser: "qq" },
     { key: "Chrome", browser: "chrome" },
     { key: "Safari", browser: "safari" },
     { key: "Firefox", browser: "firefox" },
     { key: "Opera", browser: "opera" },
     { key: "msie", browser: "ie" },
   ];
   for (let i = 0; i < list. length; i++) {
     const item = list[i];
     if (str. includes(item. key)) {
       return item. browser;
     }
   }
   return "other";
}
```

## 5. Let the function exit early instead of nested conditional branches

---

Let the function become `multi-exit` to return early, replacing `nested conditional branch`.

```js
function del(obj) {
   var ret;
   if (!obj.isReadOnly) {
     // Not read-only can be deleted
     if (obj. isFolder) {
       // if it is a folder
       ret = deleteFolder(obj);
     } else if (obj. isFile) {
       // if it is a file
       ret = deleteFile(obj);
     }
   }
   return ret;
}

function del(obj) {
   if (obj. isReadOnly) {
     // reverse the if expression
     return;
   }
   if (obj. isFolder) {
     return deleteFolder(obj);
   }
   if (obj. isFile) {
     return deleteFile(obj);
   }
}
```

## 6. Pass object parameters instead of long parameter lists

---

If the function parameters are too long, the risk of errors will increase. It is a troublesome thing to ensure that the order of passing is correct, and the readability of the code will also deteriorate. Try to ensure that the parameters of the function are not too long. If multiple parameters must be passed, it is recommended to use objects instead.

In general, it is best not to have more than 3 function parameters

```js
function setUserInfo(id, name, address, sex, mobile, qq) {
   console.log("id= " + id);
   console.log("name= " + name);
   console.log("address= " + address);
   console.log("sex= " + sex);
   console.log("mobile= " + mobile);
   console.log("qq= " + qq);
}
setUserInfo(1314, "sven", "shenzhen", "male", "137********", 377876679);

function setUserInfo(obj) {
   console.log("id= " + obj.id);
   console.log("name=" + obj.name);
   console.log("address= " + obj.address);
   console.log("sex= " + obj.sex);
   console.log("mobile=" + obj.mobile);
   console.log("qq= " + obj.qq);
}
setUserInfo({
   id: 1314,
   name: "sven",
   address: "shenzhen",
   sex: "male",
   mobile: "137********",
   qq: 377876679,
});
```

## 7. Use less ternary operators

---

The ternary operator has high performance and less code.

But the ternary operator should not be abused. We should use it in simple logic branches and avoid it in complex logic branches.

```js
// Simple logic can use the ternary operator
var global = typeof window !== "undefined" ? window : this;

// Complex logic is not suitable for use
var ok = isString ? (isTooLang ? 2 : isTooShort ? 1 : 0) : -1;
```

## 8. Reasonable use of chain calls

---

**advantage:**

Chain calls are easy to use and require less code.

**shortcoming:**

The disadvantage of chain calls is that it is inconvenient to debug. If we know that there is an error in a chain, we must first disassemble the chain to add some debugging logs or add breakpoints, so as to locate the error. .

If the structure of the chain is relatively stable and it is not easy to modify it later, you can use the chain type.

```js
var User = {
   id: null,
   name: null,
   setId: function (id) {
     this.id = id;
     return this;
   },
   setName: function (name) {
     this.name = name;
     return this;
   },
};
User.setId(1314).setName("sven");

var user = new User();
user.setId(1314);
user.setName("sven");
```

## 9. Breaking down large classes

---

The decomposition of a large class is very similar to the refinement of a function. If a class is too large, the logic will be unclear, difficult to understand and maintain.

Reasonable class decomposition can make the logic of the class clear, and the sub-modules can be easily reused.

## 10. Use bitwise operators

---

The performance of multiplication and division in programming languages is not high, but in some cases, the use of bit operators can improve the performance of operations such as multiplication and division.

## 11. Pure functions

---

A pure function is one that does not depend on and does not change the state of variables outside its scope.

The return value of a pure function is only determined by the parameters when it is called, and its execution does not depend on the state of the system (execution context).

The same input parameters will definitely get the same output, that is, there are no random variables that will affect the output.

**Features that are not part of pure functions:**

- change file system
- Insert records into the database
- send an http request
- mutable data
- print /log
- get user input
- DOM query
- access to system status

**The role of pure functions:**

- Reliability: function returns are always as expected
- Cacheability: Because as long as the input is the same, the output must be the same, so the input can be used as the key, the output can be used as the value, and the calculated result can be cached using the object
- Portability: Since there are no external dependencies, it can be ported to any environment and run correctly
- Testability: convenient for unit testing of functions
- Parallelism: For some complex calculations, it can be calculated in parallel (for example, using nodejs multiple sub-processes to calculate multiple tasks in parallel at the same time to improve the calculation speed)

**Application scenario:**

- Tool functions are best to use pure functions
- Code used by multiple platforms (nodejs, browser, WeChat applet, native client, etc.)
- Relatively independent functions

```js
var a = 1;
// impure function
function sum(b) {
   return a + b;
}
// impure function
function sum(b) {
   a = 2;
   return b;
}
// impure function
function sum(b) {
   return b + Math. random();
}

// pure function
function sum(b, c) {
   return b + c;
}
```

## 12. Use mapping instead of repeating logical branches

---

```js
// repeated logical branch
function example(type) {
   if (type === "a") {
     return "Type 1";
   } else if (type === "b") {
     return "type 2";
   } else if (type === "c") {
     return "3";
   } else if (type === "d") {
     return "4";
   }
}

// use a map instead of repeating logical branches
function example(type) {
   const map = {
     a: "Type 1",
     b: "type 2",
     c: "3",
     d: "4",
   };
   return map[type];
}
```
