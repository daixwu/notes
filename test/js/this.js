// const foo = {
//   bar: 10,
//   fn: function() {
//     console.log(this) // {bar: 10, fn: ƒ}
//     console.log(this.bar) // 10
//   }
// }

// foo.fn()

// const o1 = {
//   text: 'o1',
//   fn: function() {
//     return this.text
//   }
// }

// const o2 = {
//   text: 'o2',
//   fn: function() {
//     return o1.fn()
//   }
// }

// const o3 = {
//   text: 'o3',
//   fn: function() {
//     let fn = o1.fn
//     return fn()
//   }
// }

// console.log(o1.fn()) // o1
// console.log(o2.fn()) // o1
// console.log(o3.fn()) // undefined


// Function.prototype.call2 = function(context) {
//   context = context || window
//   context.fn = this
//   const args = [...arguments].slice(1)
//   const result = context.fn(...args)
//   delete context.fn
//   return result
// }

// Function.prototype.apply2 = function(context, arr) {
//   context = context || window
//   context.fn = this
//   let result
//   if (!arr) {
//     result = context.fn()
//   } else {
//     result = context.fn(...arr)
//   }
//   delete context.fn
//   return result
// }

// Function.prototype.bind2 = function() {
//   let args = [...arguments]
//   const t = args.shift()
//   const self = this
//   return function() {
//     args = [...args, ...arguments]
//     return self.apply(t, args)
//   }
// }

// function list() {
//   return [...arguments];
// }

// function addArguments(arg1, arg2) {
//     return arg1 + arg2
// }

// var list1 = list(1, 2, 3)

// console.log('list1: ', list1)


// // 创建一个函数，它拥有预设参数列表。
// var leadingThirtysevenList = list.bind(null, 37, 10);

// // 创建一个函数，它拥有预设的第一个参数
// var addThirtySeven = addArguments.bind(null, 37, 10); 

// var list2 = leadingThirtysevenList(); 
// console.log('list2: ', list2) // [37]


// var list3 = leadingThirtysevenList(1, 2, 3); 
// console.log('list3: ', list3) // [37, 1, 2, 3]


// var result2 = addThirtySeven(5); 
// console.log('result2: ', result2) // 37 + 5 = 42 


// var result3 = addThirtySeven(5, 10);
// console.log('result3: ', result3) // 37 + 5 = 42 ，第二个参数被忽略


// function create() {
//   let [constructor, ...args] = [...arguments]
//   // 1 以构造器的 prototype 属性为原型，创建新对象
//   let obj = Object.create(constructor.prototype)
//   // 2 将 this (也就是上一句中的新对象)和调用参数传给构造器，并执行构造函数
//   let res = constructor.apply(obj, args)
//   // 3 如果构造器没有手动返回对象，则返回第一步创建的新对象，如果有，则返回手动 return 的对象
//   return res instanceof Object ? res : obj
// }


function foo (a) {
  this.a = a
}
const obj1 = {}
var bar = foo.bind(obj1)
var baz = new bar(3)
bar(2)
console.log(obj1.a) // 2

console.log(baz.a) // 3


// function foo() {
//   return a => {
//     console.log(this.a)
//   }
// }

// const obj1 = {
//   a: 2
// }

// const obj2 = {
//   a: 3
// }

// const bar = foo.call(obj1)
// console.log(bar.call(obj2)) // 先打印出2 再打印出 undefined