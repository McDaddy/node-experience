// 文件基于流进行了封装 封装了基于文件的可读流和可写流

const fs = require('fs');
// const ReadStream = require('./ReadStream')
const path = require('path');
//   内部是继承了stream模块 并且基于 fs.open fs.read fs.close方法
let rs = fs.createReadStream(path.resolve(__dirname,'test.txt'),{
// let rs = new ReadStream(path.resolve(__dirname, 'test.txt'), {
    flags: 'r', // 创建可读流的标识是r  读取文件
    encoding: null, // 编码默认null 则输出buffer 也可以是utf8
    autoClose:false, //  读取完毕后自动关闭
    start: 0, // 包前又包后 字节数
    end: 13,
    // 2 4 
    highWaterMark: 2 // 12 34 5  如果不写默认是64*1024
});
rs.on('error', function(err) {
    console.log('error', err)
})
rs.on('open', function(fd) { // rs.emit('open')
    console.log('open', fd);
});
let arr = [];
rs.on('data', function(chunk) { // UTF8  ASCII  49 -> 9
    // rs.pause(); // 默认一旦监听了on('data')方法会不停的触发data方法
    console.log(chunk);
    arr.push(chunk)
});
rs.on('end', function() { // 文件的开始到结束都读取完毕了
    console.log(Buffer.concat(arr).toString())
})
rs.on('close', function() {
    console.log('close')
})
// 发布订阅中出异常 error
// 可读流对象 必须有on('data') on('end')  如过时文件流会在提供两个方法 open/close
// 控制读取速率 rs.pause rs.resume

// setInterval(() => {
//     rs.resume()
// }, 1000);

//    console.log(sd.write(Buffer.concat(arr))); // 多余的不要了
//    console.log(sd.write(Buffer.from([0xbd])))



// 1.内部会 new ReadStream  继承于Readable接口
// 2.内部会先进行格式化
// 3.内部会默认打开文件 ReadStream.prototype.read
// 4.Readable.prototype.read ->  ReadStream.prototype._read

// 如果想基于Readable接口实现自己的可读流 你需要自己去实现一个_read方法，默认当我开始读取时会去调用此方法


// class Parent{
//     read(){
//         this._read()
//     }
// }
// class Child extends Parent{
//     _read(){
//         console.log('ok')
//     }
// }
// let c = new Child();
// c.read()