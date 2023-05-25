---
title: How to control Loading in Axios
lang: en-US
date: 2023-03-21 14:55:00
author: XXXWeii
tags:
  - Other
---

![](./images/202303211.jpg)

The display and cancellation of loading can be said to be a problem that every front-end should care about when facing the interface. What this article will help you solve is **how to combine axios to handle the logic of loading display and cancellation more concisely**.

First of all, when we usually deal with business, loading is generally divided into three types: **button loading**, **local loading**, and **global loading**.

## button loading

---

In fact, the incentive to write this blog is also because of this button loading. Most of the time we write button loading business like this.

```js
const loading = ref(false);
try {
   loading. value = true;
   const data = await axios. post(`/api/data`);
} finally {
   loading. value = false;
}
```

or written like this

```js
const loading = ref(false);
loading. value = true;
axios
   .post(`/api/data`)
   .then((data) => {
     //do something
   })
   .finally(() => {
     loading. value = false;
   });
```

You can see that we always have to deal with the start and end states of loading. And many interfaces have to be written like this. This is too cumbersome, so can we do this?

```js
const loading = ref(false);
const data = await axios. post(`/api/data`, { loading: loading });
```

Handle the loading status to axios uniformly. Is this code more concise? The processing method is also very simple.

```js
// request interceptor
axios.interceptors.request.use(config = >{
     if (config.loading) {
       config.loading.value = true
     }
})
// response interceptor
axios.interceptors.response.use(
     response => {
         if (response. config. loading) {
             res.config.loading.value = false
         }
     },
     error => {
         if (error. config. loading) {
             config.loading.value = false
         }
     }
)
```

**We only need to change the value of loading in the axios interceptor, and be careful to pass in a value of the ref class. This way of writing is only applicable to vue3. Vue2 does not work. **

In vue2, we might think of writing like this.

```vue
<template>
   <a-button loading="loading.value"> save </a-button>
</template>

<script>
export default {
   data () {
       return {
           loading: { value: false },
       }
   },
   mounted () {
       const data = await axios.post(`/api/data`,{loading:this.loading})
   },
}
</script>
//The interceptor is written in the same way as vue3
```

But unfortunately this is not effective. The reason is as follows

```js
//Interface call
axios.post(interface address, configuration item);
//Interceptor
axios.interceptors.request.use((configuration item) => {});
copy code;
```

In axios, the configuration item passed in by our interface call and the configuration item returned by the interceptor are not the same memory address. Axios does deep copy processing. So the incoming loading object and the returned loading object are not the same object. So our modification in the interceptor is completely useless.

But why can vue3? Because the object returned by ref is an instance of the RefImpl class and not an ordinary object, axios does not handle this instance object when doing deep copy. So we can start from here to modify our axios writing method. code show as below:

Axios code:

```js
const _axios = axios.create({
   method: `post`,
   baseURL: process.env.VUE_APP_BASE_URL,
})
//Note: There is more loading in the interceptor than vue3! ! !
// request interceptor
_axios.interceptors.request.use(config = >{
     if (config.loading) {
       config.loading.loading.value = true
     }
})
// response interceptor
_axios.interceptors.response.use(
     response => {
         if (response. config. loading) {
             res.config.loading.loading.value = false
         }
     },
     error => {
         if (error. config. loading) {
             config.loading.loading.value = false
         }
     }
)

export const post = (url, params, config) => {
     if (config?.loading) {
         class Loading {
             loading = config.loading
         }
         config.loading = new Loading()
     }
     return _axios. post(url, params, config)
}
```

How to use:

```vue
<template>
   <a-button loading="loading.value"> save </a-button>
</template>

<script>
import { post } from '@api/axios'
export default {
   data () {
       return {
           //The loading here can take any name. But there must be value in it
           loading: { value: false },
       }
   },
   mounted () {
       const data = await post(`/api/data`,{loading:this.loading})
   },
}
</script>
```

It can be seen that the principle of implementation is also very simple. We can turn the loading object in the incoming config into an instance object in axios. Recording the objects we pass in in the instance object also thinks that here we will have one more loading than the vue3 way of writing, so as to achieve responsiveness.

## Partial loading

---

There are two ways to add partial loading:

1. Use a custom directive to pass in true and false . Such a defect is that it is not flexible enough, and it is difficult to add elements in the component locally, only the whole component can be added. It is worth mentioning that changing the logic of true and false can use our button loading method above. The specific implementation method will not be described here. If necessary, you can leave a message in the comment area.
2. Encapsulated in axios. The dom that needs to be added loading is passed in every time the interface is called. The dom is deleted after the interface is called. The implementation method is as follows.

Here is a package of vue3 + antdV3 technology stack. Here, hooks are used to remove the logic of setting and deleting loading.

#### axios code:

