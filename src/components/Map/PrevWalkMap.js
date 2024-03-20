import {Text, View, StyleSheet} from "react-native";
import MapView, {Polyline} from "react-native-maps";
import {Marker} from "react-native-maps";
import React from "react";
import {PosMarker} from "./UserMarker";
import {mapStyle} from "./mapStyle"

export function PrevWalkMap(route) {

  return (
    <MapView
      className={styles.map}
      minZoomLevel={10}
      style={StyleSheet.absoluteFillObject, {height:"100%"}}
      customMapStyle={mapStyle}
      initialRegion={{
          latitude: 55.851873,
          longitude: -4.244155,
          latitudeDelta: 0.025,
          longitudeDelta: 0.025,
      }}
    >

      {
        route.walk &&
        <Polyline
          key="PrevWalkLine"
          coordinates={route.walk['walkedCoords']}
          strokeColor="#2dd4bf"
          strokeWidth={6}
        />

      }
      {
        route.walk &&
        route.walk['selectedRoute'].map((marker, index) => (
            <Marker
              coordinate={{
                latitude: marker['latitude'] ? marker['latitude'] : 0,
                longitude: marker['longitude'] ? marker['longitude'] : 0
            }}
              key={index}
            >
              <MarkerStyle name={marker['name']}/>

            </Marker>
      ))}
    </MapView>

  )
}

const MarkerStyle=({name})=>{
    return(
        <View className=" p-1 z-10 ">
            <View className="border-black border-2 border-b-4 rounded-md bg-white p-1  ">
                <Text className="z-30 text-black ">{name}</Text>
            </View>
            <View className="absolute bg-white border-4 border-t-transparent border-l-transparent w-4 h-4 left-10 bottom-2 rotate-45 -translate-y-2 z-20 " />
            <View className="rounded-full h-4 w-4 bg-yellow-300 border-2 border-white translate-x-9 translate-y-0.5 z-10 " />
            <View className=" absolute rounded-full h-5 w-5 bg-black border-8 translate-x-9 translate-y-0.5 left-0.5 bottom-0.5 " />
        </View>

    );
}

const styles = {
  map: "items-center justify-center h-4/5 bg-neutral-950",
};
