# Promise

## Promise的立即执行性

```js
let p = new Promise(function(resolve, reject){
  console.log("create a promise")
  resolve("success")
});

console.log("after new Promise")

p.then(function(value){
  console.log(value)
})
```

控制台输出：

```bash
"create a promise"
"after new Promise"
"success"
```

Promise对象表示未来某个将要发生的事件，但在创建（new）Promise时，**作为Promise参数传入的函数是会被立即执行的，只是其中执行的代码可以是异步代码**。有些同学会认为，当Promise对象调用then方法时，Promise接收的函数才会执行，这是错误的。因此，代码中"create a promise"先于"after new Promise"输出。

## Promise 三种状态

```js
let p1 = new Promise(function(resolve,reject){
  reject(1)
})
let p2 = new Promise(function(resolve,reject){
  setTimeout(function(){
    resolve(2)
  }, 500)
})
let p3 = new Promise(function(resolve,reject){
  setTimeout(function(){
    reject(3)
  }, 500)
})

console.log(p1)
console.log(p2)
console.log(p3)

setTimeout(function(){
  console.log(p2)
}, 1000)
setTimeout(function(){
  console.log(p3)
}, 1000)

p1.then(function(value){
  console.log(value)
})
p2.then(function(value){
  console.log(value)
})
p3.catch(function(err){
  console.log(err)
})
```

控制台输出：

```bash
Promise {[[PromiseStatus]]: "resolved", [[PromiseValue]]: 1}
Promise {[[PromiseStatus]]: "pending", [[PromiseValue]]: undefined}
Promise {[[PromiseStatus]]: "pending", [[PromiseValue]]: undefined}
1
2
3
Promise {[[PromiseStatus]]: "resolved", [[PromiseValue]]: 2}
Promise {[[PromiseStatus]]: "rejected", [[PromiseValue]]: 3}
```

Promise的内部实现是一个状态机。Promise有三种状态：**pending，resolved，rejected**。当Promise刚创建完成时，处于pending状态；当Promise中的函数参数执行了resolve后，Promise 由 pending 状态变成 resolved 状态；如果在 Promise 的函数参数中执行的不是 resolve 方法，而是 reject 方法，那么 Promise 会由 pending 状态变成rejected状态。

p2、p3刚创建完成时，控制台输出的这两台 Promise 都处于 pending 状态，但为什么 p1 是 resolved 状态呢？ 这是因为 p1 的函数参数中执行的是一段同步代码，Promise 刚创建完成， resolve 方法就已经被调用了，因而紧跟着的输出显示 p1 是 resolved 状态。我们通过两个 setTimeout 函数，延迟 1s 后再次输出 p2、p3 的状态，此时 p2、p3 已经执行完成，状态分别变成 resolved 和 rejected。

**状态表现**：

- pending 不会触发任何 then catch 回调

- 状态变为 resolved 会触发后续的 then 回调

- 状态变为 rejected 会触发后续的 catch 回调

- then 正常返回 resolved 有报错则返回 rejected

- catch 正常返回 resolved 有报错则返回 rejected

```js
Promise.resolve().then(() => {
  console.log(1)
}).catch(() => {
  console.log(2)
}).then(() => {
  console.log(3)
})
```

控制台输出：

```bash
1
3
```

```js
Promise.resolve().then(() => { // 返回 rejected 状态的 promise
  console.log(1)
  throw new Error('error1')
}).catch(() => { // 返回 resolved 状态的 promise
  console.log(2)
}).then(() => {
  console.log(3)
})
```

控制台输出：

```bash
1
2
3
```

```js
Promise.resolve().then(() => {  // 返回 rejected 状态的 promise
  console.log(1)
  throw new Error('error1')
}).catch(() => { // 返回 resolved 状态的 promise
  console.log(2)
}).catch(() => {
  console.log(3)
})
```

控制台输出：

```bash
1
2
```

## Promise 状态的不可逆性

```js
let p1 = new Promise(function(resolve, reject){
  resolve("success1")
  resolve("success2")
})

let p2 = new Promise(function(resolve, reject){
  resolve("success")
  reject("reject")
})

p1.then(function(value){
  console.log(value)
})

p2.then(function(value){
  console.log(value)
})
```

