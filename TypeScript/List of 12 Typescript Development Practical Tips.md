---
title: List of 12 Typescript Development Practical Tips
lang: en-US
date: 2022-04-22 14:55:00
author: XXXWeii
tags:
  - TypeScript
---

Typescript is very powerful when it comes to type checking, but sometimes it can get tedious when some types are subsets of other types and type checking needs to be defined for them.

For example, there are two response types:

## User Profile Response

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

## login response

---

```typescript
interface LoginResponse {
  id: number;
  name: string;
}
```

Instead of defining types for the same context LoginResponse and UserProfileResponse , we could define a type for UserProfileResponse and select some properties for LoginResponse .

```typescript
type LoginResponse = Pick<UserProfileResponse, "id" | "name">;
```

Let's take a look at some utility functions that can help you write better code.

## 01、 Uppercase

---

Constructs a Type with all properties set to uppercase.

```typescript
type Role = "admin" | "user" | "guest";
// Bad practice
type UppercaseRole = "ADMIN" | "USER" | "GUEST";
// Good practice
type UppercaseRole = Uppercase<Role>; // "ADMIN" | "USER" | "GUEST"
```

## 02、Lowercase

---

Constructs a Type with all properties set to lowercase, as opposed to uppercase.

```typescript
type Role = "ADMIN" | "USER" | "GUEST";
// Bad practice
type LowercaseRole = "admin" | "user" | "guest";
// Good practice
type LowercaseRole = Lowercase<Role>; // "admin" | "user" | "guest"
```

## 03、Capitalize

---

Constructs a type with all properties of Type set to uppercase.

```typescript
type Role = "admin" | "user" | "guest";
// Bad practice
type CapitalizeRole = "Admin" | "User" | "Guest";
// Good practice
type CapitalizeRole = Capitalize<Role>; // "Admin" | "User" | "Guest"
```

## 04、Uncapitalize

---

Constructs a type that has all properties of Type set to uncapitalize, the opposite of capitalizing the first letter.

```typescript
type Role = "Admin" | "User" | "Guest";
// Bad practice
type UncapitalizeRole = "admin" | "user" | "guest";
// Good practice
type UncapitalizeRole = Uncapitalize<Role>; // "admin" | "user" | "guest"
```

## 05、Partial

---

Constructs a type with all properties of Type set to optional.

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

Required constructs a type consisting of all properties of Type set to required, the opposite of Opposite.

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

Constructs a type consisting of all properties of Type set to read-only.

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

Constructs a type with a set of properties K of type T, each of which K maps to type T.

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

Only select properties of Type whose keys are in the union type key.

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

Omit the Type property whose key is in the union type key.

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

Constructs a type with all properties of Type except those whose keys are in the union type Excluded.

```typescript
type Role = "ADMIN" | "USER" | "GUEST";
// Bad practice
type NonAdminRole = "USER" | "GUEST";
// Good practice
type NonAdmin = Exclude<Role, "ADMIN">; // "USER" | "GUEST"
```

## 11、Extract

---

Constructs a type with all properties of Type whose keys are in the union type Extract.

```typescript
type Role = "ADMIN" | "USER" | "GUEST";
// Bad practice
type AdminRole = "ADMIN";
// Good practice
type Admin = Extract<Role, "ADMIN">; // "ADMIN"
```

## 12、NonNullable

---

Constructs a type with all properties of Type set to be non-nullable.

```typescript
type Role = "ADMIN" | "USER" | null;
// Bad practice
type NonNullableRole = "ADMIN" | "USER";
// Good practice
type NonNullableRole = NonNullable<Role>; // "ADMIN" | "USER"
```

## Summarize

---

At this point, all the content to be shared today is over.
