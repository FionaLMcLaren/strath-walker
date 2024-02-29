import React, {useState} from "react";
import {Text, View, Button} from "react-native";
import MapPicker from "../components/Map/MapLocationPicker";
import TimeSelect from "../components/Time/TimeSelect";
import TimeSetter from "../components/Time/TimeSetter";

export default function EndPoint({ route, navigation }) {

	const startTime = route.params.startingTime;

	const [endTime, setEndTime] = React.useState(
		new Date(
			new Date(
				new Date(
					startTime.getTime()
				).setHours(startTime.getHours() + 1)
			).setMilliseconds(0)
		)
	)
    const [end, setEnd] = useState([]);

   	const styles = {
   		otherContainer: "flex flex-1 items-center justify-center",
        container: "justify-center h-4/5 ",
    };

	const [modalVisible, toggleModalVisible] = React.useState(false);


	return (

		<View className={styles.container }>
			<MapPicker loc={end} changeLoc={setEnd}/>
			<Text>End Point: {end}</Text>


			<Button
				title="Select route point"
				onPress={() => navigation.navigate("Routes")}
			/>

			<TimeSetter
				time={endTime}
				timeSetter={setEndTime}
				prevTime={startTime}
			/>

		</View >
	);

}

