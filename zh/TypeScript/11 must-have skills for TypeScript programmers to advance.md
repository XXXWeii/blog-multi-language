---
title: TypeScript程序员晋级的11个必备技巧
lang: zh-CN
date: 2022-04-13 14:55:00
author: XXXWeii
tags:
  - TypeScript
---

当你学习 TypeScript 时，你的第一印象可能会欺骗你：这不就是 JavaScript 注解的一种方式吗？不就是编译器用来帮助我找到潜在 bug 的吗？

虽然这种说法没错，但随着你对 TypeScript 不断了解，你会发现这门编程语言最不可思议的力量在于编写、推断和操作数据类型。

本文总结的一些技巧，可以帮助大家充分发挥 TypeScript 的潜力。

## #1 用集合的概念思考问题

---

数据类型是程序员日常要处理的概念，但要简洁地定义它却出奇地困难。然而我发现集合非常适合用作概念模型。

刚开始学习 TypeScript 时，我们常常会发现用 TypeScript 编写类型的方式很不自然。举一个非常简单的例子：

```typescript
type Measure = { radius: number };
type Style = { color: string };

// typed { radius: number; color: string }
type Circle = Measure & Style;
```

如果你在逻辑 AND 的意义上解释运算符`&`，可能会认为 Circle 是一个虚拟类型，因为它是两种类型的结合，没有任何重叠的字段。这不是 TypeScript 的工作方式。此时通过集合的概念思考更容易推断出正确的行为：

- 每个类型都是一系列值的集合。
- 有些集合是无限的：例如`string`、`object`；有些是有限的：例如`bool`，`undefined`，...
- `unknown`是通用集（包括所有值），而`never`是空集（包括无值）。
- 类型`Measure`是包含`radius`数字字段的所有对象的集合。`style`也是如此。
- `&`运算符创建一个交集：`Measure & Style`表示包含`radius`和`color`的对象集，这实际上是一个较小的集合，字段更常用。
- 同理，`|`运算符创建一个并集：一个较大的集合，但常用字段可能较少（如果组合两个对象类型的话）。

集合还有助于了解可分配性：仅当值的类型是目标类型的子集时，才允许赋值：

```typescript
type ShapeKind = "rect" | "circle";
let foo: string = getSomeString();
let shape: ShapeKind = "rect";

// disallowed because string is not subset of ShapeKind
shape = foo;

// allowed because ShapeKind is subset of string
foo = shape;
```

## #2 了解声明类型和收窄类型

---

TypeScript 中一个非常强大的功能是基于控制流的自动类型收窄。这意味着变量在代码位置的任何特定点都有两种与之关联的类型：声明类型和收窄类型。

```typescript
function foo(x: string | number) {
  if (typeof x === 'string') {
    // x's type is narrowed to string, so .length is valid
    console.log(x.length);

    // assignment respects declaration type, not narrowed type
    x = 1;
    console.log(x.length); // disallowed because x is now number
  } else {
    ...
  }
}
```

## #3 使用可区分的联合类型而不是可选字段

---

当定义一组多态类型（如`Shape`）时，很容易这样开始写代码：

```typescript
type Shape = {
  kind: "circle" | "rect";
  radius?: number;
  width?: number;
  height?: number;
};

function getArea(shape: Shape) {
  return shape.kind === "circle"
    ? Math.PI * shape.radius! ** 2
    : shape.width! * shape.height!;
}
```

需要非空断言（访问`radius`、`width`和`height`时），因为`kind`和其他字段之间没有建立关系。相反，可区分的联合类型是一个更好的解决方案：

```typescript
type Circle = { kind: "circle"; radius: number };
type Rect = { kind: "rect"; width: number; height: number };
type Shape = Circle | Rect;

function getArea(shape: Shape) {
  return shape.kind === "circle"
    ? Math.PI * shape.radius ** 2
    : shape.width * shape.height;
}
```

从以上代码可以看出，类型收窄消除了强制类型转换的需要。

## #4 使用类型谓词避免类型断言

---

如果你以正确的方式使用 TypeScript 的话，你会发现自己很少使用显式类型断言（比如 value as SomeType）；但是，有时你可能会冲动地写出诸如这样的代码：

```typescript
type Circle = { kind: "circle"; radius: number };
type Rect = { kind: "rect"; width: number; height: number };
type Shape = Circle | Rect;

function isCircle(shape: Shape) {
  return shape.kind === "circle";
}

function isRect(shape: Shape) {
  return shape.kind === "rect";
}

const myShapes: Shape[] = getShapes();

// error because typescript doesn't know the filtering
// narrows typing
const circles: Circle[] = myShapes.filter(isCircle);

// you may be inclined to add an assertion:
// const circles = myShapes.filter(isCircle) as Circle[];
```

