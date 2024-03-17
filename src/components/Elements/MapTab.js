import {View} from "react-native";
import React from "react";
import classNames from "classnames";

export default function MapTab(props) {
    return (
        <>
            <View className={classNames(
                "absolute bottom-0 z-30 bg-teal-400 w-full rounded-md border-2 border-t-4",
                props.routePage && "h-[26rem]",
                props.walkPage && "h-[22rem]",
                props.endPage && "h-[28rem]"
                )}></View>
            <View className="absolute bottom-0 z-40 bg-white p-4 rounded-md mx-2 border-2 -translate-y-2 mb-2 ">
                {props.children}
            </View>
        </>
    )
}