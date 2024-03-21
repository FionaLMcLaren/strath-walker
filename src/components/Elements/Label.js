import {View} from "react-native";
import Text from "./Text";
import React from "react";
import classNames from 'classnames';

export default function Label(props) {

    return(
    <View className="flex flex-row self-center gap-2 items-center ">
        <View className={classNames(
            "border-2 border-b-4 rounded-lg p-1 px-2 h-12 ",
            props.colour ==="tq" && "bg-teal-400",
            props.colour ==="pk" && "bg-pink-300",
            props.colour ==="yl" && "bg-yellow-300")}
        >
            <Text className="text-black text-xl tracking-wide"> {props.title} </Text>
        </View>
        <View className="p-2 w-1/2 ">
            <Text className="text-black text-xl tracking-wide"> {props.children} </Text>
        </View>
    </View>
    );
}