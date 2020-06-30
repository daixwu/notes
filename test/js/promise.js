// let p = new Promise(function(resolve, reject){
//   console.log("create a promise")
//   resolve("success")
// });

// console.log("after new Promise")

// p.then(function(value){
//   console.log(value)
// })


// let p1 = new Promise(function(resolve,reject){
//   reject(1)
// })
// let p2 = new Promise(function(resolve,reject){
//   setTimeout(function(){
//     resolve(2)
//   }, 500);      
// })
// let p3 = new Promise(function(resolve,reject){
//   setTimeout(function(){
//     reject(3)
//   }, 500)   
// })

// console.log(p1)
// console.log(p2)
// console.log(p3)

// setTimeout(function(){
//   console.log(p2)
// }, 1000)
// setTimeout(function(){
//   console.log(p3)
// }, 1000)

// p1.then(function(value){
//   console.log(value)
// }).catch(function(err) {
//   console.log('err: ', err);

// })
// p2.then(function(value){
//   console.log(value)
// })
// p3.catch(function(err){
//   console.log(err)
// })

// let p1 = new Promise(function(resolve, reject){
//   resolve("success1")
//   resolve("success2")
// })

// let p2 = new Promise(function(resolve, reject){
//   resolve("success")
//   reject("reject")
// })

// p1.then(function(value){
//   console.log(value)
// })

// p2.then(function(value){
//   console.log(value)
// })


// let p = new Promise(function(resolve, reject){
//   resolve(1);
// });
// p.then(function(value){               //第一个then
//   console.log(value);
//   return value*2;
// }).then(function(value){              //第二个then
//   console.log(value);
// }).then(function(value){              //第三个then
//   console.log(value);
//   return Promise.resolve('resolve'); 
// }).then(function(value){              //第四个then
//   console.log(value);
//   return Promise.reject('reject');
// }).then(function(value){              //第五个then
//   console.log('resolve: '+ value);
// }, function(err){
//   console.log('reject: ' + err);
// })


// let p1 = new Promise( function(resolve,reject){
//   foo.bar()
//   resolve( 1 )
// })

// p1.then(
//   function(value){
//     console.log('p1 then value: ' + value)
//   },
//   function(err){
//     console.log('p1 then err: ' + err)
//   }
// ).then(
//   function(value){
//     console.log('p1 then then value: '+value)
//   },
//   function(err){
//     console.log('p1 then then err: ' + err)
//   }
// )

// let p2 = new Promise(function(resolve,reject){
//   resolve( 2 )
// })

// p2.then(
//   function(value){
//     console.log('p2 then value: ' + value)
//     foo.bar()
//   },
//   function(err){
//     console.log('p2 then err: ' + err)
//   }
// ).then(
//   function(value){
//     console.log('p2 then then value: ' + value)
//   },
//   function(err){
//     console.log('p2 then then err: ' + err)
//     return 1
//   }
// ).then(
//   function(value){
//     console.log('p2 then then then value: ' + value)
//   },
//   function(err){
//     console.log('p2 then then then err: ' + err)
//   }
// )

// let p1 = Promise.resolve( 1 )
// let p2 = Promise.resolve( p1 )
// let p3 = new Promise(function(resolve, reject){
//   resolve(1)
// })
// let p4 = new Promise(function(resolve, reject){
//   resolve(p1)
// })

// console.log(p1 === p2)
// console.log(p1 === p3)
// console.log(p1 === p4)
// console.log(p3 === p4)

// p4.then(function(value){
//   console.log('p4=' + value)
// });

// p2.then(function(value){
//   console.log('p2=' + value)
// })

// p1.then(function(value){
//   console.log('p1=' + value)
// })

// let p1 = new Promise(function(resolve, reject){
//   resolve(Promise.resolve('resolve'))
// })

// let p2 = new Promise(function(resolve, reject){
//   resolve(Promise.reject('reject'))
// })

// let p3 = new Promise(function(resolve, reject){
//   reject(Promise.resolve('resolve'))
// })

// p1.then(
//   function fulfilled(value){
//     console.log('1fulfilled: ' + value)
//   }, 
//   function rejected(err){
//     console.log('1rejected: ' + err)
//   }
// )

