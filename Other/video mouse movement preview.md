---
title: video mouse movement preview
lang: en-US
date: 2022-05-12 11:22:00
author: XXXWeii
tags:
  - Other
---

## video mouse movement preview

> B station picture interface
> https://api.bilibili.com/x/player/videoshot?aid=14326240

```json
{
  "code": 0,
  "message": "0",
  "ttl": 1,
  "data": {
    "pvdata": "//i0.hdslb.com/bfs/videoshot/23378913.bin",
    "img_x_len": 10,
    "img_y_len": 10,
    "img_x_size": 160,
    "img_y_size": 90,
    "image": [
      "//i0.hdslb.com/bfs/videoshot/23378913.jpg",
      "//i0.hdslb.com/bfs/videoshot/23378913-1.jpg",
      "//i0.hdslb.com/bfs/videoshot/23378913-2.jpg"
    ],
    "index": []
  }
}
```

| field           | meaning                                                      | detail                                                       | example                                       |
| --------------- | ------------------------------------------------------------ | ------------------------------------------------------------ | --------------------------------------------- |
| data            | thumbnail                                                    |                                                              |                                               |
| data.pvdata     | A binary file                                                | Thumbnail, not every second corresponds to a thumbnail, but each section corresponds to one, this field should be the corresponding way of time period and thumbnail | //i0.hdslb .com/bfs/videoshot/89359010.bin    |
| data.img_x_len  | The number of images in the x direction of each sprite image | The sprite image is a 10\*10 grid                            | 10                                            |
| data.img_y_len  | The number of images in the y direction of each sprite image | The sprite image is a 10\*10 grid                            | 10                                            |
| data.img_x_size | Size of a single thumbnail image                             | x-axis                                                       | 160                                           |
| data.img_y_size | Size of a single thumbnail image                             | y-axis                                                       | 90                                            |
| data.image      | All thumbnails in the form of Sprite images                  | It is an array, get all the thumbnails at once               | ["//i0.hdslb.com/bfs/videoshot/89359010.jpg"] |

## code

```html
<!DOCTYPE html>
<html>
   <head>
     <meta charset="utf-8" />
     <title></title>
     <link
       rel="stylesheet"
       href="./resources/font-awesome-4.7.0/css/font-awesome.min.css"
     />
     <link rel="stylesheet" type="text/css" href="./select/select.css" />
     <style type="text/css">
       #container {
         position: absolute;
         top: 0;
         left: 0;
         right: 0;
         bottom: 0;
         margin: auto;
         width: 170px;
         height: 95px;
         background-image: url(20210223214102298jpg); //background image
         background-size: 1700px;
       }
     </style>
   </head>
   <body>
     <div id="container"></div>
     <script>
       const container = document. querySelector("#container");
       window.onload = function () {
         // When the mouse moves over the specified box, the event is triggered
         // Get the specified div element
         container.onmousemove = function (event) {
           console.log("event triggered!");
           // Get the position of the box
           let boxX = container. offsetLeft;
           let boxY = container.offsetTop;
           // Get the coordinates of the mouse
           let pageX = event.pageX;
           let pageY = event.pageY;
           //Calculate the coordinates of the mouse in the box
           let inBoxX = pageX - boxX;
           let inBoxY = pageY - boxY;
           // console.log("Coordinates in the box: x-->"+inBoxX+"--y-->"+inBoxY);
           //Calculate the X axis and move the picture
           // Change the picture every time you move 5 values
           if (inBoxX % 5) {
             //Calculate and display the first few pictures
             let imageIndex = parseInt(inBoxX / 5);
             console.log("Currently displaying the first picture: " + imageIndex);
             //Calculate the position of the displayed image in the large image
             //Calculate the X-axis of the displayed image (the calculation is the X-axis in the large image)
             let imageX = 170 * parseInt(imageIndex % 10);
             //Calculate the Y-axis of the displayed image (calculate the Y-axis in the large image)
             let imageY = 95 * parseInt(imageIndex / 10);
             console.log("imageX:" + imageX);
             console.log("imageY:" + imageY);
             //Modify the background image
             container.style.backgroundPosition=
               "-" + imageX + "px" + "-" + imageY + "px";
           }
         };
       };
     </script>
   </body>
</html>
```

> reference address
> [Imitation BiliBili video thumbnail implementation](https://blog.csdn.net/Mr_FenKuan/article/details/114003333?spm=1001.2101.3001.6650.7&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-7-114003333-blog-90724799.topblog&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-7-114003333-blog-90724799.topblog&utm_relevant_index=12)
