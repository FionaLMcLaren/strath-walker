import React, {useEffect, useState} from "react";
import {View, ScrollView, Pressable} from "react-native";
import {Icon} from "react-native-paper";
import { loadRoutes} from "../components/Routes/PathStorage";

import Text from "../components/Elements/Text";
import NoWalkNotice from "../components/Elements/NoWalksNotice";
import RouteItem from "../components/Elements/WalkListItem"
import Popup from "../components/Elements/Popup";

import {getCurrTime, checkInRange} from "../components/Time/TimeFunctions"
import LoadScreen from "../components/Elements/LoadingScreen";


export default function Routes({route, navigation}) {
    const [savedRoutes, setSavedRoutes] = useState([]);

    const [popupVisible, togglePopupVisible] = React.useState(false);
    const [loadScreenVisible, setLoadScreenVisible] = useState(true);

    useEffect(() => {
        loadRoutes().then(walks => {
            setSavedRoutes(walks)
            setLoadScreenVisible(false)
        });
        console.log(savedRoutes);
    }, [])


    if (savedRoutes.length > 0) {
        return (
            <>
                { (loadScreenVisible) ? <LoadScreen  /> : null }

                <View className="flex flex-1 ">
                    <ScrollView className="flex flex-1 p-2 mb-6 " >
                        {
                            savedRoutes ?
                                savedRoutes.map((route) => {
                                    return(
                                        <RouteItem key={route.getKey()}
                                                     route={route}
                                                     onPress={() => {
                                                         if (checkInRange(getCurrTime(), 8, 17)) {
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
            </>
        )
    } else {
        return (
            <>
                { (loadScreenVisible) ? <LoadScreen  /> : null }
                <NoWalkNotice navigation={navigation} />
            </>
        )
    }

}








