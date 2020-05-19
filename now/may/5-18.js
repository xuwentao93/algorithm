// 给定一个数组 nums ，如果 i < j 且 nums[i] > 2*nums[j] 我们就将 (i, j) 称作一个重要翻转对。
// 你需要返回给定数组中的重要翻转对的数量。 l - 493

// 1. 暴力法, 很容易想到, 时间复杂度为: O(n²). 空间复杂度为: O(1). 然而超时.

var reversePairs = function(nums) {
  let ans = 0;
  for (let i = nums.length - 1; i > 0; i--) {
    for (let j = i - 1; j >= 0; j--) {
      if (nums[j] > 2* nums[i]) ans++;
    }
  }
  return ans;
};

// 2.

var reversePairs = function(nums) {
  
}
