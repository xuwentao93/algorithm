
// 给定一个包含非负整数的 m x n 网格，请找出一条从左上角到右下角的路径，使得路径上的数字总和为最小。
// 说明：每次只能向下或者向右移动一步。
// l - 64.

var minPathSum = function(grid) {
  for (let i = 1; i < grid[0].length; i++) {
    grid[0][i] = grid[0][i] + grid[0][i - 1];
  }
  for (let i = 1; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (j === 0) grid[i][0] = grid[i - 1][0] + grid[i][0];
      else grid[i][j] = Math.min(grid[i - 1][j], grid[i][j - 1]) + grid[i][j];
    }
  }
  return grid[grid.length - 1][grid[grid.length - 1].length - 1];
};

// l - 62

var uniquePaths = function(m, n) {
  const map = Array(m).fill([]);
  map[0] = Array(n).fill(1);
  for (let i = 1; i < m; i++) {
    for (let j = 0; j < n; j++) {
      if (j === 0) map[i][j] = 1;
      map[i][j] = map[i - 1][j] + map[j - 1][i];
    }
  }
  return map[m - 1][n - 1];
};
