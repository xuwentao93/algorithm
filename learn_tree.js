// pre-order 先序遍历, in-order 中序遍历, post-order 后序遍历.
// depth-frst-search(DFS) 深度优先搜索, breadth-first-search(BFS) 广度优先搜索.

const treeTest = {
  val: 1,
  left: {
    val: 2,
    left: {
      val: 4,
      left: null,
      right: {
        val: 6,
        left: {
          val: 7,
          left: null,
          right: null
        },
        right: {
          val: 8,
          left: null,
          right: null
        }
      }
    },
    right: null
  },
  right: {
    val: 3,
    left: null,
    right: {
      val: 5,
      left: null,
      right: null
    }
  }
}

// start 19-12-09
// correct pre order search will output 1 2 4 6 7 8 3 5.

function preOrderRecursion(tree) {
  if (tree !== null) {
    console.log(tree.val)
    preOrderRecursion(tree.left)
    preOrderRecursion(tree.right)
  }
}

// preOrderRecursion(treeTest)

function preOrderStack(tree) {
  const stack = []
  while (tree !== null || stack.length !== 0) {
    if (tree !== null) {
      console.log(tree.val)
      stack.push(tree)
      tree = tree.left
    } else {
      tree = stack.pop()
      tree = tree.right
    }
  }
}

// preOrderStack(treeTest)

// correct in order search will output: 4 7 6 8 2 1 3 5.

function inOrderRecursion(tree) {
  if (tree !== null) {
    inOrderRecursion(tree.left)
    console.log(tree.val)
    inOrderRecursion(tree.right)
  }
}

// inOrderRecursion(treeTest)

function inOrderStack(tree) {
  const stack = []
  while (tree !== null || stack.length !== 0) {
    if (tree !== null) {
      stack.push(tree)
      tree = tree.left
    } else {
      tree = stack.pop()
      console.log(tree.val)
      tree = tree.right
    }
  }
}

// inOrderStack(treeTest)

// correct post order search will output: 7 8 6 4 2 5 3 1.

function postOrderRecursion(tree) {
  if (tree !== null) {
    postOrderRecursion(tree.left)
    postOrderRecursion(tree.right)
    console.log(tree.val)
  }
}

// postOrderRecursion(treeTest)

// 非递归后序遍历
function postOrderStack(tree) {
  const stack = []
  let cursor = tree
  while (tree !== null || stack.length !== 0) {
    while (tree !== null) {
      stack.push(tree)
      tree = tree.left
    }
    tree = stack[stack.length - 1]
    if (tree.right === null || tree.right === cursor) {
      console.log(tree.val)
      stack.pop()
      cursor = tree
      tree = null
    } else {
      tree = tree.right
    }
  }
}

// postOrderStack(treeTest)

// 给定一个二叉树，判断其是否是一个有效的二叉搜索树。
// 假设一个二叉搜索树具有如下特征：
// 节点的左子树只包含小于当前节点的数。
// 节点的右子树只包含大于当前节点的数。
// 所有左子树和右子树自身必须也是二叉搜索树。(l-98)
// 示例 1:
// 输入:
//     2
//    / \
//   1   3
// 输出: true

// 1. 递归. 递归理解起来比较抽象, 总的来说, 你只需要考虑当下的情况是否符合, 在把这种情况
// 延申到各个节点即可. 要遍历整个树, 所以时间复杂度为: O(n), 因为递归的原因会有大量指针
// 节点保留, 所以空间复杂度为: O(n).
var isValidBST = function(root) {
  return BSTrecursion(root, null, null)
  function BSTrecursion(node, lower, upper) {
    if (node === null) return true

    let val = node.val

    if (val <= lower && lower !== null) return false
    if (val >= upper && upper !== null) return false

    if (!(BSTrecursion(node.left, lower, val))) return false
    if (!(BSTrecursion(node.right, val, upper))) return false
  }
};

// 2. 迭代.

// 3. 中序遍历.

// end 19-12-09