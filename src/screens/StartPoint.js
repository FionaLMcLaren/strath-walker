import React, {useState} from "react";
import {Text, View} from "react-native";
import {Button} from "react-native-paper";
import TimeSelect from "../components/Time/TimeSelect";
import MapPicker from "../components/Map/MapLocationPicker";
import {Location} from '../components/Routes/Location.js';

export default function StartPoint({ navigation }) {

    const styles = {
        container: "justify-center h-4/5 ",
    };

    const [start, setStart] = useState(new Location("",0,0));

    const [startTime, setStartTime] = React.useState(new Date());

    const [modalVisible, toggleModalVisible] = React.useState(false);


    return (
            <View className={styles.container}>
                <Text>Start Point</Text>

                <MapPicker loc={start} changeLoc={setStart}/>
                <Text>Start Point: {start.getName()}</Text>

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
                            startingTime: startTime,
                            startingLoc: start
                        })
                    }
                >
                    Set end point
                </Button>


            </View >
    );

}

