// 给定 n 个非负整数，用来表示柱状图中各个柱子的高度。每个柱子彼此相邻，且宽度为 1 。
// 求在该柱状图中，能够勾勒出来的矩形的最大面积。(l-84)

// 1. 暴力法. 三重循环解决. 两次循环遍历面积, 一次用来找最小值. 时间复杂度为: O(n³). 时间复杂度为: O(1).

// 2. 优化的暴力. 第二次遍历求面积的时候就记录最小值. 时间复杂度为: O(n²). 时间复杂度为: O(1).

var largestRectangleArea = function(heights) {
  let maxArea = 0;
  heights.forEach((height, index) => {
    let minHeight = height;
    for (let i = index + 1; i < heights.length; i++) {
      minHeight = Math.min(minHeight, heights[i]);
      maxArea = Math.max(maxArea, minHeight * (i - index + 1));
    }
  })
  return maxArea;
};

// 3-21
// 3. 栈(单调栈). 如果说, 当柱状是递增的时候, 我们能很容易确定这一块的最大面积. 我们现在用栈记录这些递增的柱子, 
// 当有连续的柱状呈现递增, 突然遇到一根柱子比较小, 我们就开始计算左边的面积, 同时移除栈顶元素保证栈中的元素
// 仍然呈现递增的关系. 每个元素只会出栈入栈一次, 时间复杂度为: O(n). 栈最多会记录接近一个数组的长度, 空间复杂度为: O(n).

var largestRectangleArea = function(heights) {
  const stack = [-1];
  let maxArea = 0;
  for (let i = 0; i < heights.length; ++i) {
    while (stack[stack.length - 1] !== -1 && stack[stack.length - 1] >= heights[i]) {
      let height = heights[stack[stack.length - 1]];
      maxArea = Math.max(maxArea, height * (i - stack.pop() - 1));
    }
    stack.push(i);
  }
  while (stack[stack.length - 1] !== -1) {
    let height = heights[stack[stack.length - 1]];
    maxArea = Math.max(maxArea, height * (heights.length - stack.pop() - 1));
  }
  return maxArea;
}