new Promise((resolve) => {
    console.log(1) // 同步代码
    resolve()
  }).then(() => {
    console.log(2) 
    new Promise((resolve) => {
        console.log(3)
        resolve()
    }).then(() => {
        console.log(4)
        new Promise((resolve) => {
            console.log(5) 
            resolve();
          }).then(() => {
            console.log(7)
          }).then(() => {
            console.log(9)
          })
      }).then(() => {
        console.log(8)
      })
  }).then(() => {
    console.log(6)
  })
// 宏任务队列 1
// 微任务队列 2 4  8     6
// 1 2 3 4 5
