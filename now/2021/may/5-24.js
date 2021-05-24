
// l - 415.

var addStrings = function(num1, num2) {
  function reverse(str) {
    return str.split('').reverse().join('');
  }

  if (num2.length > num1.length) [num1, num2] = [num2, num1];
  num1 = reverse(num1);
  num2 = reverse(num2);
  let carry = 0;
  let result = '';
  for (let i = 0; i < num2.length; i++) {
    let sum = +num1[i] + +num2[i] + carry;
    carry = 0;
    if (sum < 10) result += sum;
    else {
      result += sum - 10;
      carry = 1;
    }
  }
  if (num2.length === num1.length) return carry === 1 ? reverse(result + '1') : reverse(result);
  else {
    if (carry === 1) {
      for (let i = result.length; i < num1.length; i++) {
        if (carry + +nums1[i] > 10) {
          result += '0';
        } else {
          result += (+nums[i] + carry);
          carry = 0;
        }
      }
      if (carry === 1) result += '1';
      return reverse(result);

      // reverse(result + num1.slice(-(num1.length - num2.length - reduce)))
    } else {
    return reverse(result + num1.slice(num2.length - num1.length));
    }
  }
};

addStrings('9999', '99999999');