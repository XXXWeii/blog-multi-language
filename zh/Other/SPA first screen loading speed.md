---
title: SPA(单页应用)首屏加载速度
lang: zh-CN
author: XXXWeii
date: 2022-03-03 15:57:00
tags:
  - 其他
---

## 一、什么是首屏加载

---

首屏时间(First Contentful Paint),指的是浏览器从响应用户输入网址地址，到首屏内容渲染完成的时间，此时整个网页不一样要全部渲染完成，但需要展示当前视窗需要的内容

首屏加载可以说是用户体验中重要的环节。

## 二、加载慢的原因

---

在页面渲染的过程，导致加载速度慢的因素可能如下：

- 网络延时问题
- 资源文件体积是否过大
- 资源是否重发发送请求去加载了
- 加载脚本的时候，渲染内容堵塞

## 三、解决方案

---

常见的几种 SPA 首屏优化方式

- 减少入口文件体积
- 静态资源本地缓存
- UI 框架按需加载
- 图片资源压缩
- 开启 Gzip 压缩
- 使用 SSR

### 减少入口文件体积

1. 常用的手段是路由懒加载，把不同路由对应的组件分割成不同的代码块，待路由被请求的时候会单独打包路由，使得入口文件变小，加载速度大大增加。
2. 还有就是使用 cdn 加速，减少文件体积，但是要是看别人的 cdn 服务器稳不稳定，也可以自己下载 cdn 放到自己服务器，但是自己服务器没有 cdn 分发的话，速度就会在下载 cdn 文件时候影响加载速度。

### 静态资源本地缓存

---

后端返回的资源问题:

- 采用`HTTP`缓存，设置`Cache-Control`，`Last-Modified`，`Etag`等响应头
- 采用`Service Worker`离线缓存
  前端合理使用 LocalStorage

### UI 框架按需加载

### 图片资源的压缩

图片资源虽然不在编码过程中，但它却是对页面性能影响最大的因素
对于所有的图片资源，我们可以进行适当的压缩
对于页面上使用到的 icon，可以使用在线字体图标，或者雪碧图，将众多小图标合并到一张图上，减少`HTTP`请求次数

### 开启 Gzip 压缩

拆完包之后，我们在使用`Gzip`做一下压缩，安装`compression-webpack-plugin`

```shell
yarn add compression-webpack-plugin -D
```

在`vue.config.js`中引入并修改`webpack`配置

```js
const CompressionWebpackPlugin = require("compression-webpack-plugin");
module.exports={
  ...,//省略
  configureWebpack:{
    plugins:[
      new CompressionWebpackPlugin({
        test:/\.(js|css)$/,//匹配文件名
        threshold:10240,//对超过10k的数据进行压缩
        minRatio: 0.8, // 压缩比
        deleteOriginalAssets: false //是否删除原文件
         exclude: "/node_modules/",
      })
    ]
  },
  ...
}
```

在服务器我们也要做相应的配置，比如`Nginx`

```Nginx
gzip on;
gzip_disable "msie6";
gzip_vary on;
gzip_proxied any;
gzip_comp_level 6;
gzip_buffers 16 8k;
gzip_http_version 1.1;
gzip_min_length 256;
gzip_types application/atom+xml application/geo+json application/javascript application/x-javascript application/json application/ld+json application/manifest+json application/rdf+xml application/rss+xml application/xhtml+xml application/xml font/eot font/otf font/ttf image/svg+xml text/css text/javascript text/plain text/xml;
```

### 使用 SSR

SSR(Server side)，也就是服务器渲染，组件或页面通过服务器生成 html 字符串，再发送到浏览器
从头搭建一个服务器渲染是很复杂的，`Vue`应用建议使用`Nuxt.js`实现服务器渲染

### 小结

减少首屏渲染时间的方法有很多，总的来讲可以分成两大部分，资源加载优化和页面渲染优化

下图是更为全面的首屏优化的方案

![首屏优化](./images/SPA.png "首屏优化")

大家可以根据自己项目的情况选择各种方式进行首屏渲染的优化
