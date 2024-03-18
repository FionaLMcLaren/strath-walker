import React, {useEffect, useState} from "react";
import {View, ScrollView, Pressable} from "react-native";
import {Icon} from "react-native-paper";
import {PathGenerator} from '../components/Routes/GeneratePoints.js';
import {Location} from '../components/Routes/Location.js';
import {RouteChoiceMap} from '../components/Map/RouteChoiceMap.js';
import {getSuitablePolylines} from "../components/Routes/PolylineRequest";
import {loadPaths, savePath} from "../components/Routes/PathStorage";

import TimeSelect from "../components/Time/TimeSelect"

import Text from "../components/Elements/Text";
import Button from "../components/Elements/NextBtn";
import MapTab from "../components/Elements/MapTab";
import RouteOption from "../components/Elements/RouteOption";
import classNames from "classnames";
import CompassModal from "../components/Walking/CompassModal";
import {PrevWalkMap} from "../components/Map/PrevWalkMap";

function SelectedRouteTab({selectedRoute, endTime, setEndTime, startTime, modalVisible, toggleModalVisible}) {
    return (
        <>
            <MapTab routePage={true}>

            <View>
                <RouteOption key={selectedRoute.getKey()}
                             route={selectedRoute}/>
            </View>

            <View className="-translate-y-2 py-2 ">
                <Button
                    colour="tq"
                    action={() => {
                        console.log("pressed");
                        navigation.navigate("StartWalk",
                            {
                                startingTime: startTime,
                                startingLoc: start,
                                endingTime: endTime,
                                endingLoc: end,
                                selectedRoute: selectedRoute,
                                savedRoute: true
                            });
                    }}
                    title="Select Route"/>
            </View>
        </MapTab><TimeSelect
            time={endTime}
            timeSetter={setEndTime}
            prevTime={startTime}
            modalVisible={modalVisible}
            toggleModalVisible={toggleModalVisible}/></>
    )
}

export default function SelectedRoute({route, navigation, pastWalk}) {
    const selectedRoute = route.params.chosenRoute;

    const startTime = new Date();
    const [endTime, setEndTime] = useState(new Date(new Date().setHours(startTime.getHours() + 1)));

    const [modalVisible, toggleModalVisible] = useState(true);


    if (pastWalk) {
        return (
            <View className="flex flex-1 justify-center">
                <PrevWalkMap walk={selectedRoute}/>
                <SelectedRouteTab startTime={startTime}
                                  selectedRoute={selectedRoute}
                                  endTime={endTime}
                                  setEndTime={setEndTime}
                                  modalVisible={modalVisible}
                                  toggleModalVisible={toggleModalVisible}
                />
            </View>
        )
    } else {
        const start = selectedRoute.path.getFirst();
        const end = selectedRoute.path.getLast();

        return (
            <View className="flex flex-1 justify-center">
                <RouteChoiceMap polylines={selectedRoute}/>
                <SelectedRouteTab startTime={startTime}
                                  selectedRoute={selectedRoute}
                                  endTime={endTime}
                                  setEndTime={setEndTime}
                                  modalVisible={modalVisible}
                                  toggleModalVisible={toggleModalVisible}
                />
            </View>
        )
    }
}








