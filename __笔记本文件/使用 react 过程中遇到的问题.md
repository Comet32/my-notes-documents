[TOC]

## 使用受控组件绑定同一个函数时出现的问题

```jsx
// jsx 部分
<input onChange={this.handleChangeInput} type="text" id="addText" value={this.state.inputValue} />

<input id='addText2' value={this.state.inputValue2} onChange={this.handleChangeInput} type="text" />

// 函数部分 - 错误
  handleChangeInput = e => {
    this.setState((state) => {
      debugger
      return {
        inputValue: e.target.id === 'addText' ? e.target.value : state.inputValue,
        inputValue2: e.target.id === 'addText2' ? e.target.value : state.inputValue2
      }
    })
  }
```

当我在 debugger 的位置获取 e.target 时，会返回这样的错误：

> Warning: This synthetic event is reused for performance reasons. If you're seeing this, you're accessing the property `target` on a released/nullified synthetic event. This is set to null. If you must keep the original synthetic event around, use event.persist(). See https://fb.me/react-event-pooling for more information.

> 警告:出于性能原因，将重用此合成事件。如果您看到了这个，那么您正在访问一个已释放/无效合成事件的属性“target”。这个设置为null。如果必须保留原来的合成事件，那么使用 event.persist()。更多信息见https://fb.me/react-event-pooling 

大概是因为 `this.setState()` 在调用函数时无法获取 e.target，具体为什么，我不是很清楚，大概和异步有关。

修改如下：

```jsx
  handleChangeInput = e => {
    let id = e.target.id
    let value = e.target.value
    this.setState((state) => {
      return {
        inputValue: id === 'addText' ? value : state.inputValue,
        inputValue2: id === 'addText2' ? value : state.inputValue2
      }
    })
  }
```

将使用 target 的值放在 `this.setState()` 之外来获取。

也可以使用这样的方式：

```jsx
  handleChangeInput = e => {
    this.setState({
        inputValue: e.target.id === 'addText' ? e.target.value : this.state.inputValue,
        inputValue2: e.target.id === 'addText2' ? e.target.value : this.state.inputValue2
      }
    )
  }
```

也就是向 `this.setState` 传入对象而不是函数，就可以使用 e.target 的值了。但这样会有一个问题，由于这里使用了 this.state 的值，但 this.state 可能是异步更新，很有可能并不会更新，所以还是使用传入函数的方法比较好，这样就可以使用之前的 preState 的值了。



## 关于通过服务器获取渲染数据时的延迟问题

通常我们在页面中渲染数据是通过 componentDidmount 中获取数据然后再进一步渲染，这是在页面刚刚加载时所做的，但也会存在一种情况是页面已经加载，用户需要操作页面中的内容，比如删除，这样会有一个问题，当你删除某个内容或是移动时，如果依然是通过获取服务器数据来渲染，那么你得等到服务器响应以后返回数据你才能够在页面中有所反应，相应的会产生延迟。但也有一种方法可以解决这个问题，也就是你的渲染是基于本地的 state，因此你可以直接操作 state 中的数据来改变页面，也同时给服务器发送删除数据或改变数据的请求，这样就是及时的响应，但这样也会有一个问题，如果服务器出现问题，那么你页面中发生了改变但实际上服务器那边的数据并没有任何的改变，下一次用户重新刷新页面就会发现之前的操作是无效的。



当然面对这个问题，我是优先于让用户感受页面流程的体验的，所以最理想的情况是服务器一直很稳定。但为了避免服务器发生问题，当数据并没有在服务器端改变时给予用于一个提示，这样应该是一个良好的解决办法。或者有更好的方式？



可以让延迟有一个等待的动画，这可以帮助程序有一个更好的使用体验。



## 关于传入回调函数时的参数问题

```jsx
        <Route
          path="/create"
          render={({ history }) => (
            <CreateContact
              onCreateContact={contact => {
                this.createContact(contact)
                history.push('/')
              }}
            />
          )}
        />
```

这段代码中，像 render 属性传入了一个回调，当然这个 render 会在路径满足于 "/create" 时执行。在传入的这个回调中，第一个参数是一个对象，在函数的内部可以使用，这里使用解构，获取了这个对象中的 history 属性。

在这里我只是想探索一下关于回调中是如何使用其传入的参数的。

```jsx
function fun(func){
	func({a:1,b:2,c:3})
}

fun(function(obj){
	console.log(obj)
})

// 实际上在调用 fun 时，传入的函参可以理解为定义了一个变量并赋值，如下：
func = function(obj){
    console.log(obj)
}

// 然后再执行这个函数
```

上面这段代码中，就是利用了回调中的参数，其具体的使用方式是在定义父函数时就要在内部定义其回调的执行，并且传入执行时所使用的参数。这样在调用这个父函数时，你所使用的回调中便会有默认的参数。

还有一个问题。

为什么需要这样的函数呢？我想是因为这样就可以预先放入很多数据在这个函数中，方便调用 api 的程序员去使用。



## 使用箭头函数构建柯里化函数

```jsx
// 这是一个 curring 函数，在调用时你需要分开传入不同的参数才能完成最后的执行
const logger = store => next => action => {
  console.group(action.type)
  console.info('dispatching', action)
  let result = next(action)
  console.log('next state', store.getState())
  console.groupEnd(action.type)
  return result
}

// 这样调用
logger('storeValue')('nextValue')('actionValue')

// 如果只调用一次则会返回函数，而不会最终的值
```



## 为什么需要使用 redux-thunk

一些文章：

- [React常用插件介绍：React中我们为什么要用 redux-thunk,它能做什么？](https://blog.csdn.net/u010977147/article/details/53519183)
- [对于react-thunk中间件的简单理解](https://blog.csdn.net/weixin_38642331/article/details/81748312)
- [#6 异步actions & react-thunk](https://www.jianshu.com/p/8149ceb89de5)



我的理解：

redux-thunk 是为了解决使用 dispatch 传入 action 时，action 可能做更多的事情，比如异步操作（ajax或者setTimeout 等等），那么为什么不可以直接在组件中使用异步后调用 dispatch 呢？

原因是这样的调用没有重用性，不方便统一的管理。那如果我将 action 放入一个单独的文件中进行的统一的管理又会出现一个问题，缺少 dispatch，除非你传入 dispatch，但这样就会很麻烦，所以使用中间件的方式，通过 react-thunk 让 action 可以返回一个函数，在这个函数中处理异步是最好的方式。



