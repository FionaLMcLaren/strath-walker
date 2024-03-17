import React, {useEffect, useState} from "react";
import {View, ScrollView, Pressable} from "react-native";
import {Icon} from "react-native-paper";
import { loadRoutes} from "../components/Routes/PathStorage";

import Text from "../components/Elements/Text";
import NoWalkNotice from "../components/Elements/NoWalksNotice";
import RouteItem from "../components/Elements/WalkListItem"
import Popup from "../components/Elements/Popup";

export default function Routes({route, navigation}) {
    const [savedRoutes, setSavedRoutes] = useState([]);

    const [popupVisible, togglePopupVisible] = React.useState(false);

    const verifyStartTime = () => {
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

    useEffect(() => {
        loadRoutes().then(walks => setSavedRoutes(walks));
        console.log(savedRoutes);
    }, [])


    if (savedRoutes.length > 0) {
        return (
            <View className="flex flex-1 ">
                <ScrollView className="flex flex-1 p-2 mb-6 " >
                    {
                        savedRoutes ?
                            savedRoutes.map((route) => {
                                return(
                                    <RouteItem key={route.getKey()}
                                                 route={route}
                                                 onPress={() => {
                                                     if (verifyStartTime) {
                                                         navigation.navigate("SelectedRoute",
                                                         {
                                                             chosenRoute: route,
                                                         })
                                                     } else {
                                                         togglePopupVisible(true)
                                                     }
                                                 }}
                                                 colour="yl"
                                    />)
                            }
                            )
                            :   <Text>Loading...</Text>
                    }
                </ScrollView>

                <Popup snackbarVisible={popupVisible}
                       toggleSnackbarVisible={togglePopupVisible}
                       text={"Can't start a walk outside of University hours!"}
                />
            </View>
        )
    } else {
        return (
            <NoWalkNotice navigation={navigation} />
        )
    }

}








