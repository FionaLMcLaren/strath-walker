import {View} from "react-native";
import Text from "./Text";
import React from "react";
import classNames from 'classnames';

export default function Label({title, text, colour}) {
    return(
    <View className="flex flex-row self-center gap-2">
        <View className={classNames(
            "border-2 border-b-4 rounded-lg p-1 px-2 ",
            colour==="tq" && "bg-teal-400",
            colour==="pk" && "bg-pink-300",
            colour==="yl" && "bg-yellow-300")}
        >
            <Text className="text-black text-xl tracking-wide"> {title} </Text>
        </View>
        <View className="p-2">
            <Text className="text-black text-xl tracking-wide"> {text} </Text>
        </View>
    </View>
    );
}