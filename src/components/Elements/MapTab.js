import {View} from "react-native";
import React from "react";
import classNames from "classnames";

export default function MapTab(props) {
    return (
        <>
            <View className={classNames(
                "absolute bottom-0 z-30 bg-teal-400 w-full rounded-md border-2 border-t-4",
                props.routePage && "h-[24rem]",
                props.walkPage && "h-[21rem]",
                props.endPage && "h-[35rem]"
                )}></View>
            <View className="absolute bottom-0 z-40 bg-white py-4  rounded-md border-2 -translate-y-2 -translate-x-1.5  mb-2 scale-95 ">
                {props.children}
            </View>
        </>
    )
}