控制台输出：

```bash
"success1"
"success"
```

Promise 状态的一旦变成 resolved 或 rejected 时，Promise 的状态和值就固定下来了，不论你后续再怎么调用 resolve 或 reject 方法，都不能改变它的状态和值。因此，p1 中 `resolve("success2")` 并不能将 p1 的值更改为 success2，p2 中 `reject("reject")` 也不能将 p2 的状态由 resolved 改变为 rejected。

## 链式调用

```js
let p = new Promise(function(resolve, reject){
  resolve(1)
})
p.then(function(value){               //第一个then
  console.log(value)
  return value*2
}).then(function(value){              //第二个then
  console.log(value)
}).then(function(value){              //第三个then
  console.log(value)
  return Promise.resolve('resolve')
}).then(function(value){              //第四个then
  console.log(value)
  return Promise.reject('reject')
}).then(function(value){              //第五个then
  console.log('resolve: '+ value)
}, function(err){
  console.log('reject: ' + err)
})
```

控制台输出：

```bash
1
2
undefined
"resolve"
"reject: reject"
```

Promise 对象的 then 方法返回一个新的 Promise 对象，因此可以通过链式调用 then 方法。then 方法接收两个函数作为参数，第一个参数是 Promise 执行成功时的回调，第二个参数是 Promise 执行失败时的回调。两个函数只会有一个被调用，函数的返回值将被用作创建 then 返回的 Promise 对象。这两个参数的返回值可以是以下三种情况中的一种：

- return 一个同步的值 ，或者 undefined（当没有返回一个有效值时，默认返回 undefined），then 方法将返回一个 resolved 状态的 Promise 对象，Promise 对象的值就是这个返回值。

- return 另一个 Promise，then 方法将根据这个 Promise 的状态和值创建一个新的 Promise 对象返回。

- throw 一个同步异常，then 方法将返回一个 rejected 状态的 Promise, 值是该异常。

根据以上分析，代码中第一个 then 会返回一个值为 2（1*2），状态为 resolved 的 Promise 对象，于是第二个 then 输出的值是2。第二个 then 中没有返回值，因此将返回默认的 undefined，于是在第三个 then 中输出 undefined。第三个 then 和第四个 then 中分别返回一个状态是 resolved 的 Promise 和一个状态是 rejected 的 Promise，依次由第四个 then 中成功的回调函数和第五个 then 中失败的回调函数处理。

## `Promise then()` 回调异步性

```js
let p = new Promise(function(resolve, reject){
  resolve("success")
})

p.then(function(value){
  console.log(value)
})

console.log("which one is called first ?")
```

控制台输出：

```js
"which one is called first ?"
"success"
```

Promise 接收的函数参数是同步执行的，但 then 方法中的回调函数执行则是异步的，因此，"success" 会在后面输出。

## Promise 中的异常

```js
let p1 = new Promise( function(resolve,reject){
  foo.bar()
  resolve( 1 )
})

p1.then(
  function(value){
    console.log('p1 then value: ' + value)
  },
  function(err){
    console.log('p1 then err: ' + err)
  }
).then(
  function(value){
    console.log('p1 then then value: '+value)
  },
  function(err){
    console.log('p1 then then err: ' + err)
  }
)

let p2 = new Promise(function(resolve,reject){
  resolve( 2 )
})

p2.then(
  function(value){
    console.log('p2 then value: ' + value)
    foo.bar()
  },
  function(err){
    console.log('p2 then err: ' + err)
  }
).then(
  function(value){
    console.log('p2 then then value: ' + value)
  },
  function(err){
    console.log('p2 then then err: ' + err)
    return 1
  }
).then(
  function(value){
    console.log('p2 then then then value: ' + value)
  },
  function(err){
    console.log('p2 then then then err: ' + err)
  }
)
```

控制台输出：

```bash
p1 then err: ReferenceError: foo is not defined
p2 then value: 2
p1 then then value: undefined
p2 then then err: ReferenceError: foo is not defined
p2 then then then value: 1
```

