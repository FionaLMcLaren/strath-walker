import React, {useState} from "react";
import {Text, View, Button} from "react-native";
import MapView from 'react-native-maps';

export default function Planner() {

   	const styles = {
   		container: "flex flex-1 items-center justify-center",
   	};

    const [classroom, setClassroom] = useState("LT");

   	return (
            <View className={styles.container}>


               	<MapView
                  initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0922,
                    longitudeDelta: 0.0421,
                  }}
                />


               <Text>Open up App.tsx to start working on your app!</Text>

                <Button
                    title="See your routes"
                    onPress={() => {
                        navigation.navigate('Details', {
                            itemId: 86,
                            otherParam: 'anything you want here',
                        });
                    }}
                />
            </View >
    );

}

