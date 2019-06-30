# JavaScript 正则表达式实战

[TOC]

## 四个实战案例

- 如何从字符串中搜索重复最多的字符串，找到这个字符串并且打印数量
- 如何去掉字符串中间的多余空格
- 邮箱验证
- 手机验证

1.实战: 获取重复最多的字符及数量
--------------------------

### **知识点**

1. 捕获组
2. replace()的高级应用

------------------------------------------------------

### 1.捕获组:
正则表达式中子表达式匹配的内容,保存到内存中以数字编号或显式命名的组里,方便后面引用

------------------------------------------------------

### 2.replace()的高级应用
- replace(reg, function(){...}): 第二参数支持回调, 自动循环处理正则匹配到的字符串

------------------------------------------------------

### 示例源码: code/demo01.html

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="UTF-8">
    <title>获取重复最多的字符及数量</title>
  </head>
  <body>
    <script>
      var str = 'erereadfaWQWefeEEEEksQafdfqefapqfdkfqQ123adfncmm';
      console.log(str);  // 查看原始字符串

      var arr = str.split('');//用空字符先把字符串分割为字符串数组
      console.log(arr);  // 查看生成的数组

      // 将生成的字符数组按字母表进行排序(不用传参)
      str = arr.sort();
      console.log(str);  // 查看排序

      // 将排序后的字符数组,再重新拼装成字符串,方便应用正则
      str = arr.join('');
      console.log(str);


      var result = '';   //  返回重复最多的字母
      var count = 0;  // 初始计数器

      // 捕获组:正则表达式中子表达式匹配的内容,保存到内存中以数字编号或显式命名的组里,方便后面引用
      // /(\w)\1+/g // 这个正则,可以获取任意位置上的连续的字符,并把获取到的第一组结果放到集合中,给replace来循环遍历
  		'wwwsssccceee'.match(/(\w)\1+/gi) // ["www", "sss", "ccc", "eee"]
      
      // 集合中, $0: 表示集合中的连接字符组成的字符串,如'fffffffff', $1: 表示连续字符串中的第一个: 'f'
      // $0, $1是固定命名,不得更改, 可以直接用在replace()中的回调函数的参数中

      // 以上执行过程 ,可以通过 "单步调试" 非常直观的展示
      var reg = /(\w)\1+/gi;
      str.replace(reg,function($0,$1){
        // console.log('$0',$0,'$1', $1);
        if(count<$0.length){
          count = $0.length;
          result = $1;

          console.log('$0',$0,'$1', $1, count);

        }
      });
      console.log('最多的字符：'+ result +' ,重复的次数：'+count);//最多的字符：f ,重复的次数：10
    </script>

  </body>
</html>
```

> 单独斜杠的 \1 ， \2 就是反向引用了。 
>
> ‘\1’ 匹配的是 所获取的第1个()匹配的引用。例如，’(\d)\1’ 匹配两个连续数字字符。如33aa 中的33 
> ‘\2’ 匹配的是 所获取的第2个()匹配的引用。 
> 例如，’(\d)(a)\1’ 匹配第一是数字第二是字符a,第三\1必须匹配第一个一样的数字重复一次，也就是被引用一次。如9a9 被匹配，但9a8不会被匹配，因为第三位的\1必须是9才可以，
>
> ‘(\d)(a)\2’ 匹配第一个是一个数字，第二个是a，第三个\2必须是第二组（）中匹配一样的，如，8aa被匹配，但8ab，7a7不会被匹配，第三位必须是第二组字符的复制版，也是就引用第二组正则的匹配内容。
>
> 作者：liangf05 
> 来源：CSDN 
> 原文：https://blog.csdn.net/liangf05/article/details/79361191 





2.实战:去掉字符串中间的多余空格
-------------------------

**知识点**

1. trim()
2. 通配原子\s

---------------------------------------------------

### 1.trim()
去除字符串前后空白字符

---------------------------------------------------

### 2.通配原子\s
- `\s`: 匹配任意空白字符
- 等价于: `[\f\n\r\t\v]`

---------------------------------------------------

### 示例代码: code/demo02.html

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>去掉字符串中间的多余空格</title>
</head>
<body>
<script>
    var str = '    ww  w.  htm  l.cn    ';

    // 却是掉左右空白字符
    // str = str.trim();
    // console.log(str);

    // 但是中间的如何去掉呢?这就要用到正则来处理了
    // 这个需要是经常遇到的,创建一个自定义函数,方便重复调用
    // 该函数可以一次生实现前后,中间空白字符全部去除
    var myTrim = function (str){

        // 匹配头部,中剖,尾部的空白字符
        var reg = /^\s+|\s+|\s+$/g;

        // 用空字符替换(注意不是空格,是空)
        str = str.replace(reg,'');

        return str;
    };
    str = myTrim(str);

    console.log(str);
</script>
</body>
</html>
```





