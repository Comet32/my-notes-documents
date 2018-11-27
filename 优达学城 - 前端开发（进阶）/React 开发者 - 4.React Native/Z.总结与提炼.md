# Z.总结与提炼

> 我将把整套课程中我认为值得提炼的知识归纳到这个文档中，并会总结和说明一些我的理解。

[TOC]

## 0.课程地图

本课程主要讲解 React Native 框架。下面是课程内容的简要概述：

- **第 1 课** 说明使用 React Native 构建原生应用程序的好处，以及**如何设置有效的开发环境**。
- **第 2 课** 比较 React 和 React Native 之间的主要思维和 **API 差异**。
- **第 3 课** React Native 应用的详细信息**样式**和**布局模式**。
- **第 4 课** 讲解**路由模式与策略**。
- **第 5 课** 介绍**原生功能**（例如，地理定位、通知等）以及为向应用商店发布应用做准备。

## 1.使用 React Native 构建应用

### 1.1 什么是 React Native/它存在的意义是什么？

- React Native 使你能够使用 React 构建原生 iOS 和 Android 应用。
  - （RN 实际上是一个基于 JS 开发的框架，由于框架最终会和 expo 工具一起将你写的 JS 代码编译为不同平台的代码并打包生成相应的文件，所以通过这个框架你可以使用 JS 和 RN 的语法形式来实现多端开发的目的）

- 一个 React Native 团队就能开发 web、iOS、Android 端的应用，节约企业资金和缩短开发时间。
  - （但其实这点会存在一些问题，因为在面向 iOS 或 Android 应用时，无法做到完全和原生应用相媲美，无论是功能上或性能上，不过对于一些简单的应用而言还是足够了）。
- 与“一次编写，到处运行（Write once，run anywhere）”的理念不同，React Native 的理念是“一次学习，随处开发（Learn once，write anywhere）”。因为要在不同的平台做到 Write once，run anywhere 是非常困难的，但是却可以学习一种开发语言和思路，然后通过一些简单的判断或 API 在不同的平台上进行开发。
  - （这种简短的理念话语是有很大的信息缺失的，比如一次编写，指的是一次用一种语言编写一个工程呢？还是一次用不同的语言编写多个工程呢？当然从其上下文中我们能明白它所表达的应该是一次编写一个工程。）

#### React Native 解密

当 React 首次推出时，一个很大的卖点就是**虚拟 DOM**。这已是现在大多数 UI 库的标配，但当它刚推出时，确实是极具突破性的！我们可以通过分解调用 `setState()` 会发生的过程，来看看虚拟 DOM 究竟是什么。

