const linkTest = 
  { val: 1, next: { val: 2, next: { val: 3, next: { val: 4, next: { val: 5, next: null } } } } }

// 给定 n 个非负整数 a1，a2，...，an，每个数代表坐标中的一个点 (i, ai) 。
// 在坐标内画 n 条垂直线，垂直线 i 的两个端点分别为 (i, ai) 和 (i, 0)。
// 找出其中的两条线，使得它们与 x 轴共同构成的容器可以容纳最多的水。 (leetcode 11)

// 1. 暴力法. 找出所有水的可能, 从第一个柱子开始循环, 列出最大的面积, 再从第二个柱子开始循环,
// 列出最大的面积. 时间复杂度: O(n²), 空间复杂度: O(1).
// 2019-12-1 start

var maxArea = function(height) {
  let max = 0
  for (let i = 0; i< height.length - 1; i++) {
    for (let j = i + 1; j < height.length; j++) {
      max = Math.max(max, (j - i) * Math.min(height[i], height[j]))
    }
  }
  return max
}

// 2. 双指针法. 选取两头的指针, 他们是最大的宽度, 舍弃掉短的高度的那一端, 往中间去挪动, 从而
// 获取高度更大的直线组成区域的面积. 时间复杂度: O(n), 空间复杂度: O(1).

var maxArea = function(height) {
  let max = 0 // 注意标量要定义在外面, 避免在循环内部多次定义而消耗额外的时间.
  let minHeight = 0
  for (let i = 0, j = height.length - 1; i < j; true) {
    minHeight = height[i] < height[j] ? height[i++] : height[j--] // 可以直接在这里挪动下标.
    max = Math.max(max, (j - i + 1) * minHeight)
  } 
  return max
}

// 给定一个包含 n 个整数的数组 nums，判断 nums 中是否存在三个元素 a，b，c ，
// 使得 a + b + c = 0 ？找出所有满足条件且不重复的三元组。
// 注意：答案中不可以包含重复的三元组。(leetcode 15)

// 1. 暴力法, 这里就不写了, 时间复杂度很明显: O(n³).
// 2. 利用Map数据结构(由两数之和演变), 降低1轮循环, 利用空间去换取时间. 时间复杂度: O(n²), 空间复杂度: O(n).
// 但由于题目要求返回原因, 最后还是timeout了.(差不多也接近n³了)

var threeSum = function(nums) {
  const map = new Map()
  const array = []
  const StringList = []
  let bool = true
  let x, y, z
  map.set(nums[0], 0)
  for (let i = 0; i < nums.length; i++) {
    for (let j = i + 1; j < nums.length; j++) {
      const has = map.get(0 - nums[i] - nums[j])
      if (has !== undefined && has != i) {
        x = Math.min(0 - nums[i] - nums[j], nums[i], nums[j])
        z = Math.max(0 - nums[i] - nums[j], nums[i], nums[j])
        y = 0 - x - z

        for (let str = 0; str < StringList.length; str++) {
          if (StringList[str] === `${x}${y}${z}`) {
            bool = false
            break
          }
        }
        if (bool) {
          StringList.push(`${x}${y}${z}`)
          array.push([x, y, z])
        }
        bool = true
      }
    }
    map.set(nums[i], i)
  }
  return array
}

// 3. 双指针法. 先排序(O(nlogn)), 在固定值, 用双指针往中间寻找的方式去搜索.时间复杂度: O(n²). 空间复杂度: O(1).
// 这个思路有点难度.

var threeSum = function(nums) {
  nums.sort((x, y) => x - y)
  const array = []
  for (let k = 0; k < nums.length; k++) {
    if (nums[k] > 0) break
    for (let x = k + 1, y = nums.length - 1; x < y; true) {
      if (nums[k] > 0) break
      if (nums[k] + nums[x] + nums[y] > 0) {
        while (nums[y] === nums[y - 1]) y--
        y--
      } else if (nums[k] + nums[x] + nums[y] < 0) {
        while (nums[x] === nums[x + 1]) x++
        x++
      } else {
        array.push([nums[k], nums[x], nums[y]])
        while (nums[y] === nums[y - 1]) y--
        y--
        while (nums[x] === nums[x + 1]) x++
        x++
      }
    }
    while (nums[k] === nums[k + 1]) k++
  }
  return array
}

