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

// greedy + binary search. time: O(nlogn). space: O(1).
var lengthOfLIS = function(nums) {
  if (nums.length <= 1) return nums.length;
  let len = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[len - 1]) {
      nums[len++] = nums[i];
    } else {
      if (len === 1) {
        nums[0] = nums[i];
      } else {
        if (nums[i] < nums[0]) nums[0] = nums[i];
        else if (nums[i] < nums[len - 1] && nums[i] > nums[len - 2]) nums[len - 1] = nums[i];
        else {
          let start = 0;
          let end = len - 1;
          while (start < end) {
            const mid = ~~ (start + end) >> 1;
            if (nums[i] > nums[mid]) start = mid + 1;
            else if (nums[i] < nums[mid - 1]) end = mid - 1;
            else if (nums[i] === nums[mid]) break;
            else {
              nums[mid] = nums[i];
              break;
            }
          }
        }
      }
    }
  }
  return len;
}

lengthOfLIS([3,5,6,2,5,4,19,5,6,7,12]);