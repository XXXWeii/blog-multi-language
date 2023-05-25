---
title: Nginx review summary of front-end essential knowledge
lang: en-US
date: 2023-04-7
author: XXXWeii
tags:
  - Nginx
---

As a front-end developer, we may have been in contact with **Nginx** more or less, but it may also be because we don’t need to perform some necessary configurations on him, so we need to understand it in depth, but In fact, if you develop your own projects in your spare time at work, you will find that in many scenarios, nginx has a lot of traversal for us, and its performance is relatively efficient. It is actually used in many domestic websites. Before getting to know him, we need to have some basic understanding of him. First, we need to know

## What is Nginx

---

First of all, **Nginx** is a high-performance HTTP and reverse proxy web server, and also provides IMAP/POP3/SMTP services. It is a **lightweight web server**, **reverse proxy server**, **email server**, in fact, the product purpose of **Nginx** at the beginning of design is for mail service And it was born, which is characterized by less memory, small size, strong concurrency, and high performance. In the daily development process, it is used in many scenarios.

## What is the use of Nginx

---

From a big point of view, there are three characteristics in summary: **reverse proxy**, **load balancing**, **dynamic and static separation**

#### reverse proxy

Reverse proxy is the most used scenario of **Nginx**. If we develop a service with a large amount of requests, one server can no longer carry it, and we need to expand the capacity to use multiple servers, then at this time we will It is necessary to add a layer of **middleware** to distribute the user's request and send the user's request to different servers. At this time, we can use **Nginx** to complete it. Of course, this is only one of its functions. Before understanding the reverse proxy, let's talk about **Forward proxy**, there must be positive if there is negative.

Let’s talk about the reverse proxy first. Suppose we are a user. In the above scenario, if we add more servers, our users will always visit the same domain name. For the user, the reverse proxy it does is imperceptible to the user. , the proxy here is the **Nginx** middleware layer that proxies the user's request to our server. At the same time, it is also completed on the server side. The process of **reverse proxy hides the real client. The services requested by the client are all requested by the proxy server instead. **

Let’s talk about forward proxy. Assuming such a scenario, we should often use VPN in our daily development. For some projects of the company or private git or some internal websites, we need to log in to VPN to access. The basic principle is A server located in front of the client and the original server, in order to obtain content from the original server, the client sends a request to the proxy and specifies the target (the original server), then the proxy forwards the request to the original server and returns the obtained content to the client, The client can use the forward proxy. After we log in to the vpn, all requests will go through the server of the vpn to access certain resources or websites. Then this proxy server will be the white list ip inside the company, so all All the requests are uniformly entered from here, and a forward proxy is realized. In this way, the process of **forward proxying hides the real client, and the services requested by the client are replaced by the proxy server. **

Of course, this is only used in large-scale projects. For me, as an individual developer, I don't have multiple servers for load balancing or reverse proxy, so what is the use for us?

#### Hide service port number

First of all, after we have our own server, there is a high probability that you will also have your own domain name. At this time, if we have multiple websites, then there is a high probability that you will create your own second-level domain name. At this time, we want to When deploying multiple websites, it is likely to become \***\*192.xx.xx.xx:888**[1]**, \*\*\***192.xx.xx. xx:999**[2]** In this way, if you are a front-end and deploy multiple projects like **Node**, then you will definitely encounter such problems. We know a server, which is normal Each port is separate and cannot be shared [There are also special scenarios, such as the duplex communication provided by socketio, which allows http and ws to use the same port], we need to parse it if we want to distinguish different services through the second-level domain name In terms of different second-level domain names, we know that when a website is opened by default without adding a port, **http corresponds to port 80**, **https corresponds to port 443**, and cloud vendors also default to Open these two ports, so when we use **Nginx**, we only need to monitor **80 and 443 ports**, judge the domain name address to be accessed, and forward it to different ports (the specific configuration is finally put above), then we, as an individual user, can realize in this scenario that we do not need to add ugly port numbers, and all requests will be proxied to our real service ports through **80, 443**.

#### Deploy front-end project

Because it is also a static web server, it is very simple to deploy our front-end projects. I believe that if many people try to deploy by themselves, it is very simple to use **Nginx**. Download, install, run, specify the default directory, and drag the front-end project into it You can access it. This step is relatively simple, so I won’t explain too much. This is also a scenario that our front-end can use.

#### load balancing