// 4. 目前针对方法2进行优化, 交给明天了, 实在花太多时间了.
// 2019-12-02 对昨天留下的不足, 用 hashmap 进行解决. 每一轮内部循环结束, 我们清空一轮map, 所以
// 很显然, 时间复杂度为O(n²), 空间复杂度为O(n).

var threeSum = function(nums) {
  let array = []
  nums.sort((x, y) => x - y) // 不得不排序去避免未知的重复push.
  if (nums.length < 2) return array
  for (let i = 0; i < nums.length - 2; i++) {
    const map = new Map()
    for (let j = i + 1; j < nums.length; j++) {
      map.set(nums[j], j)
      if (map.get(-nums[i] - nums[j + 1]) !== undefined) {
        array.push([nums[i], 0 - nums[i] - nums[j], nums[j]])
      } 
      while (nums[j] === nums[j + 1]) j++
    }
    while (nums[i] === nums[i + 1]) i++
  }
  return array
}

// 给定一个排序数组，你需要在原地删除重复出现的元素，使得每个元素只出现一次，返回移除后数组的新长度。
// 不要使用额外的数组空间，你必须在原地修改输入数组并在使用 O(1) 额外空间的条件下完成。(leetcode 26)

// 1.暴力法. 遍历删除. 时间复杂度: O(n²). 你不需要考虑数组中超出新长度后面的元素。
// (Array.prototype.slice() 这个方法理论上要O(n)的空间复杂度)

var removeDuplicates = function(nums) {
  for (let i = nums.length - 2; i >= 0; i--) {
    if (nums[i] === nums[i + 1]) nums.splice(i + 1, 1)
  }
  return nums.length
};

// 2. 在上述中做一些改动, 既然删除很消耗时间, 那么为什么不换序? 把所有的序号都换好后, 一次性
// 删除所有的尾巴, 这样删除也只要O(1)的时间复杂度. 所以最后的空间复杂度为: O(n),
// 因为不要而外的开辟空间, 只需定义一个(有点类似于移动零)的指针, 所以最后空间复杂度为: O(1).

var removeDuplicates = function(nums) {
  let k = 1 // 无重复项, 指针向前移动一位.
  for (let i = 0; i < nums.length - 1; i++) {
    while (nums[i] === nums[i + 1] && i != nums.length - 1) i++
      nums[k] = nums[i + 1]
      k++
  }
  nums.splice(k)
  if (nums[nums.length - 1] === undefined) nums.splice(nums.length - 1) // 注意各种边界问题, 以及产生的原因.
  return nums.length
}

// 给定一个数组，将数组中的元素向右移动 k 个位置，其中 k 是非负数。
// 示例 1:
// 输入: [1,2,3,4,5,6,7] 和 k = 3
// 输出: [5,6,7,1,2,3,4]
// 解释:
// 向右旋转 1 步: [7,1,2,3,4,5,6]
// 向右旋转 2 步: [6,7,1,2,3,4,5]
// 向右旋转 3 步: [5,6,7,1,2,3,4]
// 要求使用空间复杂度为 O(1) 的 原地 算法。(leetcode 189)

// 1. 暴力法, 通过循环k次来达到目标. 因为 unshift 要移动所有数组位置, 所以时间复杂度为: O(kn)(k足够大为n²).

var rotate = function(nums, k) {
  for (let i = 0; i < k; i++) {
    nums.unshift(nums[nums.length - 1])
    nums.pop(nums[k])
  }
}

// 2. 交换法. 那移动数组麻烦, 那就交换. 时间复杂度: O(n).

var rotate = function(nums, k) {
  let mid
  if (nums.length == 1) return nums
  k = k % nums.length // 避免k > nums.length 的问题.
  reverse(nums, 0, nums.length - 1)
  reverse(nums, 0, k - 1)
  reverse(nums, k, nums.length - 1)
  function reverse(array, start, end) {
    while(end > start) {
      mid = array[start]
      array[start] = array[end]
      array[end] = mid
      end--
      start++
    }
  }
}

