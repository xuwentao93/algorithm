
// 在一条环路上有 N 个加油站，其中第 i 个加油站有汽油 gas[i] 升。
// 你有一辆油箱容量无限的的汽车，从第 i 个加油站开往第 i+1 个加油站需要消耗汽油 cost[i] 升。
// 你从其中的一个加油站出发，开始时油箱为空。
// 如果你可以绕环路行驶一周，则返回出发时加油站的编号，否则返回 -1。
// 说明: 如果题目有解，该答案即为唯一答案。(l-134)


// 1. 暴力法. 从每个加油站一次往前推, 汽油不够的时候就不符合, 对于数组的每个数字, 都要遍历一次数组才能知道是否
// 符合条件, 时间复杂度为: O(n²). 空间复杂度为: O(1).
var canCompleteCircuit = function(gas, cost) {
  for (let i = 0; i < gas.length; i++) {
    let sum = 0;
    for (let j = i; j < gas.length; j++) {
      sum = sum + gas[j] - cost[j];
      if (sum < 0) break;
    }
    if (sum < 0) continue;
    for (let j = 0; j < i; j++) {
      sum = sum + gas[j] - cost[j];
      if (sum < 0) break;
    }
    if (sum >= 0) return i;
  }
  return -1;
};

// 2. 一段距离, 加上一个整数, 一定会更大. 当某加油站可以加油的时候, 我们不断向前, 直到出现不能到达的情况,
// 那么说明前面的距离是负数, 我们从这里开始新的一轮行动. 当这个加油站到达数组的末尾的时候, 如果值还是大于 0,
// 计算整个加油站全部过程的油是否大于 0, 大于 0 则返回相应加油站的下标, 否则返回 -1. (讲的有点乱)
// 这样只要循环遍历一次数组, 时间复杂度为: O(n). 仅仅添加了几个记录油量和下标的指针, 空间复杂度为: O(1).

var canCompleteCircuit = function(gas, cost) {
  let sumGas = 0;
  let currentGas = 0;
  let start = 0;

  gas.forEach((station, i) => {
    sumGas = sumGas + station - cost[i];
    currentGas = currentGas + station - cost[i];
    if (currentGas < 0) {
      start = i + 1;
      currentGas = 0;
    }
  })
  return sumGas >= 0 ? start : -1;
};

// 2. 双指针. 我们从头和尾部记录两个指针, 以尾部为循环节点的开头, 从尾部向头部去开. 如果油量不足, 说明起点不对, 
// 那么 end-- (因为正确的起点在任何时刻油的储存量都是大于等于0). 如果大于 0, 那么 start++ 就向前开.
// 时间复杂度为: O(n). 时间复杂度为: O(1).

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

// 给你一个数组 nums 和一个值 val，你需要 原地 移除所有数值等于 val 的元素，并返回移除后数组的新长度。
// 不要使用额外的数组空间，你必须仅使用 O(1) 额外空间并 原地 修改输入数组。
// 元素的顺序可以改变。你不需要考虑数组中超出新长度后面的元素。(l-27)

// 1. 双指针. 将指针移动到修改位置即可. 时间复杂度为: O(n). 空间复杂度为: O(1).
var removeElement = function(nums, val) {
  let point = 0;
  nums.forEach((num) => {
    if (num !== val) nums[point++] = num;
  })
  return point;
};

// 3-22

var canCompleteCircuit = function(gas, cost) {
  let start = gas.length - 1;
  let end = 0;
  let sum = result(start);
  while (start > end) {
    if (sum < 0) sum += result(--start);
    else sum += result(end++);
  }
  return sum < 0 ? -1 : start;

  function result(index) {
    return gas[index] - cost[index];
  }
}

var removeElement = function(nums, val) {
  let point = 0;
  nums.forEach((num) => {
    if (num != val) nums[point++] = num;
  })
  return point;
}