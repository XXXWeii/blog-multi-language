---
title: A More Elegant Way to Write Complicated Judgments in JavaScript
lang: en-US
date: 2023-04-12 14:55:00
author: XXXWeii
tags:
  - JavaScript
---

When we write js code, we often encounter complex logic judgments. Usually, you can use `if/else` or `switch` to realize multiple condition judgments, but there will be a problem. With the increase of logic complexity, the code The `if/else/switch` in will become more and more bloated and more and more incomprehensible, so how to write judgment logic more elegantly, this article will take you to try it.

## for example

---

First look at a piece of code:

```js
/**
  * Button click event
  * @param {number} status activity status: 1 group start in progress 2 group start failed 3 products sold out 4 group start successful 5 system canceled
  */
const onButtonClick = (status) => {
   if (status == 1) {
     sendLog("processing");
     jumpTo("IndexPage");
   } else if (status == 2) {
     sendLog("fail");
     jumpTo("FailPage");
   } else if (status == 3) {
     sendLog("fail");
     jumpTo("FailPage");
   } else if (status == 4) {
     sendLog("success");
     jumpTo("SuccessPage");
   } else if (status == 5) {
     sendLog("cancel");
     jumpTo("CancelPage");
   } else {
     sendLog("other");
     jumpTo("Index");
   }
};
```

You can see the click logic of this button through the code: do two things according to different activity states, send the log buried point and jump to the corresponding page. You can easily propose a rewriting plan for this code, and `switch` appears:

```js
/**
  * Button click event
  * @param {number} status activity status: 1 group start in progress 2 group start failed 3 products sold out 4 group start successful 5 system canceled
  */
const onButtonClick = (status) => {
   switch (status) {
     case 1:
       sendLog("processing");
       jumpTo("IndexPage");
       break;
     case 2:
     case 3:
       sendLog("fail");
       jumpTo("FailPage");
       break;
     case 4:
       sendLog("success");
       jumpTo("SuccessPage");
       break;
     case 5:
       sendLog("cancel");
       jumpTo("CancelPage");
       break;
     default:
       sendLog("other");
       jumpTo("Index");
       break;
   }
};
```

Well, this looks much clearer than `if/else`, careful students also found a little trick, when `case 2` and `case 3` have the same logic, you can omit the execution statement and `break`, then` The case of case 2` automatically executes the logic of `case 3`.

At this time, some students will say that there is an easier way to write:

```js
const actions = {
   1: ["processing", "IndexPage"],
   2: ["fail", "FailPage"],
   3: ["fail", "FailPage"],
   4: ["success", "SuccessPage"],
   5: ["cancel", "CancelPage"],
   default: ["other", "Index"],
};
/**
  * Button click event
  * @param {number} status Activity status: 1. The group is in progress. 2. The group has failed. 3. The product is sold out. 4. The group has been successfully started. 5. The system has been cancelled.
  */
const onButtonClick = (status) => {
   let action = actions[status] || actions["default"],
     logName = action[0],
     pageName = action[1];
   sendLog(logName);
   jumpTo(pageName);
};
```

The above code does look more refreshing. The cleverness of this method is that the judgment condition is used as the attribute name of the object, and the processing logic is used as the attribute value of the object. When the button is clicked, it is searched through the object attribute. Logical judgment, this writing method is especially suitable for the case of unary conditional judgment.

Is there any other way to write it? some:

```js
const actions = new Map([
   [1, ["processing", "IndexPage"]],
   [2, ["fail", "FailPage"]],
   [3, ["fail", "FailPage"]],
   [4, ["success", "SuccessPage"]],
   [5, ["cancel", "CancelPage"]],
   ["default", ["other", "Index"]],
]);
/**
  * Button click event
  * @param {number} status activity status: 1 group start in progress 2 group start failed 3 products sold out 4 group start successful 5 system canceled
  */
const onButtonClick = (status) => {
   let action = actions.get(status) || actions.get("default");
   sendLog(action[0]);
   jumpTo(action[1]);
};
```

