---
title: A good Vue front-end code style guide
lang: en-US
date: 2023-04-18
author: XXXWeii
tags:
  - Vue
---

## 1. Naming convention

---

Commonly used naming conventions on the market:

- `camelCase` (CamelCase - first letter lowercase)
- `PascalCase` (CamelCase - capitalize the first letter)
- `kebab-case` (short horizontal line connection type)
- `Snake` (underscore connection type)

### 1.1 Project file naming

#### 1.1.1 Project name

All in lowercase, separated by **dash**. Example: `my-project-name`.

#### 1.1.2 Directory name

**Refer to the project naming rules, when there is a plural structure, use the plural nomenclature**. Example: docs, assets, components, directives, mixins, utils, views.

```
my-project-name/
|- BuildScript // pipeline deployment file directory
|- docs // Detailed documentation directory of the project (optional)
|- nginx // Front-end project nginx proxy file directory deployed on the container
|- node_modules // Downloaded dependencies
|- public // static page directory
     |- index.html // project entry
|- src // source directory
     |- api // http request directory
     |- assets // Static resource directory, the resources here will be built by wabpack
         |- icon // icon storage directory
         |- img // image storage directory
         |- js // public js file directory
         |- scss // public style scss storage directory
             |- frame.scss // entry file
             |- global.scss // public styles
             |- reset.scss // reset styles
     |- components // components
     |- plugins // plugins
     |- router // routing
     |- routes // Detailed routing split directory (optional)
         |- index.js
     |- store // global state management
     |- utils // tool storage directory
         |- request.js // public request tool
     |- views // page storage directory
     |- App.vue // root component
     |- main.js // entry file
     |- tests // test cases
     |- .browserslistrc// browser compatible configuration file
     |- .editorconfig // editor configuration file
     |- .eslintignore // eslint ignore rules
     |- .eslintrc.js // eslint rules
     |- .gitignore // git ignore rules
     |- babel.config.js // babel rules
     |- Dockerfile // Docker deployment file
     |- jest.config.js
     |- package-lock.json
     |- package.json // dependencies
     |- README.md // Project README
     |- vue.config.js // webpack configuration
```

#### 1.1.3 Image file name

All are in lowercase, single word names are preferred, and multiple word names are separated by **underscore**.

```
banner_sina.gif
menu_aboutus.gif
menutitle_news.gif
logo_police.gif
logo_national.gif
pic_people.jpg
pic_TV.jpg
```

#### 1.1.4 HTML file name

All are in lowercase, single word names are preferred, and multiple word names are separated by **underscore**.

```
|- error_report.html
|- success_report.html
```

#### 1.1.5 CSS file name

All are in lowercase, single-word names are preferred, and multiple-word names are separated by **dash**.

```
|- normalize.less
|- base.less
|- date-picker.scss
|- input-number.scss
```

#### 1.1.6 JavaScript filename

All are in lowercase, single-word names are preferred, and multiple-word names are separated by **dash**.

```
|- index.js
|- plugin.js
|- util.js
|- date-util.js
|- account-model.js
|- collapse-transition.js
```

> The above rules can be quickly memorized as "underline in static files, dash in compiled files".

### 1.2 Vue component naming

#### 1.2.1 Single file component name

`single-file components` with a `.vue` file extension. Single-file component names should always start with **word capitalized** (PascalCase).

```
components/
|- MyComponent.vue
```

#### 1.2.2 Singleton component name

**Components that only have a single active instance should be named with `The` prefix to indicate their uniqueness. **

This doesn't mean that the component can only be used on a single page, but that it's only used once *per page*. These components never accept any props, since they are custom for your application. If you find it necessary to add a prop, it's an indication that this is actually a reusable component, *only currently* used only once per page.

For example, the header and sidebar components are used on almost every page, do not accept props, and are custom-made for this application.

```
components/
|- TheHeading.vue
|- TheSidebar.vue
```

#### 1.2.3 Basic component name

> Basic components: Basic components that do not include business, independent, and specific functions, such as **date picker**, **modal box**, etc. This type of component will be widely used as the basic control of the project, so the API of the component is highly abstracted, and different functions can be realized through different configurations.

Basic components that apply specific styles and conventions (that is, components that display classes, have no logic or state, and do not mix business logic) should all start with a specific prefix - Base. **Basic components can be used multiple times in one page, and can be reused in different pages. They are highly reusable components. **

