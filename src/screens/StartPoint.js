import React, {useEffect, useState} from "react";
import {Text, View} from "react-native";
import {Button} from "react-native-paper";
import MapPicker from "../components/Map/MapLocationPicker";
import TimeSetter from "../components/Time/TimeSetter";
import Toast from "../components/Elements/Toast";
import {Location} from '../components/Routes/Location.js';
import PushNotification from "react-native-push-notification";
import {CHANNEL_IMPORTANCE} from "react-native-notification-channels";
import NotificationChannels from "react-native-push-notification";


export default function StartPoint({ navigation }) {

    const styles = {
        container: "justify-center h-4/5",
    };

    const [start, setStart] = useState(new Location("",0,0));
    const [startTime, setStartTime] = React.useState(new Date(new Date(Date.now()).setMilliseconds(0)));

    const [snackbarVisible, toggleSnackbarVisible] = React.useState(false);
    const [modalVisible, toggleModalVisible] = React.useState(false);

    async function configChannels() {

        let channelExists = await NotificationChannels.channelExists('my_new_channel')
        if (channelExists) {
            NotificationChannels.deleteChannel('my_new_channel')
            console.log('my_new_channel was deleted')
        }

        const list = await NotificationChannels.listChannels()
        console.log('channel list:', list)

        const groupCreated = await NotificationChannels.createChannelGroup(
            'my_new_group', 'Personal Only'
        )
        console.log('groupCreated', groupCreated)

        const channelCreated = await NotificationChannels.createChannel({
            channelId: 'test',
            channelName: 'Important Notifications',
            channelDescription: 'A notification channel which will receive all the important notifications from this app',
            importance: CHANNEL_IMPORTANCE.IMPORTANCE_HIGH,
        })
        PushNotification.localNotification({
            channelId: "test", message:"test"});
    }

    useEffect(() => {
        configChannels()
    }, []);



    return (
        <>
            <View className={styles.container}>
                <Text>Start Point</Text>


                <MapPicker loc={start} changeLoc={setStart}/>
                <Text>Start Point: {start.getName()}</Text>

                <TimeSetter
                    time={startTime}
                    timeSetter={setStartTime}
                    modalVisible={modalVisible}
                    toggleModalVisible={toggleModalVisible}
                />

                <Button
                    onPress={() =>
                        {
                            if (start.getName()) {
                                navigation.navigate("EndPoint",
                                {
                                    startingTime: startTime,
                                    startingLoc: start
                                })
                            } else {
                                toggleSnackbarVisible(true);
                            }
                        }
                    }
                >
                    Set end point
                </Button>
            </View>

            <Toast
                text={"You must have a start point set!"}
                snackbarVisible={snackbarVisible}
                toggleSnackbarVisible={toggleSnackbarVisible}
            />

        </>
    );

}

