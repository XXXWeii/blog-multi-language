---
title: 如何在Axios中去控制 Loading？
lang: zh-CN
author: XXXWeii
date: 2023-03-21 14:55:00
tags:
  - 其他
---

![](./images/202303211.jpg)

loading 的展示和取消可以说是每个前端对接口的时候都要关心的一个问题。这篇文章将要帮你解决的就是**如何结合 axios 更加简洁的处理 loading 展示与取消的逻辑**。

首先在我们平时处理业务的时候 loading 一般分为三种：**按钮 loading**，**局部 loading**，还有**全局 loading**。

## 按钮 loading

---

其实想写这篇博客的诱因也是因为这个按钮 loading ，在大多数时候我们写按钮 loading 业务的时候是这样写的。

```js
const loading = ref(false);
try {
  loading.value = true;
  const data = await axios.post(`/api/data`);
} finally {
  loading.value = false;
}
```

或者这样的写的

```js
const loading = ref(false);
loading.value = true;
axios
  .post(`/api/data`)
  .then((data) => {
    //do something
  })
  .finally(() => {
    loading.value = false;
  });
```

可以看到 我们总要处理 loading 的开始与结束状态。而且好多接口都要这么写。这样太繁琐了，那我们可不可以这样呢？

```js
const loading = ref(false);
const data = await axios.post(`/api/data`, { loading: loading });
```

把 loading 的状态给 axios 统一处理。这样代码是不是就简洁多了呢？处理方式也很简单。

```js
// 请求拦截器
axios.interceptors.request.use(config = >{
    if (config.loading) {
      config.loading.value = true
    }
})
// 响应拦截器
axios.interceptors.response.use(
    response => {
        if (response.config.loading) {
            res.config.loading.value = false
        }
    },
    error => {
        if (error.config.loading) {
            config.loading.value = false
        }
    }
)
```

**我们只需要在 axios 的拦截器中改变 loading 的值就可以，注意一定要传入一个 ref 类的值。这种写法也仅适用于 vue3。vue2 是不行的。**

在 vue2 里面我们可能会想到这样写。

```vue
<template>
  <a-button loading="loading.value"> 保存 </a-button>
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
//拦截器和vue3写法一样
```

但是很遗憾这样是无法生效的。原因如下

```js
//接口调用
axios.post(接口地址, 配置项);
//拦截器
axios.interceptors.request.use((配置项) => {});
复制代码;
```

在 axios 中我们接口调用传入的配置项 和 拦截器返回的配置项 并不是同一个内存地址。axios 做了深拷贝处理。所以传入的 loading 对象和返回的 loading 对象并不是同一个对象。所以我们在拦截器中修改是完全没有用的。

可是 vue3 为什么可以呢？因为 ref 返回的对象是 RefImpl 类的实例 并不是一个普通的对象，axios 在做深拷贝的时候没有处理这种实例对象。所以我们就可以从这里出发来改造一下我们的 axios 写法。代码如下：

axios 代码：

```js
const _axios = axios.create({
  method: `post`,
  baseURL: process.env.VUE_APP_BASE_URL,
})
//注意：拦截器中比vue3多了个loading！！！
// 请求拦截器
_axios.interceptors.request.use(config = >{
    if (config.loading) {
      config.loading.loading.value = true
    }
})
// 响应拦截器
_axios.interceptors.response.use(
    response => {
        if (response.config.loading) {
            res.config.loading.loading.value = false
        }
    },
    error => {
        if (error.config.loading) {
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
    return _axios.post(url, params, config)
}
```

使用方式：

```vue
<template>
  <a-button loading="loading.value"> 保存 </a-button>
</template>

<script>
import { post } from '@api/axios'
export default {
  data () {
      return {
          //这里的loading可以取任意名字。但是里面必须有value
          loading: { value: false },
      }
  },
  mounted () {
      const data = await post(`/api/data`,{loading:this.loading})
  },
}
</script>
```

可以看到实现的原理也很简单。我们在 axios 里面把出传入的 config 中的 loading 对象也变成一个实例对象就好了。在实例对象中记录我们传入的对象，也是以为这里我们会比 vue3 的写法多一个 loading,从而实现响应式。

## 局部 loading

---

局部 loading 的添加有两种方式：

1. 使用自定义指令 传入 true 和 false 。这样的缺陷是不够灵活，组件内的元素就很难局部添加了， 只能全组件添加。值得一提的是，改变 true 和 false 的逻辑就可以用我们上述的按钮 loading 方法。具体的实现方式这里就不再讲述了，如果需要的话可以评论区留言。
2. 在 axios 中封装。每次调用接口的时候传入需要添加 loading 的 dom。接口调用完毕删除 dom。实现方法如下。

这里是 vue3 + antdV3 技术栈的一个封装。这里用 hooks 把设置删除 loading 的逻辑给拆了出去。

#### axios 代码：

