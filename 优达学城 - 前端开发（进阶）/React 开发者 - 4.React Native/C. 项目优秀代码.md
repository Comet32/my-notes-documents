# C. 项目优秀代码

[TOC]

## 利用 Object.keys 将对象循环出来

```jsx
{Object.keys(metaInfo).map(key => {
          const { getIcon, type, ...rest } = metaInfo[key]
          const value = this.state[key]

          return (
            <View key={key} style={styles.row}>
              {getIcon()}
              {type === 'slider' ? (
                <UdaciSlider
                  value={value}
                  onChange={value => this.slide(key, value)}
                  {...rest}
                />
              ) : (
                <UdaciSteppers
                  value={value}
                  onIncrement={() => this.increment(key)}
                  onDecrement={() => this.decrement(key)}
                  {...rest}
                />
              )}
            </View>
          )
        })}
```

- 注意，可以在 render 之前将对象内的属性解构出来使用。



## 使用对象解构将对象属性一一对应到组件属性中

```jsx
render(){
  const obj = {
    name: 'zhaoenxiao',
    age: 27,
    onPress(){
      console.log('噢')
    }
  }
  return <PersonalDate {...obj} />
}
```



## 使用 redux 管理数据时，如何将数据存在到 `LocalStorage` 

```jsx
// store.js

import { createStore } from 'redux';
import Reducer from '../reducers/reducer';

const configureStore = () => {
  const store = createStore(Reducer);

  store.subscribe(() => {
    localStorage.state = JSON.stringify(store.getState());
  });

  return store;
};

export default configureStore;
```



## 使用 mapStateToProps 中 state 作为判断标准

```jsx
function mapStateToProps(state) {
  const key = timeToString()
  return {
    alreadyLogged: state[key] && typeof state[key].today === 'undefined'
  }
}
```

- 这里并没有将 state 作为参数传入到组件的 props 中，而是利用 state 作为一个判断，返回布尔值。
- 为什么是什么 typeof 来检测数据的类型，而不是直接用数据判断是否为 undefined 呢？