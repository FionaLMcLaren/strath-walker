import React, {useState} from "react";
import {Text, View, Button} from "react-native";
import {Checkbox} from "react-native-paper";

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

   	return (
            <View className={styles.container}>
                <Text>Start Point</Text>
                <Text>{startTime.toTimeString()}</Text>

                <TimeSelect
                    timeSetter={setStartTime}
                />

                <Checkbox
                    status={useCurrentPosTime ? 'checked' : 'unchecked'}
                    onPress={fetchCurrentPosTime}
                />

                  <Button
                    title="Select end point"
                    onPress={() => navigation.navigate("End Point",
                        {
                            start: startTime
                        })
                    }
                  />

            </View >
    );

}

