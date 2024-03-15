import React, {useState, useEffect} from "react";
import {Button, Text, View} from "react-native";
import {ResultMap} from '../components/Map/ResultMap.js';
import {renderEndWalk} from "../components/Walking/EndWalkRenderer";


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
    }, []);

    return (
        <View className={styles.container}>
            <Text>Walk page</Text>
            <ResultMap current={currLoc} coordinates={coordinates} points = {points} start={route.params.startingLoc}/>
            <Text>Distance: {distance}m</Text>
            <Text>Duration: {duration}s</Text>
            <Text>Pace: {pace}m/s</Text>

            <Button
                title="Start New Walk"
                onPress={() => navigation.navigate("StartPoint")}
            />
        </View >
    );

}
