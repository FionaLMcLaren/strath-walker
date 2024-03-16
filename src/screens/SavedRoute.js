import React, {useEffect, useState} from "react";
import {View, ScrollView, Pressable} from "react-native";
import {Icon} from "react-native-paper";
import { loadRoutes} from "../components/Routes/PathStorage";

import Text from "../components/Elements/Text";
import Button from "../components/Elements/NextBtn";
import MapTab from "../components/Elements/MapTab";
import Label from "../components/Elements/Label";
import NoWalkNotice from "../components/Elements/NoWalksNotice";
import classNames from "classnames";
import RouteItem from "../components/Elements/WalkListItem"



export default function Routes({route, navigation}) {
    const [savedRoutes, setSavedRoutes] = useState([]);

    useEffect(() => {
        loadRoutes().then(walks => setSavedRoutes(walks));
        console.log(savedRoutes);
    }, [])

    if (savedRoutes.length > 0) {
        return (
            <View className="flex flex-1 ">
                <ScrollView className="flex flex-1 p-2 mt-6 " >
                    {
                        savedRoutes ?
                            savedRoutes.map((route) => {
                                return(
                                    <RouteItem key={route.getKey()}
                                                 route={route}
                                                 onPress={(route) => { console.log(route) }}
                                                 colour="yl"

                                    />)
                            })
                            :   <Text>Loading...</Text>
                    }
                </ScrollView>
            </View>
        )
    } else {
        return (
            <NoWalkNotice navigation={navigation} />
        )
    }

}








