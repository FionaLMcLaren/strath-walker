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


//Gets the duration in an easier to read format
export function readableDuration(time) {
    let minsVal = Math.floor(time / 60);
    let secsVal;
    if (minsVal > 0) {
        secsVal = Math.round(time - (minsVal * 60));
    } else {
        minsVal = 0;
        secsVal= Math.round(time);
    }

    let mins = minsVal.toString();
    let secs = secsVal.toString();

    return (mins + " min " + secs + " sec");
}




