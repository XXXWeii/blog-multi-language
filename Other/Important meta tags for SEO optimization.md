---
title: Important meta tags for SEO optimization
lang: en-US
date: 2022-06-26 11:19:00
author: XXXWeii
tags:
  - Other
---

## 1. Title tag

---

```HTML
<title>Page Label</title>
```

The `<title/>` tag is arguably the most important and most important SEOn optimized element. It will be directly displayed in the interface page of the search engine, social media sharing, and the tab page of the browser will directly use this title.

Headings are critical for giving users a quick idea of what a search result is about. This is a user's first impression of your page, and it's often an important factor in deciding which result to click, so it's important to use high-quality titles on your pages.

Best Practices:

- Write a unique title tag for each page
- short but descriptive
- Avoid generic and vague titles
- Create something click-worthy and grab the user's curiosity
- To guess the search intent and try to match it
- Include long tail keywords
- Keep it under 60 characters, after which search engines will truncate the title

## 2. Meta Description tag

---

The meta tag is used to describe the content of the summary page. Search engines often use it in snippets of search results, below the title. It occupies a large part of the content of the search result snippet. The quality of the content will largely affect whether the user clicks on this result. You need to set a compelling description. Google does not use descriptions as ranking English.

Best Practices:

- Give each page a unique description that clearly reflects the content
- The description must be both realistic and engaging
- Google's snippet typically has a maximum of 150-160 characters (including spaces)
- Include your most important keywords so they can be featured prominently on the search results page, but be careful to avoid keyword stuffing

## 3. Heading tags (h1-h6)

---

```HTML
<h1>h1</h1>
<h1>h2</h1>
<h1>h3</h1>
<h1>h4</h1>
<h1>h5</h1>
<h1>h6</h1>
```

Heading tags are HTML tags, and the HTML `<h1>-<h6>` heading (Heading) element presents six different levels of headings, with `<h1>` being the highest level and `<h6>` the lowest level. It can be used to identify the resulting hierarchy of content.

Now that title tags are no longer a search engine ranking factor, adding keywords to title tags may not necessarily make your rankings better, but it will be easier for crawlers to understand well-organized content. At the same time, it is also convenient for users to understand the content of the page.

Best Practices:

- Give each page a unique description and clearly project the content
- The description must be both realistic and engaging
- Google's snippet typically has a maximum of 150-160 characters (including spaces)
- Include your most important keywords so they can be featured prominently on the search results page, but be careful to avoid keyword stuffing

## 4. Image Alt attribute

---

```HTML
<img src="https://popeke.com/images/popeke@750w_20h.png" alt="popeke" />
```

An image's alt attribute is added to the `<img/>` tag to describe its content.

Alt attributes are important in on-page optimization for two reasons:

- If any particular image cannot be loaded (or the image is disabled), alt text is shown to the visitor.
- Search engines cannot read images, you should add appropriate alt text for images so search engines know how to interpret them

Best Practices:

- Always use the correct description, never stuff this tag with keywords
- Use informative filenames that are clear and unambiguous
- Create image sitemaps
- Use 50-55 characters (maximum 16 words) in alt text

## 5.Robots Meta Tag

---

The robots meta tag tells search engines to index or not index your webpage.

This tag has four main values for search engine crawlers:

- follow - search engine crawlers will follow all links in this page
- index – search engine crawlers index the entire webpage
- nofollow – search engine crawlers will not follow the page and any links within that page
- noindex – the page will not be indexed by search engine crawlers Use the following syntax for your robots meta tag:

```HTML
<meta name="robots" content="noindex, nofollow"> means do not index or follow this page.

<meta name="robots" content="index, follow"> means to index and follow this webpage.
```

Best Practices:

- Use the Robots meta tag only if you want to restrict search engines from crawling the page
- Do not block pages with robots meta tags in robots.txt

## 6. Canonical tags

---

```HTML
<link rel="canonical" href="https://popeke.com/" />
```

The rel="canonical" link tag designates the canonical page for similar or duplicate pages. It tells search engines which version of the page is the main page and wants to be indexed by search engines.

## 7. Social Media Meta Tags

---

Today there are two main standards that define how this metadata is formatted: Twitter Cards and the Facebook Open Graph protocol.

### 1. Facebook Open Graph

---

Open Graph (Open Graph Protocol) was created by Facebook, referred to as OG Protocol or OGP. It is a web page meta information (Meta Information) tagging protocol announced by Facebook at the F8 Developers Conference in 2010. It belongs to the category of Meta Tag (Meta tag), and is a Meta tag born for social sharing. It allows other sites on Facebook to have rich media objects like Facebook content, facilitating integration between Facebook and other sites.

Open Graph tags are used not only by Facebook, but also by platforms such as LinkedIn and Twitter. Note that Twitter also has its own set of Twitter Cards definitions, and if a web page provides Twitter's own definitions, their own standards will take precedence.