```
components/
|- BaseButton.vue
|- BaseTable.vue
|- BaseIcon.vue
```

#### 1.2.4 Business components

> Business component: It is not like the basic component that only contains a certain function, but is reused by multiple pages in the business (with reusability). The difference between it and the basic component is that the business component is only in the current project It will be used, not universal, and will include some services, such as data requests; while the basic component does not contain services, can be used in any project, and has a single function, such as an input box with data verification function.

**Components mixed with complex business (with their own `data`, `prop` related processing), that is, business components** should be named with `Custom` prefix. Business components are in a page. For example: there is a card list in a certain page, and the cards whose style and logic are closely related to the business are business components.

```
components/
|- CustomCard.vue
```

#### 1.2.5 Tightly coupled component names

**Child components that are tightly coupled with the parent component should be named with the parent component name as a prefix. ** Since editors usually organize files alphabetically, doing this will keep related files together.

```
components/
|- TodoList.vue
|- TodoListItem.vue
|- TodoListItemButton.vue
```

#### 1.2.6 Order of words in component names

**Component names should start with a high-level (usually descriptive) word and end with a descriptive modifier. ** Because editors usually organize files alphabetically, important relationships between components are now visible at a glance. The following components are mainly used for search and setting functions.

```
components/
|- SearchButtonClear.vue
|- SearchButtonRun.vue
|- SearchInputQuery.vue
|- SearchInputExcludeGlob.vue
|- SettingsCheckboxTerms.vue
|- SettingsCheckboxLaunchOnStartup.vue
```

There is another way of multi-level directories, put all the search components into the "search" directory, and put all the settings components into the "settings" directory. We only recommend doing this for very large (e.g. 100+ components) applications, because navigating through multiple levels of directories takes more effort than scrolling through a single components directory.

#### 1.2.7 Component names of complete words

** Component names should be preferred rather than abbreviated. ** Autocompletion in editors already makes writing long names cheap, and the clarity it brings is invaluable. Abbreviations that are not commonly used in particular should be avoided.

```
components/
|- StudentDashboardSettings.vue
|- UserProfileOptions.vue
```

### 1.3 Code parameter naming

#### 1.3.1 name

**Component names should always be multiple words and should always be PascalCase. ** Except root component App and Vue built-in components like `<transition>`, `<component>`. Doing this avoids conflicts with existing and future HTML elements, since all HTML element names are single-word.

```vue
export default { name: 'ToDoList', // ... }
```

#### 1.3.2 props

**When declaring props, their names should always use camelCase, and in templates and JSX should always use kebab-case**. We simply follow the conventions of each language, which is more naturally camelCase in JavaScript. In HTML it is kebab-case.

```vue
<WelcomeMessage greeting-text="hi" />
export default { name: 'MyComponent', // ... props: { greetingText: { type:
String, required: true, validator: function (value) { return ['syncing',
'synced',].indexOf(value) !== -1 } } } }
```

#### 1.3.3 router

**Vue Router Path is named in kebab-case format. ** Words using Snake (eg: `/user_info`) or camelCase (eg: `/userInfo`) will be treated as one word, and search engines cannot distinguish semantics.

```js
// bad
{
   path: '/user_info', // user_info as a word
   name: 'UserInfo',
   component: UserInfo,
   meta: {
     title: '-User',
     desc: ''
   }
},

//good
{
   path: '/user-info', // can be parsed into user info
   name: 'UserInfo',
   component: UserInfo,
   meta: {
     title: '-User',
     desc: ''
   }
},
```

#### 1.3.4 Components in the template

**For the vast majority of projects, component names should always be PascalCase in single-file components and string templates, but kebab-case in DOM templates. **

```vue
<!-- In single-file components and string templates -->
<MyComponent />

<!-- in the DOM template -->
<my-component></my-component>
```

#### 1.3.5 Self-closing components

**Components with no content in single-file components, string templates, and JSX should be self-closing - but never in DOM templates. **

```vue
<!-- In single-file components and string templates -->
<MyComponent />

<!-- everywhere -->
<my-component></my-component>
```

#### 1.3.6 Variables

- Naming method: camelCase
- Naming convention: type + method of object description or attribute

```
// bad
var getTitle = "LoginTable"

//good
let tableTitle = "LoginTable"
let mySchool = "My School"
```

#### 1.3.7 Constants

