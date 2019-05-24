参考资料：

- https://blog.csdn.net/kuangshp128/article/details/67632683

### 使用方式

- 安装:`npm install redux-thunk --save-dev`
- 导入thunk： `import thunk from 'redux-thunk'`
- 导入中间件: `import {createStore,applyMiddleware} from 'redux'`
- 创建store：`let store = createStore(reducer函数，applyMiddleware(thunk))`
- 激活`redux-thunk`中间件，只需要在`createStore`中加入`applyMiddleware(thunk)`就可以

### 具体使用

```react
//action创建函数
function add() {
    return {
        type: 'ADD',
    }
}

// 创建一个返回带有 (dispatch, getState) 形参函数的函数，其内部需要调用 dispatch() 并传入相应的 action
function addAsy(delay = 2000) {
    return (dispatch, getState) => {
        setTimeout(() => {
            dispatch(add())
        }, delay)
    }
}

//使用 store.dispatch() 分发任务
store.dispatch(addAsy())
```

在这个事例中，addAsy 函数内所返回函数中，setTimeout() 也想象为一个异步操作，只有当这个操作执行完毕以后我们才真正的向 store 分派 action 改变其状态。

也就是说，当我们需要使用异步请求来获取数据并利用这个数据改变其 store 的状态时，可以使用 Thunk 作为一个中间件，在 action 还未抵达 reducer 时将一些数据进行更改。

