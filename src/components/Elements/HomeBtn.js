import React from "react";
import {Pressable, View} from "react-native";
import {Icon} from "react-native-paper";
import classNames from 'classnames';
import Text from './Text';

/*
Buttons that display on the home page. They take in...
- A title,which displays as the name of the button.
- An icon, which is the name of the source of the icon
to be fetched from the icon library (MaterialCommunityIcons)
- A colour, which can either be "yl", "tq", or "pk" - which are
part of the colour scheme. This is rendered as the primary
 background of the button
- Action, which is to be the action that is triggered when the button
is pressed. This will likely be a navigation action to go to the
corresponding page the home page button points to in its title.
 */
export default function HomeBtn({title, icon, colour, action}) {

    return (
        <Pressable
            onPress={action}
            className={classNames(
                " rounded-md border-2 border-b-8 border-r-8 p-4 w-3/4 h-24 flex justify-center overflow-hidden" +
                " active:border-b-2 active:border-r-2 active:scale-95 transition-all duration-200 ",
                colour==="tq" && "bg-teal-400",
                colour==="pk" && "bg-pink-300",
                colour==="yl" && "bg-yellow-300")}>


            <View className="flex ">
                <View className="absolute scale-125 -translate-x-4 -translate-y-5 bg-white border-2 py-4 px-2">
                    <Icon
                        source={icon}
                        size={40}
                    />
                </View>

                <View className="flex flex-row gap-1 self-end ">
                    <View className="scale-90 ">
                        <Text bold={true} >
                            {title}
                        </Text>
                    </View>

                    <Icon
                        source="arrow-right"
                        size={30}
                        className="text-white stroke-black"
                    />
                </View>
            </View>

        </Pressable>
    )
}