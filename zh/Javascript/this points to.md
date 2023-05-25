---
title: this指向
lang: zh-CN
author: XXXWeii
date: 2022-04-07 15:52:00
tags:
  - JavaScript
---

## 一、定义

---

函数的`this`关键字在`JavaScript`中的表现略有不同，此外，在严格模式和非严格模式之间也会有一些差别

在绝大多数情况下，函数的调用方式决定了`this`的值(运行是绑定)

`this`关键字是函数运行时自动生成的一个内部对象，只能在函数内部使用，总指向调用它的对象

举个例子：

```js
function baz() {
  // 当前调用栈是：baz
  // 因此，当前调用位置是全局作用域

  console.log("baz");
  bar(); // <-- bar的调用位置
}

function bar() {
  // 当前调用栈是：baz --> bar
  // 因此，当前调用位置在baz中

  console.log("bar");
  foo(); // <-- foo的调用位置
}

function foo() {
  // 当前调用栈是：baz --> bar --> foo
  // 因此，当前调用位置在bar中

  console.log("foo");
}

baz(); // <-- baz的调用位置
```

同时，`this`在函数执行中，`this`一旦呗确定了，就不可以更改

```js
var a = 10;
var obj = {
  a: 20,
};

function fn() {
  this = obj; // 修改this，运行后会报错
  console.log(this.a);
}

fn();
```

## 二、绑定规则

---

根据不同的使用场景，`this`有不同的值，主要分为下面几种情况：

- 默认绑定
- 隐式绑定
- new 绑定
- 显示绑定

### 默认绑定

全局环境中定义`person`函数，内部使用`this`关键字

```js
var name = "Jenny";
function person() {
  return this.name;
}
console.log(person()); //Jenny
```

上述代码输出`Jenny`，原因是调用函数的对象在浏览器中为`window`,因此`this`指向`window`，所以输出`Jenny`

注意：

严格模式下，不能将全局对象用于默认绑定，this 会绑定到`undefined`，只有函数运行在非严格模式下，默认绑定才能绑定到全局对象

### 隐式绑定

函数还可以作为某个对象的方法调用，这时`this`就指这个上级对象

```js
function test() {
  console.log(this.x);
}

var obj = {};
obj.x = 1;
obj.m = test;

obj.m(); // 1
```

这个函数中包含多个对象，尽管这个函数是被最外层的对象调用，`this`指向的也只是它上一级的对象

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

上述代码中，`this`的上一级对象为`b`,`b`内部并没有`a`变量的定义，所以输出`undefined`

这里再举一个特殊情况

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

此时`this`指向的是`window`，这里的大家需要记住，`this`永远指向的是最后调用它的对象，虽然`fn`是对象`b`的方法，但是`fn`赋值给`j`时候并没有执行，所以最终指向`window`

### new 绑定

通过构建函数`new`关键字生成一个实例对象，此时`this`指向这个实例对象

```js
function test() {
  this.x = 1;
}
var obj = new text();
obj.x; //1
```

上述代码之所以能过输出 1，是因为`new`关键字改变了`this`的指向

这里在列举一些特殊情况：

`new`过程遇到`return`一个对象，此时`this`指向为返回的对象

```js
function test() {
  this.user = "xxx";
  return {};
}
var obj = new test();
console.log(obj.user); //undefined
```

如果返回一个简单类型的时候，则`this`指向实例对象

```js
function fn() {
  this.user = "xxx";
  return 1;
}
var a = new fn();
console.log(a.user); //xxx
```

注意的是`null`虽然也是对象，但是此时`new`仍然指向实例对象

```js
function fn() {
  this.user = "xxx";
  return null;
}
var a = new fn();
console.log(a.user); //xxx
```

### 显示修改

`apply()、call()、bind()`是函数的一个方法，作用是改变函数的调用对象。它的一个参数就表示改变后的调用这个函数的对象。因此，这时`this`指的就是这第一个参数

```js
var x = 0;
function test() {
  console.log(this.x);
}
var obj = {};
obj.x = 1;
(obj.m = test), obj.m.apply(obj); //1
```

## 三、箭头函数

---

在 ES6 的语法中还提供了箭头函语法，让我们在代码书写时就能确定 `this` 的指向（编译时绑定）

举个例子：

```js
const obj = {
  sayThis: () => {
    console.log(this);
  },
};

obj.sayThis(); // window 因为 JavaScript 没有块作用域，所以在定义 sayThis 的时候，里面的 this 就绑到 window 上去了
const globalSay = obj.sayThis;
globalSay(); // window 浏览器中的 global 对象
```

