import React, {useState} from "react";
import {Text, View} from "react-native";
import {Button} from "react-native-paper";
import MapPicker from "../components/Map/MapLocationPicker";
import TimeSelect from "../components/Time/TimeSelect";
import TimeSetter from "../components/Time/TimeSetter";
import Toast from "../components/Popup/Toast";

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
	const [snackbarVisible, toggleSnackbarVisible] = React.useState(false);

	const checkSelection = () => {
		return endTime && end;
	}


	return (
		<>
			<View className={styles.container }>
				<MapPicker loc={end} changeLoc={setEnd}/>
				<Text>End Point: {end}</Text>


				<Button
					onPress={() =>
					{
						if (checkSelection()) {
							navigation.navigate("Routes")
						} else {
							toggleSnackbarVisible(true);
						}
					}
					}
				>
					Get routes
				</Button>

				<TimeSetter
					time={endTime}
					timeSetter={setEndTime}
					prevTime={startTime}
				/>

			</View>

			<Toast
				text={"You must have an end point set "}
				snackbarVisible={snackbarVisible}
				toggleSnackbarVisible={toggleSnackbarVisible}
			/>
		</>
	);

}

