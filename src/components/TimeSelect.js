import React from "react";
import {ScrollView, Text, View} from "react-native";
import { List, Button } from "react-native-paper";
import ScrollPicker from "react-native-wheel-scrollview-picker";

export default function TimeSelect({timeSetter}) {

    const styles = {
        container: "flex flex-row items-center justify-center p-2"
    };

    const hours = [...Array(24).keys()].map(i => i)
    const minutes= [0, 15, 30, 45]

    const timeToSet = new Date();
    timeToSet.setSeconds(0)

    return (
        <View className={styles.container}>
            <ScrollPicker
                dataSource={hours}
                selectedIndex={hours.indexOf(timeToSet.getHours())}
                wrapperBackground="transparent"
                onValueChange={(selHour) => {
                    timeSetter(timeToSet.setHours(selHour))
                }}
            />

            <ScrollPicker
                dataSource={minutes}
                selectedIndex={minutes.indexOf(timeToSet.getMinutes())}
                wrapperBackground="transparent"
                onValueChange={(selMin) => {
                    timeSetter(timeToSet.setMinutes(selMin))
                }}
            />
        </View >
    );

}

