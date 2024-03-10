import React, { useState} from "react";
import { Pressable, Text, View} from "react-native";
import {Portal, Modal} from "react-native-paper";
import ScrollPicker from "react-native-wheel-scrollview-picker";
import ErrorModal from "../Elements/PopupErr";
import TimeModal from "../Elements/Modal"

/*TODO
disallow end times being greater than start times
error when trying to set with current time with a time outwith the working hours
rounding up current times to nearest quarter?
*/

export default function TimeSelect({time, timeSetter, prevTime, validTime, modalVisible, toggleModalVisible, switchSetter }) {
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

    const validateSubmit = () => {
        if (validateNewTime(timeToSet)) {
            toggleModalVisible(false)

        } else {
            console.log("not valid time")
        }
    }

    return (
        <>
            <TimeModal
                title={"Choose Time"}
                modalVisible={modalVisible}
                toggleModalVisible={toggleModalVisible}
                confirmAction={validateSubmit}
            >
                <View className="flex flex-row justify-center items-center gap-2 p-6">
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
                </View>
            </TimeModal>

            <Portal>
                <ErrorModal
                    errorTitle={"Time Error"}
                    errorText={"not valid time"}
                    modalVisible={showingErrorPopUp}
                    toggleModalVisible={setShowingErrorPopUp}
                />
            </Portal>
        </>

    );

}