- Naming method: all uppercase underscores
- Naming convention: Use uppercase letters and underscores to combine names, and underscores to separate words

```
const MAX_COUNT = 10
const URL = 'http://test.host.com'
```

#### 1.3.8 Methods

- Naming method: camelCase
- Naming convention: Use verbs or verbs + nouns uniformly

```
// 1. Under normal circumstances, use the verb + noun form
// bad
go, nextPage, show, open, login

//good
jumpPage, openCarInfoDialog

// 2. Request data method, end with data
// bad
takeData, confirmData, getList, postForm

//good
getListData, postFormData

// 3. The case of a single verb
init, refresh
```

| verb | meaning                                                | return value                                                 |
| :--- | :----------------------------------------------------- | ------------------------------------------------------------ |
| can  | Determines whether an action can be performed (right ) | The function returns a boolean value. true: executable; false: not executable; |
| has  | Determines whether a value is contained                | The function returns a boolean value. true: contains this value; false: does not contain this value; |
| is   | Determines if a value is                               | The function returns a boolean value. true: a certain value; false: not a certain value; |
| get  | get a value                                            | function returns a non-boolean value                         |
| set  | Set a value                                            | No return value, return whether the setting is successful or return a chain object |

#### 1.3.9 Custom Events

**Custom events should always use kebab-case event names. **

Unlike components and props, there is no automatic case conversion of event names. Instead, the name of the event that is triggered needs to exactly match the name used to listen to this event.

```vue
this. $emit('my-event')
<MyComponent @my-event="handleDoSomething" />
```

Unlike components and props, the event name is not used as a JavaScript variable name or property name, so there is no reason to use camelCase or PascalCase. And the `v-on` event listener will be automatically converted to all lowercase in the DOM template (because HTML is case-insensitive), so `v-on:myEvent` will become `v-on:myevent` -causing `myEvent` to be impossible to listen to.

- **Native event reference list**[1]

From native events, it can be found that its usage is as follows:

```vue
<div
   @blur="toggleHeaderFocus"
   @focus="toggleHeaderFocus"
   @click="toggleMenu"
   @keydown.esc="handleKeydown"
   @keydown.enter="handleKeydown"
   @keydown.up.prevent="handleKeydown"
   @keydown.down.prevent="handleKeydown"
   @keydown.tab="handleKeydown"
   @keydown.delete="handleKeydown"
   @mouseenter="hasMouseHoverHead = true"
   @mouseleave="hasMouseHoverHead = false"
>
</div>
```

In order to distinguish the use of *native events* and *custom events* in Vue, it is recommended that in addition to using kebab-case for multi-word event names, the naming must also follow the form of **`on` + verb**, as follows:

```vue
<!-- parent component -->
<div
   @on-search="handleSearch"
   @on-clear="handleClear"
   @on-clickoutside="handleClickOutside"
>
</div>
// subcomponent export default { methods: { handleTriggerItem () {
this. $emit('on-clear') } } }
```

#### 1.3.10 Event method

- Naming method: camelCase
- Naming convention: handle + name (optional) + verb

```vue
<template>
  <div
    @click.native.stop="handleItemClick()"
    @mouseenter.native.stop="handleItemHover()"
  ></div>
</template>

<script>
export default {
  methods: {
    handleItemClick() {
      //...
    },
    handleItemHover() {
      //...
    },
  },
};
</script>
```

## 2. Code specification

---

### 2.1 Vue

#### 2.1.1 Code structure

```vue
<template>
  <div id="my-component">
    <DemoComponent />
  </div>
</template>

<script>
import DemoComponent from '../components/DemoComponent'

export default {
  name: 'MyComponent',
  components: {
    DemoComponent
  },
  mixins: [],
  props: {},
  data () {
    return {}
  },
  computed: {},
  watch: {}
  created () {},
  mounted () {},
  destroyed () {},
  methods: {},
}
</script>

<style lang="scss" scoped>
#my-component {
}
</style>
```

#### 2.1.2 data

**`data` of a component must be a function.** 

```vue
// In a .vue file export default { data () { return { foo: 'bar' } } }
```

#### 2.1.3 props

**Prop definition should be as detailed as possible. **

```vue
export default { props: { status: { type: String, required: true, validator:
function (value) { return ['syncing', 'synced', 'version-conflict', 'error'
].indexOf(value) !== -1 } } } }
```

#### 2.1.4 computed

