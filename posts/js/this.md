# this 指向

先上结论：this 的指向，是在调用函数时根据执行上下文所动态确定的

相关规律：

- 在函数体中，简单调用该函数时（非显式/隐式绑定下），严格模式下 this 绑定到 undefined，否则绑定到全局对象 window／global

```js
const o1 = {
  text: 'o1',
  fn: function() {
    return this.text
  }
}

const o2 = {
  text: 'o2',
  fn: function() {
    return o1.fn()
  }
}

const o3 = {
  text: 'o3',
  fn: function() {
    let fn = o1.fn
    return fn()
  }
}

console.log(o1.fn()) // o1
console.log(o2.fn()) // o1
console.log(o3.fn()) // undefined
```

> 在执行函数时，如果函数中的 this 是被上一级的对象所调用，那么 this 指向的就是上一级的对象；否则指向全局环境

- 一般构造函数 new 调用，绑定到新创建的对象上

**实现一个简单的new方法**:

```js
function create() {
  let [constructor, ...args] = [...arguments]
  // 1 以构造器的 prototype 属性为原型，创建新对象
  let obj = Object.create(constructor.prototype)
  // 2 将 this (也就是上一句中的新对象)和调用参数传给构造器，并执行构造函数
  let res = constructor.apply(obj, args)
  // 3 如果构造器没有手动返回对象，则返回第一步创建的新对象，如果有，则返回手动 return 的对象
  return res instanceof Object ? res : obj
}
```

- 一般由 call/apply/bind 方法显式调用，绑定到指定参数的对象上

**自行实现call、apply 方法**：

```js
// call
Function.prototype.call2 = function(context) {
  context = context || window
  context.fn = this
  const args = [...arguments].slice(1)
  const result = context.fn(...args)
  delete context.fn
  return result
}
```

```js
// apply
Function.prototype.apply2 = function(context, arr) {
  context = context || window
  context.fn = this
  let result
  if (!arr) {
    result = context.fn()
  } else {
    result = context.fn(...arr)
  }
  delete context.fn
  return result
}
```

```js
// bind
Function.prototype.bind2 = function() {
  let args = [...arguments]
  const t = args.shift()
  const self = this
  return function() {
    args = [...args, ...arguments]
    return self.apply(t, args)
  }
}
```

- 一般由上下文对象调用，绑定在该对象上

- 箭头函数中，根据外层上下文绑定的 this 决定 this 指向

```js
function foo() {
  return a => {
    console.log(this.a)
  }
}

const obj1 = {
  a: 2
}

const obj2 = {
  a: 3
}

const bar = foo.call(obj1)
// 箭头函数的绑定无法被修改
console.log(bar.call(obj2)) // 先打印出2 再打印出 undefined
```

```js
function foo (a) {
  this.a = a
}
const obj1 = {}
var bar = foo.bind(obj1)
bar(2)
console.log(obj1.a) // 2

// new 绑定的优先级比显式 bind 绑定更高
var baz = new bar(3)
console.log(baz.a) // 3
```
