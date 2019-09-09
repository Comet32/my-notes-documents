# Mac 终端走 ss 代理

当你在Mac上，以Application的形式，已经启动了SS 并且 设置成全局代理的话，SS会自动开启一个Sockts代理：127.0.0.1:1080。这个可以在网络->高级->代理中看到。 
这时候，只需要下面的命令，就可以在命令行上执行下面的命令，就可以使用/不使用代理：

```jsx
// 设置代理 
export ALL_PROXY=socks5://127.0.0.1:1080
// 清除代理 
unset ALL_PROXY
// 查看ip测试是否生效
curl -i http://ip.cn
```

