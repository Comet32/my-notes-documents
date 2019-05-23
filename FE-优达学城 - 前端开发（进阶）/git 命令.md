[TOC]

## 终端命令

- `ls` - **用来列出文件和目录** （List files）
  - `ls` 命令具有 `-l` 选项 （即 `ls -l`），**它会运行相同的 `ls` 命令，但是会更改其工作方式；它会显示 *long* 格式的信息（`-l` 表示 *long*）**。
- `mkdir` - **用来新建目录** （Make directory）
- `cd` - **用来更改目录** （change directory)
- `rm` - **用来删除文件和目录** (Remove file)
- `pwd`  - **输出该目录的名称。（表示 print working directory 输出工作目录）**



## git 命令

- `git init` - 在当前目录下创建新的空仓库。

- `git clone` - 用于创建一个与现有仓库完全相同的副本。

  -  `git clone <https://github.com/udacity/course-git-blog-project> blog-project`

- `git status`  - 用于查看 git 状态，输出结果将有所不同，具体取决于文件是否被添加/删除/修改、暂存索引的情况，以及仓库的状态。

  - UDACITY 提示：**说真的，你应该习惯于运行任何其他命令之后，都运行下该命令。这样可以帮助你了解 Git 的工作原理，并避免你对文件 / 仓库状态做出不正确的推论。**

