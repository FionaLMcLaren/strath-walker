import React, {useState, useEffect} from "react";
import {Button, Text, View} from "react-native";
import {WalkMap} from '../components/Map/WalkMap.js';
import {Location} from '../components/Routes/Location.js';
import Geolocation from '@react-native-community/geolocation';
import {Polyline} from "../components/Routes/PolylineRequest";
import {decode} from "@googlemaps/polyline-codec";
import {WalkTracker} from "../components/Walking/WalkTracker.js";


export default function Walk({route, navigation}) {

   	const styles = {
   		container: "flex flex-1 justify-center",
   	};

	//const p= new Polyline("Route ", decode("w_}sI~rzX_Cq@kArO"), [], 0, "0s");
	//const points = [new Location("a", 55.85997, -4.23719), new Location("b", 55.86034, -4.23981)];
	const [currLoc, setLoc] = useState(route.params.startingLoc);
	const [polyline] = useState(route.params.selectedRoute);
	const [tracker] = useState(new WalkTracker(route.params.selectedRoute));

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
				<Button
					title="End Walk"
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
            </View >
    );

}

