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

// l - 200, bfs.
var numIslands = function(grid) {
  let ans = 0;
  const queue = new Queue();
  for (let i = 0; i < grid.length; i++) {
    for (let j = 0; j < grid[i].length; j++) {
      if (grid[i][j] === '1') {
        ans++;
        queue.enqueue({ i, j });
        bfs();
      }
    }
  }

  function bfs() {
    while (!queue.isEmpty()) {
      const { i, j } = queue.dequeue();
      grid[i][j] = '0';
      if (j !== 0 && grid[i][j - 1] === '1') {
        queue.enqueue({ i, j: j - 1 });
      }
      if (i !== 0 && grid[i - 1][j] === '1') {
        queue.enqueue({ i: i - 1, j });
      }
      if (j !== grid[i].length - 1 && grid[i][j + 1] === '1') {
        queue.enqueue({ i, j: j + 1 });
      }
      if (i !== grid.length - 1 && grid[i + 1][j] === '1') {
        queue.enqueue({ i: i + 1, j });
      }
    }
  }

  return ans;
}

var decorateRecord = function(root) {
  const queue = new Queue();
  queue.enqueue(root);
  const result = [];

  let dom;
  while (!queue.isEmpty()) {
    dom = queue.dequeue();
    result.push(dom.val);
    if (dom.left) {
      queue.enqueue(dom.left);
    }
    if (dom.right) {
      queue.enqueue(dom.right);
    }
  }

  return result;
};