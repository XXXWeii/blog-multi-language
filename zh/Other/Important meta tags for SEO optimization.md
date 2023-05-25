---
title: SEO优化重要的元标签
lang: zh-CN
author: XXXWeii
date: 2022-06-26 11:19:00
tags:
  - 其他
---

## 1.Title 标签

---

```HTML
<title>页面标签</title>
```

`<title/>`标签可以说是最主要、最重要的 SEOn 优化的元素。它将直接显示在搜索引擎的接口页里面，社交媒体分享，浏览器的标签页都将直接使用这个标题。

标题对于让用户快速了解搜索结果的内容至关重要。这是用户对你网页的第一印象，它通常是决定点击哪个结果的重要影响因素，因此在你的网页上使用高质量的标题很重要。

最佳实践：

- 为每个页面写一个唯一的标题标签
- 简短但具有描述性
- 避免通用和模糊的标题
- 创造一些值得点击的东西，抓住用户的好奇心
- 去猜测搜索意图，尽量匹配上
- 包含长尾关键字
- 保持在 60 个字符以内，超过这个长度搜索引擎会将标题截断

## 2.Meta Description 标签

---

该 meta 标签用于描述总结页面的内容。搜索引擎经常将其用于搜索结果的片段中，放在标题下面。它占据了搜索结果片段的很大部分的内容，内容的好坏很大程度上会影响用户是否点击这个结果，你需要设置一个引人注目的描述。谷歌不使用描述作为排名英语。

最佳实践：

- 给每个页面一个独特的描述，并清楚的反映内容
- 描述必须即真实又吸引人
- Google 的摘要通常最多可包含 150-160 个字符(包括空格)
- 包括你最重要的关键字，以便它们可以在搜索结果页上突出显示，但要小心避免关键字堆砌

## 3.标题标签(h1-h6)

---

```HTML
<h1>h1</h1>
<h1>h2</h1>
<h1>h3</h1>
<h1>h4</h1>
<h1>h5</h1>
<h1>h6</h1>
```

标题标签是 HTML 标签，HTML`<h1>-<h6>`标题(Heading)元素呈现了六个不同的级别的标题，`<h1>` 级别最高，而`<h6>`级别最低。它可以用来识别内容的结果层级。

现在标题标签不再是搜索引擎排名因素，标题标签中添加关键字，不一定可以使你的排名更好，但是对爬虫来说理解组织良好的内容更为容易。同时也方便用户理解页面内容。

最佳实践：

- 给每个页面一个独特的描述，并清楚地放映内容
- 描述必须即真实又吸引人
- Google 的摘要通常最多可包含 150-160 个字符（包括空格）
- 包括你最重要的关键字，以便它们可以在搜索结果页上上突出显示，但要小心避免关键字堆砌

## 4.图片 Alt 属性

---

```HTML
<img src="https://popeke.com/images/popeke@750w_20h.png" alt="popeke" />
```

图片的 alt 属性被添加到`<img/>`标签以描述其内容。

Alt 属性在页面优化方面很重要，原因有两个：

- 如果无法加载任何特定图像(或图像被禁用)，则会访问者显示替代文本。
- 搜索引擎无法读取图像，你应该为图像添加适当的替代文字，以便搜索引擎知道如何解释它们

最佳实践：

- 始终使用正确的描述，切勿在此标签中填充关键字
- 使用信息丰富的文件名，且清楚明了
- 创建图像站点地图
- 在替代文本中使用 50-55 个字符(最多 16 个单词)

## 5.Robots Meta 标签

---

机器人元标记告诉搜索引擎索引或不索引你的网页。

该标签对搜索引擎爬虫有四个主要值：

- follow - 搜索引擎爬虫将跟随该网页中的所有链接
- index – 搜索引擎爬虫会索引整个网页
- nofollow – 搜索引擎爬虫不会跟踪页面和该网页中的任何链接
- noindex – 搜索引擎爬虫不会将该网页编入索引 为你的机器人元标记使用以下语法：

```HTML
<meta name="robots" content="noindex, nofollow"> 表示不索引或不关注本网页。

<meta name="robots" content="index, follow"> 表示索引并关注这个网页。
```

最佳实践：

- 仅当你想限制搜索引擎抓取页面时才使用 Robots meta 标签
- 不要在 robots.txt 中屏蔽带 Robots meta 标签的页面

## 6.Canonical 标签

---

```HTML
<link rel="canonical" href="https://popeke.com/" />
```

rel=“canonical” link 标签为类似网页或重复网页指定权威网页。 它告诉搜索引擎哪个版本的页面是主要页面并希望被搜索引擎索引。

## 7.社交媒体 Meta 标签

---

现如今有两个主要标准定义如何格式化此元数据：Twitter Cards 和 Facebook Open Graph 协议。

### 一、Facebook Open Graph

---

Open Graph （开放图谱协议）由 Facebook 的创建，简称 OG 协议或 OGP。它是 Facebook 在 2010 年 F8 开发者大会公布的一种网页元信息（Meta Information）标记协议，属于 Meta Tag （Meta 标签）的范畴，是一种为社交分享而生的 Meta 标签。它允许在 Facebook 上，其他网站能像 Facebook 内容一样具有丰富的媒体对象，进而促进 Facebook 和其他网站之间的集成。

