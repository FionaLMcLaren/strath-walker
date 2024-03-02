

export function changeTime(start, setStateTime){
    let startDate = new Date();

    startDate.setHours(start.substring(0, 2));
    startDate.setMinutes(start.substring(3));

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


