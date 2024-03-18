import React, {useEffect, useState} from "react";
import { View, ScrollView, SafeAreaView, TouchableHighlight, Button, Alert} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import RouteItem from "../components/Elements/WalkListItem";
import NoWalkNotice from "../components/Elements/NoWalksNotice";

import Text from "../components/Elements/Text"

export default function WalkDataView({navigation}) {

  const [popupVisible, togglePopupVisible] = React.useState(false);

  const [walkData, setWalkData] = React.useState([]);
  const [avgPace, setAvgPace] = React.useState(null);

  const getWalkData = async () => {
    try {
      const walks = await AsyncStorage.getItem('WalkData');
      walks !== null ? setWalkData(JSON.parse(walks)) : setWalkData([]);

      const pace = await AsyncStorage.getItem('AveragePace');
      pace !== null ? setAvgPace(+(JSON.parse(pace).toFixed(2))) : setAvgPace(null);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect( () => {
    void getWalkData()
  }, []);

  if(walkData.length > 0){
    return (
        <View className="flex flex-1 ">
          <Text>Hello world!</Text>
          <ScrollView className="flex flex-1 p-2 mb-6 " >
            {
              walkData ?
                    walkData.map((nextWalkData, index) => {
                      return (
                          <RouteItem
                              key={index}
                              data={nextWalkData}
                              onPress={() => navigation.navigate("SelectedRoute",
                                  {
                                    chosenRoute: nextWalkData,
                                  })
                              }
                              colour="pk"
                          />)
                    })
                  :   <Text>Loading...</Text>
            }
          </ScrollView>
        </View>
    );
  }
  else{
    return(
        <NoWalkNotice navigation={navigation} />
    )
  }
}
