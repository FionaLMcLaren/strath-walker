import {View} from "react-native";
import React from "react";
import classNames from "classnames";

/*
The map tab displays at the bottom of map pages, showing
the page details while still making sure the map being shown
on screen is still clear to the user.
It takes in...
- A colour, which can either be "yl", "tq", or "pk" - which are
part of the colour scheme. This is rendered as the primary colour
of the MapTab's border
- Either routePage/pastWalk/walkPage/endPage - each one
corresponding to what screen the `MapTab` is displaying on,
and is set to true when the `MapTab` is on that page. As
these screens are going to be displaying different details,
we use this to set a height good for the length of information.
- Children, which is the content of the `MapTab`.
 */

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