- `git log` 用于显示有关现有提交的信息。

  - `git log --oneline` - 用于更改 `git log` 显示信息的方式
    - 每行显示一个 commit；
    - 显示 commit 的 SHA 的前 7 个字符；
    - 显示 commit 的消息。
  - `git log -p` - 用来更改 `git log` 显示信息的方式：
    - 显示被修改的文件
    - 显示添加/删除的行所在的位置
    - 显示做出的实际更改
  - `$ git log -p fdf5493` - 显示在所提供的 SHA 之前提交的所有 commit 信息
  - `git log --stat`  - 用来显示 commit 中更改的文件以及添加或删除的行数。
  - 如果你不习惯在命令行上使用分页器，那么 [less(英)](https://en.wikipedia.org/wiki/Less_(Unix)) 用起来会比较奇怪。以下是一些实用技巧：
    - 要**向下**滚动，按下
    - `j` 或 `↓` 一次向下移动一行
    - `d` 按照一半的屏幕幅面移动
    - `f` 按照整个屏幕幅面移动
    - 要 **向上**滚动，按上
    - `k` 或 `↑` 一次向上移动一行
    - `u` 按照一半的屏幕幅面移动
    - `b` 按照整个屏幕幅面移动
    - 按下 `q` 可以**退出**日志（返回普通的命令提示符）
  - `git log --decorate` - 显示默认视图隐藏起来的一些详情。（git log 自带）
  - `git log --oneline --decorate --graph --all` - 查看分支并带有指示图

- `git show` - 命令可以显示有关给定提交的信息。对于这个命令，你需要向其提供提交 ID，也被称为 SHA，该命令就会显示有关这一提交的信息

  - `--stat` - 显示更改了多少文件，以及添加/删除的行数
  - `-p` 或 `--patch` - 显示默认补丁信息，但是如果使用了 `--stat`，将不显示补丁信息，因此传入 `-p` 以再次添加该信息
  - `-w` - 忽略空格变化

- `git add`- 可以让你将文件从工作目录添加到暂存区中

  - `git add .` - 句点指代当前目录，可以用来表示所有文件和目录（包括所有嵌套文件和目录！）。
  - `git add <file>` 可以暂存指定文件，比如：
    - `git add css/app.css js/app.js`
  - 

- `git commit` - 可以让你将文件从暂存区中取出并保存在仓库区，也就是你实际将要提交的地方

  - `git commit -m "Initial commit"` - 用 `-m` 选项绕过编辑器

- `git diff` - 命令非常好用，你可能对它非常熟悉，因为你之前已经看过它的输出了。`git diff` 可以显示文件两个版本之间的差异。它的输出与上节课中使用的 `git log -p` 命令的输出完全一样。

- `git rm --cached` 与 shell 的 `rm` 命令不同。**`git rm --cached` 不会破坏任何属于你的文件，它只是从暂存区删掉了文件。**

- `.gitignore` 文件 - 用来告诉 git 不应跟踪的文件。该文件应该放在 `.git` 目录所在的目录。

  - 通配符允许你使用特殊的字符来表示某些格式/字符。在 `.gitignore` 文件中，你可以使用：

    - 空白行作为空格
    - `#` - 将行标记为注释
    - `*` - 与 0 个或多个字符匹配
    - `?` - 与 1 个字符匹配
    - `[abc]` - 与 a、b 或 c 匹配
    - `**` - 与嵌套目录匹配 - `a/**/z` 与以下项匹配
      - a/z
      - a/b/z
      - a/b/c/z

  - 示例：

    - 因此如果所有 50 个图片都是 JPEG 图片，并且位于"samples"文件夹中，那么我们可以向 `.gitignore` 中添加以下行，使 git 忽略所有这 50 个图片。

      ```
      samples/*.jpg
      ```

- 使用 `git tag` 你可以为特定提交添加标签，标签是提交的额外标记，**可以<u>指示有用信息</u>**，比如这是 beta 版本。

  - 在命令 `git tag -a v1.0` 中，使用了 `-a` 选项。该选项告诉 git 创建一个带注释的标签。如果你没有提供该选项（即 `git tag v1.0`），那么它将创建一个轻量级标签。

    建议使用带注释的标签，因为它们包含了大量的额外信息，例如：

    - 标签创建者
    - 标签创建日期
    - 标签消息

    因此，你应该始终使用带注释的标签。

  - **只需输入 `git tag`，命令行会显示仓库中的所有标签。**

  - `git tag -d v1.0`  - 用于删除 git 标签，`v1.0` 是要删除的标签名。

  - `$ git tag -a v1.0 a87984` - 在最后添加 commit 的 SHA 就可指定 commit 添加 tag

- 使用 `git branch` 你可以创建分支，**用于并行开发项目的不同功能而不会对哪些提交属于哪个功能感到困惑。**

  - `git brach` - 查看先有分支（ * 表示哪一个是活跃分支）
  - `git brach <brach-name>` - 创建分支（注意：创建分支并不会将 HEAD 指向这个分支）：
    - 示例：`git branch sidebar`
    - 创建 `alt-sidebar-loc` 分支并使其指向 SHA 为 `42a69f` 的 commit
      - `git branch alt-sidebar-loc 42a69f`
  - `git branch -d sidebar` - 删除分支（**注意，无法删除当前所在的分支**）
    - `git branch -D sidebar` - `-D` 为强制删除

- 使用 `git checkout` 你可以在不同的分支和标签之间进行切换

  - 示例：`git checkout sidebar` （将 HEAD 指向 sidebar）
  - commit 会提交到 HEAD 所指向的分支（HEAD 表示当前分支（即活跃分支））
  - 该命令的工作方式。运行该命令将：
    - 从工作目录中删除 git 跟踪的所有文件和目录
      - (git 跟踪的文件存储在仓库中，因此什么也不会丢失)
    - 转到仓库，并提取分支指向的 commit 所对应的所有文件和目录

- `git merge` 非常有用，你可以使用它将不同分支上的更改自动合并在一起

  - 示例： `git merge sidebar`
  - **当 git 不确定你要使用即将合并的分支中的哪些行时，就会出现合并冲突。因此我们需要在两个不同的分支上修改同一行，然后重设合并它们。**
  - 编辑器具有以下合并冲突指示符：
    - `<<<<<<< HEAD` 此行下方的所有内容（直到下个指示符）显示了当前分支上的行
    - `||||||| merged common ancestors` 此行下方的所有内容（直到下个指示符）显示了原始行的内容
    - `=======` 表示原始行内容的结束位置，之后的所有行（直到下个指示符）是被合并的当前分支上的行的内容
    - `>>>>>>> heading-update` 是要被合并的分支（此例中是 `heading-update` 分支）上的行结束指示符
  - git 使用合并冲突指示符来告诉你两个不同分支上的哪些行导致了合并冲突，以及原始行是什么。要解决合并冲突，你需要：
    1. 选择保留哪些行
    2. 删掉所有带指示符的行
  - 当相同的行在要合并的不同分支上做出了更改时，就会出现合并冲突。git 将在合并途中暂停，并告诉你存在冲突，以及哪些文件存在冲突。要解决文件中的冲突：
    - 找到并删掉存在合并冲突指示符的所有行
    - 决定保留哪些行
    - 保存文件
    - 暂存文件
    - 提交 commit

- 使用 `git commit --amend` 可以更改最近的提交，如果你在提交中忘记包含某个问文件，或在提交说明中打错了字，就需要调用该命令。

  - 你可以修改最后一个 commit（更新所有其他链接颜色的 commit）以包含这个忘记的链接。要包含忘记的链接，只需：
    - 编辑文件
    - 保存文件
    - 暂存文件
    - 运行 `git commit --amend`
  - `git commit --amend` 用来更新最近的 commit，而不是创建新的 commit。

- 使用 `git revert` 并向 Git 提供需要还原提交的 SHA，比如 `git revert ac3f78`，就能撤销在该提交中作出的更改。同时，在该提交中添加的行将被删除。

- 使用 `git reset` 你刻意删除提交，不过你不能随意删除任意提交，而是必须按顺序删除提交。但这个命令存在潜在的危险，因为她会从仓库中删除项目。

  - 一定要谨慎使用 git 的重置功能。这是少数几个可以从仓库中清除 commit 的命令。如果某个 commit 不再存在于仓库中，它所包含的内容也会消失。
  - 为了减轻你的压力，澄清下，git 会在完全清除任何内容之前，持续跟踪大约 30 天。要调用这些内容，你需要使用 `git reflog` 命令。请参阅以下链接以了解详情：

- `git remote` - 管理远程仓库

  - 将本地仓库与远程仓库建立连接：

  ```shell
  echo "# my-travel-plans" >> README.md
  git init
  git add README.md
  git commit -m "first commit"
  # 以下两行代码重要
  git remote add origin https://github.com/...
  git push -u origin master
  ```

  - 对于 `git remote add origin https://github.com/...`，有几点需要注意：
    - 首先，这条命令包含一个子命令 `add`
    - 这里使用了 `origin` 一词，设置了我们之前所说的简写名
      - 记住， `origin` 一词并没什么特殊性。
      - 如果你想将它改为 `repo-on-GitHub`，那么只需（在运行命令之前）将 "origin" 改为 "repo-on-GitHub"：
    - 第三，添加了仓库的完整路径（即 Web 上的远程仓库 URL）

  - `git remote -v` 用于验证我们已经正确添加了远程仓库

- `git push` - 将修改推送到远程仓库上

  - `git push <remote-shortname> <branch>` 
    - 我的远程仓库的简写名为 `origin`，并且我想推送的 commit 位于`master`分支上。那么，我要使用以下命令将我的 commit 推送到 GitHub 上的远程仓库：
    - `git push origin master`

- `git pull` - 将从远程仓库上获取更新

  - `git pull` 的格式与 `git push` 的非常相似 - 提供远程仓库的简写名，以及你要拉取 commit 的分支名称。
  - `git pull <remote-shortname> <branch>` ，示例：
    - `git push origin master`
  - 如果你不想自动将本地分支与跟踪分支合并，则不应使用 `git pull`，而是使用另一个命令 `git fetch`。**当远程仓库包含你没有的 commit ，但本地仓库也包含远程仓库所没有的 commit 时，你可能想这么做。**
    - 如果我们位于 master 分支上，则需运行 git merge origin/master 以更新本地 master 分支。
    - **你可以将 `git fetch` 想象成 `git pull` 它的一半操作，而 `git pull` 的另一半是合并。**



### 其他说明

- '优达学城 - 用 Git 进行版本控制' 第 4 课中有讲到如何书写良好提交说明，有空或者需要可以去查看。
- **标签是关联于某次提交的<u>永久指针</u>，它不会移动，**但**在添加新的提交时，分支却会移动。**
- **重置（reset）** 似乎和 **还原（revert）** 相似，但它们实际上差别很大。还原会创建一个新的 commit，并还原或撤消之前的 commit。但是重置会清除 commit！
  - 这部分内容目前应该还不会使用到，所以到时候可以直接来查看 -> 课程 5
- 现在我们输出中有一个标记 (marker)！该标记为 `origin/master`，并被称为**跟踪分支**。**跟踪分支的名称包含远程仓库的简写名及分支名称。**所以跟踪分支 `origin/master` 告诉我们远程仓库 `origin` 有一个 `master` 分支，指向 commit `9b7d28f`（并包含 `9b7d28f` 前的所有 commit ）。这非常有用，因为**这意味着我们可以在本地仓库跟踪远程仓库的信息**！