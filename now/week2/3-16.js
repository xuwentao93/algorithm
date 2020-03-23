
// 以 Unix 风格给出一个文件的绝对路径，你需要简化它。或者换句话说，将其转换为规范路径。
// 在 Unix 风格的文件系统中，一个点（.）表示当前目录本身；此外，两个点 （..） 表示将目录切换到上一级(指向父目录);
// 两者都可以是复杂相对路径的组成部分。更多信息请参阅：Linux / Unix中的绝对路径 vs 相对路径
// 请注意，返回的规范路径必须始终以斜杠 / 开头，并且两个目录名之间必须只有一个斜杠 /。
// 最后一个目录名（如果存在）不能以 / 结尾。此外，规范路径必须是表示绝对路径的最短字符串。(l-71)

// 1. (做这道题之前一定要看看官方的多个例子, 不然很容易出错). 栈. 很容易想到的就是, 一个 '/' 进入, 判断栈顶
// 元素是不是 '/', 不是才推入. 一个 '.' 进入, 判断栈顶是不是 '.', 是的话就弹出. 以此类推做出一系列操作.
// 只需要循环遍历一次字符串, 时间复杂度为: O(n). 开辟了一个栈用来储存字符串, 空间复杂度为: O(n).
// 最坏的情况下时间复杂度为O(n²), 即全为字符串最后来个 '..'.

// var simplifyPath = function(path) { (代码有误)
//   const stack = [path[0]];
//   for (let i = 1; i < path.length; i++) {
//     if (path[i] === '/') {
//       if (stack[stack.length - 1] === '/') continue; // 两个 '/' 就不做 push 操作.
//       if (stack[stack.length - 1] === '.') stack.pop(); // 碰见 '.' 说明形成 './' 就弹出.
//       else stack.push(path[i]);
//     } else if (path[i] === '.') {
//       if (path[i + 1] === '.' && path[i + 2] === '.') {
//         while (path[i] === '.') {
//           stack.push('.');
//           i++;
//         }
//       } else if (stack[stack.length - 1] === '.') {
//         stack.pop(); // 碰见两个 '.' 就弹出.
//         while (stack[stack.length - 1] !== '/') stack.pop();
//       } else stack.push(path[i]);
//     } else stack.push(path[i]);
//   }
//   let final = '';
//   stack.forEach((char) => final += char);
//   while (final.length !== 1 && final[final.length - 1] === '/') return final.slice(0, -1); // 最后一个是 '/' 就移除.
//   return final;
// };