
var canvas = document.querySelector('canvas');
var context = canvas.getContext("2d");

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
//all nodes
var nodes = null;
var stack = null;

//FUNCTIONS

//  MAZE HTMLDRAWING AND LOCATION FUNCTIONS
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
    switch(wall){
        case 'N':
            context.clearRect(xPix-19,yPix-21,39,2);
            return 'N';
        case 'S':
            context.clearRect(xPix-19,yPix+19,39,2);
            return 'S';
        case 'E':
            context.clearRect(xPix+19,yPix-19,2,39);
            return 'E';
        case 'W':
            context.clearRect(xPix-21,yPix-19,2,39);
            return 'W';
    }
    
}

function moveTo(direction){
    switch(direction){
        case 'N':
            updateCurrLoc(xPos,yPos-1);
            Nodes[xPos,yPos] = 1;
            displayLocation();
        break;
        case 'S':
            updateCurrLoc(xPos, yPos+1);
            Nodes[xPos,yPos] = 1;
            displayLocation();
        break;
        case 'W':
            updateCurrLoc(xPos-1,yPos);
            Nodes[xPos,yPos] = 1;
            displayLocation();
        break;
        case 'E':
            updateCurrLoc(xPos+1, yPos);
            Nodes[xPos,yPos] = 1;
            displayLocation();
        break;
    }
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

function isVisitedTwice(nodes){
    for(let i = 0; i < nodes.length; i++){
        for(let j = 0; j < nodes[i].length; j++)
            if(nodes[i,j] != 2) return false;
    }
    return true;
}

function findNextNode(){
    var avail = scanAdjacentNodes();
    var count = 0;
    var possible = [];
    avail.forEach((x,i) =>{
        if(x){
            count++;
            if(i == 0) possible.push('N');
            if(i == 1) possible.push('S');
            if(i == 2) possible.push('W');
            if(i == 3) possible.push('E');
        }
    });
    if(possible.length != 0) return possible[getRandomInt(count)];
    popNode();
}

function popNode(){

}

function scanAdjacentNodes(){
    var avail = [true, true, true, true];  //[NORTH, SOUTH, WEST, EAST]
    if(yPos-1 < 0 ) avail[0] = false;
    if(yPos+1 > 14 ) avail[1] = false;
    if(xPos-1 < 0 ) avail[2] = false;
    if(xPos+1 > 14 ) avail[3] = false;
    if(Nodes[xPos][yPos-1] != 0) avail[0] = false;
    if(Nodes[xPos][yPos+1] != 0) avail[1] = false;
    if(Nodes[xPos-1][yPos] != 0) avail[2] = false;
    if(Nodes[xPos+1][yPos] != 0) avail[3] = false;
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
drawGrid();
updateCurrLoc(0, 14);
displayLocation();
loopMain();

async function loopMain(){
    while(true){
        clearLocation();
        moveTo(breakWall(getWall()));
        await sleep(500);
    }
}
