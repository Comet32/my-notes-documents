# Webpack中的sourcemap以及如何在生产和开发环境中合理的设置sourcemap的类型

2018年03月01日 16:39:34

标签： [Webpack](http://so.csdn.net/so/search/s.do?q=Webpack&t=blog)[sourcemap](http://so.csdn.net/so/search/s.do?q=sourcemap&t=blog)[SourceMap](http://so.csdn.net/so/search/s.do?q=SourceMap&t=blog)[开发环境](http://so.csdn.net/so/search/s.do?q=%E5%BC%80%E5%8F%91%E7%8E%AF%E5%A2%83&t=blog)[生产环境](http://so.csdn.net/so/search/s.do?q=%E7%94%9F%E4%BA%A7%E7%8E%AF%E5%A2%83&t=blog) 更多

个人分类： [Webpack](https://blog.csdn.net/liwusen/article/category/6563943)

版权声明：本文为博主原创文章，未经博主允许不得转载。	https://blog.csdn.net/liwusen/article/details/79414508

简要介绍：在webpack的官网，给出了十几种sourcemap，那么每一种sourcemap之间有什么区别，本文在理解sourcemap的基础上，分析在生产和开发环境中，应该采用何种形式的sourcemap

一 、 从Sourcemap和Data URL说起

（1）什么是Sourcemap?

我们在打包中，将开发环境中源代码经过压缩，去空格，babel编译转化，最终可以得到适用于生产环境的项目代码，这样处理后的项目代码和源代码之间差异性很大，会造成无法debug的问题。

举例来说，如果压缩等处理过的生产环境中的代码出现bug，调试的时候只能定位到压缩处理后的代码的位置，无法定位到开发环境中的源代码。

sourcemap就是为了解决上述代码定位的问题，简单理解，就是构建了处理前的代码和处理后的代码之间的桥梁。主要是方便开发人员的错误定位。这里的处理操作包括：

I）压缩，减小体积

II）将多个文件合并成同一个文件

III）其他语言编译成javascript，比如TypeScript和CoffeeScript等

（2）什么是DataURL?

DataURL最早是出现在HTML文件img标签中的关于图片的引用，DataURL提供了一种将图片”嵌入”到HTML中的方法。

跟传统的img的src属性指向服务器中某张图片的地址不同，在Data URL协议中，图片被转换成base64编码的字符串形式，并存储在URL中，冠以mime-type。具体通过DataURL引入图片例子如下：

```
<img src="data:image/gif;base64,R0lGODlhMwAxAIAAAAAAAP///
yH5BAAAAAAALAAAAAAzADEAAAK8jI+pBr0PowytzotTtbm/DTqQ6C3hGX
ElcraA9jIr66ozVpM3nseUvYP1UEHF0FUUHkNJxhLZfEJNvol06tzwrgd
LbXsFZYmSMPnHLB+zNJFbq15+SOf50+6rG7lKOjwV1ibGdhHYRVYVJ9Wn
k2HWtLdIWMSH9lfyODZoZTb4xdnpxQSEF9oyOWIqp6gaI9pI1Qo7BijbF
ZkoaAtEeiiLeKn72xM7vMZofJy8zJys2UxsCT3kO229LH1tXAAAOw==">123456
```

DataURL使用于如下的场景

I）访问外部资源受限

II）图片体积小，占用一个HTTP会话资源浪费

二 、 Webpack中的Sourcemap

webpack在打包中同样支持Sourcemap，并且提供了十几种的组合。我们以官网给出的为例：

I）eval ： 每一个模块都执行eval()过程，并且会追加//@ sourceURL

II）eval-source-map：每一个模块在执行eval()过程之后，并且会为每一个模块生成sourcemap文件，生成的sourcemap文件通过DataURL的方式添加

III）cheap-eval-source-map：跟eval-source-map相同，唯一不同的就是增加了”cheap”，”cheap”是指忽略了行信息。这个属性同时也不会生成不同loader模块之间的sourcemap。

VI）cheap-module-eval-source-map：与cheap-eval-source-map相同，但是包含了不同loader模块之间的sourcemap

官网给出的例子容易让人看懵，因为官网的devtool类型都是以组合形式给出的，实际上webpack中的sourcemap的基本类型包括：eval，cheap,moudule，inline,source-map。其他的类型都是根据这5个基本类型组合而来。我们来具体分析一下这5个基本类型

（1）eval

eval会将每一个module模块，执行eval，执行后不会生成sourcemap文件，仅仅是在每一个模块后，增加sourceURL来关联模块处理前后的对应关系。举例来说：

```
webpackJsonp([1],[  
function(module,exports,__webpack_require__){    
eval(
      ...      
//# sourceURL=webpack:///./src/js/index.js?'
    )
  },  
function(module,exports,__webpack_require__){    
eval(
      ...      
//# sourceURL=webpack:///./src/static/css/app.less?./~/.npminstall/css-loader/0.23.1/css-loader!./~/.npminstall/postcss-loader/1.1.1/postcss-loader!./~/.npminstall/less-loader/2.2.3/less-loader'
    )
  },  
function(module,exports,__webpack_require__){   
 eval(
      ...      
 //# sourceURL=webpack:///./src/tmpl/appTemplate.tpl?"
    )
  },
...])1234567891011121314151617181920
```

上述是一个指定devtool：eval的压缩后的代码，我们发现压缩后的代码的每一个模块后面都增加了一端包含sourceURL的注释，sourceURL的值是压缩前的代码，这样就通过sourceURL关联了压缩前后的代码，并没有为每一个模块生成相应的sourcemap。

因为不需要生成模块的sourcemap，因此打包的速度很快。

（2）soure-map 
source-map会为每一个打包后的模块生成独立的soucemap文件，举例来说：

```
webpackJsonp([1],[  
function(e,t,i){...},  
function(e,t,i){...},  
function(e,t,i){...},  
function(e,t,i){...},
  ...
])//# sourceMappingURL=index.js.map1234567
```

打包后的模块在模块后面会对应引用一个.map文件，同时在打包好的目录下会针对每一个模块生成相应的.map文件，在上例中会生成一个index.js.map文件，这个文件是一个典型的sourcemap文件，形式如下：

```
{  
"version":3,  
"sources":[
    "webpack:///js/index.js","webpack:///./src/js/index.js",    
    "webpack:///./~/.npminstall/css-loader/0.23.1/css-loader/lib/css-base.js",
    ...
],  
"names":["webpackJsonp","module","exports"...], 
"mappings":"AAAAA,cAAc,IAER,SAASC...",  
"file":"js/index.js",  
"sourcesContent":[...],  
"sourceRoot":""
}12345678910111213
```

（3）inline

与source-map不同，增加inline属性后，不会生成独立的.map文件，而是将.map文件以dataURL的形式插入。如下所示：

```
webpackJsonp([1],[  
function(e,t,i){...},  
function(e,t,i){...},  
function(e,t,i){...},  
function(e,t,i){...},
  ...
])
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9...12345678
```

打包好模块后，在sourceMappingURL中直接将.map文件中的内容以DataURL的方式引入。

（4）cheap 
cheap属性在打包后同样会为每一个模块生成.map文件，但是与source-map的区别在于cheap生成的.map文件会忽略原始代码中的列信息。

```
devtool: 'eval-source-map'

"mappings": "AAAAA,QAAQC,GAAR,CAAY,aAAZ",
devtool: 'cheap-source-map'

"mappings": "AAAA",123456
```

对比增加cheap和没有cheap情况下，打包后输出的.map文件，在文件中 
使用了VLQ编码，有”逗号”表示包含了列信息，显然增加cheap属性后，.map文件中不包含列信息。

此外增加cheap后也不会有loader模块之间对应的sourcemap，什么是模块之间的sourcemap呢？

因为webpack最终会将所有的非js资源，通过loader的形式转变成js资源。比如jsx语言的操作分为：

jsx——（loader）——js——（压缩等处理）——压缩后的js

如果没有loader之间的sourcemap，那么在debug的时候定义到上图中的压缩前的js处，而不能追踪到jsx中。

（5）module：包含了loader模块之间的sourcemap 
这样差不多就理清了webpack中所有的sourcemap类型。

三 、 在不同的环境中如何选择sourcemap的类型

在了解了webpack中所有的sourcemap基本类型后，我们来分析，如何针对开发环境和生产环境，选择合理的sourcemap属性。

（1）首先在源代码的列信息是没有意义的，只要有行信息就能完整的建立打包前后代码之间的依赖关系。因此不管是开发环境还是生产环境，我们都会选择增加cheap基本类型来忽略模块打包前后的列信息关联。

（2）其次，不管在生产环境还是开发环境，我们都需要定位debug到最最原始的资源，比如定位错误到jsx，coffeeScript的原始代码处，而不是编译成js的代码处，因此，不能忽略module属性

（3）再次我们希望通过生成.map文件的形式，因此要增加source-map属性

总结：

在开发环境中我们使用：cheap-module-eval-source-map

在生产环境中我们使用：cheap-module-source-map。

这里需要补充说明的是，eval-source-map组合使用是指将.map以DataURL的形式引入到打包好的模块中，类似于inline属性的效果，我们在生产中，使用eval-source-map会使打包后的文件太大，因此在生产环境中不会使用eval-source-map。但是因为eval的rebuild速度快，因此我们可以在本地环境中增加eval属性。

更多文章参考： 

- [Webpack中的sourcemap](https://www.cnblogs.com/axl234/p/6500534.html)