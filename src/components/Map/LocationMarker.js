import {View} from "react-native";
import Text from "../Elements/Text";
import React from "react";

export const MarkerStyle=(props)=>{
    return(
        <View className=" p-1 ">
            <View className="border-black border-2 border-b-4 rounded-md bg-white p-1 ">
                <Text className="z-30 text-black">{props.name}</Text>
            </View>
            <View className="absolute bg-white border-4 border-t-transparent border-l-transparent w-4 h-4 left-10 bottom-2 rotate-45 -translate-y-2 z-20 " />
            <View className="rounded-full h-4 w-4 bg-yellow-200 border-2 border-white translate-x-9 translate-y-0.5 z-10 " />
            <View className=" absolute rounded-full h-5 w-5 bg-black border-8 translate-x-9 translate-y-0.5 left-0.5 bottom-0.5 " />
        </View>
    );
}
