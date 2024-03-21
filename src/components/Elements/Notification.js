import notifee, {TriggerType} from '@notifee/react-native';


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

export async function startNotification(start, diff) {
    if(diff>2) {

        const trigger= {
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
                },
            },
            trigger,
        );
    }
}

export async function stopNotification(){
    console.log("stopped")
    await notifee.cancelNotification("walkTimer");
}


export async function sendNotification(channelId, title, body) {
    await notifee.displayNotification({
        title,
        body,
        android:{channelId}
    });
}
