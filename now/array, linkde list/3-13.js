
//给定一个大小为 n 的数组，找到其中的多数元素。多数元素是指在数组中出现次数大于 ⌊ n/2 ⌋ 的元素。
// 你可以假设数组是非空的，并且给定的数组总是存在多数元素。(l-169)

// 1. hashmap. 遍历数组, 出现过的数字 + 1, 否则添加在 hashmap 里面. 这样只要遍历一次数组, 时间复杂度为: O(n).
// 因为数组中至少有 2 / n 个数字是同一个数字, 所以最多会占用 2 / n 个空间, 空间复杂度为: O(n).

var majorityElement = function(nums) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (map.get(nums[i]) === undefined) map.set(nums[i], 1);
    else map.set(nums[i], map.get(nums[i]) + 1);
    if (map.get(nums[i]) > nums.length >> 1) return nums[i];
  }
};

console.log(majorityElement([3, 2, 3]));

// 2. 排序. 因为出现的多数元素一定大于数组长度的一半, 所以排序后找最中间的那个数即可. 时间复杂度为排序的复杂度, 即
// O(nlogn), 空间复杂度为: O(1), 没有开辟任何新的空间.

// 3 - 14.

var majorityElement = function(nums) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    if (map.get(nums[i]) === undefined) map.set(nums[i], 1);
    else map.set(nums[i], map.get(nums[i]) + 1);
    if (map.get(nums[i]) > nums.length >> 1) return nums[i];
  }
}
