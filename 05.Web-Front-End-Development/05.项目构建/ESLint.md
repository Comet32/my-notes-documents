# ESlint 相关

[TOC]

## husky

使用 husky 可以在 commit 之前对代码进行 lint 预检，对不符合规则的代码不准许提交。

> 可以参考的文章：
>
> [用 husky 和 lint-staged 构建超溜的代码检查工作流](https://segmentfault.com/a/1190000009546913)

这是姚同学发的 `package.json` 中的配置项：

```json
"scripts":{
  	"lint-staged": "lint-staged",
    "lint": "eslint --fix src/*.{ts,tsx} src/**/*.{ts,tsx} "
},
"husky": {
    "hooks": {
      "pre-commit": "npm run lint-staged"
    }
  },
  "lint-staged": {
    "*.{ts,tsx}": [
      "npm run lint",
      "git add"
    ]
  },
```

需要在项目中安装的 ESlint 包：

```shell
yarn add eslint-config-react-app @typescript-eslint/eslint-plugin@1.x @typescript-eslint/parser@1.x babel-eslint@10.x eslint@6.x eslint-plugin-flowtype@3.x eslint-plugin-import@2.x eslint-plugin-jsx-a11y@6.x eslint-plugin-react@7.x eslint-plugin-react-hooks@1.x -D
```









