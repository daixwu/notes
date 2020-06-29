// foo(10)
// function foo (num) {
//    console.log(foo)
//    foo = num;       
//    console.log(foo)
//    var foo
// }
// console.log(foo)
// foo = 1
// console.log(foo)


// function create() {
//   const a = 100
//   return function() {
//     console.log(a)
//   }
// }

// const fn = create()
// const a = 200
// fn() // 100



// function print(fn) {
//   const a = 200
//   fn()
// }

// const a = 100

// function fn() {
//   console.log(a)
// }

// print(fn) // 100

// 闭包隐藏数据，只提供 API
// function createCache() {
//   const data = {} // 闭包中的数据被隐藏，不被外界访问
//   return {
//     set: function(key, val) {
//       data[key] = val
//     },
//     get: function(key) {
//       return data[key]
//     }
//   }
// }

// var fn = null
// const foo = () => {
//    var a = 2
//    function innerFoo() {
//        console.log(c)            
//        console.log(a)
//    }
//    fn = innerFoo
// }

// const bar = () => {
//    var c = 100
//    fn()    
// }

// foo()
// bar()


// 利用闭包实现单例模式
// function Person() {
//   this.name = 'lucas'
// }

// const getSingleInstance = (function(){
//   let singleInstance
//   console.log('singleInstance: ', singleInstance);
//   return function() {
//     if (singleInstance) {
//       return singleInstance
//     }
//     return singleInstance = new Person()
//   }
// })()

// const instance1 = new getSingleInstance()
// const instance2 = new getSingleInstance()


// const offset = ele => {
//   let result = {
//     top: 0,
//     left: 0
//   }

//   const getOffset = (node, init) => {
//     if (node.nodeType !== 1) {
//       return
//     }

//     position = window.getComputedStyle(node)['position']

//     if (typeof(init) === 'undefined' && position === 'static') {
//       getOffset(node.parentNode)
//       return
//     }

//     result.top = node.offsetTop + result.top - node.scrollTop
//     result.left = node.offsetLeft + result.left - node.scrollLeft

//     if (position === 'fixed') {
//         return
//     }

//     getOffset(node.parentNode)
//   }

//   // 当前 DOM 节点的 display === 'none' 时, 直接返回 {top: 0, left: 0}
//   if (window.getComputedStyle(ele)['display'] === 'none') {
//       return result
//   }

//   let position

//   getOffset(ele, true)

//   return result
// }

// const offset = ele => {
//   let result = {
//       top: 0,
//       left: 0
//   }
//   // 当前为 IE11 以下，直接返回 {top: 0, left: 0}
//   if (!ele.getClientRects().length) {
//       return result
//   }

//   // 当前 DOM 节点的 display === 'none' 时，直接返回 {top: 0, left: 0}
//   if (window.getComputedStyle(ele)['display'] === 'none') {
//       return result
//   }

//   result = ele.getBoundingClientRect()
//   var docElement = ele.ownerDocument.documentElement

//   return {
//       top: result.top + window.pageYOffset - docElement.clientTop,
//       left: result.left + window.pageXOffset - docElement.clientLeft
//   }
// }


// let h2 = document.querySelector('h2').ownerDocument
// console.log('h2: ', h2);

// const f1 = () => new Promise((resolve, reject) => {
//   setTimeout(() => {
//       console.log('p1 running')
//       resolve(1)
//   }, 1000)
// })

// const f2 = () => new Promise((resolve, reject) => {
//   setTimeout(() => {
//       console.log('p2 running')
//       resolve(2)
//   }, 1000)
// })

// const array = [f1, f2]

// const runPromiseInSequence = (array, value) => array.reduce(
//   (promiseChain, currentFunction) => promiseChain.then(currentFunction),
//   Promise.resolve(value)
// )

// runPromiseInSequence(array, 'init')

console.log(10 || 0) // 10
console.log(0 || 10) // 10
console.log(10 || 20) // 10


