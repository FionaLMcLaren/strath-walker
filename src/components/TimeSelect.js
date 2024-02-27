import React, {useCallback, useState} from "react";
import {ScrollView, Text, View, SafeAreaView} from "react-native";
import { List, Button, Dialog, Portal, Provider} from "react-native-paper";
import ScrollPicker from "react-native-wheel-scrollview-picker";

/*TODO
disallow end times being greater than start times
error when trying to set with current time with a time outwith the working hours
rounding up current times to nearest quarter?
*/

export default function TimeSelect({time, timeSetter, prevTime, modalVisible, toggleModalVisible}) {

    const styles = {
        timeContainer: "flex flex-row items-center justify-center p-2",
        container: "flex items-center justify-center",
    };

    const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    const minutes= [0, 15, 30, 45]

    const [timeToSet, setTimeToSet] = useState(new Date(time.getTime()));

    const validateTime = () => {
        let lowTime = new Date(new Date(Date.now()).setHours(8, 0, 0));
        let highTime = new Date(new Date(Date.now()).setHours(18, 0, 0));

        if ((timeToSet <= highTime) && (timeToSet >= lowTime)) {
            timeSetter(new Date(timeToSet.getTime()))
            return true
        } else {
            return false
        }
    }


    return (
            <Portal>
                <Dialog
                    visible={modalVisible}
                    onDismiss={() => toggleModalVisible(false)}
                >
                    <Dialog.Title>
                        Choose Time
                    </Dialog.Title>
                    <Dialog.Content className={styles.timeContainer}>
                            <ScrollPicker
                                dataSource={hours}
                                selectedIndex={hours.indexOf(timeToSet.getHours())}
                                wrapperBackground="transparent"
                                onValueChange={(selHour) => {
                                    setTimeToSet(new Date(timeToSet.setHours(selHour)))
                                }}
                            />
                            <Text>:</Text>
                            <ScrollPicker
                                dataSource={minutes}
                                selectedIndex={minutes.indexOf(timeToSet.getMinutes())}
                                wrapperBackground="transparent"
                                onValueChange={(selMin) => {
                                    setTimeToSet(new Date(timeToSet.setMinutes(selMin)))
                                }}
                            />
                    </Dialog.Content>

                    <Dialog.Actions>
                            <Button
                                onPress={() => {
                                    if (validateTime(timeToSet)) {
                                        toggleModalVisible(false)
                                    } else {
                                        console.log("not valid time")
                                    }
                            }}>
                                Confirm
                            </Button>
                    </Dialog.Actions>
                </Dialog>
            </Portal>

    );

}

