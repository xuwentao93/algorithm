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

// const queue = new Queue();

// queue.enqueue(1);
// console.log(Object.assign({}, queue));
// queue.enqueue(2);
// queue.enqueue(3);
// queue.enqueue(4);
// queue.enqueue(5);
// for (let i = 0; i < 5; i++) {
//   queue.dequeue();
// }
// for (let i = 0; i < 5; i++) {
//   queue.enqueue(i);
// }
// console.log(Object.assign({}, queue));