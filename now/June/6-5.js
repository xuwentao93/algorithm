// N 对情侣坐在连续排列的 2N 个座位上，想要牵到对方的手。 计算最少交换座位的次数，以便每对情侣可以并肩坐在一起。 
// 一次交换可选择任意两人，让他们站起来交换座位。
// 人和座位用 0 到 2N-1 的整数表示，情侣们按顺序编号，第一对是 (0, 1)，第二对是 (2, 3)，以此类推，最后一对是 (2N-2, 2N-1)。
// 这些情侣的初始座位  row[i] 是由最初始坐在第 i 个座位上的人决定的。(l - 765)

// 1. 贪心. 能换就换, 同时用异或运算. 时间复杂度为: O(n²). 空间复杂度为: O(1).
var minSwapsCouples = function(row) {
  let ans = 0;
  for (let i = 0; i < row.length; i += 2) {
    if (row[i + 1] !== (row[i] ^ 1)) {
      for (let j = i + 1; j < row.length; j++) {
        if (row[j] === (row[i] ^ 1)) {
          [row[i + 1], row[j]] = [row[j], row[i + 1]];
          ans + 1;
          break;
        }
      }
    }
  }
  return ans;
}

// 2. 贪心 + hashmap. 在每次搜索的时候, 我们经常进行重复性的搜索, 因为数组中的数各不相同, 所以我们
// 讲数组后续中搜索过的数存在一个 hashmap 中, 避免重复性的搜索. 时间复杂度为: O(n). 空间复杂度为: O(n).

var minSwapsCouples = function(row) {
  let ans = 0;
  let num = 0;
  const map = new Map();

  for (let i = 0; i < row.length; i += 2) {
    num = Math.max(num, i + 1);
    if (row[i + 1] !== (row[i] ^ 1)) {
      const index = map.get(row[i] ^ 1);
      if (index !== undefined) {
        [row[i + 1], row[index]] = [row[index], row[i + 1]];
        map.set(row[index], index);
        ans++;
        continue;
      }
      for (let j = num; j < row.length; j++) {
        map.set(row[j], j);
        if (row[j] === (row[i] ^ 1)) {
          [row[i + 1], row[j]] = [row[j], row[i + 1]];
          ans++;
          map.set(row[j], j);
          num = j;
          break;
        }
      }
    }
  }
  return ans;
}

// l - 134.

var canCompleteCircuit = function(gas, cost) {
  let start = gas.length - 1;
  let end = 0;
  let sum = result(start);
  while (start > end) {
    if (sum >= 0) sum += result(end++);
    else sum += result(--start);
  }
  return sum < 0 ? -1 : start;

  function result(index) {
    return gas[index] - cost[index];
  }
}
