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

// l - 105.

var buildTree = function(preorder, inorder) {
  const map = new Map();
  inorder.forEach((item, index) => {
    map.set(item, index);
  });
  return helper(0, 0, inorder.length - 1);
  function helper(preStart, inStart, inEnd) {
    if (preStart > inorder.length - 1 || inStart > inEnd) return null;
    const tree = { val: preorder[preStart] };
    const inIndex = map.get(tree.val);
    tree.left = helper(preStart + 1, inStart, inIndex - 1);
    tree.right = helper(preStart + inIndex - inStart + 1, inIndex + 1, inEnd);
    return tree;
  }
}

// l - 376.

// 1. 重复之前的动态规划.
var wiggleMaxLength = function(nums) {
  if (nums.length < 2) return nums.length;
  const dp = [];
  for (let i = 0; i < nums.length; i++) {
    dp.push({
      add: 1,
      reduce: 1
    });
  }
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) dp[i].add = Math.max(dp[i].add, dp[j].reduce + 1);
      if (nums[i] < nums[j]) dp[j].reduce = Math.max(dp[i].reduce, dp[j].add + 1);
    }
  }
  let max = 1;
  for (let i = 1; i < nums.length; i++) {
    max = Math.max(max, Math.max(dp[i].reduce, dp[i].add));
  }
  return max;
}

// 2. 优化的动态规划. 每次我们都利用前一个状态, 如果上升下降不同, 就为前一个状态 up 或者 down 中的一个值
// + 1, 如果状态相同或者数字相等, 那么 up 和 down 的值不变. 时间复杂度为: O(n). 空间复杂度为: O(1).
var wiggleMaxLength = function(nums) {
  if (nums.length < 2) return nums.length;
  const DOWN = 'down';
  const UP = 'up';
  let state = '';
  let up = 1;
  let down = 1;
  let initNum = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[0]) {
      state = UP;
      initNum = i + 1;
      down++;
      break;
    }
    if (nums[i] < nums[0]) {
      state = DOWN;
      initNum = i + 1;
      up++;
      break;
    }
  }
  for (let i = initNum; i < nums.length; i++) {
    if (nums[i] > nums[i - 1] && state === DOWN) {
      state = UP;
      down = up + 1;
    } else if (nums[i] < nums[i - 1] && state === UP) {
      state = DOWN;
      up = down + 1;
    }
  }
  return Math.max(up, down);
}

// 3. 官方的优化代码. 和上面一样.

var wiggleMaxLength = function(nums) {
  if (nums.length < 2) return nums.length;
  let up = 1, down = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) up = down + 1;
    if (nums[i] < nums[i - 1]) down = up + 1;
  }
  return Math.max(up, down);
}