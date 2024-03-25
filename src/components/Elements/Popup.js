import {IconButton, Portal} from "react-native-paper";
import React, {useEffect} from "react";
import {Animated, View} from "react-native";
import Text from "./Text"
import classNames from "classnames";
import {FadeInUp, FadeOutDown} from "react-native-reanimated";

/*
A popup display for the app. Will Often be used to show a
small notice at the bottom of the screen. If it is not dismissed by
the user, it goes off screen after roughly 5 seconds.
It takes in...
- Text, which is the content of the popup
- snackbarVisible and snackbarVisible - which controls if the popup is
showing on screen or not.
 */
export default function Popup({snackbarVisible, toggleSnackbarVisible, text}) {

    useEffect(() => {
        if (snackbarVisible) {
            const timeout = setTimeout(() => {

                toggleSnackbarVisible(false)
            }, 5000);

            return () => clearTimeout(timeout);
        }
    }, [snackbarVisible]);


    return (
        <Portal>
            <Animated.View
                className={classNames("absolute bottom-0 bg-pink-200 border-t-4 w-full mb-3 h-16 ",
                    !snackbarVisible && "opacity-0"
                )}
                entering={FadeInUp}
                exiting={FadeOutDown}
            />
            <View
                className={
                    classNames(
                        "flex flex-row items-center gap-8 absolute bottom-0 bg-white w-full border-t-2 px-6 h-16",
                        !snackbarVisible && "opacity-0"
                    )}
                entering={FadeInUp}
                exiting={FadeOutDown}
            >
                <View className="w-3/4">
                    <Text>{text}</Text>
                </View>
                <IconButton
                    icon="close"
                    iconColor={"white"}
                    size={20}
                    onPress={() => toggleSnackbarVisible(false)}
                    className="flex items-center bg-black rounded-full border-2 z-[1000] "
                />
            </View>
        </Portal>
    )
}
