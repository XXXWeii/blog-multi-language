---
title: Interviewer If there are 100 requests, how do you use Promise to control concurrency?
lang: en-US
author: XXXWeii
date: 2023-05-11 14:55:00
tags:
  - 其他
---

> Author: Jet Tsang
>
> https://juejin.cn/post/7219961144584552504

## Preface

------

Now in the interview process, handwritten questions must be indispensable, and the most encountered ones are nothing more than "request concurrency control". Now basically front-end projects use axios to realize the encapsulation of asynchronous requests, so this is actually a test of your understanding of Promise and asynchronous programming.

## export

------

topic:

```js
// Design a function that can limit the concurrency of requests, and call the callback function after the request ends
// sendRequest(requestList:, limits, callback): void
sendRequest(

[()=>request('1'),

()=>request('2'),

()=>request('3'),

()=>request('4')],

3, //Concurrent number

(res)=>{

     console. log(res)

})

// Where request can be:
function request (url, time=1){

     return new Promise((resolve,reject)=>{

         setTimeout(()=>{

             console.log('End of request:'+url);

             if(Math. random() > 0.5){

                 resolve('success')

             }else{

                 reject('error;')

             }

         },time*1e3)

     })
}
```

## Clear concept

------

⚠️ Here are a few concepts that need to be clarified

- Concurrency: Concurrency is the execution of multiple tasks alternately at the same time (because the cpu executes instructions very fast, it does not need to execute codes one by one in sequence, so the efficiency is even lower), so it looks like they are executed together. So it's called concurrency.
- Parallel: It can be understood as multiple physical CPUs or distributed systems, which are truly 'simultaneous' execution
- Concurrency control: It means multiple concurrent tasks. Once a task is completed, the next task will be started immediately
- Slicing control: assign concurrent tasks to slices, for example, 10 tasks, cut into 2 slices, each slice has 5 tasks, and the task of the current slice is completed, and then the task of the next slice is started, so that the efficiency is obviously not concurrent control so high

## Ideas

------

First execute the concurrent tasks that can be executed. According to the concept of concurrency, after each task is executed, pick up the next task to be executed.

Split key steps into appropriate functions to organize code

1. Loop to start the tasks that can be executed
2. Take out the task and push it to the executor for execution
3. Update the current concurrency number in the executor and trigger the pick-up task
4. In the pick-up task, the final callback function can be triggered and the executor can be called to continue executing the task

## accomplish

------

1. Define constants and functions

    ```js
    function sendRequest(requestList, limits, callback) {
        // Define the execution queue, representing all tasks to be executed
        const promises = requestList. slice()
        // Define the number of concurrency that can be executed at the beginning
        const concurrentNum = Math.min(limits,requestList.length)
        let concurrentCount = 0 // current concurrent count
        // Start the task that can be executed for the first time
        const runTaskNeeded = () => {
            let i = 0
            while(i<concurrentNum){
                runTask()
            }
        }
       
        // fetch task and push to executor
        const runTask = () => {}
       
        // Executor, here to execute the task
        const runner = () => {}
       
        // pick up the next task
        const picker = ()=>{}
        // Begin execution!
        runTaskNeeded()
    }
    ```

2. Implement the corresponding function

    ```js
    function sendRequest(requestList, limits, callback) {
      
        const promises = requestList.slice() // Get the request list (shallow copy)
      
        // Get the number of concurrency that can be executed at the beginning
      
        const concurrentNum = Math.min(limits,requestList.length)
      
        let concurrentCount = 0 // current concurrent count
      
        // For the first time, run concurrent tasks first
      
        const runTaskNeeded = () => {
      
            let i = 0
      
            // Start the currently executable task
      
            while(i<concurrentNum){
      
                i++
      
                runTask()
      
            }
      
        }
      
        // fetch the task and execute the task
      
        const runTask = () => {
      
            const task = promises. shift()
      
            task && runner(task)
      
        }

   


```js
    // Actuator
   
    // Execute the task and update the current concurrent number at the same time
   
    const runner = async (task) => {
   
        try {
   
            concurrentCount++
   
            await task()
   
        } catch (error) {
   
        }finally{
   
            // concurrent number --
   
            concurrentCount--
           
            // pick up the next task
            picker()
   
        }
   
    }
   
