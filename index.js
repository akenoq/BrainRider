"use strict";

const express = require('express');
const body = require('body-parser');
const app = express();

const APPLICATION_PORT = 5555;

app.use(express.static(__dirname + "/static"));
app.use(body.json());

let dataArr = {};
dataArr[1] = {
    id : 1,
    data : "hello_1"
};
dataArr[2] = {
    id : 2,
    data : "hello_2"
};

app.get('/', function(req, res) {
    res.sendfile("static/index.html");
});

app.get('/datareader', function(req, res) {
    res.json(dataArr);
});

app.post('/datawriter', function (req, res) {
    const id = req.body.id;
    const data = req.body.data;
    if (!dataArr[id]) {
        dataArr[id] = {
            id,
            data,
        };
    } else {
        console.log(dataArr);
        return res.status(400).end();
    }
    console.log(dataArr);
    return res.status(200).end();
});


const port = process.env.PORT || APPLICATION_PORT;
console.log(dataArr);
app.listen(port);