After talking about the reverse proxy, let’s take a look at load balancing to make it easy to understand. In the above scenario, if we use three servers, who do we send the request to after the client sends the request? We can’t always have three Servers, let’s transfer them to one of them, which is obviously unreasonable. In order to ensure our maximum performance, load balancing means that the client’s requests will be reasonably allocated to the servers. We default to equal proportion allocation, which can It is understood as 1:1:1, but in actual scenarios, our server configuration may be different, there may be good and bad, so here is a probability of weight, we can configure which server allocates more requests and which one has less A little request, such a configuration can maximize the performance of the server, and a reasonable allocation of requests will make the system more robust and stable.

#### Separation of dynamic and static

In our development process, some requests need to be dynamically calculated, such as connecting to the **mysql** database to add, delete, check and modify, these are **dynamic**, and for some front-end files **html, css, js** and other files do not actually need background processing, so we can separate them through **dynamic and static separation mode**, and we can cache these static files, which can improve efficiency Of course, in the current scene where the front and rear ends are separated, the practicability of this point seems to be not high for me personally. Compared with the above two points, the usage scenarios are relatively limited, and these three points are relatively large. Point, there are many details in the small place, let's take a look at it through configuration

## Nginx combat analysis

---

Before using it, we need to download it first. The download is very simple. If you are *windows*, then go to the official website to download and decompress and open *exe* directly. Most users of *mac* have **brew package management* *, we only need `brew search nginx` line to complete the download.

It is very simple to use, you only need to enter `nginx` in the terminal to start successfully, it uses **8080 port** by default, so after we start successfully, visit **127.0.0.1:8080** to see the classic **welcome nginx**, what is our first impression as a front-end when we first see this page, this address shows a web page, so it must be his own web page, and then, if we change Will it display our own things after reading the content, and can we access our own projects by replacing our own project with his file? Of course, the deployment of many front-end projects is actually very simple. We overwrite it by dragging our project to the address of this file, but how do we know what directory and address this file is in? Then we have to look at the configuration information.

Enter `nginx -t` in the terminal to display specific information

```
nginx: the configuration file /usr/local/etc/nginx/nginx.conf syntax is ok
nginx: configuration file /usr/local/etc/nginx/nginx.conf test is successful
```

In this way, we can see that **nginx’s configuration file address is already in compliance with the current configuration file and can be used** If your configuration file has errors, you will also be prompted here, then we can **cd to the configuration directory** and then Look at its default configuration, we can directly `open .` or `cat nginx.conf` to view the default configuration, as follows,

```
#user  nobody;
worker_processes  1;

#error_log  logs/error.log;
#error_log  logs/error.log  notice;
#error_log  logs/error.log  info;

#pid        logs/nginx.pid;
events {
    worker_connections  1024;
}
http {
    include       mime.types;
    default_type  application/octet-stream;
    #log_format  main  '$remote_addr - $remote_user [$time_local] "$request" '
    #                  '$status $body_bytes_sent "$http_referer" '
    #                  '"$http_user_agent" "$http_x_forwarded_for"';
    #access_log  logs/access.log  main;
    sendfile        on;
    #tcp_nopush     on;
    #keepalive_timeout  0;
    keepalive_timeout  65;
    #gzip  on
    server {
        listen       8080;
        server_name  localhost;
        #charset koi8-r;
        #access_log  logs/host.access.log  main;
        location / {
            root   html;
            index  index.html index.htm;
        }
        #error_page  404              /404.html;
        # redirect server error pages to the static page /50x.html
        #
        error_page   500 502 503 504  /50x.html;
        location = /50x.html {
            root   html;
        }
    }

    # HTTPS server
    #
    #server {
    #    listen       443 ssl;
    #    server_name  localhost;

    #    ssl_certificate      cert.pem;
    #    ssl_certificate_key  cert.key;

    #    ssl_session_cache    shared:SSL:1m;
    #    ssl_session_timeout  5m;

    #    ssl_ciphers  HIGH:!aNULL:!MD5;
    #    ssl_prefer_server_ciphers  on;

    #    location / {
    #        root   html;
    #        index  index.html index.htm;
    #    }
    #}
    include servers/*;
}
```

There are too many configurations here. For the sake of simplicity, some configurations that we don’t need temporarily are deleted, and then let’s analyze them.

#### Listen on port 8080

