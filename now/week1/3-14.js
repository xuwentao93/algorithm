
// 给定一个无序的整数数组，找到其中最长上升子序列的长度。
// 输入: [10,9,2,5,3,7,101,18]
// 输出: 4 
// 解释: 最长的上升子序列是 [2,3,7,101]，它的长度是 4。(l-300)

// 1. 动态规划. 从数组头部开始, 为每个位置依次记录他的深度, 数组 0 这个地方的深度为 1, 后面的每个位置的数字
// 如果大于前面位置的数字, 说明可以从前面那个数字一步走到这个数字, 那么这个位置的深度最小也是那个位置的深度 + 1.
// 最后在用一个变量储存出现过所有深度的最大值. 总共要循环两次, 时间复杂度为: O(n²). 开辟了一个新的数组储存深度, 
// 空间复杂度为: O(n).

var lengthOfLIS = function(nums) {
  if (nums.length === 0) return 0;
  const deep = [1];
  let maxDeep = 1;
  for (let i = 1; i < nums.length; i++) {
    let currentDeep = 1;
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) currentDeep = Math.max(currentDeep, deep[j] + 1);
    }
    deep[i] = currentDeep;
    maxDeep = Math.max(deep[i], maxDeep);
  }
  return maxDeep;
};

// console.log(lengthOfLIS([10,9,2,5,3,7,11]));

// 2. 贪心算法 + 二分法.

var lengthOfLIS = function(nums) {
  let maxDeep = 0;
  const deep = Array(nums.length).fill(-Infinity);
  nums.forEach((num) => {
    let start = 0;
    let end = maxDeep;
    while (start < end) {
      let mid = Math.floor((start + end) >> 1);
      if (num > deep[mid]) start = mid + 1;
      else end = mid;
    }
    deep[start] = num;
    if (end === maxDeep) maxDeep++;
  });
  return maxDeep;
}


// console.log(lengthOfLIS([10,9,2,5,3,7,11,4,-4,-3,-2,-1,0]));

// 给定一个非空的字符串，判断它是否可以由它的一个子串重复多次构成。给定的字符串只含有小写英文字母，并且长度不超过10000。
// 输入: "abab"
// 输出: True
// 解释: 可由子字符串 "ab" 重复两次构成。(l-459)

// 1. 暴力法. 从一个字符开始, 一次相加, 当字符串长度和原先相同比较, 不同的话字符数加 1, 否则返回 true.
// 循环到 n + 1 / 2 字符串位置的时候还没有返回 true, 则直接返回false. 时间复杂度的计算比较麻烦, 外部的循环
// 次数最大为 2 / n, 内部的循环开始为 n, 后续为 n / 2, 然后 n / 3..... 大约在 O(nlogn) 左右的时间复杂度.
// 空间复杂度为: O(1).

// 2. 双倍字符串. 如果这个字符串和自己相连, 把连接后的字符串的头尾字符砍掉, 还能够匹配到自己, 说明他是由
// 重复子串构成的. 因为有 indexOf, 时间复杂度为: O(n). 空间复杂度为: O(1).

var repeatedSubstringPattern = function(s) {
  return (s + s).slice(1, -1).indexOf(s) !== -1;
};