```js
const _axios = axios.create({
  method: `post`,
  baseURL: import.meta.env.VITE_BASE_URL,
})

const { setLoading, deleteLoading } = useAxiosConfig()
// 请求拦截器
_axios.interceptors.request.use(config = >{
    setLoading(config)
})
// 响应拦截器
_axios.interceptors.response.use(
    response => {
        deleteLoading(res.config)
    },
    error => {
        deleteLoading(res.config)
    }
)

export const post = (url, params, config) => {
    return _axios.post(url, params, config)
}
```

#### hooks 代码

```js
import { createApp } from 'vue'
import QSpin from '@/components/qSpin/QSpin.vue'
import type { RequestConfig, AxiosError } from '@/types/services/http'
export default function () {
  /** 使用WeakMap类型的数据 键名所指向的对象可以被垃圾回收 避免dom对象的键名内存泄漏 */
  const loadingDom = new WeakMap()
  /**
   * 添加局部loading
   * @param config
   */
  const setLoading = (config: RequestConfig) => {
    const loadingTarget = config.dom
    if (loadingTarget === undefined) return
    const loadingDomInfo = loadingDom.get(loadingTarget)
    if (loadingDomInfo) {
      loadingDomInfo.count++
    } else {
      const appExample = createApp(QSpin)
      const loadingExample = appExample.mount(document.createElement(`div`)) as                 InstanceType<typeof QSpin>
      loadingTarget.appendChild(loadingExample.$el)
      loadingExample.show(loadingTarget)
      loadingDom.set(loadingTarget, {
        count: 1, //记录当前dom的loading次数
        appExample,
      })
    }
  }
  /**
   * 删除局部loading
   * @param config
   */
  const deleteLoading = (config: RequestConfig) => {
    const loadingTarget = config.dom
    if (loadingTarget === undefined) return
    const loadingDomInfo = loadingDom.get(loadingTarget)
    if (loadingDomInfo) {
      if (--loadingDomInfo.count === 0) {
        loadingDom.delete(loadingTarget)
        loadingDomInfo.appExample.unmount()
      }
    }
  }

  return { setLoading, deleteLoading }
}
```

基础逻辑，很简单。只需要接口请求的时候的添加 loading ，接口响应完成的时候删除 loading。但是随之而来的就有一个问题，如果多个接口同时请求 或者 一个接口频繁请求需要覆盖的都是同一个 dom，这样我们添加的 loading 就会有很多个相同的，相互覆盖。因此上述代码定义了一个 loadingDom 记录当前正在 loading 的 dom 有哪些，如果有一样的进来的 就把 count 加一 ，结束后就把 count 减一。如果 count 为零则删除 loading。

#### 使用实例代码：

```vue
<template>
  <div>
    <div ref="head_dom">我是头部数据</div>
    <a-card ref="card_dom">我是卡片内容</a-card>
  </div>
</template>

<script setup lang="ts">
import { post } from "@api/axios";
import { ref, onMounted } from "vue";
const head_dom = ref();
const card_dom = ref();
//这边写了两个是为了演示下 直接在html标签上面绑定ref拿到的就是dom。在组件上面拿到的是组件实例要$el一下
onMounted(async () => {
  const data1 = await post(`/api/head`, { dom: head_dom.value });
  const data2 = await post(`/api/card`, { dom: card_dom.value.$el });
});
</script>
```

下面简单解释下 hooks 代码中 QSpin 组件的代码。

```vue
<template>
  <div v-show="visible" class="q-spin">
    <spin tip="加载中" />
  </div>
</template>

<script setup lang="ts">
import { Spin } from "ant-design-vue";
import { ref } from "vue";

const visible = ref(false);
const show = (dom: HTMLElement) => {
  visible.value = true;
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

这里是对 antdv3 的 Spin 组件做了一个简单的二次封装。主要讲解的就是一个 loading 覆盖传入 dom 的方法。

大多数地方使用的方式都是 relative 和 absolute 定位组合的方式，但是这里采用了 transform 和 fixed 定位组合的方式。因为我们的项目中可能出现这样一种情况

```
  <div style="position: relative">
    <div ref="div_dom">
      <div style="position: absolute">我是内容</div>
    </div>
  </div>
```

假如 我们要给中间的的 div 添加 loading， 使用 relative 和 absolute 定位组合的方式。那么中间的 div 就会在样式表种添加一个 position: relative 的属性，这样代码就会变成这样

```
 <div style="position: relative">
    <div style="position: relative" ref="div_dom">
      <div style="position: absolute">我是内容</div>
    </div>
  </div>
```

很明显 我们第三层 div 定位的根节点就从第一层变成了第二层，这样就会有可能导致我们样式的错乱。因此笔者采用了 transform 和 fixed 定位组合的方式。虽然上述的情况可能还会出现 但是会大大减少出现的可能性。

## 全局 loading

---

这个就很简单了。如果你封装好了局部的 loading 直接在配置项的 dom 中传入 document.body 即可！
