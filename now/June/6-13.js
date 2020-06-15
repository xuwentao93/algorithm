// l - 70

var climbStairs = function(n) {
  if (n <= 2) return n;
  let prev = 1, current = 2;
  for (let i = 3; i <= n; i++) {
    [prev, current] = [current, prev + current];
  }
  return current;
};