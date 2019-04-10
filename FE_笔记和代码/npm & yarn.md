# npm & yarn

[TOC]

### 镜像替换

> [原文地址](https://www.cnblogs.com/zycbloger/p/6210049.html)

- 得到原本的镜像地址

```shell
npm get registry 
```

- 设成淘宝的

```shell
npm config set registry http://registry.npm.taobao.org/

yarn config set registry http://registry.npm.taobao.org/
```

- 换成原来的

```shell
npm config set registry https://registry.npmjs.org/
```



### 在 MacOS 下使用 npm install 的问题

>[原文地址](https://www.jianshu.com/p/59a6bbff4ad2)

OSX开启了`System Intergerity Protection`（系统完整性保护）简称SIP，大概就是禁止了一系列的系统安全权限，其中包括不向`/usr/local/lib/node_module`写入文件。 怎么办？当然是禁用它。

#### 禁用SIP方法

1. 重启系统，按住 Command + R 进入恢复模式
2. 点击顶部菜单栏 实用工具 中的 终端
3. `csrutil disable`
4. 输出`Successfully disabled System Integrity Protection. Please restart the machine for the changes to take effect.`代表成功
5. 重启系统
6.  `csrutil enable`（开启该权限的命令）

#### 其他解决方法

常用：修改安装目录的权限 `sudo chown -R $(whoami) $(npm config get prefix)/{lib/node_modules,bin,share}` 或者命令前面加`sudo`。

之后就可以流畅的npm install了。