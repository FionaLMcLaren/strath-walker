import React, {useEffect, useState} from "react";
import {View, ScrollView, Pressable} from "react-native";
import {Icon} from "react-native-paper";
import {PathGenerator} from '../../components/Routes/GeneratePoints.js';
import {RouteChoiceMap} from '../../components/Map/RouteChoiceMap.js';
import {getSuitablePolylines} from "../../components/Routes/PolylineRequest";
import Text from "../../components/Elements/Text";
import Button from "../../components/Elements/NextBtn";
import MapTab from "../../components/Elements/MapTab";
import Label from "../../components/Elements/Label";
import classNames from "classnames";
import Popup from "../../components/Elements/Popup";
import {pointsOfInterest} from "../../components/Map/LocationData";
import LoadScreen from "../../components/Elements/LoadingScreen"


//Page for selecting the route
export default function Routes({route, navigation}) {

    const startTime = route.params.startingTime;
    const start = route.params.startingLoc;
    const endTime = route.params.endingTime;
    const end = route.params.endingLoc;

    // Use the Google Routes API to get the actual routes
    const [routes, setRoutes] = useState([]);

    const [loadScreenVisible, setLoadScreenVisible] = useState(true) //sets if loading screen is beeing seen or not

    useEffect(() => {
        // Get the potential destination order
        const pathGenerator = new PathGenerator(start, end, pointsOfInterest);
        const potentialPaths = pathGenerator.getPaths();

        getSuitablePolylines(potentialPaths, startTime, endTime).then(
            routes => {
                setRoutes(routes)
                setLoadScreenVisible(false)
                }
            );
    }, []);

    const [selectedRoute, setSelectedRoute] = useState(null);

    const [popupVisible, togglePopupVisible] = React.useState(false);

    if (routes.length > 0) {
        return (
            <>
                { (loadScreenVisible) ? <LoadScreen  /> : null }
                <View className="flex flex-1 justify-center">
                    <RouteChoiceMap polylines={selectedRoute} />
                    <MapTab routePage={true}>
                        {routes>1 ? <SwipeArrow /> : null}
                        <ScrollView horizontal={true} className="pb-4 ">
                            { routes.map((route) => {
                                        return(
                                            <RouteOption key={route.getKey()}
                                                         route={route}
                                                         onPress={(route) => { setSelectedRoute(route) }}
                                                         currentSel={selectedRoute}
                                            />)
                                    }) }

                        </ScrollView>
                        <View className="pb-4 ">
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
                                        togglePopupVisible(true)
                                    }
                                }}
                                title="Select Route"/>
                        </View>
                    </MapTab>

                    <Popup snackbarVisible={popupVisible}
                           toggleSnackbarVisible={togglePopupVisible}
                           text={"No selected route!"}
                    />
                </View>
            </>
        )
    } else {
        return (
            <>
                { (loadScreenVisible) ? <LoadScreen  /> : null }
                <NoRouteNotice navigation={navigation} startTime={startTime} startPoint={start} />
            </>
        )
    }

}





//Route Option button that has the details of the route
function RouteOption({ route, onPress, currentSel }) {
    const isSelected = route === currentSel;

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

//Scrolling arrows for route selection carousel
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


//Notice for when no routes are possible
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

            <View className="flex gap-4 pt-4">
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

        </View>
    )
}







