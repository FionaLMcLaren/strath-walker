import React, {useEffect, useRef, useState} from "react";
import {View} from "react-native";
import {Portal} from "react-native-paper";
import ScrollPicker from "react-native-wheel-scrollview-picker";
import AppModal from "../Elements/Modal";
import Text from "../Elements/Text";
import SwitchBtn from "../Elements/Switch";
import {getCurrTime, checkInRange} from "./TimeFunctions";

/*
A component used for when the user is to choose their start/end time.
 It has two scrollers that represents hours and minutes the user can
 select for their start/end time, and a switch that can be used by the user
 to set their start time as their current time. It validates that all times
 chosen are within University hours and sends a notice if the user tries to
 set the time as times outwith this range.
 It takes...
- time, which is the time that is to be set
- timeSetter, which changes the value of the time
- prevTime, which is used to show if the user is setting an end time
- modalVisible and toggleModalVisible, which controls if this component is
on screen or not.
- selectedRoute, which indicates if the component is on the selectedRoute screen
or not
 */

export default function TimeSelect({timeSetter, prevTime, modalVisible, toggleModalVisible, selectedRoute }) {
    const hours = [8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18]
    const minutes= [0, 15, 30, 45]

    const hoursReadable = ["08", "09", "10", "11", "12", "13", "14", "15", "16", "17", "18"]
    const minutesReadable = ["00", "15", "30", "45"]

    const [timeToSet, setTimeToSet] = useState(new Date(new Date(Date.now()).setHours(8, 0, 0, 0)));

    const [selHour, setSelHour] = useState(timeToSet.getHours());
    const [selMin, setSelMin] = useState(timeToSet.getMinutes());

    const hourRef = useRef();
    const minRef = useRef();

    const [showingErrorPopUp, setShowingErrorPopUp] = useState(false);
    const [switchValue, switchSetter] = React.useState(false);

    const setAsCurrTime = () => {

        let curTime = getCurrTime()
        setTimeToSet(curTime)
        setSelHour(curTime.getHours())
        setSelMin(curTime.getMinutes())
        hourRef.current && hourRef.current.scrollToTargetIndex(hours.indexOf(curTime.getHours()));
        minRef.current && minRef.current.scrollToTargetIndex(minutes.indexOf(curTime.getMinutes()));
    }

    const validateNewTime = () => {

        let newTime = new Date(new Date(Date.now()).setHours(selHour, selMin, 0, 0))
        let inRange = checkInRange(newTime, 8, 18);
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

        }
    }

    useEffect(() => {
        let curTime = getCurrTime()

        switchSetter(timeToSet.toString() === curTime.toString());
    }, []);



    return (
        <>
            <AppModal
                title={selectedRoute ? "Choose End Time" : "Choose Time"}
                modalVisible={modalVisible}
                toggleModalVisible={toggleModalVisible}
                confirmAction={validateSubmit}
            >
                { (selectedRoute || prevTime) ? null :
                    <SwitchBtn
                        switchValue={switchValue}
                        switchSetter={switchSetter}
                        switchText={"Use current time"}
                        switchVerifier={(checkInRange(getCurrTime(), 8, 18))}
                        verifyFailMsg={"Current time is outwith University hours"}
                        switchAction={setAsCurrTime}
                    />
                }

                <View className="flex pb-4 justify-center items-center">
                <View className="flex flex-row items-center gap-2">
                    <View className="absolute border-b-4 border-2 rounded-md w-10 h-1/4 left-20 scale-125 "/>
                    <View className="absolute border-b-4 border-2 rounded-md w-10 h-1/4 right-20 scale-125 "/>
                    <ScrollPicker
                        ref={hourRef}
                        dataSource={hoursReadable}
                        selectedIndex={hours.indexOf(selHour)}
                        wrapperBackground="transparent"
                        highlightColor="transparent"
                        itemHeight={30}
                        activeItemTextStyle={{fontFamily:"MPLUSRounded1c-ExtraBold", color: "black", fontSize: 18, }}
                        itemTextStyle={{fontFamily:"MPLUSRounded1c-Medium",  color:"black", fontSize: 12}}
                        onValueChange={(hourVal) => {
                            const hour = hours[hoursReadable.indexOf(hourVal)]


                            setSelHour(hour)
                            setTimeToSet(new Date(new Date(timeToSet.setHours(selHour)).setSeconds(0,0)))
                        }}
                    />

                    <ScrollPicker
                        ref={minRef}
                        dataSource={minutesReadable}
                        selectedIndex={minutes.indexOf(selMin)}
                        wrapperBackground="transparent"
                        highlightColor="transparent"
                        itemHeight={30}
                        activeItemTextStyle={{fontFamily:"MPLUSRounded1c-ExtraBold", color: "black", fontSize: 18 }}
                        itemTextStyle={{fontFamily:"MPLUSRounded1c-Medium", color:"black", fontSize: 12}}
                        onValueChange={(minVal) => {
                            const min = minutes[minutesReadable.indexOf(minVal)]


                            setSelMin(min)
                            setTimeToSet(new Date(new Date(timeToSet.setMinutes(selMin)).setSeconds(0,0)))
                        }}
                    />
                </View>

                    <Text accent={true} colour={true} >Please select a time between 8:00 and 18:00. These are University working hours.
                    </Text>



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
                    <Text>Not a valid time! Is your time within university hours? Is it after the start time you set before? </Text>
                    </View>
                </AppModal>
            </Portal>
        </>

    );

}

