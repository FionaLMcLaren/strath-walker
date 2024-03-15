import React, {useEffect, useRef, useState} from "react";
import {View} from "react-native";
import MapPicker from "../components/Map/MapLocationPicker";
import TimeSetter from "../components/Time/TimeSetter";
import {Popup} from "../components/Elements/Popup";
import Text from "../components/Elements/Text";
import Button from "../components/Elements/NextBtn";
import Title from "../components/Elements/Title";
import {Location} from '../components/Routes/Location.js';
import Label from "../components/Elements/Label";

export default function EndPoint({ route, navigation }) {

	const startTime = route.params.startingTime;
	const start = route.params.startingLoc;

	const [endTime, setEndTime] = React.useState(new Date(new Date().setHours(9,0,0,0)));
    const [end, setEnd] = useState(new Location("",0,0));

	const [modalVisible, toggleModalVisible] = React.useState(false);
	const popup= useRef();


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
					arrow="true"
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
								popup.current.showPopup
							}
						}
					}
				/>
			</View>

			<Popup
				text={"You must have an end point set "}
				innerRef={popup}
			/>
		</View>
	);
}

