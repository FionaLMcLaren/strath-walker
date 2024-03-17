import React, {useState, useEffect} from "react";
import { Alert, Button, Text, View } from "react-native";
import {ResultMap} from '../components/Map/ResultMap.js';
import {renderEndWalk} from "../components/Walking/EndWalkRenderer";
import AsyncStorage from "@react-native-async-storage/async-storage";

import Text from "../components/Elements/Text";
import Button from "../components/Elements/NextBtn";
import MapTab from "../components/Elements/MapTab";
import Label from "../components/Elements/Label";
import classNames from "classnames";

export default function EndWalk({route, navigation}) {

    const styles = {
        container: "flex flex-1 justify-center",
    };

    const walkTracker = route.params.walkTracker;

    const [currLoc, setLoc] = useState();
    const [coordinates, setCoordinates] = useState([]);

    const distance = walkTracker.getDistance();
    const duration = walkTracker.getDuration();
    const pace = walkTracker.calculatePace(duration);

    const points = walkTracker.getPoints();
    const history = walkTracker.getLocationHistory();
    const steps = route.params.steps;


    function pushNewLine(newNode) {
        setCoordinates(c=>([...c, newNode]));
    }

    useEffect(() => {
        renderEndWalk(walkTracker.getLocationHistory().slice(), pushNewLine, setLoc);
        getPreviousWalkData();
    }, []);

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

  const [prevData, setPrevData] = React.useState([]);

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
            accumulatedPace = accumulatedPace + walk.pace
            count++
        });
      let averagePace = (accumulatedPace / count);
      await AsyncStorage.setItem('AveragePace', JSON.stringify(averagePace))

      return true;
    } catch (error) {
      console.log(error)
      return false;
    }
  }
  const createOverwriteAlert = () => new Promise((resolve) => {
    Alert.alert('Limit Reached', 'Saving this walk will overwrite your oldest saved walk. Is this okay?', [
      {
        text: 'Cancel',
        onPress: () => {
          console.log('Cancelled');
          resolve(false);
        },
      },
      {
        text: 'Confirm',
        onPress: () => {
          console.log('Confirmed');
          resolve(saveWalkData( true))
        }
      },
    ]);
  });

  const createSavedAlert = (msg) =>
    Alert.alert('Save Walk', msg, [
      {
        text: 'Close',
        onPress: () => {console.log('Closed');}},
    ]);

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
      console.log("prev data: " + prevData);
      console.log(typeof prevData)
      if(prevData.length === storageLimit){
        return await createOverwriteAlert();
      }
      else{
        return saveWalkData(false);
      }
    } catch (error) {
      console.log(error)
      return false;
    }
  }

  return (
        <View className={styles.container}>
            <Text>Walk page</Text>
            <ResultMap current={currLoc} coordinates={coordinates} points = {points} start={route.params.startingLoc}/>

            <MapTab endPage={true}>
                <View className="w-[26rem]  " >
                    <View className="flex gap-2 ">
                        <Label title={"Distance"} colour={"tq"}>{distance}m</Label>
                        <Label title={"Duration"} colour={"tq"}>{duration}s</Label>
                        <Label title={"Pace"} colour={"tq"}>{pace}m/s</Label>
                    </View>
                    <View className="-translate-y-2 py-2 ">
                    <Button
                        title="Start New Walk"
                        action={() => navigation.navigate("StartPoint")}
                        colour={"tq"}
                    />
                    <Button
                        title="Save Walk Data"
                        action={async () => {
                            let success = await verifyWalkData();
                            let msg;
                            success ? msg = "Successfully saved walk data." : msg = "Failed to save walk data.";
                            createSavedAlert(msg);
                        }}
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


        </View >
    );

}
