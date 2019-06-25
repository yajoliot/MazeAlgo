
var canvas = document.querySelector('canvas');
var context = canvas.getContext("2d");

// Box width
var bw = 600;
// Box height
var bh = 600;
//position in pixels
var xPos = 0;
var yPos = 0;
var Node = { x: null, y: null}
//all nodes
var Nodes = Array.from(Array(15),() => new Array(15));
for(let i = 0; i < Nodes.length; i++){
    for(let j = 0; j < Nodes[i].length; j++)
        Nodes[i][j] = {x: i, y: j};
}

//FUNCTIONS

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
            context.clearRect(xPos-19,yPos-21,39,2);
        break;
        case 'S':
            context.clearRect(xPos-19,yPos+19,39,2);
        break;
        case 'E':
            context.clearRect(xPos+19,yPos-19,2,39);
        break;
        case 'W':
            context.clearRect(xPos-21,yPos-19,2,39);
        break;
    }
    
}

function getWall(){
    let wall = getRandomInt(4);
    switch(wall){
        case 0:
            return 'N';
        break;
        case 1:
            return 'S';
        break;
        case 2:
            return 'W';
        break;
        case 3:
            return 'E';
        break;
    }
}

function updateCurrLoc(x, y){
    xPos = x*40+20;
    yPos = y*40+20;
}



function displayLocation(){
    context.fillStyle = "black";
    context.fillRect(xPos-10,yPos-10,20,20);
}

function clearLocation(){
    context.clearRect(xPos-10,yPos-10,20,20);
}


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
loop();
async function loop(){
    
    
    await sleep(500);
    updateCurrLoc(1,14);
    displayLocation();

    await sleep(500);
    clearLocation();
    updateCurrLoc(1,14);
    displayLocation();
    breakWall(getWall());
    
    await sleep(500);
    clearLocation();
    updateCurrLoc(2,14);
    displayLocation();

}
