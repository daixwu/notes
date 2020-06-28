# 前端面试题

- 实现一个 LazyMan，按照以下方式调用时，得到相关输出：

```js
LazyMan("Hank")
// Hi! This is Hank!

LazyMan("Hank").sleep(10).eat("dinner")
// Hi! This is Hank!
// 等待 10 秒..
// Wake up after 10
// Eat dinner~

LazyMan("Hank").eat("dinner").eat("supper")
// Hi This is Hank!
// Eat dinner~
// Eat supper~

LazyMan("Hank").sleepFirst(5).eat("supper")
// 等待 5 秒
// Wake up after 5
// Hi This is Hank!
// Eat supper
```

我们应该如何解这个题目呢，从拿到需求开始进行分析：

- 先从最简单的，我们可以封装一些基础方法，比如 log 输出、封装 setTimeout 等

- 因为 LazyMan 要实现一系列调用，且调用并不是顺序执行的，比如如果 sleepFirst 出现在调用链时，优先执行；同时任务并不是全部都同步执行的，因此我们应该实现一个任务队列，这个队列将调度执行各个任务

- 因此每次调用 LazyMan 或链式执行时，我们应该将相关调用方法加入到（push）任务队列中，储存起来，后续统一被调度

- 在写入任务队列时，如果当前的方法为 sleepFirst，那么需要将该方法放到队列的最头处，这应该是一个 unshift 方法

这么一分析，这道题就「非常简单」了。

我们来试图解剖一下这道题目的考察点：

- 面向对象思想与设计，包括类的使用等

- 对象方法链式调用的理解和设计

- 小部分设计模式的设计

- 因为存在「重复逻辑」，考察代码的解耦和抽象能力

- 逻辑的清晰程度以及其他编程思维

**常规思路解答**:

基于以上思路，我们给出较为常规的答案，其中代码已经加上了必要的注释：

```js
class LazyManGenerator {
 constructor(name) {
   this.taskArray = []

   // 初始化时任务
   const task = () => {
     console.log(`Hi! This is ${name}`)
     // 执行完初始化时任务后，继续执行下一个任务
     this.next()
   }

   // 将初始化任务放入任务队列中
   this.taskArray.push(task)

   setTimeout(() => {
     this.next()
   }, 0)
 }

 next() {
     // 取出下一个任务并执行
   const task = this.taskArray.shift()
   task && task()
 }

 sleep(time) {
   this.sleepTask(time, false)
   // return this 保持链式调用
   return this
 }

 sleepFirst(time) {
   this.sleepTask(time, true)
   return this
 }

 sleepTask(time, prior) {
   const task = () => {
     setTimeout(() => {
       console.log(`Wake up after ${time}`)
       this.next()
     }, time * 1000)
   }

   if (prior) {
     this.taskArray.unshift(task)
   } else {
     this.taskArray.push(task)
   }
 }

 eat(name) {
   const task = () => {
     console.log(`Eat ${name}`)
     this.next()
   }

   this.taskArray.push(task)
   return this
 }
}

function LazyMan(name) {
 return new LazyManGenerator(name)
}
```

简单分析一下：

- LazyMan 方法返回一个 LazyManGenerator 构造函数的实例

- 在 LazyManGenerator constructor 当中，我们维护了 taskArray 用来存储任务，同时将初始化任务放到 taskArray 当中

- 还是在 LazyManGenerator constructor 中，将任务的逐个执行即 next 调用放在 setTimeout 中，这样就能够保证在开始执行任务时，taskArray 数组已经填满了任务

- 我们来看看 next 方法，取出 taskArray 数组中的首项，进行执行

- eat 方法将 eat task 放到 taskArray 数组中，注意 eat task 方法需要调用 `this.next()` 显式调用「下一个任务」；同时返回 this，完成链式调用

- sleep 和 sleepFirst 都调用了 sleepTask，不同在于第二个参数：sleepTask 第二个参数表示是否优先执行，如果 prior 为 true，则使用 unshift 将任务插到 taskArray 开头

这个解法最容易想到，也相对来说容易，主要是面向过程。关键点在于对于 setTimeout 任务队列的准确理解以及 return this 实现链式调用的方式。

事实上，sleepTask 应该作为 LazyManGenerator 类的私有属性出现，因为 ES class 暂时 private 属性没有被广泛实现，这里不再追求实现。

**设计模式解答**:

关于这道题目的解答，网上最流行的是一种发布订阅模式的方案。相关代码出处：[lazyMan](https://github.com/wall-wxk/blogDemo/blob/master/2017/01/22/lazyMan.html)
