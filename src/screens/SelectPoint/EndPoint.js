import React, {useEffect, useState} from "react";
import {View} from "react-native";
import MapPicker from "../../components/Map/MapLocationPicker";
import TimeSetter from "../../components/Time/TimeSetter";
import Popup from "../../components/Elements/Popup";
import Button from "../../components/Elements/NextBtn";
import Title from "../../components/Elements/Title";
import {Location} from '../../components/Routes/Location.js';
import Label from "../../components/Elements/Label";
import {checkInRange, getCurrTime} from "../../components/Time/TimeFunctions";

export default function EndPoint({ route, navigation }) {

	const startTime = route.params.startingTime; //gets the starting time and location from StartPoint page
	const start = route.params.startingLoc;

	const [endTime, setEndTime] = React.useState(new Date(new Date().setHours(9,0,0,0)));
    const [end, setEnd] = useState(new Location("",0,0));

	const [modalVisible, toggleModalVisible] = React.useState(false);
	const [popupVisible, togglePopupVisible] = React.useState(false);

	useEffect(() => {
		let nextHour = new Date(new Date(getCurrTime()).setHours(getCurrTime().getHours() + 1)) //initially sets the end time as 1 hour after start time
		if (checkInRange(nextHour, 8, 18)) { //checks if walk time is in range
			setEndTime(nextHour)
		}
	}, []);

	return (
		<View className="mt-4">
			<View className="flex gap-1.5 ">
				<View>

					<Title
						title={"Location"}
						icon={"map-marker"}
						colour={"yl"}
					/>

					<Label
						title={"Start Point"}
						colour={"yl"}>
						{end.getName()? end.getName() : "Not Set"}
					</Label>


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

				<View className="pt-5 ">
					<Button
						colour="tq"
						title={"Get routes"}
						arrow="true"
						action={() =>
							{
								if (end.getName()) {
									togglePopupVisible(false)
									navigation.navigate("Routes", {
											startingTime: startTime,
											startingLoc: start,
											endingTime: endTime,
											endingLoc: end,
										}
									)
								} else {
									togglePopupVisible(true)
								}
							}
						}
					/>
				</View>
			</View>

			<Popup snackbarVisible={popupVisible}
				   toggleSnackbarVisible={togglePopupVisible}
				   text={"You must have a end point set!"}
			/>
		</View>
	);
}