// 2019-12-1 end

// 2019-12-02. l-11.
var maxArea = function(height) {
  let max = 0
  let left = 0
  let right = height.length - 1
  for (true; left < right; true) {
    max = Math.max(max, (right - left + 1) * Math.min(height[left], height[right]))
    height[left] > height[right] ? right-- : left++
  }
  return max
}

// l-15.

var threeSum = function(nums) {
  nums.sort((x, y) => x - y)
  const array = []
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) return array
    for (let x = i + 1, y = nums.length - 1; x < y; true) {
      if (nums[x] + nums[y] + nums[i] > 0) {
        while(nums[y] === nums[y - 1]) y--
        y--
      } else if (nums[x] + nums[y] + nums[i] < 0) {
        while(nums[x] === nums[x + 1]) x++
        x++
      } else {
        array.push([nums[i], nums[x], nums[y]])
        while(nums[x] === nums[x + 1]) x++
        x++
        while(nums[y] === nums[y - 1]) y--
        y--
      }
    }
    while (nums[i] === nums[i + 1]) i++
  }
  return array
}



var threeSum = function(nums) {
  let array = []
  nums.sort((x, y) => x - y) // 不得不排序去避免未知的重复push.
  for (let i = 0; i < nums.length - 2; i++) {
    const map = new Map()
    for (let j = 0; j < nums.length; j++) {
      const has = map.get(-nums[i] - nums[j])
      if (has !== undefined) {
        array.push([nums[i], -nums[i] - nums[j], nums[j]])
      }
      map.set(nums[j], j)
      while (nums[j] === nums[j++]) j++
    }
    while (nums[i] === nums[i + 1]) i++
  }
  return array
}

// 2019-12-02 end

// 2019-12-03 start

// 将两个有序链表合并为一个新的有序链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的.(l-21)
// 示例：
// 输入：1->2->4, 1->3->4
// 输出：1->1->2->3->4->4
// 此题需要额外说明, 输入的是两个对象, val表示当前值, next属性是下一个对象.

// 1. 直接比较两个对象的next属性对应对象的val值的大小, 把拼接对象的 next 指向小的那一个.
// 这样两个链表都要遍历一次, 所以时间复杂度为O(n1 + n2), 空间复杂度为O(1), 创造了一个next指针, 而且最后释放了.
var mergeTwoLists = function(l1, l2) {
  const merge = { next: {} }
  let next = merge
  if (l1 === null) return l2
  if (l2 === null) return l1
  while (l1 !== null || l2 !== null) {
    if (l2 === null || l1 === null) {
      const obj = l1 === null ? l2 : l1
      next.val = obj.val
      next.next = obj.next
      return merge
    } else if (l1.val <= l2.val) {
      next.val = l1.val
      l1 = l1.next
      next.next = { next: {} }
      next = next.next
    } else {
        next.val = l2.val
        l2 = l2.next
        next.next = { next: {} }
        next = next.next
    }
  }
  return merge
}

// 递归. 直接调用自己即可. 时间复杂度显然为O(m + n), 空间复杂度因为递归原因遗留, 也是O(m + n)
var mergeTwoLists = function(l1, l2) {
  if (l1 === null) return l2
  if (l2 === null) return l1
  if (l1.val < l2.val) {
    l1.next = mergeTwoLists(l1.next, l2)
    return l1
  } else {
    l2.next = mergeTwoLists(l2.next, l1)
    return l2
  }
}

// 给定两个有序整数数组 nums1 和 nums2，将 nums2 合并到 nums1 中，使得 num1 成为一个有序数组。
// 说明: 初始化 nums1 和 nums2 的元素数量分别为 m 和 n。
// 你可以假设 nums1 有足够的空间（空间大小大于或等于 m + n）来保存 nums2 中的元素。(l-88)
// 示例:
// 输入:
// nums1 = [1,2,3,0,0,0], m = 3
// nums2 = [2,5,6],       n = 3
// 输出: [1,2,2,3,5,6]

