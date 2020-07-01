// l - 107
var levelOrderBottom = function(root) {
  const ans = [];
  dfs(root, 0);
  return ans.reverse();
  function dfs(tree, level) {
    if (tree === null) return;
    while (!ans[level]) ans.push([]);
    ans[level].push(tree.val);
    dfs(root.left, level + 1);
    dfs(root.right, level + 1);
  }
}

// l - 110.
var isBalanced = function(root) {
  return recursion(root) !== -1;
  function recursion(tree) {
    if (tree === null) return 0;
    let left = recursion(root.left);
    if (left === -1) return -1;
    let right = recursion(root.right);
    if (right === -1) return -1;
    return Math.abs(left - right) < 2 ? Math.max(left, right) + 1 : -1;
  } 
}

// l - 1038.

var bstToGst = function(root) {
  let max = 0;
  bfs(root);
  return root;
  function bfs(tree) {
    if (tree === null) return;
    bfs(tree.right);
    tree.val += max;
    max = tree.val;
    bfs(tree.left);
  }
};