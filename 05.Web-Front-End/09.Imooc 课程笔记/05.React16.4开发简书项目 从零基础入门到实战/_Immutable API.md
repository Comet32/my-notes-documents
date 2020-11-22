# Immutable API

[TOC]

## 将普通数据转换为 imuutable - fromJS

```jsx
import { fromJS } from 'immutable'

const defaultState = fromJS({
    searchfocused: false
})
```



## 修改数据 - `set` `merge`

```jsx
state.set('focused',true)

state.merge({
   list: action.list,
   totalPage: action.totalPage
})
```



## 获取数据 - `get` `getIn`

```jsx
header.get('searchfocused')

searchFocused: state.getIn(['header', 'searchFocused'])
```



## 将最外层的 state 改变为 immutable 对象 

```jsx
import { combineReducers } from 'redux-immutable'

const reducer = combineReducers({
  header: headerReducer,
  home: homeReducer,
  detail: detailReducer,
  login: loginReducer
})
```



## 使用 `toJs` 方法将 immutable 对象/数组转换为 JS 对象/数组

```jsx
const newList = list.toJS()
```



## 获取 immutable 数组的长度：`list.size`



## immutable 数组与对象的使用

```jsx
const defaultState = fromJS({
  topicList: [
    {
      id: 1,
      title: '手绘',
      imgUrl: '//upload.jianshu.io/collections/images/283250/%E6%BC%AB%E7%94%BB%E4%B8%93%E9%A2%98.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/64/h/64'
    },
    {
      id: 2,
      title: '故事',
      imgUrl: '//upload.jianshu.io/collections/images/95/1.jpg?imageMogr2/auto-orient/strip|imageView2/1/w/64/h/64'
    }
  ]
})
```

- R1 - `defaultState` 是一个 immutable 对象，其内部的所有属性也会转换为 immutable 对象。
- R2 - `topicList` 是 immutable 数组，数组是可以直接使用数组方法的，可以直接作为一个数组来使用，不过其长度属性不再是 length，而是 size
- topicList 所遍历出的每一项也为 immutable 对象，需要使用 get 来获取其值。