** Complex computed properties should be split into as many simpler properties as possible. ** Small, focused computed properties reduce hypothetical constraints on information usage, so less refactoring is required when requirements change.

```vue
// bad computed: { price: function () { var basePrice = this.manufactureCost /
(1 - this.profitMargin) return ( basePrice - basePrice * (this.discountPercent
|| 0) ) } } // good computed: { basePrice: function () { return
this.manufactureCost / (1 - this.profitMargin) }, discount: function () { return
this.basePrice * (this.discountPercent || 0) }, finalPrice: function () { return
this.basePrice - this.discount } }
```

#### 2.1.5 Set key value for `v-for`

**Must use `key` with `v-for`** on the component in order to maintain the state of the inner component and its subtree. Even maintain predictable behavior on elements, such as **object solidification\(object constancy\)**[2] in animations.

```vue
<ul>
   <li
     v-for="todo in todos"
     :key="todo.id">
       {{ todo.text }}
   </li>
</ul>
```

#### 2.1.6 `v-if` and `v-for` are mutually exclusive

**Never use `v-if` and `v-for` on the same element at the same time. **

```vue
<!-- bad: console error -->
<ul>
   <li
     v-for="user in users"
     v-if="shouldShowUsers"
     :key="user.id">
       {{ user.name }}
   </li>
</ul>
```

Generally we tend to do this in two common situations:

- To filter items in a list (e.g. `v-for="user in users" v-if="user.isActive"`). In this case, replace `users` with a computed property (such as `activeUsers`) that returns the filtered list.

```vue
computed: { activeUsers: function () { return this.users.filter((user) => {
return user.isActive }) } }
<ul>
   <li
     v-for="user in activeUsers"
     :key="user.id">
       {{ user.name }}
   </li>
</ul>
```

- To avoid rendering lists that should be hidden (e.g. `v-for="user in users" v-if="shouldShowUsers"`). In this case, move the `v-if` to the container element (e.g. `ul`, `ol`).

```vue
<!-- bad -->
<ul>
   <li
     v-for="user in users"
     v-if="shouldShowUsers"
     :key="user.id">
       {{ user.name }}
   </li>
</ul>

<!-- good -->
<ul v-if="shouldShowUsers">
   <li
     v-for="user in users"
     :key="user.id">
       {{ user.name }}
   </li>
</ul>
```

#### 2.1.7 Multiple attribute elements

**Multiple attribute elements should be written in multiple lines, one for each attribute. **

```vue
<!-- bad -->
<img src="https://vuejs.org/images/logo.png" alt="Vue Logo">
<MyComponent foo="a" bar="b" baz="c"/>
<!-- good -->
<img
   src="https://vuejs.org/images/logo.png"
   alt="Vue Logo">

<MyComponent
   foo="a"
   bar="b"
   baz="c"/>
```

#### 2.1.8 Simple expressions in templates

**Component templates should only contain simple expressions, and complex expressions should be refactored into computed properties or methods. **

Complex expressions can make your templates less declarative. We should try to describe **what** that should appear, not **how** to calculate that value. And computed properties and methods make code reusable.

```vue
// bad
{{
   fullName
     .split(" ")
     .map((word) => {
       return word[0].toUpperCase() + word.slice(1);
     })
     .join(" ")
}}
```

Better practice:

```vue
<!-- in a template -->
{{ normalizedFullName }}
// complex expression has been moved into a computed property computed: { normalizedFullName: function () {
return this.fullName.split(' ').map(function (word) { return
word[0].toUpperCase() + word.slice(1) }).join(' ') } }
```

#### 2.1.9 Attribute values with quotes

**Non-empty HTML attribute values should always be enclosed in double quotes. **

```vue
<!-- bad -->
<input type=text>
<AppSidebar :style={width:sidebarWidth+'px'}>
<!-- good -->
<input type="text">
<AppSidebar :style="{ width: sidebarWidth + 'px' }">
```

#### 2.1.10 Instruction abbreviation

- **use `:` for `v-bind:`**
- **Use `@` for `v-on:`**
- **Use `#` for `v-slot:`**

```vue
<input
  :value="newTodoText"
  :placeholder="newTodoInstructions">

<input
  @input="onInput"
  @focus="onFocus">

<template #header>
  <h1>Here might be a page title</h1>
</template>

<template #footer>
  <p>Here's some contact info</p>
</template>
```

### 2.2 HTML

