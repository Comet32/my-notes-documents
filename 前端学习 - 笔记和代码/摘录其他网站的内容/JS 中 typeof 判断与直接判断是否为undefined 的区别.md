几个示例说明一切：

直接判断是否为undefined：

```js
var name1="name1";
alert(name1 === undefined);//false
var name2;
alert(name2 === undefined);//true
alert(name3 === undefined);//出错
```

typeof 判断是否未定义：

```js
var name1 = "name1";
alert(typeof name1 === "undefined");//false
var name2;
alert(typeof name2 === "undefined");//true
alert(typeof name3 === "undefined");//true
```

结论：
直接用等号 （==） 判断时，变量必须要声明（包括不用 var 的隐式声明），否则出错。

不管变量有没有声明，都可用 typeof 判断，注意 typeof 返回结果为字符串，所以是与"undefined"做比较。

因此，判断类型最好用typeof ，因为当判断的变量是在其他 js 文件中定义的全局变量时，执行此判断时，定义该变量所在的 js 文件可能还未加载完成，用 == 判断就会报错：is not defined

作者：Liekkas_BX 
来源：CSDN 
原文：https://blog.csdn.net/qq_19865749/article/details/78121036 
版权声明：本文为博主原创文章，转载请附上博文链接！