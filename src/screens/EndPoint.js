import React, {useState} from "react";
import {Text, View, Button} from "react-native";

export default function EndPoint({ route, navigation }) {

	const start = route.params.start;

	const [endTime, setEndTime] = React.useState(
		new Date(
			new Date(
				start.getTime()).setHours(start.getHours() + 1)
		)
	)

   	const styles = {
   		container: "flex flex-1 items-center justify-center",
   	};

   	return (
            <View className={styles.container}>
                <Text>End Point</Text>
				<Text>{start.toTimeString()}</Text>
				<Text>{endTime.toTimeString()}</Text>
            </View >
    );

}

