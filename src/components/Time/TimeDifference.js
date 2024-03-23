

export function changeTime(startDate, setStateTime){

    let changeTimer = setInterval(function(){ //Change the time every second
        let diff = timeDiff(startDate);

        if(diff === 0){
            clearInterval(changeTimer);
        }

        setStateTime(diff);
    }, 1000);

}

export function timeDiff(startDate){ //gets the difference between start time and current time
    let currTime = new Date().getTime();
    let diff = startDate.getTime() - currTime;

    if(diff<0){
        diff = 0;
    }else{
        diff = (diff / 1000);
        diff = Math.floor(diff/60) + 1;
    }

    return diff
}


