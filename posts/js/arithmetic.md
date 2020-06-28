# 前端算法

## JavaScript 数组乱顺

```js
[12,4,16,3].sort(function() {
   return .5 - Math.random();
})
```

这样的思路非常自然，但也许你不知道：这不是真正意义上的完全乱序。

理想的方案 —— Fisher–Yates shuffle 洗牌算法

```js
Array.prototype.shuffle = function() {
  let array = this;
  let m = array.length,
      t, i;
  while (m) {
    i = Math.floor(Math.random() * m--);
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}
```

## 算法的基本概念

### 时间复杂度

> 一个算法的时间复杂度反映了程序运行从开始到结束所需要的时间。把算法中基本操作重复执行的次数（频度）作为算法的时间复杂度。

但是时间复杂度的计算既可以「有理可依」，又可以靠「主观感觉」。通常我们认为：

- 没有循环语句，时间复杂度记作 O(1)，我们称为常数阶；

- 只有一重循环，那么算法的基本操作的执行频度与问题规模 n 呈线性增大关系，记作 O（n），也叫线性阶。

那么如何让时间复杂度的计算「有理可依」呢？来看几个原则：

- 只看循环次数最多的代码

- 加法法则：总复杂度等于量级最大的那段代码的复杂度

- 乘法法则：嵌套代码的复杂度等于嵌套内外复杂度的乘积

常见时间复杂度：

- `O(1)`：基本运算 +、-、*、/、%、寻址

- `O(logn)`：二分查找，跟分治（Divide & Conquer）相关的基本上都是 logn

- `O(n)`：线性查找

- `O(nlogn)`：归并排序，快速排序的期望复杂度，基于比较排序的算法下界

- `O(n²)`：冒泡排序，插入排序，朴素最近点对

- `O(n³)`：Floyd 最短路，普通矩阵乘法

- `O(2ⁿ)`：枚举全部子集

- `O(n!)`：枚举全排列

- `O(logn)` 近似于是常数的时间复杂度，当 n 为 `$2^{32}$` 的规模时 logn 也只是 32 而已； 对于顺序执行的语句或者算法，总的时间复杂度等于其中最大的时间复杂度。例如，`O(n²) + O(n)` 可直接记做 `O(n²)`

### 空间复杂度

空间复杂度表示算法的存储空间与数据规模之间的增长关系。常见的空间复杂度：`O(1)`、`O(n)`、`O(n²)`，像 `O(logn)`、`O(nlogn)` 这样的对数阶复杂度平时都用不到。有的题目在空间上要求 in-place（原地），是指使用 `O(1)` 空间，在输入的空间上进行原地操作，比如字符串反转。但 in-place 又不完全等同于常数的空间复杂度，比如数组的快排认为是 in-place 交换，但其递归产生的堆栈的空间是可以不考虑的，因此 in-place 相对 `O(1)` 空间的要求会更宽松一点。

对于时间复杂度和空间复杂度，开发者应该有所取舍。在设计算法时，可以考虑「牺牲空间复杂度，换取时间复杂度的优化」，反之依然。

## 快速排序

**快速排序的特点就是分治**。如何体现分治策略呢？我们首先在数组中选取一个基准点，叫做 pivot，根据这个基准点：把比基准点小的数组值放在基准点左边，把比基准点大的数组值放在基准点右边。这样一来，基于基准点，左边分区的值都小于基准点，右边分区的值都大于基准点，然后针对左边分区和右边分区进行同样的操作，直到最后排序完成。

最简单的实现：

```js
const quickSort = array => {
 if (array.length < 2) {
   return array.slice()
 }

 // 随机找到 pivot
 let pivot = array[Math.floor(Math.random() * array.length)]

 let left = []
 let middle = []
 let right = []

 for (let i = 0; i < array.length; i++) {
   var value = array[i]
   if (value < pivot) {
     left.push(value)
   }

   if (value === pivot) {
     middle.push(value)
   }

   if (value > pivot) {
     right.push(value)
   }
 }

 // 递归进行
 return quickSort(left).concat(middle, quickSort(right))
}
```

