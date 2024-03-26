/**
 * @param {number[]} height
 * @return {number}
 */

// l - 11, 双指针.
var maxArea = function(height) {
  if (height.length <= 1) {
    return 0;
  }
  let left = 0;
  let right = height.length - 1;
  let area = 0;

  while (right > left) {
    area = Math.max(area, (right - left) * (Math.min(height[right], height[left])));

    if (height[right] > height[left]) {
      left++;
    } else {
      right--;
    }
  }

  return area;
};


// l - 42
// 头尾不能有, 从数组下标为 1 的那项开始遍历.
var trap = function(height) {
  let left = 0;
  let right = height.length - 1;
  let leftMax = height[left];
  let rightMax = height[right];
  let sum = 0;

  while (right > left) {
    if (height[left] > height[right]) {
      rightMax > height[right] ? sum += rightMax - height[right--] : rightMax = height[--right];
    } else {
      leftMax > height[left] ? sum += leftMax - height[left++] : leftMax = height[++left];
    }
  }

  return sum;
};
