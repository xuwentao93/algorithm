// 二分法专题.


/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
// leetcode 35.
var searchInsert = function(nums, target) {
  const { length } = nums;

  let left = 0;
  let right = length - 1;
  let mid;
  let ans = length;
  while (right >= left) {
    mid = ~~ ((right + left) / 2);
    if (nums[mid] >= target) {
      ans = mid;
      right = mid - 1;
    } else {
      left = mid + 1;
    }
  }

  return ans;
};

// console.log(searchInsert([1,3,5,6], 2));

