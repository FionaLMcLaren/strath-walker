

//Animates a recreation of a walk by just waiting a second and adding another coordinate to the line till done
export function renderEndWalk(coord, pushNewLine, changePos){
    console.log("a");


    let animateCoord = setInterval(function(){
        console.log("--");
        console.log(coord);
        let newNode = coord.pop()

        if(coord.length === 0){
            clearInterval(animateCoord);
            console.log("b")
        }

        pushNewLine(newNode.getPos());

        changePos(newNode);
    }, 5000);
}