#### 2.2.1 File template

HTML5 file template:

```html
<!DOCTYPE html>
<html lang="en-CN">
   <head>
     <meta charset="UTF-8" />
     <title>HTML5 standard template</title>
   </head>
   <body></body>
</html>
```

Mobile terminal:

```html
<!DOCTYPE html>
<html lang="en-CN">
   <head>
     <meta charset="UTF-8" />
     <meta
       name="viewport"
       content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no, shrink-to-fit=no"
     />
     <meta name="format-detection" content="telephone=no" />
     <title>Mobile HTML Template</title>

     <!-- S DNS pre-resolution -->
     <link rel="dns-prefetch" href="" />
     <!-- E DNS pre-resolution -->

     <!-- S online style page slice, please uncomment the reference directly for development -->
     <!-- #include virtual="" -->
     <!-- E online style sheet -->

     <!-- S Local debugging, select the debugging method according to the development mode, please develop and delete -->
     <link rel="stylesheet" href="css/index.css" />
     <!-- /Local debugging method -->

     <link rel="stylesheet" href="http://srcPath/index.css" />
     <!-- /Development machine debugging method -->
     <!-- E local debugging -->
   </head>
   <body></body>
</html>
```

PC side:

```html
<!DOCTYPE html>
<html lang="en-CN">
   <head>
     <meta charset="UTF-8" />
     <meta name="keywords" content="your keywords" />
     <meta name="description" content="your description" />
     <meta name="author" content="author,email address" />
     <meta name="robots" content="index,follow" />
     <meta http-equiv="X-UA-Compatible" content="IE=Edge,chrome=1" />
     <meta name="renderer" content="ie-stand" />
     <title>HTML Template for PC</title>

     <!-- S DNS pre-resolution -->
     <link rel="dns-prefetch" href="" />
     <!-- E DNS pre-resolution -->

     <!-- S online style page slice, please uncomment the reference directly for development -->
     <!-- #include virtual="" -->
     <!-- E online style sheet -->

     <!-- S Local debugging, select the debugging method according to the development mode, please develop and delete -->
     <link rel="stylesheet" href="css/index.css" />
     <!-- /Local debugging method -->

     <link rel="stylesheet" href="http://srcPath/index.css" />
     <!-- /Development machine debugging method -->
     <!-- E local debugging -->
   </head>
   <body></body>
</html>
```

#### 2.2.2 Element and label closure

There are five types of HTML elements:

- Empty elements: area, base, br, col, command, embed, hr, img, input, keygen, link, meta, param, source, track, wbr
- Raw text elements: script, style
- RCDATA elements: textarea, title
- foreign elements: elements from the MathML namespace and the SVG namespace
- regular elements: other elements allowed by HTML are called regular elements

In order to allow the browser to better parse the code and make the code more readable, there are the following conventions:

- All elements that have a start tag and an end tag must be written with a start and stop tag, and some elements that allow the omission of the start tag or the bundle tag must also be written.
- Empty element tags do not add "/" characters.

```html
<!-- good -->
<div>
   <h1>I am the h1 heading</h1>
   <p>I am a piece of text, I have a beginning and an end, and the browser can parse it correctly</p>
</div>

<br data-tomark-pass />

<!-- bad -->
<div>
   <h1>I am the h1 heading</h1>
   <p>I am a piece of text, I have a beginning and an end, and the browser can parse it correctly</p>
</div>

<br />
```

#### 2.2.3 Code nesting

Element nesting specification, each block element is on its own line, and inline elements are optional.

```html
<!-- good -->
<div>
   <h1></h1>
   <p></p>
</div>
<p><span></span><span></span></p>

<!-- bad -->
<div>
   <h1></h1>
   <p></p>
</div>
<p>
   <span></span>
   <span></span>
</p>
```

Paragraph and heading elements can only nest inline elements.

```html
<!-- good -->
<h1><span></span></h1>
<p><span></span><span></span></p>

<!-- bad -->
<h1><div></div></h1>
<p><div></div><div></div></p>
```

### 2.3 CSS

#### 2.3.1 Style files

The style file must be written with the `@charset` rule, and it must be written at the first character position of the first line of the style file, and the encoding name uses `"UTF-8"`.

- recommend:

```css
@charset "UTF-8";
.jdc {
}
```

- Not recommended:

