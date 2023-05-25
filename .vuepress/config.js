module.exports = {
  theme: "reco",
  title: "XXXWeii",
  keywords: "前端开发",
  description: "zjw的Blog",
  repo: "https://github.com/XXXWeii/blog.git",
  base: "/",
  // base: "/blog-multi-language/",
  head: [
    [
      "link",
      {
        rel: "icon",
        // href: '/favicon.ico'
        href: "/logo.jpg",
      },
    ], // 增加一个自定义的 favicon(网页标签的图标)
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ],
    [
      "meta",
      {
        name: "description",
        content: "XXXWeii的Blog,XXXWeii的Blog,XXXWeii的Blog",
      },
      // 为了让你的网站完全地兼容 PWA
    ],
    ["link", { rel: "manifest", href: "/manifest.json" }],
    ["meta", { name: "theme-color", content: "#3eaf7c" }],
    ["meta", { name: "apple-mobile-web-app-capable", content: "yes" }],
    [
      "meta",
      { name: "apple-mobile-web-app-status-bar-style", content: "black" },
    ],
    [
      "link",
      { rel: "apple-touch-icon", href: "/icons/apple-touch-icon-152x152.png" },
    ],
    [
      "link",
      {
        rel: "mask-icon",
        href: "/icons/safari-pinned-tab.svg",
        color: "#3eaf7c",
      },
    ],
    [
      "meta",
      {
        name: "msapplication-TileImage",
        content: "/icons/msapplication-icon-144x144.png",
      },
    ],
    ["meta", { name: "msapplication-TileColor", content: "#000000" }],
  ],
  locales: {
    "/": {
      lang: "en-US",
      title: "XXXWeii",
      description: "XXXWeii's blog",
    },
    "/zh/": {
      lang: "zh-CN",
      title: "XXXWeii",
      description: "XXXWeii的博客",
    },
  },
  markdown: {
    lineNumbers: true, // 代码块显示行号
  },
  themeConfig: {
    subSidebar: "auto", //在所有页面中启用自动生成子侧边栏，原 sidebar 仍然兼容
    logo: "/logo.jpg",
    // type: "blog",
    authorAvatar: "/logo.jpg",
    lastUpdated: "Last Updated", // 文档更新时间：每个文件git最后提交的时间
    // 多语言
    locales: {
      "/": {
        label: "English",
        selectText: "Languages",
        ariaLabel: "Select language",
        lastUpdated: "Last Updated",
        nav: [
          { text: "Home", link: "/", icon: "reco-home", ariaLabel: "Home" },
          {
            text: "learning Path",
            link: "/guide/",
            icon: "reco-date",
            ariaLabel: "Front-end learning route",
          },
          {
            text: "Category",
            icon: "reco-category",
            items: [
              {
                text: "HTML",
                link: "/HTML/Only use 1 label to realize Douyin Logo~",
              },
              {
                text: "CSS",
                link: "/CSS/A Pure CSS Flying Helicopter Animation Guide",
              },
              {
                text: "JavaScript",
                link: "/JavaScript/1000 if elses teach you how to achieve branch optimization",
              },
              {
                text: "TypeScript",
                link: "/TypeScript/11 must-have skills for TypeScript programmers to advance",
              },
              {
                text: "Vue",
                link: "/Vue/Frequently Asked Questions about Vue",
              },
              {
                text: "Nginx",
                link: "/Nginx/Nginx review summary of front-end essential knowledge",
              },
              {
                text: "Other",
                link: "/Other/Git common commands",
              },
            ],
            ariaLabel: "Category",
          },
          {
            text: "Frame",
            icon: "reco-menu",
            items: [
              {
                text: "Vue",
                link: "https://cn.vuejs.org/",
              },
              {
                text: "React",
                link: "https://zh-hans.reactjs.org/",
              },
              {
                text: "Angular",
                link: "https://angular.cn/",
              },
              {
                text: "Ember",
                link: "https://emberjs.com/",
              },
              {
                text: "Preact",
                link: "https://www.preactjs.com.cn/",
              },
            ],
            ariaLabel: "Frame",
          },
          {
            text: "Contacts",
            icon: "reco-account",
            items: [
              {
                text: "GitHub",
                icon: "reco-github",
                link: "https://github.com/XXXWeii",
              },
              {
                text: "Gitee",
                icon: "reco-mayun",
                link: "https://gitee.com/zjw977020546",
              },
              {
                text: "Twitter",
                icon: "reco-twitter",
                link: "https://twitter.com/zjw977020546",
              },
              {
                text: "Facebook",
                icon: "reco-facebook",
                link: "https://www.facebook.com/QQ977020546",
              },
              {
                text: "E-Mail",
                icon: "reco-mail",
                link: "mailto:977020646@qq.com",
              },
              {
                text: "WeChat",
                icon: "reco-wechat",
                link: "https://www.zhangshuqi.com/images/WeChat.jpg",
              },
              {
                text: "QQ",
                icon: "reco-qq",
                link: "https://www.zhangshuqi.com/images/QQ.jpg",
              },
            ],
            ariaLabel: "Contacts",
          },
          {
            text: "JavaScript",
            link: "https://www.javascriptcn.com/js/js-tutorial.html",
            ariaLabel: "JavaScript",
          },
          {
            text: "Nginx",
            link: "https://www.nginx.cn/doc/",
            ariaLabel: "Nginx",
          },
          {
            text: "NodeJS",
            link: "https://nodejs.org/api/",
            ariaLabel: "NodeJS",
          },
        ],
        sidebar: {
          "/Javascript/": [
            "/Javascript/1000 if elses teach you how to achieve branch optimization",
            "/Javascript/11 JavaScript Code Optimization Tips",
            "/Javascript/12 very useful JavaScript functions",
            "/Javascript/15 Tips for Writing Clean JavaScript Code",
            "/Javascript/20 JavaScript Array Methods You Must Know",
            "/Javascript/4 JavaScript APIs You Didn't Know",
            "/Javascript/7 JavaScript shorthand tricks you must know",
            "/Javascript/A More Elegant Way to Write Complicated Judgments in JavaScript",
            "/Javascript/eventloop, macrotasks and microtasks",
            "/Javascript/Judgment of data type",
            "/Javascript/Native JS realizes the carousel map",
            "/Javascript/Pull up to load Pull down to refresh",
            "/Javascript/shallow copy and deep copy",
            "/Javascript/Stabilization and throttling",
            "/Javascript/Summary of 23 commonly used JavaScript knowledge points, do you know it",
            "/Javascript/this points to",
            "/Javascript/What are the common methods of JavaScript arrays",
            "/Javascript/19 JavaScript single-line codes that improve work efficiency",
            "/Javascript/Can you write these 40 single-line codes, which directly reflect a person's basic level",
            "/Javascript/Ali interview how to implement waterfall flow layout with js",
          ],
          "/Vue/": [
            "/Vue/Frequently Asked Questions about Vue",
            "/Vue/nextTick",
            "/Vue/30 Vue Interview Questions",
            "/Vue/Vue refreshes the current page and there is a 404 solution to Nginx",
            "/Vue/How to deploy the front-end project developed with Vue to the Nginx server of the window system, just five simple steps",
            "/Vue/Axios encapsulation and configuration of different development environment variables in Vue",
            "/Vue/Vue front-end design pattern combing",
            "/Vue/A good Vue front-end code style guide",
            "/Vue/Why is the dynamic import of pictures in Vue require Things you don't know",
            "/Vue/Reactive syntactic sugar in Vue is deprecated",
            "/Vue/10 Mistakes to Avoid When Using Vue 3",
          ],
          "/Other/": [
            "/Other/Git common commands",
            "/Other/Markdown Syntax Guide",
            "/Other/Fuzzy search keyword highlighting",
            "/Other/CentOS8 configure Nginx",
            "/Other/SPA first screen loading speed",
            "/Other/HTTP and HTTPS",
            "/Other/HTTP common status codes",
            "/Other/Enter the URL in the address bar and press Enter",
            "/Other/Why does TCP need three handshakes and four waves",
            "/Other/Ajax principle and implementation",
            "/Other/video mouse movement preview",
            "/Other/Important meta tags for SEO optimization",
            "/Other/6 ES6 tricks that let you write less and do more",
            "/Other/How to control Loading in Axios",
            "/Other/The details of async and await devils that you don't know",
            "/Other/Interviewer If there are 100 requests, how do you use Promise to control concurrency",
            "/Other/Top 10 Node.js Libraries Can Help You Optimize Your Code And Simplify Development",
          ],
          "/CSS/": [
            "/CSS/A Pure CSS Flying Helicopter Animation Guide",
            "/CSS/CSS implements a fault-style text animation that makes interviewers shine",
            "/CSS/Pure CSS3 cartoon train animation",
          ],
          "/HTML/": [
            "/HTML/Only use 1 label to realize Douyin Logo~",
            "/HTML/8 Practical HTML Tips You Might Not Know",
            "/HTML/Cool HTML5 3D rotating photo album animation",
          ],
          "/TypeScript/": [
            "/TypeScript/11 must-have skills for TypeScript programmers to advance",
            "/TypeScript/List of 12 Typescript Development Practical Tips",
          ],
          "/Nginx/": [
            "/Nginx/Nginx review summary of front-end essential knowledge",
            "/Nginx/Nginx commonly used basic configuration",
          ],
        },
      },
      "/zh/": {
        label: "简体中文",
        selectText: "选择语言",
        ariaLabel: "选择语言",
        lastUpdated: "上次更新",
        nav: [
          {
            text: "主页",
            link: "/zh/",
            icon: "reco-home",
            ariaLabel: "主页ome",
          },
          {
            text: "学习路线",
            link: "/zh/guide/",
            icon: "reco-date",
            ariaLabel: "前端学习路线",
          },
          {
            text: "分类",
            icon: "reco-category",
            items: [
              {
                text: "HTML",
                link: "/zh/HTML/Only use 1 label to realize Douyin Logo~",
              },
              {
                text: "CSS",
                link: "/zh/CSS/A Pure CSS Flying Helicopter Animation Guide",
              },
              {
                text: "JavaScript",
                link: "/zh/JavaScript/1000 if elses teach you how to achieve branch optimization",
              },
              {
                text: "TypeScript",
                link: "/zh/TypeScript/11 must-have skills for TypeScript programmers to advance",
              },
              {
                text: "Vue",
                link: "/zh/Vue/Frequently Asked Questions about Vue",
              },
              {
                text: "Nginx",
                link: "/zh/Nginx/Nginx review summary of front-end essential knowledge",
              },
              {
                text: "其他",
                link: "/zh/Other/Git common commands",
              },
            ],
            ariaLabel: "分类",
          },
          {
            text: "框架",
            icon: "reco-menu",
            items: [
              {
                text: "Vue",
                link: "https://cn.vuejs.org/",
              },
              {
                text: "React",
                link: "https://zh-hans.reactjs.org/",
              },
              {
                text: "Angular",
                link: "https://angular.cn/",
              },
              {
                text: "Ember",
                link: "https://emberjs.com/",
              },
              {
                text: "Preact",
                link: "https://www.preactjs.com.cn/",
              },
            ],
            ariaLabel: "框架",
          },
          {
            text: "联系方式",
            icon: "reco-account",
            items: [
              {
                text: "GitHub",
                icon: "reco-github",
                link: "https://github.com/XXXWeii",
              },
              {
                text: "码云",
                icon: "reco-mayun",
                link: "https://gitee.com/zjw977020546",
              },
              {
                text: "推特",
                icon: "reco-twitter",
                link: "https://twitter.com/zjw977020546",
              },
              {
                text: "脸书",
                icon: "reco-facebook",
                link: "https://www.facebook.com/QQ977020546",
              },
              {
                text: "邮箱",
                icon: "reco-mail",
                link: "mailto:977020646@qq.com",
              },
              {
                text: "微信",
                icon: "reco-wechat",
                link: "https://www.zhangshuqi.com/images/WeChat.jpg",
              },
              {
                text: "QQ",
                icon: "reco-qq",
                link: "https://www.zhangshuqi.com/images/QQ.jpg",
              },
            ],
            ariaLabel: "联系方式",
          },
          {
            text: "JavaScript",
            link: "https://www.javascriptcn.com/js/js-tutorial.html",
            ariaLabel: "JavaScript",
          },
          {
            text: "Nginx",
            link: "https://www.nginx.cn/doc/",
            ariaLabel: "Nginx",
          },
          {
            text: "NodeJS",
            link: "https://nodejs.org/api/",
            ariaLabel: "Node",
          },
        ],
        sidebar: {
          "/zh/Javascript/": [
            "/zh/Javascript/1000 if elses teach you how to achieve branch optimization",
            "/zh/Javascript/11 JavaScript Code Optimization Tips",
            "/zh/Javascript/12 very useful JavaScript functions",
            "/zh/Javascript/15 Tips for Writing Clean JavaScript Code",
            "/zh/Javascript/20 JavaScript Array Methods You Must Know",
            "/zh/Javascript/4 JavaScript APIs You Didn't Know",
            "/zh/Javascript/7 JavaScript shorthand tricks you must know",
            "/zh/Javascript/A More Elegant Way to Write Complicated Judgments in JavaScript",
            "/zh/Javascript/eventloop, macrotasks and microtasks",
            "/zh/Javascript/Judgment of data type",
            "/zh/Javascript/Native JS realizes the carousel map",
            "/zh/Javascript/Pull up to load Pull down to refresh",
            "/zh/Javascript/shallow copy and deep copy",
            "/zh/Javascript/Stabilization and throttling",
            "/zh/Javascript/Summary of 23 commonly used JavaScript knowledge points, do you know it",
            "/zh/Javascript/this points to",
            "/zh/Javascript/What are the common methods of JavaScript arrays",
            "/zh/Javascript/19 JavaScript single-line codes that improve work efficiency",
            "/zh/Javascript/Can you write these 40 single-line codes, which directly reflect a person's basic level",
            "/zh/Javascript/Ali interview how to implement waterfall flow layout with js",
          ],
          "/zh/Vue/": [
            "/zh/Vue/Frequently Asked Questions about Vue",
            "/zh/Vue/nextTick",
            "/zh/Vue/30 Vue Interview Questions",
            "/zh/Vue/Vue refreshes the current page and there is a 404 solution to Nginx",
            "/zh/Vue/How to deploy the front-end project developed with Vue to the Nginx server of the window system, just five simple steps",
            "/zh/Vue/Axios encapsulation and configuration of different development environment variables in Vue",
            "/zh/Vue/Vue front-end design pattern combing",
            "/zh/Vue/A good Vue front-end code style guide",
            "/zh/Vue/Why is the dynamic import of pictures in Vue require Things you don't know",
            "/zh/Vue/Reactive syntactic sugar in Vue is deprecated",
            "/zh/Vue/10 Mistakes to Avoid When Using Vue 3",
          ],
          "/zh/Other/": [
            "/zh/Other/Git common commands",
            "/zh/Other/Markdown Syntax Guide",
            "/zh/Other/Fuzzy search keyword highlighting",
            "/zh/Other/CentOS8 configure Nginx",
            "/zh/Other/SPA first screen loading speed",
            "/zh/Other/HTTP and HTTPS",
            "/zh/Other/HTTP common status codes",
            "/zh/Other/Enter the URL in the address bar and press Enter",
            "/zh/Other/Why does TCP need three handshakes and four waves",
            "/zh/Other/Ajax principle and implementation",
            "/zh/Other/video mouse movement preview",
            "/zh/Other/Important meta tags for SEO optimization",
            "/zh/Other/6 ES6 tricks that let you write less and do more",
            "/zh/Other/How to control Loading in Axios",
            "/zh/Other/The details of async and await devils that you don't know",
            "/zh/Other/Interviewer If there are 100 requests, how do you use Promise to control concurrency",
            "/zh/Other/Top 10 Node.js Libraries Can Help You Optimize Your Code And Simplify Development",
          ],
          "/zh/CSS/": [
            "/zh/CSS/A Pure CSS Flying Helicopter Animation Guide",
            "/zh/CSS/CSS implements a fault-style text animation that makes interviewers shine",
            "/zh/CSS/Pure CSS3 cartoon train animation",
          ],
          "/zh/HTML/": [
            "/zh/HTML/Only use 1 label to realize Douyin Logo~",
            "/zh/HTML/8 Practical HTML Tips You Might Not Know",
            "/zh/HTML/Cool HTML5 3D rotating photo album animation",
          ],
          "/zh/TypeScript/": [
            "/zh/TypeScript/11 must-have skills for TypeScript programmers to advance",
            "/zh/TypeScript/List of 12 Typescript Development Practical Tips",
          ],
          "/zh/Nginx/": [
            "/zh/Nginx/Nginx review summary of front-end essential knowledge",
            "/zh/Nginx/Nginx commonly used basic configuration",
          ],
        },
      },
    },
    noFoundPageByTencent: true,
    // 备案
    record: "粤ICP备2023032935号-1",
    recordLink: "https://beian.miit.gov.cn",
    cyberSecurityRecord: "公安部备案文案",
    cyberSecurityLink: "公安部备案指向链接",
    // 作者
    author: "XXXWeii",
    // 项目开始时间，只填写年份
    startYear: "2022",
    //代码主题
    codeTheme: "tomorrow",
    valineConfig: {
      // valine 评论功能配置信息
      appId: "br95SXh66p7OggzGyVBARUrl-gzGzoHsz", // your appId
      appKey: "FuwIi7DBwqtIjfJ7zmQ3L4hZ", // your appKey
      placeholder: "尽情留下你想说的话吧~", // 评论框占位符
      avatar: "wavatar", // 评论用户的头像类型
      highlight: true, // 代码高亮
      recordIP: true, // 记录评论者的IP
      visitor: true,
    },
  },
  plugins: {
    // 鼠标点击效果
    "vuepress-plugin-cursor-effects": {
      size: 2, // size of the particle, default: 2
      shape: "circle", // shape of the particle, default: 'star'
      zIndex: 999999999, // z-index property of the canvas, default: 999999999
    },
    // [
    //   "@vuepress-reco/vuepress-plugin-bgm-player",
    //   {
    //     audios: [
    //       // 本地文件示例
    //       {
    //         name: "起风了",
    //         artist: "Plastic / Fallin` Dild",
    //         url: "https://assets.smallsunnyfox.com/music/2.mp3",
    //         cover: "https://assets.smallsunnyfox.com/music/2.jpg",
    //       },
    //       {
    //         name: "用胳膊当枕头",
    //         artist: "최낙타",
    //         url: "https://assets.smallsunnyfox.com/music/3.mp3",
    //         cover: "https://assets.smallsunnyfox.com/music/3.jpg",
    //       },
    //     ],
    //   },
    // ],
    // [
    //   "@vuepress-reco/vuepress-plugin-kan-ban-niang",
    //   {
    //     theme: ["whiteCat"],
    //     clean: false,
    //     info: "https://github.com/mengqiuleo",
    //     messages: {
    //       welcome: "欢迎来到我的博客",
    //       home: "心里的花，我想要带你回家。",
    //       theme: "好吧，希望你能喜欢我的其他小伙伴。",
    //       close: "你不喜欢我了吗？痴痴地望着你。",
    //     },
    //     messageStyle: { right: "68px", bottom: "290px" },
    //     width: 250,
    //     height: 320,
    //   },
    // ],
    // [
    //   "@vuepress-reco/vuepress-plugin-bulletin-popover",
    //   {
    //     title: "公告",
    //     body: [
    //       {
    //         type: "title",
    //         content: "欢迎加我的QQ/vx 🎉🎉🎉",
    //         style: "text-aligin: center;",
    //       },
    //       {
    //         type: "text",
    //         content: "QQ/VX：977020546",
    //         style: "text-align: center;",
    //       },
    //       {
    //         type: "text",
    //         content: "喜欢的主题特效可以去个人信息",
    //         style: "text-align: center;",
    //       },
    //       {
    //         type: "text",
    //         content: "友链或疑问均可在留言板给我留言",
    //         style: "text-align: center;",
    //       },
    //     ],
    //     footer: [{ type: "button", text: "打赏", link: "/blog/donate" }],
    //   },
    // ],
    // 背后彩带特效
    "ribbon-animation": {
      size: 90, // 默认数据
      opacity: 0.3, //  透明度
      zIndex: -1, //  层级
      opt: {
        // 色带HSL饱和度
        colorSaturation: "80%",
        // 色带HSL亮度量
        colorBrightness: "60%",
        // 带状颜色不透明度
        colorAlpha: 0.65,
        // 在HSL颜色空间中循环显示颜色的速度有多快
        colorCycleSpeed: 6,
        // 从哪一侧开始Y轴 (top|min, middle|center, bottom|max, random),
        verticalPosition: "center", // 到达屏幕另一侧的速度有多快
        horizontalSpeed: 200, // 在任何给定时间，屏幕上会保留多少条带
        ribbonCount: 2, // 添加笔划以及色带填充颜色
        strokeSize: 0, // 通过页面滚动上的因子垂直移动色带
        parallaxAmount: -0.5, // 随着时间的推移，为每个功能区添加动画效果
        animateSections: true,
      },
      ribbonShow: true, //  点击彩带  true显示  false为不显示
      ribbonAnimationShow: true, // 滑动彩带
    },
    // 评论板
    "@vssue/vuepress-plugin-vssue": {
      // 设置 `platform` 而不是 `api`
      platform: "github-v4",

      // 其他的 Vssue 配置
      owner: "XXXWeii",
      repo: "Blog",
      clientId: "f2f23f295813bb843d20",
      clientSecret: "549acb4a6340d673c2a88b25ad1798e2cd04a9da",
    },
    "@vuepress/pwa": {
      serviceWorker: true,
      updatePopup: {
        locales: {
          "/": {
            message: "New content is available.",
            buttonText: "Refresh",
          },
          "/zh/": {
            message: "发现新内容可用",
            buttonText: "刷新",
          },
        },
      },
    },
  },
};
