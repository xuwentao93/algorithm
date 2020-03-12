
// 给你一个整数数组 A，只有可以将其划分为三个和相等的非空部分时才返回 true，否则返回 false。
// 形式上，如果可以找出索引 i+1 < j 且满足 (A[0] + A[1] + ... + A[i] == A[i+1] + A[i+2] + ... + A[j-1] == A[j] + A[j-1] + ... + A[A.length - 1]) 就可以将数组三等分。
// 输出：[0,2,1,-6,6,-7,9,1,2,0,1]
// 输出：true
// 解释：0 + 2 + 1 = -6 + 6 - 7 + 9 + 1 = 2 + 0 + 1(l-1013)

// 1. 暴力法. 依次遍历找出所有可能性. 总共有 3 重循环, 时间复杂度为: O(n³). 空间复杂度为: O(1).
var canThreePartsEqualSum = function(A) {
  if (A.length <= 2) return false;
  let sumLeft = 0;
  for (let i = 0; i < A.length -2; i++) {
    sumLeft+= A[i];
    let sumMiddle = 0;
    for (let j = i + 1; j < A.length - 1; j++) {
      sumMiddle += A[j];
      if (sumMiddle === sumLeft) {
        let sumRight = 0;
        for (let k = j + 1; k < A.length; k++) {
          sumRight += A[k];
        }
        if (sumRight === sumMiddle) return true;
      }
    }
  }
  return false;
};

// console.log(canThreePartsEqualSum([1,1,1]));

// 2. 双指针. (网上大佬牛逼算法) 考虑到三个部分的和相同, 那么整个数组的和一定是三的倍数, 不然就直接返回
// false. 否则从两头加入两个指针向中间找, 当左部指针或者右部指针不为 sum / 3, 就往中间移动, 同时为 sum / 3 说明
// 中间的部分也为 sum / 3. 时间复杂度为: O(n). 空间复杂度为: O(1).

var canThreePartsEqualSum = function(A) {
  if (A.length <= 2) return false;
  let sum = 0;
  for (let i = 0; i < A.length; i++) sum += A[i];
  if (sum % 3 !== 0) return false;
  let pLeft = 0;
  let pRight = A.length - 1;
  let leftSum = A[0];
  let RightSum = A[A.length - 1];
  while (pLeft + 1 < pRight) {
    if (leftSum === sum / 3 && RightSum === sum / 3) return true;
    if (leftSum !== sum / 3) {
      pLeft++;
      leftSum += A[pLeft];
    }
    if (RightSum !== sum / 3) {
      pRight--;
      RightSum += A[pRight];
    }
  }
  return false;
}

// 3. 计算数组中和为 sum / 3 的个数, 如果大于 3 那么也能得出结果. 时间复杂度为: O(n). 空间复杂度为: O(1).

// 3-12 second time.

var canThreePartsEqualSum = function(A) {
  if (A.length <= 2) return false;
  let sum = 0;
  for (let i = 0; i < A.length; i++) sum += A[i];
  if (sum % 3 !== 0) return false;
  let pLeft = 0, pRight = A.length - 1;
  let sumLeft = A[0], sumRight = A[pRight];
  while (pLeft + 1 < pRight) {
    if (sumLeft === sum / 3 && sumRight === sum / 3) return true;
    if (sumLeft !== sum / 3) {
      pLeft++;
      sumLeft += A[pLeft];
    }
    if (sumRight !== sum / 3) {
      pRight--;
      sumRight += A[pRight];
    }
  }
  return false;
}