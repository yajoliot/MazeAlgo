


export class MazeGen{
    
    Algo;
    x;
    y;
    bw;
    bh;
    canvas;
    context;
    historyArr;

    constructor(canvas, context, bw, bh){
        this.Algo = new DFSAlgo();
        this.x = 0;
        this.y = 0;
        this.canvas = canvas;
        this.context = context;
        this.bw = bw;
        this.bh = bh;
    }

    drawGrid(){
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

    breakWall(wall){
        switch(wall){
            case 'N':
                context.clearRect(this.x-19,this.y-21,39,2);
            break;
            case 'S':
                context.clearRect(this.x-19,this.y+19,39,2);
            break;
            case 'E':
                context.clearRect(this.x+19,this.y-19,2,39);
            break;
            case 'W':
                context.clearRect(this.x-21,this.y-19,2,39);
            break;
        }
        
    }

    updateCurrLoc(x, y){
        this.x = x*40+20;
        this.y = y*40+20;
    }
    
    displayLocation(){
        context.fillStyle = "black";
        context.fillRect(this.x-10,this.y-10,20,20);
    }

    backTrack(){

    }


}
