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
import Title from "../components/Elements/Title";
import Label from "../components/Elements/Label";
import classNames from "classnames";

function RouteOption({ route, onPress, currentSel }) {
    const isSelected = route == currentSel;

    return (
        <Pressable onPress={() => onPress(route)} className=" w-[26rem] px-4 py-1 active:scale-95 transition-all ">


            <View className={classNames(
                " border-2 rounded-lg p-2 flex flex-1 gap-2",
                isSelected && "bg-teal-200",
                !isSelected && "bg-teal-100"
                )}>
                {
                    isSelected ?
                        <View className="absolute z-40 px-1 rounded-sm border-black border-b-4 border-2 -rotate-2 bg-pink-300 -translate-y-2 scale-90 ">
                            <Text bold={true}>SELECTED</Text>
                        </View>
                        :
                        null
                }

                <Label title={"Name"} colour="yl"/>
                <Text>{route.path.getReadableName()}</Text>
                <Label title={"Duration"} colour="yl">
                    <Text>{route.getDuration()}s</Text>
                </Label>
                <Label title={"Distance"} colour="yl">
                    <Text>{route.getDistance()}m</Text>
                </Label>


            </View>
        </Pressable>
    );
}

function SwipeArrow() {
    return (
        <View className="absolute flex flex-row gap-96 justify-center items-center h-full ml-2 -translate-y-2 ">
            <View className="z-50 animate-pulse ">
                <Icon source="menu-left" size={35} color="black"/>
            </View>

            <View className="z-50 animate-pulse ">
                <Icon source="menu-right" size={35} color="black" />
            </View>
        </View>
    )
}
export default function Routes({route, navigation}) {
    /*
    const startTime = route.params.startingTime;
    const start = route.params.startingLoc;
    const endTime = route.params.endingTime;
    const end = route.params.endingLoc;
     */


    const startTime = new Date(new Date().setHours(9,0,0,0));
    const endTime = new Date(new Date().setHours(10,15,0,0));
    const start = new Location("Rottenrow", 55.861873, -4.244115);
    const end = new Location("Royal College", 55.8612, -4.2464);


    const middlePoints = [new Location("George Square", 55.8612, -4.2502), new Location("Glasgow Green", 55.8491, -4.2353), new Location("Buchanan Galleries", 55.8638, -4.2524)];



    // Use the Google Routes API to get the actual routes
    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        // Get the potential destination order
        const pathGenerator = new PathGenerator(start, end, middlePoints);
        const potentialPaths = pathGenerator.getPaths();

        getSuitablePolylines(potentialPaths, startTime, endTime).then(routes => setRoutes(routes));
    }, []);

    const [selectedRoute, setSelectedRoute] = useState(null);


    return (
        <View className="flex flex-1 justify-center">
            <RouteChoiceMap polyline={selectedRoute} />

            <View className="absolute bottom-0 z-30 bg-teal-400 w-full rounded-md h-[25rem] border-2 border-t-4 " ></View>
            <View className="absolute bottom-0 z-40 bg-white p-4 rounded-md mx-2 border-2 -translate-y-2 ">
                <SwipeArrow />
                <ScrollView horizontal={true}>
                    {
                        routes
                        ?   routes.map((route) => { return(
                                    <RouteOption key={route.getKey()}
                                                 route={route}
                                                 onPress={(route) => { setSelectedRoute(route) }}
                                                 currentSel={selectedRoute}
                                    />) })
                        :   <Text>Loading...</Text>
                    }
                </ScrollView>


                <Button

                        title="Select Route"
                        action={() => navigation.navigate("StartWalk",
                            {
                                startingTime: startTime,
                                startingLoc: start,
                                endingTime: endTime,
                                endingLoc: end,
                                selectedRoute: selectedRoute,
                            })
                        }
                        colour="tq"
                    />
            </View>
        </View>
    );
}








