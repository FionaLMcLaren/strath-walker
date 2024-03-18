import React, {useState} from "react";
import { View, StyleSheet} from "react-native";
import MapView from "react-native-maps";
import {Location} from '../Routes/Location.js';
import {Marker} from "react-native-maps";
import SwitchBtn from "../Elements/Switch";
import {MarkerStyle} from "LocationMarker";
import Geolocation from "@react-native-community/geolocation";
import {universityPoints} from "../components/Routes/Points";



export default function MapLocationPicker(props) {

    const setToCurLoc = () => {
        Geolocation.getCurrentPosition(
            loc => {
                props.changeLoc(new Location("User Location", loc.coords.latitude, loc.coords.longitude))
                setUsingCurLoc(true);
            },
            error => {
                console.log(error.code, error.message);
                setUsingCurLoc(false);
            },
            {},
        );
    }

    const resetLoc = () => {
        props.changeLoc(new Location("",0,0))
        setUsingCurLoc(false);
    }

    const [usingCurLoc, setUsingCurLoc] = useState(false);

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
                    "visibility": "off"
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
                    "visibility": "off"
                }
            ]
        }
    ]

    return(
           <View className="mt-6">

               <View className="absolute z-40 px-1 rounded-sm border-black border-b-4 border-2 -rotate-2 bg-white left-1 ">
                   <SwitchBtn
                       switchDefault={usingCurLoc}
                       switchText={"Use current location"}
                       switchAction={setToCurLoc}
                       switchOffAction={resetLoc}
                   />

               </View>

               <View className="h-96 scale-95 rounded-md border-2 border-b-8">
                <MapView
                  minZoomLevel={17}
                  style={StyleSheet.absoluteFillObject, {height:"100%"}}
                  customMapStyle={mapStyle}
                  initialRegion={{
                    latitude: 55.861873,
                    longitude: -4.244115,
                    latitudeDelta: 0.002,
                    longitudeDelta: 0.002,
                  }}
                >
                {universityPoints.map((marker) => (
                    <Marker
                      coordinate={marker.getPos()}
                      onPress = {e=>props.changeLoc(marker)}
                      key={marker.getName()}
                    >
                    <MarkerStyle loc={props.loc} name={marker.getName()}/>

                    </Marker>
                  ))}
                </MapView>
               </View>


           </View>
   	);



}




const styles = {
   		map: "items-center justify-center h-4/5 ",
   	};







