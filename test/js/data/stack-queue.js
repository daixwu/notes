class Stack {
  constructor(...args) {
    this.stack = [...args]
  }
 
  // Modifiers
  // 向stack中添加元素
  push(...items) {
    return this.stack.push(...items)
  }
 
  // 返回栈顶元素,并且将该栈顶元素出栈
  pop() {
    return this.stack.pop()
  }
 
  // Element access
  // 返回栈顶元素
  peek() {
    return this.isEmpty()
        ? undefined
        : this.stack[this.size() - 1]
  }
 
  // Capacity
  isEmpty() {
    return this.size() == 0
  }
 
  size() {
    console.log('this.stack.length: ', this.stack.length);
    return this.stack.length
    
  }
}


 let stack = new Stack(0,1,2,3,4,5,6)

 stack.peek()
 console.log(' stack.peek(): ',  stack.peek());