First of all, we know that its default port is **8080**. At the same time, as we just said, the browser only has **80 and 443 ports that do not require us to splice**, so we don’t want the port number under normal circumstances, so , we only need to find **8080 and replace it with 80**, so we now know that the configuration of **listen** refers to which port number we want to listen to, after changing it to **80** we You don’t need to add another port to access the service, you can directly access **127.0.0.1**, of course, we can’t access it now, **Because Nginx needs to be reloaded after modifying the configuration**, we can stop it again Start, or the simpler `nginx -s reload` can be reloaded. We will talk about more specific commands later. After the reload is completed, we will find the same effect when we visit. If it is on our server, install it here Not to mention, you can find it on the official website or on Baidu. We resolve the domain name to our own server. At this time, you can access the project without adding a port when you visit your own domain name. If you are still a beginner, you are not very good at it** A series of commands of linux**, then I recommend you to use **xshell** and **sftp** to use visual tools to directly drag and drop files to follow the above steps, then the first step of our website is actually like this The deployment is complete. If you don't have a domain name, you can also access it successfully by directly entering your **server ip**.

#### How to deploy multiple websites on one server

As our individual developers, we only have one server in most cases, but we still want to deploy multiple projects. What should we do at this time? We need the next configuration. In order to make it easier for many students to understand, Let's take the front-end as an example. When we develop a project under our own computer, we start the front-end project at the same time. If it is on port **8080** and starts the port 3000** of the back-end **node project at the same time, then are we You can start two services through two ports, so it is the same on our server side. Multiple services only need to run on different ports. In **Nginx** configuration, we only need to access according to the user The address can point to different ports, so how to configure this, take a basic configuration of my personal website:

```
server {
    listen       80;
    server_name   chat.jiangly.com;
    location / {
        proxy_pass   http://127.0.0.1:7000;
    }
}
```

We found that it is so simple, just two lines, listening to port 80, when the accessed domain name is **chat.jiangly.com**, point to our port 7000, then port 7000 is the real port of our project, obviously This is a back-end **node** service. At this time, my friends have questions. What if we are a front-end static project? I packaged it. It seems that there is no port. I accessed it directly. The **proxy_pass** is also very simple:

```
server {
        listen 80;
        server_name project1.jaingly.com;

        location / {
                root /data/project1/;
                index index.html;
        }
}
```

We found that **proxy_pass** has become **root**, and **root** points to an address, so we just put our project at this address. The original front-end project is so simple. Now, We can deploy a lot of websites at once. We can not only access static websites like the front end, but also configure **node projects with ports**. Now the server can deploy as many projects as you want. If you don’t have a domain name, **server_name** needs to become **127.0.0.1 plus port number or project address**, such as **127.0.0.1:7000**, **127.0.0.1/project1 **This is used to differentiate items. At the same time, it should be noted that the relative path used here is the path compared with the configuration file nginx.conf in our nginx -t**, remember that the address should not be misplaced, otherwise it will not be found Yo

#### Use Https service

At this time, interested students found out that I don’t have **https certification, it’s so ugly**, and it’s not safe. I also want a **Https**, so what should we do? As mentioned earlier,** Https corresponds to the port of 443**, so we can directly monitor 443, in the default configuration, we see that there is a monitor port of **443 but it is commented**, we open it, configure it with **80 **Exactly the same, there is no difference. We directly saved, reloaded, and found out that we reported an error. It turns out that we do not have a certificate. That’s right, **Https requires a certificate**, and this certificate is required There is a fee, but as a humble developer, of course I don’t want to spend this money. I personally use **Tencent Cloud**. Friends may use other manufacturers, but they will definitely provide free certificates for everyone. To use, **go to the domain name management place** to find and apply for a free **Https certificate**, **Tencent Cloud** is very fast in my personal use at most one minute each time, after downloading, you will find that there are Many formats. I want to download **Nginx** format. After downloading, there will be many files in it, but we only need two, **crt format and key format**, and then I will put a personal basic configuration

```
server {
    listen 443 ssl;
    server_name   chat.jiangly.com;
    ssl_certificate conf.d/chat.jiangly.com_ssl/1_chat.jiangly.com_bundle.crt;
    ssl_certificate_key conf.d/chat.jiangly.com_ssl/2_chat.jiangly.com.key;
    ssl_session_timeout 5m;
    ssl_protocols TLSv1 TLSv1.1 TLSv1.2;
    ssl_ciphers ECDHE-RSA-AES128-GCM-SHA256:HIGH:!aNULL:!MD5:!RC4:!DHE;
    ssl_prefer_server_ciphers on;
    location / {
        proxy_pass   http://127.0.0.1:7000;
        root html;
        index  index.html index.htm;
    }
}
```

The other places are the same, we don’t need to care about it, we see two configuration items, **ssl_certificate_key**, **ssl_certificate** respectively correspond to two addresses, then this address is the two files we just downloaded address, the relative address corresponding to / is the same as above, you only need to configure these two files, no other places need to be changed, and then reload, at this time you can access **https service**, so take a look at our website It is very formal. We have realized our own website deployment through these few basic functions, and can have multiple websites, multiple domain names, no ports, certificates, etc. Of course, this is not enough, we can do more matter

