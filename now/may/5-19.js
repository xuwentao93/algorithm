// 在一个由 0 和 1 组成的二维矩阵内，找到只包含 1 的最大正方形，并返回其面积。

// 1. 动态规划. 时间复杂度为: O(mn). 空间复杂度为: O(mn).
var maximalSquare = function(matrix) {
  if (matrix.length === 0) return 0;
  const dp = [];
  for (let i = 0; i < matrix.length; i++) {
    dp.push([]);
  }
  let max = 0;
  for (let i = 0; i < matrix.length; i++) {
    dp[i][0] = +matrix[i][0];
    if (matrix[i][0] === '1') max = 1; 
  }
  for (let i = 0; i < matrix[0].length; i++) {
    dp[0][i] = +matrix[0][i];
    if (matrix[0][i] === '1') max = 1;
  }
  for (let i = 1; i < matrix.length; i++) {
    for (let j = 1; j < matrix[i].length; j++) {
      if (matrix[i][j] === '0') dp[i][j] = 0;
      else {
        dp[i][j] = Math.min(dp[i - 1][j], dp[i][j - 1], dp[i - 1][j - 1]) + 1;
        if (dp[i][j] > max) max = dp[i][j];
      }
    }
  }
  return max * max;
};

// 注意, 本题用原数组存的话, 空间复杂度可以降低到 O(1).