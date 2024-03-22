import React, {useEffect, useState} from "react";
import {View, ScrollView, Pressable} from "react-native";
import {Icon} from "react-native-paper";
import { loadRoutes} from "../../components/Routes/PathStorage";

import Text from "../../components/Elements/Text";
import NoWalkNotice from "../../components/Elements/NoWalksNotice";
import RouteItem from "../../components/Elements/WalkListItem"
import Popup from "../../components/Elements/Popup";

import {getCurrTime, checkInRange} from "../../components/Time/TimeFunctions"
import LoadScreen from "../../components/Elements/LoadingScreen";


export default function Routes({route, navigation}) {
    const [savedRoutes, setSavedRoutes] = useState([]);

    const [loadScreenVisible, setLoadScreenVisible] = useState(true);

    useEffect(() => {
        loadRoutes().then(walks => {
            setSavedRoutes(walks)
            console.log(savedRoutes);
            setLoadScreenVisible(false)
        });
    }, [])


    if (savedRoutes.length > 0) {
        return (
            <>
                { (loadScreenVisible) ? <LoadScreen  /> : null }

                <View className="flex flex-1 ">
                    <ScrollView className="flex flex-1 p-2 mb-6 " >
                        {
                            savedRoutes ?
                                savedRoutes.map((route, index) => {
                                    return(
                                        <RouteItem   key={index}
                                                     route={route}
                                                     onPress={() => {
                                                             navigation.navigate("SelectedRoute",
                                                             {
                                                                 chosenRoute: route,
                                                             })
                                                     }}
                                                     colour="yl"
                                        />)
                                }
                                )
                                :   <Text>Loading...</Text>
                        }
                    </ScrollView>

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








