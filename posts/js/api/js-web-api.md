# JS Web API

## DOM 操作

### DOM 节点操作

**获取 DOM 节点**:

```js
document.getElementById() // 元素
document.getElementsByTagName() // 集合
document.getElementsByClassName() // 集合
document.querySelector() // 元素
document.querySelectorAll() // 集合
```

**DOM节点的 property**：

property：修改对象属性，不会体现到 html 结构中

```js
const p = document.querySelectorAll('p')[0]

// property
p.style.width = '100px'
console.log(p.style.width)
p.className = 'red'
console.log(p.className) // red
console.log(p.nodeName) // p
console.log(p.nodeType) // 1
```

**DOM 节点的 attribute**:

attribute：修改 html 属性，会改变 html 结构

```js
const p = document.querySelectorAll('p')[0]

// attribute
p.setAttribute('data-name', 'tiger')
console.log(p.getAttribute('data-name'))
p.setAttribute('style', 'font-size: 50px;')
console.log(p.getAttribute('style'))
```

> 注：property 和  attribute 都有可能引起 DOM 重新渲染，优先使用 property

### DOM 结构操作

```js
const div1 = document.getElementById('div1')
const div2 = document.getElementById('div2')

// 新建节点
const newP = document.createElement('p')
newP.innerHTML = 'this is newP'

// 插入节点
const p1 = document.getElementById('p1')
div2.appendChild(p1)

// 获取父元素
console.log(p1.parentNode)

// 获取子元素列表
const div1ChildNodes = div1.childNodes
console.log(div1.childNodes)
const div1ChildNodesP = Array.prototype.slice.call(div1ChildNodes).filter(child => {
  if(child.nodeType === 1) {
    return true
  }
  return false
})
console.log('div1ChildNodesP: ', div1ChildNodesP)

div1.removeChild(div1ChildNodesP[0])
```

### DOM 性能

- DOM 操作非常 昂贵 ，避免频繁的 DOM 操作

- 对 DOM 查询做缓存

- 将频繁操作改为一次性操作

```js
const list = document.getElementById('list')

// 创建一个文档片段，此时还没有插入到DOM结构中
const frag = document.createDocumentFragment()

for (let i = 0; i < 20; i++) {
  const li = document.createElement('li')
  li.innerHTML = `List item ${i}`

  // 先插入文档片段中
  frag.appendChild(li)
}

// 都完成之后再统一插入到DOM结构中
list.appendChild(frag)
console.log(list)
```

## BOM 操作

- [navigator](https://developer.mozilla.org/zh-CN/docs/Web/API/Navigator) 浏览器信息

- [screen](https://developer.mozilla.org/zh-CN/docs/Web/API/Screen) 屏幕信息

> [理清window和document的区别以及两者的宽高](https://www.jianshu.com/p/b28a4dcd1b8c)

- [location](https://developer.mozilla.org/zh-CN/docs/Web/API/Location) 地址信息

- [history](https://developer.mozilla.org/zh-CN/docs/Web/API/History) 前进后退信息

```js
// navigator浏览器信息
const ua = navigator.userAgent
const isChrome =  ua.indexOf('Chrome')
console.log('isChrome: ', isChrome)

// screen 屏幕信息
console.log(screen.width)
console.Log(screen.height)

// location URL信息
console.log(location.href)
console.log(location.protocol)
console.log (location.pathname)
console.log(location.search)
console.log ( location.hash)

// history 前进后退
history.back()
history.forward()
```

## 事件

事件冒泡：基于 DOM 树形结构，事件会顺着触发元素往上冒泡。事件代理是基于事件冒泡实现的

```js
// 通用的事件绑定函数
function bindEvent(elem, type, selector, fn) {
  if(fn == null) {
    fn = selector
    selector = null
  }
  elem.addEventListener(type, event => {
    const target = event.target
    if(selector) {
      // 代理绑定
      if(target.matches(selector)) {
        fn.call(target, event)
      }
    } else {
      // 普通绑定
      fn.call(target, event)
    }
  }) 
}

// 普通绑定
const btn1 = document.getElementById('btn1')
bindEvent(btn1, 'click', function(event) {
  // console.log(event.target) // 获取触发的元素
  // event.stopPropagation() // 组织冒泡
  event.preventDefault() // 组织默认行为
  console.log(this.innerHTML)
})

// 代理绑定
const div3 = document.getElementById('div3')
bindEvent(div3, 'click', 'a', function(event) {
  event.preventDefault() // 组织默认行为
  console.log(this.innerHTML)
})
```
