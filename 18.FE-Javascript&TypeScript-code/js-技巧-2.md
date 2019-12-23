# javascript-技巧-1

[toc]

以下是 9 个功能强大的  JavaScript hack 技巧。

### 1. 全部替换

我们知道 `string.replace()` 函数仅替换第一次出现的情况。

你可以通过在正则表达式的末尾添加 `/g` 来替换所有出现的内容。

```js
1var example = "potato potato";
2console.log(example.replace(/pot/, "tom")); 
3// "tomato potato"
4console.log(example.replace(/pot/g, "tom")); 
5// "tomato tomato"
```

### 2. 提取唯一值

通过使用 Set 对象和展开运算符，我们可以创建一个具有唯一值的新数组。

```js
var entries = [1, 2, 2, 3, 4, 5, 6, 6, 7, 7, 8, 4, 2, 1]
var unique_entries = [...new Set(entries)];
console.log(unique_entries);
// [1, 2, 3, 4, 5, 6, 7, 8]
```

### 3. 将数字转换为字符串

我们只需要使用带空引号的串联运算符。

```js
var number = 5
var convertedNumber = number + "";
console.log(converted_number);
// 5
console.log(typeof converted_number); 
// string
```

使用`${var}` 模版字面量：

```   js
var number = 5
var convertedNumber = `${number}`
console.log(converted_number);
// 5
console.log(typeof converted_number); 
// string
```

### 4. 将字符串转换为数字

我们需要的只是 `+` 运算符。

请注意它仅适用于“字符串数字”。

```js
the_string = "123";
console.log(+the_string);
// 123

the_string = "hello";
console.log(+the_string);
// NaN
```

### 5. 随机排列数组中的元素

**我每天都在这样做**

```js
var my_list = [1, 2, 3, 4, 5, 6, 7, 8, 9];
console.log(my_list.sort(function() {
    return Math.random() - 0.5
})); 
// [4, 8, 2, 9, 1, 3, 6, 5, 7]
```

### 6. 展平二维数组

只需使用展开运算符。

```js
1var entries = [1, [2, 5], [6, 7], 9];
2var flat_entries = [].concat(...entries); 
3// [1, 2, 5, 6, 7, 9]
```

- 这里利用了 `concat` 方法中的参数对于 `Array` 类型参数会进行解构 push 到调用此方法的数组的能力，对于非数组类型则直接添加。比如 String、Number、Object、Function、Boolean 等。

- 这让我去尝试了添加一个函数并调用，像这样：

  ```js
  [].concat(function(){return 'function'})[0]() // --> 'function'
  ```

- 那么同样，是否可以遍历一个函数数组呢。试试：

  ```js
  var functionArr = [];
  for(let i = 0; i < 5; i++){
   functionArr.push(function(){console.log(`function ${i}`)})   
  }
  functionArr.forEach(foo => {
      foo()
  })
  // function 0
  // function 1
  // function 2
  // function 3
  // function 4
  ```

- 如果是一个 promise 数组呢？并且没有使用 `Promise.all` 进行调用，而且位于前面的 promise 最后进入 `resolve` 状态，看一下：

  ```js
  var promiseArr = [];
  for (let i = 0; i < 5; i++) {
    const promise = new Promise(resolve => {
      setTimeout(() => {
        resolve(`index 为 ${i} 的 promise`)
      }, 5 - i);
    });
    promiseArr.push(promise);
  }
  promiseArr.forEach(promise => {
    promise.then(res => console.log(res))
  });
  // index 为 4 的 promise
  // index 为 3 的 promise
  // index 为 2 的 promise
  // index 为 1 的 promise
  // index 为 0 的 promise
  ```

- 返回结果符合预期，最先执行 `resolve()` 函数的 promise 先调用 `then` 方法。

#### 展平多维数组

由展平二位数组让我想要去尝试对于不确定有几个维度的数组呢？尝试一下：

```js
function flattenArr(arr){
  let resArr = []
  if(!Array.isArray(arr)){
    throw new Error('parameter is not a array')
  }
  for (const item of arr) {
    if(Array.isArray(item)){
      resArr = resArr.concat(flattenArr(item))
      // or
      // resArr.push(...flattenArr(item))
    }else{
      resArr = resArr.concat(item)
      // or
      // resArr.push(item)
    }
  }
  return resArr
}
flattenArr([[1,2,[3,4,[5,6]]]])
// --> [1, 2, 3, 4, 5, 6]
```

- 当然，对于不知道有多少层的情况下就会用到「递归」，其跳出条件为是否是数组。
- 同时，这里也用到了「迭代」，`resArr` 在「遍历」arr 时接收传入新的元素并用于下一次的循环之中。
- 在向 `resArr` 数组中添加元素时，可以调用 `concat` 方法接收新的元素，并且如果是通过递归调用 `flattenArr` 方法返回的数组元素也能够直接与 `resArr` 拼接，但注意需要将其调用后的返回的新数组重新赋值给 `resArr` ；也可以使用 `push` 方法，不过对于 `flattenArr` 方法返回的数组元素需要使用解构(`...`)为多个实参传入 `push` 之中。

### 7. 缩短条件语句

让我们来看这个例子：

```js
if (available) {
    addToCart();
}
```

通过简单地使用变量和函数来缩短它：	

```js
available && addToCart()
```

### 8. 动态属性名

我一直以为必须先声明一个对象，然后才能分配动态属性。

```js
const dynamic = 'flavour';
var item = {
    name: 'Coke',
    [dynamic]: 'Cherry'
}
console.log(item); 
// { name: "Coke", flavour: "Cherry" }
```

### 9. 使用 length  调整/清空数组

我们基本上覆盖了数组的 length 。

如果我们要调整数组的大小：

```js
var entries = [1, 2, 3, 4, 5, 6, 7];  
console.log(entries.length); 
// 7  
entries.length = 4;  
console.log(entries.length); 
// 4  
console.log(entries); 
// [1, 2, 3, 4]
```

如果我们要清空数组：

```js
var entries = [1, 2, 3, 4, 5, 6, 7]; 
console.log(entries.length); 
// 7  
entries.length = 0;   
console.log(entries.length); 
// 0 
console.log(entries); 
// []
```

以上原文：https://dev.to/razgandeanu/9-extremely-powerful-javascript-hacks-4g3p

### 10.书写冗余的逗号

**以逗号结尾**

数组和对象一样，都可以在末尾冗余一个逗号：

```javascript
let fruits = [
  "Apple",
  "Orange",
  "Plum",
];
```

因为每一行都是相似的，所以这种以“逗号结尾”的方式使得插入/移除项变得更加简单。意思是，在实际书写代码时可以很方便的直接添加新的元素，或者直接删除，而不需要在添加之前再添加一个 `,`