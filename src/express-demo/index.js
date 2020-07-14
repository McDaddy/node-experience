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

app.use(async (req, res, next) => {
    console.log('middleware1 start');
    await sleep().then(next);
    console.log('middleware1 end');
})

app.use(async (req, res, next) => {
    console.log('middleware2 start');
    await sleep().then(next);
    console.log('middleware2 end');
})

app.get('/', (req,res) => {
    console.log("req", req.query)
    res.sendFile(path.resolve(__dirname, './index.html'));
})

app.post('/api', (req,res) => {
    console.log("req params", req.body)
    res.send(req.body)
})

app.listen('8000', () => {
    console.log('server started');
})