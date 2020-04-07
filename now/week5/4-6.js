// 给定一个可包含重复数字的序列，返回所有不重复的全排列。(l - 47)

// 1. 回溯.
var permuteUnique = function(nums) {
  if (nums.length === 0) return [];
  nums.sort((x, y) => x - y);
  const visited = Array(nums.length).fill(false);
  const temp = [];
  const ans = [];
  trackback(temp);
  return ans;
  function trackback(current) {
    if (current.length === nums.length) {
      ans.push(JSON.parse(JSON.stringify(current)));
      return;
    }
    let cutpointer = null;
    for (let i = 0; i < nums.length; i++) {
      if (!visited[i]) {
        visited[i] = true;
        current.push(nums[i]);
        trackback(current);
        current.pop();
        visited[i] = false;
        while (i + 1 < nums.length && nums[i] === nums[i + 1]) {
          i++;
        }
      }
    }
  }
};

console.log(permuteUnique([1,1,2, 3, 4]));

var permuteUnique = function(nums) {
  if (nums.length === 0) {
    return [];
  }
  nums.sort((x, y) => x - y);
  const ans = [];
  const visited = Array(nums.length).fill(false);
  const res = [];
  trackback(res);
  return ans;
  function trackback(temp) {
    if (temp.length === nums.length) {
      const currentResult = JSON.parse(JSON.stringify(temp));
      ans.push(currentResult);
      return;
    }
    for (let i = 0; i < nums.length; i++) {
      if (!visited[i]) {
        visited[i] = true;
        temp.push(nums[i]);
        trackback(temp);
        temp.pop();
        visited[i] = false;
        while (i < nums.length - 1 && nums[i] === nums[i + 1]) {
          i++;
        }
      }
    }
  }
}