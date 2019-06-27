function getWall(){
    if(xPos == 0 && yPos == 0){
        let wall = getRandomInt(2);
        switch(wall){
            case 0:
                return {dir:'E', pos:'topleft'};
            case 1:
                return {dir:'S', pos: 'topleft'};
        }
    } else if(xPos == 0 && yPos == 14){
        let wall = getRandomInt(2);
        switch(wall){
            case 0:
                return {dir: 'N', pos:'botleft'};
            case 1:
                return {dir: 'E', pos: 'botleft'};
        }
    } else if(xPos == 14 && yPos == 0){
        let wall = getRandomInt(2);
        switch(wall){
            case 0:
                return {dir: 'W', pos:'topright'};
            case 1:
                return {dir: 'S', pos: 'topright'};
        }
    } else if(xPos == 14 && yPos == 14){
        let wall = getRandomInt(2);
        switch(wall){
            case 0:
                return {dir: 'N', pos: 'botright'};
            case 1:
                return {dir: 'W', pos: 'botright'};
        }
    } else if(xPos == 0){
        let wall = getRandomInt(3);
        switch(wall){
            case 0:
                return {dir: 'N', pos: 'left'};
            case 1:
                return {dir: 'S', pos: 'left'};
            case 2:
                return {dir: 'E', pos: 'left'};
        }

    } else if(xPos == 14){
        let wall = getRandomInt(3);
        switch(wall){
            case 0:
                return {dir: 'N', pos: 'right'};
            case 1:
                return {dir: 'S', pos: 'right'};
            case 2:
                return {dir: 'W', pos: 'right'};
        }
    } else if(yPos == 0) {
        let wall = getRandomInt(3);
        switch(wall){
            case 0:
                return {dir: 'S', pos: 'top'};
            case 1:
                return {dir: 'W', pos: 'top'};
            case 2:
                return {dir: 'E', pos: 'top'};
        }
    } else if(yPos == 14){
        let wall = getRandomInt(3);
        switch(wall){
            case 0:
                return {dir: 'N', pos: 'bot'};
            case 1:
                return {dir: 'W', pos: 'bot'};
            case 2:
                return {dir: 'E', pos: 'bot'};
        }
    } else {
        let wall = getRandomInt(4);
        switch(wall){
            case 0:
                return {dir: 'N', pos: null};
            case 1:
                return {dir: 'S', pos: null};
            case 2:
                return {dir: 'W', pos: null};
            case 3:
                return {dir: 'E', pos: null};
        }
    }
}
function moveTo(direction){
    switch(direction){
        case 'N':
            updateCurrLoc(xPos,yPos-1);
            stack.push({x: xPos, y: yPos});
            Nodes[xPos,yPos] = 1;
            displayLocation();
        break;
        case 'S':
            updateCurrLoc(xPos, yPos+1);
            stack.push({x: xPos, y: yPos});
            Nodes[xPos,yPos] = 1;
            displayLocation();
        break;
        case 'W':
            updateCurrLoc(xPos-1,yPos);
            stack.push({x: xPos, y: yPos});
            Nodes[xPos,yPos] = 1;
            displayLocation();
        break;
        case 'E':
            updateCurrLoc(xPos+1, yPos);
            stack.push({x: xPos, y: yPos});
            Nodes[xPos,yPos] = 1;
            displayLocation();
        break;
    }
}