import {Marker} from "react-native-maps";
import {Text, View} from "react-native";
import React from "react";

export const PosMarker = ({currentPos}) => {
    if(currentPos){
        return(
            <Marker
                coordinate={currentPos}
            >

                <View className="rounded-full h-12 w-12 bg-pink-300 border-2 border-white z-10 " />

            </Marker>
        );
    }

}