更优雅的解决方案是将`isCircle`和`isRect`更改为返回类型谓词，这样就可以帮助 TypeScript 在`filter`调用后进一步收窄类型：

```typescript
function isCircle(shape: Shape): shape is Circle {
    return shape.kind === 'circle';
}

function isRect(shape: Shape): shape is Rect {
    return shape.kind === 'rect';
}

...
// now you get Circle[] type inferred correctly
const circles = myShapes.filter(isCircle);
```

## #5 控制联合类型的分布方式

---

类型推断是 TypeScript 的特性；大多数时候，它默默地为你工作。但是有时你可能对模棱两可的细微情况进行干预。分布式条件类型就是其中一种情况。

假设我们有一个`ToArray`辅助类，如果输入类型还不是数组类型，则返回数组类型：

```typescript
type ToArray<T> = T extends Array<unknown> ? T : T[];
```

你认为以下类型会推断出什么？

```typescript
type Foo = ToArray<string | number>;
```

答案是`string[] | number[]`。但这是模棱两可的。为什么不是`(string | number)[]`呢？

默认情况下，当 TypeScript 遇到联合类型（此处为`string | number`）的泛型参数（此处为`T`）时，它会分布到每个组成部分中，这就是为什么会得到`string[] | number[]`的原因。你可以通过使用特殊语法并将`T`包装在一对`[]`中来更改此行为，例如：

```typescript
type ToArray<T> = [T] extends [Array<unknown>] ? T : T[];
type Foo = ToArray<string | number>;
```

现在`Foo`被推断为类型`(string | number)[]`。

## #6 使用详尽检查捕获在编译时未处理的情况

---

在`switch`语句中使用`enum`枚举时，一个好习惯是在没有匹配到合适值的情况下主动抛错，而不是像在其他编程语言中那样默默地忽略它们：

```typescript
function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rect":
      return shape.width * shape.height;
    default:
      throw new Error("Unknown shape kind");
  }
}
```

通过使用`never`类型，静态类型检查就可以更早地查找到错误：

```typescript
function getArea(shape: Shape) {
  switch (shape.kind) {
    case "circle":
      return Math.PI * shape.radius ** 2;
    case "rect":
      return shape.width * shape.height;
    default:
      // you'll get a type-checking error below
      // if any shape.kind is not handled above
      const _exhaustiveCheck: never = shape;
      throw new Error("Unknown shape kind");
  }
}
```

有了这个，在添加新的`shape`种类时，就不可能忘记更新`getArea`函数。

该技术背后的基本原理是，除了`never`之外，不能为`never`类型分配任何内容。如果`shape.kind`的所有备选项都被`case`语句用尽，那么达到`default`的唯一可能类型是`never`；但是，如果未涵盖所有备选项，则将泄漏到`default`分支并导致无效分配。

## #7 宁可使用 type 而不是 interface

---

在 TypeScript 中，`type`和`interface`是两种非常相似的数据结构，都可以用来构造复杂的对象的。虽然可能有争议，但我的建议是在大多数情况下始终使用 type，仅在满足以下任一条件时才使用`interface`：

- 想利用 interface 的合并功能。
- 有涉及类/接口层次结构的 OO 样式代码。

否则，始终使用更通用的`type`构造会产生更一致的代码。

## #8 只要合适宁可使用元组而不是数组

---

对象类型是构造结构化数据的常用方法，但有时你可能希望使用更简洁的表示形式，而改用简单的数组。例如，`Circle`可以定义为：

```typescript
type Circle = (string | number)[];
const circle: Circle = ["circle", 1.0]; // [kind, radius]
```

但是这种构造是松散的，如果创建类似`['circle', '1.0']`的内容很容易出错。我们可以通过使用元组来使其更严格：

```typescript
type Circle = [string, number];

// you'll get an error below
const circle: Circle = ["circle", "1.0"];
```

使用元组的一个很好的例子是 React 中的`useState`。

```typescript
const [name, setName] = useState("");
```

既紧凑又类型安全。

## #9 控制推断类型的通用性或特殊性

---

TypeScript 在进行类型推断时使用合理的默认行为，旨在使常见情况下的代码编写变得容易（因此类型不需要显式注释）。有几种方法可以调整其行为。

- 使用 const 缩小到最具体的类型

```typescript
let foo = { name: "foo" }; // typed: { name: string }
let Bar = { name: "bar" } as const; // typed: { name: 'bar' }

let a = [1, 2]; // typed: number[]
let b = [1, 2] as const; // typed: [1, 2]

// typed { kind: 'circle; radius: number }
let circle = { kind: "circle" as const, radius: 1.0 };

// the following won't work if circle wasn't initialized
// with the const keyword
let shape: { kind: "circle" | "rect" } = circle;
```

- 使用`satisfies`来检查类型，而不影响推断的类型

