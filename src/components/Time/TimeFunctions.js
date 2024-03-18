export const getCurrTime = () => {
    let curTime = new Date(Date.now())

    //round up cur time to nearest quarter
    if (curTime.getMinutes() > 45) {
        curTime.setHours(curTime.getHours() + 1)
        curTime.setMinutes(0);
    } else {
        curTime.setMinutes(Math.round(curTime.getMinutes() / 15) * 15)
    }
    curTime.setSeconds(0, 0)

    return (new Date(curTime.getTime()))
}

export const checkInRange = (time, low, high) => {
    let lowTime = new Date(new Date(Date.now()).setHours(low, 0, 0, 0));
    let highTime = new Date(new Date(Date.now()).setHours(high, 0, 0, 0));

    return (time <= highTime) && (time >= lowTime);
}

export function readableDuration(time) {
    let minsVal = Math.floor(time / 60);
    let secsVal;
    if (minsVal > 1) {
        secsVal = Math.round(time - (minsVal * 60));
    } else {
        minsVal = 0;
        secsVal= Math.round(time);
    }

    let mins = minsVal.toString();
    let secs = secsVal.toString();

    return (mins + " min " + secs + " sec");
}

export function changeTime(startDate, setStateTime){

    let changeTimer = setInterval(function(){
        let currTime = new Date().getTime();
        let diff = startDate.getTime() - currTime;


        if(diff<0){
            diff = 0;
        }else{
            diff = (diff / 1000);
            diff = Math.floor(diff/60) + 1;
        }

        if(diff === 0){
            clearInterval(changeTimer);
        }

        setStateTime(diff);
    }, 1000);

}


