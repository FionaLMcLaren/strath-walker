import React, {useState} from "react";
import {View} from "react-native";
import MapPicker from "../components/Map/MapLocationPicker";
import TimeSetter from "../components/Time/TimeSetter";
import Toast from "../components/Elements/Toast";
import Text from "../components/Elements/Text";
import Button from "../components/Elements/NextBtn";
import Title from "../components/Elements/Title";
import {Location} from '../components/Routes/Location.js';
import Label from "../components/Elements/Label";

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

	const [modalVisible, toggleModalVisible] = React.useState(false);
	const [snackbarVisible, toggleSnackbarVisible] = React.useState(false);


	return (
		<View className="mt-4">
			<View className="flex justify-center ">
				<View>

					<Title
						title={"Location"}
						icon={"map-marker"}
						colour={"yl"}
					/>

					<Label
						title={"End Point"}
						text={end.getName()? end.getName() : "Not Set"}
						colour={"yl"}
					/>

					<MapPicker loc={end} changeLoc={setEnd}/>

				</View>

				<Title
					title={"Time"}
					icon={"clock-time-eight"}
					colour={"pk"}
				/>

				<TimeSetter
					time={endTime}
					timeSetter={setEndTime}
					prevTime={startTime}
					modalVisible={modalVisible}
					toggleModalVisible={toggleModalVisible}
				/>

				<Button
					colour="tq"
					title={"Get routes"}
					action={() =>
						{
							if (end.getName()) {
								navigation.navigate("Routes", {
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
				/>
			</View>

			<Toast
				text={"You must have an end point set "}
				snackbarVisible={snackbarVisible}
				toggleSnackbarVisible={toggleSnackbarVisible}
			/>
		</View>
	);
}

