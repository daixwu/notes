class Graph {
  constructor() {
    this.AdjList = new Map()
  }
  addVertex(vertex) {
    if (!this.AdjList.has(vertex)) {
      this.AdjList.set(vertex, [])
    } else {
      throw 'vertex already exist!'
    }
  }

  addEdge(vertex, node) {
    if (this.AdjList.has(vertex)) {
      if (this.AdjList.has(node)){
        let arr = this.AdjList.get(vertex)
        if(!arr.includes(node)){
          arr.push(node)
        }
      } else {
        throw `Can't add non-existing vertex ->'${node}'`
      }
    } else {
      throw `You should add '${vertex}' first`
    }
  }

  print() {
    for (let [key, value] of this.AdjList) {
      console.log(key, value)
    }
  }

  createVisitedObject() {
    let arr = {}
    for(let key of this.AdjList.keys()) {
      arr[key] = false
    }
    return arr
  }

  bfs(initialNode) {
    // 创建一个已访问节点的 map
    let visited = this.createVisitedObject()
    // 模拟一个队列
    let queue = []
  
    // 第一个节点已访问
    visited[initialNode] = true
    // 第一个节点入队列
    queue.push(initialNode)
  
    while(queue.length) {
      let current = queue.shift()
      console.log(current)
  
      // 获得该节点的其他节点关系
      let arr = this.AdjList.get(current)
  
      for (let elem of arr) {
        // 如果当前节点没有访问过
        if (!visited[elem]) {
          visited[elem] = true
          q.push(elem)
        }
      }
    }
  }

  dfs(initialNode) {
    let visited = this.createVisitedObject()
    this.dfsHelper(initialNode, visited)
  }
  
  dfsHelper(node, visited) {
    visited[node] = true
    console.log(node)
  
    let arr = this.AdjList.get(node)
  
    for (let elem of arr) {
      if (!visited[elem]) {
        this.dfsHelper(elem, visited)
      }
    }
  }
}

let g = new Graph();
let arr = ['A', 'B', 'C', 'D', 'E', 'F'];	
for (let i = 0; i < arr.length; i++) {	
  g.addVertex(arr[i])
}	


g.addEdge('A', 'B')
g.addEdge('A', 'D')
g.addEdge('A', 'E')
g.addEdge('B', 'C')
g.addEdge('D', 'E')
g.addEdge('E', 'F')
g.addEdge('E', 'C')
g.addEdge('C', 'F')

g.print()