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