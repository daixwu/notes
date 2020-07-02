# 相关 API

## [Object.prototype.constructor](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/constructor)

- `Object.prototype.constructor` 返回创建实例对象的 Object 构造函数的引用

```js
function Person(name) {
    this.name = name
}
console.log(Person.prototype.constructor) // Person(name){this.name = name}

let p = new Person('Henna')
console.log(Person.prototype.constructor == p.constructor) // true
```

- 所有对象都会从它的原型上继承一个 constructor 属性

```js
let o = {}
o.constructor === Object // true

let a = [];
a.constructor === Array // true

let n = new Number(3)
n.constructor === Number // true

let f = new Function()
f.constructor === Function // true
```

## [Object.create()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/create)

```js
Object.create(proto[, propertiesObject])
```

- `Object.create()`方法创建一个新对象，使用现有的对象来提供新创建的对象的`__proto__`

```js
const person = {
  isHuman: false,
  printIntroduction: function () {
    console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`)
  }
};
const me = Object.create(person) // me.__proto__ === person
me.name = "Matthew" // name属性被设置在新对象me上，而不是现有对象person上
me.isHuman = true // 继承的属性可以被重写
me.printIntroduction() // My name is Matthew. Am I human? true
```

- 如果 proto 参数是 null，那新对象就彻彻底底是个空对象，没有继承 `Object.prototype` 上的任何属性和方法，如`hasOwnProperty()`、`toString()`等。

- propertiesObject 是可选参数，指定要添加到新对象上的可枚举的属性（即其自定义的属性和方法，可用 `hasOwnProperty()` 获取的，而不是原型对象上的）的描述符及相应的属性名称。

实现 `Object.create()`

```js
Object.create = function(proto, properties) {
  function F() {}
  F.prototype = proto
  if(properties) {
    Object.defineProperties(F, properties)
  }
  return new F()
}
```

## [Object.setPrototypeOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/setPrototypeOf)

```js
Object.setPrototypeOf(obj, prototype)
```

`Object.setPrototypeOf()` 方法设置一个指定的对象的原型 ( 即, 内部`__Proto__`属性）到另一个对象或  null。

```js
let o1 = { name: 'Anne'}
let o2 = { age: 18 }
Object.setPrototypeOf(o2, o1)
console.log(o2.name) // Anne
console.log(o2.age) // 18
console.log(o2) // {age: 18}
console.log(o2.__proto__) // {name: "Anne"}
```

## [Object.getPrototypeOf()](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Object/GetPrototypeOf)

```js
Object.getPrototypeOf(object)
```

`Object.getPrototypeOf()` 方法返回指定对象的原型（内部`__Proto__`属性的值）。

```js
let obj = new Object()
Object.prototype === Object.getPrototypeOf( obj )  // true

Object.prototype === Object.getPrototypeOf( {} ) // true
```

## [instanceof](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/instanceof)

```js
object instanceof constructor
```

instanceof 运算符用于检测构造函数的 prototype 属性是否出现在某个实例对象的原型链上。

```js
function Car(make, model, year) {
  this.make = make
  this.model = model
  this.year = year
}
let myCar = new Car("Honda", "Accord", 1998)
let a = myCar instanceof Car    // 返回 true
let b = myCar instanceof Object // 返回 true
```
