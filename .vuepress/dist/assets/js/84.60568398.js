(window.webpackJsonp=window.webpackJsonp||[]).push([[84],{611:function(e,t,a){"use strict";a.r(t);var s=a(2),i=Object(s.a)({},(function(){var e=this,t=e._self._c;return t("ContentSlotsDistributor",{attrs:{"slot-key":e.$parent.slotKey}},[t("h2",{attrs:{id:"project-initialization"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#project-initialization"}},[e._v("#")]),e._v(" Project initialization")]),e._v(" "),t("hr"),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("git init\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br")])]),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"title"}),t("p",[e._v("After the project is initialized, a .git file will be generated. If it cannot be seen, it means that the computer hides the file starting with .")])]),t("h2",{attrs:{id:"project-association"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#project-association"}},[e._v("#")]),e._v(" project association")]),e._v(" "),t("hr"),e._v(" "),t("h3",{attrs:{id:"clone-the-project"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#clone-the-project"}},[e._v("#")]),e._v(" Clone the project")]),e._v(" "),t("hr"),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("git clone <project address>\ngit clone -branch [tags label] <project address> or git clone -b [tags label] [project address]\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br")])]),t("p",[e._v("Indicates that the project is pulled from the remote warehouse to the local")]),e._v(" "),t("h3",{attrs:{id:"the-local-project-is-associated-with-the-remote-warehouse"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#the-local-project-is-associated-with-the-remote-warehouse"}},[e._v("#")]),e._v(" The local project is associated with the remote warehouse")]),e._v(" "),t("hr"),e._v(" "),t("p",[e._v("If we have projects locally, what we want is to associate local projects with remote warehouses, then there are two situations as follows")]),e._v(" "),t("ul",[t("li",[e._v("Local existing files are associated with the Git repository (empty repository)")])]),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("div",{staticClass:"highlight-lines"},[t("br"),t("br"),t("br"),t("br"),t("div",{staticClass:"highlighted"},[e._v(" ")]),t("br")]),t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('git init\ngit remote add origin <project address>\ngit add . //Remember the dot (.) is separated by spaces\ngit commit -m "<committed information record>"\ngit push --set-upstream origin master or git push -u origin master\n')])]),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br"),t("span",{staticClass:"line-number"},[e._v("3")]),t("br"),t("span",{staticClass:"line-number"},[e._v("4")]),t("br"),t("span",{staticClass:"line-number"},[e._v("5")]),t("br")])]),t("ul",[t("li",[e._v("Case of non-empty warehouse:")])]),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("div",{staticClass:"highlight-lines"},[t("br"),t("br"),t("br"),t("br"),t("div",{staticClass:"highlighted"},[e._v(" ")]),t("br"),t("div",{staticClass:"highlighted"},[e._v(" ")]),t("br")]),t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("git init\ngit remote add origin xxxx\ngit add .\ngit commit -m 'init'\ngit pull origin master --allow-unrelated-histories\n//If there is a conflict, resolve the conflict first\ngit push --set-upstream origin master\n")])]),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br"),t("span",{staticClass:"line-number"},[e._v("3")]),t("br"),t("span",{staticClass:"line-number"},[e._v("4")]),t("br"),t("span",{staticClass:"line-number"},[e._v("5")]),t("br"),t("span",{staticClass:"line-number"},[e._v("6")]),t("br"),t("span",{staticClass:"line-number"},[e._v("7")]),t("br")])]),t("p",[e._v("It can be seen that the two cases are only different in step 5.")]),e._v(" "),t("div",{staticClass:"custom-block danger"},[t("p",{staticClass:"title"},[e._v("After the above commit is sent to the local warehouse, if it is pushed directly, it will report an error:")]),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("refusing to merge unrelated histories\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br")])]),t("p",[e._v("It means to refuse to merge branches that have no historical relationship. We use the following code to solve this problem")])]),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"title"},[e._v("Then add the following line of code:")]),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("git pull origin master --allow-unrelated-histories\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br")])]),t("p",[e._v("We allow pulling branches that have no historical relationship, this step is the fifth step of our code")])]),t("h2",{attrs:{id:"branch-operation"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#branch-operation"}},[e._v("#")]),e._v(" Branch operation")]),e._v(" "),t("hr"),e._v(" "),t("h3",{attrs:{id:"view-branches"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#view-branches"}},[e._v("#")]),e._v(" View Branches")]),e._v(" "),t("hr"),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("git branch //View local branch\ngit branch -r //View remote branch\ngit branch -a //View local + remote branches\ngit branch -v //The information of the last submission of the branch\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br"),t("span",{staticClass:"line-number"},[e._v("3")]),t("br"),t("span",{staticClass:"line-number"},[e._v("4")]),t("br")])]),t("h3",{attrs:{id:"switch-branches"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#switch-branches"}},[e._v("#")]),e._v(" switch branches")]),e._v(" "),t("hr"),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("git branch <BranchName> //Create a new branch\ngit checkout <BranchName> //switch branch\ngit checkout -b <BranchName> //Create a new branch and switch to the branch\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br"),t("span",{staticClass:"line-number"},[e._v("3")]),t("br")])]),t("h3",{attrs:{id:"pull-the-branch"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#pull-the-branch"}},[e._v("#")]),e._v(" Pull the branch")]),e._v(" "),t("hr"),e._v(" "),t("p",[e._v("Pull the specified branch in the remote Git warehouse to the local (branch that does not exist locally)")]),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("git checkout -b <local branch name> <origin/remote branch name>\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br")])]),t("h3",{attrs:{id:"delete-branch"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#delete-branch"}},[e._v("#")]),e._v(" delete branch")]),e._v(" "),t("hr"),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("git branch -d <BranchName> //delete the local branch\ngit push origin :<BranchName> //Delete the remote branch\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br")])]),t("h3",{attrs:{id:"create-a-new-local-branch-and-push-it-to-the-remote"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#create-a-new-local-branch-and-push-it-to-the-remote"}},[e._v("#")]),e._v(" Create a new local branch and push it to the remote")]),e._v(" "),t("hr"),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("git branch -b <BranchName> //Create a new local branch and switch to the new branch\ngit push --set-upstream origin <BranchName>\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br")])]),t("h3",{attrs:{id:"staging"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#staging"}},[e._v("#")]),e._v(" Staging")]),e._v(" "),t("hr"),e._v(" "),t("div",{staticClass:"custom-block tip"},[t("p",{staticClass:"title"},[e._v("Do not want to submit the current code to the remote warehouse")]),t("p",[e._v("Sometimes, we want to switch branches, but we don't want to submit the current branch code to the local or remote warehouse. If we switch directly, the code will be overwritten. At this time, we can use the temporary storage function")])]),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("git stash //save\ngit stash pop //Take out temporary storage\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br")])]),t("h2",{attrs:{id:"submit-operation"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#submit-operation"}},[e._v("#")]),e._v(" Submit operation")]),e._v(" "),t("hr"),e._v(" "),t("h3",{attrs:{id:"code-submission"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#code-submission"}},[e._v("#")]),e._v(" Code submission")]),e._v(" "),t("hr"),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v('git add .\ngit commit -m "<committed information record>"\ngit push\n')])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br"),t("span",{staticClass:"line-number"},[e._v("3")]),t("br")])]),t("p",[e._v("When submitting, you can enter emoji expressions, which are cute and funny, and others will know what you are submitting at a glance")]),e._v(" "),t("p",[e._v("🐛 //Fix BUG 💄 //Update style 🔒 //Fix security issues ♻️ //Refactor ✨ //Add new features")]),e._v(" "),t("h3",{attrs:{id:"commit-history"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#commit-history"}},[e._v("#")]),e._v(" Commit History")]),e._v(" "),t("hr"),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("git log\ngit log -3 //Display the last 3 updates\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br")])]),t("h3",{attrs:{id:"native-code-rollback"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#native-code-rollback"}},[e._v("#")]),e._v(" Native code rollback")]),e._v(" "),t("hr"),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("git reset --hard commit-id //roll back to commit-id\ngit reset --hard HEAD~3 //Rollback the last three commits\ngit reset --hard HEAD^ //Return the local code to the previous version\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br"),t("span",{staticClass:"line-number"},[e._v("3")]),t("br")])]),t("h3",{attrs:{id:"label-function"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#label-function"}},[e._v("#")]),e._v(" Label function")]),e._v(" "),t("hr"),e._v(" "),t("p",[e._v("Sometimes, when our project is online, we need the tag function to record our version")]),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("git tag //Display existing tags\ngit tag <v1.0.1> //Create a lightweight tag\ngit tag -a <v1.0.2> -m '<release version>' //Create a label with annotations\ngit tag -d <tag_name> //delete tag\ngit push // will not send the tag label to the remote server, only through explicit commands can the tag be shared to the remote warehouse\ngit push origin <tag_name> //push a single tag\ngit push origin --tags //Push all local new tags\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br"),t("span",{staticClass:"line-number"},[e._v("3")]),t("br"),t("span",{staticClass:"line-number"},[e._v("4")]),t("br"),t("span",{staticClass:"line-number"},[e._v("5")]),t("br"),t("span",{staticClass:"line-number"},[e._v("6")]),t("br"),t("span",{staticClass:"line-number"},[e._v("7")]),t("br")])]),t("h2",{attrs:{id:"configuration"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#configuration"}},[e._v("#")]),e._v(" configuration")]),e._v(" "),t("hr"),e._v(" "),t("h3",{attrs:{id:"config-configuration"}},[t("a",{staticClass:"header-anchor",attrs:{href:"#config-configuration"}},[e._v("#")]),e._v(" config configuration")]),e._v(" "),t("hr"),e._v(" "),t("p",[e._v("Finally, let's talk about config configuration")]),e._v(" "),t("div",{staticClass:"language- line-numbers-mode"},[t("pre",{pre:!0,attrs:{class:"language-text"}},[t("code",[e._v("git config --global user.name //View the user name of the global configuration\ngit config --global user.email //View the globally configured mailbox\ngit config --global user.name 'zhangsha' //Configure the global user name\ngit config --global user.email 'xx@xx.com' //Configure the global mailbox\n//The following is for individual project configuration and viewing\ngit config user.name 'lisi' //Configure the user name of the current project\ngit config user.name //View the user name of the current project\ngit config --list //View multiple configurations\n")])]),e._v(" "),t("div",{staticClass:"line-numbers-wrapper"},[t("span",{staticClass:"line-number"},[e._v("1")]),t("br"),t("span",{staticClass:"line-number"},[e._v("2")]),t("br"),t("span",{staticClass:"line-number"},[e._v("3")]),t("br"),t("span",{staticClass:"line-number"},[e._v("4")]),t("br"),t("span",{staticClass:"line-number"},[e._v("5")]),t("br"),t("span",{staticClass:"line-number"},[e._v("6")]),t("br"),t("span",{staticClass:"line-number"},[e._v("7")]),t("br"),t("span",{staticClass:"line-number"},[e._v("8")]),t("br")])]),t("blockquote",[t("p",[e._v("Configuration is divided into global configuration and project configuration. When there is no separate configuration for the project, the global configuration will be used by default. If we have a separate configuration in a project, then the configuration in the project will be used. This option is switched when you It can play a certain role in different projects (such as company and personal projects).")])])])}),[],!1,null,null,null);t.default=i.exports}}]);