## 插入排序

插入排序我们还是从特点入手：它先将待排序序列的第一个元素看做一个有序序列，当然了，就一个元素，那么它一定是有序的；而把第二个元素到最后一个元素当成是未排序序列；对于未排序的序列进行遍历，将扫描到的每个元素插入有序序列的适当位置，保证有序序列依然有序，那么直到所有数据都完成，我们也就完成了排序。

如果待插入的元素与有序序列中的某个元素相等，那么我们统一先将待插入元素插入到相等元素的后面。

响应的实现：

```js
const insertsSort = array => {
  const length = arr.length
  let preIndex
  let current

  for (let i = 1; i < length; i++) {
    preIndex = i - 1
    current = array[i]

    while (preIndex >= 0 && array[preIndex] > current) {
        array[preIndex + 1] = array[preIndex]
        preIndex--
    }

    array[preIndex + 1] = current
  }
  return array
}
```

## 算法题

### 爬楼梯

题目：假设我们需要爬一个楼梯，这个楼梯一共有 N 阶，可以一步跨越 1 个或者 2 个台阶，那么爬完楼梯一共有多少种方式？

思路：最直接的想法其实类似 Fibonacci 数列，使用递归比较简单。比如我们爬 N 个台阶，其实就是爬 N － 1 个台阶的方法数 + 爬 N － 2 个台阶的方法数。

解法：

```js
const climbing = n => {
 if (n == 1) return 1
 if (n == 2) return 2
 return climbing(n - 1) + climbing(n - 2)
}
```

### Combination Sum

这个算法，让我们来聚焦「回溯」这两个字，题目出处 Combination Sum。

题目：给定一组不含重复数字的非负数组和一个非负目标数字，在数组中找出所有数加起来等于给定的目标数字的组合。

最终答案：

```js
const find = (array, target) => {
  let result = []

  const dfs = (index, sum, tmpArray)  => {
    if (sum === target) {
      result.push(tmpArray.slice())
    }

    if (sum > target) {
      return
    }

    for (let i = index; i < array.length; i++) {
      tmpArray.push(array[i])
      dfs(i, sum + array[i], tmpArray)
      tmpArray.pop()
    }
  }

  dfs(0, 0, [])

  return result
}
```

### remove duplicates from sorted array

题目：对一个给定一个排序数组去重，同时返回去重后数组的新长度。

```js
const removeDuplicates = array => {
  const length = array.length

  let slowPointer = 0

  for (let fastPointer = 0; fastPointer < length; fastPointer++) {
    if (array[slowPointer] !== array[fastPointer]) {
      slowPointer++
      array[slowPointer] = array[fastPointer]
    }
  }
  return slowPointer+1
}
```

### 求众数

题目：给定一个大小为 N 的数组，找到其中的众数。众数是指在数组中出现次数大于 N/2 的元素。

```js
const find = array => {
  let count = 1
  let result = array[0]

  for (let i = 0; i < array.length; i++) {
    if (count === 0) result = array[i]

    if (array[i] === result) {
      count++
    }
    else {
      count--
    }
  }

  return result
}
```

### 有效括号

举例：输入 "()"

输出：true

举例：输入 "()[]{}"

输出：true

举例：输入 "{[]}"

输出：false

举例：输入 "([)]"

输出：false

这道题目的解法非常典型，就是借助栈实现，将这些括号自右向左看做栈结构。我们把成对的括号分为左括号和右括号，需要左括号和右括号一一匹配，通过一个 Object 来维护关系：

```js
let obj = {
  "]": "[",
  "}": "{",
  ")": "(",
}
```

如果编译器中在解析时，遇见左括号，我们就入栈；如果是右括号，就取出栈顶元素检查是否匹配。如果匹配，就出栈；否则，就返回 false。

