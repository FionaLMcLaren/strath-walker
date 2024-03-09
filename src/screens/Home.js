import React, {useState} from "react";
import {Text, View} from "react-native";
import {Button} from "react-native-paper";
import HomeBtn from "../components/Elements/HomeBtn";

export default function Home({ navigation }) {
    const styles = {
        wrapper: "flex-1 items-center justify-center gap-2",
    };

    return (
        <View className={styles.wrapper}>
            <Text>Welcome!</Text>

            <HomeBtn
                action={() => navigation.navigate("StartPoint")}
                title={"Start new walk"}
                colour={"tq"}
                icon={"walk"}
            />

            <HomeBtn
                //action={() => navigation.navigate("")}
                title={"See past walks"}
                colour={"pk"}
                icon={"walk"}
            />

            <HomeBtn
                //action={() => navigation.navigate("")}
                title={"See saved routes"}
                colour={"yl"}
                icon={"walk"}
            />


        </View>
    )
}