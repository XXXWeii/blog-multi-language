---
title: CentOS8 configure Nginx
lang: en-US
date: 2022-03-01 14:55:00
author: XXXWeii
tags:
  - Other
---

## 1. Connect to Linux CentOS8 server

---

```shell
ssh -p 22 root@ip
// After entering, you will need to enter the password, the password is not displayed, just press Enter after entering
```

## 2. Install the compiler

---

```shell
yum -y install gcc pcre-devel zlib-devel openssl openssl-devel
```

## 3. Create a storage folder

---

```shell
mkdir -p /www/nginx
```

## 4. Move to folder

---

```shell
cd /www/nginx
```

## 5. Download nginx

---

```shell
wget http://nginx.org/download/nginx-1.20.2.tar.gz
```

## 6. Unzip nginx.tar.gz

---

```shell
tar -zxvf nginx-1.20.2.tar.gz
```

## 7. Move to the unzipped folder

---

```shell
cd nginx-1.20.2
```

## 8. Configuration file

---

```shell
./configure --prefix=/usr/local/nginx --with-http_ssl_module --with-http_v2_module
```

## 9. Compile and install

---

```shell
make
make install
```

## 10. Find the installation path and move to the folder

---

```shell
where is nginx
cd /usr/local/nginx
```

## 11. Start nginx

---

```shell
./sbin/nginx
```

## 12. Reload configuration

---

```shell
./sbin/nginx -s reload
```
