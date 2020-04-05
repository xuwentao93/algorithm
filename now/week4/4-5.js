// 给定一个仅包含数字 2-9 的字符串，返回所有它能表示的字母组合。
// 给出数字到字母的映射如下（与电话按键相同）。注意 1 不对应任何字母。(l-17)

// 1. 递归 + hashmap. 把数字对应的数字映射到 hashmap 中, 用递归将子母中出现的所有情况
// 都遍历, 当长度达到符合的时候就添加的结果中. 时间复杂度为: O(3^N * 4^M). 为数字组合的所有情况,
// 空间复杂度为: O(n), 递归调用栈的空间, 是字符串的长度.

var letterCombinations = function(digits) {
  const ans = [];
  const map = new Map();
  map.set('2', 'abc');
  map.set('3', 'def');
  map.set('4', 'ghi');
  map.set('5', 'jkl');
  map.set('6', 'mno');
  map.set('7', 'pqrs');
  map.set('8', 'tuv');
  map.set('9', 'wxyz');
  trackback('', 0);
  return ans;
  function trackback(str, digit) {
   if (str.length === digits.length) {
     ans.push(str);
     return;
   }
   let currentLetters = map.get(digits[digit]);
   for (let i = 0; i < currentLetters.length; i++) {
     trackback(str + currentLetters[i], digit + 1);
   }
  }
};

letterCombinations('23');