// 1.暴力法. 每次插入进行比较nums[i] nums[i + 1] nums[j] 三者的大小, nums[j] 小的话就插入,
// 从nums[2]中移除, 所以时间复杂度为O(m + n)(最好的情况下为O(Math.min(m, n))), 
// 而每次插入nums[1] 都要移动n个位置, 所以最终时间复杂度为O(n(m + n)), 不需要开辟新的空间, 所以空间复杂度为O(1).

// 2. 复制排序. 将nums[1]直接复制在nums[2]后面, 排序后替换掉原数组前面 m + n 个位置. 那么最后的空间复杂度
// 即为排序的空间复杂度: O((m + n)log(m + n))).(排序的时间复杂度) 因为复制了数组1, 所以空间复杂度为: O(n)

var merge = function(nums1, m, nums2, n) {
  for (let i = 0; i < m; i++) {
      nums2.push(nums1[i])
  }
  nums2.sort((x, y) => x - y)
  for (let i = 0; i < m + n; i++) {
      nums1[i] = nums2[i]
  }
}

// 3. 双指针法. 之前思考过顺序替换, 由于换来换去最后构成逻辑过于复杂, 那么就直接倒序更改, 
// 这样改动后的数字, 一定在自己原来的位置上. 时间复杂度: O(m + n), 空间复杂度: O(1).

var merge = function(nums1, m, nums2, n) {
  let i = m - 1
  let j = n - 1
  let k = m + n - 1
  while(i >=0 && j>=0)
  {
    if(nums1[i] > nums2[j])
    nums1[k--] = nums1[i--]
    else
    nums1[k--] = nums2[j--]
  }
  while(j >= 0)
  nums1[k--] = nums2[j--]
}

// 给定一个链表，两两交换其中相邻的节点，并返回交换后的链表。
// 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。(l-24)
// 示例:
// 给定 1->2->3->4, 你应该返回 2->1->4->3.

// 1. 迭代. 如下别人代码, 不要修改原来的变量指向, 用.next去实现. 时间复杂度为: O(n), 空间复杂度为: O(n).
// 用了很多变量指向, 最大空间消耗为4n.

var swapPairs = function(head) {
  let target = {next: head}
  let pre = target
  pre.next = head
  let cur, next, temp
  while (pre.next && pre.next.next){
    cur = pre.next
    next = cur.next
    temp = next.next
    cur.next = temp
    next.next = cur
    pre.next = next
    pre = cur
  }
  return target.next
};
// end 19-12-03

// start 19-12-04

// 2. 递归, 参考网上的题解. 时间复杂度为: O(n), 因为在执行过程中有一大堆 tmp 无法释放, 
// 所以空间复杂度为: O(n²).

var swapPairs = function(head) {
  if(head == null || head.next == null) {
    return head
  }
  let tmp = head.next
  head.next = swapPairs(tmp.next)
  tmp.next = head
  return tmp
}

// l-21

var mergeTwoLists = function(l1, l2) {
  if (l1 === null) return l2
  if (l2 === null) return l1
  if (l1.val > l2.val) {
    l2.next = mergeTwoLists(l1, l2.next)
    return l2
  } else {
    l1.next = mergeTwoLists(l1.next, l2)
    return l1
  }
}

// l-88

var merge = function(nums1, m, nums2, n) {
  while (m > 0 && n > 0) {
    if (nums1[m - 1] > nums2[n - 1]) {
      nums1[m + n - 1] = nums1[m-- -1]
    } else {
      nums1[m + n - 1] = nums2[n-- -1]
    }
  }
  if (m === 0) {
    while (n > 0) {
      nums[n - 1] = nums[n-- -1] 
    }
  }
}

// 给出两个 非空 的链表用来表示两个非负的整数。其中，它们各自的位数是按照 逆序 的方式存储的，并且它们的
// 每个节点只能存储一位数字。如果，我们将这两个数相加起来，则会返回一个新的链表来表示它们的和。
// 您可以假设这两个数都不会以 0 开头。(l-2)
// 示例：
// 输入：(2 -> 4 -> 3) + (5 -> 6 -> 4)
// 输出：7 -> 0 -> 8
// 原因：342 + 465 = 807。


