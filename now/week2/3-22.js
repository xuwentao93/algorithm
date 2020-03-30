树的前序遍历. 
输入: [1,null,2,3]  
1
\
 2
/
3 
输出: [1,2,3] (l-144)

1. 递归. 时间复杂度为: O(n). 空间复杂度为: O(n).

var preorderTraversal = function(root) {
  const result = [];
  traversalTree(root);
  return result;

  function traversalTree(tree) {
    if (tree === null) return;
    result.push(tree.val);
    traversalTree(tree.left);
    traversalTree(tree.right);
  }
};

// 树的中序遍历. 时间复杂度为: O(n). 空间复杂度为: O(n). // (l-94)

var inorderTraversal = function(root) {
  const result = [];
  traversalTree(root);
  return result;

  function traversalTree(tree) {
    if (tree === null) return;
    traversalTree(tree.left);
    result.push(tree.val);
    traversalTree(tree.right);
  }
};

// 树的后序遍历. 时间复杂度为: O(n). 空间复杂度为: O(n). (l-145)

var postorderTraversal = function(root) {
  const result = [];
  traversalTree(root);
  return result;

  function traversalTree(tree) {
    if (tree === null) return;
    traversalTree(tree.left);
    traversalTree(tree.right);
    result.push(tree.val);
  }
};

// TODO: 树的三序遍历, 必须用其它方法重解.

// 莫里斯前序.

var preorderTraversal = function(root) {
  const result = [];

  while (root) {
    if (root.left === null) {
      result.push(root.val);
      root = root.right;
    } else {
      let predecessor = root.left;
      while (predecessor && predecessor.right !== null && predecessor.right !== root) {
        predecessor = predecessor.right;
      }

      if (predecessor.right === null) {
        predecessor.right = root;
        result.push(root.val);
        root = root.left;
      } else {
        predecessor.right = null;
        root = root.right;
      }
    }
  }
  return result;
};

console.log(preorderTraversal({
  val: 5,
  left: {
    val: 3,
    left: {
      val: 10,
      left: {
        val: 7,
        left: null,
        right: null
      },
      right: {
        val: 2,
        left: {
          val: 6,
          left: null,
          right: null
        },
        right: null
      },   
    },
    right: null
  },
  right: null
}));