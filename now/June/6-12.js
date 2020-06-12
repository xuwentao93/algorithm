// l - 300

// 1. 动态规划. 时间复杂度为: O(n2). 空间复杂度为: O(n).
var lengthOfLIS = function(nums) {
  if (nums.length <= 1) return nums.length;
  const dp = [1];
  let ans = 1;
  for (let i = 1; i < nums.length; i++) {
    let max = 1;
    for (let j = 0; j < dp.length; j++) {
      if (nums[i] > nums[j]) max = Math.max(max, dp[j] + 1);
    }
    ans = Math.max(ans, max);
    dp.push(max);
  }
  return ans;
};