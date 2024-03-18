import {Text, View, StyleSheet} from "react-native";
import MapView, {Polyline} from "react-native-maps";
import {Marker} from "react-native-maps";
import React from "react";
import {PosMarker} from "./UserMarker";

export function PrevWalkMap(route) {
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
