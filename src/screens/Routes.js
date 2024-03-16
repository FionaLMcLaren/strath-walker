import React, {useEffect, useState} from "react";
import {Text, View, ScrollView, SafeAreaView, TouchableHighlight, Button} from "react-native";
import {PathGenerator} from '../components/Routes/GeneratePoints.js';
import {Location} from '../components/Routes/Location.js';
import {RouteChoiceMap} from '../components/Map/RouteChoiceMap.js';
import {getSuitablePolylines} from "../components/Routes/PolylineRequest";
import {locationPoints} from "../components/Routes/Points";

export default function Routes({route, navigation}) {

    const styles = { container: "flex flex-1 justify-center" };

    const startTime = route.params.startingTime;
    const start = route.params.startingLoc;
    const endTime = route.params.endingTime;
    const end = route.params.endingLoc;





    // Use the Google Routes API to get the actual routes
    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        // Get the potential destination order
        const pathGenerator = new PathGenerator(start, end, locationPoints);
        const potentialPaths = pathGenerator.getPaths();

        getSuitablePolylines(potentialPaths, startTime, endTime).then(routes => setRoutes(routes));
    }, []);



    const [selectedRoute, setSelectedRoute] = useState(null);


    return (
        <View className={styles.container}>
            <RouteChoiceMap polylines={selectedRoute} />

            <ScrollView>
                {
                    routes
                    ?   routes.map((route) => { return (<RouteOption key={route.getKey()} route={route} onPress={(route) => { setSelectedRoute(route) }} />) })
                    :   <Text>Loading...</Text>
                }

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
                />

            </ScrollView>
        </View>
    );
}

const RouteOption=({ route, onPress })=> {
    return(
        <TouchableHighlight onPress={() => onPress(route)}>
            <View>
                <Text>{route.path.getReadableName()}</Text>
                <Text>Duration: {route.getDuration()}s</Text>
                <Text>Distance: {route.getDistance()}m</Text>
            </View>
        </TouchableHighlight>
    );
}






