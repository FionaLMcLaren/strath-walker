import React, {useEffect} from "react";
import {Portal} from "react-native-paper";
import {Animated, View} from "react-native";

import Text from "./Text"
import classNames from "classnames";


export default function LoadScreen() {

    return (
        <Portal>
            <View className="h-full w-full flex flex-1 gap-10 justify-center items-center z-[1000] bg-teal-400 transistion-all ">
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
            </View>
        </Portal>
    )
}