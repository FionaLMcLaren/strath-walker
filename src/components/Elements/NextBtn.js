import React from "react";
import {Pressable, View} from "react-native";
import {Icon} from "react-native-paper";
import Text from "./Text"
import classNames from 'classnames';

/*
A button that is used as the main action button for most screens, usually
having the action to proceed to the next page. It takes...
- A title, that reads out the action the button will execute
- Arrow, which, when true, renders an arrow icon next to the button.
Handy for showing buttons who have the action of going to next
page
- An action, which is the function that happens when the button is clicked
- A colour, which can either be "yl", "tq", or "pk" - which are
part of the colour scheme. This is rendered as the primary
 background of the button
 - Outline, which when true, renders the button in an outlined style.
 This makes the background white and makes the border the colour of the
 colour parameter passed in. Handy for showing buttons that could be
 considered a secondary action to a primary one - so if two or more buttons
 are on screen at once to imply some sort of importance
 */
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
        <Pressable onPress={action} className="active:scale-95 transition-all ">
            <View
                onPress={action}
                className={classNames(
                    " rounded-3xl border-2 border-b-4 border-r-4 p-1.5 mx-6 flex justify-center overflow-hidden",
                    colour==="tq" && !outline && "bg-teal-400 border-black",
                    colour==="pk" && !outline && "bg-pink-300 border-black ",
                    colour==="yl" && !outline && "bg-yellow-300 border-black",
                    colour==="tq" && outline && "bg-white border-teal-400",
                    colour==="pk" && outline && "bg-white border-pink-300",
                    colour==="yl" && outline && "bg-white border-yellow-300" )}>


                <BtnContent arrow={arrow} title={title} />

            </View>
        </Pressable>
    )
}
