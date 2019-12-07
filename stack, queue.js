// start 19-12-06

// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
// 有效字符串需满足：
// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
// 注意空字符串可被认为是有效字符串。(l-20)
// 示例 1:
// 输入: "(]"
// 输出: false
// 示例 2:
// 输入: "()[]{}"
// 输出: true

// 1. 栈. 利用栈的特性, 我们模拟以下栈的情况, 当遇到左括号的时候就push, 否则pop, 一旦pop与
// 栈顶不对称, 就return false. 所以时间复杂度为: O(n), 因为储存了n个数字在栈内, 所以空间复杂度为: O(n).
var isValid = function(s) {
  if (s.length % 2 === 1) return false
  const arr = []
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(' || s[i] === '[' || s[i] === '{') {
      arr.push(s[i])
    } else {
      if ((s[i] === ')' && arr[arr.length - 1] !== '(')
      || (s[i] === ']' && arr[arr.length - 1] !== '[')
      || (s[i] === '}' && arr[arr.length - 1] !== '{')) {
        return false
      } else {
          arr.splice(arr.length - 1)
      } 
    }
  }
  if (arr.length === 0) {
    return true
  } else {
    return false
  }
}

// 2. 匹配下标. 网上copy别人的, 精简了很多, 非常好. 时间和空间复杂度没有变化, 而且脱离了栈的思想.
var isValid = function(s) {
  const st = []
  for (let l of s)
    if ((i = "({[]})".indexOf(l)) >- 1) {
      if (st[st.length - 1] + i === 5) {
        st.length--
      } else {
        st.push(i)
      }
    }
  return st.length === 0
};

// 实现一个基本的计算器来计算一个简单的字符串表达式的值。
// 字符串表达式可以包含左括号 ( ，右括号 )，加号 + ，减号 -，非负整数和空格  。(l-224)
// 示例 1:
// 输入: "1 + 1"
// 输出: 2
// 示例 2:
// 输入: " 2-1 + 2 "
// 输出: 3
// 示例 3:
// 输入: "(1+(4+5+2)-3)+(6+8)"
// 输出: 23

// 1. 栈. 因为我们只用考虑加法和减法, 所以题目中的() 还有 space 我们都直接跳过, 当碰见+的时候, 弹出
// 左边的运算结果, 否则就入栈. 遍历一次字符串, 空间复杂度为: O(n), 需要储存之前的运算情况,
// 空间复杂度为: O(n).

var calculate = function(s) {
  1
};