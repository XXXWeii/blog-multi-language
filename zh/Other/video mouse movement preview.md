---
title: video鼠标移动预览
lang: zh-CN
author: XXXWeii
date: 2022-05-12 11:22:00
tags:
  - 其他
---

## video 鼠标移动预览

> B 站图片接口
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

| 字段            | 含义                      | 详细                                                                                             | 举例                                          |
| --------------- | ------------------------- | ------------------------------------------------------------------------------------------------ | --------------------------------------------- |
| data            | 缩略图                    |                                                                                                  |                                               |
| data.pvdata     | 一个二进制文件            | 缩略图，并不是每一秒都对应一张缩略图，而是每一段对应一张，这个字段应该是时间段与缩略图的对应方式 | //i0.hdslb.com/bfs/videoshot/89359010.bin     |
| data.img_x_len  | 每张雪碧图 x 方向图片数量 | 雪碧图是一个 10\*10 的网格                                                                       | 10                                            |
| data.img_y_len  | 每张雪碧图 y 方向图片数量 | 雪碧图是一个 10\*10 的网格                                                                       | 10                                            |
| data.img_x_size | 单个缩略图图片的尺寸      | x 轴                                                                                             | 160                                           |
| data.img_y_size | 单个缩略图图片的尺寸      | y 轴                                                                                             | 90                                            |
| data.image      | 雪碧图形式的所有缩略图    | 是一个数组，一次拿到所有的缩略图                                                                 | ["//i0.hdslb.com/bfs/videoshot/89359010.jpg"] |

## 代码

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
        background-image: url(20210223214102298jpg); //背景图图片
        background-size: 1700px;
      }
    </style>
  </head>
  <body>
    <div id="container"></div>
    <script>
      const container = document.querySelector("#container");
      window.onload = function () {
        // 鼠标移动到指定box上时，触发事件
        //获取指定div元素
        container.onmousemove = function (event) {
          console.log("事件触发!");
          // 获取盒子的位置
          let boxX = container.offsetLeft;
          let boxY = container.offsetTop;
          // 获取鼠标的坐标
          let pageX = event.pageX;
          let pageY = event.pageY;
          //计算鼠标在盒子中的坐标
          let inBoxX = pageX - boxX;
          let inBoxY = pageY - boxY;
          // console.log("盒子中的坐标:x-->"+inBoxX+"--y-->"+inBoxY);
          //计算X轴，并移动图片
          //每移动5个值就改变一次图片
          if (inBoxX % 5) {
            //计算显示第几个图片
            let imageIndex = parseInt(inBoxX / 5);
            console.log("当前显示第几张图片:" + imageIndex);
            //计算显示图片在大图中的位置
            //计算显示图片的X轴(计算的是大图中的X轴)
            let imageX = 170 * parseInt(imageIndex % 10);
            //计算显示图片的Y轴(计算的是大图中的Y轴)
            let imageY = 95 * parseInt(imageIndex / 10);
            console.log("imageX:" + imageX);
            console.log("imageY:" + imageY);
            //修改背景图片
            container.style.backgroundPosition =
              "-" + imageX + "px" + " -" + imageY + "px";
          }
        };
      };
    </script>
  </body>
</html>
```

> 参考地址
> [仿 BiliBili 视屏缩略图实现](https://blog.csdn.net/Mr_FenKuan/article/details/114003333?spm=1001.2101.3001.6650.7&utm_medium=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-7-114003333-blog-90724799.topblog&depth_1-utm_source=distribute.pc_relevant.none-task-blog-2%7Edefault%7EBlogCommendFromBaidu%7ERate-7-114003333-blog-90724799.topblog&utm_relevant_index=12)
