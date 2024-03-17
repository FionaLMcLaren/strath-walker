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
        <View>
            <View className={classNames(
                "-z-10 flex mx-4 rounded-3xl translate-y-16 h-12",
                arrow && "scale-95 ",
                !arrow && "scale-90 ",
                !outline &&  "bg-black",
                colour==="tq" && outline && "bg-teal-400 border-2 border-black",
                colour==="pk" && outline && "bg-pink-300 border-2 border-black",
                colour==="yl" && outline && "bg-yellow-300 border-2 border-black"
            )}>
            </View>

            <Pressable
                onPress={action}
                className={classNames(
                    " rounded-3xl border-2 p-1.5 mx-6 flex justify-center overflow-hidden" +
                    " active:scale-95 transition-all",
                    colour==="tq" && !outline && "bg-teal-400 border-white",
                    colour==="pk" && !outline && "bg-pink-300 border-white ",
                    colour==="yl" && !outline && "bg-yellow-300 border-white",
                    outline && "bg-white border-black " )}>


                <BtnContent arrow={arrow} title={title} />

            </Pressable>
        </View>
    )
}
