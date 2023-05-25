---
title: 11 must-have skills for TypeScript programmers to advance
lang: en-US
date: 2022-04-13 14:55:00
author: XXXWeii
tags:
  - TypeScript
---

When you learn TypeScript, your first impression might deceive you: Isn't this just a way of JavaScript annotations? Isn't that what the compiler uses to help me find potential bugs?

While this statement is true, as you learn more about TypeScript, you will find that the most incredible power of this programming language lies in writing, inferring and manipulating data types.

Some tips summarized in this article can help you fully realize the potential of TypeScript.

## #1 Think about problems with the concept of sets

---

Data types are a concept programmers deal with on a daily basis, but are surprisingly difficult to define concisely. However, I've found that collections are very useful as conceptual models.

When first learning TypeScript, we often find the way types are written in TypeScript unnatural. Take a very simple example:

```typescript
type Measure = { radius: number };
type Style = { color: string };

// typed { radius: number; color: string }
type Circle = Measure & Style;
```

If you interpret the operator & in the sense of a logical AND, you might think that Circle is a virtual type, since it is a union of two types without any overlapping fields. That's not how TypeScript works. At this point it is easier to deduce the correct behavior by thinking through the concept of sets:

- Each type is a collection of values.
- Some collections are infinite: e.g. `string`, `object`; some are finite: e.g. `bool`, `undefined`, ...
- `unknown` is the universal set (including all values), and `never` is the empty set (including no values).
- The type `Measure` is a collection of all objects containing a `radius` numeric field. The same goes for `style`.
- The `&` operator creates an intersection: `Measure & Style` represents the set of objects containing `radius` and `color`, which is actually a smaller collection with fields that are more commonly used.
- Similarly, the `|` operator creates a union: a larger collection, but possibly fewer commonly used fields (if combining two object types).

Collections also help understand assignability: assignment is only allowed if the type of the value is a subset of the target type:

```typescript
type ShapeKind = "rect" | "circle";
let foo: string = getSomeString();
let shape: ShapeKind = "rect";

// disallowed because string is not subset of ShapeKind
shape = foo;

// allowed because ShapeKind is subset of string
foo = shape;
```

## #2 Understanding declaration types and narrowing types

---

A very powerful feature in TypeScript is automatic type narrowing based on control flow. This means that a variable has two types associated with it at any particular point in the code location: the declared type and the narrowed type.

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

## #3 Use distinct union types instead of optional fields

---

When defining a set of polymorphic types (such as `Shape`), it is easy to start writing code like this:

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

A non-null assertion is required (when accessing `radius`, `width` and `height`), because there is no relationship established between `kind` and the other fields. Instead, a distinct union type is a better solution:

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

As you can see from the above code, type narrowing eliminates the need for casts.

## #4 Use type predicates to avoid type assertions

---

If you're using TypeScript the right way, you'll find yourself rarely using explicit type assertions (such as value as SomeType); however, sometimes you may impulsively write code like this:

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

A more elegant solution is to change `isCircle` and `isRect` to return type predicates, which help TypeScript further narrow down the type after the `filter` call:

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

## #5 Controlling the distribution of union types

---

Type inference is a TypeScript feature; most of the time, it works silently for you. But sometimes you may intervene in ambiguous nuances. Distributed condition types are one such case.

Suppose we have a `ToArray` helper class that returns an array type if the input type is not already an array type:

```typescript
type ToArray<T> = T extends Array<unknown> ? T : T[];
```

What do you think the following types will infer?

```typescript
type Foo = ToArray<string | number>;
```

The answer is `string[] | number[]`. But this is ambiguous. Why not `(string | number)[]`?

By default, when TypeScript encounters a generic parameter (here `T`) of a union type (here `string | number`), it distributes it into each of its constituent parts, which is why you get ` string[] | number[]`. You can change this behavior by using special syntax and wrapping `T` in a pair of `[]`, for example:

```typescript
type ToArray<T> = [T] extends [Array<unknown>] ? T : T[];
type Foo = ToArray<string | number>;
```

Now `Foo` is inferred to be of type `(string|number)[]`.

## #6 Use exhaustive checks to catch cases that are not handled at compile time

