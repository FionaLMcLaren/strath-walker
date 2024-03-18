import React from "react";
import { View, Pressable } from "react-native";
import {Icon } from "react-native-paper";
import Text from "./Text"
import classNames from 'classnames';

function BtnContent ({title, arrow}) {
    return (
        <View className={classNames(
            "flex flex-row gap-16 self-center items-center ",
            !arrow && "px-6",
            arrow && "px-3")}>
            <Text bold={true} title={true}>
                {title}
            </Text>


            {(arrow) ?
                <View className="flex items-center bg-black rounded-full p-1">
                    <Icon
                        source="arrow-right"
                        size={30}
                        color={"white"}
                    />
                </View>
                : null
            }
        </View>
    )
}
export default function NextBtn({title, colour, action, arrow, outline}) {

    return (
        <Pressable onPress={action} className="active:scale-95 transition-all">
            <View
                onPress={action}
                className={classNames(
                    " rounded-3xl border-2 border-b-4 border-r-4 p-1.5 mx-6 flex justify-center overflow-hidden",
                    colour==="tq" && !outline && "bg-teal-400 border-black",
                    colour==="pk" && !outline && "bg-pink-300 border-black ",
                    colour==="yl" && !outline && "bg-yellow-300 border-black",
                    colour==="tq" && outline && "bg-white border-teal-400",
                    colour==="pk" && outline && "bg-white border-pink-300",
                    colour==="yl" && outline && "bg-white border-yellow-300" )}>


                <BtnContent arrow={arrow} title={title} />

            </View>
        </Pressable>
    )
}
