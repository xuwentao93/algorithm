// 二分法.


/**
 * // This is the MountainArray's API interface.
 * // You should not implement it, or speculate about its implementation
 * function MountainArray() {
 *     @param {number} index
 *     @return {number}
 *     this.get = function(index) {
 *         ...
 *     };
 *
 *     @return {number}
 *     this.length = function() {
 *         ...
 *     };
 * };
 */

/**
 * @param {number} target
 * @param {MountainArray} mountainArr
 * @return {number}
 */

// l-1095, 山脉数组.
var findInMountainArray = function(target, mountainArr) {
  const l = mountainArr.length();
  
  let end = l - 1;
  let start = 0;
  let mid;
  let top;
  while (end >= start) {
    mid = ~~ ((end + start) / 2);
    if (mid === 0) {
      mid = 1;
    }
    const leftNum = mountainArr.get(mid - 1);
    const midNum = mountainArr.get(mid);
    const rightNum = mountainArr.get(mid + 1);
    if (midNum > leftNum && midNum > rightNum) {
      top = mid;
      break;
    } else if (midNum > leftNum) {
      start = mid + 1;
    } else {
      end = mid - 1;
    }
  }

  start = 0;
  end = top;

  while (end >= start) {
    mid = ~~ ((end + start) / 2);
    const result  = mountainArr.get(mid);

    if (result > target) {
      end = mid - 1;
    } else if (result < target) {
      start = mid + 1;
    } else {
      return mid;
    }
  }

  start = top;
  end = l - 1;

  while (end >= start) {
    mid = ~~ ((end + start) / 2);
    const result  = mountainArr.get(mid);

    if (result < target) {
      end = mid - 1;
    } else if (result > target) {
      start = mid + 1;
    } else {
      return mid;
    }
  }

  return -1;
};

function mountain(array) {
  return {
    length() {
      return array.length;
    },
    get(i) {
      return array[i];
    }
  }
}

// console.log(findInMountainArray(0, mountain([3, 5, 3, 2, 0])));

// l - 300.
var lengthOfLIS = function(nums) {
  if (nums.length <= 1) return nums.length;
  let cur = 0;

  // 要维护一个新的递增数组, 直接用原始数组最前面替换, 减少空间.
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] > nums[cur]) {
      // 
      nums[++cur] = nums[i];
    } else {
      let left = 0;
      let right = cur;
      let mid;
      let pos = -1;
      const current = nums[i];
      // 找不到就说明所有的数都比 nums[i] 大.
      while (left <= right) {
        mid = ~~ ((left + right) >> 1);
        if (nums[mid] < current) {
          pos = mid;
          left = mid + 1;
        } else {
          right = mid - 1;
        }
      }
      nums[pos + 1] = current;
    }
  }

  return cur + 1;
};


// l - 35.

var searchInsert = function(nums, target) {
  let left = 0;
  let right = nums.length - 1;
  let mid;
  let pos = 0;

  while (left <= right) {
    mid = ~~ ((left + right) >> 1);
    if (nums[mid] < target) {
      left = mid + 1;
      pos = left;
    } else {
      right = mid - 1;
    }
  }
  return pos;
};