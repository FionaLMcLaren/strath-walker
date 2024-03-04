import React, {useEffect, useState} from "react";
import {Text, View} from "react-native";
import {Button, Switch} from "react-native-paper";
import TimeSelect from "../components/Time/TimeSelect";
import MapPicker from "../components/Map/MapLocationPicker";
import TimeSetter from "../components/Time/TimeSetter";
import Toast from "../components/Popup/Toast";

export default function StartPoint({ navigation }) {

    const styles = {
        container: "justify-center h-4/5 bg-yellow",
    };

    const [start, setStart] = useState("");
    const [startTime, setStartTime] = React.useState(new Date(new Date(Date.now()).setMilliseconds(0)));

    const [snackbarVisible, toggleSnackbarVisible] = React.useState(false);

    const checkSelection = () => {
        return start && startTime;
    }

    return (
        <>
            <View className={styles.container}>
                <Text>Start Point</Text>

                <MapPicker loc={start} changeLoc={setStart}/>
                <Text>Start Point: {start}</Text>

                <TimeSetter
                    time={startTime}
                    timeSetter={setStartTime}
                />

                <Button
                    onPress={() =>
                        {
                            if (checkSelection()) {
                                navigation.navigate("End Point", {startingTime: startTime})
                            } else {
                                toggleSnackbarVisible(true);
                            }
                        }
                    }
                >
                    Set end point
                </Button>
            </View >

            <Toast
                text={"You must have a start point set "}
                snackbarVisible={snackbarVisible}
                toggleSnackbarVisible={toggleSnackbarVisible}
            />

        </>
    );

}

