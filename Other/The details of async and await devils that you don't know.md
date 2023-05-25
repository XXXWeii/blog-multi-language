---
title: The details of async and await devils that you don't know
lang: en-US
date: 2022-04-21 14:55:00
author: XXXWeii
tags:
  - Other
---

## 0. Preface

---

Regarding the use of `promise, async/await`, I believe many friends are familiar with it, but when it comes to **event loop mechanism output results** similar topics, do you dare to say that they know it?

give it a try?

🌰1:

```
async function async1 () {
     await new Promise((resolve, reject) => {
         resolve()
     })
     console. log('A')
}

async1()

new Promise((resolve) => {
     console. log('B')
     resolve()
}).then(() => {
     console. log('C')
}).then(() => {
     console. log('D')
})

// Final result 👉: B A C D
```

🌰2:

```
async function async1 () {
     await async2()
     console. log('A')
}

async function async2 () {
     return new Promise((resolve, reject) => {
         resolve()
     })
}

async1()

new Promise((resolve) => {
     console. log('B')
     resolve()
}).then(() => {
     console. log('C')
}).then(() => {
     console. log('D')
})

// Final result 👉: B C D A
```

❓ Why is there a difference in basically the same code, not much to say 👇

## 1. async function return value

---

Before discussing `await`, let’s talk about how the `async` function handles the return value. It will identify the type of the return value just like `Promise.prototype.then`.

👉**According to the type of the return value, the js engine handles the return value differently**

> 📑 Conclusion: When the `async` function throws a return value, it will start **different numbers of microtasks** according to the return value **type**
>
> - return result value: not `thenable`, not `promise` (do not wait)
> - return result value: `thenable` (waiting for 1 `then` time)
> - return result value: `promise` (waiting for 2 `then` time)

🌰1:

```
async function testA () {
     return 1;
}

testA().then(() => console.log(1));
Promise. resolve()
     .then(() => console.log(2))
     .then(() => console.log(3));

// (without waiting) final result 👉: 1 2 3
```

🌰2:

```
async function testB () {
     return {
         then (cb) {
             cb();
         }
     };
}

testB().then(() => console.log(1));
Promise. resolve()
     .then(() => console.log(2))
     .then(() => console.log(3));

// (wait for a then) final result 👉: 2 1 3
```

🌰3:

```
async function testC () {
     return new Promise((resolve, reject) => {
         resolve()
     })
}

testC().then(() => console.log(1));
Promise. resolve()
     .then(() => console.log(2))
     .then(() => console.log(3));

// (waiting for two then) final result 👉: 2 3 1




async function testC () {
     return new Promise((resolve, reject) => {
         resolve()
     })
}

testC().then(() => console.log(1));
Promise. resolve()
     .then(() => console.log(2))
     .then(() => console.log(3))
     .then(() => console.log(4))

// (waiting for two then) final result 👉: 2 3 1 4
```

After reading these three 🌰, do you have a deeper understanding of the `above conclusion`?

Don't be impatient, let's try a classic interview question 👇

```
async function async1 () {
     console. log('1')
     await async2()
     console.log('AAA')
}

async function async2 () {
     console. log('3')
     return new Promise((resolve, reject) => {
         resolve()
         console. log('4')
     })
}

console. log('5')

setTimeout(() => {
     console. log('6')
}, 0);

async1()

new Promise((resolve) => {
     console. log('7')
     resolve()
}).then(() => {
     console. log('8')
}).then(() => {
     console. log('9')
}).then(() => {
     console. log('10')
})
console. log('11')

// Final result 👉: 5 1 3 4 7 11 8 9 AAA 10 6
```

👀 Did you make a mistake?

Haha, no problem

