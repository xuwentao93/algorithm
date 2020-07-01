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