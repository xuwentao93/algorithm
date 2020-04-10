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