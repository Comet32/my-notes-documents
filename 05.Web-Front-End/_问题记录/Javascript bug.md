# Javascript bug

## `||` 运算符与 `&&` 运算符的优先级问题

bug 代码：

```jsx
{ imageUrl || imgUrls && !loading  ? (
  <img
    src={
      imageUrl ||
        IMG_BASE_URL + (uploadStr ? imgUrls : imgUrls[0])
    }
    alt="上传图片"
    className={styles.img}
    />
) : (
  uploadButton
)}
```

### 问题

这里想当 loading 的时候渲染 uploadButton，但是当 loading 时依然渲染 img

### 原因

以为 `imageUrl || imgUrls && !loading` 的执行逻辑是从左往右，其实是先执行 `imgUrls && !loading` 的结果再将其结果与 `imageUrl` 进行或运算，所以造成只要 `imageUrl` 为 `true` 则无论 `loading` 是什么，都会显示 img

### 解决

```jsx
{ (imageUrl || imgUrls) && !loading  ? (
  <img
    src={
      imageUrl ||
        IMG_BASE_URL + (uploadStr ? imgUrls : imgUrls[0])
    }
    alt="上传图片"
    className={styles.img}
    />
) : (
  uploadButton
)}
```

- 添加 `()` 将运算优先级主动设置为先 `||` 再 `&&` 





