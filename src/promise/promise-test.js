const p = Promise.reject(1).then().then().then().finally((data) => {
    console.log('in finally ', data);
    // throw new Error('sss')
    return 2;
}).then((d) => {
    console.log('s', d);
}).catch(e => {
    console.log('e', e);
})

console.log("start");

// const p2 = new Promise((resolve) => {
//   resolve(1);
//   throw new Error("666");
// })
//   .then((d) => {
//     console.log("s", d);
//   })
//   .catch((e) => {
//     console.log("e", e);
//   });
