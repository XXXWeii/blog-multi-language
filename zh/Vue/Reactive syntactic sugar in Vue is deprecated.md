---
title: Vue中的响应性语法糖已废弃
lang: zh-CN
date: 2022-02-15
author: XXXWeii
tags:
  - Vue
---

## 介绍

------

自从引入组合式 API 的概念以来，一个主要的未解决的问题就是 `ref` 和 `reactive` 到底用哪个。`reactive` 存在解构丢失响应性的问题，而 `ref` 需要到处使用 `.value` 则感觉很繁琐，并且在没有类型系统的帮助时很容易漏掉 `.value`。

例如，下面的计数器：

```
<template>
  <button @click="increment">{{ count }}</button>
</template>
```

使用 `ref` 定义 `count` 变量和 `increment` 方法：

```
let count = ref(0)

function increment() {
  count.value++
}
```

而使用响应性语法糖，我们可以像这样书写代码：

```
let count = $ref(0)

function increment() {
  count++
}
```

1. Vue 的响应性语法糖是一个编译时的转换步骤，`$ref()` 方法是一个**编译时的宏命令**，它不是一个真实的、在运行时会调用的方法，而是用作 Vue 编译器的标记，表明最终的 `count` 变量需要是一个**响应式变量**。
2. 响应式的变量可以像普通变量那样被访问和重新赋值，但这些操作在编译后都会变为带 `.value` 的 `ref`。所以上面例子中的代码也会被编译成使用 `ref` 定义的语法。
3. 每一个会返回 `ref` 的响应式 API 都有一个相对应的、以 `$` 为前缀的宏函数。包括以下这些 API：

- ref -> $ref
- computed -> $computed
- shallowRef -> $shallowRef
- customRef -> $customRef
- toRef -> $toRef

1. 可以使用 `$()` 宏来将现存的 `ref` 转换为响应式变量。

```
const a = ref(0)
let count = $(a)
count++
console.log(a.value) // 1
```

1. 可以使用 `$$()` 宏来将任何对响应式变量的引用都会保留为对相应 `ref` 的引用。

```
let count = $ref(0)
console.log(isRef($$(count))) // true
```

`$$()` 也适用于已解构的 `props`，因为它们也是响应式的变量。编译器会高效地通过 `toRef` 来做转换：

```
const { count } = defineProps<{ count: number }>()
passAsRef($$(count))
```

## 配置

------

响应性语法糖是 **组合式 API** 特有的功能，且必须通过构建步骤使用。

1. 必须，需要 `@vitejs/plugin-vue@>=2.0.0`，将应用于 SFC 和 js(x)/ts(x) 文件。

```js
// vite.config.js
export default {
  plugins: [
    vue({
      reactivityTransform: true
    })
  ]
}
```

- 注意 `reactivityTransform` 现在是一个插件的顶层选项，而不再是位于 `script.refSugar` 之中了，因为它不仅仅只对 SFC 起效。

如果是 `vue-cli` 构建，需要 `vue-loader@>=17.0.0`，目前仅对 SFC 起效。

```js
// vue.config.js
module.exports = {
  chainWebpack: (config) => {
    config.module
      .rule('vue')
      .use('vue-loader')
      .tap((options) => {
        return {
          ...options,
          reactivityTransform: true
        }
      })
  }
}
```

如果是 `webpack` + `vue-loader` 构建，需要 `vue-loader@>=17.0.0`，目前仅对 SFC 起效。

```js
// webpack.config.js
module.exports = {
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          reactivityTransform: true
        }
      }
    ]
  }
}
```

1. 可选，`tsconfig.json` 文件中添加如下代码, 不然会报错 `TS2304: Cannot find name '$ref'.`，虽然不影响使用,但是会影响开发体验：

```
"compilerOptions":{ "types": ["vue/ref-macros"] } 
```

1. 可选，`eslintrc.cjs` 文件中添加如下代码，不然会提示 `ESLint: '$ref' is not defined.(no-undef)`：

```
module.exports = { globals: {
    $ref: "readonly",
    $computed: "readonly",
    $shallowRef: "readonly",
    $customRef: "readonly",
    $toRef: "readonly",
  }
}; 
```

