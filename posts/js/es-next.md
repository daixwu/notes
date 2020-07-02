# ES Next

## Object Spread VS Object.assign

Object Spread 和 Object.assign 在很多情况下做的事情是一致的，它们都属于 ES Next 的新特性，当然 Object Spread 更新。事实上，规范说明中，也告诉我们 「object spread」：`{... obj}` 和 `Object.assign({}, obj)` 是等价的。

但是一定还具有区别。实际上，`Object.assign()` 将会修改它的第一个参数对象，这个修改可以触发其第一个参数对象的 setter。从这个层面上讲，Object spread 操作符会创建一个对象副本，而不会修改任何值，这也许是更好的选择。（**Object spread 性能优于 `Object.assign` 待实践证明？**）

## 箭头函数不适用的场景

- 构造函数的原型方法上：构造函数的原型方法需要通过 this 获得实例，因此箭头函数不可以出现在构造函数的原型方法上

- 需要获得 arguments 时：箭头函数不具有 arguments，因此在其函数体内无法访问这一特殊的伪数组，那么相关场景下也不适合使用箭头函数

- 使用对象方法时

```js
const person = {
  name: 'lucas',
  getName: () => {
    console.log(this.name)
  }
}
person.getName()
```

上述代码中，getName 函数体内的 this 指向 window，显然不符合其用意。

- 使用动态回调时

同理，类似下面这种对回调函数的 this 有特殊场景需求的用法，箭头函数的 this 无法满足要求：

```js
const btn = document.getElementById('btn')

btn.addEventListener('click', () => {
  console.log(this === window)
})
```

当点击 id 为 btn 的按钮时，将会输出：true，事件绑定函数的 this 指向了 window，而无法获取事件对象。

## [Proxy](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Proxy) 代理

```js
const p = new Proxy(target, handler)
```

- target：要使用 Proxy 包装的目标对象（可以是任何类型的对象，包括原生数组，函数，甚至另一个代理）

- handler：一个通常以函数作为属性的对象，各属性中的函数分别定义了在执行各种操作时代理 p 的行为。

```js
class Person {
  constructor (name) {
    this.name = name
  }
}

let proxyPersonClass = new Proxy(Person, {
  // handler.apply() 方法用于拦截函数的调用
  apply (target, context, args) {
    throw new Error(`hello: Function ${target.name} cannot be invoked without 'new'`)
  }
})

proxyPersonClass('lucas') // Uncaught Error: hello: Function Person cannot be invoked without 'new'

new proxyPersonClass('lucas') // {name: "lucas"}
```

上面代码对 Person 构造函数进行了代理，这样就可以防止非构造函数实例化的调用。

同样道理，也可以静默处理非构造函数实例化的调用，将其强制转换为 new 调用：

```js
class Person {
  constructor (name) {
    this.name = name
  }
}

let proxyPersonClass = new Proxy(Person, {
  apply (target, context, args) {
    return new (target.bind(context, ...args))()
  }
})
```

这样即便在不使用 new 关键字时，仍然可以得到 new 调用的实例。

另外一个场景：实现断言 assert

```js
const assert = new Proxy({}, {
  // handler.set() 方法是设置属性值操作的捕获器
  set (target, warning, value) {
    if (!value) {
      console.error(warning)
    }
  }
})

const weather = 'cold'
assert['The weather is not good!!!'] = weather === 'good'

// Error: The weather is not good!!!
```

## [Decorator](https://zhuanlan.zhihu.com/p/20139834) 那些事

装饰器（Decorators）让你可以在设计时对类和类的属性进行「注解」和修改。

