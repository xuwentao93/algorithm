// 昨天太累了, 请假一题, 双休日补上.


// 根据每日 气温 列表，请重新生成一个列表，对应位置的输入是你需要再等待多久温度才会升高超过该日的天数。如果之后都不会升高，
// 请在该位置用 0 来代替。
// 例如，给定一个列表 temperatures = [73, 74, 75, 71, 69, 72, 76, 73]，你的输出应该是 [1, 1, 4, 2, 1, 1, 0, 0]。
// 提示：气温 列表长度的范围是 [1, 30000]。每个气温的值的均为华氏度，都是在 [30, 100] 范围内的整数。(l-739)

// 1. 暴力法. 双重循环, 拿当前的温度和后面的每个温度一次比较. 时间复杂度为: O(n²). 空间复杂度为: O(1).

// 2. 栈. 把数组的头部压入栈内(每个压入栈内的元素都要同时记录下标), 对于后面的每一个元素, 如果大于栈顶元素, 则
// 下标差就是所求结果, 否则, 压入栈内. 每个数字最多被压入栈 1 次, 时间复杂度为: O(n). 开辟了一个栈用来记录元素,
// 空间复杂度为: O(n).

var dailyTemperatures = function(T) {
  const stack = [[T[0], 0]];
  const result = Array(T.length).fill(0); // 后续会赋值, 没有被赋值说明没有升温, 就为 0.
  for (let i = 1; i < T.length; i++) { // 用 forEach 每次都要判断栈顶是否是首个元素或者栈顶是否为空.
    while (stack.length != 0 && T[i] > stack[stack.length - 1][0]) { // && 左右的判断语句不能调换, 否则报错.
      result[stack[stack.length - 1][1]] = i - stack[stack.length - 1][1];
      stack.pop();
    }
    stack.push([T[i], i]);
  }
  return result;
};

// 3-19.

var dailyTemperatures = function(T) {
  const stack = [[T[0], 0]];
  const result = Array(T.length).fill(0);
  for (let i = 1; i < T.length; i++) {
    while (stack.length !== 0 && T[i] > stack[stack.length - 1][0]) {
      result[stack[stack.length - 1][1]] = i - stack[stack.length - 1][1];
      stack.pop();
    }
    stack.push([T[i], i]);
  }
  return result;
}