Promise 中的异常由 then 参数中第二个回调函数（Promise执行失败的回调）处理，异常信息将作为 Promise 的值。异常一旦得到处理，then 返回的后续 Promise 对象将恢复正常，并会被 Promise 执行成功的回调函数处理。另外，需要注意 p1、p2 多级 then 的回调函数是交替执行的 ，这正是由 Promise then 回调的异步性决定的。

## `Promise.resolve()`

```js
let p1 = Promise.resolve( 1 )
let p2 = Promise.resolve( p1 )
let p3 = new Promise(function(resolve, reject){
  resolve(1)
})
let p4 = new Promise(function(resolve, reject){
  resolve(p1)
})

console.log(p1 === p2)
console.log(p1 === p3)
console.log(p1 === p4)
console.log(p3 === p4)

p4.then(function(value){
  console.log('p4=' + value)
});

p2.then(function(value){
  console.log('p2=' + value)
})

p1.then(function(value){
  console.log('p1=' + value)
})
```

控制台输出：

```js
true
false
false
false
p2=1
p1=1
p4=1
```

`Promise.resolve(...)` 可以接收一个值或者是一个 Promise 对象作为参数。当参数是普通值时，它返回一个 resolved 状态的 Promise 对象，对象的值就是这个参数；当参数是一个 Promise 对象时，它直接返回这个 Promise 参数。因此，`p1 === p2`。但通过 new 的方式创建的 Promise 对象都是一个新的对象，因此后面的三个比较结果都是 false。另外，为什么 p4 的 then 最先调用，但在控制台上是最后输出结果的呢？因为 p4 的 resolve 中接收的参数是一个 Promise 对象 p1，resolve 会对 p1 “拆箱”，获取 p1 的状态和值，但这个过程是异步的。

## resolve vs reject

```js
let p1 = new Promise(function(resolve, reject){
  resolve(Promise.resolve('resolve'))
})

let p2 = new Promise(function(resolve, reject){
  resolve(Promise.reject('reject'))
})

let p3 = new Promise(function(resolve, reject){
  reject(Promise.resolve('resolve'))
})

p1.then(
  function fulfilled(value){
    console.log('1fulfilled: ' + value)
  },
  function rejected(err){
    console.log('1rejected: ' + err)
  }
)

p2.then(
  function fulfilled(value){
    console.log('2fulfilled: ' + value)
  },
  function rejected(err){
    console.log('2rejected: ' + err)
  }
)

p3.then(
  function fulfilled(value){
    console.log('3fulfilled: ' + value)
  },
  function rejected(err){
    console.log('3rejected: ' + err)
  }
)
```

控制台输出：

```bash
p3 rejected: [object Promise]
p1 fulfilled: resolve
p2 rejected: reject
```

Promise 回调函数中的第一个参数 resolve，会对 Promise 执行"拆箱"动作。即**当 resolve 的参数是一个 Promise 对象时， resolve 会"拆箱"获取这个 Promise 对象的状态和值，但这个过程是异步的**。p1 "拆箱"后，获取到 Promise 对象的状态是 resolved ，因此 fulfilled 回调被执行；p2 "拆箱"后，获取到 Promise 对象的状态是 rejected，因此 rejected 回调被执行。但 Promise 回调函数中的第二个参数 reject 不具备”拆箱“的能力，**reject 的参数会直接传递给 then 方法中的 rejected 回调**。因此，即使 p3 reject 接收了一个 resolved 状态的 Promise，then 方法中被调用的依然是 rejected，并且参数就是 reject 接收到的 Promise 对象。

## `Promise.all()`

`Promise.all()` 方法用于将多个 Promise 实例，包装成一个新的 Promise 实例。

`Promise.all()` 方法接受一个数组作为参数，p1、p2、p3 都是 Promise 实例，如果不是，就会先调用 `Promise.resolve` 方法，将参数转为 Promise 实例，再进一步处理。另外， `Promise.all()` 方法的参数可以不是数组，但必须具有 Iterator 接口，且返回的每个成员都是 Promise 实例。

p 的状态由 p1、p2、p3 决定，分成两种情况。

- 只有 p1、p2、p3 的状态都变成 fulfilled ，p的状态才会变成 fulfilled ，此时p1、p2、p3的返回值组成一个数组，传递给 p 的回调函数。

