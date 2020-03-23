// 根据一棵树的前序遍历与中序遍历构造二叉树。你可以假设树中没有重复的元素。(l-105)

var buildTree = function(preorder, inorder) {

};


// 给定一个二叉树，找到最长的路径，这个路径中的每个节点具有相同值。 这条路径可以经过也可以不经过根节点。
// 注意：两个节点之间的路径长度由它们之间的边数表示。


// 1. 找到一种
var longestUnivaluePath = function(root) {
  let maxLength = 0;
  findMaxLengh(root, { val: NaN, size: 0 });
  return maxLength;

  function findMaxLengh(root, point) {
    if (root === null) return;
    if (root.val === point.val) maxLength = Math.max(maxLength, ++point.size);
    else {
      point = { val: root.val, size: 0 };
    }
    findMaxLengh(root.left, point);
    findMaxLengh(root.right, point);
  }
};

console.log(longestUnivaluePath(
  {
    val: 1,
    left: {
      val: 1,
      left: null,
      right: {
        val: 1,
        left: {
          val: 1,
          left: null,
          right: null
        },
        right: null
      }
    },
    right: {
      val: 1,
      left: {
        val: 1,
        left: {
          val: 1,
          left: null,
          right: null
        },
        right: null
      },
      right: null
    }
  }
));