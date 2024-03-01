import React, {useEffect, useState} from "react";
import {Text, View, ScrollView, SafeAreaView, TouchableHighlight} from "react-native";
import {PathGenerator} from '../components/Routes/GeneratePoints.js';
import {Location} from '../components/Routes/Location.js';
import {RouteChoiceMap} from '../components/Map/RouteChoiceMap.js';
import {getPolyline, Polyline} from "../components/Routes/PolylineRequest";
import {decode} from "@googlemaps/polyline-codec";

export default function Routes({route}) {

    const styles = { container: "flex flex-1 justify-center" };

    const startTime = route.params.startingTime;
    const start = route.params.startingLoc;
    const endTime = route.params.startingTime;
    const end = route.params.endingLoc;

    //const start = new Location("Rottenrow", 55.861873, -4.244115);
    //const end = new Location("Royal College", 55.8612, -4.2464);
    const middlePoints = [new Location("George Square", 55.8612, -4.2502), new Location("Glasgow Green", 55.8491, -4.2353), new Location("Buchanan Galleries", 55.8638, -4.2524)];

    // Get the potential destination order
    const pathGenerator = new PathGenerator(start, end, middlePoints);
    const potentialPaths = pathGenerator.getPaths();

    // Use the Google Routes API to get the actual routes
    const [routes, setRoutes] = useState([]);

    useEffect(() => {
        const fetchRoutes = async () => {
            const routes = [];
            for (let i = 0; i < potentialPaths.length; i++) {
                const path = potentialPaths[i];
                // const polyline = await getPolyline(path); // <-- spams api requests :p
                const polyline = new Polyline("Route " + i, decode("kk}sI~j|XJDwAhU^J?IJB?JPDQE?KKC?H_@KqApTFTkJ_Cq@Nr@O|@TTqFh@eQ\\\\iI@cDEmGdBa@xAb@RcELA\\\\QNSF]VcAJSHECd@JB"), path, 0, "0s");
                routes.push(polyline);
            }
            return routes;
        }
        fetchRoutes().then(routes => setRoutes(routes));
    }, []);

    const [selectedRoute, setSelectedRoute] = useState(null);

    return (
        <View className={styles.container}>
            <RouteChoiceMap polyline={selectedRoute} />

            <ScrollView>
                <Text>Choose a route:</Text>
                { routes.map((route) => { return (<RouteOption route={route} onPress={(route) => { setSelectedRoute(route) }} />) }) }
            </ScrollView>
        </View>
    );
}

const RouteOption=({ route, onPress })=> {
    return(
        <TouchableHighlight onPress={() => onPress(route)}>
            <View>
                <Text>[{route.getPath().getFirst().getName()}] -&gt; </Text>
                { route.getPath().getIntermediates().map((location) => { return(<Text>{location.getName()} -&gt;</Text>) }) }
                <Text>[{route.getPath().getLast().getName()}]</Text>
                <Text>Duration: {route.getDuration()}</Text>
                <Text>Distance: {route.getDistance()}m</Text>
            </View>
        </TouchableHighlight>
    );
}






