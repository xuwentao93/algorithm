// 给定两个整数 n 和 k，返回 1 ... n 中所有可能的 k 个数的组合。(l - 77)

// 1. 回溯.

var combine = function(n, k) {
  if (n < 1 || k <= 0) return [];
  const ans = [];
  const res = [];
  trackback(1, res);
  return ans;
  function trackback(start, temp) {
    if (temp.length === k) {
      const currentResult = JSON.parse(JSON.stringify(temp));
      ans.push(currentResult);
      return;
    }
    for (let i = start; i <= n; i++) {
      temp.push(i);
      trackback(start + 1, temp);
      temp.pop();
    }
  }
};

// 给定一个二维网格和一个单词，找出该单词是否存在于网格中。
// 单词必须按照字母顺序，通过相邻的单元格内的字母构成，
// 其中“相邻”单元格是那些水平相邻或垂直相邻的单元格。同一个单元格内的字母不允许被重复使用。

var exist = function(board, word) {
  if (word > board.length) return false;
  const visited = Array(board.length).fill(false);
  let ans = false;
  trackback('', -1);
  return ans;
  function trackback(str, num) {
    if (str === word || ans === true) {
      ans = true;
      return;
    }
    for (let i = 0; i < board.length; i++) {
      if (!visited[i]) {
        visited[i] = true;
        for (let j = 0; j < board[i].length; j++) {
          if (board[i][j] === word[str.length] && (j === num || num === -1)) {
            str += board[i][j];
            trackback(str, j);
            str = str.slice(0, -1);
            visited[i] = false;
          }
        }
      }
    }
  }
};