```css
/* @charset rule does not start with the first character of the first line of the file */
@charset "UTF-8";
.jdc {
}

/* @charset rules are not lowercased */
@charset "UTF-8";
.jdc {
}

/* no @charset rules */
.jdc {
}
```

#### 2.3.2 Code formatting

There are generally two types of style writing: one is the compact format (Compact), and the other is the expanded format (Expanded).

- Recommended: Expanded format (Expanded)

```css
.jdc {
   display: block;
   width: 50px;
}
```

- Not recommended: compact format (Compact)

```css
.jdc {
   display: block;
   width: 50px;
}
```

#### 2.3.3 Code case

Style selectors, attribute names, and attribute value keywords are all written in lowercase letters, and attribute strings are allowed to use uppercase and lowercase letters.

- recommend:

```css
.jdc {
   display: block;
}
```

- Not recommended:

```css
.JDC {
   display: BLOCK;
}
```

#### 2.3.4 Code readability

1. There is a space between the opening bracket and the class name, and a space between the colon and the attribute value.

- recommend:

```css
.jdc {
   width: 100%;
}
```

- Not recommended:

```css
.jdc {
   width: 100%;
}
```

1. Values separated by commas, followed by a space.

- recommend:

```css
.jdc {
   box-shadow: 1px 1px 1px #333, 2px 2px 2px #ccc;
}
```

- Not recommended:

```css
.jdc {
   box-shadow: 1px 1px 1px #333, 2px 2px 2px #ccc;
}
```

1. Open a new line for a single CSS selector or a new declaration.

- recommend:

```css
.jdc,
.jdc_logo,
.jdc_hd {
   color: #ff0;
}

.nav {
   color: #fff;
}
```

- Not recommended:

```css
.jdc,
.jdc_logo,
.jdc_hd {
   color: #ff0;
}
.nav {
   color: #fff;
}
```

1. The color value `rgb()` `rgba()` `hsl()` `hsla()` `rect()` does not need to have spaces, and the value should not contain unnecessary 0.

- recommend:

```css
.jdc {
   color: rgba(255, 255, 255, 0.5);
}
```

- Not recommended:

```css
.jdc {
   color: rgba(255, 255, 255, 0.5);
}
```

1. The hexadecimal value of the attribute value should be abbreviated as much as possible.

- recommend:

```css
.jdc {
   color: #fff;
}
```

- Not recommended:

```css
.jdc {
   color: #ffffff;
}
```

1. Do not specify units for `0`.

- recommend:

```css
.jdc {
   margin: 0 10px;
}
```

- Not recommended:

```css
.jdc {
   margin: 0px 10px;
}
```

#### 2.3.5 Attribute value quotes

When quotation marks are required for CSS attribute values, use single quotation marks uniformly.

- recommend:

```css
.jdc {
   font-family: "Hiragino Sans GB";
}
```

- Not recommended:

```css
.jdc {
   font-family: "Hiragino Sans GB";
}
```

#### 2.3.6 Attribute Writing Suggestions

The following sequence is recommended:

1. Layout positioning attributes: display / position / float / clear / visibility / overflow
2. Self attributes: width / height / margin / padding / border / background
3. Text attributes: color / font / text-decoration / text-align / vertical-align / white-space / break-word
4. Other attributes (CSS3): content / cursor / border-radius / box-shadow / text-shadow / background: linear-gradient …

```css
.jdc {
   display: block;
   position: relative;
   float: left;
   width: 100px;
   height: 100px;
   margin: 0 10px;
   padding: 20px 0;
   font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
   color: #333;
   background: rgba(0, 0, 0, 0.5);
   -webkit-border-radius: 10px;
   -moz-border-radius: 10px;
   -o-border-radius: 10px;
   -ms-border-radius: 10px;
   border-radius: 10px;
}
```

#### 3.3.7 CSS3 browser-specific prefixes

CSS3 browser-proprietary prefixes come first, standard prefixes follow.

```css
.jdc {
   -webkit-border-radius: 10px;
   -moz-border-radius: 10px;
   -o-border-radius: 10px;
   -ms-border-radius: 10px;
   border-radius: 10px;
}
```

### 2.4 JavaScript

#### 2.4.1 Single-line code block

Use spaces in single-line code blocks.

- Not recommended:

```js
function foo() {
   return true;
}
if (foo) {
   bar = 0;
}
```

- recommend:

```js
function foo() {
   return true;
}
if (foo) {
   bar = 0;
}
```

