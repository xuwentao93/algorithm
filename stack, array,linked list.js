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
// 2019-12-2 对昨天留下的不足, 用 hashmap 进行解决. 每一轮内部循环结束, 我们清空一轮map, 所以
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

// 2019-12-2 start yesterday do problems second time. l-11.
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
    for (let j = i + 1; j < nums.length; j++) {
      if (!map.has(nums[j])) {
        map.set(nums[j], j)
      }
      if (map.get(-nums[i] - nums[j]) !== undefined && map.get(-nums[i] - nums[j]) !== j) {
        array.push([nums[i], 0 - nums[i] - nums[j], nums[j]])
      } 
      while (nums[j] === nums[j + 1]) j++
    }
    while (nums[i] === nums[i + 1]) i++
  }
  return array
}

threeSum([-1,0,1,0])