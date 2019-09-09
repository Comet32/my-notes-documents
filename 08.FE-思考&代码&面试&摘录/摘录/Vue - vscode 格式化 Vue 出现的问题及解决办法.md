一、VSCode中使用vetur插件格式化vue文件时，js代码会自动加上冒号和分号


　本来就是简写比较方便舒服，结果一个格式化回到解放前
最后找到问题原因：

  首先，vetur默认设置是这个样的。也就是很多是用的prettier插件。
1
　　

解决办法1 (最快的解决办法)
把”vetur.format.defaultFormatter.js”: “prettier”,改为 “vetur.format.defaultFormatter.js”: “vscode-typescript” 

参考自 记一次vscode升级后，格式化Vue出现的问题
但是这样就没有用到Prettier这个酷酷的东西，于是自己打算继续研究

解决办法2 (踏实的解决办法)
一打开Prettier官网，阔怕全是英文，还是硬着头皮上

(1)安装
yarn安装

yarn add prettier --dev --exact
1
或者全局安装
yarn global add prettier
1
或者npm(当然cnpm也可以)

npm install --save-dev --save-exact prettier
1
或者全局安装
npm install --global prettier
1
(2)新建.prettierrc.json配置文件放在vue项目的root目录下(也就是和README.md文件同一目录)
(3)配置.prettierrc.json文件如下
{
​    "singleQuote":true,//使用单引号而不是双引号,true就是对
​    "semi":false//在语句结尾处打印分号,false就是不打印
}
1
2
3
4
小伙伴们还想配置其他参数选项可参考官网Prettier的选项和参数描述



作者：留给时间 
来源：CSDN 
原文：https://blog.csdn.net/qq_32340877/article/details/79474034 
版权声明：本文为博主原创文章，转载请附上博文链接！