import React, {useState} from "react";
import {View} from "react-native";
import {RouteChoiceMap} from '../../components/Map/RouteChoiceMap.js';
import TimeSelect from "../../components/Time/TimeSelect"
import Button from "../../components/Elements/NextBtn";
import MapTab from "../../components/Elements/MapTab";
import RouteOption from "../../components/Elements/RouteOption";
import {PrevWalkMap} from "../../components/Map/PrevWalkMap";
import {checkInRange, getCurrTime, readableDuration} from "../../components/Time/TimeFunctions";
import Popup from "../../components/Elements/Popup";


//Screen shows the selected saved route
export default function SelectedRoute({route, navigation}) {
    const selectedRoute = route.params.chosenRoute;
    const pastWalk = route.params.pastWalk;

    const startTime = new Date();
    const [endTime, setEndTime] = useState(new Date(new Date().setHours(startTime.getHours() + 1)));

    const [modalVisible, toggleModalVisible] = useState(false);

    if (pastWalk) {
        const start = selectedRoute['selectedRoute'][0]
        const end = selectedRoute['selectedRoute'][selectedRoute['selectedRoute'].length - 1]

        return (
            <View className="flex flex-1 justify-center">
                <PrevWalkMap walk={selectedRoute}/>
                <SelectedRouteTab pastWalk={true}
                                  navigation={navigation}
                                  startTime={startTime}
                                  selectedRoute={selectedRoute}
                                  endTime={endTime}
                                  setEndTime={setEndTime}
                                  modalVisible={modalVisible}
                                  toggleModalVisible={toggleModalVisible}
                                  start={start}
                                  end={end}
                />
            </View>

        )
    } else {
        const start = selectedRoute.path.getFirst();
        const end = selectedRoute.path.getLast();

        return (
            <View className="flex flex-1 justify-center">
                <RouteChoiceMap polylines={selectedRoute}/>
                <SelectedRouteTab navigation={navigation}
                                  startTime={startTime}
                                  selectedRoute={selectedRoute}
                                  endTime={endTime}
                                  setEndTime={setEndTime}
                                  modalVisible={modalVisible}
                                  toggleModalVisible={toggleModalVisible}
                                  start={start}
                                  end={end}
                />
            </View>
        )
    }
}




// Tab containing all the information on the selected route
function SelectedRouteTab({pastWalk, navigation, selectedRoute, endTime, setEndTime, startTime, modalVisible, toggleModalVisible, start, end}) {
    const [popupVisible, togglePopupVisible] = useState(false);

    let routeName
    let distance
    let duration

    if (pastWalk) {
        routeName = selectedRoute['selectedRoute'][0]['name'].toString() + " to " +
            selectedRoute['selectedRoute'][selectedRoute['selectedRoute'].length - 1]['name'].toString()
        distance = selectedRoute['distance']

        let timeDiff = new Date(selectedRoute['endTime'] - selectedRoute['startTime'])
        duration = readableDuration(timeDiff.getTime() / 1000);
    } else {
        routeName = selectedRoute.path.getReadableName()
        distance = selectedRoute.getDistance()
        duration = selectedRoute.getReadableDuration()
    }

    return (
        <>
            <MapTab routePage={true} pastWalk={pastWalk} >
                <View className="flex items-center ">
                    <RouteOption route={selectedRoute} routeName={routeName} routeDistance={distance} routeDuration={duration}/>
                </View>

                {pastWalk ?  null :
            <View className="py-2 ">
                <Button
                    colour="tq"
                    action={() => {
                        if (checkInRange(getCurrTime(), 8, 17)) {
                            toggleModalVisible(true)
                            navigation.navigate("StartWalk",
                                {
                                    startingTime: startTime,
                                    startingLoc: start,
                                    endingTime: endTime,
                                    endingLoc: end,
                                    selectedRoute: selectedRoute,
                                    savedRoute: true
                                });
                        } else {
                                togglePopupVisible(true)
                        }
                    }}
                    title="Select Route"/>
            </View>
                }
        </MapTab>

            <TimeSelect
            timeSetter={setEndTime}
            prevTime={startTime}
            modalVisible={modalVisible}
            toggleModalVisible={toggleModalVisible}
            selectedRoute={true}
            />

            <Popup snackbarVisible={popupVisible}
                   toggleSnackbarVisible={togglePopupVisible}
                   text={"Can't start a walk outside of University hours!"}
            />
        </>
    )
}








