---
title: 原生JS实现轮播图
lang: zh-CN
author: XXXWeii
date: 2023-03-01 14:55:00
tags:
  - JavaScript
---

## 原生 JS 实现轮播图

---

最近原生 js 都有些生疏了，所以用原生 js 写了个简单的轮播图练练手。

## 方法一：更改 src 属性

---

第一种实现方法是只用一个 img 元素，然后动态改变 src 属性实现轮播，轮播的时候只是简单的进行图片切换，没有设置动画。

HTML 代码：

```html
<!DOCTYPE html5>
<html>
  <head>
    <title>SowingMap</title>
    <meta charset="utf-8" />
    <link href="./style.css" type="text/css" rel="stylesheet" />
  </head>
  <body>
    <div>
      <div class="FigureContainer" id="FigureContainer">
        <ul type="none" id="imgList">
          <li><img id="picture" src="imgs/1.jpg" /></li>
        </ul>
        <ul type="none" id="buttonList">
          <li class="curIndex"></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <div id="prev"><img src="imgs/icon-arrow-left.png" /></div>
        <div id="next"><img src="imgs/icon-arrow-right.png" /></div>
      </div>
    </div>
    <script src="sowingMap.js" type="text/javascript"></script>
  </body>
</html>
```

CSS 代码：

```css
* {
  margin: 0;
  padding: 0;
}

.figureContainer {
  width: 500px;
  height: 375px;
  overflow: display;
  position: relative;
  margin: 0 auto;
}

.figureContainer img {
  width: 500px;
}

#imgList {
  width: 100%;
}

#imgList li {
  width: 500px;
  height: 375px;
  float: left;
}

#buttonList {
  display: flex;
  width: 100%;
  justify-content: center;
}

#buttonList li {
  width: 40px;
  height: 5px;
  background: rgb(211, 197, 197);
  margin: 5px;
}

#buttonList .curIndex {
  background: rgb(146, 135, 135);
}

#prev img,
#next img {
  width: 30px;
  cursor: pointer;
}

#prev img {
  position: absolute;
  left: -50px;
  top: 50%;
  transform: translate(0, -50%);
}

#next img {
  position: absolute;
  right: -50px;
  top: 50%;
  transform: translate(0, -50%);
}
```

js 代码：

```js
window.onload = function () {
  var imgSrcs = [];
  var prevBt = document.getElementById("prev");
  var nextBt = document.getElementById("next");
  var pic = document.getElementById("picture");
  var buttons = document
    .getElementById("buttonList")
    .getElementsByTagName("li");
  var container = document.getElementById("FigureContainer");
  var PREV_HANDLER = false;
  var NEXT_HANDLER = true;
  var cur = 1;
  var i = 0;
  for (i = 0; i < 4; i++) {
    imgSrcs.push("imgs/" + (i + 1) + ".jpg");
    (function (index) {
      buttons[index].addEventListener("click", function () {
        var prevIndex = cur;
        cur = index + 1;
        buttons[prevIndex - 1].classList.toggle("curIndex");
        buttons[cur - 1].classList.toggle("curIndex");
        pic.src = imgSrcs[cur - 1];
      });
    })(i);
  }
  var handler = function (flag) {
    var prevIndex = cur;
    if (flag === PREV_HANDLER) {
      if (cur === 1) {
        cur = 4;
      } else {
        cur--;
      }
    } else {
      if (cur === 4) {
        cur = 1;
      } else {
        cur++;
      }
    }
    buttons[prevIndex - 1].classList.toggle("curIndex");
    buttons[cur - 1].classList.toggle("curIndex");
    pic.src = imgSrcs[cur - 1];
  };
  var prevBtHandler = handler.bind(null, PREV_HANDLER);
  var nextBthandler = handler.bind(null, NEXT_HANDLER);
  prevBt.addEventListener("click", prevBtHandler, false);
  nextBt.addEventListener("click", nextBthandler, false);
  timer = setInterval(nextBthandler, 3000);
  container.addEventListener("mouseenter", function () {
    if (timer) {
      clearInterval(timer);
    }
  });
  container.addEventListener("mouseleave", function () {
    timer = setInterval(nextBthandler, 3000);
  });
};
```

## 方法二：计算图片的位置

第二种是把所有图片都放在 html 框架中，然后用计算位置进行轮播，这种方法实现了动画切换
HTML 代码：

