import {Text, View, StyleSheet} from "react-native";
import MapView, {Marker, Polyline} from "react-native-maps";
import {PosMarker} from "./UserMarker";
import React from "react";
import {MarkerStyle} from "./LocationMarker";


export function WalkMap(props) {
    const coordinates = props.polyline ? props.polyline.getLeg() : [];

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

                <DestinationMarker destination={props.destination}/>

                {
                    props.polyline &&
                    <Polyline
                        key={props.polyline.getKey()}
                        coordinates={coordinates}
                        strokeColor="#2dd4bf"
                        strokeWidth={6}
                    />
                }
            </MapView>
        </View>

    )
}

const DestinationMarker = ({destination})=>{
    if(destination){
        return(
            <Marker
                coordinate={destination.getPos()}
                key={destination.getName()}
            >
                <MarkerStyle name={destination.getName()}/>

            </Marker>
        );
    }
}

const styles = {
    map: "items-center justify-center h-4/5 bg-neutral-950",
};









