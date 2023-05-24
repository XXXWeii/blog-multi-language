(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{474:function(n,s,e){n.exports=e.p+"assets/img/nginx.cdf02510.png"},475:function(n,s,e){n.exports=e.p+"assets/img/nginx-1.22.1.56001065.png"},476:function(n,s,e){n.exports=e.p+"assets/img/1.ac6c80b0.jpg"},477:function(n,s,e){n.exports=e.p+"assets/img/2.b27123da.jpg"},478:function(n,s,e){n.exports=e.p+"assets/img/3.8fb559f4.jpg"},633:function(n,s,e){"use strict";e.r(s);var t=e(2),a=Object(t.a)({},(function(){var n=this,s=n._self._c;return s("ContentSlotsDistributor",{attrs:{"slot-key":n.$parent.slotKey}},[s("h2",{attrs:{id:"_1-download-the-stable-version-of-nginx-from-the-nginx-official-website-http-nginx-org-en-download-html-refer-to-the-following-picture"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_1-download-the-stable-version-of-nginx-from-the-nginx-official-website-http-nginx-org-en-download-html-refer-to-the-following-picture"}},[n._v("#")]),n._v(" 1. Download the stable version of nginx from the nginx official website: http://nginx.org/en/download.html Refer to the following picture:")]),n._v(" "),s("hr"),n._v(" "),s("p",[s("img",{attrs:{src:e(474),alt:""}})]),n._v(" "),s("h2",{attrs:{id:"_2-the-decompression-path-of-the-nginx-installation-package-cannot-contain-chinese-otherwise-an-error-will-be-reported-when-nginx-starts"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_2-the-decompression-path-of-the-nginx-installation-package-cannot-contain-chinese-otherwise-an-error-will-be-reported-when-nginx-starts"}},[n._v("#")]),n._v(" 2. The decompression path of the nginx installation package cannot contain Chinese, otherwise an error will be reported when nginx starts")]),n._v(" "),s("hr"),n._v(" "),s("p",[s("img",{attrs:{src:e(475),alt:""}})]),n._v(" "),s("h2",{attrs:{id:"_3-use-the-npm-run-build-command-or-other-self-configured-packaging-commands-to-package-the-vue-project-after-the-packaging-is-complete-copy-the-dist-directory-generated-under-the-vue-project-to-the-nginx-html-directory"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_3-use-the-npm-run-build-command-or-other-self-configured-packaging-commands-to-package-the-vue-project-after-the-packaging-is-complete-copy-the-dist-directory-generated-under-the-vue-project-to-the-nginx-html-directory"}},[n._v("#")]),n._v(" 3. Use the npm run build command or other self-configured packaging commands to package the vue project. After the packaging is complete, copy the dist directory generated under the vue project to the nginx/html directory")]),n._v(" "),s("hr"),n._v(" "),s("p",[s("img",{attrs:{src:e(476),alt:""}})]),n._v(" "),s("h2",{attrs:{id:"_4-the-most-critical-step-is-to-modify-the-configuration-file-of-nginx-in-conf-nginx-conf-under-nginx-and-modify-the-configuration-as-follows"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#_4-the-most-critical-step-is-to-modify-the-configuration-file-of-nginx-in-conf-nginx-conf-under-nginx-and-modify-the-configuration-as-follows"}},[n._v("#")]),n._v(" 4. The most critical step is to modify the configuration file of nginx in conf\\nginx.conf under nginx, and modify the configuration as follows")]),n._v(" "),s("hr"),n._v(" "),s("p",[n._v("After sorting, it is as shown in the figure below:")]),n._v(" "),s("p",[s("img",{attrs:{src:e(477),alt:""}})]),n._v(" "),s("p",[n._v("[Note]: Note: When the routing is configured as history, 404 problems will occur when refreshing, and the 404 problems can be solved by configuring as shown in the above figure")]),n._v(" "),s("p",[s("img",{attrs:{src:e(478),alt:""}})]),n._v(" "),s("p",[n._v("Complete original code:")]),n._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[n._v("#user nobody;\nworker_processes 1;\n\n#error_log logs/error.log;\n#error_log logs/error.log notice;\n#error_log logs/error.log info;\n\n#pid logs/nginx.pid;\n\n\nevents {\n     worker_connections 1024;\n}\n\n\nhttp {\n     include mime.types;\n     default_type application/octet-stream;\n\n     #log_format main '$remote_addr - $remote_user [$time_local] \"$request\"'\n     # '$status $body_bytes_sent \"$http_referer\"'\n     # '\"$http_user_agent\" \"$http_x_forwarded_for\"';\n\n     #access_log logs/access.log main;\n\n     sendfile on;\n     #tcp_nopush on;\n\n     #keepalive_timeout 0;\n     keepalive_timeout 65;\n\n     #gzip on;\n\n     server {\n         listen 8080; #Front end port number\n         server_name localhost; #Front-end server address\n\n         #charset koi8-r;\n\n         #access_log logs/host.access.log main;\n\n         location / {\n             root html/dist; #Package file storage path\n             index index.html index.htm;\n\n             try_files $uri $uri/ @router; #Need to point to the following @router, otherwise there will be a vue route, and 404 will appear when refreshing in nginx\n             index index.html;\n         }\n         location /api/ {\n             proxy_pass http://xxxxxxxxxxxxx; #http://xxxxxxx fill in the server address here\n         }\n\n         location @router {\n             rewrite ^.*$ /dist/index.html break;\n         }\n\n         #error_page 404 /404.html;\n\n         # redirect server error pages to the static page /50x.html\n         #\n         error_page 500 502 503 504 /50x.html;\n         location = /50x.html {\n             root html;\n         }\n\n         # proxy the PHP scripts to Apache listening on 127.0.0.1:80\n         #\n         #location ~ \\.php$ {\n         # proxy_pass http://127.0.0.1;\n         #}\n\n         # pass the PHP scripts to FastCGI server listening on 127.0.0.1:9000\n         #\n         #location ~ \\.php$ {\n         # root html;\n         # fastcgi_pass 127.0.0.1:9000;\n         # fastcgi_index index.php;\n         # fastcgi_param SCRIPT_FILENAME /scripts$fastcgi_script_name;\n         #include fastcgi_params;\n         #}\n\n         # deny access to .htaccess files, if Apache's document root\n         # concurs with nginx's one\n         #\n         #location ~ /\\.ht {\n         # deny all;\n         #}\n     }\n\n\n     # another virtual host using mix of IP-, name-, and port-based configuration\n     #\n     #server {\n     # listen 8000;\n     # listen somename:8080;\n     # server_name somename alias another.alias;\n\n     # location / {\n     # root html;\n     # index index.html index.htm;\n     # }\n     #}\n\n\n     # HTTPS server\n     #\n     #server {\n     # listen 443 ssl;\n     # server_name localhost;\n\n     # ssl_certificate cert.pem;\n     # ssl_certificate_key cert.key;\n\n     # ssl_session_cache shared:SSL:1m;\n     # ssl_session_timeout 5m;\n\n     # ssl_ciphers HIGH:!aNULL:!MD5;\n     # ssl_prefer_server_ciphers on;\n\n     # location / {\n     # root html;\n     # index index.html index.htm;\n     # }\n     #}\n\n}\n")])]),n._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[n._v("1")]),s("br"),s("span",{staticClass:"line-number"},[n._v("2")]),s("br"),s("span",{staticClass:"line-number"},[n._v("3")]),s("br"),s("span",{staticClass:"line-number"},[n._v("4")]),s("br"),s("span",{staticClass:"line-number"},[n._v("5")]),s("br"),s("span",{staticClass:"line-number"},[n._v("6")]),s("br"),s("span",{staticClass:"line-number"},[n._v("7")]),s("br"),s("span",{staticClass:"line-number"},[n._v("8")]),s("br"),s("span",{staticClass:"line-number"},[n._v("9")]),s("br"),s("span",{staticClass:"line-number"},[n._v("10")]),s("br"),s("span",{staticClass:"line-number"},[n._v("11")]),s("br"),s("span",{staticClass:"line-number"},[n._v("12")]),s("br"),s("span",{staticClass:"line-number"},[n._v("13")]),s("br"),s("span",{staticClass:"line-number"},[n._v("14")]),s("br"),s("span",{staticClass:"line-number"},[n._v("15")]),s("br"),s("span",{staticClass:"line-number"},[n._v("16")]),s("br"),s("span",{staticClass:"line-number"},[n._v("17")]),s("br"),s("span",{staticClass:"line-number"},[n._v("18")]),s("br"),s("span",{staticClass:"line-number"},[n._v("19")]),s("br"),s("span",{staticClass:"line-number"},[n._v("20")]),s("br"),s("span",{staticClass:"line-number"},[n._v("21")]),s("br"),s("span",{staticClass:"line-number"},[n._v("22")]),s("br"),s("span",{staticClass:"line-number"},[n._v("23")]),s("br"),s("span",{staticClass:"line-number"},[n._v("24")]),s("br"),s("span",{staticClass:"line-number"},[n._v("25")]),s("br"),s("span",{staticClass:"line-number"},[n._v("26")]),s("br"),s("span",{staticClass:"line-number"},[n._v("27")]),s("br"),s("span",{staticClass:"line-number"},[n._v("28")]),s("br"),s("span",{staticClass:"line-number"},[n._v("29")]),s("br"),s("span",{staticClass:"line-number"},[n._v("30")]),s("br"),s("span",{staticClass:"line-number"},[n._v("31")]),s("br"),s("span",{staticClass:"line-number"},[n._v("32")]),s("br"),s("span",{staticClass:"line-number"},[n._v("33")]),s("br"),s("span",{staticClass:"line-number"},[n._v("34")]),s("br"),s("span",{staticClass:"line-number"},[n._v("35")]),s("br"),s("span",{staticClass:"line-number"},[n._v("36")]),s("br"),s("span",{staticClass:"line-number"},[n._v("37")]),s("br"),s("span",{staticClass:"line-number"},[n._v("38")]),s("br"),s("span",{staticClass:"line-number"},[n._v("39")]),s("br"),s("span",{staticClass:"line-number"},[n._v("40")]),s("br"),s("span",{staticClass:"line-number"},[n._v("41")]),s("br"),s("span",{staticClass:"line-number"},[n._v("42")]),s("br"),s("span",{staticClass:"line-number"},[n._v("43")]),s("br"),s("span",{staticClass:"line-number"},[n._v("44")]),s("br"),s("span",{staticClass:"line-number"},[n._v("45")]),s("br"),s("span",{staticClass:"line-number"},[n._v("46")]),s("br"),s("span",{staticClass:"line-number"},[n._v("47")]),s("br"),s("span",{staticClass:"line-number"},[n._v("48")]),s("br"),s("span",{staticClass:"line-number"},[n._v("49")]),s("br"),s("span",{staticClass:"line-number"},[n._v("50")]),s("br"),s("span",{staticClass:"line-number"},[n._v("51")]),s("br"),s("span",{staticClass:"line-number"},[n._v("52")]),s("br"),s("span",{staticClass:"line-number"},[n._v("53")]),s("br"),s("span",{staticClass:"line-number"},[n._v("54")]),s("br"),s("span",{staticClass:"line-number"},[n._v("55")]),s("br"),s("span",{staticClass:"line-number"},[n._v("56")]),s("br"),s("span",{staticClass:"line-number"},[n._v("57")]),s("br"),s("span",{staticClass:"line-number"},[n._v("58")]),s("br"),s("span",{staticClass:"line-number"},[n._v("59")]),s("br"),s("span",{staticClass:"line-number"},[n._v("60")]),s("br"),s("span",{staticClass:"line-number"},[n._v("61")]),s("br"),s("span",{staticClass:"line-number"},[n._v("62")]),s("br"),s("span",{staticClass:"line-number"},[n._v("63")]),s("br"),s("span",{staticClass:"line-number"},[n._v("64")]),s("br"),s("span",{staticClass:"line-number"},[n._v("65")]),s("br"),s("span",{staticClass:"line-number"},[n._v("66")]),s("br"),s("span",{staticClass:"line-number"},[n._v("67")]),s("br"),s("span",{staticClass:"line-number"},[n._v("68")]),s("br"),s("span",{staticClass:"line-number"},[n._v("69")]),s("br"),s("span",{staticClass:"line-number"},[n._v("70")]),s("br"),s("span",{staticClass:"line-number"},[n._v("71")]),s("br"),s("span",{staticClass:"line-number"},[n._v("72")]),s("br"),s("span",{staticClass:"line-number"},[n._v("73")]),s("br"),s("span",{staticClass:"line-number"},[n._v("74")]),s("br"),s("span",{staticClass:"line-number"},[n._v("75")]),s("br"),s("span",{staticClass:"line-number"},[n._v("76")]),s("br"),s("span",{staticClass:"line-number"},[n._v("77")]),s("br"),s("span",{staticClass:"line-number"},[n._v("78")]),s("br"),s("span",{staticClass:"line-number"},[n._v("79")]),s("br"),s("span",{staticClass:"line-number"},[n._v("80")]),s("br"),s("span",{staticClass:"line-number"},[n._v("81")]),s("br"),s("span",{staticClass:"line-number"},[n._v("82")]),s("br"),s("span",{staticClass:"line-number"},[n._v("83")]),s("br"),s("span",{staticClass:"line-number"},[n._v("84")]),s("br"),s("span",{staticClass:"line-number"},[n._v("85")]),s("br"),s("span",{staticClass:"line-number"},[n._v("86")]),s("br"),s("span",{staticClass:"line-number"},[n._v("87")]),s("br"),s("span",{staticClass:"line-number"},[n._v("88")]),s("br"),s("span",{staticClass:"line-number"},[n._v("89")]),s("br"),s("span",{staticClass:"line-number"},[n._v("90")]),s("br"),s("span",{staticClass:"line-number"},[n._v("91")]),s("br"),s("span",{staticClass:"line-number"},[n._v("92")]),s("br"),s("span",{staticClass:"line-number"},[n._v("93")]),s("br"),s("span",{staticClass:"line-number"},[n._v("94")]),s("br"),s("span",{staticClass:"line-number"},[n._v("95")]),s("br"),s("span",{staticClass:"line-number"},[n._v("96")]),s("br"),s("span",{staticClass:"line-number"},[n._v("97")]),s("br"),s("span",{staticClass:"line-number"},[n._v("98")]),s("br"),s("span",{staticClass:"line-number"},[n._v("99")]),s("br"),s("span",{staticClass:"line-number"},[n._v("100")]),s("br"),s("span",{staticClass:"line-number"},[n._v("101")]),s("br"),s("span",{staticClass:"line-number"},[n._v("102")]),s("br"),s("span",{staticClass:"line-number"},[n._v("103")]),s("br"),s("span",{staticClass:"line-number"},[n._v("104")]),s("br"),s("span",{staticClass:"line-number"},[n._v("105")]),s("br"),s("span",{staticClass:"line-number"},[n._v("106")]),s("br"),s("span",{staticClass:"line-number"},[n._v("107")]),s("br"),s("span",{staticClass:"line-number"},[n._v("108")]),s("br"),s("span",{staticClass:"line-number"},[n._v("109")]),s("br"),s("span",{staticClass:"line-number"},[n._v("110")]),s("br"),s("span",{staticClass:"line-number"},[n._v("111")]),s("br"),s("span",{staticClass:"line-number"},[n._v("112")]),s("br"),s("span",{staticClass:"line-number"},[n._v("113")]),s("br"),s("span",{staticClass:"line-number"},[n._v("114")]),s("br"),s("span",{staticClass:"line-number"},[n._v("115")]),s("br"),s("span",{staticClass:"line-number"},[n._v("116")]),s("br"),s("span",{staticClass:"line-number"},[n._v("117")]),s("br"),s("span",{staticClass:"line-number"},[n._v("118")]),s("br"),s("span",{staticClass:"line-number"},[n._v("119")]),s("br"),s("span",{staticClass:"line-number"},[n._v("120")]),s("br"),s("span",{staticClass:"line-number"},[n._v("121")]),s("br"),s("span",{staticClass:"line-number"},[n._v("122")]),s("br"),s("span",{staticClass:"line-number"},[n._v("123")]),s("br"),s("span",{staticClass:"line-number"},[n._v("124")]),s("br"),s("span",{staticClass:"line-number"},[n._v("125")]),s("br"),s("span",{staticClass:"line-number"},[n._v("126")]),s("br")])]),s("h2",{attrs:{id:"after-modifying-the-5-conf-configuration-file-you-can-start-nginx-exe-in-the-nginx-installation-directory-or-use-the-command-start-nginx-to-start-the-project"}},[s("a",{staticClass:"header-anchor",attrs:{href:"#after-modifying-the-5-conf-configuration-file-you-can-start-nginx-exe-in-the-nginx-installation-directory-or-use-the-command-start-nginx-to-start-the-project"}},[n._v("#")]),n._v(" After modifying the 5.conf configuration file, you can start nginx.exe in the nginx installation directory, or use the command, start nginx to start the project.")]),n._v(" "),s("hr"),n._v(" "),s("p",[n._v("Finally, you can access the vue project through the front-end server address and front-end port in the configuration file.")]),n._v(" "),s("p",[n._v("Common commands")]),n._v(" "),s("div",{staticClass:"language- line-numbers-mode"},[s("pre",{pre:!0,attrs:{class:"language-text"}},[s("code",[n._v('start nginx start\n\nnginx -s reload refresh\n\ntasklist /fi "imagename eq nginx.exe" View all nginx processes\n\ntaskkill /fi "imagename eq nginx.exe" /f stops all nginx processes\n')])]),n._v(" "),s("div",{staticClass:"line-numbers-wrapper"},[s("span",{staticClass:"line-number"},[n._v("1")]),s("br"),s("span",{staticClass:"line-number"},[n._v("2")]),s("br"),s("span",{staticClass:"line-number"},[n._v("3")]),s("br"),s("span",{staticClass:"line-number"},[n._v("4")]),s("br"),s("span",{staticClass:"line-number"},[n._v("5")]),s("br"),s("span",{staticClass:"line-number"},[n._v("6")]),s("br"),s("span",{staticClass:"line-number"},[n._v("7")]),s("br")])])])}),[],!1,null,null,null);s.default=a.exports}}]);