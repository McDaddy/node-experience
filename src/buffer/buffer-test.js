// const arrayBuffer = new ArrayBuffer(4); // 字节  4 * 8
// console.log("arrayBuffer", arrayBuffer)
// let x = new Uint8Array(arrayBuffer); // []
// console.log("x", x)
// x[0] = 1;
// x[1] = 255; // [1, 255, 0, 0]
// //  00000000     0000000    1111111100000001
// let x2 = new Uint16Array(arrayBuffer); //  16  2
// console.log(x2); // [65281, 0]
// let x3 = new Uint32Array(arrayBuffer); //  16  2
// console.log(x3); // [65281]


// base64 是如何转换出来的  数据传递  替代url  node不支持gbk编码 只支持utf8  转化的结果比以前大1/3
// Buffer.from('xx') 可以得到内容对应的编码结构
let r = Buffer.from('韡');
console.log(r) // e9 9f a1   3*8
console.log(0xe9.toString(2)); // 得到三个字节的二进制
console.log(0x9f.toString(2));
console.log(0xa1.toString(2));

// 接下来是base64关键的一步， 它会把3 * 8 变成 4 * 6的字节组合，保证每个字节都是6位
// // 11101001  10011111  10100001   // 将 3 * 8的格式 拆分成 4 * 6
// 得到4位的十进制
console.log(parseInt('111010', 2)) // 58
console.log(parseInt('011001', 2))// 25
console.log(parseInt('111110', 2)) // 62
console.log(parseInt('100001', 2)) // 33

// str是64位所有的内容，所有的内容都将由这64位中的内容替换
let str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'
str+=str.toLowerCase();
str+='0123456789+/';

console.log(str[58] + str[25] + str[62] + str[33]);  // 6Z+h
console.log(Buffer.from('韡').toString('base64')) // 6Z+h
console.log(Buffer.from('韡').toString()) // 6Z+h
// 同样的方法去计算字母a的base64编码
// utf8编码是 0x61
// 二进制是parseInt('61', '16').toString(2) = 00000001100001 结果是两个字节分割一下就是 000000 011000 010000 最后的01后面用0填补
// 第一位是24 第二位16就是YQ 然后不足6 * 4的部分会用=来填补
console.log(Buffer.from('a').toString('base64')) // YQ==