> Step split 👇:
>
> 1. Execute the synchronous code first, and output `5`
>
> 2. Executing `setTimeout` is put into the macro task asynchronous queue
>
> 3. Then execute the `async1` function and output `1`
>
> 4. Execute `async2` function, output `3`
>
> 5. The code in the `Promise` constructor is a synchronous code, output `4`
>
> > The return value of the `async2` function is `Promise`, and it will be released after waiting for `2` `then`, so `AAA` cannot be output temporarily
>
> 6. `async1` function **temporary** ends, continue to go down, output `7`
>
> 7. Synchronous code, output `11`
>
> 8. Execute the first `then`, output `8`
>
> 9. Execute the second `then`, output `9`
>
> 10. Finally **wait** until the two `then`s are executed, execute the rest of the `async1` function, and output `AAA`
>
> 11. Execute the last microtask `then` and output `10`
>
> 12. Execute the last macrotask `setTimeout`, output `6`

❓ Is it suddenly clear, welcome to like and collect!

## 2. Differences between await rvalue types

---

### 2.1, non `thenable`

🌰1:

```
async function test () {
     console. log(1);
     await 1;
     console. log(2);
}

test();
console. log(3);
// Final result 👉: 1 3 2
```

🌰2:

```
function func () {
     console. log(2);
}

async function test () {
     console. log(1);
     await func();
     console. log(3);
}

test();
console. log(4);

// Final result 👉: 1 2 4 3
```

🌰3:

```
async function test () {
     console. log(1);
     await 123
     console. log(2);
}

test();
console. log(3);

Promise. resolve()
     .then(() => console.log(4))
     .then(() => console.log(5))
     .then(() => console.log(6))
     .then(() => console.log(7));

// Final result 👉: 1 3 2 4 5 6 7
```

> Note:
>
> `await` followed by a non-`thenable` type will immediately add a microtask `then` to the microtask queue, **but no need to wait**

### 2.2, `thenable` type

```
async function test () {
     console. log(1);
     await {
         then (cb) {
             cb();
         },
     };
     console. log(2);
}

test();
console. log(3);

Promise. resolve()
     .then(() => console.log(4))
     .then(() => console.log(5))
     .then(() => console.log(6))
     .then(() => console.log(7));

// Final result 👉: 1 3 4 2 5 6 7
```

> Note:
>
> `await` is followed by `thenable` type, which needs to be executed after **waiting for a `then` time

### 2.3, `Promise` type

```
async function test () {
     console. log(1);
     await new Promise((resolve, reject) => {
         resolve()
     })
     console. log(2);
}

test();
console. log(3);

Promise. resolve()
     .then(() => console.log(4))
     .then(() => console.log(5))
     .then(() => console.log(6))
     .then(() => console.log(7));

// Final result 👉: 1 3 2 4 5 6 7
```

❓ Why does it behave the same as a non `thenable` value? Why not wait for two `then`s?

> Note:
>
> - TC 39 (the ECMAScript standard setter) made a modification to how to handle `await` followed by `promise`, **removed** two additional microtasks, in **earlier versions**, Will still wait for two `then` time
> - Someone translated the official explanation: **faster async functions and promises**[1], but the `thenable` is not modified in this update

---

Doing so can greatly optimize the speed of `await` waiting 👇

```
async function func () {
     console. log(1);
     await 1;
     console. log(2);
     await 2;
     console. log(3);
     await 3;
     console. log(4);
}

async function test () {
     console. log(5);
     await func();
     console. log(6);
}

test();
console. log(7);

Promise. resolve()
     .then(() => console.log(8))
     .then(() => console.log(9))
     .then(() => console.log(10))
     .then(() => console.log(11));

// Final result 👉: 5 1 7 2 8 3 9 4 10 6 11
```

>Note:
>
>`await` and `Promise.prototype.then` are often equivalent in **chronological order**, but there is an **essential difference** between them.

> - The `await` in the `test` function will wait for all the `await` in the `func` function to get the command to resume function execution and the command to get **resume function execution** after the entire function is executed;
> - That is to say, the `await` of the `func` function **cannot be equivalent** `then` in time order at this time, but waits until the `test` function is completely executed;
> - For example, the number `6` here is output very late, **if** is simply regarded as `then`, `6` should be output as a synchronous code when the next microtask queue is executed.

---

So we can merge the code of the two functions 👇

