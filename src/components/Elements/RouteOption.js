import {Pressable, View} from "react-native";
import classNames from "classnames";
import Text from "./Text";
import Label from "./Label";
import React from "react";

/*
Renders an option for a route for the user to take. It takes...
- onPress, which is the action that executes when the option is clicked on (when
it is on the route option page)
- route, which is the route that is currently showing on screen
- currentSel, which is the route that has been chosen by the user, or the app
in the case of the component being on the saved route page
- routeName, which is a readable name of the route
- routeDuration, which is a readable duration of the route
- routeDistance, which is a readable distance of the route
 */

function RouteOptionContent ({route, isSelected, routeName, routeDuration, routeDistance}) {

    return (
        <View className={classNames(
            " border-2 rounded-lg p-2 flex flex-1 gap-2",
            isSelected && "bg-teal-200",
            !isSelected && "bg-teal-100"
        )}>
            {
                isSelected ?
                    <View className="absolute z-40 px-1 rounded-sm border-black border-b-4 border-2 -rotate-2 bg-pink-300 -translate-y-2 scale-90 ">
                        <Text bold={true}>SELECTED</Text>
                    </View>
                    :
                    null
            }

            <View className="flex px-10 py-6  ">
                <Label title={"Name"} colour="yl"/>
                <Text>{routeName}</Text>
                <Label title={"Duration"} colour="yl">
                    <Text>{routeDuration}</Text>
                </Label>
                <Label title={"Distance"} colour="yl">
                    <Text>{routeDistance}m</Text>
                </Label>
            </View>

        </View>
    )
}
export default function RouteOption({ route, onPress, currentSel, routeName, routeDuration, routeDistance }) {
    if (onPress && currentSel) {
        const isSelected = route == currentSel;
        return (
            <Pressable onPress={() => onPress(route)} className=" w-[26rem] px-4 py-1 active:scale-95 transition-all ">
                <RouteOptionContent route={route} isSelected={isSelected} routeName={routeName} routeDuration={routeDuration} routeDistance={routeDistance} />
            </Pressable>
        );
    } else {
        return (
            <View className="w-[25rem] px-4 py-1 ">
                <RouteOptionContent route={route} isSelected={true} routeName={routeName} routeDuration={routeDuration} routeDistance={routeDistance} />
            </View>
        );
    }


}