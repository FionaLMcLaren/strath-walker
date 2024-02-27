import React, {useEffect, useState} from "react";
import {Text, View} from "react-native";
import {Button, Switch} from "react-native-paper";
import TimeSelect from "../components/Time/TimeSelect";
import MapPicker from "../components/Map/MapLocationPicker";
import TimeSetter from "../components/Time/TimeSetter";

export default function StartPoint({ navigation }) {

    const styles = {
        container: "justify-center h-4/5 bg-yellow",
    };

    const [start, setStart] = useState("");
    const [startTime, setStartTime] = React.useState(new Date());


    return (
            <View className={styles.container}>
                <Text>Start Point</Text>

                <MapPicker loc={start} changeLoc={setStart}/>
                <Text>Start Point: {start}</Text>

                <TimeSetter
                    time={startTime}
                    timeSetter={setStartTime}
                />

                <Button
                    onPress={() => navigation.navigate("End Point",
                        {
                            startingTime: startTime
                        })
                    }
                >
                    Set end point
                </Button>


            </View >
    );

}