// 1. 暴力法. 遍历两个链表, 将两个链表相加得到的数字存入一个数组, 在循环数组, 如果大于等于10则减10, 
// 左边那个数字加1, 最后新建一个链表循环获取数组的各项. 所以最后要循环3次, 每次的时间复杂度规模相同,
// 所以最终的时间复杂度为: O(n), 因为加了个数组存值, 所以空间复杂度为: O(n).
var addTwoNumbers = function(l1, l2) {
  const sumList = []
  let cur = 0
  let sum
  const merge = {}
  let cursor = merge
  while (l1 !== null && l2 !== null) {
    sum = l1.val + l2.val
    l1 = l1.next
    l2 = l2.next
    sumList[cur++] = sum
  }
  if (l1 !== null || l2 !== null) {
    let s = l1 === null ? l2 : l1
    while (s !== null) {
      sum = s.val
      s = s.next
      sumList[cur++] = sum
    }
  }
  for (let i = 0; i < sumList.length - 1; i++) {
    if (sumList[i] >= 10) {
      sumList[i] -= 10
      sumList[i + 1] += 1
    }
  }
  if (sumList[sumList.length - 1] >= 10) {
    sumList.push(1)
    sumList[sumList.length - 2] -= 10
  }
  for (let i = 0; i < sumList.length; i++) {
    cursor.val = sumList[i]
    if (i === sumList.length - 1) {
      cursor.next = null
      return merge
    } else {
      cursor.next = {}
      cursor = cursor.next
    }
  }
  return merge
};

// 2. 在上述中开辟了数组去储存空间, 实际上可以只开辟一个整型数组去储存, 这样空间复杂度为: O(1).
// 给明天的任务: 上述过程空间复杂度虽然是O(n), 但是感觉有重复过程冗余, 尝试降低1轮循环或者在
// 循环中的判断条件, 同时空间复杂度必须为O(1).

// 反转从位置 m 到 n 的链表。请使用一趟扫描完成反转。(l-92)

// 说明:
// 1 ≤ m ≤ n ≤ 链表长度。
// 示例:
// 输入: 1->2->3->4->5->NULL, m = 2, n = 4
// 输出: 1->4->3->2->5->NULL

// 1. 暴力迭代. 第一次循环的时候, 找到m, n以及m的父节点(m = 1 的时候为外部定义的一个节点),
// 将所有对象都存到一个数组内部, 第二次循环用迭代的方式一一获取. 所以时间复杂度为: O(n),
// 空间复杂度为: O(n).

var reverseBetween = function(head, m, n) {
  if (m === n) {
    return head
  }
  const arr = []
  let node = { next: head }
  let cur = node
  for (let i = 0; i < m - 1; i++) { // 定位m.
    cur = cur.next
  }
  let cut = cur
  // 循环完之后, cur.next 即为m, 记录下cur.
  for (let i = 0; i < n - m + 2; i++) {
    arr[i] = cur.next
    cur = cur.next
  }
  // 复制完毕, 接下来准备赋值.
  cut.next = arr[3]
  for (let i = 0; i < n - m + 1; i++) {
    cut.next = arr[n - m - i]
    cut = cut.next
  }
  cut.next = arr[arr.length - 1] // 尾指针指向末尾.
  if (m === 1) return arr[arr.length - 2] // m 为头节点的情况, 需要注意.
  return head
};

// end 19-12-04

// start 19-12-05

// 给你一个链表，每 k 个节点一组进行翻转，请你返回翻转后的链表。
// k 是一个正整数，它的值小于或等于链表的长度。
// 如果节点总数不是 k 的整数倍，那么请将最后剩余的节点保持原有顺序。(l-25)
// 示例 :
// 给定这个链表：1->2->3->4->5
// 当 k = 2 时，应当返回: 2->1->4->3->5
// 当 k = 3 时，应当返回: 3->2->1->4->5
// 说明 :
// 你的算法只能使用常数的额外空间。
// 你不能只是单纯的改变节点内部的值，而是需要实际的进行节点交换。