```
async function test () {
     console. log(5);

     console. log(1);
     await 1;
     console. log(2);
     await 2;
     console. log(3);
     await 3;
     console. log(4);
     await null;

     console. log(6);
}

test();
console. log(7);

Promise. resolve()
     .then(() => console.log(8))
     .then(() => console.log(9))
     .then(() => console.log(10))
     .then(() => console.log(11));

// Final result 👉: 5 1 7 2 8 3 9 4 10 6 11
```

---

Because the original function is fused, `await` at this time can be equivalent to `Promise.prototype.then`, and it can be completely equivalent to the following code 👇

```
async function test () {
     console. log(5);
     console. log(1);
     Promise. resolve()
         .then(() => console.log(2))
         .then(() => console.log(3))
         .then(() => console.log(4))
         .then(() => console.log(6))
}

test();
console. log(7);

Promise. resolve()
     .then(() => console.log(8))
     .then(() => console.log(9))
     .then(() => console.log(10))
     .then(() => console.log(11));

// Final result 👉: 5 1 7 2 8 3 9 4 10 6 11
```

---

The above three writing methods are completely equivalent in the order of time, so you can regard the code after `await` as the result of executing it in `then`, and because the `async` function will return `promise ` Instance, so it can also be equivalent to 👇

```
async function test () {
     console. log(5);
     console. log(1);
}

test()
     .then(() => console.log(2))
     .then(() => console.log(3))
     .then(() => console.log(4))
     .then(() => console.log(6))

console. log(7);

Promise. resolve()
     .then(() => console.log(8))
     .then(() => console.log(9))
     .then(() => console.log(10))
     .then(() => console.log(11));

// Final result 👉: 5 1 7 2 8 3 9 4 10 6 11
```

It can be found that the `test` function is all synchronous code...

So 👉: **`async/await` is a synchronous way to perform asynchronous operations**

## 3、🌰

---

🌰1:

```
async function async2 () {
     new Promise((resolve, reject) => {
         resolve()
     })
}

async function async3 () {
     return new Promise((resolve, reject) => {
         resolve()
     })
}

async function async1 () {
     // Method 1: Final result: B A C D
     // await new Promise((resolve, reject) => {
     // resolve()
     // })

     // Method 2: Final result: B A C D
     // await async2()

     // Method 3: Final result: B C D A
     await async3()

     console. log('A')
}

async1()

new Promise((resolve) => {
     console. log('B')
     resolve()
}).then(() => {
     console. log('C')
}).then(() => {
     console. log('D')
})
```

> General idea 👇:
>
> - First, the overall return value of an `async` function is always a `Promise`, no matter what the value itself is**
> - Method 1: `await` is `Promise`, no need to wait
> - Method 2: `await` is an `async` function, but the return value of the function itself is **not `thenable`**, no need to wait
> - Method 3: `await` is `async` function, and the return value itself is `Promise`, need to wait for two `then` time

🌰2:

```
function func () {
     console. log(2);

     // Method 1: 1 2 4 5 3 6 7
     // Promise. resolve()
     // .then(() => console.log(5))
     // .then(() => console.log(6))
     // .then(() => console.log(7))

     // Method 2: 1 2 4 5 6 7 3
     return Promise. resolve()
         .then(() => console.log(5))
         .then(() => console.log(6))
         .then(() => console.log(7))
}

async function test () {
     console. log(1);
     await func();
     console. log(3);
}

test();
console. log(4);
```

> Step split 👇:
>
> - Method 1:
>
> - - The synchronous code outputs `1, 2`, then adds `then1` at `log(5)` to the microtask queue, `await` gets the exact `func` function return value `undefined`, and the subsequent code Put it into the microtask queue (`then2`, you can understand it like this)
> - Execute the synchronous code and output `4`, so far, all synchronous codes are completed
> - Execute the first placed microtask `then1` output `5`, generate `log(6)` microtask `then3`
> - Execute the second placed microtask `then2` output `3`
> - Then execute microtask `then3`, output `6`, generate `log(7)` microtask `then4`
> - Execute `then4`, output `7`
>
> - Method 2:
>
> - - The synchronous code outputs `1, 2`, `await` gets the return value of the `func` function, but does not get **specific results** (determined by the mechanism of `Promise` itself), suspend the execution of the current `async `Code inside the function (jump out, give way)
> - Output `4`, so far, all synchronous codes are completed
> - `await` waits until `Promise.resolve().then...` is executed, and then releases `3`

