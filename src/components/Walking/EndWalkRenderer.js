

//Animates a recreation of a walk by just waiting a second and adding another coordinate to the line till done
export function renderEndWalk(coord, pushNewLine, changePos){

    if(coord.length !== 0){
        let animateCoord = setInterval(function(){
            let newNode = coord.shift()

            if(coord.length === 0){
                clearInterval(animateCoord);
            }

            pushNewLine(newNode);

            changePos(newNode);
        }, 500);
    }

}