// 1. 迭代. 这题本质上就是基于上题(l-92)的空间复杂度优化. 之前思路的卡点在于, 如果不储存空间, 
// 指针指向最后个对象的时候, 他的上一级对象找不到了, 所以现在更换一种思路, 把这个对象的next指针
// 的对象保留在一个变量中, 同时让他的指针回指他的上一级对象, 在用变量继续进行下一级的相同操作.
// 最后, 12345 会变成 4指向3, 3指向2, 2指向1, 1指向2. 所以我们还需要把m的上一级节点的指针指向
// 4(即n), 把2(即(m)这个next对象的指针指向5(原先n的下一个节点). 这样, 在时间复杂度不变的情况下,
// 空间复杂度降低到了O(1). 而这题无非就是拆分反转, 时间复杂度仍然为O(n).

var reverseKGroup = function(head, k) {
  if (head === null) return head
  if (head.next === null) return head // leetcode 题目描述错误, 按道理head 的长度应该大于等于1.
  if (k === 1) return head
  let point = head
  let sum = 1
  while (point.next) { // 获取head内部有多少个对象.
    point = point.next
    sum++
  }
  let n = Math.floor(sum / k) // 操作的次数.
  const dummy = { next: head }
  let cur = dummy
  let prev = cur.next // 第一个节点
  let next = prev.next // 第二个节点
  let last = next.next // 第三个节点
  while (n-- > 0) {
    for (let j = 0; j < k - 1; j++) { // 每一次, 把perv, next, last 向下级推移, 同时将下级对象的next
      // 指向上级. 需要注意边界问题.
      next.next = prev
      prev = next
      next = last
      last = last ? last.next : null
    }
    let getPoint = cur.next
    cur.next = prev // 把原先的头节点的上一级的节点指向现在的头节点.
    getPoint.next = next // 把原先的头节点, 现在的尾节点指向原先尾节点的next.
    if (n === Math.floor(sum / k)) dummy.next = cur
    cur = getPoint // 进行下一轮循环的头节点的上一级节点.
    if (n === 0) return dummy.next // 防止null.next 报错.
    prev = next
    next = last
    last = last ? last.next : null
  }
  return dummy.next
};

// console.log(reverseKGroup(linkTest, 2))


// end 19-12-05

// start 19-12-07

// l-25
var reverseKGroup = function(head, k) {
  if (k === 1) return head
  if (head === null) return head
  if (head.next === null) return head
  let point = head
  let sum = 1
  while (point.next) {
    point = point.next
    sum++
  }
  let n = Math.floor(sum / k)
  const dummy = { next: head }
  let cursor = dummy
  let prev = cursor.next
  let mid = prev.next
  let last = mid.next
  while (n-- > 0) {
    for (let i = 0; i < k - 1; i++) {
      mid.next = prev
      prev = mid
      mid = last
      last = last ? last.next : null
    }
    let getPoint = cursor.next
    cursor.next = prev
    getPoint.next = mid
    cursor = getPoint
    if (n === 0) return dummy.next
    prev = mid
    mid = last
    last = last ? last.next : null
  }
  return dummy.next
}

// 合并 k 个排序链表，返回合并后的排序链表。请分析和描述算法的复杂度。(l-23)
// 示例:
// 输入:
// [
//   1->4->5,
//   1->3->4,
//   2->6
// ]
// 输出: 1->1->2->3->4->4->5->6

