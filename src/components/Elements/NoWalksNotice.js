import {View} from "react-native";
import Text from "./Text";
import Button from "./NextBtn";
import React from "react";

export default function NoWalkNotice ({navigation}) {
    return (
        <View className="flex flex-1 justify-center items-center ">
            <View className="flex items-center justify-center w-56 p-2 m-6 scale-150 ">
                <Text xlTitle={true} black={true} >No Walks</Text>
                <Text xlTitle={true} black={true} >Found!</Text>
            </View>
            <View className="flex">
                <Text>Come back once you have some</Text>
                <View className="flex flex-row justify-center ">
                    <Text colour={true}> walks </Text>
                    <Text>saved</Text>
                </View>
            </View>

            <View className="flex gap-4 pt-4 ">
                <Button
                    title={"Start a Walk"}
                    action={() =>
                        navigation.navigate("StartPoint")
                    }
                    colour="tq"
                />

                <Button
                    title={"Return to Home"}
                    action={() =>
                        navigation.navigate("Home")
                    }
                    colour="tq"
                    outline={true}
                />
            </View>

        </View>
    )
}