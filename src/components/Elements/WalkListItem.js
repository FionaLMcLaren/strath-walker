import {Pressable, View} from "react-native";
import Label from "./Label";
import Text from "./Text";
import React from "react";
import classNames from 'classnames';
import {Icon} from "react-native-paper";

export default function WalkListItem({ route, onPress, colour }) {
    return (
        <Pressable onPress={() => onPress(route)}
                   className={classNames(
                       "border-b-4 border-r-4 border-2 rounded-lg",
                       "flex active:scale-95 transition-all",
                       colour==="tq" && "bg-teal-100",
                       colour==="pk" && "bg-pink-100",
                       colour==="yl" && "bg-yellow-100")}>



            <View className="flex " >

                <View className="absolute  bg-white w-20 flex justify-center self-end border-2 p-4 h-full  ">
                    <Icon
                        source={"arrow-right"}
                        size={40}
                    />
                </View>

                <View className="w-3/4 p-4 flex gap-2 ">

                    <Label title={"Name"} colour="yl"/>
                    <Text>{route.path.getReadableName()}</Text>
                    <Label title={"Duration"} colour="yl">
                        <Text>{route.getDuration()}s</Text>
                    </Label>
                    <Label title={"Distance"} colour="yl">
                        <Text>{route.getDistance()}m</Text>
                    </Label>
                </View>
            </View>
        </Pressable>
    );
}