// 1.逐一比较. 把每个数组的首项, 存在一个数组中, 遍历数组最小值, 用其.next替代, 当为null的时候则移出
// 数组. 这样要遍历所有链表, 我们假设有m个链表, 链表的总结点为n, 每次又要遍历数组, 
// 所以时间复杂度为: O(mn), 开辟了一个储存首项的数组, 所以空间复杂度为: O(m).
var mergeKLists = function(lists) {
  const arr = []
  const midwire = []
  lists.forEach(item => {
    if (item !== null) {
      midwire.push(item)
    }
  })
  lists = midwire
  lists.forEach((item, index) => { // 初始化arr.
    if (item === null) {
      arr.push(item.val)
    } else {
      lists.splice(index, 1)
    }
  })
  if (arr.length === 0) { // arr没有值, 说明lists是空数组, 或者内部还有的对象next属性的值全为null.
    return null
  }
  const sum = { next: null }
  let cursor = sum
  let t = findMin(arr)
  while (t) { // 开始循环
    cursor.next = { val: t[0], next: null }
    cursor = cursor.next
    if (lists[t[1]].next) {
      arr[t[1]] = lists[t[1]].next.val
      lists[t[1]] = lists[t[1]].next
    } else {
      arr.splice(t[1], 1)
      lists.splice(t[1], 1)
    }
    t = findMin(arr)
  }

  function findMin(arr) { // 找到数组中最小的值, 如果数组中没有值就返回false, 否则返回数组最小值的值和下标.
    if (arr.length === 0) return false
    let min = [arr[0], 0]
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] < min[0]) {
        min = [arr[i], i]
      }
    }
    return min
  }
  return sum.next
};

// 2. 暴力法. 遍历所有lists节点, 全部都存在一个数组里面, sort 这个数组, 逐一添加到
// 最终要合并的对象上, 遍历需要O(n)的时间, 排序需要O(nlogn)的时间, 新生成的数组,
// 为所有的节点的值的总数. 所以时间复杂度为: O(nlogn), 空间复杂度为: O(n).

// 3. 两两合并. 我们之前做过合并两个链表的问题, 将多个链表转化成k - 1个次两个链表的问题,
// 最后他的时间复杂度会接近O(kn), 因为直接在第一个链表上操作, 所以空间复杂度为: O(1).

// 4. 分治法. 针对方法3进行优化, 如果都合并到一个链表当中, 那么肯定有很多次优化会重复, 我们没必要浪费
// 那么多重复, 每次要做的只是合并当中的两个链表, 把1和2合并, 3和4合并, 第一次执行得到 2/k 个链表,
// 第二次执行得到 4/k 个链表, 如此重复, 上述问题的时间复杂度就从O(kn)降低到了O(nlog(k)).

// var mergeKLists = function(lists) {
//   if (lists === null) return null
//   else if (lists.length === 0) return null
//   else if (lists.length === 1) return lists[0]
//   for (let i = 1; i < lists.length; true) { // 通过修改lists.length, 当长度到1的时候循环停止.
//     for (let j = 0; j < Math.floor(lists.length / 2); j++) {
//       lists[j] = mergeTwoLists(lists[j * 2], lists[j * 2 + 1])
//     }
//     lists.length = Math.floor((lists.length + 1) / 2)
//   }
//   return lists[0]
// }

// end-19-12-07

//start-19-12-08

// l-11
var maxArea = function(height) {
  let left = 0
  let right = height.length - 1
  let max = 0
  let minHeight
  while (right > left) {
    minHeight = height[right] > height[left] ? height[left++] : height[right--]
    max = Math.max((right - left + 1) * minHeight, max)
  }
  return max
}

// l-15
var threeSum = function(nums) {
  const arr = []
  if (nums.length < 3) return arr
  nums.sort((x, y) => x - y)
  for (let i = 0; i < nums.length; i++) {
    if (nums[i] > 0) return arr
    let left = i + 1
    let right = nums.length - 1
    while (x < y) {
      if (nums[i] + nums[left] + nums[right] > 0) {
        while (nums[right] === nums[right - 1]) right--
        right--
      } else if (nums[i] + nums[left] + nums[right] < 0) {
        while (nums[left] === nums[left + 1]) left++
        left++
      } else {
        arr.push([nums[i], nums[left], nums[right]])
        while (nums[right] === nums[right - 1]) right--
        while (nums[left] === nums[left + 1]) left++
        right--
        left++
      }
    }
    while (nums[i] === nums[i + 1]) i++
  }
  return arr
}

// l-26

var removeDuplicates = function(nums) {
  let cursor = 1
  for (let i = 1; i < nums.length; i++) {
    if (nums[i] != nums[i - 1]) {
      nums[cursor++] = nums[i]
    }
  }
}

// end 19-12-08