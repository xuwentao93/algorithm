
// 给定一个排序数组，你需要在 原地 删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。
// 不要使用额外的数组空间，你必须在 原地 修改输入数组 并在使用 O(1) 额外空间的条件下完成。(l-26)

// 1. 双指针. 因为是升序, 依次遍历, 相等的置为 null, 第二次循环遍历遇见 null 的时候将下一个非 null 的元素
// 移至最前面的 null. 总共遍历两次数组, 时间复杂度为: O(n). 为开辟新的空间, 空间复杂度为: O(1).

var removeDuplicates = function(nums) {
  if (nums.length <= 1) {
    return nums.length;
  }
  for (let i = 1; i < nums.length; i++) { // 将 nums 数组相同的数字置为 null.
    if (nums[i] === nums[i - 1]) {
      let current = nums[i - 1];
      nums[i] = null;
      i++;
      while (nums[i] === current) {
        nums[i] = null;
        i++;
      }
      i--;
    }
  }
  let pointer = 1;
  for (let i = 1; i < nums.length; i++) { // 数组位置移动.
    while (nums[i] === null) {
      i++;
    }
    if (nums[i] !== undefined) { // 防止数组越界.
      nums[pointer] = nums[i];
      pointer += 1;
    }
  }
  return pointer;
};

// console.log(removeDuplicates([0, 0, 0, 0, 0]));

// 2. 双指针. 方法一中的第一次循环是多余的, 其实可以直接在第二个步骤中完成. 时间复杂度为: O(n). 空间复杂度为: O(1).

var removeDuplicates = function(nums) {
  if (nums.length <= 1) {
    return nums.length;
  }
  let pointer = 1;
  for (let i = 1; i < nums.length; i++) {
    while (nums[i] === nums[i - 1]) {
      i++;
    }
    if (nums[i] !== undefined) {
      nums[pointer++] = nums[i];
    }
  }
  return pointer;
}

// console.log(removeDuplicates([1,1,1,2,2,3,4,5,6,6,6]));

// 3. 官方题解优化. 去 while 循环.


// 给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。
// 示例 1:
// 输入: [1,2,3,4,5,6,7] 和 k = 3
// 输出: [5,6,7,1,2,3,4] (l-189)
// 此题要求用 空间复杂度为: O(1) 的算法完成.

// 1. 暴力法. 每次 unshift 一个数组尾部的数字到数组头部, 并且 pop 数组尾部, 直至达到题目的要求.
// 时间复杂度为: O(n²).

var rotate = function(nums, k) {
  if (nums.length < 2) return;
  if (k >= nums.length) k = k % nums.length;
  if (k === 0) return;
  for (let i = 0; i < k; i++) {
    nums.unshift(nums[nums.length - 1]);
    nums.pop();
  }
}

// 2. 三次反转数组, 移动过于浪费时间, 通过交换数组元素中的位置达到目的. 时间复杂度为: O(n).

var rotate = function(nums, k) {
  if (nums.length < 2) return;
  if (k >= nums.length) k = k % nums.length;
  if (k === 0) return;
  reverse(nums, 0, nums.length - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, nums.length - 1);
  function reverse(nums, start, end) {
    while (start < end) {
      [nums[start], nums[end]] = [nums[end], nums[start]];
      start++;
      end--;
    }
  }
}

// 将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 (l-21)
// 示例：
// 输入：1->2->4, 1->3->4
// 输出：1->1->2->3->4->4

// 1. 直接添加即可(迭代), 时间复杂度为: O(m+n). 空间复杂度为: O(1).

var mergeTwoLists = function(l1, l2) {
  if (l1 === null) return l2; // 下面有过判断, 所以这两行可以不要.
  if (l2 === null) return l1;
  const merge = {};
  if (l1.val < l2.val) {
    merge.val = l1.val;
    l1 = l1.next;
  } else {
    merge.val = l2.val;
    l2 = l2.next;
  }
  let pointer = merge;
  while (l1 !== null && l2 !== null) {
    pointer.next = {};
    if (l1.val < l2.val) {
      pointer.next.val = l1.val;
      l1 = l1.next;
    } else {
      pointer.next.val = l2.val;
      l2 = l2.next;
    }
    pointer = pointer.next;
  }
  if (l1 === null) { // 以下可以合并成两行.
    pointer.next = l2;
    return merge;
  }
  if (l2 === null) {
    pointer.next = l1;
    return merge;
  }
};