```js
const isValid = str => {
  let stack = []
  var obj = {
    "]": "[",
    "}": "{",
    ")": "(",
  }

  for (let i = 0; i < str.length; i++) {
    if(str[i] === "[" || str[i] === "{" || str[i] === "(") {
      stack.push(str[i])
    }
    else {
      let key = stack.pop()
      if(obj[key] !== str[i]) {
        return false
      }
    }
  }

  if (!stack.length) {
    return true
  }

  return false
}
```

### LRU 缓存算法

LRU（Least Recently Used）算法是缓存淘汰算法的一种。简单地说，由于内存空间有限，需要根据某种策略淘汰不那么重要的数据，用以释放内存。LRU 的策略是最早操作过的数据放最后，最晚操作过的放开始，按操作时间逆序，如果达到上限，则淘汰末尾的项。

整个 LRU 算法有一定的复杂度，并且需要很多功能扩展。因此在生产环境中建议直接使用成熟的库，比如 npm 搜索 lru-cache。

这里我们尝试实现一个微型体统级别的 LRU 算法：

运用你所掌握的数据结构，设计和实现一个 LRU（最近最少使用）缓存机制。它应该支持以下操作：获取数据 get 和 写入数据 put 。

最终实现：

```js
const LRUCache = function(capacity) {
 this.map = {}
 this.size = 0
 this.maxSize = capacity

 // 链表初始化，初始化只有一个头和尾
 this.head = {
   prev: null,
   next: null
 }
 this.tail = {
   prev: this.head,
   next: null
 }

 this.head.next = this.tail
};

LRUCache.prototype.get = function(key) {
 if (this.map[key]) {
   const node = this.extractNode(this.map[key])

   // 最新访问，将该节点放到链表的头部
   this.insertNodeToHead(node)

   return this.map[key].val
 }
 else {
   return -1
 }
}

LRUCache.prototype.put = function(key, value) {
 let node

 if (this.map[key]) {
   // 该项已经存在，更新值
   node = this.extractNode(this.map[key])
   node.val = value
 }
 else {
   // 如该项不存在，新创造节点
   node = {
     prev: null,
     next: null,
     val: value,
     key,
   }

   this.map[key] = node
   this.size++
 }

 // 最新写入，将该节点放到链表的头部
 this.insertNodeToHead(node)

 // 判断长度是否已经到达上限
 if (this.size > this.maxSize) {
   const nodeToDelete = this.tail.prev
   const keyToDelete = nodeToDelete.key
   this.extractNode(nodeToDelete)
   this.size--
   delete this.map[keyToDelete]
 }
};

// 插入节点到链表首项
LRUCache.prototype.insertNodeToHead = function(node) {
 const head = this.head
 const lastFirstNode = this.head.next

 node.prev = head
 head.next = node
 node.next = lastFirstNode
 lastFirstNode.prev = node

 return node
}

// 从链表中抽取节点
LRUCache.prototype.extractNode = function(node) {
 const beforeNode = node.prev
 const afterNode = node.next

 beforeNode.next = afterNode
 afterNode.prev = beforeNode

 node.prev = null
 node.next = null

 return node
}
```

## 算法学习

对于算法的学习，需要做到「分门别类」，按照不同类别的算法思想，遵循循序渐进的进步路线，才会「越来越有感觉」。在此把算法的一些基础思想进行了归并：

- 枚举

- 模拟

- 递归/分治

- 贪心

- 排序

- 二分

- 倍增

- 构造

- 前缀和/差分

我们来简单总结一下这些算法基础思想。

### 枚举

枚举是基于已有知识来猜测，印证答案的一种问题求解策略。当拿到一道题目时，枚举这种「暴力解法」最容易想到。这其中重点是：

- 建立简洁的数学模型

- 想清楚枚举哪些要素

- 尝试减少枚举空间

举个例子：

