import {Text, View, StyleSheet} from "react-native";
import MapView, {Polyline} from "react-native-maps";
import {PosMarker} from "./UserMarker";
import React from "react";


export function WalkMap(props) {
    const coordinates = props.polyline ? props.polyline.getCoordinates() : [];

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
                    latitude: props.start.getLatitude(),
                    longitude: props.start.getLongitude(),
                    latitudeDelta: 0.002,
                    longitudeDelta: 0.002,
                }}
            >
                <PosMarker currentPos = {props.current}/>

                {
                    props.polyline &&
                    <Polyline
                        key={props.polyline.getKey()}
                        coordinates={coordinates}
                        strokeColor="#4285F4"
                        strokeWidth={6}
                    />
                }
            </MapView>
        </View>

    )
}

const styles = {
    map: "items-center justify-center ",
};









