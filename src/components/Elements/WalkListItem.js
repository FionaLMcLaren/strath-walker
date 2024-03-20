import {Pressable, View} from "react-native";
import Label from "./Label";
import Text from "./Text";
import React from "react";
import classNames from 'classnames';
import {Icon} from "react-native-paper";

function SavedRouteContent ({route }) {
    return (
        <>
            <Label title={"Name"} colour="yl"/>
            <Text>{route.path.getReadableName()}</Text>
            <Label title={"Duration"} colour="yl">
                <Text>{route.getReadableDuration()}</Text>
            </Label>
            <Label title={"Distance"} colour="yl">
                <Text>{route.getDistance()}m</Text>
            </Label>
        </>
    )
}

function PastWalkContent ({data }) {
    return (
        <>
            <Label title={"Name"} colour="pk"/>
            <Text>{data['selectedRoute'][0]['name']} to {data['selectedRoute'][data['selectedRoute'].length - 1]['name']}</Text>

            <Label title={"Duration"} colour="pk"/>
            <Text>Walked from {new Date(data['startTime']).toLocaleTimeString("en-GB", {timeStyle:"short"})} to {new Date(data['endTime']).toLocaleTimeString("en-GB", {timeStyle:"short"})} on {new Date(data['startTime']).toLocaleDateString("en-GB", {dateStyle:"short"})}</Text>

            <Label title={"Distance"} colour="pk">
                <Text>{data['distance']}m</Text>
            </Label>

            <Label title={"Steps"} colour="pk">
                <Text>{data['steps']} steps</Text>
            </Label>

            <Label title={"Avg Pace"} colour="pk">
                <Text>{data['pace']}m/s</Text>
            </Label>
        </>
    )
}

export default function WalkListItem({ route, data, onPress, colour }) {
    return (
        <Pressable onPress={onPress}
                   className={classNames(
                       "flex border-b-4 border-r-4 border-2 rounded-lg mt-6 scale-95 ",
                       "active:border-r-2 active:border-b-2 active:scale-90 transition-all",
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
                    {
                        route && !data ?
                            <SavedRouteContent route={route} />
                            :
                            <PastWalkContent data={data} />
                    }

                </View>
            </View>
        </Pressable>
    );
}