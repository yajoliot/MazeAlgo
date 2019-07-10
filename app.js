
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
                generateSeed(xPos, yPos, 'N');
                updateCurrLoc(xPos,yPos-1);
                stack.push({x: xPos, y: yPos});
                Nodes[xPos][yPos] = 1;
                displayLocation();
            break;
            case 'S':
                context.clearRect(xPix-19,yPix+19,39,2);
                clearLocation();
                generateSeed(xPos, yPos, 'S');
                updateCurrLoc(xPos, yPos+1);
                stack.push({x: xPos, y: yPos});
                Nodes[xPos][yPos] = 1;
                displayLocation();
            break;
            case 'W':
                context.clearRect(xPix-21,yPix-19,2,39);
                clearLocation();
                generateSeed(xPos, yPos, 'W');
                updateCurrLoc(xPos-1,yPos);
                stack.push({x: xPos, y: yPos});
                Nodes[xPos][yPos] = 1;
                displayLocation();
            break;
            case 'E':
            context.clearRect(xPix+19,yPix-19,2,39);
            clearLocation();
            generateSeed(xPos, yPos, 'E');
            updateCurrLoc(xPos+1, yPos);
            stack.push({x: xPos, y: yPos});
            Nodes[xPos][yPos] = 1;
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

// PLAYER MODE DISPLAY FUNCTIONS

function updatePlayerLoc(x, y){
    xPosPlayer = x;
    yPosPlayer = y;
    xPixPlayer = x*40+20;
    yPixPlayer = y*40+20;
}

function clearPlayerLocation(){
    context.clearRect(xPixPlayer-10,yPixPlayer-10,20,20);
}

function displayPlayerLocation(){
    context.fillStyle = "blue";
    context.fillRect(xPixPlayer-10,yPixPlayer-10,20,20);
}

//PLAYER MODE LOGIC

function verifyRequestedPlayerLoc(direc){
    switch(direc){
        case 'N':
            
            if(yPosPlayer-1 < 0) return false;
        break;
        case 'S':
            if(yPosPlayer+1 > 14) return false;
        break;
        case 'W':
            if(xPosPlayer-1 < 0) return false;
        break;
        case 'E':
            if(xPosPlayer+1 > 14) return false;
        break;
    }
    return true;
}

//  NODE DFS ALGORITHM FUNCTIONS


async function findNextNode(){
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
            clearLocation();
            try{
                updateCurrLoc(stack[stack.length-1].x, stack[stack.length-1].y);
            } catch(err){
                isDone = true;
            }
            displayLocation();
            await sleep(100);
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

function generateSeededMaze(sd){
    console.log('LOL');
    for(let i = 1; i < sd.length; i++){
        let x = 0;
        let y = 0;
        let type = i % 3;
        switch(type){
            case 0:
                switch(sd[i]){
                    case 'N':
                        updateCurrLoc(x,y);
                        context.clearRect(xPix-19,yPix-21,39,2);  
                    break;
                    case 'S':
                        updateCurrLoc(x,y);
                        context.clearRect(xPix-19,yPix+19,39,2);
                    break;
                    case 'W':
                        updateCurrLoc(x,y);
                        context.clearRect(xPix-21,yPix-19,2,39);
                    break;
                    case 'E':
                        updateCurrLoc(x,y);
                        context.clearRect(xPix+19,yPix-19,2,39);
                    break;
                }
            break;
            case 1:
                x = seed[i];
            break;
            case 2:
                y = seed[i];
            break;
        }
    }
        
    
}


//UTILITY FUNCTIONS
function getRandomInt(max){
    return Math.floor(Math.random() * Math.floor(max));
}

function sleep(ms){
    return new Promise(resolve => setTimeout(resolve, ms));
}





//INITIATIONS VARIABLES
//init
// Box width
var bw = 600;
// Box height
var bh = 600;
//position in pixels and position of generator
var xPix = 0;
var yPix = 0;
var xPos = 0;
var yPos = 0;

//player position
var xPosPlayer = 0;
var yPosPlayer = 0;
var xPixPlayer = 0;
var yPixPlayer = 0;

//Seed
var seed = 'S';
var isDone = false;

var stack = [{x: 0, y: 14}];
var Nodes = Array.from(Array(15),() => new Array(15));
for(let i = 0; i < 15; i++){
    for(let j = 0; j < 15; j++)
        Nodes[i][j] = 0;
}



//MAIN
drawGrid();
updateCurrLoc(0, 14);
displayLocation();



async function generateMaze(){
    while(!isDone){
        breakWall(findNextNode());
        await sleep(100);
    }

    var displaySeed = `${seed.toString()}`;
    document.getElementById('seedDis').innerHTML = displaySeed;
}

function generateSeededMaze(){
    var seed = document.getElementsByName('seedToGen')[0].value;
    let x = 0;
    let y = 0;
    
    for(let i = 1; i < sd.length; i++){
        
        let type = i % 3;
        switch(type){
            case 0:
                switch(seed[i]){
                    case 'N':
                        updateCurrLoc(x,y);
                        context.clearRect(xPix-19,yPix-21,39,2);  
                    break;
                    case 'S':
                        updateCurrLoc(x,y);
                        context.clearRect(xPix-19,yPix+19,39,2);
                    break;
                    case 'W':
                        updateCurrLoc(x,y);
                        context.clearRect(xPix-21,yPix-19,2,39);
                    break;
                    case 'E':
                        updateCurrLoc(x,y);
                        context.clearRect(xPix+19,yPix-19,2,39);
                    break;
                }
            break;
            case 1:
                x = parseInt(seed[i], 16);
            break;
            case 2:
                y = parseInt(seed[i], 16);
            break;
        }
    }
    isDone = true;
}

function playerMode(){
    
    updatePlayerLoc(0, 14)
    displayPlayerLocation();
    // Event Listeners
    document.addEventListener('keydown', (event)=>{
        clearPlayerLocation();

        if (event.keyCode == 38 || event.keyCode == 87){
            if (verifyRequestedPlayerLoc('N'))
                updatePlayerLoc(xPosPlayer, yPosPlayer-1);
        } else if (event.keyCode == 40 || event.keyCode == 83){
            if (verifyRequestedPlayerLoc('S'))
                updatePlayerLoc(xPosPlayer, yPosPlayer+1);
        } else if (event.keyCode == 37 || event.keyCode == 65){
            if (verifyRequestedPlayerLoc('W'))
                updatePlayerLoc(xPosPlayer-1, yPosPlayer);
        } else if (event.keyCode == 39 || event.keyCode == 68){
            if (verifyRequestedPlayerLoc('E'))
                updatePlayerLoc(xPosPlayer+1, yPosPlayer);
        }

        displayPlayerLocation();
        console.log(xPosPlayer);
        console.log(yPosPlayer);
        if (xPosPlayer == 14 && yPosPlayer == 0)
            alert('YOU WON');
    });
    
}

