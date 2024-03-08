import React, {useState} from "react";
import {Text, View} from "react-native";
import {Button} from "react-native-paper";

export default function Home({ navigation }) {
    return (
        <View>
            <Text>Welcome!</Text>

            <Button
                onPress={() => navigation.navigate("StartPoint")}>
                Start a new walk
            </Button>

            <Button
                //onPress={() => navigation.navigate("")}
            >
                See past walks
            </Button>

            <Button
                //onPress={() => navigation.navigate("")}
            >
                See saved routes
            </Button>
        </View>
    )
}