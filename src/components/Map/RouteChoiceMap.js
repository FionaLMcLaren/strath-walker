import {StyleSheet, View} from "react-native";
import MapView, {Marker, Polyline} from "react-native-maps";
import {MarkerStyle} from "./LocationMarker";
import React from "react";
import {mapStyle} from "./mapStyle"

/*
This map is displayed for viewing route options available when a user goes to
pick the walk they want to do. It renders the stops that are visited as location
markers and a polyline that shows how we path through these stops.
 */
export const RouteChoiceMap = ({polylines}) => {

    return (
        <View className="h-full ">
            <MapView
                className={styles.map}
                minZoomLevel={10}
                style={StyleSheet.absoluteFillObject, {height:"80%"}}
                customMapStyle={mapStyle}
                initialRegion={{
                    latitude: 55.851873,
                    longitude: -4.244155,
                    latitudeDelta: 0.025,
                    longitudeDelta: 0.025,
                }}
            >
                <RenderPolylines polylines={polylines}/>
                <CheckPoints points={polylines}/>
            </MapView>
        </View>
    )
}

const RenderPolylines=({polylines})=>{
        if(polylines){
            return polylines.getCoordinates().map((coordinates, index)=>{
                if(index%2===0){
                    return(<EvenLine key={"lineContainer"+index} coord={coordinates} index={index}/>);
                }else{
                    return(<OddLine key={"lineContainer"+index} coord={coordinates} index={index}/>);
                }

            });
        }

    }

    const OddLine=({coord, index})=>{
        return(
            <Polyline
                key={"line"+index}
                coordinates={coord}
                strokeColor="#2dd4bf"
                strokeWidth={6}
                tracksViewChanges={false}
            />

        );
    }

    const EvenLine=({coord, index})=>{
        return(
            <Polyline
                key={"line"+index}
                coordinates={coord}
                strokeColor="#f9a8d4"
                strokeWidth={6}
                tracksViewChanges={false}
            />

        );
    }


const CheckPoints=({points})=>{
    if(points){
        return points.getPath().getPath().map((marker, index)=>{
            return(
                <Marker
                    coordinate={marker.getPos()}
                    key={"point"+index}
                >
                    <MarkerStyle name={marker.getName()}/>
                </Marker>
            );
        });
    }

}

const styles = {
    map: "items-center justify-center ",
};

export default RouteChoiceMap;







