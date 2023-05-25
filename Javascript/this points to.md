---
title: this points to
lang: en-US
date: 2022-04-07 15:52:00
author: XXXWeii
categories:
  - JavaScript
tags:
  - JavaScript
---

## 1. Definition

---

The `this` keyword for functions behaves slightly differently in JavaScript, and there are also some differences between strict and non-strict mode

In most cases, the way the function is called determines the value of `this` (running is binding)

The `this` keyword is an internal object automatically generated when the function is running. It can only be used inside the function and always points to the object that called it

for example:

```js
function baz() {
   // The current call stack is: baz
   // Therefore, the current calling location is the global scope

   console.log("baz");
   bar(); // <-- where bar is called
}

function bar() {
   // The current call stack is: baz --> bar
   // Therefore, the current call location is in baz

   console.log("bar");
   foo(); // <-- where foo is called
}

function foo() {
   // The current call stack is: baz --> bar --> foo
   // Therefore, the current call position is in bar

   console.log("foo");
}

baz(); // <-- where baz is called
```

At the same time, `this` is in the function execution, once `this` is determined, it cannot be changed

```js
var a = 10;
var obj = {
   a: 20,
};

function fn() {
   this = obj; // Modify this, it will report an error after running
   console.log(this.a);
}

fn();
```

## 2. Binding rules

---

According to different usage scenarios, `this` has different values, which are mainly divided into the following situations:

- default binding
- Implicit binding
- new binding
- show bindings

### Default Bindings

The `person` function is defined in the global environment, and the `this` keyword is used internally

```js
var name = "Jenny";
function person() {
   return this.name;
}
console.log(person()); //Jenny
```

The above code outputs `Jenny`, because the object calling the function is `window` in the browser, so `this` points to `window`, so `Jenny` is output

Notice:

In strict mode, the global object cannot be used for default binding, this will be bound to `undefined`, only when the function runs in non-strict mode, the default binding can be bound to the global object

### Implicit binding

A function can also be called as a method of an object, then `this` refers to the superior object

```js
function test() {
   console.log(this.x);
}

var obj = {};
obj.x = 1;
obj.m = test;

obj.m(); // 1
```

This function contains multiple objects, although this function is called by the outermost object, `this` only points to its upper level object

```js
var o = {
   a: 10,
   b: {
     fn: function () {
       console.log(this.a); //undefined
     },
   },
};
o.b.fn();
```

In the above code, the upper level object of `this` is `b`, and there is no `a` variable definition inside `b`, so `undefined` is output

Here is another special case

```js
var o = {
   a: 10,
   b: {
     a: 12,
     fn: function () {
       console.log(this.a); //undefined
       console.log(this); //window
     },
   },
};
var j = o.b.fn;
j();
```

At this time `this` points to `window`, everyone here needs to remember that `this` always points to the object that called it last, although `fn` is the method of the object `b`, but `fn` is assigned to `j` was not executed, so it finally pointed to `window`

### new binding

Generate an instance object through the construction function `new` keyword, and `this` points to this instance object

```js
function test() {
   this.x = 1;
}
var obj = new text();
obj.x; //1
```

The reason why the above code can output 1 is because the `new` keyword changes the pointing of `this`

Here are some special cases:

The `new` process encounters `return` an object, and `this` points to the returned object

```js
function test() {
   this.user = "xxx";
   return {};
}
var obj = new test();
console.log(obj.user); //undefined
```

If returning a simple type, `this` points to the instance object

```js
function fn() {
   this.user = "xxx";
   return 1;
}
var a = new fn();
console.log(a.user); //xxx
```

Note that although `null` is also an object, `new` still points to the instance object at this time

```js
function fn() {
   this.user = "xxx";
   return null;
}
var a = new fn();
console.log(a.user); //xxx
```

### Show Modifications

`apply(), call(), bind()` is a method of the function, which is used to change the calling object of the function. One of its parameters represents the changed object that calls this function. Therefore, `this` refers to the first parameter at this time

```js
var x = 0;
function test() {
   console.log(this.x);
}
var obj = {};
obj.x = 1;
(obj.m = test), obj.m.apply(obj); //1
```

## 3. Arrow function

---

The arrow function syntax is also provided in the ES6 syntax, so that we can determine the point of `this` when writing the code (compile-time binding)

for example:

```js
const obj = {
   sayThis: () => {
     console. log(this);
   },
};

obj.sayThis(); // window Because JavaScript does not have block scope, when defining sayThis, this inside is tied to window
const globalSay = obj. sayThis;
globalSay(); // global object in window browser
```

