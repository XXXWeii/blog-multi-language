---
title: Vue中axios封装、配置不同开发环境变量
lang: zh-CN
date: 2023-03-15 16:09:00
author: XXXWeii
tags:
  - Vue
  - Axios
---

项目开发中，一般都会有开发环境、测试环境、生产环境等多个环境，所以项目在打包时我们就会调用不同环境的接口，此时我们就要通过配置变量来解决这一问题。

## 一、配置不同环境变量

---

下面以开发、测试、生产这 3 个环境为例。

#### 1、在项目根目录创建 3 个不同的文件，代表不同的环境配置

- 开发环境： `.env.development`
- 测试环境： `.env.test`
- 生产环境： `.env.production`

#### 2、在不同文件配置变量

- .env.development

  ```
  NODE_ENV = 'development'
  VUE_APP_BASE_URL = 'http://www.development.api'
  ```

- .env.test

  ```
  NODE_ENV = 'test'
  VUE_APP_BASE_URL = 'http://www.test.api'
  ```

- .env.production

  ```
  NODE_ENV = 'production'
  VUE_APP_BASE_URL = 'http://www.production.api'
  ```

[注意]: 1、这里声明的 NODE_ENV = 'development' 就表示开发环境 2、除了 baseUrl 和 NODE_ENV ,其他环境变量使用 VUE_APP 开头 ,比如 VUE_APP_XXX 3、然后我们可以通过 process.env.VUE_APP_XXX 来取到定义好的环境变量 4、下文在封装 axios 的 js 文件中赋值 baseUrl 的时候就会通过环境变量取值

#### 3、配置打包命令 package.json

```
  "scripts": {
    "dev": "vue-cli-service serve",
    "dev-development": "vue-cli-service serve --mode development",
    "dev-test": "vue-cli-service serve --mode test",
    "dev-production": "vue-cli-service serve --mode production",
    "build-development": "vue-cli-service build --mode development",
    "build-test": "vue-cli-service build --mode test",
    "build-production": "vue-cli-service build --mode production"
  },
```

[说明]: `npm run dev`表示：`vue-cli-service serve`会默认执行`.env.development`文件；`--mode test`来指定执行`.env.test`文件；`--mode production`来指定执行`.env.production`文件

## 二、axios 二次封装

---

#### 1、创建`request.js`文件

在`src`下创建一个`utils`文件夹，用来放一些工具类型的文件，首先在里面创建一个用来封装`axios`的文件`request`，当然文件名自定义

```js
//src/utils/request.js
import axios from "axios";

// 创建 axios 实例
const service = axios.create({
  baseURL: process.env.VUE_APP_BASE_URL, // url = base url + request url
  timeout: 10000, // request timeout
});

//  请求拦截器
service.interceptors.request.use(
  (config) => {
    config.headers["Content-Type"] = "application/json;charset=UTF-8";
    config.headers["Accept"] = "application/json";
    config.headers["Request-From"] = "mobile";
    let token = sessionStorage.getItem("loginToken") || null;
    if (token) {
      // 如果token不为null，否则传token给后台
      config.headers["Token"] = token;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器
service.interceptors.response.use(
  (response) => {
    const res = response.data;
    //届时根据后端返回success或者code值判断
    if (res.success === true) {
      return res;
    } else {
      return res;
    }
  },
  (error) => {
    //响应错误
    return Promise.reject(error);
  }
);

export default service;
```

[注]: 文件中的`baseURL: process.env.VUE_APP_BASE_URL`则就是根据不同环境取不同的接口地址

#### 2、创建`common.js`文件

在`src`下创建一个`api`文件夹，用来放一些接口的文件,当接口过多的时候可以分类创建接口文件，目前我们先创建一个公共的文件`common.js`,然后引入刚才封装的`request.js`文件

```js
//src/api/common.js
import request from "@/utils/request";

/**
 * POST 方法 与 GET方法  区别
 *
 * post==> data: obj
 * get==>params: obj
 *
 */
// 例如(post)：
export function updateBook(obj) {
  return request({
    url: "/book/update", // url = base url + request url
    method: "post",
    data: obj, //----------------->>>区别
  });
}
// 例如(get)：
export function getBookList(obj) {
  return request({
    url: "/book/list", // url = base url + request url
    method: "post",
    params: obj, //----------------->>>区别
  });
}
```

#### 3、页面中使用

```vue
<template>
  <div class="booktest"></div>
</template>
<script>
import { getBookList, updateBook } from "@/api/common"; //路径
export default {
  name: "",
  data() {
    return {};
  },
  methods: {
    //get方式
    getBookList() {
      let params = {
        userName: "张三",
      };
      getBookList(params).then((res) => {
        //返回值
      });
    },
    //post方式
    updateBook() {
      let params = {
        bookId: 1,
      };
      updateBook(params).then((res) => {
        //返回值
      });
    },
  },
};
</script>
```

## 三、vue.config.js 配置

---

```js
module.exports = {
  // 选项...
  /* 部署应用包的基本URL */
  publicPath: "./",

  /* 当运行 vue-cli-service build 时生成的生产环境构建文件的目录 defalut: dist */
  outputDir: "./dist",
  //可根据不同环境打包不同地址
  //outputDir: process.env.NODE_ENV == 'production' ?
  // '../../../../dist-mobile/production/course' : process.env.NODE_ENV == 'production' ?
  // '../../../../dist-mobile/test/course' : process.env.NODE_ENV == 'test' ?
  //'../../../../dist-mobile/development/course' : '../../../../dist-mobile/run/course',

  /* 放置生成的静态文件目录（js css img） */
  assetsDir: "static",

  /* 指定生成的index.html 输出路径 相对 default: index.html */
  indexPath: "index.html",

  /* 指定生成文件名中包含hash default: true */
  filenameHashing: true,

  // 所有 webpack-dev-server 的选项都支持。
  devServer: {
    host: "0.0.0.0",
    port: 8888, // 端口号
    https: false,
    open: false, //配置自动启动浏览器

    // 配置多个代理
    proxy: {
      "/api": {
        target: process.env.VUE_APP_BASE_URL, // 代理服务器路径
        changeOrigin: true,
        pathRewrite: {
          "^/api": "", // 去掉接口地址中的api字符串
        },
      },
    },
  },
};
```

这样就完成了根据不同项目启动命令,来自动配置不同环境,匹配指定接口地址了
例如：
启动`npm run dev-test`,
执行`vue-cli-service serve --mode test`,
根据`--mode test`,
查找`.env.test`文件,
获得环境`NODE_ENV`为:`test环境`, 接口地址`VUE_APP_BASE_URL`为:`http://www.test.api`
所以封装的 axios 中的 baseUrl 地址就是`http://www.test.api`
调用后的地址就是:`http://www.test.api/book/list`
大概就是这么个流程，
接下来就可以愉快的开发了.

![](./images/4.jpg)
