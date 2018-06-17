# My-VSCode-Document

[TOC]

---

## 1. 主题与界面细节

### 主题

#### 操作方式

Control+shift+p 打开命令面板，搜索 theme，选择 Color Theme，再选择相应的主题

打开命令面板，搜索 user settings 打开用户配置文件输入

```
{
  "workbench.colorTheme": "Nord"
}
```

这样以后 colorTheme 的配置就被写死了，每次打开都是 Nord 主题

#### 我比较喜欢的主题

- Nord
- material

### 界面

#### 隐藏左侧活动栏

在 user settings 配置文件中添加：

```
    "workbench.activityBar.visible": false
```

这样活动栏就看不到了。用一组快捷键呼出活动栏上面的功能：

- Shift-Cmd-E：打开文件浏览器
- Shift-Cmd-D：打开调试器
- Shift-Cmd-F；打开搜索界面
- Shift-Cmd-X: 打开装包界面

#### 隐藏 minimap

打开用户设置页面，左侧搜索 minimap ，可以看到 minimap 默认设置为 true ，也就是显示。

```
"editor.minimap.enabled": false
```

拷贝右侧内容的这行，添加到右侧，并且改值为 false ，即可隐藏 minimap 。

#### 行高字符间距设置

```
    "editor.lineHeight": 25,
    "editor.fontSize": 13,
```

再来添加一点配置，让字体看上去舒服点，行高 25，字体 13 。

---

## 2. 命令行集成终端配置

> 集成终端 - Integrated Terminal
>
> https://code.visualstudio.com/docs/editor/integrated-terminal

### 打开和关闭终端窗口

Cmd-Shift-P 打开命令面板，选中 keyboard shortcut file 。

```
  {
    "key": "cmd+h",
    "command": "workbench.action.terminal.toggleTerminal"
  },
  {
    "key": "cmd+t",
    "command": "workbench.action.terminal.new",
    "when": "terminalFocus"
  },
  {
    "key": "cmd+right",
    "command": "workbench.action.terminal.focusNext",
    "when": "terminalFocus"
  },
  {
    "key": "cmd+left",
    "command": "workbench.action.terminal.focusPrevious",
    "when": "terminalFocus"
  },
  {
    "key": "cmd+w",
    "command": "workbench.action.terminal.kill",
    "when": "terminalFocus"
  }
```

配置粘贴到 keyBindings.json 文件，每一项的作用是：

- Cmd-h 打开和关闭终端窗口，关闭窗口后里面的命令行会照常运行，再次打开后依然可见
- Cmd-t 新建终端，一个终端窗口中，可以创建多个终端
- Cmd-right/left 可以在终端间切换
- Cmd-w 不想要的终端，用 cmd-w 来关闭
- Ctrl-l 清空终端输出

### 配置样式

打开配置文件。

```
"terminal.integrated.lineHeight": 1.8,
```

添加 terminal ，也就是终端的行高设置，把行高设置大点。

---

## 3. 文件操作

本节关注查找文件，移动文件，重命名文件，删除文件这些操作。

### 查找文件

一个打开的项目中，使用 `Cmd-P` 然后模糊搜索一下，就可以快速打开文件了。被添加到 .gitignore 文件中的文件夹会被自动忽略，例如 node_modules 文件夹。

不管用命令面板还是鼠标单击，打开文件的时候，只要按下 Cmd 键，就能在新格子打开文件。

如果同时打开了多个项目，就需要先要 Ctrl-w 切换项目。

### 创建文件

