// l - 912. 排序算法.

// 1. 冒泡排序. 两两交换, 时间复杂度 O(n²).
var sortArray = function(nums) {
  for (let i = 0; i < nums.length; i++) {
    for (let j = i; j < nums.length - 1 - i; j++) {
      if (nums[j] > nums[j + 1]) [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
    }
  }
};

// 2. 更近的冒泡排序, 记录更新的最后位置.

var sortArray = function(nums) {
  let i = nums.length - 1;
  while (i > 0) {
    let end = 0;
    for (let j = 0; j < i; j++) {
      if (nums[j] > nums[j + 1]) {
        end = j;
        [nums[j], nums[j + 1]] = [nums[j + 1], nums[j]];
      }
    }
    i = end;
  }
  return nums;
}

// 3. 选择排序. 找最大和最小的放在数组最后面, 最前面. 不写了.

// 4. 插入排序. 时间复杂度 O(n²).

var sortArray = function(nums) {
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[i - 1]) continue;
    if (nums[i] <= nums[0]) {
      nums.unshift(nums[i]);
      nums.splice(i + 1, 1);
    }
    else {
      let start = 0;
      let end = i - 1;
      let mid;
      while (end >= start) {
        mid = ~~ (start + end) >> 1;
        if (nums[i] > nums[mid + 1]) start = mid + 1;
        else if (nums[i] < nums[mid - 1]) end = mid - 1;
        else if (nums[i] < nums[mid]) break;
        else {
          mid = mid + 1;
          break;
        }
      }
      nums.splice(mid, 0, nums[i]);
      nums.splice(i + 1, 1);
    }
  }
  return nums;
}

// 5. 希尔排序. 


// 6. 归并排序.

var sortArray = function(nums) {
  if (nums.length < 2) return nums;
  let mid = ~~ nums.length >> 1;
  const left = nums.slice(0, mid);
  const right = nums.slice(mid);
  return merge(sortArray(left), sortArray(right));
}

function merge(left, right) {
  const result = [];
  while(left.length && right.length) {
    if (left[0] < right[0]) result.push(left.shift());
    else result.push(right.shift());
  }
  if (left.length !== 0) result.push(...left);
  if (right.length !== 0) result.push(...right);
  return result;
}

// 7. 快速排序.
var sortArray = function(nums) {
  quickSort(0, nums.length - 1, nums);
  return nums;
}

function quickSort(start, end, nums) {
  if (start >= end) return;
  const pivot = nums[end];
  let count = start;
  for (let i = start; i < end; i++) {
    if (nums[i] < pivot) {
      [nums[count], nums[i]] = [nums[i], nums[count]];
      count++;
    }
  }
  [nums[count], nums[end]] = [nums[end], nums[count]];
  quickSort(start, count - 1, nums);
  quickSort(count + 1, end, nums);
}

console.log(sortArray([5,2,3,1]));