// pick up the next task
   
    const picker = () => {
       
        // Execute when there are still tasks in the task queue and there are remaining concurrent numbers
        if(concurrentCount < limits && promises. length > 0 ){
   
            // continue to execute the task
   
            runTask()
   
        // When the queue is empty and the request pool is cleared, the final callback function can be executed
   
        }else if(promises. length ==0 && concurrentCount ==0 ){
   
            // end of execution
   
            callback && callback()
   
        }
   
    }
        // entry execution
   
    runTaskNeeded()
   
}
```

## Another implementation

------

The core code is to judge when you [a task is completed], and then judge whether there are remaining tasks to execute. You can first maintain a pool (representing the currently executing tasks), and use the await Promise.race pool to know whether any tasks have been executed?

```js
async function sendRequest(requestList, limits, callback) {

     // maintain a queue of promises

     const promises = []

     // The current concurrent pool can be easily deleted with the Set structure

     const pool = new Set() // set is also of type Iterable<any>[], so it can be put into race

     // start executing all tasks concurrently

     for(let request of requestList){

         // Before starting execution, await to judge whether the current concurrent tasks exceed the limit

         if(pool. size >= limits){

             // Because there is no try catch here, it is necessary to catch the error, otherwise it will affect the execution of the following microtasks


             await Promise. race(pool)

             .catch(err=>err)

         }

         const promise = request()// get the promise

         // After the deletion request ends, remove it from the pool

         const cb = () => {

             pool. delete(promise)

         }

         // Register the task of then

         promise.then(cb,cb)

         pool. add(promise)

         promises. push(promise)

     }

     // Wait for the end of the last for await, here is the microtask after the last await

     // Note that this is actually in the microtask. The current promises can ensure that all promises are in it (provided that await hits if)


     Promise.allSettled(promises).then(callback,callback)

}
```

To summarize the main points:

1. Use the feature of race to find the fastest-ending request in concurrent tasks
2. Using for await can ensure that the code below the for structure is the microtask after the last await, and under the last microtask, it can be guaranteed that all promises have been stored in the promises (if no await is hit, that is, the concurrency is limited When the number > the number of tasks, although it is not in the microtask, it can also ensure that all promises are in it), and finally use allSettled to wait for all promises to change state, and then call the callback function
3. The concurrent task pool is stored in the Set structure, and the corresponding task can be deleted through the pointer, and the pointer can be referenced through the closure to dynamically control the number of concurrent pools
4. In the for await structure, in fact, under await, including outside the structure, all belong to microtasks (provided that there is an if in await that is hit). As for when this microtask is added to the microtask queue, it depends on where the request is. When to start marking (resolve/reject)
5. The for await has actually been executed concurrently in this round of macro tasks. The code behind the await is suspended, waiting for the previous promise to change state --> remove the pool --> pick up the next promise and add it to the pool -- > The next await waits for the fastest promise, and so on.

You can imagine such a scene, several groups of people are playing the 100-meter relay race, each group is at 0m, 100m, 200m respectively, there are several tracks and there are several people in each group. (Note, it is imagined here that each node (for example, at 0m) is a group of people), each person who reaches the next node will hand the stick to the next person in the front line, and the next person will start running.

### Question

1. The `Promise<any>[]` passed in by Promise.allSettled and race can be increased or decreased by the trigger microtask operation. Will this change the result?

## What functions can be expanded?

------

1. Want to get the required result after execution

(It has been implemented in the second method. In the first method, you can add a task->result map to collect, or wrap a layer of Promise for all tasks to form a new promiseList, and put it in Promise.allSettled Inside, map the resolve in the form of task->resolve, and find the Promise instance in the runner to expose it through the corresponding resolve)

2. Add a parameter to control the number of retries for failed requests

## end

------

This kind of topic is to test your understanding of asynchronous programming. To write it, you need to have knowledge of event loop and promise.

👏👏Finally, if there are any mistakes, you are welcome to point them out. Only by communicating more can we become stronger!
