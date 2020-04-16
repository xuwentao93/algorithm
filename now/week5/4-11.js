// 1. 四数之和. l - 18

var fourSum = function(nums, target) {
  const result = [];
  if (nums.length < 4) return [];
  nums.sort((x, y) => x - y);
  for (let i = 0; i < nums.length - 3; i++)  {
    for (let j = i + 1; j < nums.length - 2; j++) {
      let left = j + 1, right = nums.length - 1;
      let ans = target - nums[i] - nums[j];
      while (left < right) {
        if (nums[left] + nums[right] === ans) {
          result.push([nums[i], nums[j], nums[left], nums[right]]);
          while (left !== nums.length - 1 && nums[left] === nums[left + 1]) left++;
          left++;
        } else if (nums[left] + nums[right] < ans) {
          while (left !== nums.length - 1 && nums[left] === nums[left + 1]) left++;
          left++;
        } else {
          while (right !== 0 && nums[right] === nums[right - 1]) right --;
          right--;
        }
      }
      while (nums[j] === nums[j + 1]) j++;
    }
  }
  return result;
};

console.log(fourSum([-1,-5,-5,-3,2,5,0,4], -7));

// l - 887.

var superEggDrop = function(K, N) {
  // if (K === 1) return N;
  // let ans = -1;
  // for (let i = 0; true; i++) {
  //   if (Math.pow(2, i) <= N && Math.pow(2, i + 1) > N) {
  //     ans = i;
  //     break;
  //   }
  // }
  let time = 0;
  while (K !== 1) {
    time++;
    N = N >> 1;
    K--;
  }
  return time + N;
};