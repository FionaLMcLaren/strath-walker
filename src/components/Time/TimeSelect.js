import React, { useState} from "react";
import { Text} from "react-native";
import {Button, Dialog, Portal} from "react-native-paper";
import ScrollPicker from "react-native-wheel-scrollview-picker";
import ErrorModal from "../Popup/PopupErr";

/*TODO
disallow end times being greater than start times
error when trying to set with current time with a time outwith the working hours
rounding up current times to nearest quarter?
*/

export default function TimeSelect({time, timeSetter, prevTime, validTime, modalVisible, toggleModalVisible}) {
    const styles = {
        timeContainer: "flex flex-row items-center justify-center gap-2",
        container: "flex items-center justify-center",
    };

    const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    const minutes= [0, 15, 30, 45]
    // initial timeToSet becomes 08:00 when out of appropriate range
    const [timeToSet, setTimeToSet] = useState(
        validTime ?
            new Date(new Date(time.getTime()).setSeconds(0, 0))
            : new Date(new Date(Date.now()).setHours(8, 0, 0, 0))
    )

    const [showingErrorPopUp, setShowingErrorPopUp] = useState(false);
    const validateNewTime = () => {

        let lowTime = new Date(new Date(Date.now()).setHours(8, 0, 0, 0));
        let highTime = new Date(new Date(Date.now()).setHours(18, 0, 0, 0));

        let inRange = (timeToSet <= highTime) && (timeToSet >= lowTime);
        let endAfterStart = ((prevTime && (timeToSet > prevTime)) || !prevTime);

        if (inRange && endAfterStart) {
            timeSetter(new Date(timeToSet.getTime()))
            return true
        } else {
            setShowingErrorPopUp(true)
            return false
        }
    }

    return (
        <>
            <Portal>
                <Dialog
                    visible={modalVisible}
                    onDismiss={() => toggleModalVisible(false)}
                >
                    <Dialog.Title>
                        Choose Time
                    </Dialog.Title>

                    <Dialog.Content
                        className={styles.timeContainer}
                    >
                            <ScrollPicker
                                dataSource={hours}
                                selectedIndex={hours.indexOf(timeToSet.getHours())}
                                wrapperBackground="transparent"
                                onValueChange={(selHour) => {
                                    console.log("hr change:")
                                    console.log(new Date(new Date(timeToSet.setHours(selHour)).setMilliseconds(0)))
                                    setTimeToSet(new Date(new Date(timeToSet.setHours(selHour)).setMilliseconds(0)))
                                }}
                            />
                            <Text>:</Text>
                            <ScrollPicker
                                dataSource={minutes}
                                selectedIndex={minutes.indexOf(timeToSet.getMinutes())}
                                wrapperBackground="transparent"
                                onValueChange={(selMin) => {
                                    console.log("min change:")
                                    console.log(new Date(new Date(timeToSet.setMinutes(selMin)).setMilliseconds(0)))
                                    setTimeToSet(new Date(new Date(timeToSet.setMinutes(selMin)).setMilliseconds(0)))
                                }}
                            />
                    </Dialog.Content>

                    <Dialog.Actions>
                            <Button
                                onPress={() => {
                                    if (validateNewTime(timeToSet)) {
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

            <Portal>
                <ErrorModal
                    errorTitle={"hello world"}
                    errorText={"not valid time"}
                    modalVisible={showingErrorPopUp}
                    toggleModalVisible={setShowingErrorPopUp}
                />
            </Portal>
        </>

    );

}

