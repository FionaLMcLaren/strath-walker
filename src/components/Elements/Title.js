import React from "react";
import { View} from "react-native";
import Text from "../Elements/Text"
import {Icon} from "react-native-paper";
import classNames from 'classnames';

export default function Title({title, icon, colour}) {

    return (
        <View className="flex flex-row items-center gap-2 ml-2 ">
            <View
                className={classNames(
                    "border-black border-2 border-b-4 border-r-4 rounded-md h-16 w-16 p-2.5 scale-90",
                    colour==="tq" && "bg-teal-400",
                    colour==="pk" && "bg-pink-300",
                    colour==="yl" && "bg-yellow-300")}
            >
                <View className="z-10">
                    <Icon source={icon} size={32} color={"white"}/>
                </View>

                <View className="absolute left-2.5 bottom-2 scale-110 ">
                    <Icon source={icon} size={32} color={"black"}/>
                </View>

            </View>

            <View className="relative">
                <Text
                    black={true}
                    title={true}
                >
                    {title}
                </Text>
                <View className={classNames(
                    "absolute h-3 w-3/4 right-0 bottom-0",
                    colour==="tq" && "bg-teal-200",
                    colour==="pk" && "bg-pink-100",
                    colour==="yl" && "bg-yellow-100")}/>
            </View>

        </View>
    )
}