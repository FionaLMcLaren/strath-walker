import React, {useState, useEffect} from "react";
import {Button, Text, View} from "react-native";
import {ResultMap} from '../components/Map/ResultMap.js';
import {renderEndWalk} from "../components/Walking/EndWalkRenderer";


export default function EndWalk({route, navigation}) {

    const styles = {
        container: "flex flex-1 justify-center",
    };

    const [currLoc, setLoc] = useState(route.params.startingLoc);
    const [coordinates, setCoordinates] = useState([]);

    function pushNewLine(newNodePos) {
        let c = coordinates.slice();
        c.push(newNodePos)
        setCoordinates(c);
    }

    renderEndWalk(route.params.coords, pushNewLine, setLoc);

    useEffect(() => {
        console.log(coordinates);
    });

    return (
        <View className={styles.container}>
            <Text>Walk page</Text>
            <ResultMap current={currLoc} coordinates={coordinates} />

            <Button
                title="Start New Walk"
                onPress={() => navigation.navigate("StartPoint")}
            />
        </View >
    );

}
