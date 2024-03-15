import notifee, {TimestampTrigger, TriggerType} from '@notifee/react-native';


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

export async function startNotification(start) {
    if(start>1000) {
        const trigger = {
            type: TriggerType.TIMESTAMP,
            timestamp: start
        };

        await sendNotification("wTime", "Time to get moving!", "Your walk is meant to start now", trigger);
    }
}


export async function sendNotification(channelId, title, body, trigger) {
    await notifee.displayNotification({
        title,
        body,
        android:{channelId},
        trigger
    });
}
