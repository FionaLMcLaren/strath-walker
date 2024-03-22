import {View} from "react-native";
import Text from "./Text";
import React from "react";
import classNames from 'classnames';

/*
A label renders to show labelled information, such as chosen location.
It takes in...
- A colour, which can either be "yl", "tq", or "pk" - which are
part of the colour scheme. This is rendered as the primary colour of
label
- A title, which is rendered as the title of the label. For the
chosen location example, it would be something like "Location".
- Children, which is the information corresponding to the label.
For the chosen location example, it would be what the user has
set as the location.
 */
export default function Label(props) {

    return(
    <View className="flex flex-row self-center gap-2 items-center ">
        <View className={classNames(
            "border-2 border-b-4 rounded-lg p-1 px-2 h-12 ",
            props.colour ==="tq" && "bg-teal-400",
            props.colour ==="pk" && "bg-pink-300",
            props.colour ==="yl" && "bg-yellow-300")}
        >
            <Text className="text-black text-xl tracking-wide"> {props.title} </Text>
        </View>
        <View className="p-2 w-1/2 ">
            <Text className="text-black text-xl tracking-wide"> {props.children} </Text>
        </View>
    </View>
    );
}