require('./require');
const m = customRequire('./module');

// console.log('this', globals)
console.log('hello')
console.log('log', m)

// setTimeout(() => {
//     console.log('out');
    
// }, 100)


const sleep = async () => {
    await new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, 1000);
    }) 
}

const outerSyncFunc = async () => {
    console.log('out start');
    await innerSyncFunc();
    console.log('out end');
}

const innerSyncFunc = () => {
  console.log('inner start');
//   await sleep().then(() => {
//       console.log('process middleware');
//   });
    console.log('inner end');

//   setTimeout(() => {
//       console.log('inner end');
//   }, 1000)
}

outerSyncFunc();