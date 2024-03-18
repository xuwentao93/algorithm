/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */

//  letCode 2 两数相加.
var addTwoNumbers = function(l1, l2) {
  // 进位.
  let carry = 0;

  function add(val, val2 = 0) {
    const num = val + val2 + carry;

    if (num >= 10) {
      carry = 1;
      return num - 10;
    }
    carry = 0;
    return num;
  }

  const ans = {
    val: add(l1.val, l2.val)
  };

  // 当前指针, 用来在 ans 里面添加 next 属性.
  let point = ans;
  l1 = l1.next;
  l2 = l2.next;

  while (l1 || l2) {
    if (l1 && l2) {
      point.next = {
        val: add(l1.val, l2.val)
      };
      point = point.next;
      l1 = l1.next;
      l2 = l2.next;
    } else if (l1 && !l2) {
      point.next = {
        val: add(l1.val)
      };
      point = point.next;
      l1 = l1.next;
    } else {
      point.next = {
        val: add(l2.val)
      };
      point = point.next;
      l2 = l2.next;
    }
  }

  if (carry === 1) {
    point.next = {
      val: 1,
      next: null
    };
  } else {
    point.next = null;
  }

  return ans;
};
