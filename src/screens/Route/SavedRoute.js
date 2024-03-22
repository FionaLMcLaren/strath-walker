import React, {useEffect, useState} from "react";
import {View, ScrollView} from "react-native";
import { loadRoutes} from "../../components/Routes/PathStorage";
import Text from "../../components/Elements/Text";
import NoWalkNotice from "../../components/Elements/NoWalksNotice";
import RouteItem from "../../components/Elements/WalkListItem";
import LoadScreen from "../../components/Elements/LoadingScreen";


//Page showing all the saved routes
export default function Routes({navigation}) {
    const [savedRoutes, setSavedRoutes] = useState([]);
    const [loadScreenVisible, setLoadScreenVisible] = useState(true); //whether loading screen is being shown or not


    useEffect(() => {
        loadRoutes().then(walks => {
            setSavedRoutes(walks);
            setLoadScreenVisible(false);
        });
    }, [])

    //if there are saved routes to show then show a scrollable list of their details
    if (savedRoutes.length > 0) {
        return (
            <>
                { (loadScreenVisible) ? <LoadScreen  /> : null }

                <View className="flex flex-1 ">
                    <ScrollView className="flex flex-1 p-2 mb-6 " >
                        {
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
                            })
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








