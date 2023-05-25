---
title: Vue refreshes the current page and there is a 404 solution to Nginx
lang: en-US
date: 2023-02-15 16:09:00
author: XXXWeii
tags:
  - Vue
  - Nginx
---

The `history` mode will appear. After refreshing the page, the page appears 404. The solution is to configure it with `nginx`.
Modify in the configuration file of `nginx`

# method one:

---

```
location /{
     root /data/nginx/html;
     index index.html index.htm;
     if (!-e $request_filename) {
         rewrite ^/(.*) /index.html last;
         break;
     }
}
```

# Method Two:

(https://router.vuejs.org/zh/guide/essentials/history-mode.html) mentioned in the vue.js official tutorial

```
   server {
         listen 8081; #The default port is 80, if the port is not occupied, you don't need to modify it
         server_name myapp.com;
         root D:/vue/my_app/dist;#vue project's packaged dist
         location / {
             try_files $uri $uri/ @router; #Need to point to the following @router, otherwise there will be vue routing, and 404 will appear when refreshing in nginx
             index index.html index.htm;
         }
         #Corresponding to the above @router, the main reason is that the path resource of the route is not a real path, so the specific file cannot be found
         #So you need to rewrite to index.html, and then hand it over to the route to process the request resource
         location @router {
             rewrite ^.*$ /index.html last;
         }
         #......Other parts omitted
   }
```

The essence of the two solutions is the same, that is, to rewrite, write the router to index.html, and then hand it over to the routing to process the resources.

Record this solution by yourself, so that it can be used in case of problems in the future.
