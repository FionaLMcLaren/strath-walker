import React, {useEffect, useState} from "react";
import {View} from "react-native";
import {Button, Portal, Snackbar, Switch, Text} from "react-native-paper";
import TimeSelect from "./TimeSelect";
import Toast from "../Popup/Toast";

export default function TimeSetter({ time, timeSetter, prevTime }) {

    const styles = {
        container: "flex items-center justify-center",
        switchCon: "flex flex-row items-center justify-center gap-3",
        buttonCon: "flex flex-row gap-x-5",
    };

    const [modalVisible, toggleModalVisible] = React.useState(false);
    const [snackbarVisible, toggleSnackbarVisible] = React.useState(false);

    const [switchCurTime, setSwitchCurTime] = React.useState(true);

    const verifyCurTime = () => {
        let curTime = new Date(Date.now())

        //round up cur time to nearest quarter
        curTime.setMinutes(Math.round(curTime.getMinutes() / 15) * 15)
        curTime.setSeconds(0, 0)

        let lowTime = new Date(new Date(Date.now()).setHours(8, 0, 0, 0));
        let highTime = new Date(new Date(Date.now()).setHours(18, 0, 0, 0));

        return (curTime <= highTime) && (curTime >= lowTime);

    }

    const toggleCurTimeUse = () => {
        if (verifyCurTime()) {
            if (switchCurTime) {
                //turn off current time
                setSwitchCurTime(!switchCurTime)
            } else {
                //turn on current time
                setSwitchCurTime(!switchCurTime)
            }
        } else {
            //if the time is outwith range, display on snackbar
            toggleSnackbarVisible(true)
        }
    }

    const showTime = () => {

        let minutes = time.getMinutes();
        let minutesStr = ((minutes < 10) ? "0" + minutes.toString() : minutes.toString())

        let hours = time.getHours();
        let hoursStr = ((hours < 10) ? "0" + hours.toString() : hours.toString())

        return hoursStr + ":" + minutesStr;

    }

    //on page load
    useEffect(() => {
        setSwitchCurTime(verifyCurTime())
        if (!verifyCurTime()) {
            if (prevTime && ((prevTime.getHours()+1) < 18)) {
                let nextHour = prevTime.getHours() + 1;
                timeSetter(new Date(new Date(Date.now()).setHours(nextHour, 0, 0, 0)));
            } else {
                timeSetter(new Date(new Date(Date.now()).setHours(8, 0, 0, 0)));
            }

        }
    }, [setSwitchCurTime, timeSetter, prevTime])

    return (
        <><View className={styles.container}>
            <View className={styles.switchCon}>
                <Text>Use current time</Text>
                <Button
                    onPress={toggleCurTimeUse}
                >
                    <Switch
                        value={switchCurTime}
                        onValueChange={toggleCurTimeUse}/>
                </Button>
            </View>

            <Button
                icon="clock-outline"
                mode="outlined"
                onPress={() => toggleModalVisible(true)}
            >
                <View className={styles.buttonCon} >
                    <Text>
                        {prevTime ? 'End Time' : 'Start Time'}
                    </Text>
                    <Text>{showTime()}</Text>
                </View>
            </Button>

            <TimeSelect
                time={time}
                timeSetter={timeSetter}
                prevTime={prevTime}
                validTime={verifyCurTime()}
                modalVisible={modalVisible}
                toggleModalVisible={toggleModalVisible}/>

        </View>

        <Toast
            text={"Current time cannot be used as it is outwith University hours "}
            snackbarVisible={snackbarVisible}
            toggleSnackbarVisible={toggleSnackbarVisible}
        />

    </>
    );

}

