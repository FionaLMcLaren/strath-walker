import React, {useEffect, useState} from "react";
import {View} from "react-native";
import {Button, Portal, Snackbar, Switch, Text} from "react-native-paper";
import TimeSelect from "./TimeSelect";

export default function TimeSetter({ time, timeSetter, prevTime }) {

    const styles = {
        container: "flex items-center justify-center",
        switchCon: "flex flex-row items-center justify-center gap-3",
    };

    const [modalVisible, toggleModalVisible] = React.useState(false);
    const [snackbarVisible, toggleSnackbarVisible] = React.useState(false);

    const [switchCurTime, setSwitchCurTime] = React.useState(true);

    const verifyCurTime = () => {
        let curTime = new Date(Date.now())

        //round up cur time to nearest quarter
        curTime.setMinutes(Math.round(curTime.getMinutes() / 15) * 15)
        curTime.setSeconds(0)

        let lowTime = new Date(new Date(Date.now()).setHours(8, 0, 0));
        let highTime = new Date(new Date(Date.now()).setHours(18, 0, 0));

        if ((curTime <= highTime) && (curTime >= lowTime)) {
            return true
        } else {
            return false
        }

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
            //if the
            toggleSnackbarVisible(true)
        }
    }

    //on page load
    useEffect(() => {
        setSwitchCurTime(verifyCurTime())
        if (!verifyCurTime()) {
            timeSetter(new Date(new Date(Date.now()).setHours(8, 0, 0, 0)));
        }
    }, [setSwitchCurTime, timeSetter])

    return (
        <><View className={styles.container}>
            <Text>{time.toString()}</Text>
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
                onPress={() => toggleModalVisible(true)}
            >
                Set start time
            </Button>

            <TimeSelect
                time={time}
                timeSetter={timeSetter}
                modalVisible={modalVisible}
                toggleModalVisible={toggleModalVisible}/>

        </View>

        <Portal>
            <Snackbar
                visible={snackbarVisible}
                onDismiss={() => toggleSnackbarVisible(false)}
                action={{
                    label: 'Close',
                    onPress: () => {
                        toggleSnackbarVisible(false)
                    },
                }
            }>
                Your current time cannot be used as it is outwith university
                working hours.
            </Snackbar>
        </Portal></>
    );

}

