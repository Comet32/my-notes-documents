### X. 手机单词卡

> 使用 React Native 开发一款手机单词卡应用。

# 项目简介

**UdaciCards** 项目中，你将开发一款手机应用（支持Android或iOS系统 - 或二者均支持），支持用户学习单词。通过本应用，用户能够创建不同类别的单词卡集合，即“卡片集”；在卡片集中添加单词卡；随后针对卡片集的内容进行测试。

## 项目目的

本项目涵盖了构建原生应用程序的基础内容，包括处理无限列表、路由选择及用户输入。通过构建本项目，你将了解如何使用React Native开发一款iOS和Android应用。

# 技术规范

请使用**create-react-native-app**创建项目。无需下载任何初始代码。

项目应至少满足下列技术规范。你可以在此基础上自行扩展项目功能。

## 具体要求

- 使用 create-react-native-app 创建项目；
- 用户能够创建卡片集，且卡片集所含的卡片数量无上限；
- 用户能够在具体的卡片集内添加卡片；
- 卡片正面应显示为问题；
- 卡片背面应显示为答案；
- 用户能够针对一个卡片集进行自我测试，并在测试结束后得到分数；
- 用户未进行学习时，将在当天收到通知提醒。

## 视图

你的应用至少应有5种视图。

- 卡片集列表视图（默认视图）
  - 显示卡片集标题
  - 显示卡片集所含卡片数量



<img src="assets/5f15944a-fe01-4b89-96e2-2746ba3abba1" style="zoom:35.6%" />

卡片集列表视图





- 单个卡片集视图
  - 显示卡片集标题
  - 显示卡片集所含卡片数量
  - 显示开始该卡片集测试的选项
  - 添加新问题至卡片集的选项

<img src="assets/5e9fdce3-b900-4f54-bfc8-b650adaba304" style="zoom:35.6%" />

单个卡片集视图





- 测试视图
  - 显示一张卡片上的问题
  - 查看答案的选项（翻过卡片）
  - 一个“正确”按钮
  - 一个“错误”按钮
  - 待测试卡片数量
  - 测试完成后显示本次测试的正确率



<img src="assets/d65297c7-de13-4b1a-b197-1a7dd516ee46" style="zoom:35.6%" />

测试视图

<img src="assets/d06db047-c1aa-4afc-a81b-822a4d1ef424" style="zoom:35.6%" />

- 新卡片集视图
  - 输入新卡片集名称的选项
  - 提交新卡片集名称的选项

<img src="assets/da5278d0-6469-4506-bddb-91ab7c099353" style="zoom:35.6%" />

- 新问题视图
  - 输入问题的选项
  - 输入答案的选项
  - 提交新问题的选项



<img src="assets/3f296394-84c6-4a2b-ba08-22e2772e81d1" style="zoom:35.6%" />

## 数据

我们将使用 `AsyncStorage` 存储卡片集及单词卡。Redux 也可作为备选。

使用`AsyncStorage`可以管理形似下列的对象：

```js
{
  React: {
    title: 'React',
    questions: [
      {
        question: 'What is React?',
        answer: 'A library for managing user interfaces'
      },
      {
        question: 'Where do you make Ajax requests in React?',
        answer: 'The componentDidMount lifecycle event'
      }
    ]
  },
  JavaScript: {
    title: 'JavaScript',
    questions: [
      {
        question: 'What is a closure?',
        answer: 'The combination of a function and the lexical environment within which that function was declared.'
      }
    ]
  }
}
```

注意每一个卡片集将在对象上创建一个新的键（Key）。每个卡片集都有一个`标题`和一个`问题` 键（Key）。`标题`指该卡片集的标题，而`问题`指该卡片集的所含问题与答案。

## 建议

> 为了管理你的 `AsyncStorage`数据库，需要创建4种不同的辅助方法。

> `getDecks`: 返回包含卡片集标题、问题及答案信息的所有卡片集。 
> `getDeck`: 传入单个`id`参数并返回与该id相关的卡片集。 
> `saveDeckTitle`: 传入单个`id`参数并将其添加至卡片集。
> `addCardToDeck`: 传入两个参数，即`标题`和`卡片`，然后将卡片添加至带有相关标题的卡片集下的问题列表。






