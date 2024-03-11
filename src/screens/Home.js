import React, {useState} from "react";
import {View} from "react-native";
import HomeBtn from "../components/Elements/HomeBtn";
import Text from "../components/Elements/Text";

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
                action={() => navigation.navigate("")}
                title={"See past walks"}
                colour={"pk"}
                icon={"walk"}
            />

            <HomeBtn
                action={() => navigation.navigate("")}
                title={"See saved routes"}
                colour={"yl"}
                icon={"walk"}
            />


        </View>
    )
}