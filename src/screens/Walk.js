import React, {useState, useEffect} from "react";
import {Text, View} from "react-native";
import {WalkMap} from '../components/Map/WalkMap.js';
import {Location} from '../components/Routes/Location.js';
import Geolocation from '@react-native-community/geolocation';
import {Polyline} from "../components/Routes/PolylineRequest";
import {decode} from "@googlemaps/polyline-codec";

export default function Walk({route, navigation}) {

   	const styles = {
   		container: "flex flex-1 justify-center",
   	};





	const [currLoc, setLoc] = useState(route.params.startingLoc);
	const polyline = new Polyline("Route ", decode("{_wsIro}XdIoCqGmL"), [], 0, "0s");

	useEffect(() => {
		console.log(currLoc);
	});

	Geolocation.watchPosition(
		loc => {
			setLoc(new Location("De la Sol (Me, Myself and I)", loc["coords"]["latitude"], loc["coords"]["longitude"]));

		},
		error => {
			console.log(error.code, error.message);
		},
		{distanceFilter: 100},
	);

   	return (
            <View className={styles.container}>
               <Text>Walk page</Text>
				<WalkMap current={currLoc} polyline={polyline}/>
            </View >
    );

}

