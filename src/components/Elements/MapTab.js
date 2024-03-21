import {View} from "react-native";
import React from "react";
import classNames from "classnames";

export default function MapTab(props) {
    return (
        <>
            <View className={classNames(
                "absolute bottom-0 z-30 bg-teal-400 w-full rounded-md border-2 border-t-4",
                props.routePage && "h-[56%]",
                props.pastWalk && "h-[42%]",
                props.walkPage && "h-[41%]",
                props.endPage && "h-[50%]"
                )}></View>
            <View className="absolute right-1 left-1 bottom-0 flex items-center  z-40 bg-white py-4  rounded-md border-2 -translate-y-2   mb-2 scale-95 ">
                {props.children}
            </View>
        </>
    )
}