import {Marker} from "react-native-maps";
import {Text, View} from "react-native";
import React from "react";

export const PosMarker = ({currentPos}) => {
    if(currentPos){
        return(
            <Marker
                coordinate={currentPos}
            >

                <View className="rounded-full h-6 w-6 bg-pink-300 border-2 border-white z-10 " />
                <View className="rounded-full h-6 w-6 bg-black -translate-y-2 " />

            </Marker>
        );
    }

}
