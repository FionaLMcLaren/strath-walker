import React, {useState, useEffect} from "react";
import { Alert, View } from "react-native";
import {ResultMap} from '../components/Map/ResultMap.js';
import {renderEndWalk} from "../components/Walking/EndWalkRenderer";
import {savePath, saveRoute} from "../components/Routes/PathStorage";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { overwriteAlertRes, getPreviousWalkData, saveWalkData} from "../components/WalkData/SaveWalk"

import Text from "../components/Elements/Text";
import Button from "../components/Elements/NextBtn";
import MapTab from "../components/Elements/MapTab";
import Label from "../components/Elements/Label";

import TwoBtnModal from "../components/Elements/TwoBtnModal";
import Modal from "../components/Elements/Modal"
import {Path} from "../components/Routes/Path"

export default function EndWalk({route, navigation}) {

    const walkTracker = route.params.walkTracker;

    const [currLoc, setLoc] = useState();
    const [coordinates, setCoordinates] = useState([]);

    const distance = walkTracker.getDistance();
    const duration = walkTracker.getReadableDuration();
    const timeTaken = walkTracker.getDuration();
    const pace = (walkTracker.calculatePace(timeTaken)).toFixed(2);

    const points = walkTracker.getPoints();
    const history = walkTracker.getLocationHistory();
    const steps = route.params.steps;

    const [overwriteModal, setOverwriteModal] = useState(false);
    const [saveModal, setSaveModal] = useState(false);
    const [saveResultMsg, setSaveResultMsg] = useState();


    function pushNewLine(newNode) {
        setCoordinates(c=>([...c, newNode]));
    }

    function pushNewLine(newNode) {
        setCoordinates(c=>([...c, newNode]));
    }

    const [prevData, setPrevData] = React.useState(null);

    useEffect(() => {
        renderEndWalk(walkTracker.getLocationHistory().slice(), pushNewLine, setLoc);
        void getPreviousWalkData()
    }, []);

    useEffect(() => {
        if(prevData !== null){
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
        steps: 0, // TODO: change to real steps
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
            console.log(error)
            return false;
        }
    }
    const getPreviousWalkData = async () => {
        try {
            const value = await AsyncStorage.getItem('WalkData');
            value !== null ? setPrevData(JSON.parse(value)) : setPrevData([]);
        } catch (error) {
            console.log(error);
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
            console.log(error)
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
                                savePath(new Path(walkTracker.getPoints())).finally( () => {
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

            <TwoBtnModal
                actionOne={() =>{
                    setOverwriteModal(false)
                    saveWalkData(true).then(
                        success => {
                            let msg;
                            success ? msg = "Successfully saved walk data." : msg = "Failed to save walk data.";
                            setSaveResultMsg(msg)
                            setSaveModal(true);
                        }
                    )
                }}
                actionOneText={"Confirm"}

                actionTwo={() => {
                    setOverwriteModal(false)
                }}
                actionTwoText={"Cancel"}

                modalVisible={overwriteModal}
                toggleModalVisible={setOverwriteModal}
                title={"Limit Reached"}
            >
                <View className="p-4 ">
                    <Text>Saving this walk will overwrite your oldest saved walk. Is this okay? </Text>
                </View>
            </TwoBtnModal>


        </View >
    );

}
