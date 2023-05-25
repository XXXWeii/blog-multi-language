---
title: Native JS realizes the carousel map
lang: en-US
date: 2023-03-01 14:55:00
author: XXXWeii
tags:
  - JavaScript
---

## Native JS realizes carousel

---

Recently, the native js is a bit rusty, so I wrote a simple carousel image with native js to practice.

## Method 1: Change the src attribute

---

The first implementation method is to use only one img element, and then dynamically change the src attribute to realize the carousel. During the carousel, the pictures are simply switched without animation.

HTML code:

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

CSS code:

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

#buttonList. curIndex {
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

js code:

```js
window.onload = function () {
   var imgSrcs = [];
   var prevBt = document. getElementById("prev");
   var nextBt = document. getElementById("next");
   var pic = document. getElementById("picture");
   var buttons = document
     .getElementById("buttonList")
     .getElementsByTagName("li");
   var container = document. getElementById("FigureContainer");
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
   var prevBtHandler = handler. bind(null, PREV_HANDLER);
   var nextBthandler = handler. bind(null, NEXT_HANDLER);
   prevBt. addEventListener("click", prevBtHandler, false);
   nextBt. addEventListener("click", nextBthandler, false);
   timer = setInterval(nextBthandler, 3000);
   container. addEventListener("mouseenter", function () {
     if (timer) {
       clearInterval(timer);
     }
   });
   container. addEventListener("mouseleave", function () {
     timer = setInterval(nextBthandler, 3000);
   });
};
```

## Method 2: Calculate the position of the picture

The second is to put all the pictures in the html frame, and then use the calculated position to rotate, this method realizes the animation switching
HTML code:

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

CSS code:

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

#buttonList. curIndex {
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

js code:

```js
var imgSrcs = [];
var prevBt = document. getElementById("prev");
var nextBt = document. getElementById("next");
var imgList = document. getElementById("imgList");
var buttons = document.getElementById("buttonList").getElementsByTagName("li");
var container = document. getElementById("FigureContainer");
var cur = 0;
var timer, timer_2; //The former is a slide timer, the latter is a carousel timer
var startAnimationFlag = true; //When sliding, clicking the next or previous page will not work
imgList.style.left = "0px";

function animate(curIndex, nextIndex) {
   if (!startAnimationFlag) return;
   var offset = (nextIndex - curIndex) * 500;
   var step = offset / 20;
   var target = parseFloat(imgList. style. left) - offset;
   buttons[curIndex].classList.toggle("curIndex");
   buttons[nextIndex].classList.toggle("curIndex");
   timer = setInterval(function () {
     var curPosition = parseFloat(imgList. style. left);
     if (curPosition != target) {
       var nextPosition = curPosition - step;
       imgList.style.left = nextPosition + "px";
       console.log("Before clearing:", timer);
       clearInterval(timer_2);
       startAnimationFlag = false;
     } else {
       timer_2 = setInterval(function () {
         animate(cur, (cur + 1) % 4);
       }, 2000);
       clearInterval(timer);
       console.log("After clearing:", timer);
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
