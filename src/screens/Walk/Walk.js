import React, {useState, useEffect} from "react";
import {View, Pressable} from "react-native";
import {WalkMap} from '../../components/Map/WalkMap.js';
import Geolocation, {clearWatch} from "react-native-geolocation-service";
import {WalkTracker} from "../../components/Walking/WalkTracker.js";
import CompassModal from "../../components/Walking/CompassModal.js";
import Pedometer from "../../components/Walking/Pedometer.jsx";
import Text from "../../components/Elements/Text";
import Button from "../../components/Elements/NextBtn";
import MapTab from "../../components/Elements/MapTab";
import Label from "../../components/Elements/Label";
import TwoBtnModal from "../../components/Elements/TwoBtnModal";
import Modal from "../../components/Elements/Modal";
import {sendNotification} from "../../components/Notification";
import SuccessModal from "../../components/Walking/CompleteWalkModal"


//The page for the action of walking and following a route
export default function Walk({route, navigation}) {
	const [currLoc, setLoc] = useState({}); //Current Location
	const [polyline, changePoly] = useState(route.params.selectedRoute);  //Line that the user is following for the walk
	const [directionDist, changeDist] = useState(); //Distance of next section of the line
	const [directionAngle, changeAngle] = useState(); //Angle of the next section of the line
	const [directionHeading, changeHeading] = useState();  //Heading of angle i.e. N,NE,E,...

	const [onLine, changeOnLine] = useState(true);  //if the user is on the polyline i.e. the route
	const [destination, changeDestination] = useState();  //the destination the user is currently heading to

	const [steps, setSteps] = useState(-1); //number of steps worked

	const [modalVisible, toggleModalVisible] = React.useState(false);
	const [congratsModalVisible, setCongratsModalVisible] = useState(false);

	const [finished, setFinished] = useState(false); //if walk is finished
	const [goingHome, changeGoingHome] = useState(false); //if user is heading back to the university

	const [tracker] = useState(new WalkTracker(changeDist, changeAngle, changeHeading, changePoly, changeGoingHome, changeDestination));  //class that tracks the walk

	useEffect(()=>{
		tracker.setRoute(route.params.selectedRoute);  //sets the route that the user is taking
		Geolocation.getCurrentPosition(  //get initial position of user
			loc => {
				tracker.clearHistory();
				setLoc({"latitude": loc["coords"]["latitude"], "longitude": loc["coords"]["longitude"] });

			},
			error => {

			},
			{
				enableHighAccuracy: true
			},
		);

		const id = Geolocation.watchPosition(  //watch the location of the user
			loc => {

				setLoc({"latitude": loc["coords"]["latitude"], "longitude": loc["coords"]["longitude"] })
			},
			error => {

			},
			{
				enableHighAccuracy: true
			},
		);

		return()=>{  //stop watching the location once you exit the page
			clearWatch(id);
		}

	   },[]);





	useEffect(() => { //runs everytime the location is changed
		if(currLoc && !finished){ //if current location exists and not finished
			if(tracker.addNode(currLoc)){  //addNode returns true when added node is at end of walk
				setCongratsModalVisible(true);
				setFinished(true);

			}else{
				changeOnLine(tracker.onLine()); //there is a leeway around the start of the polyline so check if it is at the start point

				if(tracker.notEnoughTime()){ //if there is not enough time to complete walk at current pace then send a notification
					sendNotification("headBack", "Running out of time", "Your pace is slower than we expected so you may wish to head back now/start walking back now").then();
				}
			}


		}
	}, [currLoc]);



   	return (
            <View className="flex flex-1 justify-center ">
				<WalkMap current={currLoc} polyline={polyline} start={route.params.startingLoc} destination={destination}/>

				<MapTab walkPage={true} >
					<View className="w-[26rem]  " >
						<View className="flex justify-center gap-2 ">
						<DirectionTab onLine={onLine} walkTracker={tracker} dist={directionDist} angle={directionAngle} header={directionHeading} changeOnLine={changeOnLine}/>
						<Pedometer steps={steps} setSteps={setSteps}/>
						</View>

						<EndWalkModal tracker ={tracker} goingHome={goingHome} changeOnLine={changeOnLine} toggleModalVisible={toggleModalVisible} modalVisible={modalVisible} startingLoc={route.params.startingLoc} steps={steps} navigation={navigation}/>

						<View className="flex gap-4 py-4 ">
							<CompassModal destination={directionAngle} heading={directionHeading}/>
							<Button
								colour="tq"
								action={() => {toggleModalVisible(true)}}
								title="End Walk">
								End Walk
							</Button>
						</View>
					</View>
				</MapTab>

				<SuccessModal
					route={route}
					navigation={navigation}
					tracker={tracker}
					steps={steps}
					modalVisible={congratsModalVisible}
					toggleModalVisible={setCongratsModalVisible}
				/>
</View >
);

}


//button for when off the route and want to reroute
function RerouteBtn (rerouteFunction) {
	return (
		<Pressable onPress={()=>rerouteFunction} className="active:95 transition-all ">
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
		</Pressable>
	)
}



//Tab for showing direction to travel next
const DirectionTab = ({onLine, walkTracker, dist, angle, header, changeOnLine}) =>{
	return (
		<View>
			{(!onLine ) ? <RerouteBtn rerouteFunction={() => {walkTracker.reroute().then(()=>changeOnLine(walkTracker.checkAtStartPoint()));}} /> : null}
			<Label title={"Directions"} colour={"yl"} >
				{
					(!onLine) ?
						<Text>
								<Text colour={true}
									  title={true}
									  action={() => {walkTracker.reroute().then(()=>changeOnLine(walkTracker.checkAtStartPoint()));}}>
									Not on route
								</Text>
						</Text>
						: <Text>Head {dist}m at {angle}° {header}</Text>

				}
			</Label>
		</View>
	)
}


//modal for ending the walk
const EndWalkModal = ({tracker, goingHome, changeOnLine, toggleModalVisible, modalVisible, startingLoc, steps, navigation}) =>{
	if(!goingHome){ //if not already going home then offer the option to end here of to be led back
		return(
			<TwoBtnModal
				actionOne={() =>{
					tracker.stopWalk();
					toggleModalVisible(false);
					navigation.navigate("EndWalk",
						{
							walkTracker: tracker,
							startingLoc: startingLoc,
							steps: steps,
						})
				}}
				actionOneText={"End walk here"}

				actionTwo={() =>{
					tracker.goHome().then(()=>changeOnLine(tracker.checkAtStartPoint()));
					toggleModalVisible(false);
				}}
				actionTwoText={"Lead Me Back"}

				modalVisible={modalVisible}
				toggleModalVisible={toggleModalVisible}
				title={"End walk?"}
			>
				<View className="p-4 ">
					<Text>Do you need lead back to your end point or do you just want to end your walk here? </Text>
				</View>
			</TwoBtnModal>
		)
	}else{ //if going home already then do not give option to be led back
		return(
			<Modal
				confirmAction={() =>{
					tracker.stopWalk();
					toggleModalVisible(false);
					navigation.navigate("EndWalk",
						{
							walkTracker: tracker,
							startingLoc: startingLoc,
							steps: steps,
						})
				}}

				modalVisible={modalVisible}
				toggleModalVisible={toggleModalVisible}
				title={"End walk?"}
			>
				<View className="p-4 ">
					<Text>Do you want to end your walk here? </Text>
				</View>
			</Modal>
		)
	}
}











