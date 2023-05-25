---
title: 阿里面试——如何用 js 实现瀑布流布局
lang: zh-CN
date: 2023-05-01 14:55:00
author: XXXWeii
tags:
  - JavaScript
---

> 作者：zt_ever
>
> https://juejin.cn/post/7216200378341589052

## 前言

---

> 瀑布流布局，是现在比较流行的一种页面布局方式，即`多行等宽`元素排列，`等宽不等高`，后面的元素`依次`添加到`前一行最矮`的元素`下方`。

它可以有效的降低页面的复杂度，节省很多的空间；并且，瀑布流的参差不齐的排列方式，可以通过界面展示给用户多条数据，并且让用户可以有向下浏览的冲动，提供了很好的用户体验！例如淘宝的页面就采用了这种布局方式，给大家看看**淘宝的瀑布流布局的效果图**（手机端）以及**我们要实现的效果图**（PC 端）吧~

![淘宝的瀑布流布局的效果图（手机端）](./images/2023050101.jpg)

![淘宝的瀑布流布局的效果图（PC端）](./images/2023050102.jpg)

## 思路准备

---

通过了解瀑布流布局的方式，我们来梳理一下实现它的步骤，方便我们代码的编写。

1、首先我们需要准备**很多张图片**（我这准备的是 40 张），还有**vscode**开发工具。

2、编写**前端**代码，给图片**添加样式**让图片**等宽并同行**显示。

3、编写**js**代码，要知道**第一行图片数量**，**下一张图片的序号**以及**前一行最矮的元素的序号**，还有**摆放的位置**。

## 正文

---

### 一、前端代码编写

> 1、首先我们定义一个**container**容器来装**所有图片**，在这个容器中用**box**容器装**box-img**容器再装入**每张图片**，这样方便之后样式的编写。

> 2、使图片**同行**显示--给 box 容器使用**float:left;属性**。

> 3、让图片**等宽**显示--给 box-img 容器设置 width:150px;**，img 标签设置**width:100%;继承父容器 box-img 高度的 100%。

> 4、为了使效果更好看，我们给装图片的容器设置**内边距，边框和阴影**的效果。

前端完整代码附上：

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>waterFall</title>
    <script src="./index.js"></script>
  </head>
  <style>
    * {
      margin: 0;
      padding: 0;
    }
    .container {
      overflow: hidden;
      position: relative;
    }
    .box {
      float: left;
      padding: 5px;
    }
    .box-img {
      width: 150px;
      padding: 5px;
      border: 1px solid #484848;
      box-shadow: 0 0 5px #484848;
    }
    .box-img img {
      width: 100%;
    }
  </style>
  <body>
    <div id="container">
      <div class="box">
        <div class="box-img">
          <img src="./img/1.jpg" alt="" />
        </div>
      </div>
      /*.......后面接39个box，此处省略*/
    </div>
  </body>
</html>
```

### 二、js 代码编写

#### 1、首先用 window.onload=function(){}来实现页面加载完毕后立即执行的功能

在这个函数中，我们调用**imgLocation('container','box')函数**来呈现最终效果，传入的实参是**父容器**'container'以及装图片的**子容器**'box'。

```js
window.onload = function () {
  imgLocation("container", "box");
};
```

#### 2、实现 imgLocation()函数功能

##### 1）首先我们得`获取所有要摆放的图片`，并将其存入一个`数组`中

利用 document.getElementById(parent)得到父容器；

调用**getChildElement(cparent,content)方法**，在这个方法中，先获取**父容器所有标签**，对所有标签**遍历**并用 if 条件语句**得到类名为 box 的容器**（装图片的容器），将其**存入**我们自己构建的一个**数组**中，返回值为这个数组，方便之后通过遍历来操作图片摆放的位置。

```js
function imgLocation(parent, content) {
  var cparent = document.getElementById(parent);
  //cparent下的所有的第一层的子容器 box
  var ccontent = getChildElement(cparent, content); //数组，40个div
}

//取到父容器中的某一层子容器
function getChildElement(parent, content) {
  var contentArr = [];
  var allContent = parent.getElementsByTagName("*"); //通过标签来选中得到一个数组
  //遍历allContent把其中类名为content的容器都存到contentArr数组中
  for (var i = 0; i < allContent.length; i++) {
    if (allContent[i].className == content) {
      //当前这个容器的类名是否为content
      contentArr.push(allContent[i]);
    }
  }
  return contentArr;
}
```

##### 2）得到这个`数组`后，找出`从谁开始`是需要`被摆放`位置的

我们采用以下方法：

首先获取**视窗的宽度**和**每张图片的宽度**，将两者**相除**并**向下取整**可得到**第一行**可以放置图片的数量，自然也就知道了我们需要**操作**的那张图片的**序号**。

```js
//从谁开始是需要被摆放位置的
var winWidth = document.documentElement.clientWidth; //视窗宽度
var imgWidth = ccontent[0].offsetWidth; //图片宽度

var num = Math.floor(winWidth / imgWidth); //第一行能放几张图
```

##### 3）得到需要`被摆放`位置的图片序号后，确定其`摆放位置`

我们自己定义一个**存储高度的数组**，对前一行元素的**高度**进行**遍历**并**存入**数组，当遍历到需要**被摆放**位置的图片时，用**Math.min()方法**获取前一行高度**最矮**的元素高度，并用**indexOf()方法**获取到其**下标**。

再对我们**所操作**的这个图片容器的**样式调整**：
position：absolute;**绝对定位**， **top 值**设置为前一行高度最矮的图片高度**minHeight**，**left 值**设置为单张图片宽度**乘**这张图片的下标 minIndex。

最后，不要忘啦，摆放好图片后，还要**更新**摆放的那一列的**高度**哟~

```js
//操作num+1张图
var BoxHeightArr = [];
for (var i = 0; i < ccontent.length; i++) {
  //前num张只要计算高度
  if (i < num) {
    BoxHeightArr[i] = ccontent[i].offsetHeight;
  } else {
    //我们要操作的box  :ccontent[i]
    var minHeight = Math.min.apply(null, BoxHeightArr); //apply:把最小值这个方法借给它用
    var minIndex = BoxHeightArr.indexOf(minHeight); //返回数组下标
    ccontent[i].style.position = "absolute"; //style设置样式
    ccontent[i].style.top = minHeight + "px";
    ccontent[i].style.left = imgWidth * minIndex + "px";

    //更新最矮的那一列的高度
    BoxHeightArr[minIndex] += ccontent[i].offsetHeight;
  }
}
```

最终整合一下就可以实现瀑布流的布局效果啦！

## 最后

---

以上就是瀑布流布局的实现过程，看完本文如果觉得有用，记得支持一下，收藏起来说不定哪天就用上啦～文章可能有一些错误，欢迎评论指出，也欢迎一起讨论。
