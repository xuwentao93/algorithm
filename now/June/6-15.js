// n 皇后问题研究的是如何将 n 个皇后放置在 n×n 的棋盘上，并且使皇后彼此之间不能相互攻击。(l - 52)

// 1. 回溯法. n 皇后问题即八皇后问题, 用回溯法即可解决. time complexity: O(n!), space complexity: O(N).
// 处于同一个撇上, row + col 相同, 处于同一个捺上, row - col 相同.

var totalNQueens = function(n) {
  const rows = Array(n).fill(false);
  const hills = Array(2 * n).fill(false);
  const dales = Array(2 * n).fill(false);
  function trackback(row, count) {
    for (let col = 0; col < n; col++) {
      if (!dales[row + col] && !hills[row - col + n] && !rows[col]) {
        rows[col] = true;
        dales[row + col] = true;
        hills[row - col + n] = true;
        if (row === n - 1) count++;
        else count = trackback(row + 1, count);
        rows[col] = false;
        dales[row + col] = false;
        hills[row - col + n] = false;
      }
    }
    return count;
  }
  return trackback(0, 0);
}

// n 皇后问题. 返回结果. (l - 52). 时空复杂度如上.
var solveNQueens = function(n) {
  const rows = Array(n).fill(false);
  const hills = Array(2 * n).fill(false);
  const dales = Array(2 * n).fill(false);
  let str = '';
  for (let i = 0; i < n; i++) {
    str += '.';
  }
  const ans = [];
  trackback(0, []);
  function trackback(row, result) {
    if (row === n) {
      ans.push(Object.assign([], result));
      return;
    }
    for (let col = 0; col < n; col++) {
      if (!rows[col] && !hills[row - col + n] && !dales[row + col]) {
        rows[col] = true;
        hills[row - col + n] = true;
        dales[row + col] = true;
        result.push(str.slice(0, col) + 'Q' + str.slice(col + 1));
        trackback(row + 1, result);
        rows[col] = false;
        dales[row + col] = false;
        hills[row - col + n] = false;
        result.pop();
      }
    }
  }
  return ans;
}


class Queue {
  constructor(data) {
    this.length = 0;
    this.first = null;
    this.last = { next: null, item: null };
    if (data) this.enqueue(data);
  }

  size() {
    return this.length;
  }

  isEmpty() {
    return this.first === null || this.first.next === null;
  }

  peek() {
    if (this.isEmpty()) throw new Error('queue is empty!');
    return this.first.item;
  }

  enqueue(item) {
    if (this.isEmpty()) this.first = {
      next: this.last,
      item
    };
    else {
      this.last.item = item;
      this.last.next = { item: null, next: null };
      this.last = this.last.next;
    }
    this.length++;
  }

  dequeue() {
    if (this.isEmpty()) throw new Error('queue is empty!');
    const { item } = this.first;
    this.first = this.first.next;
    this.length--;
    return item;
  }
}

// leetcode 面试题 32.

var levelOrder = function(root) {
  if (root === null) return [];
  const ans = [];
  const queue = new Queue(root);
  while (!queue.isEmpty()) {
    const node = queue.dequeue();
    ans.push(node.val);
    if (node.left !== null) queue.enqueue(node.left);
    if (node.right !== null) queue.enqueue(node.right);
  }
  return ans;
}

// l - 198
var rob = function(nums) {
  if (nums.length === 0) return 0;
  if (nums.length === 1) return nums[0];
  let prev = nums[0], cur = Math.max(nums[0], nums[1]);
  for (let i = 2; i < nums.length; i++) {
    [prev, cur] = [cur, Math.max(prev + nums[i], cur)];
  }
  return cur;
};

// l - 120.
// 1. 自顶向下的动态规划.
var minimumTotal = function(triangle) {
  // if (triangle.length === 1) return triangle[0][0];
  for (let i = 1; i < triangle.length; i++) {
    for (let j = 0; j < triangle[i].length; j++) {
      if (j === 0) triangle[i][j] += triangle[i - 1][j];
      else if (j === triangle[i].length - 1) triangle[i][j] += triangle[i - 1][j - 1];
      else triangle[i][j] += Math.min(triangle[i - 1][j - 1], triangle[i - 1][j]);
    }
  }
  let min = Infinity;
  for (let i = 0; i < triangle[triangle.length - 1].length; i++) {
    min = Math.min(triangle[triangle.length - 1][i], min);
  }
  return min;
};


// 如果连续数字之间的差严格地在正数和负数之间交替，则数字序列称为摆动序列。第一个差（如果存在的话）可能是正数或负数。
// 少于两个元素的序列也是摆动序列。例如， [1,7,4,9,2,5] 是一个摆动序列，因为差值 (6,-3,5,-7,3) 是正负交替出现的。
// 相反, [1,4,7,2,5] 和 [1,7,4,5,5] 不是摆动序列，第一个序列是因为它的前两个差值都是正数，第二个序列是因为它的最后一个差值为零。
// 给定一个整数序列，返回作为摆动序列的最长子序列的长度。 通过从原始序列中删除一些（也可以不删除）元素来获得子序列，
// 剩下的元素保持其原始顺序。(l - 376)

// 1. 动态规划. 我们维护一个 dp 数组, 他的每项都为一个包含 add 和 reduce 的属性的对象, 来记录到当前项时
// 正负摆动的最大值, 最后, dp 中的最大项即为所求. 时间复杂度为: O(n²), 对于数组中的每一项, 都要往前遍历每个数字.
// 空间复杂度为: O(n), 我们开辟了一个 dp 的数组来维护.
var wiggleMaxLength = function(nums) {
  if (nums.length === 0) return 0;
  const dp = [];
  for (let i = 0; i < nums.length; i++) {
    dp.push({
      add: 1,
      reduce: 1
    });
  }
  for (let i = 1; i < nums.length; i++) {
    for (let j = 0; j < i; j++) {
      if (nums[i] > nums[j]) {
        dp[i].add = Math.max(dp[i].add, dp[j].reduce + 1);
      } else if (nums[i] < nums[j]) {
        dp[i].reduce = Math.max(dp[i].reduce, dp[j].add + 1);
      }
    }
  }
  let max = 1;
  for (let i = 0; i < dp.length; i++) {
    max = Math.max(max, Math.max(dp[i].add, dp[i].reduce));
  }
  return max;
};

wiggleMaxLength([1,7,4,9,2,5]);
