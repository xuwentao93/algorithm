// 给出 n 代表生成括号的对数，请你写出一个函数，使其能够生成所有可能的并且有效的括号组合。(l - 22)

// 1. 回溯. 我们通过递归把左括号右括号不断添加, 当不符合匹配状况的时候, 我们就回到上一种情况, 重新添加括号.
// 时空复杂度的计算比较复杂, 这里不给出.

var generateParenthesis = function(n) {
  const ans = [];
  trackBack("", 0, 0);
  return ans;
  function trackBack(str, leftParenthese, rightparenthese) {
    if (str.length === n * 2) {
      ans.push(str);
      return;
    }
    if (leftParenthese < n) {
      trackBack(str + "(", leftParenthese + 1, rightparenthese);
    }
    if (rightparenthese < leftParenthese) {
      trackBack(str + ")", leftParenthese, rightparenthese + 1);
    }
  }
};

// 4-5

var generateParenthesis = function(n) {
  const ans = [];
  trackBack('', 0, 0);
  return ans;
  function trackBack(str, leftParenthese, rightParenthese) {
    if (str.length === n * 2) {
      ans.push(str);
      return;
    }

    if (left < n) trackBack(str + '(', leftParenthese + 1, rightParenthese);
    if (rightParenthese < leftParanthese) trackBack(str + ')', leftParenthese, rightParenthese);
  }
};