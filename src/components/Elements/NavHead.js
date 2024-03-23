import React from "react";
import {Pressable, View} from "react-native";
import {getHeaderTitle} from '@react-navigation/elements';
import Text from "./Text"
import {IconButton} from "react-native-paper";

/*
A NavBar that displays at the top of most screens. It renders
with a back button that, when clicked, goes back to the previous screen.
It takes in a title that corresponds to the screen that is showing
 */
function BackButton ({navigation, back}) {

    if (back) {
        return (
            <Pressable onPress={() => {navigation.goBack()}}>
                <View className="absolute rounded-full p-1 m-2 scale-75 -translate-x-2 -translate-y-0.5 bg-black border-r-4 h-full w-full"/>
                <IconButton
                    icon="arrow-left"
                    iconColor={"black"}
                    size={30}
                    onPress={() => {
                        navigation.goBack()
                        }
                    }
                    className="flex items-center bg-yellow-300 rounded-full border-white border-2 z-[1000] "
                />
            </Pressable>
        )
    } else {
        return (null)
    }
}
export default function NavHead ({ navigation, route, options, back }) {
    const title = getHeaderTitle(options, route.name);

    return (
        <View>
            <View className="absolute bg-teal-400 h-full w-full border-b-4 translate-y-2 " />
            <View className="flex flex-row items-center p-2 gap-x-4 bg-gray-50 border-b-2 z-50 ">

                <BackButton navigation={navigation} back={back}/>
                    <View className="flex flex-row relative">

                        <Text title={true} black={true} >
                            {title}
                        </Text>

                        <View className="absolute h-2.5 w-full right-0 bottom-0 bg-pink-200 scale-90 "/>
                    </View>
            </View>
        </View>
    );
};