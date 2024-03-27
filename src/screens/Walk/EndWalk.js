import React, {useState, useEffect} from "react";
import {View} from "react-native";
import {ResultMap} from '../../components/Map/ResultMap.js';
import {renderEndWalk} from "../../components/Walking/EndWalkRenderer";
import {savePath,} from "../../components/Routes/PathStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Text from "../../components/Elements/Text";
import Button from "../../components/Elements/NextBtn";
import MapTab from "../../components/Elements/MapTab";
import Label from "../../components/Elements/Label";
import Modal from "../../components/Elements/Modal";
import {Path} from "../../components/Routes/Path";
import {Location} from "../../components/Routes/Location";

export default function EndWalk({route, navigation}) {

    const [currLoc, setLoc] = useState();
    const [coordinates, setCoordinates] = useState([]);

    const walkTracker = route.params.walkTracker; //gets the passed in walk tracker

    //gets value from walk tracker
    const distance = walkTracker.getDistance();
    const duration = walkTracker.getReadableDuration();
    const timeTaken = walkTracker.getDuration();
    const pace = (walkTracker.calculatePace(timeTaken)).toFixed(2);
    const points = walkTracker.getPoints();
    const history = walkTracker.getLocationHistory();

    const steps = route.params.steps; //get steps

    const [saveModal, setSaveModal] = useState(false);
    const [saveResultMsg, setSaveResultMsg] = useState("");
    const [prevData, setPrevData] = useState(null);


    //ads a node to the coordinates (used when animating the line that the user walked)
    function pushNewLine(newNode) {
        setCoordinates(c=>([...c, newNode]));
    }

    useEffect(() => {
        renderEndWalk(walkTracker.getLocationHistory().slice(), pushNewLine, setLoc); //renders the end walk line to animate it
        void getPreviousWalkData()
    }, []);

    useEffect(() => {
        if(prevData !== null){ //verifies the walk data if it exists
            void verifyWalkData()
        }
    }, [prevData])

    // save walk data functions //
    const storageLimit = 5; // change to modify max number of values
    const walkData = {
        startTime: walkTracker.getStart(),
        endTime: walkTracker.getEnd(),
        selectedRoute: points,
        distance: distance,
        steps: steps,
        walkedCoords: history,
        pace: pace
    }

    const saveWalkData = async (overLimit) => {
        let finalData = prevData;
        try {
            if(!Array.isArray(prevData)){
                finalData = [prevData];
            }

            if(overLimit){
                finalData = finalData.slice(1); // drop the first element of the array to keep under the limit
            }
            finalData.push(walkData);
            await AsyncStorage.setItem('WalkData', JSON.stringify(finalData))

            // saving average pace
            let accumulatedPace = 0;
            let count = 0;

            finalData.forEach((walk) => {
                accumulatedPace = accumulatedPace + Number(walk.pace);
                count++;
            });
            let averagePace = (accumulatedPace / count);
            await AsyncStorage.setItem('AveragePace', JSON.stringify(averagePace))

            return true;
        } catch (error) {

            return false;
        }
    }

    const getPreviousWalkData = async () => {
        try {
            const value = await AsyncStorage.getItem('WalkData');
            value !== null ? setPrevData(JSON.parse(value)) : setPrevData([]);
        } catch (error) {

        }
    }


    const verifyWalkData = async () => {
        try {
            if(prevData.length === storageLimit){
                return saveWalkData(true);
            } else{
                return saveWalkData(false);
            }
        } catch (error) {

            return false;
        }
    }



  return (
        <View className="flex flex-1 justify-center">
            <ResultMap current={currLoc} coordinates={coordinates} points = {points} start={route.params.startingLoc}/>

            <MapTab endPage={true}>
                <View className="w-[26rem]  " >
                    <View className="flex gap-2 ">
                        <Label title={"Distance"} colour={"tq"}>{distance}m</Label>
                        <Label title={"Duration"} colour={"tq"}>{duration}</Label>
                        <Label title={"Pace"} colour={"tq"}>{pace}m/s</Label>
                    </View>
                    <View className="flex gap-4 py-4">
                        <Button
                            title="Start New Walk"
                            action={() => navigation.navigate("StartPoint")}
                            colour={"tq"}
                        />
                        <Button
                            title="Save Route"
                            action={() => {
                                savePath(new Path(walkTracker.getPoints().map(p => new Location(p["name"], p["latitude"], p["longitude"])))).finally( () => {
                                        setSaveResultMsg("Route saved successfully!")
                                        setSaveModal(true)
                                    }
                                )
                            }
                            }
                            colour={"pk"}
                            outline={true}
                        />
                        <Button
                            title="Return to Home"
                            action={() => navigation.navigate("Home")}
                            colour={"tq"}
                            outline={true}
                        />
                    </View>
                </View>
            </MapTab>

            <Modal
                title={"Save Walk Result"}
                modalVisible={saveModal}
                toggleModalVisible={setSaveModal}
                confirmAction={() => setSaveModal(false)}
            >
                <View className="p-4 ">
                    <Text>{saveResultMsg}</Text>
                </View>
            </Modal>

        </View >
    );

}
