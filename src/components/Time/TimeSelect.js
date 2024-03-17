import React, {useRef, useState} from "react";
import { Pressable, View} from "react-native";
import {Portal, Modal} from "react-native-paper";
import ScrollPicker from "react-native-wheel-scrollview-picker";
import AppModal from "../Elements/Modal"
import Text from "../Elements/Text";
import SwitchBtn from "../Elements/Switch";
import Popup from "../Elements/Popup";

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

    const [selHour, setSelHour] = useState(timeToSet.getHours());
    const [selMin, setSelMin] = useState(timeToSet.getMinutes());

    const hourRef = useRef();
    const minRef = useRef();

    const [showingErrorPopUp, setShowingErrorPopUp] = useState(false);


    const verifyCurTime = () => {
        let curTime = new Date(Date.now())

        //round up cur time to nearest quarter
        if (curTime.getMinutes() > 45) {
            curTime.setHours(curTime.getHours() + 1)
            curTime.setMinutes(0);
        } else {
            curTime.setMinutes(Math.round(curTime.getMinutes() / 15) * 15)
        }
        curTime.setSeconds(0, 0)

        let lowTime = new Date(new Date(Date.now()).setHours(8, 0, 0, 0));
        let highTime = new Date(new Date(Date.now()).setHours(18, 0, 0, 0));

        return (curTime <= highTime) && (curTime >= lowTime);
    }

    const setSwitchValue = () => {
        let curTime = new Date(Date.now())

        //round up cur time to nearest quarter
        if (curTime.getMinutes() > 45) {
            curTime.setHours(curTime.getHours() + 1)
            curTime.setMinutes(0);
        } else {
            curTime.setMinutes(Math.round(curTime.getMinutes() / 15) * 15)
        }
        curTime.setSeconds(0, 0)

        console.log(curTime.toString())
        console.log(timeToSet.toString())
        console.log(timeToSet.toString() == curTime.toString())

        return timeToSet.toString() == curTime.toString()
    }

    const setAsCurrTime = () => {
        let curTime = new Date(Date.now())

        //round up cur time to nearest quarter
        if (curTime.getMinutes() > 45) {
            curTime.setHours(curTime.getHours() + 1)
            curTime.setMinutes(0);
        } else {
            curTime.setMinutes(Math.round(curTime.getMinutes() / 15) * 15)
        }
        curTime.setSeconds(0, 0)

        setTimeToSet(curTime)
        setSelHour(curTime.getHours())
        setSelMin(curTime.getMinutes())
        hourRef.current && hourRef.current.scrollToTargetIndex(hours.indexOf(curTime.getHours()));
        minRef.current && minRef.current.scrollToTargetIndex(minutes.indexOf(curTime.getMinutes()));
    }

    const validateNewTime = () => {
        let lowTime = new Date(new Date(Date.now()).setHours(8, 0, 0, 0));
        let highTime = new Date(new Date(Date.now()).setHours(18, 0, 0, 0));

        let newTime = new Date(new Date(Date.now()).setHours(selHour, selMin, 0, 0))
        let inRange = (newTime <= highTime) && (newTime >= lowTime);
        let endAfterStart = ((prevTime && (newTime > prevTime)) || !prevTime);

        if (inRange && endAfterStart) {
            timeSetter(new Date(newTime))
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
            <AppModal
                title={"Choose Time"}
                modalVisible={modalVisible}
                toggleModalVisible={toggleModalVisible}
                confirmAction={validateSubmit}
            >
                <SwitchBtn
                    switchDefault={setSwitchValue()}
                    switchText={"Use current time"}
                    switchVerifier={verifyCurTime()}
                    verifyFailMsg={"Current time is outwith University hours"}
                    switchAction={setAsCurrTime}
                />

                <View className="flex flex-row justify-center items-center px-5">
                    <View className="absolute border-b-4 border-2 rounded-md w-10 h-1/4 left-1/4 scale-125 "/>
                    <View className="absolute border-b-4 border-2 rounded-md w-10 h-1/4 right-1/4 scale-125 "/>
                    <ScrollPicker
                        ref={hourRef}
                        dataSource={hours}
                        selectedIndex={hours.indexOf(selHour)}
                        wrapperBackground="transparent"
                        highlightColor="transparent"
                        itemHeight={30}
                        activeItemTextStyle={{fontFamily:"MPLUSRounded1c-ExtraBold", color: "black", fontSize: 18 }}
                        itemTextStyle={{fontFamily:"MPLUSRounded1c-Medium",  color:"black", fontSize: 12}}
                        onValueChange={(hour) => {
                            console.log("hr change:")
                            console.log(new Date(new Date(timeToSet.setHours(hour)).setSeconds(0,0)))
                            setSelHour(hour)
                            setTimeToSet(new Date(new Date(timeToSet.setHours(selHour)).setSeconds(0,0)))
                        }}
                    />

                    <ScrollPicker
                        ref={minRef}
                        dataSource={minutes}
                        selectedIndex={minutes.indexOf(selMin)}
                        wrapperBackground="transparent"
                        highlightColor="transparent"

                        itemHeight={30}
                        activeItemTextStyle={{fontFamily:"MPLUSRounded1c-ExtraBold", color: "black", fontSize: 18 }}
                        itemTextStyle={{fontFamily:"MPLUSRounded1c-Medium", color:"black", fontSize: 12}}
                        onValueChange={(min) => {
                            console.log("min change:")
                            console.log(new Date(new Date(timeToSet.setMinutes(min)).setSeconds(0,0)))
                            setSelMin(min)
                            setTimeToSet(new Date(new Date(timeToSet.setMinutes(selMin)).setSeconds(0,0)))
                        }}
                    />


                </View>
            </AppModal>

            <Portal>
                <AppModal
                    title={"Time Error"}
                    modalVisible={showingErrorPopUp}
                    toggleModalVisible={setShowingErrorPopUp}
                    confirmAction={() => {setShowingErrorPopUp(false)}}
                >
                    <View className="flex flex-row justify-center items-center p-5">
                    <Text>Not a valid time!</Text>
                    </View>
                </AppModal>
            </Portal>
        </>

    );

}

