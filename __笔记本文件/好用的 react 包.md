[TOC]

## 通过变量来创建正则 - 'escape-string-regexp'

``` jsx
import escapeRegExp from 'escape-string-regexp'

const match = new RegExp(escapeRegExp(query), 'i')
showingContacts = contacts.filter(contact => match.test(contact.name))
```

通过 `escapeRegExp(query)` 创建一个用于匹配整个字符串中是否带有 `query` 的正则表达式，并用于筛选。



## 使用 `sort-by` 使对象数组根据其内部的属性进行排序

``` jsx
import sortBy from 'sort-by'

//对 对象数组 根据对象中的 name 进行排序
showingContacts.sort(sortBy('name'))
```

注意 `showingContacts` 是一个对象数组



## 使用 `PropTypes` 检查组件的属性类型

```jsx
import PropTypes from 'prop-types'

class ListContacts extends Component {
  static propTypes = {
    // 使用 prop-types 包来提醒我们组件中属性的数据类型
    contacts: PropTypes.array.isRequired,
    onDeleteContact: PropTypes.func.isRequired
  }
}
```

更多内容请查看文档。



## 使用 `form-serialize` 序列化表格数据

```jsx
import serializeform from 'form-serialize'

class CreateContact extends Component {
  handleSubmit = e => {
    e.preventDefault()
    const value = serializeform(e.target, { hash: true })
    debugger
    if (this.props.onCreateContact) this.props.onCreateContact(value)
  }
}

<form onSubmit={this.handleSubmit} className="create-contact-form">
</form>
```

这个事件是绑定在 form 表单的提交事件上的，当提交以后，先阻止默认行为，然后使用 `serializeform` 函数传入事件目标，函数会根据表单中所有的所提交的值返回一个对象。



## 其他

moment：日期处理框架
rechart：图表框架
qrcode.react 二维码框架
crypto-js：加密解密框架