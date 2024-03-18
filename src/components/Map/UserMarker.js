import {Marker} from "react-native-maps";
import {Text, View} from "react-native";
import React from "react";

export const PosMarker = ({currentPos}) => {
    if(currentPos){
        return(
            <Marker
                coordinate={currentPos}
                className="w-full h-full "
            >
                <View className="w-full h-full">

                <View className="absolute rounded-full h-5 w-5 bg-pink-300 border-2 border-white z-10 " />
                <View className="absolute rounded-full h-5 w-5 bg-black translate-y-0.5 " />

                </View>
            </Marker>
        );
    }

}