虽然箭头函数的 this 能够在编译的时候就确定了`this`的指向，但也需要注意一些潜在的坑

下面举个例子：

绑定事件监听

```js
const button = document.getElementById("mngb");
button.addEventListener("click", () => {
  console.log(this === window); // true
  this.innerHTML = "clicked button";
});
```

上述可以看到，我们其实是想要`this`为点击的 button，但此时`this`指向了`window`

包括在原型上添加方法时候，此时`this`指向`window`

```js
Cat.prototype.sayName = () => {
  console.log(this === window); //true
  return this.name;
};
const cat = new Cat("mm");
cat.sayName();
```

同样的，箭头函数不能作为构建函数

## 四、优先级

---

### 隐式绑定 VS 显式绑定

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

obj1.foo(); // 2
obj2.foo(); // 3

obj1.foo.call(obj2); // 3
obj2.foo.call(obj1); // 2
```

显然，显示绑定的优先级更高

### new 绑定 VS 隐式绑定

```js
function foo(something) {
  this.a = something;
}

var obj1 = {
  foo: foo,
};

var obj2 = {};

obj1.foo(2);
console.log(obj1.a); // 2

obj1.foo.call(obj2, 3);
console.log(obj2.a); // 3

var bar = new obj1.foo(4);
console.log(obj1.a); // 2
console.log(bar.a); // 4
```

可以看到，new 绑定的优先级>隐式绑定

new 绑定 VS 显式绑定

因为`new`和`apply、call`无法一起使用，但硬绑定也是显式绑定的一种，可以替换测试

```js
function foo(something) {
  this.a = something;
}

var obj1 = {};

var bar = foo.bind(obj1);
bar(2);
console.log(obj1.a); // 2

var baz = new bar(3);
console.log(obj1.a); // 2
console.log(baz.a); // 3
```

`bar`被绑定到`obj1`上，但是`new bar(3)`并没有像我们预计的那样把`obj1.a`修改为 3。但是，`new`修改了绑定调用`bar()`中的`this`

我们可认为`new绑定优先级`>`显式绑定`

综上，new 绑定优先级 > 显示绑定优先级 > 隐式绑定优先级 > 默认绑定优先级

## 五、apply、call、bind 实现

- apply

```js
Function.prototype.myApply = function (context) {
  if (typeof this !== "function") {
    throw new Error("Type error");
  }
  let result = null;
  context = context || window;
  // 与上面代码相比，我们使用 Symbol 来保证属性唯一
  // 也就是保证不会重写用户自己原来定义在 context 中的同名属性
  const fnSymbol = Symbol();
  context[fnSymbol] = this;
  // 执行要被调用的方法
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
  // 判断调用对象
  if (typeof this !== "function") {
    throw new Error("Type error");
  }
  // 首先获取参数
  let args = [...arguments].slice(1);
  let result = null;
  // 判断 context 是否传入，如果没有传就设置为 window
  context = context || window;
  // 将被调用的方法设置为 context 的属性
  // this 即为我们要调用的方法
  context.fn = this;
  // 执行要被调用的方法
  result = context.fn(...args);
  // 删除手动增加的属性方法
  delete context.fn;
  // 将执行结果返回
  return result;
};
```

- bind

```js
Function.prototype.myBind = function (context) {
  // 判断调用对象是否为函数
  if (typeof this !== "function") {
    throw new Error("Type error");
  }
  // 获取参数
  const args = [...arguments].slice(1),
  const fn = this;
  return function Fn() {
    return fn.apply(
      this instanceof Fn ? this : context,
      // 当前的这个 arguments 是指 Fn 的参数
      args.concat(...arguments)
    );
  };
};
```

## 六、new 实现

1. 首先创一个新的空对象。

2. 根据原型链，设置空对象的 `__proto__` 为构造函数的 `prototype` 。

3. 构造函数的 this 指向这个对象，执行构造函数的代码（为这个新对象添加属性）。

4. 判断函数的返回值类型，如果是引用类型，就返回这个引用类型的对象。

```js
function myNew(Fn, ...args) {
  //1.创建一个空对象，并将对象的__proto__指向构造函数的prototype 这里我两步一起做了
  const obj = Object.create(Fn.prototype);
  //2.将构造函数中的this指向obj，执行构造函数代码,获取返回值
  const res = Fn.apply(obj, args);
  console.log(res instanceof Object);
  //3.判断返回值类型
  return res instanceof Object ? res : obj;
}
```