#### Websocket service

We may often use the **websocket** service when we develop projects. If this configuration is still the case, we will find that the request is intercepted. Why is this? In fact, when we use **ws service**, we need to tell **nginx** that we need to upgrade the protocol, so when you encounter this problem, you only need to add two lines of configuration

```
proxy_http_version 1.1;
proxy_set_header Upgrade $http_upgrade;
proxy_set_header Connection $connection_upgrade;
```

If you encounter this problem, just add an overload.

#### server matching rules

We saw above that we can write many groups of **server**, then **Nginx** is matched from top to bottom, and it will exit immediately after matching the first one, so if you encounter when your When the configuration does not take effect, first check whether it is matched by other rules above.

#### history routing mode, cross domain, cache, reverse proxy

When we develop front-end projects such as **vue**, routing usually has two options, one with **#** hash routing and one without, and the document also says that we want to use, **history **You need the backend to change the configuration. In fact, this is just a few simple lines in **nginx**. We only need to add the following lines to use **history routing**. At the same time, there are Setting up the cache of some static format files, setting up cross-domain access, etc. are all simple configurations

```
# html set history mode
location / {
     index index.html index.htm;
     proxy_set_header Host $host;
     # The most important thing about history mode is here
     try_files $uri $uri/ /index.html;
     # Index.html file cannot set strong cache, just set negotiation cache
     add_header Cache-Control 'no-cache, must-revalidate, proxy-revalidate, max-age=0';
}

# interface reverse proxy
location ^~ /api/ {
     # Cross-domain processing Set the header domain name
     add_header Access-Control-Allow-Origin *;
     # Cross-domain processing Set the header method
     add_header Access-Control-Allow-Methods 'GET,POST,DELETE,OPTIONS,HEAD';
     # rewrite path
     rewrite ^/api/(.*)$ /$1 break;
     # reverse proxy
     proxy_pass http://static_env;
     proxy_set_header Host $http_host;
}

location ~* .(?:css(.map)?|js(.map)?|gif|svg|jfif|ico|cur|heic|webp|tiff?|mp3|m4a|aac|ogg|midi?|wav |mp4|mov|webm|mpe?g|avi|ogv|flv|wmv)$ {
     # Set seven-day strong cache for static resources
     expires 7d;
     access_log off;
}
```

#### load balancing

We can do load balancing based on the **upstream module**, that is, set the weight and configure the address

```
upstream backserver{
     # Hash algorithm, automatically locate the server to ensure that the only ip is located on the same machine to solve the problem of session login status
     ip_hash;
     server 127.0.0.1:9090 down; (down means that the server before the order does not participate in the load temporarily)
     server 127.0.0.1:8080 weight=2; (weight defaults to 1. The larger the weight, the greater the weight of the load)
     server 127.0.0.1:6060;
     server 127.0.0.1:7070 backup; (when all other non-backup machines are down or busy, request the backup machine)
}
```

We can see that the four services are all on our own machine. In the formal production scenario, we should actually be the **ip address** of another server. Generally, **nginx will be independently deployed to a server**, and other The service will be deployed on other servers, so in such a scenario, we need these multiple servers in an intranet environment, otherwise, if we go to the public network, it will increase the time-consuming in vain, here are the points we need to understand.

The above scenarios are some common scenarios I summarized for you. In fact, **Nginx** has many other more detailed functions, such as compression, graceful degradation of service errors, etc. If you are interested or really need Check the documentation when you need it. After all, remembering too many configurations for this thing will take up the precious memory of our brains.

## Common commands

---

Having said so much above, let’s summarize some common commands for everyone to use.

| instruction     | explain                                                      |
| :-------------- | :----------------------------------------------------------- |
| nginx -s reopen | restart nginx                                                |
| nginx -s reload | Reload the configuration file and restart gracefully Recommended to use |
| nginx -s stop   | forced stop                                                  |
| nginx -s quit   | Retreat safely                                               |
| nginx -t        | Check the address of the configuration file and check whether the configuration is normal |
| nginx -v        | display version info and exit                                |
| killall nginx   | kill all nginx processes                                     |

The above are some commonly used basic commands. More commands are less commonly used, so you need to check again. The back-end commands for large deployments are all -s to indicate the meaning of the launch command. Remember these common commands. Enough for our daily use.

## Summarize

---

Here we analyze some **Nginx** specific usage scenarios and operations from 0, omitting some more basic parts, this is a nanny-level tutorial, if you want to use or are interested in it, you may wish to do it yourself Try it.
