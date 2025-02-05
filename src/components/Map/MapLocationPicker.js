import React, {useState} from "react";
import { View, StyleSheet} from "react-native";
import MapView from "react-native-maps";
import {Location} from '../Routes/Location.js';
import {Marker} from "react-native-maps";
import SwitchBtn from "../Elements/Switch";
import {MarkerStyle} from "./LocationMarker";
import Geolocation from "@react-native-community/geolocation";
import Text from "../Elements/Text";
import {mapStyle} from "./mapStyle"
import {universityLocations} from "./LocationData";

/*
This map is displayed for when the user is choosing a start/end point. It shows all
the possible University locations they can start/end their walk.
 */

export default function MapLocationPicker(props) {

    const setToCurLoc = () => {
        Geolocation.getCurrentPosition(
            loc => {
                props.changeLoc(new Location("User Location", loc.coords.latitude, loc.coords.longitude))
                setUsingCurLoc(true);
                switchSetter(true);
            },
            error => {

                setUsingCurLoc(false);
            },
            {},
        );
    }

    const resetLoc = () => {
        props.changeLoc(new Location("",0,0))
        setUsingCurLoc(false);
        switchSetter(false);
    }

    const [usingCurLoc, setUsingCurLoc] = useState(false);
    const [switchValue, switchSetter] = React.useState(false);



    return(
           <View className="mt-6">

               <View className="absolute z-40 px-1 rounded-sm border-black border-b-4 border-2 -rotate-2 bg-white left-1 ">
                   <SwitchBtn
                       switchValue={switchValue}
                       switchSetter={switchSetter}
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
                {universityLocations.map((marker, index) => (
                    <Marker
                      coordinate={marker.getPos()}
                      onPress = {e=> {
                          props.changeLoc(marker)
                          setUsingCurLoc(false);
                          switchSetter(false)
                      }
                    }
                      key={index}
                      tracksViewChanges={false}
                    >
                    <LocationMarkerStyle loc={props.loc} name={marker.getName()}/>

                    </Marker>
                  ))}
                </MapView>
               </View>


           </View>
   	);



}

const LocationMarkerStyle =(props)=>{
    if(props.loc.getName() === props.name) {
        return (
            <View className=" p-1 ">
                <View className="border-black border-2 border-b-4 rounded-md bg-teal-100 p-1  ">
                    <Text className="z-30 text-black ">{props.name}</Text>
                </View>
                <View
                    className="absolute bg-teal-100 border-4 border-t-transparent border-l-transparent w-4 h-4 left-10 bottom-2 rotate-45 translate-x-7 -translate-y-2 z-20 "/>
                <View
                    className="rounded-full h-4 w-4 bg-yellow-400 border-2 border-white translate-x-16 translate-y-0.5 z-10 "/>
                <View
                    className=" absolute rounded-full h-5 w-5 bg-black border-8 translate-x-16 translate-y-0.5 left-0.5 bottom-0.5 "/>
            </View>
        );
    }else{
        return(<MarkerStyle name={props.name}/>);
    }
}






