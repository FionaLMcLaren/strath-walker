import React, {useState, useEffect} from "react";
import {Button, Text, View} from "react-native";
import {WalkMap} from '../components/Map/WalkMap.js';
import Geolocation from "react-native-geolocation-service";
import {WalkTracker} from "../components/Walking/WalkTracker.js";
import CompassModal from "../components/Walking/CompassModal.js";
import {Dialog, Portal} from "react-native-paper";
import Pedometer from "../components/Walking/Pedometer.jsx";
import {sendNotification} from "../components/Elements/Notification";


export default function Walk({route, navigation}) {

   	const styles = {
   		container: "flex flex-1 justify-center",
   	};

	const [currLoc, setLoc] = useState();
	const [polyline, changePoly] = useState(route.params.selectedRoute);
	const [directionDist, changeDist] = useState();
	const [directionAngle, changeAngle] = useState();
	const [directionHeading, changeHeading] = useState();
	const [tracker] = useState(new WalkTracker(route.params.selectedRoute, changeDist, changeAngle, changeHeading, changePoly));
	const [modalVisible, toggleModalVisible] = React.useState(false);
	const [steps, setSteps] = useState(-2);
	const [onLine, changeOnLine] = useState(true);


	useEffect(() => {
		if(currLoc){
			if(tracker.addNode(currLoc)){
				tracker.stopWalk();
				toggleModalVisible(false);

			}
			changeOnLine(tracker.onLine());
			if(tracker.checkTime()){
				sendNotification("headBack", "Running out of time", "Your pace is slower than we expected so you may wish to head back now/start walking back now", null);
			}
		}
	}, [currLoc]);

	Geolocation.watchPosition(
		loc => {
			console.log(loc);
			setLoc({"latitude": loc["coords"]["latitude"], "longitude": loc["coords"]["longitude"] });

		},
		error => {
			console.log(error.code, error.message);
		},
		{
			enableHighAccuracy: true, interval: 2000
		},
	);

   	return (
            <View className={styles.container}>
               <Text>Walk page</Text>
				<WalkMap current={currLoc} polyline={polyline} start={route.params.startingLoc}/>
				<DirectionTab onLine={onLine} walkTracker={tracker} dist={directionDist} angle={directionAngle} header={directionHeading}/>
				<CompassModal destination={directionAngle}/>
				<Pedometer steps={steps} setSteps={setSteps}/>
				<Button
					onPress={() => {toggleModalVisible(true)}}
				 	title="EndWalk"
				>End Walk</Button>

				<Portal>
					<Dialog
						visible={modalVisible}
						onDismiss={() => toggleModalVisible(false)}
					>
						<Dialog.Title>
							End Walk?
						</Dialog.Title>

						<Button
							title="End Walk Here"
							onPress={() =>{
								tracker.stopWalk();
								toggleModalVisible(false);
								navigation.navigate("EndWalk",
									{
										walkTracker: tracker,
										startingLoc: route.params.startingLoc,
										steps: steps,
									})
							}}
						/>

						<Button
							onPress={() => {
								tracker.goHome();
								toggleModalVisible(false);
							}}
							title="Lead Me Back"
						/>

					</Dialog>
				</Portal>
            </View >
    );

}



const DirectionTab = ({onLine, walkTracker, dist, angle, header}) =>{
	if(!onLine){
		return(
			<View>
				<Text>Not on the route</Text>
				<Button
					onPress={() => {walkTracker.reroute();}}
					title="Reroute"
				>
					Would you like to reroute?
				</Button>
			</View>
		);
	}else if(dist && angle){
		return(<Text>Head {dist}m at {angle}° {header}</Text>);
	}else{
		return(<Text>--m --°</Text>);
	}
}



