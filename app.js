
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
var Nodes = Array.from(Array(15),() => new Array(15));
for(let i = 0; i < Nodes.length; i++){
    for(let j = 0; j < Nodes[i].length; j++)
        Nodes[i][j] = {x: i, y: j, visited: 0};
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

function getWall(){
    if(xPos == 0 && yPos == 0){
        let wall = getRandomInt(2);
        switch(wall){
            case 0:
                return 'E';
            case 1:
                return 'S';
        }
    } else if(xPos == 0 && yPos == 14){
        let wall = getRandomInt(2);
        switch(wall){
            case 0:
                return 'N';
            case 1:
                return 'E';
        }
    } else if(xPos == 14 && yPos == 0){
        let wall = getRandomInt(2);
        switch(wall){
            case 0:
                return 'W';
            case 1:
                return 'S';
        }
    } else if(xPos == 14 && yPos == 14){
        let wall = getRandomInt(2);
        switch(wall){
            case 0:
                return 'N';
            case 1:
                return 'W';
        }
    } else if(xPos == 0){
        let wall = getRandomInt(3);
        switch(wall){
            case 0:
                return 'N';
            case 1:
                return 'S';
            case 2:
                return 'E';
        }

    } else if(xPos == 14){
        let wall = getRandomInt(3);
        switch(wall){
            case 0:
                return 'N';
            case 1:
                return 'S';
            case 2:
                return 'W';
        }
    } else if(yPos == 0) {
        let wall = getRandomInt(3);
        switch(wall){
            case 0:
                return 'S';
            case 1:
                return 'W';
            case 2:
                return 'E';
        }
    } else if(yPos == 14){
        let wall = getRandomInt(3);
        switch(wall){
            case 0:
                return 'N';
            case 1:
                return 'W';
            case 2:
                return 'E';
        }
    } else {
        let wall = getRandomInt(4);
        switch(wall){
            case 0:
                return 'N';
            case 1:
                return 'S';
            case 2:
                return 'W';
            case 3:
                return 'E';
        }
    }
}

function moveTo(direction){
    switch(direction){
        case 'N':
            updateCurrLoc(xPos,yPos-1);
            displayLocation();
        break;
        case 'S':
            updateCurrLoc(xPos, yPos+1);
            displayLocation();
        break;
        case 'W':
            updateCurrLoc(xPos-1,yPos);
            displayLocation();
        break;
        case 'E':
            updateCurrLoc(xPos+1, yPos);
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
        
        await sleep(500);
        moveTo(breakWall(getWall()));
    }
}