Isn't it better to use the `Map` object in es6 in this way? What is the difference between `Map` object and `Object` object?

- An object usually has its own prototype, so an object always has a "`prototype`" key.
- The keys of an object can only be strings or `Symbols`, but the keys of a `Map` can be any value.
- You can easily get the number of key-value pairs of a `Map` through the `size` attribute, while the number of key-value pairs of an object can only be confirmed manually.

We need to upgrade the problem. In the past, we only needed to judge `status` when the button was clicked. Now we also need to judge the identity of the user:

```js
/**
  * Button click event
  * @param {number} status Activity status: 1. The tour is in progress. 2. The tour failed. 3. The tour is successful. 4. The product is sold out.
  * @param {string} identity identity: guest guest state master main state
  */
const onButtonClick = (status, identity) => {
   if (identity == "guest") {
     if (status == 1) {
       //do sth
     } else if (status == 2) {
       //do sth
     } else if (status == 3) {
       //do sth
     } else if (status == 4) {
       //do sth
     } else if (status == 5) {
       //do sth
     } else {
       //do sth
     }
   } else if (identity == "master") {
     if (status == 1) {
       //do sth
     } else if (status == 2) {
       //do sth
     } else if (status == 3) {
       //do sth
     } else if (status == 4) {
       //do sth
     } else if (status == 5) {
       //do sth
     } else {
       //do sth
     }
   }
};
```

Forgive me for not writing the specific logic in each judgment, because the code is too lengthy.

Forgive me for using `if/else` again, because I see that many people are still using `if/else` to write such long logical judgments.

From the above example, we can see that when your logic is upgraded to binary judgment, your judgment amount will double, and your code size will also double. How can you write more refreshingly at this time?

```js
const actions = new Map([
   [
     "guest_1",
     () => {
       /*do sth*/
     },
   ],
   [
     "guest_2",
     () => {
       /*do sth*/
     },
   ],
   [
     "guest_3",
     () => {
       /*do sth*/
     },
   ],
   [
     "guest_4",
     () => {
       /*do sth*/
     },
   ],
   [
     "guest_5",
     () => {
       /*do sth*/
     },
   ],
   [
     "master_1",
     () => {
       /*do sth*/
     },
   ],
   [
     "master_2",
     () => {
       /*do sth*/
     },
   ],
   [
     "master_3",
     () => {
       /*do sth*/
     },
   ],
   [
     "master_4",
     () => {
       /*do sth*/
     },
   ],
   [
     "master_5",
     () => {
       /*do sth*/
     },
   ],
   [
     "default",
     () => {
       /*do sth*/
     },
   ],
]);

/**
  * Button click event
  * @param {string} identity identity: guest guest state master main state
  * @param {number} status Activity status: 1 The tour is in progress 2 The tour failed 3 The tour was successful 4 The product is sold out 5 There is inventory but the tour has not started
  */
const onButtonClick = (identity, status) => {
   let action = actions.get(`${identity}_${status}`) || actions.get("default");
   action. call(this);
};
```

The core logic of the above code is: concatenate the two conditions into a string, and search and execute the `Map` object with the concatenated string as the key and the processing function as the value. This method is especially good when judging multiple conditions use.

Of course, if the above code is implemented with the `Object` object, it is similar:

```js
const actions = {
  guest_1: () => {
    /*do sth*/
  },
  guest_2: () => {
    /*do sth*/
  },
  //....
};

const onButtonClick = (identity, status) => {
  let action = actions[`${identity}_${status}`] || actions["default"];
  action.call(this);
};
```

If some students feel that it is a bit awkward to spell the query conditions into a string, there is another solution, which is to use the `Map` object with the `Object` object as the key:

```js
const actions = new Map([
   [
     { identity: "guest", status: 1 },
     () => {
       /*do sth*/
     },
   ],
   [
     { identity: "guest", status: 2 },
     () => {
       /*do sth*/
     },
   ],
   //...
]);

const onButtonClick = (identity, status) => {
   let action = [...actions]. filter(
     ([key, value]) => key.identity == identity && key.status == status
   );
   action.forEach(([key, value]) => value.call(this));
};
```

