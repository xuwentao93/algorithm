var ladderLength = function(beginWord, endWord, wordList) {
  if (!wordList.includes(endWord)) return [];
  const ans = [];
  backtrack(beginWord);
  return ans;
  function backtrack(beginWord) {
    for (let i = 0; i < beginWord.length; i++) {
      if (beginWord[i] !== endWord[i]) {
        ans.push
      }
    }
  }
};