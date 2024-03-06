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

    function pushNewLine(newNode) {
        setCoordinates(c=>([...c, newNode]));
    }



    useEffect(() => {
        renderEndWalk(route.params.coords, pushNewLine, setLoc);
    }, []);

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
