---
title: Why is the dynamic import of pictures in Vue require Things you don’t know
lang: en-US
date: 2023-04-16
author: XXXWeii
tags:
  - Vue
---

I believe that friends who have used vue must have been asked such a question by the interviewer: **Why use require when dynamically introducing pictures in vue? **

Some friends may smile contemptuously: Oh, that’s it, **Because the dynamic addition of src is treated as a static resource, it is not compiled, so require is added,** I can recite it backwards.... ..

emmm... At first glance, it seems to make sense, but if you look closely, what exactly is this sentence saying? In response to the above answers, I can't help but have the following questions:

1. What are static resources?
2. Why is the dynamically added src treated as a static resource?
3. It is not compiled, what is it that is not compiled?
4. Why can resources be imported correctly after adding require, because it can be compiled by adding require?

When I had the last question, I found that the above answer seemed to say something, but it didn’t seem to say anything... If you have the same questions as above, let me tell you One by one

## 1. What is a static resource

---

There is also a dynamic resource corresponding to the static resource. Let us first see how the big guys on the Internet explain it.

> Static resources: Generally, the client sends a request to the web server, and the web server retrieves the corresponding file from the memory, returns it to the client, and the client parses and renders it for display.
>
> Dynamic resources: For dynamic resources requested by the general client, the request is first handed over to the web container, and the web container connects to the database. After the database processes the data, the content is handed over to the web server, and the web server returns to the client for analysis and rendering.

In fact, the above summary is already very clear. From the perspective of a vue project, we can simply understand it as:

**Static resources are resources directly stored in the project, and these resources do not require us to send special requests to obtain them**. For example, pictures, videos, audios, font files, css style sheets, etc. under the assets directory.

**Dynamic resources are resources that need to be obtained by sending requests**. For example, when we browse Taobao, different product information is obtained by sending special requests, which can be called dynamic resources.

## 2. Why is the dynamically added src treated as a static resource?

---

Before answering this question, we need to understand how a browser can run a vue project.

We know that when a browser opens a web page, it actually runs three types of files: html, css, and js. When we start a vue project locally, we actually package the vue project first. The packaging process is the process of converting and compiling each vue file in the project into html, css, js files, and then uploading them on the browser In progress.

What will the dynamically added src look like if we don’t use require to import it? I’ll take you to experiment.

```vue
// Dynamically import a picture into the vue file
<template>
   <div class="home">
       <!-- The method of introducing resources through v-bind is called dynamic addition -->
     <img :src="'../assets/logo.png'" alt="logo">
   </div>
</template>

//The result of the final compilation (the result of running on the browser)
//This picture cannot be opened correctly
<img src="../assets/logo.png" alt="logo">
```

We can see that the dynamically added src will eventually be compiled into a static string address. When the program is running, it will import resources into the project directory according to this address. And the way to import resources into the project directory is to treat the resources as static resources**. So this also answers our question 2.

Seeing this, some friends may be confused. Is there any problem with the address that is finally compiled? The picture in my project is this address, why can't it be imported? Don't worry, let's continue to look down.

## 3. It is not compiled, what does it mean that it is not compiled?

---

No compilation occurs. This half sentence is very confusing to hear. According to question 2, we know that the dynamically imported image is finally compiled, but the image resource cannot be correctly imported after being compiled. So this sentence is wrong. For our standard answer, I rewrite it here:

**Because the dynamic addition of src is treated as a static resource, and the compiled static path cannot correctly import resources, so require**

Then a new question is born here: Why can't the compiled static path correctly import resources? **

To get the answer to this question, we have to start by introducing a picture normally. In the project, if we statically import a picture, it can definitely be imported successfully, and the vue file where the referenced picture is located must also be compiled, so what will the static imported picture be compiled into in the end? Let’s simulate a wave:

```vue
// Statically import a picture into the vue file
<template>
   <div class="home">
       <!-- Directly import the static address of the picture, no longer use v-bind -->
     <img src="../assets/logo.png" alt="logo">
   </div>
</template>

//The result of the final compilation
//This picture can be opened correctly
<img src="/img/logo.6c137b82.png" alt="logo">
```

According to the above test, we found that using a static address to import a picture, the path and name of the picture have changed, and the compiled static address can successfully import resources. This is because, by default, all files under the src directory will be packaged, and the pictures under src will also be packaged in a new folder and generate a new file name. The compiled static address introduces the packaged image address, so that resources can be referenced correctly

