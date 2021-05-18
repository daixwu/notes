# async/await

async/await 是在 ES7 版本中引入的，它对于 JavaScript 中的异步编程而言是一个巨大的提升。它可以让我们以同步的方式处理异步的流程，同时不会阻塞主线程。

Promise then catch 链式调用是基于回调函数，async / await 是同步语法，彻底消灭回调函数，但是两者之间并不互斥，反而是相辅相成的。

- 执行 async 函数返回的是 Promise 对象

- await 相当于 Promise 的 then

- try…catch 可捕获异常代替里 Promise 的 catch

- async / await是语法糖，异步的本质还是回调函数

## Async 与其他异步操作的对比

先定义一个 Fetch 方法用于获取 github user 的信息：

```js
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
```

### Promise 方式

```js
function getUserByPromise() {
  fetchUser()
    .then((data) => {
        console.log(data)
    }, (error) => {
        console.log(error)
    })
}
getUserByPromise()
```

Promise 的方式虽然解决了 callback hell，但是这种方式充满了 Promise 的 `then()` 方法，如果处理流程复杂的话，整段代码将充满 then。语义化不明显，代码流程不能很好的表示执行流程。

### Generator 方式

```js
function* fetchUserByGenerator() {
    const user = yield fetchUser()
    return user
}

const g = fetchUserByGenerator()
const result = g.next().value
result.then((v) => {
    console.log(v)
}, (error) => {
    console.log(error)
})
```

Generator 的方式解决了 Promise 的一些问题，流程更加直观、语义化。但是 Generator 的问题在于，函数的执行需要依靠执行器，每次都需要通过 `g.next()` 的方式去执行。

### async 方式

```js
async function getUserByAsync(){
  let user = await fetchUser()
  return user
}
getUserByAsync()
.then(v => console.log(v))
```

async 函数完美的解决了上面两种方式的问题。流程清晰，直观、语义明显。操作异步流程就如同操作同步流程。同时 async 函数自带执行器，执行的时候无需手动加载。

## 语法

- async 函数返回一个 Promise 对象

async 函数内部 return 返回的值。会成为 then 方法回调函数的参数。

```js
async function  f() {
  return 'hello world'
};
f().then( (v) => console.log(v)) // hello world
```

如果 async 函数内部抛出异常，则会导致返回的 Promise 对象状态变为 reject 状态。抛出的错误而会被 catch 方法回调函数接收到。

```js
async function e(){
    throw new Error('error');
}
e().then(v => console.log(v))
.catch( e => console.log(e))
```

- async 函数返回的 Promise 对象，必须等到内部所有的 await 命令的 Promise 对象执行完，才会发生状态改变

也就是说，只有当 async 函数内部的异步操作都执行完，才会执行 then 方法的回调。

```js
const delay = (timeout) => new Promise((resolve) => setTimeout(resolve, timeout))
async function f(){
  await delay(1000)
  await delay(2000)
  await delay(3000)
  return 'done'
}

f().then(v => console.log(v)) // 等待6s后才输出 'done'
```

- 正常情况下，await 命令后面跟着的是 Promise ，如果不是的话，也会被转换成一个 立即 resolve 的 Promise

如下面这个例子：

```js
async function  f() {
  return await 1
};
f().then( (v) => console.log(v)) // 1
```

如果返回的是 reject 的状态，则会被 catch 方法捕获。

- await 后面的代码可以看做是 callback 里的内容，即异步

```js
async function async1() {
  console.log('async1 start')
  await async2()
  // await 后面的代码可以看做是 callback 里的内容，即异步
  console.log('async1 end')
}

async function async2() {
  console.log('async2 start')
}

console.log('script start')
async1()
console.log('script end')
```

控制台输出：

```js
script start
async1 start
async2 start
script end
async1 end
```

## Async 函数的错误处理

async 函数的语法不难，难在错误处理上。先来看下面的例子：

```js
let a
async function f() {
  await Promise.reject('error')
  a = await 1 // 这段 await 并没有执行
}
f().then(v => console.log(a))
```

如上面所示，当 async 函数中只要一个 await 出现 reject 状态，则后面的 await 都不会被执行。

## 解决办法

1、 **使用 try/catch**

```js
let a
async function correct() {
  try {
    await Promise.reject('error')
  } catch (error) {
    console.log(error)
  }
  a = await 1
  return a
}

correct().then(v => console.log(a))

// error
// 1
```

被捕获的错误就是 rejected 的值。在我们捕获这个异常之后，我们有很多方式来处理它：

- 处理掉这个异常，然后返回一个正常的值。（没有在 catch 块中使用任何 return 表达式等价于使用 `return undefined` ；同时，返回的仍是一个 resolved 的值。）

- 抛出这个异常，如果你希望调用者去处理它。你可以直接抛出原始的错误对象，例如 `throw error;` ，这种方式允许你以 promise 链式的方式使用  async 方法（列如，你仍然可以像 `correct().then(...).catch(error => ...)` 这样调用它）；或者，你可以使用 Error 对象包装错误对象，例如， `throw new Error(error)` ，使用这种方式可以在控制台中展示所有的调用栈记录。

- 使用 Reject，例如， `return Promise.reject(error)` ，这个方式等价于 throw error ，因此不推荐使用这种方式。

2、**使用 `.catch`**

回忆一下 await 的功能：它会等待一个 promise 完成它的任务。同时请回忆一下， `promise.catch()` 也会返回一个 promise！因此我们可以像下面这样处理错误处理的方式：

```js
let a
async function f() {
  await Promise.reject('error').catch(error => console.log(error))
  a = await 1
}

f().then(v => console.log(a))

// error
// 1
```
