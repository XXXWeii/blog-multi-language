---
title: CentOS8配置Nginx
lang: zh-CN
author: XXXWeii
date: 2022-03-01 14:55:00
tags:
  - 其他
---

## 1.连接到 Linux CentOS8 的服务器

---

```shell
ssh -p 22 root@ip
//输入完之后会要输入密码，密码是不显示的，输入完回车就行
```

## 2.安装编译器

---

```shell
yum -y install gcc pcre-devel zlib-devel openssl openssl-devel
```

## 3.建立存放的文件夹

---

```shell
mkdir -p /www/nginx
```

## 4.移动到文件夹

---

```shell
cd /www/nginx
```

## 5.下载 nginx

---

```shell
wget http://nginx.org/download/nginx-1.20.2.tar.gz
```

## 6.解压 nginx.tar.gz

---

```shell
tar -zxvf nginx-1.20.2.tar.gz
```

## 7.移动到解压的文件夹

---

```shell
cd nginx-1.20.2
```

## 8.配置文件

---

```shell
./configure --prefix=/usr/local/nginx --with-http_ssl_module --with-http_v2_module
```

## 9.编译和安装

---

```shell
make
make install
```

## 10.查找安装路径和移动到文件夹

---

```shell
whereis nginx
cd /usr/local/nginx
```

## 11.启动 nginx

---

```shell
./sbin/nginx
```

## 12.重新加载配置

---

```shell
./sbin/nginx -s reload
```
