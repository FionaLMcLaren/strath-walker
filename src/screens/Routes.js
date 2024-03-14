import React, {useEffect, useState} from "react";
import { View, ScrollView, SafeAreaView, TouchableHighlight} from "react-native";
import {PathGenerator} from '../components/Routes/GeneratePoints.js';
import {Location} from '../components/Routes/Location.js';
import {RouteChoiceMap} from '../components/Map/RouteChoiceMap.js';
import {getSuitablePolylines} from "../components/Routes/PolylineRequest";

import Text from "../components/Elements/Text";
import Button from "../components/Elements/NextBtn";
import Title from "../components/Elements/Title";
import Label from "../components/Elements/Label";

const RouteOption=({ route, onPress })=> {
    return(
        <TouchableHighlight onPress={() => onPress(route)} className="scale-90 bg-red-400">
            <View className="bg-teal-100 border-2 rounded-lg p-1 flex flex-1">
                <Label title={"Name"} colour="yl"/>
                <Text>{route.path.getReadableName()}</Text>
                <Label title={"Duration"} colour="yl">
                    <Text>{route.getDuration()}s</Text>
                </Label>
                <Label title={"Distance"} colour="yl">
                    <Text>{route.getDistance()}m</Text>
                </Label>


            </View>
        </TouchableHighlight>
    );
}
export default function Routes({route, navigation}) {

    const styles = { container: "" };

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

            <View className="absolute bottom-0 z-40 bg-teal-400 w-full rounded-md h-1/3 border-2 border-t-4 " ></View>
            <View className="absolute bottom-0 z-50 bg-white p-4 rounded-md mx-2 border-2 -translate-y-2 ">

            <ScrollView horizontal={true}>
                {
                    routes
                    ?   routes.map((route) => { return (<RouteOption key={route.getKey()} route={route} onPress={(route) => { setSelectedRoute(route) }} />) })
                    :   <Text>Loading...</Text>
                }
            </ScrollView>

                <Button
                    title="Select Route"
                    onPress={() => navigation.navigate("StartWalk",
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








