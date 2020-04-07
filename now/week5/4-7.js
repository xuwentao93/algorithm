// 给定一个 没有重复 数字的序列，返回其所有可能的全排列。(l - 46)
// 1. 回溯. 在每次访问的时候, 判断数组是否访问过, 访问过的数字跳过.

var permute = function(nums) {
  if (nums.length === 0) return [];
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
      }
    }
  }
};