Open Graph 标签不仅被 Facebook 使用，也被 LinkedIn 和 Twitter 等平台使用。请注意 Twitter 也有自己的一套 Twitter Cards 定义，如果网页提供了 Twitter 自己的定义，则优先使用自己的标准。

#### Open Graph 常用属性

```HTML
# 标题
<meta property="og:title" content="HTML meta 标签详解">
# 类型
<meta property="og:type" content="article">
# 网页的永久链接
<meta property="og:url" content="https://popeke.com/">
# 网页的需要展示图片
<meta property="og:image" content="https://popeke.com/images/popeke@750w_20h.png">
```

对于 Open Graph 来说，每个页面里需要以上四个必需属性：

- og:title - 网页的标题，例如“刘星的个人网站”
- og:type - 网页的类型，所描述内容的类型。可以是 article，book，website, profile 等
- og:image - 一个图像 URL, 用于设置与页面关联的图像
- og:url - 对象的规范 URL

Open Graph 协议定义了一些网页类型， 包括 article、book、website、profile 等。

如果你的网页为个人主页，`og:type` 可以为 `profile`；如果你的网页是一个视频为主的网页面，则可以为`video`；如果你的网页是一篇博客文章则可以为`article`。如果你的网页没什么特殊的类别，则可将`og:type` 设置为通用的`website`。

除了以上四个必需属性之外，Open Graph 还有以下常用属性：

```HTML
<meta property="og:description" content="Description Here">
<meta property="og:site_name" content="Site Name">
<meta property="og:locale" content="zh_CN">
<meta property="og:video" content="link">
<meta property="og:audio" content="link">
```

- og:site_name 你的网站的名称
- og:description 你的页面的描述
- og:audio - 网页中的音频链接
- og:locale - 标记语言环境。格式为 language_TERRITORY。默认为 en_US。
- og:video - 你网页中的视频链接

除了以上介绍的常用内容外，Open Graph 还有很多属性。有关 Open Graph 协议的更多信息，请访问官方 Open Graph 协议网站 <https://ogp.me/>

如果你的网站设置了 Open Graph 你可以使用 [facebook 的 debug 工具](https://developers.facebook.com/tools/debug/) 来调试及查看显示效果

### 二、Twitter Card

---

大多数社交网站都遵循 Open Graph 协议，但是也有一些平台自己实现了一些定义，例如 Twitter。

Twitter Cards 是 Twitter 使用的元数据规范，用于在 Twitter 上共享链接时显示富文本、图像和视频。

#### Twitter Cards 常用属性

Twitter Cards 有四种不同的类型：Summary, Summary Card With Large Image, App, 和 Player.

```HTML
<meta name=twitter:card content="summary_large_image">
<meta name=twitter:image content="https://popeke.com/images/popeke@750w_20h.png">
<meta name=twitter:title content="HTML meta 标签详解">
<meta name=twitter:description content="meta 标签标签定义了关于 HTML 文档的元数据">
<meta name="twitter:creator" content="@yedaniu">
<meta name="twitter:site" content="@site_account">
```

- twitter:card : 卡片类型，将是 summary、summary_large_image、app 或 player 之一
- twitter:site : 用于卡片页脚中使用的网站 @username
- twitter:creator ：内容创建者 / 作者的 @username
- twitter:url : 分享对象的链接
- twitter:title : 分享对象的标题 （最多 70 个字符）
- twitter:description : 分享对象的描述 （最多 200 个字符）
- twitter:image : 分享对象的图片 URL, 支持的格式有 JPG、PNG、WEBP 和 GIF。只会导入 GIF 的第一帧

上面介绍了 Twitter Cards 一些常用属性，有关其他 Twitter Card 标签和选项的更多信息，请访问『官方 Twitter Cards 文档』[( https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards)。

如果你的网站设置了 Open Graph 你可以使用 [Twitter Cards](https://cards-dev.twitter.com/validator) 验证器 来调试及查看显示效果

#### Open Graph 与 Twitter Cards 常用属性汇总

Facebook 和 Twitter 提供了有关如何使用上述元标记的指南。在下表中，我们总结了有关它们的基本信息以及各自的建议。

| 元标签 |                                           facebook                                            |                                                         twitter                                                          |
| :----: | :-------------------------------------------------------------------------------------------: | :----------------------------------------------------------------------------------------------------------------------: |
|  标题  |                            og:title 文章的标题，例如你的网站名称。                            |                                twitter:title Twitter 卡片的必需参数，最大长度 70 个字符。                                |
|  图片  |                    og:image 当有人将内容分享到 Facebook 时显示的图像的 URL                    |                                        twitter:image 表示页面内容的唯一图像的 URL                                        |
|  网站  |                                    og:url 你页面的规范 URL                                    |                                               twitter:url 你页面的规范 URL                                               |
|  描述  | og:description 对内容的简要描述，通常在 2 到 4 个句子之间。这将显示在 Facebook 帖子的标题下方 | Twitter:description 简明概括内容的描述，适合在推文中呈现。你不应重复使用标题作为描述或使用此字段来描述网站提供的一般服务 |

## 8. 响应式设计 viewport Meta 标签

---

视口标记允许你配置页面在任何设备上的缩放和显示方式。

```HTML
<meta name="viewport" content="width=device-width, initial-scale=1"/>
```

视口元标记与排名没有直接关系，但与用户体验有关。

同时谷歌在移动搜索结果中对移动端友好的网页的排名更高

最佳实践：

- 在所有网页上设置 viewport 标签