Is it a little more advanced?

Here we can also see the difference between `Map` and `Object`, `Map` can use any type of data as a key.

Now let's upgrade the difficulty a little bit. What if the processing logic of `status1-4` is the same in the case of `guest`, the worst case is this:

```js
const actions = new Map([
   [
     { identity: "guest", status: 1 },
     () => {
       /* functionA */
     },
   ],
   [
     { identity: "guest", status: 2 },
     () => {
       /* functionA */
     },
   ],
   [
     { identity: "guest", status: 3 },
     () => {
       /* functionA */
     },
   ],
   [
     { identity: "guest", status: 4 },
     () => {
       /* functionA */
     },
   ],
   [
     { identity: "guest", status: 5 },
     () => {
       /* functionB */
     },
   ],
   //...
]);
```

A better way to write is to cache the processing logic function:

```js
const actions = () => {
   const functionA = () => {
     /*do sth*/
   };
   const functionB = () => {
     /*do sth*/
   };
   return new Map([
     [{ identity: "guest", status: 1 }, functionA],
     [{ identity: "guest", status: 2 }, functionA],
     [{ identity: "guest", status: 3 }, functionA],
     [{ identity: "guest", status: 4 }, functionA],
     [{ identity: "guest", status: 5 }, functionB],
     //...
   ]);
};

const onButtonClick = (identity, status) => {
   let action = [...actions()]. filter(
     ([key, value]) => key.identity == identity && key.status == status
   );
   action.forEach(([key, value]) => value.call(this));
};
```

Writing in this way can already meet daily needs, but seriously, it is still a bit uncomfortable to rewrite `functionA` 4 times above. If the judgment conditions become particularly complicated, for example, `identity` has 3 states, and `status` has 10 states state, then you need to define 30 pieces of processing logic, and often many of these logics are the same, which seems to be what the author does not want to accept, so it can be implemented like this:

```js
const actions = () => {
   const functionA = () => {
     /*do sth*/
   };
   const functionB = () => {
     /*do sth*/
   };
   return new Map([
     [/^guest_[1-4]$/, functionA],
     [/^guest_5$/, functionB],
     //...
   ]);
};

const onButtonClick = (identity, status) => {
   let action = [...actions()]. filter(([key, value]) =>
     key.test(`${identity}_${status}`)
   );
   action.forEach(([key, value]) => value.call(this));
};
```

The advantage of `Map` here is more prominent, you can use the regular type as the key, so there are infinite possibilities, if the demand becomes, a log burial point must be sent for any `guest` situation, and different `status` situations also need to be separated Logical processing, then we can write:

```js
const actions = () => {
   const functionA = () => {
     /*do sth*/
   };
   const functionB = () => {
     /*do sth*/
   };
   const functionC = () => {
     /*send log*/
   };
   return new Map([
     [/^guest_[1-4]$/, functionA],
     [/^guest_5$/, functionB],
     [/^guest_.*$/, functionC],
     //...
   ]);
};

const onButtonClick = (identity, status) => {
   let action = [...actions()]. filter(([key, value]) =>
     key.test(`${identity}_${status}`)
   );
   action.forEach(([key, value]) => value.call(this));
};
```

That is to say, using the characteristics of the array loop, the logic that meets the regular conditions will be executed, and then the common logic and individual logic can be executed at the same time. Because of the existence of the regular, you can open your imagination to unlock more ways to play, so I won’t go into details in this article. .

## Summarize

---

This article has taught you 8 ways to write logical judgments, including:

- `if/else`
- `switch`
- Unary judgment: save in `Object`
- Unary judgment: save in `Map`
- For multiple judgments: concatenate the condition into a string and store it in `Object`
- For multiple judgments: concatenate the condition into a string and store it in `Map`
- For multiple judgments: save the condition as `Object` and save it in `Map`
- Multi-judgment: write the condition as regular and save it in `Map`
