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


/**
 * @param {string} s
 * @return {number}
 */

// leet-code 3.
var lengthOfLongestSubstring = function(s) {
  // hashmap, 用来储存有的字符.
  const map = new Map();

  // 最终输出的最长字符串长度.
  let result = 0;
  // 当前字符串.
  let cur = '';

  for (let i = 0; i < s.length; i++) {
    if (map.get(s[i]) !== undefined && map.get(s[i]) >= map.get(cur[0])) {
      if (cur.length > result) {
        result = cur.length;
      }
      cur = s.slice(map.get(s[i]) + 1, i + 1);
    } else {
      cur = cur + s[i];
    }
    map.set(s[i], i);
  }
  return Math.max(result, cur.length);
};
