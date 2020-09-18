// const fs = require('fs');
// fs.readFile('./note.md',function () { // I/O  轮询时会执行i/o回调 如果没有定义setImmediate会等待剩下的i/o完成 或者定时器到达时间
//     setTimeout(() => {
//         console.log('timeout')
//     }, 0);
//     setImmediate(()=>{ // 不是特别重要的任务 可以放到setImmediate
//         console.log('immediate')
//     });
// })


// setTimeout(() => {
//     console.log('timeout')
// }, 0);
// setImmediate(()=>{
//     console.log('immediate')
// });

setTimeout(() => {
    console.log('timeout')
}, 0);
Promise.resolve().then(()=>{
    console.log('promise')
})
process.nextTick(()=>{ // 当前执行栈中执行完毕后 立即调用的
    console.log('nextTick')
});
process.nextTick(()=>{ // 当前执行栈中执行完毕后 立即调用的
    console.log('nextTick2')
});