(window.webpackJsonp=window.webpackJsonp||[]).push([[130],{697:function(s,n,e){"use strict";e.r(n);var t=e(2),a=Object(t.a)({},(function(){var s=this,n=s._self._c;return n("ContentSlotsDistributor",{attrs:{"slot-key":s.$parent.slotKey}},[n("p",[n("code",[s._v("history")]),s._v("模式会出现刷新页面后，页面出现 404。解决的办法是用"),n("code",[s._v("nginx")]),s._v("配置一下。\n在"),n("code",[s._v("nginx")]),s._v("的配置文件中修改")]),s._v(" "),n("h1",{attrs:{id:"方法一"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#方法一"}},[s._v("#")]),s._v(" 方法一：")]),s._v(" "),n("hr"),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("location /{\n    root   /data/nginx/html;\n    index  index.html index.htm;\n    if (!-e $request_filename) {\n        rewrite ^/(.*) /index.html last;\n        break;\n    }\n}\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br")])]),n("h1",{attrs:{id:"方法二"}},[n("a",{staticClass:"header-anchor",attrs:{href:"#方法二"}},[s._v("#")]),s._v(" 方法二：")]),s._v(" "),n("p",[s._v("vue.js 官方教程里提到的https://router.vuejs.org/zh/guide/essentials/history-mode.html")]),s._v(" "),n("div",{staticClass:"language- line-numbers-mode"},[n("pre",{pre:!0,attrs:{class:"language-text"}},[n("code",[s._v("  server {\n        listen       8081;#默认端口是80，如果端口没被占用可以不用修改\n        server_name  myapp.com;\n        root        D:/vue/my_app/dist;#vue项目的打包后的dist\n        location / {\n            try_files $uri $uri/ @router;#需要指向下面的@router否则会出现vue的路由在nginx中刷新出现404\n            index  index.html index.htm;\n        }\n        #对应上面的@router，主要原因是路由的路径资源并不是一个真实的路径，所以无法找到具体的文件\n        #因此需要rewrite到index.html中，然后交给路由在处理请求资源\n        location @router {\n            rewrite ^.*$ /index.html last;\n        }\n        #.......其他部分省略\n  }\n")])]),s._v(" "),n("div",{staticClass:"line-numbers-wrapper"},[n("span",{staticClass:"line-number"},[s._v("1")]),n("br"),n("span",{staticClass:"line-number"},[s._v("2")]),n("br"),n("span",{staticClass:"line-number"},[s._v("3")]),n("br"),n("span",{staticClass:"line-number"},[s._v("4")]),n("br"),n("span",{staticClass:"line-number"},[s._v("5")]),n("br"),n("span",{staticClass:"line-number"},[s._v("6")]),n("br"),n("span",{staticClass:"line-number"},[s._v("7")]),n("br"),n("span",{staticClass:"line-number"},[s._v("8")]),n("br"),n("span",{staticClass:"line-number"},[s._v("9")]),n("br"),n("span",{staticClass:"line-number"},[s._v("10")]),n("br"),n("span",{staticClass:"line-number"},[s._v("11")]),n("br"),n("span",{staticClass:"line-number"},[s._v("12")]),n("br"),n("span",{staticClass:"line-number"},[s._v("13")]),n("br"),n("span",{staticClass:"line-number"},[s._v("14")]),n("br"),n("span",{staticClass:"line-number"},[s._v("15")]),n("br")])]),n("p",[s._v("两种方案的的本质是一样的，就是 rewrite 一下，将 router 写到 index.html 中，然后交由路由处理资源才可以。")]),s._v(" "),n("p",[s._v("自己记录一下本方案，方便后续出现问题使用。")])])}),[],!1,null,null,null);n.default=a.exports}}]);