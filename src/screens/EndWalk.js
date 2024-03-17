import React, {useState, useEffect} from "react";
import { View} from "react-native";
import {ResultMap} from '../components/Map/ResultMap.js';
import {renderEndWalk} from "../components/Walking/EndWalkRenderer";
import {savePath} from "../components/Routes/PathStorage";

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
    const duration = walkTracker.getReadableDuration();
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

            <MapTab endPage={true}>
                <View className="w-[26rem]  " >
                    <View className="flex gap-2 ">
                        <Label title={"Distance"} colour={"tq"}>{distance}m</Label>
                        <Label title={"Duration"} colour={"tq"}>{duration}</Label>
                        <Label title={"Pace"} colour={"tq"}>{pace}m/s</Label>
                    </View>
                    <View className="-translate-y-2 py-2 ">
                    <Button
                        title="Start New Walk"
                        action={() => navigation.navigate("StartPoint")}
                        colour={"tq"}
                    />
                    <Button
                        title="Save this Walk"
                        action={() => {
                            navigation.navigate("Home")
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
