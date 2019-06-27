var Nodes = Array.from(Array(15),() => new Array(15));
for(let i = 0; i < 15; i++){
    for(let j = 0; j < 15; j++)
        Nodes[i][j] = 0;
}

console.log(Nodes);