一个数组中的数互不相同，求其中和为 0 的数对的个数

最笨的方法：

```js
for (int i = 0; i < n; ++i)
 for (int j = 0; j < n; ++j)
   if (a[i] + a[j] == 0) ++ans;
```

我们来看看如何操作进行优化。如果 (a, b) 是答案，那么 (b, a) 也是答案，因此对于这种情况只需统计一种顺序之后的答案，最后再乘 2 就好了。

```js
for (int i = 0; i < n; ++i)
 for (int j = 0; j < i; ++j)
   if (a[i] + a[j] == 0) ++ans;
```

如此一来，就减少了 j 的枚举范围，减少了这段代码的时间开销。然而这还不是最优解。

我们思考：两个数是否都一定要枚举出来呢？其实枚举第一个数之后，题目的条件已经帮我们确定了其他的要素（另一个数），如果能找到一种方法直接判断题目要求的那个数是否存在，就可以省掉枚举后一个数的时间了。代码实现很简单，我们就不动手实现了。

### 模拟

模拟。顾名思义，就是用计算机来模拟题目中要求的操作，我们只需要按照题面的意思来写就可以了。模拟题目通常具有码量大、操作多、思路繁复的特点。

这种题目往往考察开发者的「逻辑转化为代码」的能力。一道典型题目是：魔兽世界。

### 递归 & 分治

递归的基本思想是某个函数直接或者间接地调用自身，这样就把原问题的求解转换为许多性质相同但是规模更小的子问题。

递归和枚举的区别在于：枚举是横向地把问题划分，然后依次求解子问题，而递归是把问题逐级分解，是纵向的拆分。比如请尝试回答这几个问题：

孙悟空身上有多少根毛？答：一根毛加剩下的毛。 你今年几岁？答：去年的岁数加一岁，1999 年我出生。

递归代码最重要的两个特征：结束条件和自我调用。

```js
int func(传入数值) {
 if (终止条件) return 最小子问题解;
 return func(缩小规模);
}
```

写递归的技巧，「明白一个函数的作用并相信它能完成这个任务，千万不要试图跳进细节」。 千万不要跳进这个函数里面企图探究更多细节，否则就会陷入无穷的细节无法自拔，人脑能压几个栈啊。

先举个最简单的例子：遍历二叉树。

```js
void traverse(TreeNode* root) {
 if (root == nullptr) return;
 traverse(root->left);
 traverse(root->right);
}
```

这几行代码就足以遍历任何一棵二叉树了。对于递归函数 `traverse(root)` ，我们只要相信：给它一个根节点 root，它就能遍历这棵树，因为写这个函数不就是为了这个目的吗？

那么遍历一棵 N 叉数呢？

```js
void traverse(TreeNode* root) {
 if (root == nullptr) return;
 for (child : root->children) traverse(child);
}
```

总之，还是那句话：给它一个根节点 root，它就能遍历这棵树，不管你是几个叉。

典型题目：

给一棵二叉树，和一个目标值，节点上的值有正有负，返回树中和等于目标值的路径条数

这道题目解法很多，也比较典型。这里我们只谈思想，具体实现就不展开。

分治算法可以分三步走：分解 -> 解决 -> 合并。

- 分解原问题为结构相同的子问题

- 分解到某个容易求解的边界之后，进行递归求解

- 将子问题的解合并成原问题的解

归并排序是最典型的分治算法。

```js
void mergeSort(一个数组) {
 if (可以很容易处理) return
 mergeSort(左半个数组)
 mergeSort(右半个数组)
 merge(左半个数组, 右半个数组)
}
```

分治算法的套路就是前面说的三步走：分解 -> 解决 -> 合并：先左右分解，再处理合并，回溯就是在退栈，就相当于后序遍历了。至于 merge 函数，相当于两个有序链表的合并。

