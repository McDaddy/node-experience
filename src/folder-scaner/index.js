const fs = require('fs');
const path = require('path');

const promisify = (noneSyncFunc) => {
    return (...args) => {
        return new Promise((resolve, reject) => {
            noneSyncFunc(...args, (err, result) => {
                if (err) {
                    reject(err);
                }
                resolve(result);
            })
        });
    }
}

const findJs = (pathArg) => {
    return new Promise(async (resolve, reject) => {
        const syncReadDir = promisify(fs.readdir);
        const children =  await syncReadDir(pathArg, { withFileTypes: true });
        const retPathArray = [];
        for (const c of children) {
            if (c.isDirectory()) {
                const subRet = await findJs(path.resolve(pathArg, c.name));
                retPathArray.push(...subRet);
            } else if(c.name.endsWith('.js')) {
                retPathArray.push(path.resolve(pathArg, c.name));
            }
        }
        resolve(retPathArray);
    })
}

findJs(path.resolve(__dirname, '../..', 'src')).then((result) => {
    console.log("result", result)
});

 