Although the this of the arrow function can determine the direction of `this` at compile time, there are also some potential pitfalls that need to be paid attention to

Here is an example:

Binding event listener

```js
const button = document. getElementById("mngb");
button. addEventListener("click", () => {
   console.log(this === window); // true
   this.innerHTML = "clicked button";
});
```

As can be seen from the above, we actually want `this` to be the clicked button, but at this time `this` points to `window`

Including when adding methods on the prototype, at this time `this` points to `window`

```js
Cat.prototype.sayName = () => {
   console.log(this === window); //true
   return this.name;
};
const cat = new Cat("mm");
cat. sayName();
```

Similarly, arrow functions cannot be used as constructors

## 4. Priority

---

### Implicit Binding VS Explicit Binding

```js
function foo() {
   console.log(this.a);
}

var obj1 = {
   a: 2,
   foo: foo,
};

var obj2 = {
   a: 3,
   foo: foo,
};

obj1. foo(); // 2
obj2. foo(); // 3

obj1.foo.call(obj2); // 3
obj2.foo.call(obj1); // 2
```

Apparently display bindings have higher priority

### new binding VS implicit binding

```js
function foo(something) {
   this.a = something;
}

var obj1 = {
   foo: foo,
};

var obj2 = {};

obj1. foo(2);
console.log(obj1.a); // 2

obj1.foo.call(obj2, 3);
console.log(obj2.a); // 3

var bar = new obj1. foo(4);
console.log(obj1.a); // 2
console.log(bar.a); // 4
```

As you can see, the priority of new binding > implicit binding

new binding vs explicit binding

Because `new` and `apply, call` cannot be used together, but hard binding is also a kind of explicit binding, which can replace the test

```js
function foo(something) {
   this.a = something;
}

var obj1 = {};

var bar = foo. bind(obj1);
bar(2);
console.log(obj1.a); // 2

var baz = new bar(3);
console.log(obj1.a); // 2
console.log(baz.a); // 3
```

`bar` is bound to `obj1`, but `new bar(3)` does not change `obj1.a` to 3 as expected. However, `new` modifies `this` in a bound call to `bar()`

We can think of `new binding priority` > `explicit binding`

In summary, new binding priority > display binding priority > implicit binding priority > default binding priority

## 5. apply, call, bind implementation

------

- apply

```js
Function.prototype.myApply = function (context) {
   if (typeof this !== "function") {
     throw new Error("Type error");
   }
   let result = null;
   context = context || window;
   // Compared with the above code, we use Symbol to ensure unique attributes
   // That is, it is guaranteed not to rewrite the property with the same name originally defined by the user in the context
   const fnSymbol = Symbol();
   context[fnSymbol] = this;
   // Execute the method to be called
   if (arguments[1]) {
     result = context[fnSymbol](...arguments[1]);
   } else {
     result = context[fnSymbol]();
   }
   delete context[fnSymbol];
   return result;
};
```

- call

```js
Function.prototype.myCall = function (context) {
   // Determine the calling object
   if (typeof this !== "function") {
     throw new Error("Type error");
   }
   // First get the parameters
   let args = [...arguments]. slice(1);
   let result = null;
   // Determine whether the context is passed in, if not, set it to window
   context = context || window;
   // Set the called method as a property of the context
   // this is the method we want to call
   context.fn = this;
   // Execute the method to be called
   result = context.fn(...args);
   // Delete manually added attribute method
   delete context.fn;
   // Return the execution result
   return result;
};
```

- bind

```js
Function.prototype.myBind = function (context) {
   // Determine whether the calling object is a function
   if (typeof this !== "function") {
     throw new Error("Type error");
   }
   // get parameters
   const args = [...arguments]. slice(1),
   const fn = this;
   return function Fn() {
     return fn. apply(
       this instanceof Fn? this : context,
       // The current arguments refer to the parameters of Fn
       args.concat(...arguments)
     );
   };
};
```

## 6. new implementation

1. First create a new empty object.

2. According to the prototype chain, set the `__proto__` of the empty object to the `prototype` of the constructor.

3. The this of the constructor points to this object, and the code of the constructor is executed (adding properties to this new object).

4. Determine the return value type of the function. If it is a reference type, return the object of this reference type.

```js
function myNew(Fn, ...args) {
   //1. Create an empty object, and point the object's __proto__ to the constructor's prototype Here I did two steps together
   const obj = Object.create(Fn.prototype);
   //2. Point this in the constructor to obj, execute the constructor code, and get the return value
   const res = Fn.apply(obj, args);
   console.log(res instanceof Object);
   //3. Determine the return value type
   return res instanceof Object ? res : obj;
}
```
