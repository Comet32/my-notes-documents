# 项目 - 图书跟踪应用

> 在 MyReads 项目中，你将创建一个网络应用，使你能够选择和归类你阅读过的图书、正在阅读的图书以及想要阅读的图书。

[TOC]

---

## 1. 项目概述

是时候测试一下你新学的技能并构建 My Reads 应用了，你将使用 React 来构建此应用，你应该记得 My Reads 应用，可以让你从一开始跟踪你的所有书籍。此应用将要求你**管理状态**、**构建组件**和**使用 React Router**。

构建这个应用最重要的是完成它的 React 部分，我们将向你提供一些基本的样式和图标，因为我们希望它会看起来不错。但是，我们不会对项目的视觉部分评分。

---

## 项目概述

在 MyReads 项目中，你将创建一个书架应用，使你能够**选择和归类你阅读过的图书**、**正在阅读的图书**以及**想要阅读的图书**。 该项目重点讲解如何使用 React 构建该应用并提供一个 API 服务器和客户端库，使你在与应用互动时能够保存信息。

你可以 fork 并且 clone [起始代码模板](https://github.com/udacity/reactnd-project-myreads-starter) 或使用 [create-react-app](https://github.com/facebookincubator/create-react-app) 创建一个新的应用。即使你从头自己创建应用，依然需要使用起始代码模板中包含的 `booksAPI.js` 文件与后端 API 互动。我们在起始代码模板资源库的 `README`中提供了如何使用 API 方法的说明。

起始代码模板包含了所有可能用到的 CSS 和 HTML 标记，但是忽略了完成项目所需的 React 代码。如果你不想从头编写 CSS 和 HTML，这样可以为你节省时间。提供的代码将会展示所完成应用的静态 HTML 页面，但是没有互动功能。

## 应用功能

在此应用中，主页面显示了一个“书架”列表（即类别），每个书架都包含一个图书数量。三个书架分别为：

- 当前阅读
- 想要阅读
- 已经阅读

![img](assets/110f06fa-4568-4144-9677-c31bfd61e0ce)

[静态页面（以及完成的应用）应该看起来如图所示。](https://classroom.udacity.com/nanodegrees/nd019-cn/parts/b2feddfa-4b79-4f8b-8657-ab8892feae08/modules/1c3110e6-46f7-4929-8cf4-8332afbbaadf/lessons/5d31386c-8c1c-4f32-974d-6bf3c1062cba/concepts/e7df4589-29d8-4d49-b760-a1db72d6cbdb#)

每本图书都有一个控件，使你能够为该图书选择书架。当你选择其他书架时，图书就移到该书架上。注意，控件的默认值应该始终为图书当前所在书架。

![img](assets/931cd3cd-c1d8-4dda-afba-6851e45f6870)

主页面还有一个“搜索”链接，该链接是一个搜索页面，使你能够查找图书并将其添加到书库中。

搜索页面具有一个文本输入框，可以用来查找图书。当文本输入的值更改后，与该查询匹配的图书将显示在页面上，以及使你将该图书添加到书库中的控件。要使界面保持一致性，你可以考虑重复利用用于在主页面上显示图书的一些代码。

![img](assets/76013ad7-05d2-4a15-b7de-0f5e9097a2a9)

当图书位于书架上时，它在主应用页面和搜索页面上的状态应该相同。

[![img](assets/76c4ff47-9a3f-40cb-868e-1268d17aa50a)](https://classroom.udacity.com/nanodegrees/nd019-cn/parts/b2feddfa-4b79-4f8b-8657-ab8892feae08/modules/1c3110e6-46f7-4929-8cf4-8332afbbaadf/lessons/5d31386c-8c1c-4f32-974d-6bf3c1062cba/concepts/e7df4589-29d8-4d49-b760-a1db72d6cbdb#)

搜索页面具有一个指向 `/`（根 URL）的链接，并返回主页面。

当你从搜索页面返回主页面时，应该立即看到在书库的搜索页面所做的所有选择。

## 提交要求

提交内容应该包括在本地网络服务器上安装和启动你的网络应用所需的所有必要文件。对于包含 JSX 的文件，请不要使用 `.jsx` 扩展名的文件（改为使用 `.js`）。你可以认为审核人员在机器上安装的是 npm。

即使你没有使用[起始代码](https://github.com/udacity/myreads-starter)，你可能应该依然使用 [create-react-app](https://github.com/facebookincubator/create-react-app) 来生成提交内容，因为这是确保项目审核人员具有安装和运行你的应用所需的所有文件的最简单方式。

## 注意事项

该项目的侧重点是编写能正常运行的 React 代码，不用让页面非常美观。如果你愿意的话，可以花些时间完善布局和 CSS，但是该项目的目标是提供正确的功能。



---

## 2. 项目说明和审核标准

## 提交之前

确保代码符合我们的 HTML、CSS、JavaScript 和 Git 样式指南。

- [Udacity 的 HTML 样式指南](http://udacity.github.io/frontend-nanodegree-styleguide/index.html)
- [Udacity 的 CSS 样式指南](http://udacity.github.io/frontend-nanodegree-styleguide/css.html)
- [Udacity 的 JavaScript 样式指南](http://udacity.github.io/frontend-nanodegree-styleguide/javascript.html)
- [Udacity 的 Git 样式指南](https://udacity.github.io/git-styleguide/)

我们建议从一开始就使用 Git。确保经常 commit 并使用格式合理的 commit 消息，以便符合我们的[指南](https://udacity.github.io/git-styleguide/)。

### 我们将如何评估此项目？

优达学城代码审核人员将按照该[审核标准](https://review.udacity.com/#!/rubrics/1198/view)评估你的项目。确保在提交之前，先仔细检查项目。必须符合所有规范要求，才能通过评估。

在构建该项目时，项目审核标准是最准确的参考标准。请将其保存为浏览器书签，以便随时参考！

Task List

- 将[项目审核标准](https://review.udacity.com/#!/rubrics/1198/view)添加为书签

### 提交说明

1. 将项目 push 到 GitHub，确保 push 到主分支。
2. 在项目提交页面上，选择选项‘通过 GitHub 进行提交’
3. 选择该项目的资源库（你可能需要先登录 GitHub 帐户）。

### 遇到问题了？

如果你在提交项目时遇到问题了，或者想要查看提交状态，请给我们发送电子邮件：**react-support@udacity.com**。

---

## 3. 继续改进

你将有机会借助此项目进行各种练习，我们将向你提供样式和图像，这样你就可以专心使用 React 构建项目。但是你需要考虑到有几千名学生正和你构建同样的项目，要脱颖而出，你可以使用不同的外观样式。

记住，**不断尝试新鲜事物，才能学到更多**。所以你何不尝试向应用添加一个新功能？

你可以添加一个书籍评分功能，或者将书籍大批从一个类别移到另一个类别。

这些并非硬性要求，但绝对有助于你学习 React。

---

## 6. 项目：图书跟踪应用

### 提交说明

1. 下载或分叉并克隆[起始服务器资源库](https://github.com/udacity/reactnd-project-myreads-starter)
2. 从所含的`package.json` 文件中安装必须的程序。
3. 启动静态应用，确保能正常运行。
4. 使用 React 和 React Router v4 重构该应用，并实现必要的功能。
5. 验证确保项目遵守我们的 [HTML](http://udacity.github.io/frontend-nanodegree-styleguide/index.html)、 [CSS](http://udacity.github.io/frontend-nanodegree-styleguide/css.html)、[JavaScript](http://udacity.github.io/frontend-nanodegree-styleguide/javascript.html) and [Git](https://udacity.github.io/git-styleguide/) 样式指南。