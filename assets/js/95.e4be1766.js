(window.webpackJsonp=window.webpackJsonp||[]).push([[95],{635:function(e,t,s){"use strict";s.r(t);var a=s(2),n=Object(a.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h2",{attrs:{id:"introduce"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#introduce"}},[e._v("#")]),e._v(" introduce")]),e._v(" "),t("hr"),e._v(" "),t("p",[e._v("One of the major unresolved issues since the introduction of the compositional API concept has been which to use "),t("code",[e._v("ref")]),e._v(" or "),t("code",[e._v("reactive")]),e._v(". "),t("code",[e._v("reactive")]),e._v(" has the problem of losing reactivity with destructuring, while "),t("code",[e._v("ref")]),e._v(" needs to use "),t("code",[e._v(".value")]),e._v(" everywhere, which feels cumbersome, and it is easy to miss "),t("code",[e._v(".value")]),e._v(" without the help of the type system.")]),e._v(" "),t("p",[e._v("For example, the following counter:")]),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('<template>\n   <button @click="increment">{{ count }}</button>\n</template>\n')])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br"),t("span",{staticClass:"line-number"},[e._v("3")]),t("br")])]),t("p",[e._v("Use "),t("code",[e._v("ref")]),e._v(" to define "),t("code",[e._v("count")]),e._v(" variable and "),t("code",[e._v("increment")]),e._v(" method:")]),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("let count = ref(0)\n\nfunction increment() {\n   count. value++\n}\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br"),t("span",{staticClass:"line-number"},[e._v("3")]),t("br"),t("span",{staticClass:"line-number"},[e._v("4")]),t("br"),t("span",{staticClass:"line-number"},[e._v("5")]),t("br")])]),t("p",[e._v("And using responsive syntactic sugar, we can write code like this:")]),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("let count = $ref(0)\n\nfunction increment() {\n   count++\n}\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br"),t("span",{staticClass:"line-number"},[e._v("3")]),t("br"),t("span",{staticClass:"line-number"},[e._v("4")]),t("br"),t("span",{staticClass:"line-number"},[e._v("5")]),t("br")])]),t("ol",[t("li",[e._v("Vue's responsive syntactic sugar is a compile-time conversion step, the "),t("code",[e._v("$ref()")]),e._v(" method is a "),t("strong",[e._v("compile-time macro command")]),e._v(", it is not a real method that will be called at runtime, but is used as a flag to the Vue compiler to indicate that the final "),t("code",[e._v("count")]),e._v(" variable needs to be a "),t("strong",[e._v("reactive variable")]),e._v(".")]),e._v(" "),t("li",[e._v("Reactive variables can be accessed and reassigned like ordinary variables, but these operations will become "),t("code",[e._v("ref")]),e._v(" with "),t("code",[e._v(".value")]),e._v(" after compilation. So the code in the above example will also be compiled to use the syntax defined by "),t("code",[e._v("ref")]),e._v(".")]),e._v(" "),t("li",[e._v("Every reactive API that returns "),t("code",[e._v("ref")]),e._v(" has a corresponding macro function prefixed with "),t("code",[e._v("$")]),e._v(". These include the following APIs:")])]),e._v(" "),t("ul",[t("li",[e._v("ref -> $ref")]),e._v(" "),t("li",[e._v("computed -> $computed")]),e._v(" "),t("li",[e._v("shallowRef -> $shallowRef")]),e._v(" "),t("li",[e._v("customRef -> $customRef")]),e._v(" "),t("li",[e._v("toRef -> $toRef")])]),e._v(" "),t("ol",[t("li",[e._v("You can use the "),t("code",[e._v("$()")]),e._v(" macro to convert an existing "),t("code",[e._v("ref")]),e._v(" into a reactive variable.")])]),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("const a = ref(0)\nlet count = $(a)\ncount++\nconsole.log(a.value) // 1\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br"),t("span",{staticClass:"line-number"},[e._v("3")]),t("br"),t("span",{staticClass:"line-number"},[e._v("4")]),t("br")])]),t("ol",[t("li",[e._v("The "),t("code",[e._v("$$()")]),e._v(" macro can be used to keep any reference to a reactive variable as a reference to the corresponding "),t("code",[e._v("ref")]),e._v(".")])]),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("let count = $ref(0)\nconsole.log(isRef($$(count))) // true\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br")])]),t("p",[t("code",[e._v("$$()")]),e._v(" also works with destructured "),t("code",[e._v("props")]),e._v(", since they are also reactive variables. The compiler will efficiently do the conversion via "),t("code",[e._v("toRef")]),e._v(":")]),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("const { count } = defineProps<{ count: number }>()\npassAsRef($$(count))\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br")])]),t("h2",{attrs:{id:"configuration"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#configuration"}},[e._v("#")]),e._v(" configuration")]),e._v(" "),t("hr"),e._v(" "),t("p",[e._v("Reactive syntactic sugar is a feature specific to "),t("strong",[e._v("composition API")]),e._v(" and must be used via the build step.")]),e._v(" "),t("ol",[t("li",[e._v("Required, requires "),t("code",[e._v("@vitejs/plugin-vue@>=2.0.0")]),e._v(", will apply to SFC and js(x)/ts(x) files.")])]),e._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// vite.config.js")]),e._v("\n"),t("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("export")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("default")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n   "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[e._v("plugins")]),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("[")]),e._v("\n     "),t("span",{pre:!0,attrs:{class:"token function"}},[e._v("vue")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n       "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[e._v("reactivityTransform")]),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token boolean"}},[e._v("true")]),e._v("\n     "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v("\n   "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("]")]),e._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br"),t("span",{staticClass:"line-number"},[e._v("3")]),t("br"),t("span",{staticClass:"line-number"},[e._v("4")]),t("br"),t("span",{staticClass:"line-number"},[e._v("5")]),t("br"),t("span",{staticClass:"line-number"},[e._v("6")]),t("br"),t("span",{staticClass:"line-number"},[e._v("7")]),t("br"),t("span",{staticClass:"line-number"},[e._v("8")]),t("br")])]),t("ul",[t("li",[e._v("Note that "),t("code",[e._v("reactivityTransform")]),e._v(" is now a top-level option of the plugin, not in "),t("code",[e._v("script.refSugar")]),e._v(" anymore, since it doesn't apply only to SFC.")])]),e._v(" "),t("p",[e._v("If it is built with "),t("code",[e._v("vue-cli")]),e._v(", "),t("code",[e._v("vue-loader@>=17.0.0")]),e._v(" is required, and currently only works for SFC.")]),e._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[e._v("//vue.config.js")]),e._v("\nmodule"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("exports "),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n   "),t("span",{pre:!0,attrs:{class:"token function-variable function"}},[e._v("chainWebpack")]),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),t("span",{pre:!0,attrs:{class:"token parameter"}},[e._v("config")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=>")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n     config"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("module\n       "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[e._v("rule")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[e._v("'vue'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v("\n       "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[e._v("use")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),t("span",{pre:!0,attrs:{class:"token string"}},[e._v("'vue-loader'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v("\n       "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),t("span",{pre:!0,attrs:{class:"token function"}},[e._v("tap")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("(")]),t("span",{pre:!0,attrs:{class:"token parameter"}},[e._v("options")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=>")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n         "),t("span",{pre:!0,attrs:{class:"token keyword"}},[e._v("return")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n           "),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("...")]),e._v("options"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n           "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[e._v("reactivityTransform")]),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token boolean"}},[e._v("true")]),e._v("\n         "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n       "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(")")]),e._v("\n   "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br"),t("span",{staticClass:"line-number"},[e._v("3")]),t("br"),t("span",{staticClass:"line-number"},[e._v("4")]),t("br"),t("span",{staticClass:"line-number"},[e._v("5")]),t("br"),t("span",{staticClass:"line-number"},[e._v("6")]),t("br"),t("span",{staticClass:"line-number"},[e._v("7")]),t("br"),t("span",{staticClass:"line-number"},[e._v("8")]),t("br"),t("span",{staticClass:"line-number"},[e._v("9")]),t("br"),t("span",{staticClass:"line-number"},[e._v("10")]),t("br"),t("span",{staticClass:"line-number"},[e._v("11")]),t("br"),t("span",{staticClass:"line-number"},[e._v("12")]),t("br"),t("span",{staticClass:"line-number"},[e._v("13")]),t("br"),t("span",{staticClass:"line-number"},[e._v("14")]),t("br")])]),t("p",[e._v("If it is built with "),t("code",[e._v("webpack")]),e._v(" + "),t("code",[e._v("vue-loader")]),e._v(", "),t("code",[e._v("vue-loader@>=17.0.0")]),e._v(" is required, currently only works for SFC.")]),e._v(" "),t("div",{staticClass:"language-js line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-js"}},[t("code",[t("span",{pre:!0,attrs:{class:"token comment"}},[e._v("// webpack.config.js")]),e._v("\nmodule"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(".")]),e._v("exports "),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v("=")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n   "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[e._v("module")]),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n     "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[e._v("rules")]),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("[")]),e._v("\n       "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n         "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[e._v("test")]),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token regex"}},[t("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[e._v("/")]),t("span",{pre:!0,attrs:{class:"token regex-source language-regex"}},[e._v("\\.vue$")]),t("span",{pre:!0,attrs:{class:"token regex-delimiter"}},[e._v("/")])]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n         "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[e._v("loader")]),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token string"}},[e._v("'vue-loader'")]),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v(",")]),e._v("\n         "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[e._v("options")]),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("{")]),e._v("\n           "),t("span",{pre:!0,attrs:{class:"token literal-property property"}},[e._v("reactivityTransform")]),t("span",{pre:!0,attrs:{class:"token operator"}},[e._v(":")]),e._v(" "),t("span",{pre:!0,attrs:{class:"token boolean"}},[e._v("true")]),e._v("\n         "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n       "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n     "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("]")]),e._v("\n   "),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n"),t("span",{pre:!0,attrs:{class:"token punctuation"}},[e._v("}")]),e._v("\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br"),t("span",{staticClass:"line-number"},[e._v("3")]),t("br"),t("span",{staticClass:"line-number"},[e._v("4")]),t("br"),t("span",{staticClass:"line-number"},[e._v("5")]),t("br"),t("span",{staticClass:"line-number"},[e._v("6")]),t("br"),t("span",{staticClass:"line-number"},[e._v("7")]),t("br"),t("span",{staticClass:"line-number"},[e._v("8")]),t("br"),t("span",{staticClass:"line-number"},[e._v("9")]),t("br"),t("span",{staticClass:"line-number"},[e._v("10")]),t("br"),t("span",{staticClass:"line-number"},[e._v("11")]),t("br"),t("span",{staticClass:"line-number"},[e._v("12")]),t("br"),t("span",{staticClass:"line-number"},[e._v("13")]),t("br"),t("span",{staticClass:"line-number"},[e._v("14")]),t("br")])]),t("ol",[t("li",[e._v("Optionally, add the following code to the "),t("code",[e._v("tsconfig.json")]),e._v(" file, otherwise an error "),t("code",[e._v("TS2304: Cannot find name '$ref'.")]),e._v(" will be reported. Although it does not affect the use, it will affect the development experience:")])]),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('"compilerOptions": { "types": ["vue/ref-macros"] }\n')])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br")])]),t("ol",[t("li",[e._v("Optionally, add the following code in the "),t("code",[e._v("eslintrc.cjs")]),e._v(" file, otherwise it will prompt "),t("code",[e._v("ESLint: '$ref' is not defined.(no-undef)")]),e._v(":")])]),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('module.exports = { globals: {\n     $ref: "readonly",\n     $computed: "readonly",\n     $shallowRef: "readonly",\n     $customRef: "readonly",\n     $toRef: "readonly",\n   }\n};\n')])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br"),t("span",{staticClass:"line-number"},[e._v("3")]),t("br"),t("span",{staticClass:"line-number"},[e._v("4")]),t("br"),t("span",{staticClass:"line-number"},[e._v("5")]),t("br"),t("span",{staticClass:"line-number"},[e._v("6")]),t("br"),t("span",{staticClass:"line-number"},[e._v("7")]),t("br"),t("span",{staticClass:"line-number"},[e._v("8")]),t("br")])]),t("ol",{attrs:{start:"4"}},[t("li",[e._v("When responsive syntax sugar is enabled, these macro functions are available globally without manual import. You can also explicitly introduce "),t("code",[e._v("vue/macros")]),e._v(" in the vue file, so you don't need to configure "),t("code",[e._v("tsconfig.json")]),e._v(" and "),t("code",[e._v("eslintrc")]),e._v(" in the second and third steps.")])]),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("import { $ref } from 'vue/macros'\n\nlet count = $ref(0)\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br"),t("span",{staticClass:"line-number"},[e._v("3")]),t("br")])]),t("h2",{attrs:{id:"deprecated-experimental-features"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#deprecated-experimental-features"}},[e._v("#")]),e._v(" DEPRECATED EXPERIMENTAL FEATURES")]),e._v(" "),t("hr"),e._v(" "),t("ol",[t("li",[e._v("Responsive syntax sugar used to be an experimental feature and has been deprecated, please read "),t("strong",[e._v("Reason for Deprecation")]),e._v("[1].")]),e._v(" "),t("li",[e._v("It will be removed from Vue core in a future minor version update. To continue using it, please use the "),t("strong",[e._v("Vue Macros")]),e._v("[2] plugin")])]),e._v(" "),t("h2",{attrs:{id:"deprecation-reason"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#deprecation-reason"}},[e._v("#")]),e._v(" Deprecation reason")]),e._v(" "),t("hr"),e._v(" "),t("p",[e._v("You Yuxi personally gave the reason for the abandonment on February 21, 2023 at 10:05 GMT+8, the translation is as follows:")]),e._v(" "),t("p",[e._v("As many of you already know, we officially abandoned this RFC with the consensus of the team.")]),e._v(" "),t("h3",{attrs:{id:"reason"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#reason"}},[e._v("#")]),e._v(" reason")]),e._v(" "),t("p",[e._v("The original goal of Reactivity Transform was to improve the developer experience by providing a cleaner syntax when dealing with reactive state. We released it as an experimental product to gather feedback from real-world usage. Despite these proposed benefits, we identified the following issues:")]),e._v(" "),t("ol",[t("li",[e._v("Losing "),t("code",[e._v(".value")]),e._v(" makes it harder to tell what is being tracked and which line triggered the reactive effect. This problem is less noticeable in small SFCs, but in large code bases the mental overhead becomes more noticeable, especially if the syntax is also used outside of the SFC**. **")]),e._v(" "),t("li",[e._v("Because of (1), some users choose to use Reactivity Transform only inside SFC, which creates inconsistencies and context switching costs between different mental models. So the dilemma is that using it only inside the SFC causes inconsistencies, but using it outside the SFC hurts maintainability.")]),e._v(" "),t("li",[e._v("Since there will still be external functions expecting raw references, conversions between reactive variables and raw references are unavoidable. This ended up adding more learning curve and extra mental load, which we noticed was more confusing for beginners than the normal Composition API.")])]),e._v(" "),t("p",[e._v("Most importantly, the potential risk of fragmentation. Although this is an explicit opt-in, some users have expressed strong opposition to the proposal due to concerns that they will have to work with different codebases where some have opted in to it and others No. This is a legitimate concern, since Reactivity Transform requires a different mental model, which distorts JavaScript semantics (variable assignments can trigger reactive effects).")]),e._v(" "),t("p",[e._v("All things considered, we feel that using it as a stable feature would cause more problems than benefits, and thus isn't a good tradeoff.")]),e._v(" "),t("h3",{attrs:{id:"migration-plan"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#migration-plan"}},[e._v("#")]),e._v(" Migration Plan")]),e._v(" "),t("ul",[t("li",[e._v("This feature is already supported as an external package via "),t("strong",[e._v("Vue Macros")]),e._v("[3].")]),e._v(" "),t("li",[e._v("3.3: This feature will be marked as deprecated. It will continue to work, but you should migrate to Vue Macros in the meantime.")]),e._v(" "),t("li",[e._v("3.4: This feature will be removed from core and will no longer work unless Vue Macros are used.")])]),e._v(" "),t("h3",{attrs:{id:"message"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#message"}},[e._v("#")]),e._v(" message")]),e._v(" "),t("ul",[t("li",[e._v("Although Reactivity Transform will be removed from the official package, I think it's a good try.")]),e._v(" "),t("li",[e._v("Well written. I like detailed RFCs and objective evaluations based on user feedback. The final conclusion makes sense. Don't let the perfect be the enemy of the good.")]),e._v(" "),t("li",[e._v("While I enjoy the convenience of this feature, I did find this potential fragmentation problem in practice. It may be reluctant to remove this feature in a future release, but engineers should take it seriously. 🙂")]),e._v(" "),t("li",[e._v("Do you remove all functionality or just the part where "),t("code",[e._v("ref.value")]),e._v(" does the conversion? What about reactive "),t("code",[e._v("props")]),e._v(" destructuring, does it stick around?")]),e._v(" "),t("li",[e._v("I've been using it for a medium sized e-commerce site without any issues. I understand the rationale behind removing it, but in practice I've found it to be a really big improvement. So my question is: what now?")]),e._v(" "),t("li",[e._v("Is it recommended that people who hate "),t("code",[e._v(".value")]),e._v(" avoid "),t("code",[e._v("ref()")]),e._v(" as much as possible for now and use "),t("code",[e._v("reactive()")]),e._v(" as before?")]),e._v(" "),t("li",[t("code",[e._v(".value")]),e._v(" is the necessary complexity. Just like any other reactive library "),t("code",[e._v("xxx.set()")]),e._v(".")]),e._v(" "),t("li",[e._v("It should be easy to create a package that transforms all Reactivity Transform code, right? I also like to do things the recommended way.")]),e._v(" "),t("li",[e._v("...")])]),e._v(" "),t("h3",{attrs:{id:"references"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#references"}},[e._v("#")]),e._v(" References")]),e._v(" "),t("p",[e._v("[1] Reason for abandonment: "),t("em",[e._v("https://github.com/vuejs/rfcs/discussions/369#discussioncomment-5059028")])]),e._v(" "),t("p",[e._v("[2]Vue Macros: "),t("em",[e._v("https://vue-macros.sxzz.moe/features/reactivity-transform.html")])]),e._v(" "),t("p",[e._v("[3]Vue Macros: "),t("em",[e._v("https://vue-macros.sxzz.moe/features/reactivity- transform.html")])])])}),[],!1,null,null,null);t.default=n.exports}}]);