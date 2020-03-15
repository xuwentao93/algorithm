
// 对于字符串 S 和 T，只有在 S = T + ... + T（T 与自身连接 1 次或多次）时，我们才认定 “T 能除尽 S”。
// 返回最长字符串 X，要求满足 X 能除尽 str1 且 X 能除尽 str2。
// 输入：str1 = "ABCABC", str2 = "ABC"
// 输出："ABC" (l-1071)

// 1. 取两个字符串的较小者, 直接相加, 不能与长字符串相等则从末位按字符移除, 到长度能被原字符串整除的时候
// 在执行一次相加, 直到相加过程能被长的字符串整除, 那个被移除过字符的符合要求的字符串即为所求答案.
// 时间复杂度分析起来有点难, 虽然在循环里面套了一层循环, 但是两层循环都不是 O(n) 级别的.
// 整体上来看, 大致是 O(n) - O(logn). 时间复杂度为: O(1).

var gcdOfStrings = function(str1, str2) {
  if (str1 === '' || str2 === '') return '';
  if (str1 === str2) return str2;
  if (str2.length > str1.length) [str1, str2] = [str2, str1]; // confirm str1.length is longer than str2.
  let str = str2;
  while (str.length > 0) {
    let sum = '';
    for (let i = 0; i < str1.length; i += str.length) {
      sum += str;
    }
    if (sum === str1) return str;
    do {
      str = str.slice(0, -1);
    } while (str.length > 0 && str2.length % str.length !== 0);
  }
  return '';
};

// 3-13

var gcdOfStrings = function(str1, str2) {
  if (str1 === '' || str2 === '' || str1 === str2) return str1;
  if (str2.length > str1.length) [str1, str2] = [str2, str1];
  let str = str2;
  while (str.length > 0) {
    let sum = '';
    for (let i = 0; i < str1.length; i++) {
      sum += str;
      if (sum === str1) return sum;
    }
    do {
      str = str.slice(0, -1);
    } while (str2.length % str.length !== 0 && str.length > 0);
  }
  return '';
}