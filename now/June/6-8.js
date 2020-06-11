// 给定一个 haystack 字符串和一个 needle 字符串,
// 在 haystack 字符串中找出 needle 字符串出现的第一个位置 (从0开始)。如果不存在，则返回  -1。(l - 28)

// 1. BM 算法.

var strStr = function(haystack, needle) {
  const { length } = needle;
  const ans = [];
  const map = new Map();
  for (let i = 0; i < length; i++) {
    const charPosition =  map.get(needle[i]);
    if (charPosition === undefined) map.set(needle[i], [i]);
    else {
      charPosition.push(i);
      map.set(needle[i], charPosition);
    }
    map.set(needle[i], i); // 字符可能相同, 在 BM 中只需要取最大的, 所以不能反着来.
  }
  for (let i = length - 1; i < haystack.length; true) {
    let l = needle.length - 1;
    let j = i;
    while (haystack[j] === needle[l - 1]) {
      j--;
      l--;
      if (l === -1) {
        ans.push(i - length);
        break;
      }
    } // while 循环结束后, l 即为坏字符出现的位置.
    
  }
  return ans.length === 0 ? -1 : ans[0]; // 提交 leetcode 的时候 ans 改成 ans[0].
};


let a = <div>123123</div>;

// console.log(a);