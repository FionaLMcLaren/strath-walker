import React from "react";
import { View, Pressable } from "react-native";
import {Icon } from "react-native-paper";
import Text from "./Text"
import classNames from 'classnames';

export default function NextBtn({title, colour, action}) {

    return (
        <View className="mt-6">
            <View className="absolute w-full h-full bg-black rounded-3xl translate-y-2.5 scale-90 " />
            <Pressable
                onPress={action}
                className={classNames(
                    " rounded-3xl border-2 border-white p-1.5 mx-6 flex justify-center overflow-hidden  " +
                    " active:scale-95 transition-all ",
                    colour==="tq" && "bg-teal-400",
                    colour==="pk" && "bg-pink-300",
                    colour==="yl" && "bg-yellow-300")}>


                <View className="flex flex-row gap-16 self-center items-center">
                        <Text bold={true} title={true}>
                            {title}
                        </Text>


                    <View className="flex items-center bg-black rounded-full p-1">
                        <Icon
                            source="arrow-right"
                            size={30}
                            color={"white"}
                        />
                    </View>
                </View>

            </Pressable>
        </View>
    )
}