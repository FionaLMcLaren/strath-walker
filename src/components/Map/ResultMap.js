import {Text, View, StyleSheet} from "react-native";
import MapView, {Polyline} from "react-native-maps";
import {Marker} from "react-native-maps";
import React from "react";


export function ResultMap(props) {
    return (
        <MapView
            className={styles.map}
            minZoomLevel={10}
            style={StyleSheet.absoluteFillObject, {height:"30%"}}
            initialRegion={{
                latitude: props.start.getLatitude(),
                longitude: props.start.getLongitude(),
                latitudeDelta: 0.002,
                longitudeDelta: 0.002,
            }}
        >

            <PosMarker currentPos = {props.current}/>
            <Polyline
                    key="ResultLine"
                    coordinates={props.coordinates}
                    strokeColor="#4285F4"
                    strokeWidth={6}
            />

        </MapView>

    )
}

const styles = {
    map: "items-center justify-center h-4/5 bg-neutral-950",
};

const PosMarker = ({currentPos}) => {
    if(currentPos){
        return(
            <Marker
                coordinate={currentPos}
            >
                <View style={{backgroundColor: "yellow", padding: 10}}>
                    <Text>Me</Text>
                </View>

            </Marker>
        );
    }

}
