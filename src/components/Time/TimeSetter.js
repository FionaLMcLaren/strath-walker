import React, {useEffect, useState} from "react";
import {Pressable, View} from "react-native";
import {Button, Icon, Text} from "react-native-paper";
import TimeSelect from "./TimeSelect";
import SwitchBtn from "../Elements/Switch";

export default function TimeSetter({ time, timeSetter, prevTime }) {

    const styles = {
        container: "flex items-center justify-center",
        switchCon: "flex flex-row items-center justify-center gap-3",
        buttonCon: "flex flex-row gap-x-5",
    };

    const [modalVisible, toggleModalVisible] = React.useState(false);

    const verifyCurTime = () => {
        let curTime = new Date(Date.now())

        //round up cur time to nearest quarter
        curTime.setMinutes(Math.round(curTime.getMinutes() / 15) * 15)
        curTime.setSeconds(0, 0)

        let lowTime = new Date(new Date(Date.now()).setHours(8, 0, 0, 0));
        let highTime = new Date(new Date(Date.now()).setHours(18, 0, 0, 0));

        return (curTime <= highTime) && (curTime >= lowTime);
    }

    const showTime = () => {
        let minutes = time.getMinutes();
        let minutesStr = ((minutes < 10) ? "0" + minutes.toString() : minutes.toString())

        let hours = time.getHours();
        let hoursStr = ((hours < 10) ? "0" + hours.toString() : hours.toString())

        return hoursStr + ":" + minutesStr;

    }

    const setSwitchValue = () => {
        let curTime = new Date(Date.now())

        //round up cur time to nearest quarter
        curTime.setMinutes(Math.round(curTime.getMinutes() / 15) * 15)
        curTime.setSeconds(0, 0)

        console.log(curTime.toString())
        console.log(time.toString())
        console.log(time.toString() == curTime.toString())

        return time.toString() == curTime.toString()
    }

    const setAsCurrTime = () => {
        let curTime = new Date(Date.now())

        //round up cur time to nearest quarter
        curTime.setMinutes(Math.round(curTime.getMinutes() / 15) * 15)
        curTime.setSeconds(0, 0)

        timeSetter(curTime)
    }

    //on page load
    useEffect(() => {

        if (!verifyCurTime()) {
            if (prevTime && ((prevTime.getHours()+1) < 18)) {
                let nextHour = prevTime.getHours() + 1;
                timeSetter(new Date(new Date(Date.now()).setHours(nextHour, 0, 0, 0)));
            } else {
                timeSetter(new Date(new Date(Date.now()).setHours(8, 0, 0, 0)));
            }

        } else {
            let curTime = new Date(Date.now())

            curTime.setMinutes(Math.round(curTime.getMinutes() / 15) * 15)
            curTime.setSeconds(0, 0)

            if (prevTime) {
                if ((prevTime.getHours()+1) < 18) {
                    let nextHour = prevTime.getHours() + 1;
                    timeSetter(new Date(curTime.setHours(nextHour)))
                } else {
                    timeSetter(new Date(curTime.setHours(18)))
                }
            } else {
                timeSetter(new Date(curTime))
            }

        }
    }, [timeSetter, prevTime])

    return (
        <View className={styles.container}>


                <Pressable
                    onPress={() => {
                            toggleModalVisible(true)
                        }
                    }
                >
                    <View className="border-black border-2 bg-white rounded-md p-2 px-4 z-10">
                        <View className="flex flex-row gap-x-4 items-center" >
                            <Icon source="clock" size={20}/>
                            <Text className="text-xl ">
                                {prevTime ? 'End Time' : 'Start Time'}
                            </Text>
                            <Text className="text-xl ">{showTime()}</Text>
                        </View>
                    </View>

                    <View className="absolute w-60 h-full bg-pink-300 p-6 scale-105 scale-y-125 border-black border-2 border-b-4 rounded-lg" />
                </Pressable>

            <SwitchBtn
                switchDefault={setSwitchValue()}
                switchText={"Use current time"}
                switchVerifier={verifyCurTime()}
                verifyFailMsg={"Current time cannot be used as it is outwith University hours"}
                switchAction={setAsCurrTime}
            />

            <TimeSelect
                time={time}
                timeSetter={timeSetter}
                prevTime={prevTime}
                validTime={verifyCurTime()}
                modalVisible={modalVisible}
                toggleModalVisible={toggleModalVisible}
            />

        </View>
    );

}

