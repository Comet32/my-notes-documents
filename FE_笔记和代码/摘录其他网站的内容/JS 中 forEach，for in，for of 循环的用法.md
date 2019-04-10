# #JS 中 forEach，for in，for of 循环的用法

> [来源地址](https://www.cnblogs.com/amujoe/p/8875053.html)

[TOC]

## 一、一般的遍历数组的方法:

```jsx
    var array = [1,2,3,4,5,6,7];  
    for (var i = 0; i < array.length; i) {  
        console.log(i,array[i]);  
    }  
```

## 二、用for in的方遍历数组

```js
    for(let index in array) {  
        console.log(index,array[index]);  
    };  
```

## 三、forEach

```js
array.forEach(v=>{  
    console.log(v);  
});
array.forEach（function(v){  
    console.log(v);  
});
 
```

## 四、用for in不仅可以对数组,也可以对 enumerable 对象操作

```js
var A = {a:1,b:2,c:3,d:"hello world"};  
for(let k in A) {  
    console.log(k,A[k]);  
} 
```

## 五、在ES6中,增加了一个for of循环,使用起来很简单

```js
    for(let v of array) {  
        console.log(v);  
    };  
    let s = "helloabc"; 

      for(let c of s) {  

      console.log(c); 

      }
```

总结来说: for in 总是得到对像的key或数组,字符串的下标（index 或者说 key）,而for of 和forEach 一样,是直接得到值。

for of 对于新出来的 Map,Set 上的使用

```js
    var set = new Set();  
    set.add("a").add("b").add("d").add("c");  
    var map = new Map();  
    map.set("a",1).set("b",2).set(999,3);  
    for (let v of set) {  
        console.log(v);  
    }  
    console.log("--------------------");  
    for(let [k,v] of map) {  
        console.log(k,v);  
    }  
```

javascript遍历对象详细总结

1.原生 javascript 遍历

（1）for 循环遍历

```js
let array1 = ['a','b','c'];
for (let i = 0;i < array1.length;i++){
  console.log(array1[i]);  // a  b  c 
}
```

（2）JavaScript 提供了 foreach()  map() 两个可遍历 Array对象的方法

forEach 和 map 用法类似，都可以**遍历到数组的每个元素**，而且参数一致； 

```js
Array.forEach(function(value , index , array){ //value为遍历的当前元素，index为当前索引，array为正在操作的数组
  //do something
},thisArg)      //thisArg为执行回调时的this值
```

**不同点：**

forEach() 方法对数组的每个元素执行一次提供的函数。总是返回 undefined；

map() 方法创建一个新数组，其结果是该数组中的每个元素都调用一个提供的函数后返回的结果。返回值是一个新的数组；

例子如下：

```jsx
var array1 = [1,2,3,4,5];
 
var x = array1.forEach(function(value,index){
 
    console.log(value);   //可遍历到所有数组元素
 
    return value + 10
});
console.log(x);   //undefined    无论怎样，总返回undefined
 
var y = array1.map(function(value,index){
 
    console.log(value);   //可遍历到所有数组元素
 
    return value + 10
});
console.log(y);   //[11, 12, 13, 14, 15]   返回一个新的数组
```

对于类似数组的结构，可**先转换为数组**，再进行遍历

```js
let divList = document.querySelectorAll('div');   //divList不是数组，而是 nodeList
 
//进行转换后再遍历
[].slice.call(divList).forEach(function(element,index){
  element.classList.add('test')
})
 
 
Array.prototype.slice.call(divList).forEach(function(element,index){
  element.classList.remove('test')
})
 
[...divList].forEach(function(element,index){   //<strong>ES6写法</strong>
  //do something
})
```

（3）for ··· in ···     /      for ··· of ···

`for...in` 语句以任意顺序遍历一个对象的可枚举属性。对于每个不同的属性，语句都会被执行。每次迭代时，分配的是**属性名**　　

补充 : 因为迭代的顺序是依赖于执行环境的，所以数组遍历不一定按次序访问元素。 因此当迭代那些访问次序重要的 arrays 时用整数索引去进行 [`for`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/for) 循环 (或者使用 [`Array.prototype.forEach()`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach) 或 [`for...of`](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of) 循环) 。

```js
let array2 = ['a','b','c']
let obj1 = {
  name : 'lei',
  age : '16'
}
 
for(variable  in array2){   //variable  为 index
  console.log(variable )   //0 1 2
}
 
for(variable  in obj1){   //variable 为属性名
  console.log(variable)   //name age
}
```

 ES6 新增了 遍历器(Iterator)机制，为不同的数据结构提供统一的访问机制。只要部署了Iterator 的数据结构都可以使用 for ··· of ··· 完成遍历操作  ( Iterator详解 ：  http://es6.ruanyifeng.com/#docs/iterator )，每次迭代分配的是 **属性值**

 原生具备 Iterator 接口的数据结构如下：

 Array  Map Set String TypedArray 函数的 arguments 对象 NodeList 对象

```js
let array2 = ['a','b','c']
let obj1 = {
  name : 'lei',
  age : '16'
}
 
for(variable  of array2){   //<strong>variable  为 value</strong>
  console.log(variable )   //'a','b','c'
}
 
for(variable  of obj1){  //<strong>普通对象不能这样用</strong>
  console.log(variable)   // 报错 ： main.js:11Uncaught TypeError: obj1[Symbol.iterator] is not a function
}<br><br>let divList = document.querySelectorAll('div');<br><br>for(element of divlist){  //可遍历所有的div节点<br>　　//do something <br>}
```



如何让普通对象可以用 for of 进行遍历呢？  http://es6.ruanyifeng.com/#docs/iterator  一书中有详细说明了！



除了迭代时分配的一个是属性名、一个是属性值外，for in 和 for of 还有其他不同    (MDN文档： https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Statements/for...of)

for...in循环会遍历一个object所有的可枚举属性。

for...of会遍历具有 iterator 接口的数据结构

  `for...in` 遍历（当前对象及其原型上的）每一个属性名称,而 `for...of遍历（当前对象上的）每一个属性值`



```jsx
Object.prototype.objCustom = function () {};
Array.prototype.arrCustom = function () {};
 
let iterable = [3, 5, 7];
iterable.foo = "hello";
 
for (let i in iterable) {
  console.log(i); // logs 0, 1, 2, "foo", "arrCustom", "objCustom"
}
 
for (let i of iterable) {
  console.log(i); // logs 3, 5, 7
}
```

 