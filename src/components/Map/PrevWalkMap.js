import {Text, View, StyleSheet} from "react-native";
import MapView, {Polyline} from "react-native-maps";
import {Marker} from "react-native-maps";
import React from "react";
export function PrevWalkMap(route) {
  return (
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

      {
        route.walk &&
        <Polyline
          key="PrevWalkLine"
          coordinates={route.walk['walkedCoords']}
          strokeColor="#4285F4"
          strokeWidth={6}
        />

      }
      {
        route.walk &&
        route.walk['selectedRoute'].map((marker) => (
        <Marker
          coordinate={{
            latitude: marker['latitude'] ? marker['latitude'] : 0,
            longitude: marker['longitude'] ? marker['longitude'] : 0
        }}
        >
          <MarkerStyle name={marker['name']}/>

        </Marker>
      ))}
    </MapView>

  )
}

const MarkerStyle=({name})=>{
    return(<View style={{backgroundColor: "yellow", padding: 10}}>
      <Text>{name}</Text>
    </View>);
}

const styles = {
  map: "items-center justify-center h-4/5 bg-neutral-950",
};
