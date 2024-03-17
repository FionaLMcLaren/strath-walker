import React, {useEffect, useState} from "react";
import {Text, View, ScrollView, SafeAreaView, TouchableHighlight, Button, Alert} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import {Polyline} from "react-native-maps";
import {ResultMap} from "../components/Map/ResultMap";
import {PrevWalkMap} from "../components/Map/PrevWalkMap";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";

export default function WalkDataView({navigation}) {

  const styles = { container: "flex flex-1 justify-center" };
  const [walkData, setWalkData] = React.useState([])

  const getWalkData = async () => {
    try {
      const value = await AsyncStorage.getItem('WalkData');
      value !== null ? setWalkData(JSON.parse(value)) : setWalkData([]);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect( () => {
    void getWalkData()
  }, []);

  useEffect(() => {
    calcAvgPace()
  }, [walkData])

  const [selectedWalk, setSelectedWalk] = useState(null);
  const [avgPace, setAvgPace] = useState(null);

  const calcAvgPace = () => {
    console.log("averaging");

    let totalPace = 0;
    let counter = 0;

    console.log(walkData);

    walkData.forEach(nextWalkData => {
      if (nextWalkData.pace !== undefined) {
        totalPace += nextWalkData.pace;
        counter++;
      }
    });

    if (counter > 0) {
      const averagePace = totalPace / counter;
      setAvgPace(averagePace);
    }
  }

  if(walkData.length > 0){
    return (
      <View className={styles.container}>
        <PrevWalkMap walk={selectedWalk} />
        <ScrollView>
            {
              avgPace
                ?   <Text>Average pace: {avgPace}m/s</Text>
                :   <Text>Average pace: N/A</Text>
            }

          {
            walkData.map((nextWalkData, index) => {
                  return (
                    <WalkOption
                                key={index}
                                data={nextWalkData}
                                onPress={() => {
                                  setSelectedWalk(nextWalkData);
                                }}/>)
              })
          }
        </ScrollView>

      </View>
    );
  }
  else{
    return(
      <View className={styles.container}>
        <Text>Nothing to view...</Text>
      </View>
    )
  }
}

const WalkOption=({ data, onPress })=> {
  return(
    <TouchableHighlight onPress={() => {onPress()}}>
      <View>
        <Text>{data['selectedRoute'][0]['name']} to {data['selectedRoute'][data['selectedRoute'].length - 1]['name']}</Text>
        <Text>Walked from {new Date(data['startTime']).toLocaleTimeString("en-GB", {timeStyle:"short"})} to {new Date(data['endTime']).toLocaleTimeString("en-GB", {timeStyle:"short"})} on {new Date(data['startTime']).toLocaleDateString("en-GB", {dateStyle:"short"})}</Text>
        <Text>{data['distance']}m in {data['steps']} steps</Text>
        <Text>{data['pace']}m/s</Text>
      </View>
    </TouchableHighlight>
  );
}
