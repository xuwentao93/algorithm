// 给出二叉 搜索 树的根节点，该二叉树的节点值各不相同，修改二叉树，使每个节点 node 的新值等于原树中
// 大于或等于 node.val 的值之和。 (l-1038)

// 中序遍历. 很显然, 中序遍历的结果在二叉搜索树中的结果是从小到大排列的, 这题的核心思想就是从大到小输出并
// 储存结果, 只需要将中序遍历反过来即可(即右中左). 仍然运用递归去处理. 时间复杂度为: O(n). 空间复杂度为: O(n).
var bstToGst = function(root) {
  let sum = 0;
  sumTreeVal(root);
  return root;
  function sumTreeVal(tree) {
    if (tree === null) return 0;

    sumTreeVal(tree.right);
    tree.val += sum;
    sum = tree.val;
    sumTreeVal(tree.left);
  }
};

// 给定一个包含红色、白色和蓝色，一共 n 个元素的数组，原地对它们进行排序，使得相同颜色的元素相邻，并按照红色、白色、蓝色顺序排列。
// 此题中，我们使用整数 0、 1 和 2 分别表示红色、白色和蓝色。(l-75)

// 此题肯定可以用排序解决, 需要 O(NlogN) 的时间复杂度, 或者在一次遍历中, 算出 0 1 2 三个数字分别出现的次数,
// 把 nums 里面的内容整个替换掉, 遍历两次, 需要 O(N) 的时间复杂度和 O(N) 的空间复杂度. 当然拿到数组序号的修改,
// 更直观的是考虑双指针. 此题类似, 我们添加两个指针 left, right, 加上数组遍历的 i 总共 3 个指针, 凡是 0 的数字
// 就和头交换, 2 就和尾交换, 1 则不变. 最终, 时间复杂度为: O(N). 空间复杂度为: O(1).

var sortColors = function(nums) {
  let left = 0, right = nums.length - 1;
  while (nums[left] === 0) left++;
  while (nums[right] === 2) right--;
  for (let i = left; i <= right; i++) {
    if (nums[i] === 0) {
      [nums[i], nums[left]] = [nums[left], nums[i]];
      left++;
    }
    if (nums[i] === 2) {
      while (nums[right] === 2) right--;
      if (right < i) break;
      [nums[i], nums[right]] = [nums[right], nums[i]];
      right--;
      if (nums[i] === 0) {
        [nums[i], nums[left]] = [nums[left], nums[i]];
        left++;
    }
    }
  }
  return nums;
};

// 此解法为网上的更简洁解法, 也为双指针思路, 时间上比上面略微长一些.

var sortColors = function(nums) {
  let right = nums.length - 1, left = 0;
  for (let i = 0; i <= right; i++) {
      while (nums[i] == 2 && i < right) {
          [nums[i], nums[right]] = [nums[right], nums[i]];
          right--;
      }
      while (nums[i] == 0 && i > left) {
          [nums[i], nums[left]] = [nums[left], nums[i]];
          left++;
      }
  }
};