#### 2.4.2 Brace style

In the programming process, the curly brace style is closely related to the indentation style, and there are many ways to describe the position of the curly brace relative to the code block. In JavaScript, there are three main styles, as follows:

- **【Recommended】One True Brace Style**

```js
if (foo) {
   bar();
} else {
   baz();
}
```

- **Stroustrup**

```js
if (foo) {
   bar();
} else {
   baz();
}
```

- **Allman**

```js
if (foo) {
   bar();
} else {
   baz();
}
```

#### 2.4.3 Spaces in code

1. Spaces before and after commas can improve the readability of the code. The team agrees to use spaces after commas and not before commas.

- recommend:

```js
var foo = 1,
   bar = 2;
```

- Not recommended:

```js
var foo = 1,
   bar = 2;

var foo = 1,
   bar = 2;

var foo = 1,
   bar = 2;
```

1. There cannot be a space between the key and the value of the object literal, and there must be a space between the colon and the value of the object literal.

- recommend:

```js
var obj = { foo: "haha" };
```

- Not recommended:

```js
var obj = { foo: "haha" };
```

1. Add a space before the code block.

- recommend:

```js
if (a) {
   b();
}

function a() {}
```

- Not recommended:

```js
if (a) {
   b();
}

function a() {}
```

1. Add a space before the function declaration brackets.

- recommend:

```js
function func(x) {
   //...
}
```

- Not recommended:

```js
function func(x) {
   //...
}
```

1. When calling a function, spaces are prohibited.

- recommend:

```js
fn();
```

- Not recommended:

```js
fn();

fn();
```

1. Spaces are required before and after operators.

- recommend:

```js
var sum = 1 + 2;
```

- Not recommended:

```js
var sum = 1 + 2;
```

## 3.Annotation specification

---

**Purpose of comments:**

- **Improve the readability of the code, thereby improving the maintainability of the code**

**Principles of comments:**

- **Do not add comments if not necessary ( As short as possible )**
- **As long as necessary ( As long as necessary )**

### 3.1 HTML file comments

#### 3.1.1 Single-line comments

**Generally used for simple descriptions, such as certain state descriptions, attribute descriptions, etc. **

There is a space character before and after the content of the comment, and the comment is located above the code to be commented, occupying a single line.

- recommend:

```html
<!-- Comment Text -->
<div>...</div>
```

- Not recommended

```html
<div>...</div>
<!-- Comment Text -->

<div>
   <!-- Comment Text -->
   ...
</div>
```

#### 3.1.2 Module comments

** is generally used to describe the name of the module and where the module starts and ends. **

There is a space character before and after the comment content, `<!-- S Comment Text \-->` means the beginning of the module, `<!-- E Comment Text \-->` means the end of the module, and there is a line between modules.

- recommend:

```html
<!-- S Comment Text A -->
<div class="mod_a">...</div>
<!-- E Comment Text A -->

<!-- S Comment Text B -->
<div class="mod_b">...</div>
<!-- E Comment Text B -->
```

- Not recommended

```html
<!-- S Comment Text A -->
<div class="mod_a">...</div>
<!-- E Comment Text A -->
<!-- S Comment Text B -->
<div class="mod_b">...</div>
<!-- E Comment Text B -->
```

#### 3.1.3 Nested module comments

When module comments reappear within module comments, nested modules are no longer used in order to highlight the main module.

```html
<!-- S Comment Text -->
<!-- E Comment Text -->
```

Instead use

```html
<!-- /Comment Text -->
```

Comments are written on a separate line at the bottom of the module's closing tag.

```html
<!-- S Comment Text A -->
<div class="mod_a">
   <div class="mod_b">...</div>
   <!-- /mod_b -->

   <div class="mod_c">...</div>
   <!-- /mod_c -->
</div>
<!-- E Comment Text A -->
```

### 3.2 CSS file comments

#### 3.2.1 Single-line comments

The first character and the last character of the comment content are both a space character, occupying a single line, with one line between each line.

- recommend:

```css
/* Comment Text */
.jdc {
}

/* Comment Text */
.jdc {
}
```

- Not recommended:

```css
/*Comment Text*/
.jdc {
   display: block;
}

.jdc {
   display: block; /*Comment Text*/
}
```

#### 3.2.2 Module comments

The first character and the last character of the comment content are both a space character, `/*` and the module information description occupy a line, multiple horizontal line separators `-` and `*/` occupy a line, and the lines are separated from each other two lines.

