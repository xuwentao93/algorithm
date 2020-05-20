// 最初在一个记事本上只有一个字符 'A'。你每次可以对这个记事本进行两种操作：
// Copy All (复制全部) : 你可以复制这个记事本中的所有字符(部分的复制是不允许的)。
// Paste (粘贴) : 你可以粘贴你上一次复制的字符。
// 给定一个数字 n 。你需要使用最少的操作次数，在记事本中打印出恰好 n 个 'A'。输出能够打印出 n 个 'A' 的最少操作次数。l - 650

// 1. 递归, 最大公倍数. 找到最大公倍数, 用原数去除以最大公倍数即操作次数.
var minSteps = function(n) {
  if (n === 1) return 0;
  let sum = 0;
  recursion(n);
  return sum;
  function recursion(k) {
    for (let i = ~~ k >> 1; i > 0; i--) {
      if (i === 1) {
        sum += k;
        return;
      }
      if (k % i === 0) {
        sum += k / i;
        recursion(i);
        return;
      }
    }
  }
};

// 给两个整数数组 A 和 B ，返回两个数组中公共的、长度最长的子数组的长度。 (l - 718)

// 1. 动态规划. 时间复杂度为: O(n²). 空间复杂度为: O(n²).
var findLength = function(A, B) {
  const dp = [];
  let ans = 0;
  for (let i = 0; i < A.length; i++) {
    dp.push([]);
  }
  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < B.length; j++) {
      dp[i].push(0);
    }
  }
  console.log(dp);
  for (let i = 0; i < A.length; i++) {
    for (let j = 0; j < B.length; j++) {
      if (A[i] === B[j]) {
        if (i === 0 || j === 0) dp[i][j]++;
        else dp[i][j] = dp[i - 1][j - 1] + 1;
        if (dp[i][j] > ans) ans = dp[i][j];
      }
    }
  }
  return ans;
};