请看以下示例：

```typescript
type NamedCircle = {
  radius: number;
  name?: string;
};

const circle: NamedCircle = { radius: 1.0, name: "yeah" };

// error because circle.name can be undefined
console.log(circle.name.length);
```

有个错误，这是因为根据`circle`的声明类型`NamedCircle，name`字段确实可以未定义，即使变量初始值设定项提供了字符串值。当然，我们可以删除`:NamedCircle`类型注释，但这将松散对`circle`对象有效性的类型检查。进退两难。

幸运的是，Typescript 4.9 引入了一个新的`satisfies`关键字，它允许你在不更改推断类型的情况下检查类型：

```typescript
type NamedCircle = {
    radius: number;
    name?: string;
};

// error because radius violates NamedCircle
const wrongCircle = { radius: '1.0', name: 'ha' }
    satisfies NamedCircle;

const circle = { radius: 1.0, name: 'yeah' }
    satisfies NamedCircle;

// circle.name can't be undefined now
console.log(circle.name.length);
```

修改后的版本具有两个优点：对象字面量保证符合`NamedCircle`类型，推断类型具有不可为空的名称字段。

## #10 使用 infer 创建额外的泛型类型参数

---

在设计实用工具函数和类型时，你经常会觉得需要使用从给定类型参数中提取的类型。在这种情况下，`infer`关键字就可以派上用场。它可以帮助快速推断新的类型参数。下面是两个简单的例子：

```typescript
// gets the unwrapped type out of a Promise;
// idempotent if T is not Promise
type ResolvedPromise<T> = T extends Promise<infer U> ? U : T;
type t = ResolvedPromise<Promise<string>>; // t: string

// gets the flattened type of array T;
// idempotent if T is not array
type Flatten<T> = T extends Array<infer E> ? Flatten<E> : T;
type e = Flatten<number[][]>; // e: number
```

`infer`关键字在`T extends Promise<infer U>`中的工作原理可以理解为：假设`T`与一些实例化的泛型 Promise 类型兼容，临时凑合一个类型参数`U`以使其工作。因此，如果`T`被实例化为`Promise<string>`，则`U`的解决方案将是`string`。

## #11 创新类型操作以保持 DRY

---

TypeScript 提供了强大的类型操作语法和一组非常有用的实用程序，可帮助你将代码重复减少到最低限度。以下是一些简单示例：

与其重复字段声明：

```typescript
type User = {
    age: number;
    gender: string;
    country: string;
    city: string
};
type Demographic = { age: number: gender: string; };
type Geo = { country: string; city: string; };
```

还不如使用`pick`实用程序提取新类型：

```typescript
type User = {
  age: number;
  gender: string;
  country: string;
  city: string;
};
type Demographic = Pick<User, "age" | "gender">;
type Geo = Pick<User, "country" | "city">;
```

与其复制函数的返回类型：

```typescript
function createCircle() {
    return {
        kind: 'circle' as const,
        radius: 1.0
    }
}

function transformCircle(circle: { kind: 'circle'; radius: number }) {
    ...
}

transformCircle(createCircle());
```

还不如使用`ReturnType<T>`提取：

```typescript
function createCircle() {
    return {
        kind: 'circle' as const,
        radius: 1.0
    }
}

function transformCircle(circle: ReturnType<typeof createCircle>) {
    ...
}

transformCircle(createCircle());
```

与其并行同步两种类型的`shape`（此处为`config`类型和`Factory`）：

```typescript
type ContentTypes = 'news' | 'blog' | 'video';

// config for indicating what content types are enabled
const config = { news: true, blog: true, video: false }
    satisfies Record<ContentTypes, boolean>;

// factory for creating contents
type Factory = {
    createNews: () => Content;
    createBlog: () => Content;
};
```

还不如使用映射类型和模板字面量类型根据`config`的形状自动推断正确的`factory`类型：

```typescript
type ContentTypes = 'news' | 'blog' | 'video';

// generic factory type with a inferred list of methods
// based on the shape of the given Config
type ContentFactory<Config extends Record<ContentTypes, boolean>> = {
    [k in string & keyof Config as Config[k] extends true
        ? `create${Capitalize<k>}`
        : never]: () => Content;
};

// config for indicating what content types are enabled
const config = { news: true, blog: true, video: false }
    satisfies Record<ContentTypes, boolean>;

type Factory = ContentFactory<typeof config>;
// Factory: {
//     createNews: () => Content;
//     createBlog: () => Content;
// }
```

## 总结

---

这篇文章介绍了一系列 TypeScript 语言的高级应用。在实践中，你可能会发现直接这样用并不常见；但是，这些技术被大量用于那些专门为 TypeScript 而设计的库：如 Prisma 和 tRPC。了解这些技巧可以帮助你更好地理解这些工具是发挥其威力的。
