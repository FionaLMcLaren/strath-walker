import React, {useEffect, useState} from "react";
import { View, ScrollView, SafeAreaView, TouchableHighlight, Button, Alert} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import RouteItem from "../components/Elements/WalkListItem";
import NoWalkNotice from "../components/Elements/NoWalksNotice";

import Text from "../components/Elements/Text"
import LoadScreen from "../components/Elements/LoadingScreen";
import Label from "../components/Elements/Label";
import Popup from "../components/Elements/Popup";
import {checkInRange, getCurrTime} from "../components/Time/TimeFunctions";

export default function WalkDataView({navigation}) {

  const [loadScreenVisible, setLoadScreenVisible] = useState(true);
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
     getWalkData().then(e => setLoadScreenVisible(false))
  }, []);

  if(walkData.length > 0){
    return (
        <>
          { (loadScreenVisible) ? <LoadScreen  /> : null }
        <View className="flex flex-1 ">
          <View className=" flex justify-center items-center py-4 border-b-2 bg-teal-100 ">
            <Label title={"Your Average Pace"} colour="pk">
              {avgPace ? (avgPace.toString()+"m/s") : "N/A"}
            </Label>
          </View>
          <ScrollView className="flex flex-1 p-2 " >
            {
              walkData ?
                    walkData.map((nextWalkData, index) => {
                      return (
                          <RouteItem
                              key={index}
                              data={nextWalkData}
                              onPress={() => {
                                  navigation.navigate("SelectedRoute",
                                      {
                                        chosenRoute: nextWalkData,
                                        pastWalk: true
                                      })
                              }}
                              colour="pk"
                          />)
                    })
                  :   <Text>Loading...</Text>
            }
          </ScrollView>


        </View>
        </>
    );
  }
  else{
    return(
        <>
          { (loadScreenVisible) ? <LoadScreen  /> : null }
          <NoWalkNotice navigation={navigation} />
        </>
    )
  }
}
