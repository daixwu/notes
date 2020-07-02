// class Person {
//   constructor(){
//       this.type = 'person'
//   }
// }

// class Student extends Person {
//   constructor(){
//       super()
//   }
// }

// var student1 = new Student()
// student1.type // "person"
// console.log('student1.type: ', student1.type);

// var Person = function Person() {
//   _classCallCheck(this, Person);
//   this.type = 'person';
// };

// // 实现定义 Student 构造函数，它是一个自执行函数，接受父类构造函数为参数
// var Student = (function(_Person) {
//   // 实现对父类原型链属性的继承
//   _inherits(Student, _Person);

//   // 将会返回这个函数作为完整的 Student 构造函数
//   function Student() {
//       // 使用检测
//       _classCallCheck(this, Student);  
//       // _get 的返回值可以先理解为父类构造函数       
//       _get(Object.getPrototypeOf(Student.prototype), 'constructor', this).call(this);
//   }

//   return Student;
// })(Person);

// // _x 为 Student.prototype.__proto__
// // _x2 为'constructor'
// // _x3 为 this
// var _get = function get(_x, _x2, _x3) {
//   var _again = true;
//   _function: while (_again) {
//       var object = _x,
//           property = _x2,
//           receiver = _x3;
//       _again = false;
//       // Student.prototype.__proto__ 为 null 的处理
//       if (object === null) object = Function.prototype;
//       // 以下是为了完整复制父类原型链上的属性，包括属性特性的描述符
//       var desc = Object.getOwnPropertyDescriptor(object, property);
//       if (desc === undefined) {
//           var parent = Object.getPrototypeOf(object);
//           if (parent === null) {
//               return undefined;
//           } else {
//               _x = parent;
//               _x2 = property;
//               _x3 = receiver;
//               _again = true;
//               desc = parent = undefined;
//               continue _function;
//           }
//       } else if ('value' in desc) {
//           return desc.value;
//       } else {
//           var getter = desc.get;
//           if (getter === undefined) {
//               return undefined;
//           }
//           return getter.call(receiver);
//       }
//   }
// };

// function _inherits(subClass, superClass) {
//   // superClass 需要为函数类型，否则会报错
//   if (typeof superClass !== 'function' && superClass !== null) {
//       throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass);
//   }
//   // Object.create 第二个参数是为了修复子类的 constructor
//   subClass.prototype = Object.create(superClass && superClass.prototype, {
//       constructor: {
//           value: subClass,
//           enumerable: false,
//           writable: true,
//           configurable: true
//       }
//   });
//   // Object.setPrototypeOf 是否存在做了一个判断，否则使用 __proto__
//   if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass;
// }



// function People(name) {
//   this.name = name
// }
// People.prototype.age = 23 // 岁数
// console.log('People.prototype: ', People.prototype);
// // 创建两个实例
// let People1 = new People('OBKoro1')
// let People2 = new People('扣肉')
// People.prototype.age = 24 // 长大了一岁
// console.log(People1.age, People2.age) // 24 24

// function Star(name,age) {
//   // 实例成员 - 实例属性
//   this.name = name
//   this.age = age
// }

// // 实例成员 - 挂载原型对象上的实例方法
// Star.prototype.myName = function() {
//   console.log(this.name)
// }
// // 静态成员 - 静态属性
// Star.sex = '女'
// // 静态成员 - 静态方法
// Star.mySex = function() {
//   console.log(this.sex)
// }

// let stars = new Star('Anne',18)
// console.log(stars)      // Star {name: "小红", age: 18}
// console.log(stars.sex) // undefined 实例无法访问sex属性
// stars.myName() // 小红

// console.log(Star.name) // Star 通过构造函数无法直接访问实例成员
// console.log(Star.sex)  // 女 通过构造函数可直接访问静态成员
// Star.mySex() // 女

