// 维护单调栈. l - 739

var dailyTemperatures = function(T) {
  const stack = [[T[0], i]];
  const result = Array(T.length).fill(0);
  for (let i = 1; i < T.length; i++) {
    if (T[i] <= stack[stack.length - 1][0]) stack.push([T[i], i]);
    else {
      while (T[i] > stack[stack.length - 1][0] && stack.length !== 0) {
        result[stack[stack.length - 1][1]] = i - stack.pop()[1];
      }
      stack.push([T[i], i]);
    }
  }
  return result;
}