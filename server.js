var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);


const path = require('path')

io.on('connection', (socket) => {
    console.log('user connected');
    io.emit('message1', 'message1');

    socket.on('message2',(message) => {
        console.log(message);
    });
    
});






app.use(express.static(__dirname));

app.get('/', (req,res)=>{
    res.sendFile('index.html', __dirname);
});

server.listen(3000, ()=>{
    console.log('Listening at port 3000');
});