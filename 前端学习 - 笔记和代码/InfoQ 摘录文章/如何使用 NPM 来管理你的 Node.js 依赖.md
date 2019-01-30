# 如何使用 NPM 来管理你的 Node.js 依赖

> [原文地址](https://www.infoq.cn/article/msh-using-npm-manage-node.js-dependence)

话题：Node.js语言 & 开发



npm 是 Node.js 的**模块依赖管理工具**。作为开发者使用的工具，主要解决开发 Node.js 时会遇到的问题。如同 RubyGems 对于 Ruby 开发者和 Maven 对于 Java 开发者的重要性，npm 对与 Node.js 的开发者和社区的重要性不言而喻。本文包括五点：package.json 、npm 的配置、npm install 命令、npm link 命令和其它 npm 命令。

## **package.json**

npm 命令运行时会读取当前目录的 package.json 文件和解释这个文件，这个文件基于 [Packages/1.1](http://wiki.commonjs.org/wiki/Packages/1.1) 规范。在这个文件里你可以定义你的应用名称 ( name )、应用描述 ( description )、关键字 ( keywords )、版本号 ( version )、应用的配置项 ( config )、主页 ( homepage )、作者 ( author )、资源仓库地址 ( repository )、bug 的提交地址 ( bugs )，授权方式 ( licenses )、目录 ( directories )、应用入口文件 ( main )、命令行文件 ( bin )、应用依赖模块 ( dependencies )、开发环境依赖模块 ( devDependencies )、运行引擎 ( engines ) 和脚本 ( scripts ) 等。

对于开发者而言，开发和发布模块都依赖于他对这个文件 package.json 所包含的意义的正确理解。我们下面用一个本文共用的例子来说明：

```js
{
    "name": "test",
    "version": "0.1.0",
    "description": "A testing package",
    "author": "A messed author <messed@example.com>",
    "dependencies": {
        "express": "1.x.x",
        "ejs": "0.4.2",
        "redis": ">= 0.6.7"
    },
    "devDependencies": {
        "vows": "0.5.x"
    },
    "main": "index",
    "bin": {
        "test": "./bin/test.js"
    },
    "scripts": {
        "start": "node server.js",
        "test": "vows test/*.js",
        "preinstall": "./configure",
        "install": "make && make install"
    },
    "engines": {
        "node": "0.4.x"
    }
}
```

这个例子里我们定义了应用的入口文件 ( main ) 为 index ，当其他应用引用了我们的模块 require('test') 时，这个 main 的值 index.js 文件被调用。脚本 ( scripts ) 使用 hash 表定义了几个不同的命令。script.start 里的定义的 node server.js 会在 npm start 时被调用，同样的 npm test 调用时对应的 scripts.test 里定义的命令被调用。在有些 native 模块需要编译的话，我们可以定义预编译和编译的命令。本例中还定义了应用依赖模块 ( dependencies ) 和开发环境依赖模块 ( devDependencies )。应用依赖模块会在安装时安装到当前模块的 node_modules 目录下。开发环境依赖模块主要时在开发环境中用到的依赖模块，用命令 npm 的命令 install 或 link 加上参数 —dev 安装到当前模块的 node_modules 目录下。

大家也注意到 package.json 里的版本号有些是 >= 0.6.7 有些是 1.x.x，这有什么区别？npm 使用于[语义化的版本识别](http://semver.org/)来进行版本管理。并不是所有的模块都会提供向后兼容性，有时候某些模块因为某些原因导致不向后兼容。所以我们需要定义一些规则来保证模块能够在某些特定的版本中可用，并且保证能用最新的版本，因为那些版本总是修改了一些 bug 或提升了性能等。我们来看一下版本定义的字段：

0.4.2

- 主版本 ( 0 )
- 副版本 ( 4 )
- 补丁版本 ( 2 )

在上面 package.json 的定义里我们确信模块在所有的 Nodejs 0.4 及以上和 0.5 以下版本里都能运行。依赖模块 redis 在所有大于或等于 0.6.7 的版本上都能运行，依赖模块 ejs 只能确保运行在 0.4.2 版本里，依赖模块 express 确保能够兼容大于或等于 1.0.0 并且小于 2.0.0。

## **npm 的配置**

npm 拥有很多默认配置。你可以使用这些默认的配置，也可以修改这些默认的配置，甚至可以在环境变量或命令行下修改这些配置。配置的权重是如下顺序定义的：

1. 命令行，使用—为前缀的参数。比如 —foo bar，设定变量 foo 的值为" bar “。—foo 后不带值的参数，设定 foo 的值为 true 。
2. 环境变量，所有 npm_config_ 为前缀的环境变量。比如 npm_config_foo = bar ，设定变量 foo 为 “ bar "。
3. 用户定义。所有的变量存储在 $HOME/.npmrc 文件里的变量。
4. 全局。所有 $PREFIX/etc/npmrc 文件里的变量。$PREFIX 变量可通过 npm prefix -g 获取，一般默认是 /usr/local。
5. 内置的配置。通过安装时运行 ./configure 所定义的变量。可通过命令 curl <http://npmjs.org/install.sh> | env npm_config_foo=bar sh 设置。

使用配置能给我们带来很大的灵活性。比如我们使用 npm install 时，对默认的资源库地址 <https://registry.npmjs.org/> 不是很满意，我们可以使用下面的命令来更改资源库地址。

```shell
npm --registry "an other registry" install express
# 或者下面的命令 
env npm_config_registry="an other registry" npm install express 
```

或是对 npm 默认的 vi 编辑器不满意，直接命令 npm set editor mate 。npm 的配置可通过命令 npm config ls 获取。这个命令是获取修改后的配置，要获取包括默认配置的全部配置加上 -l 参数。值得注意的是，开发者通过 npm config set registry "an other registry" 的方式修改 registry 这个属性值，一定要明白这个修改这个值所带来的负面效应。一旦设置了 registry 这个值，当你要 publish 一个模块，会把模块发布到修改后的资源库里，而不是原始默认的资源库。其他的资源库是原始默认的资源库的一个复制品，定时从默认的资源库取资源。一般来说，没有把其新家的模块同步到默认的资源库的能力。这样会导致发生你的模块在修改后的资源库里能够找到，而在其它的资源库里找不到的事情。

## **npm install 命令**

安装模块只需要 npm install express connect 命令给我们带来了很大的方便。安装模块的路径分两种：

- 全局路径，也就是带上参数 -g 的安装模式。这个命令会把模块安装在 $PREFIX/lib/node_modules 下，可通过命令 npm root -g 查看全局模块的安装目录。 package.json 里定义的 bin 会安装到 $PREFIX/bin 目录下，如果模块带有 man page 会安装到 $PREFIX/share/man 目录下。
- 本地路径，不带 -g 参数的。从当前目录一直查找到根目录 / 下有没有 node_modules 目录，有模块安装到这个目录下的 node_modules 目录里，如果没有找到则把模块安装到当前目录 node_modules 目录下。package.josn 定义的 bin 会安装到 node_modules/.bin 目录下，man page 则不会安装。

我们需要选择什么样的安装方式呢？全局模式可以让你不用担心找不到模块，如果不需要还是尽量避免全局模式。

- 如果我们只是 require('pkg') 一个模块，我们不需要使用全局模式。
- 如果我们需要在命令行中调用，我们需要使用全局模式。因为这个安装把 package.josn 里 bin 下的定义安装到 $PATH 目录下。

有些模块我们既需要在命令行中调用又想 require('pkg') ，比如 [Coffee-script](http://coffeescript.org/) 。那么我们可以使用全局模式安装，然后使用下一段要讲的命令 npm link 把它链接到本地的 node_modules 目录下。

不要担心 package.josn 里 script 中定义的命令会不会因为不是全局安装而不能运行。比如在例子里定义的 devDependencies 的 vows 。在调用 npm test 时 npm 会把 node_modules/.bin 目录放到环境变量 $PATH 的最前面。

## **npm link 命令**

对开发者而言，这算是最有价值的命令。假设我们开发了一个模块叫 test ，然后我们在 test-example 里引用这个模块 ，每次 test 模块的变动我们都需要反映到 test-example 模块里。不要担心，有了 npm link 命令一切变的非常容易。

首先我们需要把 test 链接到全局模式下：

```shell
cd ~/work/node/test # 进入 test 模块目录 
npm link # 创建链接到 $PREFIX/lib/node_modules
```

那么 test 的模块将被链接到 $PREFIX/lib/node_modules 下，就像我的机器上 $PREFIX 指到 /usr/local ，那么 /usr/local/lib/node_modules/test 将会链接到 ~/work/node/test 下。执行脚本 bin/test.js 被链接到 /usr/local/bin/test 上。

接下来我们需要把 test 引用到 test-example 项目中来：

```shell
cd ~/work/node/test-example # 进入 test-example 模块目录 
npm link test # 把全局模式的模块链接到本地
```

npm link test 命令会去 $PREFIX/lib/node_modules 目录下查找名叫 test 的模块，找到这个模块后把 $PREFIX/lib/node_modules/test 的目录链接到 ~/work/node/test-example/node_modules/test 这个目录上来。

现在任何 test 模块上的改动都会直接映射到 test-example 上来。再比如假设我们开发很多应用，每个应用都用到 Coffee-script ：

```shell
npm install coffee-script -g # 全局模式下安装 coffee-script
cd ~/work/node/test # 进入开发目录 
npm link coffee-script # 把全局模式的 coffee-script 模块链接到本地的 node_modules 下 
cd ../test-example # 进入另外的一个开发目录 
npm link coffee-script # 把全局模式的 coffee-script 模块链接到本地 
npm update coffee-script -g # 更新全局模式的 coffee-script，所有 link 过去的项目同时更新了。
```

就像你看到，npm link 对于开发时一个模块被多个模块引用时非常有用。windows 的用户会想，我这儿没有 UNIX 下的 link 工具怎么办？别担心只要你的 Node.js 支持 fs.symlink 就可用到这个特性。

## **其它 npm 命令**

npm 命令里还有很多有用的命令。npm explore . -- git pull origin master ，更新当前的 git 资源库。npm edit . ，编辑当前模块的所有依赖模块。npm docs coffee-script ，打开 coffee-script 模块的文档。npm outdated coffee-script ，查看 coffee-script 是否有新版本。npm submodule . ，你可以要求你的依赖模块是从 git 资源库安装的，而不是从 registry 安装。因为作者的 git 资源库总是最新的版本，registry 上的是模块作者发布上去的稳定版本。甚至你可以用 npm 来编程。

```js
var npm = require('npm');
npm.load({}, function (err) {
    if (err) return commandFailed(err);
    npm.on("log", function (message) {
        if (arg) console.log(message)
    })
    var requirements = JSON.parse(fs.readFileSync('config/requirements.json'));
    npm.commands.install(requirements, function (err, data) {
        if (err) return commandFailed(err);
    });
});
```

做为 Node.js 的开发者工具，npm 已经为我们想到很多的应用场景。这也是 Node.js 社区一致推荐它为开发者模块依赖管理工具。

## 关于作者

马士华，崇尚技术，爱好开源。twitter : @mashihua 博客 <http://www.f2eskills.com/>