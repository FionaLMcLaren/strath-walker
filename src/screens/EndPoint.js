import React, {useState} from "react";
import {Text, View, Button} from "react-native";
import MapPicker from "../Map/MapLocationPicker";

export default function EndPoint({ navigation }) {
	const [end, setEnd] = useState("");

	const styles = {
		container: "items-center justify-center h-4/5 bg-neutral-950",
	};


	return (

		<View className={styles.container }>
			<MapPicker loc={end} changeLoc={setEnd}/>
			<Text>End Point: {end}</Text>

			<Button
				title="Select route point"
				onPress={() => navigation.navigate("Routes")}
			/>
		</View >
	);

}

