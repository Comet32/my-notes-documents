# 课程 2：创建 Git 仓库

> 你已经了解版本控制的优势并安装了 GIt，现在改学习如何创建仓库了。

[TOC]

## 1. 简介  

在本课中，你将学习如何创建自己的 git 仓库。如果没有一个 repo 我们就没法进行任何操作，repo 就是 repository 的简称。记得将术语列表放在旁边作为参考。

在本课中学习三个 git 命令，git init、git clone 和 git status。

- 使用 git init 你可以在计算机上从头创建全新仓库。
- 使用 git clone 你可以将一个现有仓库从其他地方克隆或复制到本地计算机上。
- 你还将了解掌握仓库状态是何等重要，你将学习使用 git status 命令来查看仓库状态。

这三个命令很简单，但它们正在让我们走上掌握版本控制的征服之旅。



## 2. 从头创建仓库 init

**在对 Git 仓库进行 commit 或执行任何其他操作之前，需要一个实际存在的仓库。要使用 Git 新建一个仓库**，我们将使用 `git init` 命令。

`init` 子命令是"initialize"（初始化）的简称，这个命令很有用，因为**它将进行所有仓库初始设置**。稍后我们将了解它的作用。

### 所需的命令

注意！我们将在这节课使用以下终端命令：

- `ls` - **用来列出文件和目录** （List files）
- `mkdir` - **用来新建目录** （Make directory）
- `cd` - **用来更改目录** （change directory)
- `rm` - **用来删除文件和目录** (Remove file)

