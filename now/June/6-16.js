// 给定一个字符串，找到它的第一个不重复的字符，并返回它的索引。如果不存在，则返回 -1。(l - 387)
// 提示：你可以假定该字符串只包含小写字母。


// 很显然用 hashmap, 时间复杂度为: O(n). 空间复杂度为: O(n).
var firstUniqChar = function(s) {
  const map = new Map();
  for (let i = 0; i < s.length; i++) {
    if (map.get(s[i])) map.set(s[i], map.get(s[i]) + 1);
    else map.set(s[i], 1);
  }
  for (let i = 0; i < s.length; i++) {
    if (map.get(s[i]) === 1) return i;
  }
  return -1;
};


// 因为是字母, 所以我们可以枚举所有字母, 判断 s 中是否有该字母, 如果有, 从头和尾寻找该字母,
// 判断下标是否相同, 相同的话说明是唯一的字符, 在找到字符的最小下标即可.
// 时间复杂度为: O(n). 空间复杂度为: O(1).
var firstUniqChar = function(s) {
  const min = s.length; // 之后的 index 一定不可能大于 s.length.
  for (let ch of 'qwertyuiopasdfghjklzxcvbnm') {
    const index = s.indexOf(ch);
    if (ch !== -1 && index === s.lastIndexOf(ch)) min = Math.min(index, min);
  }
  return min === s.length ? -1 : min;
}