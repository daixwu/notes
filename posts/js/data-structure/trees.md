# 树(Trees)

树是非线性的，因为树决定了其存储的数据直接有明确的层级关系，因此对于维护具有层级特性的数据，树是一个天然良好的选择。其具有以下特性：

- 除了根节点以外，所有的节点都有一个父节点

- 每一个节点都可以有若干子节点，如果没有子节点，那么称此节点为叶子节点

- 一个节点所拥有的叶子节点的个数，称之为该节点的度，因此叶子节点的度为 0

- 所有节点中，最大的度为整棵树的度

- 树的最大层次称为树的深度

从应用上来看，我们前端开发离不开的 DOM 就是一个树状结构；同理，不管是 React 还是 Vue 的虚拟 DOM 也都是树。

## 二叉搜索树的实现和遍历

说二叉树最为基本，因为他的结构最简单，每个节点至多包含两个子节点。二叉树又非常有用：因为根据二叉树，我们可以延伸出二叉搜索树（BST）、平衡二叉搜索树（AVL）、红黑树（R/B Tree）等。

二叉搜索树有以下特性：

- 左子树上所有结点的值均小于或等于它的根结点的值

- 右子树上所有结点的值均大于或等于它的根结点的值

- 左、右子树也分别为二叉搜索树

```js
class Node {
  constructor(data) {
    this.left = null
    this.right = null
    this.value = data
  }
}

class BST {
  constructor() {
    this.root = null
  }

  // 根据一个父节点，插入一个子节点
  insertNode(root, newNode) {
    if (newNode.value < root.value) {
      (!root.left) ? root.left = newNode : this.insertNode(root.left, newNode)
    } else {
      (!root.right) ? root.right = newNode : this.insertNode(root.right, newNode)
    }
    console.log(this.root)
  }
  
  // 插入一个新节点
  insert(value) {
    let newNode = new Node(value)
    if (!this.root) {
      this.root = newNode
    } else {
      this.insertNode(this.root, newNode)
    }
  }

  // 根据一个父节点，移除一个子节点
  removeNode(root, value) {
    if (!root) {
      return null
    }

    if (value < root.value) {
      root.left = this.removeNode(root.left, value)
      return root
    } else if (value > root.value) {
      root.right = tis.removeNode(root.right, value)
      return root
    } else {
      // 找到了需要删除的节点
      // 如果当前 root 节点无左右子节点
      if (!root.left && !root.right) {
        root = null
        return root
      }

      // 只有左节点
      if (root.left && !root.right) {
        root = root.left
        return root
      }
      // 只有右节点
      else if (root.right) {
        root = root.right
        return root
      }

      // 有左右两个子节点
      let minRight = this.findMinNode(root.right)
      root.value = minRight.value
      root.right = this.removeNode(root.right, minRight.value)
      return root
    }
  }
  
  // 移除一个节点
  remove(value) {
    if (this.root) {
      this.removeNode(this.root, value)
    }
  }

  // 获取子节点的最小值
  findMinNode(root) {
    if (!root.left) {
      return root
    } else {
      return this.findMinNode(root.left)
    }
  }

  // 根据一个父节点，查找子节点
  searchNode(root, value) {
    if (!root) {
      return null
    }
    if (value < root.value) {
      return this.searchNode(root.left, value)
    } else if (value > root.value) {
      return this.searchNode(root.right, value)
    }
    return root
  }

  // 查找节点
  search(value) {
    if (!this.root) {
      return false
    }
    return Boolean(this.searchNode(this.root, value))
  }

  // 前序遍历
  preOrder(root) {
    if (root) {
      console.log(root.value)
      this.preOrder(root.left)
      this.preOrder(root.right)
    }
  }

  // 中序遍历
  inOrder(root) {
    if (root) {
      this.inOrder(root.left)
      console.log(root.value)
      this.inOrder(root.right)
    }
  }

  // 后续遍历
  postOrder(root) {
    if (root) {
      this.postOrder(root.left)
      this.postOrder(root.right)
      console.log(root.value)
    }
  }
}
```
