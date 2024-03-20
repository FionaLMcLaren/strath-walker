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
import Label from "../components/Elements/Label";
import classNames from "classnames";
import CompassModal from "../components/Walking/CompassModal";
import Popup from "../components/Elements/Popup";
import {pointsOfInterest} from "../components/Map/LocationData";

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
                    <Text>{route.getReadableDuration()}</Text>
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

function NoRouteNotice ({navigation, startTime, startPoint}) {
    return (
        <View className="flex flex-1 justify-center items-center ">
            <View className="flex items-center justify-center w-56 p-2 m-6 scale-150 ">
                <Text xlTitle={true} black={true} >No Routes</Text>
                <Text xlTitle={true} black={true} >Found!</Text>
            </View>
            <View className="flex flex-row">
                <Text>Try adjusting your</Text>
                <Text colour={true}> start/end </Text>
                <Text>points</Text>
            </View>

            <Button
                title={"Change Start Point"}
                action={() =>
                    navigation.navigate("StartPoint")
                }
                colour="tq"
            />
            <Button
                title={"Change End Point"}
                action={() =>
                    navigation.navigate("EndPoint",
                    {
                        startingTime: startTime,
                        startingLoc: startPoint
                    })
                }
                colour="tq"
                outline={true}
            />

        </View>
    )
}
export default function Routes({route, navigation}) {

    const startTime = route.params.startingTime;
    const start = route.params.startingLoc;
    const endTime = route.params.endingTime;
    const end = route.params.endingLoc;
    /*
    const startTime = new Date(new Date().setHours(10,30,0,0));
    const endTime = new Date(new Date().setHours(11,0,0,0));
    const start = new Location("Rottenrow", 55.861873, -4.244115);
    const end = new Location("Royal College", 55.8612, -4.2464);
*/

    // Use the Google Routes API to get the actual routes
    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        // Get the potential destination order
        const pathGenerator = new PathGenerator(start, end, pointsOfInterest);
        const potentialPaths = pathGenerator.getPaths();

        getSuitablePolylines(potentialPaths, startTime, endTime).then(routes => setRoutes(routes));
    }, []);

    const [selectedRoute, setSelectedRoute] = useState(null);

    const [popupVisible, togglePopupVisible] = React.useState(false);

    if (routes.length > 0) {
        return (
            <View className="flex flex-1 justify-center">
                <RouteChoiceMap polyline={selectedRoute} />
                <MapTab routePage={true}>
                    {routes>1 ? <SwipeArrow /> : null}
                    <ScrollView horizontal={true}>
                        {
                            routes ?
                                routes.map((route) => {
                                    return(
                                        <RouteOption key={route.getKey()}
                                                     route={route}
                                                     onPress={(route) => { setSelectedRoute(route) }}
                                                     currentSel={selectedRoute}
                                        />)
                                })
                                :   <Text>Loading...</Text>
                        }
                    </ScrollView>

                    <View className="-translate-y-2 py-2 ">
                        <Button
                            colour="tq"
                            action={() => {
                                if (selectedRoute) {
                                    navigation.navigate("StartWalk",
                                        {
                                            startingTime: startTime,
                                            startingLoc: start,
                                            endingTime: endTime,
                                            endingLoc: end,
                                            selectedRoute: selectedRoute,
                                            savedRoute: false
                                        })
                                } else {
                                    toggleSnackbarVisible(true)
                                }
                            }}
                            title="Select Route"/>
                    </View>
                </MapTab>

                <Popup snackbarVisible={popupVisible}
                       toggleSnackbarVisible={togglePopupVisible}
                       text={"Can't start a walk outside of University hours!"}
                />
            </View>
        )
    } else {
        return (
            <NoRouteNotice navigation={navigation} startTime={startTime} startPoint={start} />
        )
    }

}