Method 2 I don’t quite understand ❓

continue 👇

```
function func () {
     console. log(2);

     return Promise. resolve()
         .then(() => console.log(5))
         .then(() => console.log(6))
         .then(() => console.log(7))
}

async function test () {
     console. log(1);
     await func()
     console. log(3);
}

test();
console. log(4);

new Promise((resolve) => {
     console. log('B')
     resolve()
}).then(() => {
     console. log('C')
}).then(() => {
     console. log('D')
})

// Final result 👉: 1 2 4 B 5 C 6 D 7 3
```

Still don't get it?

continue 👇

```
async function test () {
     console. log(1);
     await Promise. resolve()
         .then(() => console.log(5))
         .then(() => console.log(6))
         .then(() => console.log(7))
     console. log(3);
}

test();
console. log(4);

new Promise((resolve) => {
     console. log('B')
     resolve()
}).then(() => {
     console. log('C')
}).then(() => {
     console. log('D')
})

// Final result 👉: 1 4 B 5 C 6 D 7 3
```

> Note:
>
> To sum up, `await` must wait until the expression on the right has **exact value** before releasing it, otherwise it will wait forever (blocking the subsequent code in the current `async` function), if you are not convinced, take a look at this 👇
>
> - ```
> function func () {
> return new Promise((resolve) => {
> console. log('B')
> // resolve() deliberately keeps pending
> })
> }
>
> async function test () {
> console. log(1);
> await func()
> console. log(3);
> }
>
> test();
> console. log(4);
> // final result 👉: 1 B 4 (3 will never be printed)
> ```
> 
> 
> // --------------------- or written as 👇-------------------
> async function test () {
> console. log(1);
> await new Promise((resolve) => {
> console. log('B')
> // resolve() deliberately keeps pending
> })
> console. log(3);
> }
> 
> test();
> console. log(4);
> // final result 👉: 1 B 4 (3 will never be printed)
> 
> ```
>
> ```

🌰3:

```
async function func () {
     console. log(2);
     return {
         then (cb) {
             cb()
         }
     }
}

async function test () {
     console. log(1);
     await func();
     console. log(3);
}

test();
console. log(4);

new Promise((resolve) => {
     console. log('B')
     resolve()
}).then(() => {
     console. log('C')
}).then(() => {
     console. log('D')
})

// Final result 👉: 1 2 4 B C 3 D
```

> Step split 👇:
>
> - synchronous code outputs `1, 2`
> - `await` gets the specific return value `thenable` of the `func` function, and puts the subsequent code in the current `async` function into the microtask `then1` (but it needs to wait for a `then` time)
> - synchronous code outputs `4, B`, microtask `then2` that generates `log(C)`
> - Because `then1` lags behind by a `then` time, execute `then2` directly to output `C`, and generate `log(D)` microtask `then3`
> - Execute the microtask `then1` that was originally delayed by a `then` time, and output `3`
> - Execute the last microtask `then3` output `D`

## 4. Summary

---

> `async` function return value
>
> - 📑 Conclusion: When the `async` function throws a return value, it will start **different numbers of microtasks** according to the return value **type**
>
> - - return result value: not `thenable`, not `promise` (do not wait)
> - return result value: `thenable` (waiting for 1 `then` time)
> - return result value: `promise` (waiting for 2 `then` time)
>
> The difference between `await` rvalue types
>
> - Receive a non-`thenable` type, a microtask `then` will be added to the microtask queue immediately, **but no need to wait**
>
> - connected to the `thenable` type, you need to **wait for a `then` time before executing**
>
> - Receive the `Promise` type (with a definite return value), and immediately add a microtask `then` to the microtask queue, **but no need to wait**
>
> - - TC 39 made a modification to how to deal with `await` followed by `promise`, **removed** two extra microtasks, in **earlier version**, it will still wait for two `then` time

### References

---

[1] https://juejin.cn/post/6844903715342647310#heading-3: *https://juejin.cn/post/6844903715342647310#heading-3*
