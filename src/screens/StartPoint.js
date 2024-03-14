import React, {useState} from "react";
import {View} from "react-native";
import MapPicker from "../components/Map/MapLocationPicker";
import TimeSetter from "../components/Time/TimeSetter";
import Toast from "../components/Elements/Toast";
import Text from "../components/Elements/Text";
import Button from "../components/Elements/NextBtn";
import Title from "../components/Elements/Title";
import Label from "../components/Elements/Label";

import {Location} from '../components/Routes/Location.js';

export default function StartPoint({ navigation }) {
    const [start, setStart] = useState(new Location("",0,0));
    const [startTime, setStartTime] = React.useState(new Date(new Date(Date.now()).setSeconds(0, 0)));

    const [snackbarVisible, toggleSnackbarVisible] = React.useState(true);
    const [modalVisible, toggleModalVisible] = React.useState(false);

    return (
        <View className="mt-4">
            <View className="flex justify-center ">
                <View>

                <Title
                    title={"Location"}
                    icon={"map-marker"}
                    colour={"yl"}
                />


                <Label
                    title={"Start Point"}
                    text={start.getName()? start.getName() : "Not Set"}
                    colour={"yl"}
                />


                <MapPicker loc={start} changeLoc={setStart}/>

                </View>

                <Title
                        title={"Time"}
                        icon={"clock-time-eight"}
                        colour={"pk"}
                />

                <TimeSetter
                    time={startTime}
                    timeSetter={setStartTime}
                    modalVisible={modalVisible}
                    toggleModalVisible={toggleModalVisible}
                />

                <Button
                    colour="tq"
                    title={"set end point"}
                    action={() =>
                        {
                            if (start.getName()) {
                                navigation.navigate("EndPoint",
                                {
                                    startingTime: startTime,
                                    startingLoc: start
                                })
                            } else {
                                toggleSnackbarVisible(true);
                            }
                        }
                    }
                />
            </View>

            <Toast
                text={"You must have a start point set!"}
                snackbarVisible={snackbarVisible}
                toggleSnackbarVisible={toggleSnackbarVisible}
            />

        </View>
    );

}

