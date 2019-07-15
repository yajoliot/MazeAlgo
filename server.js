const express = require('express');
var app = express();
const server = require('http').Server(app);
const ioSocket = require('socket.io');
var io = ioSocket(server);

const path = require('path')


app.use(express.static(__dirname));

app.get('/', (req,res)=>{
    res.sendFile('index.html', __dirname);
});

app.listen(3000, ()=>{
    console.log('Listening at port 3000');
});