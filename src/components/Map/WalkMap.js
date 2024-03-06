import {Text, View, StyleSheet} from "react-native";
import MapView, {Polyline} from "react-native-maps";
import {Marker} from "react-native-maps";
import React from "react";


export function WalkMap(props) {
    const coordinates = props.polyline ? props.polyline.getCoordinates() : [];
    return (
        <MapView
            className={styles.map}
            minZoomLevel={10}
            style={StyleSheet.absoluteFillObject, {height:"30%"}}
            initialRegion={{
                latitude: props.current.getLatitude(),
                longitude: props.current.getLongitude(),
                latitudeDelta: 0.002,
                longitudeDelta: 0.002,
            }}
        >
            <Marker
                coordinate={props.current.getPos()}
            >
                <View style={{backgroundColor: "yellow", padding: 10}}>
                    <Text>Me</Text>
                </View>

            </Marker>

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

    )
}

const styles = {
    map: "items-center justify-center h-4/5 bg-neutral-950",
};







