// module.exports = {
//     a: 1
// }
// // exports.a = 1
// this.b = 2

function a() { // 此时的a函数是属于全局作用域，里面的this相当于浏览器的window
    console.log(this);
}
a()