import notifee, {TriggerType} from '@notifee/react-native';


//Make the notification channels (needded t send notifications on android)
export async function MakeChannels() {
    await notifee.createChannel({
        id: 'wTime',
        name: 'WalkTime',
        lights: true,
        vibration: true,
    });

    await notifee.createChannel({
        id: 'headBack',
        name: 'HeadBack',
        lights: true,
        vibration: true,
    });

}


//Start the notification time for starting a walk
export async function startNotification(start, diff) {
    if(diff>2) { //only trigger the notification to send if the walk is 2 minutes or more away

        const trigger= { //triggers notification to send at a specific time
            type: TriggerType.TIMESTAMP,
            timestamp: start.getTime(),
        };


        await notifee.createTriggerNotification(
            {
                id:"walkTimer",
                title: 'Time to get moving!',
                body: 'Your walk is meant to start now',
                android: {
                    channelId: 'wTime',
                    pressAction: {
                        id: 'default',
                    },
                },
            },
            trigger,
        );
    }
}



//Stops the walk timer notification from being sent out (if the walk has already been started)
export async function stopNotification(){
    await notifee.cancelNotification("walkTimer");
}


//Send a notification
export async function sendNotification(channelId, title, body) {
    await notifee.displayNotification({
        title,
        body,
        android:{channelId,
            pressAction: {
                id: 'default',
            }
        }
    });
}
