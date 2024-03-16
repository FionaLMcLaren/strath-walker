import React, {useState, useEffect} from "react";
import { Alert, Button, Text, View } from "react-native";
import {ResultMap} from '../components/Map/ResultMap.js';
import {renderEndWalk} from "../components/Walking/EndWalkRenderer";
import AsyncStorage from "@react-native-async-storage/async-storage";


export default function EndWalk({route, navigation}) {
    const styles = {
        container: "flex flex-1 justify-center",
    };

    const walkTracker = route.params.walkTracker;

    const [currLoc, setLoc] = useState();
    const [coordinates, setCoordinates] = useState([]);

    const distance = walkTracker.getDistance();
    const duration = walkTracker.getDuration();
    let pace = 0;
    if (duration > 0){
        pace = distance/duration;
    }

    const points = walkTracker.getPoints();
    const history = walkTracker.getLocationHistory();


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
    walkedCoords: history
  }

  const [prevData, setPrevData] = React.useState([]);

  const saveWalkData = async (overLimit) => {
    let finalData = prevData;
    console.log("prev while saving: " + finalData);
    try {
      if(!Array.isArray(prevData)){
        finalData = [prevData];
      }

      if(overLimit){
        finalData = finalData.slice(1); // drop the first element of the array to keep under the limit
      }
      finalData.push(walkData);
      await AsyncStorage.setItem('WalkData', JSON.stringify(finalData))
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
            <Text>Distance: {distance}m</Text>
            <Text>Duration: {duration}s</Text>
            <Text>Pace: {pace}</Text>

            <Button
                title="Start New Walk"
                onPress={() => navigation.navigate("StartPoint")}
            />

            <Button
                title="Save Walk Data"
                onPress={async () => {
                    let success = await verifyWalkData();
                    let msg;
                    success ? msg = "Successfully saved walk data." : msg = "Failed to save walk data.";
                    createSavedAlert(msg);
                    }
                }
            />


        </View >
    );

}
