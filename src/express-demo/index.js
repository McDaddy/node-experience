const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

// app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
//     extended: true
// })); 
app.use(bodyParser.json())

app.get('/', (req,res) => {
    console.log("req", req.query)
    res.sendFile(path.resolve(__dirname, './index.html'));
    // res.send('hello world')
})

app.post('/api', (req,res) => {
    console.log("req params", req.body)
    res.send(req.body)
})

app.listen('8000', () => {
    console.log('server started');
})