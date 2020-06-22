// 给定一个字符串 s，找到 s 中最长的回文子串。你可以假设 s 的最大长度为 1000。

// 1. 时间复杂度为: O(n²). 空间复杂度为: O(1).
var longestPalindrome = function(s) {
  let ans = '';
  for (let i = 0; i < s.length; i++) {
    // if (s.length - i < ans.length) break;
    let left = i - 1, right = i + 1;
    let res = s[i];
    while (left >= 0 && right < s.length && s[left] === s[right]) {
      res = s[left--] + res + s[right++];
    }
    if (res.length > ans.length) ans = res;
    if (s[i + 1] === s[i]) {
      res = s[i] + s[i];
      left = i - 1;
      right = i + 2;
      while (left >= 0 && right < s.length && s[left] === s[right]) {
        res = s[left--] + res + s[right++];
      }
      if (res.length > ans.length) ans = res;
    }
  }
  return ans;
};