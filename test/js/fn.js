// 函数缓存
// const memorize = function(fn) {
//   const cache = {}       // 存储缓存数据的对象
//   console.log('cache: ', cache);
//   return function(...args) {        // 这里用到数组的扩展运算符
//     const _args = args.join('_')    // 将参数作为cache的key
//     console.log('_args: ', _args);
//     return cache[_args] || (cache[_args] = fn.apply(fn, args))  // 如果已经缓存过，直接取值。否则重新计算并且缓存
//   }
// }

// const add = function(a, b) {
//   console.log('开始缓存') 
//   return a + b
// }

// const adder = memorize(add)

// console.log(adder(2, 6)) 

// console.log(adder(2, 6)) 

// console.log([2, 6] === [6, 2])

// curry 化面试题

// const add = arg1 => {

//   let args = [arg1]
//   const fn = arg2 => {
//     args.push(arg2)
//     return fn
//   }
//   fn.toString = function() {
//     return args.reduce((prev, item) => prev + item, 0)
//   }
//   return fn
// }

// const add = (...arg1) => {
//   let args = [...arg1]
//   const fn = (...arg2) => {
//     args = [...args, ...arg2]
//     console.log('args: ', args);
//     return fn
//   }
//   fn.toString = function () {
    
//     return args.reduce((prev, item) => prev + item, 0)
//   }
//   return fn
// }

// console.log('add(): ', add(1)(2, 3)(3, 4, 5))

const curry = (fn, length) => {
  length = length || fn.length
  return function (...args) {
    if (args.length < length) {
      return curry(fn.bind(this, ...args), length - args.length)
    }
    else {
      return fn.call(this, ...args)
    }
  }
}

function add (x, y, z) {
  return x + y +z; 
}

var fn = curry(add)


console.log('fn(1, 2, 3): ', fn(1, 2, 3))

console.log('fn(1, 2)(3): ', fn(1, 2)(3))