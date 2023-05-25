---
title: Vue 刷新当前页出现404解决方法之Nginx
lang: zh-CN
date: 2023-02-15 16:09:00
author: XXXWeii
tags:
  - Vue
  - Nginx
---

`history`模式会出现刷新页面后，页面出现 404。解决的办法是用`nginx`配置一下。
在`nginx`的配置文件中修改

# 方法一：

---

```
location /{
    root   /data/nginx/html;
    index  index.html index.htm;
    if (!-e $request_filename) {
        rewrite ^/(.*) /index.html last;
        break;
    }
}
```

# 方法二：

vue.js 官方教程里提到的https://router.vuejs.org/zh/guide/essentials/history-mode.html

```
  server {
        listen       8081;#默认端口是80，如果端口没被占用可以不用修改
        server_name  myapp.com;
        root        D:/vue/my_app/dist;#vue项目的打包后的dist
        location / {
            try_files $uri $uri/ @router;#需要指向下面的@router否则会出现vue的路由在nginx中刷新出现404
            index  index.html index.htm;
        }
        #对应上面的@router，主要原因是路由的路径资源并不是一个真实的路径，所以无法找到具体的文件
        #因此需要rewrite到index.html中，然后交给路由在处理请求资源
        location @router {
            rewrite ^.*$ /index.html last;
        }
        #.......其他部分省略
  }
```

两种方案的的本质是一样的，就是 rewrite 一下，将 router 写到 index.html 中，然后交由路由处理资源才可以。

自己记录一下本方案，方便后续出现问题使用。
