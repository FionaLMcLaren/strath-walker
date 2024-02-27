import React, {useState} from "react";
import {Text, View, StyleSheet} from "react-native";
import MapView from "react-native-maps";
import {Marker} from "react-native-maps";
import {styled} from 'nativewind';


export default function RoutesMap(props) {

   	return(
   	    <MapView
   	      className={styles.map}
   	      minZoomLevel={10}
          style={StyleSheet.absoluteFillObject, {height:"30%"}}
          initialRegion={{
            latitude: 55.861873,
            longitude: -4.244115,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          }}
        >
        {props.points.map((marker) => (
            <Marker coordinate={marker.getPos()}>
                <View style={{backgroundColor: "blue", padding: 10}}>
                    <Text>{marker.getName()}</Text>
                </View>
            </Marker>
          ))}
        </MapView>
   	);



}


const styles = {
   		map: "items-center justify-center h-4/5 bg-neutral-950",
   	};







