// 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。(l - 7)

// 1. 转字符串进行翻转.

var reverse = function(x) {
  let str = '';
  let char = '+';
  let result = '';
  if (x < 0) {
    str = (x + '').slice(1);
    char = '-';
  }
  else str = x + '';
  while (str[str.length - 1] === '0') str = str.slice(0, -1);
  for (let i = str.length - 1; i >= 0; i--) {

    result[str.length - 1 - i] = str[i];
  }
  if (char === '-') result = '-' + result;
  return +result;
};


// 2. 直接翻转.
var reverse = function(x) {
  const MAX_INT = 2147483647; // 2 的 31 次方, 在其它语言中他减去 1 是 int 类型的最大值.
  const MIN_INT = -2147483648; // 2 的 31 次方, 在其它语言中他减去 1 是 int 类型的最大值.
  let result = 0;
  while (x !== 0) {
    let pop = x % 10;
    x = Math.floor(x / 10);
    if (result > MAX_INT / 10 || (result === MAX_INT) && pop > 7) return 0;
    if (result < -MIN_INT / 10 || (result === -MIN_INT / 10 && pop < -8)) return 0;
    result = result * 10 + pop;
  }
  return result;
}
