---
title: Nginx commonly used basic configuration (web front-end related aspects)
lang: en-US
date: 2023-04-20
author: XXXWeii
tags:
  - Nginx
---

## basic configuration

---

```nginx
user                            root;
worker_processes                1;

events {
  worker_connections            10240;
}

http {
  log_format                    '$remote_addr - $remote_user [$time_local] ' '"$request" $status $body_bytes_sent ' '"$http_referer" "$http_user_agent"';
  include                       mime.types;
  default_type                  application/octet-stream;
  sendfile                      on;
  #autoindex                    on;
  #autoindex_exact_size         off;
  autoindex_localtime           on;
  keepalive_timeout             65;
  gzip                          on;
  gzip_disable                  "msie6";
  gzip_min_length               100;
  gzip_buffers                  4 16k;
  gzip_comp_level               1;
  gzip_types                  text/plain application/x-javascript text/css application/xml text/javascript application/x-httpd-php image/jpeg image/gif image/png;
  gzip_types                    "*";
  gzip_vary                     off;
  server_tokens                 off;
  client_max_body_size          200m;

  server {
    listen                      80 default_server;
    server_name                 _;
    return                      403 /www/403/index.html;
  }

  include                       ../serve/*.conf;
}
```

## Hide Nginx version information

---

```nginx
http {
  server_tokens         off;
}
```

## Prohibit ip from directly accessing port 80

---

```nginx
server {
  listen                80 default;
  server_name           _;
  return                500;
}
```

## Start the web service (vue project as an example)

---

```nginx
server {
   # Project start port
   listen 80;
   # domain name (localhost)
   server_name_;
   # Disable iframe nesting
   add_header X-Frame-Options SAMEORIGIN;

   # Access address root path configuration
   location / {
     # project directory
     root html;
     # read files by default
     index index.html;
     # Configure the refresh blank of history mode
     try_files $uri $uri/ /index.html;
   }

   # Suffix matching, to solve the problem of not finding static resources
   location ~* \.(gif|jpg|jpeg|png|css|js|ico)$ {
     root html/static/;
   }

   # Picture anti-leech
   location ~/static/.*\.(jpg|jpeg|png|gif|webp)$ {
     root html;
     valid_referers *.deeruby.com;
     if ($invalid_referer) {
       return 403;
     }
   }

   # restriction of visit
   location /static {
     root html;
     # allow allow
     allow 39.xxx.xxx.xxx;
     # deny deny
     deny all;
   }
}
```

## PC and mobile use different project file mappings

---

```nginx
server {
  ......
  location / {
    root /home/static/pc;
    if ($http_user_agent ~* '(mobile|android|iphone|ipad|phone)') {
      root /home/static/mobile;
    }
    index index.html;
  }
}
```

## A web service, configure multiple items (location matching routing difference)

---

```nginx
server {
   listen 80;
   server_name_;

   # main application
   location / {
     root html/main;
     index index.html;
     try_files $uri $uri/ /index.html;
   }

   # sub-application one
   location ^~ /store/ {
     proxy_pass http://localhost:8001;
     proxy_redirect off;
     proxy_set_header Host $host;
     proxy_set_header X-Real-IP $remote_addr;
     proxy_set_header X-Forwarded-For
     proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
   }

   # Sub-application 2
   location ^~ /school/ {
     proxy_pass http://localhost:8002;
     proxy_redirect off;
     proxy_set_header Host $host;
     proxy_set_header X-Real-IP $remote_addr;
     proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
   }

   # Static resources cannot be read and deal with the problem
   rewrite ^/api/profile/(.*)$ /(replace the upper directory of the file with the correct path)/$1 last;
}

# Sub-application one service
server {
   listen 8001;
   server_name_;
   location / {
     root html/store;
     index index.html;
     try_files $uri $uri/ /index.html;
   }

   location ^~ /store/ {
     alias html/store/;
     index index.html index.htm;
     try_files $uri /store/index.html;
   }

   # interface proxy
   location /api {
     proxy_pass http://localhost:8089;
   }
}

# Sub-application 2 service
server {
   listen 8002;
   server_name_;
   location / {
     root html/school;
     index index.html;
     try_files $uri $uri/ /index.html;
   }

   location ^~ /school/ {
     alias html/school/;
     index index.html index.htm;
     try_files $uri /school/index.html;
   }

   # interface proxy
   location /api {
     proxy_pass http://localhost:10010;
   }
}
```

## Configure load balancing

---

```nginx
upstream my_upstream {
  server                http://localhost:9001;
  server                http://localhost:9002;
  server                http://localhost:9003;
}

server {
  listen                9000;
  server_name           test.com;

  location / {
    proxy_pass          my_upstream;
    proxy_set_header    Host $proxy_host;
    proxy_set_header    X-Real-IP $remote_addr;
    proxy_set_header    X-Forwarded-For $proxy_add_x_forwarded_for;
  }
}
```

## SSL configuration HTTPS

---

```nginx
server {
  listen                      80;
  server_name                 www.xxx.com;
  # Move http redirects to https
  return 301 https://$server_name$request_uri;
}

server {
  listen                      443 ssl;
  server_name                 www.xxx.com;
  ssl_certificate             /etc/nginx/ssl/www.xxx.com.pem;
  ssl_certificate_key         /etc/nginx/ssl/www.xxx.com.key;
  ssl_session_timeout         10m;
  ssl_ciphers                 ECDHE-RSA-AES128-GCM-SHA256:ECDHE:ECDH:AES:HIGH:!NULL:!aNULL:!MD5:!ADH:!RC4;
  ssl_protocols               TLSv1 TLSv1.1 TLSv1.2;
  ssl_prefer_server_ciphers   on;

  location / {
    root                    /project/xxx;
    index                   index.html index.htm index.md;
    try_files               $uri $uri/ /index.html;
  }
}
```
