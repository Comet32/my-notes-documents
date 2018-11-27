# X. Readable 项目

> 利用所学的新技能并使用 Redux 构建匿名内容和评论应用。借助强大的 Redux 在单个位置更新应用的状态。

[TOC]

---

## X.1 项目概述

### 项目概述

对于 **Readable** 项目，你将构建一个内容和评论网页应用。用户将能够向预定义的类别中发布内容，对自己和其他用户的帖子发表评论，并对帖子和评论评分。用户还将能够编辑和删除帖子及评论。

### 为何要完成项目？

这种内容和评论结构在很多网站和应用上都很常见，包括新闻网站和博客帖子以及 Hacker News 和 Reddit 等内容整合网站。通过构建此项目，你将了解 Redux 可以在标准类型的应用中如何发挥作用。

### 规范

你将从[本地后端开发服务器](https://github.com/udacity/reactnd-project-readable-starter)开始。该服务器在 Node 中构建而成，但是很简单。你不需要编辑服务器代码；你的代码将使用记录的 API 端点与服务器通信。你可以使用服务器的端点管理存储、读取、更新和删除应用数据操作。

你将使用该服务器构建应用的 React/Redux 前端。下面提供的规范是该项目至少满足的条件。但是你可以扩展该项目，只要满足最低规范即可。

### 数据

服务器上存储了三种类型的对象：

- 类别
- 帖子
- 评论

#### 类别

服务器支持一小部分固定数量的类别，用户可以在里面发布帖子。类别是包含名称和 URL 路径的简单对象（通常是相同的字符串）。服务器没有用于创建/修改/删除这些类别的方法。如果你想向应用中添加类别，只需在所提供服务器的 `categories.js` 中的数组中添加所需的对象即可。

#### 帖子

帖子是该应用的基本组成元素。帖子包括：

| 属性      | 类型    | 说明                                                         |
| --------- | ------- | ------------------------------------------------------------ |
| id        | String  | 唯一标识符                                                   |
| timestamp | Integer | 创建时间 - 数据默认地采用 [Unix 时间](https://en.wikipedia.org/wiki/Unix_time)。你可以使用 `Date.now()` 获取这一数字 |
| title     | String  | 帖子标题                                                     |
| body      | String  | 帖子正文                                                     |
| author    | String  | 帖子作者                                                     |
| category  | String  | 应该是服务器提供的其中一种类别                               |
| voteScore | Integer | 帖子收到的最终投票数（默认为 1）                             |
| deleted   | Boolean | 标记帖子是否被删除了（无法在前端访问，默认为 false）         |

#### 评论

评论附加到父帖子上。包括：

| 属性          | 类型    | 说明                                                         |
| ------------- | ------- | ------------------------------------------------------------ |
| id            | String  | 唯一标识符                                                   |
| parentId      | String  | 父帖子的 id                                                  |
| timestamp     | Integer | 创建时间 - 数据默认地采用 [Unix 时间](https://en.wikipedia.org/wiki/Unix_time)。你可以使用 `Date.now()` 获取这一数字 |
| body          | String  | 评论正文                                                     |
| author        | String  | 评论作者                                                     |
| voteScore     | Integer | 帖子收到的最终投票数（默认为 1）                             |
| deleted       | Boolean | 标记评论是否被删除了（无法在前端访问，默认为 false）         |
| parentDeleted | Boolean | 表示父帖子被删除，但是评论本身没有被删除。                   |

> 该应用是匿名的，不需要身份验证或授权。没有用户对象，评论和帖子接受创建和编辑任何用户名/名称。
>
> 服务器规模非常小，它不会对上述数据类型进行任何验证。在向服务器发送请求时，确保使用正确的类型。

### 视图

应该应该至少具有四个视图：

- Default (Root)
  - 应该列出所有可用的类别，并链接到该类别的 Category View
  - 应该列出所有的帖子，按 voteScore（由高到低）排序
  - 应该具有控件来更改列表排序方法，至少包括按 voteScore 和时间戳排序
  - 应该包括添加新帖子的控件
- Category View 
  - 与默认视图相同，但是仅经过过滤，包括所选类别的帖子
- Post Detail View 
  - 应该显示帖子的详情，包括：标题、正文、作者、时间戳（用户可读的格式），以及投票分数
  - 应该列出该帖子的所有评论，按 voteScore（从高到底）排序
  - 应该具有按得分或时间戳对评论重新排序的控件
  - 应该具有编辑或修改帖子的控件
  - 应该具有添加新评论的控件
  - 按照你想要的方式实现评论（内嵌、模态，等）
  - 评论也应该具有修改或删除控件
- Create/Edit View 
  - 应该具有表格来创建新帖子或编辑现有帖子
  - 编辑时，现有数据应该填充到该表格中

> **Post/Comment UI**
>
> 所有视图中显示的帖子和评论应该显示当前的得分，并且具有控件来增加或降低该对象的 `voteScore` 。 帖子应该显示与该帖子相关的评论数量。

### 具体要求

**使用 React 构建应用 UI。**注意，合成是关键。将组件拆分为多个更小的部分基本不会错。寻找重复利用组件的机会。建议使用 `create-react-app` 形成项目框架，但并非此项目的必要条件。

虽然此项目的重点（和规范）是功能性，而不是外观，但是确保应用达到一定的美观性，并且易于导航。

**使用 Redux 管理应用状态。** 包括 API 服务器上的所有用户 action 和响应。不得让组件处理状态。应用的所有状态都应由 reducer 控制。

> 在生产环境中，有时候需要让组件拥有自己的状态。因为该项目的目的是评估你对实现 Redux 代码的掌握情况，因此该项目不能这么做。



## X.2 项目提交说明

### 提交说明

1. 下载或分叉并克隆[起始服务器资源库](https://github.com/udacity/reactnd-project-readable-starter)
2. 从所含的`package.json` 文件中安装必须的程序：`npm install`
3. 使用 `node server` 运行服务器 *你可以在 README 中找到服务器的 API 文档，或者当服务器在运行时向服务器根目录发送 GET 请求。* 在单独的文件夹中开发 Readable 应用。你可以使用 `create-react-app` 作为应用程序的引导程序，或者自己安装和配置 React、Webpack 及 Babel。同时记得安装 `redux` 和 `react-redux`。
4. 经常参考项目[审核标准](https://review.udacity.com/#!/rubrics/1202/view)。它是项目规范的参考标准。
5. 验证确保项目遵守我们的 [HTML](https://github.com/udacity/frontend-nanodegree-styleguide-zh/blob/master/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%B8%88%E7%BA%B3%E7%B1%B3%E5%AD%A6%E4%BD%8D%E6%A0%B7%E5%BC%8F%E6%8C%87%E5%8D%97%20-%20HTML%20.md)、[CSS](https://github.com/udacity/frontend-nanodegree-styleguide-zh/blob/master/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%B8%88%E7%BA%B3%E7%B1%B3%E5%AD%A6%E4%BD%8D%E6%A0%B7%E5%BC%8F%E6%8C%87%E5%8D%97%20-%20CSS.md)、[JavaScript](https://github.com/udacity/frontend-nanodegree-styleguide-zh/blob/master/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%B8%88%E7%BA%B3%E7%B1%B3%E5%AD%A6%E4%BD%8D%E6%A0%B7%E5%BC%8F%E6%8C%87%E5%8D%97%20-%20JavaScript.md) 和 [Git](https://github.com/udacity/frontend-nanodegree-styleguide-zh/blob/master/%E5%89%8D%E7%AB%AF%E5%B7%A5%E7%A8%8B%E5%B8%88%E7%BA%B3%E7%B1%B3%E5%AD%A6%E4%BD%8D%E6%A0%B7%E5%BC%8F%E6%8C%87%E5%8D%97%20-%20Git.md) 样式指南。