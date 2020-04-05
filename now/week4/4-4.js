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