---
title: A Pure CSS Flying Helicopter Animation Guide
lang: en-US
date: 2022-10-04 09:43:00
author: XXXWeii
tags:
  - CSS
---

## Pure CSS Flying Helicopter Animation Guide

---

Today, let's learn how to build a beautiful animation project using only HTML and CSS. This assumes that you are all intermediate CSS developers.

The following CSS3 animation properties will be used in this project:

- CSS transitions
- 3D transformation
- CSS transition effects
- animation
- Custom animation frames

Are you excited? let's start!

## Define the helicopter structure using HTML

---

First, let us define a container in the `main` element, named `helicopter`, and then write 4 `div` elements in order in this container, and the `class` attribute value of each `div` element is as follows:

-cockpit
- tail
- main
-rotor

In the `rotor` class, you need to add a `div` with a `rotator` class, and then add two more empty `div`s inside this `rotator` class.

```html
<html>
 <head>
 </head>
 <body>
  <main class="helicopter">
     <div class="cockpit"></div>
     <div class="tail"></div>
     <div class="main"></div>
     <div class="rotor">
       <div class="rotator">
         <div></div>
         <div></div>
       </div>
     </div>
     <main>
 </body>
</html>
```

## Helicopter structure design

---

Now let's design the HTML structure so that it becomes a helicopter shape.

`body`

```css
body {
  /* 将元素居中 */
  width: 100%;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
```

`.cockpit`class

```css
.cockpit {
  position: absolute;
  overflow: hidden;
  z-index: 1;
  width: 195px;
  height: 195px;
  border-radius: 100px 40px 50px 50px;
  background-color: #44d2fd;
}
```

![](https://i.postimg.cc/7ZNWJzbk/image.png)

Now add glass to this `cockpit` class. Define glass shapes on `:before` and `:after` in `.cockpit`:

```css
.cockpit::before {
  content: "";
  position: absolute;
  z-index: 1;
  top: -10px;
  left: -25px;
  width: 170px;
  height: 170px;
  border-radius: 40px;
  background-color: #302e37;
}
.cockpit::after {
  content: "";
  position: absolute;
  z-index: 1;
  top: -60px;
  left: -60px;
  width: 170px;
  height: 170px;
  border-radius: 40px;
  background-color: rgba(255, 255, 255, 0.05);
}
```

output:

![](https://i.postimg.cc/QdP0Tqsv/image.png)

`.tail` class

Apply styles to `.tail` classes:

```css
.tail {
  position: absolute;
  top: 50px;
  left: 150px;
  transform-origin: left center;
  border-top: 10px solid transparent;
  border-bottom: 80px solid transparent;
  border-left: 350px solid #2fadd2;
  border-bottom-right-radius: 10px;
  height: 10px;
}
```

output:

![](https://i.postimg.cc/QNbmbDhQ/image.png)

`.main`class

This class is the rotating body of the helicopter:

```css
.main {
  position: absolute;
  left: 130px;
  top: -10px;
  width: 40px;
  height: 20px;
  background: #302e37;
}
```

output:

![](https://i.postimg.cc/htH1jP1B/image.png)

`.rotor`class

```css
.rotor {
  width: 700px;
  height: 700px;
  border-radius: 350px;
  position: absolute;
  top: -360px;
  left: -200px;
  z-index: 2;
  overflow: hidden;
  background-color: #a299ab;
  opacity: 0.12;
  transform: scaleY(0.075);
}
```

output:

![](https://i.postimg.cc/y6vhRTyn/image.png)

After designing the style of the helicopter propeller, in order to make the rotor more realistic, now locate the two empty `div` inside the `rotor`. That way when we apply the `rotate` animation in the next section, you'll see a nice animation.

```css
.rotator div {
  position: absolute;
  top: 50%;
  left: 50%;
  margin-left: -350px;
  margin-top: -30px;
  width: 700px;
  height: 80px;
  background-color: #fff;
}

.rotator div:nth-child(1) {
  transform: rotate(0deg);
}

.rotor div:nth-child(2) {
  transform: rotate(90deg);
}
```

output:

![](https://i.postimg.cc/q7syvc7s/image.png)

## So how do you make the helicopter fly?

---

So far we have created the shape and appearance of the helicopter. But without animation and keyframing, it's not animation. So, use the CSS animation property to give this helicopter the power to fly.

## define @Keyframes

---

Before using the `animation` property, we need to create keyframes. For this project, we create two `@keyframes`:

- bounce
- rotate

`bounce`

```css
@keyframes bounce {
  0%,
  100% {
    transform: translate(0px, -50px) rotate(-15deg);
  }
  50% {
    transform: translate(0px, 50px) rotate(-10deg);
  }
}
```

`rotate`

```css
@keyframes rotate {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}
```

## Using animation properties

---

Now, add these two `@keyframes` to the `.helicopter` and `.rotator` classes.

`.helicopter` class

```css
.helicopter {
  /* adding bounce keyframes with duration 5s and infinite loop */
  animation: bounce 5s infinite;
}
```

`.rotator`class

```css
.rotator {
  position: absolute;
  width: 700px;
  height: 700px;
  border-radius: 350px;
  animation: rotate 0.6s linear infinite; */\* added rotate @keyframs \*/*
}
```

output:![](https://i.postimg.cc/jdDf7Y5d/image.gif)

## Conclusion

---

So far, we know how to create complex shapes and animations using only CSS. You don't even have to touch JavaScript. Hope you enjoy this project.

Thank you all for reading. happy coding
