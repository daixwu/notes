// class Person {
//   constructor (name) {
//     this.name = name
//   }
// }

// let proxyPersonClass = new Proxy(Person, {
//   // handler.apply() 方法用于拦截函数的调用
//   apply (target, context, args) {
//     throw new Error(`hello: Function ${target.name} cannot be invoked without 'new'`)
//   }
// })

// // proxyPersonClass('lucas') // Uncaught Error: hello: Function Person cannot be invoked without 'new'

// new proxyPersonClass('lucas') // {name: "lucas"}


// class Person {
//   constructor (name) {
//     this.name = name
//   }
// }
 
// let proxyPersonClass = new Proxy(Person, {
//   apply (target, context, args) {
//     return new (target.bind(context, ...args))()
//   }
// })

// const lucas = {
//   age: 23
// }
// assert['lucas is older than 22!!!'] = 22 > lucas.age

// Error: lucas is older than 22!!!

// const assert = new Proxy({}, {
//   // handler.set() 方法是设置属性值操作的捕获器
//   set (target, warning, value) {
//     if (!value) {
//       console.error(warning)
//     }
//   }
// })

// const weather = 'cold'
// assert['The weather is not good!!!'] = weather === 'good'

// // Error: The weather is not good!!!

// class Person {
//   constructor (name) {
//     this.name = name
//   }
//   getPersonName() {
//     return this.name
//   }
// }
// const person = new Person('lucas')
// const fn = person.getPersonName
// fn() //  Cannot read property 'name' of undefined


// function autobind(target, key, { value: fn, configurable, enumerable }) {
//   return {
//     configurable,
//     enumerable,
//     get() {
//       const boundFn = fn.bind(this);
//       defineProperty(this, key, {
//         configurable: true,
//         writable: true,
//         enumerable: false,
//         value: boundFn
//       });
//       return boundFn;
//     },
//     set: createDefaultSetter(key)
//   }
// }


// class Person {
//   constructor (name) {
//     this.name = name
//   }
//   @autobind
//   getPersonName() {
//     return this.name
//   }
// }

var foo = 123

{
 foo = 'abc'
 let foo
}

// 将会报错：Uncaught ReferenceError: Cannot access 'foo' before initialization