// const l1 = {
//   val: 1,
//   next: {
//     val: 2,
//     next: {
//       val: 4,
//       next: null
//     }
//   }
// };

// const l2 = {
//   val: 1,
//   next: {
//     val: 3,
//     next: {
//       val: 4,
//       next: null
//     }
//   }
// }

// console.log(mergeTwoLists(l1, l2));

// 2. 递归. 时间复杂度为: O(m + n). 空间复杂度为: O(m + n).

var mergeTwoLists = function(l1, l2) {
  if (l1 === null) return l2;
  if (l2 === null) return l1;

  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2);
    return l1;
  } else {
    l2.next = mergeTwoLists(l2.next, l1);
    return l2;
  }
}

// 给你两个有序整数数组 nums1 和 nums2，请你将 nums2 合并到 nums1 中，使 num1 成为一个有序数组。(l-88)

// 1. 暴力法. 直接将两个数组合并, 然后排序, 这样假设数组 nums1 的长度为 k, 时间复杂度为: O(klogk). 空间复杂度为: O(1).
var merge = function(nums1, m, nums2, n) {
  nums1.splice(m, 0, ...nums2.splice(0, n));
  nums1.splice(m + n, nums1.length);
  nums1.sort((x, y) => x - y);
};

// 2. 双指针. 在 nums1 和 nums2 的 m, n 处设置两个指针, 比较两个数的大小, 较大的移至 nums1 的尾部处.
// 这样只要把要移动的项遍历一次即可. 时间复杂度为: O(m + n). 空间复杂度为: O(1), 仅添加了两个指向数组某处
// 的指针.
var merge = function(nums1, m, nums2, n) {
  let p1 = m - 1;
  let p2 = n - 1;
  for (let i = m + n - 1; i >= 0; i--) {
    if ((nums1[p1] > nums2[p2] || p2 === -1) && p1 !== -1) {
      nums1[i] = nums1[p1]; // p1-- 可以写在这里.
      p1--;
    } else {
      nums1[i] = nums2[p2]; // p2-- 可以写在这里.
      p2--;
    }
  }
}

// leetcode most votes 上的题解参照其代码重写.

// 3-11 second time.
// 26.

var removeDuplicates = function(nums) {
  let pointer = 1;
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] !== nums[i - 1]) nums[pointer++] = nums[i];
  }
  return pointer;
}

var rotate = function(nums, k) {
  if (k >= nums.length) k %= nums.length;
  if (k === 0 || nums.length <= 1) return;
  reverse(nums, 0, nums.length - 1);
  reverse(nums, 0, k - 1);
  reverse(nums, k, nums.length - 1);
  function reverse(nums, start, end) {
    while (end > start) {
      [nums[start], nums[end]] = [nums[end], nums[start]];
      start++;
      end--;
    }
  }
}

// 21.

var mergeTwoLists = function(l1, l2) {
  if (l1 === null) return l2;
  if (l2 === null) return l1;
  const merge = {};
  let pointer = merge;
  while (l1 !== null && l2 !== null) {
    if (l1.val < l2.val) {
      pointer.val = l1.val;
      l1 = l1.next;
    } else {
      pointer.val = l2.val;
      l2 = l2.next;
    }
    pointer.next = {};
    pointer = pointer.next;
  }
  if (l1 === null) {
      pointer.val = l2.val;
      pointer.next = l2.next;
  } else {
      pointer.val = l1.val;
      pointer.next = l1.next;
  }
  return merge;
}

// 88

var merge = function(nums1, m, nums2, n) {
  let p1 = m - 1;
  let p2 = n - 1;
  for (let i = m + n - 1; i >= 0; i--) {
    if (p2 === -1) return;
    if (nums2[p2] > nums1[p1] || p1 === -1) nums1[i] = nums2[p2--];
    else nums1[i] = nums1[p1--];
  }
}

// 3-11 end.