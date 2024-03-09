import React, {useState} from "react";
import {Text, View} from "react-native";
import {Button} from "react-native-paper";
import MapPicker from "../components/Map/MapLocationPicker";
import TimeSetter from "../components/Time/TimeSetter";
import Toast from "../components/Elements/Toast";

import Title from "../components/Elements/Title";

import {Location} from '../components/Routes/Location.js';

export default function StartPoint({ navigation }) {

    const styles = {
        container: "justify-center h-4/5",
    };

    const [start, setStart] = useState(new Location("",0,0));
    const [startTime, setStartTime] = React.useState(new Date(new Date(Date.now()).setMilliseconds(0)));

    const [snackbarVisible, toggleSnackbarVisible] = React.useState(false);
    const [modalVisible, toggleModalVisible] = React.useState(false);

    return (
        <>
            <View className={styles.container}>
                <Text>Start Point</Text>

                <View className="mt-12">
                <Title
                    title={"Location"}
                    icon={"walk"}
                    colour={"yl"}
                />

                <MapPicker loc={start} changeLoc={setStart}/>
                <Text>Start Point: {start.getName()}</Text>
                </View>


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

