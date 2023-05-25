---
title: Markdown Syntax Guide
lang: en-US
date: 2022-03-01 14:55:00
author: XXXWeii
tags:
  - Other
---

> Markdown is a lightweight markup language that allows people to write documents in plain text that is easy to read and write

## title

Use `#` to represent 1-6 level headings, a first-level heading corresponds to one `#`, a second-level heading corresponds to two `#`, and so on.

```
# Level 1 title
## Second level title
### Level 3 title
#### Level 4 Headings
##### Level 5 Heading
###### Level 6 Heading
```

The effect is as follows:

- Level 1 title

  ## Second level title

  ### Level 3 title

  #### Level 4 Headings

  ##### Level 5 Heading

  ###### Level 6 Heading

  You can also use `==` for level 1 headings and `__` for level 2 headings

  ```
  This is the first level heading
  ==
  This is the second level heading
  --
  ```

  The effect is as follows:

  # Level 1 title

  ## Second level title

  ## font

  ```
  *I am in italics*
  _I am in italics_
  **i am in bold**
  __I am bold__
  ***I'm in bold italics***
  ___I am in bold italics___
  ```

  _I am in italics_

  _I am in italics_

  **i am in bold**

  **i am in bold**

  **_I am in bold italics_**

  **_I am in bold italics_**

  ## lines

  ```
  ~~I am deleting~~
  <u>This is an underscore</u>
  this is a dividing line
  ***
  this is a dividing line
  * * *
  this is a dividing line
  - - -
  this is a dividing line
  --------
  ```

  ~~I am deleting~~

  <u>This is an underscore</u>

  this is a dividing line

  ---

  this is a dividing line

  ---

  this is a dividing line

  ---

  ## This is a dividing line

  <strong>Note:</strong> Three or more `-` or `*`

  ## list

  ### Unordered list

  Use any of `+`, `-`, `*` as a token

  ```
  * list1
  + list2
  - list3
  ```

  - list1
  - list2
  - list3

  ### Ordered list

  Use numbers + `.` to represent

  ```
  1. list1
  2. list2
  3. list3
  ```

  1. list1
  2. list2
  3. list3

  ### List nesting

  ```
  1. list1
     - list1-1
     - list1-2
  2. list2
     - list2-1
     - list2-2
  ```

  1. list1

  - list1-1
  - list1-2

  2. list2

  - list2-1
  - list2-2

### task list

<strong>Note:</strong> This kind of writing is invalid in vuepress, you can use native checkboxes instead

```
- [ ] Have a meal
- [x] Sleep // Hit x to indicate completion
- [ ] Peas
```

- [ ] Have a meal
- [x] Sleep // Hit x to indicate completion
- [ ] Peas

```HTML
<label><input type="checkbox">Eat</label>
<label><input type="checkbox" checked>Sleep</label>
<label><input type="checkbox">Beat Peas</label>
```

<label><input type="checkbox">Eat</label>
<label><input type="checkbox" checked>Sleep</label>
<label><input type="checkbox">Beat Peas</label>

### Quote

It can be quoted infinitely, but it doesn't make much sense

```
> Preface: First Level Citation
>> Preface: Second Level Citation
```

> Preface: First Level Citation
>
> > Preface: Second Level References

### Link

```
[Baidu](https://www.baidu.com)
```

[Baidu](https://www.baidu.com)

```
<https://www.baidu.com>
```

<https://www.baidu.com>

### picture

```
![alt attribute text](image link)
![placeholder](https://iph.href.lu/200x200) //online image
![placeholder](/achievements-icon.png "test") //local image
```

![placeholder](https://iph.href.lu/200x200)
![placeholder](./images/achievements-icon.png)

## sheet

Markdown uses | to separate different cells, and - to separate the header and body

```
|Heading 1|Heading 2|Heading 2
| :- | :-: | -:
|Row 1 Column 1|Row 1 Column 2|Row 1 Column 3
|row 2 col 1|row 2 col 2|row 2 col 3
```

| Heading 1      |   Heading 2    |      Heading 2 |
| :------------- | :------------: | -------------: |
| Row 1 Column 1 | Row 1 Column 2 | Row 1 Column 3 |
| Row 2 Column 1 | Row 2 Column 2 | Row 2 Column 3 |

## code

### One-liner

````
(```)
console. log(1)
(```)
````

I tested it on several platforms here, and found that some can be displayed, and some cannot be displayed, so here I wrap a layer of () outside ``` for display and use. The effect is as follows:

```
console. log(1)
```

Or use 4 spaces directly, it is also possible to display a code snippet

```
console. log(1)
```

## Flowchart

Markdown also supports flowcharts or Gantt charts. However, because different platforms support them differently, some support them, and some do not, so the code of the flowchart will not be displayed.

## Compatible with HTML

The goal of Markdown is to become a writing language suitable for the Internet. It has fewer tags and only corresponds to a part of HTML. If it is not covered by it, we can use html tags to write. (It seems that some platforms are not supported)

```HTML
<span style="color:orange;">orange</span>
```

The effect is as follows:

<span style="color:orange;">orange</span>

Use `kbd` to display keystrokes:

```
<kbd>Ctrl</kbd>+<kbd>S</kbd>
```

<kbd>Ctrl</kbd>+<kbd>S</kbd> to save the document

Use backslashes to escape special characters:

```
\*\* normal display \*\*
```

\*\* normal display \*\*

## Annotation

Use `[^]` to define annotations: (invalid in <span style="color:#ff0000;">vuepress</span>)

```
I am a comment [^ comment 1]
I am also a comment [^ comment 2]
Go to [Baidu][1]

[^Note 1]: I am Note 1

[^Note 2]: I am Note 2
[1]: http://www.baidu.com
```

The effect is as follows:

I am a comment [^ comment 1]
I am also a comment [^ comment 2]
go to [Google][1]

[^Note 1]: i am comment 1
[^Note 2]: i am comment 2

[1]: http://www.google.com