Is this really the case? We can execute the packaging command (npm run build) to verify

![Image](./images/202304161.jpg)

It can be found that the compiled static address is indeed consistent with the compiled image address under dist, thus verifying our idea.

At this point, we can actually explain the above problem: Why can’t the dynamically added src and the compiled static path import resources correctly?

**Because the compiled address of the dynamically added src is inconsistent with the compiled resource address of the image resource, the resource cannot be imported correctly**

```
   Compiled src address: ../assets/logo.png
   The compiled image resource address: /img/logo.6c137b82.png
```

So how to solve the above problems, the answer is: require

## 4. Why can resources be imported correctly with require? Is it because it can be compiled with require?

---

In response to this problem, we must first negate the second half of the sentence. Regardless of whether require is added or not, an image introduced into the Vue file will be compiled.

Then let's take a closer look at require.

#### 4.1 What is require: It is a node method used to import modules, JSON or local files

#### 4.2 What happened after calling the require method to introduce an image:

Before answering this question, let me make some supplements to the content in question 3. In fact, if some friends really follow the operation in question 3 to verify, it is estimated that they will be sprayed: why the final compiled address of the image I imported statically is different from yours, it is a base64, and after packaging, it is not generated under dist new pictures. Probably the following situation.

```vue
// Statically import a picture into the vue file
<template>
<div class="home">
     <!-- Directly import the static address of the picture, no longer use v-bind -->
   <img src="../assets/logo.png" alt="logo">
</div>
</template>

//The result of the final compilation
//This picture can be opened correctly
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAMgAAADICAYAAACtWK6eAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAyNpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDUuNi1jMDE0IDc5LjE1Njc5NywgMjAxNC8wOC8yMC0wOTo1MzowMiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6OTk2QkI4RkE3NjE2MTFFNUE4NEU4RkIxNjQ5MTYyRDgiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6OTk2QkI4Rjk3NjE2MTFFNUE4NEU4RkIxNjQ5MTYyRDgiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIENDIChNYWNpbnRvc2gpIj4gPHhtcE1NOkRlcml2ZWRGcm9tIHN0UmVmOmluc3RhbmNlSUQ9InhtcC5paWQ6NjU2QTEyNzk3NjkyMTFFMzkxODk4RDkwQkY4Q0U0NzYiIHN0UmVmOmRvY3VtZW50SUQ9InhtcC5kaWQ6NjU2QTEyN0E3NjkyMTFFMzkxODk4RDkwQkY4Q0U0NzYiLz4gPC9yZGY6RGVzY3JpcHRpb24+IDwvcmRmOlJERj4gPC94OnhtcG1ldGE+IDw/eHBhY2tldCBlbmQ9InIiPz5WHowqAAAXNElEQVR42uxda4xd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" alt="logo">
```

Don't rush to spray, in fact, the reason for this difference is because I changed the configuration in webpack. Next, a small amount of webpack code is involved. It doesn’t matter if you don’t know webpack, as long as you understand the principle.

We mentioned above that the vue project will eventually be packaged into a dist directory, so what helps us complete this package, yes, it is webpack. When introducing a picture in the vue project, careful students will find that sometimes the address of the picture displayed on the browser is a base64, and sometimes it is a compiled file address. That is the difference described above.

The reason for this difference is that when webpack packs, it configures the image resources. We can use the following command to generate the webpack configuration file in the vue project for verification:

> _npx vue-cli-service inspect --mode development >> webpack.config.development.js_

![Image](./images/202304162.jpg)

The picture above is the default image packaging rules of webpack in vue. Set type: 'asset', by default, for pictures smaller than 8k, the picture will be converted to base64 and inserted directly into the picture, and new pictures will not be generated in the dist directory. For pictures larger than 8k, it will be packaged into the dist directory, and then the address of the new picture will be returned to src.

The picture I used in the above test is a logo picture that comes with vue-cli, and the size is 6.69k. According to the default packaging rules, it will be converted into base64 and embedded in the picture. So for the convenience of telling, I modified its default configuration in vue.config.js, the configuration is as follows:

```js
module.exports = {
   // Using the configureWebpack object, the following can be written directly according to the writing method in webpack
   // The written content will eventually be merged into the webpack.config.js main configuration file by the webpack-merge plugin
   configureWebpack: {
     module: {
       rules: [
         {
           test: /\.(png|jpe?g|gif|webp|avif)(\?.*)?$/,
           type: "asset",
           parser: {
             dataUrlCondition: {
               // Here I changed the default size limit to 6k.
               // When the picture is less than 6k, use base64 to import the picture; when it is more than 6k, pack it into the dist directory and then import it
               maxSize: 1024 * 6,
             },
           },
         },
       ],
     },
   },
};
```

