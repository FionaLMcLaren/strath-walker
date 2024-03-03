import React, {useState, useEffect} from "react";
import {Text, View} from "react-native";
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





	const [currLoc, setLoc] = useState(new Location("Royal College", 55.85961, -4.23744));
	const [polyline, setPoly] = useState(new Polyline("Route ", decode("w_}sI~rzX_Cq@kArO"), [], 0, "0s"));

	const [tracker] = useState(new WalkTracker(polyline, setPoly));

	useEffect(() => {
		tracker.addNode(currLoc);
		console.log(polyline.getCoordinates());
		console.log(tracker.onLine());
		console.log(polyline.getCoordinates());
	});

	Geolocation.watchPosition(
		loc => {
			setLoc(new Location("De la Sol (Me, Myself and I)", loc["coords"]["latitude"], loc["coords"]["longitude"]));

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
            </View >
    );

}

