import React, {useState, useEffect} from "react";
import {Animated, Button, ImageBackground, Text, View} from "react-native";
import {WalkMap} from '../components/Map/WalkMap.js';
import {Path} from '../components/Routes/Path.js';
import {Location} from '../components/Routes/Location.js';
import Geolocation from '@react-native-community/geolocation';
import {Polyline} from "../components/Routes/PolylineRequest";
import {decode} from "@googlemaps/polyline-codec";
import {WalkTracker} from "../components/Walking/WalkTracker.js";
import CompassModal from "../components/Walking/CompassModal.js";
import {Dialog, Portal} from "react-native-paper";

export default function Walk({route, navigation}) {

   	const styles = {
   		container: "flex flex-1 justify-center",
   	};

	const p= new Polyline("Route ", decode("{_wsIpo}XjImCuGyL"), new Path([new Location("a", 55.82693, -4.25152), new Location("b", 55.82843, -4.24914)]), 0, "0s");

	const [currLoc, setLoc] = useState(route.params.startingLoc);
	//const [polyline] = useState(route.params.selectedRoute);
	const [polyline] = useState(p);
	const [directionDist, changeDist] = useState(0);
	const [directionAngle, changeAngle] = useState(0);
	const [tracker] = useState(new WalkTracker(p, changeDist, changeAngle));
	const [modalVisible, toggleModalVisible] = React.useState(false);



	useEffect(() => {
		if(tracker.addNode(currLoc)){
			navigation.navigate("EndWalk",
				{
					startingTime: tracker.getStart(),
					startingLoc: route.params.startingLoc,
					endingTime: tracker.getTime(),
					endingLoc: route.params.endingLoc,
					coords: tracker.getPath(),
				})
		}
		console.log(polyline.getCoordinates());
		console.log(tracker.onLine());
		console.log(polyline.getCoordinates());
	});

	Geolocation.watchPosition(
		loc => {
			console.log(loc);
			setLoc(new Location("User Location", loc["coords"]["latitude"], loc["coords"]["longitude"]));

		},
		error => {
			console.log(error.code, error.message);
		},
		{},
	);

   	return (
            <View className={styles.container}>
               <Text>Walk page</Text>
				<WalkMap current={currLoc} polyline={polyline}/>
				<Text>{directionDist}m {directionAngle}</Text>
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
							onPress={() => navigation.navigate("EndWalk",
								{
									startingTime: tracker.getStart(),
									startingLoc: route.params.startingLoc,
									endingTime: tracker.getTime(),
									endingLoc: route.params.endingLoc,
									coords: tracker.getPath(),
								})
							}
						/>

						<Button
							title="Lead Me Back"
						/>

					</Dialog>
				</Portal>

            </View >
    );

}



