// md5特点 摘要算 不叫加密算法 (加密 必须得解密 但是 md5无法反解释 )

// 1) 两段不同的内容 摘要出的结果的长度相同
// 2) 如果传入的内容不同输出的结果不同  雪崩效应 （传入的东西一样结果一样 ）
// 3) md5 不可逆


const crypto = require('crypto'); // 内置模块

// 根据用户输入的值  和我的 表 做对比 如果比对一样了 说明这个值被撞到了
// 多从md5 》 3次

// update 方法里可以放buffer和字符串
console.log(crypto.createHash('md5').update('1214').digest('base64'))
console.log(crypto.createHash('md5').update('12').update('34').digest('base64'))



// 如果文件过大则不合适 , 大小长度也可以

