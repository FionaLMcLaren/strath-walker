import {StyleSheet, View} from "react-native";
import MapView, {Polyline} from "react-native-maps";
import {PosMarker} from "./UserMarker";
import React from "react";
import {mapStyle} from "./mapStyle"

/*
This map is displayed when a walk ends, showing the progress of the user's walk as an animated
polyline.
 */
export function ResultMap(props) {


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

                <PosMarker currentPos = {props.current}/>
                <Polyline
                        key="ResultLine"
                        coordinates={props.coordinates}
                        strokeColor="#2dd4bf"
                        strokeWidth={6}
                />

            </MapView>
        </View>

    )
}

const styles = {
    map: "items-center justify-center h-4/5 bg-neutral-950",
};