// p2.then(
//   function fulfilled(value){
//     console.log('2fulfilled: ' + value)
//   }, 
//   function rejected(err){
//     console.log('2rejected: ' + err)
//   }
// )

// p3.then(
//   function fulfilled(value){
//     console.log('3fulfilled: ' + value)
//   }, 
//   function rejected(err){
//     console.log('3rejected: ' + err)
//   }
// )


// let p1 = Promise.resolve(3)
// let p2 = 1337
// let p3 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 100, 'foo')
// })

// Promise.all([p1, p2, p3]).then(values => { 
//   console.log(values) // [3, 1337, "foo"] 
// })

// let p = Promise.all([])

// let p2 = Promise.all([1337, "hi"])
// console.log('p: ', p)
// console.log('p2: ', p2)
// setTimeout(function(){
//   console.log('the stack is now empty')
//   console.log('setTimeout p2:', p2)
// })


// var resolvedPromisesArray = [Promise.resolve(33), Promise.resolve(44)];

// var p = Promise.all(resolvedPromisesArray);
// // immediately logging the value of p
// console.log(p);

// // using setTimeout we can execute code after the stack is empty
// setTimeout(function(){
//     console.log('the stack is now empty');
//     console.log(p);
// });

// let p1 = new Promise((resolve, reject) => { 
//   setTimeout(resolve, 1000, 'one')
// })
// let p2 = new Promise((resolve, reject) => { 
//   setTimeout(resolve, 2000, 'two')
// })
// let p3 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 3000, 'three')
// })
// let p4 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 4000, 'four')
// })
// let p5 = new Promise((resolve, reject) => {
//   reject('reject')
// })

// Promise.all([p1, p2, p3, p4, p5]).then(values => { 
//   console.log(values)
// }, reason => {
//   console.log(reason)
// })

// let p = Promise.all([])

// let p2 = Promise.all("hi")
// console.log('p: ', p)
// console.log('p2: ', p2)
// setTimeout(function(){
//   console.log('the stack is now empty')
//   console.log('setTimeout p2:', p2)
// })

// let p1 = Promise.resolve(3)
// let p2 = 1337
// let p3 = new Promise((resolve, reject) => {
//   setTimeout(resolve, 100, 'foo')
// })

// Promise.all2 = function(promises) {
//   return new Promise(function(resolve, reject) {
//     let results = []
//     let resolvedCounter = 0
//     let promiseNum = promises.length
//     for (let i = 0; i < promiseNum; i++) {
//       Promise.resolve(promises[i]).then(function(res) {
//         resolvedCounter++
//         results[i] = res

//         // 当所有函数都正确执行了，resolve输出所有返回结果。
//         if (resolvedCounter === promiseNum) {
//           return resolve(results)
//         }
//       }, function(reason) {
//         return reject(reason);
//       })
//     }
//   })
// }

// let p = Promise.all2([p1, p2, p3]).then((res) => {
//   console.log(res)
// })
// .catch((error) => {
//   console.log(error)
// })
// console.log('p: ', p)

let p1 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p1')
  }, 1000);
})

let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p2')
  }, 2000);
})

// // Promise.race
// console.time('cost')
// Promise.race([p1, p2]).then(data => {
// 	console.log(data);
// 	console.timeEnd('cost')
// })

// let p2 = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     resolve('p2')
//   }, 2000)
// })

// function tiemout(delay) {
//   return new Promise((resolve, reject) => {
//     setTimeout(() => {
//       reject('tiemout')
//     }, delay)
//   })
// }

// Promise.race([p2, tiemout(500)]).then(res => {
//   console.log(res)
// }).catch(err => {
//   console.log(err)
// })

// Promise.race2 = function(promises) {
//   return new Promise(function(resolve, reject) {
//     for (let i = 0; i < promises.length; i++) {
//       Promise.resolve(promises[i]).then(function(value) {
//         return resolve(value)
//       }, function(reason) {
//         return reject(reason)
//       })
//     }
//   })
// }

// Promise.race2([p1, p2]).then( res => {
//   console.log('res: ', res)
// }).catch(err => {
//   console.log('err: ', err)
// })


Promise.resolve().then(() => {
  console.log(1)
  throw new Error('error1')
}).catch(() => {
  console.log(2)
}).catch(() => {
  console.log(3)
})