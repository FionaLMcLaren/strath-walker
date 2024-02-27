import React, {useState} from "react";
import {Text, View} from "react-native";
import {Button} from "react-native-paper";

import TimeSelect from "../components/TimeSelect";

export default function StartPoint({ navigation }) {

   	const styles = {
   		container: "flex flex-1 items-center justify-center",
   	};

    const [useCurrentPosTime, setUseCurrentPosTime] = React.useState(false);

    const fetchCurrentPosTime = () => {
        setUseCurrentPosTime(true)
    }

    const [startTime, setStartTime] = React.useState(new Date());

    const [modalVisible, toggleModalVisible] = React.useState(false);


    return (
            <View className={styles.container}>
                <Text>Start Point</Text>
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