LeetCode 有[递归专题练习](https://leetcode-cn.com/explore/learn/card/recursion-i/?utm_source=LCUS&utm_medium=banner_redirect&utm_campaign=transfer2china) LeetCode 上有[分治算法的专项练习](https://leetcode-cn.com/tag/divide-and-conquer/?utm_source=LCUS&utm_medium=ip_redirect_o_uns&utm_campaign=transfer2china)

### 贪心

贪心算法顾名思义就是只看眼前，并不考虑以后可能造成的影响。可想而知，并不是所有的时候贪心法都能获得最优解。

最常见的贪心有两种。一种是：「将 XXX 按照某某顺序排序，然后按某种顺序（例如从小到大）处理」。另一种是：「我们每次都取 XXX 中最大/小的东西，并更新 XXX」，有时「XXX 中最大/小的东西」可以优化，比如用优先队列维护。这两种方式分别对应了离线的情况以及在线的情况。

相关题目：

- [工作调度 Work Scheduling](https://www.luogu.com.cn/problem/P2949)

- [修理牛棚 Barn Repair](https://www.luogu.com.cn/problem/P1209)

- [皇后游戏](https://www.luogu.com.cn/problem/P2123)

### 二分

以二分搜索为例，它是用来在一个有序数组中查找某一元素的算法。它每次考察数组当前部分的中间元素，如果中间元素刚好是要找的，就结束搜索过程；如果中间元素小于所查找的值，那么左侧的只会更小，不会有所查找的元素，只需要到右侧去找就好了；如果中间元素大于所查找的值，同理，右侧的只会更大而不会有所查找的元素，所以只需要到左侧去找。

在二分搜索过程中，每次都把查询的区间减半，因此对于一个长度为 n 的数组，至多会进行 `log(n)` 次查找。

一定需要注意的是，这里的有序是广义的有序，如果一个数组中的左侧或者右侧都满足某一种条件，而另一侧都不满足这种条件，也可以看作是一种有序。

二分法把一个寻找极值的问题转化成一个判定的问题（用二分搜索来找这个极值）。类比枚举法，我们当时是枚举答案的可能情况，现在由于单调性，我们不再需要一个个枚举，利用二分的思路，就可以用更优的方法解决「最大值最小」、「最小值最大」。这种解法也成为是「二分答案」，常见于解题报告中。

比如：砍树问题，我们可以在 1 到 1000000000（10 亿）中枚举答案，但是这种朴素写法肯定拿不到满分，因为从 1 跑到 10 亿太耗时间。我们可以对答案进行 1 到 10 亿的二分，其中，每次都对其进行检查可行性（一般都是使用贪心法）。

依照此思想，我们还有三分法等展开算法。

### 倍增

倍增法，通过字面意思来看就是翻倍。这个方法在很多算法中均有应用，其中最常用的就是 RMQ 问题和求 LCA。

RMQ 是英文 Range Maximum/Minimum Query 的缩写，表示区间最大（最小）值。解决 RMQ 问题的主要方法有两种，分别是 ST 表和线段树，具体请参见 ST 表和 线段树内容。

### 构造

构造针对的问题的答案往往具有某种规律性，使得在问题规模迅速增大的时候，仍然有机会比较容易地得到答案。

这种思想我们接触的比较少，主要体现了数学解题方法啊。

### 前缀和 & 差分

前缀和是一种重要的预处理，能大大降低查询的时间复杂度。我们可以简单理解为「数列的前 n 项的和」。其实前缀和几乎都是基于容斥原理。

比如这道题目：

有 N 个的正整数放到数组 A 里，现在要求一个新的数组 B，新数组的第 i 个数 `B[i]`是原数组 A 第 0 到第 i 个数的和。

对于这道题，我们有两种做法：

把对数组 A 的累加依次放入数组 B 中。

递推： `B[i] = B[i-1] + A[i]`

我们看第二种方法采用前缀和的思想，无疑更加优秀。最后，差分是一种和前缀和相对的策略。这种策略是求相邻两数的差。
