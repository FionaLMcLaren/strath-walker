import React, {useEffect, useState} from "react";
import {Alert, Button, Text, View} from "react-native";
import {ResultMap} from '../components/Map/ResultMap.js';
import {renderEndWalk} from "../components/Walking/EndWalkRenderer";
import AsyncStorage from '@react-native-async-storage/async-storage';
import {WalkData} from "../components/Walking/WalkData";


export default function EndWalk({route, navigation}) {

    const styles = {
        container: "flex flex-1 justify-center",
    };

    const [currLoc, setLoc] = useState(route.params.startingLoc);
    const [coordinates, setCoordinates] = useState([]);

    function pushNewLine(newNode) {
        setCoordinates(c=>([...c, newNode]));
    }

    useEffect(() => {
        renderEndWalk(route.params.coords, pushNewLine, setLoc);
    }, []);

    // save walk data functions //
    const storageLimit = 5; // change to modify max number of values
    const walkData = new WalkData(route.params.startingTime,
                                            route.params.endingTime,
                                            route.params.selectedRoute,
                                            route.params.distance,
                                            0, // TODO: get real step count from pedometer
                                            route.params.coords
                                            );
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

    /*const getPreviousWalkData = async () => {
        try {
            const value = await AsyncStorage.getItem('WalkData');
            console.log("previous data: " + value);
            return value !== null ? JSON.parse(value) : [];
        } catch (error) {
            console.log(error);
        }
    }*/

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
            await getPreviousWalkData();
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
            <ResultMap current={currLoc} coordinates={coordinates} />

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
