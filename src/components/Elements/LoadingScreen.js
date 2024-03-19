import React from "react";
import {Portal} from "react-native-paper";
import {View, Animated, Image } from "react-native";

import { FadeIn, FadeOut } from 'react-native-reanimated';

import Text from "./Text"


export default function LoadScreen() {

    return (
        <Portal>
            <Animated.View
                className="h-full w-full flex flex-1 gap-10 justify-center items-center z-[1000] bg-teal-400 "
                entering={FadeIn}
                exiting={FadeOut}
            >
                <Image
                    style={{
                        width: 120,
                        height: 120,
                    }}
                    source={require('../../../images/icon.png')}
                />
                <View className="animate-pulse ">
                    <Text title={true} >Loading...</Text>
                </View>
            </Animated.View>
        </Portal>
    )
}