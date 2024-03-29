// 打家劫舍.
var rob = function(nums) {
  if (nums.length === 1) return nums[0];
  if (nums.length === 2) return Math.max(nums[0], nums[1]);

  let last = nums[0], cur = nums[1];
  for (let i = 2; i < nums.length; i++) {
    const temp = last;
    last = Math.max(last, cur);
    cur = Math.max(cur, temp + nums[i]);
    // [last, cur] = [cur, Math.max(cur, last + nums[i])];
  }
  return cur;
};

// 树的前序遍历.


var postorderTraversal = function(root) {
  if (!root) return [];
  const result = [];
  recursion(root);
  return result;

  function recursion(tree) {
    if (tree.left) recursion(tree.left);
    if (tree.right) recursion(tree.right);
    result.push(tree.val);
  }
}