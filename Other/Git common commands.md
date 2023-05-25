---
title: Git common commands
lang: en-US
date: 2022-03-01 15:15:00
author: XXXWeii
tags:
  - Other
---

## Project initialization

---

```
git init
```

::: tip
After the project is initialized, a .git file will be generated. If it cannot be seen, it means that the computer hides the file starting with .
:::

## project association

---

### Clone the project

---

```
git clone <project address>
git clone -branch [tags label] <project address> or git clone -b [tags label] [project address]
```

Indicates that the project is pulled from the remote warehouse to the local

### The local project is associated with the remote warehouse

---

If we have projects locally, what we want is to associate local projects with remote warehouses, then there are two situations as follows

- Local existing files are associated with the Git repository (empty repository)

```{5}
git init
git remote add origin <project address>
git add . //Remember the dot (.) is separated by spaces
git commit -m "<committed information record>"
git push --set-upstream origin master or git push -u origin master
```

- Case of non-empty warehouse:

```{5,7}
git init
git remote add origin xxxx
git add .
git commit -m 'init'
git pull origin master --allow-unrelated-histories
//If there is a conflict, resolve the conflict first
git push --set-upstream origin master
```

It can be seen that the two cases are only different in step 5.

::: danger After the above commit is sent to the local warehouse, if it is pushed directly, it will report an error:

```
refusing to merge unrelated histories
```

It means to refuse to merge branches that have no historical relationship. We use the following code to solve this problem
:::

::: tip Then add the following line of code:

```
git pull origin master --allow-unrelated-histories
```

We allow pulling branches that have no historical relationship, this step is the fifth step of our code
:::

## Branch operation

---

### View Branches

---

```
git branch //View local branch
git branch -r //View remote branch
git branch -a //View local + remote branches
git branch -v //The information of the last submission of the branch
```

### switch branches

---

```
git branch <BranchName> //Create a new branch
git checkout <BranchName> //switch branch
git checkout -b <BranchName> //Create a new branch and switch to the branch
```

### Pull the branch

---

Pull the specified branch in the remote Git warehouse to the local (branch that does not exist locally)

```
git checkout -b <local branch name> <origin/remote branch name>
```

### delete branch

---

```
git branch -d <BranchName> //delete the local branch
git push origin :<BranchName> //Delete the remote branch
```

### Create a new local branch and push it to the remote

---

```
git branch -b <BranchName> //Create a new local branch and switch to the new branch
git push --set-upstream origin <BranchName>
```

### Staging

---

::: tip Do not want to submit the current code to the remote warehouse
Sometimes, we want to switch branches, but we don't want to submit the current branch code to the local or remote warehouse. If we switch directly, the code will be overwritten. At this time, we can use the temporary storage function
:::

```
git stash //save
git stash pop //Take out temporary storage
```

## Submit operation

---

### Code submission

---

```
git add .
git commit -m "<committed information record>"
git push
```

When submitting, you can enter emoji expressions, which are cute and funny, and others will know what you are submitting at a glance

:bug: //Fix BUG :lipstick: //Update style :lock: //Fix security issues :recycle: //Refactor :sparkles: //Add new features

### Commit History

---

```
git log
git log -3 //Display the last 3 updates
```

### Native code rollback

---

```
git reset --hard commit-id //roll back to commit-id
git reset --hard HEAD~3 //Rollback the last three commits
git reset --hard HEAD^ //Return the local code to the previous version
```

### Label function

---

Sometimes, when our project is online, we need the tag function to record our version

```
git tag //Display existing tags
git tag <v1.0.1> //Create a lightweight tag
git tag -a <v1.0.2> -m '<release version>' //Create a label with annotations
git tag -d <tag_name> //delete tag
git push // will not send the tag label to the remote server, only through explicit commands can the tag be shared to the remote warehouse
git push origin <tag_name> //push a single tag
git push origin --tags //Push all local new tags
```

## configuration

---

### config configuration

---

Finally, let's talk about config configuration

```
git config --global user.name //View the user name of the global configuration
git config --global user.email //View the globally configured mailbox
git config --global user.name 'zhangsha' //Configure the global user name
git config --global user.email 'xx@xx.com' //Configure the global mailbox
//The following is for individual project configuration and viewing
git config user.name 'lisi' //Configure the user name of the current project
git config user.name //View the user name of the current project
git config --list //View multiple configurations
```

> Configuration is divided into global configuration and project configuration. When there is no separate configuration for the project, the global configuration will be used by default. If we have a separate configuration in a project, then the configuration in the project will be used. This option is switched when you It can play a certain role in different projects (such as company and personal projects).