So much has been said above, what does it have to do with require, of course there is a drop.

We now know that vue is ultimately packaged through webpack, and a series of packaging rules will be written in the webpack configuration file. The packaging rules in webpack are actually aimed at modules one by one. In other words, webpack will only package modules. So how does webpack treat the image as a module? This requires our main require.

When we use the require method to introduce an image, webpack will treat the image as a module and package it according to the rules in the configuration file. **We can use require as a bridge, using the resource introduced by the require method, the resource will be treated as a module and packaged according to the configuration file, and the final packaging result will be returned. **

Back to question 4.2: What happens after calling the require method to introduce an image

**1. If the picture is smaller than the resource limit size set in the project, the base64 of the picture will be returned and inserted into the call of the require method**

**2. If the picture is larger than the resource limit size set in the project, the picture will be compiled into a new picture resource. The require method returns the new image resource path and file name**

Back to question 4: Why adding require can correctly introduce resources

**Because the file address obtained through the require method is the file address after the resource file is compiled (the file generated under dist or the base64 file), so you can find the corresponding file and successfully import the resource. **

The answer is that simple, to verify a wave

```vue
// Use require to dynamically import a picture in the vue file
<template>
   <div class="home">
       <!-- Use require to dynamically import images -->
       <img :src="require('../assets/logo.png')" alt="logo">
   </div>
</template>

//The result of the final compilation
//This picture can be opened correctly
<img src="/img/logo.6c137b82.png" alt="logo">
```

![Image](./images/202304163.jpg)

Is there a problem, no problem. At this point, we might as well optimize our standard answer again:

**Because of the dynamically added src, the address of the compiled file is inconsistent with the address of the compiled resource file, so resources cannot be imported correctly. And using require, what is returned is the file address after the resource file is compiled, so that the resource can be correctly introduced**

Seeing this, it is estimated that some friends still have some doubts, so I will expand another wave:

## 5. In question 3, a picture is imported statically without using require. Why is the compiled file address still returned?

---

Answer: When webpack compiles the Vue file, when encountering attributes such as src, it will use require to introduce the resource path by default. Quoting an original sentence from vue-cli official

> When you use a relative path (must start with `.`) to refer to a static resource in JavaScript, CSS or `*.vue` files, the resource will be included in the dependency graph of webpack. During its compilation, all resource URLs such as `<img src="...">`, `background: url(...)` and CSS `@import` **will be resolved as a module dependency* *.
>
> For example, `url(./image.png)` will be translated to `require('./image.png')`, while:
>
> ```
> <img src="./image.png">
> ```
>
> will be compiled to:
>
> ```
> h('img', { attrs: { src: require('./image.png') }})
> ```

## 6. According to question 5, when dynamically adding src, require will also be used to import it. Why is the compiled address of src inconsistent with the compiled image resource address?

---

Answer: Because when a picture is dynamically imported, the attribute value behind src is actually a variable. webpack will parse the attribute value behind src according to the v-bind directive. The resource path will not be introduced through reuqire. This is why you need to add require manually.

## 7. It is said that files under public will not be compiled, so when we use static paths to import resources, will we also use require to import them by default?

---

The official text reads like this:

> Any static resources placed in the `public` folder will simply be copied without going through webpack. You need to refer to them by absolute path.

Answer: No, the premise of using require to import resources is that the resource is a module parsed by webpack, and the files under public will not be compiled at all, and require will not be used.

## 8. Why must absolute paths be used for public resources?

---

Answer: Because although public files will not be compiled, all files under src will be compiled. Since the imported resources are public resources, require will not be used, and the defined file address in the code will be returned directly. This address cannot find the corresponding file in the compiled file directory (dist directory), which will cause the failure to import resources.

## 9. The webpack mentioned in the above document, why there are two ways to import resources, base64 and packaging into the dist directory, all packaged into the dist directory, isn’t it good?

---

Answer: In order to reduce http requests. The picture introduced by the path in the page will actually send a request to the server to get the picture. For files with small resources, set it to base64, which can reduce requests and will not affect the loading performance of the page.

- Reference link: cli.vuejs.org/zh/
- Reference link: wjhsh.net/vickylinj-p-15599154.html
