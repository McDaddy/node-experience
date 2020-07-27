const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();


const sleep = async () => {
    await new Promise(resolve => {
        setTimeout(() => {
            resolve()
        }, 1000);
    }) 
}

app.use(bodyParser.json())

function errorHandler (err, req, res, next) {
    console.log('start error handle');
    if (res.headersSent) {
      return next(err)
    }
    res.sendStatus(404)
  }

app.use((req, res, next) => {
    console.log('middleware1 start');
    throw new Error('test error')

    try {
        next()
    } catch (error) {
        console.log(123131231)
    }
    console.log('middleware1 end');
})

app.get('/', (req,res, next) => {
    // throw new Error('test error')

    console.log("req", req.query)
    res.sendFile(path.resolve(__dirname, './index.html'));
})
app.use(errorHandler);

// app.use((err, req, res, next) => {
//     if (err) {
//         console.log('err2');
//         next(err);
//         return;
//     }
//     console.log('middleware2 start');
//     next();
//     // await sleep().then(next);
//     console.log('middleware2 end');
// })



app.post('/api', (req,res) => {
    console.log("req params", req.body)
    res.send(req.body)
})

app.listen('8000', () => {
    console.log('server started');
})