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