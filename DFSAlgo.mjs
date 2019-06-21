import { DFSNode } from './DFSNode';

export class DFSAlgo{

    nodes;
    queue;
    currrent;
    adjacent;

    constructor(){
        Queue = new Array();

        Nodes = Array.from(Array(15),() => new Array(15));
        for(let i = 0; i < Nodes.length; i++){
            for(let j = 0; j < Nodes[i].length; j++)
                Nodes[i][j] = new DFSNode(i,j);
        }
        this.Currrent = Nodes[0,14];
        this.Adjacent = null;
    }

    getRandomInt(max){
        return Math.floor(Math.random() * Math.floor(max));
    }

    getWall(){
        let wall = this.getRandomInt(4);
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

    selectAdjacent(){

    }

}