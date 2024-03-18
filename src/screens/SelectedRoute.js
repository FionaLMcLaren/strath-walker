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
import {readableDuration} from "../components/Time/TimeFunctions";

function SelectedRouteTab({pastWalk, navigation, selectedRoute, endTime, setEndTime, startTime, modalVisible, toggleModalVisible, start, end}) {
    let routeName
    let distance
    let duration

    if (pastWalk) {
        routeName = selectedRoute['selectedRoute'][0]['name'].toString() + " to " +
            selectedRoute['selectedRoute'][selectedRoute['selectedRoute'].length - 1]['name'].toString()
        distance = selectedRoute['distance']

        let timeDiff = new Date(selectedRoute['endTime'] - selectedRoute['startTime'])
        duration = readableDuration(timeDiff.getTime() / 1000);
    } else {
        routeName = selectedRoute.path.getReadableName()
        distance = selectedRoute.getDistance()
        duration = selectedRoute.getReadableDuration()
    }

    return (
        <>
            <MapTab routePage={true}>
                <View>
                    <RouteOption route={selectedRoute} routeName={routeName} routeDistance={distance} routeDuration={duration}/>
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
        </MapTab>

            <TimeSelect
            time={endTime}
            timeSetter={setEndTime}
            prevTime={startTime}
            modalVisible={modalVisible}
            toggleModalVisible={toggleModalVisible}
            selectedRoute={true}/>
        </>
    )
}

export default function SelectedRoute({route, navigation}) {
    const selectedRoute = route.params.chosenRoute;
    const pastWalk = route.params.pastWalk;

    const startTime = new Date();
    const [endTime, setEndTime] = useState(new Date(new Date().setHours(startTime.getHours() + 1)));

    const [modalVisible, toggleModalVisible] = useState(true);


    if (pastWalk) {
        return (
            <View className="flex flex-1 justify-center">
                <PrevWalkMap walk={selectedRoute}/>
                <SelectedRouteTab pastWalk={true}
                                  navigation={navigation}
                                  startTime={startTime}
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
                <RouteChoiceMap polyline={selectedRoute}/>
                <SelectedRouteTab navigation={navigation}
                                  startTime={startTime}
                                  selectedRoute={selectedRoute}
                                  endTime={endTime}
                                  setEndTime={setEndTime}
                                  modalVisible={modalVisible}
                                  toggleModalVisible={toggleModalVisible}
                                  start={start}
                                  end={end}
                />
            </View>
        )
    }
}








