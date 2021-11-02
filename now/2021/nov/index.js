
// l - 821.
var shortestToChar = function(s, c) {
  if (s === '') return '';
  const answer = [];
  let lastIndex = -Infinity;
  let curIndex = s.indexOf(c);;
  for (let i = 0; i < s.length; i++) {
    if (s[i] !== c) {
      answer.push(Math.min(Math.abs(i - lastIndex), Math.abs(curIndex - i)));
    }
    else {
      answer.push(0);
      const nextIndex = s.slice(i + 1).indexOf(c) + i + 1;
      lastIndex = curIndex;
      curIndex = nextIndex === -1 ? i : nextIndex;
    }
  }
  return answer;
};