---

When using `enum` enumerations in `switch` statements, it is a good practice to actively throw an error if no suitable value is matched, instead of silently ignoring them as in other programming languages:

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

By using the `never` type, static type checking can catch errors earlier:

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

With this, it is impossible to forget to update the `getArea` function when adding new `shape` kinds.

The rationale behind this technique is that nothing can be assigned to a `never` type other than `never`. If all alternatives for `shape.kind` are exhausted by a `case` statement, then the only possible type to reach `default` is `never`; however, if not all alternatives are covered, this will leak to the `default` branch and results in an invalid allocation.

## #7 Prefer type to interface

---

In TypeScript, `type` and `interface` are two very similar data structures that can be used to construct complex objects. While it may be debatable, my advice is to always use type in most cases, and only use `interface` when either of the following conditions are true:

- want to take advantage of the interface's merging capabilities.
- Has OO style code involving class/interface hierarchies.

Otherwise, always using the more general `type` construct produces more consistent code.

## #8 Prefer tuples to arrays whenever appropriate

---

Object types are a common way of structuring structured data, but sometimes you may wish to use a more compact representation and use simple arrays instead. For example, `Circle` can be defined as:

```typescript
type Circle = (string | number)[];
const circle: Circle = ["circle", 1.0]; // [kind, radius]
```

But this construction is loose, and it is easy to make mistakes if you create something like `['circle', '1.0']`. We can make it stricter by using tuples:

```typescript
type Circle = [string, number];

// you'll get an error below
const circle: Circle = ["circle", "1.0"];
```

A good example of using tuples is `useState` in React.

```typescript
const [name, setName] = useState("");
```

Both compact and type-safe.

#9 Controlling the generality or specificity of inferred types

---

TypeScript uses sensible default behavior when doing type inference, designed to make writing code for common cases easy (so types don't need to be explicitly annotated). There are several ways to tune its behavior.

- Use const to narrow down to the most specific type

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

- Use `satisfies` to check types without affecting inferred types

  Take a look at the following examples:

```typescript
type NamedCircle = {
  radius: number;
  name?: string;
};

const circle: NamedCircle = { radius: 1.0, name: "yeah" };

// error because circle.name can be undefined
console.log(circle.name.length);
```

There is an error, this is because according to the declared type `NamedCircle` of `circle`, the name field can indeed be undefined even though the variable initializer provides a string value. Of course, we could remove the `:NamedCircle` type annotation, but that would loose the type checking on the validity of `circle` objects. dilemma.

Fortunately, Typescript 4.9 introduces a new `satisfies` keyword which allows you to check types without changing the inferred type:

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

The modified version has two advantages: the object literal is guaranteed to conform to the `NamedCircle` type, and the inferred type has a non-nullable name field.

## #10 Using infer to create additional generic type parameters

---

When designing utility functions and types, you will often find it necessary to use the type extracted from the given type parameter. In such cases, the `infer` keyword can come in handy. It can help infer new type parameters quickly. Here are two simple examples:

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

The working principle of the `infer` keyword in `T extends Promise<infer U>` can be understood as: Assuming that `T` is compatible with some instantiated generic Promise types, improvise a type parameter `U` to make it work . Thus, if `T` is instantiated as `Promise<string>`, the resolution of `U` will be `string`.

## #11 Innovative type operations to keep DRY

---

TypeScript provides a powerful type manipulation syntax and a set of very useful utilities that help you reduce code duplication to a minimum. Here are some simple examples:

Instead of repeating field declarations:

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

You might as well use the `pick` utility to extract new types:

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

Instead of copying the return type of the function:

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

Might as well use `ReturnType<T>` to extract:

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

Synchronize two types of `shape` (here `config` type and `Factory`) in parallel with it:

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

Instead, use mapped types and template literal types to automatically infer the correct `factory` type based on the shape of `config`:

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

## Summarize

---

This article introduces a series of advanced applications of the TypeScript language. In practice, you may find it uncommon to use this directly; however, these techniques are heavily used in libraries designed specifically for TypeScript: such as Prisma and tRPC. Knowing these techniques can help you better understand the power of these tools.
