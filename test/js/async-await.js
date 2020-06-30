function fetchUser() {
  return new Promise((resolve, reject) => {
      fetch('https://api.github.com/users/daixwu')
      .then((data) => {
          resolve(data.json())
      }, (error) => {
          reject(error)
      })
  })
}

// function getUserByPromise() {
//   fetchUser()
//     .then((data) => {
//         console.log(data)
//     }, (error) => {
//         console.log(error)
//     })
// }
// getUserByPromise()

// function* fetchUserByGenerator() {
//   const user = yield fetchUser();
//   return user;
// }

// const g = fetchUserByGenerator();
// const result = g.next().value;
// result.then((v) => {
//   console.log(v);
// }, (error) => {
//   console.log(error);
// })

// async function getUserByAsync(){
//   let user = await fetchUser()
//   return user
// }
// getUserByAsync()
// .then(v => console.log(v))


// async function e(){
//   throw new Error('error');
// }
// e().then(v => console.log(v))
// .catch( e => console.log(e))

// const delay = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout))
// async function f(){
//   await delay(1000)
//   await delay(2000)
//   await delay(3000)
//   return 'done'
// }

// f().then(v => console.log(v)) // 等待6s后才输出 'done'

// let a
// async function f() {
//   await Promise.reject('error').catch(error => console.log(error))
//   a = await 1 // 这段 await 并没有执行
// }

// f().then(v => console.log(a))

// let a
// async function correct() {
//   try {
//     await Promise.reject('error')
//   } catch (error) {
//     throw new Error(error)
//   }
//   a = await 1
//   return a
// }

// correct().then(v => console.log(a)).catch(error => console.log(error)) // 1


// async function async1() {
//   console.log('async1 start')
//   await async2()
//   console.log('async1 end')
// }

// async function async2() {
//   console.log('async2 start')
// }

// console.log('script start')
// async1()
// console.log('script end')



async function async1 () {
  console.log('async1 start') // 2
  await async2() // 这一句会同步执行，返回 Promise ，其中的 `console.log('async2')` 也会同步执行
  console.log('async1 end') // 6 上面有 await ，下面就变成了“异步”，类似 callback 的功能（微任务）
}

async function async2 () {
  console.log('async2') // 3
}

console.log('script start') // 1

setTimeout(function () { // 异步，宏任务
  console.log('setTimeout') // 8
}, 0)

async1()

new Promise (function (resolve) { // 返回 Promise 之后，即同步执行完成，then 是异步代码
  console.log('promise1') // Promise 的函数体会立刻执行 4
  resolve()
}).then (function () { // 异步，微任务
  console.log('promise2') // 7
})

console.log('script end') // 5

// 同步代码执行完毕（event loop - call stack 被清空）
// 执行微任务
// （尝试触发 DOM 渲染）
// 触发 Event Loop 执行宏任务


