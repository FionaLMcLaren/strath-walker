import React, {useState} from "react";
import {Text, View, Button} from "react-native";

export default function Planner() {

   	const styles = {
   		container: "flex flex-1 items-center justify-center",
   	};

    const [classroom, setClassroom] = useState("LT");

   	return (
            <View className={styles.container}>
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

