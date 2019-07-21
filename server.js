var express = require('express');
var app = express();
var server = require('http').Server(app);
var io = require('socket.io')(server);

const path = require('path');


//SOCKET LOGIC
var sockets = [];

io.on('connection', (socket) => {
    sockets.push(socket);
    console.log('connected', `${socket.id} is now connected`);
    io.emit('connected', `${socket.id} is now connected`);

    socket.on('newPos',(pos) => {
        console.log(`${socket.id}: x:${pos.x} y: ${pos.y}`);
        sockets.forEach((sock)=>{
            if(socket.id != sock.id)
                io.to(sock.id).emit('newPlayer2Pos', pos);
        });
    });

    socket.on('playOnlineClicked', (message)=>{
        console.log(`${socket.id} ${message}`);
        io.emit('serverSeed', seed);
    });

    socket.on('playerWin', (mess) => {
        console.log(`${socket.id} ${mess}`);
        stack = [{x: 0, y: 14}];
        isDone = false;
        seed = 'S';
        setNodes();
        generateMaze();
        console.log(seed);
        io.emit('resetGame', seed);
    });
});






//set public directory to serve html
app.use(express.static(__dirname));

app.get('/', (req,res)=>{
    res.sendFile('index.html', __dirname);
});


//server port listen
server.listen(3000, ()=>{
    console.log('Listening at port 3000');
});

//VARIABLES FOR SEED GENERATION
var xPos = 0;
var yPos = 14;
var isDone = false;
var seed = 'S';
var stack = [{x: 0, y: 14}];
var Nodes = Array.from(Array(15),() => new Array(15));

setNodes();
generateMaze();
console.log(seed);


//sets all Nodes to 0
function setNodes(){
    
    for(let i = 0; i < 15; i++)
        for(let j = 0; j < 15; j++)
            Nodes[i][j] = 0;
}

//GENERATE SEEED / MAZE LOGIC
function generateMaze(){
    while(!isDone){
        breakWall(findNextNode());
    }
}

function findNextNode(){
    var avail = [];
    var count = 0;
    var possible = [];
    var inBackTrack = false;
    while(!isDone){
        avail = scanAdjacentNodes();
        count = 0;
        possible = [];
        avail.forEach((x,i) =>{
            if(x){
                count++;
                if(i == 0) possible.push('N'); //north
                else if(i == 1) possible.push('S'); //south
                else if(i == 2) possible.push('W'); //west
                else if(i == 3) possible.push('E'); //east
            }
        });
        if(possible.length != 0){
            if(inBackTrack) Nodes[xPos,yPos] = 2;
            return possible[getRandomInt(count)];
        } else {
            stack.pop();
            Nodes[xPos][yPos] = 2;
            try{
                updateCurrLoc(stack[stack.length-1].x, stack[stack.length-1].y);
            } catch(err) {
                isDone = true;
            }
        }
    }
}

function scanAdjacentNodes(){
    var avail = [true, true, true, true];  //[NORTH, SOUTH, WEST, EAST]
    if(yPos-1 < 0 ) avail[0] = false;
    if(yPos+1 > 14 ) avail[1] = false;
    if(xPos-1 < 0 ) avail[2] = false;
    if(xPos+1 > 14 ) avail[3] = false;
    avail.forEach((x,i) => {
        if(x){
            switch(i){
                case 0:
                    if(Nodes[xPos][yPos-1] != 0) avail[0] = false;
                break;
                case 1:
                    if(Nodes[xPos][yPos+1] != 0) avail[1] = false;
                break;
                case 2:
                    if(Nodes[xPos-1][yPos] != 0) avail[2] = false;
                break;
                case 3:
                    if(Nodes[xPos+1][yPos] != 0) avail[3] = false;
                break;
            }
        }
    });
    return avail;
}

function generateSeed(x, y, direc){
    var value = `${x.toString(16)}${y.toString(16)}${direc}`;
    seed += value;
}

function getRandomInt(max){
    return Math.floor(Math.random() * Math.floor(max));
}

function breakWall(wall){
        switch(wall){
            case 'N':
                generateSeed(xPos, yPos, 'N');
                updateCurrLoc(xPos,yPos-1);
                stack.push({x: xPos, y: yPos});
                Nodes[xPos][yPos] = 1;
            break;
            case 'S':
                generateSeed(xPos, yPos, 'S');
                updateCurrLoc(xPos, yPos+1);
                stack.push({x: xPos, y: yPos});
                Nodes[xPos][yPos] = 1;
            break;
            case 'W':
                generateSeed(xPos, yPos, 'W');
                updateCurrLoc(xPos-1,yPos);
                stack.push({x: xPos, y: yPos});
                Nodes[xPos][yPos] = 1;
            break;
            case 'E':
            generateSeed(xPos, yPos, 'E');
            updateCurrLoc(xPos+1, yPos);
            stack.push({x: xPos, y: yPos});
            Nodes[xPos][yPos] = 1;
            break;
        }
}

function updateCurrLoc(x, y){
    xPos = x;
    yPos = y;
}