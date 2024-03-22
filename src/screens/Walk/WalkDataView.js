import React, {useEffect, useState} from "react";
import {View, ScrollView} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import RouteItem from "../../components/Elements/WalkListItem";
import NoWalkNotice from "../../components/Elements/NoWalksNotice";
import LoadScreen from "../../components/Elements/LoadingScreen";
import Label from "../../components/Elements/Label";

//Screen to show the saved walk data
export default function WalkDataView({navigation}) {

  const [loadScreenVisible, setLoadScreenVisible] = useState(true); //shows the loading screen while loading
  const [walkData, setWalkData] = React.useState([]);
  const [avgPace, setAvgPace] = React.useState(null);


  //gets the saved walk data
  const getWalkData = async () => {
    try {
      const walks = await AsyncStorage.getItem('WalkData');
      walks !== null ? setWalkData(JSON.parse(walks)) : setWalkData([]);

      const pace = await AsyncStorage.getItem('AveragePace');
      pace !== null ? setAvgPace(+(JSON.parse(pace).toFixed(2))) : setAvgPace(null);
    } catch (error) {

    }
  }

  useEffect( () => { //once finished rendering hide the loading screen
     getWalkData().then(() => setLoadScreenVisible(false))
  }, []);


  if(walkData.length > 0){
    return (
        <>
          { (loadScreenVisible) ? <LoadScreen  /> : null }
        <View className="flex flex-1 ">
          <View className=" flex justify-center items-center py-4 border-b-2 bg-teal-100 px-6 ">
            <Label title={"Your Average Pace"} colour="pk">
              {avgPace ? (avgPace.toString()+"m/s") : "N/A"}
            </Label>
          </View>
          <ScrollView className="flex flex-1 p-2 " >
            {
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