调用 `setState()` 后 React 所做的第一件事是将传递给 `setState()` 的对象合并到组件的当前状态。这会启动一个叫做[调节](https://facebook.github.io/react/docs/reconciliation.html) 的过程。调节的最终目的是**以最有效的方式更新**基于这种新状态的用户界面。为此，React 将构建一个新的 React 元素树（你可以将其视为 UI 的对象表现形式）。一旦有了这个新树，React 就会使用 "diff" 命令将它与之前的元素树进行比较，以便弄清 UI 如何响应新的状态而改变。通过这样做，React 将会知道发生的具体变化，并且通过了解发生的具体变化，它将能够**仅在绝对必要的情况下进行更新，以最大限度地减少 UI 的占用空间**。

创建 DOM 的对象表现形式的这个过程是 "Virtual DOM" 背后的整体思想。但是，如果我们不想以 DOM 为目标进行渲染，而是将另一个平台作为渲染目标 -- 比如说 iOS 或 Android。理论上来说，DOM 只是一个实现细节。除了这个名字本身（在我看来，它更像是一种营销手段）外，没有什么可以将虚拟 DOM 概念与实际 DOM 相结合。这正是 React Native 背后的思想。**React Native 不是渲染到 web 的 DOM，而是渲染原生 iOS 或 Android 视图**。这是我们可以只使用 React Native 来构建原生 iOS 和 Android 应用。

#### 进一步研究：

- [调节](https://facebook.github.io/react/docs/reconciliation.html)
- [调节 - 中文文档](https://react.docschina.org/docs/reconciliation.html)
- [React Native 中的桥接](https://tadeuzagallo.com/blog/react-native-bridge/)



### 1.2 开发环境设置

当我们在此课程中构建应用时，我们要面向 Android 和 iOS 两个平台构建。那么我们面临的一个难题是，我们需要支持两个独立的开发环境：iOS 使用 [Xcode](https://developer.apple.com/xcode/)，Android 使用 [Android Studio](https://developer.android.com/studio/index.html)。

幸运的是，现在我们有一种新工具可以使用，使我们可以面向 Android 和 iOS 进行开发，而无需打开 Android Studio 或 Xcode。这个工具的名字非常直白，叫做 **Create React Native App**。它类似于 **Create React App**，因为你需要做的是通过 NPM 安装 CLI。然后，通过 CLI，你可以轻松地构建起一个全新的 React Native 项目。

#### Create React Native App 优点

- 减少了创建 "hello world" 应用程序所需的时间。
- 允许你轻松地在自己的设备上进行开发，你在文本编辑器中所做的任何更改将立即显示在本地手机上运行的应用中。
- 你只需要这一个构建工具就够了。你不必关心 Xcode 或 Android Studio。
- 此工具没有锁定。就像 Create React App 一样，你可以随时"弹出配置（eject）"。

#### Create React Native App 缺点

- 如果你在构建一个要添加到现有原生 iOS 或 Android 应用的应用，Create React Native App 就无法用了。
- 如果你需要在 React Native 和一些 Create React Native App 不认识的原生 API 之间建立桥接（这非常罕见），Create React Native App 就无法正常工作了。

#### 安装 Create React Native App

为了使用 Create React Native App，请先在全局安装它:

```bash
npm install -g create-react-native-app
```

或者也可以使用 **yarn**（访问[此处](https://yarnpkg.com/lang/en/docs/install) 了解安装说明）：

```bash
yarn global add create-react-native-app
```

> ### ⚠️ 使用 Yarn ⚠️
>
> Create React Native App 目前无法与 NPM v5 一起使用，因为[NPM 中存在错误](https://github.com/react-community/create-react-native-app/issues/233#issuecomment-305638103)。虽然 NPM v3 或 v4 应该没有问题，但是**保险起见，后面我们都使用 Yarn**。

#### 关于 Expo

<img src="assets/1541577849529.png" style='zoom:50%'>

- Expo 的宗旨是当你构建 React Native 应用时，你不需要处理原生代码，无论是 Swift Objective-C 还是 java。
- 每当我们需要处理原生 API 时，例如相机或地理位置，我们不用使用 Xcode 或 Android studio，这两个工具实在令人头疼，相反，我们可以使用 Expo 的 JavaScript API 实现相同的结果。
- 实际上 Create React Native 应用就是由 Expo 团队开发的，已成为使用 React Native 构建应用的官方方式。
- Expo 是一项服务，它能使涉及 React Native 的一切都变得非常容易。**Expo 背后的思路是省去 Android Studio 或 Xcode 的使用**。更重要的是：它甚至允许我们使用 Windows（或甚至 Linux）面向 iOS 进行开发！

- 在此课程中，我们将大量依赖 Expo。首先: 你需要_安装_ Expo。请前往应用商店，安装适合你的设备的 Expo 移动应用：
  - [Google Play 上的 Expo](https://play.google.com/store/apps/details?id=host.exp.exponent) (Android)
  - [App Store 上的 Expo](https://itunes.apple.com/us/app/expo-client/id982107779) (iOS)

#### 使用 Simulators

- 更多的信息可以去查看官方的文档信息，其实就是需要安装很多环境依赖的东西。
- 这里也会有一些坑，我基本上也都踩过了，不过现在已经忘记当时的问题有哪些了，所以，下一次如果这样的问题还是记录一下比较好。

#### 构建应用

``` shell
create-react-native-app UdaciFitness
```

#### 环境

在使用 Create React Native App 创建应用时，你期望获得什么类型的支持？

- ES5 和 ES6 支持
- 对象展开运算符
- 异步函数
- JSX（毕竟这是*React*！）
- [Flow](https://flow.org/)
- [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API)

由于我们纯粹使用 JavaScript 来构建移动应用，这个列表没有什么好惊奇的！由于 Create React Native App 随 Babel 一起提供，请自行查看[支持的转换](https://github.com/facebook/react-native/blob/master/babel-preset/configs/main.js#L16) 的完整列表。

#### 项目刚开始的准备

我们可以在项目的开始时，创建一些文件夹用于存放不同的代码，比如工具、辅助类代码我可以放到 `utils` 中。其中可以包括带有颜色的十六进制表示法的变量文件 `colors.js`：

```jsx
export const purple = '#292477'
export const gray = '#757575'
export const white = '#fff'
export const red = '#b71845'
export const orange = '#f26f28'
export const blue = '#4e4cb8'
export const lightPurp = '#7c53c3'
export const pink = '#b93fb3'
```

或者带有一些辅助函数的 `helpers.js`

```jsx
// utils/helpers.js

// 判断 num 是否在 x y 之间
export function isBetween (num, x, y){
  if(num >= x && num <=y ){
    return true
  }
  return false
}

// 根据 heading 值返回所面向的方向
export function calculateDirection (heading) {
  let direction = ''

  if (isBetween(heading, 0, 22.5)) {
    direction = 'North'
  } else if (isBetween(heading, 22.5, 67.5)) {
    direction = 'North East'
  } else if (isBetween(heading, 67.5, 112.5)) {
    direction = 'East'
  } else if (isBetween(heading, 112.5, 157.5)) {
    direction = 'South East'
  } else if (isBetween(heading, 157.5, 202.5)) {
    direction = 'South'
  } else if (isBetween(heading, 202.5, 247.5)) {
    direction = 'South West'
  } else if (isBetween(heading, 247.5, 292.5)) {
    direction = 'West'
  } else if (isBetween(heading, 292.5, 337.5)) {
    direction = 'North West'
  } else if (isBetween(heading, 337.5, 360)) {
    direction = 'North'
  } else {
    direction = 'Calculating'
  }

  return direction
}

// 默认返回当天以 IOS 格式返回年、月、日，或者传入相应时间的毫秒数返回
function timeToString(time = Date.now()){
  const date = new Date(time)
  const toDayUTC = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate()))
  return toDayUTC.toISOString().split('T')[0]
}
```

#### 使用调试器

React Native 的好处是在网页上的开发体验和在 React Native 中完全一样，因为我们可以向控制台输出日志，可以插入调试器，一切都很熟悉。

在 Android 上要打开开发者菜单，按下 Command + M，而不是 Command + D，然后获得这些选项：

![1541598936013](assets/1541598936013.png)

这里有个 Toggle Element Inspector，这就像在网页上选择元素一样，我可以点击任何一个元素并获得应用到其上的样式和任何内外间距，对于网页上的 Box Model Inspector，我们在 React Native 中也有相应的选项。假设我想点击其中一个元素，并且不检测它，我只需选择这个方框，我们可以打开或关闭此选项。要取消它，只需按下 Command + D 然后点击 Toggle Element Inspector。

开发者选项中有很多可以选择的内容，最重要的功能是刷新，Toggle Element Inspector 以及启动和停止远程调试器。

## 2.React 与 React Native

### 2.1 Web 与原生

- 移动设备上的开发与网站平台上的开发体验完全不一样。
- 不只 Web 平台应用与移动平台应用差别很大，iOS 应用与 Android 应用的差别也很大，主要差别体现在 UI 风格上。
- 原生应用通常利用**动画**来帮助创建较好的用户体验——按钮效果、屏幕转换和其他视觉反馈等。虽然这些动画较为微妙，但为你构建的应用提供了连续性和引导。
- 动画以动态的方式讲述了关于你应用工作原理的故事，若没有动画，一个应用会感觉只是静态屏幕的集合而失去一些乐趣与想象。
- 原生应用和 Web 应用的另一个主要差别是**导航**，React Router 的 Route 组件让我们能够将 URL 映射到特定的 UI 组件。在 RN 中，路由器的功能为一个**堆栈**（其中一种路由方式），也就是说，各个屏幕会根据需要被“压入”和“弹出”。

#### Android 与 iOS 的差异

- 不仅_原生_应用和 *web* 应用之间存在根本差异，你会发现原生平台（iOS 和 Android）的*外观和感受*也存在差异。或许最明显的差异要数每个平台独特的设计理念: Android 应用采用 Google 的 [Material Design](https://material.io/guidelines/material-design/introduction.html)，而 iOS 应用采用 Apple 的 [Human Interface Design](https://developer.apple.com/ios/human-interface-guidelines/overview/design-principles)。在设计移动应用时，重要的是确保用户感受到的 iOS 应用_具有_ iOS 应用的特点，而 Android 应用_具有_ Android 应用的特点。
- Android 和 iOS 在屏幕_间_导航的感觉也不同。Android 设备在屏幕底部有一个**导航栏**，使用户可以返回上一个屏幕（以及发挥其他功能）。而在 iOS 上，导航方式是不同的: 它并没有这样的通用导航栏！在为 iOS 应用构建 UI 时，重要的是包含一个后退按钮（或许在自定义的[导航栏](https://developer.apple.com/ios/human-interface-guidelines/ui-bars/navigation-bars/)上），以便在应用中导航。
- Android 和 iOS 之间的另一个主要区别在于标签栏导航。iOS 应用在应用屏幕底部包含[标签栏](https://developer.apple.com/ios/human-interface-guidelines/ui-bars/tab-bars/)，使用户方便地访问应用的不同部分。同样，Android 应用中也包含它们；但标签栏都明显地位于[屏幕顶部](https://material.io/guidelines/components/tabs.html)。它们都允许访问高层级内容。（这是主流或者大部分应用所采用的方式）

### 2.2 常见 React Native 组件

- 我们在编写 HTML 时，我们习惯使用 `<div>` 和 `<span>` 标签来定义分区或在页面上包含其他元素，在 RN 中，我们使用  `<View>` 组件来构建应用 UI。跟 HTML 的 `<div>` 一样，`<View>` 组件可以容纳几个属性（例如`style`），甚至可以嵌套在其他 `<View>` 组件中！
- `<Text>` 的用途如你所料。它的主要作用无疑是在应用中渲染文本。跟 `<View>` 一样，样式和嵌套功能也适用于 `<Text>` 组件。
  - （但需要注意，RN 中的文本内容都应该放在 Text 标签中）
- 对于 React Native，需要**确保每当有文本时，需要将该文本封装在 Text 组件中**。如果不这么做，就会报错。

#### 图标

- create-react-native-app 的一个优势是它本身就支持图标。

- 通过访问 https://expo.github.io/vector-icons 访问图标列表，或者访问[矢量图标目录](https://expo.github.io/vector-icons) 

- 使用方式：

  - ```jsx
    import { Ionicons } from '@expo/vector-icons'
    
    <Ionicons name='ios-pizza' color='red' size={100}/>
    ```

- 无论你选择哪个图标，请确保它符合你的应用的整体外观（例如，使用用于特定平台的图标）。

#### 列表

React Native 有三种显示列表的方式：

- `ScrollView`
  - 将列表项包含在这个组件中时，我们便可以通过滑动屏幕来查看位于屏幕以外的列表项。
  - 但该组件会渲染该列表中的每一项，无论用户是否看到这些项。
- `FlatList`
  - 该组件能够只渲染用户当前查看的项目。
  - 中文文档内容：https://reactnative.cn/docs/flatlist/
- `SectionList`
  - 高性能的分组(section)列表组件。
  - 中文文档内容：https://reactnative.cn/docs/sectionlist.html#docsNav



#### 表单

React Native 中的表单与你已经熟悉的 React 中的表单一样: **表单输入元素的状态由渲染表单的 React 组件控制**。也就是说，**表单值保存在本地组件状态中，使状态成为该表单的"数据源"（SOT）**。

React Native 提供几个在应用的表单中使用的基本组件：

- `TextInput`
  - 文本框输入组件，带有 value 属性与 onChange 属性，onChange 回调中的第一个参数为改变后的 value。
- `KeyboardAvoidingView`
  - `keyboardAvoidingView` 组件，我们可以将这里的 `View`（最外层的 View），替换为 `keyboardAvoidingView`，并为其提供 `behavior` 属性，设为 `padding`，指明该视图如何不被键盘遮盖，我们将在其周围添加一些内边距。
  - `KeyboardAvoidingView` 解决了视图会阻挡虚拟键盘的问题。
- `Slider`
- `Switch`
  - 切换按钮组件，带有 value 属性与 onValueChange 属性。



#### 图片

通常有两种图片显示方式，也就是可以从两个来源获取图片。

- 第一种方式是使用本地文件，也就是这个 PNG 文件：
  - ![1542212151686](/assets/1542212151686.png)
  - 我们将使用 `require()`，并传入该文件的路径，你会发现当前文件 App.js 与图片文件位于同一层级，因此可以直接通过输入 ./ 然后是图片名称来获取图片：
    ![1542212378492](assets/1542212378492.png)
- 第二种方式是图片文件位于服务器上
  - 传入一个对象，它具有一个 URI 属性，值为图片所在的具体网址。这里是位于 tylermcginnis.com 网站上：
    ![1542212618893](assets/1542212618893.png)

#### 其他组件

我们刚看了 React Native 中内置的一些最重要的组件。这些组件能让你开始使用你构建的应用中的基本功能 - 但可用的组件并不止这些！请自行查看 React Native 文档获取[完整列表](https://facebook.github.io/react-native/docs/components-and-apis.html#components-and-apis)。首先，我们建议你查看：

- [ActivityIndicator](https://facebook.github.io/react-native/docs/activityindicator.html)
  - 显示一个圆形的 loading 提示符号。
  - https://reactnative.cn/docs/activityindicator/
- [Picker](https://facebook.github.io/react-native/docs/picker.html)
  - 本组件可以在 iOS 和 Android 上渲染原生的选择器（Picker）
  - https://reactnative.cn/docs/picker/
- [WebView](https://facebook.github.io/react-native/docs/webview.html)
  - `WebView` 创建一个原生的 WebView，可以用于访问一个网页。
  - https://reactnative.cn/docs/webview/
- [Modal](https://facebook.github.io/react-native/docs/modal.html)
  - Modal 组件是一种简单的覆盖在其他视图之上显示内容的方式。
  - https://reactnative.cn/docs/modal/

注意某些组件是特定于平台的！虽然你可能想要使用_组合_构建跨平台组件，尽可能多地重复使用代码，但根据受众群体（即 iOS 或 Android），某些元素还是会有所不同。

#### 总结

React Native 为开发应用程序提供各种内置组件。其中一些支持应用中的基本功能（例如，文本、图像、列表等），另外一些提供更专门的功能（例如，拉动刷新、显示加载指示器等）。请自行查看 React Native 文档中的[组件和 API](https://facebook.github.io/react-native/docs/components-and-apis.html)，获取详尽列表。

中文：https://facebook.github.io/react-native/docs/components-and-apis

### 2.3 AsyncStorage

#### 在 Web 端使用 LocalStorage 进行本地存储

为在 web 应用中保留数据，我们通常会将数据存储在某种数据库中。这可以防止在页面刷新之间丢失应用程序数据。使用 `localStorage`，我们可以*直接将数据存储在浏览器中*，以达到保留数据的效果。最好的是存储在 `localStorage` 中的数据没有到期日期。这意味着即使会话结束（例如，浏览器选项卡关闭），数据也不会丢失！

请自行查看 MDN 上的 [Window.localStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage) 了解概述。

#### 使用 AsyncStorage 进行本地存储

在 React Native 中 LocalStorage 叫做 AsyncStorage，它和 LocalStorage 相似，但是是异步形式。

AsyncStorage 的好处是它是 iOS 和 Android 对等项的 JavaScript 抽象形式，在使用它时，不用担心不同的环境。

和 LocalStorage 相似，AsyncStorage 具有三个主要方法：

- 设置项目（setItem)
- 删除项目（removeItem）
- 清除所有项目（clear all）

> AsyncStorage 是一个简单、未加密、异步、持久的键值存储系统，对应用来说是全局性的。它应该用于替代 LocalStorage。

#### 概括

React Native 版本的 `localStorage` 为 `AsyncStorage`。这非常方便，因为 `AsyncStorage`只是 iOS 和 Android 等平台对应部分的抽象，所以不用考虑不同的环境。

我们来看看 `AsyncStorage` 的三个主要方法：

- `setItem`
- `removeItem`
- `clearAll`

请自行访问[文档](https://facebook.github.io/react-native/docs/asyncstorage.html#methods) 获取完整清单。



### 2.4 Redux 和 React Native

#### 添加 Redux

你应该记得 Redux 是 JavaScript 应用的***可预测的状态容器*****。它对于任何特定的视图库或框架无关**，所以我们不仅可以将它与 React 一起使用，也可以将其集成到 React Native 应用中！

由于 Redux 精简的尺寸和较小的依赖性，它无疑是 React Native 项目的很好工具。最重要的是: 由于 React Native 从根本上来说*只是 JavaScript*，我们可以用习惯的方式将 Redux 添加到项目中。

安装 redux 与 react-redux：

``` shell
yarn add redux react-redux
```



