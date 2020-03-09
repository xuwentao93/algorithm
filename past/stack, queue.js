// start 19-12-06

// 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。
// 有效字符串需满足：
// 左括号必须用相同类型的右括号闭合。
// 左括号必须以正确的顺序闭合。
// 注意空字符串可被认为是有效字符串。(l-20)
// 示例 1:
// 输入: "(]"
// 输出: false
// 示例 2:
// 输入: "()[]{}"
// 输出: true

// 1. 栈. 利用栈的特性, 我们模拟以下栈的情况, 当遇到左括号的时候就push, 否则pop, 一旦pop与
// 栈顶不对称, 就return false. 所以时间复杂度为: O(n), 因为储存了n个数字在栈内, 所以空间复杂度为: O(n).
var isValid = function(s) {
  if (s.length % 2 === 1) return false
  const arr = []
  for (let i = 0; i < s.length; i++) {
    if (s[i] === '(' || s[i] === '[' || s[i] === '{') {
      arr.push(s[i])
    } else {
      if ((s[i] === ')' && arr[arr.length - 1] !== '(')
      || (s[i] === ']' && arr[arr.length - 1] !== '[')
      || (s[i] === '}' && arr[arr.length - 1] !== '{')) {
        return false
      } else {
          arr.splice(arr.length - 1)
      } 
    }
  }
  if (arr.length === 0) {
    return true
  } else {
    return false
  }
}

// 2. 匹配下标. 网上copy别人的, 精简了很多, 非常好. 时间和空间复杂度没有变化, 而且脱离了栈的思想.
var isValid = function(s) {
  const st = []
  for (let l of s)
    if ((i = "({[]})".indexOf(l)) >- 1) {
      if (st[st.length - 1] + i === 5) {
        st.length--
      } else {
        st.push(i)
      }
    }
  return st.length === 0
};

// start 19-12-07
// 实现一个基本的计算器来计算一个简单的字符串表达式的值。
// 字符串表达式可以包含左括号 ( ，右括号 )，加号 + ，减号 -，非负整数和空格  。(l-224)
// 示例 1:
// 输入: "1 + 1"
// 输出: 2
// 示例 2:
// 输入: " 2-1 + 2 "
// 输出: 3
// 示例 3:
// 输入: "(1+(4+5+2)-3)+(6+8)"
// 输出: 23

// 1. 栈. 因为我们只用考虑加法和减法, 

var calculate = function(s) {
  if (s === '') return 0
  let stack = []
  const exp = /^[0-9]$/

};

// 给定一个整数序列：a1, a2, ..., an，一个132模式的子序列 ai, aj, ak 被定义为：
// 当 i < j < k 时，ai < ak < aj。设计一个算法，当给定有 n 个数字的序列时，
// 验证这个序列中是否含有132模式的子序列。(l-456)

// 示例1:
// 输入: [1, 2, 3, 4]
// 输出: false
// 输入: [3, 1, 4, 2]
// 输出: true

// 1. 暴力法. 我们找到一个指定的数字, 从数组的第二个位置开始, 如果他的左边有比他小的, 让变量 left 记为true,
// 如果右边有比他小的, 在次过程中又比左边的大, 让他的 right 记为true. 两个同时为true, 则返回True, 否则返回Flase.
// 这样需要的空间复杂度为: O(n³), 空间复杂度为: O(1). (最后超时了)
var find132pattern = function(nums) {
  if (nums.length <= 2) return false
  for (let i = 1; i < nums.length - 1; i++) {
    for (let j = 0; j < i; j++) {
      console.log(1)
      if (nums[j] >= nums[i]) continue
      for (let x = i + 1; x < nums.length; x++) {
        if (nums[i] > nums[x] && nums[x] > nums[j]) return true
      }
      // while (nums[j + 1] > nums[j]) j++
    }
    // while (nums[i + 1] <= nums[i]) i++
  }
  return false
};

// 2. 在暴力法的基础上, 我们知道, 每次循环 i 只会移动一个数字, 我们期望的情况是j最小, 那么记录一个变量去定义
// j, 当移动的时候产生的数字, 比j还小, 那么就替换他, 这样时间复杂度就降低到了O(n²).

var find132pattern = function(nums) {
  if (nums.length <= 2) return false
  let min = nums[0]
  for (let i = 1; i < nums.length - 1; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      if (nums[j] > min && nums[j] < nums[i]) return true
    }
    min = Math.min(min, nums[i])
  }
  return false
};

// 3. 二分法. 在方法2的基础上, 我们可以拷贝一份原数组的复印, 然后排序新的数组. 在寻找left的时候,
// 我们的方式仍然不变, 用一个最小值去寻找, 在寻找right的时候, 我们可以给定要求, 用二分法去寻找, 
// 从而把复杂度从O(n) 降低到了O(logn), 所以最终的时间复杂度为: O(nlogn), 空间复杂度为O(1).

var find132pattern = function(nums) {
  let min = nums[0]
  for (let i = 1; i < nums.length - 1; i++) {
    let left = i + 1
    let right = nums.length - 1
    let mid
    if (nums[mid] > min && nums[mid] < nums[i]) return true
    while (right >= left) {
      mid = Math.floor((left + right) / 2)
      if (nums[mid] >= nums[i] && nums[mid] > min) { // 一定要写, 因为可能出现 nums[i] 小于外面min的情况,
        // 因为外部循环是n的复杂度, 所以把判断加在这里, 可以降低一定的复杂度.
        right = mid - 1
      } else if (nums[mid] < nums[i] && nums[mid] <= min) {
        left = mid + 1
      } else if (nums[mid] > min && nums[mid] < nums[i]) {
        return true
      } else { // 这里就说明了nums[i] < min
        break
      }
    }
    min = Math.min(min, nums[i])
  }
  return false
}

// 4.栈. 继续3的优化.我们是依靠二分法进行搜寻, 他很快, 但过程扔有一定的重复性, 我们可以依靠堆进行搜寻.
// 我们把数组前i项最小的数字存在一个数组min内, 倒叙进行搜索right, 首先确定当前项不是最小的那一个, 
// 然后保持栈内的数据都会比min[i]大, 一但栈顶小于num[i], 就立马返回true.
// 时间复杂度: O(n), 空间复杂度: O(n).

var find132pattern = function(nums) {
  if (nums.length <= 2) return false
  const min = [nums[0]]
  const stack = []
  for (let i = 1; i < nums.length; i++) {
    min[i] = Math.min(min[i - 1], nums[i])
  }
  for (let i = nums.length - 1; i > 0; i--) {
    if (nums[i] > min[i]) {
      while (stack.length !== 0 && stack[stack.length - 1] <= min[i]) {
        stack.pop()
      }
      if (stack.length !== 0 && stack[stack.length - 1] < nums[i]) {
        return true
      }
      stack.push(nums[i])
    }
  }
  return false
}

console.log(find132pattern([2,4,1,3]))

// start 19-12-08

// l-456

var find132pattern = function(nums) {
  if (nums.length < 3) return false
  const stack = []
  const min = [nums[0]]
  for (let i = 1; i < nums.length; i++) {
    min[i] = Math.min(min[i - 1], nums[i])
  }
  for (let i = nums.length - 1; i > 0; i--) {
    if (nums[i] > min[i]) {
      while (stack.length !== 0 && stack[stack.length - 1] <= min[i]) stack.pop()
      if (stack.length !== 0 && stack[stack.length - 1] < nums[i]) return true
      stack.push(nums[i])
    }
  }
  return false
}