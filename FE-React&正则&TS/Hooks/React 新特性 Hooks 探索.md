# React 新特性 Hooks 探索

> 原文地址：[可能是比Mixin更好的方案：React新特性Hooks探索](https://www.ruphi.cn/archives/346/)
>
> 作者：* RuphiLau
>
> 时间：* November 21, 2018

[TOC]

## 一、什么是Hooks？

Hooks 是 React 新引入的一个特性，它允许我们能够不采用`类式声明组件`方式来使用状态和 React 其他特性（如生命周期、Ref、Context 等），简单的例子如下：

```jsx
import { useState } from 'react'

function Example() {
    const [count, setCount] = useState(0)
    return (
        <div>
            <p>点击了{count}次</p>
            <button onClick={() => setCount(count+1)}>+1</button>
        </div>
    )
}
```



## 二、为什么要引入Hooks？

Hooks 其实算不上是一个突破性改变（ Breaking changes ），它实际上是完全可选且 100% 向后兼容的，它也不是为了取代`类式声明组件`，也不是为了取代现有的 React 开发理念，而是提供一种更直接的 API 来使用我们已知的那些 React 特性：属性(props)、状态(state)、上下文( context )、引用(refs)和生命周期等。
之所以要引入Hooks，是源自于我们日常开发中的一些痛点，如：

### 1、在组件之间难以复用有状态逻辑

在大型的 React 项目中，可能很多组件都是用 Class 写的，Class 本身包含了状态，组件冗长难以复用。而React本身又没有提供什么比较好的重用行为的方法，之前解决这些问题，我们会采取的方式则有如`使用渲染属性`、`使用高阶组件`这些方式，即：

**渲染属性（Render Props）**

```jsx
// 渲染属性（类似于Vue里的作用域插槽）
<DataProvider render={data => (
    <h1>{data.title}</h1>
)} />

class DataProvider extends React.Component {
    constructor(props) {
        super(props)
        this.state = { title: 'Hello, world' }
    }
    render() {
        return this.props.render(this.state)
    }
}
```

**高阶组件（HOC）**

```jsx
const withUser = WrappedComponent => {
    const user = sessionStorage.getItem('user')
    return props => <WrappedComponent user={user} {...props} />
}
    
const User = props => <span>用户名：{props.user}</span>

export default withUser(User)
```

虽然这两种模式看似不错，也在很多库里得到了大量运用（如ReactRouter），但是这两种方式会增加`层级嵌套`关系，导致我们有时候明明只想增加一个简单的功能，却在多次的功能增强开发后，出现了nest hell（`嵌套地狱`）

这些场景下，会使得代码难以追踪，所以：React 需要更好的 **原语** 来共享原有状态逻辑。而Hooks便是这种共享状态逻辑的原语，我们通过提取 Hooks，便可实现状态逻辑的重用，也方便进行独立测试。

### 2、复杂的组件变得难以理解

在组件刚开始时可能比较简单，但随着功能的增强，会变成一堆难以管理的逻辑和副作用。比如我们会希望一个函数是单一职责的，但是生命周期钩子函数里却做了很多事情，比如会在`componentDidMount`里发起异步请求、绑定事件监听函数，并且，还有可能是出于业务逻辑需要，我们可能还得在`componentDidUpdate`里再做一遍一样的事情，这样子繁琐且易出错。

### 3、人和机器都容易混淆的类

React 官方认为，类可能是学习React的一大门槛（需要对Javascript有较好的认知，理解清楚this指向问题），而且对于事件处理，在不借助`class properties`的情况下（这是个非稳定提案，需要babel支持），需要进行this的绑定，即：

```jsx
class Comp extends React.Component {
    // class properties模式
    handleClick = () => {
        ...
    }
    // 普通模式
    constructor() {
        this.handleClick = this.handleClick.bind(this)
    }
    handleClick() {
        ...
    }
}
```

并且，React官方一直在尝试使用 Prepack 进行**组件折叠**的尝试，但是发现了类式组件可能会鼓励无意识的模式，使得优化回退到较慢的路径，并且类不能很好地进行压缩，还使得热更新加载变得片状和不可靠，所以Hooks的出现允许开发中在没有类的情况下使用更多的React功能，一如React所推崇的函数式编程那样，拥抱函数。
**扩展阅读（组件折叠）：**

```jsx
// Foo.js
function Foo(props) {
    if (props.data.type === 'img') {
        return <img src={props.data.src} className={props.className} alt={props.alt} />
    }
}

Foo.defaultProps = {
    alt: 'An image of Foo'
}

export default Foo

// Classes.js
export default {
    bar: 'bar'
}

// Bar.js
import Foo from './Foo'
import Classes from './Classes'

function Bar(props) {
    return <Foo data={{ type: 'img', src: props.src }} className={Classes.bar} />
}
```

由于知道了`Foo`和`Classes`是怎么组成的，所以可以把Bar组件优化为：

```jsx
import Foo from './Foo'
import Classes from './Classes'

function Bar(props) {
    return <Foo data={{ type: 'img', src: props.src }} className={Classes.bar} />
}

function Bar_optimized(props) {
    return <img src={props.src} className="Bar" alt="An image of Foo" />
}
```

在进行死码删除（编译的最佳优化手段，删除对执行结果没有任何影响的代码）后，最终可以变成：

```jsx
function Bar_optimized(props) {
    return <img src={props.src} className="Bar" alt="An image of Foo" />
}
```



## 三、学习Hooks的使用

### 1、状态Hook

状态Hook可以让我们在函数组件中使用状态，通过`useState`函数提供这个功能。我们首先需要引入useState，而后在函数组件里使用，如：

```jsx
import { useState } from 'react'

function Comp() {
    const [count, setCount] = useState(0)
    // ...
}
```

我们会发现，`useState()`可以接收一个参数，并且返回的值是一个数组，从而可以被解构。其语法可以总结为：函数返回值的第一项为状态变量（可供获取状态值），第二项为更新状态的函数，而传入的参数则提供给函数作为初始状态。如果和类式组件进行对比，以上代码等同于：

```jsx
class Comp extends React.Component {
    setCount = (count) => {
        this.setState({ count })
    }
    constructor() {
        this.state = {
            count: 0
        }
    }
    // ...
}
```

我们可能会有疑问，为什么`useState`要命名为`useState`而不是`createState`，这是因为：状态仅在第一次渲染组件时创建，而下一次渲染时，提供的则是当前的状态。
此外，`useState`是可以声明多个的，并且也可以进行局部的更新，如：

```jsx
function Profile() {
    const [age, setAge] = useState(22)
    const [name, setName] = useState('')
    const [hobbies, setHobbies] = useState([])
    // 只设置name
    setName('RuphiLau')
}
```

### 2、Effect Hook

Effect Hook 使我们可以在函数组件内执行带有副作用，如我们想要在每次count更新后，更新页面标题，可以这么写：

```jsx
import { useState, useEffect } from 'react'
function Example() {
    const [count, setCount] = useState(0)
    useEffect(() => {
        document.title = `点击了${count}次`
    })
    // ...
}
```

获取数据、创建订阅、手动改变DOM等行为，在React里都视为副作用，因为它们会导致函数不是一个纯函数。而`useEffect()`，其实就相当于类式组件里，生命周期`componentDidMount`、`componentDidUpdate`和`componentWillUnmount`的结合。

如果把 React 组件的副作用归结一下，可以分为两种：需要清理的、不需要清理的，具体来说是：
**不需要清理的副作用**

有这么一些场景，如网络请求、手动变更 DOM 和日志记录等，这些通常在 React 更新 DOM 之后执行。而且很显然，它们不会带来什么资源占用，所以我们可以在它们执行后就不管了，这类副作用就是无需清理的。

在类式组件里，`render()`方法本身不应该产生副作用，所以我们会将副作用放置于`componentDidMount`和`componentDidUpdate`这些生命周期方法中，如：

```jsx
class Comp extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            count: 0
        }
    }
    componentDidMount() {
        document.title = `点击了${this.state.count}次`
    }
    componentDidUpdate() {
        document.title = `点击了${this.state.count}次`
    }
    // ...
}
```

从例子可见，我们不得不在两个生命周期方法里写重复的逻辑，太麻烦了！而实际上，我们很多时候就只想在组件挂载和更新时执行同样的副作用。总而言之就是，我们想要的是在每次渲染后就执行副作用，但 React 的类式组件却没有这样子的一个方法，虽然我们可以把同样的逻辑抽取成一个函数，但是仍然需要在两个生命周期方法里执行。所以，`useEffect`这个Hook，就是专门解决这个问题的，就像这样：

```jsx
import { useState, useEffect } from 'react'

function Comp() {
    const [count, setCount] = useState(0)
    useEffect(() => {
        document.title = `点击了${count}次`
    })
    return (
        <div>
            <p>点击了{count}次</p>
            <button onClick={() => setCount(count + 1)}>+1</button>
        </div>
    )
}
```

通过这么写，React会记住我们传递给`useEffect()`的回调，然后在每次组件渲染DOM更新后，组件就会执行`useEffect()`回调里的逻辑。而通过在组件内部声明 useEffect 的回调，回调本身就在函数作用域内，所以可以访问到所需的状态，因此这种JS原有的机制，使得React不需要额外的处理，就能够在每次副作用执行的时候访问到所需要的状态。那么，我们还有个问题：`useEffect`会在每次渲染后都执行吗？答案是是的，默认情况下，`useEffect Hook`会在组件第一次渲染和每次更新后都执行，但是这个行为也是可以改变的。所以，理解`useEffect()`的执行时机，我们不要从组件挂载(mount)和更新(update)的角度去看待，而是从组件渲染(render)后的角度去看待。
我们可能还注意到了：每次传给`useEffect()`的都是不同引用的函数，这种设计其实是有意的，因为这样子能够保证每次执行时都访问最新的状态值，而非是脏的数据。
与`componentDidMount`/`componentDidUpdate`不同的是，`useEffect()`的执行并不会阻塞浏览器更新视图，它是异步执行的，所以使用它来执行副作用，可以使得应用响应更快。而之所以可以这么设计，是因为大部分场景下，副作用的执行并不需要同步。而对于那些需要同步执行的副作用场景，React也给出了相应的解决方案，采用`useLayoutEffect()`便可。

**需要清理的副作用**
在一些场景，如订阅场景中，我们需要在`componentDidMount`时进行订阅，在`componentWillUnmount`时取消订阅，避免造成内存泄露，如在类式组件中，我们可以这么做：

```js
class FriendStatus extends React.Component {
    constructor(props) {
        super(props)
        this.state = { isOnline: null }
        this.handleStatusChange = this.handleStatusChange.bind(this)
    }
  
    componentDidMount() {
        ChatAPI.subscribeToFriendStatus(
            this.props.friend.id,
            this.handleStatusChange
        )
    }
  
    componentWillUnmount() {
        ChatAPI.unsubscribeFromFriendStatus(
            this.props.friend.id,
            this.handleStatusChange
        )
    }
  
    handleStatusChange(status) {
        this.setState({
            isOnline: status.isOnline
        })
    }
  
    render() {
        if (this.state.isOnline === null) {
            return 'Loading...'
        } 
        return this.state.isOnline ? 'Online' : 'Offline'
    }
}
```

那么，在`useEffect`里怎么实现需要清理的场景呢？答案是：返回一个函数即可，如：

```js
function FriendStatus(props) {
    const [isOnline, setIsOnline] = useState(null)
    function handleStatusChange(status) {
        setIsOnline(status.isOnline)
    }
    useEffect(() => {
        ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange)
        return function cleanup() {
            ChatAPI.ubsubscribeFromFriendStatus(
                props.friend.id,
                handeStatusChange
            )
        }
    })
    if (isOnline === null) {
        return 'Loading...'
    }
    return isOnline ? 'Online' : 'Offline'
}
```

我们在日常开发中还会发现：我们经常在生命周期函数里写了很多可独立拆分的副作用，如：

```js
// ...
componentDidMount() {
    // 设置标题 
    document.title = `点击了${this.state.count}次`
    // 设置订阅
    ChatAPI.subscribeToFriendStatus(
        this.props.friend.id,
        this.handeStatusChange
    )
}
// ...
```

这种情况下，导致生命周期钩子方法职责不单一，而在 Hooks 里，我们其实可以把这些独立的副作用，通过声明不同的`useEffect`来处理，如：

```js
function FriendStatusWithCounter(props) {
    const [count, setCount] = useState(0)
    useEffect(() => {
        document.title = `点击了${this.state.count}次`
    })
    const [isOnline, setIsOnline] = useState(null)
    useEffect(() => {
        ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange)
        return () => {
            ChatAPI.ubsubscribeFromFriendStatus(
                props.friend.id,
                handeStatusChange
            )
        }
    })
    function handleStatusChange(status) {
        setIsOnline(status.isOnline)
    }
}
```

在类式组件里，我们还会遇到以下棘手的问题，以之前的例子说明：
1）`props`改变了（如改变了friendId），所以我们需要通过`componentDidUpdate`来进行处理：先取消订阅原来的friendId，再订阅新的 friendId
2）如果我们没有进行`componentDidUpdate`，那么props改变了，会导致展示的在线状态不对；而若没有处理改变，还会导致新订阅的friendId越来越多，原来的friendId得不到清除，仍然会造成内存泄露问题
但是在`useEffect()`里我们却不需要担心这个问题，`useEffect()`里返回的函数会在适当时机执行，那么什么是适当的时机呢？且看例子：

```js
// 挂载时：{ friend: { id: 100 } }
ChatAPI.subscribeToFriendStatus(100, handleStatusChange)  // 首次渲染
// 更新时：{ friend: { id: 200 } }
ChatAPI.unsubscribeToFriendStatus(100, handleStatusChange) // 清除此前副作用
ChatAPI.subscribeToFriendStatus(200, handleStatusChange) // 执行新的副作用
// 更新时：{ friend: { id: 300 } }
ChatAPI.unsubscribeToFriendStatus(200, handleStatusChange) // 清除此前副作用
ChatAPI.subscribeToFriendStatus(300, handleStatusChange) // 执行新的副作用
// 卸载组件时
ChatAPI.unsubscribeToFriendStatus(300, handleStatusChange)
```

所以总结起来就是：在组件更新/卸载时，执行返回的函数里的逻辑
**此外，useEffect()还能接收第二个参数，表示对应的值只有在更新时才执行副作用**，这在进行优化时尤其有用。我们在开发React应用时，常常会遇到这种场景：

```js
// ...
componentDidUpdate(prevProps, prevState) {
    if (prevState.count !== this.state.count) {
        document.title = `点击了${this.state.count}次`
    }
}
// ...
```

也就是：只在值变了的时候，才执行副作用。而这场景在`useEffect()`里变得尤其简单，改写如下：

```js
// 只有在count值变更的时候，才重新执行回调里的逻辑
useEffect(() => {
    document.title = `点击了${count}次`
}, [count])
```

而应用这个特性，我们还可以实现只在挂载/卸载时执行回调逻辑，做法也很简单，第二个参数传入数组即可，如：

```js
useEffect(() => {
    console.log('组件挂载了')
    return () => console.log('组件卸载了')
}, [])
```



## 四、使用Hooks的规约（注意事项）

Hooks是Javascript函数，在使用Hooks的时候需要遵守两个规则，而React官方也提供了相应的linter插件来帮我们强制遵守规约。插件的使用方式如下：

```sh
npm install eslint-plugin-react-hooks@next
```

然后在ESLint配置里配置如下：

```json
{
    "plugins": [
        // ...
        "react-hooks"
    ],
    "rules": {
        // ...
        "react-hooks/rules-of-hooks": "error"
    }
}
```

### 1、只在顶部调用Hooks

**切勿在循环体、条件体或嵌套函数内部调用Hooks**，应该总是在React函数的顶部使用Hooks。通过遵守这个规约，我们才能确保Hooks在每次组件渲染的时候以同样的顺序调用。否则会导致React不能正确地区分多个`useState`调用和多个`useEffect`调用，这是和Hooks的实现有关的（具体原因下面会解释）

### 2、只在React函数里调用Hooks

**不要在常规的JavaScript函数里调用Hooks**，而是应该：
1）在React函数里调用Hooks
2）在自定义Hooks里调用Hooks
通过遵守这个规约，可以让组件里的状态逻辑在源码里清晰可见



## 五、Hooks的机制解释

我们通过前面的介绍，知道在React里可以调用多次`useState`，也可以调用多次`useEffect`，如：

```jsx
function Form() {
    const [name, setName] = useState('Ruphi')
    useEffect(function persistForm() {
        localStorage.setItem('formData', name)
    })
    const [surname, setSurname] = useState('Lau')
    useEffect(function updateTitle() {
        document.title = `${name} ${surname}`
    })
}
```

那么，在`useState`/`useEffect`里并没有额外的参数标识，React怎么能在组件下次渲染时正确区分多个Hooks呢？这是因为：**React依赖于Hooks的调用顺序**，是根据顺序进行识别的，所以我们需要确保每次组件渲染时，每个Hooks的调用顺序都一致。且看如下例子：

```jsx
// 首次渲染
useState('Ruphi')       // 1.初始化name状态，初始赋值Ruphi
useEffect(persistForm)  // 2.加入`持久化表单`的副作用
useState('Lau')         // 3.初始化surname状态，初始赋值Lau
useEffect(updateTitle)  // 4.加入`更新标题`的副作用

// 第二次渲染
useState('Ruphi')       // 1.读取name状态，忽略参数
useEffect(persistForm)  // 2.替换`持久化表单`副作用回调函数
useState('Lau')         // 3.读取surname状态，忽略参数
useEffect(updateTitle)  // 4.替换`更新标题`副作用回调函数

// ...
```

所以只要每次渲染之间的顺序是一致的，React就能正确将Hooks调用和存储的本地状态关联起来，那么，如果我们在条件里调用Hook，会怎么样呢？

```jsx
if (name !== '') {
    useEffect(function persistForm() {
        localStorage.setItem('formData', name)
    })
}
```

由于第一次渲染时`name !== ''`条件为true，因此Hook执行了。然而，在下次渲染时，用户有可能清除了表单，使得条件为false，所以在下次渲染时，该Hook就被跳过了，变成了：

```jsx
useState('Ruphi')
// useEffect(persistForm)
useState('Lau')
useEffect(updateTitle) 
```

会导致：

```jsx
useState('Ruphi')           // 1.读取name状态，忽略参数
// useEffect(persistForm)   // 跳过了
useState('Lau')             // 2.被认为是2号Hook，实际是3号，无法读取surname状态
useEffect(updateTitle)      // 3.被认为是3号Hook，实际是4号，无法替换副作用
```

所以React此时无法知道第二个`useState`调用要返回什么，React期望第二个Hook调用像前次调用一样回应的是`persistForm`副作用，但是此时却不是，所以也就没有办法正确处理了，就会导致Bug
所以，这就是为什么我们需要在组件顶部调用Hooks的原因，如果我们要有条件地执行副作用，那么条件体应该放在Hook里，如：

```jsx
useEffect(function persistForm() {
    if (name !== '') {
        localStorage.setItem('formData', name)
    }
})
```



## 六、构建自己的Hooks

构建自己的Hooks，可以让我们把组件逻辑抽取为可复用的函数块。在我们学习`useEffect`Hook的时候，看到了聊天应用显示了一条信息显示用户在线或者离线。而现在，我们有一个新的需求：我们需要一个联系人列表，对于在线的用户，用户名需要显示为绿色。我们可以复制粘贴之前相似的逻辑到`FriendListItem`组件里，如：

```jsx
function FriendListItem(props) {
    const [isOnline, setIsOnline] = useState(null)
    function handleStatusChange(status) {
        setIsOnline(status.isOnline)
    }
    useEffect(() => {
        ChatAPI.subscribeToFriendStatus(props.friend.id, handleStatusChange)
        return () => {
            ChatAPI.unsubscribeFromFriendStatus(
                props.friend.id,
                handleStatusChange
            )
        }
    })
    return (
        <li style={{ color: isOnline ? 'green' : 'black' }}>
            {props.friend.name}
        </li>
    )
}
```

然而，这种方式真的是太笨拙了，我们希望能够复用`FriendStatus`里的逻辑。而在传统React实现方式里，实现办法是渲染属性或者高阶组件。但是，既然有了Hooks，我们就要看看Hooks的威力了，且看它如何解决同样的问题，又不增加组件树层级。

### 1、抽取定制的Hook

当我们想要在两个JavaScript组件之间共享逻辑的时候，我们可以抽取为一个第三方的函数，组件和Hooks都是函数，所以这种做法也是可以应用在组件和Hooks上的。定制一个Hook，规约是以`use`命名开头的JavaScript函数，并且可以调用其他的Hook，如下的`useFriendStatus`为例：

```jsx
function useFriendStatus(friendId) {
    const [isOnline, setIsOnline] = useState(null)
    function handleStatusChange(status) {
        setIsOnline(status.isOnline)
    }
    useEffect(() => {
        ChatAPI.subscribeToFriendStatus(friendId, handleStatusChange)
        return () => {
            ChatAPI.unsubscribeToFriendStatus(friendId, handleStatusChange)
        }
    })
    return isOnline
}
```

与React组件不同的是，定制的Hook不需要使用指定的函数签名，我们可以任意指定它的参数。现在有了`useFriendStatus`后，我们就可以在两个组件内共享状态逻辑了，如下：

```jsx
function FriendStatus(props) {
    const isOnline = useFriendStatus(props.friend.id)
    if (isOnline === null) {
        return 'Loading...'
    }
    return isOnline ? 'Online' : 'Offline'
}

function FriendListItem(props) {
    const isOnline = useFriendStatus(props.friend.id)
    return (
        <li style={{ color: isOnline ? 'green' : 'black' }}>
            {props.friend.name}
        </li>
    ) 
}
```

那么，两个组件共享了状态逻辑，是否意味着它们共享了状态？答案是：否，定制Hook是一种复用状态逻辑的机制，但是每次我们所使用的定制Hook，其状态和副作用都是 **完全独立的**。可以记住：**在一个组件内部的不同Hook调用，都是完全独立和隔离的**。那么，既然它们是完全独立隔离的，那我们怎么在它们之间传递信息？其实做法也很简单，通过函数参数传递就可以了，如：

```jsx
const friendList = [
    { id: 1, name: 'Harry' },
    { id: 2, name: 'Newt' }
]

function ChatRecipientPicker() {
    const [recipientID, setRecipientID] = useState(1)
    const isRecipientOnline = useFriendStatus(recipientID)
    return (
        <>
            <Circle color={isRecipientOnline ? 'green' : 'red'} />
            <select
                value={recipientID}
                onChange={e => setRecipientID(e.target.value)}>
                {friendList.map(friend => (
                    <option key={friend.id} value={friend.id}>
                        {friend.name}
                    </option>
                ))}
            </select>
        </>
    )
}
```



## 七、Mixin与Hooks

在React的早期版本中，我们可以通过`createReactClass()`来使用Mixin功能，如：

```jsx
const Comp = createReactClass({
    mixins: [SomeMixin],
    // ...
})
```

但是在React拥抱ES6 Class后，便不再提供Mixin的支持，而官方也明确地不建议使用Mixin：

> **Note:**
> ES6 launched without any mixin support. Therefore, there is no support for mixins when you use React with ES6 classes.
>
> **We also found numerous issues in codebases using mixins, and don’t recommend using them in the new code.**

翻译如下：

> ES6运行方式不支持任何Mixin，因此，当结合ES6 Class特性使用React时是无法支持Mixin的。**我们也发现了许多的代码库使用了Mixin，但是不推荐在新的代码里使用Mixin了**。

Mixin虽然有时候很方便，但是其实通过我们大量的实践中，我们会发现Mixin会有如下的一些缺点：
1）Mixin是不隔离作用空间的，所以随着组件复杂度的增大，大量Mixin的存在会导致我们难以维护，不好去追踪作用空间，甚至还会有交叉污染的问题
2）Mixin依赖于特定上下文，不方便进行独立测试，复用上也没有那么方便
而Hooks虽然也是一种在组件里混入代码的方式，但是它与Mixin的核心不同点在于Hooks的 **作用空间是独立隔离的**，这就使得我们可以放心地使用Hooks而无需担心`交叉污染`的问题。此外由于Hooks的隔离性，TDD也成为了可能。



## 八、总结

学习Hooks特性，核心在于理解它能够解决的问题场景，而Hooks里的基本特性是`useState`和`useEffect`以及自定义Hook，理解了它们后，其他的官方Hooks也就很容易理解了。目前Hooks特性得到了社区的极大关注，号称可能是今年以来React最为劲爆的特性，而Vue官方也在第一时间创建了`vue-hooks`仓库，将完成对`Hooks`的支持。可见Hooks会成为将来前端开发中的一把利器，帮助我们更好地解决日常开发问题。

## 参考文档

- [React Official Documents - Hooks (PROPOSAL)](https://reactjs.org/docs/hooks-intro.html)
- [Optimizing Compiler: Component Folding](https://github.com/facebook/react/issues/7323)
- [Dead code elimination](https://en.wikipedia.org/wiki/Dead_code_elimination)