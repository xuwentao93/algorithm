// start 19-12-09

// 给定一个非负整数 num，反复将各个位上的数字相加，直到结果为一位数。
// 示例:
// 输入: 38
// 输出: 2 
// 解释: 各位相加的过程为：3 + 8 = 11, 1 + 1 = 2。 由于 2 是一位数，所以返回 2。(l-258)
// 进阶:
// 你可以不使用循环或者递归，且在 O(1) 时间复杂度内解决这个问题吗？

// 1. 循环. 时间复杂度为: O(n), 空间复杂度为: O(1).

var addDigits = function(num) {
  num = String(num)
  let sum = parseFloat(num[0])
  for (let i = 1; i < num.length; i++) {
    sum = (sum + parseFloat(num[i]))
  }
  num = String(sum)
  while (sum >= 10) {
    sum = 0
    for (let i = 0; i < num.length; i++) {
      sum = (sum + parseFloat(num[i]))
    }
    num = String(sum)
  }
  return sum
}

// 2. 递归.
var addDigits = function(num) {
  if (+num < 10) return num

}

// 3. 数学. 列举0-18的结果即可推导, 把一大串数字当成两两相加, (两个个位数之和最大为18),
// 即可得出公式. 时间复杂度为: O(1), 空间复杂度为: O(1).

var addDigits = function(num) {
  if (num === 0) return 0
  if (num % 9 === 0) return 9
  else return num % 9
}

