import React, {useEffect, useState} from "react";
import {View, ScrollView, Pressable} from "react-native";
import {Icon} from "react-native-paper";
import {PathGenerator} from '../components/Routes/GeneratePoints.js';
import {Location} from '../components/Routes/Location.js';
import {RouteChoiceMap} from '../components/Map/RouteChoiceMap.js';
import {getSuitablePolylines} from "../components/Routes/PolylineRequest";
import {loadPaths, savePath} from "../components/Routes/PathStorage";

import Text from "../components/Elements/Text";
import Button from "../components/Elements/NextBtn";
import MapTab from "../components/Elements/MapTab";
import RouteOption from "../components/Elements/RouteOption";
import classNames from "classnames";
import CompassModal from "../components/Walking/CompassModal";

export default function SelectedRoute({route, navigation}) {
    const selectedRoute = route.params.chosenRoute;

    const start = selectedRoute.path.getFirst();
    const end = selectedRoute.path.getLast();

    const startTime = new Date();
    const durationTime = new Date(selectedRoute.getDuration())
    const endTime = new Date(startTime.getTime() + durationTime.getTime());

    return (
            <View className="flex flex-1 justify-center">
                <RouteChoiceMap polyline={selectedRoute} />
                <MapTab routePage={true}>

                    <View>
                        <RouteOption key={selectedRoute.getKey()}
                                     route={selectedRoute}
                        />
                    </View>

                    <View className="-translate-y-2 py-2 ">
                        <Button
                            colour="tq"
                            action={() => {
                                console.log("pressed")
                                navigation.navigate("StartWalk",
                                    {
                                        startingTime: startTime,
                                        startingLoc: start,
                                        endingTime: endTime,
                                        endingLoc: end,
                                        selectedRoute: selectedRoute,
                                        savedRoute: true
                                    })
                            }}
                            title="Select Route"/>
                    </View>
                </MapTab>
            </View>
        )
}








