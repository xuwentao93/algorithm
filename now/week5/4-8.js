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