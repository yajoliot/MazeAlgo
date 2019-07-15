var express = require('express');
var http = require('http');
var app = express();
var server = http.createServer(app);
var io = require('socket.io').listen(server);

const path = require('path')

io.on('connection', () => {
    console.log('user connected');
});

app.use(express.static(__dirname));

app.get('/', (req,res)=>{
    res.sendFile('index.html', __dirname);
});

server.listen(3000, ()=>{
    console.log('Listening at port 3000');
});