# 作用域和闭包

## 作用域

在 JavaScript 中，ES6 出现之前只有函数作用域和全局作用域之分。随着作用域概念不断演进，ES6 增加了 let 和 const 声明变量的块级作用域，使得 JavaScript 中作用域范围更加丰富。块级作用域，顾名思义，作用域范围限制在代码块中，这个概念在其他语言里也普遍存在。当然这些新特性的添加，也增加了一定的复杂度，带来了新的概念，比如暂时性死区：

```js

function foo() {
  console.log(bar) // 暂时性死区，这里会报错
  let bar = 3
  console.log(bar) // 这里可以正常访问，当然是在前面不报错的前提下
}
foo()
```

**作用域应用的特殊情况，有两种表现**：

- 函数作为返回值

```js
function create() {
  const a = 100
  return function() {
    console.log(a)
  }
}

const fn = create()
const a = 200
fn() // 100
```

- 函数作为参数被传递

```js
function print(fn) {
  const a = 200
  fn()
}

const a = 100

function fn() {
  console.log(a)
}

print(fn) // 100
```

> 注：所有自由变量的查找，是在函数定义的地方，向上级作用域查找，不是在执行的地方！！！

## 闭包

函数嵌套函数时，内层函数引用了外层函数作用域下的变量，并且内层函数在全局环境下可访问，就形成了闭包。

> 正常来讲，在函数执行完毕并出栈时，函数内局部变量在下一个垃圾回收节点会被回收，该函数对应的执行上下文将会被销毁，这也正是我们在外界无法访问函数内定义的变量的原因。也就是说，只有在函数执行时，相关函数可以访问该变量，该变量在预编译阶段进行创建，在执行阶段进行激活，在函数执行完毕后，相关上下文被销毁。

**闭包的使用**：

```js
// 闭包隐藏数据，只提供 API
function createCache() {
  const data = {} // 闭包中的数据被隐藏，不被外界访问
  return {
    set: function(key, val) {
      data[key] = val
    },
    get: function(key) {
      return data[key]
    }
  }
}
```

```js
// 利用闭包实现单例模式
function Person() {
  this.name = 'lucas'
}

const getSingleInstance = (function(){
  let singleInstance
  console.log('singleInstance: ', singleInstance);
  return function() {
    if (singleInstance) {
      return singleInstance
    }
    return singleInstance = new Person()
  }
})()

const instance1 = new getSingleInstance()
const instance2 = new getSingleInstance()
```
