import React, { useState} from "react";
import { Pressable, View} from "react-native";
import {Portal, Modal} from "react-native-paper";
import ScrollPicker from "react-native-wheel-scrollview-picker";
import ErrorModal from "../Elements/PopupErr";
import TimeModal from "../Elements/Modal"
import Text from "../Elements/Text";
import SwitchBtn from "../Elements/Switch";

/*TODO
disallow end times being greater than start times
error when trying to set with current time with a time outwith the working hours
rounding up current times to nearest quarter?
*/

export default function TimeSelect({time, timeSetter, prevTime, modalVisible, toggleModalVisible, switchSetter }) {
    const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    const minutes= [0, 15, 30, 45]
    // initial timeToSet becomes 08:00 when out of appropriate range
    const [timeToSet, setTimeToSet] = useState(new Date(new Date(Date.now()).setHours(8, 0, 0, 0)));

    const [showingErrorPopUp, setShowingErrorPopUp] = useState(false);

    const verifyCurTime = () => {
        let curTime = new Date(Date.now())

        //round up cur time to nearest quarter
        curTime.setMinutes(Math.round(curTime.getMinutes() / 15) * 15)
        curTime.setSeconds(0, 0)

        let lowTime = new Date(new Date(Date.now()).setHours(8, 0, 0, 0));
        let highTime = new Date(new Date(Date.now()).setHours(18, 0, 0, 0));

        return (curTime <= highTime) && (curTime >= lowTime);
    }

    const setSwitchValue = () => {
        let curTime = new Date(Date.now())

        //round up cur time to nearest quarter
        curTime.setMinutes(Math.round(curTime.getMinutes() / 15) * 15)
        curTime.setSeconds(0, 0)

        console.log(curTime.toString())
        console.log(timeToSet.toString())
        console.log(timeToSet.toString() == curTime.toString())

        return time.toString() == curTime.toString()
    }

    const setAsCurrTime = () => {
        let curTime = new Date(Date.now())

        //round up cur time to nearest quarter
        curTime.setMinutes(Math.round(curTime.getMinutes() / 15) * 15)
        curTime.setSeconds(0, 0)

        setTimeToSet(curTime)
    }


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
                <SwitchBtn
                    switchDefault={setSwitchValue()}
                    switchText={"Use current time"}
                    switchVerifier={verifyCurTime()}
                    verifyFailMsg={"Current time cannot be used as it is outwith University hours"}
                    switchAction={setAsCurrTime}
                />

                <View className="flex flex-row justify-center items-center px-5">
                    <View className="absolute border-b-4 border-2 rounded-md w-10 h-1/4 left-1/4 scale-125 "/>
                    <View className="absolute border-b-4 border-2 rounded-md w-10 h-1/4 right-1/4 scale-125 "/>
                    <ScrollPicker
                        dataSource={hours}
                        selectedIndex={hours.indexOf(timeToSet.getHours())}
                        wrapperBackground="transparent"
                        highlightColor="transparent"
                        itemHeight={30}
                        activeItemTextStyle={{fontFamily:"MPLUSRounded1c-ExtraBold", color: "black", fontSize: 18 }}
                        itemTextStyle={{fontFamily:"MPLUSRounded1c-Medium", fontSize: 12}}
                        onValueChange={(selHour) => {
                            console.log("hr change:")
                            console.log(new Date(new Date(timeToSet.setHours(selHour)).setSeconds(0,0)))
                            setTimeToSet(new Date(new Date(timeToSet.setHours(selHour)).setSeconds(0,0)))
                        }}
                    />

                    <ScrollPicker
                        dataSource={minutes}
                        selectedIndex={minutes.indexOf(timeToSet.getMinutes())}
                        wrapperBackground="transparent"
                        highlightColor="transparent"
                        itemHeight={30}
                        activeItemTextStyle={{fontFamily:"MPLUSRounded1c-ExtraBold", color: "black", fontSize: 18 }}
                        itemTextStyle={{fontFamily:"MPLUSRounded1c-Medium", fontSize: 12}}
                        onValueChange={(selMin) => {
                            console.log("min change:")
                            console.log(new Date(new Date(timeToSet.setMinutes(selMin)).setSeconds(0,0)))
                            setTimeToSet(new Date(new Date(timeToSet.setMinutes(selMin)).setSeconds(0,0)))
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

