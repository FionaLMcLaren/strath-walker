import React, {useEffect, useState} from "react";
import {View} from "react-native";
import {changeTime, timeDiff} from '../components/Time/TimeDifference.js';
import {startNotification, stopNotification} from "../components/Elements/Notification";
import Text from "../components/Elements/Text";
import Button from "../components/Elements/NextBtn";
import {saveRoute, savePath} from "../components/Routes/PathStorage";
import Modal from "../components/Elements/Modal";
import {Path} from "../components/Routes/Path";

function TitleBlock() {
	return (
		<View>
			<View className="flex items-center justify-center w-56 p-2 m-6 scale-150 ">
				<View className="flex flex-row" >
					<Text xlTitle={true} black={true} >Your </Text>
					<View className="py-1 px-2 rounded-lg border-black border-b-4 border-2 rotate-3 bg-yellow-300 -translate-y-2 ">
						<Text xlTitle={true} black={true}>Walk </Text>
					</View>
				</View>

				<Text xlTitle={true} black={true}>is Ready! </Text>
			</View>
		</View>
	)
}

export default function StartWalk({route, navigation}) {

	const start = route.params.startingTime;
	const selRoute = route.params.selectedRoute;
	const isSavedRoute = route.params.savedRoute;

	const [time, setTime] = useState(timeDiff(start));
	changeTime(start, setTime);

	const [saveModal, setSaveModal] = useState(false);
	const [saveResultMsg, setSaveResultMsg] = useState();

    useEffect(() => {
        startNotification(start, time).then();
        return()=>{
            stopNotification().then();
        }
    }, [])


    return (
		<View className="flex flex-1 items-center justify-center">
			<TitleBlock />
			{
				(time>0 && time!== "--") ?
					<View className="flex flex-row ">
						<Text>Your walk starts in </Text>
						<Text colour={true}>{time}</Text>
						<Text> minutes</Text>
					</View>
					:
					<View className="flex flex-row ">
						<Text>Your walk starts </Text>
						<Text colour={true}>now</Text>
					</View>
			}

			<View className="flex gap-4 pt-4 ">
				<Button
					title={(time<0 || time=== "--") ? "Start anyway" : "Start"}
					action={() => navigation.navigate("Walk",
						{
							startingTime: route.params.startingTime,
							startingLoc: route.params.startingLoc,
							endingTime: route.params.endingTime,
							endingLoc: route.params.endingLoc,
							selectedRoute: route.params.selectedRoute,
						})
					}
					colour="tq"
				/>
				{(!isSavedRoute) ?
				<Button
					title="Save for later"
					action={() => {
						saveRoute(selRoute).finally( () => {
								setSaveModal(true)
							}
						)
					}
					}
					colour="tq"
					outline={true}
				/> : null
				}
			</View>

			<Modal
				title={"Save Walk Result"}
				modalVisible={saveModal}
				toggleModalVisible={setSaveModal}
				confirmAction={() => navigation.navigate("Home")}
				dismissAction={() => navigation.navigate("Home")}
			>
				<View className="p-4 ">
					<Text>Route saved successfully!</Text>
				</View>
			</Modal>

		</View>
	)
}

