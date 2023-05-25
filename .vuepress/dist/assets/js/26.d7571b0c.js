(window.webpackJsonp=window.webpackJsonp||[]).push([[26],{541:function(v,_,t){v.exports=t.p+"assets/img/HTTP-HTTPS.414eeca3.png"},542:function(v,_,t){v.exports=t.p+"assets/img/https.e2a94c20.png"},543:function(v,_,t){v.exports=t.p+"assets/img/https-process.9ac914dc.png"},675:function(v,_,t){"use strict";t.r(_);var T=t(2),s=Object(T.a)({},(function(){var v=this,_=v._self._c;return _("ContentSlotsDistributor",{attrs:{"slot-key":v.$parent.slotKey}},[_("p",[_("img",{attrs:{src:t(541),alt:"什么是 HTTP? HTTP 和 HTTPS 的区别?",title:"什么是 HTTP? HTTP 和 HTTPS 的区别?"}})]),v._v(" "),_("h2",{attrs:{id:"一、http"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#一、http"}},[v._v("#")]),v._v(" 一、HTTP")]),v._v(" "),_("hr"),v._v(" "),_("p",[_("code",[v._v("HTTP")]),v._v("(HyperText Transfer Protocol),即超文本运输协议，是实现网络通信的一种规范。")]),v._v(" "),_("p",[v._v("在计算机和网络世界有存在不同的协议，如广播协议、寻址协议、路由协议等等......")]),v._v(" "),_("p",[v._v("而"),_("code",[v._v("HTTP")]),v._v("是一个传输协议，即将数据由 A 传到 B 或 B 传到 A，并且 A 与 B 之间能够存放很多第三方，如"),_("br"),v._v("\nA<=>X<=>Y<=>Z<=>B")]),v._v(" "),_("p",[v._v("传输的数据并不是计算机地层中的二进制包，二十完整的、有意义的数据，如 HTML 文件、图片文件、查询结果等超文本，能够被上层引用识别")]),v._v(" "),_("p",[v._v("在实际应用中，"),_("code",[v._v("HTTP")]),v._v("常被用于"),_("code",[v._v("Web")]),v._v("浏览器和网站服务器之间传递信息，以明文方式发送内容，不提供任何方式的数据加密")]),v._v(" "),_("p",[v._v("特点如下：")]),v._v(" "),_("ul",[_("li",[v._v("支持客户/服务器模式")]),v._v(" "),_("li",[v._v("简单快速：客户向服务器请求服务时，只需传送请求方式和路径。由于 HTTP 协议简单，是的 HTTP 服务器的规模小，因而通信速度很快。")])]),v._v(" "),_("ul",[_("li",[v._v("灵活：HTTP 允许传输任意类型的数据对象，正在传输的类型由 Content-Type 加以标记")]),v._v(" "),_("li",[v._v("无连接：无连接的含义是限制每次连接只处理一个请求。服务器处理完客户的请求，并受到客户的应答后，即断开连接。采用这种方式可以节省传输时间")]),v._v(" "),_("li",[v._v("无状态：HTTP 协议无法根据之前的状态进行本次的请求处理")])]),v._v(" "),_("h2",{attrs:{id:"二、https"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#二、https"}},[v._v("#")]),v._v(" 二、HTTPS")]),v._v(" "),_("hr"),v._v(" "),_("p",[v._v("在上述介绍"),_("code",[v._v("HTTP")]),v._v("中，了解到"),_("code",[v._v("HTTP")]),v._v("传递信息是以明文的形式发送内容，这并不安全。而"),_("code",[v._v("HTTPS")]),v._v("出现正式为了解决"),_("code",[v._v("HTTP")]),v._v("不安全的特性")]),v._v(" "),_("p",[v._v("为了保证这些隐私数据能加密传输，让"),_("code",[v._v("HTTP")]),v._v("安全运行的"),_("code",[v._v("SSL/TLS")]),v._v("协议上，即 HTTPS=HTTP+SSL/TLS，通过"),_("code",[v._v("SSL")]),v._v("证书来验证服务器的身份，并为浏览器和服务器之间的通信进行加密")]),v._v(" "),_("p",[_("code",[v._v("SSL")]),v._v("协议位于"),_("code",[v._v("TCP/IP")]),v._v("协议与各种应用层协议之间，浏览器和服务器之间在使用"),_("code",[v._v("SSL")]),v._v("建立连接时需要选择一组恰当的加密算法来实现安全通信，为数据通信提供安全支持")]),v._v(" "),_("p",[_("img",{attrs:{src:t(542),alt:"https加密、解密",title:"https加密、解密"}})]),v._v(" "),_("p",[v._v("流程图如下所示：")]),v._v(" "),_("p",[_("img",{attrs:{src:t(543),alt:"https传输流程图",title:"https传输流程图"}})]),v._v(" "),_("ul",[_("li",[v._v("首先客户端通过 URL 访问服务器建立 SSL 连接")]),v._v(" "),_("li",[v._v("服务器收到客户端请求后，会将网站支持的证书信息(证书中包含公钥)传送一份给客户端")]),v._v(" "),_("li",[v._v("客户端的服务器开始协商 SSL 连接的安全的等级，也就是信息加密的等级")]),v._v(" "),_("li",[v._v("客户端的浏览器根据双方同意的等级，建立会话密钥，然后利用网站的公钥将会话密钥加密，并传送个网站")]),v._v(" "),_("li",[v._v("服务器利用自己的私钥解密出会话密钥")]),v._v(" "),_("li",[v._v("服务器利用会话密钥加密与客户端之间的通信")])]),v._v(" "),_("h2",{attrs:{id:"三、区别"}},[_("a",{staticClass:"header-anchor",attrs:{href:"#三、区别"}},[v._v("#")]),v._v(" 三、区别")]),v._v(" "),_("hr"),v._v(" "),_("ul",[_("li",[v._v("HTTPS 是 HTTP 协议的安全版本，HTTP 协议的数据传输是明文的，是不安全的，HTTPS 使用了 SSL/TLS 协议进行了加密处理，相对更安全")]),v._v(" "),_("li",[v._v("HTTP 和 HTTPS 使用连接方式不同，默认端口也不一样，HTTP 是 80，HTTPS 是 443")]),v._v(" "),_("li",[v._v("HTTPS 由于需要设计加密以及多次握手，性能方面不如 HTTP")]),v._v(" "),_("li",[v._v("HTTPS 需要 SSL，SSL 证书需要钱，功能越强大的证书费用越高")])])])}),[],!1,null,null,null);_.default=s.exports}}]);