```js
const _axios = axios.create({
   method: `post`,
   baseURL: import.meta.env.VITE_BASE_URL,
})

const { setLoading, deleteLoading } = useAxiosConfig()
// request interceptor
_axios.interceptors.request.use(config = >{
     setLoading(config)
})
// response interceptor
_axios.interceptors.response.use(
     response => {
         deleteLoading(res.config)
     },
     error => {
         deleteLoading(res.config)
     }
)

export const post = (url, params, config) => {
     return _axios. post(url, params, config)
}
```

#### hook code

```js
import { createApp } from 'vue'
import QSpin from '@/components/qSpin/QSpin.vue'
import type { RequestConfig, AxiosError } from '@/types/services/http'
export default function () {
   /** Use the data of WeakMap type. The object pointed to by the key name can be garbage collected to avoid the memory leak of the key name of the dom object */
   const loadingDom = new WeakMap()
   /**
    * Add partial loading
    * @param config
    */
   const setLoading = (config: RequestConfig) => {
     const loadingTarget = config.dom
     if (loadingTarget === undefined) return
     const loadingDomInfo = loadingDom. get(loadingTarget)
     if (loadingDomInfo) {
       loadingDomInfo.count++
     } else {
       const appExample = createApp(QSpin)
       const loadingExample = appExample.mount(document.createElement(`div`)) as InstanceType<typeof QSpin>
       loadingTarget.appendChild(loadingExample.$el)
       loadingExample. show(loadingTarget)
       loadingDom.set(loadingTarget, {
         count: 1, //Record the loading times of the current dom
         appExample,
       })
     }
   }
   /**
    * Delete partial loading
    * @param config
    */
   const deleteLoading = (config: RequestConfig) => {
     const loadingTarget = config.dom
     if (loadingTarget === undefined) return
     const loadingDomInfo = loadingDom. get(loadingTarget)
     if (loadingDomInfo) {
       if (--loadingDomInfo. count === 0) {
         loadingDom.delete(loadingTarget)
         loadingDomInfo.appExample.unmount()
       }
     }
   }

   return { setLoading, deleteLoading }
}
```

The basic logic is simple. You only need to add loading when the interface requests, and delete loading when the interface response is completed. But there is a problem that comes with it. If multiple interfaces request at the same time or an interface frequently requests to cover the same dom, so the loading we added will have many identical ones and cover each other. Therefore, the above code defines a loadingDom to record which doms are currently loading. If there are the same ones coming in, add one to the count, and subtract one from the count after the end. Remove loading if count is zero.

#### Use example code:

```vue
<template>
   <div>
     <div ref="head_dom">I am head data</div>
     <a-card ref="card_dom">I am the content of the card</a-card>
   </div>
</template>

<script setup lang="ts">
import { post } from "@api/axios";
import { ref, onMounted } from "vue";
const head_dom = ref();
const card_dom = ref();
//I wrote two here to demonstrate that what you get by binding the ref directly on the html tag is the dom. What you get on the component is the component instance, you need $el
onMounted(async () => {
   const data1 = await post(`/api/head`, { dom: head_dom. value });
   const data2 = await post(`/api/card`, { dom: card_dom. value. $el });
});
</script>
```

The code of the QSpin component in the hooks code is briefly explained below.

```vue
<template>
   <div v-show="visible" class="q-spin">
     <spin tip="Loading" />
   </div>
</template>

<script setup lang="ts">
import { Spin } from "ant-design-vue";
import { ref } from "vue";

const visible = ref(false);
const show = (dom: HTMLElement) => {
   visible. value = true;
   dom.style.transform = dom.style.transform || `translate(0)`;
};
defineExpose({ show });
</script>

<style scoped lang="less">
.q-spin {
   position: fixed;
   z-index: 999;
   top: 0;
   bottom: 0;
   left: 0;
   right: 0;
   display: flex;
   flex-direction: column;
   justify-content: center;
   align-items: center;
   background-color: rgb(0 0 0 / 10%);
}
</style>
```

Here is a simple secondary encapsulation of the Spin component of antdv3. The main explanation is a loading method that overrides the incoming dom.

The method used in most places is a combination of relative and absolute positioning, but here a combination of transform and fixed positioning is used. Because there may be such a situation in our project

```
   <div style="position: relative">
     <div ref="div_dom">
       <div style="position: absolute">I am the content</div>
     </div>
   </div>
```

If we want to add loading to the middle div, use a combination of relative and absolute positioning. Then the div in the middle will add a position: relative attribute in the style sheet, so the code will become like this

```
  <div style="position: relative">
     <div style="position: relative" ref="div_dom">
       <div style="position: absolute">I am the content</div>
     </div>
   </div>
```

Obviously, the root node of our third-level div positioning has changed from the first level to the second level, which may cause confusion in our styles. Therefore, the author adopts the combination of transform and fixed positioning. Although the above situation may still occur, it will greatly reduce the possibility of occurrence.

## Global loading

---

This is very simple. If you have encapsulated the partial loading, you can directly pass document.body in the dom of the configuration item!
