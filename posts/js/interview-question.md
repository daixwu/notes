# 前端面试题

## JS闭包面试题

```js
function fun(n,o){
  console.log(o)
  return {
    fun:function(m){//[2]
      return fun(m,n)//[1]
    }
  }
}

var a=fun(0) // undefined
a.fun(1) // 0
a.fun(2) // 0
a.fun(3) // 0
var b=fun(0).fun(1).fun(2).fun(3) // undefined 0 1 2
var c=fun(0).fun(1) // undefined 0
c.fun(2) // 1
c.fun(3) // 1
```

[解析](https://www.cnblogs.com/xxcanghai/p/4991870.html)

## 获取一组不重复的随机数的方法

```js
function roa(arr, count) {    //arr为可能出现的元素集合
  var temp = []    //temp存放生成的随机数组
　  var count = count || arr.length  
  for (let i = 0; i < count; i++) { 
    var num=Math.floor(Math.random()*arr.length) //生成随机数num
    temp.push(arr[num])    //获取arr[num]并放入temp
    arr.splice(num, 1)   
  }
  return temp
}

let arr = [1,2,3,5,6,7,8,9,10,12,13,14,15]
const r = roa(arr, 2)
```

```js
// 得到一个两数之间的随机整数
function getRandomInt(min, max) {
  min = Math.ceil(min); // Math.ceil() 函数返回大于或等于一个给定数字的最小整数
  max = Math.floor(max); // Math.floor() 返回小于或等于一个给定数字的最大整数
  return Math.floor(Math.random() * (max - min)) + min//不含最大值，含最小值
}
```

## 手写深度比较 模拟 lodash isEqual

```js
// 判断是否是对象或数组
function isObject(obj) {
  return typeof obj === 'object' && obj !== null
}

// 全相等（深度）
function isEqual(obj1, obj2) {
  if(!isObject(obj1) || !isObject(obj2)) {
    // 值相等 （注意 参与 equal 的一般不会是函数）
    return obj1 === obj2
  }

  if(obj1 === obj2) {
    return true
  }

  // 两个都是对象或数组，而且不相等
  // 1. 先取出 obj1 和 obj2 的keys，比较个数
  const obj1Keys = Object.keys(obj1)
  const obj2Keys = Object.keys(obj2)
  if(obj1Keys.length !== obj2Keys.length) {
    return false
  }

  // 2. 以 obj1 为基准和 onj2 依次递归比较 
  for (let key in obj1) {
    // 比较当前 key 的 val —— 递归
    const res = isEqual(obj1[key], obj2[key])
    if (!res) {
      return false
    }
  }
  // 全相等
  return true
}
```

## `split()`和`join()`的区别

`String.prototype.split(separator, limit)` 方法使用指定的分隔符字符串将一个String对象分割成子字符串数组

```js
let str = 'Talk is cheap'

console.log(str.split(' ')) // ["Talk", "is", "cheap"]
console.log(str.split('')) // ["T", "a", "l", "k", " ", "i", "s", " ", "c", "h", "e", "a", "p"]
console.log(str.split(' ', 1)) // ["Talk"]
console.log(str.split('', 1)) // ["T"]
```

`Array.prototype.join(separator)` 方法将数组（或类数组对象）的所有元素连接成一个字符串并返回这个字符串

```js
let arr = ['Talk', 'is', 'cheap']
console.log(arr.join()) // Talk,is,cheap
console.log(arr.join(' ')) // Talk is cheap
console.log(arr.join('-')) // Talk-is-cheap

function dJoin(...args) {
  return args.join(' ')
}

let d = dJoin('Show', 'me', 'the', 'code')
console.log('d : ', d )  // Show me the code
```

## 数组的 pop push unshift shift分别做什么

```js
let arr = [10, 20, 30, 40]
// pop 删除并返回数组的最后一个元素(改变数组和其长度)
const popRes = arr.pop()
console.log('pop res', popRes) // 40
console.log('pop arr', arr) // [10, 20, 30]

arr = [10, 20, 30, 40]
// push 向数组的末尾添加一个或多个元素，并返回新的长度
const pushRes = arr.push(50)
console.log('push res', pushRes) // 5 arr.length
console.log('push arr', arr) // [10, 20, 30, 40, 50]

arr = [10, 20, 30, 40]
// shift 把数组的第一个元素从其中删除，并返回第一个元素的值(改变数组和其长度)
const shiftRes = arr.shift()
console.log('push res', shiftRes) // 10
console.log('push arr', arr) // [20, 30, 40]

arr = [10, 20, 30, 40]
// unshift 把数组的第一个元素从其中删除，并返回第一个元素的值(改变数组和其长度)
const unshiftRes = arr.unshift(0)
console.log('push res', unshiftRes) // 5 arr.length
console.log('push arr', arr) // [0, 10, 20, 30, 40]
```

## 纯函数

- 不改变原数组（没有副作用）

- 返回一个数组

```js
let arr = [10, 20, 30, 40]
    
// concat
const concatRes = arr.concat([50, 60, 70])
console.log('concat res', concatRes) // [10, 20, 30, 40, 50, 60, 70]
console.log('concat arr', arr) // [10, 20, 30, 40]

// map
const mapRes = arr.map(num => num * 10)
console.log('map res', mapRes) // [100, 200, 300, 400]
console.log('map arr', arr) // [10, 20, 30, 40]

// filter
const filterRes = arr.filter(num => num > 25)
console.log('filter res', filterRes) //  [30, 40]
console.log('filter arr', arr) // [10, 20, 30, 40]

// slice
const sliceRes = arr.slice()
console.log('slice res', sliceRes) // [10, 20, 30, 40]
console.log('slice arr', arr) // [10, 20, 30, 40]
const sliceRes1 = arr.slice(1, 3)
console.log('slice res1', sliceRes1) // [20, 30]
console.log('slice arr1', arr) // [10, 20, 30, 40]
```

> 非纯函数：push、pop、shift、unshift、forEach、some、every、reduce

## `slice()`（切片） 和 `splice()`（剪辑） 的区别

```js
let arr = [10, 20, 30, 40]

// slice 纯函数
// slice(start,end) 方法可从已有的数组中返回选定的元素, 返回一个新的数组，包含从 start 到 end （不包括该元素）的 arrayObject 中的元素
console.log(arr.slice(1, 2)) // [20]
console.log(arr.slice()) // [10, 20, 30, 40]
console.log(arr.slice(2)) // [30, 40]
console.log(arr) // [10, 20, 30, 40]

// splice 非纯函数
// splice 向/从数组中添加/删除项目，然后返回被删除的项目（改变数组的长度）
console.log(arr.splice(1, 2)) // [20, 30]
console.log(arr) // [10, 40]
arr = [10, 20, 30, 40]
console.log(arr.splice(1, 0, 25)) // []
console.log(arr) // [10, 25, 20, 30, 40]
```

## [10,20,30].map(parseInt)返回结果是什么?

```js
const mapRes = [10, 20, 30].map(parseInt)
console.log('mapRes: ', mapRes) // [10, NaN, NaN]

// 拆解
const mapRes1 = [10, 20, 30].map((num, index) => {
  return parseInt(num, index)
})
console.log('mapRes1: ', mapRes1) // [10, NaN, NaN]
```

## ajax请求get和post的区别?

- get一般用于查询操作，post一般用户提交操作

- get参数拼接在url上，post放在请求体内(数据体积可更大)

- 安全性：使用post接口，可增加验证，例如密码、短信验证码、指纹等来预防XSRF(跨站请求伪造)

## 阻止事件冒泡和默认行为

- `event.stopPropagation()` 阻止事件冒泡

- `event.preventDefault()` 阻止默认行为

## `new Object()` 和 `Object.create()` 的区别

- `{}` 等同于 `new Object()`，原型 `Object.prototype`

- `Object.create(nul)` 没有原型

- `Object.create({…})` 可指定原型

## 手写字符串 trim 保证浏览器兼容性

```js
String.prototype.trim = function() {
  return this.replace(/^\s+/, '').replace(/\s+$/, '')
}
console.log('  trim  '.trim()) // trim
```

## 获取多个数字中的最大值

```js
function max() {
  const numArray = [...arguments]
  let max = numArray[0]
  numArray.forEach(item => {
    if(item > max) {
      max = item
    }
  })

  return max
}
console.log(max(...[1, 3, 5, 7])) // 7

// Math.max
console.log(Math.max(...[1, 3, 5, 7])) // 7

// Math.min
console.log(Math.min(...[1, 3, 5, 7])) // 1
```

## 如何捕获 JS 中的异常？

```js
try {
  // todo
} catch (e) {
  console.log(e) // 手动捕获 catch
} finally {
  // todo
}

// 自动捕获
window.onerror = function(message, source, lineNom, colNom, err) {
  // 第一 对跨域的js 如CDN不会有详细的报错信息
  // 第二 对于压缩的js 还要配合 sourceMap 反查到未压缩代码的行、列
}
```

## 将 url 参数解析为 JS 对象

- 传统方式，查找 [location.search](https://developer.mozilla.org/zh-CN/docs/Web/API/Location/search)

- 新 API，[URLSearchParams](https://developer.mozilla.org/zh-CN/docs/Web/API/URLSearchParams)

```js
function query(name) {
  let res = {}
  const search = location.search.substr(1) 
  // 类似 array.slice(1)
  // search: a=10&b=20%c=30
  // location.search: ?a=10&b=20&c=30
  search.split('&').forEach(item => {
    const arr = item.split('=')
    res[arr[0]] = arr[1]
  })

  return name ? res[name] : res
}

function query(name) {
  const res = {}
  const search = location.search
  const pList = new URLSearchParams(search)
  pList.forEach((val, key) => {
    res[key] = val
  })
  return name ? res[name] : res
}


console.log(query()) // {a: "10", b: "20", c: "30"}

console.log(query('a')) // 10
```

## 手写 flatten 考虑多层级

```js
function flat(arr) {
  const isDeep = arr.some(item => item instanceof Array)

  if(!isDeep) {
    return arr
  }
  // concat() 方法用于合并两个或多个数组，在拼接的过程中加上扩展运算符会展开一层数组

  // 方式一
  // const res = Array.prototype.concat.apply([], arr)

  // 方式二
  // const res = arr.reduce((pre, cur) => pre.concat(cur), [])
  
  // 方式三
  const res = arr.flat()
  return flat(res)
}

console.log(flat([1,2,[3,4, [5,6]]])) // [1, 2, 3, 4, 5, 6]

[1,2,[3,4, [5,6]]].flat(Infinity)
```

[数组拍平（扁平化） flat 方法实现](https://www.jianshu.com/p/54609c2eec4e)

## 数组去重有几种方式？

```js
// 传统方式
function unique(arr) {
  const res = []
  arr.forEach(item => {
    if(!res.includes(item)) {
      res.push(item)
    }
  })
  return res
}

// 使用 set (无序，不能重复)
function unique1(arr) {
  const set = new Set(arr)
  return [...set]
}

console.log(unique([1,1,12,3,3,4])) // [1, 12, 3, 4]
```

## 介绍 RAF requestAnimationFrame

- 要想动画流畅，更新频率要60帧/s，即16.67ms更新一次视图

- setTimeout要手动控制频率，而RAF浏览器会自动控制

- 后台标签或隐藏 iframe中，RAF会暂停，而 setTimeout依然执行

> 使用setTimeout实现的动画，当页面被隐藏（隐藏的`<iframe>`）或最小化（后台标签页）时，setTimeout仍然在后台执行动画任务，由于此时页面处于不可见或不可用状态，刷新动画是没有意义的，而且还浪费 CPU 资源和电池寿命。而requestAnimationFrame则完全不同，当页面处于未激活的状态下，该页面的屏幕绘制任务也会被浏览器暂停，因此跟着浏览器步伐走的requestAnimationFrame也会停止渲染，当页面被激活时，动画就从上次停留的地方继续执行，有效节省了 CPU 开销，提升性能和电池寿命。

```js
const box1 = document.getElementById('box1')
const box2 = document.getElementById('box2')

let curWidth = 100
const maxWidth = 340

function animateST() {
  curWidth = curWidth + 1
  box1.style.width = `${curWidth}px`
  if (curWidth < maxWidth) {
    setTimeout(animateST, 16.7) // 自己控制时间
  }
}

animateST()

function animateRAF() {
  curWidth = curWidth + 1
  box2.style.width = `${curWidth}px`
  if (curWidth < maxWidth) {
    window.requestAnimationFrame(animateRAF) // 时间不用自己控制
  }
}

animateRAF()
```

## 实现一个 LazyMan，按照以下方式调用时，得到相关输出

```js
LazyMan("Hank")
// Hi! This is Hank!

LazyMan("Hank").sleep(10).eat("dinner")
// Hi! This is Hank!
// 等待 10 秒..
// Wake up after 10
// Eat dinner~

LazyMan("Hank").eat("dinner").eat("supper")
// Hi This is Hank!
// Eat dinner~
// Eat supper~

LazyMan("Hank").sleepFirst(5).eat("supper")
// 等待 5 秒
// Wake up after 5
// Hi This is Hank!
// Eat supper
```

我们应该如何解这个题目呢，从拿到需求开始进行分析：

- 先从最简单的，我们可以封装一些基础方法，比如 log 输出、封装 setTimeout 等

- 因为 LazyMan 要实现一系列调用，且调用并不是顺序执行的，比如如果 sleepFirst 出现在调用链时，优先执行；同时任务并不是全部都同步执行的，因此我们应该实现一个任务队列，这个队列将调度执行各个任务

- 因此每次调用 LazyMan 或链式执行时，我们应该将相关调用方法加入到（push）任务队列中，储存起来，后续统一被调度

- 在写入任务队列时，如果当前的方法为 sleepFirst，那么需要将该方法放到队列的最头处，这应该是一个 unshift 方法

这么一分析，这道题就「非常简单」了。

我们来试图解剖一下这道题目的考察点：

- 面向对象思想与设计，包括类的使用等

- 对象方法链式调用的理解和设计

- 小部分设计模式的设计

- 因为存在「重复逻辑」，考察代码的解耦和抽象能力

- 逻辑的清晰程度以及其他编程思维

**常规思路解答**:

基于以上思路，我们给出较为常规的答案，其中代码已经加上了必要的注释：

```js
class LazyManGenerator {
 constructor(name) {
   this.taskArray = []

   // 初始化时任务
   const task = () => {
     console.log(`Hi! This is ${name}`)
     // 执行完初始化时任务后，继续执行下一个任务
     this.next()
   }

   // 将初始化任务放入任务队列中
   this.taskArray.push(task)

   setTimeout(() => {
     this.next()
   }, 0)
 }

 next() {
     // 取出下一个任务并执行
   const task = this.taskArray.shift()
   task && task()
 }

 sleep(time) {
   this.sleepTask(time, false)
   // return this 保持链式调用
   return this
 }

 sleepFirst(time) {
   this.sleepTask(time, true)
   return this
 }

 sleepTask(time, prior) {
   const task = () => {
     setTimeout(() => {
       console.log(`Wake up after ${time}`)
       this.next()
     }, time * 1000)
   }

   if (prior) {
     this.taskArray.unshift(task)
   } else {
     this.taskArray.push(task)
   }
 }

 eat(name) {
   const task = () => {
     console.log(`Eat ${name}`)
     this.next()
   }

   this.taskArray.push(task)
   return this
 }
}

function LazyMan(name) {
 return new LazyManGenerator(name)
}
```

简单分析一下：

- LazyMan 方法返回一个 LazyManGenerator 构造函数的实例

- 在 LazyManGenerator constructor 当中，我们维护了 taskArray 用来存储任务，同时将初始化任务放到 taskArray 当中

- 还是在 LazyManGenerator constructor 中，将任务的逐个执行即 next 调用放在 setTimeout 中，这样就能够保证在开始执行任务时，taskArray 数组已经填满了任务

- 我们来看看 next 方法，取出 taskArray 数组中的首项，进行执行

- eat 方法将 eat task 放到 taskArray 数组中，注意 eat task 方法需要调用 `this.next()` 显式调用「下一个任务」；同时返回 this，完成链式调用

- sleep 和 sleepFirst 都调用了 sleepTask，不同在于第二个参数：sleepTask 第二个参数表示是否优先执行，如果 prior 为 true，则使用 unshift 将任务插到 taskArray 开头

这个解法最容易想到，也相对来说容易，主要是面向过程。关键点在于对于 setTimeout 任务队列的准确理解以及 return this 实现链式调用的方式。

事实上，sleepTask 应该作为 LazyManGenerator 类的私有属性出现，因为 ES class 暂时 private 属性没有被广泛实现，这里不再追求实现。

**设计模式解答**:

关于这道题目的解答，网上最流行的是一种发布订阅模式的方案。相关代码出处：[lazyMan](https://github.com/wall-wxk/blogDemo/blob/master/2017/01/22/lazyMan.html)
