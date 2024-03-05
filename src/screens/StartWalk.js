import React, {useState} from "react";
import {Button, Text, View} from "react-native";
import {changeTime} from '../components/Time/TimeDifference.js';

export default function StartWalk({route, navigation}) {

   	const styles = {
   		container: "flex flex-1 items-center justify-center",
   	};

	const start = route.params.startingTime;

	const [time, setTime] = useState("--");
	changeTime(start, setTime);

	if(time>0 || time === "--"){
		return (
			<View className={styles.container}>
				<Text>Your walk starts in {time} minutes</Text>
				<Button
					title="Start Anyway"
					onPress={() => navigation.navigate("Walk",
						{
							startingTime: route.params.startingTime,
							startingLoc: route.params.startingLoc,
							endingTime: route.params.endingTime,
							endingLoc: route.params.endingLoc,
							selectedRoute: route.params.selectedRoute,
						})
					}
				/>
			</View >
		);
	}else{
		return(
			<View className={styles.container}>
				<Text>Start your walk now</Text>
				<Button
					title="Start Now"
					onPress={() => navigation.navigate("Walk",
						{
							startingTime: route.params.startingTime,
							startingLoc: route.params.startingLoc,
							endingTime: route.params.endingTime,
							endingLoc: route.params.endingLoc,
							selectedRoute: route.params.selectedRoute,
						})
					}
				/>
			</View>

			);
	}



}