#### Common properties of Open Graph

```HTML
# title
<meta property="og:title" content="HTML meta tag details">
# type
<meta property="og:type" content="article">
# The permanent link of the page
<meta property="og:url" content="https://popeke.com/">
# Need to display pictures on the web page
<meta property="og:image" content="https://popeke.com/images/popeke@750w_20h.png">
```

For Open Graph, the above four required properties are required in each page:

- og:title - the title of the web page, such as "Liu Xing's personal website"
- og:type - the type of web page, the type of content described. Can be article, book, website, profile, etc.
- og:image - an image URL to set the image associated with the page
- og:url - the canonical URL of the object

The Open Graph protocol defines some web page types, including article, book, website, profile, etc.

If your web page is a personal home page, `og:type` can be `profile`; if your web page is a video-based web page, it can be `video`; if your web page is a blog post, it can be for `article`. If your web page has no special category, you can set `og:type` to the generic `website`.

In addition to the above four required properties, Open Graph also has the following common properties:

```HTML
<meta property="og:description" content="Description Here">
<meta property="og:site_name" content="Site Name">
<meta property="og:locale" content="zh_CN">
<meta property="og:video" content="link">
<meta property="og:audio" content="link">
```

- og:site_name the name of your site
- og:description A description of your page
- og:audio - audio link in web page
- og:locale - mark locale. The format is language_TERRITORY. Defaults to en_US.
- og:video - the link to the video on your page

In addition to the common content introduced above, Open Graph has many attributes. For more information on the Open Graph Protocol, please visit the official Open Graph Protocol website <https://ogp.me/>

If your website is set with Open Graph, you can use [facebook's debug tool](https://developers.facebook.com/tools/debug/) to debug and view the display effect

### 2. Twitter Card

---

Most social networking sites follow the Open Graph protocol, but there are some platforms that implement some definitions themselves, such as Twitter.

Twitter Cards is a metadata specification used by Twitter to display rich text, images, and videos when sharing links on Twitter.

#### Common properties of Twitter Cards

There are four different types of Twitter Cards: Summary, Summary Card With Large Image, App, and Player.

```HTML
<meta name=twitter:card content="summary_large_image">
<meta name=twitter:image content="https://popeke.com/images/popeke@750w_20h.png">
<meta name=twitter:title content="HTML meta tag details">
<meta name=twitter:description content="meta tag tags define metadata about HTML documents">
<meta name="twitter:creator" content="@yedaniu">
<meta name="twitter:site" content="@site_account">
```

- twitter:card : card type, will be one of summary, summary_large_image, app or player
- twitter:site : for the website @username used in the card footer
- twitter:creator: @username of the content creator/author
- twitter:url : link to share with
- twitter:title : The title of the person you're sharing with (maximum 70 characters)
- twitter:description : A description of who you're sharing with (maximum 200 characters)
- twitter:image : URL of the image to be shared with, the supported formats are JPG, PNG, WEBP and GIF. Only the first frame of the GIF will be imported

The above describes some common properties of Twitter Cards, for more information on other Twitter Card tags and options, please visit the "Official Twitter Cards Documentation" [( https://developer.twitter.com/en/docs/twitter-for-websites /cards/overview/abouts-cards)](https://developer.twitter.com/en/docs/twitter-for-websites/cards/overview/abouts-cards).

If your website is set up with Open Graph, you can use the [Twitter Cards](https://cards-dev.twitter.com/validator) validator to debug and view the display effect

#### Summary of common attributes of Open Graph and Twitter Cards

Facebook and Twitter provide guidance on how to use the above meta tags. In the table below we summarize basic information about them and recommendations for each.

|  meta tags  | facebook                                                     | twitter                                                      |
| :---------: | ------------------------------------------------------------ | ------------------------------------------------------------ |
|    Title    | og:title The title of the article, eg your website name.     | twitter:title Required parameter for Twitter cards, max length 70 characters. |
|    Image    | og:image URL of an image that is displayed when someone shares content to Facebook | twitter:image URL of a unique image representing the content of the page |
|   website   | og:url the canonical URL of your page                        | twitter:url the canonical URL of your page                   |
| Description | og:description A brief description of the content, usually between 2 and 4 sentences. This will appear below the title of a Facebook post | Twitter:description A short, concise description of the content, suitable for presentation in a Tweet. You should not reuse the title as a description or use this field to describe the general service offered by the site |

## 8. Responsive design viewport Meta tag

---

The viewport tag allows you to configure how the page is scaled and displayed on any device.

```HTML
<meta name="viewport" content="width=device-width, initial-scale=1"/>
```

Viewport meta tags are not directly related to rankings, but to user experience.

Also, Google ranks mobile-friendly pages higher in mobile search results

Best Practices:

- set viewport tag on all pages
