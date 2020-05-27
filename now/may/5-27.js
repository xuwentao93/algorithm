// 给出一个 32 位的有符号整数，你需要将这个整数中每位上的数字进行反转。(l - 7)

// 1. 转字符串进行翻转.

var reverse = function(x) {
  let str = '';
  let char = '+';
  let result = '';
  if (x < 0) {
    str = (x + '').slice(1);
    char = '-';
  }
  else str = x + '';
  while (str[str.length - 1] === '0') str = str.slice(0, -1);
  for (let i = str.length - 1; i >= 0; i--) {

    result[str.length - 1 - i] = str[i];
  }
  if (char === '-') result = '-' + result;
  return +result;
};


// 2. 直接翻转.
var reverse = function(x) {
  const MAX_INT = 2147483647; // 2 的 31 次方, 在其它语言中他减去 1 是 int 类型的最大值.
  const MIN_INT = -2147483648; // 2 的 31 次方, 在其它语言中他减去 1 是 int 类型的最大值.
  let result = 0;
  while (x !== 0) {
    let pop = x % 10;
    x = Math.floor(x / 10);
    if (result > MAX_INT / 10 || (result === MAX_INT) && pop > 7) return 0;
    if (result < -MIN_INT / 10 || (result === -MIN_INT / 10 && pop < -8)) return 0;
    result = result * 10 + pop;
  }
  return result;
}


// 给定一个链表，删除链表的倒数第 n 个节点，并且返回链表的头结点。 (l - 19)

// 1. 迭代. 开辟储存空间都数组.

var removeNthFromEnd = function(head, n) {
  const ans = head;
  const list = [ans];
  while (head.next) {
    list.push(head.next);
    head = head.next;
  }
  if (list.length === 1) {
    return null;
  }
  if (list.length === 2) {
    if (n === 1) {
      ans.next = null;
      return ans;
    }
    else return list[1];
  }
  if (list.length === n) return list[1];
  list[list.length - n - 1].next = list[list.length - n + 1];
  return ans;
};

// 3. 使用双指针(快慢指针), 第一个指针先移动 n + 1 步, 然后两个指针同时移动, 等第一个指针指向 null,
// 说明第二个指针的位置是要删除的位置.