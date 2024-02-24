import React, {useState} from "react";
import {Text, View, StyleSheet} from "react-native";
import MapView from "react-native-maps";

import {Marker} from "react-native-maps";
import {styled} from 'nativewind';


const points = [{name: "Rottenrow", pos:{latitude: 55.861873, longitude: -4.244115}}, {name: "Royal College", pos:{latitude:55.8612, longitude: -4.2464}}];

export default function MapLocationPicker(props) {

   	return(
   	    <MapView
   	      className={styles.map }
   	      minZoomLevel={17}
          style={StyleSheet.absoluteFillObject, {height:"75%"}}
          initialRegion={{
            latitude: 55.861873,
            longitude: -4.244115,
            latitudeDelta: 0.002,
            longitudeDelta: 0.002,
          }}
        >
        {points.map((marker) => (
            <Marker

              coordinate={marker.pos}
              onPress = {e=>props.changeStart(marker.name)}

            >
            <MarkerStyle start={props.start} name={marker.name}/>

            </Marker>
          ))}
        </MapView>
   	);



}

const MarkerStyle=(props)=>{
    if(props.start === props.name){
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
   		map: "items-center justify-center h-4/5 bg-neutral-950",
   	};







