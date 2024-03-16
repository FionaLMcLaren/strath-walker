import React, {useState, useEffect} from "react";
import {Animated, ImageBackground, View, Pressable} from "react-native";
import {WalkMap} from '../components/Map/WalkMap.js';
import {Path} from '../components/Routes/Path.js';
import {Location} from '../components/Routes/Location.js';
import Geolocation from "react-native-geolocation-service";
import {Polyline} from "../components/Routes/PolylineRequest";
import {decode} from "@googlemaps/polyline-codec";
import {WalkTracker} from "../components/Walking/WalkTracker.js";
import CompassModal from "../components/Walking/CompassModal.js";
import Pedometer from "../components/Walking/Pedometer.jsx";
import Text from "../components/Elements/Text";
import Button from "../components/Elements/NextBtn";
import MapTab from "../components/Elements/MapTab";
import Label from "../components/Elements/Label";
import TwoBtnModal from "../components/Elements/TwoBtnModal";

function RerouteBtn (rerouteFunction) {
	return (
		<View >
			<View className="absolute
			bg-pink-200 border-2 border-t-transparent border-l-transparent w-4 h-4
			rotate-45  z-10
			-translate-y-2.5 right-0 -translate-x-16" />
			<Pressable
				className="absolute -translate-y-10  right-0 bg-pink-200 border-2 px-1 rounded-lg scale-110 "
				onPress={rerouteFunction}>
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
			{(!onLine ) ? <RerouteBtn rerouteFunction={() => {walkTracker.reroute()}} /> : null}
			<Label title={"Directions"} colour={"yl"} >
				{
					(!onLine) ?
						<View>
							<Pressable onPress={() => {walkTracker.reroute()}}>
								<Text colour={true} >Not on route </Text>
							</Pressable>
						</View>
						: ((dist && angle) ? <Text>Head {dist}m at {angle}° {header}</Text> : <Text>-- m  -- °</Text>)

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

					actionTwo={() => {
						tracker.goHome();
						toggleModalVisible(false);
					}}
					actionTwoText={"Lead me back"}

					modalVisible={modalVisible}
					toggleModalVisible={toggleModalVisible}
					title={"End walk?"}
				>
					<View className="p-4 ">
						<Text>Do you need lead back to your end point or do you just want to end your walk here? </Text>
					</View>

				</TwoBtnModal>
            </View >
    );

}





