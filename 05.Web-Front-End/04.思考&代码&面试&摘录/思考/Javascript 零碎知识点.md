# Javascript 零碎知识点

[TOC]

## JavaScript 的函数声明与函数表达式的区别

### 1.什么是函数声明

函数声明以 function 关键字开头，接着是**必须**的函数（变量）名和以逗号分隔的可选的参数列表，再接着就是以大括号封装的函数体。函数声明必须是一个**单独的JavaScript语句**。

比如：

```javascript
//函数声明
function myFunctionDeclaration(){
  function innerFunction() {}
}
```

### 2.什么是函数表达式

在任何情况下都是其它JavaScript语句的一部分（比如赋值表达式等号的右侧、函数的参数）的函数被称为函数表达式。 

比如：

```javascript
//以下为函数表达式
var myFunc = function(){};

myFunc(function(){
  return function(){};
});

(function namedFunctionExpression () { })();

+function(){}();
-function(){}();
!function(){}();
~function(){}();
```

函数表达式是 JS 语句的一部分，因此代码中的函数表示所处的位置分别为：

- 变量声明等号的右侧 
- 其他函数的参数
- 立即执行函数
- 被为运算符修饰

### 3.区别

- 语句中所处的位置不同。函数表达式可以放在很多不同的语句位置中，而函数声明只能以 function 开头并且是一个单独的语句。
- 函数声明必须有函数名，而函数表达式的函数名可以省略。
  - 函数声明必须有函数名是因为函数被调用的基本要求，在调用一个函数时我们必须能够引用它，而唯一的方法就是通过函数名。 
  - 函数表达式是其它 JavaScript 语句的一部分，所以我们有别的方式引用它们，比如函数被赋值给一个变量，可以通过变量名来访问： 
    - `var doNothing = function(){};`
      `doNothing();`
  - 或者作为其它函数的参数，可以通过参数名访问：
    - function doSomething(action) {
        action();
      } 
- 函数声明在JS解析时进行函数提升，因此在同一个作用域内，不管函数声明在哪里定义，该函数都可以进行调用。而函数表达式的值是在JS运行时确定，并且在表达式赋值完成后，该函数才能调用。



> 相关链接： 
>
> [JavaScript中函数声明与函数表达式的区别详解](https://www.jb51.net/article/90792.htm)

