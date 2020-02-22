# typescript-技巧-1

[toc]

## 1.使用 ! 和 ? 来更加方便的调用可能为未定义的对象的属性或是方法

```ts
interface Obj {
  foo?: () => void;
  a?: {
    b?: number
  }
}

const obj: Obj = {
  foo(){},
}

obj.foo!() // `!` 能够忽略其 `undefined` 或是 `null` 的类型，但如果 foo 为 undefined 或 null 则会造成程序报错中止
obj.a?.b // 可以使用 `?` 来作为一个拦截或是预判断，如果是 null | undefined 则返回其值，并且不会继续调用

console.log('obj.a?.b', obj.a?.b) // --> undefined
```

- 注意 `!` 只是忽略变量为 `undefined` 和 `null` ，所以会有造成报错的可能。