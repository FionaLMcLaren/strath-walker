import React from "react";
import {ScrollView, Text, View} from "react-native";
import { List, Button } from "react-native-paper";
import ScrollPicker from "react-native-wheel-scrollview-picker";

/*TODO: disallow time being selected outside of working hours with warning
disallow end times being greater than start times
error when trying to set with current time with a time outwith the working
hours
rounding up current times to nearest quarter?
portal/modal pop up for time selection
*/

export default function TimeSelect({time, timeSetter}) {

    const styles = {
        container: "flex flex-row items-center justify-center p-2"
    };

    const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    const minutes= [0, 15, 30, 45]

    const timeToSet = new Date(time.getTime());
    timeToSet.setSeconds(0)

    return (
        <View className={styles.container}>
            <ScrollPicker
                dataSource={hours}
                selectedIndex={hours.indexOf(timeToSet.getHours())}
                wrapperBackground="transparent"
                onValueChange={(selHour) => {
                    timeSetter(new Date(timeToSet.setHours(selHour)))
                }}
            />

            <ScrollPicker
                dataSource={minutes}
                selectedIndex={minutes.indexOf(timeToSet.getMinutes())}
                wrapperBackground="transparent"
                onValueChange={(selMin) => {
                    timeSetter(new Date(timeToSet.setMinutes(selMin)))
                }}
            />
        </View >
    );

}

