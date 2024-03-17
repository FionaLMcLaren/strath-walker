import React, {useEffect, useState} from "react";
import {View} from "react-native";
import MapPicker from "../components/Map/MapLocationPicker";
import TimeSetter from "../components/Time/TimeSetter";
import Popup from "../components/Elements/Popup";
import Text from "../components/Elements/Text";
import Button from "../components/Elements/NextBtn";
import Title from "../components/Elements/Title";
import Label from "../components/Elements/Label";

import {Location} from '../components/Routes/Location.js';



export default function StartPoint({ navigation }) {
    const [start, setStart] = useState(new Location("",0,0));
    const [startTime, setStartTime] = React.useState(new Date(new Date().setHours(8,0,0,0)));

    const [modalVisible, toggleModalVisible] = React.useState(false);
    const [popupVisible, togglePopupVisible] = React.useState(false);


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
                    colour={"yl"}>
                    {start.getName()? start.getName() : "Not Set"}
                </Label>


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
                    arrow="true"
                    action={() =>
                        {
                            if (start.getName()) {
                                togglePopupVisible(false)
                                navigation.navigate("EndPoint",
                                {
                                    startingTime: startTime,
                                    startingLoc: start
                                })
                            } else {
                                togglePopupVisible(true)
                            }
                        }
                    }
                />

                <Button
                  onPress={() => {navigation.navigate("WalkDataView")}}
                >
                    View past walk data
                </Button>
            </View>

            <Popup snackbarVisible={popupVisible}
                   toggleSnackbarVisible={togglePopupVisible}
                   text={"You must have a start point set!"}
            />

        </View>
    );

}