说直白一些，Decorator 就是给类添加或者修改类的属性与方法的。这么听上去似乎跟我们刚刚介绍的 proxy 似乎有异曲同工之秒。一些开发者可能已经在使用 Decorator 了，这里我借助 [autobind](https://www.npmjs.com/package/autobind-decorator) 这个类库的实现，介绍一下 Decorator 的玩法。

```js
class Person {
  constructor (name) {
    this.name = name
  }
  getPersonName() {
    return this.name
  }
}
const person = new Person('lucas')
const fn = person.getPersonName
fn() //  Cannot read property 'name' of undefined
```

上面报错是因为在执行 `fn()` 时，this 已经指向了 window，使用 autobind 可以完成对 this 的绑定：

```js
class Person {
  constructor (name) {
    this.name = name
  }
  @autobind
  getPersonName() {
    return this.name
  }
}
```

那么 autobind 怎么实现呢？伪代码如下：

```js
function autobind(target, key, { value: fn, configurable, enumerable }) {
  return {
    configurable,
    enumerable,
    get() {
      const boundFn = fn.bind(this);
      defineProperty(this, key, {
        configurable: true,
        writable: true,
        enumerable: false,
        value: boundFn
      });
      return boundFn;
    },
    set: createDefaultSetter(key)
  }
}
```

autobind 这个 decorator 接受以下三个参数。

- target：目标对象，这里是作用于 Person 中的函数属性的

- key：属性名称

- descriptor：属性原本的描述符

autobind decorator 函数最终返回描述符，这个描述符运行时相当于调用 `Object.defineProperty()` 修改原有属性，这样在使用 get 赋值时（`const fn = person.getPersonName`），赋值结果通过 `const boundFn = fn.bind(this)` 进行对 this 绑定，并返回绑定 this 后的结果，因此达到了我们对 getPersonName 属性方法绑定 this 的目的。

## Babel 编译对代码做了什么

为了能够使用到新鲜出炉的 ES Next 新特性，必不可少的一环就是 Babel，相信每个前端开发者都听说过它的大名。虽然 Babel 目前已经是个丰富的生态社区了，但是它刚出道时的目标，以及目前最核心的能力就是：编译 ES Next 代码，进行降级处理，进而规避了兼容性问题。

那么 Babel 编译到底是施展了什么魔法呢？它的核心原理是使用 AST（抽象语法树）将源码进行分析并转为目标代码。

### const、let 编译分析

简单来说，const、let 一律转成 var。为了保证 const 的不可变性：Babel 如果在编译过程中发现对 const 声明的变量进行了二次赋值，将会直接报错，这样就在编译阶段进行了处理。至于 let 的块级概念，ES5 中，我们一般通过 IIFE 实现块级作用域，但是 Babel 处理非常取巧，那就是在块内给变量换一个名字，块外自然就无法访问到。

我们知道使用 let 或者 const 声明的变量，存在暂时性死区（TDZ）现象。简单回顾下：代码声明变量所在的区块中，会形成一个封闭区域。在这个区域中，只要是在声明变量前使用这些变量，就会报错。

```js
var foo = 123

{
 foo = 'abc'
 let foo
}

// 将会报错：Uncaught ReferenceError: Cannot access 'foo' before initialization
```

那么 Babel 怎么编译模拟这种行为呢？其实我们提到 Babel 编译会将 let、const 变量重新命名，同时在 JavaScript 严格模式（strict mode）不允许使用未声明的变量，这样在声明前使用这个变量，也会报错。如下代码：

```js
"use strict";
var foo = 123
{
 _foo = 'abc'
 var _foo
}
```

我们加上严格模式的标记，自然就可以实现了 TDZ 的效果。

使用 const 声明的变量一旦声明，其变量（内存地址）是不可改变的。

```js
const foo = 0
foo = 1

// Uncaught TypeError: Assignment to constant variable
```

对此 Babel 的处理有比较有意思：

```js
"use strict";
function _readOnlyError(name) { throw new Error("\"" + name + "\" is read-only"); }

var foo = 0;
foo = (_readOnlyError("a"), 1);
```

我们看编译结果，Babel 检测到 const 声明的变量被改变赋值，就会主动插入了一个  _readOnlyError 函数，并执行此函数。这个函数的执行内容就是报错，因此代码执行时就会直接抛出异常。

### 箭头函数的编译分析

对于箭头函数的转换，也不难理解，看代码：

```js
var obj = {
  prop: 1,
  func: function() {
    var _this = this

    var innerFunc = () => {
        this.prop = 1
    }

    var innerFunc1 = function() {
        this.prop = 1
    }
  },

}
```

转换为：

```js
var obj = {
  prop: 1,
  func: function func() {
    var _this2 = this

    var _this = this

    var innerFunc = function innerFunc() {
      _this2.prop = 1
    }

    var innerFunc1 = function innerFunc1() {
      this.prop = 1
    }
  }
}
```

通过 `var _this2 = this` 保存当前环境的 this 为 `_this2`，在调用 innerFunc 时，用新储存的 `_this2` 进行替换函数体内的 this 即可。

## Decorators 的编译分析

上面的内容中，我们介绍了 decorators 新特性，那么 Babel 又是怎么编译 decorators 的呢？

使用方式：

```js
class Person{
  @log
  say(){}
}
```

我们有一个名为 log 的 decorators，Babel 编译：

```js
_applyDecoratedDescriptor(
 Person.prototype,
 'say',
 [log],
 Object.getOwnPropertyDescriptor(Person.prototype, 'say'),
 Person.prototype
)

function _applyDecoratedDescriptor(target, property, decorators, descriptor, context) {
  var desc = {};
  Object['ke' + 'ys'](descriptor).forEach(function (key) {
    desc[key] = descriptor[key];
  });
  desc.enumerable = !!desc.enumerable;
  desc.configurable = !!desc.configurable;

  if ('value' in desc || desc.initializer) {
    desc.writable = true;
  }

  desc = decorators.slice().reverse().reduce(function (desc, decorator) {
    return decorator(target, property, desc) || desc;
  }, desc);

  if (context && desc.initializer !== void 0) {
    desc.value = desc.initializer ? desc.initializer.call(context) : void 0;
    desc.initializer = undefined;
  }

  if (desc.initializer === void 0) {
    Object['define' + 'Property'](target, property, desc);
    desc = null;
  }

  return desc;
}
```

我们看这里主要依赖了 `_applyDecoratedDescriptor` 方法。这个方法将返回描述符 desc，具体执行逻辑为：先把所有 decorators 包装成一个数组，作为 `_applyDecoratedDescriptor` 方法的第三个参数传入，对于 decorators 这个数组，我们将 target、property、desc 作为参数，依次遍历执行数组中的每一个 decorator 函数。执行后返回每一个 decorator 产生的属性描述符。上述代码样例就是：decorators 这个数组只有一项：log。`[log]`，遍历数组时，我们将 target、property、desc 作为参数传给 log 函数并执行：`log(target, property, desc)`，返回结果即是新的属性描述符。