如果你不知道如何使用它们，请参阅我们的 [Linux 命令行基础](https://www.udacity.com/course/linux-command-line-basics--ud595) 课程！

我们还会涉及的一个概念是当前目录，即你的 shell 正在查看的目录。使用 cd 可以更改**工作目录**，使用 `ls`（单独使用）会列出工作目录下的文件。如果你忘记 shell 的当前工作目录，**可以使用 `pwd` 命令（表示 print working directory 输出工作目录）**输出该目录的名称。

### 创建课程目录

我们将为本课程新建一个项目。**因为我们都是专业人士，因此我们希望我们的项目具有条理性**。如果你已经在计算机上有一个放置所有项目的文件夹，则可以继续这么做。我会将所有的工作文件存储在目录 `udacity-git-course`下。

如果你想跟着我一起操作：

- 创建一个目录，叫做 `udacity-git-course`
- 在该目录中，创建另一个目录，叫做 `new-git-project`
- 使用 `cd` 命令移到 `new-git-project` 目录下

如果你和我一样喜欢复制粘贴，则在终端上运行以下命令：- `mkdir -p udacity-git-course/new-git-project && cd $_`（在运行此命令前，确保使用 `cd` 命令转到你想将这些文件存储到的位置。例如，如果你想将文件存储到桌面上，则使用 `cd` 转到桌面，然后再运行该命令。）

一切准备好后，你的终端应该位于 `new-git-project` 目录中，并看起来如下所示：

[![img](assets/0de30e40-bfd7-449d-b2a1-0e7810f6dbdf-1528112255986)*位于 new-git-project 目录下的终端应用。*](https://classroom.udacity.com/courses/ud123/lessons/437a88fc-15f5-48b8-a6a5-0cf3347e6183/concepts/fa8f761a-d0a2-4be1-a5b9-60116ea4ecd1#)

### git init

很棒！我们已经准备好，并且可以开始使用 `git init` 命令了！

这是最简单的命令之一。你只需在终端上运行 `git init`。就这么多内容，立即试试吧！

[![img](assets/58292ea6-c844-4ca3-8747-60237fb42a3f-1528112255979)*终端显示 git init 命令正在运行。该命令会在当前目录下初始化生成一个空的 Git 仓库。*](https://classroom.udacity.com/courses/ud123/lessons/437a88fc-15f5-48b8-a6a5-0cf3347e6183/concepts/fa8f761a-d0a2-4be1-a5b9-60116ea4ecd1#)

### 练习题

运行 `git init` 了吗？如果没有，现在就运行吧，因为这道练习会用到该命令！

运行 `git init` 之后，应该会出现一段文字："Initialized empty Git repository in"，后面是一个路径。问题是，提示符有任何改变吗？如果有改变，是什么？

- √ 是的，我看到单词 master 了。
- 没有，看起来完全一样。



### git init 命令的作用

运行 `git init` 命令会初始化 Git 跟踪所有内容会用到的所有必要文件和目录。所有这些文件都存储在叫做 `.git`（注意开头有个 `.`，表示在 Mac/Linux 上，它将是一个隐藏目录）的目录下。这个 `.git` 目录是一个库！Git 会将所有 commit 记录在这里，并跟踪所有内容！

我们来大致了解下 `.git` 目录下的内容。

> 警告：请勿直接修改 `.git` 目录下的任何文件。这是仓库的核心。如果你更改了文件名或文件内容，Git 可能就无法跟踪你保存在仓库中的文件，你可能会丢失很多内容！可以查看这些文件，但是请勿编辑或删除这些文件。

[![img](assets/7921efd7-f050-42e2-8a70-e4f909554c05-1528112255992)*Mac 的 Finder 窗口正在显示“.git”隐藏目录中的内容。*](https://classroom.udacity.com/courses/ud123/lessons/437a88fc-15f5-48b8-a6a5-0cf3347e6183/concepts/fa8f761a-d0a2-4be1-a5b9-60116ea4ecd1#)

### .git 目录内容

*我们将查看 .git 目录…对这门课程来说，该目录并不重要，因此不用记住任何内容，你可以在此处深入了解 Git 背后的工作原理。*

下面简要概述了 `.git` 目录下的各项内容：

- **config 文件** - 存储了所有与项目有关的配置设置。

摘自于 [Git Book - 英](https://git-scm.com/book/en/v2/Customizing-Git-Git-Configuration) | [中文点此处](https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-%E9%85%8D%E7%BD%AE-Git)：

> Git 会查看 Git 目录下你当前所使用仓库对应的配置文件（.git/config）中的配置值。这些值仅适用于当前仓库。

例如，假设你将 Git 全局配置为使用你的个人电子邮箱。如果你想针对某个项目使用你的工作邮箱，则此项更改会被添加到该文件中。

- **description 文件** - 此文件仅用于 GitWeb 程序，因此可以忽略

- **hooks 目录** - 我们会在此处放置客户端或服务器端脚本，以便用来连接到 Git 的不同生命周期事件

- **info 目录** - 包含全局排除文件

- **objects 目录** - 此目录将存储我们提交的所有 commit

- **refs 目录** - 此目录存储了指向 commit 的指针（通常是“分支”和“标签”）

注意，除了 hooks 目录，你应该不会对这里的其他内容有太多的困扰。hooks 目录可以用来连接到 Git 工作流的不同部分或事件，但是在这门课程中，我们不会对此作过多介绍。

### 深入研究

- Git 内部原理 - 底层命令和高层命令 : [英](https://git-scm.com/book/en/v2/Git-Internals-Plumbing-and-Porcelain) | [中](https://git-scm.com/book/zh/v2/Git-%E5%86%85%E9%83%A8%E5%8E%9F%E7%90%86-%E5%BA%95%E5%B1%82%E5%91%BD%E4%BB%A4%E5%92%8C%E9%AB%98%E5%B1%82%E5%91%BD%E4%BB%A4)（进阶内容——请将此网址添加到书签中，并在以后查看）
- [自定义 Git - Git Hooks - 英](https://git-scm.com/book/en/v2/Customizing-Git-Git-Hooks) | [中](https://git-scm.com/book/zh/v2/%E8%87%AA%E5%AE%9A%E4%B9%89-Git-Git-%E9%92%A9%E5%AD%90)

### git init 小结

使用 `git init` 命令可以在当前目录下创建新的空仓库。

```
$ git init
```

运行此命令可以创建隐藏 `.git` 目录。此 `.git` 目录是仓库的核心/存储中心。它存储了所有的配置文件和目录，以及所有的 commit。

### 实用链接

- [Git 基础 - 获取 Git 仓库 - 英](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository#Initializing-a-Repository-in-an-Existing-Directory) | [中](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%8E%B7%E5%8F%96-Git-%E4%BB%93%E5%BA%93)
- [git init 文档 - 英](https://git-scm.com/docs/git-init)
- [git init 教程 - 英](https://www.atlassian.com/git/tutorials/setting-up-a-repository)



## 3. 为何要克隆？

首先，什么是克隆？

> 制作完全相同的副本

制作完全相同的副本有什么意义，这与 Git 和版本控制有何关系？

你为何要创建一个完全相同的副本？当我在创建新的 Web 项目时，我会执行以下步骤：

- 创建一个 `index.html` 文件
- 创建一个 `js` 目录
- 创建一个 `css` 目录
- 创建一个 `img` 目录
- 在 css 目录下创建 `app.css`
- 在 js 目录下创建 `app.js`
- 在 `index.html` 中添加起始 HTML 代码
- 为代码检查添加配置文件（验证代码语法）
- [HTML 代码检查](http://htmlhint.com/)
- [CSS 代码检查](https://stylelint.io/)
- [JavaScript 代码检查](http://eslint.org/)
- [配置我的代码编辑器](http://editorconfig.org/)

...每次新建一个项目，我都执行这些步骤！其实花费了很多精力，我不想不断重复执行同一步骤，因此我最后一次执行了上述列出的所有步骤，并为我自己创建了一个起始项目。现在，当我新建项目时，我只需制作一个与起始项目完全相同的副本！

在 Git 上进行克隆的方法是调用我们将在终端上运行的命令 `git clone`，然后传入要克隆的 Git 仓库的路径（通常是 URL）。

想要尝试克隆一个现有的项目？我们来看看如何使用 Git 的 `clone` 命令！

### 验证终端位置

> 提示：在克隆任何内容之前，确保命令行工具已定位于正确的目录下。克隆项目会新建一个目录，并将克隆的 Git 仓库放在其中。问题是无法创建嵌套的 Git 仓库。因此，确保终端的当前工作目录没有位于 Git 仓库中。如果当前工作目录没有在 shell 的提示符中显示，输入 `pwd` 输出工作目录。

### 克隆 blog 仓库

#### 准备好了？我们开始克隆吧！

输入命令 `git clone`，然后输入你要克隆的 Git 仓库的路径。我们将在这门课程中一直使用的项目位于以下 URL 上：<https://github.com/udacity/course-git-blog-project> 。因此，使用该 URL 克隆 Blog 项目的完整命令是：

```
$ git clone https://github.com/udacity/course-git-blog-project
```

**温馨提醒：** 复制上述代码时，记得去掉 `$` 。

[![img](assets/7ec3894b-420f-42f2-8549-6ea9361e801e)*git clone 命令被用于将 blog 项目仓库复制到当前目录的 course-git-blog-project 文件夹中。*](https://classroom.udacity.com/courses/ud123/lessons/437a88fc-15f5-48b8-a6a5-0cf3347e6183/concepts/59082be0-c1af-4839-8ae5-0a182dc5bfe8#)

### git clone 输出结果的简要说明

我们简要地介绍下 `git clone` 显示的输出结果。

第一行是"Cloning into 'course-git-blog-project'…"。Git 正在创建一个目录（名称与我们要克隆的项目一样），并将仓库放在其中…很酷！

其余输出结果基本都是验证信息——也就是统计远程仓库的项目数，然后压缩并接收这些项目，并解压。

### 克隆项目并使用不同的名称

你刚刚克隆了本课程的 blog 项目。很棒！

你在终端中运行的命令是：

```
$ git clone https://github.com/udacity/course-git-blog-project
```

...它创建了一个叫做 `course-git-blog-project` 的目录

如果你想使用除默认名外的其他名称呢？没问题，只需运行上述命令并在 Finder/Windows Explorer 中手动重命名或在终端上使用 `mv` 重命名即可。但是步骤还是太多了！我们希望一次性地克隆项目并使用不同的名称，如何实现呢？

#### 练习题

请参阅 [`git clone` 文档 - 英](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository#Cloning-an-Existing-Repository) | [中](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%8E%B7%E5%8F%96-Git-%E4%BB%93%E5%BA%93) 并从以下选项中选择正确的答案。命令应该克隆 blog 项目仓库并将其存储在叫做 `blog-project` 的目录下。

- git clone-new-dir <https://github.com/udacity/course-git-blog-project> blog-project
- git clone <https://github.com/udacity/course-git-blog-project> --out blog-project
- git clone <https://github.com/udacity/course-git-blog-project> --rename blog-project
- √ git clone <https://github.com/udacity/course-git-blog-project> blog-project



### 不在 Git 仓库中？

> 警告：当你第一次使用 Git 时，经常会忽略一个非常重要的步骤。在使用 `git clone` 命令克隆仓库时，它会为仓库新建一个目录...你已经知道这一点。**但是，它不会改变 shell 的工作目录。它会在当前工作目录下创建新的仓库，意味着当前工作目录依然不在这个新的 Git 仓库里！确保使用 `cd` 命令切换到新的仓库中。**

> 注意，根据终端的提示符进行判断，**如果你位于 Git 仓库目录下，提示符将包含一个用小括号括起来的名称。**

[![img](assets/85c1ac0b-5115-4ffe-8b81-bf28de808c31)*Mac 的终端应用。终端显示了起始目录。*](https://classroom.udacity.com/courses/ud123/lessons/437a88fc-15f5-48b8-a6a5-0cf3347e6183/concepts/59082be0-c1af-4839-8ae5-0a182dc5bfe8#)

[![img](assets/24975c7d-d8ff-4d8a-90c4-2de9f8a33621)*Mac 的终端应用。终端使用 cd 命令从基础目录转移到 Git 仓库 course-git-blog-project 下。*](https://classroom.udacity.com/courses/ud123/lessons/437a88fc-15f5-48b8-a6a5-0cf3347e6183/concepts/59082be0-c1af-4839-8ae5-0a182dc5bfe8#)

### 查看项目

你已经将项目克隆到计算机上，并使用 `cd` 转移到该项目中。是不是该在浏览器中查看下该项目的外观了？

在你喜欢的浏览器中打开 `index.html` 文件。

[![img](assets/3fec3c5a-6c53-4bd4-be04-21a32e36db7b)*在 Chrome 中打开的 blog 项目。*](https://classroom.udacity.com/courses/ud123/lessons/437a88fc-15f5-48b8-a6a5-0cf3347e6183/concepts/59082be0-c1af-4839-8ae5-0a182dc5bfe8#)

### git clone 小结

`git clone` 命令用于创建一个与现有仓库完全相同的副本。

```
$ git clone <path-to-repository-to-clone>
```

该命令：

- 会获取现有仓库的路径
- 默认地将创建一个与被克隆的仓库名称相同的目录
- **可以提供第二个参数，作为该目录的名称**
- 将在现有工作目录下创建一个新的仓库

### 实用链接

- [克隆现有仓库 - 英](https://git-scm.com/book/en/v2/Git-Basics-Getting-a-Git-Repository#Cloning-an-Existing-Repository) | [中](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%8E%B7%E5%8F%96-Git-%E4%BB%93%E5%BA%93)
- [git 克隆文档 - 英](https://git-scm.com/docs/git-clone)
- [git 克隆教程 - 英](https://www.atlassian.com/git/tutorials/setting-up-a-repository)

### 状态更新

到目前为止，我们已经有了两个 Git 仓库：

- 使用 `git init` 命令创建的空仓库
- 使用 `git clone` 命令克隆的仓库

如何查找关于这些仓库的任何信息？Git 在管理着它们，但是如何了解 Git 知道多少关于这些仓库的信息？要了解仓库的状况，我们需要使用 `git status` 命令。知道 Git 仓库的状况非常重要，因此让我们进入下节内容：判断仓库的状态。



## 4. 判断仓库的状态

在命令行中使用 Git 可能会有点挑战，因为它有点类似于[黑箱 - 维基百科 - 英](https://en.wikipedia.org/wiki/Black_box) | [黑箱理论 - 百度百科 - 中](https://baike.baidu.com/item/%E9%BB%91%E7%AE%B1%E7%90%86%E8%AE%BA/7987518?fr=aladdin)。如何判断你是否需要运行某些 Git 命令？ Git 是否已经准备好运行某个命令？ 如果我运行了一个命令，但我认为它并未被执行，我该如何进行验证呢？ `git status` 命令可以回答所有这些问题！

```
$ git status
```

`git status` 是了解 Git 的核心所在。它将告诉我们 Git 正在考虑什么，以及 Git 所看到的我们仓库的状态。当你第一次使用 Git 时，你应该一直都要使用 `git status` 命令！**说真的，你应该习惯于运行任何其他命令之后，都运行下该命令。这样可以帮助你了解 Git 的工作原理，并避免你对文件 / 仓库状态做出不正确的推论。**

### 习题 1/2

回答这道练习题前，确保你已经使用 `cd` 命令转到 `course-git-blog-project` 项目中。如果你一直跟着这节课的步骤操作，并且没有向此项目添加任何文件，那么运行 `git status` 的显示结果是什么？

- Status: good
- On branch master 
  Your branch is up-to-date with 'origin/master'.
  Initial commit 
  nothing to commit (create/copy files and use "git add" to track)
- master branch 
  Please commit some files
- √ On branch master 
  Your branch is up-to-date with 'origin/master'.
  nothing to commit, working directory clean

提交

### git status 输出结果

`git status` 命令将显示很多信息，具体取决于你的文件状态、工作目录和仓库。但是你不需要过于关心这些内容…只需运行 `git status`，它将显示你需要知道的信息。

[![img](assets/3b2f09ef-b39e-4aa3-a8cb-26e8c13773b2)*终端应用的 GIF 动画。在 course-git-blog-project 项目中运行git status 命令。*](https://classroom.udacity.com/courses/ud123/lessons/437a88fc-15f5-48b8-a6a5-0cf3347e6183/concepts/ce648229-7d6c-4ad3-805e-af6a77f38fd0#)

### git status 说明

正如你在上面的 GIF 中所看到的，在 `course-git-blog-project` 项目中运行 `git status` 将产生以下输出结果：

```
On branch master
Your branch is up-to-date with 'origin/master'.
nothing to commit, working directory clean
```

输出结果告诉了我们两条信息：

1. `On branch master` – 这部分告诉我们 Git 位于 `master` 分支上。你已在术语表中获取了对分支的介绍，那么这是"master"分支（也就是默认分支）。我们将在第 5 节课深入了解分支。
2. `Your branch is up-to-date with 'origin/master'.` – 因为我们使用 `git clone` 从另一台计算机上复制了此仓库，因此这部分告诉我们项目是否与所复制的仓库保持同步状态。我们不会在其他计算机上处理该项目，因此这一行可以忽略。
3. `nothing to commit, working directory clean` – 表示没有任何待定的更改。

可以将这一输出结果看作“休息状态（resting state）”（这并不是官方解释，只是我喜欢这么理解！）。因为没有新的文件、没有对文件作出更改、暂存区没有任何需要 commit 的内容……没有更改或操作，因此我喜欢将其称为休息状态。

这就是在已经具有 commit 的仓库中运行 `git status` 之后的状态。我们切换到 `new-git-project` 项目，看看 `git status` 输出结果是什么。

### 习题 2/2

回答这道练习题前，确保你已经使用 `cd` 命令转到 `new-git-project` 项目。

如果你一直跟着这节课的步骤操作，并且没有向此项目添加任何文件，则运行 `git status` 会显示什么？

- Status: good
- √ On branch master 
  Initial commit 
  nothing to commit (create/copy files and use "git add" to track)
- master branch 
  Please commit some files
- On branch master 
  nothing to commit, working directory clean

提交

[![img](assets/02a6d897-7cba-4523-b44e-0f20c3372a20)*终端应用的 GIF 动画。git status 命令在 new-git-project 项目中运行。*](https://classroom.udacity.com/courses/ud123/lessons/437a88fc-15f5-48b8-a6a5-0cf3347e6183/concepts/ce648229-7d6c-4ad3-805e-af6a77f38fd0#)

#### 💡 Git v2.14 版本的改变 💡

> 在 Git version 2.14 版本中，在一个空目录中运行 `git status` 命令的结果中，将 "Inital commit"（初始提交）的用词，改为更清晰明了的 "No commits yet"（尚未有任何提交），所以输出将会是：
>
> ```
> On branch master
> 
> No commits yet
> 
> nothing to commit (create/copy files and use "git add" to track)
> ```

### 新仓库中的 git status 说明

这是在 `new-git-project` 项目中运行 `git status` 后的输出结果：

```
$ git status
On branch master

Initial commit

nothing to commit (create/copy files and use "git add" to track)
```

澄清一下，我尚未在我的项目中提交任何 commit。如果你提交了 commit，那么你的输出结果应该看起来和 course-git-blog-project 项目中的完全一样。

如果你将此结果与 course-git-blog-project 项目的 `git status` 输出结果进行对比，你会发现它们很相似。不同之处在于这个输出结果包含 `Initial commit`。这有点让人困惑，因为此仓库中尚无任何 commit！我们还未学习如何进行 commit，但是当我们进行学习时，我们将能够提交初始 commit。

想要提前了解下下节课的内容，同时证明此仓库尚无任何 commit？我就知道你想试试！试着运行命令 `git log`，并查看其输出结果：

```
$ git log
fatal: your current branch 'master' does not have any commits yet
```

看起来有点可怕。“Fatal(致命)”？幸运的是，这仅仅意味着 Git 程序正在退出，因为它没有任何需要完成的任务。Git 将此情况视为错误，但这并不是一个问题。因为我们知道自己尚未在此仓库中提交任何 commit。

从输出结果可以清晰地看出没有任何 commit！

我们刚刚简单地了解了 `git status` 命令。**`git status` 的输出结果将有所不同，具体取决于文件是否被添加/删除/修改、暂存索引的情况，以及仓库的状态。**我们将在整个课程中持续使用 `git status` 命令，因此请熟练掌握该命令！

### git status 小结

`git status` 命令将显示仓库的当前状态。

```
$ git status
```

我一直在强调这个命令非常的重要，因为这是你第一次使用 Git。该命令将：

- 告诉我们已在工作目录中被创建但 Git 尚未开始跟踪的新文件
- Git 正在跟踪的已修改文件
- 以及我们将在这门课程的后续阶段学习的很多其他信息 ;-)。

### 拓展链接

- [查看文件的状态 - 英](https://git-scm.com/book/en/v2/Git-Basics-Recording-Changes-to-the-Repository#Checking-the-Status-of-Your-Files) | [中](https://git-scm.com/book/zh/v2/Git-%E5%9F%BA%E7%A1%80-%E8%AE%B0%E5%BD%95%E6%AF%8F%E6%AC%A1%E6%9B%B4%E6%96%B0%E5%88%B0%E4%BB%93%E5%BA%93)
- [git status 文档 - 英](https://git-scm.com/docs/git-status)
- [git status 教程 - 英](https://www.atlassian.com/git/tutorials/inspecting-a-repository/git-status)

