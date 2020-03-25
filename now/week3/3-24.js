// 递归乘法。 写一个递归函数，不使用 * 运算符， 实现两个正整数的相乘。可以使用加号、减号、位移，但要吝啬一些。
// (leetcode 面试题 08.05. 递归乘法)

// 1. 时间复杂度为: O(min(A, B)). 空间复杂度为: O(min(A, B)).

var multiply = function(A, B) {
  if (A < B) [A, B] = [B, A]; // 让小的数做循环, 可以减少时间复杂度.
  return add(A, B);
  function add(x, y) {
    y--;
    if (y === 0) return x;
    x+= x;
    return add(x, y);
  }
};