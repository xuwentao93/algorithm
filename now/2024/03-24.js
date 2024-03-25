// dfs.bfs.

/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */

// l - 94 中序遍历
var inorderTraversal = function(root) {
  const result = [];
  dfs(root);
  return result;

  function dfs(dom) {
    if (!dom) {
      return;
    }
    if (dom.left) {
      dfs(dom.left);
    }
    result.push(dom.val);
    dfs(dom.right);
  }
 };

 // l - 98.
 var isValidBST = function(root) {
  let ans = true;
  dfs(root);
  return ans;

  function dfs(tree) {
    if (!tree) {
      return true;
    }
    if (((tree.left && tree.left.val < tree.val) || !tree.left) && ((tree.right && tree.right.val > tree.val) || !tree.right)) {
      let left = dfs(tree.left);
      if (left) {
        dfs(tree.right);
      }
    } else {
      ans = false;
      return false;
    }
  }
 };

var numIslands = function(grid) {
  let ans = 0;
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === '1') {
        dfs(i, j);
        ans++;
      }
    }
  }
  return ans;

  function dfs(i, j) {
    grid[i][j] = '0';
    if (j !== 0 && grid[i][j - 1] === '1') {
      dfs(i, j - 1);
    }
    if (i !== 0 && grid[i - 1][j] === '1') {
      dfs(i - 1, j);
    }
    if (j !== grid[i].length - 1 && grid[i][j + 1] === '1') {
      dfs(i, j + 1);
    }
    if (i !== grid.length - 1 && grid[i + 1][j] === '1') {
      dfs(i + 1, j);
    }
  }
};

var zigzagLevelOrder = function(root) {
  const result = [];

  dfs(root, 0);

  function dfs(tree, level) {
    if (!Array.isArray(result[level])) {
      result.push([]);
    }
    result[level].push(tree.val);
  }
};

class Queue {
  constructor(data) {
    this.length = 0;
    this.last = { next: null, item: null };
    this.first = { next: null, item: null };
    if (data) this.enqueue(data);
  }

  size() {
    return this.length;
  }

  isEmpty() {
    return this.length === 0;
  }

  peek() {
    if (this.isEmpty()) throw new Error('queue is empty!');
    return this.first.item;
  }

  enqueue(item) {
    this.last.item = item;
    this.last.next = { item: null, next: null };
    if (this.isEmpty()) this.first = this.last;
    this.last = this.last.next;
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
