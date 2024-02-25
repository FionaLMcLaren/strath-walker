import React, {useState} from "react";
import {Text, View, Button} from "react-native";
import MapPicker from "../Map/MapLocationPicker";

export default function StartPoint({ navigation }) {
    const [start, setStart] = useState("");

   	const styles = {
   		container: "items-center justify-center h-4/5 bg-neutral-950",
   	};


   	return (

            <View className={styles.container }>
               <MapPicker loc={start} changeLoc={setStart}/>
               <Text>Start Point: {start}</Text>

                <Button
                    title="Select end point"
                    onPress={() => navigation.navigate("End Point")}
                />
            </View >
    );

}

