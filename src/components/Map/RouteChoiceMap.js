import {Text, View, StyleSheet} from "react-native";
import MapView, {Polyline} from "react-native-maps";
import {Marker} from "react-native-maps";
import {MarkerStyle} from "./LocationMarker";
import React from "react";

export const RouteChoiceMap = ({polylines}) => {

    const mapStyle = [
        {
            "featureType": "administrative",
            "elementType": "geometry",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "poi",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "poi.park",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        },
        {
            "featureType": "road",
            "elementType": "labels.icon",
            "stylers": [
                {
                    "visibility": "off"
                }
            ]
        },
        {
            "featureType": "transit",
            "stylers": [
                {
                    "visibility": "simplified"
                }
            ]
        }
    ]

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
            />

        );
    }

    const EvenLine=({coord, index})=>{
        return(
            <Polyline
                key={"line"+index}
                coordinates={coord}
                strokeColor="#fde047"
                strokeWidth={6}
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







