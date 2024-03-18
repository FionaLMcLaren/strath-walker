import React, {useState, useEffect} from "react";
import {Animated, ImageBackground, View, Pressable, PermissionsAndroid} from "react-native";
import {WalkMap} from '../components/Map/WalkMap.js';
import Geolocation, {clearWatch} from "react-native-geolocation-service";
import {WalkTracker} from "../components/Walking/WalkTracker.js";
import CompassModal from "../components/Walking/CompassModal.js";
import Pedometer from "../components/Walking/Pedometer.jsx";
import Text from "../components/Elements/Text";
import Button from "../components/Elements/NextBtn";
import MapTab from "../components/Elements/MapTab";
import Label from "../components/Elements/Label";
import TwoBtnModal from "../components/Elements/TwoBtnModal";
import {sendNotification} from "../components/Elements/Notification";
function RerouteBtn (rerouteFunction) {
	return (
		<View >
			<View className="absolute
			bg-pink-200 border-2 border-t-transparent border-l-transparent w-4 h-4
			rotate-45  z-10
			-translate-y-2.5 right-0 -translate-x-16" />
			<Pressable
				className="absolute -translate-y-10  right-0 bg-pink-200 border-2 px-1 rounded-lg scale-110 "
				onPress={()=>rerouteFunction}>
				<View className="animate-pulse ">
					<Text>Click to Reroute!</Text>
				</View>
			</Pressable>
		</View>
	)
}
const DirectionTab = ({onLine, walkTracker, dist, angle, header}) =>{
	return (
		<View>
			{(!onLine ) ? <RerouteBtn rerouteFunction={() => {walkTracker.then(()=>changeOnLine(walkTracker.checkAtStartPoint()));}} /> : null}
			<Label title={"Directions"} colour={"yl"} >
				{
					(!onLine) ?
						<View>
							<Pressable onPress={() => {walkTracker.reroute()}}>
								<Text colour={true} >Not on route </Text>
							</Pressable>
						</View>
						: <Text>Head {dist}m at {angle}° {header}</Text>

				}
			</Label>
		</View>
	)
}




export default function Walk({route, navigation}) {
	const [currLoc, setLoc] = useState();
	const [polyline, changePoly] = useState(route.params.selectedRoute);
	const [directionDist, changeDist] = useState();
	const [directionAngle, changeAngle] = useState();
	const [directionHeading, changeHeading] = useState();
	const [modalVisible, toggleModalVisible] = React.useState(false);
	const [steps, setSteps] = useState(-2);
	const [onLine, changeOnLine] = useState(true);
	const [goingHome, changeGoingHome] = useState(false);

	const [tracker] = useState(new WalkTracker(changeDist, changeAngle, changeHeading, changePoly, changeGoingHome));
	useEffect(()=>{
		tracker.setRoute(route.params.selectedRoute);
		getPermission().then();
		Geolocation.getCurrentPosition(
			loc => {
				tracker.clearHistory();
				setLoc({"latitude": loc["coords"]["latitude"], "longitude": loc["coords"]["longitude"] });

			},
			error => {
				console.log(error.code, error.message);
			},
			{
				enableHighAccuracy: true
			},
		);

		const id = Geolocation.watchPosition(
			loc => {
				console.log(loc);
				setLoc({"latitude": loc["coords"]["latitude"], "longitude": loc["coords"]["longitude"] })
			},
			error => {
				console.log(error.code, error.message);
			},
			{
				enableHighAccuracy: true
			},
		);

		return()=>{
			clearWatch(id);
		}

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
            <View className="flex flex-1 justify-center">
				<WalkMap current={currLoc} polyline={polyline} start={route.params.startingLoc}/>

				<MapTab walkPage={true} >
					<View className="w-[26rem]  " >
						<View className="flex gap-2 ">
						<DirectionTab onLine={onLine} walkTracker={tracker} dist={directionDist} angle={directionAngle} header={directionHeading}/>
						<Pedometer steps={steps} setSteps={setSteps}/>
						</View>

						<View className="-translate-y-2 py-2 ">
							<CompassModal destination={directionAngle}/>
							<Button
								colour="tq"
								action={() => {toggleModalVisible(true)}}
								title="End Walk">
								End Walk
							</Button>
						</View>
					</View>
				</MapTab>

				<TwoBtnModal
					actionOne={() =>{
						tracker.stopWalk();
						toggleModalVisible(false);
						navigation.navigate("EndWalk",
							{
								walkTracker: tracker,
								startingLoc: route.params.startingLoc,
								steps: steps,
							})
					}}
					actionOneText={"End walk here"}

					modalVisible={modalVisible}
					toggleModalVisible={toggleModalVisible}
					title={"End walk?"}
				>
					<View className="p-4 ">
						<Text>Do you need lead back to your end point or do you just want to end your walk here? </Text>
						<GoHomeButton tracker ={tracker} goingHome={goingHome} changeOnLine={changeOnLine} toggleModalVisible={toggleModalVisible}/>
					</View>
            </TwoBtnModal>
</View >
);

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


async function getPermission(){
	await PermissionsAndroid.request(
		PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
	);
}


