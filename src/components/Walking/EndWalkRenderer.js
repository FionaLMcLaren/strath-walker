

//Animates a recreation of a walk by just waiting a second and adding another coordinate to the line till done
export function renderEndWalk(coord, pushNewLine, changePos){


    let animateCoord = setInterval(function(){
        let newNode = coord.pop()

        if(coord.length === 0){
            clearInterval(animateCoord);
        }

        pushNewLine(newNode.getPos());

        changePos(newNode);
    }, 5000);
}
