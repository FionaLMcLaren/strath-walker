import React, {useState} from "react";
import {Text, View, StyleSheet} from "react-native";
import MapView from "react-native-maps";
import {Location} from '../Routes/Location.js';
import {Marker} from "react-native-maps";


const points = [new Location("Rottenrow", 55.861873, -4.244115), new Location("Royal College", 55.8612, -4.2464)];

export default function MapLocationPicker(props) {

   	return(
   	    <MapView
   	      minZoomLevel={17}
          style={StyleSheet.absoluteFillObject, {height:"100%"}}
          initialRegion={{
            latitude: 55.861873,
            longitude: -4.244115,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          }}
        >
        {points.map((marker) => (
            <Marker
              coordinate={marker.getPos()}
              onPress = {e=>props.changeLoc(marker)}
            >
            <MarkerStyle loc={props.loc} name={marker.getName()}/>

            </Marker>
          ))}
        </MapView>
   	);



}

const MarkerStyle=(props)=>{
    if(props.loc.getName() === props.name){
        return(<View style={{backgroundColor: "yellow", padding: 10}}>
                    <Text>{props.name}</Text>
               </View>);

    }else{
        return(<View style={{backgroundColor: "blue", padding: 10}}>
                    <Text>{props.name}</Text>
               </View>);

    }
}


const styles = {
   		map: "items-center justify-center h-4/5 ",
   	};







