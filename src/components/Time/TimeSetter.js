import React, {useEffect, useState} from "react";
import {Pressable, View} from "react-native";
import {Button, Icon} from "react-native-paper";
import TimeSelect from "./TimeSelect";
import SwitchBtn from "../Elements/Switch";
import Text from "../Elements/Text";
import Popup from "../Elements/Popup";

/*
The button that opens up the `TimeSelect` dialog that the user
uses to pick their start/end times for walks.
 It takes...
- time, which is the time that is to be set
- timeSetter, which changes the value of the time
- prevTime, which is used to show if the user is setting an end time
 */

export default function TimeSetter({ time, timeSetter, prevTime }) {
    const [modalVisible, toggleModalVisible] = React.useState(false);

    const showTime = () => {
        let minutes = time.getMinutes();
        let minutesStr = ((minutes < 10) ? "0" + minutes.toString() : minutes.toString())

        let hours = time.getHours();
        let hoursStr = ((hours < 10) ? "0" + hours.toString() : hours.toString())

        return hoursStr + ":" + minutesStr;

    }


    return (
        <View className="flex items-center justify-center">
                <Pressable
                    onPress={() => {
                            toggleModalVisible(true)
                        }
                    }
                >
                    <View className="border-black border-2 bg-white rounded-md p-2 px-4 z-10">
                        <View className="flex flex-row gap-x-2 items-center" >
                            <Icon source="clock" size={20}/>
                            <Text >
                                {prevTime ? 'End Time' : 'Start Time'}
                            </Text>
                            <Text className="text-xl ">{showTime()}</Text>
                        </View>
                    </View>

                    <View className="absolute w-[58%] h-full bg-pink-300 p-6 scale-105 scale-y-125 border-black border-2 border-b-4 rounded-lg" />
                </Pressable>

            <TimeSelect
                time={time}
                timeSetter={timeSetter}
                prevTime={prevTime}
                modalVisible={modalVisible}
                toggleModalVisible={toggleModalVisible}
            />



        </View>
    );

}

