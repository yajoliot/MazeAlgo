import { MazeGen } from "./MazeGen";
alert('LOL');
var canvas = document.querySelector('canvas');
var context = canvas.getContext("2d");

// Box width
var bw = 600;
// Box height
var bh = 600;



//MAIN

//let maze = new MazeGen(canvas, context, bw, bh);

for (var x = 0; x <= bw; x += 40) {
    context.moveTo(0.5 + x, 0);
    context.lineTo(0.5 + x, bh);
}

for (var x = 0; x <= bh; x += 40) {
    context.moveTo(0, 0.5 + x);
    context.lineTo(bw + 0, 0.5 + x);
}
context.strokeStyle = "black";
context.stroke();

context.fillStyle = "green";
context.fillRect(561,1,39,39);

context.fillStyle = "red";
context.fillRect(1,561,39,39);
