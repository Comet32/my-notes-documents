[TOC]

## 使用 fetch api 封装调用时的问题

```jsx
export function getCategories() {
  return fetch('http://localhost:3001/categories', {
      headers: { 'Authorization': 'whatever-you-want' }
    }).then( res => res.json()).then(data => data.categories)
}

// 在组件中调用
getCategories().then(res => this.setState({
  categories: res
}))
```

这是我所封装的一个用于获取全部分类的 api，需要知道的是，调用时，它所返回的依然是一个 promise，所以还需**使用 .then 来获取返回的数据，并将需要进行的操作在回调中完成**。



## 封装工具函数时需要注意的问题

```jsx
export function capitalize (str = '') {
  return typeof str !== 'string'
    ? ''
    : str[0].toUpperCase() + str.slice(1)
}
```

这是我所封装的将字符串的首字母大写的函数，需要注意一定要做**数据类型的检测**和**传入默认参数**。



## Ajax Post 时要在报文中添加内容类型属性

```jsx
export function postPostsAPI(body) {
  return fetch(`${api}/posts`, {
    headers:{
      ...headers,
      'Content-Type': 'application/json'
    },
    method: 'POST',
    body: JSON.stringify(body)
  }).then( res => res.json())
}
```

记得添加的 `'Content-Type':'application/json'`，否则传过去的 body 无效。



## 应该如何将对象数组转换为对象对象  - 未解决

在看 redux 文档中关于 [State 范式化](https://cn.redux.js.org/docs/recipes/reducers/NormalizingStateShape.html) 的问题时，考虑到如果从服务器所获得的数据是对象数组的形式，但按照范式化的使用，应该将其转换为 id 为 key 的对象对象的形式。之前用 reduce 的方式来解决，但会出现问题。