用 [advanced New File](https://marketplace.visualstudio.com/items?itemName=patbenatar.advanced-new-file) 来创建文件。

装好之后，打开命令面板，到 Keybord shortcut file ，也就是快捷键配置文件 ，添加

```
  {
    "key": "alt+cmd+o",
    "command": "extension.advancedNewFile"
  },
```

这样，每次想要创建新文件的时候，就敲 alt-cmd-o 。先选择要创建的位置，然后输入文件路径即可。

### 删除文件

删除文件要想不用鼠标，需要安装 [File Utils](https://marketplace.visualstudio.com/items?itemName=sleistner.vscode-fileutils) 。

装好后，运行 Cmd-Shift-p 打开命令面板，搜 file ，就可以看到这个包提供的各项功能了。追加 delete ，就可以搜出删除当前文件的命令了。

### 重命名文件

重命名也用 File Utils 提供的命令，命令面板搜 file rename 。

### 移动文件

同样的，move 命令可以用来移动文件位置。

## 4. 文件编辑快捷键

进入文件，看看文本编辑都有哪些高频快捷键。

### 切换到 atom 模式

我从 atom 切换过来的，所以先把 vscode 的快捷键切换到 atom 模式。敲 Cmd-Shift-X 开启装扩展包的界面。搜 `atom keymap` ，然后安装。

详细的快捷键列表，在这个包的介绍文档中可以看到。

装好之后，再敲 Cmd-J 就是 Atom 编辑器的合并下一行操作，而不是原来 vscode 默认的，打开终端操作了。

### 多点编辑

Mac 系统上进入多点编辑模式就是按下 Cmd 键，然后鼠标单击各个编辑点。

### 删除当前行

Shift-Cmd-K

### 行内移动

用左右方向键即可，一次想移动一个单词，就按下 Alt ，一次想移动到头，就按下 Cmd 。

移动时候顺便选中，就多按下 Shift 。

### 多行选中

按下 Cmd 敲 L 可以选中当前行，不断敲 L 可以选中多行。

这个基础上，Cmd-Shift-l ，可以进入多点编辑模式。

### 跳转

如果你不能高效跳转，你就不能高效编辑。

跳转到下一个当前单词出现的位置，Cmd-d 。

跳转到一个行号。Ctrl-g

跳转到到函数或者重要变量名，这个默认的快捷键不太舒服，所以咱们自己配置一下。

打开快捷键文件。

```
{
  "key": "ctrl-s",
  "command": "workbench.action.gotoSymbol"
},
```

添加 ctrl-s ，执行 gotoSymbol 操作。这样，到代码中，敲 ctrl-s 就可以搜索并跳转了。

跳转到光标所在函数的定义位置，敲 `F12` 即可。

跳回老编辑点。Ctrl + 减号。

---

## 5. 配置自动补齐

[IntelliSense](https://code.visualstudio.com/docs/editor/intellisense) 是微软自己的商标名，其实就是主要就是自动补齐，包括 snippet 补齐，已有字符串补齐，语法补齐等功能。

### 补齐文件路径

文件路径是可以自动补齐的，不用装扩展包。例如 js 文件里敲 import from 后面的引号中敲点斜杠就可以看到备选项目。

### 点触发

由一个点能触发语法补齐。例如一个 class 内部定义了 onClick 方法，这样输入 this 然后点，就可以看到备选项中有 onClick ，选中它，然后敲括号，就会看到提示框中显示出了它的参数类型，这个提示功能也是 IntelliSense 提供的，这个似乎是超出了自动补齐的概念了。

其他默认 intelliSense 提供的补齐还有不少，输入过程中就会看到很多。

### Emmet

另外，根据[官方说明](https://code.visualstudio.com/docs/editor/emmet) ，Emmet 也是自带的。

### snippets

除了默认的功能，还可以自己配置。通过 snippets 机制把自己常用的代码片段，按照语法类型分组保存。

保证当前打开的是一个 js 文件，打开命令面板，搜 snippet 。有两条可以匹配上，一条是插入自带的一些 snippet ，另一条就是 Open User Snippets ，回车选中，可以来创建自己的 snippet 。

添加好之后，回到 js 文件中，就可以敲关键词，然后 tab 进行补齐了。欢迎到 github.com/happypeter/dotVScode 中拷贝我的那些 snippet 。

---

## 6. 语法和格式检查

自带的语法检查就非常的贴心，一旦敲错一般下面都会看到红线标出。

### eslint

但是还可以通过 ESlint 让提示信息更丰富些。

我们这里只介绍 create-react-app 环境下的配置 eslint 的方式，create-react-app 环境本身是自带 eslint 的，通常这些信息只会显示到命令行或者 Chrome 终端中。

例如，到 js 中添加一个变量但是不去使用。

浏览器中是可以看到 eslint 给出的 no-unused-vars 规则触发警告的。

根据 [create-react-app 官方对 Lint 的编辑器支持文档](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#displaying-lint-output-in-the-editor) ，我只需要做两件事情：

第一，安装 eslint 的 vscode 插件。

第二，添加 .eslintrc 文件

```
{
  "extends": "react-app"
}
```

这样编辑器中，就会看到黄色下滑线的警告信息了。进一步修改 .eslintrc 可以添加更多检查规则进来，这些新加进来的规则只会影响编辑器的报错，不会影响命令行和 Chrome 中的报错。

### 安装 prettier

[create-react-app 官方推荐用 prettier 做格式美化](https://github.com/facebook/create-react-app/blob/master/packages/react-scripts/template/README.md#formatting-code-automatically) ，格式检查确实让人心情舒畅。

Cmd-Shift-X 安装 prettier 。

进入 Settings 界面，搜索 prettier 可以看到很多默认选项。

```
// 不使用分号
"prettier.semi": false,
// 使用单引号
"prettier.singleQuote": true,
// 保存自动使用格式化
"editor.formatOnSave": true
```

添加几项来覆盖一下默认值。添加 semi false ，因为我写 js 不要分号，singleQuote 设置为 true ，因为用单引号不用双引号。formatOnSave ，就是保存的时候就自动用 prettier 的各种规则来调整代码。

到一个格式混乱的代码中，Cmd-S 保存一下，发现格式马上就完美了。

---

## 7.  备份配置文件

根据[官方配置文档](https://code.visualstudio.com/docs/getstarted/settings)可以找到各项配置信息都保存到了系统上的哪个位置。

创建一个自己的 github 仓库，把

```
$HOME/Library/Application Support/Code/User/
```

的内容都上传到仓库中。可以把这个文件夹用 git 控制，添加 github 仓库为上游，然后每次有修改就可以直接上传了，当然要 ignore 这里的 workspaceStorage 。

VScode 默认的扩展列表没有保存到配置文件中，但是可以很简单的用命令列出

```
$ code --list-extensions
```

输出信息保存到 README 中，换机器的时候自己手动装上即可。

### 一句话介绍

配置文件中每一行内容给一个一句话介绍。

```
    "workbench.colorTheme": "Nord",
    "workbench.activityBar.visible": false,
    "editor.multiCursorModifier": "ctrlCmd",
    "editor.minimap.enabled": false,
    "terminal.integrated.lineHeight": 1.8,
    "editor.fontSize": 13,
    "editor.tabSize": 2,
    "editor.letterSpacing": 0.7,
    "editor.lineHeight": 25,
```

这几句作用是：

- 使用 Nord 颜色主题
- 隐藏活动栏
- 使用 Cmd 进行多点编辑
- 隐藏 miniMap
- 终端行高 1.8
- 字体大小 13
- 每个 tab 等于两个空格的宽度
- 字符间距 0.7
- 行高 25

```
    "emmet.includeLanguages": {
        "vue-html": "html",
        "javascript": "javascriptreact"
    },
    "explorer.confirmDragAndDrop": false,
    "files.trimFinalNewlines": true,
    "explorer.confirmDelete": false,
    "files.insertFinalNewline": true,
    "files.autoSave": "onFocusChange",
```

- emmet 生效范围包含 vue 组件和 react 的 JSX
- 文件浏览器中进行拖拽改变文件位置时候，不需要确认
- 文件浏览器中如果删除一个文件，不需要确认
- 文件末尾如果有多个空行，保存的时候自动去掉
- 但是要保留一个空行，不然很多地方都会抱怨
- 只要焦点失去，就保存文件

```
    "prettier.semi": false,
    "prettier.singleQuote": true,
    "editor.formatOnSave": true
}
```

- prettier 设置，分号，不要
- prettier 设置，使用单引号
- 保存文件时候，自动触发格式化操作，prettier 就会被触发