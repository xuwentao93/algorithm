// l - 11

var maxArea = function(height) {
  let left = 0, right = height.length - 1;
  let maxArea = 0;
  while (right > left) {
    if (height[right] > height[left]) {
      maxArea = Math.max(maxArea, (right - left) * Math.min(height[right], height[left--]));
    } else {
      maxArea = Math.max(maxArea, (right - left) * Math.min(height[right++], height[left--]));
    }
  }
  return maxArea;
};

// l -41

// 1. 下标作 hash.

var firstMissingPositive = function(nums) {
  if (nums.length === 0) return 1;
  for (let i = 0; i < nums.length; i++) {
    while (nums[i] > 0 && nums[i] !== nums[nums[i] - 1] && nums[i] < nums.length) {
      let temp = nums[i];
      nums[i] = nums[nums[i] - 1];
      nums[temp - 1] = temp;
    }
  }
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] !== i + 1) return i + 1;
  }
  return nums.length + 1;
};

firstMissingPositive([10,7,1,4,5,8]);
