import React, {useState} from "react";
import {Text, View, Button} from "react-native";
import MapPicker from "../components/Map/MapLocationPicker";

export default function EndPoint({ route, navigation }) {

	const startTime = route.params.startingTime;

	const [endTime, setEndTime] = React.useState(
		new Date(
			new Date(
                startTime.getTime()).setHours(startTime.getHours() + 1)
		)
	)
    const [end, setEnd] = useState([]);

   	const styles = {
   		otherContainer: "flex flex-1 items-center justify-center",
        container: "justify-center h-4/5 bg-neutral-950",
    };

	return (

		<View className={styles.container }>
			<MapPicker loc={end} changeLoc={setEnd}/>
			<Text>End Point: {end}</Text>

			<Button
				title="Select route point"
				onPress={() => navigation.navigate("Routes")}
			/>

            <Text>{startTime.toTimeString()}</Text>
            <Text>{endTime.toTimeString()}</Text>
		</View >
	);

}

