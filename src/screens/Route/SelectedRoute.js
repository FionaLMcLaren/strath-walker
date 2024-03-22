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


//Screen shows the selected saved walks/routes.
export default function SelectedRoute({route, navigation}) {
    /*
    The function should pass either of these two optional parameters:
    `selectedRoute` is true when we are wanting to render a saved route,
    and `pastWalk` is true when we want to render a past walk
    */
    const selectedRoute = route.params.chosenRoute;
    const pastWalk = route.params.pastWalk;

    const startTime = new Date();
    const [endTime, setEndTime] = useState(new Date(new Date().setHours(startTime.getHours() + 1)));

    const [modalVisible, toggleModalVisible] = useState(false);

    /*
    When the `pastWalk` parameter is true, that means we will render a map page for a past walk.
    We call the `prevWalkMap`, which is responsible for rendering the polyline of the past walk onto
    the map, and the `SelectedRouteTab` will show the details of the past walk, with the parameter of
    `pastWalk` being set to true so the component outputs its content for a past walk.
     */
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
        /*
When the `pastWalk` parameter is not true, that means we will render a map page for a selected route.
We call the `RouteChoiceMap`, as it can make the polyline for our selected route,
 and the `SelectedRouteTab` will show the details of the past route, with the
 parameter of `pastWalk` being set to false so the component outputs its content for a selected route.
 */
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

    /*
    When the parameter `pastWalk` has been passed in as true, as we store saved walks differently from
    a saved route, we need to call the right corresponding methods to get our saved walk's name, distance and
    duration. When it is false, we call the methods to get the same details of our saved route.
     */
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

    /*
   If we are rendering a save walk also, we don't give the option to navigate to
   the start walk page as this is exclusive to saved route - users can repeat saved
   routes and make this their walk to do.
   When the user chooses to do a saved route, we give them the option to select their
   end time, setting their start time as their current time. If the user is outwith
   university hours, we don't them start the walk. 
     */

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








