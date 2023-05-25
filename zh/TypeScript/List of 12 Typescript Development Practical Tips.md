---
title: 12个Typescript开发实用技巧清单
lang: zh-CN
date: 2022-04-22 14:55:00
author: XXXWeii
tags:
  - TypeScript
---

Typescript 在类型检查方面非常强大，但有时某些类型是其他类型的子集并且需要为它们定义类型检查时，它会变得乏味。

举个例子，有两种响应类型：

## 用户配置文件响应

---

```typescript
interface UserProfileResponse {
  id: number;
  name: string;
  email: string;
  phone: string;
  avatar: string;
}
```

## 登录响应

---

```typescript
interface LoginResponse {
  id: number;
  name: string;
}
```

我们可以为 UserProfileResponse 定义类型并为 LoginResponse 选择一些属性，而不是定义相同上下文 LoginResponse 和 UserProfileResponse 的类型。

```typescript
type LoginResponse = Pick<UserProfileResponse, "id" | "name">;
```

让我们了解一些可以帮助您编写更好代码的实用函数。

## 01、Uppercase

---

构造一个 Type 的所有属性都设置为大写的类型。

```typescript
type Role = "admin" | "user" | "guest";
// Bad practice
type UppercaseRole = "ADMIN" | "USER" | "GUEST";
// Good practice
type UppercaseRole = Uppercase<Role>; // "ADMIN" | "USER" | "GUEST"
```

## 02、Lowercase

---

构造一个 Type 的所有属性都设置为小写的类型，与大写相反。

```typescript
type Role = "ADMIN" | "USER" | "GUEST";
// Bad practice
type LowercaseRole = "admin" | "user" | "guest";
// Good practice
type LowercaseRole = Lowercase<Role>; // "admin" | "user" | "guest"
```

## 03、Capitalize

---

构造一个将 Type 的所有属性设置为大写的类型。

```typescript
type Role = "admin" | "user" | "guest";
// Bad practice
type CapitalizeRole = "Admin" | "User" | "Guest";
// Good practice
type CapitalizeRole = Capitalize<Role>; // "Admin" | "User" | "Guest"
```

## 04、Uncapitalize

---

构造一个将 Type 的所有属性设置为 uncapitalize 的类型，与首字母大写相反。

```typescript
type Role = "Admin" | "User" | "Guest";
// Bad practice
type UncapitalizeRole = "admin" | "user" | "guest";
// Good practice
type UncapitalizeRole = Uncapitalize<Role>; // "admin" | "user" | "guest"
```

## 05、Partial

---

构造一个类型，其中 Type 的所有属性都设置为可选。

```typescript
interface User {
  name: string;
  age: number;
  password: string;
}
// Bad practice
interface PartialUser {
  name?: string;
  age?: number;
  password?: string;
}
// Good practice
type PartialUser = Partial<User>;
```

Required 构造一个类型，该类型由设置为 required 的 Type 的所有属性组成，Opposite 的对面。

```typescript
interface User {
  name?: string;
  age?: number;
  password?: string;
}
// Bad practice
interface RequiredUser {
  name: string;
  age: number;
  password: string;
}
// Good practice
type RequiredUser = Required<User>;
```

## 06、Readonly

---

构造一个类型，该类型由设置为只读的 Type 的所有属性组成。

```typescript
interface User {
  role: string;
}
// Bad practice
const user: User = { role: "ADMIN" };
user.role = "USER";
// Good practice
type ReadonlyUser = Readonly<User>;
const user: ReadonlyUser = { role: "ADMIN" };
user.role = "USER";
// Error: Cannot assign to 'role' because it is a read-only property.
```

## 07、Record

---

构造一个具有一组类型 T 的属性 K 的类型，每个属性 K 都映射到类型 T。

```typescript
interface Address {
  street: string;
  pin: number;
}
interface Addresses {
  home: Address;
  office: Address;
}
// Alternative ✅
type AddressesRecord = Record<"home" | "office", Address>;
```

## 08、Pick

---

只选择键在联合类型键中的 Type 的属性。

```typescript
interface User {
  name: string;
  age: number;
  password: string;
}
// Bad practice
interface UserPartial {
  name: string;
  age: number;
}
// Good practice
type UserPartial = Pick<User, "name" | "age">;
```

## 09、Omit

---

Omit 其键在联合类型键中的 Type 属性。

```typescript
interface User {
  name: string;
  age: number;
  password: string;
}
// Bad practice
interface UserPartial {
  name: string;
  age: number;
}
// Good practice
type UserPartial = Omit<User, "password">;
```

## 10、Exclude

---

构造一个具有 Type 的所有属性的类型，除了键在联合类型 Excluded 中的那些。

```typescript
type Role = "ADMIN" | "USER" | "GUEST";
// Bad practice
type NonAdminRole = "USER" | "GUEST";
// Good practice
type NonAdmin = Exclude<Role, "ADMIN">; // "USER" | "GUEST"
```

## 11、Extract

---

构造一个具有 Type 的所有属性的类型，其键在联合类型 Extract 中。

```typescript
type Role = "ADMIN" | "USER" | "GUEST";
// Bad practice
type AdminRole = "ADMIN";
// Good practice
type Admin = Extract<Role, "ADMIN">; // "ADMIN"
```

## 12、NonNullable

---

构造一个类型，其中 Type 的所有属性都设置为不可为空。

```typescript
type Role = "ADMIN" | "USER" | null;
// Bad practice
type NonNullableRole = "ADMIN" | "USER";
// Good practice
type NonNullableRole = NonNullable<Role>; // "ADMIN" | "USER"
```

## 总结

---

到这里，今天要分享的内容就全部结束了。
