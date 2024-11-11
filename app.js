require('dotenv').config();

const express = require('express');

const functions = require('./src/functions')()

const app = express();
const PORT = process.env.PORT || 3001;

app.use('/api/search/:query', (req, res) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");

    let query = req.params.query;

    functions.search(query).then((v) => {
        res.json(v)
    })
})

console.log('Listening on PORT : ', PORT)
app.listen(PORT)
