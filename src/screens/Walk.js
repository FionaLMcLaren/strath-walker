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
	const [tracker, setTracker] = useState();
	const [modalVisible, toggleModalVisible] = React.useState(false);
	const [steps, setSteps] = useState(-2);
	const [onLine, changeOnLine] = useState(true);
	const [goingHome, changeGoingHome] = useState(false);

	useEffect(()=>{
		setTracker(new WalkTracker(route.params.selectedRoute, changeDist, changeAngle, changeHeading, changePoly, changeGoingHome));

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

	   },[]);





	useEffect(() => {
		if(currLoc){
			if(tracker.addNode(currLoc)){
				tracker.stopWalk();
				toggleModalVisible(false);

			}

			if(!tracker.onLine()){
				changeOnLine(tracker.checkAtStartPoint());
			}else{
				changeOnLine(true);
			}

			if(tracker.checkTime()){
				sendNotification("headBack", "Running out of time", "Your pace is slower than we expected so you may wish to head back now/start walking back now");
			}
		}
	}, [currLoc]);



   	return (
            <View className={styles.container}>
               <Text>Walk page</Text>
				<WalkMap current={currLoc} polyline={polyline} start={route.params.startingLoc}/>
				<DirectionTab onLine={onLine} walkTracker={tracker} dist={directionDist} angle={directionAngle} header={directionHeading} changeOnLine={changeOnLine} goingHome={goingHome}/>
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
						<GoHomeButton tracker ={tracker} goingHome={goingHome} changeOnLine={changeOnLine} toggleModalVisible={toggleModalVisible}/>

					</Dialog>
				</Portal>
            </View >
    );

}



const DirectionTab = ({onLine, walkTracker, dist, angle, header, changeOnLine}) =>{
	if(!onLine){
		return(
			<View>
				<Text>Not on the route</Text>
				<Button
					onPress={() => {
						walkTracker.reroute().then(()=>changeOnLine(walkTracker.checkAtStartPoint()));
					}}
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

const GoHomeButton = ({tracker, goingHome, changeOnLine, toggleModalVisible}) =>{
	if(!goingHome){
		return(
			<Button
				onPress={() => {
					tracker.goHome().then(()=>changeOnLine(tracker.checkAtStartPoint()));
					toggleModalVisible(false);
				}}
				title="Lead Me Back"
			/>
		);
	}
}