```js
let p1 = Promise.resolve(3)
let p2 = 1337
let p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 100, 'foo')
})

Promise.all([p1, p2, p3]).then(values => {
  console.log(values)
})
```

控制台输出：

```bash
[3, 1337, "foo"]
```

- 只要 p1、p2、p3 之中有一个被 rejected ，p的状态就变成 rejected ，此时第一个被 reject 的实例的返回值，会传递给 p 的回调函数。

```js
let p1 = new Promise((resolve, reject) => { 
  setTimeout(resolve, 1000, 'one')
})
let p2 = new Promise((resolve, reject) => { 
  setTimeout(resolve, 2000, 'two')
})
let p3 = new Promise((resolve, reject) => {
  setTimeout(resolve, 3000, 'three')
})
let p4 = new Promise((resolve, reject) => {
  setTimeout(resolve, 4000, 'four')
})
let p5 = new Promise((resolve, reject) => {
  reject('reject')
})

Promise.all([p1, p2, p3, p4, p5]).then(values => { 
  console.log(values)
}, reason => {
  console.log(reason)
})
```

控制台输出：

```bash
"reject"
```

`Promise.all` 当且仅当传入的可迭代对象为空时为同步。

```js
let p = Promise.all([])

let p2 = Promise.all([1337, "hi"])
console.log('p: ', p)
console.log('p2: ', p2)
setTimeout(function(){
  console.log('the stack is now empty')
  console.log('setTimeout p2:', p2)
})
```

控制台输出：

```bash
p:  Promise {<resolved>: Array(0)}
p2:  Promise {<pending>}
the stack is now empty
setTimeout p2: Promise {<resolved>: Array(2)}
```

**代码实现**：

```js
Promise.all2 = function(promises) {
  return new Promise(function(resolve, reject) {
    let results = []
    let resolvedCounter = 0
    let promiseNum = promises.length
    for (let i = 0; i < promiseNum; i++) {
      Promise.resolve(promises[i]).then(function(res) {
        resolvedCounter++
        results[i] = res

        // 当所有函数都正确执行了，resolve输出所有返回结果。
        if (resolvedCounter === promiseNum) {
          return resolve(results)
        }
      }, function(reason) {
        return reject(reason);
      })
    }
  })
}
```

## `Promise.race()`

同all一样接受一个数组，该数组里面都是promise对象。

区别在于，结果是返回最先返回的promise数据，这里的数据是最先返回的单个数据。有点像是比赛，谁先到就用谁。

```js
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

// Promise.race
console.time('cost')
Promise.race([p1, p2]).then(data => {
  console.log(data);
  console.timeEnd('cost')
})
```

输出结果是

```bash
p1
promise.js:323 cost: 1001.39404296875ms
```

当有调用的接口不稳定的时候，我们可以取多个，先获取到哪个就使用哪个。

还能拿来给 promise 做个定时器,如果在规定时间没到，我们就执行一个 reject

```js
let p2 = new Promise((resolve, reject) => {
  setTimeout(() => {
    resolve('p2')
  }, 2000)
})

function tiemout(delay) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      reject('tiemout')
    }, delay)
  })
}

Promise.race([p2, tiemout(500)]).then(res => {
  console.log(res)
}).catch(err => {
  console.log(err)
})
```

如果过了500ms时p2还没有获得数据回来，那么 timeout 就会执行 reject，报 timeout

**代码实现**：

```js
Promise.race2 = function(promises) {
  return new Promise(function(resolve, reject) {
    for (let i = 0; i < promises.length; i++) {
      Promise.resolve(promises[i]).then(function(value) {
        return resolve(value)
      }, function(reason) {
        return reject(reason)
      })
    }
  })
}
```

这么简单得益于 promise 的状态只能改变一次，即 resolve 和 reject 都只被能执行一次，我们把返回的 promise 里的 resolve 和 reject 方法放在了 promiseAry 每一个 promise 的成功或者失败回调里面，当其中任意一个成功或失败后就会调用我们传进去的 resolve 和 reject，一旦调用了，就不会再次调用。

 [Promise 方法实现](https://github.com/xieranmaya/Promise3/blob/master/Promise3.js)

