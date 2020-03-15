// leetcode 周赛.

// 1.

var luckyNumbers  = function(matrix) {
  const nums = [];
  matrix.forEach((rowList) => {
    let min = rowList[0];
    let line = 0;
    rowList.forEach((number, index) => {
      if (number < min) {
        min = number;
        line = index;
      }
    })
    let max = min;
    for (let i = 0; i < matrix.length; i++) {
      max = Math.max(max, matrix[i][line]);
    }
    if (max === min) nums.push(max);
  })
  return nums;
};

console.log(luckyNumbers([[3,7,8],[9,11,13],[15,16,17]]));