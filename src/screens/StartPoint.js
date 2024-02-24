import React, {useState} from "react";
import {Text, View, Button} from "react-native";

export default function StartPoint({ navigation }) {

   	const styles = {
   		container: "flex flex-1 items-center justify-center",
   	};


   	return (
            <View className={styles.container}>
               <Text>Start Point</Text>
                  <Button
                    title="Select end point"
                    onPress={() => navigation.navigate("End Point")}
                  />
            </View >
    );

}

