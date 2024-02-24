import React, {useState} from "react";
import {Text, View, Button} from "react-native";

export default function EndPoint({ navigation }) {

   	const styles = {
   		container: "flex flex-1 items-center justify-center",
   	};

   	return (
            <View className={styles.container}>
               <Text>End Point</Text>
            </View >
    );

}

