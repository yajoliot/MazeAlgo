var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const path = require('path');

var sockets = [];
io.on('connection', (socket) => {
    sockets.push(socket);
    io.emit('connected', 'You are now connected!');

    socket.on('newPos',(pos) => {
        console.log(`${socket.id}: x:${pos.x} y: ${pos.y}`);
        sockets.forEach((sock)=>{
            if(socket.id != sock.id)
                io.to(sock.id).emit('newPlayer2Pos', pos);
        });
    });


    
});






app.use(express.static(__dirname));

app.get('/', (req,res)=>{
    res.sendFile('index.html', __dirname);
});

server.listen(3000, ()=>{
    console.log('Listening at port 3000');
});