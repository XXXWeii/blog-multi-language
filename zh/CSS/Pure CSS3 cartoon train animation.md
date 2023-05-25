---
title: 纯 CSS3 卡通小火车行驶动画
lang: zh-CN
author: XXXWeii
date: 2022-10-04 09:19:00
tags:
  - CSS
---

## 效果预览

---

![](https://s2.loli.net/2022/10/04/fNRBLuaT4OqV3XJ.gif)

## 代码实现

---

**HTML 代码**

```html
<div class="center">
  <div class="mountains"></div>
  <div class="train">
    <div class="engine-front">
      <div class="chimney">
        <div class="smoke"></div>
        <div class="smoke smoke-2"></div>
        <div class="smoke smoke-3"></div>
        <div class="smoke smoke-4"></div>
      </div>
    </div>

    <div class="engine-body"></div>

    <div class="compartment">
      <div class="compartment-window"></div>
    </div>

    <div class="compartment compartment-two">
      <div class="compartment-window"></div>
    </div>

    <div class="compartment compartment-three">
      <div class="compartment-window"></div>
    </div>

    <div class="wheel-holder">
      <div class="wheel"></div>
      <div class="wheel wheel-2">
        <div class="wheel-joint"></div>
        <div class="wheel-joint wheel-joint-2"></div>
      </div>
      <div class="wheel wheel-3"></div>
      <div class="wheel wheel-4"></div>
      <div class="wheel wheel-5"></div>
      <div class="wheel wheel-6"></div>
      <div class="wheel wheel-7"></div>
      <div class="wheel wheel-8"></div>
      <div class="wheel wheel-9"></div>
    </div>
  </div>
  <div class="bridge"></div>
</div>
```

HTML 代码的结构非常清晰，总体来讲分两部分，一部分是作为背景的明月、高山以及星空，对应的 CSS 类为`mountains`；另一部分则是行驶的火车，对应的 CSS 类为`train`。

对于火车部分则相对比较复杂，有车头、引擎、轨道、车轮、车厢等元素，下面的 CSS 代码中会一一讲解。

**CSS 代码**

背景部分绘制了两座高山，一轮明月以及清澈的星空。

```css
.mountains {
  height: 100%;
  position: absolute;
  width: 100%;
  z-index: 1;
}
.mountains::before,
.mountains::after {
  background: #000c18;
  background: -moz-linear-gradient(#012a53, #000c18 50%);
  background: -webkit-linear-gradient(#012a53, #000c18 50%);
  background: -o-linear-gradient(#012a53, #000c18 50%);
  background: -ms-linear-gradient(#012a53, #000c18 50%);
  background: linear-gradient(#012a53, #000c18 50%);
  content: "";
  height: 100%;
  position: absolute;
}
.mountains::before {
  border-radius: 100% 300% 0 0;
  left: -20%;
  width: 57%;
}
.mountains::after {
  border-radius: 300% 100% 0 0;
  right: -20%;
  width: 80%;
}
```

然后就是火车轨道的桥梁部分，也十分简单。

```css
.bridge {
  border-bottom: 0.3rem solid white;
  border-top: 0.3rem solid white;
  background: black;
  background: -webkit-linear-gradient(
        55deg,
        transparent 46%,
        white 46%,
        white 54%,
        transparent 54%
      ) left/1.6rem 2.2rem, -webkit-linear-gradient(
        -55deg,
        transparent 46%,
        white 46%,
        white 54%,
        transparent 54%
      ) left/1.6rem 2.2rem;
  background: -moz-linear-gradient(
        55deg,
        transparent 46%,
        white 46%,
        white 54%,
        transparent 54%
      ) left/1.6rem 2.2rem, -moz-linear-gradient(
        -55deg,
        transparent 46%,
        white 46%,
        white 54%,
        transparent 54%
      ) left/1.6rem 2.2rem;
  background: -o-linear-gradient(
        55deg,
        transparent 46%,
        white 46%,
        white 54%,
        transparent 54%
      ) left/1.6rem 2.2rem, -o-linear-gradient(
        -55deg,
        transparent 46%,
        white 46%,
        white 54%,
        transparent 54%
      ) left/1.6rem 2.2rem;
  background: -ms-linear-gradient(
        55deg,
        transparent 46%,
        white 46%,
        white 54%,
        transparent 54%
      ) left/1.6rem 2.2rem, -ms-linear-gradient(
        -55deg,
        transparent 46%,
        white 46%,
        white 54%,
        transparent 54%
      ) left/1.6rem 2.2rem;
  background: linear-gradient(
        55deg,
        transparent 46%,
        white 46%,
        white 54%,
        transparent 54%
      ) left/1.6rem 2.2rem, linear-gradient(
        -55deg,
        transparent 46%,
        white 46%,
        white 54%,
        transparent 54%
      ) left/1.6rem 2.2rem;
  bottom: 10rem;
  height: 2.6rem;
  position: absolute;
  width: 100%;
  z-index: 1;
}
```

在后面就是本动画的主体部分小火车了，其每一部分都有对应的 CSS 类来描述，请看代码：

```css
.train {
  animation: move-train 24s linear infinite;
  bottom: 12.6rem;
  height: 10rem;
  position: absolute;
  left: calc(100% + 1.3rem);
  width: 44rem;
  z-index: 1;
}

.engine-front,
.engine-front::before,
.engine-front::after {
  background: #0f0f0f;
  background: linear-gradient(0deg, #0f0f0f, #262626, #0f0f0f);
  border: 0.1rem solid rgba(255, 255, 255, 0.15);
  border-radius: 50% 0 0 50%;
  border-right: none;
}

.engine-front {
  animation: body-upDown 0.3s infinite;
  border-radius: 0.5rem 0 0 0.5rem;
  bottom: 1.4rem;
  height: 4.6rem;
  left: 0;
  position: absolute;
  width: 8rem;
}
.engine-front::before,
.engine-front::after {
  content: "";
  position: absolute;
  height: 70%;
  left: -0.9rem;
  top: 50%;
  transform: translate(0, -50%);
  width: 0.8rem;
}
.engine-front::after {
  height: 40%;
  left: -1.4rem;
  width: 0.5rem;
}

.chimney {
  background: #990000;
  height: 2.2rem;
  left: 2.5rem;
  position: absolute;
  top: -2.3rem;
  width: 1.7rem;
}
.chimney::before,
.chimney::after {
  content: "";
  position: absolute;
}
.chimney::before {
  animation: up-down 0.3s infinite;
  border-bottom: none;
  border-left: 0.5rem solid transparent;
  border-right: 0.5rem solid transparent;
  border-top: 0.8rem solid orange;
  left: 50%;
  top: -0.9rem;
  transform: translate(-50%, 0);
  width: 160%;
}

.smoke {
  animation: move-smoke 0.4s linear infinite;
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  height: 1.4rem;
  left: 0.2rem;
  position: absolute;
  top: -1.5rem;
  width: 0.8rem;
  z-index: -1;
}
.smoke-2 {
  animation-delay: 0.1s;
  left: 0.4rem;
}
.smoke-3 {
  animation-delay: 0.2s;
  left: 0.6rem;
}
.smoke-4 {
  left: 0.8rem;
}

.engine-body {
  animation: body-upDown 0.3s 0.1s infinite;
  background: #b30000;
  background: linear-gradient(0deg, #330000, red, #990000);
  border-radius: 0 0 0.4rem 0;
  bottom: 1.4rem;
  height: 7rem;
  left: 8rem;
  position: absolute;
  width: 5rem;
}
.engine-body::before,
.engine-body::after {
  content: "";
  left: 50%;
  position: absolute;
  transform: translate(-50%, 0);
}
.engine-body::before {
  animation: up-down 0.3s 0.2s infinite;
  background: #660000;
  background: linear-gradient(0deg, #660000, #990000, #660000);
  border-radius: 50% 50% 0 0;
  height: 1.2rem;
  top: -1.2rem;
  width: 130%;
}
.engine-body::after {
  background: #b3e0f2;
  border-radius: 0.2rem;
  height: 40%;
  top: 1rem;
  width: 45%;
}

.wheel::before,
.wheel::after {
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
}

.wheel-holder {
  height: 2.8rem;
  bottom: 0;
  position: absolute;
  width: 100%;
}

.wheel {
  animation: rotate 2s linear infinite;
  background: orange;
  border: 0.3rem solid rgba(0, 0, 0, 0.6);
  border-radius: 50%;
  height: 2.8rem;
  left: 1rem;
  position: absolute;
  width: 2.8rem;
}
.wheel-2 {
  left: 4.5rem;
}
.wheel-3 {
  border-width: 0.5rem;
  height: 3.8rem;
  left: 8.7rem;
  top: -1.1rem;
  width: 3.8rem;
}
.wheel-4 {
  left: 15.7rem;
}
.wheel-5 {
  left: 19.5rem;
}
.wheel-6 {
  left: 25.7rem;
}
.wheel-7 {
  left: 29.5rem;
}
.wheel-8 {
  left: 35.7rem;
}
.wheel-9 {
  left: 39.5rem;
}
.wheel::before,
.wheel::after {
  content: "";
  position: absolute;
}
.wheel::before {
  background: rgba(0, 0, 0, 0.3);
  height: 86%;
  width: 0.2rem;
}
.wheel::after {
  background: #996300;
  background: -webkit-radial-gradient(
    circle at center,
    #b37400 30%,
    #996300 30%
  );
  background: -moz-radial-gradient(circle at center, #b37400 30%, #996300 30%);
  background: -o-radial-gradient(circle at center, #b37400 30%, #996300 30%);
  background: -ms-radial-gradient(circle at center, #b37400 30%, #996300 30%);
  background: radial-gradient(circle at center, #b37400 30%, #996300 30%);
  border-radius: 50%;
  height: 40%;
  width: 40%;
}

.compartment {
  animation: body-upDown 0.3s infinite;
  background: #186c8e;
  background: -webkit-linear-gradient(#104b63 50%, #1f8dba);
  background: -moz-linear-gradient(#104b63 50%, #1f8dba);
  background: -o-linear-gradient(#104b63 50%, #1f8dba);
  background: -ms-linear-gradient(#104b63 50%, #1f8dba);
  background: linear-gradient(#104b63 50%, #1f8dba);
  border-radius: 0 0 0.3rem 0.3rem;
  bottom: 1.4rem;
  height: 5rem;
  left: 15rem;
  position: absolute;
  width: 8rem;
}
.compartment-two {
  animation: body-upDown 0.3s 0.1s infinite;
  left: 25rem;
}
.compartment-two .compartment-window::before {
  animation: up-down 0.3s 0.3s infinite;
}
.compartment-three {
  animation: body-upDown 0.3s 0.2s infinite;
  left: 35rem;
}
.compartment-three .compartment-window::before {
  animation: up-down 0.35s infinite;
}
.compartment::before,
.compartment::after {
  background: black;
  border: 0.4rem solid transparent;
  bottom: 0.4rem;
  box-shadow: 0 0 0 1px rgba(255, 255, 255, 0.1);
  content: "";
  height: 0.8rem;
  position: absolute;
  width: 0.9rem;
}
.compartment::before {
  border-left: 0.4rem solid rgba(255, 255, 255, 0.3);
  left: -0.9rem;
}
.compartment::after {
  border-right: 0.4rem solid rgba(255, 255, 255, 0.3);
  left: -2rem;
}

.compartment-window {
  background: #1f8dba;
  background: -moz-linear-gradient(90deg, transparent 0.8rem, skyblue 0.8rem) left/2.4rem
    100%;
  background: -webkit-linear-gradient(90deg, transparent 0.8rem, skyblue 0.8rem)
    left/2.4rem 100%;
  background: -o-linear-gradient(90deg, transparent 0.8rem, skyblue 0.8rem) left/2.4rem
    100%;
  background: -ms-linear-gradient(90deg, transparent 0.8rem, skyblue 0.8rem) left/2.4rem
    100%;
  background: linear-gradient(90deg, transparent 0.8rem, skyblue 0.8rem) left/2.4rem
    100%;
  height: 40%;
  position: absolute;
  top: 0.7rem;
  width: 100%;
}
.compartment-window::before,
.compartment-window::after {
  content: "";
  position: absolute;
}
.compartment-window::before {
  animation: up-down 0.3s 0.1s infinite;
  background: #104b63;
  border-radius: 50% 50% 0 0;
  height: 0.6rem;
  left: 50%;
  top: -1.4rem;
  transform: translate(-50%, 0);
  width: 110%;
}
```

到这里为止，我们已经用 HTML 和 CSS 代码将整个小火车以及周围的环境都绘制出来了。

那么最重要的一步便是让这辆小火车在桥梁上行驶起来，这就要用到 CSS3 的一些动画属性了，CSS3 的动画帧闪亮登场

```css
@keyframes up-down {
  0%,
  100% {
    transform: translate(-50%, 0);
  }
  50% {
    transform: translate(-50%, -0.3rem);
  }
}
@keyframes rotate {
  100% {
    transform: rotate(-360deg);
  }
}
@keyframes move-train {
  100% {
    transform: translateX(-154rem);
  }
}
@keyframes body-upDown {
  0%,
  100% {
    transform: translateY(0);
  }
  100% {
    transform: translateY(-0.2rem);
  }
}
@keyframes move-smoke {
  0% {
    -webkit-filter: blur(0);
    -moz-filter: blur(0);
    -o-filter: blur(0);
    -ms-filter: blur(0);
    filter: blur(0);
    opacity: 1;
  }
  50% {
    -webkit-filter: blur(0.2rem);
    -moz-filter: blur(0.2rem);
    -o-filter: blur(0.2rem);
    -ms-filter: blur(0.2rem);
    filter: blur(0.2rem);
    opacity: 0.6;
    transform: translate(0, -3rem) scale(2);
  }
  100% {
    -webkit-filter: blur(0.3rem);
    -moz-filter: blur(0.3rem);
    -o-filter: blur(0.3rem);
    -ms-filter: blur(0.3rem);
    filter: blur(0.3rem);
    opacity: 0;
    transform: translate(2.5rem, -6rem) scale(3);
  }
}
@keyframes wheel-joint {
  100% {
    transform: rotate(360deg);
  }
}
```

这些动画中做了几件事情。

第一，让车厢盖子上下拍动，让动画小火车行驶的样子更加逼真。

第二，利用滤镜，非常生动地描绘出了小火车行驶过程中蒸汽机引擎冒出的蒸汽。

第三，让小火车整体在桥梁上周而复始地行驶，车轮也不停的转动。
