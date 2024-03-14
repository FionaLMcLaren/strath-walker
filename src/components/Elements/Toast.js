import {IconButton, Portal, Snackbar} from "react-native-paper";
import React from "react";
import {Pressable, View} from "react-native";
import Text from "./Text"
import classNames from "classnames";

export default function Toast({text, snackbarVisible, toggleSnackbarVisible}) {
    return (
        <Portal>
            <View className={
                classNames("absolute bottom-0 bg-pink-200 border-t-4 w-full mb-1 h-16 ",
                    !snackbarVisible && "opacity-0"
                )}
            />
            <View
                className={
                    classNames(
                        "flex flex-row items-center gap-8 absolute bottom-0 bg-white w-full px-6 border-t-2",
                        !snackbarVisible && "opacity-0"
                    )}
            >
                <Text>{text}</Text>
                <IconButton
                    icon="close"
                    iconColor={"white"}
                    size={20}
                    onPress={() => {toggleSnackbarVisible()}}
                    className="flex items-center bg-black rounded-full border-2 z-[1000] "
                />
            </View>
        </Portal>
    )
}