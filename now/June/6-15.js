// n 皇后问题研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。(l - 52)

// 1. 回溯法. n 皇后问题即八皇后问题, 用回溯法即可解决. time complexity: O(n!), space complexity: O(N).
// 处于同一个撇上, row + col 相同, 处于同一个捺上, row - col 相同.

var totalNQueens = function(n) {
  const rows = Array(n).fill(false);
  const hills = Array(2 * n).fill(false);
  const dales = Array(2 * n).fill(false);
  function trackback(row, count) {
    for (let col = 0; col < n; col++) {
      if (!dales[row + col] && !hills[row - col + n] && !rows[col]) {
        rows[col] = true;
        dales[row + col] = true;
        hills[row - col + n] = true;
        if (row === n - 1) count++;
        else count = trackback(row + 1, count);
        rows[col] = false;
        dales[row + col] = false;
        hills[row - col + n] = false;
      }
    }
    return count;
  }
  return trackback(0, 0);
}
