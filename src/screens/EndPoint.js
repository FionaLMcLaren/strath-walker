import React, {useState} from "react";
import {Text, View} from "react-native";
import {Button} from "react-native-paper";
import MapPicker from "../components/Map/MapLocationPicker";
import TimeSetter from "../components/Time/TimeSetter";
import Toast from "../components/Elements/Toast";
import {Location} from '../components/Routes/Location.js';

export default function EndPoint({ route, navigation }) {

	const startTime = route.params.startingTime;
	const start = route.params.startingLoc;

	const [endTime, setEndTime] = React.useState(
		new Date(
			new Date(
				new Date(
					startTime.getTime()
				).setHours(startTime.getHours() + 1)
			).setMilliseconds(0)
		)
	)
    const [end, setEnd] = useState(new Location("",0,0));

   	const styles = {
   		otherContainer: "flex flex-1 items-center justify-center",
        container: "justify-center h-4/5 ",
    };

	const [modalVisible, toggleModalVisible] = React.useState(false);
	const [snackbarVisible, toggleSnackbarVisible] = React.useState(false);


	return (
		<>
            <View className={styles.container }>
                <MapPicker loc={end} changeLoc={setEnd}/>
                <Text>End Point: {end.getName()}</Text>

				<Button
					onPress={() =>
					{
						if (end.getName()) {
							navigation.navigate("Walk", {
                                startingTime: startTime,
                                startingLoc: start,
                                endingTime: endTime,
                                endingLoc: end,
                                }
                                )
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

