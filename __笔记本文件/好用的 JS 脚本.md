# 一些好用的 JS 脚本

[TOC]

## 首字母大写

```jsx
capitalize (str = '') {
  return typeof str !== 'string'
    ? ''
    : str[0].toUpperCase() + str.slice(1)
}
```



## 字符超过一定数量时，多余部分显示 ...

```jsx
trim(str) {
  return str.length > 16 ? str.slice(0, 16) + '...' : str
}
```