- recommend:

```css
/* Module A
-------------------------------------------------- -------------- */
.mod_a {
}

/* Module B
-------------------------------------------------- -------------- */
.mod_b {
}
```

- Not recommended:

```css
/* Module A ---------------------------------------------- ------*/
.mod_a {
}
/* Module B ---------------------------------------------- ------*/
.mod_b {
}
```

#### 3.2.3 File comments

Indicate the page name, author, creation date and other information under the `@charset` statement of the style file encoding statement.

```css
@charset "UTF-8";
/**
  * @desc File Info
  * @author Author Name
  * @date 2015-10-10
  */
```

### 3.3 JavaScript file comments

#### 3.3.1 Single-line comments

Single-line comments use `//`, and comments should be written on a single line above the commented object, not appended to a statement.

- recommend:

```js
// is current tab
const active = true;
```

- Not recommended:

```js
const active = true; // is current tab
```

A blank line is required above the comment line (**unless the comment line is at the top of a block**) for readability.

- recommend:

```js
function getType() {
   console.log("fetching type...");

   // set the default type to 'no type'
   const type = this.type || "no type";
   return type;
}
// A blank line is not required when the comment line is above the top of a block
function getType() {
   // set the default type to 'no type'
   const type = this.type || "no type";
   return type;
}
```

- Not recommended:

```js
function getType() {
   console.log("fetching type...");
   // set the default type to 'no type'
   const type = this.type || "no type";
   return type;
}
```

#### 3.3.2 Multi-line comments

Multi-line comments use `/** ... */` instead of multi-line `//`.

- recommend:

```js
/**
  * make() returns a new element
  * based on the passed-in tag name
  */
function make(tag) {
   //...

   return element;
}
```

- Not recommended:

```js
// make() returns a new element
// based on the passed in tag name
function make(tag) {
   //...

   return element;
}
```

#### 3.3.3 Comment spaces

There needs to be a space between the comment content and the comment character to improve readability. eslint: `spaced-comment`.

- recommend:

```js
// is current tab
const active = true;

/**
  * make() returns a new element
  * based on the passed-in tag name
  */
function make(tag) {
   //...

   return element;
}
```

- Not recommended:

```js
//is current tab
const active = true;

/**
  *make() returns a new element
  *based on the passed-in tag name
  */
function make(tag) {
   //...

   return element;
}
```

#### 3.3.4 Special tags

Sometimes we find a possible bug, but we can't fix it for some reason; or there are some features to be completed somewhere, at this time we need to use the corresponding special mark annotation to inform future self or collaborators. There are two commonly used special tags:

- `// FIXME` : Explain what the problem is

- - `// TODO` : Explain what to do or the solution to the problem

```js
class Calculator extends Abacus {
   constructor() {
     super();

     // FIXME: shouldn’t use a global here
     total = 0;

     // TODO: total should be configurable by an options param
     this.total = 0;
   }
}
```

#### 3.3.5 Document class comments

Documentation class annotations, such as functions, classes, files, events, etc.; all use the jsdoc specification.

```js
/**
  * Book class, representing a book.
  * @constructor
  * @param {string} title - The title of the book.
  * @param {string} author - The author of the book.
  */
function Book(title, author) {
   this.title = title;
   this.author = author;
}

Book.prototype = {
   /**
    * Get the title of the book
    * @returns {string|*}
    */
   getTitle: function () {
     return this. title;
   },
   /**
    * Set the number of pages of the book
    * @param pageNum {number} page number
    */
   setPageNum: function (pageNum) {
     this. pageNum = pageNum;
   },
};
```

#### 3.3.6 Annotation tools

`ESLint` is currently the most popular JS code checking tool. There are some annotation-related rules in `ESLint`, which users can choose to enable:

- `valid-jsdoc`
- `require-jsdoc`
- `no-warning-comments`
- `capitalized-comments`
- `line-comment-position`
- `lines-around-comment`
- `multiline-comment-style`
- `no-inline-comments`
- `spaced-comment`

## 4. Others

---

- Use two spaces for indentation and line breaks.
- It is recommended to add a semicolon at the end of the JavaScript code for large-scale multi-person collaboration projects.
- For small personal innovation and practice projects, you can try to use the style without a semicolon at the end of the JavaScript code, which is more refreshing and concise.
