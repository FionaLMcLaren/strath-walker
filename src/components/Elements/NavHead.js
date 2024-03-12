import React from "react";
import {View, Pressable} from "react-native";
import { getHeaderTitle } from '@react-navigation/elements';
import Text from "./Text"
import {Icon} from "react-native-paper";

function BackButton ({navigation, back}) {
   // if (back) {
        return (
            <View
            >
            <View className="absolute rounded-full p-1 m-2 scale-95 -translate-x-2 -translate-y-0.5 bg-black border-r-4 h-full w-full" />
            <Pressable
                className="flex items-center bg-yellow-300 rounded-full p-1 border-white border-2 z-[1000] "
                onPress={() => {
                    console.log("clicked!")
                    //navigation.goBack()
                }}
            >
                <>
                    <View className="z-10">
                        <Icon
                            source="arrow-left"
                            size={28}
                            color={"white"}
                        />
                    </View>
                    <View className="absolute scale-105 translate-y-1.5 ">
                        <Icon
                            source="arrow-left"
                            size={28}
                            color={"black"}
                        />
                    </View>
                </>
            </Pressable>
            </View>
        )
 //   } else{
 //       return (null)
 //   }
}
export default function NavHead ({ navigation, route, options, back }) {
    const title = getHeaderTitle(options, route.name);

    return (
        <View>
            <View className="absolute bg-teal-400 h-full w-full border-b-4 translate-y-2 " />
            <View className="flex flex-row items-center p-4 gap-6 bg-gray-50 border-b-2 z-50 ">

                    <View className="flex flex-row relative">

                        <BackButton navigation={navigation} back={back} className="z-50" />

                        <Text title={true} black={true} >
                            {title}
                        </Text>

                        <View className="absolute h-2.5 w-full right-0 bottom-0 bg-pink-200 scale-90 "/>
                    </View>
            </View>
        </View>
    );
};