// 维护单调栈. l - 739

var dailyTemperatures = function(T) {
  const stack = [[T[0], 0]];
  const result = Array(T.length).fill(0);
  for (let i = 1; i < T.length; i++) {
    while (stack.length !== 0 && T[i] > stack[stack.length - 1][0]) {
      result[stack[stack.length - 1][1]] = i - stack.pop()[1];
    }
    stack.push([T[i], i]);
  }
  return result;
}

// 给定一个经过编码的字符串，返回它解码后的字符串。
// 编码规则为: k[encoded_string]，表示其中方括号内部的 encoded_string 正好重复 k 次。注意 k 保证为正整数。
// 你可以认为输入字符串总是有效的；输入字符串中没有额外的空格，且输入的方括号总是符合格式要求的。
// 此外，你可以认为原始数据不包含数字，所有的数字只表示重复的次数 k ，例如不会出现像 3a 或 2[4] 的输入。(l - 394)


// 1. stack.
var decodeString = function(s) {
  const str_stack = [];
  const num_stack = [];
  let num = 0;
  let str = '';
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '[') {
      str_stack.push(str);
      num_stack.push(num);
      num = 0;
      str = '';
    } else if (s[i] === ']') {
      let temp_num = num_stack.pop();
      let current_str = '';
      for (let i = 0; i < temp_num; i++)  current_str += str;
      str = str_stack.pop() + current_str;
    } else if (s[i] >= '0' && s[i] <= '9') num = num * 10 + +s[i];
    else str += s[i];
  }
  return str;
}