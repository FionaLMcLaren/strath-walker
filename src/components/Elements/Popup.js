import {IconButton, Portal} from "react-native-paper";
import React, {useEffect} from "react";
import {View, Animated} from "react-native";
import Text from "./Text"
import classNames from "classnames";
import {FadeInUp, FadeOutDown} from "react-native-reanimated";

export default function Popup({snackbarVisible, toggleSnackbarVisible, text}) {

    useEffect(() => {
        if (snackbarVisible) {
            const timeout = setTimeout(() => {
                console.log("timeout!")
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
