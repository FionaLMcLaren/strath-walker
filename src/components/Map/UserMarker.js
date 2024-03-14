import {Marker} from "react-native-maps";
import {Text, View} from "react-native";
import React from "react";

export const PosMarker = ({currentPos}) => {
    if(currentPos){
        return(
            <Marker
                coordinate={currentPos}
            >
                <View style={{backgroundColor: "yellow", padding: 10}}>
                    <Text>Me</Text>
                </View>

            </Marker>
        );
    }

}
