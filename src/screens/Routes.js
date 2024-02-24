import React from "react";
import {Text, View} from "react-native";

export default function Routes() {

   	const styles = {
   		container: "flex flex-1 items-center justify-center",
   	};

   	return (
            <View className={styles.container}>
               <Text>Routes page</Text>
            </View >
    );

}