// function Star() {
//   this.sing = function () {
//       console.log('我爱唱歌')
//   }
// }
// let stu1 = new Star()
// let stu2 = new Star()
// stu1.sing() //我爱唱歌
// stu2.sing() //我爱唱歌
// console.log(stu1.sing === stu2.sing) // false
// function Star(name) {
//   this.name = name
// }
// Star.prototype.name = 'hou'
// Star.prototype.sing = function () {
//   console.log(this)
//   console.log(`${this.name}爱唱歌`)
// };
// let stu1 = new Star('Anne')
// let stu2 = new Star('Haney')
// stu1.sing() // Anne爱唱歌
// stu2.sing() // Haney爱唱歌
// console.log(stu1.sing === stu2.sing) // true


// Star.prototype.sing()
// function Person(){}
// let friend = new Person()
// Person.prototype.sayHi = function(){
//     console.log("hi")
// };

// friend.sayHi() // "hi"（没有问题！）

// function Person(){}
// let friend = new Person();
// Person.prototype = {
//     constructor: Person,
//     name : "Stone",
//     age : 28,
//     job : "Software Engineer",
//     sayName : function () {
//         console.log(this.name)
//     }
// }

// friend.sayName()  // Uncaught TypeError: friend.sayName is not a function

// function Father(){
//   this.value = true
// }
// Father.prototype.getValue = function(){
//   return this.value
// }

// function Son(){
//   this.value2 = false
// }

// // 继承了 Father
// Son.prototype = new Father();

// Son.prototype.getValue2 = function (){
//   return this.value2
// }

// let son = new Son()
// console.log(son.getValue())  // true



// const Person = function (name, age) {
//   // 实例成员 - 实例属性，可以通过对象.属性访问的属性叫实例属性
//   this.name = name
//   this.age = age
// }

// // 静态成员 - 静态属性，挂载在构造函数
// Person.info = 'nice'

// // 实例成员 - 实例方法，挂载在原型链，生成的对象可直接点方法的方式调用
// Person.prototype.say = function () {
//   console.log('实例方法');
// }

// // 静态成员 - 静态方法
// Person.show = function () {
//   console.log('静态方法');
// }

// const p1 = new Person('steven', 20)
// console.log(p1.name) // 实例属性获取方式
// p1.say() // 实例方法调用方式
// console.log(Person.info + '--') // 静态属性调用方式
// Person.show() // 静态方法调用方式

// class Animal {
//   // 类构造器 默认为空
//   // 构造器的作用：每当new一个类，会优先执行构造器中代码
//   constructor(name, age) {
//     // 实例成员 - 实例属性
//     this.name = name
//     this.age = age
//   }

//   // 静态成员 - 静态属性
//   static info = 'es6 静态方法'

//   // 实例成员 - 挂载原型对象上的实例方法
//   jump() {
//     console.log('es6 实例方法');
//   }

//   // 静态成员 - 静态方法
//   static show() {
//     console.log('es6 静态方法');
//   }
// }

// const a1 = new Animal('大黄', 4)
// console.log(a1.name); // 实例属性调用
// console.log(Animal.info); // 静态方法
// a1.jump() // 实例方法调用
// Animal.show() // 静态方法调用


// let o = {}
// o.constructor === Object // true

// let a = [];
// a.constructor === Array // true

// let n = new Number(3)
// n.constructor === Number // true

// let f = new Function()
// f.constructor === Function // true
// console.log('f.constructor === Function: ', f.constructor === Function)


// function Person(name) {
//     this.name = name
// }
// console.log(Person.prototype.constructor) // Person(name){this.name = name}

// let p = new Person('Henna')
// console.log(Person.prototype.constructor == p.constructor) // true


// const person = {
//   isHuman: false,
//   printIntroduction: function () {
//     console.log(`My name is ${this.name}. Am I human? ${this.isHuman}`)
//   }
// };
// const me = Object.create(person) // me.__proto__ === person
// me.name = "Matthew" // name属性被设置在新对象me上，而不是现有对象person上
// me.isHuman = true // 继承的属性可以被重写
// me.printIntroduction() // My name is Matthew. Am I human? true
  
// let obj = new Object()
// Object.prototype === Object.getPrototypeOf( obj )  // true

// Object.prototype === Object.getPrototypeOf( {} ) // true


function Car(make, model, year) {
  this.make = make
  this.model = model
  this.year = year
}
let myCar = new Car("Honda", "Accord", 1998)
let a = myCar instanceof Car    // 返回 true
let b = myCar instanceof Object // 返回 true