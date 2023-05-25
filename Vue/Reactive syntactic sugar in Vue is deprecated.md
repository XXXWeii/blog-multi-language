---
title: Reactive syntactic sugar in Vue is deprecated
lang: en-US
date: 2022-02-15
author: XXXWeii
tags:
  - Vue
---

## introduce

------

One of the major unresolved issues since the introduction of the compositional API concept has been which to use `ref` or `reactive`. `reactive` has the problem of losing reactivity with destructuring, while `ref` needs to use `.value` everywhere, which feels cumbersome, and it is easy to miss `.value` without the help of the type system.

For example, the following counter:

```
<template>
   <button @click="increment">{{ count }}</button>
</template>
```

Use `ref` to define `count` variable and `increment` method:

```
let count = ref(0)

function increment() {
   count. value++
}
```

And using responsive syntactic sugar, we can write code like this:

```
let count = $ref(0)

function increment() {
   count++
}
```

1. Vue's responsive syntactic sugar is a compile-time conversion step, the `$ref()` method is a **compile-time macro command**, it is not a real method that will be called at runtime, but is used as a flag to the Vue compiler to indicate that the final `count` variable needs to be a **reactive variable**.
2. Reactive variables can be accessed and reassigned like ordinary variables, but these operations will become `ref` with `.value` after compilation. So the code in the above example will also be compiled to use the syntax defined by `ref`.
3. Every reactive API that returns `ref` has a corresponding macro function prefixed with `$`. These include the following APIs:

- ref -> $ref
- computed -> $computed
- shallowRef -> $shallowRef
- customRef -> $customRef
- toRef -> $toRef

1. You can use the `$()` macro to convert an existing `ref` into a reactive variable.

```
const a = ref(0)
let count = $(a)
count++
console.log(a.value) // 1
```

1. The `$$()` macro can be used to keep any reference to a reactive variable as a reference to the corresponding `ref`.

```
let count = $ref(0)
console.log(isRef($$(count))) // true
```

`$$()` also works with destructured `props`, since they are also reactive variables. The compiler will efficiently do the conversion via `toRef`:

```
const { count } = defineProps<{ count: number }>()
passAsRef($$(count))
```

## configuration

------

Reactive syntactic sugar is a feature specific to **composition API** and must be used via the build step.

1. Required, requires `@vitejs/plugin-vue@>=2.0.0`, will apply to SFC and js(x)/ts(x) files.

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

- Note that `reactivityTransform` is now a top-level option of the plugin, not in `script.refSugar` anymore, since it doesn't apply only to SFC.

If it is built with `vue-cli`, `vue-loader@>=17.0.0` is required, and currently only works for SFC.

```js
//vue.config.js
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

If it is built with `webpack` + `vue-loader`, `vue-loader@>=17.0.0` is required, currently only works for SFC.

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

1. Optionally, add the following code to the `tsconfig.json` file, otherwise an error `TS2304: Cannot find name '$ref'.` will be reported. Although it does not affect the use, it will affect the development experience:

```
"compilerOptions": { "types": ["vue/ref-macros"] }
```

1. Optionally, add the following code in the `eslintrc.cjs` file, otherwise it will prompt `ESLint: '$ref' is not defined.(no-undef)`:

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

4. When responsive syntax sugar is enabled, these macro functions are available globally without manual import. You can also explicitly introduce `vue/macros` in the vue file, so you don't need to configure `tsconfig.json` and `eslintrc` in the second and third steps.

```
import { $ref } from 'vue/macros'

let count = $ref(0)
```

## DEPRECATED EXPERIMENTAL FEATURES

------

1. Responsive syntax sugar used to be an experimental feature and has been deprecated, please read **Reason for Deprecation**[1].
2. It will be removed from Vue core in a future minor version update. To continue using it, please use the **Vue Macros**[2] plugin

## Deprecation reason

------

You Yuxi personally gave the reason for the abandonment on February 21, 2023 at 10:05 GMT+8, the translation is as follows:

As many of you already know, we officially abandoned this RFC with the consensus of the team.

### reason

The original goal of Reactivity Transform was to improve the developer experience by providing a cleaner syntax when dealing with reactive state. We released it as an experimental product to gather feedback from real-world usage. Despite these proposed benefits, we identified the following issues:

1. Losing `.value` makes it harder to tell what is being tracked and which line triggered the reactive effect. This problem is less noticeable in small SFCs, but in large code bases the mental overhead becomes more noticeable, especially if the syntax is also used outside of the SFC**. **
2. Because of (1), some users choose to use Reactivity Transform only inside SFC, which creates inconsistencies and context switching costs between different mental models. So the dilemma is that using it only inside the SFC causes inconsistencies, but using it outside the SFC hurts maintainability.
3. Since there will still be external functions expecting raw references, conversions between reactive variables and raw references are unavoidable. This ended up adding more learning curve and extra mental load, which we noticed was more confusing for beginners than the normal Composition API.

Most importantly, the potential risk of fragmentation. Although this is an explicit opt-in, some users have expressed strong opposition to the proposal due to concerns that they will have to work with different codebases where some have opted in to it and others No. This is a legitimate concern, since Reactivity Transform requires a different mental model, which distorts JavaScript semantics (variable assignments can trigger reactive effects).

All things considered, we feel that using it as a stable feature would cause more problems than benefits, and thus isn't a good tradeoff.

### Migration Plan

- This feature is already supported as an external package via **Vue Macros**[3].
- 3.3: This feature will be marked as deprecated. It will continue to work, but you should migrate to Vue Macros in the meantime.
- 3.4: This feature will be removed from core and will no longer work unless Vue Macros are used.

### message

- Although Reactivity Transform will be removed from the official package, I think it's a good try.
- Well written. I like detailed RFCs and objective evaluations based on user feedback. The final conclusion makes sense. Don't let the perfect be the enemy of the good.
- While I enjoy the convenience of this feature, I did find this potential fragmentation problem in practice. It may be reluctant to remove this feature in a future release, but engineers should take it seriously. 🙂
- Do you remove all functionality or just the part where `ref.value` does the conversion? What about reactive `props` destructuring, does it stick around?
- I've been using it for a medium sized e-commerce site without any issues. I understand the rationale behind removing it, but in practice I've found it to be a really big improvement. So my question is: what now?
- Is it recommended that people who hate `.value` avoid `ref()` as much as possible for now and use `reactive()` as before?
- `.value` is the necessary complexity. Just like any other reactive library `xxx.set()`.
- It should be easy to create a package that transforms all Reactivity Transform code, right? I also like to do things the recommended way.
- ...

### References

[1] Reason for abandonment: *https://github.com/vuejs/rfcs/discussions/369#discussioncomment-5059028*

[2]Vue Macros: *https://vue-macros.sxzz.moe/features/reactivity-transform.html*

[3]Vue Macros: *https://vue-macros.sxzz.moe/features/reactivity- transform.html*
