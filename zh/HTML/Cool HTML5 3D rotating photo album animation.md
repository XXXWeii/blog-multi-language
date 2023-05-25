---
title: 超酷的HTML5 3D旋转相册动画
lang: zh-CN
author: XXXWeii
date: 2023-4-17 12:12:22
tags:
  - HTML
---

今天来教大家实现一个非常炫酷但又比较实用的 HTML5 3D 相册轮播动画。该相册动画有以下几个特点：

- 相册中的图片围成一个立体圆，并且沿着顺时针方向不停地循环转动。
- 每一张图片都有一个倒影的效果，更好地为相册呈现了 3D 视觉效果。
- 你也可以拖拽鼠标，实现相册的 360 度全景查看。
- 不仅支持图片，而且还支持 mp4 视频。
- 支持背景音乐播放。

先来看看最终效果吧！

## 效果预览

---

![](./images/202304171.gif)

## 代码实现

**HTML 代码**

HTML 中并不需要复杂的元素，总的来说，页面上构建一个容器，这个容器中用来定义相册中的图片以及视频元素，干净利落，代码如下：

```html
<div id="drag-container">
  <div id="spin-container">
    <!-- 在这里添加图片或者mp4视频 -->
    <img src="1.png" alt="" />
    <img src="2.png" alt="" />
    <img src="3.png" alt="" />
    <img src="4.png" alt="" />
    <img src="5.png" alt="" />
    <img src="6.png" alt="" />

    <!-- 带链接的图片 -->
    <a target="_blank" href="7.png">
      <img src="7.png" alt="" />
    </a>

    <!-- 示例视频  -->
    <video controls autoplay="autoplay" loop>
      <source src="demo.mp4" type="video/mp4" />
    </video>

    <!-- 背景文字描述 -->
    <p>3D 相册</p>
  </div>
  <div id="ground"></div>
</div>
```

**CSS 代码**

对于 CSS 代码，我们不做太多的解释，这里最主要的就是对图片或者视频元素的样式渲染，特别是实现了阴影的 3D 效果以及鼠标滑过时的发光特效：

```css
#drag-container img,
#drag-container video {
  -webkit-transform-style: preserve-3d;
  transform-style: preserve-3d;
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  line-height: 200px;
  font-size: 50px;
  text-align: center;
  -webkit-box-shadow: 0 0 8px #fff;
  box-shadow: 0 0 8px #fff;
  -webkit-box-reflect: below 10px linear-gradient(transparent, transparent, #0005);
}

#drag-container img:hover,
#drag-container video:hover {
  -webkit-box-shadow: 0 0 15px #fffd;
  box-shadow: 0 0 15px #fffd;
  -webkit-box-reflect: below 10px linear-gradient(transparent, transparent, #0007);
}
```

**JavaScript 代码**

这个相册插件有一个比较好的是，你可以在 JS 中定义部分全局参数，从而更好地做一些个性化配置，例如相册圆半径大小、旋转速度等等：

```js
// 全局参数定义
var radius = 240; // 相册的半径
var autoRotate = true; // 是否自动旋转
var rotateSpeed = -60; // 旋转速度
var imgWidth = 120; // 照片宽度 (unit: px)
var imgHeight = 170; // 照片高度 (unit: px)

// 背景音乐地址
var bgMusicURL =
  "https://api.soundcloud.com/tracks/143041228/stream?client_id=587aa2d384f7333a886010d5f52f302a";
var bgMusicControls = true; // 是否显示背景音乐播放器
```

相册初始化时候的动画特效：

```js
function init(delayTime) {
  for (var i = 0; i < aEle.length; i++) {
    aEle[i].style.transform =
      "rotateY(" +
      i * (360 / aEle.length) +
      "deg) translateZ(" +
      radius +
      "px)";
    aEle[i].style.transition = "transform 1s";
    aEle[i].style.transitionDelay = delayTime || (aEle.length - i) / 4 + "s";
  }
}
```

鼠标拖拽相册时，需要 360 度全景查看，这里对鼠标事件进行了处理，主要是 mousedown、mousemove 和 mouseup：

```js
document.onpointerdown = function (e) {
  clearInterval(odrag.timer);
  e = e || window.event;
  var sX = e.clientX,
    sY = e.clientY;

  this.onpointermove = function (e) {
    e = e || window.event;
    var nX = e.clientX,
      nY = e.clientY;
    desX = nX - sX;
    desY = nY - sY;
    tX += desX * 0.1;
    tY += desY * 0.1;
    applyTranform(odrag);
    sX = nX;
    sY = nY;
  };

  this.onpointerup = function (e) {
    odrag.timer = setInterval(function () {
      desX *= 0.95;
      desY *= 0.95;
      tX += desX * 0.1;
      tY += desY * 0.1;
      applyTranform(odrag);
      playSpin(false);
      if (Math.abs(desX) < 0.5 && Math.abs(desY) < 0.5) {
        clearInterval(odrag.timer);
        playSpin(true);
      }
    }, 17);
    this.onpointermove = this.onpointerup = null;
  };

  return false;
};
```

最后，我们还得要支持鼠标滚轮缩放，当我们滚动鼠标滚轮时，相册的半径会随着改变：

```js
document.onmousewheel = function (e) {
  e = e || window.event;
  var d = e.wheelDelta / 20 || -e.detail;
  radius += d;
  init(1);
};
```

到这里为止，我们的 HTML5 3D 相册的制作过程就全部完成了。
