class Queue {
  constructor() {
    this.length = 0;
    this.last = { next: null, item: null };
    this.first = null;
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
    }
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

// 面试题 55.
var isBalanced = function(root) {
  return recursion(root) !== -1;
  function recursion(tree) {
    if (tree === null) return 0;
    let left = recursion(tree.left);
    if (left === -1) return -1;
    let right = recursion(tree.right);
    if (right === -1) return -1;
    return Math.abs(left - right) < 2 ? Math.max(left, right) + 1 : -1;
  }
};

// 面试题 26.
var isSubStructure = function(A, B) {
  if (B === null) return false;
  let ans = false;
  findSameStructureTree(A, B);
  return ans;
  function findSameStructureTree(tree, innerTree) {
    if (tree === null || ans) return;
    if (tree.val === innerTree.val) ans = checkIfSame(tree, innerTree);
    findSameStructureTree(tree.left, innerTree);
    findSameStructureTree(tree.right, innerTree);
  }
  function checkIfSame(tree, innerTree) {
    if (innerTree === null) return true;
    if (tree === null && innerTree.val === tree.val) return false;
    return checkIfSame(tree.left, innerTree.left) && checkIfSame(tree.right, innerTree.right);
  }
};

// l - 113
var pathSum = function(root, sum) {
  const ans = [];
  recursion(root, []);
  return ans;
  function recursion(tree, temp) {
    if (tree === null) return;
    if (tree.left === null && tree.right === null) {
      temp.push(tree.val);
      let and = 0;
      temp.forEach(item => and += item);
      if (and === sum) ans.push(Object.assign([], temp));
    }
    temp.push(tree.val);
    recursion(tree.left, temp);
    temp.pop();
    recursion(tree.right, temp);
  }
};

var levelOrder = function(root) {
  const ans = [];
  const queue = new Queue();
  Queue.enqueue(root);
  while (!queue.isEmpty()) {
    const node = queue.dequeue();
    ans.push(node.val);
    if (node.left !== null) queue.enqueue(node.left);
    if (node.right !== null) queue.enqueue(node.right);
  }
  return ans;
};

// l - 112

var hasPathSum = function(root, sum) {
  if (root === null) return [];
  let ans = false;
  recursion(root, []);
  return ans;
  function recursion(tree, temp) {
    if (tree === null || ans === true) return null;
    if (tree.left === null && tree.right === null) {
      temp.push(tree.val);
      const num = 0;
      temp.forEach(item => num += item);
      if (num === sum) ans = true;
      return;
    }
    temp.push(tree.val);
    let left = recursion(tree, temp);
    if (left !== null) temp.pop();
    let right = recursion(tree.right, temp);
    if (right !== null) temp.pop();
  }
};