4.当启用响应性语法糖时，这些宏函数都是全局可用的、无需手动导入。也可以在 vue 文件中显式引入 `vue/macros`，这样就不用配置第二和第三步中的 `tsconfig.json` 和 `eslintrc` 了。

```
import { $ref } from 'vue/macros'

let count = $ref(0)
```

## 已废弃的实验性功能

------

1. 响应性语法糖曾经是一个实验性功能，且已被废弃，请阅读**废弃原因**[1]。
2. 在未来的一个小版本更新中，它将会从 Vue core 中被移除。如需继续使用，请通过 **Vue Macros**[2] 插件

## 废弃原因

------

尤雨溪在2023 年 2 月 21 日上午 10:05 GMT+8，亲自给出了废弃的原因，翻译如下：

正如你们中的许多人已经知道的那样，我们在团队一致同意的情况下正式放弃了这个 RFC。

### 理由

Reactivity Transform 的最初目标是通过在处理反应状态时提供更简洁的语法来改善开发人员的体验。我们将其作为实验性产品发布，以收集来自现实世界使用情况的反馈。尽管提出了这些好处，我们还是发现了以下问题：

1. 失去 `.value` 使得更难分辨正在跟踪的内容以及哪条线触发了反应效果。这个问题在小型 SFC 中并不那么明显，但在大型代码库中，心理开销变得更加明显，特别是如果语法也在 SFC **之外使用。**
2. 由于 (1)，一些用户选择仅在 SFC 内部使用 Reactivity Transform，这会在不同心智模型之间造成不一致和上下文转换成本。因此，困境在于仅在 SFC 内部使用它会导致不一致，但在 SFC 外部使用它会损害可维护性。
3. 由于仍然会有外部函数期望使用原始引用，因此反应变量和原始引用之间的转换是不可避免的。这最终增加了更多的学习内容和额外的精神负担，我们注意到这比普通的 Composition API 更让初学者感到困惑。

最重要的是，碎片化的潜在风险。尽管这是明确的选择加入，但一些用户对该提议表示强烈反对，原因是他们担心他们将不得不与不同的代码库一起工作，在这些代码库中，有些人选择了使用它，而有些人则没有。这是一个合理的担忧，因为 Reactivity Transform 需要一种不同的心智模型，它会扭曲 JavaScript 语义（变量赋值能够触发反应效果）。

考虑到所有因素，我们认为将其作为一个稳定的功能使用会导致问题多于收益，因此不是一个好的权衡。

### 迁移计划

- 该功能已经通过 **Vue Macros**[3] 以外部包的形式得到支持。
- 3.3：该功能将被标记为已弃用。它将继续工作，但您应该在此期间迁移到 Vue Macros。
- 3.4：该功能将从核心中删除，除非使用 Vue Macros，否则将不再有效。

### 留言

- 虽然 Reactivity Transform 会从官方包中移除，但我认为这是一个很好的尝试。
- 写得好。我喜欢详细的 RFC 和基于用户反馈的客观评估。最后的结论很有道理。不要让完美成为优秀的敌人。
- 虽然我很享受这个功能带来的便利，但我在实际使用中确实发现了这个潜在的碎片问题。在未来的版本中删除此功能可能不太情愿，但工程师应该认真对待。🙂
- 您是删除所有功能还是仅删除 `ref.value` 进行转换的部分？响应式 `props` 解构呢，它会留下来吗？
- 我一直在将它用于中等规模的电子商务网站，没有任何问题。我理解删除它背后的基本原理，但在实践中我发现它确实是一个很大的改进。所以我的问题是：现在怎么办？
- 是否建议那些讨厌 `.value` 的人现在尽可能避免使用 `ref()` 并像以前那样使用 `reactive()`？
- `.value` 是必要的复杂性。就像任何其他响应式库 `xxx.set()` 一样。
- 创建一个转换所有 Reactivity Transform 代码的包应该很容易吧？我也喜欢按照推荐的方式做事。
- ...

### 参考资料

[1]废弃原因: *https://github.com/vuejs/rfcs/discussions/369#discussioncomment-5059028*

[2]Vue Macros: *https://vue-macros.sxzz.moe/features/reactivity-transform.html*

[3]Vue Macros: *https://vue-macros.sxzz.moe/features/reactivity-transform.html*