```html
<!DOCTYPE html5>
<html>
  <head>
    <title>SowingMap2</title>
    <meta charset="utf-8" />
    <link href="./style.css" type="text/css" rel="stylesheet" />
  </head>
  <body>
    <div>
      <div class="FigureContainer" id="FigureContainer">
        <ul type="none" id="imgList">
          <li><img src="imgs/1.jpg" /></li>
          <li><img src="imgs/2.jpg" /></li>
          <li><img src="imgs/3.jpg" /></li>
          <li><img src="imgs/4.jpg" /></li>
        </ul>
        <ul type="none" id="buttonList">
          <li class="curIndex"></li>
          <li></li>
          <li></li>
          <li></li>
        </ul>
        <div id="prev"><img src="imgs/icon-arrow-left.png" /></div>
        <div id="next"><img src="imgs/icon-arrow-right.png" /></div>
      </div>
    </div>
    <script src="sowingMap.js" type="text/javascript"></script>
  </body>
</html>
```

CSS 代码：

```css
* {
  margin: 0;
  padding: 0;
}

.figureContainer {
  width: 500px;
  height: 375px;
  overflow: hidden;
  position: relative;
  margin: 0 auto;
}

.figureContainer img {
  width: 500px;
}

#imgList {
  position: absolute;
  left: 0;
  top: 0;
  width: 400%;
}

#imgList li {
  width: 500px;
  height: 375px;
  float: left;
}

#buttonList {
  display: flex;
  width: 100%;
  justify-content: center;
  position: absolute;
  bottom: 20px;
}

#buttonList li {
  width: 40px;
  height: 5px;
  background: rgb(211, 197, 197);
  margin: 5px;
}

#buttonList .curIndex {
  background: rgb(146, 135, 135);
}

#prev img,
#next img {
  width: 30px;
  padding: 5px;
  cursor: pointer;
  background: rgba(204, 198, 198, 0.7);
}

#prev img {
  position: absolute;
  left: 20px;
  top: 50%;
  transform: translate(0, -50%);
}

#next img {
  position: absolute;
  right: 20px;
  top: 50%;
  transform: translate(0, -50%);
}
```

js 代码：

```js
var imgSrcs = [];
var prevBt = document.getElementById("prev");
var nextBt = document.getElementById("next");
var imgList = document.getElementById("imgList");
var buttons = document.getElementById("buttonList").getElementsByTagName("li");
var container = document.getElementById("FigureContainer");
var cur = 0;
var timer, timer_2; //前者为滑动定时器，后者为轮播定时器
var startAnimationFlag = true; //正在滑动时，点击下一页或上一页将无效
imgList.style.left = "0px";

function animate(curIndex, nextIndex) {
  if (!startAnimationFlag) return;
  var offset = (nextIndex - curIndex) * 500;
  var step = offset / 20;
  var target = parseFloat(imgList.style.left) - offset;
  buttons[curIndex].classList.toggle("curIndex");
  buttons[nextIndex].classList.toggle("curIndex");
  timer = setInterval(function () {
    var curPosition = parseFloat(imgList.style.left);
    if (curPosition != target) {
      var nextPosition = curPosition - step;
      imgList.style.left = nextPosition + "px";
      console.log("未清除前：", timer);
      clearInterval(timer_2);
      startAnimationFlag = false;
    } else {
      timer_2 = setInterval(function () {
        animate(cur, (cur + 1) % 4);
      }, 2000);
      clearInterval(timer);
      console.log("清除后：", timer);
      startAnimationFlag = true;
    }
  }, 20);
  cur = nextIndex;
}
nextBt.addEventListener(
  "click",
  function () {
    var nextIndex = 0;
    if (cur === 3) {
      nextIndex = 0;
    } else {
      nextIndex = cur + 1;
    }
    animate(cur, nextIndex);
  },
  false
);
prevBt.addEventListener(
  "click",
  function () {
    var nextIndex = 0;
    if (cur === 0) {
      nextIndex = 3;
    } else {
      nextIndex = cur - 1;
    }
    animate(cur, nextIndex);
  },
  false
);
for (var i = 0; i < 4; i++) {
  (function (index) {
    buttons[index].addEventListener("click", function () {
      animate(cur, index);
    });
  })(i);
}
timer_2 = setInterval(function () {
  animate(cur, (cur + 1) % 4);
}, 2000);
```
