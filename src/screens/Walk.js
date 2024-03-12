import React, {useState, useEffect} from "react";
import {Animated, Button, ImageBackground, Text, View} from "react-native";
import {WalkMap} from '../components/Map/WalkMap.js';
import {Path} from '../components/Routes/Path.js';
import {Location} from '../components/Routes/Location.js';
import Geolocation from "react-native-geolocation-service";
import {Polyline} from "../components/Routes/PolylineRequest";
import {decode} from "@googlemaps/polyline-codec";
import {WalkTracker} from "../components/Walking/WalkTracker.js";
import CompassModal from "../components/Walking/CompassModal.js";
import {Dialog, Portal} from "react-native-paper";


export default function Walk({route, navigation}) {

   	const styles = {
   		container: "flex flex-1 justify-center",
   	};


	const [currLoc, setLoc] = useState();
	const [polyline] = useState(route.params.selectedRoute);
	const [directionDist, changeDist] = useState();
	const [directionAngle, changeAngle] = useState();
	const [directionHeading, changeHeading] = useState();
	const [tracker] = useState(new WalkTracker(route.params.selectedRoute, changeDist, changeAngle, changeHeading));
	const [modalVisible, toggleModalVisible] = React.useState(false);



	useEffect(() => {
		if(currLoc){
			if(tracker.addNode(currLoc)){
				tracker.stopWalk();
				toggleModalVisible(false);
				navigation.navigate("EndWalk",
					{
						walkTracker: tracker,
						startingLoc: route.params.startingLoc,
					})
			}
			console.log(tracker.onLine());
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
			enableHighAccuracy: true, interval: 10000
		},
	);

   	return (
            <View className={styles.container}>
               <Text>Walk page</Text>
				<WalkMap current={currLoc} polyline={polyline} start={route.params.startingLoc}/>
				<DirectionTab dist={directionDist} angle={directionAngle} header={directionHeading}/>
				<CompassModal destination={directionAngle}/>

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
								});
							}}
						/>

						<Button
							title="Lead Me Back"
						/>

					</Dialog>
				</Portal>

            </View >
    );

}

const DirectionTab = ({dist, angle, header}) =>{
	if(dist && angle){
		return(<Text>Head {dist}m at {angle}° {header}</Text>);
	}else{
		return(<Text>--m --°</Text>);
	}
}



