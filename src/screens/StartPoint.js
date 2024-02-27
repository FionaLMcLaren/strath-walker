import React, {useState} from "react";
import {Text, View} from "react-native";
import {Button} from "react-native-paper";
import TimeSelect from "../components/Time/TimeSelect";
import MapPicker from "../components/Map/MapLocationPicker";

export default function StartPoint({ navigation }) {

    const styles = {
        container: "items-center justify-center h-4/5 bg-neutral-950",
    };

    const [start, setStart] = useState("");

    const [startTime, setStartTime] = React.useState(new Date());

    const [modalVisible, toggleModalVisible] = React.useState(false);


    return (
            <View className={styles.container}>
                <Text>Start Point</Text>

                <MapPicker loc={start} changeLoc={setStart}/>
                <Text>Start Point: {start}</Text>

                <Text>{startTime.toString()}</Text>
                <Button
                    onPress={() => toggleModalVisible(true)}
                >
                    Set start time
                </Button>

                <TimeSelect
                    time={startTime}
                    timeSetter={setStartTime}
                    modalVisible={modalVisible}
                    toggleModalVisible={toggleModalVisible}
                />

                <Button
                    onPress={() => navigation.navigate("End Point",
                        {
                            start: startTime
                        })
                    }
                >
                    Set end point
                </Button>


            </View >
    );

}

