import React, {useState} from "react";
import {View} from "react-native";
import HomeBtn from "../components/Elements/HomeBtn";
import Text from "../components/Elements/Text";

export default function Home({ navigation }) {
    return (
        <View className="flex-1 items-center justify-center gap-2">
            <Text title={true} bold={true} >Welcome!</Text>

            <HomeBtn
                action={() => navigation.navigate("StartPoint")}
                title={"Start new walk"}
                colour={"tq"}
                icon={"walk"}
            />

            <HomeBtn
                action={() => navigation.navigate("WalkDataView")}
                title={"See past walks"}
                colour={"pk"}
                icon={"navigation-variant"}
            />

            <HomeBtn
                action={() => navigation.navigate("SavedRoute")}
                title={"See saved routes"}
                colour={"yl"}
                icon={"book-marker"}
            />


        </View>
    )
}