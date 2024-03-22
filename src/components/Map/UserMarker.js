import {Marker} from "react-native-maps";
import {Text, View} from "react-native";
import React from "react";
/*
The marker used for rendering the user's location on the map
 */
export const PosMarker = ({currentPos}) => {
    if(currentPos){
        return(
            <Marker
                coordinate={currentPos}
                tracksViewChanges={false}
            >
                    <View className=" rounded-full h-5 w-5 bg-pink-300 border-2 border-black  " />
                    <View className="absolute rounded-full h-5 w-5 border-2 border-white bg-transparent z-10 scale-90 " />
            </Marker>
        );
    }

}
