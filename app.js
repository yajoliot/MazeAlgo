
var canvas = document.querySelector('canvas');
var context = canvas.getContext("2d");

//FUNCTIONS

//  MAZE HTML DRAWING AND LOCATION FUNCTIONS
function drawGrid(){
    for (let i = 0; i <= this.bw; i += 40) {
        this.context.moveTo(0.5 + i, 0);
        this.context.lineTo(0.5 + i, this.bh);
    }

    for (let j = 0; j <= this.bh; j += 40) {
        this.context.moveTo(0, 0.5 + j);
        this.context.lineTo(this.bw + 0, 0.5 + j);
    }
    this.context.strokeStyle = "black";
    this.context.stroke();

    this.context.fillStyle = "green";
    this.context.fillRect(561,1,39,39);

    this.context.fillStyle = "red";
    this.context.fillRect(1,561,39,39);
}

function breakWall(wall){
    wall.then(toBreak => {
        switch(toBreak){
            case 'N':
                context.clearRect(xPix-19,yPix-21,39,2);
                clearLocation();
                updateCurrLoc(xPos,yPos-1);
                stack.push({x: xPos, y: yPos});
                Nodes[xPos,yPos] = 1;
                displayLocation();
            break;
            case 'S':
                context.clearRect(xPix-19,yPix+19,39,2);
                clearLocation();
                updateCurrLoc(xPos, yPos+1);
                stack.push({x: xPos, y: yPos});
                Nodes[xPos,yPos] = 1;
                displayLocation();
            break;
            case 'W':
                context.clearRect(xPix-21,yPix-19,2,39);
                clearLocation();
                updateCurrLoc(xPos-1,yPos);
                stack.push({x: xPos, y: yPos});
                Nodes[xPos,yPos] = 1;
                displayLocation();
            break;
            case 'E':
            context.clearRect(xPix+19,yPix-19,2,39);
            clearLocation();
            updateCurrLoc(xPos+1, yPos);
            stack.push({x: xPos, y: yPos});
            Nodes[xPos,yPos] = 1;
            displayLocation();
            break;
        }
    });
}



function updateCurrLoc(x, y){
    xPos = x;
    yPos = y
    xPix = x*40+20;
    yPix = y*40+20;
}



function displayLocation(){
    context.fillStyle = "black";
    context.fillRect(xPix-10,yPix-10,20,20);
}

function clearLocation(){
    context.clearRect(xPix-10,yPix-10,20,20);
}

//  NODE DFS ALGORITHM FUNCTIONS

function initNodes(){
    var nodes = Array.from(Array(15),() => new Array(15));
    for(let i = 0; i < nodes.length; i++){
        for(let j = 0; j < nodes[i].length; j++)
            nodes[i][j] = 0;
    }
    return nodes;
}

function isVisitedTwice(){
    for(let i = 0; i < Nodes.length; i++){
        for(let j = 0; j < Nodes[i].length; j++)
            if(Nodes[i,j] != 2) return false;
    }
    return true;
}

async function findNextNode(){
    var avail = [];
    var count = 0;
    var possible = [];
    var inBackTrack = false;
    while(true){
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
            Nodes[xPos, yPos] = 2;
            clearLocation();
            updateCurrLoc(stack[stack.length-1].x, stack[stack.length-1].y);
            displayLocation();
            await sleep(500);
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


//UTILITY FUNCTIONS
function getRandomInt(max){
    return Math.floor(Math.random() * Math.floor(max));
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}





//MAIN
//init
// Box width
var bw = 600;
// Box height
var bh = 600;
//position in pixels
var xPix = 0;
var yPix = 0;
//position
var xPos = 0;
var yPos = 0;

var stack = [{x: 0, y: 14}];
var Nodes = Array.from(Array(15),() => new Array(15));
for(let i = 0; i < Nodes.length; i++){
    for(let j = 0; j < Nodes[i].length; j++)
        Nodes[i][j] = 0;
}

drawGrid();
updateCurrLoc(0, 14);
displayLocation();
loopMain();

async function loopMain(){
    while(!isVisitedTwice()){
        breakWall(findNextNode());
        await sleep(500);
    }
}
