import React, {useEffect, useState} from "react";
import {Text, View, ScrollView, SafeAreaView, TouchableHighlight, Button, Alert} from "react-native";
import {RouteChoiceMap} from '../components/Map/RouteChoiceMap.js';
import AsyncStorage from "@react-native-async-storage/async-storage";
import {WalkData} from "../components/Walking/WalkData";
import {Polyline} from "react-native-maps";
import {ResultMap} from "../components/Map/ResultMap";
import {PrevWalkMap} from "../components/Map/PrevWalkMap";

export default function WalkDataView({navigation}) {

    const styles = { container: "flex flex-1 justify-center" };
    const [walkData, setWalkData] = React.useState([])

    const getWalkData = async () => {
        try {
            const value = await AsyncStorage.getItem('WalkData');
            value !== null ? setWalkData(JSON.parse(value)) : setWalkData([]);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect( () => {
        void getWalkData();
        console.log("obtained data: ", walkData);
    }, []);

    const [selectedWalk, setSelectedWalk] = useState(null);


    //TODO: figure out how displaying worked (code copied from routes) + find a way to test async storage

    return (
        <View className={styles.container}>
            <PrevWalkMap coordinates={selectedWalk} />
            {
                walkData
                    ?   walkData.map((data) => {
                        console.log("data: " + data);
                        if(data === []){
                            return <Text>No data found</Text>
                        }
                        else {
                            return (
                                <WalkOption data={data} name={data['selectedRoute']['key']}
                                            onPress={(data) => {
                                                setSelectedWalk(data);
                                                console.log("selected wallk: " + selectedWalk)
                                            }
                                }/>)
                        }
                    })
                    :   <Text>Loading...</Text>
            }

        </View>
    );
}

const WalkOption=({ data, name, onPress })=> {
    return(
        <TouchableHighlight onPress={() => onPress(data)}>
            <View>
                <Text>[{name}]</Text>
            </View>
        </TouchableHighlight>
    );
}