3.实战: 验证用户表单中的 email 地址
-----------------------

**知识点**

1. 原子集合
2. 分组
3. 完全匹配

-----------------------------------------------------

### 1.原子集合
- `[a-zA-Z0-9-_]`: 匹配集合中的任何一个即可

-----------------------------------------------------

### 2.分组
圆括号在正则表达式中的作用

-----------------------------------------------------

### 3.完全匹配
- `^`和`$`符的正确使用方法

-----------------------------------------------------

### 示例: code/demo03.html

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>匹配email地址</title>
    <style>
        .success {
            color: green;
        }
        .warning {
            color: red;
        }
    </style>
</head>
<body>
<label>邮箱: <input type="text"> </label>
<button type="button">验证</button>
<p></p>

<script>
    var email = document.querySelector('input');
    var btn = document.querySelector('button');
    var tips = document.querySelector('p');
    var reg =/^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
  	// 这里我把一些小括号去掉了，也就是减少了分组，这样会好理解一些
    var reg =/^[a-zA-Z0-9_-]+@[a-zA-Z0-9_-]+(\.[a-zA-Z0-9_-]{2,3}){1,2}$/;
    btn.onclick = function () {
        var str = email.value;
        if (reg.test(str)) {
            tips.classList.add('success');
            tips.innerHTML = str + '是合法邮箱';
        } else {
            tips.classList.add('warning');
            tips.innerHTML = str + '是非法邮箱';
        }
    };
</script>
</body>
</html>
```



3.实战: 过滤留言中的手机号码
-----------------------

### **知识点**

1. 原子集合与量词的使用
2. 基本的DOM操作

---------------------------------------------------

### 1.原子集合与量词的使用
- `/[1][345678][0-9]{9}/`

---------------------------------------------------

### 2.基本的DOM操作
- 向页面中添加元素
- 基本事件处理

---------------------------------------------------

### 示例: code/demo04.html

```html
<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>手机号码验证</title>
</head>
<body>
<label for="reply">回复</label>
<textarea name="" id="reply" cols="30" rows="10"></textarea>
<p id="tips"></p>
<ul id="list"></ul>

<script>
    // 测试文本:  你寂寞吗?想看更多小视频,13988996677, 微信同号哟
    var text = document.querySelector('#reply');
    var tips = document.querySelector('#tips');

    text.onblur = function () {
        if (verifyPhone(text.value)) {
            tips.innerHTML = '<span style="color:red">留言中不允许出现手机号</span>';
            return false;
        }

        if (text.value.trim().length > 0) {
            var list = document.querySelector('#list');
            var comment = document.createElement('li');
            comment.innerText = text.value;
            list.appendChild(comment);
            text.value = '';
        } else {
            tips.innerHTML = '<span style="color:red">留言不能为空</span>';
            text.focus();
        }

    };

    text.onkeydown = function () {
        tips.innerHTML = '';

    };

    // 验证是否是手机号码?
    function verifyPhone(mobile) {
        var reg = /[1][345678][0-9]{9}/;
        return reg.test(mobile);
    }
</script>
</body>
</html>
```